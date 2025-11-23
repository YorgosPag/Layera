/**
 * Color Theme Service - Enterprise Firebase Integration
 *
 * Διαχειρίζεται την αποθήκευση και φόρτωση των color themes
 * χρησιμοποιώντας το @layera/database-core και @layera/auth-bridge
 * για πλήρη enterprise integration
 */

import { saveTheme, generateThemeId, DEFAULT_THEME_COLORS, type ThemeColors } from './theme';
import type { LayeraUser } from '@layera/auth-bridge';
import type { ColorState } from '../hooks/useColorState';


/**
 * Μετατρέπει ColorState σε ThemeColors format
 * Validates για undefined values που δεν δέχεται το Firebase
 * INTERNAL USE ONLY
 */
function colorStateToThemeColors(colorState: ColorState | {primaryColor?: string; secondaryColor?: string; successColor?: string; warningColor?: string; dangerColor?: string; infoColor?: string; colorCategory: string}): ThemeColors {
  // ES Modules compliant - no CommonJS require (ARXES rule)
  // Using imported DEFAULT_THEME_COLORS from theme.ts (single source of truth)
  // Support both simple color fields and palette structure

  return {
    primary: colorState.primaryColor ||
             ('rectangularPalette' in colorState ? colorState.rectangularPalette?.primaryColor?.hex : undefined) ||
             DEFAULT_THEME_COLORS.primary,
    secondary: colorState.secondaryColor ||
               ('rectangularPalette' in colorState ? colorState.rectangularPalette?.secondaryColor?.hex : undefined) ||
               DEFAULT_THEME_COLORS.secondary,
    success: colorState.successColor ||
             ('rectangularPalette' in colorState ? colorState.rectangularPalette?.successColor?.hex : undefined) ||
             DEFAULT_THEME_COLORS.success,
    warning: colorState.warningColor ||
             ('rectangularPalette' in colorState ? colorState.rectangularPalette?.warningColor?.hex : undefined) ||
             DEFAULT_THEME_COLORS.warning,
    danger: colorState.dangerColor ||
            ('rectangularPalette' in colorState ? colorState.rectangularPalette?.dangerColor?.hex : undefined) ||
            DEFAULT_THEME_COLORS.danger,
    info: colorState.infoColor ||
          ('rectangularPalette' in colorState ? colorState.rectangularPalette?.infoColor?.hex : undefined) ||
          DEFAULT_THEME_COLORS.info
  };
}


/**
 * Αποθηκεύει το current color state στο Firebase
 * Supports both full ColorState and simple color objects
 */
export async function saveColorTheme(
  colorState: ColorState | {primaryColor?: string; secondaryColor?: string; successColor?: string; warningColor?: string; dangerColor?: string; infoColor?: string; colorCategory: string},
  user?: LayeraUser,
  themeName?: string
): Promise<string> {
  try {
    const userId = user?.uid || 'anonymous';
    const themeId = generateThemeId(colorState.colorCategory, themeName, userId);
    const colors = colorStateToThemeColors(colorState);

    // Αποθήκευση με το existing theme service
    await saveTheme(themeId, colors, colorState.colorCategory, themeName, userId);

    return themeId;

  } catch (error) {
    // PRODUCTION ERROR HANDLING - No console logs
    throw error;
  }
}





