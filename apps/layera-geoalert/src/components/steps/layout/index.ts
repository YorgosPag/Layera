/**
 * layout/index.ts - Enterprise Layout Step Auto-Registration
 */

import { StepRegistry } from '../StepRegistry';
import { LayoutStep } from './LayoutStep';

// 🚀 AUTO-REGISTRATION: Καταχώρηση του layout step στο StepRegistry
StepRegistry.register('layout', {
  component: LayoutStep,
  title: 'Κάτοψη',
  description: 'Ρύθμιση κάτοψης και εργαλείων',
  isValid: (context) => {
    return Boolean(context?.selectedCategory && context?.selectedIntent);
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