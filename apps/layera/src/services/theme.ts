/**
 * Theme Service - Enterprise Color Management
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των themes χρωμάτων
 * με χρήση Firebase Firestore για persistence
 */

import { doc, setDoc, getDoc, type DocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

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
    const theme: UserTheme = {
      id: themeId,
      name: `${category}_theme_${buttonShape || 'default'}`,
      colors,
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

  console.log(`🎯 Colors applied to DOM for ${category}${buttonShape ? ` (${buttonShape})` : ''}`);
}

/**
 * Επιστρέφει το σωστό CSS variable prefix
 */
function getCSSVariablePrefix(category: string, buttonShape?: string): string {
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
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8'
};