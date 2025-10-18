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
}

export const initialState: LayersState = {
    layers: [],
    movingLayerId: null,
    editingLayerId: null,
    layerToZoom: null,
    hasManuallyTransformed: false,
    tempEditingLayer: null,
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
                ...(state.editingLayerId === action.payload && { editingLayerId: null, tempEditingLayer: null }),
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
            };
        }

        case 'UPDATE_TEMP_LAYER':
            if (!state.tempEditingLayer) return state;
            return {
                ...state,
                tempEditingLayer: { ...state.tempEditingLayer, ...action.payload.updates },
                ...(action.payload.manual && { hasManuallyTransformed: true }),
            };

        default:
            return state;
    }
};
