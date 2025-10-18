// Layera Shared - Device Switcher Component
// Enterprise pattern: Manual device testing για development
// Usage: Override viewport detection για testing different devices

import React, { useState, createContext, useContext, ReactNode } from 'react';
import { DeviceType } from '../types';
import { useViewport as useOriginalViewport } from '../hooks/useViewport';
import { RefreshIcon, MobileIcon, TabletIcon, DesktopIcon } from './icons/ViewportIcons';

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

interface DeviceSwitcherProps {
  position?: 'top-left' | 'top-center' | 'top-right';
  showInProduction?: boolean;
}

/**
 * Device Switcher Button για manual testing
 */
export const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  position = 'top-center',
  showInProduction = false
}) => {
  const { overrideDevice, setOverrideDevice } = useContext(DeviceOverrideContext);
  const originalViewport = useOriginalViewport();

  // Hide in production unless explicitly requested
  if (process.env.NODE_ENV === 'production' && !showInProduction) {
    return null;
  }

  const getPositionStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9998, // Below debugger
      backdropFilter: 'blur(8px)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0.5rem'
    };

    switch (position) {
      case 'top-left':
        return { ...baseStyles, top: '1rem', left: '1rem' };
      case 'top-center':
        return {
          ...baseStyles,
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)'
        };
      case 'top-right':
        return { ...baseStyles, top: '1rem', right: '1rem' };
      default:
        return { ...baseStyles, top: '1rem', right: '1rem' };
    }
  };

  const devices: { type: DeviceType | null; icon: React.ReactNode; label: string }[] = [
    { type: null, icon: <RefreshIcon size="sm" theme="neutral" />, label: 'Auto' },
    { type: 'mobile', icon: <MobileIcon size="sm" theme="neutral" />, label: 'Mobile' },
    { type: 'tablet', icon: <TabletIcon size="sm" theme="neutral" />, label: 'Tablet' },
    { type: 'desktop', icon: <DesktopIcon size="sm" theme="neutral" />, label: 'Desktop' }
  ];

  const currentDevice = overrideDevice || originalViewport.deviceType;

  return (
    <div style={getPositionStyles()}>
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '6px',
        padding: '0.25rem'
      }}>
        {devices.map(({ type, icon, label }) => (
          <button
            key={type || 'auto'}
            onClick={() => setOverrideDevice(type)}
            style={{
              background: (type || 'auto') === (overrideDevice || 'auto')
                ? 'rgba(59, 130, 246, 0.8)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s ease',
              fontWeight: (type || 'auto') === (overrideDevice || 'auto') ? 'bold' : 'normal'
            }}
            title={`Switch to ${label} mode`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {overrideDevice && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 165, 0, 0.8)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          Override Active
        </div>
      )}
    </div>
  );
};

export default DeviceSwitcher;