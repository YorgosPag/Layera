/**
 * @layera/constants - Configuration
 *
 * SINGLE SOURCE OF TRUTH για όλες τις configuration τιμές
 * Enterprise-grade centralized configuration management
 */

// External APIs & Services
import { EXTERNAL_APIS, LEAFLET_INFRASTRUCTURE } from './external-apis';
// Animation Durations
import { ANIMATION_DURATIONS } from './animation-durations';
// Demo Property Data
import { DEMO_PROPERTY_DATA } from './demo-property-data';
// Geometric & UI Constants
import { GEOMETRIC_LIMITS, ICON_DIMENSIONS, UI_DIMENSIONS } from './geometric-limits';
// UI Layers, Workflow & Geospatial
import { Z_INDEX_LAYERS, WORKFLOW_ORDER, GEOSPATIAL_SERVICES } from './ui-layers';
// Design System & XML
import { XML_NAMESPACES, ESCO_NAMESPACES, DEVICE_FRAME_COLORS, SVG_DIMENSIONS, ICON_SIZES, LEAFLET_MARKER_DIMENSIONS } from './design-system';
// Development & Geo Configuration
import { DEV_PORTS, LOCAL_URLS, MAP_DEFAULTS, DRAWING_LIMITS, EARTH_CONSTANTS, GEOGRAPHIC_BOUNDS } from './dev-config';
// Device Specifications
import { MOBILE_DEVICE_SPECS, DEVICE_BREAKPOINTS, DEVICE_VIEWPORTS, CSS_DIMENSIONS, FIXED_DIMENSIONS } from './device-specs';
// Brand System
import { BRAND_COLORS, UI_COLORS, FONT_SIZES, FONT_WEIGHTS, ANIMATION_DISTANCES, EASING_FUNCTIONS } from './brand-system';

// ============================================================================
// EXTERNAL APIs & SERVICES - Imported from external-apis.ts
// ============================================================================
// External services now imported from external-apis.ts for better organization

// ============================================================================
// UI ANIMATION & INTERACTION DURATIONS - Imported from animation-durations.ts
// ============================================================================
// Animation durations now imported from animation-durations.ts for better organization

// ============================================================================
// DEMO & SAMPLE DATA - Imported from demo-property-data.ts
// ============================================================================
// Demo property data now imported from demo-property-data.ts for better organization

// ============================================================================
// GEOMETRIC & UI CONSTANTS - Imported from geometric-limits.ts
// ============================================================================
// Geometric & UI constants now imported from geometric-limits.ts for better organization

// ============================================================================
// UI LAYER MANAGEMENT, WORKFLOW & GEOSPATIAL - Imported from ui-layers.ts
// ============================================================================
// UI layers, workflow & geospatial services now imported from ui-layers.ts for better organization

// ============================================================================
// DESIGN SYSTEM & XML - Imported from design-system.ts
// ============================================================================
// XML namespaces, device frame colors & SVG dimensions now imported from design-system.ts

// ============================================================================
// DEVELOPMENT & GEO CONFIGURATION - Imported from dev-config.ts
// ============================================================================
// Development ports, local URLs & geographic bounds now imported from dev-config.ts

// ============================================================================
// DEVICE SPECIFICATIONS & BRAND SYSTEM - Imported from separate files
// ============================================================================
// Device specs, brand colors, typography & animations now imported from specialized files

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

// ============================================================================
// RE-EXPORTS για Backward Compatibility
// ============================================================================
export { EXTERNAL_APIS, LEAFLET_INFRASTRUCTURE } from './external-apis';
export { ANIMATION_DURATIONS } from './animation-durations';
export { DEMO_PROPERTY_DATA } from './demo-property-data';
export { GEOMETRIC_LIMITS, ICON_DIMENSIONS, UI_DIMENSIONS } from './geometric-limits';
export { Z_INDEX_LAYERS, WORKFLOW_ORDER, GEOSPATIAL_SERVICES } from './ui-layers';
export { XML_NAMESPACES, ESCO_NAMESPACES, DEVICE_FRAME_COLORS, SVG_DIMENSIONS, ICON_SIZES, LEAFLET_MARKER_DIMENSIONS } from './design-system';
export { DEV_PORTS, LOCAL_URLS, MAP_DEFAULTS, DRAWING_LIMITS, EARTH_CONSTANTS, GEOGRAPHIC_BOUNDS } from './dev-config';
export { MOBILE_DEVICE_SPECS, DEVICE_BREAKPOINTS, DEVICE_VIEWPORTS, CSS_DIMENSIONS, FIXED_DIMENSIONS } from './device-specs';
export { BRAND_COLORS, UI_COLORS, FONT_SIZES, FONT_WEIGHTS, ANIMATION_DISTANCES, EASING_FUNCTIONS } from './brand-system';