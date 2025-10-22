/**
 * @layera/device-detection - Enterprise Device Detection LEGO Package
 *
 * Single source of truth για device detection στο Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 */

export * from './types';
export * from './iPhone14ProMaxAdapter';
export * from './useDeviceDetection';

// Convenience exports για συχνή χρήση
export { iPhone14ProMaxAdapter as DeviceDetector } from './iPhone14ProMaxAdapter';
export { useIPhone14ProMaxDetection as useIPhoneDetection } from './useDeviceDetection';