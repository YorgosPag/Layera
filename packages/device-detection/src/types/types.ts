/**
 * Device Detection Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για device detection χωρίς vendor dependencies
 */

export interface DeviceFrame {
  width: number;
  height: number;
  element?: Element;
}

export interface DeviceSpecs {
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'portrait' | 'landscape';
}

export interface DeviceDetectionResult {
  isIPhone14ProMax: boolean;
  isFrameBased: boolean;
  isWindowBased: boolean;
  specs: DeviceSpecs;
  frame?: DeviceFrame | undefined;
}

export interface DeviceDetectionOptions {
  frameSelector?: string;
  enableWindowFallback?: boolean;
  enableUserAgentFallback?: boolean;
  debugMode?: boolean;
}

export interface DeviceDetectionPort {
  detectiPhone14ProMax(options?: DeviceDetectionOptions): DeviceDetectionResult;
  getDeviceFrame(selector?: string): DeviceFrame | null;
  isInDeviceFrame(): boolean;
}