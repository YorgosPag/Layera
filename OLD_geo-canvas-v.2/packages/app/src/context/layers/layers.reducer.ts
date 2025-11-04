import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import { LayersAction } from './layers.actions';

export interface LayersState {
    layers: ImportedLayer[];
    movingLayerId: string | null;
    editingLayerId: string | null;
    layerToZoom: string | null;
    hasManuallyTransformed: boolean;
    tempEditingLayer: ImportedLayer | null;
    history: ImportedLayer[];
    historyIndex: number;
}

export const initialState: LayersState = {
    layers: [],
    movingLayerId: null,
    editingLayerId: null,
    layerToZoom: null,
    hasManuallyTransformed: false,
    tempEditingLayer: null,
    history: [],
    historyIndex: -1,
};

export const layersReducer = (state: LayersState, action: LayersAction): LayersState => {
    switch (action.type) {
        case 'SET_LAYERS':
            return { ...state, layers: action.payload };
        
        case 'ADD_LAYER':
            return { ...state, layers: [...state.layers, action.payload] };

        case 'REMOVE_LAYER':
            return {
                ...state,
                layers: state.layers.filter(l => l.id !== action.payload),
                ...(state.editingLayerId === action.payload && { 
                    editingLayerId: null, 
                    tempEditingLayer: null,
                    history: [],
                    historyIndex: -1,
                }),
            };

        case 'UPDATE_LAYER':
            return {
                ...state,
                layers: state.layers.map(l => l.id === action.payload.id ? { ...l, ...action.payload.updates } : l),
            };
        
        case 'REORDER_LAYERS':
            return { ...state, layers: action.payload };

        case 'SET_MOVING_LAYER_ID':
            return { ...state, movingLayerId: action.payload };
        
        case 'SET_LAYER_TO_ZOOM':
            return { ...state, layerToZoom: action.payload };

        case 'START_EDITING':
            return {
                ...state,
                editingLayerId: action.payload.id,
                layerToZoom: action.payload.id,
                hasManuallyTransformed: false,
                tempEditingLayer: action.payload,
                history: [action.payload],
                historyIndex: 0,
            };

        case 'STOP_EDITING': {
            const { save } = action.payload;
            const layers = (save && state.tempEditingLayer)
                ? state.layers.map(l => l.id === state.tempEditingLayer!.id ? state.tempEditingLayer : l)
                : state.layers;
            return {
                ...state,
                layers,
                editingLayerId: null,
                tempEditingLayer: null,
                history: [],
                historyIndex: -1,
            };
        }

        case 'UPDATE_TEMP_LAYER': {
            if (!state.tempEditingLayer) return state;
            const newTempLayer = { ...state.tempEditingLayer, ...action.payload.updates };
            
            return {
                ...state,
                tempEditingLayer: newTempLayer,
                hasManuallyTransformed: true, // Any temp update from the overlay/toolbar is a manual transform
            };
        }
        
        case 'APPLY_SCALE_UPDATE': {
            if (!state.tempEditingLayer) return state;
            const newTempLayer = { ...state.tempEditingLayer, bounds: action.payload.newBounds };
            
            return {
                ...state,
                tempEditingLayer: newTempLayer,
                hasManuallyTransformed: false,
            };
        }

        case 'FINALIZE_LAYER_CHANGES': {
            if (!state.tempEditingLayer) return state;

            // Truncate history if we've undone and are now making a new change
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(state.tempEditingLayer);

            return {
                ...state,
                history: newHistory,
                historyIndex: newHistory.length - 1,
            };
        }

        case 'UNDO': {
            if (state.historyIndex > 0) {
                const newIndex = state.historyIndex - 1;
                return {
                    ...state,
                    historyIndex: newIndex,
                    tempEditingLayer: state.history[newIndex],
                    hasManuallyTransformed: true, // Undoing is a manual transform
                };
            }
            return state;
        }

        case 'REDO': {
            if (state.historyIndex < state.history.length - 1) {
                const newIndex = state.historyIndex + 1;
                return {
                    ...state,
                    historyIndex: newIndex,
                    tempEditingLayer: state.history[newIndex],
                    hasManuallyTransformed: true, // Redoing is a manual transform
                };
            }
            return state;
        }

        default:
            return state;
    }
};