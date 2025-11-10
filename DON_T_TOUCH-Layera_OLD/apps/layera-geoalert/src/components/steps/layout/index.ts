/**
 * layout/index.ts - Enterprise Layout Step Auto-Registration
 */

import { stepRegistry } from '../StepRegistry';
import { LayoutStep } from './LayoutStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του layout step στο StepRegistry
stepRegistry.register({
  id: 'layout',
  name: 'Κάτοψη',
  component: LayoutStep,
  order: 13,
  isVisible: true,
  cards: [],
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