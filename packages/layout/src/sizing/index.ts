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
export type SizingCategory =
  | 'micro'      // XXS, XS
  | 'standard'   // SM, MD, LG, XL, XXL, XXXL
  | 'layout'     // LAYOUT_*
  | 'container'  // CONTAINER_*
  | 'viewport'   // FULL, VIEWPORT_*
  | 'content'    // MIN_CONTENT, MAX_CONTENT, FIT_CONTENT
  | 'aspect';    // SQUARE, WIDESCREEN, etc.

/**
 * Enterprise CSS custom properties για sizing
 * Συνδέονται με το @layera/constants theme system
 */
export const SIZING_CSS_VARS = {
  // Width tokens
  width: {
    'sizing-width-xxs': 'var(--la-space-1)', // 🎯 SST: XXS spacing token
    'sizing-width-xs': 'var(--la-space-1)', // 🎯 SST: XS spacing token
    'sizing-width-sm': `${SPACING_SCALE.SM}px`,
    'sizing-width-md': `${SPACING_SCALE.MD}px`,
    'sizing-width-lg': 'var(--la-space-6)', // 🎯 SST: LG width (24px)
    'sizing-width-xl': 'var(--la-space-layout-xl)', // 🎯 SST: XL spacing token
    'sizing-width-xxl': 'var(--la-space-12)', // 🎯 SST: XXL spacing token
    'sizing-width-xxxl': 'var(--la-space-16)', // 🎯 SST: XXXL spacing token
    'sizing-width-layout-sm': `${SPACING_SCALE.LAYOUT_SM}px`,
    'sizing-width-layout-md': `${SPACING_SCALE.LAYOUT_MD}px`,
    'sizing-width-layout-lg': `${SPACING_SCALE.LAYOUT_LG}px`,
    'sizing-width-layout-xl': `${SPACING_SCALE.LAYOUT_XL}px`,
    'sizing-width-layout-xxl': `${SPACING_SCALE.LAYOUT_XXL}px`,
    'sizing-width-layout-xxxl': `${SPACING_SCALE.LAYOUT_XXXL}px`,
    'sizing-width-container-sm': `${SPACING_SCALE.CONTAINER_SM}px`,
    'sizing-width-container-md': `${SPACING_SCALE.CONTAINER_MD}px`,
    'sizing-width-container-lg': `${SPACING_SCALE.CONTAINER_LG}px`,
    'sizing-width-container-xl': `${SPACING_SCALE.CONTAINER_XL}px`,
    'sizing-width-container-xxl': `${SPACING_SCALE.CONTAINER_XXL}px`,
    'sizing-width-full': 'var(--la-width-full)', // 🎯 SST: Full width
    'sizing-width-viewport': SPACING_SCALE.VIEWPORT_WIDTH,
    'sizing-width-min-content': SPACING_SCALE.MIN_CONTENT,
    'sizing-width-max-content': SPACING_SCALE.MAX_CONTENT,
    'sizing-width-fit-content': SPACING_SCALE.FIT_CONTENT
  },

  // Height tokens (mirror width tokens)
  height: {
    'sizing-height-xxs': 'var(--la-space-1)', // 🎯 SST: XXS spacing token
    'sizing-height-xs': 'var(--la-space-1)', // 🎯 SST: XS spacing token
    'sizing-height-sm': `${SPACING_SCALE.SM}px`,
    'sizing-height-md': `${SPACING_SCALE.MD}px`,
    'sizing-height-lg': 'var(--la-space-6)', // 🎯 SST: LG height (24px)
    'sizing-height-xl': 'var(--la-space-layout-xl)', // 🎯 SST: XL spacing token
    'sizing-height-xxl': 'var(--la-space-12)', // 🎯 SST: XXL spacing token
    'sizing-height-xxxl': 'var(--la-space-16)', // 🎯 SST: XXXL spacing token
    'sizing-height-layout-sm': `${SPACING_SCALE.LAYOUT_SM}px`,
    'sizing-height-layout-md': `${SPACING_SCALE.LAYOUT_MD}px`,
    'sizing-height-layout-lg': `${SPACING_SCALE.LAYOUT_LG}px`,
    'sizing-height-layout-xl': `${SPACING_SCALE.LAYOUT_XL}px`,
    'sizing-height-layout-xxl': `${SPACING_SCALE.LAYOUT_XXL}px`,
    'sizing-height-layout-xxxl': `${SPACING_SCALE.LAYOUT_XXXL}px`,
    'sizing-height-container-sm': `${SPACING_SCALE.CONTAINER_SM}px`,
    'sizing-height-container-md': `${SPACING_SCALE.CONTAINER_MD}px`,
    'sizing-height-container-lg': `${SPACING_SCALE.CONTAINER_LG}px`,
    'sizing-height-container-xl': `${SPACING_SCALE.CONTAINER_XL}px`,
    'sizing-height-container-xxl': `${SPACING_SCALE.CONTAINER_XXL}px`,
    'sizing-height-full': 'var(--la-height-full)', // 🎯 SST: Full height
    'sizing-height-viewport': SPACING_SCALE.VIEWPORT_HEIGHT,
    'sizing-height-min-content': SPACING_SCALE.MIN_CONTENT,
    'sizing-height-max-content': SPACING_SCALE.MAX_CONTENT,
    'sizing-height-fit-content': SPACING_SCALE.FIT_CONTENT
  }
} as const;

/**
 * Type-safe sizing token names
 */
export type SizingTokenName = keyof typeof SIZING_CSS_VARS.width | keyof typeof SIZING_CSS_VARS.height;

/**
 * Utility function για CSS custom property access
 */
export const getSizingVar = (category: 'width' | 'height', token: string): string => {
  return `var(--sizing-${category}-${token})`;
};

/**
 * Utility function για sizing value lookup
 */
export const getSizingValue = (token: SizingToken): string | number => {
  const value = SPACING_SCALE[token];
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

/**
 * Enterprise sizing utilities για common patterns
 */
export const SIZING_UTILITIES = {
  // Icon sizing (semantic naming)
  icon: {
    small: getSizingVar('width', 'md'),     // 16px
    medium: getSizingVar('width', 'lg'),    // 24px
    large: getSizingVar('width', 'xl')      // 32px
  },

  // Avatar sizing
  avatar: {
    xs: getSizingVar('width', 'lg'),        // 24px
    sm: getSizingVar('width', 'xl'),        // 32px
    md: getSizingVar('width', 'xxl'),       // 48px
    lg: getSizingVar('width', 'xxxl'),      // 64px
    xl: getSizingVar('width', 'layout-sm')  // 80px
  },

  // Button sizing
  button: {
    xs: {
      height: getSizingVar('height', 'lg'),  // 24px
      minWidth: getSizingVar('width', 'xxxl') // 64px
    },
    sm: {
      height: getSizingVar('height', 'xl'),   // 32px
      minWidth: getSizingVar('width', 'layout-sm') // 80px
    },
    md: {
      height: getSizingVar('height', 'xxl'),  // 48px
      minWidth: getSizingVar('width', 'layout-md') // 120px
    },
    lg: {
      height: getSizingVar('height', 'xxxl'), // 64px
      minWidth: getSizingVar('width', 'layout-lg') // 160px
    }
  },

  // Card sizing
  card: {
    compact: {
      minHeight: getSizingVar('height', 'layout-sm'), // 80px
      maxWidth: getSizingVar('width', 'container-sm')  // 600px
    },
    standard: {
      minHeight: getSizingVar('height', 'layout-md'), // 120px
      maxWidth: getSizingVar('width', 'container-md')  // 800px
    },
    expanded: {
      minHeight: getSizingVar('height', 'layout-lg'), // 160px
      maxWidth: getSizingVar('width', 'container-lg')  // 1200px
    }
  },

  // Modal sizing
  modal: {
    sm: {
      width: getSizingVar('width', 'container-sm'),    // 600px
      maxHeight: '80vh'
    },
    md: {
      width: getSizingVar('width', 'container-md'),    // 800px
      maxHeight: '85vh'
    },
    lg: {
      width: getSizingVar('width', 'container-lg'),    // 1200px
      maxHeight: '90vh'
    },
    xl: {
      width: getSizingVar('width', 'container-xl'),    // 1400px
      maxHeight: '95vh'
    }
  }
} as const;

/**
 * Responsive sizing utilities (για μελλοντική χρήση με breakpoints)
 */
export const RESPONSIVE_SIZING = {
  // Mobile-first approach
  mobile: {
    containerMaxWidth: getSizingVar('width', 'container-sm'), // 600px
    sidebarWidth: getSizingVar('width', 'layout-xxl')        // 320px
  },

  // Tablet sizing
  tablet: {
    containerMaxWidth: getSizingVar('width', 'container-md'), // 800px
    sidebarWidth: getSizingVar('width', 'layout-xxxl')       // 480px
  },

  // Desktop sizing
  desktop: {
    containerMaxWidth: getSizingVar('width', 'container-lg'), // 1200px
    sidebarWidth: getSizingVar('width', 'container-sm')      // 600px
  },

  // Large desktop sizing
  desktopLarge: {
    containerMaxWidth: getSizingVar('width', 'container-xl'), // 1400px
    sidebarWidth: getSizingVar('width', 'container-sm')      // 600px
  }
} as const;