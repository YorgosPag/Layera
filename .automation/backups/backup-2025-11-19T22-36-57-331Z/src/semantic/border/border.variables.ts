/**
 * 🔲 LAYERA BORDER SEMANTIC TOKENS
 *
 * Semantic border tokens που χαρτογραφούν core borders και colors σε συγκεκριμένες χρήσεις
 * Enterprise semantic layer για borders και outlines
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';

// BORDER COLOR SEMANTIC SCALE - Meaning-based border colors
export const BORDER_COLOR_SEMANTIC = {
  // Default borders
  default: COLOR_SCALE.secondary[200],
  subtle: COLOR_SCALE.secondary[100],
  strong: COLOR_SCALE.secondary[300],

  // Interactive borders
  interactive: COLOR_SCALE.primary[300],
  interactiveHover: COLOR_SCALE.primary[400],
  interactiveActive: COLOR_SCALE.primary[500],
  interactiveFocus: COLOR_SCALE.primary[500],

  // State borders
  success: COLOR_SCALE.success.main,
  warning: COLOR_SCALE.warning.main,
  error: COLOR_SCALE.error.main,
  info: COLOR_SCALE.info.main,

  // Disabled borders
  disabled: COLOR_SCALE.secondary[200],

  // Inverted borders
  onDark: COLOR_SCALE.secondary[300],
  onPrimary: COLOR_SCALE.primary[200],

  // Legacy aliases (από LivePlayground)
  laColorBorderLight: COLOR_SCALE.secondary[100],  // LA light border color (από LivePlayground)
} as const;

// BORDER SEMANTIC COMBINATIONS - Complete border definitions
export const BORDER_SEMANTIC = {
  // Default borders
  default: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.default}`,
  subtle: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.subtle}`,
  strong: `${BORDER_VARIABLES['border-width-2']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.strong}`,

  // Interactive borders
  interactive: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.interactive}`,
  interactiveHover: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.interactiveHover}`,
  interactiveActive: `${BORDER_VARIABLES['border-width-2']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.interactiveActive}`,
  focus: `${BORDER_VARIABLES['border-width-2']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.interactiveFocus}`,

  // State borders
  success: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.success}`,
  warning: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.warning}`,
  error: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.error}`,
  info: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-solid']} ${BORDER_COLOR_SEMANTIC.info}`,

  // Special borders
  disabled: `${BORDER_VARIABLES['border-width-1']} ${BORDER_VARIABLES['border-style-dashed']} ${BORDER_COLOR_SEMANTIC.disabled}`,
  none: BORDER_VARIABLES['border-style-none'],
} as const;

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

// Helper types για type safety
export type BorderColorSemantic = keyof typeof BORDER_COLOR_SEMANTIC;
export type BorderSemantic = keyof typeof BORDER_SEMANTIC;