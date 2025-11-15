import { ColorState, ColorStateActions, ColorPalette } from './useColorState';

/**
 * Color Helpers Hook
 *
 * Enterprise-grade hook για utility functions σχετικά με colors
 * - Current colors getter (proxy για getCurrentPalette)
 * - Current setters με shape-based routing
 * - Computed values για current colors και setters
 * - Type-safe color operations
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

interface ColorSetters {
  setPrimary: (value: string) => void;
  setSecondary: (value: string) => void;
  setSuccess: (value: string) => void;
  setWarning: (value: string) => void;
  setDanger: (value: string) => void;
  setInfo: (value: string) => void;
}

interface CategorySpecificColors {
  buttons: ColorPalette;
  backgrounds: ColorPalette;
  text: ColorPalette;
  borders: ColorPalette;
}

interface CategorySpecificSetters {
  buttons: ColorSetters;
  backgrounds: ColorSetters;
  text: ColorSetters;
  borders: ColorSetters;
}

export interface ColorHelpersActions {
  getCurrentColors: () => ColorPalette;
  getCurrentSetters: () => ColorSetters;
  getColorsForCategory: (category: string) => ColorPalette;
  getSettersForCategory: (category: string) => ColorSetters;
  getAllCategoryColors: () => CategorySpecificColors;
  getAllCategorySetters: () => CategorySpecificSetters;
}

export interface UseColorHelpersReturn {
  actions: ColorHelpersActions;
  currentColors: ColorPalette;
  currentSetters: ColorSetters;
  categoryColors: CategorySpecificColors;
  categorySetters: CategorySpecificSetters;
}

interface UseColorHelpersProps {
  colorState: ColorState;
  colorActions: ColorStateActions;
  getCurrentPalette: () => ColorPalette;
}

/**
 * Hook για διαχείριση color helper functions
 */
export const useColorHelpers = ({
  colorState,
  colorActions,
  getCurrentPalette
}: UseColorHelpersProps): UseColorHelpersReturn => {

  /**
   * Gets the current color palette based on selected button shape
   * @returns Color object with primary, secondary, success, warning, danger, info
   */
  const getCurrentColors = (): ColorPalette => {
    return getCurrentPalette();
  };

  /**
   * Gets the appropriate setters based on current shape selection
   */
  const getCurrentSetters = (): ColorSetters => {
    switch (colorState.colorButtonShape) {
      case 'rectangular':
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('success', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('info', value)
        };
      case 'square':
        return {
          setPrimary: (value: string) => colorActions.updateSquarePalette('primary', value),
          setSecondary: (value: string) => colorActions.updateSquarePalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateSquarePalette('success', value),
          setWarning: (value: string) => colorActions.updateSquarePalette('warning', value),
          setDanger: (value: string) => colorActions.updateSquarePalette('danger', value),
          setInfo: (value: string) => colorActions.updateSquarePalette('info', value)
        };
      case 'rounded':
        return {
          setPrimary: (value: string) => colorActions.updateRoundedPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRoundedPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRoundedPalette('success', value),
          setWarning: (value: string) => colorActions.updateRoundedPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRoundedPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRoundedPalette('info', value)
        };
      default:
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('success', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('info', value)
        };
    }
  };

  // Computed values
  const currentColors = getCurrentColors();
  const currentSetters = getCurrentSetters();

  const actions: ColorHelpersActions = {
    getCurrentColors,
    getCurrentSetters
  };

  return {
    actions,
    currentColors,
    currentSetters
  };
};