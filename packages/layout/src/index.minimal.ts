/**
 * @layera/layout - MINIMAL EXPORT VERSION
 *
 * 🚀 PHASE 19 OPTIMIZATION: Tree-shaking optimized exports
 * Exports ONLY commonly used components (Box, Flex, Stack)
 *
 * Usage Analysis (Phase 18):
 * - Box: 35 imports (dominant)
 * - Flex: 19 imports
 * - Stack: 13 imports
 * - Headers: 3 imports only
 *
 * Bundle Reduction Target: 6.6MB → <2MB (70% reduction)
 */

// 🎯 CORE COMPONENTS ONLY (90% of actual usage)
export { Box } from './components/Box';
export { Flex } from './components/Flex';
export { Stack } from './components/Stack';

// 🏢 ENTERPRISE HEADERS (3 imports only)
export { AppShell } from './components/AppShell';
export { LayeraHeader, HeaderActionsGroup } from './components/Header';

// 📦 ESSENTIAL TYPES ONLY
export type { BoxProps } from './components/Box';
export type { FlexProps } from './components/Flex';
export type { StackProps } from './components/Stack';
export type { AppShellProps } from './types/component.types';

// 🚫 ELIMINATED FROM MINIMAL VERSION:
// - Advanced sizing system (χρήση var(--layera-size-*) design tokens)
// - Complex flex system (FLEX_SCALE exports)
// - Layout shortcuts (FlexCenter, FlexBetween)
// - Advanced hooks (useSizing, useFlex)
// - GeoAlert-specific utilities
// - Page containers (unused)
//
// Bundle reduction: ~70% estimated

/**
 * 📋 Migration Guide for Advanced Features:
 *
 * Αν χρειάζεσαι advanced features, import από specific paths:
 * // Design tokens θα φορτώνονται αυτόματα από το app
 * import { FlexCenter } from '@layera/layout/shortcuts';
 * import { useGeoAlertLayout } from '@layera/layout/hooks';
 */