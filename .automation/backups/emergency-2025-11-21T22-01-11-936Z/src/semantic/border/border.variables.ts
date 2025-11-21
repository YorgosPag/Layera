/**
 * 🔲 LAYERA BORDER SEMANTIC TOKENS
 *
 * Semantic border tokens που χαρτογραφούν core borders και colors σε συγκεκριμένες χρήσεις
 * Enterprise semantic layer για borders και outlines
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';

// BORDER COLOR SEMANTIC SCALE - Αφαιρέθηκε διπλότυπο export - μόνο BORDER_SEMANTIC_VARIABLES

// BORDER SEMANTIC COMBINATIONS - Αφαιρέθηκε διπλότυπο export - μόνο BORDER_SEMANTIC_VARIABLES

// UNIFIED BORDER VARIABLES - CSS Variables για export
export const BORDER_SEMANTIC_VARIABLES = {
  // Border colors
  'border-color-default': COLOR_SCALE.secondary[200],
  'border-color-subtle': COLOR_SCALE.secondary[100],
  'border-color-strong': COLOR_SCALE.secondary[300],
  'border-color-interactive': COLOR_SCALE.primary[300],
  'border-color-interactive-hover': COLOR_SCALE.primary[400],
  'border-color-interactive-active': COLOR_SCALE.primary[500],
  'border-color-focus': COLOR_SCALE.primary[500],
  'border-color-success': COLOR_SCALE.success.main,
  'border-color-warning': COLOR_SCALE.warning.main,
  'border-color-error': COLOR_SCALE.error.main,
  'border-color-info': COLOR_SCALE.info.main,
  'border-color-disabled': COLOR_SCALE.secondary[200],
  'border-color-on-dark': COLOR_SCALE.secondary[300],
  'border-color-on-primary': COLOR_SCALE.primary[200],

  // Complete border definitions
  'border-default': '1px solid var(--layera-color-secondary-200)',
  'border-subtle': '1px solid var(--layera-color-secondary-100)',
  'border-strong': '2px solid var(--layera-color-secondary-300)',
  'border-interactive': '1px solid var(--layera-color-primary-300)',
  'border-interactive-hover': '1px solid var(--layera-color-primary-400)',
  'border-interactive-active': '2px solid var(--layera-color-primary-500)',
  'border-focus': '2px solid var(--layera-color-primary-500)',
  'border-success': '1px solid var(--layera-color-success-main)',
  'border-warning': '1px solid var(--layera-color-warning-main)',
  'border-error': '1px solid var(--layera-color-error-main)',
  'border-info': '1px solid var(--layera-color-info-main)',
  'border-disabled': '1px dashed var(--layera-color-secondary-200)',
  'border-none': 'none',
} as const;

// Alias export για backward compatibility
export const BORDER_SEMANTIC = BORDER_SEMANTIC_VARIABLES;

// Helper types για type safety
export type BorderSemanticVariables = keyof typeof BORDER_SEMANTIC_VARIABLES;