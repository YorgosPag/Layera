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
  // Αφαιρώ dependencies για να εμφανίζεται αμέσως μετά το intent
  conditions: [
    {
      type: 'category',
      value: 'job',
      operator: 'equals' // Εμφανίζεται μόνο για job category
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