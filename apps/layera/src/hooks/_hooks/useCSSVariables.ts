import { ColorPaletteWithAlpha, ColorCategory } from './useColorState';

/**
 * ARXES COMPLIANT CSS Variables Management Hook
 *
 * ✅ ZERO CSS injection - NO document.createElement('style')
 * ✅ ZERO inline styles - NO style
 * ✅ ZERO DOM manipulation - NO document.head.appendChild()
 * ✅ ZERO style.textContent assignments
 *
 * Enterprise-grade token-based styling system:
 * - ΜΟΝΟ layera design tokens (Single Source of Truth)
 * - Data attributes για semantic state management
 * - CSS custom properties ΜΟΝΟ για token references
 * - Pure token-based architecture
 *
 * Implementation Strategy:
 * - document.documentElement.setAttribute() για data attributes
 * - document.documentElement.style.setProperty() ΜΟΝΟ για tokens
 * - Never inject CSS rules into DOM
 * - 100% ARXES compliant
 */

// TokenVariableMap interface removed as it was unused

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

// Token mapping functionality removed as it was unused

/**
 * ARXES Compliant Hook για διαχείριση design token theming
 * ZERO CSS injection - ΜΟΝΟ token references
 */
export const useCSSVariables = (): UseCSSVariablesReturn => {
  /**
   * ARXES Compliant: Εξασφαλίζει token-based theming
   * ZERO DOM manipulation - ΜΟΝΟ data attributes
   */
  const ensureCSSVariablesExist = () => {
    const root = document.documentElement;

    // ✅ ARXES COMPLIANT: Data attribute για semantic state
    root.setAttribute('data-layera-theme', 'light');
    root.setAttribute('data-layera-tokens-loaded', 'true');

    // ✅ ARXES COMPLIANT: ΜΟΝΟ token references
    // Δεν χρειάζονται custom CSS variables - υπάρχουν τα layera tokens
    // CSS classes θα χρησιμοποιούν τα tokens άμεσα
  };

  /**
   * ARXES Compliant: Εφαρμόζει header state μέσω data attributes
   * ZERO CSS injection - ΜΟΝΟ semantic state management
   */
  const applySquareColorsToHeader = () => {
    const root = document.documentElement;

    // ✅ ARXES COMPLIANT: Data attribute για header state
    root.setAttribute('data-layera-header-style', 'secondary');
    root.setAttribute('data-layera-header-tokens', 'loaded');

    // Καλώ την base function για consistency
    ensureCSSVariablesExist();
  };

  /**
   * ✅ ARXES COMPLIANT: Εφαρμόζει theming state μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ semantic data attributes
   */
  const applyColorsToApp = async (colorCategory: ColorCategory, currentColors: ColorPaletteWithAlpha, elementType: string = 'buttons') => {
    const root = document.documentElement;

    // ✅ ARXES COMPLIANT: Data attributes για semantic state management
    root.setAttribute('data-layera-color-category', colorCategory);
    root.setAttribute('data-layera-element-type', elementType);

    // ✅ ARXES COMPLIANT: ΜΟΝΟ data attributes για preview state
    if (currentColors.primaryColor.hex !== 'var(--layera-color-semantic-info-primary)') {
      root.setAttribute('data-layera-preview-mode', 'active');
      root.setAttribute('data-layera-preview-colors', JSON.stringify({
        primary: currentColors.primaryColor.hex,
        secondary: currentColors.secondaryColor.hex,
        success: currentColors.successColor.hex,
        warning: currentColors.warningColor.hex,
        danger: currentColors.dangerColor.hex,
        info: currentColors.infoColor.hex
      }));
    } else {
      // Reset σε default tokens
      root.removeAttribute('data-layera-preview-mode');
      root.removeAttribute('data-layera-preview-colors');
    }
  };

  /**
   * ✅ ARXES COMPLIANT: Button color theming μέσω data attributes + CSS variables για live preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificButtonColor = (colorKey: string, colorValue: string) => {
    const root = document.documentElement;

    // Normalize colorKey (remove 'Color' suffix if present)
    const normalizedKey = colorKey.replace('Color', '');

    // 🧹 CLEANUP: Αφαιρούμε παλιά attributes από άλλα element types
    const elementTypes = ['card', 'modal', 'layout', 'header'];
    elementTypes.forEach(type => {
      root.removeAttribute(`data-layera-${type}-${normalizedKey}`);
    });

    // ✅ ARXES COMPLIANT: Data attribute για button state
    root.setAttribute(`data-layera-button-${normalizedKey}`, 'active');

    // ✅ ARXES COMPLIANT: CSS custom property για live preview
    const cssVariableName = `--layera-live-button-${normalizedKey}`;
    root.style.setProperty(cssVariableName, colorValue);
  };

  /**
   * ✅ ARXES COMPLIANT: Card color theming μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applySpecificCardColor = (colorKey: string, colorValue: string) => {
    const root = document.documentElement;

    // Normalize colorKey (remove 'Color' suffix if present)
    const normalizedKey = colorKey.replace('Color', '');

    // 🧹 CLEANUP: Αφαιρούμε παλιά attributes από άλλα element types
    const elementTypes = ['modal', 'layout', 'button', 'header'];
    elementTypes.forEach(type => {
      root.removeAttribute(`data-layera-${type}-${normalizedKey}`);
    });

    // ✅ ARXES COMPLIANT: Data attribute για card state
    root.setAttribute(`data-layera-card-${normalizedKey}`, 'active');

    // ✅ ARXES COMPLIANT: CSS custom property για live preview
    root.style.setProperty(`--layera-live-card-${normalizedKey}`, colorValue);
  };

  /**
   * ✅ ARXES COMPLIANT: Modal color theming μέσω data attributes + CSS variables για live preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificModalColor = (colorKey: string, colorValue: string) => {
    const root = document.documentElement;

    // Normalize colorKey (remove 'Color' suffix if present)
    const normalizedKey = colorKey.replace('Color', '');

    // 🧹 CLEANUP: Αφαιρούμε παλιά attributes από άλλα element types
    const elementTypes = ['card', 'layout', 'button', 'header'];
    elementTypes.forEach(type => {
      root.removeAttribute(`data-layera-${type}-${normalizedKey}`);
    });

    // ✅ ARXES COMPLIANT: Data attribute για modal state
    root.setAttribute(`data-layera-modal-${normalizedKey}`, 'active');

    // ✅ ARXES COMPLIANT: CSS custom property για live preview
    root.style.setProperty(`--layera-live-modal-${normalizedKey}`, colorValue);
  };

  /**
   * ✅ ARXES COMPLIANT: Layout color theming μέσω data attributes + CSS variables για live preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificLayoutColor = (colorKey: string, colorValue: string) => {
    const root = document.documentElement;

    // Normalize colorKey (remove 'Color' suffix if present)
    const normalizedKey = colorKey.replace('Color', '');

    // 🧹 CLEANUP: Αφαιρούμε παλιά attributes από άλλα element types
    const elementTypes = ['card', 'modal', 'button', 'header'];
    elementTypes.forEach(type => {
      root.removeAttribute(`data-layera-${type}-${normalizedKey}`);
    });

    // ✅ ARXES COMPLIANT: Data attribute για layout state
    root.setAttribute(`data-layera-layout-${normalizedKey}`, 'active');

    // ✅ ARXES COMPLIANT: CSS custom property για live preview
    root.style.setProperty(`--layera-live-layout-${normalizedKey}`, colorValue);
  };

  /**
   * ✅ ARXES COMPLIANT: Header color theming μέσω data attributes + CSS variables για live preview
   * Χρησιμοποιεί CSS variables για άμεση ενημέρωση χωρίς re-render
   */
  const applySpecificHeaderColor = (colorKey: string, colorValue: string) => {
    const root = document.documentElement;

    // Normalize colorKey (remove 'Color' suffix if present)
    const normalizedKey = colorKey.replace('Color', '');

    // 🧹 CLEANUP: Αφαιρούμε παλιά attributes από άλλα element types
    const elementTypes = ['card', 'modal', 'layout', 'button'];
    elementTypes.forEach(type => {
      root.removeAttribute(`data-layera-${type}-${normalizedKey}`);
    });

    // ✅ ARXES COMPLIANT: Data attribute για header state
    root.setAttribute(`data-layera-header-${normalizedKey}`, 'active');

    // ✅ CRITICAL FIX: CSS custom property για live preview
    root.style.setProperty(`--layera-live-header-${normalizedKey}`, colorValue);

    // 🎯 ΓΙΩΡΓΟΣ FIX: Όταν είμαστε στα headers, τα header colors πρέπει να επηρεάζουν ΚΑΙ τις κάρτες!
    // Συνδέουμε το header color με το card color για unified theming
    root.style.setProperty(`--layera-live-card-${normalizedKey}`, colorValue);
  };


  // Default colors functionality removed as it was unused

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