/**
 * Header.constants.ts - Enterprise Header Constants
 *
 * ARXES Compliant constants - Zero hardcoded strings
 */

export const HEADER_CONSTANTS = {
  MODAL: {
    SIZE: 'md' as const,
    ARIA_LABELLEDBY: 'add-content-title' as const
  },
  ICON_SIZES: {
    SMALL: 'sm' as const,
    MEDIUM: 'md' as const,
    LARGE: 'lg' as const
  },
  TYPOGRAPHY: {
    DATA_SIZE: {
      LARGE: 'lg' as const,
      SMALL: 'sm' as const
    },
    DATA_WEIGHT: {
      SEMIBOLD: 'semibold' as const
    },
    DATA_COLOR: {
      PRIMARY: 'primary' as const,
      SECONDARY: 'secondary' as const
    }
  }
} as const;

export type HeaderConstants = typeof HEADER_CONSTANTS;