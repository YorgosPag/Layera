/**
 * 🎯 LAYERA ICONS VARIANTS - Component-ready icon combinations
 *
 * Προκαθορισμένες συνδυασμοί icon tokens για components
 * Semantic naming για συγκεκριμένα UI contexts
 */

import { ICON_TOKENS, ICON_SIZE_SCALE } from './icons.variables';
import { ICON_RULES } from './icons.class';

// COMPONENT-SPECIFIC ICON VARIANTS
export const ICON_VARIANTS = {
  // Status & Feedback Icons
  status: {
    success: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.success,
      interactive: false,
    },
    warning: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.warning,
      interactive: false,
    },
    error: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.danger,
      interactive: false,
    },
    info: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.info,
      interactive: false,
    },
  },

  // Interactive Action Icons
  action: {
    primary: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.primary,
      interactive: true,
      hover: ICON_RULES.interactiveStates.hover,
    },
    secondary: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.secondary,
      interactive: true,
      hover: ICON_RULES.interactiveStates.hover,
    },
    neutral: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.neutral,
      interactive: true,
      hover: ICON_RULES.interactiveStates.hover,
    },
  },


  // Size-based variants
  sizes: {
    small: {
      size: ICON_SIZE_SCALE.xs,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
    medium: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
    large: {
      size: ICON_SIZE_SCALE.lg,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
  },

  // Button embedded icons
  button: {
    primary: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.primary,
      interactive: false,  // Button handles interaction
    },
    secondary: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.secondary,
      interactive: false,
    },
    small: {
      size: ICON_SIZE_SCALE.xs,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
  },

  // Form & Input icons
  input: {
    prefix: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
    suffix: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.neutral,
      interactive: true,
    },
    error: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.danger,
      interactive: false,
    },
  },

  // Card & Content icons
  content: {
    decorative: {
      size: ICON_SIZE_SCALE.lg,
      color: ICON_TOKENS.colors.neutral,
      interactive: false,
    },
    accent: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.primary,
      interactive: false,
    },
  },
} as const;

// RESPONSIVE VARIANTS - Adjustments για διαφορετικά screen sizes
export const RESPONSIVE_ICON_VARIANTS = {
  mobile: {
    action: {
      size: ICON_SIZE_SCALE.lg,  // Touch-friendly
      color: ICON_TOKENS.colors.primary,
      interactive: true,
    },
  },

  desktop: {
    action: {
      size: ICON_SIZE_SCALE.md,
      color: ICON_TOKENS.colors.primary,
      interactive: true,
    },
  },
} as const;

// Export όλων των variants
export {
  ICON_VARIANTS as IconVariants,
  RESPONSIVE_ICON_VARIANTS as ResponsiveIconVariants,
};

// Helper type για variant names
export type IconVariantName = keyof typeof ICON_VARIANTS;
export type IconVariantCategory = keyof typeof ICON_VARIANTS.status | keyof typeof ICON_VARIANTS.action;