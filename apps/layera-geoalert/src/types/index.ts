// Layera GeoAlert V1 - Enterprise Type Definitions
// Inspired by geo-canvas(8) patterns but simplified για GeoAlert needs

import L from 'leaflet';
import type { PropertyType } from './components/steps/propertyType/types';

// Core Drawing Types (από geo-canvas reference)
export type DrawingShape = 'polygon' | 'marker' | 'circle';
export type AlertType = 'property_search'; // V1 μόνο property search

// GeoAlert Area Interface (Firestore schema)
export interface GeoAlertArea {
  id: string;
  name: string;
  alertType: AlertType;
  geometry: {
    type: DrawingShape;
    coordinates: number[]; // [lat, lng] ή array για polygon
    radius?: number; // για circles/markers σε meters
  };
  filters: {
    priceMin?: number;
    priceMax?: number;
    propertyType?: PropertyType;
    bedrooms?: number;
  };
  active: boolean;
  createdAt: string; // ISO date
  userId: string;
}

// Drawing State Interface (απλοποιημένη από geo-canvas)
export interface DrawingState {
  isActive: boolean;
  isFinished: boolean;
  shape: DrawingShape | null;
  points: L.LatLng[];
  radius: number | null; // σε meters
}

// Map Configuration
export interface MapConfig {
  center: [number, number]; // [lat, lng]
  zoom: number;
  maxZoom: number;
  defaultRadius: number; // για markers
}

// Component Props Types
export interface MapCoreProps {
  onMapReady?: (map: L.Map) => void;
  children?: React.ReactNode;
}

// DrawingToolsProps removed - migrated to @layera/geo-drawing

// Event Types
export interface MapEvents {
  onDrawingStart: (shape: DrawingShape) => void;
  onDrawingComplete: (geometry: GeoAlertArea['geometry']) => void;
  onAreaClick: (areaId: string) => void;
}

// Constants
// Import από @layera/constants για SSOT
import { MAP_DEFAULTS as LAYERA_MAP_DEFAULTS, DRAWING_LIMITS as LAYERA_DRAWING_LIMITS } from '@layera/constants';

export const MAP_DEFAULTS: MapConfig = {
  center: LAYERA_MAP_DEFAULTS.CENTER,
  zoom: LAYERA_MAP_DEFAULTS.ZOOM,
  maxZoom: LAYERA_MAP_DEFAULTS.MAX_ZOOM,
  defaultRadius: LAYERA_MAP_DEFAULTS.DEFAULT_RADIUS
};

export const DRAWING_LIMITS = LAYERA_DRAWING_LIMITS;