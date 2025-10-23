/**
 * propertyDetails/index.ts - Enterprise Property Details Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { PropertyDetailsStep } from './PropertyDetailsStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του propertyDetails step στο StepRegistry
StepRegistry.register('propertyDetails', {
  component: PropertyDetailsStep,
  title: 'Στοιχεία',
  description: 'Στοιχεία ακινήτου',
  isValid: (context) => {
    return Boolean(context?.selectedCategory === 'property' && context?.selectedIntent);
  }
});

export { PropertyDetailsStep } from './PropertyDetailsStep';
export { PropertyDetailsForm } from './PropertyDetailsForm';
export type {
  PropertyDetails,
  PropertyDetailsStepData,
  PropertyDetailsFormField
} from './types';