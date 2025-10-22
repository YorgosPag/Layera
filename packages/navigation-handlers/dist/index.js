"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  NavigationHandlersAdapter: () => NavigationHandlersAdapter,
  NavigationManager: () => NavigationHandlersAdapter,
  useNavHandlers: () => useSimpleNavigationHandlers,
  useNavigationHandlers: () => useNavigationHandlers,
  useSimpleNavigationHandlers: () => useSimpleNavigationHandlers
});
module.exports = __toCommonJS(index_exports);

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
var import_react = require("react");
function useNavigationHandlers(config) {
  const [showCategoryElements, setShowCategoryElements] = (0, import_react.useState)(false);
  const [isSpecialDevice, setIsSpecialDevice] = (0, import_react.useState)(config.isSpecialDevice ?? false);
  (0, import_react.useEffect)(() => {
    setIsSpecialDevice(config.isSpecialDevice ?? false);
  }, [config.isSpecialDevice]);
  const categoryElementsController = (0, import_react.useMemo)(() => ({
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
  const adapter = (0, import_react.useMemo)(() => {
    const dependencies = {
      navigation: config.navigation,
      categoryElements: categoryElementsController,
      isSpecialDevice
    };
    return new NavigationHandlersAdapter(dependencies, config.options);
  }, [config.navigation, categoryElementsController, isSpecialDevice, config.options]);
  const handlers = (0, import_react.useMemo)(() => {
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
  const updateSpecialDevice = (0, import_react.useCallback)((isSpecial) => {
    setIsSpecialDevice(isSpecial);
  }, []);
  const refreshHandlers = (0, import_react.useCallback)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationHandlersAdapter,
  NavigationManager,
  useNavHandlers,
  useNavigationHandlers,
  useSimpleNavigationHandlers
});
//# sourceMappingURL=index.js.map