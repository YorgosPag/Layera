/**
 * 🖋️ LAYERA TYPOGRAPHY VARIABLES - Concrete typography values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΣΚΛΗΡΩΝ ΤΙΜΩΝ για typography!
 * Όλες οι typography τιμές ορίζονται εδώ και μόνο εδώ.
 *
 * Enterprise Standards:
 * - rem-based για accessibility
 * - Modular scale για visual harmony
 * - System fonts για performance
 */

import type { TypographyScale, TypographyTokensClass } from './typography.class';

// FONT SIZE SCALE - Modular scale based on 1rem (16px)
export const FONT_SIZE_SCALE: TypographyScale = {
  xs: '0.75rem',      // 12px - Μικρά labels, footnotes
  sm: '0.875rem',     // 14px - Body text, captions (από LivePlayground)
  base: '1rem',       // 16px - Default body text
  lg: '1.125rem',     // 18px - Emphasis text
  xl: '1.25rem',      // 20px - H5 headings
  '2xl': '1.5rem',    // 24px - H4 headings
  '3xl': '1.875rem',  // 30px - H3 headings
  '4xl': '2.25rem',   // 36px - H2 headings
  '5xl': '3rem',      // 48px - H1 headings
  '6xl': '4rem',      // 64px - Display text
} as const;

// LEGACY ALIASES - Για backwards compatibility (από LivePlayground)
export const FONT_SIZE_LEGACY = {
  'la-fontSize-sm': FONT_SIZE_SCALE.sm, // 0.875rem - Small text (από LivePlayground)
} as const;

// FONT WEIGHT SCALE - Standard weight values
export const FONT_WEIGHT_SCALE = {
  light: 300,         // Ελαφρύ κείμενο
  normal: 400,        // Κανονικό κείμενο
  medium: 500,        // Μεσαίο κείμενο
  semibold: 600,      // Ημι-έντονο
  bold: 700,          // Έντονο κείμενο
  extrabold: 800,     // Πολύ έντονο
} as const;

// LINE HEIGHT SCALE - Relative line heights
export const LINE_HEIGHT_SCALE = {
  tight: 1.1,         // Στενό διάστιχο
  snug: 1.2,          // Άνετο διάστιχο
  normal: 1.5,        // Κανονικό διάστιχο
  relaxed: 1.6,       // Χαλαρό διάστιχο
  loose: 1.8,         // Πολύ χαλαρό διάστιχο
} as const;

// FONT FAMILY DEFINITIONS - System fonts για performance
export const FONT_FAMILY_SCALE = {
  system: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  mono: `'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', monospace`,
} as const;

// SEMANTIC TYPOGRAPHY VALUES
export const TYPOGRAPHY_SEMANTIC = {
  display: {
    size: FONT_SIZE_SCALE['6xl'],
    weight: FONT_WEIGHT_SCALE.bold,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },
  h1: {
    size: FONT_SIZE_SCALE['5xl'],
    weight: FONT_WEIGHT_SCALE.bold,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },
  h2: {
    size: FONT_SIZE_SCALE['4xl'],
    weight: FONT_WEIGHT_SCALE.semibold,
    lineHeight: LINE_HEIGHT_SCALE.snug,
    family: FONT_FAMILY_SCALE.system,
  },
  h3: {
    size: FONT_SIZE_SCALE['3xl'],
    weight: FONT_WEIGHT_SCALE.semibold,
    lineHeight: LINE_HEIGHT_SCALE.snug,
    family: FONT_FAMILY_SCALE.system,
  },
  h4: {
    size: FONT_SIZE_SCALE['2xl'],
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },
  h5: {
    size: FONT_SIZE_SCALE.xl,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },
  body: {
    size: FONT_SIZE_SCALE.base,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },
  caption: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },
  label: {
    size: FONT_SIZE_SCALE.xs,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },
} as const;

// CONSOLIDATED TYPOGRAPHY TOKENS - Ready for CSS generation
export const TYPOGRAPHY_TOKENS: TypographyTokensClass = {
  fontSize: FONT_SIZE_SCALE,
  fontWeight: FONT_WEIGHT_SCALE,
  lineHeight: LINE_HEIGHT_SCALE,
  fontFamily: FONT_FAMILY_SCALE,
  semantic: TYPOGRAPHY_SEMANTIC,
} as const;

// Export για χρήση σε άλλα modules
export {
  FONT_SIZE_SCALE as FontSizeScale,
  FONT_WEIGHT_SCALE as FontWeightScale,
  LINE_HEIGHT_SCALE as LineHeightScale,
  FONT_FAMILY_SCALE as FontFamilyScale,
  TYPOGRAPHY_SEMANTIC as TypographySemantic,
};