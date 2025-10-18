import type { LatLng } from 'leaflet';

/**
 * Measurement modes για το geo-drawing system
 */
export type MeasurementMode = 'distance' | 'area' | 'point';

/**
 * Drawing states
 */
export type DrawingState = 'idle' | 'drawing' | 'finished' | 'cancelled';

/**
 * Geometry types που υποστηρίζονται
 */
export type GeometryType = 'Polygon' | 'LineString' | 'Point' | 'MultiPolygon';

/**
 * Point interface για measurements
 */
export interface MeasurementPoint {
  /** Unique identifier για το point */
  id: string;
  /** Leaflet LatLng coordinates */
  latlng: LatLng;
  /** Optional label για display */
  label?: string;
  /** Index στη σειρά που προστέθηκε */
  index: number;
}

/**
 * Measurement result interface
 */
export interface MeasurementResult {
  /** Τύπος measurement */
  type: MeasurementMode;
  /** Τα points που χρησιμοποιήθηκαν */
  points: MeasurementPoint[];
  /** Distance σε meters (για distance mode) */
  distance?: number;
  /** Area σε square meters (για area mode) */
  area?: number;
  /** Formatted display value */
  displayValue: string;
  /** Timestamp δημιουργίας */
  timestamp: number;
}

/**
 * OSM Building feature properties
 */
export interface OSMBuildingProperties {
  /** OSM building type */
  building?: string;
  /** Building name αν υπάρχει */
  name?: string;
  /** Building height */
  height?: number;
  /** Building levels */
  'building:levels'?: number;
  /** Address information */
  'addr:street'?: string;
  'addr:housenumber'?: string;
}

/**
 * GeoJSON Feature interface για OSM buildings
 */
export interface OSMBuildingFeature {
  type: 'Feature';
  geometry: {
    type: GeometryType;
    coordinates: number[][][] | number[][][][];
  };
  properties: OSMBuildingProperties;
}

/**
 * GeoJSON FeatureCollection για OSM data
 */
export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: OSMBuildingFeature[];
}

/**
 * Drawing configuration options
 */
export interface DrawingConfig {
  /** Enable snap-to-geometry functionality */
  enableSnapping: boolean;
  /** Snap tolerance σε pixels */
  snapTolerance: number;
  /** Minimum zoom level για OSM data fetching */
  minSnapZoom: number;
  /** Default line color */
  lineColor: string;
  /** Default fill color */
  fillColor: string;
  /** Default line weight */
  lineWeight: number;
  /** Default fill opacity */
  fillOpacity: number;
}

/**
 * Canvas interaction event types
 */
export interface CanvasInteractionEvent {
  /** Event type */
  type: 'click' | 'move' | 'doubleclick' | 'keydown';
  /** Cursor position */
  latlng: LatLng;
  /** Original DOM event */
  originalEvent: Event;
  /** Whether snapping occurred */
  snapped: boolean;
  /** Snap result αν υπάρχει */
  snapResult?: {
    snapPoint: LatLng;
    snapType: 'vertex' | 'edge';
  };
}