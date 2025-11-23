import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from './useRealTimePreview';
import { useButtonState, type ButtonState, type ButtonStateActions } from './useButtonState';
import { useColorState, type ColorState, type ColorStateActions, type ColorCategory, type ElementType, type ColorPaletteWithAlpha, type ColorWithAlpha } from './useColorState';
import { useCSSVariables, type CSSVariablesActions } from './useCSSVariables';
import { useStorage, type StorageActions } from './useStorage';
import { usePlaygroundState, type PlaygroundStateActions } from './usePlaygroundState';
import { usePlaygroundActions } from './usePlaygroundActions';
import type { BaseSize } from '../types/sizes';

/**
 * ARXES COMPLIANT Centralized Playground Hooks Management Hook
 *
 * Enterprise-grade hook για consolidation όλων των playground hooks:
 * - Authentication management
 * - Button state management
 * - Color state management
 * - CSS variables management
 * - Storage management
 * - Playground state management
 * - Playground actions management
 * - Real-time preview management
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 * - React 19.1.1 compatibility
 */

export interface PlaygroundHooksReturn {
  // Authentication
  user?: unknown;

  // Button Management
  buttonState: ButtonState;
  buttonActions: ButtonStateActions;
  buttonSizes: readonly BaseSize[];

  // Color Management
  colorHookState: ColorState;
  colorActions: ColorStateActions;
  getCategoryPalette: (category: ColorCategory) => ColorPaletteWithAlpha;
  getElementColors: (elementType: ElementType, category: ColorCategory) => ColorPaletteWithAlpha;

  // CSS Variables Management
  cssActions: CSSVariablesActions;

  // Storage Management
  storageActions: StorageActions;

  // Playground State Management
  playgroundActions: PlaygroundStateActions;
  borderWidth: number;
  fontSize: string;
  alphaEnabled: boolean;
  borderRadius: string;
  buttonRadius: string;
  layoutRadius: string;
  cardRadius: string;
  modalRadius: string;
  inputRadius: string;
  tableRadius: string;
  headerRadius: string;
  hoverEffect: string;
  activeEffect: string;
  cardSize: string;
  modalSize: string;
  inputSize: string;
  tableSize: string;
  modalTextAlign: string;

  // Playground Actions Management
  getColorsForCategory: (category: string) => ColorPaletteWithAlpha;
  convertColorPaletteWithAlphaToLegacy: (palette: ColorPaletteWithAlpha) => Record<string, string>;
  applyColorsToApp: () => Promise<void>;
  applySquareColorsToHeader: () => void;
  handleElementPreview: (key: string, value: string | ColorWithAlpha, elementType: ElementType, colorCategory: ColorCategory, startPreview: (key: string, value: string) => void) => void;

  // Real-time Preview
  startPreview: (key: string, value: string) => void;
}

/**
 * Hook για centralized management όλων των playground hooks
 *
 * Consolidates όλη την hook logic σε ένα μόνο hook για:
 * - Clean component code
 * - Εύκολη διαχείριση dependencies
 * - Centralized hook orchestration
 * - Better testing και debugging
 *
 * @returns Ολοκληρωμένο playground hooks state και actions
 */
export const usePlaygroundHooks = (): PlaygroundHooksReturn => {
  // ==============================
  // AUTHENTICATION
  // ==============================

  const { user } = useAuth();

  // ==============================
  // CORE HOOKS INTEGRATION
  // ==============================

  // Button State Management
  const { state: buttonState, actions: buttonActions, sizes: buttonSizes } = useButtonState();

  // Color State Management
  const { state: colorHookState, actions: colorActions, getCategoryPalette, getElementColors } = useColorState();

  // CSS Variables Management
  const { actions: cssActions } = useCSSVariables();

  // Storage Management
  const { actions: storageActions } = useStorage({ colorState: colorHookState, colorActions });

  // Playground State Management
  const {
    actions: playgroundActions,
    borderWidth,
    fontSize,
    alphaEnabled,
    borderRadius,
    buttonRadius,
    layoutRadius,
    cardRadius,
    modalRadius,
    inputRadius,
    tableRadius,
    headerRadius,
    hoverEffect,
    activeEffect,
    cardSize,
    modalSize,
    inputSize,
    tableSize,
    modalTextAlign
  } = usePlaygroundState();

  // Playground Actions Management
  const {
    getColorsForCategory,
    convertColorPaletteWithAlphaToLegacy,
    applyColorsToApp,
    applySquareColorsToHeader,
    handleElementPreview
  } = usePlaygroundActions({
    colorHookState,
    colorActions,
    cssActions,
    storageActions,
    getCategoryPalette,
    getElementColors,
    user
  });

  // Real-time preview hook for header buttons
  const { startPreview } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      // ✅ ΑΠΟΦΥΓΗ OVERRIDE: ΔΕΝ κάνουμε commit όταν είμαστε σε alpha preview mode
      // Διατηρούμε τις RGBA τιμές στα CSS variables χωρίς επαναφορά
      if (colorHookState?.elementType === 'buttons' && colorHookState?.colorCategory === 'backgrounds') {
        return; // ΔΕΝ καλούμε updateSquarePalette που επαναφέρει defaults
      }

      // Update the actual color state when preview is committed
      // ΜΟΝΟ για buttons category επηρεάζει τα header buttons (legacy behavior)
      if (key === 'buttonsSecondaryColor') {
        colorActions.updateSquarePalette('secondaryColor', value);
      }
    },
    debounceMs: 100
  });

  return {
    // Authentication
    user,

    // Button Management
    buttonState,
    buttonActions,
    buttonSizes,

    // Color Management
    colorHookState,
    colorActions,
    getCategoryPalette,
    getElementColors,

    // CSS Variables Management
    cssActions,

    // Storage Management
    storageActions,

    // Playground State Management
    playgroundActions,
    borderWidth,
    fontSize,
    alphaEnabled,
    borderRadius,
    buttonRadius,
    layoutRadius,
    cardRadius,
    modalRadius,
    inputRadius,
    tableRadius,
    headerRadius,
    hoverEffect,
    activeEffect,
    cardSize,
    modalSize,
    inputSize,
    tableSize,
    modalTextAlign,

    // Playground Actions Management
    getColorsForCategory,
    convertColorPaletteWithAlphaToLegacy,
    applyColorsToApp,
    applySquareColorsToHeader,
    handleElementPreview,

    // Real-time Preview
    startPreview
  };
};