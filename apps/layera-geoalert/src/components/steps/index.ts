/**
 * index.ts - Enterprise Steps Package Entry Point
 *
 * Single source of truth για όλα τα step-related exports
 * Clean public API for step management system
 */

// 🎯 CORE EXPORTS
export * from './types';
export { StepRegistry, stepRegistry } from './StepRegistry';
export { StepOrchestrator, useStepNavigation, useStepRegistry } from './StepOrchestrator';

// 🚀 PRE-DEFINED FLOW CONFIGURATIONS
export { STEP_FLOWS } from './flows/stepFlows';

// 📋 STEP REGISTRATION
// Individual steps θα κάνουν auto-register όταν import-αρονται
export * from './category';
export * from './intent';
export * from './location';
export * from './details';
export * from './pricing';
export * from './review';
export * from './transaction';

// 🎮 CONVENIENCE FUNCTIONS
import { stepRegistry } from './StepRegistry';
import type { StepContext, StepId } from './types';

/**
 * Get available steps για specific context
 */
export const getAvailableSteps = (context: StepContext) => {
  return stepRegistry.getAvailableSteps(context);
};

/**
 * Quick step reordering
 */
export const reorderSteps = (newOrder: Array<{ stepId: StepId; order: number }>) => {
  return stepRegistry.reorderSteps(newOrder);
};

/**
 * Get registry debug info
 */
export const getStepRegistryStatus = () => {
  return stepRegistry.getRegistryStatus();
};