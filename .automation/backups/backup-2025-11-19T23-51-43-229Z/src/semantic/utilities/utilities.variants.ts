/**
 * 🎨 LAYERA SEMANTIC UTILITIES VARIANTS - Color utility semantic names
 *
 * Semantic variant names για color utilities
 * Maps abstract utility names to their purposes
 */

import type {
  UtilityColorFill,
  UtilityColorStroke,
  UtilityBackground,
  UtilityText,
  UtilityBorder
} from './utilities.class';

// FILL VARIANTS - SVG/Icon fill purposes
export const FILL_VARIANTS: UtilityColorFill = {
  primary: 'primary-fill',
  secondary: 'secondary-fill',
  accent: 'accent-fill',
  success: 'success-fill',
  warning: 'warning-fill',
  error: 'error-fill',
  info: 'info-fill',
  neutral: 'neutral-fill',
  accentBlue: 'blue-accent',
  accentGreen: 'green-accent',
  accentRed: 'red-accent',
  accentYellow: 'yellow-accent',
} as const;

// STROKE VARIANTS - SVG/Icon stroke purposes
export const STROKE_VARIANTS: UtilityColorStroke = {
  primary: 'primary-stroke',
  secondary: 'secondary-stroke',
  accent: 'accent-stroke',
  success: 'success-stroke',
  warning: 'warning-stroke',
  error: 'error-stroke',
  info: 'info-stroke',
  neutral: 'neutral-stroke',
} as const;

// BACKGROUND VARIANTS - Extended background purposes
export const BACKGROUND_VARIANTS: UtilityBackground = {
  primary: 'primary-bg',
  secondary: 'secondary-bg',
  surface: 'surface-bg',
  surfaceDark: 'surface-dark-bg',
  overlay: 'overlay-bg',
  transparent: 'transparent-bg',
} as const;

// TEXT VARIANTS - Extended text purposes
export const TEXT_VARIANTS: UtilityText = {
  primary: 'primary-text',
  secondary: 'secondary-text',
  inverted: 'inverted-text',
  muted: 'muted-text',
  accent: 'accent-text',
} as const;

// BORDER VARIANTS - Extended border purposes
export const BORDER_VARIANTS: UtilityBorder = {
  primary: 'primary-border',
  secondary: 'secondary-border',
  accent: 'accent-border',
  subtle: 'subtle-border',
  strong: 'strong-border',
} as const;

// Export για χρήση σε άλλα modules
export {
  FILL_VARIANTS as FillVariants,
  STROKE_VARIANTS as StrokeVariants,
  BACKGROUND_VARIANTS as BackgroundVariants,
  TEXT_VARIANTS as TextVariants,
  BORDER_VARIANTS as BorderVariants,
};