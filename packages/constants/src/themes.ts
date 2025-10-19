/**
 * Theme and design token constants
 */

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
  SYSTEM: 'system'
} as const;

export const COLOR_SCHEMES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral'
} as const;

export const COMPONENT_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  GHOST: 'ghost',
  OUTLINE: 'outline',
  LINK: 'link',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export const ELEVATION_LEVELS = {
  NONE: 0,
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
  XXL: 6
} as const;

export const BORDER_RADIUS = {
  NONE: 0,
  XS: 2,
  SM: 4,
  MD: 6,
  LG: 8,
  XL: 12,
  XXL: 16,
  FULL: 9999
} as const;

export const SPACING_SCALE = {
  NONE: 0,
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64
} as const;

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  // Υψηλά z-index για elements που πρέπει να εμφανίζονται πάνω από χάρτες
  MAP_OVERLAY: 10000,
  MAP_MODAL: 10050
} as const;

// Type exports
export type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES];
export type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];
export type ComponentVariant = typeof COMPONENT_VARIANTS[keyof typeof COMPONENT_VARIANTS];
export type ElevationLevel = typeof ELEVATION_LEVELS[keyof typeof ELEVATION_LEVELS];
export type BorderRadius = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS];
export type SpacingScale = typeof SPACING_SCALE[keyof typeof SPACING_SCALE];
export type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX];