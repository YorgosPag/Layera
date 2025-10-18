import React from 'react';
import { NavItemProps } from '../../types';

/**
 * NavItem - Individual navigation item με support για links, buttons και permissions
 */
export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  to,
  href,
  onClick,
  active = false,
  disabled = false,
  badge,
  permission,
  className = ''
}) => {
  const itemClasses = [
    'layera-nav-item',
    active ? 'layera-nav-item--active' : '',
    disabled ? 'layera-nav-item--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Conditional rendering based on link type
  const renderContent = () => (
    <>
      {icon && (
        <span className="layera-nav-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}

      <span className="layera-nav-item__label">{label}</span>

      {badge && (
        <span className="layera-nav-item__badge">
          {badge}
        </span>
      )}
    </>
  );

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={itemClasses}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in new tab)`}
      >
        {renderContent()}
      </a>
    );
  }

  // Internal link (requires router integration)
  if (to) {
    return (
      <a
        href={to}
        className={itemClasses}
        aria-current={active ? 'page' : undefined}
      >
        {renderContent()}
      </a>
    );
  }

  // Button
  return (
    <button
      type="button"
      className={itemClasses}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
    >
      {renderContent()}
    </button>
  );
};