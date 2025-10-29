/**
 * useNavigationHandlers.ts - Enterprise React Hook για Navigation Handlers
 *
 * React hook που παρέχει ready-to-use navigation handlers με error handling
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { NavigationHandlersAdapter } from './NavigationHandlersAdapter';
import {
  NavigationHandlerResult,
  NavigationHandlerOptions,
  NavigationActions,
  NavigationState
} from './types';

export interface UseNavigationHandlersConfig {
  navigation: NavigationActions;
  isSpecialDevice?: boolean;
  onCategoryElementsChange?: (show: boolean) => void;
  onNewEntryClick?: () => void;
  options?: NavigationHandlerOptions;
}

export interface UseNavigationHandlersResult extends NavigationHandlerResult {
  // Additional React-specific utilities
  updateSpecialDevice: (isSpecial: boolean) => void;
  refreshHandlers: () => void;
}

export function useNavigationHandlers(
  config: UseNavigationHandlersConfig
): UseNavigationHandlersResult {
  const [showCategoryElements, setShowCategoryElements] = useState(false);
  const [isSpecialDevice, setIsSpecialDevice] = useState(config.isSpecialDevice ?? false);

  // Sync isSpecialDevice with config changes
  useEffect(() => {
    setIsSpecialDevice(config.isSpecialDevice ?? false);
  }, [config.isSpecialDevice]);

  // Create category elements controller
  const categoryElementsController = useMemo(() => ({
    show: (value: boolean) => {
      setShowCategoryElements(value);
      config.onCategoryElementsChange?.(value);
    },
    toggle: () => {
      const newState = !showCategoryElements;
      setShowCategoryElements(newState);
      config.onCategoryElementsChange?.(newState);
    },
    onChange: config.onCategoryElementsChange
  }), [showCategoryElements, config.onCategoryElementsChange]);

  // Create adapter with dependencies
  const adapter = useMemo(() => {
    const dependencies = {
      navigation: config.navigation,
      categoryElements: categoryElementsController,
      isSpecialDevice
    };

    return new NavigationHandlersAdapter(dependencies, config.options);
  }, [config.navigation, categoryElementsController, isSpecialDevice, config.options]);

  // Create handlers from adapter
  const handlers = useMemo(() => {
    const adapterHandlers = adapter.createHandlers();

    // Override handleNewEntryClick to support external callback
    const originalHandleNewEntryClick = adapterHandlers.handleNewEntryClick;
    const enhancedHandleNewEntryClick = (): void => {
      if (isSpecialDevice) {
        // Special device: use ONLY adapter logic (stepper/category elements)
        originalHandleNewEntryClick();
      } else {
        // Standard device: delegate to external handler (unified pipeline)
        config.onNewEntryClick?.();
      }
    };

    return {
      ...adapterHandlers,
      handleNewEntryClick: enhancedHandleNewEntryClick
    };
  }, [adapter, isSpecialDevice, config.onNewEntryClick]);

  // React-specific utilities
  const updateSpecialDevice = useCallback((isSpecial: boolean) => {
    setIsSpecialDevice(isSpecial);
  }, []);

  const refreshHandlers = useCallback(() => {
    // Force re-creation of handlers by updating adapter dependencies
    adapter.updateDependencies({
      categoryElements: categoryElementsController,
      isSpecialDevice
    });
  }, [adapter, categoryElementsController, isSpecialDevice]);

  // Create reactive state
  const state: NavigationState = {
    showCategoryElements,
    isNavigating: false, // This could be enhanced to track real navigation state
    lastError: null     // This could be enhanced to track real errors
  };

  return {
    ...handlers,
    state,
    categoryController: categoryElementsController,
    updateSpecialDevice,
    refreshHandlers
  };
}

// Convenience hook για συχνή χρήση
export function useSimpleNavigationHandlers(
  navigation: NavigationActions,
  isSpecialDevice = false
) {
  return useNavigationHandlers({
    navigation,
    isSpecialDevice
  });
}