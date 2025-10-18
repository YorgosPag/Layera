import React, { useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { Circle } from 'react-leaflet';
import { useAppContext } from '../../context/AppContext';
import MapWithRulers from '../map/MapWithRulers';
import ListingWizard from '../wizard/ListingWizard';
// import EditableOverlay from '../editing/EditableOverlay';
import LayerRenderer from '../renderers/LayerRenderer';
// import DrawingHandler from '../drawing/DrawingHandler';
// import DrawingLayer from '../drawing/DrawingLayer';

const MapView: React.FC = () => {
    const { 
        layers,
        layerToZoom,
        movingLayerId,
        searchedLocation,
        editingLayerId,
        tempEditingLayer,
        drawingState,
        wizardState,
        actions 
    } = useAppContext();
    const [map, setMap] = useState<L.Map | null>(null);

    const onZoomComplete = useCallback(() => {
        actions.zoomToLayer(null as any); 
    }, [actions]);

    const handleInteractionStart = useCallback(() => {
    }, []);

    const visibleLayers = layers.filter(l => l.isVisible && l.id !== editingLayerId);

    const proximityPreview = useMemo(() => {
        const { isActive, step, category, intent, details } = wizardState;
        const { isFinished, points, shape } = drawingState;

        if (isActive && step === 'location' && category === 'job' && intent === 'offer' && details.proximityPreference && isFinished && points.length > 0) {
            let center: L.LatLng;
            if (shape === 'marker') {
                center = points[0];
            } else if (shape === 'polygon' && points.length > 2) {
                center = L.polygon(points).getBounds().getCenter();
            } else {
                return null;
            }

            const radiusInMeters = (details.proximityRadius || 0) * 1000;
            if (radiusInMeters <= 0) return null;
            
            const pathOptions = { color: '#8b5cf6', weight: 2, dashArray: '10, 10', fillColor: '#c4b5fd', fillOpacity: 0.3 };

            return <Circle center={center} radius={radiusInMeters} pathOptions={pathOptions} />;
        }
        return null;
    }, [wizardState, drawingState]);


    return (
        <div className="w-full h-full">
            <MapWithRulers
                layers={visibleLayers}
                layerToZoom={layerToZoom}
                onZoomComplete={onZoomComplete}
                movingLayerId={movingLayerId}
                searchedLocation={searchedLocation}
                onSearchLocationViewed={actions.clearSearchedLocation}
                onMapReady={setMap}
            >
                {editingLayerId && tempEditingLayer && (
                    <>
                        <LayerRenderer
                            layer={tempEditingLayer}
                            layerToZoom={null}
                            onZoomComplete={() => {}}
                            movingLayerId={null}
                        />
                        {/* {tempEditingLayer.bounds && (
                            <EditableOverlay
                                bounds={tempEditingLayer.bounds}
                                onBoundsChange={actions.updateEditingLayerBounds}
                                rotation={tempEditingLayer.rotation ?? 0}
                                onRotationChange={actions.updateEditingLayerRotation}
                                onInteractionStart={handleInteractionStart}
                            />
                        )} */}
                    </>
                )}
                {/* {drawingState.isActive && (
                    <>
                        <DrawingHandler />
                        <DrawingLayer 
                            points={drawingState.points}
                            shape={drawingState.shape}
                            radius={drawingState.radius}
                            isFinished={drawingState.isFinished}
                        />
                    </>
                )} */}
                {proximityPreview}
            </MapWithRulers>
            <ListingWizard map={map} />
        </div>
    );
};

export default MapView;