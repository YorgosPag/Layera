/**
 * complete/index.ts - Enterprise Complete Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { CompleteStep } from './CompleteStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του complete step στο StepRegistry
stepRegistry.register({
  id: 'complete',
  name: 'Ολοκλήρωση',
  component: CompleteStep,
  order: 100,
  isVisible: true,
  cards: [],
  // ✅ ΔΙΟΡΘΩΣΗ: Complete Step εμφανίζεται μόνο μετά από τουλάχιστον έναν κύκλο
  dependencies: ['category'], // Απαιτεί τουλάχιστον να έχει ολοκληρωθεί το category step
  metadata: {
    isOptional: false
  }
});

export { CompleteStep } from './CompleteStep';
export type {
  CompleteStepData,
  CompletionSummary
} from './types';