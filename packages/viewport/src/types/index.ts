// Layera Shared - Viewport Detection Types
// Enterprise pattern: Consistent device detection across all apps
// 🚀 ENHANCED: Absorbed iPhone detection from @layera/device-detection

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Orientation = 'portrait' | 'landscape';


export interface ViewportInfo {
  deviceType: DeviceType;
  orientation: Orientation;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export interface ViewportBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface ResponsiveConfig {
  mobile: {
    breakpoint: number;
    maxWidth?: string;
    padding?: string;
    gridColumns?: number;
  };
  tablet: {
    breakpoint: number;
    maxWidth?: string;
    padding?: string;
    gridColumns?: number;
  };
  desktop: {
    breakpoint: number;
    maxWidth?: string;
    padding?: string;
    gridColumns?: number;
  };
}