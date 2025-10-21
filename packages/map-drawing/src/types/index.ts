import L from 'leaflet';
import type { DrawnArea } from '@layera/map-core';

export type { DrawnArea } from '@layera/map-core';

export type DrawingMode = 'none' | 'polygon' | 'marker';

export interface DrawingState {
  activeMode: DrawingMode;
  currentPolygon: L.Layer | null;
  polygonPoints: number[][];
  drawnAreas: DrawnArea[];
}

export interface DrawingTool {
  id: string;
  name: string;
  mode: DrawingMode;
  icon: React.ComponentType;
  isActive: boolean;
}

export interface DrawingEventHandlers {
  onAreaCreated?: (area: DrawnArea) => void;
  onAreaDeleted?: (areaId: string) => void;
  onModeChanged?: (mode: DrawingMode) => void;
}

export interface DrawingServiceConfig {
  enablePolygon?: boolean;
  enableMarker?: boolean;
  defaultCategory?: 'real_estate' | 'jobs';
}