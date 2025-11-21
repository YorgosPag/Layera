/**
 * ✍️ LAYERA TEXT SEMANTIC TOKENS - Main export
 *
 * Centralized export για όλα τα text semantic tokens
 */

// Core exports
export * from './text.class';
export * from './text.variables';
export * from './text.variants';

// Re-export main classes για convenience
export { TextSemanticSystem } from './text.class';
export { TEXT_VARIABLES } from './text.variables';
export { TEXT_VARIANTS } from './text.variants';

// Type exports
export type { TextType, TextHierarchy, TextContext } from './text.variables';
export type { TextVariantType, TextHierarchyType, TextContextType } from './text.variants';