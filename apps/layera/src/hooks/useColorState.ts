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

export interface ColorState {
  colorCategory: ColorCategory;
  colorButtonShape: ColorButtonShape;
  rectangularPalette: ColorPalette;
  squarePalette: ColorPalette;
  roundedPalette: ColorPalette;
}

export interface ColorStateActions {
  setColorCategory: (category: ColorCategory) => void;
  setColorButtonShape: (shape: ColorButtonShape) => void;
  updateRectangularPalette: (key: keyof ColorPalette, value: string) => void;
  updateSquarePalette: (key: keyof ColorPalette, value: string) => void;
  updateRoundedPalette: (key: keyof ColorPalette, value: string) => void;
  resetToDefaults: () => void;
}

export interface UseColorStateReturn {
  state: ColorState;
  actions: ColorStateActions;
  colorCategories: readonly ColorCategory[];
  colorButtonShapes: readonly ColorButtonShape[];
  getCurrentPalette: () => ColorPalette;
}

const DEFAULT_RECTANGULAR_PALETTE: ColorPalette = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8'
};

const DEFAULT_SQUARE_PALETTE: ColorPalette = {
  primary: '#FF4444',
  secondary: '#44FF44',
  success: '#4444FF',
  warning: '#FFAA00',
  danger: '#AA00FF',
  info: '#00AAFF'
};

const DEFAULT_ROUNDED_PALETTE: ColorPalette = {
  primary: '#800080',
  secondary: '#008080',
  success: '#808000',
  warning: '#FFA500',
  danger: '#FF6347',
  info: '#4169E1'
};

const DEFAULT_COLOR_STATE: ColorState = {
  colorCategory: 'buttons',
  colorButtonShape: 'square',
  rectangularPalette: DEFAULT_RECTANGULAR_PALETTE,
  squarePalette: DEFAULT_SQUARE_PALETTE,
  roundedPalette: DEFAULT_ROUNDED_PALETTE
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

  return {
    state,
    actions,
    colorCategories: COLOR_CATEGORIES,
    colorButtonShapes: COLOR_BUTTON_SHAPES,
    getCurrentPalette
  };
};