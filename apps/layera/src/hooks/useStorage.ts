import { useEffect, useCallback } from 'react';
import { ColorStateActions, ColorState } from './useColorState';
import { saveColorTheme } from '../services/colorThemeService';
import type { LayeraUser } from '@layera/auth-bridge';

/**
 * Storage Management Hook
 *
 * Enterprise-grade hook για διαχείριση persistence (localStorage & Firebase)
 * - Loading αποθηκευμένων settings από localStorage
 * - Saving σε localStorage και Firebase
 * - Error handling και fallback mechanisms
 * - Type-safe storage operations
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

interface SavedThemeState {
  buttonState?: {
    shape: 'rectangular' | 'square' | 'rounded';
  };
  // Backward compatibility - παλιό format
  shape?: 'rectangular' | 'square' | 'rounded';
  colorCategory: 'backgrounds' | 'text' | 'borders';
  primaryColor?: string;
  secondaryColor?: string;
  successColor?: string;
  warningColor?: string;
  dangerColor?: string;
  infoColor?: string;
}

// ThemeData is now just a subset of ColorState for backwards compatibility
interface ThemeData extends Pick<ColorState, 'primaryColor' | 'secondaryColor' | 'successColor' | 'warningColor' | 'dangerColor' | 'infoColor' | 'colorCategory'> {
  shape: 'rectangular' | 'square' | 'rounded';
}

export interface StorageActions {
  loadFromStorage: () => void;
  saveToStorage: (themeData: ThemeData, user?: LayeraUser | null) => Promise<void>;
}

export interface UseStorageReturn {
  actions: StorageActions;
}

interface UseStorageProps {
  colorState: ColorState;
  colorActions: ColorStateActions;
}

/**
 * Hook για διαχείριση storage operations
 */
export const useStorage = ({ colorState, colorActions }: UseStorageProps): UseStorageReturn => {

  /**
   * Φόρτωση αποθηκευμένων settings από localStorage
   */
  const loadFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem('layera-current-theme');
      if (stored) {
        const savedState: SavedThemeState = JSON.parse(stored);

        // Εφαρμογή των αποθηκευμένων χρωμάτων με safe guards
        const buttonShape = savedState.buttonState?.shape || savedState.shape || 'square';

        if (buttonShape && buttonShape !== colorState.colorButtonShape) {
          colorActions.setColorButtonShape(buttonShape);
        }

        if (savedState.colorCategory && savedState.colorCategory !== colorState.colorCategory) {
          colorActions.setColorCategory(savedState.colorCategory);
        }

        // Εφαρμογή χρωμάτων ανάλογα με το σχήμα
        if (buttonShape === 'square') {
          if (savedState.primaryColor) colorActions.updateSquarePalette('primaryColor', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateSquarePalette('secondaryColor', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateSquarePalette('successColor', savedState.successColor);
          if (savedState.warningColor) colorActions.updateSquarePalette('warningColor', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateSquarePalette('dangerColor', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateSquarePalette('infoColor', savedState.infoColor);
        } else if (buttonShape === 'rectangular') {
          if (savedState.primaryColor) colorActions.updateRectangularPalette('primaryColor', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRectangularPalette('secondaryColor', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRectangularPalette('successColor', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRectangularPalette('warningColor', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRectangularPalette('dangerColor', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRectangularPalette('infoColor', savedState.infoColor);
        } else if (buttonShape === 'rounded') {
          if (savedState.primaryColor) colorActions.updateRoundedPalette('primaryColor', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRoundedPalette('secondaryColor', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRoundedPalette('successColor', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRoundedPalette('warningColor', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRoundedPalette('dangerColor', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRoundedPalette('infoColor', savedState.infoColor);
        }
      }
    } catch (error) {
      // PRODUCTION ERROR HANDLING - No console logs
    }
  }, []);

  /**
   * Αποθήκευση theme σε localStorage και Firebase
   */
  const saveToStorage = async (themeData: ThemeData, user?: LayeraUser | null) => {
    // Αποθήκευση στο localStorage για γρήγορη φόρτωση
    try {
      localStorage.setItem('layera-current-theme', JSON.stringify(themeData));
    } catch (error) {
      // localStorage error handled silently
    }

    // Αποθήκευση στο Firebase (μόνο αν είναι διαθέσιμο)
    const hasRealFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY &&
                                 import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key';

    if (hasRealFirebaseConfig) {
      try {
        await saveColorTheme(themeData, user ?? undefined, `${themeData.colorCategory}-theme-${Date.now()}`);
      } catch (error) {
        // Firebase error handled silently
      }
    }
  };

  // Auto-load on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  const actions: StorageActions = {
    loadFromStorage,
    saveToStorage
  };

  return {
    actions
  };
};