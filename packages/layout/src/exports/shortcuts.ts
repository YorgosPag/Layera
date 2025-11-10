/**
 * @layera/layout/shortcuts - LAYOUT SHORTCUTS SYSTEM
 *
 * 🎯 PHASE 19: Separated shortcuts για selective imports
 * Import only when needed: import { FlexCenter } from '@layera/layout/shortcuts';
 */

// 🚀 LAYOUT SHORTCUTS (Φάση 2.2 - Αντικαθιστά hardcoded patterns)
export {
  FlexCenter,
  FlexBetween,
  FlexColumn,
  FlexRow,
  FlexWrap
} from '../utils/shortcuts';

// 🧩 FLEX SYSTEM
export {
  FLEX_SCALE,
  FLEX_CSS_VARS,
  FLEX_UTILITIES,
  COMPLETE_FLEX_SYSTEM,
  getFlexVar,
  type FlexDirection,
  type FlexJustify,
  type FlexAlign,
  type FlexAlignContent,
  type FlexWrap as FlexWrapType,
  type FlexValue,
  type FlexGap
} from '../flex';

// 🧩 FLEX HOOKS
export {
  useFlex,
  useFlexPatterns,
  useFlexItem,
  useFlexSystem,
  useResponsiveFlex
} from '../hooks/useFlex';