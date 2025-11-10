/**
 * Βασικοί τύποι γεωμετρίας που υποστηρίζονται σε όλο το Layera ecosystem
 */
export type GeometryType = 'Polygon' | 'LineString' | 'Point' | 'MultiPolygon';

/**
 * 2D Point interface για γενικούς υπολογισμούς
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Βασικό Geographic Point interface
 */
export interface GeoPoint {
  /** Latitude σε decimal degrees */
  lat: number;
  /** Longitude σε decimal degrees */
  lng: number;
  /** Optional elevation σε meters */
  elevation?: number;
}

/**
 * Geographic bounds για map viewport και queries
 */
export interface GeoBounds {
  /** South boundary (minimum latitude) */
  south: number;
  /** West boundary (minimum longitude) */
  west: number;
  /** North boundary (maximum latitude) */
  north: number;
  /** East boundary (maximum longitude) */
  east: number;
}

/**
 * Measurement modes για το geo-drawing system
 */
export type MeasurementMode = 'distance' | 'area' | 'point';

/**
 * Drawing states για UI components
 */
export type DrawingState = 'idle' | 'drawing' | 'finished' | 'cancelled';

/**
 * Snap types για geometry snapping
 */
export type SnapType = 'vertex' | 'edge' | 'center' | 'perpendicular';

/**
 * Administrative levels για OSM boundaries
 */
export type AdminLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * Map projection types
 */
export type ProjectionType = 'EPSG:4326' | 'EPSG:3857' | 'EPSG:2100';

/**
 * Coordinate system interface
 */
export interface CoordinateSystem {
  /** EPSG code */
  epsg: string;
  /** Human readable name */
  name: string;
  /** Units (degrees, meters, etc.) */
  units: string;
}