/**
 * layout/index.ts - Enterprise Layout Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { LayoutStep } from './LayoutStep';
import { WORKFLOW_ORDER } from '@layera/constants';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του layout step στο StepRegistry
stepRegistry.register({
  id: 'layout',
  name: 'Κάτοψη',
  component: LayoutStep,
  order: WORKFLOW_ORDER.LAYOUT,
  isVisible: true,
  cards: [],
  // ΔΙΟΡΘΩΣΗ: Προσθήκη conditions για να εμφανίζεται μόνο όταν πρέπει
  conditions: [{
    type: 'custom',
    value: 'hasCompletedUpload'
  }],
  dependencies: ['upload'], // Εμφανίζεται μετά το upload step
  metadata: {
    isOptional: false
  }
});

export { LayoutStep } from './LayoutStep';
export { LayoutToolCard } from './LayoutToolCard';
export type {
  LayoutTool,
  LayoutStepData,
  LayoutToolOption,
  LayoutPosition,
  LayoutDimensions
} from './types';