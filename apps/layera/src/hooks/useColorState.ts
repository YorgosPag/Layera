import { useState } from 'react';
import type { ColorCategory } from '../components/playground/shared/types';

// Re-export για backwards compatibility
export type { ColorCategory } from '../components/playground/shared/types';
// ColorPaletteWithAlpha and hexToColorWithAlpha now defined in this file

export interface ColorWithAlpha {
  hex: string;
  alpha: number;
  rgba: string; // Added for compatibility with ColorPickerWithAlpha components
}

export const hexToColorWithAlpha = (hex: string, alpha: number = 1.0): ColorWithAlpha => {
  // Αν είναι CSS variable, επιστρέφει αυτούσιο χωρίς μετατροπή
  if (hex.includes('var(')) {
    return {
      hex: hex,
      alpha: Math.max(0, Math.min(1, alpha)),
      rgba: hex // Κρατάει το CSS variable ως rgba για συμβατότητα
    };
  }

  // Καθαρό hex value - βεβαιώνεται ότι αρχίζει με #
  let cleanHex = hex;
  if (!cleanHex.startsWith('#')) {
    cleanHex = `#${cleanHex}`;
  }

  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  // Generate rgba string
  const r = parseInt(cleanHex.slice(1, 3), 16);
  const g = parseInt(cleanHex.slice(3, 5), 16);
  const b = parseInt(cleanHex.slice(5, 7), 16);
  const rgba = `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;

  return {
    hex: cleanHex,
    alpha: clampedAlpha,
    rgba
  };
};

/**
 * Color State Management Hook
 *
 * Enterprise-grade hook για διαχείριση color configuration state
 * - Color category selection (buttons, backgrounds, text, borders)
 * - Button shape για color testing
 * - Color palettes για διαφορετικά button shapes
 * - Centralized color management για consistency
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

// ColorCategory moved to shared/types.ts
export type ElementType = 'buttons' | 'cards' | 'modals' | 'inputs' | 'layout' | 'tables' | 'headers';
export type ColorButtonShape = 'rectangular' | 'square' | 'rounded';

// ColorPaletteWithAlpha interface moved here from deleted useColorStateWithAlpha
export interface ColorPaletteWithAlpha {
  primaryColor: ColorWithAlpha;
  secondaryColor: ColorWithAlpha;
  successColor: ColorWithAlpha;
  warningColor: ColorWithAlpha;
  dangerColor: ColorWithAlpha;
  infoColor: ColorWithAlpha;
}

// 🗑️ DELETED: ColorPalette interface - replaced with ColorPaletteWithAlpha for Enterprise consistency

export interface CategoryColorPalettes {
  buttons: ColorPaletteWithAlpha;
  backgrounds: ColorPaletteWithAlpha;
  text: ColorPaletteWithAlpha;
  borders: ColorPaletteWithAlpha;
}

export interface ElementTypeColorPalettes {
  buttons: CategoryColorPalettes;
  cards: CategoryColorPalettes;
  modals: CategoryColorPalettes;
  inputs: CategoryColorPalettes;
  layout: CategoryColorPalettes;
  tables: CategoryColorPalettes;
  headers: CategoryColorPalettes;
}

export interface ColorState {
  colorCategory: ColorCategory;
  elementType: ElementType;
  colorButtonShape: ColorButtonShape;
  rectangularPalette: ColorPaletteWithAlpha;
  squarePalette: ColorPaletteWithAlpha;
  roundedPalette: ColorPaletteWithAlpha;
  categoryPalettes: CategoryColorPalettes;
  elementTypePalettes: ElementTypeColorPalettes;
  // Simple color fields added for backwards compatibility with services
  primaryColor?: string;
  secondaryColor?: string;
  successColor?: string;
  warningColor?: string;
  dangerColor?: string;
  infoColor?: string;
}

export interface ColorStateActions {
  setColorCategory: (category: ColorCategory) => void;
  setElementType: (type: ElementType) => void;
  setColorButtonShape: (shape: ColorButtonShape) => void;
  updateRectangularPalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateSquarePalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateRoundedPalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateCategoryPalette: (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateElementTypePalette: (elementType: ElementType, category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => void;
  resetToDefaults: () => void;
  // Simple color field setters added for backwards compatibility
  setPrimaryColor?: (color: string) => void;
  setSecondaryColor?: (color: string) => void;
  setSuccessColor?: (color: string) => void;
  setWarningColor?: (color: string) => void;
  setDangerColor?: (color: string) => void;
  setInfoColor?: (color: string) => void;
}

export interface UseColorStateReturn {
  state: ColorState;
  actions: ColorStateActions;
  colorCategories: readonly ColorCategory[];
  elementTypes: readonly ElementType[];
  colorButtonShapes: readonly ColorButtonShape[];
  getCurrentPalette: () => ColorPaletteWithAlpha;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
  getElementColors: (elementType: ElementType, category: ColorCategory) => ColorPaletteWithAlpha;
}

const DEFAULT_RECTANGULAR_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0),
  secondaryColor: hexToColorWithAlpha('var(--layera-color-semantic-neutral-dark)', 1.0),
  successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
  warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
  dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
  infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
};

const DEFAULT_SQUARE_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0),
  secondaryColor: hexToColorWithAlpha('var(--layera-color-semantic-neutral-dark)', 1.0),
  successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
  warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
  dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
  infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
};

const DEFAULT_ROUNDED_PALETTE: ColorPaletteWithAlpha = {
  primaryColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0),
  secondaryColor: hexToColorWithAlpha('var(--layera-color-semantic-neutral-dark)', 1.0),
  successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
  warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
  dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
  infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
};

const DEFAULT_CATEGORY_PALETTES: CategoryColorPalettes = {
  buttons: {
    primaryColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0),
    secondaryColor: hexToColorWithAlpha('var(--layera-color-semantic-neutral-medium)', 1.0),
    successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
    dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
    infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
  },
  backgrounds: {
    primaryColor: hexToColorWithAlpha('var(--layera-color-surface-primary)', 1.0),
    secondaryColor: hexToColorWithAlpha('var(--layera-color-surface-secondary)', 1.0),
    successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
    dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
    infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
  },
  text: {
    primaryColor: hexToColorWithAlpha('var(--layera-color-text-primary)', 1.0),
    secondaryColor: hexToColorWithAlpha('var(--layera-color-text-secondary)', 1.0),
    successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
    dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
    infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
  },
  borders: {
    primaryColor: hexToColorWithAlpha('var(--layera-color-border-primary)', 1.0),
    secondaryColor: hexToColorWithAlpha('var(--layera-color-border-secondary)', 1.0),
    successColor: hexToColorWithAlpha('var(--layera-color-semantic-success-primary)', 1.0),
    warningColor: hexToColorWithAlpha('var(--layera-color-semantic-warning-primary)', 1.0),
    dangerColor: hexToColorWithAlpha('var(--layera-color-semantic-error-primary)', 1.0),
    infoColor: hexToColorWithAlpha('var(--layera-color-semantic-info-primary)', 1.0)
  }
};

const DEFAULT_ELEMENT_TYPE_PALETTES: ElementTypeColorPalettes = {
  buttons: DEFAULT_CATEGORY_PALETTES,
  cards: DEFAULT_CATEGORY_PALETTES,
  modals: DEFAULT_CATEGORY_PALETTES,
  inputs: DEFAULT_CATEGORY_PALETTES,
  layout: DEFAULT_CATEGORY_PALETTES,
  tables: DEFAULT_CATEGORY_PALETTES,
  headers: DEFAULT_CATEGORY_PALETTES
};

const DEFAULT_COLOR_STATE: ColorState = {
  colorCategory: 'backgrounds',
  elementType: 'buttons',
  colorButtonShape: 'square',
  rectangularPalette: DEFAULT_RECTANGULAR_PALETTE,
  squarePalette: DEFAULT_SQUARE_PALETTE,
  roundedPalette: DEFAULT_ROUNDED_PALETTE,
  categoryPalettes: DEFAULT_CATEGORY_PALETTES,
  elementTypePalettes: DEFAULT_ELEMENT_TYPE_PALETTES
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
 * Hook για διαχείριση color state
 *
 * @returns Color state, actions και available options
 */
export const useColorState = (): UseColorStateReturn => {
  const [state, setState] = useState<ColorState>(DEFAULT_COLOR_STATE);

  const actions: ColorStateActions = {
    setColorCategory: (category: ColorCategory) => {
      setState(prev => ({ ...prev, colorCategory: category }));
    },

    setColorButtonShape: (shape: ColorButtonShape) => {
      setState(prev => ({ ...prev, colorButtonShape: shape }));
    },

    setElementType: (type: ElementType) => {
      setState(prev => ({ ...prev, elementType: type }));
    },

    updateRectangularPalette: (key: keyof ColorPaletteWithAlpha, value: string) => {
      setState(prev => ({
        ...prev,
        rectangularPalette: { ...prev.rectangularPalette, [key]: value }
      }));
    },

    updateSquarePalette: (key: keyof ColorPaletteWithAlpha, value: string) => {
      setState(prev => ({
        ...prev,
        squarePalette: { ...prev.squarePalette, [key]: value }
      }));
    },

    updateRoundedPalette: (key: keyof ColorPaletteWithAlpha, value: string) => {
      setState(prev => ({
        ...prev,
        roundedPalette: { ...prev.roundedPalette, [key]: value }
      }));
    },

    updateCategoryPalette: (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => {
      setState(prev => ({
        ...prev,
        categoryPalettes: {
          ...prev.categoryPalettes,
          [category]: {
            ...prev.categoryPalettes[category],
            [key]: value
          }
        }
      }));
    },

    updateElementTypePalette: (elementType: ElementType, category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => {
      setState(prev => ({
        ...prev,
        elementTypePalettes: {
          ...prev.elementTypePalettes,
          [elementType]: {
            ...prev.elementTypePalettes[elementType],
            [category]: {
              ...prev.elementTypePalettes[elementType][category],
              [key]: value
            }
          }
        }
      }));
    },

    resetToDefaults: () => {
      setState(DEFAULT_COLOR_STATE);
    }
  };

  const getCurrentPalette = (): ColorPaletteWithAlpha => {
    switch (state.colorButtonShape) {
      case 'rectangular':
        return state.rectangularPalette;
      case 'square':
        return state.squarePalette;
      case 'rounded':
        return state.roundedPalette;
      default:
        return state.squarePalette;
    }
  };

  const getCategoryPalette = (category: ColorCategory): ColorPaletteWithAlpha => {
    return state.categoryPalettes[category];
  };

  const getElementColors = (elementType: ElementType, category: ColorCategory): ColorPaletteWithAlpha => {
    return state.elementTypePalettes[elementType][category];
  };

  return {
    state,
    actions,
    colorCategories: COLOR_CATEGORIES,
    elementTypes: ELEMENT_TYPES,
    colorButtonShapes: COLOR_BUTTON_SHAPES,
    getCurrentPalette,
    getCategoryPalette,
    getElementColors
  };
};