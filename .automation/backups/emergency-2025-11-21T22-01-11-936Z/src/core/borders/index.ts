/**
 * 🔲 LAYERA BORDERS TOKENS - Main export
 *
 * Centralized export για όλα τα border core tokens
 */

// Core exports
export * from './borders.class';
export * from './borders.variables';
export * from './borders.variants';

// Re-export main classes για convenience
export { BorderSystem } from './borders.class';
export { BORDER_VARIABLES } from './borders.variables';
export { BORDER_VARIANTS } from './borders.variants';

// Type exports
export type { BorderWidth, BorderRadius, BorderStyle } from './borders.variables';
export type { BorderVariantType, BorderWidthType, BorderRadiusType } from './borders.variants';