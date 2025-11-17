import { ColorState, ColorStateActions, ColorPaletteWithAlpha, ColorCategory, CategoryColorPalettes } from './useColorState';

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
  backgrounds: ColorPaletteWithAlpha;
  text: ColorPaletteWithAlpha;
  borders: ColorPaletteWithAlpha;
}

interface CategorySpecificSetters {
  backgrounds: ColorSetters;
  text: ColorSetters;
  borders: ColorSetters;
}

export interface ColorHelpersActions {
  getCurrentColors: () => ColorPaletteWithAlpha;
  getCurrentSetters: () => ColorSetters;
  getColorsForCategory: (category: string) => ColorPaletteWithAlpha;
  getSettersForCategory: (category: string) => ColorSetters;
  getAllCategoryColors: () => CategorySpecificColors;
  getAllCategorySetters: () => CategorySpecificSetters;
}

export interface UseColorHelpersReturn {
  actions: ColorHelpersActions;
  currentColors: ColorPaletteWithAlpha;
  currentSetters: ColorSetters;
  categoryColors: CategorySpecificColors;
  categorySetters: CategorySpecificSetters;
}

interface UseColorHelpersProps {
  colorState: ColorState;
  colorActions: ColorStateActions;
  getCurrentPalette: () => ColorPaletteWithAlpha;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
}

/**
 * Hook για διαχείριση color helper functions
 */
export const useColorHelpers = ({
  colorState,
  colorActions,
  getCurrentPalette,
  getCategoryPalette: _getCategoryPalette
}: UseColorHelpersProps): UseColorHelpersReturn => {

  /**
   * Gets the current color palette based on selected button shape
   * @returns Color object with primary, secondary, success, warning, danger, info
   */
  const getCurrentColors = (): ColorPaletteWithAlpha => {
    return getCurrentPalette();
  };

  /**
   * Gets the appropriate setters based on current shape selection
   */
  const getCurrentSetters = (): ColorSetters => {
    switch (colorState.colorButtonShape) {
      case 'rectangular':
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primaryColor', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondaryColor', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('successColor', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warningColor', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('dangerColor', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('infoColor', value)
        };
      case 'square':
        return {
          setPrimary: (value: string) => colorActions.updateSquarePalette('primaryColor', value),
          setSecondary: (value: string) => colorActions.updateSquarePalette('secondaryColor', value),
          setSuccess: (value: string) => colorActions.updateSquarePalette('successColor', value),
          setWarning: (value: string) => colorActions.updateSquarePalette('warningColor', value),
          setDanger: (value: string) => colorActions.updateSquarePalette('dangerColor', value),
          setInfo: (value: string) => colorActions.updateSquarePalette('infoColor', value)
        };
      case 'rounded':
        return {
          setPrimary: (value: string) => colorActions.updateRoundedPalette('primaryColor', value),
          setSecondary: (value: string) => colorActions.updateRoundedPalette('secondaryColor', value),
          setSuccess: (value: string) => colorActions.updateRoundedPalette('successColor', value),
          setWarning: (value: string) => colorActions.updateRoundedPalette('warningColor', value),
          setDanger: (value: string) => colorActions.updateRoundedPalette('dangerColor', value),
          setInfo: (value: string) => colorActions.updateRoundedPalette('infoColor', value)
        };
      default:
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primaryColor', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondaryColor', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('successColor', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warningColor', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('dangerColor', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('infoColor', value)
        };
    }
  };

  /**
   * Gets colors for a specific category (autonomous color system)
   * ENTERPRISE FIX: Proper handling για 'buttons' category
   */
  const getColorsForCategory = (category: string): ColorPaletteWithAlpha => {
    // SPECIAL CASE: Buttons category uses shape-specific palettes
    if (category === 'buttons') {
      return getCurrentPalette(); // Returns the current button shape palette
    }

    // Standard categories: backgrounds, text, borders
    const palette = colorState.categoryPalettes[category as ColorCategory];
    if (!palette) {
      // Fallback to current colors if category palette doesn't exist
      return getCurrentPalette();
    }
    return palette;
  };

  /**
   * Gets setters for a specific category (autonomous color system)
   */
  const getSettersForCategory = (category: string): ColorSetters => {
    return {
      setPrimary: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'primaryColor', value),
      setSecondary: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'secondaryColor', value),
      setSuccess: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'successColor', value),
      setWarning: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'warningColor', value),
      setDanger: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'dangerColor', value),
      setInfo: (value: string) => colorActions.updateCategoryPalette(category as ColorCategory, 'infoColor', value)
    };
  };

  /**
   * Gets all category-specific colors
   */
  const getAllCategoryColors = (): CategorySpecificColors => {
    return colorState.categoryPalettes;
  };

  /**
   * Gets all category-specific setters
   */
  const getAllCategorySetters = (): CategorySpecificSetters => {
    return {
      backgrounds: getSettersForCategory('backgrounds'),
      text: getSettersForCategory('text'),
      borders: getSettersForCategory('borders')
    };
  };

  // Computed values
  const currentColors = getCurrentColors();
  const currentSetters = getCurrentSetters();
  const categoryColors = getAllCategoryColors();
  const categorySetters = getAllCategorySetters();

  const actions: ColorHelpersActions = {
    getCurrentColors,
    getCurrentSetters,
    getColorsForCategory,
    getSettersForCategory,
    getAllCategoryColors,
    getAllCategorySetters
  };

  return {
    actions,
    currentColors,
    currentSetters,
    categoryColors,
    categorySetters
  };
};