/**
 * 🔲 LAYERA BUTTON VARIANTS - Προκαθορισμένοι συνδυασμοί button tokens
 *
 * Component-ready button variants που χαρτογραφούν σε component tokens
 * Παρέχει έτοιμες συνταγές για διαφορετικούς τύπους κουμπιών
 */

import { BUTTON_VARIABLES } from './buttons.variables';

// PRIMARY BUTTON VARIANTS - Κύρια κουμπιά για primary actions
export const BUTTON_PRIMARY_VARIANTS = {
  // Default primary button
  default: {
    background: BUTTON_VARIABLES['button-primary-background-default'],
    color: BUTTON_VARIABLES['button-primary-text-default'],
    border: BUTTON_VARIABLES['button-primary-border-default'],
    shadow: BUTTON_VARIABLES['button-shadow-default'],
    transition: BUTTON_VARIABLES['button-transition-default'],
    usage: 'Primary call-to-action buttons',
  },

  // Primary button states
  hover: {
    background: BUTTON_VARIABLES['button-primary-background-hover'],
    color: BUTTON_VARIABLES['button-primary-text-hover'],
    border: BUTTON_VARIABLES['button-primary-border-hover'],
    shadow: BUTTON_VARIABLES['button-shadow-hover'],
    transition: BUTTON_VARIABLES['button-transition-hover'],
    usage: 'Primary button hover state',
  },

  active: {
    background: BUTTON_VARIABLES['button-primary-background-active'],
    color: BUTTON_VARIABLES['button-primary-text-active'],
    border: BUTTON_VARIABLES['button-primary-border-active'],
    shadow: BUTTON_VARIABLES['button-shadow-active'],
    usage: 'Primary button active/pressed state',
  },

  disabled: {
    background: BUTTON_VARIABLES['button-primary-background-disabled'],
    color: BUTTON_VARIABLES['button-primary-text-disabled'],
    border: BUTTON_VARIABLES['button-primary-border-disabled'],
    shadow: BUTTON_VARIABLES['button-shadow-disabled'],
    usage: 'Primary button disabled state',
  },

  focus: {
    background: BUTTON_VARIABLES['button-primary-background-default'],
    color: BUTTON_VARIABLES['button-primary-text-default'],
    border: BUTTON_VARIABLES['button-primary-border-focus'],
    shadow: BUTTON_VARIABLES['button-shadow-default'],
    usage: 'Primary button focus state',
  },
} as const;

// SECONDARY BUTTON VARIANTS - Δευτερεύοντα κουμπιά
export const BUTTON_SECONDARY_VARIANTS = {
  default: {
    background: BUTTON_VARIABLES['button-secondary-background-default'],
    color: BUTTON_VARIABLES['button-secondary-text-default'],
    border: BUTTON_VARIABLES['button-secondary-border-default'],
    shadow: BUTTON_VARIABLES['button-shadow-default'],
    transition: BUTTON_VARIABLES['button-transition-default'],
    usage: 'Secondary actions, less prominent',
  },

  hover: {
    background: BUTTON_VARIABLES['button-secondary-background-hover'],
    color: BUTTON_VARIABLES['button-secondary-text-hover'],
    border: BUTTON_VARIABLES['button-secondary-border-hover'],
    shadow: BUTTON_VARIABLES['button-shadow-hover'],
    usage: 'Secondary button hover state',
  },

  active: {
    background: BUTTON_VARIABLES['button-secondary-background-active'],
    color: BUTTON_VARIABLES['button-secondary-text-active'],
    border: BUTTON_VARIABLES['button-secondary-border-active'],
    shadow: BUTTON_VARIABLES['button-shadow-active'],
    usage: 'Secondary button active state',
  },

  disabled: {
    background: BUTTON_VARIABLES['button-secondary-background-disabled'],
    color: BUTTON_VARIABLES['button-secondary-text-disabled'],
    border: BUTTON_VARIABLES['button-secondary-border-disabled'],
    shadow: BUTTON_VARIABLES['button-shadow-disabled'],
    usage: 'Secondary button disabled state',
  },
} as const;

// GHOST BUTTON VARIANTS - Minimal κουμπιά χωρίς background
export const BUTTON_GHOST_VARIANTS = {
  default: {
    background: BUTTON_VARIABLES['button-ghost-background-default'],
    color: BUTTON_VARIABLES['button-ghost-text-default'],
    border: BUTTON_VARIABLES['button-ghost-border-default'],
    shadow: BUTTON_VARIABLES['button-shadow-disabled'],
    transition: BUTTON_VARIABLES['button-transition-default'],
    usage: 'Minimal buttons, tertiary actions',
  },

  hover: {
    background: BUTTON_VARIABLES['button-ghost-background-hover'],
    color: BUTTON_VARIABLES['button-ghost-text-hover'],
    border: BUTTON_VARIABLES['button-ghost-border-hover'],
    usage: 'Ghost button hover state',
  },

  active: {
    background: BUTTON_VARIABLES['button-ghost-background-active'],
    color: BUTTON_VARIABLES['button-ghost-text-active'],
    border: BUTTON_VARIABLES['button-ghost-border-active'],
    usage: 'Ghost button active state',
  },

  disabled: {
    background: BUTTON_VARIABLES['button-ghost-background-disabled'],
    color: BUTTON_VARIABLES['button-ghost-text-disabled'],
    border: BUTTON_VARIABLES['button-ghost-border-disabled'],
    usage: 'Ghost button disabled state',
  },
} as const;

// DANGER BUTTON VARIANTS - Κουμπιά για destructive actions
export const BUTTON_DANGER_VARIANTS = {
  default: {
    background: BUTTON_VARIABLES['button-danger-background-default'],
    color: BUTTON_VARIABLES['button-danger-text-default'],
    border: BUTTON_VARIABLES['button-danger-border-default'],
    shadow: BUTTON_VARIABLES['button-shadow-default'],
    transition: BUTTON_VARIABLES['button-transition-default'],
    usage: 'Destructive actions, delete, remove',
  },

  hover: {
    background: BUTTON_VARIABLES['button-danger-background-hover'],
    color: BUTTON_VARIABLES['button-danger-text-hover'],
    border: BUTTON_VARIABLES['button-danger-border-hover'],
    shadow: BUTTON_VARIABLES['button-shadow-hover'],
    usage: 'Danger button hover state',
  },

  active: {
    background: BUTTON_VARIABLES['button-danger-background-active'],
    color: BUTTON_VARIABLES['button-danger-text-active'],
    border: BUTTON_VARIABLES['button-danger-border-active'],
    shadow: BUTTON_VARIABLES['button-shadow-active'],
    usage: 'Danger button active state',
  },

  disabled: {
    background: BUTTON_VARIABLES['button-danger-background-disabled'],
    color: BUTTON_VARIABLES['button-danger-text-disabled'],
    border: BUTTON_VARIABLES['button-danger-border-disabled'],
    shadow: BUTTON_VARIABLES['button-shadow-disabled'],
    usage: 'Danger button disabled state',
  },
} as const;

// SIZE VARIANTS - Διαφορετικά μεγέθη κουμπιών
export const BUTTON_SIZE_VARIANTS = {
  xs: {
    padding: BUTTON_VARIABLES['button-padding-xs'],
    borderRadius: BUTTON_VARIABLES['button-border-radius-xs'],
    usage: 'Extra small buttons, compact interfaces',
  },

  sm: {
    padding: BUTTON_VARIABLES['button-padding-sm'],
    borderRadius: BUTTON_VARIABLES['button-border-radius-sm'],
    usage: 'Small buttons, secondary actions',
  },

  md: {
    padding: BUTTON_VARIABLES['button-padding-md'],
    borderRadius: BUTTON_VARIABLES['button-border-radius-md'],
    usage: 'Default button size',
  },

  lg: {
    padding: BUTTON_VARIABLES['button-padding-lg'],
    borderRadius: BUTTON_VARIABLES['button-border-radius-lg'],
    usage: 'Large buttons, prominent actions',
  },

  xl: {
    padding: BUTTON_VARIABLES['button-padding-xl'],
    borderRadius: BUTTON_VARIABLES['button-border-radius-xl'],
    usage: 'Extra large buttons, hero CTAs',
  },
} as const;

// UNIFIED BUTTON VARIANTS
export const BUTTON_VARIANTS = {
  primary: BUTTON_PRIMARY_VARIANTS,
  secondary: BUTTON_SECONDARY_VARIANTS,
  ghost: BUTTON_GHOST_VARIANTS,
  danger: BUTTON_DANGER_VARIANTS,
  size: BUTTON_SIZE_VARIANTS,
} as const;

// Helper types
export type ButtonVariantType = keyof typeof BUTTON_VARIANTS;
export type ButtonSizeType = keyof typeof BUTTON_SIZE_VARIANTS;