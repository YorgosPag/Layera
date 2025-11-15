import { useState } from 'react';

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

export type ColorCategory = 'buttons' | 'backgrounds' | 'text' | 'borders';
export type ColorButtonShape = 'rectangular' | 'square' | 'rounded';

export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface CategoryColorPalettes {
  buttons: ColorPalette;
  backgrounds: ColorPalette;
  text: ColorPalette;
  borders: ColorPalette;
}

export interface ColorState {
  colorCategory: ColorCategory;
  colorButtonShape: ColorButtonShape;
  rectangularPalette: ColorPalette;
  squarePalette: ColorPalette;
  roundedPalette: ColorPalette;
  categoryPalettes: CategoryColorPalettes;
}

export interface ColorStateActions {
  setColorCategory: (category: ColorCategory) => void;
  setColorButtonShape: (shape: ColorButtonShape) => void;
  updateRectangularPalette: (key: keyof ColorPalette, value: string) => void;
  updateSquarePalette: (key: keyof ColorPalette, value: string) => void;
  updateRoundedPalette: (key: keyof ColorPalette, value: string) => void;
  updateCategoryPalette: (category: ColorCategory, key: keyof ColorPalette, value: string) => void;
  resetToDefaults: () => void;
}

export interface UseColorStateReturn {
  state: ColorState;
  actions: ColorStateActions;
  colorCategories: readonly ColorCategory[];
  colorButtonShapes: readonly ColorButtonShape[];
  getCurrentPalette: () => ColorPalette;
  getCategoryPalette: (category: ColorCategory) => ColorPalette;
}

const DEFAULT_RECTANGULAR_PALETTE: ColorPalette = {
  primary: 'var(--layera-color-semantic-info-primary, #6366f1)',
  secondary: 'var(--layera-color-text-secondary, #475569)',
  success: 'var(--layera-color-semantic-success-primary, #10b981)',
  warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
  danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
  info: 'var(--layera-color-semantic-info-primary, #6366f1)'
};

const DEFAULT_SQUARE_PALETTE: ColorPalette = {
  primary: 'var(--layera-color-semantic-info-primary, #6366f1)',
  secondary: 'var(--layera-color-text-secondary, #475569)',
  success: 'var(--layera-color-semantic-success-primary, #10b981)',
  warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
  danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
  info: 'var(--layera-color-semantic-info-primary, #6366f1)'
};

const DEFAULT_ROUNDED_PALETTE: ColorPalette = {
  primary: 'var(--layera-color-semantic-info-primary, #6366f1)',
  secondary: 'var(--layera-color-text-secondary, #475569)',
  success: 'var(--layera-color-semantic-success-primary, #10b981)',
  warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
  danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
  info: 'var(--layera-color-semantic-info-primary, #6366f1)'
};

const DEFAULT_CATEGORY_PALETTES: CategoryColorPalettes = {
  buttons: {
    primary: 'var(--layera-color-semantic-info-primary, #6366f1)',
    secondary: 'var(--layera-color-text-secondary, #475569)',
    success: 'var(--layera-color-semantic-success-primary, #10b981)',
    warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
    danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
    info: 'var(--layera-color-semantic-info-primary, #6366f1)'
  },
  backgrounds: {
    primary: 'var(--layera-color-surface-primary, #ffffff)',
    secondary: 'var(--layera-color-surface-secondary, #f8fafc)',
    success: 'var(--layera-color-semantic-success-primary, #10b981)',
    warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
    danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
    info: 'var(--layera-color-semantic-info-primary, #6366f1)'
  },
  text: {
    primary: 'var(--layera-color-text-primary, #1f2937)',
    secondary: 'var(--layera-color-text-secondary, #6b7280)',
    success: 'var(--layera-color-semantic-success-primary, #10b981)',
    warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
    danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
    info: 'var(--layera-color-semantic-info-primary, #6366f1)'
  },
  borders: {
    primary: 'var(--layera-color-border-primary, #e5e5e5)',
    secondary: 'var(--layera-color-border-secondary, #d1d5db)',
    success: 'var(--layera-color-semantic-success-primary, #10b981)',
    warning: 'var(--layera-color-semantic-warning-primary, #f59e0b)',
    danger: 'var(--layera-color-semantic-error-primary, #ef4444)',
    info: 'var(--layera-color-semantic-info-primary, #6366f1)'
  }
};

const DEFAULT_COLOR_STATE: ColorState = {
  colorCategory: 'buttons',
  colorButtonShape: 'square',
  rectangularPalette: DEFAULT_RECTANGULAR_PALETTE,
  squarePalette: DEFAULT_SQUARE_PALETTE,
  roundedPalette: DEFAULT_ROUNDED_PALETTE,
  categoryPalettes: DEFAULT_CATEGORY_PALETTES
};

const COLOR_CATEGORIES: readonly ColorCategory[] = [
  'buttons', 'backgrounds', 'text', 'borders'
] as const;

const COLOR_BUTTON_SHAPES: readonly ColorButtonShape[] = [
  'rectangular', 'square', 'rounded'
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

    updateRectangularPalette: (key: keyof ColorPalette, value: string) => {
      setState(prev => ({
        ...prev,
        rectangularPalette: { ...prev.rectangularPalette, [key]: value }
      }));
    },

    updateSquarePalette: (key: keyof ColorPalette, value: string) => {
      setState(prev => ({
        ...prev,
        squarePalette: { ...prev.squarePalette, [key]: value }
      }));
    },

    updateRoundedPalette: (key: keyof ColorPalette, value: string) => {
      setState(prev => ({
        ...prev,
        roundedPalette: { ...prev.roundedPalette, [key]: value }
      }));
    },

    updateCategoryPalette: (category: ColorCategory, key: keyof ColorPalette, value: string) => {
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

  const getCurrentPalette = (): ColorPalette => {
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

  const getCategoryPalette = (category: ColorCategory): ColorPalette => {
    return state.categoryPalettes[category];
  };

  return {
    state,
    actions,
    colorCategories: COLOR_CATEGORIES,
    colorButtonShapes: COLOR_BUTTON_SHAPES,
    getCurrentPalette,
    getCategoryPalette
  };
};