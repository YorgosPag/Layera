/**
 * @layera/layout - Enterprise Sizing System
 *
 * 🌟 Single Source of Truth για spacing/sizing - Uses @layera/constants SPACING_SCALE
 *
 * Features:
 * - Re-exports enterprise SPACING_SCALE (31 tokens)
 * - Type-safe sizing tokens με semantic naming
 * - CSS Custom Properties compatibility
 * - Enterprise-grade flexibility για complex layouts
 */
import { SPACING_SCALE } from '@layera/constants';
/**
 * SPACING_SCALE reference για layout components
 * SINGLE SOURCE OF TRUTH: @layera/constants
 * Note: Use 'import { SPACING_SCALE } from "@layera/constants"' directly for Single Source of Truth
 */
/**
 * Type-safe sizing tokens
 * Note: Import SPACING_SCALE directly from '@layera/constants' for actual usage
 */
export type SizingToken = keyof typeof SPACING_SCALE;
/**
 * Semantic sizing categories για different use cases
 */
export type SizingCategory = 'micro' | 'standard' | 'layout' | 'container' | 'viewport' | 'content' | 'aspect';
/**
 * Enterprise CSS custom properties για sizing
 * Συνδέονται με το @layera/constants theme system
 */
export declare const SIZING_CSS_VARS: {
    readonly width: {
        readonly 'sizing-width-xxs': "var(--la-space-1)";
        readonly 'sizing-width-xs': "var(--la-space-1)";
        readonly 'sizing-width-sm': "var(--la-space-2)px";
        readonly 'sizing-width-md': "var(--la-space-4)px";
        readonly 'sizing-width-lg': "var(--la-space-6)";
        readonly 'sizing-width-xl': "var(--la-space-layout-xl)";
        readonly 'sizing-width-xxl': "var(--la-space-12)";
        readonly 'sizing-width-xxxl': "var(--la-space-16)";
        readonly 'sizing-width-layout-sm': "var(--la-space-8)px";
        readonly 'sizing-width-layout-md': "var(--la-space-12)px";
        readonly 'sizing-width-layout-lg': "var(--la-space-16)px";
        readonly 'sizing-width-layout-xl': "var(--la-space-20)px";
        readonly 'sizing-width-layout-xxl': "var(--la-space-24)px";
        readonly 'sizing-width-layout-xxxl': "var(--la-space-32)px";
        readonly 'sizing-width-container-sm': "600px";
        readonly 'sizing-width-container-md': "768px";
        readonly 'sizing-width-container-lg': "1200px";
        readonly 'sizing-width-container-xl': "1400px";
        readonly 'sizing-width-container-xxl': "1600px";
        readonly 'sizing-width-full': "var(--la-width-full)";
        readonly 'sizing-width-viewport': "100%";
        readonly 'sizing-width-min-content': "min-content";
        readonly 'sizing-width-max-content': "max-content";
        readonly 'sizing-width-fit-content': "fit-content";
    };
    readonly height: {
        readonly 'sizing-height-xxs': "var(--la-space-1)";
        readonly 'sizing-height-xs': "var(--la-space-1)";
        readonly 'sizing-height-sm': "var(--la-space-2)px";
        readonly 'sizing-height-md': "var(--la-space-4)px";
        readonly 'sizing-height-lg': "var(--la-space-6)";
        readonly 'sizing-height-xl': "var(--la-space-layout-xl)";
        readonly 'sizing-height-xxl': "var(--la-space-12)";
        readonly 'sizing-height-xxxl': "var(--la-space-16)";
        readonly 'sizing-height-layout-sm': "var(--la-space-8)px";
        readonly 'sizing-height-layout-md': "var(--la-space-12)px";
        readonly 'sizing-height-layout-lg': "var(--la-space-16)px";
        readonly 'sizing-height-layout-xl': "var(--la-space-20)px";
        readonly 'sizing-height-layout-xxl': "var(--la-space-24)px";
        readonly 'sizing-height-layout-xxxl': "var(--la-space-32)px";
        readonly 'sizing-height-container-sm': "600px";
        readonly 'sizing-height-container-md': "768px";
        readonly 'sizing-height-container-lg': "1200px";
        readonly 'sizing-height-container-xl': "1400px";
        readonly 'sizing-height-container-xxl': "1600px";
        readonly 'sizing-height-full': "var(--la-height-full)";
        readonly 'sizing-height-viewport': "100%";
        readonly 'sizing-height-min-content': "min-content";
        readonly 'sizing-height-max-content': "max-content";
        readonly 'sizing-height-fit-content': "fit-content";
    };
};
/**
 * Type-safe sizing token names
 */
export type SizingTokenName = keyof typeof SIZING_CSS_VARS.width | keyof typeof SIZING_CSS_VARS.height;
/**
 * Utility function για CSS custom property access
 */
export declare const getSizingVar: (category: "width" | "height", token: string) => string;
/**
 * Utility function για sizing value lookup
 */
export declare const getSizingValue: (token: SizingToken) => string | number;
/**
 * Enterprise sizing utilities για common patterns
 */
export declare const SIZING_UTILITIES: {
    readonly icon: {
        readonly small: string;
        readonly medium: string;
        readonly large: string;
    };
    readonly avatar: {
        readonly xs: string;
        readonly sm: string;
        readonly md: string;
        readonly lg: string;
        readonly xl: string;
    };
    readonly button: {
        readonly xs: {
            readonly height: string;
            readonly minWidth: string;
        };
        readonly sm: {
            readonly height: string;
            readonly minWidth: string;
        };
        readonly md: {
            readonly height: string;
            readonly minWidth: string;
        };
        readonly lg: {
            readonly height: string;
            readonly minWidth: string;
        };
    };
    readonly card: {
        readonly compact: {
            readonly minHeight: string;
            readonly maxWidth: string;
        };
        readonly standard: {
            readonly minHeight: string;
            readonly maxWidth: string;
        };
        readonly expanded: {
            readonly minHeight: string;
            readonly maxWidth: string;
        };
    };
    readonly modal: {
        readonly sm: {
            readonly width: string;
            readonly maxHeight: "80vh";
        };
        readonly md: {
            readonly width: string;
            readonly maxHeight: "85vh";
        };
        readonly lg: {
            readonly width: string;
            readonly maxHeight: "90vh";
        };
        readonly xl: {
            readonly width: string;
            readonly maxHeight: "95vh";
        };
    };
};
/**
 * Responsive sizing utilities (για μελλοντική χρήση με breakpoints)
 */
export declare const RESPONSIVE_SIZING: {
    readonly mobile: {
        readonly containerMaxWidth: string;
        readonly sidebarWidth: string;
    };
    readonly tablet: {
        readonly containerMaxWidth: string;
        readonly sidebarWidth: string;
    };
    readonly desktop: {
        readonly containerMaxWidth: string;
        readonly sidebarWidth: string;
    };
    readonly desktopLarge: {
        readonly containerMaxWidth: string;
        readonly sidebarWidth: string;
    };
};
