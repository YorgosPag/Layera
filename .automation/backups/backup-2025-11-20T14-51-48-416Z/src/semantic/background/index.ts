/**
 * 🎨 LAYERA BACKGROUND TOKENS - Main export
 *
 * Centralized export για όλα τα background semantic tokens
 */

// Core exports
export * from './background.class';
export * from './background.variables';
export * from './background.variants';

// Re-export main classes για convenience
export { BackgroundSemanticSystem } from './background.class';
export { BACKGROUND_VARIABLES } from './background.variables';
export { BACKGROUND_VARIANTS } from './background.variants';

// Type exports
export type { BackgroundType, BackgroundState, BackgroundContext } from './background.variables';
export type { BackgroundVariantType, BackgroundStateType, BackgroundContextType } from './background.variants';