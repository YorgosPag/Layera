import type { ColorWithAlpha } from '../components/playground/shared/ColorPickerWithAlpha';
import type { ColorPaletteWithAlpha } from './useColorStateWithAlpha';
import type { ColorCategory } from './useColorState';

/**
 * Enhanced CSS Variables Management Hook με Alpha Channel Support
 *
 * Επεκτείνει το βασικό CSS Variables system με:
 * - RGBA values support
 * - Alpha channel management
 * - Backward compatibility με HEX values
 * - Enhanced CSS injection για transparency effects
 */

interface CSSVariableMapWithAlpha {
  [category: string]: {
    [colorKey: string]: {
      hex: string;    // --layera-btn-primary-bg-hex
      rgba: string;   // --layera-btn-primary-bg-rgba
      alpha: string;  // --layera-btn-primary-bg-alpha
    };
  };
}

export interface CSSVariablesWithAlphaActions {
  ensureCSSVariablesExist: () => void;
  applySquareColorsToHeader: () => void;
  applyColorsToApp: (colorCategory: ColorCategory, currentColors: ColorPaletteWithAlpha, elementType?: string) => Promise<void>;
  applyColorsToAppWithAlpha: (colorCategory: ColorCategory, currentColors: ColorPaletteWithAlpha, elementType?: string, alphaEnabled?: boolean) => Promise<void>;
  // Legacy HEX support
  applyColorsToAppLegacy: (colorCategory: ColorCategory, currentColors: Record<string, string>, elementType?: string) => Promise<void>;
}

export interface UseCSSVariablesWithAlphaReturn {
  actions: CSSVariablesWithAlphaActions;
}

// Enhanced CSS Variable mapping με alpha support
const CSS_VARIABLE_MAP_WITH_ALPHA: CSSVariableMapWithAlpha = {
  buttons: {
    primary: {
      hex: '--layera-btn-primary-bg-hex',
      rgba: '--layera-btn-primary-bg-rgba',
      alpha: '--layera-btn-primary-bg-alpha'
    },
    secondary: {
      hex: '--layera-btn-secondary-bg-hex',
      rgba: '--layera-btn-secondary-bg-rgba',
      alpha: '--layera-btn-secondary-bg-alpha'
    },
    success: {
      hex: '--layera-btn-success-bg-hex',
      rgba: '--layera-btn-success-bg-rgba',
      alpha: '--layera-btn-success-bg-alpha'
    },
    warning: {
      hex: '--layera-btn-warning-bg-hex',
      rgba: '--layera-btn-warning-bg-rgba',
      alpha: '--layera-btn-warning-bg-alpha'
    },
    danger: {
      hex: '--layera-btn-danger-bg-hex',
      rgba: '--layera-btn-danger-bg-rgba',
      alpha: '--layera-btn-danger-bg-alpha'
    },
    info: {
      hex: '--layera-btn-info-bg-hex',
      rgba: '--layera-btn-info-bg-rgba',
      alpha: '--layera-btn-info-bg-alpha'
    }
  },
  backgrounds: {
    primary: {
      hex: '--layera-color-bg-primary-hex',
      rgba: '--layera-color-bg-primary-rgba',
      alpha: '--layera-color-bg-primary-alpha'
    },
    secondary: {
      hex: '--layera-color-bg-secondary-hex',
      rgba: '--layera-color-bg-secondary-rgba',
      alpha: '--layera-color-bg-secondary-alpha'
    },
    success: {
      hex: '--layera-color-bg-success-hex',
      rgba: '--layera-color-bg-success-rgba',
      alpha: '--layera-color-bg-success-alpha'
    },
    warning: {
      hex: '--layera-color-bg-warning-hex',
      rgba: '--layera-color-bg-warning-rgba',
      alpha: '--layera-color-bg-warning-alpha'
    },
    danger: {
      hex: '--layera-color-bg-danger-hex',
      rgba: '--layera-color-bg-danger-rgba',
      alpha: '--layera-color-bg-danger-alpha'
    },
    info: {
      hex: '--layera-color-bg-info-hex',
      rgba: '--layera-color-bg-info-rgba',
      alpha: '--layera-color-bg-info-alpha'
    }
  },
  text: {
    primary: {
      hex: '--layera-color-text-primary-hex',
      rgba: '--layera-color-text-primary-rgba',
      alpha: '--layera-color-text-primary-alpha'
    },
    secondary: {
      hex: '--layera-color-text-secondary-hex',
      rgba: '--layera-color-text-secondary-rgba',
      alpha: '--layera-color-text-secondary-alpha'
    },
    success: {
      hex: '--layera-color-text-success-hex',
      rgba: '--layera-color-text-success-rgba',
      alpha: '--layera-color-text-success-alpha'
    },
    warning: {
      hex: '--layera-color-text-warning-hex',
      rgba: '--layera-color-text-warning-rgba',
      alpha: '--layera-color-text-warning-alpha'
    },
    danger: {
      hex: '--layera-color-text-danger-hex',
      rgba: '--layera-color-text-danger-rgba',
      alpha: '--layera-color-text-danger-alpha'
    },
    info: {
      hex: '--layera-color-text-info-hex',
      rgba: '--layera-color-text-info-rgba',
      alpha: '--layera-color-text-info-alpha'
    }
  },
  borders: {
    primary: {
      hex: '--layera-color-border-primary-hex',
      rgba: '--layera-color-border-primary-rgba',
      alpha: '--layera-color-border-primary-alpha'
    },
    secondary: {
      hex: '--layera-color-border-secondary-hex',
      rgba: '--layera-color-border-secondary-rgba',
      alpha: '--layera-color-border-secondary-alpha'
    },
    success: {
      hex: '--layera-color-border-success-hex',
      rgba: '--layera-color-border-success-rgba',
      alpha: '--layera-color-border-success-alpha'
    },
    warning: {
      hex: '--layera-color-border-warning-hex',
      rgba: '--layera-color-border-warning-rgba',
      alpha: '--layera-color-border-warning-alpha'
    },
    danger: {
      hex: '--layera-color-border-danger-hex',
      rgba: '--layera-color-border-danger-rgba',
      alpha: '--layera-color-border-danger-alpha'
    },
    info: {
      hex: '--layera-color-border-info-hex',
      rgba: '--layera-color-border-info-rgba',
      alpha: '--layera-color-border-info-alpha'
    }
  }
};

// Helper function: Extract RGB values από HEX
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 255, g: 255, b: 255 };
};

// Helper function: Extract HEX από CSS variable
const extractHexFromValue = (colorValue: string): string => {
  if (!colorValue) return '#ffffff';
  if (colorValue.startsWith('#')) return colorValue;

  const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : '#ffffff';
};

/**
 * Hook για διαχείριση CSS Variables με Alpha Channel support
 */
export const useCSSVariablesWithAlpha = (): UseCSSVariablesWithAlphaReturn => {

  const ensureCSSVariablesExist = () => {
    // Δημιουργεί τις CSS variables αν δεν υπάρχουν
    const style = document.createElement('style');
    style.id = 'layera-alpha-css-variables';

    if (document.getElementById('layera-alpha-css-variables')) {
      return; // Υπάρχουν ήδη
    }

    const cssContent = `
      :root {
        /* Alpha-enhanced CSS Variables */
        /* Buttons */
        --layera-btn-primary-bg-hex: #6366f1;
        --layera-btn-primary-bg-rgba: rgba(99, 102, 241, 1);
        --layera-btn-primary-bg-alpha: 1;

        --layera-btn-secondary-bg-hex: #475569;
        --layera-btn-secondary-bg-rgba: rgba(71, 85, 105, 1);
        --layera-btn-secondary-bg-alpha: 1;

        /* Backgrounds */
        --layera-color-bg-primary-hex: #ffffff;
        --layera-color-bg-primary-rgba: rgba(255, 255, 255, 0.9);
        --layera-color-bg-primary-alpha: 0.9;

        --layera-color-bg-secondary-hex: #f8fafc;
        --layera-color-bg-secondary-rgba: rgba(248, 250, 252, 0.8);
        --layera-color-bg-secondary-alpha: 0.8;

        /* Text */
        --layera-color-text-primary-hex: #1f2937;
        --layera-color-text-primary-rgba: rgba(31, 41, 55, 1);
        --layera-color-text-primary-alpha: 1;

        --layera-color-text-secondary-hex: #6b7280;
        --layera-color-text-secondary-rgba: rgba(107, 114, 128, 0.8);
        --layera-color-text-secondary-alpha: 0.8;

        /* Borders */
        --layera-color-border-primary-hex: #e5e5e5;
        --layera-color-border-primary-rgba: rgba(229, 229, 229, 0.5);
        --layera-color-border-primary-alpha: 0.5;

        --layera-color-border-secondary-hex: #d1d5db;
        --layera-color-border-secondary-rgba: rgba(209, 213, 219, 0.4);
        --layera-color-border-secondary-alpha: 0.4;

        /* Success, Warning, Danger, Info - All categories */
        --layera-btn-success-bg-hex: #10b981;
        --layera-btn-success-bg-rgba: rgba(16, 185, 129, 1);
        --layera-btn-success-bg-alpha: 1;

        --layera-btn-warning-bg-hex: #f59e0b;
        --layera-btn-warning-bg-rgba: rgba(245, 158, 11, 1);
        --layera-btn-warning-bg-alpha: 1;

        --layera-btn-danger-bg-hex: #ef4444;
        --layera-btn-danger-bg-rgba: rgba(239, 68, 68, 1);
        --layera-btn-danger-bg-alpha: 1;

        --layera-btn-info-bg-hex: #6366f1;
        --layera-btn-info-bg-rgba: rgba(99, 102, 241, 1);
        --layera-btn-info-bg-alpha: 1;
      }
    `;

    style.textContent = cssContent;
    document.head.appendChild(style);
  };

  const applySquareColorsToHeader = () => {
    // Legacy function - μπορεί να ενημερωθεί αργότερα
    console.log('applySquareColorsToHeader called');
  };

  const applyColorsToAppWithAlpha = async (
    colorCategory: ColorCategory,
    currentColors: ColorPaletteWithAlpha,
    _elementType: string = 'buttons',
    _alphaEnabled: boolean = true
  ) => {
    ensureCSSVariablesExist();

    const root = document.documentElement;
    const categoryMap = CSS_VARIABLE_MAP_WITH_ALPHA[colorCategory] || CSS_VARIABLE_MAP_WITH_ALPHA.buttons;

    // Apply colors με alpha support
    Object.entries(currentColors).forEach(([colorKey, colorWithAlpha]: [string, ColorWithAlpha]) => {
      const variableMap = categoryMap[colorKey];
      if (variableMap) {
        // Set HEX value
        root.style.setProperty(variableMap.hex, colorWithAlpha.hex);

        // Set RGBA value
        root.style.setProperty(variableMap.rgba, colorWithAlpha.rgba);

        // Set Alpha value
        root.style.setProperty(variableMap.alpha, colorWithAlpha.alpha.toString());
      }
    });

    console.log(`Applied ${colorCategory} colors with alpha support:`, currentColors);
  };

  const applyColorsToApp = async (
    colorCategory: ColorCategory,
    currentColors: ColorPaletteWithAlpha,
    _elementType: string = 'buttons'
  ) => {
    return applyColorsToAppWithAlpha(colorCategory, currentColors, _elementType, true);
  };

  // Legacy HEX support
  const applyColorsToAppLegacy = async (
    colorCategory: ColorCategory,
    currentColors: Record<string, string>,
    _elementType: string = 'buttons'
  ) => {
    ensureCSSVariablesExist();

    const root = document.documentElement;
    const categoryMap = CSS_VARIABLE_MAP_WITH_ALPHA[colorCategory] || CSS_VARIABLE_MAP_WITH_ALPHA.buttons;

    // Convert HEX values to ColorWithAlpha format
    Object.entries(currentColors).forEach(([colorKey, hexValue]: [string, string]) => {
      const variableMap = categoryMap[colorKey];
      if (variableMap) {
        const extractedHex = extractHexFromValue(hexValue);
        const { r, g, b } = hexToRgb(extractedHex);
        const alpha = 1.0; // Default alpha για legacy support
        const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        // Set HEX value
        root.style.setProperty(variableMap.hex, extractedHex);

        // Set RGBA value
        root.style.setProperty(variableMap.rgba, rgba);

        // Set Alpha value
        root.style.setProperty(variableMap.alpha, alpha.toString());
      }
    });

    console.log(`Applied ${colorCategory} legacy HEX colors:`, currentColors);
  };

  return {
    actions: {
      ensureCSSVariablesExist,
      applySquareColorsToHeader,
      applyColorsToApp,
      applyColorsToAppWithAlpha,
      applyColorsToAppLegacy
    }
  };
};