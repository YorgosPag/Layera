/**
 * @layera/constants - Configuration
 *
 * SINGLE SOURCE OF TRUTH για όλες τις configuration τιμές
 * Enterprise-grade centralized configuration management
 */

// ============================================================================
// EXTERNAL APIs & SERVICES - Tier 1 Critical Infrastructure
// ============================================================================

/**
 * External Service URLs - Production Grade APIs
 */
export const EXTERNAL_APIS = {
  // Development Tools & Documentation
  VITEJS_CONFIG: 'https://vitejs.dev/config/',
  VITE_CONFIG: 'https://vite.dev/config/',
  ESLINT_VERSION_SUPPORT: 'https://eslint.org/version-support',
  MDN_ARRAY_SORT: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility',

  // Cloud & Infrastructure
  FIREBASE_CONSOLE: 'https://console.firebase.google.com',
  GOOGLE_CLOUD_CONSOLE: 'https://console.cloud.google.com',

  // Third-party Services
  QR_CODE_GENERATOR: 'https://api.qrserver.com/v1/create-qr-code',
  TOLGEE_API: 'https://app.tolgee.io',

  // Documentation
  LAYERA_DOCS_RBAC: 'https://layera.dev/docs/rbac',
  LAYERA_DOCS_AUTH: 'https://layera.dev/docs/auth-bridge',

  // EU ESCO Services
  ESCO_API_BASE: 'https://esco.ec.europa.eu/api',
} as const;

/**
 * Leaflet Map Infrastructure URLs
 */
export const LEAFLET_INFRASTRUCTURE = {
  CSS: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  MARKER_ICON: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  MARKER_ICON_2X: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  MARKER_SHADOW: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
} as const;

/**
 * OpenStreetMap & Geospatial Services
 */
export const GEOSPATIAL_SERVICES = {
  OSM_TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  NOMINATIM_GEOCODING: 'https://nominatim.openstreetmap.org',

  // Overpass API Endpoints (load-balanced)
  OVERPASS_PRIMARY: 'https://overpass.kumi.systems/api/interpreter',
  OVERPASS_SECONDARY: 'https://overpass-api.de/api/interpreter',
  OVERPASS_TERTIARY: 'https://lz4.overpass-api.de/api/interpreter',
  OVERPASS_FALLBACK: 'https://overpass.openstreetmap.ru/api/interpreter',
} as const;

// ============================================================================
// XML NAMESPACES - W3C Standards
// ============================================================================

/**
 * Standard XML Namespaces
 */
export const XML_NAMESPACES = {
  SVG: 'http://www.w3.org/2000/svg',
  XLINK: 'http://www.w3.org/1999/xlink',
} as const;

/**
 * EU ESCO Data Namespaces
 */
export const ESCO_NAMESPACES = {
  OCCUPATION: 'http://data.europa.eu/esco/occupation',
  SKILL: 'http://data.europa.eu/esco/skill',
  REGULATED_PROFESSIONS: 'http://data.europa.eu/esco/regulated-professions',
} as const;

// ============================================================================
// DEVICE FRAME COLORS - Design System
// ============================================================================

/**
 * Device Frame Colors - Design System
 */
export const DEVICE_FRAME_COLORS = {
  SPACE_GRAY: 'var(--la-bg-dark)',
  SILVER: 'var(--la-color-surface-secondary)',
  BLACK: 'var(--la-bg-dark)',
  WHITE: 'var(--la-color-surface)',
  GOLD: 'var(--la-color-surface-tertiary)',
  GOOGLE_CHARCOAL: 'var(--la-bg-dark)',
  GRAPHITE: 'var(--la-bg-dark)',
} as const;

// ============================================================================
// SVG DIMENSIONS - Standard Sizes
// ============================================================================

/**
 * Standard SVG Icon Dimensions
 */
export const SVG_DIMENSIONS = {
  ICON_SMALL: { width: 16, height: 16 },
  ICON_MEDIUM: { width: 24, height: 24 },
  ICON_LARGE: { width: 32, height: 32 },
  ICON_XL: { width: 48, height: 48 },
} as const;

/**
 * Leaflet Marker Dimensions
 */
export const LEAFLET_MARKER_DIMENSIONS = {
  DEFAULT: { width: 25, height: 41 },
  RETINA: { width: 50, height: 82 },
  SHADOW: { width: 41, height: 41 },
} as const;

// ============================================================================
// DEVELOPMENT PORTS - Local Development
// ============================================================================

/**
 * Development Server Ports - ΣΤΑΘΕΡΕΣ ΠΟΡΤΕΣ
 */
export const DEV_PORTS = {
  LAYERA_ID: 3000,
  LAYERA_GEOALERT_FALLBACK: 3002,
  LAYERA_GEOALERT: 3004,
  TEST_SERVER: 3008,
} as const;

/**
 * Local Development URLs
 */
export const LOCAL_URLS = {
  ID_SERVICE: `http://localhost:${DEV_PORTS.LAYERA_ID}`,
  GEOALERT_SERVICE: `http://localhost:${DEV_PORTS.LAYERA_GEOALERT}`,
  GEOALERT_FALLBACK: `http://localhost:${DEV_PORTS.LAYERA_GEOALERT_FALLBACK}`,
  TEST_SERVER: `http://localhost:${DEV_PORTS.TEST_SERVER}`,
} as const;

// ============================================================================
// DEVICE SPECIFICATIONS - Hardware & Viewport Dimensions
// ============================================================================

/**
 * Mobile Device Specifications - Single Source of Truth
 */
export const MOBILE_DEVICE_SPECS = {
  VIEWPORT_WIDTH: 430,
  VIEWPORT_HEIGHT: 932,
  FRAME_WIDTH_MIN: 412,
  FRAME_WIDTH_MAX: 416,
  FRAME_HEIGHT_MIN: 914,
  FRAME_HEIGHT_MAX: 920,
  EXACT_FRAME_WIDTH: 414,
  EXACT_FRAME_HEIGHT: 916,
} as const;

/**
 * Responsive Breakpoints - Single Source of Truth
 */
export const DEVICE_BREAKPOINTS = {
  MOBILE: 768,    // 0-767px = mobile
  TABLET: 1024,   // 768-1023px = tablet
  DESKTOP: 1025,  // 1024px+ = desktop
  MOBILE_MAX: 480, // Pure mobile detection
} as const;

/**
 * Common Device Viewport Sizes
 */
export const DEVICE_VIEWPORTS = {
  // Mobile Models
  MOBILE_SMALL: { width: 375, height: 667 },
  MOBILE_MEDIUM: { width: 414, height: 896 },
  MOBILE_LARGE: { width: MOBILE_DEVICE_SPECS.VIEWPORT_WIDTH, height: MOBILE_DEVICE_SPECS.VIEWPORT_HEIGHT },
  MOBILE_STANDARD: { width: 390, height: 844 },

  // Tablet Models
  TABLET_MINI: { width: 768, height: 1024 },
  TABLET_AIR: { width: 820, height: 1180 },
  TABLET_PRO: { width: 1024, height: 1366 },
} as const;

// ============================================================================
// CSS VIEWPORT DIMENSIONS - Responsive Design
// ============================================================================

/**
 * CSS Dimension Values
 */
export const CSS_DIMENSIONS = {
  FULL_PERCENT: '100%',
  FULL_VH: '100vh',
  FULL_VW: '100vw',
  FULL_VIEWPORT_HEIGHT: '100vh',
  HALF_PERCENT: '50%',
} as const;

/**
 * Fixed Pixel Dimensions
 */
export const FIXED_DIMENSIONS = {
  DROPDOWN_MAX_HEIGHT: 400,
  MIN_BUTTON_WIDTH: 200,
  MIN_CARD_WIDTH: 280,
  ICON_CONTAINER_SIZE: 32,
  MAP_ZOOM_DEFAULT: 13,
  MAP_ZOOM_MIN: 8,
  MAP_ZOOM_MAX: 18,
} as const;


// ============================================================================
// COLORS - Design System Palette
// ============================================================================

/**
 * Brand Colors - Primary Palette
 */
export const BRAND_COLORS = {
  PRIMARY: 'var(--la-color-brand)',
  SECONDARY: 'var(--la-color-text-secondary)',
  WHITE: 'var(--la-color-surface)',
  BLACK: 'var(--la-bg-dark)',
} as const;

/**
 * UI State Colors
 */
export const UI_COLORS = {
  INFO_SUBTLE: 'var(--la-color-brand-background)',
  INFO_DEFAULT: 'var(--la-color-primary)',
  NEUTRAL_LIGHT: 'var(--la-color-surface-secondary)',
  NEUTRAL_DEFAULT: 'var(--la-color-text-secondary)',
  NEUTRAL_DARK: 'var(--la-color-text-primary)',
  BORDER_DEFAULT: 'var(--la-border-primary)',
  SURFACE_DEFAULT: 'var(--la-color-surface-hover)',
  TEXT_TERTIARY: 'var(--la-color-text-muted)',
} as const;


// ============================================================================
// TYPOGRAPHY - Font System
// ============================================================================

/**
 * Font Sizes (in pixels)
 */
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHTS = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

// ============================================================================
// ANIMATION & TIMING - Motion Design
// ============================================================================

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATIONS = {
  INSTANT: 50,  // For instant button feedback
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

/**
 * Animation Distances (in pixels)
 */
export const ANIMATION_DISTANCES = {
  SLIDE_SMALL: 5,   // Small slide animation
  SLIDE_NORMAL: 10, // Normal slide animation
  SLIDE_LARGE: 20,  // Large slide animation
  SLIDE_EXTRA: 50   // Extra large slide animation
} as const;

/**
 * Transition Timing Functions
 */
export const EASING_FUNCTIONS = {
  EASE_OUT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================================================
// API & HTTP CONSTANTS - Enterprise HTTP/API Standards
// ============================================================================

/**
 * HTTP Status Codes
 */
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * API Timeouts (in milliseconds)
 */
export const API_TIMEOUTS = {
  FAST: 3000,
  MEDIUM: 10000,
  SLOW: 30000,
  UPLOAD: 60000,
} as const;

// ============================================================================
// DEFAULT EXPORTS - Backwards Compatibility
// ============================================================================

/**
 * Legacy Exports - Για backwards compatibility
 */
export const CONFIG = {
  api: {
    baseUrl: process.env.API_BASE_URL || LOCAL_URLS.ID_SERVICE,
    timeout: 10000,
    retries: 3,
  },
  app: {
    name: 'Layera',
    version: process.env.APP_VERSION || '1.0.0',
  },
  map: {
    defaultZoom: FIXED_DIMENSIONS.MAP_ZOOM_DEFAULT,
    maxZoom: FIXED_DIMENSIONS.MAP_ZOOM_MAX,
    minZoom: FIXED_DIMENSIONS.MAP_ZOOM_MIN,
    fabBottomOffset: 80,
    fabHalfWidth: 28,
    defaultCenter: [37.9755, 23.7348] as const, // Athens
  },
  geoDrawing: {
    snapTolerance: 10,
    minSnapZoom: 16,
    debounceMs: 500,
    measurementPrecision: 2,
    defaultStrokeColor: 'var(--la-color-primary)',
    defaultFillColor: 'var(--la-color-brand-light)',
    defaultStrokeWidth: 2,
  },
  osm: {
    overpassApiUrl: 'https://overpass-api.de/api/interpreter',
    requestTimeout: 10000,
    maxCacheEntries: 100,
    cacheTtl: 3600000, // 1 hour
  },
  search: {
    maxResults: 100,
    debounceMs: 300,
  },
} as const;