/**
 * Layera Layout System - Main Entry Point
 * KADOS Compliant - Enterprise CSS με design tokens μόνο
 */

// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// CSS Import για layout classes
// import './styles/layout.css';

// Layout Primitives (Enterprise)
export { Stack } from './components/Stack';
export { Flex } from './components/Flex';
export { Box } from './components/Box';

// Layout Shortcuts (Φάση 2.2 - Αντικαθιστά hardcoded patterns)
export {
  FlexCenter,
  FlexBetween,
  FlexColumn,
  FlexRow,
  FlexWrap
} from './utils/shortcuts';

// Container Components
export { PageContainer, PageHeader } from './components/Container';

// Header Components (KADOS Compliant)
export { LayeraHeader, HeaderActionsGroup } from './components/Header';

// Hooks
export { useGeoAlertLayout } from './hooks/useGeoAlertLayout';

// Enterprise Layout Hooks (useSizing removed - missing file)

export {
  useFlex,
  useFlexPatterns,
  useFlexItem,
  useFlexSystem,
  useResponsiveFlex
} from './hooks/useFlex';

// Types
export type * from './types';
export type * from './types/geoalert-layout.types';

// GeoAlert Layout Utils (Enterprise)
export {
  GEOALERT_LAYOUT_CONFIG,
  calculateGeoAlertPositions,
  createGeoAlertCardStyles,
  createGeoAlertInfoPanelStyles,
  updateGeoAlertLayoutVariables
} from './utils/geoalert-layout';

// Enterprise Sizing System (sizing module removed - missing file)

// 🚀 NEW: Advanced Flex System
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
} from './flex';