import { useReducer, useEffect, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { layersReducer, initialState } from './layers.reducer';
import * as ThunkActions from './layers.actions';
import * as Repository from './services/repository';
import * as LayerBuilder from './services/layer-builder';
import { boundsFromMeters } from './services/geo-math';
import { ImportedLayer } from '@geo-platform/shared';

/**
 * Custom hook to manage all layer-related state and actions.
 * This hook encapsulates the reducer, async actions, and side effects.
 */
export const useLayers = () => {
    const [state, dispatch] = useReducer(layersReducer, initialState);

    // Effect to load initial data from the server on mount
    useEffect(() => {
        const load = async () => {
            const layers = await Repository.fetchInitialLayers();
            dispatch(ThunkActions.setLayers(layers));
        };
        load();
    }, []);

    // --- Async Actions (Thunks) ---
    const addLayer = useCallback(async (file: File, center: L.LatLng) => {
        const buffer = await file.arrayBuffer();
        const newLayer = await LayerBuilder.buildLayerFromFile(file, buffer, center);
        dispatch(ThunkActions.addLayer(newLayer));
        return newLayer;
    }, []);
    
    const applyScale = useCallback((conversionFactor: number) => {
        const { tempEditingLayer, hasManuallyTransformed } = state;
        if (!tempEditingLayer || !tempEditingLayer.bounds || !tempEditingLayer.intrinsicWidth || !tempEditingLayer.intrinsicHeight || tempEditingLayer.intrinsicHeight === 0) return;

        if (hasManuallyTransformed) {
            if (!window.confirm("Αυτό θα αναιρέσει τις χειροκίνητες προσαρμογές σας. Είστε σίγουροι;")) {
                return;
            }
        }
    
        const { intrinsicWidth, intrinsicHeight, bounds } = tempEditingLayer;
        const center = bounds.getCenter();
        const widthMeters = intrinsicWidth * conversionFactor;
        const heightMeters = intrinsicHeight * conversionFactor;
        const newBounds = boundsFromMeters(center, widthMeters, heightMeters);
    
        dispatch(ThunkActions.applyScaleUpdate(newBounds));
    }, [state.tempEditingLayer, state.hasManuallyTransformed]);

    const scaleLayerByFactor = useCallback((factor: number) => {
        const { tempEditingLayer } = state;
        if (!tempEditingLayer || !tempEditingLayer.bounds) return;

        const center = tempEditingLayer.bounds.getCenter();
        const widthMeters = tempEditingLayer.bounds.getNorthWest().distanceTo(tempEditingLayer.bounds.getNorthEast());
        const heightMeters = tempEditingLayer.bounds.getNorthWest().distanceTo(tempEditingLayer.bounds.getSouthWest());
        const newWidthMeters = widthMeters * factor;
        const newHeightMeters = heightMeters * factor;
        const newBounds = boundsFromMeters(center, newWidthMeters, newHeightMeters);
        dispatch(ThunkActions.updateTempLayer({ bounds: newBounds }));
    }, [state.tempEditingLayer]);


    // --- Memoized Sync Actions ---
    const addConstructedLayer = useCallback((layer: ImportedLayer) => dispatch(ThunkActions.addLayer(layer)), []);
    const removeLayer = useCallback((id: string, skipConfirm = false) => {
        if (skipConfirm || window.confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά αυτή την καταχώρηση; Θα αφαιρεθεί από τον χάρτη και τον πίνακα ελέγχου. Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.')) {
            dispatch(ThunkActions.removeLayer(id));
        }
    }, []);
    const updateLayer = useCallback((id: string, updates: Partial<ImportedLayer>) => dispatch(ThunkActions.updateLayer(id, updates)), []);
    const reorderLayers = useCallback((layers: ImportedLayer[]) => dispatch(ThunkActions.reorderLayers(layers)), []);
    const toggleVisibility = useCallback((id: string) => {
        const layer = state.layers.find(l => l.id === id);
        if (layer) dispatch(ThunkActions.updateLayer(id, { isVisible: !layer.isVisible }));
    }, [state.layers]);
    const updateOpacity = useCallback((id: string, opacity: number) => dispatch(ThunkActions.updateLayer(id, { opacity })), []);
    const toggleLayerBackground = useCallback((id: string) => {
        const layer = state.layers.find(l => l.id === id);
        if (layer) dispatch(ThunkActions.updateLayer(id, { hasBackground: !layer.hasBackground }));
    }, [state.layers]);
    const setMovingLayerId = useCallback((id: string | null) => dispatch(ThunkActions.setMovingLayerId(id)), []);
    const zoomToLayer = useCallback((id: string | null) => dispatch(ThunkActions.setLayerToZoom(id)), []);
    const startEditing = useCallback((layer: ImportedLayer) => dispatch(ThunkActions.startEditing(layer)), []);
    const stopEditing = useCallback((save: boolean) => dispatch(ThunkActions.stopEditing(save)), []);
    const updateEditingLayerBounds = useCallback((bounds: L.LatLngBounds) => dispatch(ThunkActions.updateTempLayer({ bounds })), []);
    const updateEditingLayerRotation = useCallback((rotation: number) => dispatch(ThunkActions.updateTempLayer({ rotation })), []);
    const updateTempLayer = useCallback((updates: Partial<ImportedLayer>) => dispatch(ThunkActions.updateTempLayer(updates)), []);
    const finalizeLayerChanges = useCallback(() => dispatch(ThunkActions.finalizeLayerChanges()), []);
    const undo = useCallback(() => dispatch(ThunkActions.undo()), []);
    const redo = useCallback(() => dispatch(ThunkActions.redo()), []);

    const actions = useMemo(() => ({
        addLayer,
        addConstructedLayer,
        removeLayer,
        updateLayer,
        reorderLayers,
        toggleVisibility,
        updateOpacity,
        setMovingLayerId,
        zoomToLayer,
        toggleLayerBackground,
        startEditing,
        stopEditing,
        updateEditingLayerBounds,
        updateEditingLayerRotation,
        updateTempLayer,
        finalizeLayerChanges,
        applyScale,
        scaleLayerByFactor,
        undo,
        redo,
    }), [addLayer, addConstructedLayer, removeLayer, updateLayer, reorderLayers, toggleVisibility, updateOpacity, setMovingLayerId, zoomToLayer, toggleLayerBackground, startEditing, stopEditing, updateEditingLayerBounds, updateEditingLayerRotation, updateTempLayer, finalizeLayerChanges, applyScale, scaleLayerByFactor, undo, redo]);

    return { state, actions };
};