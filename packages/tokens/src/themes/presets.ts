/**
 * 🎭 PRESET THEMES - Predefined color combinations
 *
 * Ακριβώς οι ίδιες preset themes από το FullAppPreview_Mockup.html:
 * - Ocean Blue
 * - Nature Green
 * - Sunset Orange
 * - Royal Purple
 * - Dark Mode
 * - Pastel
 *
 * Χρησιμοποιείται από την applyTheme() function
 */

export const LAYERA_PRESET_THEMES = {
  // Ocean theme - Από HTML mockup: 'ocean'
  ocean: {
    primary: '#2196F3',
    secondary: '#00BCD4',
    success: '#009688',
    warning: '#FFC107',
    danger: '#F44336',
    info: '#3F51B5'
  },

  // Nature theme - Από HTML mockup: 'nature'
  nature: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#2196F3'
  },

  // Sunset theme - Από HTML mockup: 'sunset'
  sunset: {
    primary: '#FF9800',
    secondary: '#FF5722',
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    info: '#2196F3'
  },

  // Royal theme - Από HTML mockup: 'royal'
  royal: {
    primary: '#9013FE',
    secondary: '#7C4DFF',
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
    info: '#3F51B5'
  },

  // Dark theme - Από HTML mockup: 'dark'
  dark: {
    primary: '#212121',
    secondary: '#424242',
    success: '#388E3C',
    warning: '#F57C00',
    danger: '#D32F2F',
    info: '#1976D2'
  },

  // Pastel theme - Από HTML mockup: 'pastel'
  pastel: {
    primary: '#E1BEE7',
    secondary: '#F8BBD9',
    success: '#C8E6C9',
    warning: '#FFE0B2',
    danger: '#FFCDD2',
    info: '#BBDEFB'
  }
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 THEME UTILITIES - Helper functions για theme management
// ═══════════════════════════════════════════════════════════════════════════════════════

export type LayeraPresetTheme = keyof typeof LAYERA_PRESET_THEMES;
export type LayeraThemeColors = typeof LAYERA_PRESET_THEMES[LayeraPresetTheme];

/**
 * Παίρνει preset theme colors
 */
export function getPresetTheme(themeName: LayeraPresetTheme): LayeraThemeColors {
  return LAYERA_PRESET_THEMES[themeName];
}

/**
 * Παίρνει όλα τα available preset theme names
 */
export function getPresetThemeNames(): LayeraPresetTheme[] {
  return Object.keys(LAYERA_PRESET_THEMES) as LayeraPresetTheme[];
}

/**
 * Validates αν το theme name υπάρχει
 */
export function isValidPresetTheme(themeName: string): themeName is LayeraPresetTheme {
  return Object.hasOwnProperty.call(LAYERA_PRESET_THEMES, themeName);
}

/**
 * Δημιουργεί CSS variables object από theme
 */
export function getThemeAsLiveVariables(themeName: LayeraPresetTheme): Record<string, string> {
  const theme = getPresetTheme(themeName);

  return {
    '--live-primary-color': theme.primary,
    '--live-secondary-color': theme.secondary,
    '--live-success-color': theme.success,
    '--live-warning-color': theme.warning,
    '--live-danger-color': theme.danger,
    '--live-info-color': theme.info
  };
}

/**
 * Εφαρμόζει preset theme στο document root - Compatible με HTML mockup applyTheme()
 */
export function applyPresetThemeToDOM(themeName: LayeraPresetTheme): void {
  const theme = getPresetTheme(themeName);
  const root = document.documentElement;

  // Apply live color variables
  Object.entries(theme).forEach(([colorType, colorValue]) => {
    const varName = `--live-${colorType}-color`;
    root.style.setProperty(varName, colorValue);
  });

  // Set theme attribute για CSS targeting
  root.setAttribute('data-layera-theme', themeName);
}