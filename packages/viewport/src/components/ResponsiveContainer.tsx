// Layera Shared - Responsive Container Component
// Enterprise pattern: Adaptive layout container για όλες τις εφαρμογές
// Usage: Wrap any content για automatic responsive behavior

import React from 'react';
import { useViewport } from '../hooks/useViewport';
import { ResponsiveConfig } from '../types';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  config?: Partial<ResponsiveConfig>;
  className?: string;
  style?: React.CSSProperties;
  enablePadding?: boolean;
  enableMaxWidth?: boolean;
}

// Default responsive configuration
const DEFAULT_CONFIG: ResponsiveConfig = {
  mobile: {
    breakpoint: 768,
    maxWidth: '100%',
    padding: '1rem',
    gridColumns: 1
  },
  tablet: {
    breakpoint: 1024,
    maxWidth: '100%',
    padding: '2rem',
    gridColumns: 2
  },
  desktop: {
    breakpoint: 1025,
    maxWidth: '1200px',
    padding: '3rem',
    gridColumns: 3
  }
};

/**
 * Enterprise Responsive Container
 * Automatically adapts content based on device type
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  config = {},
  className = '',
  style = {},
  enablePadding = true,
  enableMaxWidth = true
}) => {
  const { deviceType, width } = useViewport();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const currentConfig = mergedConfig[deviceType];

  const containerStyle: React.CSSProperties = {
    width: '100%',
    margin: '0 auto',
    ...style
  };

  // Apply responsive max width
  if (enableMaxWidth && currentConfig.maxWidth) {
    containerStyle.maxWidth = currentConfig.maxWidth;
  }

  // Apply responsive padding
  if (enablePadding && currentConfig.padding) {
    containerStyle.padding = currentConfig.padding;
  }

  // Set CSS custom properties για child components
  const cssVariables = {
    '--layera-device-type': deviceType,
    '--layera-viewport-width': `${width}px`,
    '--layera-grid-columns': currentConfig.gridColumns?.toString() || '1',
    '--layera-container-padding': currentConfig.padding || '1rem',
    '--layera-container-max-width': currentConfig.maxWidth || '100%'
  } as React.CSSProperties;

  return (
    <div
      className={`layera-responsive-container ${className}`}
      style={{ ...containerStyle, ...cssVariables }}
      data-device-type={deviceType}
      data-viewport-width={width}
    >
      {children}
    </div>
  );
};

/**
 * Device-specific visibility components
 */
export const MobileOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useViewport();
  return isMobile ? <>{children}</> : null;
};

export const TabletOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTablet } = useViewport();
  return isTablet ? <>{children}</> : null;
};

export const DesktopOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDesktop } = useViewport();
  return isDesktop ? <>{children}</> : null;
};

export const MobileAndTablet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet } = useViewport();
  return (isMobile || isTablet) ? <>{children}</> : null;
};

export const TabletAndDesktop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTablet, isDesktop } = useViewport();
  return (isTablet || isDesktop) ? <>{children}</> : null;
};