/**
 * Enterprise Navigation Hook
 *
 * Clean interface για React components
 * που αποκρύπτει την πολυπλοκότητα του NavigationService.
 */

import { useCallback, useEffect, useState } from 'react';
import { NavigationService } from '../NavigationService';
import { NavigationState, Category } from '../types';

// Singleton instance για consistency
let navigationServiceInstance: NavigationService | null = null;

function getNavigationService(): NavigationService {
  if (!navigationServiceInstance) {
    navigationServiceInstance = new NavigationService();
  }
  return navigationServiceInstance;
}

export interface UseNavigationReturn {
  // Current state
  currentStep: string;
  stepIndex: number;
  selectedCategory: Category | null;
  totalSteps: number;
  canGoBack: boolean;
  canGoNext: boolean;
  isLoading: boolean;

  // Actions
  selectCategory: (category: Category) => Promise<void>;
  goBack: () => Promise<void>;
  goNext: () => Promise<void>;
  reset: () => void;

  // State
  navigationState: NavigationState;
}

export const useNavigation = (): UseNavigationReturn => {
  const navigationService = getNavigationService();

  // Local state to trigger re-renders
  const [navigationState, setNavigationState] = useState<NavigationState>(
    navigationService.getState()
  );

  // Subscribe to navigation state changes
  useEffect(() => {
    const updateState = () => {
      setNavigationState(navigationService.getState());
    };

    // For now, we'll use polling. In a real enterprise app,
    // we'd use an event emitter or observable pattern.
    const interval = setInterval(updateState, 100);

    return () => clearInterval(interval);
  }, [navigationService]);

  // Memoized action callbacks
  const selectCategory = useCallback(async (category: Category) => {
    try {
      await navigationService.selectCategory(category);
      setNavigationState(navigationService.getState());
    } catch (error) {
      console.error('Category selection failed:', error);
      // In a real app, we'd show user-friendly error messages
      throw error;
    }
  }, [navigationService]);

  const goBack = useCallback(async () => {
    try {
      await navigationService.goBack();
      setNavigationState(navigationService.getState());
    } catch (error) {
      console.error('Go back failed:', error);
      throw error;
    }
  }, [navigationService]);

  const goNext = useCallback(async () => {
    try {
      await navigationService.goNext();
      setNavigationState(navigationService.getState());
    } catch (error) {
      console.error('Go next failed:', error);
      throw error;
    }
  }, [navigationService]);

  const reset = useCallback(() => {
    navigationService.reset();
    setNavigationState(navigationService.getState());
  }, [navigationService]);

  return {
    // Current state
    currentStep: navigationState.currentStepId,
    stepIndex: navigationState.stepIndex,
    selectedCategory: navigationState.selectedCategory,
    totalSteps: navigationState.totalSteps,
    canGoBack: navigationState.canGoPrevious,
    canGoNext: navigationState.canGoNext,
    isLoading: navigationState.isLoading,

    // Actions
    selectCategory,
    goBack,
    goNext,
    reset,

    // Full state for advanced usage
    navigationState
  };
};