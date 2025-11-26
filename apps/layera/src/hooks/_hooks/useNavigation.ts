import { useState } from 'react';

/**
 * Navigation Management Hook
 *
 * Enterprise-grade hook για διαχείριση navigation state
 * - Active section management (buttons, colors, tokens)
 * - Section switching logic
 * - Type-safe section handling
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

export type NavigationSection = 'buttons' | 'colors' | 'tokens';

export interface NavigationState {
  activeSection: NavigationSection;
}

export interface NavigationActions {
  setActiveSection: (section: NavigationSection) => void;
  goToButtons: () => void;
  goToColors: () => void;
  goToTokens: () => void;
}

export interface UseNavigationReturn {
  state: NavigationState;
  actions: NavigationActions;
  availableSections: readonly NavigationSection[];
}

const DEFAULT_NAVIGATION_STATE: NavigationState = {
  activeSection: 'buttons'
};

const AVAILABLE_SECTIONS: readonly NavigationSection[] = [
  'buttons', 'colors', 'tokens'
] as const;

/**
 * Hook για διαχείριση navigation state
 */
export const useNavigation = (): UseNavigationReturn => {
  const [state, setState] = useState<NavigationState>(DEFAULT_NAVIGATION_STATE);

  const actions: NavigationActions = {
    setActiveSection: (section: NavigationSection) => {
      setState(prev => ({ ...prev, activeSection: section }));
    },

    goToButtons: () => {
      setState(prev => ({ ...prev, activeSection: 'buttons' }));
    },

    goToColors: () => {
      setState(prev => ({ ...prev, activeSection: 'colors' }));
    },

    goToTokens: () => {
      setState(prev => ({ ...prev, activeSection: 'tokens' }));
    }
  };

  return {
    state,
    actions,
    availableSections: AVAILABLE_SECTIONS
  };
};