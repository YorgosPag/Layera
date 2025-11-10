/**
 * Enterprise Navigation Types
 *
 * Αυστηρά types που εξασφαλίζουν type safety
 * και αποτρέπουν runtime errors.
 */

export type Category = 'property' | 'job';

export interface NavigationStep {
  id: string;
  title: string;
}

export interface NavigationState {
  stepIndex: number;
  currentStepId: string;
  selectedCategory: Category | null;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLoading: boolean;
}

export interface NavigationTransition {
  from: NavigationState;
  to: NavigationState;
  action: NavigationAction;
  timestamp: number;
}

export type NavigationAction =
  | { type: 'SELECT_CATEGORY'; category: Category }
  | { type: 'GO_BACK' }
  | { type: 'GO_NEXT' }
  | { type: 'RESET' };

export interface NavigationServiceInterface {
  // State getters
  getCurrentStep(): string;
  getStepIndex(): number;
  getSelectedCategory(): Category | null;
  getState(): Readonly<NavigationState>;
  canGoBack(): boolean;
  canGoNext(): boolean;

  // Navigation actions
  selectCategory(category: Category): Promise<void>;
  goBack(): Promise<void>;
  goNext(): Promise<void>;
  reset(): void;

  // Safety methods
  validateState(): void;
  recover(): void;
}