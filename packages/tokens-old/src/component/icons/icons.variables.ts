/**
 * 🎯 LAYERA ICONS VARIABLES - Icon system tokens
 *
 * Icon sizes, colors και states για εικονίδια
 * Χαρτογραφούνται σε core spacing και semantic colors
 */

import { SPACING_SCALE } from '../../core/spacing/spacing.variables';

// ICON SIZES - Βασισμένα σε spacing scale
export const ICON_SIZE_SCALE = {
  xs: SPACING_SCALE[4],  // 1rem - Standard mobile size
  md: SPACING_SCALE[5],  // 1.25rem - Default icon size for desktop
  lg: SPACING_SCALE[8],  // 2rem - Large interactive elements
  xxl: SPACING_SCALE[16], // 4rem - Very large icons
  xxxl: SPACING_SCALE[20], // 5rem - Huge icons
} as const;

// ICON TOKENS - Για χρήση σε components
export const ICON_TOKENS = {
  // Sizes
  sizes: {
    xs: 'var(--layera-global-spacing-4)',
    md: 'var(--layera-global-spacing-5)',
    lg: 'var(--layera-global-spacing-8)',
    xxl: 'var(--layera-global-spacing-16)',
    xxxl: 'var(--layera-global-spacing-20)',
  },

  // Colors - Συνδέονται με semantic colors
  colors: {
    primary: 'var(--layera-color-semantic-warning-primary)',     // ΚΙΤΡΙΝΟ για single source test
    secondary: 'var(--layera-color-semantic-neutral-dark)',      // Secondary color for supporting icons
    success: 'var(--layera-color-semantic-success-primary)',     // Green for success states
    warning: 'var(--layera-color-semantic-warning-primary)',     // Orange for warning states
    danger: 'var(--layera-color-semantic-error-primary)',       // Red for danger/error states
    info: 'var(--layera-color-semantic-info-primary)',          // Blue for informational states
    neutral: 'var(--layera-color-semantic-neutral-dark)',       // Neutral gray for standard icons
  },

  // Interactive states - Opacity changes για hover/active
  interactive: {
    opacity: {
      default: 'var(--layera-opacity-full)',
      hover: 'var(--layera-opacity-hover)',
      active: 'var(--layera-opacity-active)',
      disabled: 'var(--layera-opacity-disabled)',
    },
    scale: {
      default: 'var(--layera-transform-scale-default)',
      hover: 'var(--layera-transform-scale-hover)',
      active: 'var(--layera-transform-scale-active)',
    },
    transitions: {
      fast: 'var(--layera-transition-fast)',
      normal: 'var(--layera-transition-normal)',
      slow: 'var(--layera-transition-slow)',
    },
  },

  // Accessibility properties
  accessibility: {
    focusRing: {
      width: 'var(--layera-global-spacing-0-5)',
      color: 'var(--layera-color-semantic-info-primary)',
    },
    contrast: {
      normal: 'var(--layera-accessibility-contrast-aa)',
    },
  },

  // Sizing properties - Padding και margin
  sizing: {
    padding: {
      xs: 'var(--layera-global-spacing-0-5)',
      sm: 'var(--layera-global-spacing-1)',
      md: 'var(--layera-global-spacing-2)',
      lg: 'var(--layera-global-spacing-3)',
      xl: 'var(--layera-global-spacing-4)',
    },
    margin: {
      xs: 'var(--layera-global-spacing-0-5)',
      sm: 'var(--layera-global-spacing-1)',
      md: 'var(--layera-global-spacing-2)',
      lg: 'var(--layera-global-spacing-3)',
      xl: 'var(--layera-global-spacing-4)',
    },
  },
} as const;

// Export για εύκολη χρήση - ΟΛΕΣ οι icon μεταβλητές
export const ICON_VARIABLES = {
  // Icon Sizes
  'icon-xs': ICON_TOKENS.sizes.xs,
  'icon-md': ICON_TOKENS.sizes.md,
  'icon-lg': ICON_TOKENS.sizes.lg,
  'icon-xxl': ICON_TOKENS.sizes.xxl,
  'icon-xxxl': ICON_TOKENS.sizes.xxxl,

  // Icon Colors
  'icon-colorPrimary': ICON_TOKENS.colors.primary,
  'icon-colorSecondary': ICON_TOKENS.colors.secondary,
  'icon-colorSuccess': ICON_TOKENS.colors.success,
  'icon-colorWarning': ICON_TOKENS.colors.warning,
  'icon-colorDanger': ICON_TOKENS.colors.danger,
  'icon-colorInfo': ICON_TOKENS.colors.info,
  'icon-colorNeutral': ICON_TOKENS.colors.neutral,

  // Interactive Opacity
  'iconInteractive-interactive-opacity-default': ICON_TOKENS.interactive.opacity.default,
  'iconInteractive-interactive-opacity-hover': ICON_TOKENS.interactive.opacity.hover,
  'iconInteractive-interactive-opacity-active': ICON_TOKENS.interactive.opacity.active,
  'iconInteractive-interactive-opacity-disabled': ICON_TOKENS.interactive.opacity.disabled,

  // Interactive Scale
  'iconInteractive-interactive-scale-default': ICON_TOKENS.interactive.scale.default,
  'iconInteractive-interactive-scale-hover': ICON_TOKENS.interactive.scale.hover,
  'iconInteractive-interactive-scale-active': ICON_TOKENS.interactive.scale.active,

  // Interactive Transitions
  'iconInteractive-interactive-transition-fast': ICON_TOKENS.interactive.transitions.fast,
  'iconInteractive-interactive-transition-normal': ICON_TOKENS.interactive.transitions.normal,
  'iconInteractive-interactive-transition-slow': ICON_TOKENS.interactive.transitions.slow,

  // Accessibility
  'iconInteractive-accessibility-focusRing-width': ICON_TOKENS.accessibility.focusRing.width,
  'iconInteractive-accessibility-focusRing-color': ICON_TOKENS.accessibility.focusRing.color,
  'iconInteractive-accessibility-contrast-normal': ICON_TOKENS.accessibility.contrast.normal,

  // Sizing - Padding
  'iconInteractive-sizing-padding-xs': ICON_TOKENS.sizing.padding.xs,
  'iconInteractive-sizing-padding-sm': ICON_TOKENS.sizing.padding.sm,
  'iconInteractive-sizing-padding-md': ICON_TOKENS.sizing.padding.md,
  'iconInteractive-sizing-padding-lg': ICON_TOKENS.sizing.padding.lg,
  'iconInteractive-sizing-padding-xl': ICON_TOKENS.sizing.padding.xl,

  // Sizing - Margin
  'iconInteractive-sizing-margin-xs': ICON_TOKENS.sizing.margin.xs,
  'iconInteractive-sizing-margin-sm': ICON_TOKENS.sizing.margin.sm,
  'iconInteractive-sizing-margin-md': ICON_TOKENS.sizing.margin.md,
  'iconInteractive-sizing-margin-lg': ICON_TOKENS.sizing.margin.lg,
  'iconInteractive-sizing-margin-xl': ICON_TOKENS.sizing.margin.xl,
} as const;

// Helper types
export type IconSize = keyof typeof ICON_SIZE_SCALE;
export type IconColor = keyof typeof ICON_TOKENS.colors;