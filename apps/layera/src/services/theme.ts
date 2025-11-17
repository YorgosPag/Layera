/**
 * Theme Service - Enterprise Color Management
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των themes χρωμάτων
 * με χρήση Firebase Firestore για persistence
 */

import { doc, setDoc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
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
  try {
    const db = getDb();
    if (!db) {
      console.warn('🔧 Firebase not initialized - using localStorage only');
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
    console.log('🎨 Theme saved to Firestore:', themeId);
  } catch (error) {
    console.error('❌ Error saving theme:', error);
    throw error;
  }
}

/**
 * Φορτώνει τα χρώματα από το Firestore
 */
export async function loadTheme(themeId: string): Promise<UserTheme | null> {
  try {
    const db = getDb();
    if (!db) {
      console.warn('🔧 Firebase not initialized - cannot load from Firestore');
      return null;
    }

    const docRef = doc(db, 'themes', themeId);
    const docSnap: DocumentSnapshot = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as UserTheme;
      console.log('🎨 Theme loaded from Firestore:', themeId);
      return data;
    } else {
      console.log('📭 No theme found for ID:', themeId);
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading theme:', error);
    throw error;
  }
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
 * Εφαρμόζει τα χρώματα στο DOM
 */
export function applyThemeToDOM(
  colors: ThemeColors,
  category: string,
  buttonShape?: string
): void {
  const root = document.documentElement;

  // Καθαρισμός προηγούμενων CSS variables
  const cssVarPrefix = getCSSVariablePrefix(category, buttonShape);

  // Εφαρμογή νέων χρωμάτων
  Object.entries(colors).forEach(([colorName, colorValue]) => {
    const cssVar = `${cssVarPrefix}${colorName}`;
    root.style.setProperty(cssVar, colorValue);
  });

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