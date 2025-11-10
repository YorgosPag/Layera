import React from 'react';
import { Box } from '../Box';
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
    <Box className={headerClasses}>
      <Box className="layera-header__container">
        {/* Left section - Logo + Title */}
        <Box className="layera-header__left">
          {logo && (
            <Box className="layera-header__logo">
              {logo}
            </Box>
          )}

          <Box className="layera-header__title-section">
            <h1 className="layera-header__title">{title}</h1>
            {subtitle && variant !== 'minimal' && (
              <p className="layera-header__subtitle">{subtitle}</p>
            )}
          </Box>
        </Box>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <nav className="layera-header__navigation" role="navigation">
            {navigation}
          </nav>
        )}

        {/* Right section - Actions */}
        {actions && (
          <Box className="layera-header__actions">
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};