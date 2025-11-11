/**
 * @layera/viewport - Enterprise Viewport Hook
 * UNIFIED BREAKPOINT SYSTEM - Single Source of Truth
 * ARXES Compliant - No inline styles, no any types
 * Compatible με @layera/layout breakpoint system
 */

import { useState, useEffect } from 'react';
import { ViewportInfo, DeviceType, Orientation, BreakpointKey } from '../types';
import {
  getBreakpointFromWidth,
  getDeviceCategoryFromWidth,
  isBreakpointOrLarger,
  isBreakpointOrSmaller
} from '../breakpoints.js';

/**
 * Unified Enterprise Viewport Hook
 * Provides real-time viewport detection με unified breakpoint system
 * Compatible με @layera/layout breakpoint conventions
 */
export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>(() => {
    if (typeof window === 'undefined') {
      // SSR default: desktop breakpoint
      return createViewportInfo(1200, 768);
    }

    return createViewportInfo(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setViewport(createViewportInfo(width, height));
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return viewport;
};

/**
 * Δημιουργεί ViewportInfo object με unified system
 */
function createViewportInfo(width: number, height: number): ViewportInfo {
  const currentBreakpoint = getBreakpointFromWidth(width);
  const deviceCategory = getDeviceCategoryFromWidth(width);
  const orientation = getOrientation(width, height);

  // Legacy device type για backward compatibility
  const deviceType: DeviceType =
    deviceCategory === 'mobile' ? 'mobile' :
    deviceCategory === 'tablet' ? 'tablet' : 'desktop';

  return {
    // Current viewport state
    width,
    height,
    orientation,

    // Unified system
    currentBreakpoint,
    deviceCategory,

    // Legacy boolean helpers (maintained για backward compatibility)
    isMobile: deviceCategory === 'mobile',
    isTablet: deviceCategory === 'tablet',
    isDesktop: deviceCategory === 'desktop' || deviceCategory === 'desktopLarge',
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',

    // New breakpoint helper functions
    isBreakpoint: (breakpoint: BreakpointKey) => currentBreakpoint === breakpoint,
    isBreakpointOrLarger: (breakpoint: BreakpointKey) => isBreakpointOrLarger(width, breakpoint),
    isBreakpointOrSmaller: (breakpoint: BreakpointKey) => isBreakpointOrSmaller(width, breakpoint),

    // Legacy deviceType property για backward compatibility
    deviceType
  };
}


function getOrientation(width: number, height: number): Orientation {
  return width > height ? 'landscape' : 'portrait';
}

/**
 * Convenience hooks για backward compatibility
 * και εύκολη χρήση του unified viewport system
 */
export const useIsMobile = (): boolean => {
  const { isMobile } = useViewport();
  return isMobile;
};

export const useIsTablet = (): boolean => {
  const { isTablet } = useViewport();
  return isTablet;
};

export const useIsDesktop = (): boolean => {
  const { isDesktop } = useViewport();
  return isDesktop;
};

export const useOrientation = (): Orientation => {
  const { orientation } = useViewport();
  return orientation;
};

export const useBreakpoint = (): BreakpointKey => {
  const { currentBreakpoint } = useViewport();
  return currentBreakpoint;
};

export const useDeviceCategory = () => {
  const { deviceCategory } = useViewport();
  return deviceCategory;
};