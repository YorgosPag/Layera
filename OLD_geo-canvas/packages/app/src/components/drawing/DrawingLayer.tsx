import React, { useMemo, useState, memo } from 'react';
import { Polygon, Marker, CircleMarker, Polyline, useMap, Circle, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { DrawingShape } from '@geo-platform/shared';
import { formatDistance, calculateProjectedArea, formatArea } from '../utils/measurementUtils';
// FIX: Replaced deprecated useAppContext with useUiContext as AppContext is obsolete.
import { useUiContext } from '../../context/UiContext';

interface DrawingLayerProps {
    points: L.LatLng[];
    shape: DrawingShape | null;
    radius: number | null;
    isFinished: boolean;
}

// A small, memoized component to handle high-frequency mouse move events
// without causing the main component to re-render constantly.
const MouseMoveHandler: React.FC<{ onMouseMove: (latlng: L.LatLng) => void }> = memo(({ onMouseMove }) => {
    useMapEvents({
        mousemove(e) {
            onMouseMove(e.latlng);
        },
    });
    return null;
});

const DrawingLayer: React.FC<DrawingLayerProps> = ({ points, shape, radius, isFinished }) => {
    const map = useMap();
    const { actions } = useUiContext();
    const [tempPoint, setTempPoint] = useState<L.LatLng | null>(null);
    const [isHoveringClosePoint, setIsHoveringClosePoint] = useState(false);

    // Effect to change cursor style based on drawing state
    React.useEffect(() => {
        const mapContainer = map.getContainer();
        if (shape && !isFinished) {
            mapContainer.style.cursor = 'crosshair';
        } else {
            mapContainer.style.cursor = '';
        }
        return () => { mapContainer.style.cursor = ''; };
    }, [map, shape, isFinished]);

    const area = useMemo(() => {
        if (isFinished && shape === 'polygon' && points.length > 2) {
            return calculateProjectedArea(points);
        }
        return 0;
    }, [isFinished, shape, points]);
    
    const polygonCenter = useMemo(() => {
        if (area > 0) {
            return new L.Polygon(points).getBounds().getCenter();
        }
        return null;
    }, [area, points]);

    const linePoints = !isFinished && tempPoint ? [...points, tempPoint] : points;

    const renderContent = () => {
        if (!shape) return null;

        const drawingStyle = { color: '#f97316', weight: 3 };
        const finishedStyle = { ...drawingStyle, fillColor: '#fdba74', fillOpacity: 0.5 };
        const basePointStyle = { color: '#f97316', fillColor: 'white', fillOpacity: 1, radius: 5, weight: 2 };
        const closePointHoverStyle = { ...basePointStyle, color: '#16a34a', fillColor: '#dcfce7', radius: 8 };
        const radiusStyle = { color: '#f97316', weight: 2, fillColor: '#fdba74', fillOpacity: 0.2, dashArray: '5, 5' };
        const invisibleMarkerOpts = { opacity: 0, fillOpacity: 0, interactive: false };


        if (shape === 'marker' && points.length > 0) {
            const markerCenter = points[0];
            const circleArea = (isFinished && radius) ? Math.PI * Math.pow(radius, 2) : 0;

            return (
                <>
                    <Marker position={markerCenter} />
                    {isFinished && radius && <Circle center={markerCenter} radius={radius} pathOptions={radiusStyle} />}
                    {isFinished && circleArea > 0 && (
                        <CircleMarker center={markerCenter} radius={0} pathOptions={invisibleMarkerOpts}>
                            <Tooltip permanent direction="center" offset={[0, 0]} className="drawing-label area-label" opacity={1}>
                                {formatArea(circleArea)}
                            </Tooltip>
                        </CircleMarker>
                    )}
                </>
            );
        }

        if (shape === 'polygon') {
            const canClose = points.length >= 3;
            return (
                <>
                    {!isFinished && <MouseMoveHandler onMouseMove={setTempPoint} />}
                    {isFinished && points.length > 2 && <Polygon positions={points} pathOptions={finishedStyle} />}
                    {linePoints.length > 1 && <Polyline positions={linePoints} pathOptions={drawingStyle} />}
                    
                    {points.map((p, i) => {
                        const isFirstPoint = i === 0;
                        const isHovering = isFirstPoint && canClose && !isFinished && isHoveringClosePoint;
                        const eventHandlers = isFirstPoint && canClose && !isFinished ? {
                            click: (e: L.LeafletMouseEvent) => {
                                L.DomEvent.stop(e);
                                actions.finishDrawing();
                            },
                            mouseover: () => setIsHoveringClosePoint(true),
                            mouseout: () => setIsHoveringClosePoint(false),
                        } : {};

                        return <CircleMarker key={i} center={p} pathOptions={isHovering ? closePointHoverStyle : basePointStyle} eventHandlers={eventHandlers} />;
                    })}

                    {points.map((p, i) => {
                        if (i === 0) return null;
                        const p1 = points[i - 1];
                        const p2 = points[i];
                        const midPoint = L.latLng((p1.lat + p2.lat) / 2, (p1.lng + p2.lng) / 2);
                        return (
                             <CircleMarker key={`dist-marker-${i}`} center={midPoint} radius={0} pathOptions={invisibleMarkerOpts}>
                                <Tooltip permanent direction="center" offset={[0, 0]} className="drawing-label" opacity={1}>
                                    {formatDistance(p1.distanceTo(p2), 2)}
                                </Tooltip>
                            </CircleMarker>
                        );
                    })}
                    
                    {!isFinished && tempPoint && points.length > 0 && (() => {
                        const lastPoint = points[points.length - 1];
                        const midPoint = L.latLng((lastPoint.lat + tempPoint.lat) / 2, (lastPoint.lng + tempPoint.lng) / 2);
                        return (
                            <CircleMarker center={midPoint} radius={0} pathOptions={invisibleMarkerOpts}>
                                <Tooltip permanent direction="center" offset={[0, 0]} className="drawing-label" opacity={1}>
                                    {formatDistance(lastPoint.distanceTo(tempPoint), 2)}
                                </Tooltip>
                            </CircleMarker>
                        )
                    })()}

                    {isFinished && polygonCenter && area > 0 && (
                        <CircleMarker center={polygonCenter} radius={0} pathOptions={invisibleMarkerOpts}>
                            <Tooltip permanent direction="center" offset={[0, 0]} className="drawing-label area-label" opacity={1}>
                                {formatArea(area)}
                            </Tooltip>
                        </CircleMarker>
                    )}
                </>
            );
        }

        return null;
    };

    return <>{renderContent()}</>;
};

export default DrawingLayer;