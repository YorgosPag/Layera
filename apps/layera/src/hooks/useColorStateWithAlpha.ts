import { useState } from 'react';
import type { ColorWithAlpha } from '../components/playground/shared/ColorPickerWithAlpha';
import {
  ColorCategory,
  ElementType,
  ColorButtonShape,
  useColorState
} from './useColorState';

/**
 * Extended Color State Management Hook με Alpha Channel Support
 *
 * Επεκτείνει το βασικό useColorState με υποστήριξη για διαφάνειες
 * - Backward compatibility με HEX values
 * - Alpha channel support (RGBA)
 * - Automatic conversion μεταξύ HEX και RGBA
 * - Enhanced color palette με alpha values
 */

export interface ColorPaletteWithAlpha {
  primaryColor: ColorWithAlpha;
  secondaryColor: ColorWithAlpha;
  successColor: ColorWithAlpha;
  warningColor: ColorWithAlpha;
  dangerColor: ColorWithAlpha;
  infoColor: ColorWithAlpha;
}

export interface CategoryColorPalettesWithAlpha {
  backgrounds: ColorPaletteWithAlpha;
  text: ColorPaletteWithAlpha;
  borders: ColorPaletteWithAlpha;
}

export interface ColorStateWithAlpha {
  colorCategory: ColorCategory;
  elementType: ElementType;
  colorButtonShape: ColorButtonShape;
  rectangularPalette: ColorPaletteWithAlpha;
  squarePalette: ColorPaletteWithAlpha;
  roundedPalette: ColorPaletteWithAlpha;
  categoryPalettes: CategoryColorPalettesWithAlpha;
  alphaEnabled: boolean; // Toggle για alpha mode
}

export interface ColorStateWithAlphaActions {
  setColorCategory: (category: ColorCategory) => void;
  setElementType: (type: ElementType) => void;
  setColorButtonShape: (shape: ColorButtonShape) => void;
  setAlphaEnabled: (enabled: boolean) => void;
  updateRectangularPalette: (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => void;
  updateSquarePalette: (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => void;
  updateRoundedPalette: (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => void;
  updateCategoryPalette: (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => void;
  resetToDefaults: () => void;
  // Legacy HEX support methods
  updateRectangularPaletteHex: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateSquarePaletteHex: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateRoundedPaletteHex: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateCategoryPaletteHex: (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => void;
}

export interface UseColorStateWithAlphaReturn {
  state: ColorStateWithAlpha;
  actions: ColorStateWithAlphaActions;
  colorCategories: readonly ColorCategory[];
  elementTypes: readonly ElementType[];
  colorButtonShapes: readonly ColorButtonShape[];
  getCurrentPalette: () => ColorPaletteWithAlpha;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
  // Legacy compatibility
  getCurrentPaletteAsHex: () => Record<string, string>;
  getCategoryPaletteAsHex: (category: ColorCategory) => Record<string, string>;
}

// Helper function: Convert HEX to ColorWithAlpha
const hexToColorWithAlpha = (hex: string, alpha: number = 1.0): ColorWithAlpha => {
  // Extract HEX από CSS variables
  const extractedHex = extractHexFromValue(hex);


  const r = parseInt(extractedHex.slice(1, 3), 16);
  const g = parseInt(extractedHex.slice(3, 5), 16);
  const b = parseInt(extractedHex.slice(5, 7), 16);

  return {
    hex: extractedHex,
    alpha,
    rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`
  };
};

// Helper function: Extract HEX από CSS variable
const extractHexFromValue = (colorValue: string): string => {
  if (!colorValue) return '#ffffff';
  if (colorValue.startsWith('#')) return colorValue;

  // CSS variable fallback
  const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : '#ffffff';
};

// Helper function: Convert ColorWithAlpha to legacy HEX
const colorWithAlphaToHex = (color: ColorWithAlpha): string => {
  return color.hex;
};

// Helper function: Convert ColorWithAlpha to RGBA string
const colorWithAlphaToRgba = (color: ColorWithAlpha): string => {
  return color.rgba;
};

// Default palettes με alpha support
const DEFAULT_ALPHA_RECTANGULAR_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('#6366f1', 1.0),
  secondaryColor: hexToColorWithAlpha('#475569', 1.0),
  successColor: hexToColorWithAlpha('#10b981', 1.0),
  warningColor: hexToColorWithAlpha('#f59e0b', 1.0),
  dangerColor: hexToColorWithAlpha('#ef4444', 1.0),
  infoColor: hexToColorWithAlpha('#6366f1', 1.0)
};

const DEFAULT_ALPHA_SQUARE_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('#6366f1', 1.0),
  secondaryColor: hexToColorWithAlpha('#475569', 1.0),
  successColor: hexToColorWithAlpha('#10b981', 1.0),
  warningColor: hexToColorWithAlpha('#f59e0b', 1.0),
  dangerColor: hexToColorWithAlpha('#ef4444', 1.0),
  infoColor: hexToColorWithAlpha('#6366f1', 1.0)
};

const DEFAULT_ALPHA_ROUNDED_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('#6366f1', 1.0),
  secondaryColor: hexToColorWithAlpha('#475569', 1.0),
  successColor: hexToColorWithAlpha('#10b981', 1.0),
  warningColor: hexToColorWithAlpha('#f59e0b', 1.0),
  dangerColor: hexToColorWithAlpha('#ef4444', 1.0),
  infoColor: hexToColorWithAlpha('#6366f1', 1.0)
};

const DEFAULT_ALPHA_CATEGORY_PALETTES: CategoryColorPalettesWithAlpha = {
  backgrounds: {
    primaryColor: hexToColorWithAlpha('#ffffff', 0.9), // Semi-transparent backgrounds
    secondaryColor: hexToColorWithAlpha('#f8fafc', 0.8),
    successColor: hexToColorWithAlpha('#10b981', 0.1),
    warningColor: hexToColorWithAlpha('#f59e0b', 0.1),
    dangerColor: hexToColorWithAlpha('#ef4444', 0.1),
    infoColor: hexToColorWithAlpha('#6366f1', 0.1)
  },
  text: {
    primaryColor: hexToColorWithAlpha('#1f2937', 1.0),
    secondaryColor: hexToColorWithAlpha('#6b7280', 0.8),
    successColor: hexToColorWithAlpha('#10b981', 1.0),
    warningColor: hexToColorWithAlpha('#f59e0b', 1.0),
    dangerColor: hexToColorWithAlpha('#ef4444', 1.0),
    infoColor: hexToColorWithAlpha('#6366f1', 1.0)
  },
  borders: {
    primaryColor: hexToColorWithAlpha('#e5e5e5', 0.5), // Semi-transparent borders
    secondaryColor: hexToColorWithAlpha('#d1d5db', 0.4),
    successColor: hexToColorWithAlpha('#10b981', 0.6),
    warningColor: hexToColorWithAlpha('#f59e0b', 0.6),
    dangerColor: hexToColorWithAlpha('#ef4444', 0.6),
    infoColor: hexToColorWithAlpha('#6366f1', 0.6)
  }
};

const DEFAULT_COLOR_STATE_WITH_ALPHA: ColorStateWithAlpha = {
  colorCategory: 'backgrounds',
  elementType: 'buttons',
  colorButtonShape: 'square',
  rectangularPalette: DEFAULT_ALPHA_RECTANGULAR_PALETTE,
  squarePalette: DEFAULT_ALPHA_SQUARE_PALETTE,
  roundedPalette: DEFAULT_ALPHA_ROUNDED_PALETTE,
  categoryPalettes: DEFAULT_ALPHA_CATEGORY_PALETTES,
  alphaEnabled: true
};

const COLOR_CATEGORIES: readonly ColorCategory[] = [
  'backgrounds', 'text', 'borders'
] as const;

const COLOR_BUTTON_SHAPES: readonly ColorButtonShape[] = [
  'rectangular', 'square', 'rounded'
] as const;

const ELEMENT_TYPES: readonly ElementType[] = [
  'buttons', 'cards', 'modals', 'inputs', 'layout', 'tables'
] as const;

/**
 * Hook για διαχείριση color state με alpha channel support
 */
export const useColorStateWithAlpha = (): UseColorStateWithAlphaReturn => {
  const [state, setState] = useState<ColorStateWithAlpha>(DEFAULT_COLOR_STATE_WITH_ALPHA);

  // Actions
  const setColorCategory = (category: ColorCategory) => {
    setState(prev => ({ ...prev, colorCategory: category }));
  };

  const setElementType = (type: ElementType) => {
    setState(prev => ({ ...prev, elementType: type }));
  };

  const setColorButtonShape = (shape: ColorButtonShape) => {
    setState(prev => ({ ...prev, colorButtonShape: shape }));
  };

  const setAlphaEnabled = (enabled: boolean) => {
    setState(prev => ({ ...prev, alphaEnabled: enabled }));
  };

  const updateRectangularPalette = (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => {
    setState(prev => ({
      ...prev,
      rectangularPalette: { ...prev.rectangularPalette, [key]: value }
    }));
  };

  const updateSquarePalette = (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => {
    setState(prev => ({
      ...prev,
      squarePalette: { ...prev.squarePalette, [key]: value }
    }));
  };

  const updateRoundedPalette = (key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => {
    setState(prev => ({
      ...prev,
      roundedPalette: { ...prev.roundedPalette, [key]: value }
    }));
  };

  const updateCategoryPalette = (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: ColorWithAlpha) => {
    setState(prev => ({
      ...prev,
      categoryPalettes: {
        ...prev.categoryPalettes,
        [category]: { ...prev.categoryPalettes[category], [key]: value }
      }
    }));
  };

  // Legacy HEX support methods
  const updateRectangularPaletteHex = (key: keyof ColorPaletteWithAlpha, value: string) => {
    const existingAlpha = state.rectangularPalette[key].alpha;
    updateRectangularPalette(key, hexToColorWithAlpha(value, existingAlpha));
  };

  const updateSquarePaletteHex = (key: keyof ColorPaletteWithAlpha, value: string) => {
    const existingAlpha = state.squarePalette[key].alpha;
    updateSquarePalette(key, hexToColorWithAlpha(value, existingAlpha));
  };

  const updateRoundedPaletteHex = (key: keyof ColorPaletteWithAlpha, value: string) => {
    const existingAlpha = state.roundedPalette[key].alpha;
    updateRoundedPalette(key, hexToColorWithAlpha(value, existingAlpha));
  };

  const updateCategoryPaletteHex = (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => {
    const existingAlpha = state.categoryPalettes[category][key].alpha;
    updateCategoryPalette(category, key, hexToColorWithAlpha(value, existingAlpha));
  };

  const resetToDefaults = () => {
    setState(DEFAULT_COLOR_STATE_WITH_ALPHA);
  };

  // Getters
  const getCurrentPalette = (): ColorPaletteWithAlpha => {
    switch (state.colorButtonShape) {
      case 'rectangular': return state.rectangularPalette;
      case 'square': return state.squarePalette;
      case 'rounded': return state.roundedPalette;
      default: return state.squarePalette;
    }
  };

  const getCategoryPalette = (category: ColorCategory): ColorPaletteWithAlpha => {
    return state.categoryPalettes[category];
  };

  // Legacy compatibility
  const getCurrentPaletteAsHex = (): Record<string, string> => {
    const palette = getCurrentPalette();
    return Object.entries(palette).reduce((acc, [key, color]) => {
      acc[key] = colorWithAlphaToHex(color);
      return acc;
    }, {} as Record<string, string>);
  };

  const getCategoryPaletteAsHex = (category: ColorCategory): Record<string, string> => {
    const palette = getCategoryPalette(category);
    return Object.entries(palette).reduce((acc, [key, color]) => {
      acc[key] = colorWithAlphaToHex(color);
      return acc;
    }, {} as Record<string, string>);
  };

  return {
    state,
    actions: {
      setColorCategory,
      setElementType,
      setColorButtonShape,
      setAlphaEnabled,
      updateRectangularPalette,
      updateSquarePalette,
      updateRoundedPalette,
      updateCategoryPalette,
      resetToDefaults,
      updateRectangularPaletteHex,
      updateSquarePaletteHex,
      updateRoundedPaletteHex,
      updateCategoryPaletteHex
    },
    colorCategories: COLOR_CATEGORIES,
    elementTypes: ELEMENT_TYPES,
    colorButtonShapes: COLOR_BUTTON_SHAPES,
    getCurrentPalette,
    getCategoryPalette,
    getCurrentPaletteAsHex,
    getCategoryPaletteAsHex
  };
};

// Export helper functions για χρήση σε άλλα components
export { hexToColorWithAlpha, colorWithAlphaToHex, colorWithAlphaToRgba, extractHexFromValue };