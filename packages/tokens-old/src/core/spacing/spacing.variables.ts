/**
 * 📏 LAYERA SPACING VARIABLES - Concrete spacing values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΣΚΛΗΡΩΝ ΤΙΜΩΝ για spacing!
 * Όλες οι spacing τιμές ορίζονται εδώ και μόνο εδώ.
 *
 * Enterprise Standards:
 * - 8-point grid system (rem-based for accessibility)
 * - Mathematical progression for visual harmony
 * - Consistent with design system specifications
 */

import type { SpacingScale, SpacingTokensClass } from './spacing.class';

// CORE SPACING SCALE - 8-point grid system
export const SPACING_SCALE: SpacingScale = {
  0: '0',           // No spacing
  1: '0.25rem',     // 4px - Micro details
  2: '0.5rem',      // 8px - Small spacing
  3: '0.75rem',     // 12px - Medium-small
  4: '1rem',        // 16px - Standard spacing
  5: '1.25rem',     // 20px - Medium-large
  6: '1.5rem',      // 24px - Large spacing
  8: '2rem',        // 32px - XL spacing
  10: '2.5rem',     // 40px - XXL spacing
  12: '3rem',       // 48px - XXXL spacing
  16: '4rem',       // 64px - Huge spacing
  20: '5rem',       // 80px - Massive spacing
  24: '6rem',       // 96px - Epic spacing
  32: '8rem',       // 128px - Legendary spacing
  80: '20rem',      // 320px - Ultra large (από modal.LEGACY.css)
  100: '25rem',     // 400px - Massive (από modal.LEGACY.css)
  112: '28rem',     // 448px - Ultra massive (από LivePlayground)
  125: '31.25rem',  // 500px - Modal medium
  200: '50rem',     // 800px - Modal large
  300: '75rem',     // 1200px - Modal XL
} as const;

// ADDITIONAL SIZE SCALE - Για specific component sizes
export const SIZE_SCALE = {
  5: '1.25rem',     // 20px (από modal.LEGACY.css)
  6: '1.5rem',      // 24px (από LivePlayground)
  7: '1.75rem',     // 28px (από modal.LEGACY.css)
  8: '2rem',        // 32px (από LivePlayground)
  14: '3.5rem',     // 56px (από modal.LEGACY.css)
  16: '4rem',       // 64px (από LivePlayground)
  30: '7.5rem',     // 120px (από modal.LEGACY.css)
} as const;

// FRACTIONAL SPACING - Για micro adjustments
export const FRACTIONAL_SPACING = {
  '0-25': '0.0625rem',  // 1px - Ultra micro (από LivePlayground)
  '0-5': '0.125rem',    // 2px - Micro (από modal.LEGACY.css)
  '1-5': '0.375rem',    // 6px - Small-medium (από modal.LEGACY.css)
  '2-5': '0.625rem',    // 10px - Medium (από modal.LEGACY.css)
  '3-5': '0.875rem',    // 14px - Medium-large (από modal.LEGACY.css)
} as const;

// SEMANTIC SPACING VALUES - Mapped from scale
export const SPACING_VALUES = {
  micro: SPACING_SCALE[1],     // 0.25rem / 4px
  small: SPACING_SCALE[2],     // 0.5rem / 8px
  medium: SPACING_SCALE[4],    // 1rem / 16px
  large: SPACING_SCALE[8],     // 2rem / 32px
  macro: SPACING_SCALE[16],    // 4rem / 64px
} as const;

// COMPONENT-SPECIFIC SPACING VALUES
export const COMPONENT_SPACING_VALUES = {
  // Card spacing
  card: {
    padding: SPACING_SCALE[4],        // 1rem internal
    margin: SPACING_SCALE[2],         // 0.5rem between cards
    gap: SPACING_SCALE[6],            // 1.5rem between groups
  },

  // Button spacing
  button: {
    paddingHorizontal: SPACING_SCALE[4], // 1rem left/right
    paddingVertical: SPACING_SCALE[2],   // 0.5rem top/bottom
    margin: SPACING_SCALE[1],            // 0.25rem between buttons
    gap: SPACING_SCALE[4],               // 1rem between groups
  },



  // Layout spacing
  layout: {
    container: SPACING_SCALE[6],      // 1.5rem container padding
    section: SPACING_SCALE[12],       // 3rem between sections
    hero: SPACING_SCALE[20],          // 5rem hero section
    page: SPACING_SCALE[24],          // 6rem page margins
  },
} as const;

// RESPONSIVE SPACING VALUES
export const RESPONSIVE_SPACING = {
  mobile: {
    micro: SPACING_SCALE[1],     // 0.25rem
    small: SPACING_SCALE[1],     // 0.25rem (tighter on mobile)
    medium: SPACING_SCALE[3],    // 0.75rem (reduced)
    large: SPACING_SCALE[6],     // 1.5rem (reduced)
    macro: SPACING_SCALE[12],    // 3rem (reduced)
  },
  tablet: {
    micro: SPACING_SCALE[1],     // 0.25rem
    small: SPACING_SCALE[2],     // 0.5rem
    medium: SPACING_SCALE[3],    // 0.75rem (slightly reduced)
    large: SPACING_SCALE[6],     // 1.5rem (slightly reduced)
    macro: SPACING_SCALE[16],    // 4rem (slightly reduced)
  },
  desktop: {
    micro: SPACING_SCALE[1],     // 0.25rem
    small: SPACING_SCALE[2],     // 0.5rem
    medium: SPACING_SCALE[4],    // 1rem (full size)
    large: SPACING_SCALE[8],     // 2rem (full size)
    macro: SPACING_SCALE[16],    // 4rem (full size)
  },
} as const;

// ACCESSIBILITY-FOCUSED SPACING
export const ACCESSIBILITY_SPACING = {
  minTouchTarget: SPACING_SCALE[10],    // 2.5rem / 40px minimum touch
  focusRing: SPACING_SCALE[1],          // 0.25rem focus ring offset
  readingWidth: '65ch',                 // Optimal reading line length
  standardGutter: SPACING_SCALE[4],     // 1rem standard gutter
} as const;

// CONSOLIDATED SPACING TOKENS - Ready for CSS generation
export const SPACING_TOKENS: SpacingTokensClass = {
  scale: SPACING_SCALE,
  variants: SPACING_VALUES,
  directions: {
    all: SPACING_SCALE[4],
    top: SPACING_SCALE[4],
    right: SPACING_SCALE[4],
    bottom: SPACING_SCALE[4],
    left: SPACING_SCALE[4],
    horizontal: SPACING_SCALE[4],
    vertical: SPACING_SCALE[4],
  },
  minTouchTarget: ACCESSIBILITY_SPACING.minTouchTarget,
  maxReadingWidth: ACCESSIBILITY_SPACING.readingWidth,
  standardGutters: ACCESSIBILITY_SPACING.standardGutter,
} as const;

// SHARED COMPONENT PADDING PATTERNS - Enterprise-level common patterns
export const SHARED_PADDING_PATTERNS = {
  'component-padding-tight': `${SPACING_SCALE[2]} ${SPACING_SCALE[3]}`,     // 0.5rem 0.75rem - για small buttons, compact elements
  'component-padding-medium': `${SPACING_SCALE[4]} ${SPACING_SCALE[6]}`,    // 1rem 1.5rem - STANDARD pattern (εντοπίστηκε σε 7 components)
  'component-padding-comfortable': `${SPACING_SCALE[6]} ${SPACING_SCALE[8]}`, // 1.5rem 2rem - για large elements
} as const;

// CSS VARIABLES για export - Consolidated από όλα τα spacing scales
export const SPACING_VARIABLES = {
  // Core spacing scale variables
  'spacing-0': SPACING_SCALE[0],
  'spacing-1': SPACING_SCALE[1],
  'spacing-2': SPACING_SCALE[2],
  'spacing-3': SPACING_SCALE[3],
  'spacing-4': SPACING_SCALE[4],
  'spacing-5': SPACING_SCALE[5],
  'spacing-6': SPACING_SCALE[6],
  'spacing-8': SPACING_SCALE[8],
  'spacing-10': SPACING_SCALE[10],
  'spacing-12': SPACING_SCALE[12],
  'spacing-16': SPACING_SCALE[16],
  'spacing-20': SPACING_SCALE[20],
  'spacing-24': SPACING_SCALE[24],
  'spacing-32': SPACING_SCALE[32],
  'spacing-80': SPACING_SCALE[80],
  'spacing-100': SPACING_SCALE[100],
  'spacing-112': SPACING_SCALE[112],
  'spacing-125': SPACING_SCALE[125],
  'spacing-200': SPACING_SCALE[200],
  'spacing-300': SPACING_SCALE[300],

  // Fractional spacing variables
  'spacing-0-25': FRACTIONAL_SPACING['0-25'],
  'spacing-0-5': FRACTIONAL_SPACING['0-5'],
  'spacing-1-5': FRACTIONAL_SPACING['1-5'],
  'spacing-2-5': FRACTIONAL_SPACING['2-5'],
  'spacing-3-5': FRACTIONAL_SPACING['3-5'],

  // Additional size scale variables (που δεν υπάρχουν στο κύριο scale)
  'spacing-7': SIZE_SCALE[7],    // 28px
  'spacing-14': SIZE_SCALE[14],  // 56px
  'spacing-30': SIZE_SCALE[30],  // 120px

  // Shared component padding patterns - Enterprise standardization
  'component-padding-tight': SHARED_PADDING_PATTERNS['component-padding-tight'],
  'component-padding-medium': SHARED_PADDING_PATTERNS['component-padding-medium'],
  'component-padding-comfortable': SHARED_PADDING_PATTERNS['component-padding-comfortable'],
} as const;

// Export για χρήση σε άλλα modules
export {
  SPACING_SCALE as SpacingScale,
  SPACING_VALUES as SpacingValues,
  COMPONENT_SPACING_VALUES as ComponentSpacing,
  RESPONSIVE_SPACING as ResponsiveSpacing,
  ACCESSIBILITY_SPACING as AccessibilitySpacing,
};