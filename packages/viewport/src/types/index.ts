// Layera Shared - Viewport Detection Types
// Enterprise pattern: Consistent device detection across all apps
// 🚀 ENHANCED: Absorbed iPhone detection from @layera/device-detection

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'iphone';
export type Orientation = 'portrait' | 'landscape';

// 🆕 ABSORBED: iPhone-specific types from device-detection
export interface DeviceFrame {
  width: number;
  height: number;
  element?: Element;
}

export interface DeviceSpecs {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: Orientation;
}

export interface iPhoneDetectionOptions {
  frameSelector?: string;
  enableWindowFallback?: boolean;
  enableUserAgentFallback?: boolean;
  debugMode?: boolean;
}

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
  // 🆕 ENHANCED: iPhone 14 Pro Max detection
  isIPhone14ProMax: boolean;
  isFrameBased?: boolean;
  isWindowBased?: boolean;
  specs?: DeviceSpecs;
  frame?: DeviceFrame;
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