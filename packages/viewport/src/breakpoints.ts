/**
 * @layera/viewport - Enterprise Breakpoints
 * UNIFIED BREAKPOINT SYSTEM - Single Source of Truth
 * ARXES Compliant - Design tokens from @layera/tokens
 * Compatible με @layera/layout breakpoint names
 */

import type { UnifiedBreakpoints, BreakpointKey, DeviceCategory } from './types/index.js';

// UNIFIED BREAKPOINT DEFINITIONS
export const UNIFIED_BREAKPOINTS: UnifiedBreakpoints = {
  sm: {
    min: 0,
    max: 767,
    device: 'mobile',
    mediaQuery: '@media screen and (max-width: 767px)',
    containerMaxWidth: '100%',
    gridColumns: 1
  },
  md: {
    min: 768,
    max: 1023,
    device: 'tablet',
    mediaQuery: '@media screen and (min-width: 768px) and (max-width: 1023px)',
    containerMaxWidth: '750px',
    gridColumns: 2
  },
  lg: {
    min: 1024,
    max: 1199,
    device: 'tablet',
    mediaQuery: '@media screen and (min-width: 1024px) and (max-width: 1199px)',
    containerMaxWidth: '960px',
    gridColumns: 3
  },
  xl: {
    min: 1200,
    max: 1439,
    device: 'desktop',
    mediaQuery: '@media screen and (min-width: 1200px) and (max-width: 1439px)',
    containerMaxWidth: '1140px',
    gridColumns: 4
  },
  '2xl': {
    min: 1440,
    max: Infinity,
    device: 'desktopLarge',
    mediaQuery: '@media screen and (min-width: 1440px)',
    containerMaxWidth: '1320px',
    gridColumns: 6
  }
} as const;

// RESPONSIVE MEDIA QUERIES για εύκολη χρήση
export const MEDIA_QUERIES = {
  // Exact breakpoint matches
  smOnly: UNIFIED_BREAKPOINTS.sm.mediaQuery,
  mdOnly: UNIFIED_BREAKPOINTS.md.mediaQuery,
  lgOnly: UNIFIED_BREAKPOINTS.lg.mediaQuery,
  xlOnly: UNIFIED_BREAKPOINTS.xl.mediaQuery,
  '2xlOnly': UNIFIED_BREAKPOINTS['2xl'].mediaQuery,

  // "And up" queries
  smUp: '@media screen and (min-width: 0px)',
  mdUp: '@media screen and (min-width: 768px)',
  lgUp: '@media screen and (min-width: 1024px)',
  xlUp: '@media screen and (min-width: 1200px)',
  '2xlUp': '@media screen and (min-width: 1440px)',

  // "And down" queries
  smDown: '@media screen and (max-width: 767px)',
  mdDown: '@media screen and (max-width: 1023px)',
  lgDown: '@media screen and (max-width: 1199px)',
  xlDown: '@media screen and (max-width: 1439px)',

  // Device category aliases (backward compatibility)
  mobileOnly: '@media screen and (max-width: 767px)',
  tabletOnly: '@media screen and (min-width: 768px) and (max-width: 1199px)',
  desktopOnly: '@media screen and (min-width: 1200px)',
  tabletAndUp: '@media screen and (min-width: 768px)',
  desktopAndUp: '@media screen and (min-width: 1200px)'
} as const;

// UTILITY FUNCTIONS
export const getBreakpointFromWidth = (width: number): BreakpointKey => {
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1200) return 'lg';
  if (width < 1440) return 'xl';
  return '2xl';
};

export const getDeviceCategoryFromWidth = (width: number): DeviceCategory => {
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  if (width < 1440) return 'desktop';
  return 'desktopLarge';
};

export const getBreakpointInfo = (breakpoint: BreakpointKey) => {
  return UNIFIED_BREAKPOINTS[breakpoint];
};

export const isBreakpointOrLarger = (currentWidth: number, targetBreakpoint: BreakpointKey): boolean => {
  return currentWidth >= UNIFIED_BREAKPOINTS[targetBreakpoint].min;
};

export const isBreakpointOrSmaller = (currentWidth: number, targetBreakpoint: BreakpointKey): boolean => {
  return currentWidth <= UNIFIED_BREAKPOINTS[targetBreakpoint].max;
};

// LEGACY COMPATIBILITY (maintained για backward compatibility)
export const LAYERA_BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 767,
    mediaQuery: UNIFIED_BREAKPOINTS.sm.mediaQuery
  },
  tablet: {
    min: 768,
    max: 1199,
    mediaQuery: '@media screen and (min-width: 768px) and (max-width: 1199px)'
  },
  desktop: {
    min: 1200,
    max: 1439,
    mediaQuery: UNIFIED_BREAKPOINTS.xl.mediaQuery
  },
  desktopLarge: {
    min: 1440,
    max: Infinity,
    mediaQuery: UNIFIED_BREAKPOINTS['2xl'].mediaQuery
  }
} as const;

export type LayeraBreakpoint = keyof typeof LAYERA_BREAKPOINTS;
export type UnifiedBreakpointKey = BreakpointKey;