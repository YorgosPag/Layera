/**
 * Device Detection Types - Enterprise Single Source of Truth
 *
 * Καθαροί domain types για device detection χωρίς vendor dependencies
 */
interface DeviceFrame {
    width: number;
    height: number;
    element?: Element;
}
interface DeviceSpecs {
    width: number;
    height: number;
    aspectRatio: number;
    orientation: 'portrait' | 'landscape';
}
interface DeviceDetectionResult {
    isIPhone14ProMax: boolean;
    isFrameBased: boolean;
    isWindowBased: boolean;
    specs: DeviceSpecs;
    frame?: DeviceFrame | undefined;
}
interface DeviceDetectionOptions {
    frameSelector?: string;
    enableWindowFallback?: boolean;
    enableUserAgentFallback?: boolean;
    debugMode?: boolean;
}
interface DeviceDetectionPort {
    detectiPhone14ProMax(options?: DeviceDetectionOptions): DeviceDetectionResult;
    getDeviceFrame(selector?: string): DeviceFrame | null;
    isInDeviceFrame(): boolean;
}

/**
 * iPhone14ProMaxAdapter.ts - Enterprise Device Detection Adapter
 *
 * Εξαγμένη λογική από GeoMapNew.tsx για iPhone 14 Pro Max detection
 * Single source of truth για device detection στο Layera ecosystem
 */

declare class iPhone14ProMaxAdapter implements DeviceDetectionPort {
    private readonly DEFAULT_FRAME_SELECTOR;
    private readonly IPHONE_14_PRO_MAX_SPECS;
    detectiPhone14ProMax(options?: DeviceDetectionOptions): DeviceDetectionResult;
    getDeviceFrame(selector?: string): DeviceFrame | null;
    isInDeviceFrame(): boolean;
    private detectFrameBased;
    private detectWindowBased;
    private detectUserAgent;
    private getDeviceSpecs;
}

/**
 * useDeviceDetection.ts - Enterprise React Hook για Device Detection
 *
 * React hook που παρέχει reactive device detection functionality
 */

interface UseDeviceDetectionResult extends DeviceDetectionResult {
    refresh: () => void;
}
declare function useDeviceDetection(options?: DeviceDetectionOptions): UseDeviceDetectionResult;
declare function useIPhone14ProMaxDetection(options?: DeviceDetectionOptions): boolean;

export { type DeviceDetectionOptions, type DeviceDetectionPort, type DeviceDetectionResult, iPhone14ProMaxAdapter as DeviceDetector, type DeviceFrame, type DeviceSpecs, type UseDeviceDetectionResult, iPhone14ProMaxAdapter, useDeviceDetection, useIPhone14ProMaxDetection, useIPhone14ProMaxDetection as useIPhoneDetection };
