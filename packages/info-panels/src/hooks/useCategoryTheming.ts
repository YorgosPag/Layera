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
          backgroundColor: 'var(--layera-color-emerald-500-alpha-95, rgba(16, 185, 129, 0.95))', // emerald-500
          borderColor: 'var(--layera-color-emerald-500-alpha-30, rgba(16, 185, 129, 0.3))',
          textColor: 'var(--layera-color-white, #ffffff)',
          accentColor: 'var(--layera-color-green-500, #22c55e)',
          isDark: false
        };

      case 'job':
        return {
          backgroundColor: 'var(--layera-color-blue-500-alpha-95, rgba(59, 130, 246, 0.95))', // blue-500
          borderColor: 'var(--layera-color-blue-500-alpha-30, rgba(59, 130, 246, 0.3))',
          textColor: 'var(--layera-color-white, #ffffff)',
          accentColor: 'var(--layera-color-blue-500, #3b82f6)',
          isDark: false
        };

      case 'initial':
      case null:
      default:
        return {
          backgroundColor: 'var(--layera-color-orange-500-alpha-95, rgba(249, 115, 22, 0.95))', // orange-500
          borderColor: 'var(--layera-color-orange-500-alpha-30, rgba(249, 115, 22, 0.3))',
          textColor: 'var(--layera-color-white, #ffffff)',
          accentColor: 'var(--layera-color-orange-600, #f97316)',
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
        backgroundColor: 'rgba(16, 185, 129, 0.95)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        textColor: '#ffffff',
        accentColor: '#22c55e',
        isDark: false
      };

    case 'job':
      return {
        backgroundColor: 'rgba(59, 130, 246, 0.95)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        textColor: '#ffffff',
        accentColor: '#3b82f6',
        isDark: false
      };

    case 'initial':
    case null:
    default:
      return {
        backgroundColor: 'rgba(249, 115, 22, 0.95)',
        borderColor: 'rgba(249, 115, 22, 0.3)',
        textColor: '#ffffff',
        accentColor: '#f97316',
        isDark: false
      };
  }
};