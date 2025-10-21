// Import Leaflet types
import L from 'leaflet';

export type LatLngBounds = L.LatLngBounds;

// We'll use the actual Leaflet types instead of custom interface
export type LeafletMap = L.Map;

// Use actual Leaflet types
export type LeafletEvent = L.LeafletMouseEvent;
export type LeafletLayer = L.Layer;

export interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string;
  nameNumber?: number;
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: {
    // Ακίνητα
    price?: number;
    squareMeters?: number;
    rooms?: number;
    propertyType?: string;
    // Εργασία
    salary?: number;
    workingHours?: string;
    company?: string;
    jobType?: string;
  };
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  maxZoom: number;
  minZoom: number;
  tileUrl: string;
  attribution: string;
}

export interface MapInitializationOptions {
  containerId: string;
  config: MapConfig;
  enableGeoLocation?: boolean;
  enableSearch?: boolean;
  enableDrawing?: boolean;
}