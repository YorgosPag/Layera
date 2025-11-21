/**
 * 🎨 LAYERA CARD VARIANTS - Card component visual variants
 *
 * Συστηματικές παραλλαγές για Card components που συνδυάζουν semantic και core tokens
 * για συνεπή εμφάνιση σε όλες τις εφαρμογές
 */

// Import semantic & core tokens που χρειάζονται για cards
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';

// CARD VARIANT TYPES
export type CardVariantType = 'elevated' | 'outlined' | 'filled' | 'property' | 'job' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type CardSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type CardPaddingType = 'none' | 'sm' | 'md' | 'lg';

// CARD VARIANT DEFINITIONS
export const CARD_VARIANTS = {
  // Primary card variants
  elevated: {
    background: 'var(--layera-color-surface-primary)',
    border: 'none',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-md)',
  },

  outlined: {
    background: 'var(--layera-color-surface-primary)',
    border: '1px solid var(--layera-color-border-default)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'none',
  },

  filled: {
    background: 'var(--layera-color-surface-secondary)',
    border: 'none',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  // Specialized variants για domain-specific use cases
  property: {
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid var(--layera-color-border-muted)',
    borderRadius: 'var(--layera-global-borderRadius-lg)',
    shadow: 'var(--layera-shadow-lg)',
  },

  job: {
    background: 'var(--layera-color-surface-primary)',
    border: '1px solid var(--layera-color-border-accent)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  // Semantic state variants
  info: {
    background: 'var(--layera-color-background-info)',
    border: '1px solid var(--layera-color-border-info)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  success: {
    background: 'var(--layera-color-background-success)',
    border: '1px solid var(--layera-color-border-success)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  warning: {
    background: 'var(--layera-color-background-warning)',
    border: '1px solid var(--layera-color-border-warning)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  error: {
    background: 'var(--layera-color-background-error)',
    border: '1px solid var(--layera-color-border-error)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'var(--layera-shadow-sm)',
  },

  neutral: {
    background: 'var(--layera-color-surface-muted)',
    border: '1px solid var(--layera-color-border-muted)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    shadow: 'none',
  },

  // SIZE VARIANTS - Διαφορετικά μεγέθη για cards
  size: {
    sm: {
      minHeight: '120px',
      maxWidth: '280px',
    },
    md: {
      minHeight: '160px',
      maxWidth: '360px',
    },
    lg: {
      minHeight: '200px',
      maxWidth: '480px',
    },
    xl: {
      minHeight: '280px',
      maxWidth: '640px',
    },
  },

  // PADDING VARIANTS - Διαφορετικό εσωτερικό spacing
  padding: {
    none: {
      padding: '0',
    },
    sm: {
      padding: 'var(--layera-spacing-3)',
    },
    md: {
      padding: 'var(--layera-spacing-4)',
    },
    lg: {
      padding: 'var(--layera-spacing-6)',
    },
  },
} as const;

// HOVER & INTERACTION STATES για όλα τα variants
export const CARD_INTERACTION_VARIANTS = {
  // Hover effects για κάθε variant
  hover: {
    elevated: {
      shadow: 'var(--layera-shadow-lg)',
      transform: 'translateY(-2px)',
    },
    outlined: {
      borderColor: 'var(--layera-color-border-accent)',
      shadow: 'var(--layera-shadow-sm)',
    },
    filled: {
      background: 'var(--layera-color-surface-accent)',
      shadow: 'var(--layera-shadow-md)',
    },
    property: {
      background: 'rgba(255, 255, 255, 0.95)',
      shadow: 'var(--layera-shadow-xl)',
      transform: 'translateY(-1px)',
    },
    job: {
      borderColor: 'var(--layera-color-primary-500)',
      shadow: 'var(--layera-shadow-md)',
    },
    info: {
      background: 'var(--layera-color-background-info-hover)',
    },
    success: {
      background: 'var(--layera-color-background-success-hover)',
    },
    warning: {
      background: 'var(--layera-color-background-warning-hover)',
    },
    error: {
      background: 'var(--layera-color-background-error-hover)',
    },
    neutral: {
      background: 'var(--layera-color-surface-secondary)',
    },
  },

  // Focus states για accessibility
  focus: {
    outline: '2px solid var(--layera-color-primary-500)',
    outlineOffset: '2px',
  },

  // Active/pressed states
  active: {
    transform: 'translateY(1px)',
    shadow: 'var(--layera-shadow-sm)',
  },
} as const;

// RESPONSIVE VARIANTS - Breakpoint-specific adaptations
export const CARD_RESPONSIVE_VARIANTS = {
  mobile: {
    padding: 'var(--layera-spacing-3)',
    borderRadius: 'var(--layera-global-borderRadius-sm)',
  },
  tablet: {
    padding: 'var(--layera-spacing-4)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
  },
  desktop: {
    padding: 'var(--layera-spacing-5)',
    borderRadius: 'var(--layera-global-borderRadius-lg)',
  },
} as const;

// THEME VARIANTS - Light/Dark mode adaptations
export const CARD_THEME_VARIANTS = {
  light: {
    elevated: {
      background: 'var(--layera-color-surface-primary-light)',
      shadow: 'var(--layera-shadow-light)',
    },
    outlined: {
      background: 'var(--layera-color-surface-primary-light)',
      border: '1px solid var(--layera-color-border-default-light)',
    },
  },
  dark: {
    elevated: {
      background: 'var(--layera-color-surface-primary-dark)',
      shadow: 'var(--layera-shadow-dark)',
    },
    outlined: {
      background: 'var(--layera-color-surface-primary-dark)',
      border: '1px solid var(--layera-color-border-default-dark)',
    },
  },
} as const;

// ANIMATION VARIANTS για transitions
export const CARD_ANIMATION_VARIANTS = {
  entrance: {
    fadeIn: {
      from: { opacity: '0', transform: 'translateY(20px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
      duration: 'var(--layera-duration-normal)',
      easing: 'var(--layera-easing-ease-out)',
    },
    slideUp: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
      duration: 'var(--layera-duration-slow)',
      easing: 'var(--layera-easing-ease-out)',
    },
  },
  hover: {
    lift: {
      duration: 'var(--layera-duration-fast)',
      easing: 'var(--layera-easing-ease-out)',
    },
  },
  loading: {
    pulse: {
      duration: 'var(--layera-duration-normal)',
      iteration: 'infinite',
    },
    shimmer: {
      duration: 'var(--layera-duration-slow)',
      iteration: 'infinite',
    },
  },
} as const;