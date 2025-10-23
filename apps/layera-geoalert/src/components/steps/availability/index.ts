/**
 * availability/index.ts - Enterprise Availability Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { AvailabilityStep } from './AvailabilityStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του availability step στο StepRegistry
StepRegistry.register('availability', {
  component: AvailabilityStep,
  title: 'Διαθεσιμότητα',
  description: 'Επιλογή διαθεσιμότητας',
  isValid: (context) => {
    return Boolean(context?.selectedCategory && context?.selectedIntent);
  }
});

export { AvailabilityStep } from './AvailabilityStep';
export { AvailabilityCard } from './AvailabilityCard';
export type { AvailabilityType, AvailabilityStepData, AvailabilityOption } from './types';