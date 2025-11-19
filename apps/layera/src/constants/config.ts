/**
 * @layera/constants - Configuration
 *
 * SINGLE SOURCE OF TRUTH για όλες τις configuration τιμές
 * Enterprise-grade centralized configuration management
 */

// External APIs & Services
import { EXTERNAL_APIS, LEAFLET_INFRASTRUCTURE } from './external-apis';
// Animation Durations - imported only for re-export
// Demo Property Data - imported only for re-export
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
// Demo & Legacy Configuration
import { DEMO_ACCOUNT_DATA, CONFIG } from './demo-legacy-config';

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
// SEMANTIC COLORS - Moved to Style Dictionary
// ============================================================================
// All semantic colors moved to @see packages/tokens/src/domains/color-semantic.json
// Use CSS variables: var(--layera-color-semantic-error-primary), etc.

// ============================================================================
// DEMO DATA & LEGACY CONFIG - Imported from demo-legacy-config.ts
// ============================================================================

// Demo account data and legacy CONFIG object now imported from demo-legacy-config.ts

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
export { DEMO_ACCOUNT_DATA, CONFIG } from './demo-legacy-config';