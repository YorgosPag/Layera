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

  // Input spacing
  input: {
    padding: SPACING_SCALE[3],        // 0.75rem internal
    margin: SPACING_SCALE[2],         // 0.5rem between inputs
    gap: SPACING_SCALE[4],            // 1rem between input groups
  },

  // Modal spacing
  modal: {
    padding: SPACING_SCALE[6],        // 1.5rem internal
    margin: SPACING_SCALE[4],         // 1rem from edges
    backdrop: SPACING_SCALE[12],      // 3rem overlay spacing
  },

  // Navigation spacing
  navigation: {
    padding: SPACING_SCALE[4],        // 1rem nav item padding
    margin: SPACING_SCALE[2],         // 0.5rem between items
    section: SPACING_SCALE[8],        // 2rem between sections
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

// Export για χρήση σε άλλα modules
export {
  SPACING_SCALE as SpacingScale,
  SPACING_VALUES as SpacingValues,
  COMPONENT_SPACING_VALUES as ComponentSpacing,
  RESPONSIVE_SPACING as ResponsiveSpacing,
  ACCESSIBILITY_SPACING as AccessibilitySpacing,
};