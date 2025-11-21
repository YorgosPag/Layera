/**
 * 📏 LAYERA SPACING SYSTEM - Core spacing exports
 *
 * Central export point for all spacing-related tokens.
 * Provides clean, typed access to spacing values.
 */

// Types and interfaces
export type {
  SpacingScale,
  SpacingVariants,
  SpacingDirections,
  SpacingTokensClass,
  SpacingSize,
  SpacingDirection,
  SpacingType,
} from './spacing.class';

export type {
  SpacingContext,
  SpacingResponsive,
  ComponentSpacing,
} from './spacing.variants';

// Core spacing values
export {
  SPACING_SCALE,
  SPACING_VALUES,
  COMPONENT_SPACING_VALUES,
  RESPONSIVE_SPACING,
  ACCESSIBILITY_SPACING,
  SPACING_TOKENS,
} from './spacing.variables';

// Semantic spacing variants
export {
  SPACING_VARIANTS,
  SPACING_CONTEXTS,
  SPACING_RESPONSIVE,
  COMPONENT_SPACING,
} from './spacing.variants';

// Default export for convenience
export { SPACING_TOKENS as default } from './spacing.variables';