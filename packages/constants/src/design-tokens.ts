/**
 * @layera/constants - Design Token System (Generated)
 *
 * 🎯 Single Source of Truth: All tokens are generated from tokens.json
 *
 * ⚠️ DO NOT EDIT: This file re-exports generated tokens
 * ✅ TO MODIFY: Edit packages/tokens/src/tokens.json and run npm run tokens:build
 */

// === GENERATED DESIGN TOKENS ===

/**
 * Re-export all generated design tokens from Style Dictionary
 *
 * This ensures we have a single source of truth for all design values
 * while maintaining backward compatibility for existing imports.
 */
export * from '@layera/tokens/dist/ts';

// === SEMANTIC ALIASES ===

/**
 * Semantic aliases for common use cases
 * These provide meaningful names for specific design intentions
 */
export const cardPadding = 'var(--la-space-4)' as const;
export const cardMargin = 'var(--la-space-6)' as const;
export const buttonPadding = 'var(--la-space-3) var(--la-space-4)' as const;

// === BACKWARD COMPATIBILITY ===

/**
 * @deprecated Use tokens from '@layera/tokens/dist/ts' instead
 * These constants will be removed in a future version
 */

// Base scale configuration for legacy calculations
const DESIGN_TOKEN_SCALE = {
  BASE_UNIT: 4, // 4px base unit
  SCALE_FACTORS: {
    XXS: 1,   // 4px
    XS: 2,    // 8px
    SM: 3,    // 12px
    MD: 4,    // 16px
    LG: 6,    // 24px
    XL: 8,    // 32px
    XXL: 12,  // 48px
    XXXL: 16, // 64px
  }
} as const;

export const CSS_DESIGN_TOKENS = {
  // === SPACING TOKENS ===
  spacing: {
    'spacing-0': '0',
    'spacing-xxs': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXS}px`,
    'spacing-xs': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XS}px`,
    'spacing-sm': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.SM}px`,
    'spacing-md': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.MD}px`,
    'spacing-lg': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.LG}px`,
    'spacing-xl': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XL}px`,
    'spacing-xxl': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXL}px`,
    'spacing-xxxl': `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXXL}px`,
  },

  // === SEMANTIC COLOR TOKENS ===
  colors: {
    // Background colors - theme-aware
    'color-bg-canvas': 'light-dark(var(--la-color-surface), var(--la-color-black))',
    'color-bg-surface': 'light-dark(var(--la-bg-subtle), #1a1a1a)',
    'color-bg-surface-raised': 'light-dark(var(--la-color-surface), #262626)',
    'color-bg-surface-overlay': 'light-dark(rgba(255,255,255,0.95), rgba(15,15,15,0.95))',

    // Text colors - WCAG AAA compliant
    'color-text-primary': 'light-dark(var(--la-color-black), #f0f0f0)',
    'color-text-secondary': 'light-dark(var(--la-text-secondary), #a1a1aa)',
    'color-text-tertiary': 'light-dark(var(--la-text-muted), #71717a)',
    'color-text-inverse': 'light-dark(var(--la-color-surface), var(--la-color-black))',

    // Semantic states - accessibility compliant
    'color-semantic-info-bg': 'light-dark(#eff6ff, #1e3a8a)',
    'color-semantic-info-border': 'light-dark(var(--la-color-brand), var(--la-color-primary-light))',
    'color-semantic-info-text': 'light-dark(#1e40af, #bfdbfe)',

    'color-semantic-success-bg': 'light-dark(#f0fdf4, #14532d)',
    'color-semantic-success-border': 'light-dark(var(--la-color-success), #4ade80)',
    'color-semantic-success-text': 'light-dark(#166534, #bbf7d0)',

    'color-semantic-warning-bg': 'light-dark(#fef3c7, #92400e)',
    'color-semantic-warning-border': 'light-dark(var(--la-color-warning), #fbbf24)',
    'color-semantic-warning-text': 'light-dark(var(--la-color-warning-dark), #fef3c7)',

    'color-semantic-error-bg': 'light-dark(#fef2f2, #7f1d1d)',
    'color-semantic-error-border': 'light-dark(var(--la-color-error), #f87171)',
    'color-semantic-error-text': 'light-dark(#dc2626, #fecaca)',

    // Interactive states
    'color-interactive-primary': 'light-dark(var(--la-color-brand), var(--la-color-primary-light))',
    'color-interactive-primary-hover': 'light-dark(var(--la-color-brand-hover), var(--la-color-brand))',
    'color-interactive-primary-active': 'light-dark(#1d4ed8, var(--la-color-brand-hover))',

    // Border colors
    'color-border-default': 'light-dark(var(--la-color-border-primary), var(--la-color-gray-dark))',
    'color-border-subtle': 'light-dark(var(--la-color-border-subtle), var(--la-text-primary))',
    'color-border-strong': 'light-dark(var(--la-color-border-light), #4b5563)',
  },

  // === ELEVATION TOKENS ===
  elevation: {
    'elevation-none': 'none',
    'elevation-xs': 'light-dark(0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.3))',
    'elevation-sm': 'light-dark(0 1px 3px var(--la-shadow-sm), 0 1px 3px rgba(0,0,0,0.4))',
    'elevation-md': 'light-dark(0 4px 6px var(--la-shadow-sm), 0 4px 6px rgba(0,0,0,0.4))',
    'elevation-lg': 'light-dark(0 10px 15px var(--la-shadow-sm), 0 10px 15px rgba(0,0,0,0.4))',
    'elevation-xl': 'light-dark(0 20px 25px var(--la-shadow-sm), 0 20px 25px rgba(0,0,0,0.4))',
    'elevation-xxl': 'light-dark(0 25px 50px rgba(0,0,0,0.25), 0 25px 50px var(--la-overlay-bg))',
  },

  // === MOTION TOKENS ===
  motion: {
    // Durations - respect reduced-motion
    'motion-duration-instant': '0ms',
    'motion-duration-fast': '150ms',
    'motion-duration-normal': '250ms',
    'motion-duration-slow': '400ms',
    'motion-duration-slower': '600ms',

    // Easing curves - mathematically optimized
    'motion-ease-linear': 'linear',
    'motion-ease-ease': 'ease',
    'motion-ease-ease-in': 'ease-in',
    'motion-ease-ease-out': 'ease-out',
    'motion-ease-ease-in-out': 'ease-in-out',
    'motion-ease-smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    'motion-ease-sharp': 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    'motion-ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Complete transitions
    'motion-transition-fast': 'var(--motion-duration-fast) var(--motion-ease-smooth)',
    'motion-transition-normal': 'var(--motion-duration-normal) var(--motion-ease-smooth)',
    'motion-transition-slow': 'var(--motion-duration-slow) var(--motion-ease-smooth)',
  },

  // === TYPOGRAPHY TOKENS ===
  typography: {
    // Font families - system font stack
    'font-family-sans': 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    'font-family-mono': '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',

    // Font sizes - modular scale
    'font-size-xs': '0.75rem',    // 12px
    'font-size-sm': '0.875rem',   // 14px
    'font-size-md': '1rem',       // 16px
    'font-size-lg': '1.125rem',   // 18px
    'font-size-xl': '1.25rem',    // 20px
    'font-size-xxl': '1.5rem',    // 24px
    'font-size-xxxl': '2rem',     // 32px

    // Line heights - optimal readability
    'line-height-tight': '1.25',
    'line-height-normal': '1.5',
    'line-height-relaxed': '1.75',

    // Font weights
    'font-weight-regular': '400',
    'font-weight-medium': '500',
    'font-weight-semibold': '600',
    'font-weight-bold': '700',
  },

  // === BORDER RADIUS TOKENS ===
  borderRadius: {
    'border-radius-none': '0',
    'border-radius-xs': '2px',
    'border-radius-sm': '4px',
    'border-radius-md': '6px',
    'border-radius-lg': '8px',
    'border-radius-xl': '12px',
    'border-radius-xxl': '16px',
    'border-radius-full': '9999px',
  },

  // === Z-INDEX TOKENS ===
  zIndex: {
    'z-index-base': '0',
    'z-index-elevated': '100',
    'z-index-sticky': '200',
    'z-index-overlay': '300',
    'z-index-modal': '400',
    'z-index-popover': '500',
    'z-index-tooltip': '600',
    'z-index-toast': '700',
    'z-index-map-overlay': '10000',
    'z-index-map-modal': '10100',
  },

  // === CSS POSITIONING TOKENS ===
  positioning: {
    // Box sizing models
    'box-sizing-content': 'content-box',
    'box-sizing-border': 'border-box',

    // Position values
    'position-static': 'static',
    'position-relative': 'relative',
    'position-absolute': 'absolute',
    'position-fixed': 'fixed',
    'position-sticky': 'sticky',

    // Overflow values
    'overflow-visible': 'visible',
    'overflow-hidden': 'hidden',
    'overflow-clip': 'clip',
    'overflow-scroll': 'scroll',
    'overflow-auto': 'auto',
  }
} as const;

/**
 * Component-specific design tokens
 * Κάθε component μπορεί να έχει τα δικά του semantic tokens
 */
export const COMPONENT_DESIGN_TOKENS = {
  button: {
    'button-height-sm': 'var(--spacing-xl)',      // 32px
    'button-height-md': 'var(--spacing-xxl)',     // 48px
    'button-height-lg': 'var(--spacing-xxxl)',    // 64px
    'button-padding-x-sm': 'var(--spacing-md)',   // 16px
    'button-padding-x-md': 'var(--spacing-lg)',   // 24px
    'button-padding-x-lg': 'var(--spacing-xl)',   // 32px
    'button-border-radius': 'var(--border-radius-md)',
    'button-transition': 'all var(--motion-transition-fast)',
  },

  card: {
    'card-padding': 'var(--spacing-lg)',
    'card-border-radius': 'var(--border-radius-lg)',
    'card-background': 'var(--color-bg-surface-raised)',
    'card-border': '1px solid var(--color-border-subtle)',
    'card-elevation': 'var(--elevation-sm)',
    'card-elevation-hover': 'var(--elevation-md)',
    'card-transition': 'all var(--motion-transition-normal)',
  },

  modal: {
    'modal-backdrop': 'var(--la-bg-overlay, var(--la-overlay-bg))',
    'modal-elevation': 'var(--elevation-xxl)',
    'modal-border-radius': 'var(--border-radius-xl)',
    'modal-padding': 'var(--spacing-xxl)',
    'modal-animation-enter': 'var(--motion-transition-slow)',
    'modal-animation-exit': 'var(--motion-transition-normal)',
  }
} as const;

/**
 * Responsive design tokens
 * Τα tokens προσαρμόζονται ανάλογα με το breakpoint
 */
export const RESPONSIVE_DESIGN_TOKENS = {
  mobile: {
    'spacing-scale-factor': '0.75',  // 25% μικρότερα spacing σε mobile
    'font-scale-factor': '0.875',   // Μικρότερα fonts σε mobile
    'border-radius-scale-factor': '0.75', // Μικρότερα border radius
  },
  tablet: {
    'spacing-scale-factor': '0.875',
    'font-scale-factor': '0.9375',
    'border-radius-scale-factor': '0.875',
  },
  desktop: {
    'spacing-scale-factor': '1',
    'font-scale-factor': '1',
    'border-radius-scale-factor': '1',
  },
  desktopLarge: {
    'spacing-scale-factor': '1.125',  // 12.5% μεγαλύτερα για large screens
    'font-scale-factor': '1.0625',
    'border-radius-scale-factor': '1.125',
  }
} as const;

// Type exports για perfect TypeScript integration
export type DesignTokenCategory = keyof typeof CSS_DESIGN_TOKENS;
export type SpacingToken = keyof typeof CSS_DESIGN_TOKENS.spacing;
export type ColorToken = keyof typeof CSS_DESIGN_TOKENS.colors;
export type ElevationToken = keyof typeof CSS_DESIGN_TOKENS.elevation;
export type MotionToken = keyof typeof CSS_DESIGN_TOKENS.motion;
export type TypographyToken = keyof typeof CSS_DESIGN_TOKENS.typography;
export type BorderRadiusToken = keyof typeof CSS_DESIGN_TOKENS.borderRadius;
export type ZIndexToken = keyof typeof CSS_DESIGN_TOKENS.zIndex;
export type PositioningToken = keyof typeof CSS_DESIGN_TOKENS.positioning;
export type ComponentToken = keyof typeof COMPONENT_DESIGN_TOKENS;
export type ResponsiveToken = keyof typeof RESPONSIVE_DESIGN_TOKENS;