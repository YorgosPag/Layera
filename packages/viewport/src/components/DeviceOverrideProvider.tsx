// Layera Shared - Device Override Provider Component
// Enterprise pattern: Manual device testing για development
// Usage: Override viewport detection για testing different devices

import React, { useState, createContext, useContext, ReactNode } from 'react';
import { DeviceType } from '../types';
import { useViewport as useOriginalViewport } from '../hooks/useViewport';

interface DeviceOverrideContextType {
  overrideDevice: DeviceType | null;
  setOverrideDevice: (device: DeviceType | null) => void;
}

export const DeviceOverrideContext = createContext<DeviceOverrideContextType>({
  overrideDevice: null,
  setOverrideDevice: () => {}
});

/**
 * Provider για device override functionality
 */
export const DeviceOverrideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overrideDevice, setOverrideDevice] = useState<DeviceType | null>(null);

  return (
    <DeviceOverrideContext.Provider value={{ overrideDevice, setOverrideDevice }}>
      {children}
    </DeviceOverrideContext.Provider>
  );
};

/**
 * Enhanced useViewport hook που υποστηρίζει manual override
 */
export const useViewportWithOverride = () => {
  const originalViewport = useOriginalViewport();
  const { overrideDevice } = useContext(DeviceOverrideContext);

  if (!overrideDevice) {
    return originalViewport;
  }

  // Override με manual device selection
  return {
    ...originalViewport,
    deviceType: overrideDevice,
    isMobile: overrideDevice === 'mobile',
    isTablet: overrideDevice === 'tablet',
    isDesktop: overrideDevice === 'desktop'
  };
};

export default DeviceOverrideProvider;