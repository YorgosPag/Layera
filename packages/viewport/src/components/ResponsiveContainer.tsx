/**
 * @layera/viewport - Enterprise Responsive Container
 * ARXES Compliant - No inline styles, CSS classes only, semantic HTML
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
    breakpoint: 'sm',
    maxWidth: 'var(--layera-global-spacing-full)',
    padding: 'var(--layera-space-md)',
    gridColumns: 1
  },
  tablet: {
    breakpoint: 'md',
    maxWidth: 'var(--layera-global-spacing-full)',
    padding: 'var(--layera-space-xl)',
    gridColumns: 2
  },
  desktop: {
    breakpoint: 'xl',
    maxWidth: 'var(--layera-global-spacing-desktop-max)',
    padding: 'var(--layera-space-xxl)',
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
  const { deviceCategory, width } = useViewport();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Map deviceCategory to config key
  const configKey = deviceCategory === 'mobile' ? 'mobile' :
                    deviceCategory === 'tablet' || deviceCategory === 'desktop' ? 'tablet' : 'desktop';

  const currentConfig = mergedConfig[configKey];

  const responsiveClasses = [
    'layera-responsive-container',
    `layera-responsive-container--${deviceCategory}`,
    enablePadding ? 'layera-responsive-container--with-padding' : '',
    enableMaxWidth ? 'layera-responsive-container--with-max-width' : '',
    className
  ].filter(Boolean).join(' ');

  const Component = as;

  return (
    <Component
      className={responsiveClasses}
      data-device-category={deviceCategory}
      data-viewport-width={width}
      data-grid-columns={currentConfig?.gridColumns}
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