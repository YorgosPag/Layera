/**
 * @layera/geo-drawing - LEGO System για geo-spatial drawing και measurement
 *
 * Ενσωματώνει functionality από OLD_geo-canvas με existing LEGO systems:
 * - @layera/snap-engine & @layera/snap-interactions για snapping
 * - @layera/i18n για internationalization
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
  OSMBuildingProperties,
  OSMBuildingFeature,
  GeoJSONFeatureCollection,
  DrawingConfig,
  CanvasInteractionEvent
} from './types';

// Core Hooks
export { useMeasurement } from './hooks/useMeasurement';
export { useGeometrySnap } from './hooks/useGeometrySnap';

// Components
export { MeasurementControls } from './components/MeasurementControls';
export { MeasurementCanvas } from './components/MeasurementCanvas';
export { GeometryRenderer } from './components/GeometryRenderer';

// Utilities
export {
  calculateProjectedArea,
  calculateDistance,
  calculatePointDistance,
  calculatePolygonCenter,
  calculatePerimeter,
  isPointInPolygon,
  calculateBounds
} from './utils/calculations';

export {
  formatDistance,
  formatArea,
  useMeasurementFormatter,
  formatCoordinatesBySystem,
  formatBearing
} from './utils/formatters';

export {
  geoJsonToLatLng,
  latLngToGeoJson,
  closestPointOnSegment,
  arePointsEqual,
  simplifyPolygon,
  calculateBearing,
  extractOSMGeometry
} from './utils/geometry';

// Services
export {
  fetchBuildingOutlines,
  clearOSMCache,
  getCacheSize,
  isBoundsCached,
  prefetchBuildingOutlines
} from './services/osmService';

// Constants που θα προστεθούν στο @layera/constants
export const GEO_DRAWING_CONSTANTS = {
  DEFAULT_SNAP_TOLERANCE: 15,
  MIN_SNAP_ZOOM: 16,
  DEBOUNCE_MS: 500,
  REQUEST_TIMEOUT: 30000
} as const;