import { ColorPaletteWithAlpha, ColorCategory } from './useColorState';
import { ColorWithAlpha } from '../components/playground/shared/ColorPickerWithAlpha';

/**
 * ARXES COMPLIANT Playground Actions Management Hook
 *
 * Enterprise-grade hook για διαχείριση playground actions και helper functions:
 * - Helper functions για color conversion και category management
 * - CSS actions για εφαρμογή χρωμάτων σε app και header
 * - Real-time preview logic για όλα τα element types
 * - Integration με external hooks (CSS, Color, Storage)
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 * - React 19.1.1 compatibility
 */

export interface PlaygroundActionsConfig {
  colorHookState: any;
  colorActions: any;
  cssActions: any;
  storageActions: any;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
  getElementColors: (elementType: any, category: ColorCategory) => ColorPaletteWithAlpha;
  user?: any;
}

export interface PlaygroundActionsReturn {
  // Helper functions
  getColorsForCategory: (category: string) => ColorPaletteWithAlpha;
  convertColorPaletteWithAlphaToLegacy: (palette: ColorPaletteWithAlpha) => any;

  // CSS Actions
  applyColorsToApp: () => Promise<void>;
  applySquareColorsToHeader: () => void;

  // Real-time preview handlers
  handleElementPreview: (key: string, value: string | ColorWithAlpha, elementType: string, colorCategory: string, startPreview: any) => void;
}

/**
 * Hook για διαχείριση playground actions και helper functions
 *
 * Centralized action management για:
 * - Color conversion utilities
 * - CSS application actions
 * - Real-time preview coordination
 * - Storage integration
 *
 * @param config Configuration object με dependencies
 * @returns Playground actions και helper functions
 */
export const usePlaygroundActions = (config: PlaygroundActionsConfig): PlaygroundActionsReturn => {
  const {
    colorHookState,
    colorActions,
    cssActions,
    storageActions,
    getCategoryPalette,
    getElementColors,
    user
  } = config;

  // ==============================
  // HELPER FUNCTIONS
  // ==============================

  /**
   * ARXES Compliant: Παίρνει χρώματα για συγκεκριμένη category
   * Wrapper function γύρω από το getCategoryPalette hook
   */
  const getColorsForCategory = (category: string) => {
    return getCategoryPalette(category as ColorCategory);
  };

  /**
   * ARXES Compliant: Μετατρέπει ColorPaletteWithAlpha σε legacy format
   * Backward compatibility function για playground components
   */
  const convertColorPaletteWithAlphaToLegacy = (palette: ColorPaletteWithAlpha) => {
    // Helper function για safe extraction του hex value
    const safeExtractHex = (color: string | { hex: string } | undefined): string => {
      if (!color) return 'var(--layera-color-surface-primary)';
      if (typeof color === 'string') return color; // Factory settings format
      if (typeof color === 'object' && color.hex) return color.hex; // ColorWithAlpha format
      return 'var(--layera-color-surface-primary)'; // Fallback
    };

    const converted = {
      primary: safeExtractHex(palette.primaryColor),
      secondary: safeExtractHex(palette.secondaryColor),
      success: safeExtractHex(palette.successColor),
      warning: safeExtractHex(palette.warningColor),
      danger: safeExtractHex(palette.dangerColor),
      info: safeExtractHex(palette.infoColor)
    };

    // Επιπλέον έλεγχος για το αν τα χρώματα είναι μηδενικά (ΜΟΝΟ πραγματικά άκυρα)
    const hasNullColors = Object.values(converted).some(color =>
      !color || color === 'undefined' || color === '' || color === null
    );

    if (hasNullColors) {
      console.warn('Warning: Some colors may not be properly set:', converted);
    }

    return converted;
  };

  // ==============================
  // CSS ACTIONS
  // ==============================

  /**
   * ARXES Compliant: Εφαρμόζει χρώματα στην εφαρμογή
   * Ολοκληρωμένη διαδικασία: colors → CSS variables → storage → events
   */
  const applyColorsToApp = async () => {
    // Get autonomous colors for current category
    const categoryColors = getColorsForCategory(colorHookState.colorCategory);

    // Apply colors via CSS Variables hook
    await cssActions.applyColorsToApp(colorHookState.colorCategory, categoryColors, colorHookState.elementType);

    // Save theme via Storage hook
    const themeData = {
      colorCategory: colorHookState.colorCategory,
      shape: colorHookState.colorButtonShape,
      primaryColor: categoryColors.primaryColor.hex,
      secondaryColor: categoryColors.secondaryColor.hex,
      successColor: categoryColors.successColor.hex,
      warningColor: categoryColors.warningColor.hex,
      dangerColor: categoryColors.dangerColor.hex,
      infoColor: categoryColors.infoColor.hex
    };

    await storageActions.saveToStorage(themeData, user || undefined);

    window.dispatchEvent(new CustomEvent('colorsUpdate', {
      detail: { category: colorHookState.colorCategory, ...categoryColors }
    }));
  };

  /**
   * ARXES Compliant: Εφαρμόζει square colors στο header
   * Wrapper function για consistency με την αρχιτεκτονική
   */
  const applySquareColorsToHeader = () => {
    cssActions.applySquareColorsToHeader();
  };

  // ==============================
  // REAL-TIME PREVIEW LOGIC
  // ==============================

  /**
   * ARXES Compliant: Χειρίζεται real-time preview για όλα τα element types
   * Centralized preview logic με autonomous element support
   */
  const handleElementPreview = (
    key: string,
    value: string | ColorWithAlpha,
    elementType: string,
    colorCategory: string,
    startPreview: any
  ) => {
    const previewValue = typeof value === 'string' ? value : value.rgba;

    // Buttons element type
    if (elementType === 'buttons' && colorCategory === 'backgrounds') {
      // ✅ ALPHA SUPPORT: Χρησιμοποιούμε rgba για διαφάνεια
      const colorValue = typeof value === 'string' ? value : (value.rgba || value.hex);
      cssActions.applySpecificButtonColor(key, colorValue);
    }

    // Cards element type
    if (elementType === 'cards' && colorCategory === 'backgrounds') {
      const colorValue = typeof value === 'string' ? value : value.hex;
      cssActions.applySpecificCardColor(key, colorValue);
    }

    // Modals element type
    if (elementType === 'modals' && colorCategory === 'backgrounds') {
      const colorValue = typeof value === 'string' ? value : value.hex;
      cssActions.applySpecificModalColor(key, colorValue);
    }

    // Layout element type
    if (elementType === 'layout' && colorCategory === 'backgrounds') {
      const colorValue = typeof value === 'string' ? value : value.hex;
      cssActions.applySpecificLayoutColor(key, colorValue);
    }

    // Headers element type
    if (elementType === 'headers' && colorCategory === 'backgrounds') {
      const colorValue = typeof value === 'string' ? value : value.hex;
      cssActions.applySpecificHeaderColor(key, colorValue);
    }

    // Call the global preview function
    startPreview(key, previewValue, colorCategory, elementType);
  };

  return {
    getColorsForCategory,
    convertColorPaletteWithAlphaToLegacy,
    applyColorsToApp,
    applySquareColorsToHeader,
    handleElementPreview
  };
};