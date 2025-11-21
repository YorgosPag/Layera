/**
 * Disclosure Index - Export all disclosure tokens
 *
 * 🎭 Κεντρικό σημείο export για όλο το disclosure system
 * - Class definitions & interfaces
 * - Variants & contexts
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για disclosure components
 */

// Type definitions & structure
export type {
  DisclosureType,
  DisclosureSize,
  DisclosureVariant,
  DisclosureState,
  TabsOrientation,
  DisclosureSystemStructure,
} from './disclosure.variables';

export {
  DisclosureSystem,
  DISCLOSURE_SEMANTIC_RULES,
  LAYERA_DISCLOSURE_CSS,
} from './disclosure.class';

// Variants & contexts
export type {
  AccordionVariantType,
  TabsVariantType,
  DisclosureSizeVariantType,
  CollapsibleVariantType,
  TabsOrientationVariantType,
} from './disclosure.variants';

export {
  ACCORDION_VARIANTS,
  TABS_VARIANTS,
  DISCLOSURE_SIZE_VARIANTS,
  COLLAPSIBLE_VARIANTS,
  TABS_ORIENTATION_VARIANTS,
} from './disclosure.variants';

// Actual disclosure values
export {
  DISCLOSURE_VARIABLES,
} from './disclosure.variables';

// Default exports για εύκολη χρήση
export const Disclosure = {
  variables: DISCLOSURE_VARIABLES,
  accordionVariants: ACCORDION_VARIANTS,
  tabsVariants: TABS_VARIANTS,
  sizeVariants: DISCLOSURE_SIZE_VARIANTS,
  collapsibleVariants: COLLAPSIBLE_VARIANTS,
  orientationVariants: TABS_ORIENTATION_VARIANTS,
  system: DisclosureSystem,
} as const;

// Re-export των imports για convenience
import { DISCLOSURE_VARIABLES } from './disclosure.variables';
import {
  ACCORDION_VARIANTS,
  TABS_VARIANTS,
  DISCLOSURE_SIZE_VARIANTS,
  COLLAPSIBLE_VARIANTS,
  TABS_ORIENTATION_VARIANTS
} from './disclosure.variants';
import { DisclosureSystem } from './disclosure.class';