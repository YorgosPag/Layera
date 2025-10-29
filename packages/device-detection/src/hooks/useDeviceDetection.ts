/**
 * useDeviceDetection.ts - Enterprise React Hook για Device Detection
 *
 * React hook που παρέχει reactive device detection functionality
 */

import { useState, useEffect, useMemo } from 'react';
import { iPhone14ProMaxAdapter } from '../adapters/mobile/ios/iPhone14ProMaxAdapter';
import {
  DeviceDetectionResult,
  DeviceDetectionOptions
} from '../types';

export interface UseDeviceDetectionResult extends DeviceDetectionResult {
  refresh: () => void;
}

export function useDeviceDetection(
  options: DeviceDetectionOptions = {}
): UseDeviceDetectionResult {
  const adapter = useMemo(() => new iPhone14ProMaxAdapter(), []);

  const [result, setResult] = useState<DeviceDetectionResult>(() =>
    adapter.detectiPhone14ProMax(options)
  );

  const refresh = (): void => {
    setResult(adapter.detectiPhone14ProMax(options));
  };

  useEffect(() => {
    const handleResize = (): void => {
      refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [options]);

  return {
    ...result,
    refresh
  };
}

// Συντομευμένη έκδοση για μόνο iPhone 14 Pro Max detection
export function useIPhone14ProMaxDetection(
  options: DeviceDetectionOptions = {}
): boolean {
  const { isIPhone14ProMax } = useDeviceDetection(options);
  return isIPhone14ProMax;
}