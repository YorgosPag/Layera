/**
 * @layera/viewport - Enterprise Viewport Hook
 * KADOS Compliant - No inline styles, no any types
 * Single source of truth για viewport detection
 */

import { useState, useEffect } from 'react';
import { ViewportInfo, DeviceType, Orientation } from '../types';

const DEFAULT_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1025
};

/**
 * Enterprise Viewport Hook
 * Provides real-time device type detection with SSR support
 */
export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>(() => {
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

function getDeviceType(width: number): DeviceType {
  if (typeof window !== 'undefined') {
    const isSimulator =
      navigator.userAgent.includes('Mobile') ||
      navigator.userAgent.includes('Android') ||
      navigator.userAgent.includes('iPhone') ||
      navigator.userAgent.includes('iPad') ||
      (width <= 430 && window.screen.width > 1000) ||
      (width === 375 && window.innerHeight === 667) ||
      (width === 414 && window.innerHeight === 896) ||
      (width === 430 && window.innerHeight === 932) ||
      (width === 390 && window.innerHeight === 844) ||
      window.orientation !== undefined ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (isSimulator && width <= 768) {
      return 'mobile';
    }

    const height = window.innerHeight;
    const aspectRatio = width / height;
    const isSimulatorSize = width <= 430 || (aspectRatio < 0.8 && width <= 768);

    if (width <= 480 || isSimulatorSize) {
      return 'mobile';
    }
  }

  if (width < DEFAULT_BREAKPOINTS.mobile) {
    return 'mobile';
  } else if (width < DEFAULT_BREAKPOINTS.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

function getOrientation(width: number, height: number): Orientation {
  return width > height ? 'landscape' : 'portrait';
}

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