import { ColorPaletteWithAlpha, ColorCategory } from './useColorState';
import { hexToColorWithAlpha } from './useColorStateWithAlpha';

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
  applyColorsToApp: (colorCategory: ColorCategory, currentColors: ColorPaletteWithAlpha, elementType?: string) => Promise<void>;
  applySpecificButtonColor: (colorKey: string, colorValue: string) => void;
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
    primary: '--layera-playground-border-primary',
    secondary: '--layera-playground-border-secondary',
    success: '--layera-playground-border-success',
    warning: '--layera-playground-border-warning',
    danger: '--layera-playground-border-danger',
    info: '--layera-playground-border-info'
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
    root.style.setProperty('--layera-btn-secondary-bg', currentColors.secondaryColor.hex);
    root.style.setProperty('--layera-btn-secondary-border', currentColors.secondaryColor.hex);
    root.style.setProperty('--layera-btn-secondary-color', '#ffffff');
    root.style.setProperty('--layera-btn-secondary-hover-bg', currentColors.secondaryColor.hex + 'CC');
    root.style.setProperty('--layera-btn-secondary-hover-border', currentColors.secondaryColor.hex + 'CC');

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
  const applyColorsToApp = async (colorCategory: ColorCategory, currentColors: ColorPaletteWithAlpha, elementType: string = 'buttons') => {
    const root = document.documentElement;
    const categoryColors = CSS_VARIABLE_MAP[colorCategory];

    // Νέα αρχιτεκτονική: 3 κατηγορίες (backgrounds/text/borders) + element types

    // Set CSS variables για την επιλεγμένη κατηγορία
    root.style.setProperty(categoryColors.primary, currentColors.primaryColor.hex);
    root.style.setProperty(categoryColors.secondary, currentColors.secondaryColor.hex);
    root.style.setProperty(categoryColors.success, currentColors.successColor.hex);
    root.style.setProperty(categoryColors.warning, currentColors.warningColor.hex);
    root.style.setProperty(categoryColors.danger, currentColors.dangerColor.hex);
    root.style.setProperty(categoryColors.info, currentColors.infoColor.hex);

    // Δημιουργώ CSS selectors ανάλογα με το element type
    const getSelectorsForElementType = (type: string) => {
      const baseSelectors = {
        'buttons': [
          '[data-layout="header-fixed"] .layera-square-btn',
          '[data-layout="header-fixed"] .layera-button',
          '[data-layout="header-fixed"] .layera-btn--secondary',
          '.layera-btn--secondary',
          '.layera-button'
        ],
        'cards': [
          '.layera-card',
          '.layera-card--bordered',
          '.card',
          '.panel'
        ],
        'modals': [
          '.layera-modal',
          '.layera-dialog',
          '.modal',
          '.dialog'
        ],
        'inputs': [
          '.layera-input',
          '.layera-textarea',
          'input[type="text"]',
          'textarea'
        ],
        'layout': [
          '.layera-header',
          '.layera-sidebar',
          'hr'
        ],
        'tables': [
          '.layera-table',
          'table'
        ]
      };

      const selectors = (baseSelectors as Record<string, string[]>)[type] || baseSelectors['buttons'];
      return selectors.join(`, `);
    };

    // Δημιουργώ το CSS για την επιλεγμένη κατηγορία και element type
    const getCSSPropertyForCategory = (category: string) => {
      switch (category) {
        case 'backgrounds': return 'background-color';
        case 'text': return 'color';
        case 'borders': return 'border-color';
        default: return 'border-color';
      }
    };

    const cssProperty = getCSSPropertyForCategory(colorCategory);
    const selectors = getSelectorsForElementType(elementType);
    const variableName = categoryColors.secondary; // χρησιμοποιούμε το secondary χρώμα για το injection

    const style = `
      /* ${colorCategory} colors για ${elementType} elements */
      ${selectors} {
        ${cssProperty}: var(${variableName}, #d1d5db) !important;
      }
    `;

    // Αφαίρεση παλιού style αν υπάρχει
    const styleId = `layera-${colorCategory}-${elementType}-style`;
    const oldStyle = document.getElementById(styleId);
    if (oldStyle) {
      oldStyle.remove();
    }

    // Προσθήκη νέου style
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  };

  /**
   * Εφαρμόζει isolated CSS rules για συγκεκριμένο button variant
   * Αυτή η μέθοδος δημιουργεί CSS override rules αντί να αλλάζει variables
   */
  const applySpecificButtonColor = (colorKey: string, colorValue: string) => {
    // Create or update style element για isolated button overrides
    let style = document.getElementById('layera-button-color-overrides') as HTMLStyleElement;

    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-button-color-overrides';
      document.head.appendChild(style);
    }

    // Mapping από colorKey σε CSS class
    const colorToClassMap: Record<string, string> = {
      'primaryColor': '.layera-btn--primary',
      'secondaryColor': '.layera-btn--secondary',
      'successColor': '.layera-btn--success',
      'warningColor': '.layera-btn--warning',
      'dangerColor': '.layera-btn--danger',
      'infoColor': '.layera-btn--info'
    };

    const cssClass = colorToClassMap[colorKey];
    if (!cssClass) return;

    // Get existing rules and remove old rule for this class
    let existingCSS = style.textContent || '';
    const classPattern = new RegExp(`\\s*${cssClass.replace('.', '\\.')}[^}]*\\}`, 'g');
    existingCSS = existingCSS.replace(classPattern, '');

    // Add new override rule with high specificity
    const newRule = `
      ${cssClass} {
        background-color: ${colorValue} !important;
        border-color: ${colorValue} !important;
      }
      ${cssClass}:hover {
        background-color: ${colorValue}DD !important;
        border-color: ${colorValue}DD !important;
      }`;

    style.textContent = existingCSS + newRule;
    console.log(`Applied isolated color ${colorValue} to ${cssClass}`);
  };

  /**
   * Επιστρέφει default colors για fallback
   */
  const getCurrentDefaultColors = (): ColorPaletteWithAlpha => ({
    primaryColor: hexToColorWithAlpha('#44FF44', 1.0),
    secondaryColor: hexToColorWithAlpha('#44FF44', 1.0),
    successColor: hexToColorWithAlpha('#4444FF', 1.0),
    warningColor: hexToColorWithAlpha('#FFAA00', 1.0),
    dangerColor: hexToColorWithAlpha('#AA00FF', 1.0),
    infoColor: hexToColorWithAlpha('#00AAFF', 1.0)
  });

  const actions: CSSVariablesActions = {
    ensureCSSVariablesExist,
    applySquareColorsToHeader,
    applyColorsToApp,
    applySpecificButtonColor
  };

  return {
    actions
  };
};