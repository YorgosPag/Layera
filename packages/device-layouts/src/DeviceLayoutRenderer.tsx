/**
 * DeviceLayoutRenderer.tsx - Enterprise Device Layout Orchestrator
 *
 * Single source of truth για device-specific rendering στο Layera ecosystem.
 * Αντικαθιστά duplicate device rendering logic με unified API.
 */

import React from 'react';
import { Box } from '@layera/layout';
// 🚀 ENTERPRISE: Single Source of Truth - Enhanced @layera/viewport
// 🚀 ENTERPRISE: Single Source of Truth - Device specs from @layera/constants
import { DEVICE_BREAKPOINTS } from '@layera/constants';
import { DeviceLayoutRendererProps, ResponsiveLayoutConfig, DeviceType } from './types';

const DEFAULT_LAYOUT_CONFIG: ResponsiveLayoutConfig = {
  tablet: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    },
    containerClassName: 'tablet-map-container'
  },
  desktop: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    }
  },
  mobile: {
    containerStyle: {
      width: '100%',
      height: '100vh',
      position: 'relative'
    },
    containerClassName: 'mobile-map-container'
  }
};

export const DeviceLayoutRenderer: React.FC<DeviceLayoutRendererProps> = ({
  deviceType: propDeviceType,
  forceDeviceType,
  layoutConfig = {},
  commonProps = {},
  components = {} as DeviceLayoutRendererProps['components'],
  navigation,
  navigationHandlers,
  showCategoryElements = false,
  fab
}) => {

  // Auto-detect device type αν δεν δίνεται - ENTERPRISE EDITION
  const detectedDeviceType = React.useMemo((): DeviceType => {
    if (forceDeviceType) {
      return forceDeviceType;
    }

    if (propDeviceType) {
      return propDeviceType;
    }


    // Fallback για άλλες συσκευές
    if (typeof window === 'undefined') {
      return 'desktop';
    }

    const width = window.innerWidth;
    if (width <= DEVICE_BREAKPOINTS.MOBILE) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, [propDeviceType, forceDeviceType]);

  // Merge configuration
  const finalConfig = {
    ...DEFAULT_LAYOUT_CONFIG,
    ...layoutConfig
  };


  // Desktop rendering
  if (detectedDeviceType === 'desktop') {
    const config = finalConfig.desktop;
    const desktopComponents = components?.desktop || {};

    return (
      <Box style={config.containerStyle}>
        {/* Desktop-specific component */}
        {desktopComponents.map && React.createElement(desktopComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <Box>
            {/* MapContainer θα rendered εδώ */}
          </Box>
        )}

      </Box>
    );
  }

  // Tablet rendering
  if (detectedDeviceType === 'tablet') {
    const config = finalConfig.tablet;
    const tabletComponents = components?.tablet || {};

    return (
      <Box
        className={config.containerClassName}
        style={config.containerStyle}
      >
        {/* Tablet-specific component */}
        {tabletComponents.map && React.createElement(tabletComponents.map, commonProps)}

        {/* Common MapContainer component */}
        {commonProps && (
          <Box>
            {/* MapContainer θα rendered εδώ */}
          </Box>
        )}

      </Box>
    );
  }

  // Mobile fallback rendering
  const config = finalConfig.mobile;
  return (
    <Box
      className={config.containerClassName}
      style={config.containerStyle}
    >
      {/* Common MapContainer component */}
      {commonProps && (
        <Box>
          {/* MapContainer θα rendered εδώ */}
        </Box>
      )}

      {/* FAB rendering */}
      {fab && !fab.hidden && fab.component}
    </Box>
  );
};