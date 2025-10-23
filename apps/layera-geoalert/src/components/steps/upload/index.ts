/**
 * upload/index.ts - Enterprise Upload Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { UploadStep } from './UploadStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του upload step στο StepRegistry
StepRegistry.register('upload', {
  component: UploadStep,
  title: 'Ανέβασμα',
  description: 'Ανέβασμα αρχείων',
  isValid: (context) => {
    return Boolean(context?.selectedCategory && context?.selectedIntent);
  }
});

export { UploadStep } from './UploadStep';
export { UploadCard } from './UploadCard';
export type { UploadedFile, UploadStepData, UploadOptions } from './types';