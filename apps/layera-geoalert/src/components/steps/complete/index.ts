/**
 * complete/index.ts - Enterprise Complete Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { CompleteStep } from './CompleteStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του complete step στο StepRegistry
StepRegistry.register('complete', {
  component: CompleteStep,
  title: 'Ολοκλήρωση',
  description: 'Τελική επιβεβαίωση και ολοκλήρωση',
  isValid: (context) => {
    return Boolean(context?.selectedCategory && context?.selectedIntent);
  }
});

export { CompleteStep } from './CompleteStep';
export type {
  CompleteStepData,
  CompletionSummary
} from './types';