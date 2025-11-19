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
 * Unified Animation System - Complete Animation Management
 * Consolidated from ANIMATION_DURATIONS + ANIMATION_DISTANCES + EASING_FUNCTIONS
 */
export const UNIFIED_ANIMATION_SYSTEM = {
  // Durations in milliseconds (from animation-durations.ts)
  DURATIONS: {
    // Auto-advance timings
    PROPERTY_TYPE_SELECTION: 500,
    OCCUPATION_SEARCH: 1500,
    COMPLETE_STEP: 500,
    // Form interaction timings
    FORM_VALIDATION_DELAY: 300,
    SEARCH_DEBOUNCE: 300,
    API_DEBOUNCE: 500,
    // UI transitions
    MODAL_TRANSITION: 300,
    DRAWER_SLIDE: 250,
    TOOLTIP_SHOW: 150
  },

  // Distances in pixels
  DISTANCES: {
    SLIDE_SMALL: 5,
    SLIDE_NORMAL: 10,
    SLIDE_LARGE: 20,
    SLIDE_EXTRA: 50
  },

  // Easing functions
  EASING: {
    EASE_OUT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
} as const;

// Legacy compatibility exports
export const ANIMATION_DISTANCES = UNIFIED_ANIMATION_SYSTEM.DISTANCES;
export const EASING_FUNCTIONS = UNIFIED_ANIMATION_SYSTEM.EASING;