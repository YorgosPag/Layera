/**
 * availability/index.ts - Enterprise Availability Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { AvailabilityStep } from './AvailabilityStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του availability step στο StepRegistry
stepRegistry.register({
  id: 'availability',
  name: 'Διαθεσιμότητα',
  component: AvailabilityStep,
  order: 7, // Αμέσως μετά το occupation step (order 6)
  isVisible: true,
  cards: [],
  dependencies: ['occupation'], // Εμφανίζεται μετά την επιλογή επαγγέλματος
  conditions: [{
    type: 'category',
    value: 'job',
    operator: 'equals'
  }],
  metadata: {
    category: 'job',
    isOptional: false
  }
});

export { AvailabilityStep } from './AvailabilityStep';
export { AvailabilityCard } from './AvailabilityCard';
export type { AvailabilityType, AvailabilityStepData, AvailabilityOption } from './types';