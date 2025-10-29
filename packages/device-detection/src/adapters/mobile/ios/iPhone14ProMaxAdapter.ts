/**
 * iPhone14ProMaxAdapter.ts - Enterprise Device Detection Adapter
 *
 * Εξαγμένη λογική από GeoMapNew.tsx για iPhone 14 Pro Max detection
 * Single source of truth για device detection στο Layera ecosystem
 */

import {
  DeviceDetectionPort,
  DeviceDetectionResult,
  DeviceDetectionOptions,
  DeviceFrame,
  DeviceSpecs
} from '../../../types';

export class iPhone14ProMaxAdapter implements DeviceDetectionPort {
  private readonly DEFAULT_FRAME_SELECTOR = '.device-frame-wrapper';
  private readonly IPHONE_14_PRO_MAX_SPECS = {
    VIEWPORT_WIDTH: 430,
    VIEWPORT_HEIGHT: 932,
    FRAME_WIDTH_MIN: 412,
    FRAME_WIDTH_MAX: 416,
    FRAME_HEIGHT_MIN: 914,
    FRAME_HEIGHT_MAX: 920,
    EXACT_FRAME_WIDTH: 414,
    EXACT_FRAME_HEIGHT: 916
  } as const;

  detectiPhone14ProMax(options: DeviceDetectionOptions = {}): DeviceDetectionResult {
    const {
      frameSelector = this.DEFAULT_FRAME_SELECTOR,
      enableWindowFallback = true,
      enableUserAgentFallback = true,
      debugMode = false
    } = options;

    const frame = this.getDeviceFrame(frameSelector);
    const isInFrame = this.isInDeviceFrame();

    const isFrameBased = this.detectFrameBased(frame);
    const isWindowBased = enableWindowFallback ? this.detectWindowBased() : false;
    const isUserAgentBased = enableUserAgentFallback ? this.detectUserAgent() : false;

    const isIPhone14ProMax = isFrameBased || (!isInFrame && (isWindowBased || isUserAgentBased));

    const specs = this.getDeviceSpecs();

    if (debugMode) {}

    return {
      isIPhone14ProMax,
      isFrameBased,
      isWindowBased: isWindowBased || isUserAgentBased,
      specs,
      frame: frame || undefined
    };
  }

  getDeviceFrame(selector: string = this.DEFAULT_FRAME_SELECTOR): DeviceFrame | null {
    const element = document.querySelector(selector);

    if (!element) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    return {
      width: rect.width,
      height: rect.height,
      element
    };
  }

  isInDeviceFrame(): boolean {
    return !!document.querySelector(this.DEFAULT_FRAME_SELECTOR);
  }

  private detectFrameBased(frame: DeviceFrame | null): boolean {
    if (!frame) {
      return false;
    }

    const { width, height } = frame;
    const specs = this.IPHONE_14_PRO_MAX_SPECS;

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

  private detectWindowBased(): boolean {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const specs = this.IPHONE_14_PRO_MAX_SPECS;

    // Portrait mode
    const isPortrait = width === specs.VIEWPORT_WIDTH && height === specs.VIEWPORT_HEIGHT;

    // Landscape mode
    const isLandscape = width === specs.VIEWPORT_HEIGHT && height === specs.VIEWPORT_WIDTH;

    return isPortrait || isLandscape;
  }

  private detectUserAgent(): boolean {
    return /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent);
  }

  private getDeviceSpecs(): DeviceSpecs {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const orientation = width > height ? 'landscape' : 'portrait';

    return {
      width,
      height,
      aspectRatio,
      orientation
    };
  }
}