import React, { useState, useCallback, useMemo, useEffect } from 'react';
import L from 'leaflet';
import { Circle, useMap, useMapEvents } from 'react-leaflet';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useUiContext } from '../../context/UiContext';
import MapWithRulers from '../map/MapWithRulers';
import ListingWizard from '../wizard/ListingWizard';
import EditorOverlays from '../editing/EditorOverlays';
import { ImportedLayer } from '@geo-platform/shared';
import DrawingLayer from '../drawing/DrawingLayer';
import FreehandDrawer from '../drawing/FreehandDrawer';

// Component to handle map clicks for the wizard's drawing tool
const DrawingClickHandler: React.FC = () => {
    const { drawingState, actions } = useUiContext();
    const map = useMap(); // Get map instance from Leaflet context

    useMapEvents({
        click(e) {
            // Only act if drawing is active and not yet finished
            if (drawingState.isActive && !drawingState.isFinished) {
                // Stop this click from propagating to other handlers (like layer selection)
                L.DomEvent.stopPropagation(e);

                const { points, shape } = drawingState;
                const canClose = shape === 'polygon' && points.length >= 3;

                // Check if the click is on/near the first point to close the polygon
                if (canClose) {
                    const firstPointPx = map.latLngToLayerPoint(points[0]);
                    const clickPx = map.latLngToLayerPoint(e.latlng);
                    
                    // Use a generous pixel threshold for easy clicking, especially on mobile
                    const closingThreshold = 20; 

                    if (clickPx.distanceTo(firstPointPx) < closingThreshold) {
                        actions.finishDrawing();
                        return; // Important: exit without adding a new point
                    }
                }

                // If not closing, add a new point to the drawing
                actions.addDrawingPoint(e.latlng);
            }
        },
    });

    return null; // This component does not render anything
};


const MapView: React.FC = () => {
    const { 
        layers,
        layerToZoom,
        movingLayerId,
        editingLayerId,
        actions: layersActions 
    } = useLayersContext();
    const {
        searchedLocation,
        drawingState,
        wizardState,
        isWizardHidingForDraw,
        actions: uiActions
    } = useUiContext();
    const [map, setMap] = useState<L.Map | null>(null);

    const onZoomComplete = useCallback(() => {
        layersActions.zoomToLayer(null); 
    }, [layersActions]);
    
    const handleLayerClick = useCallback((layer: ImportedLayer) => {
        // Prevent entering edit mode if the wizard is active for creating a new item
        // or if a drawing is in progress
        if ((wizardState.isActive && !editingLayerId) || drawingState.isActive) return;
        layersActions.startEditing(layer);
    }, [layersActions, wizardState.isActive, editingLayerId, drawingState.isActive]);

    // Effect to fix rendering issues on mobile when the wizard hides/shows for drawing.
    useEffect(() => {
        if (map) {
            // A short delay is needed to allow the CSS transitions to complete and the
            // DOM to reflow before Leaflet recalculates the map size.
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 300); // 300ms matches typical transition durations.

            return () => clearTimeout(timer);
        }
    }, [isWizardHidingForDraw, map]);
    
    // We filter out the layer being edited from the main render pass,
    // as the EditorOverlays component will render its temporary state.
    const visibleLayers = layers.filter(l => l.isVisible && l.id !== editingLayerId);

    // This logic is related to the creation wizard, not editing, so it stays here.
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
                onSearchLocationViewed={uiActions.clearSearchedLocation}
                onMapReady={setMap}
                onLayerClick={handleLayerClick}
            >
                {/* This component captures map clicks for drawing */}
                <DrawingClickHandler />
                
                {/* NEW: This component captures drag events for freehand drawing */}
                {drawingState.isActive && drawingState.shape === 'freehand' && <FreehandDrawer />}


                {/* This component renders the visual feedback for drawing */}
                {drawingState.isActive && (
                    <DrawingLayer
                        points={drawingState.points}
                        shape={drawingState.shape}
                        radius={drawingState.radius}
                        isFinished={drawingState.isFinished}
                    />
                )}
                
                {/* Render the new component which handles all editing overlays and hooks */}
                <EditorOverlays />
                
                {proximityPreview}
            </MapWithRulers>
            <ListingWizard map={map} />
        </div>
    );
};

export default MapView;