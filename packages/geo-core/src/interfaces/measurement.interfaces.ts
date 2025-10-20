import type { LatLng } from 'leaflet';
import type { MeasurementMode } from '../types';

/**
 * Point interface για measurements με Leaflet integration
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
  /** Unique identifier για το measurement */
  id: string;
  /** Τύπος measurement */
  type: MeasurementMode;
  /** Τα points που χρησιμοποιήθηκαν */
  points: MeasurementPoint[];
  /** Distance σε meters (για distance mode) */
  distance?: number;
  /** Area σε square meters (για area mode) */
  area?: number;
  /** Perimeter σε meters (για area mode) */
  perimeter?: number;
  /** Formatted display value */
  displayValue: string;
  /** Units για το display value */
  units: string;
  /** Timestamp δημιουργίας */
  timestamp: number;
  /** Optional metadata */
  metadata?: {
    [key: string]: unknown;
  };
}

/**
 * Configuration για measurement calculations
 */
export interface MeasurementConfig {
  /** Preferred units για distance (meters, kilometers, etc.) */
  distanceUnits: 'meters' | 'kilometers' | 'feet' | 'miles';
  /** Preferred units για area (square meters, hectares, etc.) */
  areaUnits: 'square_meters' | 'hectares' | 'square_kilometers' | 'square_feet' | 'acres';
  /** Precision για decimal places */
  precision: number;
  /** Use geodesic calculations για accuracy */
  geodesic: boolean;
}

/**
 * Snap result interface για measurement snapping
 */
export interface SnapResult {
  /** Το snapped point */
  snapPoint: LatLng;
  /** Τύπος snap που έγινε */
  snapType: 'vertex' | 'edge' | 'center';
  /** Distance from original point σε pixels */
  snapDistance: number;
  /** The original feature που έγινε snap */
  feature?: {
    id: string;
    type: string;
    properties?: { [key: string]: unknown };
  };
}