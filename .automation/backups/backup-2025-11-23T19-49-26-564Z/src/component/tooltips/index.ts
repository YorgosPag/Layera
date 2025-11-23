/**
 * Tooltips Index - Export all tooltip tokens
 *
 * 💬 Κεντρικό σημείο export για όλο το tooltips system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για tooltips
 */

// Type definitions & structure
export type {
  TooltipVariant,
  TooltipSize,
  TooltipPlacement,
  PopoverTrigger,
  TooltipSystemStructure,
} from './tooltips.variables';

export {
  TooltipsSystem,
  TOOLTIP_SEMANTIC_RULES,
  LAYERA_TOOLTIP_CSS,
} from './tooltips.class';

// Variants & contexts
export type {
  TooltipVariantType,
  PopoverVariantType,
  TooltipSizeVariantType,
  TooltipPlacementVariantType,
} from './tooltips.variants';

export {
  TOOLTIP_VARIANTS,
  POPOVER_VARIANTS,
  TOOLTIP_SIZE_VARIANTS,
  TOOLTIP_PLACEMENT_VARIANTS,
} from './tooltips.variants';

// Actual tooltip values
export {
  TOOLTIPS_VARIABLES,
} from './tooltips.variables';

// Default exports για εύκολη χρήση
export const Tooltips = {
  variables: TOOLTIPS_VARIABLES,
  variants: TOOLTIP_VARIANTS,
  popoverVariants: POPOVER_VARIANTS,
  sizeVariants: TOOLTIP_SIZE_VARIANTS,
  placementVariants: TOOLTIP_PLACEMENT_VARIANTS,
  system: TooltipsSystem,
} as const;

// Re-export των imports για convenience
import { TOOLTIPS_VARIABLES } from './tooltips.variables';
import {
  TOOLTIP_VARIANTS,
  POPOVER_VARIANTS,
  TOOLTIP_SIZE_VARIANTS,
  TOOLTIP_PLACEMENT_VARIANTS
} from './tooltips.variants';
import { TooltipsSystem } from './tooltips.class';