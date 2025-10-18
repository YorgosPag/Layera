/**
 * Core layout types for the Layera Layout System
 */

export type LayoutVariant =
  | 'dashboard'
  | 'fullscreen'
  | 'fullscreen-map'
  | 'minimal'
  | 'dual-sidebar';

export type HeaderVariant = 'minimal' | 'standard' | 'rich';

export type SidebarVariant = 'default' | 'overlay' | 'push';

export type SidebarPosition = 'left' | 'right';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;

export type SpacingSize = 'none' | 'sm' | 'md' | 'lg';

export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface LayoutState {
  sidebarCollapsed: boolean;
  headerHeight: number;
  sidebarWidth: number;
  breakpoint: BreakpointSize;
}

export interface LayoutActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setHeaderHeight: (height: number) => void;
}

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  currentBreakpoint: BreakpointSize;
  windowSize: { width: number; height: number };
}