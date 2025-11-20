/**
 * 💬 LAYERA TOOLTIPS VARIANTS - Tooltip component combinations
 *
 * Προκαθορισμένες συνδυασμοί tooltip tokens για συγκεκριμένες χρήσεις
 * Component-ready tooltip variants που χαρτογραφούν σε semantic tokens
 */

import { TOOLTIPS_VARIABLES } from './tooltips.variables';

// TOOLTIP VARIANTS - Context-based tooltip combinations
export const TOOLTIP_VARIANTS = {
  // Default tooltip
  default: {
    background: TOOLTIPS_VARIABLES['tooltip-background'],
    text: TOOLTIPS_VARIABLES['tooltip-text'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Standard dark tooltip',
  },

  // Light tooltip
  light: {
    background: TOOLTIPS_VARIABLES['tooltip-background-light'],
    text: TOOLTIPS_VARIABLES['tooltip-text-light'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow-light'],
    border: TOOLTIPS_VARIABLES['tooltip-border'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Light tooltip with border',
  },

  // Status tooltips
  info: {
    background: TOOLTIPS_VARIABLES['tooltip-info-background'],
    text: TOOLTIPS_VARIABLES['tooltip-info-text'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Informational tooltip',
  },

  success: {
    background: TOOLTIPS_VARIABLES['tooltip-success-background'],
    text: TOOLTIPS_VARIABLES['tooltip-success-text'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Success confirmation tooltip',
  },

  warning: {
    background: TOOLTIPS_VARIABLES['tooltip-warning-background'],
    text: TOOLTIPS_VARIABLES['tooltip-warning-text'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Warning tooltip',
  },

  error: {
    background: TOOLTIPS_VARIABLES['tooltip-error-background'],
    text: TOOLTIPS_VARIABLES['tooltip-error-text'],
    shadow: TOOLTIPS_VARIABLES['tooltip-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'],
    borderRadius: TOOLTIPS_VARIABLES['tooltip-border-radius'],
    usage: 'Error tooltip',
  },

} as const;

// POPOVER VARIANTS - Different popover configurations
export const POPOVER_VARIANTS = {
  // Standard popover
  default: {
    background: TOOLTIPS_VARIABLES['popover-background'],
    border: TOOLTIPS_VARIABLES['popover-border'],
    borderRadius: TOOLTIPS_VARIABLES['popover-border-radius'],
    shadow: TOOLTIPS_VARIABLES['popover-shadow'],
    padding: TOOLTIPS_VARIABLES['popover-padding'],
    maxWidth: TOOLTIPS_VARIABLES['popover-max-width'],
    usage: 'Standard popover container',
  },

  // Menu popover
  menu: {
    background: TOOLTIPS_VARIABLES['popover-background'],
    border: TOOLTIPS_VARIABLES['popover-border'],
    borderRadius: TOOLTIPS_VARIABLES['popover-border-radius'],
    shadow: TOOLTIPS_VARIABLES['popover-shadow'],
    padding: TOOLTIPS_VARIABLES['tooltip-padding'], // Tighter padding for menu
    minWidth: TOOLTIPS_VARIABLES['popover-min-width'],
    usage: 'Dropdown menu popover',
  },

  // Dialog popover
  dialog: {
    background: TOOLTIPS_VARIABLES['popover-background'],
    border: TOOLTIPS_VARIABLES['popover-border'],
    borderRadius: TOOLTIPS_VARIABLES['popover-border-radius'],
    shadow: TOOLTIPS_VARIABLES['popover-shadow'],
    padding: TOOLTIPS_VARIABLES['popover-content-padding'],
    maxWidth: TOOLTIPS_VARIABLES['popover-max-width'],
    maxHeight: TOOLTIPS_VARIABLES['popover-content-max-height'],
    usage: 'Dialog-style popover with header/footer',
  },

} as const;

// SIZE VARIANTS - Different tooltip sizes
export const TOOLTIP_SIZE_VARIANTS = {
  small: {
    padding: TOOLTIPS_VARIABLES['tooltip-small-padding'],
    fontSize: TOOLTIPS_VARIABLES['tooltip-small-font-size'],
    maxWidth: TOOLTIPS_VARIABLES['tooltip-max-width'],
    usage: 'Small, compact tooltip',
  },

  medium: {
    padding: TOOLTIPS_VARIABLES['tooltip-medium-padding'],
    fontSize: TOOLTIPS_VARIABLES['tooltip-medium-font-size'],
    maxWidth: TOOLTIPS_VARIABLES['tooltip-max-width'],
    usage: 'Standard medium tooltip',
  },

  large: {
    padding: TOOLTIPS_VARIABLES['tooltip-large-padding'],
    fontSize: TOOLTIPS_VARIABLES['tooltip-large-font-size'],
    maxWidth: TOOLTIPS_VARIABLES['popover-max-width'], // Larger max width
    usage: 'Large tooltip with more content',
  },

} as const;

// PLACEMENT VARIANTS - Arrow positioning for different placements
export const TOOLTIP_PLACEMENT_VARIANTS = {
  top: {
    arrowPosition: 'bottom',
    arrowOffset: TOOLTIPS_VARIABLES['tooltip-arrow-offset'],
    marginBottom: TOOLTIPS_VARIABLES['tooltip-offset'],
    usage: 'Tooltip above element',
  },

  bottom: {
    arrowPosition: 'top',
    arrowOffset: TOOLTIPS_VARIABLES['tooltip-arrow-offset'],
    marginTop: TOOLTIPS_VARIABLES['tooltip-offset'],
    usage: 'Tooltip below element',
  },

  left: {
    arrowPosition: 'right',
    arrowOffset: TOOLTIPS_VARIABLES['tooltip-arrow-offset'],
    marginRight: TOOLTIPS_VARIABLES['tooltip-offset'],
    usage: 'Tooltip to the left of element',
  },

  right: {
    arrowPosition: 'left',
    arrowOffset: TOOLTIPS_VARIABLES['tooltip-arrow-offset'],
    marginLeft: TOOLTIPS_VARIABLES['tooltip-offset'],
    usage: 'Tooltip to the right of element',
  },

} as const;

// Helper types
export type TooltipVariantType = keyof typeof TOOLTIP_VARIANTS;
export type PopoverVariantType = keyof typeof POPOVER_VARIANTS;
export type TooltipSizeVariantType = keyof typeof TOOLTIP_SIZE_VARIANTS;
export type TooltipPlacementVariantType = keyof typeof TOOLTIP_PLACEMENT_VARIANTS;