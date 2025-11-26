/**
 * ✏️ LAYERA TEXT SEMANTIC TOKENS
 *
 * Semantic text tokens που χαρτογραφούν core colors σε συγκεκριμένες text χρήσεις
 * Enterprise semantic layer για typography colors
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';

// TEXT SEMANTIC SCALE - Αφαιρέθηκε διπλότυπο export - μόνο TEXT_VARIABLES

// UNIFIED TEXT VARIABLES - CSS Variables για export
export const TEXT_VARIABLES = {
  'text-primary': COLOR_SCALE.neutral.dark,
  'text-secondary': COLOR_SCALE.neutral.medium,
  'text-tertiary': COLOR_SCALE.secondary[400],
  'text-disabled': COLOR_SCALE.secondary[300],

  'text-link': COLOR_SCALE.primary[600],
  'text-link-hover': COLOR_SCALE.primary[700],
  'text-link-visited': COLOR_SCALE.primary[800],

  'text-on-primary': COLOR_SCALE.neutral.white,
  'text-on-secondary': COLOR_SCALE.neutral.dark,
  'text-on-dark': COLOR_SCALE.neutral.white,
  'text-on-light': COLOR_SCALE.neutral.dark,

  'text-success': COLOR_SCALE.success.dark,
  'text-warning': COLOR_SCALE.warning.dark,
  'text-error': COLOR_SCALE.error.dark,
  'text-info': COLOR_SCALE.info.dark,

  'text-brand': COLOR_SCALE.primary[600],
  'text-brand-light': COLOR_SCALE.primary[500],
  'text-brand-dark': COLOR_SCALE.primary[700],
} as const;

// Helper types για type safety
export type TextVariables = keyof typeof TEXT_VARIABLES;