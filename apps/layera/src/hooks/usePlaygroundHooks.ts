import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from './useRealTimePreview';
import { useButtonState } from './useButtonState';
import { useColorState } from './useColorState';
import { useCSSVariables } from './useCSSVariables';
import { useStorage } from './useStorage';
import { usePlaygroundState } from './usePlaygroundState';
import { usePlaygroundActions } from './usePlaygroundActions';

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
  user?: any;

  // Button Management
  buttonState: any;
  buttonActions: any;
  buttonSizes: any;

  // Color Management
  colorHookState: any;
  colorActions: any;
  getCategoryPalette: (category: any) => any;
  getElementColors: (elementType: any, category: any) => any;

  // CSS Variables Management
  cssActions: any;

  // Storage Management
  storageActions: any;

  // Playground State Management
  playgroundActions: any;
  borderWidth: number;
  fontSize: any;
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
  cardSize: any;
  modalSize: any;
  inputSize: any;
  tableSize: any;
  modalTextAlign: any;

  // Playground Actions Management
  getColorsForCategory: (category: string) => any;
  convertColorPaletteWithAlphaToLegacy: (palette: any) => any;
  applyColorsToApp: () => Promise<void>;
  applySquareColorsToHeader: () => void;
  handleElementPreview: (key: string, value: string | any, elementType: string, colorCategory: string, startPreview: any) => void;

  // Real-time Preview
  startPreview: any;
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