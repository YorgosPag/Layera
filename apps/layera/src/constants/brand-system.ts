/**
 * @layera/constants - Brand System
 *
 * COLORS, TYPOGRAPHY & ANIMATION - Brand Design System
 * Extracted from config.ts for better maintainability
 */

/**
 * Brand Colors - Primary Palette
 */
export const BRAND_COLORS = {
  PRIMARY: 'var(--layera-color-brand)',
  SECONDARY: 'var(--layera-color-text-secondary)',
  WHITE: 'var(--layera-color-surface)',
  BLACK: 'var(--layera-bg-dark)',
} as const;

/**
 * UI State Colors
 */
export const UI_COLORS = {
  INFO_SUBTLE: 'var(--layera-color-brand-background)',
  INFO_DEFAULT: 'var(--layera-color-primary)',
  NEUTRAL_LIGHT: 'var(--layera-color-surface-secondary)',
  NEUTRAL_DEFAULT: 'var(--layera-color-text-secondary)',
  NEUTRAL_DARK: 'var(--layera-color-text-primary)',
  BORDER_DEFAULT: 'var(--layera-border-primary)',
  SURFACE_DEFAULT: 'var(--layera-color-surface-hover)',
  TEXT_TERTIARY: 'var(--layera-color-text-muted)',
} as const;

/**
 * Font Sizes (in pixels)
 */
export const FONT_SIZES = {
  XS: 12,
  SM: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHTS = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
} as const;

/**
 * Animation Distances (in pixels)
 */
export const ANIMATION_DISTANCES = {
  SLIDE_SMALL: 5,   // Small slide animation
  SLIDE_NORMAL: 10, // Normal slide animation
  SLIDE_LARGE: 20,  // Large slide animation
  SLIDE_EXTRA: 50   // Extra large slide animation
} as const;

/**
 * Transition Timing Functions
 */
export const EASING_FUNCTIONS = {
  EASE_OUT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;