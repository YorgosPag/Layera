/**
 * LAYERA UNIFIED UI CONSTANTS
 *
 * Consolidated από πολλαπλά αρχεία για μείωση complexity:
 * - brand-system.ts
 * - design-system.ts
 * - animation-durations.ts (deprecated)
 * - ui-utilities.ts (UI-related parts)
 *
 * Single Source of Truth για UI, Design & Animation Systems
 */

// ============================================================================
// COLORS & BRAND SYSTEM (από brand-system.ts)
// ============================================================================

export const UNIFIED_COLOR_SYSTEM = {
  // Brand colors
  BRAND: {
    PRIMARY: 'var(--layera-color-brand)',
    SECONDARY: 'var(--layera-color-text-secondary)',
    WHITE: 'var(--layera-color-surface)',
    BLACK: 'var(--layera-bg-dark)',
  },

  // UI state colors
  UI: {
    INFO_SUBTLE: 'var(--layera-color-brand-background)',
    INFO_DEFAULT: 'var(--layera-color-primary)',
    NEUTRAL_LIGHT: 'var(--layera-color-surface-secondary)',
    NEUTRAL_DEFAULT: 'var(--layera-color-text-secondary)',
    NEUTRAL_DARK: 'var(--layera-color-text-primary)',
    BORDER_DEFAULT: 'var(--layera-border-primary)',
    SURFACE_DEFAULT: 'var(--layera-color-surface-hover)',
    TEXT_TERTIARY: 'var(--layera-color-text-muted)',
  }
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM (από brand-system.ts)
// ============================================================================

export const UNIFIED_TYPOGRAPHY_SYSTEM = {
  SIZES: {
    XS: 'var(--layera-fontSize-xs)',
    SM: 'var(--layera-fontSize-sm)',
    BASE: 'var(--layera-fontSize-base)',
    LG: 'var(--layera-fontSize-lg)',
    XL: 'var(--layera-fontSize-xl)',
    XXL: 'var(--layera-fontSize-2xl)'
  },

  WEIGHTS: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700
  }
} as const;

// ============================================================================
// ANIMATION SYSTEM (από brand-system.ts + animation-durations.ts)
// ============================================================================

export const UNIFIED_ANIMATION_SYSTEM = {
  // Durations in milliseconds
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

// ============================================================================
// ICON SYSTEM (από design-system.ts)
// ============================================================================

export const UNIFIED_ICON_SYSTEM = {
  // Standard UI icon sizes
  UI_SIZES: {
    XS: 'var(--layera-size-4)',    // 16px
    SM: 'var(--layera-size-5)',    // 20px
    MD: 'var(--layera-size-6)',    // 24px
    LG: 'var(--layera-size-8)',    // 32px
    XL: 'var(--layera-size-12)',   // 48px
    XXL: 'var(--layera-size-16)'   // 64px
  },

  // Leaflet-specific sizes (numeric for Leaflet API)
  LEAFLET_SIZES: {
    SMALL: 16,
    MEDIUM: 24,
    STANDARD: 32,
    LARGE: 48,
    XL: 64
  },

  // Map-specific dimensions
  MAP_DIMENSIONS: {
    ALERT: {
      width: 'var(--layera-global-spacing-7-5)',
      height: 'var(--layera-global-spacing-12)',
      anchor: { x: 'var(--layera-global-spacing-3-75)', y: 'var(--layera-global-spacing-12)' }
    }
  }
} as const;

// ============================================================================
// DEVICE & LAYOUT SYSTEM (από design-system.ts)
// ============================================================================

export const UNIFIED_LAYOUT_SYSTEM = {
  // SVG dimensions
  SVG_DIMENSIONS: {
    ICON_XS: { width: 'var(--layera-size-4)', height: 'var(--layera-size-4)' },
    ICON_SM: { width: 'var(--layera-size-5)', height: 'var(--layera-size-5)' },
    ICON_MD: { width: 'var(--layera-size-6)', height: 'var(--layera-size-6)' },
    ICON_LG: { width: 'var(--layera-size-8)', height: 'var(--layera-size-8)' },
    ICON_XL: { width: 'var(--layera-size-12)', height: 'var(--layera-size-12)' },
    ICON_XXL: { width: 'var(--layera-size-16)', height: 'var(--layera-size-16)' },
  },

  // Device frame colors
  DEVICE_FRAME_COLORS: {
    DEFAULT: 'var(--layera-color-border-default)',
    ACTIVE: 'var(--layera-color-border-active)',
    HOVER: 'var(--layera-color-border-hover)'
  },

  // Leaflet marker dimensions
  LEAFLET_MARKER_DIMENSIONS: {
    DEFAULT: { width: 'var(--layera-size-6)', height: 'var(--layera-size-10)' },
    CUSTOM: { width: 'var(--layera-size-8)', height: 'var(--layera-size-12)' }
  }
} as const;

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS
// ============================================================================

// Από brand-system.ts
export const BRAND_COLORS = UNIFIED_COLOR_SYSTEM.BRAND;
export const UI_COLORS = UNIFIED_COLOR_SYSTEM.UI;
export const FONT_SIZES = UNIFIED_TYPOGRAPHY_SYSTEM.SIZES;
export const FONT_WEIGHTS = UNIFIED_TYPOGRAPHY_SYSTEM.WEIGHTS;
export const ANIMATION_DISTANCES = UNIFIED_ANIMATION_SYSTEM.DISTANCES;
export const EASING_FUNCTIONS = UNIFIED_ANIMATION_SYSTEM.EASING;

// Από design-system.ts
export const ICON_SIZES = UNIFIED_ICON_SYSTEM.UI_SIZES;
export const SVG_DIMENSIONS = UNIFIED_LAYOUT_SYSTEM.SVG_DIMENSIONS;
export const DEVICE_FRAME_COLORS = UNIFIED_LAYOUT_SYSTEM.DEVICE_FRAME_COLORS;
export const LEAFLET_MARKER_DIMENSIONS = UNIFIED_LAYOUT_SYSTEM.LEAFLET_MARKER_DIMENSIONS;

// Από animation-durations.ts (deprecated)
export const ANIMATION_DURATIONS = UNIFIED_ANIMATION_SYSTEM.DURATIONS;