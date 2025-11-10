/**
 * @layera/viewport - Enterprise Types
 * KADOS Compliant - Clean TypeScript types, no any
 */

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