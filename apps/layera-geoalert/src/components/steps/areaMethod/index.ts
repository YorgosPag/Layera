/**
 * areaMethod/index.ts - Enterprise Area Method Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { AreaMethodStep } from './AreaMethodStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του areaMethod step στο StepRegistry
stepRegistry.register({
  id: 'areaMethod',
  name: 'Μέθοδος Εμβαδού',
  component: AreaMethodStep,
  order: 10, // Step sequence order - UI constant
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

export { AreaMethodStep } from './AreaMethodStep';
export { AreaMethodCard } from './AreaMethodCard';
export type { AreaMethodType, AreaMethodStepData, AreaMethodOption } from './types';