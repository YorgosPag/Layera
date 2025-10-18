import React, { useState } from 'react';
import { NavSectionProps } from '../../types';

/**
 * NavSection - Grouping component για navigation items με collapsible support
 */
export const NavSection: React.FC<NavSectionProps> = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className = ''
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const sectionClasses = [
    'layera-nav-section',
    collapsed ? 'layera-nav-section--collapsed' : '',
    className
  ].filter(Boolean).join(' ');

  const handleToggle = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className={sectionClasses}>
      {title && (
        <div
          className="layera-nav-section__header"
          onClick={collapsible ? handleToggle : undefined}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
          aria-expanded={collapsible ? !collapsed : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <span className="layera-nav-section__title">{title}</span>
          {collapsible && (
            <span className="layera-nav-section__toggle" aria-hidden="true">
              {collapsed ? '▶' : '▼'}
            </span>
          )}
        </div>
      )}

      <div className="layera-nav-section__content">
        {children}
      </div>
    </div>
  );
};