/**
 * 🖋️ LAYERA TYPOGRAPHY VARIANTS - Component-ready typography combinations
 *
 * Προκαθορισμένες συνδυασμοί typography tokens για components
 * Semantic naming για συγκεκριμένα UI contexts
 */

import { TYPOGRAPHY_TOKENS, FONT_SIZE_SCALE, FONT_WEIGHT_SCALE, LINE_HEIGHT_SCALE, FONT_FAMILY_SCALE } from './typography.variables';
import type { TypographyVariant, FontSizeVariant, FontWeightVariant } from './typography.class';

// COMPONENT-SPECIFIC TYPOGRAPHY VARIANTS
export const TYPOGRAPHY_VARIANTS = {
  // Display styles για hero sections
  hero: {
    size: FONT_SIZE_SCALE['6xl'],
    weight: FONT_WEIGHT_SCALE.bold,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },

  // Page titles
  pageTitle: {
    size: FONT_SIZE_SCALE['4xl'],
    weight: FONT_WEIGHT_SCALE.bold,
    lineHeight: LINE_HEIGHT_SCALE.snug,
    family: FONT_FAMILY_SCALE.system,
  },

  // Section headings
  sectionTitle: {
    size: FONT_SIZE_SCALE['2xl'],
    weight: FONT_WEIGHT_SCALE.semibold,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  // Card titles
  cardTitle: {
    size: FONT_SIZE_SCALE.lg,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  // Body text variants
  bodyLarge: {
    size: FONT_SIZE_SCALE.lg,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.relaxed,
    family: FONT_FAMILY_SCALE.system,
  },

  bodyRegular: {
    size: FONT_SIZE_SCALE.base,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  bodySmall: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  // UI element variants
  buttonLarge: {
    size: FONT_SIZE_SCALE.base,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },

  buttonSmall: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },

  label: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  caption: {
    size: FONT_SIZE_SCALE.xs,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.normal,
    family: FONT_FAMILY_SCALE.system,
  },

  // Code και technical content
  code: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.relaxed,
    family: FONT_FAMILY_SCALE.mono,
  },

  // Navigation elements
  navLink: {
    size: FONT_SIZE_SCALE.base,
    weight: FONT_WEIGHT_SCALE.medium,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },

  navLabel: {
    size: FONT_SIZE_SCALE.sm,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.tight,
    family: FONT_FAMILY_SCALE.system,
  },
} as const;

// RESPONSIVE VARIANTS - Adjustments για διαφορετικά screen sizes
export const RESPONSIVE_TYPOGRAPHY = {
  mobile: {
    hero: {
      size: FONT_SIZE_SCALE['4xl'],  // Μικρότερο στο mobile
      weight: FONT_WEIGHT_SCALE.bold,
      lineHeight: LINE_HEIGHT_SCALE.tight,
      family: FONT_FAMILY_SCALE.system,
    },
    pageTitle: {
      size: FONT_SIZE_SCALE['2xl'],  // Μικρότερο στο mobile
      weight: FONT_WEIGHT_SCALE.bold,
      lineHeight: LINE_HEIGHT_SCALE.snug,
      family: FONT_FAMILY_SCALE.system,
    },
  },

  tablet: {
    hero: {
      size: FONT_SIZE_SCALE['5xl'],  // Μεσαίο μέγεθος
      weight: FONT_WEIGHT_SCALE.bold,
      lineHeight: LINE_HEIGHT_SCALE.tight,
      family: FONT_FAMILY_SCALE.system,
    },
    pageTitle: {
      size: FONT_SIZE_SCALE['3xl'],  // Μεσαίο μέγεθος
      weight: FONT_WEIGHT_SCALE.bold,
      lineHeight: LINE_HEIGHT_SCALE.snug,
      family: FONT_FAMILY_SCALE.system,
    },
  },

  desktop: {
    // Desktop χρησιμοποιεί τα standard variants
    hero: TYPOGRAPHY_VARIANTS.hero,
    pageTitle: TYPOGRAPHY_VARIANTS.pageTitle,
  },
} as const;

// ACCESSIBILITY-FOCUSED VARIANTS
export const ACCESSIBILITY_TYPOGRAPHY = {
  // Μεγαλύτερα sizes για accessibility
  largeText: {
    size: FONT_SIZE_SCALE.lg,
    weight: FONT_WEIGHT_SCALE.normal,
    lineHeight: LINE_HEIGHT_SCALE.relaxed,
    family: FONT_FAMILY_SCALE.system,
  },

  // High contrast variants
  highContrast: {
    size: FONT_SIZE_SCALE.base,
    weight: FONT_WEIGHT_SCALE.semibold,  // Πιο bold για contrast
    lineHeight: LINE_HEIGHT_SCALE.relaxed,
    family: FONT_FAMILY_SCALE.system,
  },
} as const;

// Export όλων των variants
export {
  TYPOGRAPHY_VARIANTS as TypographyVariants,
  RESPONSIVE_TYPOGRAPHY as ResponsiveTypography,
  ACCESSIBILITY_TYPOGRAPHY as AccessibilityTypography,
};

// Helper type για variant names
export type TypographyVariantName = keyof typeof TYPOGRAPHY_VARIANTS;
export type ResponsiveVariantName = keyof typeof RESPONSIVE_TYPOGRAPHY.mobile;