// Layera Shared - Viewport Package Main Export
// Enterprise pattern: Clean exports για όλες τις εφαρμογές

// Types
export type {
  DeviceType,
  Orientation,
  ViewportInfo,
  ViewportBreakpoints,
  ResponsiveConfig,
  // 🍎 ENHANCED: iPhone-specific types (absorbed from @layera/device-detection)
  DeviceFrame,
  DeviceSpecs,
  iPhoneDetectionOptions
} from './types';

// Hooks
export {
  useViewport,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useOrientation,
  // 🍎 ENHANCED: iPhone detection (absorbed from @layera/device-detection)
  useIPhone14ProMaxDetection
} from './hooks/useViewport';

// Components
export {
  ResponsiveContainer,
  MobileOnly,
  TabletOnly,
  DesktopOnly,
  MobileAndTablet,
  TabletAndDesktop
} from './components/ResponsiveContainer';

export { ViewportDebugger } from './components/ViewportDebugger';

export {
  DeviceOverrideProvider,
  useViewportWithOverride
} from './components/DeviceOverrideProvider';

// REMOVED: Device simulation components - simplified to pure responsive