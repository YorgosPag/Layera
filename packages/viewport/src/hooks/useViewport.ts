// Layera Shared - Viewport Detection Hook
// Enterprise pattern: Single source of truth για viewport detection
// Usage: Όλες οι εφαρμογές χρησιμοποιούν το ίδιο hook
// 🚀 ENHANCED: Absorbed iPhone detection from @layera/device-detection - ZERO DUPLICATES

import { useState, useEffect, useMemo } from 'react';
// 🚀 ENTERPRISE: Single Source of Truth - Device specs from @layera/constants
import { IPHONE_14_PRO_MAX_SPECS, DEVICE_BREAKPOINTS, DEVICE_VIEWPORTS } from '@layera/constants';
import { ViewportInfo, DeviceType, Orientation, DeviceFrame, DeviceSpecs, iPhoneDetectionOptions } from '../types';

// 🚀 ENTERPRISE: All constants moved to @layera/constants - Single Source of Truth

const DEFAULT_FRAME_SELECTOR = '.device-frame-wrapper';

/**
 * Enterprise Viewport Hook
 * Provides real-time device type detection with SSR support
 * 🚀 ENHANCED: Single Source of Truth με iPhone 14 Pro Max detection
 */
export const useViewport = (iPhoneOptions: iPhoneDetectionOptions = {}): ViewportInfo => {
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
        isIPhone14ProMax: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = getOrientation(width, height);

    // 🍎 ENTERPRISE: iPhone detection first, then fallback to generic
    const iPhoneDetection = detectiPhone14ProMax(iPhoneOptions);
    const deviceType = iPhoneDetection.isIPhone14ProMax ? 'iphone' : getDeviceType(width);

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
      isIPhone14ProMax: iPhoneDetection.isIPhone14ProMax,
      isFrameBased: iPhoneDetection.isFrameBased,
      isWindowBased: iPhoneDetection.isWindowBased,
      specs: iPhoneDetection.specs,
      frame: iPhoneDetection.frame
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

        // 🍎 ENTERPRISE: iPhone detection first, then fallback
        const iPhoneDetection = detectiPhone14ProMax(iPhoneOptions);
        const deviceType = iPhoneDetection.isIPhone14ProMax ? 'iphone' : getDeviceType(width);

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
          isIPhone14ProMax: iPhoneDetection.isIPhone14ProMax,
          isFrameBased: iPhoneDetection.isFrameBased,
          isWindowBased: iPhoneDetection.isWindowBased,
          specs: iPhoneDetection.specs,
          frame: iPhoneDetection.frame
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
      (width <= IPHONE_14_PRO_MAX_SPECS.VIEWPORT_WIDTH && window.screen.width > 1000) ||
      // Specific mobile simulator sizes
      (width === DEVICE_VIEWPORTS.IPHONE_6_7_8.width && window.innerHeight === DEVICE_VIEWPORTS.IPHONE_6_7_8.height) || // iPhone 6/7/8
      (width === DEVICE_VIEWPORTS.IPHONE_11_XR.width && window.innerHeight === DEVICE_VIEWPORTS.IPHONE_11_XR.height) || // iPhone 11/XR
      (width === DEVICE_VIEWPORTS.IPHONE_14_PRO_MAX.width && window.innerHeight === DEVICE_VIEWPORTS.IPHONE_14_PRO_MAX.height) || // iPhone 14 Pro Max
      (width === DEVICE_VIEWPORTS.IPHONE_12_13_14.width && window.innerHeight === DEVICE_VIEWPORTS.IPHONE_12_13_14.height) || // iPhone 12/13/14
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
    const isSimulatorSize = width <= IPHONE_14_PRO_MAX_SPECS.VIEWPORT_WIDTH || (aspectRatio < 0.8 && width <= DEVICE_BREAKPOINTS.MOBILE);

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

/**
 * 🍎 ABSORBED: iPhone 14 Pro Max detection from @layera/device-detection
 * ENTERPRISE Single Source of Truth implementation
 */
export const useIPhone14ProMaxDetection = (options: iPhoneDetectionOptions = {}): boolean => {
  const { isIPhone14ProMax } = useViewport(options);
  return isIPhone14ProMax;
};

// 🍎 INTERNAL: iPhone detection logic (absorbed from device-detection adapter)
function detectiPhone14ProMax(options: iPhoneDetectionOptions = {}) {
  const {
    frameSelector = DEFAULT_FRAME_SELECTOR,
    enableWindowFallback = true,
    enableUserAgentFallback = true,
    debugMode = false
  } = options;

  if (typeof window === 'undefined') {
    return {
      isIPhone14ProMax: false,
      isFrameBased: false,
      isWindowBased: false,
      specs: { width: 0, height: 0, aspectRatio: 0, orientation: 'landscape' as Orientation }
    };
  }

  const frame = getDeviceFrame(frameSelector);
  const isInFrame = isInDeviceFrame(frameSelector);

  const isFrameBased = detectFrameBased(frame);
  const isWindowBased = enableWindowFallback ? detectWindowBased() : false;
  const isUserAgentBased = enableUserAgentFallback ? detectUserAgent() : false;

  const isIPhone14ProMax = isFrameBased || (!isInFrame && (isWindowBased || isUserAgentBased));
  const specs = getDeviceSpecs();

  return {
    isIPhone14ProMax,
    isFrameBased,
    isWindowBased: isWindowBased || isUserAgentBased,
    specs,
    frame: frame || undefined
  };
}

function getDeviceFrame(selector: string): DeviceFrame | null {
  if (typeof document === 'undefined') return null;

  const element = document.querySelector(selector);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    element
  };
}

function isInDeviceFrame(selector: string): boolean {
  if (typeof document === 'undefined') return false;
  return !!document.querySelector(selector);
}

function detectFrameBased(frame: DeviceFrame | null): boolean {
  if (!frame) return false;

  const { width, height } = frame;
  const specs = IPHONE_14_PRO_MAX_SPECS;

  // Exact match
  const isExactMatch = width === specs.EXACT_FRAME_WIDTH && height === specs.EXACT_FRAME_HEIGHT;

  // Range match
  const isRangeMatch =
    width >= specs.FRAME_WIDTH_MIN &&
    width <= specs.FRAME_WIDTH_MAX &&
    height >= specs.FRAME_HEIGHT_MIN &&
    height <= specs.FRAME_HEIGHT_MAX;

  return isExactMatch || isRangeMatch;
}

function detectWindowBased(): boolean {
  if (typeof window === 'undefined') return false;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const specs = IPHONE_14_PRO_MAX_SPECS;

  // Portrait mode
  const isPortrait = width === specs.VIEWPORT_WIDTH && height === specs.VIEWPORT_HEIGHT;

  // Landscape mode
  const isLandscape = width === specs.VIEWPORT_HEIGHT && height === specs.VIEWPORT_WIDTH;

  return isPortrait || isLandscape;
}

function detectUserAgent(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent);
}

function getDeviceSpecs(): DeviceSpecs {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, aspectRatio: 0, orientation: 'landscape' };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;
  const orientation = width > height ? 'landscape' : 'portrait';

  return { width, height, aspectRatio, orientation };
}