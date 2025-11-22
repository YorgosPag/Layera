/**
 * Loading Index - Export all loading tokens
 *
 * ⚡ Κεντρικό σημείο export για όλο το loading system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για loading components
 */

// Type definitions & structure
export type {
  LoadingSize,
  LoadingType,
  LoadingVariant,
  LoadingState,
  LoadingSystemStructure,
} from './loading.variables';

export {
  LoadingSystem,
  LOADING_SEMANTIC_RULES,
  LAYERA_LOADING_CSS,
} from './loading.class';

// Variants & contexts
export type {
  SpinnerVariantType,
  LoadingContextVariantType,
  LoadingSizeVariantType,
  SkeletonVariantType,
  ProgressVariantType,
  ShimmerVariantType,
} from './loading.variants';

export {
  SPINNER_VARIANTS,
  LOADING_CONTEXT_VARIANTS,
  LOADING_SIZE_VARIANTS,
  SKELETON_VARIANTS,
  PROGRESS_VARIANTS,
  SHIMMER_VARIANTS,
} from './loading.variants';

// Actual loading values
export {
  LOADING_VARIABLES,
} from './loading.variables';

// Default exports για εύκολη χρήση
export const Loading = {
  variables: LOADING_VARIABLES,
  spinnerVariants: SPINNER_VARIANTS,
  contextVariants: LOADING_CONTEXT_VARIANTS,
  sizeVariants: LOADING_SIZE_VARIANTS,
  skeletonVariants: SKELETON_VARIANTS,
  progressVariants: PROGRESS_VARIANTS,
  shimmerVariants: SHIMMER_VARIANTS,
  system: LoadingSystem,
} as const;

// Re-export των imports για convenience
import { LOADING_VARIABLES } from './loading.variables';
import {
  SPINNER_VARIANTS,
  LOADING_CONTEXT_VARIANTS,
  LOADING_SIZE_VARIANTS,
  SKELETON_VARIANTS,
  PROGRESS_VARIANTS,
  SHIMMER_VARIANTS
} from './loading.variants';
import { LoadingSystem } from './loading.class';