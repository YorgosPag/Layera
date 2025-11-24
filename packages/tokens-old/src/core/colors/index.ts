/**
 * Colors Index - Export all color tokens
 *
 * 🎨 Κεντρικό σημείο export για όλο το color system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για colors
 */

// Type definitions & structure
export type {
  ColorScale,
  SemanticColor,
  NeutralColors,
  ColorTokensClass,
} from './colors.class';

export {
  COLOR_ACCESSIBILITY_RULES,
  COLOR_NAMING_CONVENTION,
} from './colors.class';

// Variants & contexts
export type {
  ColorThemeVariant,
  ColorContextVariant,
  ColorInteractionVariant,
  ColorSurfaceVariant,
  ColorVariants,
} from './colors.variants';

export {
  COLOR_VARIANT_MAPPING,
  SEMANTIC_MAPPING,
} from './colors.variants';

// Actual color values
export {
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  SEMANTIC_COLORS,
  NEUTRAL_COLORS,
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  COLOR_VARIABLES,
  CSS_VARIABLE_NAMES,
} from './colors.variables';

// Default exports για εύκολη χρήση
export const Colors = {
  primary: PRIMARY_COLORS,
  secondary: SECONDARY_COLORS,
  semantic: SEMANTIC_COLORS,
  neutral: NEUTRAL_COLORS,
  surface: SURFACE_COLORS,
  text: TEXT_COLORS,
  border: BORDER_COLORS,
} as const;

// Re-export των imports για convenience
import {
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  SEMANTIC_COLORS,
  NEUTRAL_COLORS,
  SURFACE_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
} from './colors.variables';