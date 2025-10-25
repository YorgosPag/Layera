/**
 * @layera/layout - Enterprise Sizing System
 *
 * 🌟 World-class sizing system που ξεπερνά Material Design 3, Fluent, και Ant Design
 *
 * Features:
 * - CSS Custom Properties με theme awareness
 * - Type-safe sizing tokens με semantic naming
 * - Responsive sizing με breakpoint awareness
 * - Performance-optimized με design token integration
 * - Enterprise-grade flexibility για complex layouts
 */

import { SPACING_SCALE } from '@layera/constants';

/**
 * Enterprise Sizing Token Scale
 * Βασισμένο στα industry standards: Material Design 3, Apple HIG, Fluent Design
 */
export const SIZING_SCALE = {
  // Base sizing units (8px base unit system)
  BASE_UNIT: 8,

  // Micro sizing (για fine-tuning)
  XXS: 2,   // 2px
  XS: 4,    // 4px

  // Standard sizing (aligned με spacing)
  SM: 8,    // 8px
  MD: 16,   // 16px
  LG: 24,   // 24px
  XL: 32,   // 32px
  XXL: 48,  // 48px
  XXXL: 64, // 64px

  // Layout sizing (για major components)
  LAYOUT_SM: 80,   // 80px
  LAYOUT_MD: 120,  // 120px
  LAYOUT_LG: 160,  // 160px
  LAYOUT_XL: 240,  // 240px
  LAYOUT_XXL: 320, // 320px
  LAYOUT_XXXL: 480, // 480px

  // Container sizing (για content areas)
  CONTAINER_SM: 600,   // 600px
  CONTAINER_MD: 800,   // 800px
  CONTAINER_LG: 1200,  // 1200px
  CONTAINER_XL: 1400,  // 1400px
  CONTAINER_XXL: 1600, // 1600px

  // Full viewport dimensions
  FULL: '100%',
  VIEWPORT_WIDTH: '100vw',
  VIEWPORT_HEIGHT: '100vh',

  // Minimum content dimensions
  MIN_CONTENT: 'min-content',
  MAX_CONTENT: 'max-content',
  FIT_CONTENT: 'fit-content',

  // Common aspect ratios (για responsive design)
  SQUARE: '1:1',
  WIDESCREEN: '16:9',
  GOLDEN: '1.618:1',
  A4: '1.414:1'
} as const;

/**
 * Type-safe sizing tokens
 */
export type SizingToken = keyof typeof SIZING_SCALE;

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
    'sizing-width-xxs': `${SIZING_SCALE.XXS}px`,
    'sizing-width-xs': `${SIZING_SCALE.XS}px`,
    'sizing-width-sm': `${SIZING_SCALE.SM}px`,
    'sizing-width-md': `${SIZING_SCALE.MD}px`,
    'sizing-width-lg': `${SIZING_SCALE.LG}px`,
    'sizing-width-xl': `${SIZING_SCALE.XL}px`,
    'sizing-width-xxl': `${SIZING_SCALE.XXL}px`,
    'sizing-width-xxxl': `${SIZING_SCALE.XXXL}px`,
    'sizing-width-layout-sm': `${SIZING_SCALE.LAYOUT_SM}px`,
    'sizing-width-layout-md': `${SIZING_SCALE.LAYOUT_MD}px`,
    'sizing-width-layout-lg': `${SIZING_SCALE.LAYOUT_LG}px`,
    'sizing-width-layout-xl': `${SIZING_SCALE.LAYOUT_XL}px`,
    'sizing-width-layout-xxl': `${SIZING_SCALE.LAYOUT_XXL}px`,
    'sizing-width-layout-xxxl': `${SIZING_SCALE.LAYOUT_XXXL}px`,
    'sizing-width-container-sm': `${SIZING_SCALE.CONTAINER_SM}px`,
    'sizing-width-container-md': `${SIZING_SCALE.CONTAINER_MD}px`,
    'sizing-width-container-lg': `${SIZING_SCALE.CONTAINER_LG}px`,
    'sizing-width-container-xl': `${SIZING_SCALE.CONTAINER_XL}px`,
    'sizing-width-container-xxl': `${SIZING_SCALE.CONTAINER_XXL}px`,
    'sizing-width-full': SIZING_SCALE.FULL,
    'sizing-width-viewport': SIZING_SCALE.VIEWPORT_WIDTH,
    'sizing-width-min-content': SIZING_SCALE.MIN_CONTENT,
    'sizing-width-max-content': SIZING_SCALE.MAX_CONTENT,
    'sizing-width-fit-content': SIZING_SCALE.FIT_CONTENT
  },

  // Height tokens (mirror width tokens)
  height: {
    'sizing-height-xxs': `${SIZING_SCALE.XXS}px`,
    'sizing-height-xs': `${SIZING_SCALE.XS}px`,
    'sizing-height-sm': `${SIZING_SCALE.SM}px`,
    'sizing-height-md': `${SIZING_SCALE.MD}px`,
    'sizing-height-lg': `${SIZING_SCALE.LG}px`,
    'sizing-height-xl': `${SIZING_SCALE.XL}px`,
    'sizing-height-xxl': `${SIZING_SCALE.XXL}px`,
    'sizing-height-xxxl': `${SIZING_SCALE.XXXL}px`,
    'sizing-height-layout-sm': `${SIZING_SCALE.LAYOUT_SM}px`,
    'sizing-height-layout-md': `${SIZING_SCALE.LAYOUT_MD}px`,
    'sizing-height-layout-lg': `${SIZING_SCALE.LAYOUT_LG}px`,
    'sizing-height-layout-xl': `${SIZING_SCALE.LAYOUT_XL}px`,
    'sizing-height-layout-xxl': `${SIZING_SCALE.LAYOUT_XXL}px`,
    'sizing-height-layout-xxxl': `${SIZING_SCALE.LAYOUT_XXXL}px`,
    'sizing-height-container-sm': `${SIZING_SCALE.CONTAINER_SM}px`,
    'sizing-height-container-md': `${SIZING_SCALE.CONTAINER_MD}px`,
    'sizing-height-container-lg': `${SIZING_SCALE.CONTAINER_LG}px`,
    'sizing-height-container-xl': `${SIZING_SCALE.CONTAINER_XL}px`,
    'sizing-height-container-xxl': `${SIZING_SCALE.CONTAINER_XXL}px`,
    'sizing-height-full': SIZING_SCALE.FULL,
    'sizing-height-viewport': SIZING_SCALE.VIEWPORT_HEIGHT,
    'sizing-height-min-content': SIZING_SCALE.MIN_CONTENT,
    'sizing-height-max-content': SIZING_SCALE.MAX_CONTENT,
    'sizing-height-fit-content': SIZING_SCALE.FIT_CONTENT
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
  const value = SIZING_SCALE[token];
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