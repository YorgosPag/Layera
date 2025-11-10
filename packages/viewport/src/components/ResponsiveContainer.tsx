/**
 * @layera/viewport - Enterprise Responsive Container
 * KADOS Compliant - No inline styles, CSS classes only, semantic HTML
 * Single source of truth responsive behavior
 */

import React from 'react';
import { useViewport } from '../hooks/useViewport';
import { ResponsiveConfig } from '../types';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  config?: Partial<ResponsiveConfig>;
  className?: string;
  enablePadding?: boolean;
  enableMaxWidth?: boolean;
  as?: 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer' | 'div';
}

const DEFAULT_CONFIG: ResponsiveConfig = {
  mobile: {
    breakpoint: 768,
    maxWidth: 'var(--la-global-spacing-full)',
    padding: 'var(--la-space-md)',
    gridColumns: 1
  },
  tablet: {
    breakpoint: 1024,
    maxWidth: 'var(--la-global-spacing-full)',
    padding: 'var(--la-space-xl)',
    gridColumns: 2
  },
  desktop: {
    breakpoint: 1025,
    maxWidth: 'var(--la-global-spacing-desktop-max)',
    padding: 'var(--la-space-xxl)',
    gridColumns: 3
  }
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  config = {},
  className = '',
  enablePadding = true,
  enableMaxWidth = true,
  as = 'section'
}) => {
  const { deviceType, width } = useViewport();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const currentConfig = mergedConfig[deviceType];

  const responsiveClasses = [
    'layera-responsive-container',
    `layera-responsive-container--${deviceType}`,
    enablePadding ? 'layera-responsive-container--with-padding' : '',
    enableMaxWidth ? 'layera-responsive-container--with-max-width' : '',
    className
  ].filter(Boolean).join(' ');

  const Component = as;

  return (
    <Component
      className={responsiveClasses}
      data-device-type={deviceType}
      data-viewport-width={width}
      data-grid-columns={currentConfig.gridColumns}
    >
      {children}
    </Component>
  );
};

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