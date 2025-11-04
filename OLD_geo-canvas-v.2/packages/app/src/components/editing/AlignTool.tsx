import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMap, Pane, Marker, Polyline, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { rotatePoint } from '../../context/layers/services/geo-math';

const sourceIcon = new L.DivIcon({ className: 'leaflet-editing-icon' });
const destIcon = new L.DivIcon({ className: 'leaflet-rotate-corner-icon' });

type AlignStep = 'selectSource1' | 'selectDest1' | 'selectSource2' | 'selectDest2' | 'selectSource3' | 'selectDest3' | 'ready' | 'error';
type CornerKey = 'nw' | 'ne' | 'se' | 'sw';

interface AlignToolProps {
    onApply: (bounds: L.LatLngBounds, rotation: number) => void;
    onCancel: () => void;
    points: 2 | 3;
}

const AlignTool: React.FC<AlignToolProps> = ({ onApply, onCancel, points }) => {
    const map = useMap();
    const { tempEditingLayer } = useLayersContext();

    const [step, setStep] = useState<AlignStep>('selectSource1');
    const [sourcePoints, setSourcePoints] = useState<{ key: CornerKey, latlng: L.LatLng }[]>([]);
    const [destPoints, setDestPoints] = useState<L.LatLng[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const { originalCorners, originalUnrotatedCorners } = useMemo(() => {
        if (!tempEditingLayer?.bounds) return { originalCorners: null, originalUnrotatedCorners: null };
        const { bounds, rotation = 0 } = tempEditingLayer;
        const centerPt = map.latLngToLayerPoint(bounds.getCenter());
        const corners = {
            nw: bounds.getNorthWest(), ne: bounds.getNorthEast(),
            se: bounds.getSouthEast(), sw: bounds.getSouthWest(),
        };
        const rotated = {
            nw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.nw), centerPt, rotation)),
            ne: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.ne), centerPt, rotation)),
            se: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.se), centerPt, rotation)),
            sw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.sw), centerPt, rotation)),
        };
        return { originalCorners: rotated, originalUnrotatedCorners: corners };
    }, [tempEditingLayer, map]);

    const handleSourceClick = (e: L.LeafletMouseEvent, key: CornerKey, latlng: L.LatLng) => {
        L.DomEvent.stopPropagation(e);
        if (step !== `selectSource${sourcePoints.length + 1}`) return;
        setSourcePoints(prev => [...prev, { key, latlng }]);
        setStep(`selectDest${sourcePoints.length + 1}` as AlignStep);
    };

    const handleMapClick = (e: L.LeafletMouseEvent) => {
        const requiredDestPoints = destPoints.length + 1;
        if (step !== `selectDest${requiredDestPoints}`) return;

        setDestPoints(prev => [...prev, e.latlng]);
        if (requiredDestPoints === points) {
            setStep('ready');
        } else {
            setStep(`selectSource${requiredDestPoints + 1}` as AlignStep);
        }
    };
    
    useMapEvents({
        click: handleMapClick,
    });

    useEffect(() => {
        const mapContainer = map.getContainer();
        mapContainer.style.cursor = step.startsWith('selectDest') ? 'crosshair' : '';
        return () => { mapContainer.style.cursor = ''; };
    }, [step, map]);

    const handleReset = () => {
        setStep('selectSource1');
        setSourcePoints([]);
        setDestPoints([]);
    };

    const handleApplyTransform = useCallback(() => {
        if (!tempEditingLayer?.bounds || sourcePoints.length !== points || destPoints.length !== points || !originalUnrotatedCorners) {
            setStep('error');
            return;
        }
        setIsProcessing(true);

        const srcUnrotated = sourcePoints.map(p => map.latLngToLayerPoint(originalUnrotatedCorners[p.key]));
        const dst = destPoints.map(p => map.latLngToLayerPoint(p));
        
        let a: number, b: number, tx: number, ty: number;

        if (points === 2) {
            const [s1, s2] = srcUnrotated;
            const [d1, d2] = dst;
            const delta_sx = s2.x - s1.x;
            const delta_sy = s2.y - s1.y;
            const delta_dx = d2.x - d1.x;
            const delta_dy = d2.y - d1.y;

            const S_sq = delta_sx * delta_sx + delta_sy * delta_sy;
            if (Math.abs(S_sq) < 1e-9) {
                setStep('error');
                setIsProcessing(false);
                return;
            }
            a = (delta_dx * delta_sx + delta_dy * delta_sy) / S_sq;
            b = (delta_dy * delta_sx - delta_dx * delta_sy) / S_sq;
            tx = d1.x - (a * s1.x - b * s1.y);
            ty = d1.y - (b * s1.x + a * s1.y);
        } else { // points === 3
            const srcCentroid = srcUnrotated.reduce((acc, p) => acc.add(p), L.point(0, 0)).divideBy(3);
            const dstCentroid = dst.reduce((acc, p) => acc.add(p), L.point(0, 0)).divideBy(3);
            const srcCentered = srcUnrotated.map(p => p.subtract(srcCentroid));
            const dstCentered = dst.map(p => p.subtract(dstCentroid));

            let C1 = 0, C2 = 0, S = 0;
            for (let i = 0; i < 3; i++) {
                C1 += srcCentered[i].x * dstCentered[i].x + srcCentered[i].y * dstCentered[i].y;
                C2 += srcCentered[i].x * dstCentered[i].y - srcCentered[i].y * dstCentered[i].x;
                S += srcCentered[i].x * srcCentered[i].x + srcCentered[i].y * srcCentered[i].y;
            }
            if (Math.abs(S) < 1e-9) {
                setStep('error');
                setIsProcessing(false);
                return;
            }
            a = C1 / S;
            b = C2 / S;
            tx = dstCentroid.x - (a * srcCentroid.x - b * srcCentroid.y);
            ty = dstCentroid.y - (b * srcCentroid.x + a * srcCentroid.y);
        }
        
        const transformFn = (p: L.Point) => L.point(
            a * p.x - b * p.y + tx,
            b * p.x + a * p.y + ty
        );

        const unrotatedPts = {
            nw: map.latLngToLayerPoint(originalUnrotatedCorners.nw),
            ne: map.latLngToLayerPoint(originalUnrotatedCorners.ne),
            se: map.latLngToLayerPoint(originalUnrotatedCorners.se),
            sw: map.latLngToLayerPoint(originalUnrotatedCorners.sw),
        };

        const newPts = {
            nw: transformFn(unrotatedPts.nw),
            ne: transformFn(unrotatedPts.ne),
            se: transformFn(unrotatedPts.se),
            sw: transformFn(unrotatedPts.sw),
        };
        
        const newLatLngs = {
            nw: map.layerPointToLatLng(newPts.nw),
            ne: map.layerPointToLatLng(newPts.ne),
            se: map.layerPointToLatLng(newPts.se),
            sw: map.layerPointToLatLng(newPts.sw),
        };
        const newCenterLatLng = L.latLngBounds(Object.values(newLatLngs)).getCenter();

        const newRotationRad = Math.atan2(newPts.ne.y - newPts.nw.y, newPts.ne.x - newPts.nw.x);
        const newRotationDeg = newRotationRad * (180 / Math.PI);
        
        const scale = Math.sqrt(a * a + b * b);
        const originalBounds = tempEditingLayer.bounds!;
        
        const originalWidthDegrees = originalBounds.getEast() - originalBounds.getWest();
        const originalHeightDegrees = originalBounds.getNorth() - originalBounds.getSouth();
        const newWidthDegrees = originalWidthDegrees * scale;
        const newHeightDegrees = originalHeightDegrees * scale;

        const newUnrotatedBounds = L.latLngBounds(
            [newCenterLatLng.lat - newHeightDegrees / 2, newCenterLatLng.lng - newWidthDegrees / 2],
            [newCenterLatLng.lat + newHeightDegrees / 2, newCenterLatLng.lng + newWidthDegrees / 2]
        );

        onApply(newUnrotatedBounds, newRotationDeg);
        setIsProcessing(false);

    }, [tempEditingLayer, sourcePoints, destPoints, map, onApply, originalUnrotatedCorners, points]);

    const instruction = {
        'selectSource1': `1/${points}: Επιλέξτε το πρώτο σημείο αναφοράς στην κάτοψη.`,
        'selectDest1': `1/${points}: Τώρα, επιλέξτε το αντίστοιχο σημείο στον χάρτη.`,
        'selectSource2': `2/${points}: Επιλέξτε το δεύτερο σημείο αναφοράς στην κάτοψη.`,
        'selectDest2': `2/${points}: Τώρα, επιλέξτε το αντίστοιχο σημείο στον χάρτη.`,
        'selectSource3': `3/${points}: Επιλέξτε το τρίτο σημείο αναφοράς στην κάτοψη.`,
        'selectDest3': `3/${points}: Τώρα, επιλέξτε το αντίστοιχο σημείο στον χάρτη.`,
        'ready': 'Πατήστε "Εφαρμογή" για να προσαρμόσετε την κάτοψη.',
        'error': 'Σφάλμα: Τα σημεία αναφοράς είναι συνευθειακά. Παρακαλώ επιλέξτε ξανά.',
    }[step];

    return (
        <>
            <Pane name="align-tool-pane" style={{ zIndex: 610 }}>
                {originalCorners && Object.entries(originalCorners).map(([key, latlng]) => (
                    <Marker
                        key={key}
                        position={latlng}
                        icon={sourceIcon}
                        eventHandlers={{ click: (e) => handleSourceClick(e, key as CornerKey, latlng) }}
                    >
                        <Tooltip permanent direction="center" className="rotation-label-tooltip">
                            {sourcePoints.findIndex(p => p.key === key) + 1 || ''}
                        </Tooltip>
                    </Marker>
                ))}
                {destPoints.map((latlng, i) => (
                    <Marker key={`dest-${i}`} position={latlng} icon={destIcon}>
                         <Tooltip permanent direction="center" className="rotation-label-tooltip">
                            {i + 1}
                        </Tooltip>
                    </Marker>
                ))}
                {sourcePoints.map((sp, i) => {
                    const dp = destPoints[i];
                    if (!dp) return null;
                    return <Polyline key={`line-${i}`} positions={[sp.latlng, dp]} pathOptions={{ color: '#f97316', weight: 2, dashArray: '5,5' }} />;
                })}
            </Pane>

            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1002] bg-black/70 p-2 rounded-lg shadow-lg text-white text-sm text-center animate-fade-in-down w-auto max-w-sm">
                <p>{instruction}</p>
            </div>
            
             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1002] flex items-center gap-2 bg-black/70 p-1 rounded-lg shadow-lg">
                <button onClick={onCancel} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 disabled:bg-gray-400">
                    Ακύρωση
                </button>
                 <button onClick={handleReset} disabled={isProcessing} className="px-3 py-1 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 disabled:bg-yellow-400">
                    Επαναφορά
                </button>
                <button onClick={handleApplyTransform} disabled={isProcessing || step !== 'ready'} className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                    {isProcessing ? '...' : 'Εφαρμογή'}
                </button>
            </div>
        </>
    );
};

export default AlignTool;