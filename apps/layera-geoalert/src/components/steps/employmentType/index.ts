/**
 * employmentType/index.ts - Enterprise Employment Type Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { EmploymentTypeStep } from './EmploymentTypeStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του employmentType step στο StepRegistry
StepRegistry.register('employmentType', {
  component: EmploymentTypeStep,
  title: 'Τύπος Απασχόλησης',
  description: 'Επιλογή τύπου απασχόλησης',
  isValid: (context) => {
    return Boolean(context?.selectedCategory === 'job' && context?.selectedIntent);
  }
});

export { EmploymentTypeStep } from './EmploymentTypeStep';
export { EmploymentTypeCard } from './EmploymentTypeCard';
export type { EmploymentType, EmploymentTypeStepData, EmploymentTypeOption } from './types';