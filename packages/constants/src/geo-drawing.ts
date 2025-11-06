/**
 * Geo-Drawing constants for @layera/geo-drawing LEGO system
 * Αντικαθιστά τα hardcoded values από OLD_geo-canvas
 */

/**
 * Snap-to-geometry configuration
 */
export const GEO_DRAWING_SNAP = {
  /** Default snap tolerance σε pixels */
  DEFAULT_TOLERANCE: 15,

  /** Minimum zoom level για OSM data fetching */
  MIN_SNAP_ZOOM: 16,

  /** Maximum zoom για OSM API calls */
  MAX_SNAP_ZOOM: 20,

  /** Debounce time για map movement events (ms) */
  DEBOUNCE_MS: 500,

  /** Priority order για snap types */
  SNAP_PRIORITY: ['vertex', 'center', 'midpoint', 'edge', 'nearest'] as const
} as const;

/**
 * Measurement configuration
 */
export const GEO_DRAWING_MEASUREMENT = {
  /** Default decimal places για distance display */
  DISTANCE_DECIMALS: 2,

  /** Default decimal places για area display */
  AREA_DECIMALS: 2,

  /** Default decimal places για coordinates */
  COORDINATE_DECIMALS: 6,

  /** Threshold για switching από meters σε kilometers */
  DISTANCE_KM_THRESHOLD: 1000,

  /** Threshold για switching από m² σε hectares */
  AREA_HECTARE_THRESHOLD: 10000,

  /** Threshold για switching από hectares σε km² */
  AREA_KM_THRESHOLD: 1000000
} as const;

/**
 * OSM service configuration
 */
export const GEO_DRAWING_OSM = {
  /** Overpass API URL */
  OVERPASS_API_URL: 'https://overpass-api.de/api/interpreter',

  /** Request timeout σε milliseconds */
  REQUEST_TIMEOUT: 30000,

  /** Maximum cache entries */
  MAX_CACHE_ENTRIES: 100,

  /** Cache TTL σε milliseconds (5 minutes) */
  CACHE_TTL: 5 * 60 * 1000,

  /** Coordinate precision για cache keys */
  CACHE_PRECISION: 4
} as const;

/**
 * Drawing interaction configuration
 */
export const GEO_DRAWING_INTERACTION = {
  /** Double-click timeout σε milliseconds */
  DOUBLE_CLICK_TIMEOUT: 300,

  /** Key codes για shortcuts */
  KEY_CODES: {
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    SPACE: ' ',
    DELETE: 'Delete',
    BACKSPACE: 'Backspace'
  },

  /** Mouse button codes */
  MOUSE_BUTTONS: {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  },

  /** Accessibility constants */
  ACCESSIBILITY: {
    TAB_INDEX_FOCUSABLE: 0,
    TAB_INDEX_SKIP: -1
  }
} as const;

/**
 * Visual styling configuration
 */
export const GEO_DRAWING_STYLES = {
  /** Default line weights */
  LINE_WEIGHTS: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
    MEASUREMENT: 3,
    OSM_BUILDING: 1
  },

  /** Point marker sizes */
  POINT_SIZES: {
    SMALL: 4,
    NORMAL: 6,
    LARGE: 8
  },

  /** Opacity values */
  OPACITY: {
    DRAWING: 0.8,
    FINISHED: 1.0,
    BUILDING_FILL: 0.1,
    BUILDING_HOVER: 0.3,
    MEASUREMENT_FILL: 0.3,
    DISABLED: 0.5
  }
} as const;

/**
 * Error messages keys για @layera/tolgee
 */
export const GEO_DRAWING_ERRORS = {
  MINIMUM_POINTS_DISTANCE: 'geo-drawing.errors.minimum-points-distance',
  MINIMUM_POINTS_AREA: 'geo-drawing.errors.minimum-points-area',
  OSM_FETCH_FAILED: 'geo-drawing.errors.osm-fetch-failed',
  SNAP_ENGINE_ERROR: 'geo-drawing.errors.snap-engine-error',
  CALCULATION_ERROR: 'geo-drawing.errors.calculation-error'
} as const;

/**
 * Success messages keys για @layera/tolgee
 */
export const GEO_DRAWING_SUCCESS = {
  MEASUREMENT_COMPLETED: 'geo-drawing.success.measurement-completed',
  MEASUREMENT_SAVED: 'geo-drawing.success.measurement-saved',
  MEASUREMENT_CLEARED: 'geo-drawing.success.measurement-cleared'
} as const;

// Geo-drawing configuration integrated into main CONFIG in config.ts
// This eliminates duplication and follows Single Source of Truth principle