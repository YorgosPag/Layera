/**
 * useCategoryTheming.ts - Enterprise Theme-Aware Hook για Info Panels
 *
 * Αυτόματη σύνδεση category colors με info panel theming.
 * Εξαλείφει την ανάγκη manual χρωματισμού σε κάθε component.
 */

import { useMemo } from 'react';

export type CategoryType = 'property' | 'job' | 'initial' | null;

export interface CategoryTheme {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  isDark?: boolean;
}

/**
 * Hook που επιστρέφει το σωστό theme ανάλογα με την επιλεγμένη κατηγορία
 */
export const useCategoryTheming = (selectedCategory: CategoryType): CategoryTheme => {
  return useMemo(() => {
    switch (selectedCategory) {
      case 'property':
        return {
          backgroundColor: 'var(--la-bg-secondary)', // emerald-500
          borderColor: 'rgba(16, 185, 129, 0.3)',
          textColor: 'var(--la-color-surface)',
          accentColor: 'var(--la-color-success)',
          isDark: false
        };

      case 'job':
        return {
          backgroundColor: 'var(--la-bg-secondary)', // blue-500
          borderColor: 'rgba(59, 130, 246, 0.3)',
          textColor: 'var(--la-color-surface)',
          accentColor: 'var(--la-color-brand)',
          isDark: false
        };

      case 'initial':
      case null:
      default:
        return {
          backgroundColor: 'var(--la-bg-secondary)', // orange-500
          borderColor: 'var(--la-color-warning-alpha-30)',
          textColor: 'var(--la-color-surface)',
          accentColor: '#f97316',
          isDark: false
        };
    }
  }, [selectedCategory]);
};

/**
 * Helper function για χρήση εκτός React components
 */
export const getCategoryTheme = (selectedCategory: CategoryType): CategoryTheme => {
  switch (selectedCategory) {
    case 'property':
      return {
        backgroundColor: 'var(--la-bg-secondary)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textColor: 'var(--la-color-surface)',
        accentColor: 'var(--la-color-success)',
        isDark: false
      };

    case 'job':
      return {
        backgroundColor: 'var(--la-bg-secondary)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        textColor: 'var(--la-color-surface)',
        accentColor: 'var(--la-color-brand)',
        isDark: false
      };

    case 'initial':
    case null:
    default:
      return {
        backgroundColor: 'var(--la-bg-secondary)',
        borderColor: 'var(--la-color-warning-alpha-30)',
        textColor: 'var(--la-color-surface)',
        accentColor: '#f97316',
        isDark: false
      };
  }
};