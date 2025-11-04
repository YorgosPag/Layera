import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { ImportedLayer } from '@geo-platform/shared';
import { useLayers } from './useLayers';
import { LayersState } from './layers.reducer';

// --- Context Definition ---

// The actions are inferred from the return type of the useLayers hook
type LayersActions = ReturnType<typeof useLayers>['actions'];

interface LayersContextType extends LayersState {
    editingLayer: ImportedLayer | null;
    actions: LayersActions;
    canUndo: boolean;
    canRedo: boolean;
}

const LayersContext = createContext<LayersContextType | undefined>(undefined);

// --- Provider Implementation ---

export const LayersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { state, actions } = useLayers();

    // Derived state (selectors) can be computed here
    const editingLayer = useMemo(() => {
        return state.layers.find(l => l.id === state.editingLayerId) ?? null;
    }, [state.layers, state.editingLayerId]);

    const canUndo = state.historyIndex > 0;
    const canRedo = state.historyIndex < state.history.length - 1;

    const contextValue: LayersContextType = useMemo(() => ({
        ...state,
        editingLayer,
        actions,
        canUndo,
        canRedo,
    }), [state, actions, editingLayer, canUndo, canRedo]);

    return (
        <LayersContext.Provider value={contextValue}>
            {children}
        </LayersContext.Provider>
    );
};

// --- Hook for consuming context ---
export const useLayersContext = (): LayersContextType => {
    const context = useContext(LayersContext);
    if (context === undefined) {
        throw new Error('useLayersContext must be used within a LayersProvider');
    }
    return context;
};