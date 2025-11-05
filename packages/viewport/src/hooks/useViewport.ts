// Layera Shared - Viewport Detection Hook
// Enterprise pattern: Single source of truth για viewport detection
// Usage: Όλες οι εφαρμογές χρησιμοποιούν το ίδιο hook
// 🚀 ENHANCED: Absorbed mobile detection from @layera/device-detection - ZERO DUPLICATES

import { useState, useEffect, useMemo } from 'react';
// 🚀 ENTERPRISE: Single Source of Truth - Device specs from @layera/constants
// Local device breakpoints (simplified from @layera/constants)
const DEVICE_BREAKPOINTS = {
  MOBILE: 480,
  MOBILE_MAX: 767,
  TABLET: 768,
  DESKTOP: 1024
};

import { ViewportInfo, DeviceType, Orientation } from '../types';

// 🚀 ENTERPRISE: All constants moved to @layera/constants - Single Source of Truth

/**
 * Enterprise Viewport Hook
 * Provides real-time device type detection with SSR support
 * 🚀 ENHANCED: Single Source of Truth για responsive device detection
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
        isLandscape: true,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = getOrientation(width, height);

    const deviceType = getDeviceType(width);

    return {
      deviceType,
      orientation,
      width,
      height,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
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
        const orientation = getOrientation(width, height);

        const deviceType = getDeviceType(width);

        setViewport({
          deviceType,
          orientation,
          width,
          height,
          isMobile: deviceType === 'mobile',
          isTablet: deviceType === 'tablet',
          isDesktop: deviceType === 'desktop',
          isPortrait: orientation === 'portrait',
          isLandscape: orientation === 'landscape',
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
      navigator.userAgent.includes('Mobile') ||
      navigator.userAgent.includes('iPad') ||
      // Browser simulator detection - όταν το viewport είναι μικρό αλλά το screen μεγάλο
      (width <= 430 && window.screen.width > 1000) ||
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
    const isSimulatorSize = width <= 430 || (aspectRatio < 0.8 && width <= DEVICE_BREAKPOINTS.MOBILE);

    if (width <= DEVICE_BREAKPOINTS.MOBILE_MAX || isSimulatorSize) {
      return 'mobile';
    }
  }

  // Fallback σε breakpoint-based detection
  if (width < DEVICE_BREAKPOINTS.MOBILE) {
    return 'mobile';
  } else if (width < DEVICE_BREAKPOINTS.TABLET) {
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


