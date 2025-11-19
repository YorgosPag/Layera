/**
 * Color Theme Service - Enterprise Firebase Integration
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των color themes
 * χρησιμοποιώντας το @layera/database-core και @layera/auth-bridge
 * για πλήρη enterprise integration
 */

import { saveTheme, generateThemeId, DEFAULT_THEME_COLORS, type ThemeColors, type UserTheme } from './theme';
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
 * Validates για undefined values που δεν δέχεται το Firebase
 */
function colorStateToThemeColors(colorState: ColorState): ThemeColors {
  // ES Modules compliant - no CommonJS require (ARXES rule)
  // Using imported DEFAULT_THEME_COLORS from theme.ts (single source of truth)

  return {
    primary: colorState.primaryColor || DEFAULT_THEME_COLORS.primary,
    secondary: colorState.secondaryColor || DEFAULT_THEME_COLORS.secondary,
    success: colorState.successColor || DEFAULT_THEME_COLORS.success,
    warning: colorState.warningColor || DEFAULT_THEME_COLORS.warning,
    danger: colorState.dangerColor || DEFAULT_THEME_COLORS.danger,
    info: colorState.infoColor || DEFAULT_THEME_COLORS.info
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





