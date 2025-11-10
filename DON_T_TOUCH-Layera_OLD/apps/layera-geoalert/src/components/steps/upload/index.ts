/**
 * upload/index.ts - Enterprise Upload Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { UploadStep } from './UploadStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του upload step στο StepRegistry
stepRegistry.register({
  id: 'upload',
  name: 'Ανέβασμα',
  component: UploadStep,
  order: 17,
  isVisible: true,
  cards: [],
  metadata: {
    isOptional: false
  }
});

export { UploadStep } from './UploadStep';
export { UploadCard } from './UploadCard';
export type { UploadedFile, UploadStepData, UploadOptions } from './types';