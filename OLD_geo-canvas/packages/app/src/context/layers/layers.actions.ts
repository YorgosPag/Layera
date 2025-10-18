import { ImportedLayer } from '@geo-platform/shared';
import L from 'leaflet';

export type LayersAction =
  | { type: 'SET_LAYERS'; payload: ImportedLayer[] }
  | { type: 'ADD_LAYER'; payload: ImportedLayer }
  | { type: 'REMOVE_LAYER'; payload: string }
  | { type: 'UPDATE_LAYER'; payload: { id: string; updates: Partial<ImportedLayer> } }
  | { type: 'REORDER_LAYERS'; payload: ImportedLayer[] }
  | { type: 'SET_MOVING_LAYER_ID'; payload: string | null }
  | { type: 'SET_LAYER_TO_ZOOM'; payload: string | null }
  | { type: 'START_EDITING'; payload: ImportedLayer }
  | { type: 'STOP_EDITING'; payload: { save: boolean } }
  | { type: 'UPDATE_TEMP_LAYER'; payload: { updates: Partial<ImportedLayer>; manual?: boolean } };

export const setLayers = (layers: ImportedLayer[]): LayersAction => ({ type: 'SET_LAYERS', payload: layers });
export const addLayer = (layer: ImportedLayer): LayersAction => ({ type: 'ADD_LAYER', payload: layer });
export const removeLayer = (id: string): LayersAction => ({ type: 'REMOVE_LAYER', payload: id });
export const updateLayer = (id: string, updates: Partial<ImportedLayer>): LayersAction => ({ type: 'UPDATE_LAYER', payload: { id, updates } });
export const reorderLayers = (layers: ImportedLayer[]): LayersAction => ({ type: 'REORDER_LAYERS', payload: layers });
export const setMovingLayerId = (id: string | null): LayersAction => ({ type: 'SET_MOVING_LAYER_ID', payload: id });
export const setLayerToZoom = (id: string | null): LayersAction => ({ type: 'SET_LAYER_TO_ZOOM', payload: id });
export const startEditing = (layer: ImportedLayer): LayersAction => ({ type: 'START_EDITING', payload: layer });
export const stopEditing = (save: boolean): LayersAction => ({ type: 'STOP_EDITING', payload: { save } });
export const updateTempLayer = (updates: Partial<ImportedLayer>, manual?: boolean): LayersAction => ({ type: 'UPDATE_TEMP_LAYER', payload: { updates, manual } });
