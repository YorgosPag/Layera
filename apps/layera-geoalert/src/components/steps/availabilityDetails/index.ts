/**
 * availabilityDetails/index.ts - Enterprise Availability Details Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { AvailabilityDetailsStep } from './AvailabilityDetailsStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του availabilityDetails step στο StepRegistry
StepRegistry.register('availabilityDetails', {
  component: AvailabilityDetailsStep,
  title: 'Λεπτομέρειες Διαθεσιμότητας',
  description: 'Καθορισμός λεπτομερειών μελλοντικής διαθεσιμότητας',
  isValid: (context) => {
    return Boolean(
      context?.selectedCategory === 'job' &&
      context?.selectedIntent &&
      context?.selectedAvailability === 'future'
    );
  }
});

export { AvailabilityDetailsStep } from './AvailabilityDetailsStep';
export { AvailabilityDetailsForm } from './AvailabilityDetailsForm';
export type {
  AvailabilityDetails,
  AvailabilityDetailsStepData,
  AvailabilityDetailsFormField
} from './types';