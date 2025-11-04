/**
 * propertyType/index.ts - Enterprise Property Type Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { PropertyTypeStep } from './PropertyTypeStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του propertyType step στο StepRegistry
stepRegistry.register({
  id: 'propertyType',
  name: 'Τύπος Ακινήτου',
  component: PropertyTypeStep,
  order: 3, // Μετά το Intent Step για property flow
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

export { PropertyTypeStep } from './PropertyTypeStep';
export { PropertyTypeCard } from './PropertyTypeCard';
export type { PropertyType, PropertyTypeStepData, PropertyTypeOption } from './types';