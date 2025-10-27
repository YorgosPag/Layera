/**
 * @layera/layout/sizing - MODULAR SIZING SYSTEM
 *
 * 🎯 PHASE 19: Separated sizing system για selective imports
 * Import SPACING_SCALE from '@layera/constants' - other features from '@layera/layout/sizing';
 */

// 🚀 ENTERPRISE SIZING SYSTEM - ADVANCED FEATURES ONLY
// Note: For SPACING_SCALE, import directly from '@layera/constants' for Single Source of Truth
export {
  SIZING_CSS_VARS,
  SIZING_UTILITIES,
  RESPONSIVE_SIZING,
  getSizingVar,
  getSizingValue,
  type SizingToken,
  type SizingCategory,
  type SizingTokenName
} from '../sizing';

// 🧩 SIZING HOOKS
export {
  useSizing,
  useSizingTokens,
  useSizingSystem,
  useResponsiveSizing,
  useSizingStyles
} from '../hooks/useSizing';