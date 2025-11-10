/**
 * NavigationHandlersAdapter.ts - Enterprise Navigation Handlers Adapter
 *
 * Εξαγμένη λογική από GeoMapNew.tsx για navigation handlers
 * Single source of truth για navigation behavior στο Layera ecosystem
 */

import {
  NavigationHandlerResult,
  NavigationHandlerOptions,
  NavigationHandlerDependencies,
  NavigationState
} from './types';

export class NavigationHandlersAdapter {
  private state: NavigationState;
  private options: NavigationHandlerOptions;
  private dependencies: NavigationHandlerDependencies;

  constructor(
    dependencies: NavigationHandlerDependencies,
    options: NavigationHandlerOptions = {}
  ) {
    this.dependencies = dependencies;
    this.options = {
      enableErrorRecovery: true,
      logErrors: true,
      ...options
    };

    // No internal state - use external state management via dependencies
    this.state = {
      showCategoryElements: false, // This will be synced with external state
      isNavigating: false,
      lastError: null
    };
  }

  createHandlers(): NavigationHandlerResult {
    return {
      handleStepNext: this.createStepNextHandler(),
      handleStepPrevious: this.createStepPreviousHandler(),
      handleStepReset: this.createStepResetHandler(),
      handleNewEntryClick: this.createNewEntryClickHandler(),
      state: this.state,
      categoryController: this.createCategoryController()
    };
  }

  private createStepNextHandler() {
    return async (): Promise<void> => {
      this.state.isNavigating = true;
      this.state.lastError = null;
      this.notifyStateChange();

      try {
        await this.dependencies.navigation.goNext();
      } catch (error) {
        const navError = error instanceof Error ? error : new Error('Navigation next failed');
        this.handleError(navError, 'goNext');
      } finally {
        this.state.isNavigating = false;
        this.notifyStateChange();
      }
    };
  }

  private createStepPreviousHandler() {
    return async (): Promise<void> => {
      this.state.isNavigating = true;
      this.state.lastError = null;
      this.notifyStateChange();

      try {
        await this.dependencies.navigation.goBack();
      } catch (error) {
        const navError = error instanceof Error ? error : new Error('Navigation back failed');
        this.handleError(navError, 'goBack');
      } finally {
        this.state.isNavigating = false;
        this.notifyStateChange();
      }
    };
  }

  private createStepResetHandler() {
    return (): void => {
      try {
        this.dependencies.navigation.reset();
        this.dependencies.categoryElements.show(false);
        this.state.showCategoryElements = false;
        this.state.lastError = null;
        this.notifyStateChange();
      } catch (error) {
        const resetError = error instanceof Error ? error : new Error('Navigation reset failed');
        this.handleError(resetError, 'reset');
      }
    };
  }

  private createNewEntryClickHandler() {
    return (): void => {
      try {
        if (this.dependencies.isSpecialDevice) {
          // Special device behavior: toggle category elements using external controller
          this.dependencies.categoryElements.toggle();
        } else {
          // Standard device behavior: delegate to external handler
          // This will be handled by the external onNewEntryClick callback
        }
      } catch (error) {
        const clickError = error instanceof Error ? error : new Error('New entry click failed');
        this.handleError(clickError, 'newEntryClick');
      }
    };
  }

  private createCategoryController() {
    return {
      show: (value: boolean): void => {
        this.state.showCategoryElements = value;
        this.dependencies.categoryElements.show(value);
        this.notifyStateChange();
      },
      toggle: (): void => {
        const newState = !this.state.showCategoryElements;
        this.state.showCategoryElements = newState;
        this.dependencies.categoryElements.show(newState);
        this.notifyStateChange();
      },
      onChange: this.dependencies.categoryElements.onChange
    };
  }

  private handleError(error: Error, action: string): void {
    this.state.lastError = error;

    if (this.options.logErrors) {
      console.error(`[NavigationHandlers] ${action} failed:`, error);
    }

    if (this.options.onError) {
      this.options.onError(error, action);
    }

    this.notifyStateChange();
  }

  private notifyStateChange(): void {
    if (this.options.onStateChange) {
      this.options.onStateChange({ ...this.state });
    }
  }

  // Public method to update dependencies (useful for React hooks)
  updateDependencies(dependencies: Partial<NavigationHandlerDependencies>): void {
    this.dependencies = { ...this.dependencies, ...dependencies };
  }

  // Public method to get current state
  getState(): NavigationState {
    return { ...this.state };
  }
}