/**
 * 🔲 LAYERA BORDER SEMANTIC TOKENS - Main export
 *
 * Centralized export για όλα τα border semantic tokens
 */

// Core exports
export * from './border.class';
export * from './border.variables';
export * from './border.variants';

// Re-export main classes για convenience
export { BorderSemanticSystem } from './border.class';
export { BORDER_SEMANTIC_VARIABLES } from './border.variables';
export { BORDER_VARIANTS } from './border.variants';

// Type exports
export type { BorderSemanticType, BorderSemanticState, BorderSemanticContext } from './border.variables';
export type { BorderSemanticVariantType, BorderSemanticStateType, BorderSemanticContextType } from './border.variants';