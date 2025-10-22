/**
 * @layera/device-detection - Enterprise Device Detection LEGO Package
 *
 * Single source of truth για device detection στο Layera ecosystem.
 * Enterprise architecture με organized structure για scalability.
 */

// 🏛️ Enterprise barrel exports
export * from './types';
export * from './adapters';
export * from './hooks';

// 🔄 Backward compatibility exports (για smooth migration)
export { iPhone14ProMaxAdapter } from './adapters/mobile/ios/iPhone14ProMaxAdapter';
export { useIPhone14ProMaxDetection } from './hooks/useDeviceDetection';

// 🎯 Convenience aliases για common usage patterns
export { iPhone14ProMaxAdapter as DeviceDetector } from './adapters/mobile/ios/iPhone14ProMaxAdapter';
export { useIPhone14ProMaxDetection as useIPhoneDetection } from './hooks/useDeviceDetection';