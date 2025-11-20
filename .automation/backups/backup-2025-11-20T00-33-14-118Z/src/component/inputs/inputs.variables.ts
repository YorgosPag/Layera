/**
 * 📝 LAYERA INPUT COMPONENT TOKENS
 *
 * Component tokens για Input components που χαρτογραφούν semantic tokens σε συγκεκριμένες input χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';

// UNIFIED INPUT VARIABLES - Όλα τα input tokens ενωμένα για CSS export
export const INPUT_VARIABLES = {
  // BASE INPUT TOKENS
  'input-background': BACKGROUND_VARIABLES['background-default'],
  'input-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'input-background-readonly': BACKGROUND_VARIABLES['background-muted'],
  'input-background-focus': BACKGROUND_VARIABLES['background-default'],
  'input-background-error': BACKGROUND_VARIABLES['background-error'],
  'input-background-success': BACKGROUND_VARIABLES['background-success'],
  'input-background-warning': BACKGROUND_VARIABLES['background-warning'],

  // BORDER TOKENS
  'input-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'input-border-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],
  'input-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'input-border-disabled': BORDER_SEMANTIC_VARIABLES['border-disabled'],
  'input-border-error': BORDER_SEMANTIC_VARIABLES['border-error'],
  'input-border-success': BORDER_SEMANTIC_VARIABLES['border-success'],
  'input-border-warning': BORDER_SEMANTIC_VARIABLES['border-warning'],
  'input-border-radius': BORDER_VARIABLES['border-radius-4'],
  'input-border-width': BORDER_VARIABLES['border-width-1'],

  // TEXT TOKENS
  'input-text-color': TEXT_VARIABLES['text-primary'],
  'input-text-disabled': TEXT_VARIABLES['text-disabled'],
  'input-text-placeholder': TEXT_VARIABLES['text-tertiary'],
  'input-text-error': TEXT_VARIABLES['text-primary'],
  'input-text-success': TEXT_VARIABLES['text-primary'],
  'input-text-warning': TEXT_VARIABLES['text-primary'],

  // SIZE TOKENS - Different input sizes
  'input-sm-height': SPACING_VARIABLES['spacing-8'], // 32px
  'input-sm-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
  'input-sm-font-size': FONT_SIZE_SCALE.sm, // 14px
  'input-sm-line-height': '1.4',

  'input-md-height': SPACING_VARIABLES['spacing-10'], // 40px
  'input-md-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'input-md-font-size': FONT_SIZE_SCALE.base, // 16px
  'input-md-line-height': '1.5',

  'input-lg-height': SPACING_VARIABLES['spacing-12'], // 48px
  'input-lg-padding': `${SPACING_VARIABLES['spacing-4']} ${SPACING_VARIABLES['spacing-5']}`,
  'input-lg-font-size': FONT_SIZE_SCALE.lg, // 18px
  'input-lg-line-height': '1.6',

  // SHADOW TOKENS
  'input-shadow': 'none',
  'input-shadow-focus': SHADOW_VARIABLES['shadow-sm'],
  'input-shadow-error': `0 0 0 3px rgba(239, 68, 68, 0.1)`,
  'input-shadow-success': `0 0 0 3px rgba(34, 197, 94, 0.1)`,
  'input-shadow-warning': `0 0 0 3px rgba(245, 158, 11, 0.1)`,

  // TRANSITION TOKENS
  'input-transition': MOTION_VARIABLES['transition-normal'],

  // LABEL TOKENS
  'label-color': TEXT_VARIABLES['text-primary'],
  'label-color-disabled': TEXT_VARIABLES['text-disabled'],
  'label-font-weight': '500',
  'label-font-size': FONT_SIZE_SCALE.sm, // 14px
  'label-margin-bottom': SPACING_VARIABLES['spacing-2'],
  'label-required-color': BORDER_SEMANTIC_VARIABLES['border-error'],

  // HELPER TEXT TOKENS
  'helper-text-color': TEXT_VARIABLES['text-secondary'],
  'helper-text-error': BORDER_SEMANTIC_VARIABLES['border-error'],
  'helper-text-success': BORDER_SEMANTIC_VARIABLES['border-success'],
  'helper-text-warning': BORDER_SEMANTIC_VARIABLES['border-warning'],
  'helper-text-font-size': FONT_SIZE_SCALE.xs, // 12px
  'helper-text-margin-top': SPACING_VARIABLES['spacing-1'],

  // TEXTAREA SPECIFIC TOKENS
  'textarea-min-height': '120px',
  'textarea-resize': 'vertical',
  'textarea-line-height': '1.6',

  // SELECT SPECIFIC TOKENS
  'select-arrow-size': SPACING_VARIABLES['spacing-4'],
  'select-arrow-color': TEXT_VARIABLES['text-tertiary'],
  'select-arrow-hover-color': TEXT_VARIABLES['text-secondary'],
  'select-padding-right': SPACING_VARIABLES['spacing-8'],

  // CHECKBOX/RADIO TOKENS
  'checkbox-size': SPACING_VARIABLES['spacing-4'],
  'checkbox-border-radius': BORDER_VARIABLES['border-radius-2'],
  'checkbox-checked-background': BACKGROUND_VARIABLES['background-active'],
  'checkbox-checked-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'checkbox-checkmark-color': TEXT_VARIABLES['text-primary'],

  'radio-size': SPACING_VARIABLES['spacing-4'],
  'radio-border-radius': BORDER_VARIABLES['border-radius-full'],
  'radio-checked-background': BACKGROUND_VARIABLES['background-active'],
  'radio-checked-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'radio-dot-size': SPACING_VARIABLES['spacing-2'],

  // INPUT GROUP TOKENS
  'input-group-gap': SPACING_VARIABLES['spacing-2'],
  'input-group-border-radius': BORDER_VARIABLES['border-radius-4'],

  // ADDON TOKENS (prefix/suffix)
  'input-addon-background': BACKGROUND_VARIABLES['background-muted'],
  'input-addon-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'input-addon-color': TEXT_VARIABLES['text-secondary'],
  'input-addon-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,

  // FILE INPUT TOKENS
  'file-input-button-background': BACKGROUND_VARIABLES['background-muted'],
  'file-input-button-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'file-input-button-color': TEXT_VARIABLES['text-primary'],
  'file-input-button-hover-background': BACKGROUND_VARIABLES['background-hover'],
  'file-input-button-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,

  // RANGE INPUT TOKENS
  'range-track-height': '6px',
  'range-track-background': BACKGROUND_VARIABLES['background-muted'],
  'range-track-border-radius': BORDER_VARIABLES['border-radius-full'],
  'range-thumb-size': SPACING_VARIABLES['spacing-5'],
  'range-thumb-background': BACKGROUND_VARIABLES['background-default'],
  'range-thumb-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'range-thumb-shadow': SHADOW_VARIABLES['shadow-sm'],
  'range-thumb-hover-shadow': SHADOW_VARIABLES['shadow-md'],

  // SWITCH TOKENS
  'switch-width': '44px',
  'switch-height': '24px',
  'switch-background': BACKGROUND_VARIABLES['background-muted'],
  'switch-background-checked': BACKGROUND_VARIABLES['background-active'],
  'switch-border-radius': BORDER_VARIABLES['border-radius-full'],
  'switch-thumb-size': '20px',
  'switch-thumb-background': BACKGROUND_VARIABLES['background-default'],
  'switch-thumb-shadow': SHADOW_VARIABLES['shadow-sm'],
  'switch-thumb-translate': '20px',

  // LOADING STATE TOKENS
  'input-loading-opacity': '0.6',
  'input-loading-cursor': 'not-allowed',

  // FOCUS RING TOKENS
  'input-focus-ring-width': BORDER_VARIABLES['border-width-2'],
  'input-focus-ring-offset': SPACING_VARIABLES['spacing-0-5'], // 2px
  'input-focus-ring-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'input-focus-ring-style': 'solid',

  // INPUT VALIDATION TOKENS
  'input-valid-border': BORDER_SEMANTIC_VARIABLES['border-success'],
  'input-valid-background': BACKGROUND_VARIABLES['background-success'],
  'input-invalid-border': BORDER_SEMANTIC_VARIABLES['border-error'],
  'input-invalid-background': BACKGROUND_VARIABLES['background-error'],

  // FLOATING LABEL TOKENS
  'floating-label-color': TEXT_VARIABLES['text-tertiary'],
  'floating-label-color-focused': TEXT_VARIABLES['text-primary'],
  'floating-label-font-size': FONT_SIZE_SCALE.xs, // 12px
  'floating-label-transform': 'translateY(-20px) scale(0.875)',
  'floating-label-transition': MOTION_VARIABLES['transition-normal'],

  // INPUT STEP TOKENS (for number inputs)
  'input-step-button-width': SPACING_VARIABLES['spacing-6'],
  'input-step-button-background': BACKGROUND_VARIABLES['background-muted'],
  'input-step-button-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'input-step-button-color': TEXT_VARIABLES['text-secondary'],
  'input-step-button-hover-background': BACKGROUND_VARIABLES['background-hover'],

  // PLAYGROUND INPUT TOKENS (από LivePlayground)
  'playground-input-padding': SPACING_VARIABLES['spacing-3'],
  'playground-input-border-radius': BORDER_VARIABLES['border-radius-md'],
  'playground-input-font-size': '0.875rem', // fontSize-sm
  'playground-input-width': '100%',
  'playground-input-outline': 'none',
  'playground-input-background': BACKGROUND_VARIABLES['background-default'],
  'playground-input-color': TEXT_VARIABLES['text-primary'],
  'playground-input-border': `${SPACING_VARIABLES['spacing-0-25']} solid`,
  'playground-input-border-color': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'playground-input-flex': '1',
} as const;

// Helper types για type safety
export type InputSize = 'sm' | 'md' | 'lg';
export type InputState = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'success' | 'warning';
export type InputVariant = 'default' | 'filled' | 'outlined' | 'underlined';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'switch' | 'range' | 'file';