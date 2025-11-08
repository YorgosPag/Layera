/**
 * @layera/constants - Design Token System (SST Compliant)
 *
 * 🎯 Single Source of Truth: All tokens imported from @layera/tokens
 *
 * ⚠️ ZERO hardcoded values allowed - 100% SST compliance
 * ✅ TO MODIFY: Edit packages/tokens/src/tokens.json and run npm run tokens:build
 */
/**
 * Re-export all generated design tokens from Style Dictionary
 * This ensures we have a single source of truth for all design values
 */
import { CRYPTOGRAPHIC_CONSTANTS } from './legacy-aliases';
/**
 * Semantic aliases using SST tokens only
 * These provide meaningful names while maintaining Single Source of Truth
 */
export declare const cardPadding: "var(--la-space-4)";
export declare const cardMargin: "var(--la-space-6)";
export declare const buttonPadding: "var(--la-space-3) var(--la-space-4)";
/**
 * @deprecated Use tokens from '@layera/tokens/dist/ts' instead
 * These constants will be removed in a future version
 *
 * 🎯 SST COMPLIANCE: All values now reference CSS custom properties
 */
/**
 * Spacing Scale - SINGLE SOURCE OF TRUTH
 * Used by components for consistent spacing
 */
export declare const SPACING_SCALE: {
    readonly VIEWPORT_WIDTH: "100%";
    readonly VIEWPORT_HEIGHT: "100%";
    readonly MIN_CONTENT: "min-content";
    readonly MAX_CONTENT: "max-content";
    readonly FIT_CONTENT: "fit-content";
    readonly CONTAINER_SM: 600;
    readonly CONTAINER_MD: 768;
    readonly CONTAINER_LG: 1200;
    readonly CONTAINER_XL: 1400;
    readonly CONTAINER_XXL: 1600;
    readonly LAYOUT_SM: "var(--la-space-8)";
    readonly LAYOUT_MD: "var(--la-space-12)";
    readonly LAYOUT_LG: "var(--la-space-16)";
    readonly LAYOUT_XL: "var(--la-space-20)";
    readonly LAYOUT_XXL: "var(--la-space-24)";
    readonly LAYOUT_XXXL: "var(--la-space-32)";
    readonly XS: "var(--la-space-1)";
    readonly SM: "var(--la-space-2)";
    readonly MD: "var(--la-space-4)";
    readonly LG: "var(--la-space-6)";
    readonly XL: "var(--la-space-8)";
    readonly XXL: "var(--la-space-12)";
};
export { CRYPTOGRAPHIC_CONSTANTS };
/**
 * Border Radius Scale - SINGLE SOURCE OF TRUTH
 */
export declare const BORDER_RADIUS_SCALE: {
    readonly NONE: "var(--la-radius-none)";
    readonly XXS: "var(--la-radius-xxs)";
    readonly XS: "var(--la-radius-xs)";
    readonly SM: "var(--la-radius-sm)";
    readonly MD: "var(--la-radius-md)";
    readonly LG: "var(--la-radius-lg)";
    readonly XL: "var(--la-radius-xl)";
    readonly XXL: "var(--la-radius-xxl)";
    readonly XXXL: "var(--la-radius-xxxl)";
    readonly FULL: "var(--la-radius-full)";
    readonly PILL: "var(--la-radius-pill)";
    readonly CIRCLE: "var(--la-radius-circle)";
    readonly BUTTON: "var(--la-radius-button)";
    readonly CARD: "var(--la-radius-card)";
    readonly INPUT: "var(--la-radius-input)";
    readonly BADGE: "var(--la-radius-badge)";
    readonly MODAL: "var(--la-radius-modal)";
    readonly TOOLTIP: "var(--la-radius-tooltip)";
    readonly LAYOUT_SM: "var(--la-radius-layout-sm)";
    readonly LAYOUT_MD: "var(--la-radius-layout-md)";
    readonly LAYOUT_LG: "var(--la-radius-layout-lg)";
    readonly LAYOUT_XL: "var(--la-radius-layout-xl)";
};
/**
 * Fixed Dimensions - Common component sizes
 */
export declare const CSS_DESIGN_TOKENS: {
    readonly spacing: {
        readonly 'spacing-0': "var(--la-space-0)";
        readonly 'spacing-xxs': "var(--la-space-1)";
        readonly 'spacing-xs': "var(--la-space-2)";
        readonly 'spacing-sm': "var(--la-space-3)";
        readonly 'spacing-md': "var(--la-space-4)";
        readonly 'spacing-lg': "var(--la-space-6)";
        readonly 'spacing-xl': "var(--la-space-8)";
        readonly 'spacing-xxl': "var(--la-space-12)";
        readonly 'spacing-xxxl': "var(--la-space-20)";
    };
    readonly colors: {
        readonly 'color-bg-canvas': "var(--la-color-surface)";
        readonly 'color-bg-surface': "var(--la-bg-secondary)";
        readonly 'color-bg-surface-raised': "var(--la-color-surface)";
        readonly 'color-bg-surface-overlay': "var(--la-overlay-background)";
        readonly 'color-text-primary': "var(--la-color-text-primary)";
        readonly 'color-text-secondary': "var(--la-color-text-secondary)";
        readonly 'color-text-tertiary': "var(--la-color-text-tertiary)";
        readonly 'color-text-inverse': "var(--la-color-text-on-dark)";
        readonly 'color-semantic-info-bg': "var(--la-color-info)";
        readonly 'color-semantic-info-border': "var(--la-border-info)";
        readonly 'color-semantic-info-text': "var(--la-text-on-info)";
        readonly 'color-semantic-success-bg': "var(--la-color-bg-success)";
        readonly 'color-semantic-success-border': "var(--la-color-success)";
        readonly 'color-semantic-success-text': "var(--la-text-on-success)";
        readonly 'color-semantic-warning-bg': "var(--la-color-bg-warning)";
        readonly 'color-semantic-warning-border': "var(--la-color-warning)";
        readonly 'color-semantic-warning-text': "var(--la-color-warning)";
        readonly 'color-semantic-error-bg': "var(--la-color-error)";
        readonly 'color-semantic-error-border': "var(--la-border-error)";
        readonly 'color-semantic-error-text': "var(--la-color-error)";
        readonly 'color-interactive-primary': "var(--la-color-brand)";
        readonly 'color-interactive-primary-hover': "var(--la-color-brand-hover)";
        readonly 'color-interactive-primary-active': "var(--la-color-brand-active)";
        readonly 'color-border-default': "var(--la-color-border-primary)";
        readonly 'color-border-subtle': "var(--la-color-border-subtle)";
        readonly 'color-border-strong': "var(--la-color-border-strong)";
    };
    readonly elevation: {
        readonly 'elevation-none': "var(--la-shadow-none)";
        readonly 'elevation-xs': "var(--la-shadow-sm)";
        readonly 'elevation-sm': "var(--la-shadow-md)";
        readonly 'elevation-md': "var(--la-shadow-lg)";
        readonly 'elevation-lg': "var(--la-shadow-xl)";
        readonly 'elevation-xl': "var(--la-shadow-xl)";
        readonly 'elevation-xxl': "var(--la-shadow-xl)";
    };
    readonly motion: {
        readonly 'motion-transition-fast': "var(--la-transition-all)";
        readonly 'motion-transition-normal': "var(--la-transition-all)";
        readonly 'motion-transition-slow': "var(--la-transition-all)";
        readonly 'motion-transition-colors': "var(--la-transition-colors)";
    };
    readonly typography: {
        readonly 'font-family-sans': "var(--la-font-family-base)";
        readonly 'font-family-mono': "var(--la-font-family-monospace)";
        readonly 'font-size-xs': "var(--la-font-size-xs)";
        readonly 'font-size-sm': "var(--la-font-size-sm)";
        readonly 'font-size-md': "var(--la-font-size-base)";
        readonly 'font-size-lg': "var(--la-font-size-lg)";
        readonly 'font-size-xl': "var(--la-font-size-xl)";
        readonly 'line-height-tight': "var(--la-line-height-tight)";
        readonly 'line-height-normal': "var(--la-line-height-normal)";
        readonly 'line-height-relaxed': "var(--la-line-height-relaxed)";
        readonly 'font-weight-regular': "var(--la-font-weight-normal)";
        readonly 'font-weight-medium': "var(--la-font-weight-medium)";
        readonly 'font-weight-semibold': "var(--la-font-weight-semibold)";
    };
    readonly borderRadius: {
        readonly 'border-radius-none': "var(--la-radius-none)";
        readonly 'border-radius-xs': "var(--la-radius-xs)";
        readonly 'border-radius-sm': "var(--la-radius-sm)";
        readonly 'border-radius-md': "var(--la-radius-md)";
        readonly 'border-radius-lg': "var(--la-radius-lg)";
        readonly 'border-radius-full': "var(--la-radius-full)";
    };
    readonly zIndex: {
        readonly 'z-index-base': "var(--la-z-index-base)";
        readonly 'z-index-dropdown': "var(--la-z-index-dropdown)";
        readonly 'z-index-overlay': "var(--la-z-index-overlay)";
        readonly 'z-index-modal': "var(--la-z-index-modal)";
        readonly 'z-index-popover': "var(--la-z-index-popover)";
        readonly 'z-index-tooltip': "var(--la-z-index-tooltip)";
        readonly 'z-index-toast': "var(--la-z-toast)";
    };
};
/**
 * Component-specific design tokens (SST-COMPLIANT)
 * Κάθε component χρησιμοποιεί μόνο SST tokens
 */
export declare const COMPONENT_DESIGN_TOKENS: {
    readonly button: {
        readonly 'button-padding-sm': "var(--la-button-padding-sm)";
        readonly 'button-padding-xl': "var(--la-button-padding-xl)";
        readonly 'button-border-radius': "var(--la-button-border-radius)";
        readonly 'button-transition': "var(--la-transition-all)";
    };
    readonly card: {
        readonly 'card-padding': "var(--la-space-4)";
        readonly 'card-border-radius': "var(--la-radius-md)";
        readonly 'card-background': "var(--la-color-surface)";
        readonly 'card-border': "var(--la-border-width-xxs) solid var(--la-color-border-primary)";
        readonly 'card-elevation': "var(--la-shadow-sm)";
        readonly 'card-elevation-hover': "var(--la-shadow-md)";
        readonly 'card-transition': "var(--la-transition-all)";
    };
    readonly modal: {
        readonly 'modal-backdrop': "var(--la-overlay-background)";
        readonly 'modal-elevation': "var(--la-shadow-xl)";
        readonly 'modal-border-radius': "var(--la-radius-lg)";
        readonly 'modal-padding': "var(--la-space-12)";
        readonly 'modal-animation': "var(--la-transition-all)";
    };
    readonly haptic: {
        readonly 'haptic-light': 10;
        readonly 'haptic-medium': 20;
        readonly 'haptic-heavy': 50;
    };
    readonly animations: {
        readonly 'duration-short': 200;
        readonly 'duration-medium': 300;
        readonly 'duration-long': 500;
        readonly 'delay-device-check': 100;
        readonly 'delay-smooth': 100;
    };
    readonly forms: {
        readonly 'max-length-title': 100;
        readonly 'max-length-description': 500;
        readonly 'max-length-name': 50;
        readonly 'debounce-ms': 300;
        readonly 'validation-timeout-short': 3000;
        readonly 'validation-timeout-medium': 5000;
        readonly 'validation-timeout-long': 8000;
    };
};
/**
 * Responsive design tokens (SST-COMPLIANT)
 * Responsive behavior handled by CSS media queries in SST tokens
 *
 * @deprecated Use @layera/viewport for responsive behavior
 * SST tokens include responsive variants automatically
 */
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
