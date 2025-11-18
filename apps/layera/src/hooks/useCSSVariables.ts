import { ColorPaletteWithAlpha, ColorCategory, hexToColorWithAlpha } from './useColorState';

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
  applySpecificCardColor: (colorKey: string, colorValue: string) => void;
  applySpecificModalColor: (colorKey: string, colorValue: string) => void;
  applySpecificLayoutColor: (colorKey: string, colorValue: string) => void;
  applySpecificHeaderColor: (colorKey: string, colorValue: string) => void;
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
  layout: {
    primary: '--layera-layout-bg-primary',
    secondary: '--layera-layout-bg-secondary',
    success: '--layera-layout-bg-success',
    warning: '--layera-layout-bg-warning',
    danger: '--layera-layout-bg-danger',
    info: '--layera-layout-bg-info'
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
    root.style.setProperty('--layera-btn-secondary-color', 'var(--layera-color-semantic-neutral-light)');
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

    // Νέα αρχιτεκτονική: Διαφορετικές CSS variables για layout vs άλλα elements
    const categoryColors = elementType === 'layout'
      ? CSS_VARIABLE_MAP['layout']
      : CSS_VARIABLE_MAP[colorCategory];

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
          '.layera-layout.layera-bg-primary',
          '.layera-main-layout',
          'body > .layera-layout',
          '#root > .layera-layout'
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
        ${cssProperty}: var(${variableName}, var(--layera-color-semantic-neutral-light)) !important;
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
    // Optimized: Use CSS variables instead of rewriting style.textContent
    const root = document.documentElement;

    // Mapping από colorKey σε CSS variable
    const colorToVariableMap: Record<string, string> = {
      'primaryColor': '--layera-btn-primary-override',
      'secondaryColor': '--layera-btn-secondary-override',
      'successColor': '--layera-btn-success-override',
      'warningColor': '--layera-btn-warning-override',
      'dangerColor': '--layera-btn-danger-override',
      'infoColor': '--layera-btn-info-override'
    };

    const variableName = colorToVariableMap[colorKey];
    if (!variableName) return;

    // Fast CSS variable update (no DOM reflow/repaint)
    root.style.setProperty(variableName, colorValue);
    root.style.setProperty(`${variableName}-hover`, `${colorValue}DD`);

    // Create CSS rules only once
    let style = document.getElementById('layera-button-color-overrides') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-button-color-overrides';
      document.head.appendChild(style);

      // Static CSS rules using variables (created only once)
      style.textContent = `
        .layera-btn--primary {
          background-color: var(--layera-btn-primary-override, var(--layera-color-primary)) !important;
          border-color: var(--layera-btn-primary-override, var(--layera-color-primary)) !important;
        }
        .layera-btn--primary:hover {
          background-color: var(--layera-btn-primary-override-hover, var(--layera-color-primary-hover)) !important;
          border-color: var(--layera-btn-primary-override-hover, var(--layera-color-primary-hover)) !important;
        }
        .layera-btn--secondary {
          background-color: var(--layera-btn-secondary-override, var(--layera-color-secondary)) !important;
          border-color: var(--layera-btn-secondary-override, var(--layera-color-secondary)) !important;
        }
        .layera-btn--secondary:hover {
          background-color: var(--layera-btn-secondary-override-hover, var(--layera-color-secondary-hover)) !important;
          border-color: var(--layera-btn-secondary-override-hover, var(--layera-color-secondary-hover)) !important;
        }
        .layera-btn--success {
          background-color: var(--layera-btn-success-override, var(--layera-color-success)) !important;
          border-color: var(--layera-btn-success-override, var(--layera-color-success)) !important;
        }
        .layera-btn--success:hover {
          background-color: var(--layera-btn-success-override-hover, var(--layera-color-success-hover)) !important;
          border-color: var(--layera-btn-success-override-hover, var(--layera-color-success-hover)) !important;
        }
        .layera-btn--warning {
          background-color: var(--layera-btn-warning-override, var(--layera-color-warning)) !important;
          border-color: var(--layera-btn-warning-override, var(--layera-color-warning)) !important;
        }
        .layera-btn--warning:hover {
          background-color: var(--layera-btn-warning-override-hover, var(--layera-color-warning-hover)) !important;
          border-color: var(--layera-btn-warning-override-hover, var(--layera-color-warning-hover)) !important;
        }
        .layera-btn--danger {
          background-color: var(--layera-btn-danger-override, var(--layera-color-danger)) !important;
          border-color: var(--layera-btn-danger-override, var(--layera-color-danger)) !important;
        }
        .layera-btn--danger:hover {
          background-color: var(--layera-btn-danger-override-hover, var(--layera-color-danger-hover)) !important;
          border-color: var(--layera-btn-danger-override-hover, var(--layera-color-danger-hover)) !important;
        }
        .layera-btn--info {
          background-color: var(--layera-btn-info-override, var(--layera-color-info)) !important;
          border-color: var(--layera-btn-info-override, var(--layera-color-info)) !important;
        }
        .layera-btn--info:hover {
          background-color: var(--layera-btn-info-override-hover, var(--layera-color-info-hover)) !important;
          border-color: var(--layera-btn-info-override-hover, var(--layera-color-info-hover)) !important;
        }
      `;
    }
  };

  /**
   * Εφαρμόζει isolated CSS rules για συγκεκριμένο card variant
   * Χρησιμοποιεί CSS variables για καρτών backgrounds
   */
  const applySpecificCardColor = (colorKey: string, colorValue: string) => {
    // Optimized: Use CSS variables instead of rewriting style.textContent
    const root = document.documentElement;

    // Mapping από colorKey σε CSS variable για κάρτες
    // NOTE: colorKey format is 'primaryColor' από LivePlayground, CSS variable format is 'primary'
    const colorToVariableMap: Record<string, string> = {
      'primaryColor': '--layera-card-bg-primary',
      'secondaryColor': '--layera-card-bg-secondary',
      'successColor': '--layera-card-bg-success',
      'warningColor': '--layera-card-bg-warning',
      'dangerColor': '--layera-card-bg-danger',
      'infoColor': '--layera-card-bg-info'
    };

    const variableName = colorToVariableMap[colorKey];
    if (!variableName) return;

    // Fast CSS variable update (no DOM reflow/repaint)
    root.style.setProperty(variableName, colorValue);
    root.style.setProperty(`${variableName}-hover`, `${colorValue}DD`);


    // Create CSS rules only once για κάρτες
    let style = document.getElementById('layera-card-color-overrides') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-card-color-overrides';
      document.head.appendChild(style);

      // Minimal CSS rules - rely on CardsPlayground's own CSS variable usage
      // The CardsPlayground already uses var(--layera-card-bg-${key}, fallback) in inline styles
      // We just need to ensure CSS variables are properly set - no additional CSS rules needed
      style.textContent = `
        /* Minimal CSS for card live preview - relies on CardsPlayground's inline CSS variables */
        /* CSS variables are set directly on :root by applySpecificCardColor */

        /* Debug helper to visualize applied variables */
        :root {
          /* Variables set dynamically by applySpecificCardColor function */
        }
      `;
    }
  };

  /**
   * Εφαρμόζει isolated CSS rules για συγκεκριμένο modal variant
   * Χρησιμοποιεί CSS variables για modal backgrounds
   */
  const applySpecificModalColor = (colorKey: string, colorValue: string) => {
    // Optimized: Use CSS variables instead of rewriting style.textContent
    const root = document.documentElement;

    // Mapping από colorKey σε CSS variable για modals
    // NOTE: colorKey format is 'primaryColor' από LivePlayground, CSS variable format is 'primary'
    const colorToVariableMap: Record<string, string> = {
      'primaryColor': '--layera-modal-bg-primary',
      'secondaryColor': '--layera-modal-bg-secondary',
      'successColor': '--layera-modal-bg-success',
      'warningColor': '--layera-modal-bg-warning',
      'dangerColor': '--layera-modal-bg-danger',
      'infoColor': '--layera-modal-bg-info'
    };

    const variableName = colorToVariableMap[colorKey];
    if (!variableName) return;

    // Fast CSS variable update (no DOM reflow/repaint)
    root.style.setProperty(variableName, colorValue);
    root.style.setProperty(`${variableName}-hover`, `${colorValue}DD`);

    // Create CSS rules only once για modals
    let style = document.getElementById('layera-modal-color-overrides') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-modal-color-overrides';
      document.head.appendChild(style);

      // Minimal CSS rules - rely on ModalsPlayground's own CSS variable usage
      // The ModalsPlayground already uses var(--layera-modal-bg-${key}, fallback) in inline styles
      // We just need to ensure CSS variables are properly set - no additional CSS rules needed
      style.textContent = `
        /* Minimal CSS for modal live preview - relies on ModalsPlayground's inline CSS variables */
        /* CSS variables are set directly on :root by applySpecificModalColor */

        /* Debug helper to visualize applied variables */
        :root {
          /* Variables set dynamically by applySpecificModalColor function */
        }
      `;
    }
  };

  /**
   * Εφαρμόζει συγκεκριμένο χρώμα σε layout element για real-time preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificLayoutColor = (colorKey: string, colorValue: string) => {
    // Optimized: Use CSS variables instead of rewriting style.textContent
    const root = document.documentElement;

    // Mapping από colorKey σε CSS variable για layouts
    // NOTE: colorKey format is 'primaryColor' από LivePlayground, CSS variable format is 'primary'
    const colorToVariableMap: Record<string, string> = {
      'primaryColor': '--layera-layout-bg-primary',
      'secondaryColor': '--layera-layout-bg-secondary',
      'successColor': '--layera-layout-bg-success',
      'warningColor': '--layera-layout-bg-warning',
      'dangerColor': '--layera-layout-bg-danger',
      'infoColor': '--layera-layout-bg-info'
    };

    const variableName = colorToVariableMap[colorKey];
    if (!variableName) return;

    // Fast CSS variable update (no DOM reflow/repaint)
    root.style.setProperty(variableName, colorValue);
    root.style.setProperty(`${variableName}-hover`, `${colorValue}DD`);

    // Create CSS rules only once για layouts
    let style = document.getElementById('layera-layout-color-overrides') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-layout-color-overrides';
      document.head.appendChild(style);

      // Minimal CSS rules - rely on LayoutPlayground's own CSS variable usage
      // The LayoutPlayground will use var(--layera-layout-bg-${key}, fallback) in inline styles
      // We just need to ensure CSS variables are properly set - no additional CSS rules needed
      style.textContent = `
        /* Minimal CSS for layout live preview - relies on LayoutPlayground's inline CSS variables */
        /* CSS variables are set directly on :root by applySpecificLayoutColor */

        /* Debug helper to visualize applied variables */
        :root {
          /* Variables set dynamically by applySpecificLayoutColor function */
        }
      `;
    }
  };

  /**
   * Εφαρμόζει συγκεκριμένο χρώμα σε header element για real-time preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificHeaderColor = (colorKey: string, colorValue: string) => {
    // Optimized: Use CSS variables instead of rewriting style.textContent
    const root = document.documentElement;

    // Mapping από colorKey σε CSS variable για headers
    // NOTE: colorKey format is 'primaryColor' από LivePlayground, CSS variable format is 'primary'
    const colorToVariableMap: Record<string, string> = {
      'primaryColor': '--layera-header-bg-primary',
      'secondaryColor': '--layera-header-bg-secondary',
      'successColor': '--layera-header-bg-success',
      'warningColor': '--layera-header-bg-warning',
      'dangerColor': '--layera-header-bg-danger',
      'infoColor': '--layera-header-bg-info'
    };

    const variableName = colorToVariableMap[colorKey];
    if (!variableName) return;

    // Fast CSS variable update (no DOM reflow/repaint)
    root.style.setProperty(variableName, colorValue);
    root.style.setProperty(`${variableName}-hover`, `${colorValue}DD`);

    // Create CSS rules only once για headers
    let style = document.getElementById('layera-header-color-overrides') as HTMLStyleElement;
    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-header-color-overrides';
      document.head.appendChild(style);

      // Minimal CSS rules - rely on HeaderPlayground's own CSS variable usage
      // The HeaderPlayground will use var(--layera-header-bg-${key}, fallback) in inline styles
      // We just need to ensure CSS variables are properly set - no additional CSS rules needed
      style.textContent = `
        /* Minimal CSS for header live preview - relies on HeaderPlayground's inline CSS variables */
        /* CSS variables are set directly on :root by applySpecificHeaderColor */

        /* Debug helper to visualize applied variables */
        :root {
          /* Variables set dynamically by applySpecificHeaderColor function */
        }
      `;
    }
  };

  /**
   * Επιστρέφει default colors για fallback
   */
  const getCurrentDefaultColors = (): ColorPaletteWithAlpha => ({
    primaryColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    secondaryColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    successColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0),
    warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
    dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
    infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
  });

  const actions: CSSVariablesActions = {
    ensureCSSVariablesExist,
    applySquareColorsToHeader,
    applyColorsToApp,
    applySpecificButtonColor,
    applySpecificCardColor,
    applySpecificModalColor,
    applySpecificLayoutColor,
    applySpecificHeaderColor
  };

  return {
    actions
  };
};