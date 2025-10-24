/**
 * availabilityDetails/index.ts - Enterprise Availability Details Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { AvailabilityDetailsStep } from './AvailabilityDetailsStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του availabilityDetails step στο StepRegistry
stepRegistry.register({
  id: 'availabilityDetails',
  name: 'Λεπτομέρειες Διαθεσιμότητας',
  component: AvailabilityDetailsStep,
  order: 12,
  isVisible: true,
  cards: [],
  conditions: [{
    type: 'category',
    value: 'job',
    operator: 'equals'
  }],
  dependencies: ['availability'],
  metadata: {
    category: 'job',
    isOptional: false
  }
});

export { AvailabilityDetailsStep } from './AvailabilityDetailsStep';
export { AvailabilityDetailsForm } from './AvailabilityDetailsForm';
export type {
  AvailabilityDetails,
  AvailabilityDetailsStepData,
  AvailabilityDetailsFormField
} from './types';