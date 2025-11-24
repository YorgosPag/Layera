/**
 * 💬 LAYERA TOOLTIPS COMPONENT TOKENS
 *
 * Component tokens για Tooltips και Popover components που χαρτογραφούν semantic tokens σε συγκεκριμένες tooltip χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';

// UNIFIED TOOLTIPS VARIABLES - Όλα τα tooltips tokens ενωμένα για CSS export
export const TOOLTIPS_VARIABLES = {
  // BASE TOOLTIP TOKENS
  'tooltip-background': BACKGROUND_VARIABLES['background-inverse'],
  'tooltip-background-light': BACKGROUND_VARIABLES['background-default'],
  'tooltip-text': TEXT_VARIABLES['text-inverse'],
  'tooltip-text-light': TEXT_VARIABLES['text-primary'],
  'tooltip-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],

  // TOOLTIP POSITIONING
  'tooltip-z-index': SPACING_VARIABLES['spacing-50'],
  'tooltip-offset': SPACING_VARIABLES['spacing-2'],
  'tooltip-max-width': SPACING_VARIABLES['spacing-80'],
  'tooltip-min-height': SPACING_VARIABLES['spacing-8'],

  // TOOLTIP SPACING
  'tooltip-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
  'tooltip-margin': SPACING_VARIABLES['spacing-1'],
  'tooltip-gap': SPACING_VARIABLES['spacing-1'],

  // TOOLTIP STYLING
  'tooltip-border-radius': BORDER_VARIABLES['border-radius-4'],
  'tooltip-shadow': SHADOW_VARIABLES['shadow-lg'],
  'tooltip-shadow-light': SHADOW_VARIABLES['shadow-md'],

  // TOOLTIP ARROW
  'tooltip-arrow-size': SPACING_VARIABLES['spacing-2'],
  'tooltip-arrow-offset': SPACING_VARIABLES['spacing-3'],
  'tooltip-arrow-background': BACKGROUND_VARIABLES['background-inverse'],
  'tooltip-arrow-background-light': BACKGROUND_VARIABLES['background-default'],

  // TOOLTIP TRANSITIONS
  'tooltip-transition-show': MOTION_VARIABLES['transition-fast'],
  'tooltip-transition-hide': MOTION_VARIABLES['transition-fast'],
  'tooltip-delay-show': '500ms',
  'tooltip-delay-hide': '0ms',

  // POPOVER SPECIFIC TOKENS
  'popover-background': BACKGROUND_VARIABLES['background-default'],
  'popover-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'popover-border-radius': BORDER_VARIABLES['border-radius-8'],
  'popover-shadow': SHADOW_VARIABLES['shadow-xl'],
  'popover-padding': SPACING_VARIABLES['spacing-4'],
  'popover-max-width': SPACING_VARIABLES['spacing-96'],
  'popover-min-width': SPACING_VARIABLES['spacing-64'],
  'popover-z-index': SPACING_VARIABLES['spacing-50'],

  // POPOVER HEADER
  'popover-header-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'popover-header-border-bottom': BORDER_SEMANTIC_VARIABLES['border-default'],
  'popover-header-background': BACKGROUND_VARIABLES['background-subtle'],

  // POPOVER CONTENT
  'popover-content-padding': SPACING_VARIABLES['spacing-4'],
  'popover-content-max-height': SPACING_VARIABLES['spacing-96'],
  'popover-content-overflow': 'auto',

  // POPOVER FOOTER
  'popover-footer-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'popover-footer-border-top': BORDER_SEMANTIC_VARIABLES['border-default'],
  'popover-footer-background': BACKGROUND_VARIABLES['background-subtle'],
  'popover-footer-gap': SPACING_VARIABLES['spacing-2'],

  // TOOLTIP VARIANTS
  'tooltip-info-background': BACKGROUND_VARIABLES['background-info'],
  'tooltip-info-text': TEXT_VARIABLES['text-info-contrast'],
  'tooltip-success-background': BACKGROUND_VARIABLES['background-success'],
  'tooltip-success-text': TEXT_VARIABLES['text-success-contrast'],
  'tooltip-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'tooltip-warning-text': TEXT_VARIABLES['text-warning-contrast'],
  'tooltip-error-background': BACKGROUND_VARIABLES['background-error'],
  'tooltip-error-text': TEXT_VARIABLES['text-error-contrast'],

  // TOOLTIP SIZES
  'tooltip-small-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-2']}`,
  'tooltip-small-font-size': SPACING_VARIABLES['spacing-3'],
  'tooltip-medium-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
  'tooltip-medium-font-size': SPACING_VARIABLES['spacing-4'],
  'tooltip-large-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'tooltip-large-font-size': SPACING_VARIABLES['spacing-4'],

  // INTERACTIVE STATES
  'tooltip-trigger-focus-outline': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'tooltip-trigger-focus-outline-offset': SPACING_VARIABLES['spacing-1'],

  // ACCESSIBILITY
  'tooltip-contrast-min': '4.5',
  'tooltip-font-weight': TEXT_VARIABLES['text-weight-medium'],

} as const;

// Helper types για type safety
export type TooltipVariant = 'default' | 'light' | 'info' | 'success' | 'warning' | 'error';
export type TooltipSize = 'small' | 'medium' | 'large';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';