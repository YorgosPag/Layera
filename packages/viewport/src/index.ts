// Layera Shared - Viewport Package Main Export
// Enterprise pattern: Clean exports για όλες τις εφαρμογές

// Types
export type {
  DeviceType,
  Orientation,
  ViewportInfo,
  ViewportBreakpoints,
  ResponsiveConfig
} from './types';

// Hooks
export {
  useViewport,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useOrientation
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
  DeviceSwitcher,
  DeviceOverrideProvider,
  useViewportWithOverride
} from './components/DeviceSwitcher';