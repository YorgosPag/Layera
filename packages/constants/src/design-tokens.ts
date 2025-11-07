/**
 * @layera/constants - Design Token System (SST Compliant)
 *
 * 🎯 Single Source of Truth: All tokens imported from @layera/tokens
 *
 * ⚠️ ZERO hardcoded values allowed - 100% SST compliance
 * ✅ TO MODIFY: Edit packages/tokens/src/tokens.json and run npm run tokens:build
 */

// === SINGLE SOURCE OF TRUTH IMPORTS ===

/**
 * Re-export all generated design tokens from Style Dictionary
 * This ensures we have a single source of truth for all design values
 */
export * from '@layera/tokens/dist/ts';

// Import specific tokens for semantic aliases
import {
  Space4, Space6, Space3,
  ColorBgSecondary, ColorBgSuccess,
  ColorTextPrimary, ColorTextSecondary,
  ColorBrand, ColorSuccess, ColorError, ColorWarning,
  BorderPrimaryBase, BorderSecondaryBase,
  ShadowSm, ShadowMd
} from '@layera/tokens/dist/ts';

// === SEMANTIC ALIASES (SST-BASED) ===

/**
 * Semantic aliases using SST tokens only
 * These provide meaningful names while maintaining Single Source of Truth
 */
export const cardPadding = `var(--la-space-4)` as const;
export const cardMargin = `var(--la-space-6)` as const;
export const buttonPadding = `var(--la-space-3) var(--la-space-4)` as const;

// === BACKWARD COMPATIBILITY ===

/**
 * @deprecated Use tokens from '@layera/tokens/dist/ts' instead
 * These constants will be removed in a future version
 *
 * 🎯 SST COMPLIANCE: All values now reference CSS custom properties
 */
export const CSS_DESIGN_TOKENS = {
  // === SPACING TOKENS (SST-BASED) ===
  spacing: {
    'spacing-0': 'var(--la-space-0)',
    'spacing-xxs': 'var(--la-space-1)',
    'spacing-xs': 'var(--la-space-2)',
    'spacing-sm': 'var(--la-space-3)',
    'spacing-md': 'var(--la-space-4)',
    'spacing-lg': 'var(--la-space-6)',
    'spacing-xl': 'var(--la-space-8)',
    'spacing-xxl': 'var(--la-space-12)',
    'spacing-xxxl': 'var(--la-space-20)',
  },

  // === SEMANTIC COLOR TOKENS (SST-BASED) ===
  colors: {
    // Background colors - SST theme-aware
    'color-bg-canvas': 'var(--la-color-surface)',
    'color-bg-surface': 'var(--la-bg-secondary)',
    'color-bg-surface-raised': 'var(--la-color-surface)',
    'color-bg-surface-overlay': 'var(--la-overlay-background)',

    // Text colors - SST WCAG compliant
    'color-text-primary': 'var(--la-color-text-primary)',
    'color-text-secondary': 'var(--la-color-text-secondary)',
    'color-text-tertiary': 'var(--la-color-text-tertiary)',
    'color-text-inverse': 'var(--la-color-text-on-dark)',

    // Semantic states - SST accessibility compliant
    'color-semantic-info-bg': 'var(--la-color-info)',
    'color-semantic-info-border': 'var(--la-border-info)',
    'color-semantic-info-text': 'var(--la-text-on-info)',

    'color-semantic-success-bg': 'var(--la-color-bg-success)',
    'color-semantic-success-border': 'var(--la-color-success)',
    'color-semantic-success-text': 'var(--la-text-on-success)',

    'color-semantic-warning-bg': 'var(--la-color-bg-warning)',
    'color-semantic-warning-border': 'var(--la-color-warning)',
    'color-semantic-warning-text': 'var(--la-color-warning)',

    'color-semantic-error-bg': 'var(--la-color-error)',
    'color-semantic-error-border': 'var(--la-border-error)',
    'color-semantic-error-text': 'var(--la-color-error)',

    // Interactive states - SST based
    'color-interactive-primary': 'var(--la-color-brand)',
    'color-interactive-primary-hover': 'var(--la-color-brand-hover)',
    'color-interactive-primary-active': 'var(--la-color-brand-active)',

    // Border colors - SST references
    'color-border-default': 'var(--la-color-border-primary)',
    'color-border-subtle': 'var(--la-color-border-subtle)',
    'color-border-strong': 'var(--la-color-border-strong)',
  },

  // === ELEVATION TOKENS (SST-BASED) ===
  elevation: {
    'elevation-none': 'var(--la-shadow-none)',
    'elevation-xs': 'var(--la-shadow-sm)',
    'elevation-sm': 'var(--la-shadow-md)',
    'elevation-md': 'var(--la-shadow-lg)',
    'elevation-lg': 'var(--la-shadow-xl)',
    'elevation-xl': 'var(--la-shadow-xl)',
    'elevation-xxl': 'var(--la-shadow-xl)',
  },

  // === MOTION TOKENS (SST-BASED) ===
  motion: {
    // Transitions - from SST
    'motion-transition-fast': 'var(--la-transition-all)',
    'motion-transition-normal': 'var(--la-transition-all)',
    'motion-transition-slow': 'var(--la-transition-all)',
    'motion-transition-colors': 'var(--la-transition-colors)',
  },

  // === TYPOGRAPHY TOKENS (SST-BASED) ===
  typography: {
    // Font families - SST system
    'font-family-sans': 'var(--la-font-family-base)',
    'font-family-mono': 'var(--la-font-family-monospace)',

    // Font sizes - SST scale
    'font-size-xs': 'var(--la-font-size-xs)',
    'font-size-sm': 'var(--la-font-size-sm)',
    'font-size-md': 'var(--la-font-size-base)',
    'font-size-lg': 'var(--la-font-size-lg)',
    'font-size-xl': 'var(--la-font-size-xl)',

    // Line heights - SST readability
    'line-height-tight': 'var(--la-line-height-tight)',
    'line-height-normal': 'var(--la-line-height-normal)',
    'line-height-relaxed': 'var(--la-line-height-relaxed)',

    // Font weights - SST weights
    'font-weight-regular': 'var(--la-font-weight-normal)',
    'font-weight-medium': 'var(--la-font-weight-medium)',
    'font-weight-semibold': 'var(--la-font-weight-semibold)',
  },

  // === BORDER RADIUS TOKENS (SST-BASED) ===
  borderRadius: {
    'border-radius-none': 'var(--la-radius-none)',
    'border-radius-xs': 'var(--la-radius-xs)',
    'border-radius-sm': 'var(--la-radius-sm)',
    'border-radius-md': 'var(--la-radius-md)',
    'border-radius-lg': 'var(--la-radius-lg)',
    'border-radius-full': 'var(--la-radius-full)',
  },

  // === Z-INDEX TOKENS (SST-BASED) ===
  zIndex: {
    'z-index-base': 'var(--la-z-index-base)',
    'z-index-dropdown': 'var(--la-z-index-dropdown)',
    'z-index-overlay': 'var(--la-z-index-overlay)',
    'z-index-modal': 'var(--la-z-index-modal)',
    'z-index-popover': 'var(--la-z-index-popover)',
    'z-index-tooltip': 'var(--la-z-index-tooltip)',
    'z-index-toast': 'var(--la-z-toast)',
  },

} as const;

/**
 * Component-specific design tokens (SST-COMPLIANT)
 * Κάθε component χρησιμοποιεί μόνο SST tokens
 */
export const COMPONENT_DESIGN_TOKENS = {
  button: {
    'button-padding-sm': 'var(--la-button-padding-sm)',
    'button-padding-xl': 'var(--la-button-padding-xl)',
    'button-border-radius': 'var(--la-button-border-radius)',
    'button-transition': 'var(--la-transition-all)',
  },

  card: {
    'card-padding': 'var(--la-space-4)',
    'card-border-radius': 'var(--la-radius-md)',
    'card-background': 'var(--la-color-surface)',
    'card-border': 'var(--la-border-width-xxs) solid var(--la-color-border-primary)',
    'card-elevation': 'var(--la-shadow-sm)',
    'card-elevation-hover': 'var(--la-shadow-md)',
    'card-transition': 'var(--la-transition-all)',
  },

  modal: {
    'modal-backdrop': 'var(--la-overlay-background)',
    'modal-elevation': 'var(--la-shadow-xl)',
    'modal-border-radius': 'var(--la-radius-lg)',
    'modal-padding': 'var(--la-space-12)',
    'modal-animation': 'var(--la-transition-all)',
  }
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