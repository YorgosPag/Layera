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
          backgroundColor: 'var(--la-color-emerald-500-alpha-95, rgba(16, 185, 129, 0.95))', // emerald-500
          borderColor: 'var(--la-color-emerald-500-alpha-30, rgba(16, 185, 129, 0.3))',
          textColor: 'var(--la-color-white, var(--la-color-surface))',
          accentColor: 'var(--la-color-green-500, var(--la-color-success))',
          isDark: false
        };

      case 'job':
        return {
          backgroundColor: 'var(--la-color-blue-500-alpha-95, rgba(59, 130, 246, 0.95))', // blue-500
          borderColor: 'var(--la-color-blue-500-alpha-30, rgba(59, 130, 246, 0.3))',
          textColor: 'var(--la-color-white, var(--la-color-surface))',
          accentColor: 'var(--la-color-blue-500, var(--la-color-brand))',
          isDark: false
        };

      case 'initial':
      case null:
      default:
        return {
          backgroundColor: 'var(--la-color-orange-500-alpha-95, var(--la-color-warning-alpha-95))', // orange-500
          borderColor: 'var(--la-color-orange-500-alpha-30, var(--la-color-warning-alpha-30))',
          textColor: 'var(--la-color-white, var(--la-color-surface))',
          accentColor: 'var(--la-color-orange-600, #f97316)',
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