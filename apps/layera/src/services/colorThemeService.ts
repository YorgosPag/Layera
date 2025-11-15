/**
 * Color Theme Service - Enterprise Firebase Integration
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των color themes
 * χρησιμοποιώντας το @layera/database-core και @layera/auth-bridge
 * για πλήρη enterprise integration
 */

import { saveTheme, loadTheme, generateThemeId, type ThemeColors, type UserTheme } from './theme';
import type { LayeraUser } from '@layera/auth-bridge';

// Types που αντιστοιχούν στο ColorsSection
export interface ColorState {
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
  infoColor: string;
  colorCategory: 'backgrounds' | 'text' | 'borders';
}

export interface ColorTheme {
  id: string;
  name: string;
  colors: ThemeColors;
  category: ColorState['colorCategory'];
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Μετατρέπει ColorState σε ThemeColors format
 */
function colorStateToThemeColors(colorState: ColorState): ThemeColors {
  return {
    primary: colorState.primaryColor,
    secondary: colorState.secondaryColor,
    success: colorState.successColor,
    warning: colorState.warningColor,
    danger: colorState.dangerColor,
    info: colorState.infoColor
  };
}

/**
 * Μετατρέπει ThemeColors σε ColorState format
 */
function themeColorsToColorState(
  colors: ThemeColors,
  category: ColorState['colorCategory']
): ColorState {
  return {
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    successColor: colors.success,
    warningColor: colors.warning,
    dangerColor: colors.danger,
    infoColor: colors.info,
    colorCategory: category
  };
}

/**
 * Αποθηκεύει το current color state στο Firebase
 */
export async function saveColorTheme(
  colorState: ColorState,
  user?: LayeraUser,
  themeName?: string
): Promise<string> {
  try {
    const userId = user?.uid || 'anonymous';
    const themeId = generateThemeId(colorState.colorCategory, themeName, userId);
    const colors = colorStateToThemeColors(colorState);

    // Αποθήκευση με το existing theme service
    await saveTheme(themeId, colors, colorState.colorCategory, themeName, userId);

    console.log(`🎨 Color theme saved successfully: ${themeId}`);
    return themeId;

  } catch (error) {
    console.error('❌ Error saving color theme:', error);
    throw error;
  }
}

/**
 * Φορτώνει ένα color theme από το Firebase
 */
export async function loadColorTheme(
  themeId: string,
  _user?: LayeraUser
): Promise<ColorState | null> {
  try {
    // Φόρτωση από το theme service
    const theme = await loadTheme(themeId);

    if (!theme) {
      console.log(`📭 Theme not found: ${themeId}`);
      return null;
    }

    // Backward compatibility: map old "buttons" category to "borders"
    const mappedCategory = theme.category === 'buttons' ? 'borders' : theme.category;
    const colorState = themeColorsToColorState(theme.colors, mappedCategory as ColorState['colorCategory']);
    console.log(`🎨 Color theme loaded successfully: ${themeId}`);
    return colorState;

  } catch (error) {
    console.error('❌ Error loading color theme:', error);
    throw error;
  }
}

/**
 * Φορτώνει όλα τα themes ενός χρήστη για μια συγκεκριμένη κατηγορία
 */
export async function loadUserColorThemes(
  category: ColorState['colorCategory'],
  user?: LayeraUser
): Promise<ColorTheme[]> {
  try {
    // Για τώρα επιστρέφουμε κενό array - θα υλοποιηθεί με Firestore queries
    console.log(`📥 Loading themes for category: ${category}, user: ${user?.uid || 'anonymous'}`);
    return [];

  } catch (error) {
    console.error('❌ Error loading user color themes:', error);
    return [];
  }
}

/**
 * Διαγράφει ένα color theme
 */
export async function deleteColorTheme(
  themeId: string,
  user?: LayeraUser
): Promise<void> {
  try {
    const userId = user?.uid || 'anonymous';

    // Απλή διαγραφή για τώρα - θα υλοποιηθεί πλήρως αργότερα
    console.log(`🗑️ Color theme delete requested: ${themeId} for user: ${userId}`);

  } catch (error) {
    console.error('❌ Error deleting color theme:', error);
    throw error;
  }
}

/**
 * Αυτόματη αποθήκευση του current theme στο localStorage για γρήγορη φόρτωση
 */
export function saveCurrentThemeToLocalStorage(colorState: ColorState): void {
  try {
    localStorage.setItem('layera-current-theme', JSON.stringify(colorState));
  } catch (error) {
    console.warn('⚠️ Could not save theme to localStorage:', error);
  }
}

/**
 * Φόρτωση του τελευταίου theme από localStorage
 */
export function loadCurrentThemeFromLocalStorage(): ColorState | null {
  try {
    const stored = localStorage.getItem('layera-current-theme');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('⚠️ Could not load theme from localStorage:', error);
    return null;
  }
}