// Layera Shared - Viewport Detection Hook
// Enterprise pattern: Single source of truth για viewport detection
// Usage: Όλες οι εφαρμογές χρησιμοποιούν το ίδιο hook

import { useState, useEffect } from 'react';
import { ViewportInfo, DeviceType, Orientation } from '../types';

// Default breakpoints (mobile-first approach)
const DEFAULT_BREAKPOINTS = {
  mobile: 768,    // 0-767px = mobile
  tablet: 1024,   // 768-1023px = tablet
  desktop: 1025   // 1024px+ = desktop
};

/**
 * Enterprise Viewport Hook
 * Provides real-time device type detection with SSR support
 */
export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>(() => {
    // SSR safe initialization
    if (typeof window === 'undefined') {
      return {
        deviceType: 'desktop' as DeviceType,
        orientation: 'landscape' as Orientation,
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isPortrait: false,
        isLandscape: true
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width);
    const orientation = getOrientation(width, height);

    return {
      deviceType,
      orientation,
      width,
      height,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape'
    };
  });

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      // Debounce για performance
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const deviceType = getDeviceType(width);
        const orientation = getOrientation(width, height);

        setViewport({
          deviceType,
          orientation,
          width,
          height,
          isMobile: deviceType === 'mobile',
          isTablet: deviceType === 'tablet',
          isDesktop: deviceType === 'desktop',
          isPortrait: orientation === 'portrait',
          isLandscape: orientation === 'landscape'
        });
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
 * Determine device type based on width
 */
function getDeviceType(width: number): DeviceType {
  if (width < DEFAULT_BREAKPOINTS.mobile) {
    return 'mobile';
  } else if (width < DEFAULT_BREAKPOINTS.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Determine orientation
 */
function getOrientation(width: number, height: number): Orientation {
  return width > height ? 'landscape' : 'portrait';
}

/**
 * Convenience hooks για specific device checks
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