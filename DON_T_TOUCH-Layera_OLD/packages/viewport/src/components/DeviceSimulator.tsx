/**
 * DeviceSimulator Component
 * Εξομοιώνει διαφορετικές συσκευές για testing και development
 */

import React from 'react';
import { Box } from '@layera/layout';

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
    <Box className={`layera-device-simulator ${className}`}>
      {children}
    </Box>
  );
};