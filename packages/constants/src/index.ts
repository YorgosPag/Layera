/**
 * @layera/constants
 * Centralized constants and configuration values for the Layera design system
 */

// Sizes
export * from './sizes';

// States
export * from './states';

// Roles and permissions
export * from './roles';

// Pipeline steps
export * from './pipeline-steps';

// Forms
export * from './forms';

// Tables
export * from './tables';

// Themes
export {
  THEME_MODES,
  COLOR_SCHEMES,
  COMPONENT_VARIANTS,
  ELEVATION_LEVELS,
  BORDER_RADIUS_CSS_VARS,
  BORDER_RADIUS_UTILITIES,
  getBorderRadiusVar,
  getBorderRadiusValue,
  type ThemeMode,
  type ColorScheme,
  type ComponentVariant,
  type ElevationLevel,
  type BorderRadiusCategory
} from './themes';

// Configuration - SINGLE SOURCE OF TRUTH
export {
  EXTERNAL_APIS,
  LEAFLET_INFRASTRUCTURE,
  GEOSPATIAL_SERVICES,
  XML_NAMESPACES,
  ESCO_NAMESPACES,
  DEVICE_FRAME_COLORS,
  SVG_DIMENSIONS,
  LEAFLET_MARKER_DIMENSIONS,
  DEV_PORTS,
  LOCAL_URLS,
  MOBILE_DEVICE_SPECS,
  DEVICE_BREAKPOINTS,
  DEVICE_VIEWPORTS,
  CSS_DIMENSIONS,
  FIXED_DIMENSIONS,
  BRAND_COLORS,
  UI_COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ANIMATION_DURATIONS,
  ANIMATION_DISTANCES,
  EASING_FUNCTIONS,
  API_STATUS,
  API_TIMEOUTS,
  CONFIG,
  DEMO_ACCOUNT_DATA,
  GEOMETRIC_LIMITS,
  ICON_DIMENSIONS,
  UI_DIMENSIONS,
  LEAFLET_UI_OFFSETS,
  RULER_TICK_VALUES,
  SEARCH_LIMITS,
  PROPERTY_VALIDATION,
  LEAFLET_ICON_SIZES,
  SEMANTIC_RGB_COLORS,
  FILE_SIZE_LIMITS,
  FILE_SIZE_LIMITS as FILE_SIZE_CONSTANTS,
  WORKFLOW_ORDER,
  Z_INDEX_LAYERS,
  DEMO_PROPERTY_DATA
} from './config';

// Cards - Unified Card Styling Constants - SINGLE SOURCE OF TRUTH
export {
  WORKFLOW_CARD_STYLES,
  getWorkflowCardContainerStyle,
  getWorkflowCardModalStyle,
  getWorkflowCardButtonStyle,
  getWorkflowCardStepStyle,
  getWorkflowCardStepContainerStyle,
  getCardPrimaryColor,
  getCardSuccessColor,
  getCardErrorColor,
  getCardWarningColor,
  getCardInfoColor,
  getCardInfoBorder,
  getCardOrangeColor,
  getCardPrimaryBorder,
  getCardSuccessBorder,
  getCardErrorBorder,
  getCardWarningBorder
} from './cards';

// Navigation
export * from './navigation';

// Snap system
export * from './snap';

// Geo-Drawing system
export * from './geo-drawing';

// Configuration Constants - SSOT για όλες τις configuration τιμές
export {
  MAP_DEFAULTS,
  DRAWING_LIMITS,
  EARTH_CONSTANTS
} from './config';

// Design Token System - World-class enterprise patterns
export {
  SPACING_SCALE,
  BORDER_RADIUS_SCALE,
  CSS_DESIGN_TOKENS,
  COMPONENT_DESIGN_TOKENS,
  type DesignTokenCategory,
  type SpacingToken,
  type ColorToken,
  type ElevationToken,
  type MotionToken,
  type TypographyToken,
  type BorderRadiusToken,
  type ZIndexToken,
  type ComponentToken,
  type SpacingScale,
  type BorderRadiusScale
} from './design-tokens';

// Advanced Theme Engine - Runtime theming
export * from './theme-engine';

// Enterprise React Hooks - Type-safe design token consumption
export * from './react-hooks';

// Version
export const LAYERA_CONSTANTS_VERSION = '1.0.0';