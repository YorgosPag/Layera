/**
 * Enhanced Card Themes - Unified theme system που συνδυάζει LEGO και Local BaseCard approaches
 *
 * Supports:
 * - Original LEGO variants (elevated, outlined, filled)
 * - Local BaseCard variants (property, job)
 * - Semantic variants (info, success, warning, error, neutral)
 * - Opacity modes για mobile UX
 */

import type { CardVariant, OpacityMode, EnhancedCardTheme } from '../types/card.types';

/**
 * Enhanced theme function που καλύπτει όλες τις περιπτώσεις
 */
export const getEnhancedCardTheme = (
  variant: CardVariant,
  opacityMode: OpacityMode = 'transparent'
): EnhancedCardTheme => {
  // Base theme definitions
  const baseThemes = {
    // Original LEGO variants
    elevated: {
      baseColor: 'var(--color-bg-surface)',
      borderColor: 'var(--color-border-subtle)',
      semanticColor: 'var(--color-text-primary)'
    },
    outlined: {
      baseColor: 'transparent',
      borderColor: 'var(--color-border-primary)',
      semanticColor: 'var(--color-text-primary)'
    },
    filled: {
      baseColor: 'var(--color-bg-surface-strong)',
      borderColor: 'var(--color-border-subtle)',
      semanticColor: 'var(--color-text-primary)'
    },

    // Local BaseCard variants (από device-specific implementation)
    property: {
      baseColor: 'var(--color-semantic-success-rgb)', // emerald από design tokens
      borderColor: 'var(--color-semantic-success-border)',
      semanticColor: 'var(--color-semantic-success-text)',
      titleShadow: '0 0 25px var(--color-semantic-success-shadow)'
    },
    job: {
      baseColor: 'var(--color-interactive-primary-rgb)', // blue από design tokens
      borderColor: 'var(--color-interactive-primary)',
      semanticColor: 'var(--color-interactive-primary-text)',
      titleShadow: '0 0 25px var(--color-interactive-primary-shadow)'
    },

    // Semantic variants
    info: {
      baseColor: 'var(--color-semantic-info-rgb)',
      borderColor: 'var(--color-semantic-info-border)',
      semanticColor: 'var(--color-semantic-info-text)'
    },
    success: {
      baseColor: 'var(--color-semantic-success-rgb)',
      borderColor: 'var(--color-semantic-success-border)',
      semanticColor: 'var(--color-semantic-success-text)'
    },
    warning: {
      baseColor: 'var(--color-semantic-warning-rgb)',
      borderColor: 'var(--color-semantic-warning-border)',
      semanticColor: 'var(--color-semantic-warning-text)'
    },
    error: {
      baseColor: 'var(--color-semantic-error-rgb)',
      borderColor: 'var(--color-semantic-error-border)',
      semanticColor: 'var(--color-semantic-error-text)'
    },
    neutral: {
      baseColor: 'var(--color-bg-surface)',
      borderColor: 'var(--color-border-subtle)',
      semanticColor: 'var(--color-text-secondary)'
    }
  };

  const theme = baseThemes[variant] || baseThemes.elevated;
  const { baseColor, borderColor } = theme;
  const titleShadow: string = 'titleShadow' in theme ? (theme.titleShadow as string) : 'none';

  // Apply opacity mode (από Local BaseCard implementation)
  switch (opacityMode) {
    case 'transparent':
      return {
        backgroundColor: `rgba(${baseColor}, 0.01)`, // Πλήρως διαφανές background ΜΟΝΟ
        borderColor, // Περίγραμμα παραμένει πλήρως ορατό
        titleBackground: `rgba(${baseColor}, 0.02)`,
        titleShadow: 'none', // Χωρίς shadow στο transparent mode
        backdropFilter: 'none', // ΚΑΜΙΑ θόλωση - όλα καθαρά
        opacity: 1 // ΠΑΡΑΜΕΝΕΙ 1 - μόνο το background είναι διαφανές
      };

    case 'semi-transparent':
      return {
        backgroundColor: `rgba(${baseColor}, 0.65)`, // Πιο έντονο χρώμα, λιγότερη διαφάνεια
        borderColor,
        titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
        titleShadow: 'none', // Χωρίς shadow για καθαρότητα
        backdropFilter: 'none', // Χωρίς blur - κείμενα και εικονίδια καθαρά
        opacity: 0.8
      };

    case 'opaque':
      return {
        backgroundColor: `rgba(${baseColor}, 0.95)`, // Συμπαγές
        borderColor,
        titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
        titleShadow: titleShadow, // Μπορεί να έχει shadow στο opaque mode
        backdropFilter: 'none',
        opacity: 0.95
      };

    default:
      return {
        backgroundColor: baseColor,
        borderColor,
        titleBackground: 'transparent',
        titleShadow: titleShadow,
        backdropFilter: 'none',
        opacity: 1
      };
  }
};

/**
 * Legacy cardThemes για backward compatibility με Local BaseCard
 */
export const cardThemes = {
  property: getEnhancedCardTheme('property', 'transparent'),
  job: getEnhancedCardTheme('job', 'transparent')
} as const;

/**
 * LEGO theme presets για common use cases
 */
export const legoCardThemes = {
  elevated: getEnhancedCardTheme('elevated'),
  outlined: getEnhancedCardTheme('outlined'),
  filled: getEnhancedCardTheme('filled'),
  info: getEnhancedCardTheme('info'),
  success: getEnhancedCardTheme('success'),
  warning: getEnhancedCardTheme('warning'),
  error: getEnhancedCardTheme('error'),
  neutral: getEnhancedCardTheme('neutral')
} as const;

/**
 * Helper function για getting appropriate text color based on variant
 */
export const getCardTextColor = (variant: CardVariant, opacityMode: OpacityMode = 'transparent'): string => {
  if (opacityMode === 'opaque') {
    // Special cases για high-contrast variants
    if (variant === 'property' || variant === 'success') {
      return 'var(--color-text-on-primary)';
    }
    if (variant === 'job' || variant === 'info') {
      return 'var(--color-text-on-primary)';
    }
  }

  // Default: παραμένει readable σε όλες τις περιπτώσεις
  return 'var(--color-text-primary)';
};