/**
 * 🌊 LAYERA MOTION TOKENS - Main export
 *
 * Centralized export για όλα τα motion core tokens
 */

// Core exports
export * from './motion.class';
export * from './motion.variables';
export * from './motion.variants';

// Re-export main classes για convenience
export { MOTION_VARIABLES } from './motion.variables';
export { MOTION_VARIANTS } from './motion.variants';

// Type exports
export type { MotionDuration, MotionEasing, MotionDelay } from './motion.variables';
export type { MotionVariantType, MotionDurationType, MotionEasingType } from './motion.variants';