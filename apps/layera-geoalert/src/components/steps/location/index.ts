/**
 * location/index.ts - Enterprise Location Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { LocationStep } from './LocationStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του location step στο StepRegistry
stepRegistry.register({
  id: 'location',
  name: 'Τοποθεσία',
  component: LocationStep,
  order: 14,
  isVisible: true,
  cards: [],
  // ΔΙΟΡΘΩΣΗ: Προσθήκη conditions για σωστή ροή
  conditions: [{
    type: 'category',
    value: 'property',
    operator: 'equals'
  }],
  dependencies: ['transactionType'], // Μετά το transaction type
  metadata: {
    isOptional: false
  }
});

export { LocationStep } from './LocationStep';
export type {
  LocationMethodType,
  LocationDetails,
  LocationStepData
} from './types';