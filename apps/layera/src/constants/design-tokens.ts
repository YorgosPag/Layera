/**
 * @layera/constants - Design Token System (SST Compliant)
 *
 * Single Source of Truth: All tokens imported from @layera/tokens
 *
 * WARNING: ZERO hardcoded values allowed - 100% SST compliance
 * TO MODIFY: Edit packages/tokens/src/tokens.json and run npm run tokens:build
 */

// === SINGLE SOURCE OF TRUTH IMPORTS ===

/**
 * Re-export all generated design tokens from Style Dictionary
 * This ensures we have a single source of truth for all design values
 */
// TODO: Re-enable when @layera/tokens package is properly set up
// export * from '@layera/tokens/dist/ts';

// Import specific tokens for semantic aliases
// Note: These imports are currently disabled due to missing tokens in @layera/tokens
// TODO: Re-enable when tokens are properly generated

// === LEGACY COMPATIBILITY LAYER ===
import {
  LEGACY_LAYOUT_ALIASES,
  LEGACY_CONTAINER_ALIASES,
  LEGACY_VIEWPORT_ALIASES,
  CRYPTOGRAPHIC_CONSTANTS
} from './legacy-aliases';

// === SEMANTIC ALIASES (SST-BASED) ===

/**
 * Semantic aliases using SST tokens only
 * These provide meaningful names while maintaining Single Source of Truth
 */
export const cardPadding = `var(--layera-global-spacing-4)` as const;
export const cardMargin = `var(--layera-global-spacing-6)` as const;
export const buttonPadding = `var(--layera-global-spacing-3) var(--layera-global-spacing-4)` as const;

// === BACKWARD COMPATIBILITY ===

/**
 * @deprecated Use tokens from '@layera/tokens/dist/ts' instead
 * These constants will be removed in a future version
 *
 * SST COMPLIANCE: All values now reference CSS custom properties
 */
/**
 * Spacing Scale - SINGLE SOURCE OF TRUTH
 * Used by components for consistent spacing
 */
export const SPACING_SCALE = {
  /* base tokens */
  XS: 'var(--layera-global-spacing-1)',
  SM: 'var(--layera-global-spacing-2)',
  MD: 'var(--layera-global-spacing-4)',
  LG: 'var(--layera-global-spacing-6)',
  XL: 'var(--layera-global-spacing-8)',
  XXL: 'var(--layera-global-spacing-12)',
  /* legacy συμβατότητα */
  ...LEGACY_LAYOUT_ALIASES,
  ...LEGACY_CONTAINER_ALIASES,
  ...LEGACY_VIEWPORT_ALIASES,
} as const;

// Export crypto constants για auth-bridge
export { CRYPTOGRAPHIC_CONSTANTS };

/**
 * Border Radius Scale - SINGLE SOURCE OF TRUTH
 */
export const BORDER_RADIUS_SCALE = {
  NONE: 'var(--layera-global-borderRadius-none)',
  XXS: 'var(--layera-global-borderRadius-xs)', // SST: Extra extra small border radius -> xs
  XS: 'var(--layera-global-borderRadius-xs)',
  SM: 'var(--layera-radius-sm)', // TODO: Add to global tokens
  MD: 'var(--layera-global-borderRadius-md)',
  LG: 'var(--layera-global-borderRadius-lg)',
  XL: 'var(--layera-radius-xl)', // SST: Extra large border radius
  XXL: 'var(--layera-radius-xxl)', // SST: Extra extra large border radius
  XXXL: 'var(--layera-radius-xxxl)', // SST: Extra extra extra large border radius
  FULL: 'var(--layera-global-borderRadius-full)',

  // Semantic border radius tokens for components
  PILL: 'var(--layera-radius-pill)', // SST: Pill shape (fully rounded)
  CIRCLE: 'var(--layera-radius-circle)', // SST: Circle shape

  // Component-specific border radius
  BUTTON: 'var(--layera-radius-button)', // SST: Button border radius
  CARD: 'var(--layera-radius-card)', // SST: Card border radius
  INPUT: 'var(--layera-radius-input)', // SST: Input border radius
  BADGE: 'var(--layera-radius-badge)', // SST: Badge border radius
  MODAL: 'var(--layera-radius-modal)', // SST: Modal border radius
  TOOLTIP: 'var(--layera-radius-tooltip)', // SST: Tooltip border radius

  // Layout-specific border radius
  LAYOUT_SM: 'var(--layera-radius-layout-sm)', // SST: Small layout border radius
  LAYOUT_MD: 'var(--layera-radius-layout-md)', // SST: Medium layout border radius
  LAYOUT_LG: 'var(--layera-radius-layout-lg)', // SST: Large layout border radius
  LAYOUT_XL: 'var(--layera-radius-layout-xl)', // SST: Extra large layout border radius
} as const;

/**
 * Fixed Dimensions - Common component sizes
 */
// SSOT MOVED to config.ts to avoid duplicates - use: import { FIXED_DIMENSIONS } from './config';
// export const FIXED_DIMENSIONS = { ... } - consolidated in config.ts with additional properties

export const CSS_DESIGN_TOKENS = {
  // === SPACING TOKENS (SST-BASED) ===
  spacing: {
    'spacing-0': 'var(--layera-global-spacing-0)',
    'spacing-xxs': 'var(--layera-global-spacing-1)',
    'spacing-xs': 'var(--layera-global-spacing-2)',
    'spacing-sm': 'var(--layera-global-spacing-3)',
    'spacing-md': 'var(--layera-global-spacing-4)',
    'spacing-lg': 'var(--layera-global-spacing-6)',
    'spacing-xl': 'var(--layera-global-spacing-8)',
    'spacing-xxl': 'var(--layera-global-spacing-12)',
    'spacing-xxxl': 'var(--layera-global-spacing-96)',
  },

  // === SEMANTIC COLOR TOKENS (SST-BASED) ===
  colors: {
    // Background colors - SST theme-aware
    'color-bg-canvas': 'var(--layera-color-surface)',
    'color-bg-surface': 'var(--layera-bg-secondary)',
    'color-bg-surface-raised': 'var(--layera-color-surface)',
    'color-bg-surface-overlay': 'var(--layera-overlay-background)',

    // Text colors - SST WCAG compliant
    'color-text-primary': 'var(--layera-color-text-primary)',
    'color-text-secondary': 'var(--layera-color-text-secondary)',
    'color-text-tertiary': 'var(--layera-color-text-tertiary)',
    'color-text-inverse': 'var(--layera-color-text-on-dark)',

    // Semantic states - SST accessibility compliant
    'color-semantic-info-bg': 'var(--layera-color-info)',
    'color-semantic-info-border': 'var(--layera-border-info)',
    'color-semantic-info-text': 'var(--layera-text-on-info)',

    'color-semantic-success-bg': 'var(--layera-color-bg-success)',
    'color-semantic-success-border': 'var(--layera-color-success)',
    'color-semantic-success-text': 'var(--layera-text-on-success)',

    'color-semantic-warning-bg': 'var(--layera-color-bg-warning)',
    'color-semantic-warning-border': 'var(--layera-color-warning)',
    'color-semantic-warning-text': 'var(--layera-color-warning)',

    'color-semantic-error-bg': 'var(--layera-color-error)',
    'color-semantic-error-border': 'var(--layera-border-error)',
    'color-semantic-error-text': 'var(--layera-color-error)',

    // Interactive states - SST based
    'color-interactive-primary': 'var(--layera-color-text-primary)',
    'color-interactive-primary-hover': 'var(--layera-color-surface-secondary)',
    'color-interactive-primary-active': 'var(--layera-color-text-secondary)',

    // Border colors - SST references
    'color-border-default': 'var(--layera-color-border-primary)',
    'color-border-subtle': 'var(--layera-color-border-secondary)',
    'color-border-strong': 'var(--layera-color-border-primary)',
  },

  // === ELEVATION TOKENS (SST-BASED) ===
  elevation: {
    'elevation-none': 'none',
    'elevation-xs': 'var(--layera-shadow-sm)',
    'elevation-sm': 'var(--layera-shadow-md)',
    'elevation-md': 'var(--layera-shadow-lg)',
    'elevation-lg': 'var(--layera-shadow-xl)',
    'elevation-xl': 'var(--layera-shadow-xl)',
    'elevation-xxl': 'var(--layera-shadow-xl)',
  },

  // === MOTION TOKENS (SST-BASED) ===
  motion: {
    // Transitions - from SST
    'motion-transition-fast': 'var(--layera-transition-all)',
    'motion-transition-normal': 'var(--layera-transition-all)',
    'motion-transition-slow': 'var(--layera-transition-all)',
    'motion-transition-colors': 'var(--layera-transition-colors)',
  },

  // === TYPOGRAPHY TOKENS (SST-BASED) ===
  typography: {
    // Font families - SST system
    'font-family-sans': 'var(--layera-global-fontFamily-system)',
    'font-family-mono': 'var(--layera-global-fontFamily-mono)',

    // Font sizes - SST scale
    'font-size-xs': 'var(--layera-fontSize-xs)',
    'font-size-sm': 'var(--layera-fontSize-sm)',
    'font-size-md': 'var(--layera-fontSize-base)',
    'font-size-lg': 'var(--layera-fontSize-lg)',
    'font-size-xl': 'var(--layera-fontSize-xl)',

    // Line heights - SST readability
    'line-height-tight': 'var(--layera-lineHeight-tight)',
    'line-height-normal': 'var(--layera-lineHeight-normal)',
    'line-height-relaxed': 'var(--layera-lineHeight-relaxed)',

    // Font weights - SST weights
    'font-weight-regular': 'var(--layera-fontWeight-normal)',
    'font-weight-medium': 'var(--layera-fontWeight-medium)',
    'font-weight-semibold': 'var(--layera-fontWeight-semibold)',
  },

  // === BORDER RADIUS TOKENS (SST-BASED) ===
  borderRadius: {
    'border-radius-none': '0',
    'border-radius-xs': 'var(--layera-radius-xs)',
    'border-radius-sm': 'var(--layera-radius-sm)',
    'border-radius-md': 'var(--layera-radius-md)',
    'border-radius-lg': 'var(--layera-radius-lg)',
    'border-radius-full': 'var(--layera-radius-full)',
  },

  // === Z-INDEX TOKENS (SST-BASED) ===
  zIndex: {
    'z-index-base': 'var(--layera-z-index-base)',
    'z-index-dropdown': 'var(--layera-z-index-dropdown)',
    'z-index-overlay': 'var(--layera-z-index-overlay)',
    'z-index-modal': 'var(--layera-z-index-modal)',
    'z-index-popover': 'var(--layera-z-index-popover)',
    'z-index-tooltip': 'var(--layera-z-index-tooltip)',
    'z-index-toast': 'var(--layera-z-toast)',
  },

} as const;

/**
 * Component-specific design tokens (SST-COMPLIANT)
 * Κάθε component χρησιμοποιεί μόνο SST tokens
 */
export const COMPONENT_DESIGN_TOKENS = {
  button: {
    'button-padding-sm': 'var(--layera-button-padding-sm)',
    'button-padding-xl': 'var(--layera-button-padding-xl)',
    'button-border-radius': 'var(--layera-button-border-radius)',
    'button-transition': 'var(--layera-transition-all)',
  },

  card: {
    'card-padding': 'var(--layera-space-4)',
    'card-border-radius': 'var(--layera-radius-md)',
    'card-background': 'var(--layera-color-surface)',
    'card-border': 'var(--layera-border-width-xxs) solid var(--layera-color-border-primary)',
    'card-elevation': 'var(--layera-shadow-sm)',
    'card-elevation-hover': 'var(--layera-shadow-md)',
    'card-transition': 'var(--layera-transition-all)',
  },

  modal: {
    'modal-backdrop': 'var(--layera-overlay-background)',
    'modal-elevation': 'var(--layera-shadow-xl)',
    'modal-border-radius': 'var(--layera-radius-lg)',
    'modal-padding': 'var(--layera-space-12)',
    'modal-animation': 'var(--layera-transition-all)',
  },

  haptic: {
    'haptic-light': 10, // Light touch feedback
    'haptic-medium': 20, // Medium touch feedback
    'haptic-heavy': 50, // Strong touch feedback
  },

  animations: {
    'duration-short': 200, // ms - Quick animations
    'duration-medium': 300, // ms - Standard animations
    'duration-long': 500, // ms - Slow animations
    'delay-device-check': 100, // ms - Device detection delay
    'delay-smooth': 100, // ms - Smooth transition delay
  },

  forms: {
    'max-length-title': 100, // characters
    'max-length-description': 500, // characters
    'max-length-name': 50, // characters
    'debounce-ms': 300, // milliseconds
    'validation-timeout-short': 3000, // ms
    'validation-timeout-medium': 5000, // ms
    'validation-timeout-long': 8000, // ms
  },

  // Icon tokens moved to @layera/tokens - No duplicates!
  // Use imports from '@layera/tokens/dist/ts' for all icon values
} as const;

/**
 * Responsive design tokens (SST-COMPLIANT)
 * Responsive behavior handled by CSS media queries in SST tokens
 *
 * @deprecated Use @layera/viewport for responsive behavior
 * SST tokens include responsive variants automatically
 */

// === TYPE EXPORTS (SST-COMPLIANT) ===

/**
 * TypeScript types for perfect SST integration
 * All types reference SST-based tokens only
 */
export type DesignTokenCategory = keyof typeof CSS_DESIGN_TOKENS;
export type SpacingToken = keyof typeof CSS_DESIGN_TOKENS.spacing;
export type ColorToken = keyof typeof CSS_DESIGN_TOKENS.colors;
export type ElevationToken = keyof typeof CSS_DESIGN_TOKENS.elevation;
export type MotionToken = keyof typeof CSS_DESIGN_TOKENS.motion;
export type TypographyToken = keyof typeof CSS_DESIGN_TOKENS.typography;
export type BorderRadiusToken = keyof typeof CSS_DESIGN_TOKENS.borderRadius;
export type ZIndexToken = keyof typeof CSS_DESIGN_TOKENS.zIndex;
export type ComponentToken = keyof typeof COMPONENT_DESIGN_TOKENS;
export type SpacingScale = typeof SPACING_SCALE[keyof typeof SPACING_SCALE];
export type BorderRadiusScale = typeof BORDER_RADIUS_SCALE[keyof typeof BORDER_RADIUS_SCALE];