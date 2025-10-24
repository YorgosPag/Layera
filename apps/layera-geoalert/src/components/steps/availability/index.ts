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
  order: 11,
  isVisible: true,
  cards: [],
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