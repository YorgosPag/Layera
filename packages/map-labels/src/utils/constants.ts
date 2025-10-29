/**
 * @layera/map-labels - Constants
 *
 * Enterprise constants για map label system.
 * Centralized configuration για consistency.
 */

/**
 * Default z-index values για map labels
 * Integrates με @layera/constants Z_INDEX system
 */
export const LABEL_Z_INDEX = {
  BASE: 1000,
  HOVER: 1001,
  ACTIVE: 1002,
  PRIORITY_HIGH: 1010,
  PRIORITY_CRITICAL: 1020
} as const;

/**
 * Default animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000
} as const;

/**
 * Default zoom thresholds για label visibility
 */
export const ZOOM_THRESHOLDS = {
  /** Minimum zoom για showing any labels */
  MIN_LABEL_ZOOM: 8,

  /** Zoom για showing area calculations */
  AREA_LABEL_ZOOM: 12,

  /** Zoom για showing detailed information */
  DETAILED_INFO_ZOOM: 14,

  /** Maximum useful zoom */
  MAX_LABEL_ZOOM: 18
} as const;

/**
 * Area calculation thresholds
 */
export const AREA_THRESHOLDS = {
  /** Switch from m² to km² */
  KM_THRESHOLD: 1_000_000, // 1 km²

  /** Switch from m² to hectares */
  HECTARE_THRESHOLD: 10_000, // 1 hectare

  /** Minimum area για displaying labels */
  MIN_DISPLAY_AREA: 100 // 100 m²
} as const;

/**
 * Distance calculation thresholds
 */
export const DISTANCE_THRESHOLDS = {
  /** Switch from m to km */
  KM_THRESHOLD: 1000, // 1 km

  /** Minimum distance για displaying */
  MIN_DISPLAY_DISTANCE: 1 // 1 meter
} as const;

/**
 * Label positioning constants
 */
export const POSITIONING = {
  /** Default offset από polygon edge */
  EDGE_MARGIN: 10, // pixels

  /** Minimum distance between labels */
  LABEL_SPACING: 20, // pixels

  /** Maximum iterations για optimal positioning */
  MAX_POSITIONING_ITERATIONS: 10,

  /** Tolerance για centroid calculation */
  CENTROID_TOLERANCE: 0.001
} as const;

/**
 * Performance optimization settings
 */
export const PERFORMANCE = {
  /** Maximum labels to render simultaneously */
  MAX_VISIBLE_LABELS: 50,

  /** Debounce delay για zoom/pan events */
  VIEWPORT_UPDATE_DELAY: 100, // ms

  /** Cache size για positioning calculations */
  POSITIONING_CACHE_SIZE: 100,

  /** Cache TTL για area calculations */
  AREA_CACHE_TTL: 5 * 60 * 1000 // 5 minutes
} as const;

/**
 * Default styling values
 */
export const DEFAULT_STYLES = {
  /** Default background colors */
  BACKGROUNDS: {
    transparent: 'rgba(255, 255, 255, 0)',
    'semi-transparent': 'rgba(255, 255, 255, 0.85)',
    solid: 'rgba(255, 255, 255, 0.95)'
  },

  /** Default text colors */
  TEXT_COLORS: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626'
  },

  /** Default border colors */
  BORDER_COLORS: {
    light: 'var(--la-shadow-sm)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)'
  },

  /** Default shadows */
  SHADOWS: {
    light: '0 1px 3px var(--la-shadow-sm)',
    medium: '0 2px 4px var(--la-shadow-sm)',
    strong: '0 4px 8px rgba(0, 0, 0, 0.15)'
  },

  /** Default border radius */
  BORDER_RADIUS: '4px',

  /** Default padding values */
  PADDING: {
    small: '0.25rem 0.5rem',
    medium: '0.5rem 0.75rem',
    large: '0.75rem 1rem'
  }
} as const;

/**
 * Typography constants
 */
export const TYPOGRAPHY = {
  /** Font sizes για different variants */
  FONT_SIZES: {
    title: 'var(--la-font-size-lg, 1.125rem)',    // 18px
    subtitle: 'var(--la-font-size-md, 1rem)',     // 16px
    area: 'var(--la-font-size-sm, 0.875rem)',     // 14px
    distance: 'var(--la-font-size-sm, 0.875rem)', // 14px
    info: 'var(--la-font-size-xs, 0.75rem)',      // 12px
    warning: 'var(--la-font-size-sm, 0.875rem)',  // 14px
    success: 'var(--la-font-size-sm, 0.875rem)'   // 14px
  },

  /** Font weights */
  FONT_WEIGHTS: {
    title: 600,
    subtitle: 500,
    area: 500,
    distance: 500,
    info: 400,
    warning: 500,
    success: 500
  },

  /** Line heights */
  LINE_HEIGHTS: {
    compact: 1.2,
    normal: 1.4,
    relaxed: 1.6
  }
} as const;

/**
 * Formatting precision constants
 */
export const FORMATTING = {
  /** Decimal places για area display */
  AREA_PRECISION: {
    'm²': 0,
    'km²': 2,
    'hectares': 1
  },

  /** Decimal places για distance display */
  DISTANCE_PRECISION: {
    'm': 0,
    'km': 2,
    'miles': 2,
    'feet': 0
  },

  /** Number formatting locales */
  LOCALES: {
    'el': 'el-GR',
    'en': 'en-US'
  }
} as const;

/**
 * CSS class name prefixes για consistency
 */
export const CSS_CLASSES = {
  PREFIX: 'layera-map-label',
  VARIANTS: {
    title: 'layera-map-label--title',
    subtitle: 'layera-map-label--subtitle',
    area: 'layera-map-label--area',
    distance: 'layera-map-label--distance',
    info: 'layera-map-label--info',
    warning: 'layera-map-label--warning',
    success: 'layera-map-label--success'
  },
  BACKGROUNDS: {
    transparent: 'layera-map-label--bg-transparent',
    'semi-transparent': 'layera-map-label--bg-semi',
    solid: 'layera-map-label--bg-solid'
  },
  STATES: {
    visible: 'layera-map-label--visible',
    hidden: 'layera-map-label--hidden',
    animating: 'layera-map-label--animating',
    hover: 'layera-map-label--hover',
    active: 'layera-map-label--active'
  }
} as const;

/**
 * Error messages για consistent error handling
 */
export const ERROR_MESSAGES = {
  INVALID_COORDINATES: 'Invalid coordinates provided για label positioning',
  CALCULATION_FAILED: 'Failed to calculate area for polygon',
  POSITIONING_FAILED: 'Failed to calculate optimal label position',
  INVALID_ZOOM_RANGE: 'Invalid zoom range specified',
  MISSING_BOUNDARY_DATA: 'Boundary data is required για BoundaryLabel',
  INVALID_AREA_UNIT: 'Invalid area unit specified',
  INVALID_DISTANCE_UNIT: 'Invalid distance unit specified'
} as const;

/**
 * Debug και development constants
 */
export const DEBUG = {
  /** Enable debug logging */
  ENABLED: process.env.NODE_ENV === 'development',

  /** Debug level */
  LEVEL: process.env.DEBUG_LEVEL || 'info',

  /** Show positioning guides */
  SHOW_POSITIONING_GUIDES: false,

  /** Show performance metrics */
  SHOW_PERFORMANCE_METRICS: false
} as const;