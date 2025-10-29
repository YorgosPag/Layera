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

    const handleResize = (): void => {
      // Debounce για performance
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout((): void => {
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
 * Determine device type based on width and browser simulator detection
 */
function getDeviceType(width: number): DeviceType {
  // Enhanced detection για browser device simulators
  if (typeof window !== 'undefined') {
    // Έλεγχος για Chrome DevTools device simulation
    const isSimulator =
      navigator.userAgent.includes('Mobile') ||
      navigator.userAgent.includes('Android') ||
      navigator.userAgent.includes('iPhone') ||
      navigator.userAgent.includes('iPad') ||
      // Browser simulator detection - όταν το viewport είναι μικρό αλλά το screen μεγάλο
      (width <= 430 && window.screen.width > 1000) ||
      // Specific mobile simulator sizes
      (width === 375 && window.innerHeight === 667) || // iPhone 6/7/8
      (width === 414 && window.innerHeight === 896) || // iPhone 11/XR
      (width === 430 && window.innerHeight === 932) || // iPhone 14 Pro Max
      (width === 390 && window.innerHeight === 844) || // iPhone 12/13/14
      // DevTools mobile simulation indicators
      window.orientation !== undefined ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    // Αν ανιχνεύθηκε simulator/mobile device, επιστρέφουμε mobile
    if (isSimulator && width <= 768) {
      return 'mobile';
    }

    // Testing mode: εάν το browser window είναι μικρό, θεώρησέ το mobile
    // Ή αν είμαστε σε DevTools simulator (aspect ratio check)
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const isSimulatorSize = width <= 430 || (aspectRatio < 0.8 && width <= 768);

    if (width <= 480 || isSimulatorSize) {
      return 'mobile';
    }
  }

  // Fallback σε breakpoint-based detection
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