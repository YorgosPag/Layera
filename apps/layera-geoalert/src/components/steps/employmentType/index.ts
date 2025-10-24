/**
 * employmentType/index.ts - Enterprise Employment Type Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { EmploymentTypeStep } from './EmploymentTypeStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του employmentType step στο StepRegistry
stepRegistry.register({
  id: 'employmentType',
  name: 'Τύπος Απασχόλησης',
  shortName: 'Απασχόληση',
  component: EmploymentTypeStep,
  order: 5, // After intent step (order 4)
  isVisible: true,
  dependencies: ['intent'], // Depends on intent selection
  conditions: [
    {
      type: 'isJobCategory',
      check: (context) => context.selectedCategory === 'job'
    }
  ],
  metadata: {
    category: 'job',
    isOptional: false,
    estimatedTime: 10, // 10 seconds average για employment type selection
    description: 'Επιλογή τύπου απασχόλησης'
  }
});

export { EmploymentTypeStep } from './EmploymentTypeStep';
export { EmploymentTypeCard } from './EmploymentTypeCard';
export type { EmploymentType, EmploymentTypeStepData, EmploymentTypeOption } from './types';