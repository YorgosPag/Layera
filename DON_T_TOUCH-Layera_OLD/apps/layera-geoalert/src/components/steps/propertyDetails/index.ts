/**
 * propertyDetails/index.ts - Enterprise Property Details Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { PropertyDetailsStep } from './PropertyDetailsStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του propertyDetails step στο StepRegistry
stepRegistry.register({
  id: 'propertyDetails',
  name: 'Στοιχεία',
  component: PropertyDetailsStep,
  order: 15,
  isVisible: true,
  cards: [],
  conditions: [{
    type: 'category',
    value: 'property',
    operator: 'equals'
  }],
  metadata: {
    category: 'property',
    isOptional: false
  }
});

export { PropertyDetailsStep } from './PropertyDetailsStep';
export { PropertyDetailsForm } from './PropertyDetailsForm';
export type {
  PropertyDetails,
  PropertyDetailsStepData,
  PropertyDetailsFormField
} from './types';