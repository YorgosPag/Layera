// Clean barrel exports - Single Source of Truth
export { SPACING_SCALE, BORDER_RADIUS_SCALE, CSS_DESIGN_TOKENS, COMPONENT_DESIGN_TOKENS } from './design-tokens';

// Card functions - explicit re-exports
export {
  WORKFLOW_CARD_STYLES,
  getCardInfoColor,
  getCardInfoBorder,
  getCardOrangeColor
} from './cards';

// Additional card color aliases
export { getCardInfoColor as getCardSuccessColor } from './cards';
export { getCardInfoColor as getCardPrimaryColor } from './cards';
export { GEO_DRAWING_INTERACTION } from './geo-drawing';
export {
  DEMO_ACCOUNT_DATA,
  CONFIG,
  ANIMATION_DURATIONS,
  SEMANTIC_RGB_COLORS,
  DEVICE_BREAKPOINTS,
  LEAFLET_MARKER_DIMENSIONS,
  LEAFLET_ICON_SIZES,
  SEARCH_LIMITS,
  LEAFLET_UI_OFFSETS,
  XML_NAMESPACES,
  RULER_TICK_VALUES,
  GEOMETRIC_LIMITS,
  ICON_DIMENSIONS,
  Z_INDEX_LAYERS,
  WORKFLOW_ORDER,
  FIXED_DIMENSIONS,
  DEMO_PROPERTY_DATA,
  FILE_SIZE_LIMITS as FILE_SIZE_CONSTANTS,
  DEV_PORTS,
  LOCAL_URLS,
  EARTH_CONSTANTS,
  PROPERTY_VALIDATION
} from './config';
export { FORM_STATES } from './states';

// Forms exports
export {
  FORM_TYPES,
  INPUT_VARIANTS,
  VALIDATION_RULES,
  AUTOCOMPLETE_VALUES,
  FIELD_SIZES,
  FORM_VALIDATION
} from './forms';

// Sizes exports
export {
  COMPONENT_SIZES,
  FORM_SIZES,
  BUTTON_SIZES,
  BUTTON_SIZE_SCALE,
  ICON_SIZES,
  TABLE_COLUMN_WIDTHS
} from './sizes';

export * from './theme-engine';              // αν δεν συγκρούεται
// export * from './legacy-aliases';            // file missing - disabled
export const LAYERA_CONSTANTS_VERSION = '1.0.0';

// Temporary placeholder exports για missing constants
export const MENU_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
} as const;

export const PIPELINE_STEP = {
  UPLOAD: 'upload',
  PROCESS: 'process',
  COMPLETE: 'complete'
} as const;

// React hooks & providers - ΔΙΟΡΘΩΣΗ: Direct export από υπάρχον react-hooks.tsx (ΟΧΙ διπλότυπο)
export type {
  LayeraThemeContext
} from './react-hooks';

// Main React exports από το ΜΟΝΑΔΙΚΟ υπάρχον react-hooks.tsx
export {
  LayeraThemeProvider,
  useLayeraTheme,
  useDesignToken,
  useDesignTokens,
  useSpacing,
  useColor,
  useElevation,
  useMotion,
  useTypography,
  useBorderRadius,
  useZIndex,
  useComponentTokens,
  useLayeraDesignSystem,
  useResponsiveDesignTokens,
  useDesignTokenDebugger
} from './react-hooks';