/**
 * Theme Service - Enterprise Color Management
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των themes χρωμάτων
 * με χρήση Firebase Firestore για persistence
 */

import { doc, setDoc } from 'firebase/firestore';
import { getDb } from '../firebase';

// Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface UserTheme {
  id: string;
  name: string;
  colors: ThemeColors;
  category: 'buttons' | 'backgrounds' | 'text' | 'borders';
  buttonShape?: 'rectangular' | 'square' | 'rounded';
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Αποθηκεύει τα χρώματα στο Firestore
 */
export async function saveTheme(
  themeId: string,
  colors: ThemeColors,
  category: string,
  buttonShape?: string,
  userId: string = 'default'
): Promise<void> {
    const db = getDb();
    if (!db) {
      // Firebase not initialized - using localStorage only
      return;
    }

    // Validate colors object για undefined values - Firebase απαγορεύει undefined
    const sanitizedColors: ThemeColors = {
      primary: colors.primary || DEFAULT_THEME_COLORS.primary,
      secondary: colors.secondary || DEFAULT_THEME_COLORS.secondary,
      success: colors.success || DEFAULT_THEME_COLORS.success,
      warning: colors.warning || DEFAULT_THEME_COLORS.warning,
      danger: colors.danger || DEFAULT_THEME_COLORS.danger,
      info: colors.info || DEFAULT_THEME_COLORS.info
    };

    const theme: UserTheme = {
      id: themeId,
      name: `${category}_theme_${buttonShape || 'default'}`,
      colors: sanitizedColors,
      category: category as UserTheme['category'],
      buttonShape: buttonShape as UserTheme['buttonShape'],
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'themes', themeId), theme);
}


/**
 * Δημιουργεί ένα unique theme ID
 */
export function generateThemeId(
  category: string,
  buttonShape?: string,
  userId: string = 'default'
): string {
  const suffix = buttonShape ? `_${buttonShape}` : '';
  return `${userId}_${category}${suffix}`;
}


/**
 * Επιστρέφει το σωστό CSS variable prefix - ENTERPRISE SINGLE SOURCE OF TRUTH
 * EXPORTED για χρήση σε άλλα components για consistency
 */
export function getCSSVariablePrefix(category: string, buttonShape?: string): string {
  switch (category) {
    case 'buttons':
      if (buttonShape === 'square') return '--layera-color-button-square-';
      if (buttonShape === 'rounded') return '--layera-color-button-rounded-';
      return '--layera-color-button-';
    case 'backgrounds':
      return '--layera-color-bg-';
    case 'text':
      return '--layera-color-text-';
    case 'borders':
      return '--layera-color-border-';
    default:
      return '--layera-color-';
  }
}

/**
 * Default theme colors
 */
export const DEFAULT_THEME_COLORS: ThemeColors = {
  primary: 'var(--layera-icon-colorInfo)', // Blue color from tokens
  secondary: 'var(--layera-color-semantic-neutral-medium)', // Gray from tokens
  success: 'var(--layera-icon-colorSuccess)', // Green from tokens
  warning: 'var(--layera-icon-colorWarning)', // Orange from tokens
  danger: 'var(--layera-icon-colorDanger)', // Red from tokens
  info: 'var(--layera-icon-colorInfo)' // Blue from tokens
};