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
// API & File Configuration
import { API_STATUS, API_TIMEOUTS, FILE_SIZE_LIMITS, FILE_SYSTEM_LIMITS, SEARCH_LIMITS } from './api-file-config';
// UI Measurement
import { LEAFLET_UI_OFFSETS, RULER_TICK_VALUES, COMPRESSION_SETTINGS, PROPERTY_VALIDATION, LEAFLET_ICON_SIZES } from './ui-measurement';
// UI Utilities
import { UI_WIDTH_PERCENTAGES, ADDRESS_PARSING, UI_TIMING, CRYPTOGRAPHIC_CONSTANTS, UI_Z_INDEX_LAYERS } from './ui-utilities';

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
// API & FILE CONFIGURATION - Imported from api-file-config.ts
// ============================================================================
// API status codes, timeouts & file handling now imported from api-file-config.ts

// UI measurement constants moved to ui-measurement.ts

// Image compression settings moved to ui-measurement.ts

// Property validation moved to ui-measurement.ts

// Leaflet icon sizes moved to ui-measurement.ts

// UI width percentages moved to ui-utilities.ts

// Address parsing constants moved to ui-utilities.ts

// UI timing constants moved to ui-utilities.ts

// Cryptographic constants moved to ui-utilities.ts

// UI Z-index layers moved to ui-utilities.ts

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
export { API_STATUS, API_TIMEOUTS, FILE_SIZE_LIMITS, FILE_SYSTEM_LIMITS, SEARCH_LIMITS } from './api-file-config';
export { LEAFLET_UI_OFFSETS, RULER_TICK_VALUES, COMPRESSION_SETTINGS, PROPERTY_VALIDATION, LEAFLET_ICON_SIZES } from './ui-measurement';
export { UI_WIDTH_PERCENTAGES, ADDRESS_PARSING, UI_TIMING, CRYPTOGRAPHIC_CONSTANTS, UI_Z_INDEX_LAYERS } from './ui-utilities';