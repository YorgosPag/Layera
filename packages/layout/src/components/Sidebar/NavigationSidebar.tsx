import React from 'react';
import { NavigationSidebarProps } from '../../types';

/**
 * NavigationSidebar - Flexible sidebar component για navigation
 */
export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  children,
  collapsed = false,
  collapsible = true,
  width = 280,
  position = 'left',
  variant = 'default',
  className = ''
}) => {
  const sidebarClasses = [
    'layera-navigation-sidebar',
    `layera-navigation-sidebar--${variant}`,
    `layera-navigation-sidebar--${position}`,
    collapsed ? 'layera-navigation-sidebar--collapsed' : '',
    collapsible ? 'layera-navigation-sidebar--collapsible' : '',
    className
  ].filter(Boolean).join(' ');

  const sidebarStyle = {
    '--sidebar-width': typeof width === 'number' ? `${width}px` : width
  } as React.CSSProperties;

  return (
    <nav
      className={sidebarClasses}
      style={sidebarStyle}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="layera-navigation-sidebar__content">
        {children}
      </div>
    </nav>
  );
};