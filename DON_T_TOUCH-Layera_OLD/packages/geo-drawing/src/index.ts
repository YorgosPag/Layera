/**
 * @layera/geo-drawing - LEGO System για geo-spatial drawing και measurement
 *
 * Ενσωματώνει functionality από OLD_geo-canvas με existing LEGO systems:
 * - @layera/snap-engine & @layera/snap-interactions για snapping
 * - @layera/tolgee για internationalization
 * - @layera/theme-switcher για theme-aware colors
 * - @layera/buttons, @layera/cards, @layera/typography για UI
 * - @layera/constants για configuration
 * - @layera/notifications για user feedback
 */

// Types
export type {
  MeasurementMode,
  DrawingState,
  GeometryType,
  MeasurementPoint,
  MeasurementResult,
  CircleMeasurement,
  ArcMeasurement,
  AngleMeasurement,
  OSMBuildingProperties,
  OSMBuildingFeature,
  GeoJSONFeatureCollection,
  DrawingConfig,
  CanvasInteractionEvent
} from './types';

// Compatibility layer για @layera/map-drawing migration
export type { DrawnArea } from '@layera/map-core';
export type DrawingMode = 'none' | 'polygon' | 'marker' | 'circle';

// Legacy drawing interface για backward compatibility
export interface LegacyDrawingState {
  activeMode: DrawingMode;
  drawnAreas: import('@layera/map-core').DrawnArea[];
}


// Core Hooks
export { useMeasurement } from './hooks/useMeasurement';
export { useGeometrySnap } from './hooks/useGeometrySnap';

// Legacy compatibility hooks
export { useDrawing } from './hooks/useDrawing';
export type { UseDrawingOptions, UseDrawingReturn } from './hooks/useDrawing';

// Components - Temporarily disabled during migration
// export { MeasurementControls } from './components/MeasurementControls';
// export { MeasurementCanvas } from './components/MeasurementCanvas';
// export { GeometryRenderer } from './components/GeometryRenderer';

// Utilities
export {
  calculateProjectedArea,
  calculateDistance,
  calculatePointDistance,
  calculatePolygonCenter,
  calculatePerimeter,
  isPointInPolygon,
  calculateBounds,
  calculateCircleRadius,
  calculateCircleArea,
  calculateCircleCircumference,
  calculateCircleDiameter,
  calculateArcLength,
  calculateAngle,
  detectCircleFromThreePoints
} from './utils/calculations';

export {
  formatDistance,
  formatArea,
  useMeasurementFormatter,
  formatCoordinatesBySystem,
  formatBearing
} from './utils/formatters';

export {
  detectGeometry,
  suggestMeasurementMode,
  calculateDetectionConfidence
} from './utils/geometryDetection';

export type { DetectedGeometry } from './utils/geometryDetection';

export {
  measurementToMapLabel,
  geometryToMapLabels
} from './utils/mapLabelIntegration';

export type { MapLabelConfig } from './utils/mapLabelIntegration';

// Geometry utilities - Temporarily disabled during migration due to TypeScript strict mode issues
// export {
//   geoJsonToLatLng,
//   latLngToGeoJson,
//   closestPointOnSegment,
//   arePointsEqual,
//   simplifyPolygon,
//   calculateBearing,
//   extractOSMGeometry
// } from './utils/geometry';

// Services
export {
  fetchBuildingOutlines,
  clearOSMCache,
  getCacheSize,
  isBoundsCached,
  prefetchBuildingOutlines,
  fetchAdministrativeBoundary,
  fetchBoundaryByAddressComponent
} from './services/osmService';

// Constants που θα προστεθούν στο @layera/constants
export const GEO_DRAWING_CONSTANTS = {
  DEFAULT_SNAP_TOLERANCE: 15,
  MIN_SNAP_ZOOM: 16,
  DEBOUNCE_MS: 500,
  REQUEST_TIMEOUT: 30000
} as const;