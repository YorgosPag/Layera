import React from 'react';
import { LayeraHeaderProps } from '../../types';

/**
 * LayeraHeader - Standardized header component με flexible variants
 * για διαφορετικούς τύπους εφαρμογών
 */
export const LayeraHeader: React.FC<LayeraHeaderProps> = ({
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'standard',
  sticky = true,
  className = ''
}) => {
  const headerClasses = [
    'layera-header',
    `layera-header--${variant}`,
    sticky ? 'layera-header--sticky' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses}>
      <div className="layera-header__container">
        {/* Left section - Logo + Title */}
        <div className="layera-header__left">
          {logo && (
            <div className="layera-header__logo">
              {logo}
            </div>
          )}

          <div className="layera-header__title-section">
            <h1 className="layera-header__title">{title}</h1>
            {subtitle && variant !== 'minimal' && (
              <p className="layera-header__subtitle">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <nav className="layera-header__navigation" role="navigation">
            {navigation}
          </nav>
        )}

        {/* Right section - Actions */}
        {actions && (
          <div className="layera-header__actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};