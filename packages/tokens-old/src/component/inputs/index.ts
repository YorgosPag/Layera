/**
 * 📝 LAYERA INPUTS TOKENS - Main export
 *
 * Centralized export για όλα τα input component tokens
 */

// Core exports
export * from './inputs.class';
export * from './inputs.variables';
export * from './inputs.variants';

// Re-export main classes για convenience
export { InputComponentSystem } from './inputs.class';
export { INPUT_VARIABLES } from './inputs.variables';
export {
  INPUT_VARIANTS,
  SPECIALIZED_INPUT_VARIANTS,
  FLOATING_LABEL_VARIANTS,
  INPUT_GROUP_VARIANTS,
  VALIDATION_VARIANTS
} from './inputs.variants';

// Type exports
export type { InputSize, InputState, InputVariant, InputType } from './inputs.variables';
export type { InputVariantType, InputSizeType, InputStateType } from './inputs.variants';