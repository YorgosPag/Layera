/**
 * upload/index.ts - Enterprise Upload Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { UploadStep } from './UploadStep';
import { WORKFLOW_ORDER } from '@layera/constants';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του upload step στο StepRegistry
stepRegistry.register({
  id: 'upload',
  name: 'Ανέβασμα',
  component: UploadStep,
  order: WORKFLOW_ORDER.UPLOAD,
  isVisible: true,
  cards: [],
  // ΔΙΟΡΘΩΣΗ: Προσθήκη conditions για σωστή ροή
  conditions: [{
    type: 'category',
    value: 'property',
    operator: 'equals'
  }],
  dependencies: ['location'], // Μετά το location step
  metadata: {
    isOptional: false
  }
});

export { UploadStep } from './UploadStep';
export { UploadCard } from './UploadCard';
export type { UploadedFile, UploadStepData, UploadOptions } from './types';