/**
 * 🎨 LAYERA SEMANTIC UTILITIES VARIABLES - Concrete color utility values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ για semantic color utilities!
 * Maps core colors to specific utility purposes
 *
 * Enterprise Standards:
 * - Maps from core color scale to utility meanings
 * - Extended color utilities για SVG fills, backgrounds, borders
 * - Semantic naming για specific use cases
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';
import type { SemanticUtilitiesTokensClass } from './utilities.class';

// COLOR FILL VALUES - For SVG και icon fills
export const FILL_UTILITY_VALUES = {
  primary: COLOR_SCALE.primary[500],
  secondary: COLOR_SCALE.secondary[600],
  accent: COLOR_SCALE.primary[400],
  success: COLOR_SCALE.success.main,
  warning: COLOR_SCALE.warning.main,
  error: COLOR_SCALE.error.main,
  info: COLOR_SCALE.info.main,
  neutral: COLOR_SCALE.neutral.medium,
  accentBlue: COLOR_SCALE.primary[600],    // από GoogleSignInButton.css
  accentGreen: COLOR_SCALE.success.main,   // από GoogleSignInButton.css
  accentRed: COLOR_SCALE.error.main,       // από GoogleSignInButton.css
  accentYellow: COLOR_SCALE.warning.main,  // από GoogleSignInButton.css
} as const;

// COLOR STROKE VALUES - For SVG και icon strokes
export const STROKE_UTILITY_VALUES = {
  primary: COLOR_SCALE.primary[500],
  secondary: COLOR_SCALE.secondary[600],
  accent: COLOR_SCALE.primary[400],
  success: COLOR_SCALE.success.main,
  warning: COLOR_SCALE.warning.main,
  error: COLOR_SCALE.error.main,
  info: COLOR_SCALE.info.main,
  neutral: COLOR_SCALE.neutral.medium,
} as const;

// BACKGROUND UTILITIES - Extended background values
export const BACKGROUND_UTILITY_VALUES = {
  primary: COLOR_SCALE.neutral.white,              // από GoogleSignInButton.css
  secondary: COLOR_SCALE.secondary[50],            // από GoogleSignInButton.css
  surface: COLOR_SCALE.neutral.white,              // από GoogleSignInButton.css
  surfaceDark: COLOR_SCALE.secondary[800],         // από GoogleSignInButton.css
  overlay: COLOR_SCALE.secondary[900],             // από GoogleSignInButton.css
  transparent: 'transparent',                      // από GoogleSignInButton.css
} as const;

// TEXT UTILITIES - Extended text values
export const TEXT_UTILITY_VALUES = {
  primary: COLOR_SCALE.neutral.dark,               // από GoogleSignInButton.css
  secondary: COLOR_SCALE.neutral.medium,           // από GoogleSignInButton.css
  inverted: COLOR_SCALE.neutral.white,             // από GoogleSignInButton.css
  muted: COLOR_SCALE.secondary[400],               // από GoogleSignInButton.css
  accent: COLOR_SCALE.primary[600],                // από GoogleSignInButton.css
} as const;

// BORDER UTILITIES - Extended border values
export const BORDER_UTILITY_VALUES = {
  primary: COLOR_SCALE.secondary[200],             // από GoogleSignInButton.css
  secondary: COLOR_SCALE.secondary[300],           // από GoogleSignInButton.css
  accent: COLOR_SCALE.primary[300],                // από GoogleSignInButton.css
  subtle: COLOR_SCALE.secondary[100],              // από GoogleSignInButton.css
  strong: COLOR_SCALE.secondary[400],              // από GoogleSignInButton.css
} as const;

// CONSOLIDATED SEMANTIC UTILITIES TOKENS - Ready for CSS generation
export const SEMANTIC_UTILITIES_TOKENS: SemanticUtilitiesTokensClass = {
  fill: FILL_UTILITY_VALUES,
  stroke: STROKE_UTILITY_VALUES,
  background: BACKGROUND_UTILITY_VALUES,
  text: TEXT_UTILITY_VALUES,
  border: BORDER_UTILITY_VALUES,

  // System configuration
  namespace: 'layera-colorUtilities',
  version: '1.0.0',
  colorSpace: 'sRGB',
} as const;

// CSS VARIABLES για export (από GoogleSignInButton.css)
export const SEMANTIC_UTILITIES_VARIABLES = {
  // Background utilities
  'colorUtilities-utilities-background-primary': BACKGROUND_UTILITY_VALUES.primary,
  'colorUtilities-utilities-background-secondary': BACKGROUND_UTILITY_VALUES.secondary,
  'colorUtilities-utilities-background-surface-dark': BACKGROUND_UTILITY_VALUES.surfaceDark,

  // Text utilities
  'colorUtilities-utilities-text-primary': TEXT_UTILITY_VALUES.primary,
  'colorUtilities-utilities-text-inverted': TEXT_UTILITY_VALUES.inverted,

  // Border utilities
  'colorUtilities-utilities-border-primary': BORDER_UTILITY_VALUES.primary,

  // Fill utilities (για SVG icons)
  'colorUtilities-utilities-fill-accent-blue': FILL_UTILITY_VALUES.accentBlue,
  'colorUtilities-utilities-fill-accent-green': FILL_UTILITY_VALUES.accentGreen,
} as const;

// Export για χρήση σε άλλα modules
export {
  FILL_UTILITY_VALUES as FillUtilityValues,
  STROKE_UTILITY_VALUES as StrokeUtilityValues,
  BACKGROUND_UTILITY_VALUES as BackgroundUtilityValues,
  TEXT_UTILITY_VALUES as TextUtilityValues,
  BORDER_UTILITY_VALUES as BorderUtilityValues,
};