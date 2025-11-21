/**
 * Badges Index - Export all badge tokens
 *
 * 🎯 Κεντρικό σημείο export για όλο το badges system
 * - Variables & actual values
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για badges
 */

// Actual badge values
export {
  BADGE_VARIABLES,
} from './badges.variables';

// Badge variants
export {
  BADGE_VARIANTS,
  BADGE_DEFAULT_VARIANTS,
  BADGE_SUCCESS_VARIANTS,
  BADGE_ERROR_VARIANTS,
  BADGE_WARNING_VARIANTS,
  BADGE_INFO_VARIANTS,
  BADGE_PRIMARY_VARIANTS,
  CHIP_VARIANTS,
  DOT_VARIANTS,
  NOTIFICATION_BADGE_VARIANTS,
  BADGE_SIZE_VARIANTS,
} from './badges.variants';

// Badge component system class
export {
  BadgeComponentSystem,
  LAYERA_BADGE_CSS,
} from './badges.class';

// Helper types from variables file
export type {
  BadgeVariant,
  BadgeSize,
  BadgeState,
  BadgeType,
} from './badges.variables';

// Helper types from variants file
export type {
  BadgeVariantType,
  BadgeDefaultVariant,
  BadgeSuccessVariant,
  BadgeErrorVariant,
  ChipVariant,
  NotificationVariant,
  BadgeSizeVariant,
} from './badges.variants';

// Default exports για εύκολη χρήση
export const Badges = {
  variables: BADGE_VARIABLES,
  variants: BADGE_VARIANTS,
  system: BadgeComponentSystem,
  css: LAYERA_BADGE_CSS,
} as const;

// Re-export των imports για convenience
import { BADGE_VARIABLES } from './badges.variables';
import { BADGE_VARIANTS } from './badges.variants';
import { BadgeComponentSystem, LAYERA_BADGE_CSS } from './badges.class';