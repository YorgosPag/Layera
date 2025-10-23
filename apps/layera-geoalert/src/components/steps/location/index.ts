/**
 * location/index.ts - Enterprise Location Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { LocationStep } from './LocationStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του location step στο StepRegistry
StepRegistry.register('location', {
  component: LocationStep,
  title: 'Τοποθεσία',
  description: 'Ορισμός τοποθεσίας με upload ή σχεδίαση',
  isValid: (context) => {
    return Boolean(context?.selectedCategory && context?.selectedIntent);
  }
});

export { LocationStep } from './LocationStep';
export type {
  LocationMethodType,
  LocationDetails,
  LocationStepData
} from './types';