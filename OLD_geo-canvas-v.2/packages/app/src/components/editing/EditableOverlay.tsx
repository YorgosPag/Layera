import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useMap, Pane, Polygon, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { SnapResult } from '../../hooks/useSnapping';
import { boundsFromMeters, rotatePoint } from '../../context/layers/services/geo-math';
import DimensionLabel from './DimensionLabel';

// Use the icons defined in index.html
const editingIcon = new L.DivIcon({ className: 'leaflet-editing-icon' });
const moveIcon = new L.DivIcon({ className: 'leaflet-move-icon' });
const rotateCornerIcon = new L.DivIcon({ className: 'leaflet-rotate-corner-icon' });
const pivotIcon = new L.DivIcon({ className: 'leaflet-pivot-handle-icon' });


type DragHandle = 'move' | 'nw' | 'ne' | 'se' | 'sw' | 'rotate' | 'pivot';
type Corners = { nw: L.LatLng, ne: L.LatLng, se: L.LatLng, sw: L.LatLng };

interface EditableOverlayProps {
    bounds: L.LatLngBounds;
    rotation: number;
    onBoundsChange: (bounds: L.LatLngBounds) => void;
    onRotationChange: (rotation: number) => void;
    onInteractionStart: () => void;
    onInteractionEnd: () => void;
    isAspectRatioLocked?: boolean;
    aspectRatio?: number;
    showCornerHandles?: boolean;
    showMove?: boolean;
    cornerFunction?: 'resize' | 'rotate';
    getSnappedPoint?: (latlng: L.LatLng) => SnapResult;
    showPivot?: boolean;
    pivot: L.LatLng | null;
    onPivotChange: (pivot: L.LatLng) => void;
    pivotGuideText?: string;
}

const EditableOverlay: React.FC<EditableOverlayProps> = ({
    bounds, rotation, onBoundsChange, onRotationChange, onInteractionStart, onInteractionEnd, isAspectRatioLocked, aspectRatio,
    showCornerHandles = true, showMove = true, cornerFunction = 'resize', getSnappedPoint,
    showPivot = false, pivot, onPivotChange, pivotGuideText = ''
}) => {
    const map = useMap();
    const [activeDrag, setActiveDrag] = useState<DragHandle | null>(null);
    const [isPivotHovered, setIsPivotHovered] = useState(false);
    const [showPivotGuide, setShowPivotGuide] = useState(false);
    const [snapIndicator, setSnapIndicator] = useState<L.LatLng | null>(null);
    
    // Use a ref to store all interaction-specific data to avoid stale closures
    const interactionRef = useRef<any>(null);
    const frameRef = useRef<number | null>(null);
    const paneRef = useRef<HTMLElement>(null);

    // Use a ref to store the latest props for use in event handlers
    const propsRef = useRef({ bounds, rotation, onBoundsChange, onRotationChange });
    propsRef.current = { bounds, rotation, onBoundsChange, onRotationChange };
    
    const onInteractionEndRef = useRef(onInteractionEnd);
    onInteractionEndRef.current = onInteractionEnd;

    // This effect initializes the pivot to the geometric center when the pivot becomes active.
    useEffect(() => {
        if (showPivot) {
            setShowPivotGuide(true);
            const timer = setTimeout(() => setShowPivotGuide(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [showPivot]);
    
    // Effect to toggle the move cursor class on the pane
    useEffect(() => {
        const paneEl = paneRef.current;
        if(paneEl && activeDrag === 'move') {
            paneEl.classList.add('leaflet-interactive-move-cursor');
        } else if (paneEl) {
            paneEl.classList.remove('leaflet-interactive-move-cursor');
        }
    }, [activeDrag]);


    // The geometric center of the bounds, used for the move handle
    const centerLatLng = useMemo(() => bounds.getCenter(), [bounds]);

    // Calculate rotated corners using a consistent rotation center.
    const rotatedCorners = useMemo(() => {
        // CRITICAL FIX: Always use the pivot if it exists, otherwise fall back to the geometric center.
        // The visibility of the pivot handle (showPivot) should not affect the rotation logic.
        const rotationCenter = pivot || bounds.getCenter();
        const rotationCenterPt = map.latLngToLayerPoint(rotationCenter);
        
        const corners: Corners = {
            nw: bounds.getNorthWest(),
            ne: bounds.getNorthEast(),
            se: bounds.getSouthEast(),
            sw: bounds.getSouthWest(),
        };

        const rotated: Corners = {
            nw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.nw), rotationCenterPt, rotation)),
            ne: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.ne), rotationCenterPt, rotation)),
            se: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.se), rotationCenterPt, rotation)),
            sw: map.layerPointToLatLng(rotatePoint(map.latLngToLayerPoint(corners.sw), rotationCenterPt, rotation)),
        };
        
        return rotated;
    }, [bounds, rotation, map, pivot]);

    // Effect to manage global pointer move/up listeners and perform updates
    useEffect(() => {
        if (!activeDrag) {
            return;
        }

        const handlePointerMove = (e: PointerEvent) => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            frameRef.current = requestAnimationFrame(() => {
                if (!interactionRef.current) return;
                
                L.DomEvent.stop(e);
                const containerPoint = map.mouseEventToContainerPoint(e as MouseEvent);
                const moveLatLng = map.containerPointToLatLng(containerPoint);

                const { snappedLatLng, snapPoint } = getSnappedPoint ? getSnappedPoint(moveLatLng) : { snappedLatLng: moveLatLng, snapPoint: null };
                setSnapIndicator(snapPoint);
                const currentPoint = map.latLngToLayerPoint(snappedLatLng);
                
                const { handle, startPoint, initialBounds, initialRotation, centerPoint, oppositeCorner, initialPivot } = interactionRef.current;
                const { onBoundsChange, onRotationChange } = propsRef.current;

                if (handle === 'pivot') {
                    let finalLatLng = snappedLatLng;
                    const PIVOT_SNAP_THRESHOLD_PX = 8;
                    const geometricCenter = initialBounds.getCenter();
                    const snapTargets = [
                        initialBounds.getNorthWest(), initialBounds.getNorthEast(),
                        initialBounds.getSouthEast(), initialBounds.getSouthWest(),
                        geometricCenter
                    ];
                    
                    let minSnapDistSq = Infinity;
                    let bestSnapLatLng: L.LatLng | null = null;
                    
                    for (const target of snapTargets) {
                        const distSq = currentPoint.distanceTo(map.latLngToLayerPoint(target));
                        if (distSq < minSnapDistSq) {
                            minSnapDistSq = distSq;
                            bestSnapLatLng = target;
                        }
                    }
                    
                    if (bestSnapLatLng && minSnapDistSq < PIVOT_SNAP_THRESHOLD_PX * PIVOT_SNAP_THRESHOLD_PX) {
                        finalLatLng = bestSnapLatLng;
                        setSnapIndicator(bestSnapLatLng);
                    } else {
                        setSnapIndicator(snapPoint);
                    }
                    onPivotChange(finalLatLng);
                    return;
                }

                if (handle === 'move') {
                    const delta = currentPoint.subtract(startPoint);
                    const newBounds = L.latLngBounds(
                        map.layerPointToLatLng(map.latLngToLayerPoint(initialBounds.getSouthWest()).add(delta)),
                        map.layerPointToLatLng(map.latLngToLayerPoint(initialBounds.getNorthEast()).add(delta))
                    );
                    onBoundsChange(newBounds);
                } else if (handle === 'rotate') {
                    const initialAngleRad = Math.atan2(startPoint.y - centerPoint.y, startPoint.x - centerPoint.x);
                    const currentAngleRad = Math.atan2(currentPoint.y - centerPoint.y, currentPoint.x - centerPoint.x);
                    const angleDeltaRad = currentAngleRad - initialAngleRad;
                    const angleDeltaDeg = angleDeltaRad * (180 / Math.PI);
                    const newRotation = initialRotation + angleDeltaDeg;

                    const initialCenterLatLng = initialBounds.getCenter();
                    const pivotLatLng = initialPivot;
                    const initialCenterPoint = map.latLngToLayerPoint(initialCenterLatLng);
                    const pivotPoint = map.latLngToLayerPoint(pivotLatLng);

                    const newCenterPoint = rotatePoint(initialCenterPoint, pivotPoint, angleDeltaDeg);
                    const newCenterLatLng = map.layerPointToLatLng(newCenterPoint);

                    const latOffset = newCenterLatLng.lat - initialCenterLatLng.lat;
                    const lngOffset = newCenterLatLng.lng - initialCenterLatLng.lng;
                    
                    const newBounds = L.latLngBounds(
                        L.latLng(initialBounds.getSouthWest().lat + latOffset, initialBounds.getSouthWest().lng + lngOffset),
                        L.latLng(initialBounds.getNorthEast().lat + latOffset, initialBounds.getNorthEast().lng + lngOffset)
                    );
                    
                    onRotationChange(newRotation);
                    onBoundsChange(newBounds);

                } else { // Resizing
                     if (showPivot) {
                        const initialPivotPoint = map.latLngToLayerPoint(initialPivot);
                        const initialCenterPoint = map.latLngToLayerPoint(initialBounds.getCenter());

                        const cornerKey = handle as 'nw' | 'ne' | 'se' | 'sw';
                        const cornerGetter = {nw: 'getNorthWest', ne: 'getNorthEast', se: 'getSouthEast', sw: 'getSouthWest'}[cornerKey];
                        const cornerLatLng = initialBounds[cornerGetter]();

                        const initialHandlePoint = map.latLngToLayerPoint(cornerLatLng);
                        const rotatedInitialHandlePoint = rotatePoint(initialHandlePoint, initialCenterPoint, initialRotation);
                        
                        const vecInitial = rotatedInitialHandlePoint.subtract(initialPivotPoint);
                        if (vecInitial.x === 0 && vecInitial.y === 0) return;

                        const vecCurrent = currentPoint.subtract(initialPivotPoint);
                        let scaleFactor = (vecCurrent.x * vecInitial.x + vecCurrent.y * vecInitial.y) / (vecInitial.x * vecInitial.x + vecInitial.y * vecInitial.y);

                        if (scaleFactor < 0.01) scaleFactor = 0.01;

                        const newCenterPoint = initialPivotPoint.add(initialCenterPoint.subtract(initialPivotPoint).multiplyBy(scaleFactor));
                        const newCenterLatLng = map.layerPointToLatLng(newCenterPoint);

                        const widthMeters = initialBounds.getNorthWest().distanceTo(initialBounds.getNorthEast());
                        const heightMeters = initialBounds.getNorthWest().distanceTo(initialBounds.getSouthWest());
                        const newWidthMeters = widthMeters * scaleFactor;
                        const newHeightMeters = heightMeters * scaleFactor;
                        
                        const newBounds = boundsFromMeters(newCenterLatLng, newWidthMeters, newHeightMeters);
                        onBoundsChange(newBounds);
                     } else {
                        const unrotatedCurrent = rotatePoint(currentPoint, centerPoint, -initialRotation);
                        const unrotatedOpposite = map.latLngToLayerPoint(oppositeCorner);
                        
                        let finalUnrotatedCurrent = unrotatedCurrent;
                        if (isAspectRatioLocked && aspectRatio && aspectRatio > 0) {
                            const delta = unrotatedCurrent.subtract(unrotatedOpposite);
                            const newWidth = Math.abs(delta.x);
                            let newHeight = newWidth / aspectRatio;
                            if (delta.y < 0) newHeight = -newHeight;
                            finalUnrotatedCurrent = new L.Point(unrotatedCurrent.x, unrotatedOpposite.y + newHeight);
                        }
                        
                        const newUnrotatedBounds = L.bounds(finalUnrotatedCurrent, unrotatedOpposite);
                        const finalBounds = L.latLngBounds(
                            map.layerPointToLatLng(newUnrotatedBounds.min),
                            map.layerPointToLatLng(newUnrotatedBounds.max)
                        );
                        onBoundsChange(finalBounds);
                    }
                }
                frameRef.current = null;
            });
        };

        const handlePointerUp = () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
            
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
            
            onInteractionEndRef.current();
            setActiveDrag(null);
            interactionRef.current = null;
            setSnapIndicator(null);
        };
        
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [activeDrag, map, getSnappedPoint, isAspectRatioLocked, aspectRatio, showPivot, onPivotChange]);

    const handleDragStart = useCallback((e: L.LeafletMouseEvent, handle: DragHandle) => {
        L.DomEvent.stop(e);
        onInteractionStart();

        const { bounds, rotation } = propsRef.current;
        const startPoint = map.latLngToLayerPoint(e.latlng);
        const corners: Corners = {
            nw: bounds.getNorthWest(), ne: bounds.getNorthEast(),
            se: bounds.getSouthEast(), sw: bounds.getSouthWest()
        };
        
        interactionRef.current = {
            handle,
            startPoint,
            initialBounds: bounds,
            initialRotation: rotation,
            initialPivot: pivot,
            centerPoint: handle === 'rotate' ? map.latLngToLayerPoint(pivot!) : map.latLngToLayerPoint(bounds.getCenter()),
            oppositeCorner: handle !== 'move' && handle !== 'rotate' && handle !== 'pivot' ? corners[{ nw: 'se', ne: 'sw', se: 'nw', sw: 'ne' }[handle]] : null,
        };

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        
        setActiveDrag(handle);
    }, [map, onInteractionStart, pivot]);


    return (
        <>
            <Pane name="editable-overlay" style={{ zIndex: 601 }} ref={paneRef} className={activeDrag === 'pivot' ? 'handles-dimmed' : ''}>
                {showMove && (
                    <Polygon
                        positions={[rotatedCorners.nw, rotatedCorners.ne, rotatedCorners.se, rotatedCorners.sw]}
                        pathOptions={{ color: '#007bff', weight: 2, fillOpacity: 0.05, dashArray: '5, 5' }}
                        eventHandlers={{ mousedown: (e) => handleDragStart(e, 'move') }}
                    />
                )}
                {showCornerHandles && Object.entries(rotatedCorners).map(([key, pos]) => {
                    const tooltipDirection = key === 'nw' || key === 'sw' ? 'left' : 'right';
                    const tooltipOffset: L.PointExpression = 
                        key === 'nw' ? [-15, -15] : key === 'ne' ? [15, -15] :
                        key === 'se' ? [15, 15] : [-15, 15]; // sw
                    const normalizedRotation = ((rotation % 360) + 360) % 360;
                    return (
                        <Marker
                            key={key}
                            position={pos}
                            icon={cornerFunction === 'rotate' ? rotateCornerIcon : editingIcon}
                            eventHandlers={{
                                mousedown: (e) => {
                                    handleDragStart(e, cornerFunction === 'rotate' ? 'rotate' : key as DragHandle);
                                },
                            }}
                        >
                            {cornerFunction === 'rotate' && (
                                <Tooltip permanent direction={tooltipDirection} offset={tooltipOffset} className="rotation-label-tooltip" opacity={1}>
                                    {`${normalizedRotation.toFixed(1)}°`}
                                </Tooltip>
                            )}
                        </Marker>
                    );
                })}
                {showMove && cornerFunction !== 'rotate' && (
                    <Marker
                        position={centerLatLng}
                        icon={moveIcon}
                        eventHandlers={{ mousedown: (e) => handleDragStart(e, 'move') }}
                    />
                 )}
            </Pane>
            
            {showPivot && pivot && (
                <Pane name="editable-pivot-pane" style={{ zIndex: 652 }}>
                    <Marker
                        position={pivot}
                        icon={new L.DivIcon({ className: `leaflet-pivot-handle-icon ${activeDrag === 'pivot' ? 'leaflet-pivot-handle-icon-active' : ''} ${isPivotHovered ? 'leaflet-pivot-handle-icon-hovered' : ''}` })}
                        eventHandlers={{
                            mousedown: (e) => handleDragStart(e, 'pivot'),
                            mouseover: () => setIsPivotHovered(true),
                            mouseout: () => setIsPivotHovered(false),
                        }}
                    />
                </Pane>
            )}

            {showPivotGuide && pivotGuideText && pivot && (
                <Pane name="pivot-guide-pane" style={{ zIndex: 651, pointerEvents: 'none' }}>
                    <Marker position={pivot} icon={new L.DivIcon({ className: '' })}>
                        <Tooltip permanent direction="top" offset={[0, -20]} className="rotation-label-tooltip" opacity={1}>
                           {pivotGuideText}
                        </Tooltip>
                    </Marker>
                </Pane>
            )}

            {snapIndicator && (
                 <Pane name="snap-indicator-pane" style={{ zIndex: 650, pointerEvents: 'none' }}>
                     <Marker 
                        position={snapIndicator} 
                        icon={new L.DivIcon({ className: 'snap-vertex-icon', html: 'X' })}
                        interactive={false}
                    />
                </Pane>
            )}
            {showCornerHandles && (
                <Pane name="editable-overlay-labels" style={{ zIndex: 601, pointerEvents: 'none' }}>
                    <DimensionLabel point1={rotatedCorners.nw} point2={rotatedCorners.ne} />
                    <DimensionLabel point1={rotatedCorners.ne} point2={rotatedCorners.se} />
                    <DimensionLabel point1={rotatedCorners.se} point2={rotatedCorners.sw} />
                    <DimensionLabel point1={rotatedCorners.sw} point2={rotatedCorners.nw} />
                </Pane>
            )}
        </>
    );
};

export default EditableOverlay;