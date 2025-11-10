import type { LatLng } from 'leaflet';
import type { DrawingState, GeometryType } from '../types';
import type { SnapResult } from './measurement.interfaces';

/**
 * Drawing configuration options που μοιράζονται όλα τα drawing components
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
  /** Enable measurement display */
  showMeasurements: boolean;
  /** Enable coordinate display */
  showCoordinates: boolean;
}

/**
 * Canvas interaction event types για drawing
 */
export interface CanvasInteractionEvent {
  /** Event type */
  type: 'click' | 'move' | 'doubleclick' | 'keydown' | 'keyup';
  /** Cursor position */
  latlng: LatLng;
  /** Original DOM event */
  originalEvent: Event;
  /** Whether snapping occurred */
  snapped: boolean;
  /** Snap result αν υπάρχει */
  snapResult?: SnapResult;
  /** Modifier keys state */
  modifiers: {
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
  };
}

/**
 * Drawing state management interface
 */
export interface DrawingStateManager {
  /** Current drawing state */
  state: DrawingState;
  /** Current geometry type being drawn */
  geometryType: GeometryType | null;
  /** Points collected during drawing */
  points: LatLng[];
  /** Configuration settings */
  config: DrawingConfig;
}

/**
 * Drawing event callbacks
 */
export interface DrawingEventHandlers {
  /** Called when drawing starts */
  onDrawingStart?: (geometryType: GeometryType) => void;
  /** Called when a point is added */
  onPointAdd?: (point: LatLng, index: number) => void;
  /** Called when drawing is completed */
  onDrawingComplete?: (points: LatLng[], geometryType: GeometryType) => void;
  /** Called when drawing is cancelled */
  onDrawingCancel?: () => void;
  /** Called when state changes */
  onStateChange?: (state: DrawingState) => void;
}

/**
 * Geometry validation result
 */
export interface GeometryValidation {
  /** Is the geometry valid */
  isValid: boolean;
  /** Validation errors αν υπάρχουν */
  errors: string[];
  /** Warnings που δεν εμποδίζουν το drawing */
  warnings: string[];
  /** Suggested fixes */
  suggestions: string[];
}