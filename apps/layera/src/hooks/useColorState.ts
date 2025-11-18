import { useState } from 'react';
// ColorPaletteWithAlpha and hexToColorWithAlpha now defined in this file

export interface ColorWithAlpha {
  hex: string;
  alpha: number;
}

export const hexToColorWithAlpha = (hex: string, alpha: number = 1.0): ColorWithAlpha => {
  // Καθαρό hex value - αφαίρεση CSS variables
  let cleanHex = hex;

  // Αν είναι CSS variable, εξάγει το fallback value
  if (hex.includes('var(')) {
    const match = hex.match(/,\s*(#[0-9a-fA-F]{6})\)/);
    cleanHex = match ? match[1] : 'var(--layera-color-semantic-neutral-light)';
  }

  // Βεβαιώνεται ότι αρχίζει με #
  if (!cleanHex.startsWith('#')) {
    cleanHex = `#${cleanHex}`;
  }

  return {
    hex: cleanHex,
    alpha: Math.max(0, Math.min(1, alpha))
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

export type ColorCategory = 'backgrounds' | 'text' | 'borders';
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
  backgrounds: ColorPaletteWithAlpha;
  text: ColorPaletteWithAlpha;
  borders: ColorPaletteWithAlpha;
}

export interface ColorState {
  colorCategory: ColorCategory;
  elementType: ElementType;
  colorButtonShape: ColorButtonShape;
  rectangularPalette: ColorPaletteWithAlpha;
  squarePalette: ColorPaletteWithAlpha;
  roundedPalette: ColorPaletteWithAlpha;
  categoryPalettes: CategoryColorPalettes;
}

export interface ColorStateActions {
  setColorCategory: (category: ColorCategory) => void;
  setElementType: (type: ElementType) => void;
  setColorButtonShape: (shape: ColorButtonShape) => void;
  updateRectangularPalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateSquarePalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateRoundedPalette: (key: keyof ColorPaletteWithAlpha, value: string) => void;
  updateCategoryPalette: (category: ColorCategory, key: keyof ColorPaletteWithAlpha, value: string) => void;
  resetToDefaults: () => void;
}

export interface UseColorStateReturn {
  state: ColorState;
  actions: ColorStateActions;
  colorCategories: readonly ColorCategory[];
  elementTypes: readonly ElementType[];
  colorButtonShapes: readonly ColorButtonShape[];
  getCurrentPalette: () => ColorPaletteWithAlpha;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
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

const DEFAULT_COLOR_STATE: ColorState = {
  colorCategory: 'backgrounds',
  elementType: 'buttons',
  colorButtonShape: 'square',
  rectangularPalette: DEFAULT_RECTANGULAR_PALETTE,
  squarePalette: DEFAULT_SQUARE_PALETTE,
  roundedPalette: DEFAULT_ROUNDED_PALETTE,
  categoryPalettes: DEFAULT_CATEGORY_PALETTES
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

  return {
    state,
    actions,
    colorCategories: COLOR_CATEGORIES,
    elementTypes: ELEMENT_TYPES,
    colorButtonShapes: COLOR_BUTTON_SHAPES,
    getCurrentPalette,
    getCategoryPalette
  };
};