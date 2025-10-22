var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/NavigationHandlersAdapter.ts
var NavigationHandlersAdapter = class {
  constructor(dependencies, options = {}) {
    __publicField(this, "state");
    __publicField(this, "options");
    __publicField(this, "dependencies");
    this.dependencies = dependencies;
    this.options = {
      enableErrorRecovery: true,
      logErrors: true,
      ...options
    };
    this.state = {
      showCategoryElements: false,
      // This will be synced with external state
      isNavigating: false,
      lastError: null
    };
  }
  createHandlers() {
    return {
      handleStepNext: this.createStepNextHandler(),
      handleStepPrevious: this.createStepPreviousHandler(),
      handleStepReset: this.createStepResetHandler(),
      handleNewEntryClick: this.createNewEntryClickHandler(),
      state: this.state,
      categoryController: this.createCategoryController()
    };
  }
  createStepNextHandler() {
    return async () => {
      this.state.isNavigating = true;
      this.state.lastError = null;
      this.notifyStateChange();
      try {
        await this.dependencies.navigation.goNext();
      } catch (error) {
        const navError = error instanceof Error ? error : new Error("Navigation next failed");
        this.handleError(navError, "goNext");
      } finally {
        this.state.isNavigating = false;
        this.notifyStateChange();
      }
    };
  }
  createStepPreviousHandler() {
    return async () => {
      this.state.isNavigating = true;
      this.state.lastError = null;
      this.notifyStateChange();
      try {
        await this.dependencies.navigation.goBack();
      } catch (error) {
        const navError = error instanceof Error ? error : new Error("Navigation back failed");
        this.handleError(navError, "goBack");
      } finally {
        this.state.isNavigating = false;
        this.notifyStateChange();
      }
    };
  }
  createStepResetHandler() {
    return () => {
      try {
        this.dependencies.navigation.reset();
        this.dependencies.categoryElements.show(false);
        this.state.showCategoryElements = false;
        this.state.lastError = null;
        this.notifyStateChange();
      } catch (error) {
        const resetError = error instanceof Error ? error : new Error("Navigation reset failed");
        this.handleError(resetError, "reset");
      }
    };
  }
  createNewEntryClickHandler() {
    return () => {
      try {
        if (this.dependencies.isSpecialDevice) {
          this.dependencies.categoryElements.toggle();
        } else {
        }
      } catch (error) {
        const clickError = error instanceof Error ? error : new Error("New entry click failed");
        this.handleError(clickError, "newEntryClick");
      }
    };
  }
  createCategoryController() {
    return {
      show: (value) => {
        this.state.showCategoryElements = value;
        this.dependencies.categoryElements.show(value);
        this.notifyStateChange();
      },
      toggle: () => {
        const newState = !this.state.showCategoryElements;
        this.state.showCategoryElements = newState;
        this.dependencies.categoryElements.show(newState);
        this.notifyStateChange();
      },
      onChange: this.dependencies.categoryElements.onChange
    };
  }
  handleError(error, action) {
    this.state.lastError = error;
    if (this.options.logErrors) {
      console.error(`[NavigationHandlers] ${action} failed:`, error);
    }
    if (this.options.onError) {
      this.options.onError(error, action);
    }
    this.notifyStateChange();
  }
  notifyStateChange() {
    if (this.options.onStateChange) {
      this.options.onStateChange({ ...this.state });
    }
  }
  // Public method to update dependencies (useful for React hooks)
  updateDependencies(dependencies) {
    this.dependencies = { ...this.dependencies, ...dependencies };
  }
  // Public method to get current state
  getState() {
    return { ...this.state };
  }
};

// src/useNavigationHandlers.ts
import { useState, useCallback, useMemo, useEffect } from "react";
function useNavigationHandlers(config) {
  const [showCategoryElements, setShowCategoryElements] = useState(false);
  const [isSpecialDevice, setIsSpecialDevice] = useState(config.isSpecialDevice ?? false);
  useEffect(() => {
    setIsSpecialDevice(config.isSpecialDevice ?? false);
  }, [config.isSpecialDevice]);
  const categoryElementsController = useMemo(() => ({
    show: (value) => {
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
  const adapter = useMemo(() => {
    const dependencies = {
      navigation: config.navigation,
      categoryElements: categoryElementsController,
      isSpecialDevice
    };
    return new NavigationHandlersAdapter(dependencies, config.options);
  }, [config.navigation, categoryElementsController, isSpecialDevice, config.options]);
  const handlers = useMemo(() => {
    const adapterHandlers = adapter.createHandlers();
    const originalHandleNewEntryClick = adapterHandlers.handleNewEntryClick;
    const enhancedHandleNewEntryClick = () => {
      if (isSpecialDevice) {
        originalHandleNewEntryClick();
      } else {
        config.onNewEntryClick?.();
      }
    };
    return {
      ...adapterHandlers,
      handleNewEntryClick: enhancedHandleNewEntryClick
    };
  }, [adapter, isSpecialDevice, config.onNewEntryClick]);
  const updateSpecialDevice = useCallback((isSpecial) => {
    setIsSpecialDevice(isSpecial);
  }, []);
  const refreshHandlers = useCallback(() => {
    adapter.updateDependencies({
      categoryElements: categoryElementsController,
      isSpecialDevice
    });
  }, [adapter, categoryElementsController, isSpecialDevice]);
  const state = {
    showCategoryElements,
    isNavigating: false,
    // This could be enhanced to track real navigation state
    lastError: null
    // This could be enhanced to track real errors
  };
  return {
    ...handlers,
    state,
    categoryController: categoryElementsController,
    updateSpecialDevice,
    refreshHandlers
  };
}
function useSimpleNavigationHandlers(navigation, isSpecialDevice = false) {
  return useNavigationHandlers({
    navigation,
    isSpecialDevice
  });
}
export {
  NavigationHandlersAdapter,
  NavigationHandlersAdapter as NavigationManager,
  useSimpleNavigationHandlers as useNavHandlers,
  useNavigationHandlers,
  useSimpleNavigationHandlers
};
//# sourceMappingURL=index.mjs.map