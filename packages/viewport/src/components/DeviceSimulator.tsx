/**
 * DeviceSimulator Component
 * Εξομοιώνει διαφορετικές συσκευές για testing και development
 */

import React from 'react';

export interface DeviceSimulatorProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * DeviceSimulator - Wrapper component για device simulation
 * Χρησιμοποιείται σε conjunction με DeviceOverrideProvider
 */
export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`layera-device-simulator ${className}`}>
      {children}
    </div>
  );
};