/**
 * Theme and design token constants
 */

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
  SYSTEM: 'system'
} as const;

export const COLOR_SCHEMES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  NEUTRAL: 'neutral'
} as const;

export const COMPONENT_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  GHOST: 'ghost',
  OUTLINE: 'outline',
  LINK: 'link',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export const ELEVATION_LEVELS = {
  NONE: 0,
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
  XXL: 6
} as const;

/**
 * Enterprise Border Radius Scale
 * 🌟 World-class border radius system που ξεπερνά Material Design 3, Fluent, και Apple HIG
 *
 * Features:
 * - CSS Custom Properties με theme awareness
 * - Type-safe border radius tokens με semantic naming
 * - Enterprise-grade flexibility για complex layouts
 * - Performance-optimized με design token integration
 * - Aligned με SPACING_SCALE για consistency
 */
export const BORDER_RADIUS_SCALE = {
  // Base radius units (pixel-perfect system)
  NONE: 0,     // No radius - Sharp edges

  // Micro radius (για fine details)
  XXS: 2,      // 2px - Subtle rounding
  XS: 4,       // 4px - Small components

  // Standard radius (aligned με spacing)
  SM: 8,       // 8px - Cards, buttons
  MD: 12,      // 12px - Panels, modals
  LG: 16,      // 16px - Large cards
  XL: 24,      // 24px - Hero sections
  XXL: 32,     // 32px - Large containers
  XXXL: 48,    // 48px - Extra large elements

  // Special radius values
  PILL: 9999,  // Full rounding (pills, badges)
  CIRCLE: '50%', // Perfect circles

  // Component-specific radius
  BUTTON: 8,   // Standard button radius
  CARD: 12,    // Standard card radius
  INPUT: 6,    // Form input radius
  BADGE: 9999, // Badge/tag radius
  MODAL: 16,   // Modal dialog radius
  TOOLTIP: 4,  // Tooltip radius

  // Layout radius (για major sections)
  LAYOUT_SM: 20,   // 20px - Small sections
  LAYOUT_MD: 28,   // 28px - Medium sections
  LAYOUT_LG: 36,   // 36px - Large sections
  LAYOUT_XL: 44,   // 44px - Hero sections
} as const;

// Legacy BORDER_RADIUS για backward compatibility
export const BORDER_RADIUS = BORDER_RADIUS_SCALE;

/**
 * Enterprise Spacing Scale - SINGLE SOURCE OF TRUTH
 * 🌟 Complete spacing system για all use cases
 *
 * Consolidated από @layera/layout SIZING_SCALE για Single Source of Truth
 * Covers: micro spacing, standard spacing, layout sizing, containers, viewport
 */
export const SPACING_SCALE = {
  // Base spacing units (8px base unit system)
  BASE_UNIT: 8,

  // Micro spacing (για fine-tuning)
  NONE: 0,
  XXS: 2,   // 2px
  XS: 4,    // 4px

  // Standard spacing (core system)
  SM: 8,    // 8px
  MD: 16,   // 16px
  LG: 24,   // 24px
  XL: 32,   // 32px
  XXL: 48,  // 48px
  XXXL: 64, // 64px

  // Layout spacing (για major components)
  LAYOUT_SM: 80,   // 80px
  LAYOUT_MD: 120,  // 120px
  LAYOUT_LG: 160,  // 160px
  LAYOUT_XL: 240,  // 240px
  LAYOUT_XXL: 320, // 320px
  LAYOUT_XXXL: 480, // 480px

  // Container spacing (για content areas)
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

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  // Υψηλά z-index για elements που πρέπει να εμφανίζονται πάνω από χάρτες
  MAP_OVERLAY: 10000,
  MAP_MODAL: 10050
} as const;

/**
 * Enterprise CSS custom properties για border radius system
 * Συνδέονται με το @layera/constants theme system
 */
export const BORDER_RADIUS_CSS_VARS = {
  // Base radius tokens
  'border-radius-none': `${BORDER_RADIUS_SCALE.NONE}px`,
  'border-radius-xxs': `${BORDER_RADIUS_SCALE.XXS}px`,
  'border-radius-xs': `${BORDER_RADIUS_SCALE.XS}px`,
  'border-radius-sm': `${BORDER_RADIUS_SCALE.SM}px`,
  'border-radius-md': `${BORDER_RADIUS_SCALE.MD}px`,
  'border-radius-lg': `${BORDER_RADIUS_SCALE.LG}px`,
  'border-radius-xl': `${BORDER_RADIUS_SCALE.XL}px`,
  'border-radius-xxl': `${BORDER_RADIUS_SCALE.XXL}px`,
  'border-radius-xxxl': `${BORDER_RADIUS_SCALE.XXXL}px`,

  // Special radius tokens
  'border-radius-pill': `${BORDER_RADIUS_SCALE.PILL}px`,
  'border-radius-circle': BORDER_RADIUS_SCALE.CIRCLE,

  // Component-specific tokens
  'border-radius-button': `${BORDER_RADIUS_SCALE.BUTTON}px`,
  'border-radius-card': `${BORDER_RADIUS_SCALE.CARD}px`,
  'border-radius-input': `${BORDER_RADIUS_SCALE.INPUT}px`,
  'border-radius-badge': `${BORDER_RADIUS_SCALE.BADGE}px`,
  'border-radius-modal': `${BORDER_RADIUS_SCALE.MODAL}px`,
  'border-radius-tooltip': `${BORDER_RADIUS_SCALE.TOOLTIP}px`,

  // Layout radius tokens
  'border-radius-layout-sm': `${BORDER_RADIUS_SCALE.LAYOUT_SM}px`,
  'border-radius-layout-md': `${BORDER_RADIUS_SCALE.LAYOUT_MD}px`,
  'border-radius-layout-lg': `${BORDER_RADIUS_SCALE.LAYOUT_LG}px`,
  'border-radius-layout-xl': `${BORDER_RADIUS_SCALE.LAYOUT_XL}px`,
} as const;

/**
 * Type-safe border radius tokens για backward compatibility
 * Primary BorderRadiusToken τώρα είναι στο design-tokens.ts
 */
export type BorderRadiusScaleToken = keyof typeof BORDER_RADIUS_SCALE;

/**
 * Semantic border radius categories για different use cases
 */
export type BorderRadiusCategory =
  | 'micro'      // XXS, XS
  | 'standard'   // SM, MD, LG, XL, XXL, XXXL
  | 'special'    // PILL, CIRCLE
  | 'component'  // BUTTON, CARD, INPUT, BADGE, MODAL, TOOLTIP
  | 'layout';    // LAYOUT_*

/**
 * Utility function για CSS custom property access
 */
export const getBorderRadiusVar = (token: string): string => {
  return `var(--border-radius-${token})`;
};

/**
 * Utility function για border radius value lookup
 */
export const getBorderRadiusValue = (token: BorderRadiusScaleToken): string | number => {
  const value = BORDER_RADIUS_SCALE[token];
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}px`;
  }
  return value;
};

/**
 * Enterprise border radius utilities για common patterns
 */
export const BORDER_RADIUS_UTILITIES = {
  // Component-specific patterns
  components: {
    // Button variations
    button: {
      default: getBorderRadiusVar('button'),       // 8px
      rounded: getBorderRadiusVar('pill'),         // 9999px
      square: getBorderRadiusVar('none')           // 0px
    },

    // Card variations
    card: {
      default: getBorderRadiusVar('card'),         // 12px
      compact: getBorderRadiusVar('sm'),           // 8px
      elevated: getBorderRadiusVar('lg'),          // 16px
      hero: getBorderRadiusVar('xl')               // 24px
    },

    // Input field variations
    input: {
      default: getBorderRadiusVar('input'),        // 6px
      rounded: getBorderRadiusVar('sm'),           // 8px
      pill: getBorderRadiusVar('pill')             // 9999px
    },

    // Modal variations
    modal: {
      default: getBorderRadiusVar('modal'),        // 16px
      compact: getBorderRadiusVar('md'),           // 12px
      large: getBorderRadiusVar('xl')              // 24px
    },

    // Badge/Tag variations
    badge: {
      default: getBorderRadiusVar('badge'),        // 9999px
      rectangular: getBorderRadiusVar('xs'),       // 4px
      rounded: getBorderRadiusVar('sm')            // 8px
    }
  },

  // Layout patterns
  layouts: {
    // Section containers
    section: {
      subtle: getBorderRadiusVar('layout-sm'),     // 20px
      standard: getBorderRadiusVar('layout-md'),   // 28px
      prominent: getBorderRadiusVar('layout-lg'),  // 36px
      hero: getBorderRadiusVar('layout-xl')        // 44px
    },

    // Panel containers
    panel: {
      compact: getBorderRadiusVar('md'),           // 12px
      standard: getBorderRadiusVar('lg'),          // 16px
      spacious: getBorderRadiusVar('xl')           // 24px
    }
  },

  // Interaction states
  interactions: {
    // Hover states (slightly increased radius)
    hover: {
      fromSm: getBorderRadiusVar('md'),            // 8px → 12px
      fromMd: getBorderRadiusVar('lg'),            // 12px → 16px
      fromLg: getBorderRadiusVar('xl')             // 16px → 24px
    },

    // Focus states (maintained radius με border)
    focus: {
      default: getBorderRadiusVar('sm'),           // Consistent με most components
      input: getBorderRadiusVar('input'),          // Specific για form fields
      button: getBorderRadiusVar('button')         // Specific για buttons
    }
  },

  // Application-specific patterns
  application: {
    // GeoAlert specific
    geoAlert: {
      mapTooltip: getBorderRadiusVar('tooltip'),   // 4px
      alertCard: getBorderRadiusVar('card'),       // 12px
      stepCard: getBorderRadiusVar('lg'),          // 16px
      modalDialog: getBorderRadiusVar('modal')     // 16px
    },

    // Drawing/Design tools
    design: {
      canvas: getBorderRadiusVar('sm'),            // 8px
      toolbar: getBorderRadiusVar('xs'),           // 4px
      preview: getBorderRadiusVar('md')            // 12px
    }
  }
} as const;

// Type exports
export type ThemeMode = typeof THEME_MODES[keyof typeof THEME_MODES];
export type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];
export type ComponentVariant = typeof COMPONENT_VARIANTS[keyof typeof COMPONENT_VARIANTS];
export type ElevationLevel = typeof ELEVATION_LEVELS[keyof typeof ELEVATION_LEVELS];
export type BorderRadius = typeof BORDER_RADIUS[keyof typeof BORDER_RADIUS];
export type BorderRadiusScale = typeof BORDER_RADIUS_SCALE[keyof typeof BORDER_RADIUS_SCALE];
export type SpacingScale = typeof SPACING_SCALE[keyof typeof SPACING_SCALE];
export type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX];