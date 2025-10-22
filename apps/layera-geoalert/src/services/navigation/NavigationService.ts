/**
 * Enterprise Navigation Service
 *
 * Αυτό το service εξασφαλίζει 100% αξιόπιστο navigation
 * με automatic error recovery και state consistency.
 */

import { NavigationState, Category, NavigationStep } from './types';
import { NavigationError, NavigationValidator } from './validation';
import { Logger } from '../logging/Logger';

export class NavigationService {
  private state: NavigationState;
  private validator: NavigationValidator;
  private logger: Logger;
  private stateHistory: NavigationState[] = [];

  constructor() {
    this.validator = new NavigationValidator();
    this.logger = new Logger('NavigationService');
    this.state = this.getInitialState();
    this.saveStateSnapshot();
  }

  // 🛡️ SAFE STATE GETTERS
  getCurrentStep(): string {
    return this.state.currentStepId;
  }

  getStepIndex(): number {
    return this.state.stepIndex;
  }

  getSelectedCategory(): Category | null {
    return this.state.selectedCategory;
  }

  getState(): Readonly<NavigationState> {
    return { ...this.state };
  }

  canGoBack(): boolean {
    return this.state.canGoPrevious;
  }

  canGoNext(): boolean {
    return this.state.canGoNext;
  }

  // 🎯 SAFE NAVIGATION ACTIONS
  async selectCategory(category: Category): Promise<void> {
    this.logger.info(`Selecting category: ${category}`);

    try {
      // Validation
      if (!this.validator.isValidCategory(category)) {
        throw new NavigationError(`Invalid category: ${category}`);
      }

      if (this.state.stepIndex !== 0) {
        throw new NavigationError('Can only select category from first step');
      }

      // Atomic state update
      const newState = this.calculateStateAfterCategorySelection(category);
      await this.updateState(newState);

      this.logger.info(`Category selected successfully: ${category}`);
    } catch (error) {
      this.logger.error('Category selection failed', error);
      await this.handleError(error as Error);
      throw error;
    }
  }

  async goBack(): Promise<void> {
    this.logger.info('Attempting to go back');

    try {
      // Validation
      if (!this.state.canGoPrevious) {
        throw new NavigationError('Cannot go back from first step');
      }

      if (this.state.stepIndex <= 0) {
        throw new NavigationError('Already at first step');
      }

      // Atomic state update
      const newState = this.calculateStateAfterGoingBack();
      await this.updateState(newState);

      this.logger.info('Went back successfully');
    } catch (error) {
      this.logger.error('Go back failed', error);
      await this.handleError(error as Error);
      throw error;
    }
  }

  async goNext(): Promise<void> {
    this.logger.info('Attempting to go next');

    try {
      // Validation
      if (!this.state.canGoNext) {
        throw new NavigationError('Cannot go to next step');
      }

      const steps = this.getStepsForCategory(this.state.selectedCategory);
      if (this.state.stepIndex >= steps.length - 1) {
        throw new NavigationError('Already at last step');
      }

      // Atomic state update
      const newState = this.calculateStateAfterGoingNext();
      await this.updateState(newState);

      this.logger.info('Went next successfully');
    } catch (error) {
      this.logger.error('Go next failed', error);
      await this.handleError(error as Error);
      throw error;
    }
  }

  reset(): void {
    this.logger.info('Resetting navigation state');
    this.state = this.getInitialState();
    this.saveStateSnapshot();
  }

  // 🔧 STATE MANAGEMENT
  private async updateState(newState: NavigationState): Promise<void> {
    // Validate new state
    this.validator.validateState(newState);

    // Save current state for rollback
    this.saveStateSnapshot();

    // Apply new state
    this.state = { ...newState };

    // Notify observers (if any)
    this.notifyStateChange();
  }

  private calculateStateAfterCategorySelection(category: Category): NavigationState {
    const steps = this.getStepsForCategory(category);

    return {
      ...this.state,
      selectedCategory: category,
      stepIndex: 1, // Always advance to intent step
      currentStepId: 'intent',
      totalSteps: steps.length,
      canGoNext: true,
      canGoPrevious: true
    };
  }

  private calculateStateAfterGoingBack(): NavigationState {
    const newIndex = this.state.stepIndex - 1;
    const steps = this.getStepsForCategory(this.state.selectedCategory);

    // Special case: going back to category step clears selection
    if (newIndex === 0) {
      return {
        ...this.getInitialState(),
        stepIndex: 0,
        currentStepId: 'category'
      };
    }

    return {
      ...this.state,
      stepIndex: newIndex,
      currentStepId: steps[newIndex].id,
      canGoNext: true,
      canGoPrevious: newIndex > 0
    };
  }

  private calculateStateAfterGoingNext(): NavigationState {
    const newIndex = this.state.stepIndex + 1;
    const steps = this.getStepsForCategory(this.state.selectedCategory);

    return {
      ...this.state,
      stepIndex: newIndex,
      currentStepId: steps[newIndex].id,
      canGoNext: newIndex < steps.length - 1,
      canGoPrevious: true
    };
  }

  // 🔄 ERROR RECOVERY
  async handleError(error: Error): Promise<void> {
    this.logger.error('Handling navigation error', error);

    try {
      // Try to recover from last known good state
      if (this.stateHistory.length > 0) {
        const lastGoodState = this.stateHistory[this.stateHistory.length - 1];
        this.state = { ...lastGoodState };
        this.logger.info('Recovered from last known good state');
      } else {
        // Fallback to initial state
        this.state = this.getInitialState();
        this.logger.info('Recovered by resetting to initial state');
      }
    } catch (recoveryError) {
      this.logger.error('Error recovery failed', recoveryError);
      // Last resort: hard reset
      this.state = this.getInitialState();
    }
  }

  validateState(): void {
    this.validator.validateState(this.state);
  }

  recover(): void {
    this.logger.warn('Performing emergency recovery');
    this.state = this.getInitialState();
    this.stateHistory = [];
    this.saveStateSnapshot();
  }

  // 📊 UTILITY METHODS
  private getInitialState(): NavigationState {
    return {
      stepIndex: 0,
      currentStepId: 'category',
      selectedCategory: null,
      totalSteps: 1,
      canGoNext: false,
      canGoPrevious: false,
      isLoading: false
    };
  }

  private getStepsForCategory(category: Category | null): NavigationStep[] {
    if (!category) {
      return [{ id: 'category', title: 'Κατηγορία' }];
    }

    if (category === 'property') {
      return [
        { id: 'category', title: 'Κατηγορία' },
        { id: 'intent', title: 'Σκοπός' },
        { id: 'transactionType', title: 'Συναλλαγή' },
        { id: 'location', title: 'Τοποθεσία' },
        { id: 'layout', title: 'Κάτοψη' },
        { id: 'details', title: 'Στοιχεία' },
        { id: 'complete', title: 'Τέλος' }
      ];
    }

    if (category === 'job') {
      return [
        { id: 'category', title: 'Κατηγορία' },
        { id: 'intent', title: 'Σκοπός' },
        { id: 'employmentType', title: 'Εργασία' },
        { id: 'availability', title: 'Διαθεσιμότητα' },
        { id: 'availabilityDetails', title: 'Λεπτομέρειες' },
        { id: 'location', title: 'Τοποθεσία' },
        { id: 'details', title: 'Στοιχεία' },
        { id: 'complete', title: 'Τέλος' }
      ];
    }

    return [{ id: 'category', title: 'Κατηγορία' }];
  }

  private saveStateSnapshot(): void {
    this.stateHistory.push({ ...this.state });
    // Keep only last 10 snapshots
    if (this.stateHistory.length > 10) {
      this.stateHistory.shift();
    }
  }

  private notifyStateChange(): void {
    // Could emit events here for reactive UI updates
    // this.eventEmitter.emit('stateChanged', this.state);
  }
}