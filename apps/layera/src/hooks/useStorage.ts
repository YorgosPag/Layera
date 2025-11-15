import { useEffect, useCallback } from 'react';
import { ColorStateActions, ColorState } from './useColorState';
import { saveColorTheme } from '../services/colorThemeService';

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
  buttonState: {
    shape: 'rectangular' | 'square' | 'rounded';
  };
  colorCategory: 'buttons' | 'backgrounds' | 'text' | 'borders';
  primaryColor?: string;
  secondaryColor?: string;
  successColor?: string;
  warningColor?: string;
  dangerColor?: string;
  infoColor?: string;
}

interface ThemeData {
  colorCategory: 'buttons' | 'backgrounds' | 'text' | 'borders';
  shape: 'rectangular' | 'square' | 'rounded';
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
  infoColor: string;
}

export interface StorageActions {
  loadFromStorage: () => void;
  saveToStorage: (themeData: ThemeData, user?: object) => Promise<void>;
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

        // Εφαρμογή των αποθηκευμένων χρωμάτων
        if (savedState.buttonState.shape && savedState.buttonState.shape !== colorState.colorButtonShape) {
          colorActions.setColorButtonShape(savedState.buttonState.shape);
        }

        if (savedState.colorCategory && savedState.colorCategory !== colorState.colorCategory) {
          colorActions.setColorCategory(savedState.colorCategory);
        }

        // Εφαρμογή χρωμάτων ανάλογα με το σχήμα
        if (savedState.buttonState.shape === 'square') {
          if (savedState.primaryColor) colorActions.updateSquarePalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateSquarePalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateSquarePalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateSquarePalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateSquarePalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateSquarePalette('info', savedState.infoColor);
        } else if (savedState.buttonState.shape === 'rectangular') {
          if (savedState.primaryColor) colorActions.updateRectangularPalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRectangularPalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRectangularPalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRectangularPalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRectangularPalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRectangularPalette('info', savedState.infoColor);
        } else if (savedState.buttonState.shape === 'rounded') {
          if (savedState.primaryColor) colorActions.updateRoundedPalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRoundedPalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRoundedPalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRoundedPalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRoundedPalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRoundedPalette('info', savedState.infoColor);
        }
      }
    } catch (error) {
      console.error('WARNING:Σφάλμα φόρτωσης χρωμάτων:', error);
    }
  }, [colorState.colorButtonShape, colorState.colorCategory, colorActions]);

  /**
   * Αποθήκευση theme σε localStorage και Firebase
   */
  const saveToStorage = async (themeData: ThemeData, user?: object) => {
    // Αποθήκευση στο localStorage για γρήγορη φόρτωση
    try {
      localStorage.setItem('layera-current-theme', JSON.stringify(themeData));
    } catch (error) {
      console.warn('WARNING:Σφάλμα αποθήκευσης στο localStorage:', error);
    }

    // Αποθήκευση στο Firebase (μόνο αν είναι διαθέσιμο)
    const hasRealFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY &&
                                 import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key';

    if (hasRealFirebaseConfig) {
      try {
        const themeId = await saveColorTheme(themeData, user || undefined, `${themeData.colorCategory}-theme-${Date.now()}`);
        console.log('Theme saved to Firebase with ID:', themeId);
      } catch (error) {
        console.error('WARNING:Σφάλμα αποθήκευσης στο Firebase:', error);
      }
    } else {
      // Firebase disabled (demo credentials), χρησιμοποιούμε μόνο localStorage
      console.log('Firebase disabled, using localStorage only');
    }
  };

  // Auto-load on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const actions: StorageActions = {
    loadFromStorage,
    saveToStorage
  };

  return {
    actions
  };
};