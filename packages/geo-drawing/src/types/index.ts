import type { LatLng } from 'leaflet';

// Re-export geo-core types για backward compatibility
export type {
  OSMBuildingCollection,
  OSMAdminCollection,
  OSMBuildingFeature,
  OSMAdminFeature,
  OSMBuildingProperties,
  GeoJSONFeatureCollection,
  GeoJSONFeature
} from '@layera/geo-core';

/**
 * Measurement modes για το geo-drawing system
 */
export type MeasurementMode =
  | 'distance'
  | 'area'
  | 'point'
  | 'circle-radius'
  | 'circle-area'
  | 'circle-circumference'
  | 'circle-diameter'
  | 'arc-length'
  | 'angle'
  | 'perimeter';

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
  /** Radius σε meters (για circle modes) */
  radius?: number;
  /** Circumference σε meters (για circle circumference) */
  circumference?: number;
  /** Diameter σε meters (για circle diameter) */
  diameter?: number;
  /** Arc length σε meters (για arc length) */
  arcLength?: number;
  /** Angle σε radians (για angle measurements) */
  angle?: number;
  /** Perimeter σε meters (για perimeter mode) */
  perimeter?: number;
  /** Formatted display value */
  displayValue: string;
  /** Timestamp δημιουργίας */
  timestamp: number;
}

/**
 * Circle measurement properties
 */
export interface CircleMeasurement {
  /** Center point of the circle */
  center: LatLng;
  /** Radius σε meters */
  radius: number;
  /** Area σε square meters */
  area: number;
  /** Circumference σε meters */
  circumference: number;
  /** Diameter σε meters */
  diameter: number;
}

/**
 * Arc measurement properties
 */
export interface ArcMeasurement {
  /** Center point of the arc */
  center: LatLng;
  /** Start point of the arc */
  startPoint: LatLng;
  /** End point of the arc */
  endPoint: LatLng;
  /** Radius σε meters */
  radius: number;
  /** Angle σε radians */
  angle: number;
  /** Arc length σε meters */
  arcLength: number;
}

/**
 * Angle measurement properties
 */
export interface AngleMeasurement {
  /** First point */
  point1: LatLng;
  /** Vertex point (where the angle is measured) */
  vertex: LatLng;
  /** Third point */
  point2: LatLng;
  /** Angle σε radians */
  angleRadians: number;
  /** Angle σε degrees */
  angleDegrees: number;
}

// OSMBuildingProperties, OSMBuildingFeature, GeoJSONFeatureCollection now come from @layera/geo-core

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