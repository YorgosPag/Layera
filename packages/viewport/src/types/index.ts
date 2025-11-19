/**
 * @layera/viewport - Enterprise Types
 * ARXES Compliant - Clean TypeScript types, no any
 * UNIFIED BREAKPOINT SYSTEM - Single Source of Truth
 */

// Legacy DeviceType για backward compatibility
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type Orientation = 'portrait' | 'landscape';

// UNIFIED BREAKPOINT SYSTEM
export type BreakpointKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type DeviceCategory = 'mobile' | 'tablet' | 'desktop' | 'desktopLarge';

export interface BreakpointDefinition {
  min: number;
  max: number;
  mediaQuery: string;
  device: DeviceCategory;
  containerMaxWidth?: string;
  gridColumns?: number;
}

export interface UnifiedBreakpoints {
  sm: BreakpointDefinition;   // mobile
  md: BreakpointDefinition;   // tablet
  lg: BreakpointDefinition;   // tablet large
  xl: BreakpointDefinition;   // desktop
  '2xl': BreakpointDefinition; // desktop large
}

export interface ViewportInfo {
  // Current viewport state
  width: number;
  height: number;
  orientation: Orientation;

  // Device detection (unified)
  currentBreakpoint: BreakpointKey;
  deviceCategory: DeviceCategory;

  // Boolean helpers
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;

  // Breakpoint helpers
  isBreakpoint: (_bp: BreakpointKey) => boolean;
  isBreakpointOrLarger: (_bp: BreakpointKey) => boolean;
  isBreakpointOrSmaller: (_bp: BreakpointKey) => boolean;

  // Legacy compatibility
  deviceType: DeviceType;
}

// Legacy interface για backward compatibility
export interface ViewportBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

// Enhanced responsive config με unified system
export interface ResponsiveConfig {
  [key: string]: {
    breakpoint: BreakpointKey;
    maxWidth?: string;
    padding?: string;
    gridColumns?: number;
  };
}