/**
 * Navigation Handlers Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για navigation behavior χωρίς vendor dependencies
 */
interface NavigationState {
    showCategoryElements: boolean;
    isNavigating: boolean;
    lastError: Error | null;
}
interface NavigationActions {
    goNext: () => Promise<void>;
    goBack: () => Promise<void>;
    reset: () => void;
}
interface CategoryElementsController {
    show: (value: boolean) => void;
    toggle: () => void;
    onChange?: ((show: boolean) => void) | undefined;
}
interface NavigationHandlerOptions {
    enableErrorRecovery?: boolean;
    logErrors?: boolean;
    onError?: (error: Error, action: string) => void;
    onStateChange?: (state: NavigationState) => void;
}
interface NavigationHandlerResult {
    handleStepNext: () => Promise<void>;
    handleStepPrevious: () => Promise<void>;
    handleStepReset: () => void;
    handleNewEntryClick: () => void;
    state: NavigationState;
    categoryController: CategoryElementsController;
}
interface NavigationHandlerDependencies {
    navigation: NavigationActions;
    categoryElements: CategoryElementsController;
    isSpecialDevice?: boolean;
}

/**
 * NavigationHandlersAdapter.ts - Enterprise Navigation Handlers Adapter
 *
 * Εξαγμένη λογική από GeoMapNew.tsx για navigation handlers
 * Single source of truth για navigation behavior στο Layera ecosystem
 */

declare class NavigationHandlersAdapter {
    private state;
    private options;
    private dependencies;
    constructor(dependencies: NavigationHandlerDependencies, options?: NavigationHandlerOptions);
    createHandlers(): NavigationHandlerResult;
    private createStepNextHandler;
    private createStepPreviousHandler;
    private createStepResetHandler;
    private createNewEntryClickHandler;
    private createCategoryController;
    private handleError;
    private notifyStateChange;
    updateDependencies(dependencies: Partial<NavigationHandlerDependencies>): void;
    getState(): NavigationState;
}

/**
 * useNavigationHandlers.ts - Enterprise React Hook για Navigation Handlers
 *
 * React hook που παρέχει ready-to-use navigation handlers με error handling
 */

interface UseNavigationHandlersConfig {
    navigation: NavigationActions;
    isSpecialDevice?: boolean;
    onCategoryElementsChange?: (show: boolean) => void;
    onNewEntryClick?: () => void;
    options?: NavigationHandlerOptions;
}
interface UseNavigationHandlersResult extends NavigationHandlerResult {
    updateSpecialDevice: (isSpecial: boolean) => void;
    refreshHandlers: () => void;
}
declare function useNavigationHandlers(config: UseNavigationHandlersConfig): UseNavigationHandlersResult;
declare function useSimpleNavigationHandlers(navigation: NavigationActions, isSpecialDevice?: boolean): UseNavigationHandlersResult;

export { type CategoryElementsController, type NavigationActions, type NavigationHandlerDependencies, type NavigationHandlerOptions, type NavigationHandlerResult, NavigationHandlersAdapter, NavigationHandlersAdapter as NavigationManager, type NavigationState, type UseNavigationHandlersConfig, type UseNavigationHandlersResult, useSimpleNavigationHandlers as useNavHandlers, useNavigationHandlers, useSimpleNavigationHandlers };
