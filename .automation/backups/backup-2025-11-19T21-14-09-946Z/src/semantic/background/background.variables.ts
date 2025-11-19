/**
 * 🎨 LAYERA BACKGROUND SEMANTIC TOKENS
 *
 * Semantic background tokens που χαρτογραφούν core colors σε συγκεκριμένες χρήσεις
 * Enterprise semantic layer για backgrounds και surfaces
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';

// BACKGROUND SEMANTIC SCALE - Meaning-based background colors
export const BACKGROUND_SEMANTIC = {
  // Primary surfaces
  primary: COLOR_SCALE.primary[500],
  primaryLight: COLOR_SCALE.primary[100],
  primaryDark: COLOR_SCALE.primary[700],

  // Secondary surfaces
  secondary: COLOR_SCALE.secondary[100],
  secondaryLight: COLOR_SCALE.secondary[50],
  secondaryDark: COLOR_SCALE.secondary[200],

  // Base surfaces
  default: COLOR_SCALE.neutral.white,
  subtle: COLOR_SCALE.secondary[50],
  muted: COLOR_SCALE.secondary[100],

  // Interactive surfaces
  hover: COLOR_SCALE.secondary[50],
  active: COLOR_SCALE.secondary[100],
  disabled: COLOR_SCALE.secondary[100],

  // State surfaces
  success: COLOR_SCALE.success.light,
  warning: COLOR_SCALE.warning.light,
  error: COLOR_SCALE.error.light,
  info: COLOR_SCALE.info.light,

  // Surface layers (από modal.css)
  surfacePrimary: COLOR_SCALE.neutral.white,         // Primary surface (από modal.css)
  surfaceDark: COLOR_SCALE.secondary[800],           // Dark surface (από modal.css)

  // Overlay layers (από modal.css)
  overlayDark: `rgba(0, 0, 0, 0.5)`,                // Dark overlay (από modal.css)

  // Legacy aliases (από LivePlayground)
  lightSurfaceSecondary: COLOR_SCALE.secondary[50],  // Light surface secondary (από LivePlayground)
  laBgPrimary: COLOR_SCALE.primary[500],             // LA primary background (από LivePlayground)
} as const;

// UNIFIED BACKGROUND VARIABLES - CSS Variables για export
export const BACKGROUND_VARIABLES = {
  'background-primary': COLOR_SCALE.primary[500],
  'background-primary-light': COLOR_SCALE.primary[100],
  'background-primary-dark': COLOR_SCALE.primary[700],

  'background-secondary': COLOR_SCALE.secondary[100],
  'background-secondary-light': COLOR_SCALE.secondary[50],
  'background-secondary-dark': COLOR_SCALE.secondary[200],

  'background-default': COLOR_SCALE.neutral.white,
  'background-subtle': COLOR_SCALE.secondary[50],
  'background-muted': COLOR_SCALE.secondary[100],

  'background-hover': COLOR_SCALE.secondary[50],
  'background-active': COLOR_SCALE.secondary[100],
  'background-disabled': COLOR_SCALE.secondary[100],

  'background-success': COLOR_SCALE.success.light,
  'background-warning': COLOR_SCALE.warning.light,
  'background-error': COLOR_SCALE.error.light,
  'background-info': COLOR_SCALE.info.light,

  // Surface layers (από modal.css)
  'color-surface-primary': COLOR_SCALE.neutral.white,         // Primary surface (από modal.css)
  'color-surface-dark': COLOR_SCALE.secondary[800],           // Dark surface (από modal.css)

  // Overlay layers (από modal.css)
  'color-semantic-overlay-dark': `rgba(0, 0, 0, 0.5)`,       // Dark overlay (από modal.css)
} as const;

// Helper types για type safety
export type BackgroundSemantic = keyof typeof BACKGROUND_SEMANTIC;