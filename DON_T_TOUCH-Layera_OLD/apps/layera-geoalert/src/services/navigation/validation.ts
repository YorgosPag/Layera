/**
 * Navigation Validation & Error Handling
 *
 * Εξασφαλίζει ότι κάθε navigation action είναι valid
 * και προστατεύει από invalid state transitions.
 */

import { NavigationState, Category } from './types';

export class NavigationError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'NavigationError';
  }
}

export class NavigationValidator {
  isValidCategory(category: unknown): category is Category {
    return category === 'property' || category === 'job';
  }

  validateState(state: NavigationState): void {
    // Validate step index
    if (typeof state.stepIndex !== 'number' || state.stepIndex < 0) {
      throw new NavigationError(`Invalid step index: ${state.stepIndex}`);
    }

    // Validate current step ID
    if (!state.currentStepId || typeof state.currentStepId !== 'string') {
      throw new NavigationError(`Invalid current step ID: ${state.currentStepId}`);
    }

    // Validate selected category
    if (state.selectedCategory !== null && !this.isValidCategory(state.selectedCategory)) {
      throw new NavigationError(`Invalid selected category: ${state.selectedCategory}`);
    }

    // Validate total steps
    if (typeof state.totalSteps !== 'number' || state.totalSteps < 1) {
      throw new NavigationError(`Invalid total steps: ${state.totalSteps}`);
    }

    // Validate step index is within bounds
    if (state.stepIndex >= state.totalSteps) {
      throw new NavigationError(`Step index ${state.stepIndex} exceeds total steps ${state.totalSteps}`);
    }

    // Validate canGoPrevious logic
    const expectedCanGoPrevious = state.stepIndex > 0;
    if (state.canGoPrevious !== expectedCanGoPrevious) {
      throw new NavigationError(`Invalid canGoPrevious: expected ${expectedCanGoPrevious}, got ${state.canGoPrevious}`);
    }

    // Validate canGoNext logic
    const expectedCanGoNext = state.stepIndex < state.totalSteps - 1;
    if (state.canGoNext !== expectedCanGoNext) {
      throw new NavigationError(`Invalid canGoNext: expected ${expectedCanGoNext}, got ${state.canGoNext}`);
    }

    // Validate consistency between category and step
    if (state.selectedCategory && state.stepIndex === 0) {
      throw new NavigationError('Cannot have selected category on first step');
    }

    if (!state.selectedCategory && state.stepIndex > 0) {
      throw new NavigationError('Cannot advance beyond first step without selecting category');
    }
  }

  validateNavigation(action: string, currentState: NavigationState): void {
    switch (action) {
      case 'GO_BACK':
        if (!currentState.canGoPrevious) {
          throw new NavigationError('Cannot go back: canGoPrevious is false');
        }
        break;

      case 'GO_NEXT':
        if (!currentState.canGoNext) {
          throw new NavigationError('Cannot go next: canGoNext is false');
        }
        break;

      case 'SELECT_CATEGORY':
        if (currentState.stepIndex !== 0) {
          throw new NavigationError('Cannot select category: not on first step');
        }
        break;

      default:
        throw new NavigationError(`Unknown navigation action: ${action}`);
    }
  }
}