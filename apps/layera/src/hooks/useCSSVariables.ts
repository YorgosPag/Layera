import { ColorPalette, ColorCategory } from './useColorState';

/**
 * CSS Variables Management Hook
 *
 * Enterprise-grade hook για διαχείριση CSS μεταβλητών
 * - Centralized CSS variables management
 * - Dynamic color application to DOM
 * - Emergency CSS injection για άμεση εφαρμογή
 * - Category-based color mapping (buttons, backgrounds, text, borders)
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

interface CSSVariableMap {
  [category: string]: {
    [colorKey: string]: string;
  };
}

export interface CSSVariablesActions {
  ensureCSSVariablesExist: () => void;
  applySquareColorsToHeader: () => void;
  applyColorsToApp: (colorCategory: ColorCategory, currentColors: ColorPalette) => Promise<void>;
}

export interface UseCSSVariablesReturn {
  actions: CSSVariablesActions;
}

const CSS_VARIABLE_MAP: CSSVariableMap = {
  buttons: {
    primary: '--layera-btn-primary-bg',
    secondary: '--layera-btn-secondary-bg',
    success: '--layera-btn-success-bg',
    warning: '--layera-btn-warning-bg',
    danger: '--layera-btn-danger-bg',
    info: '--layera-btn-info-bg'
  },
  backgrounds: {
    primary: '--layera-color-bg-primary',
    secondary: '--layera-color-bg-secondary',
    success: '--layera-color-bg-success',
    warning: '--layera-color-bg-warning',
    danger: '--layera-color-bg-danger',
    info: '--layera-color-bg-info'
  },
  text: {
    primary: '--layera-color-text-primary',
    secondary: '--layera-color-text-secondary',
    success: '--layera-color-text-success',
    warning: '--layera-color-text-warning',
    danger: '--layera-color-text-danger',
    info: '--layera-color-text-info'
  },
  borders: {
    primary: '--layera-color-border-primary',
    secondary: '--layera-color-border-secondary',
    success: '--layera-color-border-success',
    warning: '--layera-color-border-warning',
    danger: '--layera-color-border-danger',
    info: '--layera-color-border-info'
  }
};

/**
 * Hook για διαχείριση CSS variables
 */
export const useCSSVariables = (): UseCSSVariablesReturn => {
  /**
   * Enterprise CSS Variables Management
   * Δημιουργεί και διαχειρίζεται CSS μεταβλητές για μοναδική πηγή αλήθειας
   */
  const ensureCSSVariablesExist = () => {
    const root = document.documentElement;
    const currentColors = getCurrentDefaultColors();

    // Δημιουργώ τις CSS μεταβλητές αν δεν υπάρχουν
    root.style.setProperty('--layera-btn-secondary-bg', currentColors.secondary);
    root.style.setProperty('--layera-btn-secondary-border', currentColors.secondary);
    root.style.setProperty('--layera-btn-secondary-color', '#ffffff');
    root.style.setProperty('--layera-btn-secondary-hover-bg', currentColors.secondary + 'CC');
    root.style.setProperty('--layera-btn-secondary-hover-border', currentColors.secondary + 'CC');

    // Εξασφαλίζω ότι υπάρχουν τα CSS rules
    let customStyle = document.getElementById('layera-css-variables');
    if (!customStyle) {
      customStyle = document.createElement('style');
      customStyle.id = 'layera-css-variables';
      document.head.appendChild(customStyle);

      customStyle.textContent = `
        .layera-btn--secondary {
          background-color: var(--layera-btn-secondary-bg) !important;
          border-color: var(--layera-btn-secondary-border) !important;
          color: var(--layera-btn-secondary-color) !important;
        }
        .layera-btn--secondary:hover {
          background-color: var(--layera-btn-secondary-hover-bg) !important;
          border-color: var(--layera-btn-secondary-hover-border) !important;
        }
      `;
    }
  };

  /**
   * Εφαρμόζει χρώματα στα header buttons μέσω CSS Variables
   * Μοναδική πηγή αλήθειας για το styling των secondary buttons
   */
  const applySquareColorsToHeader = () => {
    // Εξασφαλίζω ότι υπάρχουν οι CSS μεταβλητές και rules
    ensureCSSVariablesExist();
  };

  /**
   * Εφαρμόζει χρώματα στην εφαρμογή μέσω CSS variables
   */
  const applyColorsToApp = async (colorCategory: ColorCategory, currentColors: ColorPalette) => {
    const root = document.documentElement;
    const categoryColors = CSS_VARIABLE_MAP[colorCategory];

    if (colorCategory === 'buttons') {
      // Εφαρμογή χρωμάτων για buttons (background, color, border)
      const oldBg = root.style.getPropertyValue('--layera-btn-secondary-bg') || 'not set';

      root.style.setProperty('--layera-btn-secondary-bg', currentColors.secondary);
      root.style.setProperty('--layera-btn-secondary-color', '#ffffff');
      root.style.setProperty('--layera-btn-secondary-border', currentColors.secondary);

      // EMERGENCY OVERRIDE - Δυνατό CSS injection για άμεση εφαρμογή
      const emergencyStyle = `
        .layera-btn-secondary {
          background-color: ${currentColors.secondary} !important;
          border-color: ${currentColors.secondary} !important;
          color: #ffffff !important;
        }
      `;

      // Αφαίρεση παλιού emergency style αν υπάρχει
      const oldEmergencyStyle = document.getElementById('layera-emergency-button-style');
      if (oldEmergencyStyle) {
        oldEmergencyStyle.remove();
      }

      // Προσθήκη νέου emergency style
      const styleElement = document.createElement('style');
      styleElement.id = 'layera-emergency-button-style';
      styleElement.textContent = emergencyStyle;
      document.head.appendChild(styleElement);

      const newBg = root.style.getPropertyValue('--layera-btn-secondary-bg');

      // Διπλός έλεγχος - ας δούμε αν το CSS variable υπάρχει στο DOM
      const computedStyle = getComputedStyle(document.documentElement);
      const computedBg = computedStyle.getPropertyValue('--layera-btn-secondary-bg');
    } else {
      // Εφαρμογή για άλλες κατηγορίες (backgrounds, text, borders)
      root.style.setProperty(categoryColors.primary, currentColors.primary);
      root.style.setProperty(categoryColors.secondary, currentColors.secondary);
      root.style.setProperty(categoryColors.success, currentColors.success);
      root.style.setProperty(categoryColors.warning, currentColors.warning);
      root.style.setProperty(categoryColors.danger, currentColors.danger);
      root.style.setProperty(categoryColors.info, currentColors.info);
    }
  };

  /**
   * Επιστρέφει default colors για fallback
   */
  const getCurrentDefaultColors = (): ColorPalette => ({
    primary: '#44FF44',
    secondary: '#44FF44',
    success: '#4444FF',
    warning: '#FFAA00',
    danger: '#AA00FF',
    info: '#00AAFF'
  });

  const actions: CSSVariablesActions = {
    ensureCSSVariablesExist,
    applySquareColorsToHeader,
    applyColorsToApp
  };

  return {
    actions
  };
};