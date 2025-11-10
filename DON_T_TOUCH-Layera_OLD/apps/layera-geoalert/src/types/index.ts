// Layera GeoAlert V1 - Enterprise Type Definitions
// Inspired by geo-canvas(8) patterns but simplified για GeoAlert needs

import L from 'leaflet';

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
    propertyType?: 'apartment' | 'house' | 'studio' | 'office';
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
export const MAP_DEFAULTS: MapConfig = {
  center: [38.246639, 21.734573], // Πάτρα (από geo-canvas reference)
  zoom: 13,
  maxZoom: 25,
  defaultRadius: 250 // 250 meters default
};

export const DRAWING_LIMITS = {
  MIN_RADIUS: 50, // meters
  MAX_RADIUS: 2000, // meters
  MAX_POLYGON_POINTS: 20
};