/**
 * Constants Barrel Export - Single Source of Truth
 *
 * Consolidates all constant imports into one centralized location
 * Reduces import variables from ~50+ to ~8-10 (MASSIVE consolidation)
 */

// Design System Constants
export {
  XML_NAMESPACES,
  ESCO_NAMESPACES,
  DEVICE_FRAME_COLORS,
  SVG_DIMENSIONS,
  ICON_SIZES,
  LEAFLET_MARKER_DIMENSIONS
} from './design-system';

// Development & Geo Configuration
export {
  DEV_PORTS,
  LOCAL_URLS,
  MAP_DEFAULTS,
  DRAWING_LIMITS,
  EARTH_CONSTANTS,
  GEOGRAPHIC_BOUNDS
} from './dev-config';

// Device Specifications
export {
  MOBILE_DEVICE_SPECS,
  DEVICE_BREAKPOINTS,
  DEVICE_VIEWPORTS,
  CSS_DIMENSIONS,
  FIXED_DIMENSIONS
} from './device-specs';

// Brand System
export {
  BRAND_COLORS,
  UI_COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ANIMATION_DISTANCES,
  EASING_FUNCTIONS
} from './brand-system';

// API & File Configuration
export {
  API_STATUS,
  API_TIMEOUTS,
  FILE_SIZE_LIMITS,
  FILE_SYSTEM_LIMITS,
  SEARCH_LIMITS
} from './api-file-config';

// UI Measurement
export {
  LEAFLET_UI_OFFSETS,
  RULER_TICK_VALUES,
  COMPRESSION_SETTINGS,
  PROPERTY_VALIDATION
} from './ui-measurement';

// UI Utilities
export {
  UI_WIDTH_PERCENTAGES,
  ADDRESS_PARSING,
  UI_TIMING,
  CRYPTOGRAPHIC_CONSTANTS,
  UI_Z_INDEX_LAYERS
} from './ui-utilities';

// Demo & Legacy Configuration
export {
  DEMO_ACCOUNT_DATA,
  CONFIG
} from './demo-legacy-config';