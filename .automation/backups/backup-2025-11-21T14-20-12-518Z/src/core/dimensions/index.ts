/**
 * 📐 LAYERA DIMENSIONS TOKENS - Main export
 *
 * Centralized export για όλα τα dimension core tokens
 */

// Core exports
export * from './dimensions.class';
export * from './dimensions.variables';
export * from './dimensions.variants';

// Re-export main classes για convenience
export { DimensionComponentSystem } from './dimensions.class';
export { DIMENSION_VARIABLES } from './dimensions.variables';
export { DIMENSION_VARIANTS } from './dimensions.variants';

// Type exports
export type { DimensionSize, DimensionType, DimensionScale } from './dimensions.variables';
export type { DimensionVariantType, DimensionSizeType, DimensionScaleType } from './dimensions.variants';