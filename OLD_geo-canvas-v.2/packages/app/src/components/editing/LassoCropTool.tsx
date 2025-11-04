import React, { useState, useCallback, useEffect } from 'react';
import { useMap, Pane, Polyline, Polygon, useMapEvents, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';

interface LassoCropToolProps {
    layer: ImportedLayer;
    onApply: (updates: Partial<ImportedLayer>) => void;
    onCancel: () => void;
}

const SNAP_THRESHOLD_PX = 15; // Pixel distance to snap to the closing point

const rotatePoint = (p: L.Point, center: L.Point, angleDeg: number): L.Point => {
    const angleRad = angleDeg * (Math.PI / 180);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const translated = p.subtract(center);
    const rotated = new L.Point(
        translated.x * cos - translated.y * sin,
        translated.x * sin + translated.y * cos
    );
    return rotated.add(center);
};

const LassoCropTool: React.FC<LassoCropToolProps> = ({ layer, onApply, onCancel }) => {
    const map = useMap();
    const [points, setPoints] = useState<L.LatLng[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [tempPoint, setTempPoint] = useState<L.LatLng | null>(null);
    const [isHoveringClosePoint, setIsHoveringClosePoint] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [controlsPosition, setControlsPosition] = useState<L.Point | null>(null);

    const updateControlsPosition = useCallback(() => {
        const boundsSource = points.length > 2 ? L.latLngBounds(points) : layer.bounds;
        if (boundsSource) {
            const south = boundsSource.getSouth();
            const centerLng = boundsSource.getCenter().lng;
            const bottomCenter = L.latLng(south, centerLng);
            const point = map.latLngToContainerPoint(bottomCenter);
            setControlsPosition(point.add([0, 20])); // Position below
        }
    }, [map, points, layer.bounds]);

    useEffect(() => {
        updateControlsPosition();
    }, [points, updateControlsPosition]);

    useMapEvents({
        zoom: updateControlsPosition,
        move: updateControlsPosition,
        click(e) {
            if (isFinished || isProcessing) return;
            // The click on the closing CircleMarker handles finishing
            setPoints(prev => [...prev, e.latlng]);
        },
        mousemove(e) {
            if (isFinished || isProcessing) return;
            setTempPoint(e.latlng);

            if (points.length >= 3) {
                const firstPointPx = map.latLngToLayerPoint(points[0]);
                const mousePx = map.latLngToLayerPoint(e.latlng);
                if (firstPointPx.distanceTo(mousePx) < SNAP_THRESHOLD_PX) {
                    setIsHoveringClosePoint(true);
                    setTempPoint(points[0]); // Snap preview line to start point
                } else {
                    setIsHoveringClosePoint(false);
                }
            }
        }
    });

    const handleFinishDrawing = useCallback(() => {
        setIsFinished(true);
        setTempPoint(null);
        setIsHoveringClosePoint(false);
    }, []);

    useEffect(() => {
        const mapContainer = map.getContainer();
        mapContainer.style.cursor = isFinished ? '' : 'crosshair';
        return () => { mapContainer.style.cursor = ''; };
    }, [map, isFinished]);

    const handleApply = useCallback(async () => {
        if (points.length < 3) return;
        setIsProcessing(true);

        const url = URL.createObjectURL(new Blob([layer.data!]));
        try {
            const { data, bounds: originalBounds, intrinsicWidth, intrinsicHeight, rotation = 0 } = layer;
            if (!data || !originalBounds || !intrinsicWidth || !intrinsicHeight) {
                throw new Error("Τα δεδομένα του επιπέδου είναι ελλιπή για περικοπή.");
            }

            const image = await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });

            const centerPoint = map.latLngToLayerPoint(originalBounds.getCenter());
            const unrotatedOrigNwPt = rotatePoint(map.latLngToLayerPoint(originalBounds.getNorthWest()), centerPoint, -rotation);
            const unrotatedOrigSize = rotatePoint(map.latLngToLayerPoint(originalBounds.getSouthEast()), centerPoint, -rotation).subtract(unrotatedOrigNwPt);
            
            if (unrotatedOrigSize.x === 0 || unrotatedOrigSize.y === 0) throw new Error("Η εικόνα έχει μηδενικές διαστάσεις.");

            const imageScaleX = intrinsicWidth / unrotatedOrigSize.x;
            const imageScaleY = intrinsicHeight / unrotatedOrigSize.y;

            const lassoImagePoints = points.map(p => {
                const unrotatedPoint = rotatePoint(map.latLngToLayerPoint(p), centerPoint, -rotation);
                const relativePoint = unrotatedPoint.subtract(unrotatedOrigNwPt);
                return new L.Point(relativePoint.x * imageScaleX, relativePoint.y * imageScaleY);
            });

            const lassoPixelBounds = L.bounds(lassoImagePoints);
            const imagePixelBounds = L.bounds(L.point(0, 0), L.point(intrinsicWidth, intrinsicHeight));

            const cropSourceRect = L.bounds(
                L.point(Math.max(imagePixelBounds.min.x, lassoPixelBounds.min.x), Math.max(imagePixelBounds.min.y, lassoPixelBounds.min.y)),
                L.point(Math.min(imagePixelBounds.max.x, lassoPixelBounds.max.x), Math.min(imagePixelBounds.max.y, lassoPixelBounds.max.y))
            );

            const sWidth = Math.floor(cropSourceRect.getSize().x);
            const sHeight = Math.floor(cropSourceRect.getSize().y);
            
            if (sWidth <= 0 || sHeight <= 0) throw new Error("Η επιλεγμένη περιοχή είναι εκτός των ορίων της εικόνας.");

            const canvas = document.createElement('canvas');
            canvas.width = sWidth;
            canvas.height = sHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Αποτυχία δημιουργίας context καμβά.");

            ctx.beginPath();
            ctx.moveTo(lassoImagePoints[0].x - cropSourceRect.min.x, lassoImagePoints[0].y - cropSourceRect.min.y);
            lassoImagePoints.forEach(p => ctx.lineTo(p.x - cropSourceRect.min.x, p.y - cropSourceRect.min.y));
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(image,
                cropSourceRect.min.x, cropSourceRect.min.y, sWidth, sHeight,
                0, 0, sWidth, sHeight
            );

            const newBlob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'));
            if (!newBlob) throw new Error("Αποτυχία δημιουργίας blob από τον καμβά.");
            
            onApply({
                data: await newBlob.arrayBuffer(),
                bounds: L.latLngBounds(points),
                intrinsicWidth: canvas.width,
                intrinsicHeight: canvas.height,
            });

        } catch (error) {
            console.error("Lasso crop failed:", error);
            alert(`Η περικοπή με λάσο απέτυχε: ${error instanceof Error ? error.message : 'Άγνωστο σφάλμα'}`);
        } finally {
            setIsProcessing(false);
            URL.revokeObjectURL(url);
        }
    }, [layer, points, map, onApply]);

    const handleReset = () => {
        setPoints([]);
        setIsFinished(false);
        setTempPoint(null);
        setIsHoveringClosePoint(false);
    };

    const { bounds: originalBounds, rotation = 0 } = layer;
    if (!originalBounds) return null;

    const center = originalBounds.getCenter();
    const centerPt = map.latLngToLayerPoint(center);
    const rotatedCorners = {
        nw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getNorthWest()), centerPt, rotation)),
        ne: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getNorthEast()), centerPt, rotation)),
        se: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getSouthEast()), centerPt, rotation)),
        sw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(originalBounds.getSouthWest()), centerPt, rotation))
    };

    const maskPositions = isFinished ? [
        [rotatedCorners.nw, rotatedCorners.ne, rotatedCorners.se, rotatedCorners.sw],
        [...points].reverse() // Inner hole
    ] : [[rotatedCorners.nw, rotatedCorners.ne, rotatedCorners.se, rotatedCorners.sw]];

    const linePoints = tempPoint ? [...points, tempPoint] : points;

    const controlsStyle: React.CSSProperties = controlsPosition ? {
        position: 'absolute',
        top: `${controlsPosition.y}px`,
        left: `${controlsPosition.x}px`,
        transform: 'translateX(-50%)',
        zIndex: 1002,
    } : { display: 'none' };
    
    return (
        <>
            <Pane name="lasso-tool" style={{ zIndex: 601 }}>
                <Polygon
                    positions={maskPositions as L.LatLngExpression[][]}
                    pathOptions={{
                        color: 'transparent',
                        fillColor: 'black',
                        fillOpacity: 0.6,
                        fillRule: 'evenodd'
                    }}
                />
                {linePoints.length > 0 && (
                    <Polyline
                        positions={isFinished ? [...points, points[0]] : linePoints}
                        pathOptions={{ color: '#007bff', weight: 2, dashArray: '5, 5' }}
                    />
                )}
                {points.map((p, i) => {
                    const isFirstPoint = i === 0;
                    const canClose = points.length >= 3;
                    const isHovering = isFirstPoint && canClose && !isFinished && isHoveringClosePoint;
                    
                    const eventHandlers = isFirstPoint && canClose && !isFinished ? {
                        click: (e: L.LeafletMouseEvent) => {
                            L.DomEvent.stop(e); // Prevent map click
                            handleFinishDrawing();
                        },
                    } : {};

                    return (
                        <CircleMarker
                            key={i}
                            center={p}
                            // FIX: Moved `radius` prop out of `pathOptions` to comply with react-leaflet's CircleMarkerProps type.
                            radius={isHovering ? 8 : 5}
                            pathOptions={{
                                color: isHovering ? '#28a745' : '#007bff',
                                fillColor: 'white',
                                fillOpacity: 1,
                                weight: 2
                            }}
                            eventHandlers={eventHandlers}
                        />
                    );
                })}
            </Pane>
            
            <div style={controlsStyle}>
                {isFinished ? (
                    <div className="flex items-center gap-2 bg-black/70 p-1 rounded-lg shadow-lg">
                        <button onClick={handleApply} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                            {isProcessing ? '...' : 'Εφαρμογή'}
                        </button>
                         <button onClick={handleReset} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 disabled:bg-yellow-400">
                            Επαναφορά
                        </button>
                        <button onClick={onCancel} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400">
                            Ακύρωση
                        </button>
                    </div>
                ) : (
                     <div className="bg-black/70 p-2 rounded-lg shadow-lg text-white text-sm text-center">
                        {points.length === 0
                            ? "Κάντε κλικ για να ξεκινήσετε το σχέδιο."
                            : "Κάντε κλικ για να προσθέσετε γωνίες."
                        }
                    </div>
                )}
            </div>
        </>
    );
};

export default LassoCropTool;