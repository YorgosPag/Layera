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

// ============================================================================
// UI ANIMATION & INTERACTION DURATIONS - Single Source of Truth
// ============================================================================

/**
 * Animation Durations για UI Interactions
 */
export const ANIMATION_DURATIONS = {
  // Auto-advance timings
  PROPERTY_TYPE_SELECTION: 500, // PropertyTypeSelector auto-advance delay
  OCCUPATION_SEARCH: 1500, // OccupationStep search completion delay
  COMPLETE_STEP: 500, // CompleteStep animation delay

  // Form interaction timings
  FORM_VALIDATION_DELAY: 300, // Form validation debounce
  SEARCH_DEBOUNCE: 300, // Search input debounce
  API_DEBOUNCE: 500, // API call debounce

  // UI state transitions
  MODAL_TRANSITION: 200, // Modal open/close animation
  SIDEBAR_TRANSITION: 300, // Sidebar slide animation
  TOOLTIP_DELAY: 500, // Tooltip appearance delay

  // General animation durations
  INSTANT: 50,  // For instant button feedback
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// ============================================================================
// DEMO & SAMPLE DATA - Single Source of Truth
// ============================================================================

/**
 * Demo Property Data για Development & Testing
 */
export const DEMO_PROPERTY_DATA = {
  // Sample property details
  PRICE: 150000, // Example property price in euros
  SQUARE_METERS: 85, // Example property size in square meters

  // Business logic constants - (FULL_TIME_HOURS_THRESHOLD moved to DEMO_PROPERTY_DATA to avoid duplicates)

  // Form validation ranges
  BUILDING_YEAR_MIN: 1800, // Earliest reasonable building year
  BUILDING_YEAR_PLACEHOLDER: 2005, // Example year for placeholder

  // Property limits
  MAX_BEDROOMS: 20, // Maximum number of bedrooms
  MAX_BATHROOMS: 10, // Maximum number of bathrooms
  MAX_PARKING_SPACES: 50, // Maximum parking spaces

  // Form placeholders & defaults - SSOT
  DEFAULT_ROOMS_PLACEHOLDER: 3, // Default rooms placeholder
  DEFAULT_BATHROOMS_PLACEHOLDER: 2, // Default bathrooms placeholder
  DEFAULT_FLOOR_PLACEHOLDER: 3, // Default floor placeholder

  // Validation minimums - SSOT
  MIN_ROOMS: 1, // Minimum rooms allowed
  MIN_BATHROOMS: 1, // Minimum bathrooms allowed
  MIN_FLOOR: -2, // Minimum floor (basement levels)
  MIN_PRICE: 0, // Minimum price allowed
  MIN_SQUARE_METERS: 1, // Minimum square meters

  // Employment constants
  FULL_TIME_HOURS_THRESHOLD: 40, // Standard full-time employment threshold
} as const;

// ============================================================================
// GEOMETRIC & UI CONSTANTS - SSOT για geometric limits
// ============================================================================

/**
 * Geometric Validation Limits - Single Source of Truth
 */
export const GEOMETRIC_LIMITS = {
  MAX_AREA_SQM: 1000000, // 1 km² - geometric validation limit
  MIN_AREA_SQM: 100,     // 100 square meters minimum
  MAX_TICK_VALUE: 100000, // Maximum normalized tick value for rulers
  AREA_CONVERSION_FACTOR: 111319.9, // Meters per degree approximation
  MIN_POLYGON_POINTS: 3   // Minimum points for valid polygon
} as const;

/**
 * Icon Dimensions από tokens.json - SSOT για icon positioning
 */
export const ICON_DIMENSIONS = {
  MAP: {
    ALERT: {
      width: 30,
      height: 48,
      anchor: {
        x: 15,
        y: 48
      },
      shadow: {
        size: 48
      },
      popup: {
        offsetY: -42
      },
      tooltip: {
        offsetY: -28
      }
    },
    TOOLTIP: {
      anchorX: 16
    },
    POPUP: {
      anchorX: 1
    }
  }
} as const;

/**
 * UI Component Dimensions - SSOT για component sizing
 */
export const UI_DIMENSIONS = {
  SIDEBAR: {
    AREAS_PANEL_WIDTH: 80,  // Areas panel width percentage
    MIN_WIDTH: 0,           // Collapsed width
    COLLAPSED_WIDTH: 0      // Fully collapsed state
  },
  PANEL: {
    Z_INDEX_MODAL: 10002    // Modal panel z-index
  }
} as const;

// ============================================================================
// UI LAYER MANAGEMENT - Z-Index Constants
// ============================================================================

/**
 * Z-Index Layer Management για UI Stacking
 */
export const Z_INDEX_LAYERS = {
  // Base layers (0-99)
  BASE: 1,
  CONTENT: 10,

  // UI Components (100-999)
  SIDEBAR: 100,
  NAVIGATION: 200,
  FORM_ELEMENTS: 300,

  // Interactive Elements (1000-9999)
  STEPS_OVERLAY: 1000, // LayoutStep overlay z-index
  DROPDOWN: 1500,
  TOOLTIP: 2000,

  // Critical UI (10000+)
  MODAL_BACKDROP: 10000,
  MODAL_CONTENT: 10001,
  COMPLETION_OVERLAY: 10002, // CompleteStep & AvailabilityStep final overlay
  NOTIFICATION: 10003,
  LOADING_OVERLAY: 10004,
} as const;

// ============================================================================
// WORKFLOW STEP ORDERING - Single Source of Truth
// ============================================================================

/**
 * Workflow Step Order Constants
 */
export const WORKFLOW_ORDER = {
  // Step sequence numbers
  AVAILABILITY_DETAILS: 12,
  LAYOUT: 13,
  LOCATION: 14,
  PROPERTY_DETAILS: 15,
  UPLOAD: 17,

  // Special steps
  COMPLETION: 100, // Always last step
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
  SPACE_GRAY: 'var(--layera-bg-dark)',
  SILVER: 'var(--layera-color-surface-secondary)',
  BLACK: 'var(--layera-bg-dark)',
  WHITE: 'var(--layera-color-surface)',
  GOLD: 'var(--layera-color-surface-tertiary)',
  GOOGLE_CHARCOAL: 'var(--layera-bg-dark)',
  GRAPHITE: 'var(--layera-bg-dark)',
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
  ICON_XXL: { width: 64, height: 64 },
} as const;

/**
 * Icon Sizes - Unified Icon Size System
 * Single Source of Truth για icon dimensions across components
 */
export const ICON_SIZES = {
  SMALL: 24,
  MEDIUM: 32,
  LARGE: 48,
  XL: 64
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
// GEO & MAPPING CONSTANTS - Geospatial Configuration
// ============================================================================

/**
 * Map Configuration Defaults
 */
export const MAP_DEFAULTS = {
  CENTER: [38.246639, 21.734573] as const, // Πάτρα coordinates
  ZOOM: 13,
  MAX_ZOOM: 25,
  DEFAULT_RADIUS: 250, // meters
} as const;

/**
 * Drawing Limits & Constraints
 */
export const DRAWING_LIMITS = {
  MIN_RADIUS: 50, // meters minimum radius
  MAX_RADIUS: 2000, // meters maximum radius
  MAX_POLYGON_POINTS: 20, // maximum points per polygon
} as const;

/**
 * Earth Geospatial Constants
 */
export const EARTH_CONSTANTS = {
  RADIUS_METERS: 6371000, // Earth's radius in meters
} as const;

/**
 * EPSG Coordinate System Codes - Geospatial Standards
 * SSOT MOVED to geo-drawing.ts to avoid duplicates - use: import { EPSG_CODES } from './geo-drawing';
 */

/**
 * Geographic Bounds - Coordinate System Constraints
 */
export const GEOGRAPHIC_BOUNDS = {
  // WGS84 Global bounds
  WGS84_GLOBAL: {
    MIN_X: -180,
    MAX_X: 180,
    MIN_Y: -90,
    MAX_Y: 90
  },
  // Greece geographic bounds (WGS84)
  GREECE_WGS84: {
    MIN_X: 19,
    MAX_X: 30,
    MIN_Y: 34,
    MAX_Y: 42
  },
  // EGSA87 (Greek Grid) projection bounds
  EGSA87: {
    MIN_X: 100000,
    MAX_X: 900000,
    MIN_Y: 3800000,
    MAX_Y: 4700000
  },
  // Web Mercator bounds
  WEB_MERCATOR: {
    MIN_X: -20037508,
    MAX_X: 20037508,
    MIN_Y: -20037508,
    MAX_Y: 20037508
  }
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
 * Responsive Breakpoints - MOVED TO STYLE DICTIONARY
 * Use CSS variables: var(--layera-spacing-breakpoint-mobile), var(--layera-spacing-breakpoint-tablet), var(--layera-spacing-breakpoint-desktop)
 * @see packages/tokens/src/domains/spacing-dimensions.json
 */
export const DEVICE_BREAKPOINTS = {
  // Main breakpoints moved to Style Dictionary tokens
  // MOBILE: 768 → var(--layera-spacing-breakpoint-mobile)
  // TABLET: 1024 → var(--layera-spacing-breakpoint-tablet)
  // DESKTOP: 1025 → var(--layera-spacing-breakpoint-desktop)
  MOBILE_MAX: 480, // Pure mobile detection - Business logic ✅
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
 * Fixed Pixel Dimensions - PARTIAL DEPRECATION: Card/Button/Input dimensions moved to Style Dictionary
 */
export const FIXED_DIMENSIONS = {
  DROPDOWN_MAX_HEIGHT: 400,
  MIN_BUTTON_WIDTH: 200,
  MIN_CARD_WIDTH: 280,
  ICON_CONTAINER_SIZE: 32,
  MAP_ZOOM_DEFAULT: 13,
  MAP_ZOOM_MIN: 8,
  MAP_ZOOM_MAX: 18,
  // UI dimensions moved to Style Dictionary tokens:
  // - Card: var(--layera-spacing-component-card-width), var(--layera-spacing-component-card-height)
  // - Button: var(--layera-spacing-component-button-height)
  // - Input: var(--layera-spacing-component-input-height)
} as const;


// ============================================================================
// COLORS - Design System Palette
// ============================================================================

/**
 * Brand Colors - Primary Palette
 */
export const BRAND_COLORS = {
  PRIMARY: 'var(--layera-color-brand)',
  SECONDARY: 'var(--layera-color-text-secondary)',
  WHITE: 'var(--layera-color-surface)',
  BLACK: 'var(--layera-bg-dark)',
} as const;

/**
 * UI State Colors
 */
export const UI_COLORS = {
  INFO_SUBTLE: 'var(--layera-color-brand-background)',
  INFO_DEFAULT: 'var(--layera-color-primary)',
  NEUTRAL_LIGHT: 'var(--layera-color-surface-secondary)',
  NEUTRAL_DEFAULT: 'var(--layera-color-text-secondary)',
  NEUTRAL_DARK: 'var(--layera-color-text-primary)',
  BORDER_DEFAULT: 'var(--layera-border-primary)',
  SURFACE_DEFAULT: 'var(--layera-color-surface-hover)',
  TEXT_TERTIARY: 'var(--layera-color-text-muted)',
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
// SPACING & BORDER SYSTEMS - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
// ============================================================================

// Note: SPACING_SCALE and BORDER_RADIUS_SCALE are exported from themes.ts and design-tokens.ts
// to avoid duplicates

// ============================================================================
// CARD STYLING FUNCTIONS - ENTERPRISE PATTERNS
// ============================================================================

// Note: Card styling functions are also exported from cards.ts
// This provides backward compatibility

// ============================================================================
// FILE UPLOAD & VALIDATION CONSTANTS - Enterprise File Handling
// ============================================================================

/**
 * File Size Limits - Single Source of Truth για file upload restrictions
 * Technical limits για διαφορετικές κατηγορίες αρχείων
 */
export const FILE_SIZE_LIMITS = {
  CAD_MAX_MB: 500,     // CAD files maximum size in MB
  DOCUMENT_MAX_MB: 200, // Document files maximum size in MB
  IMAGE_MAX_MB: 50,    // Standard image files maximum size in MB
  IMAGE_LARGE_MB: 100, // Large image files (TIFF) maximum size in MB
  IMAGE_SMALL_MB: 25,  // Small image files (BMP) maximum size in MB
  VECTOR_MAX_MB: 10    // Vector graphics maximum size in MB
} as const;

/**
 * File System Constraints - Operating System & Browser Limits
 */
export const FILE_SYSTEM_LIMITS = {
  MAX_FILENAME_LENGTH: 255, // Maximum filename length (Windows/Linux/Mac)
  MAX_PATH_LENGTH: 4096,    // Maximum full path length
  MAX_UPLOAD_COUNT: 10      // Maximum simultaneous file uploads
} as const;

/**
 * Search & Results Constants - UI Limits
 * Single Source of Truth για search result limitations
 */
export const SEARCH_LIMITS = {
  MAX_OCCUPATION_RESULTS: 10,  // Maximum ESCO occupation search results
  MAX_SEARCH_RESULTS: 50,      // General maximum search results
  DEFAULT_PAGE_SIZE: 20,       // Default pagination size
  TOTAL_ESCO_OCCUPATIONS: 3007 // Total available ESCO occupations (EU official count)
} as const;

/**
 * Leaflet Map Offsets - UI Positioning Constants
 * Single Source of Truth για popup and tooltip positioning
 */
export const LEAFLET_UI_OFFSETS = {
  POPUP_OFFSET_Y: -34,    // Popup anchor Y offset - Leaflet API constant
  TOOLTIP_OFFSET_Y: -28,  // Tooltip anchor Y offset - Leaflet API constant
  DEFAULT_POPUP_X: 0,     // Default popup X offset
  DEFAULT_TOOLTIP_X: 0    // Default tooltip X offset
} as const;

/**
 * Ruler & Measurement Scale Constants - Geometric Tick Values
 * Single Source of Truth για ruler tick intervals and scale measurements
 */
export const RULER_TICK_VALUES = {
  SMALL_TICK: 50,           // Small scale tick value - geometric constant
  MEDIUM_TICK: 200,         // Medium scale tick value - geometric constant
  LARGE_TICK: 500,          // Large scale tick value - geometric constant
  LARGE_TICK_2: 1000,       // Large scale tick value 2 - geometric constant
  INTERMEDIATE_TICK_1: 2000, // Intermediate tick value 1 - geometric constant
  INTERMEDIATE_TICK_2: 5000, // Intermediate tick value 2 - geometric constant
  INTERMEDIATE_TICK_3: 10000, // Intermediate tick value 3 - geometric constant
  XL_TICK: 20000,           // Extra large tick value - geometric constant
  XXL_TICK: 50000,          // Extra extra large tick value - geometric constant
  MAX_TICK: 100000          // Maximum normalized tick value
} as const;

/**
 * Image Compression Constants - Optimization Settings
 * Single Source of Truth για image compression parameters
 */
export const COMPRESSION_SETTINGS = {
  WEBP_SAVINGS_PERCENT: 25,     // WebP average savings over JPEG (25-30%)
  WEBP_MAX_SAVINGS_PERCENT: 30, // WebP maximum savings percentage
  JPEG_HIGH_QUALITY: 85,        // High quality JPEG setting
  JPEG_MEDIUM_QUALITY: 80,      // Medium quality JPEG setting
  WEBP_HIGH_QUALITY: 85,        // High quality WebP setting
  WEBP_MEDIUM_QUALITY: 80,      // Medium quality WebP setting
  PNG_HIGH_QUALITY: 90,         // High quality PNG setting
  PNG_LOSSLESS_QUALITY: 100,    // PNG lossless compression
  // Size-based quality adjustments
  LARGE_FILE_QUALITY: 70,       // Quality for files > 5MB
  MEDIUM_FILE_QUALITY: 75,      // Quality for files > 2MB
  // Dimension limits for large files
  MAX_LARGE_WIDTH: 2000,        // Max width for large files
  MAX_LARGE_HEIGHT: 2000,       // Max height for large files
  MAX_MEDIUM_WIDTH: 2500,       // Max width for medium files
  MAX_MEDIUM_HEIGHT: 2500,      // Max height for medium files
  // Dimension thresholds for compression recommendations
  LARGE_DIMENSION_THRESHOLD: 3000, // Threshold for large dimension warning
  RECOMMENDED_MAX_WIDTH: 2500,     // Recommended maximum width
  RECOMMENDED_MAX_HEIGHT: 2500,    // Recommended maximum height
  // Quality ranges for lossy formats
  MIN_QUALITY: 0,               // Minimum quality value
  MAX_QUALITY: 100              // Maximum quality value
} as const;

/**
 * PROPERTY VALIDATION CONSTANTS
 * Validation constraints για property data input
 */
export const PROPERTY_VALIDATION = {
  // Building construction year constraints
  MIN_BUILDING_YEAR: 1800,         // Earliest reasonable building year for property validation
  MAX_BUILDING_YEAR: new Date().getFullYear() + 5, // Maximum future building year (current + 5 years)

  // Property area constraints (square meters)
  MIN_PROPERTY_AREA: 10,           // Minimum property area validation (10 sq.m)
  MAX_PROPERTY_AREA: 100000,       // Maximum property area validation (10 hectares)

  // Property value constraints (EUR)
  MIN_PROPERTY_VALUE: 1000,        // Minimum property value for validation
  MAX_PROPERTY_VALUE: 50000000     // Maximum property value for validation (50M EUR)
} as const;

/**
 * LEAFLET MAP ICON CONSTANTS
 * Icon sizing constraints για Leaflet map markers - LEAFLET API requirements
 */
export const LEAFLET_ICON_SIZES = {
  // Standard icon sizes για Leaflet markers
  SMALL: 16,                       // Small marker icon size (16x16px)
  MEDIUM: 24,                      // Medium marker icon size (24x24px)
  STANDARD: 32,                    // Standard marker icon size (32x32px) - Leaflet default
  LARGE: 48,                       // Large marker icon size (48x48px)
  XL: 64,                          // Extra large marker icon size (64x64px)

  // Shadow offsets για marker shadows
  SHADOW_ANCHOR_X: 12,             // Shadow horizontal anchor point
  SHADOW_ANCHOR_Y: 41,             // Shadow vertical anchor point

  // Popup anchor offsets
  POPUP_ANCHOR_Y: -34              // Popup vertical anchor offset from icon center
} as const;

/**
 * 🎨 UI WIDTH CONSTANTS
 * Standard width percentages για UI components
 */
export const UI_WIDTH_PERCENTAGES = {
  SMALL: 20,                       // Small width percentage (20%)
  MEDIUM: 40,                      // Medium width percentage (40%)
  LARGE: 60,                       // Large width percentage (60%)
  XL: 80,                          // Extra large width percentage (80%)
  FULL: 100                        // Full width percentage (100%)
} as const;

/**
 * ADDRESS PARSING CONSTANTS
 * Priority values and sorting constants για address parsing
 */
export const ADDRESS_PARSING = {
  // Priority values για address component sorting
  DEFAULT_PRIORITY: 999,           // Default priority for unknown address types - sorting constant
  HIGH_PRIORITY: 1,                // High priority for important address components
  MEDIUM_PRIORITY: 5,              // Medium priority for standard address components
  LOW_PRIORITY: 10,                // Low priority for optional address components

  // Parsing configuration
  MAX_COMPONENTS: 20,              // Maximum address components to process
  MIN_COMPONENT_LENGTH: 2,         // Minimum length for valid address component
  SEPARATOR_THRESHOLD: 3           // Minimum separators to trigger component split
} as const;

/**
 * UI ANIMATION TIMING CONSTANTS
 * Standardized timing values για UI animations and delays
 */
export const UI_TIMING = {
  // Component update delays
  DEBOUNCE_SHORT: 300,             // Short debounce delay (300ms) - user input
  DEBOUNCE_MEDIUM: 500,            // Medium debounce delay (500ms) - search
  DEBOUNCE_LONG: 1000,             // Long debounce delay (1000ms) - address updates

  // Animation durations
  TRANSITION_FAST: 150,            // Fast transition duration (150ms)
  TRANSITION_NORMAL: 250,          // Normal transition duration (250ms)
  TRANSITION_SLOW: 400,            // Slow transition duration (400ms)

  // Loading states
  LOADING_SPINNER_MIN: 500,        // Minimum spinner display time
  LOADING_TIMEOUT: 5000            // Maximum loading timeout
} as const;

/**
 * 📚 CRYPTOGRAPHIC CONSTANTS
 * Standard values για cryptographic operations
 */
export const CRYPTOGRAPHIC_CONSTANTS = {
  // Bit manipulation values
  BIT_32: 32,                      // 32-bit integer conversion mask
  BIT_16: 16,                      // 16-bit integer conversion mask
  BIT_8: 8,                        // 8-bit integer conversion mask

  // Hash function constants
  HASH_MASK_32BIT: 0x7FFFFFFF,     // 32-bit hash mask (2^31 - 1)
  HASH_MULTIPLIER: 31,             // Standard hash multiplier

  // TOTP constants
  TOTP_WINDOW: 30,                 // TOTP time window in seconds
  TOTP_DIGITS: 6,                  // Number of TOTP digits
  TOTP_COUNTER_SIZE: 8             // TOTP counter size in bytes
} as const;

/**
 * 📐 Z-INDEX LAYERING CONSTANTS
 * Standard z-index values για UI layering
 */
export const UI_Z_INDEX_LAYERS = {
  // Base layers
  BACKGROUND: 0,                   // Background layer (default)
  BASE: 10,                        // Base content layer
  CONTENT: 50,                     // Standard content layer

  // Interactive layers
  OVERLAY: 100,                    // Standard overlay layer
  DROPDOWN: 200,                   // Dropdown menus layer
  STICKY: 300,                     // Sticky elements layer

  // Modal layers
  MODAL_BACKDROP: 1000,            // Modal backdrop layer
  MODAL_CONTENT: 1010,             // Modal content layer
  TOAST: 2000,                     // Toast notifications layer

  // Critical layers
  TOOLTIP: 5000,                   // Tooltip layer (highest UI)
  DEBUG: 9999                      // Debug overlays (development only)
} as const;

// ============================================================================
// SEMANTIC COLORS MOVED TO STYLE DICTIONARY
// ============================================================================

/**
 * 🎨 SEMANTIC COLORS
 * Όλες οι semantic color values μεταφέρθηκαν στο Style Dictionary
 * Χρησιμοποιήστε: var(--layera-color-semantic-error-primary), κλπ
 *
 * @see packages/tokens/src/domains/color-semantic.json
 */

// ============================================================================
// DEMO DATA CONSTANTS - Sample Data & Test Values
// ============================================================================

/**
 * Sample Account Data - Used in i18n templates and demo environments
 * SINGLE SOURCE OF TRUTH για δεδομένα παραδείγματος
 */
export const DEMO_ACCOUNT_DATA = {
  ACCOUNT_CREATION: {
    YEAR: 2025,
    MONTH: 10, // Οκτώβριος
    DAY: 17,
    HOUR: 12,
    MINUTE: 4,
    SECOND: 9,
    PERIOD: 'μ.μ.' // Ελληνικό format
  },
  LAST_SIGNIN: {
    YEAR: 2025,
    MONTH: 11, // Νοέμβριος
    DAY: 5,
    HOUR: 12,
    MINUTE: 41,
    SECOND: 2,
    PERIOD: 'μ.μ.'
  },
  USER_INFO: {
    EMAIL: 'georgios.pagonis@gmail.com',
    DISPLAY_NAME: 'Georgios Pagonis',
    USER_ID: 'Z55xqJg38uRapVrvUlgwkf1',
    ROLE: 'Ιδιωτικός',
    EMAIL_VERIFIED: 'Επαληθευμένο',
    MFA_ENABLED: 'Απενεργοποιημένο'
  }
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
    defaultStrokeColor: 'var(--layera-color-primary)',
    defaultFillColor: 'var(--layera-color-brand-light)',
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
  debug: {
    cursorThrottleMs: 120,
    maxElementStackSize: 6,
    maxHTMLSliceLength: 80,
    maxLiveStackSize: 5,
  },
} as const;