/**
 * areaMethod/index.ts - Enterprise Area Method Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { AreaMethodStep } from './AreaMethodStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του areaMethod step στο StepRegistry
StepRegistry.register('areaMethod', {
  component: AreaMethodStep,
  title: 'Μέθοδος Εμβαδού',
  description: 'Επιλογή μεθόδου υπολογισμού εμβαδού',
  isValid: (context) => {
    return Boolean(context?.selectedCategory === 'property' && context?.selectedIntent);
  }
});

export { AreaMethodStep } from './AreaMethodStep';
export { AreaMethodCard } from './AreaMethodCard';
export type { AreaMethodType, AreaMethodStepData, AreaMethodOption } from './types';