/**
 * propertyType/index.ts - Enterprise Property Type Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { PropertyTypeStep } from './PropertyTypeStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του propertyType step στο StepRegistry
StepRegistry.register('propertyType', {
  component: PropertyTypeStep,
  title: 'Τύπος Ακινήτου',
  description: 'Επιλογή τύπου ακινήτου',
  isValid: (context) => {
    return Boolean(context?.selectedCategory === 'property' && context?.selectedIntent);
  }
});

export { PropertyTypeStep } from './PropertyTypeStep';
export { PropertyTypeCard } from './PropertyTypeCard';
export type { PropertyType, PropertyTypeStepData, PropertyTypeOption } from './types';