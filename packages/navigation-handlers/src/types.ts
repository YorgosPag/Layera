/**
 * Navigation Handlers Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για navigation behavior χωρίς vendor dependencies
 */

export interface NavigationState {
  showCategoryElements: boolean;
  isNavigating: boolean;
  lastError: Error | null;
}

export interface NavigationActions {
  goNext: () => Promise<void>;
  goBack: () => Promise<void>;
  reset: () => void;
}

export interface CategoryElementsController {
  show: (value: boolean) => void;
  toggle: () => void;
  onChange?: ((show: boolean) => void) | undefined;
}

export interface NavigationHandlerOptions {
  enableErrorRecovery?: boolean;
  logErrors?: boolean;
  onError?: (error: Error, action: string) => void;
  onStateChange?: (state: NavigationState) => void;
}

export interface NavigationHandlerResult {
  // Navigation actions με built-in error handling
  handleStepNext: () => Promise<void>;
  handleStepPrevious: () => Promise<void>;
  handleStepReset: () => void;

  // Category elements controller
  handleNewEntryClick: () => void;

  // State access
  state: NavigationState;
  categoryController: CategoryElementsController;
}

export interface NavigationHandlerDependencies {
  navigation: NavigationActions;
  categoryElements: CategoryElementsController;
  isSpecialDevice?: boolean;
}