import React from 'react';
import { Box } from '../Box';
import { LayeraHeaderProps } from '../../types';
import { Text, Heading } from '@layera/typography';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';

/**
 * LayeraHeader - UNIFIED ARXES Compliant Header Component
 * Supports both Enterprise and Geo-Canvas modes
 * - Zero inline styles (ARXES compliant)
 * - Design tokens & CSS classes only
 * - Backward compatible with all existing usage
 */
export const LayeraHeader: React.FC<LayeraHeaderProps> = ({
  // Enterprise Mode Props
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'standard',
  sticky,
  className = '',

  // Geo-Canvas Mode Props
  onAddContentClick,
  onTestPanelClick
}) => {

  // Geo-Canvas Mode Rendering
  if (variant === 'geo-canvas') {
    return (
      <Box data-layout="header-fixed">
        {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-md">
          <button onClick={onAddContentClick} className="layera-btn-action">
            <PlusIcon size="sm" />
          </button>
          <span className="layera-typography" data-size="base" data-weight="semibold" data-color="primary">Geo-Canvas</span>
          <button onClick={onTestPanelClick} className="layera-button" data-variant="nav">
            <SettingsIcon size="sm" />
          </button>
        </Box>

        {/* Κέντρο: 3 εικονίδια */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          <button className="layera-button" data-variant="nav">
            <SearchIcon size="md" />
          </button>
          <button className="layera-button" data-variant="nav">
            <LocationIcon size="md" />
          </button>
          <button className="layera-button" data-variant="nav">
            <MenuIcon size="md" />
          </button>
        </Box>

        {/* Δεξιά: 3 εικονίδια */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          <button className="layera-button" data-variant="nav">
            <SettingsIcon size="md" />
          </button>
          <button className="layera-button" data-variant="nav">
            <LocationIcon size="md" />
          </button>
          <button className="layera-button" data-variant="nav">
            <UserIcon size="md" />
          </button>
        </Box>
      </Box>
    );
  }

  // Enterprise Mode Rendering (original LayeraHeader functionality)
  const headerClasses = [
    'layera-header',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={headerClasses}>
      <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-width--full">
        {/* Left section - Logo + Title */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          {logo && <Box className="layera-flex layera-flex--align-center">{logo}</Box>}
          <Box>
            <Heading as="h1" className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary" data-leading="tight">
              {title}
            </Heading>
            {subtitle && variant !== 'minimal' && (
              <Text className="layera-typography" data-size="base" data-color="secondary" data-leading="normal">
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>

        {/* Center section - Navigation (για rich variant) */}
        {navigation && variant === 'rich' && (
          <Box as="nav" className="layera-flex layera-flex--align-center layera-flex--justify-center layera-flex--gap-md" role="navigation">
            {navigation}
          </Box>
        )}

        {/* Right section - Navigation + Actions */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
          {/* Navigation για standard variant */}
          {navigation && variant === 'standard' && (
            <Box as="nav" className="layera-flex layera-flex--align-center layera-flex--gap-md" role="navigation">
              {navigation}
            </Box>
          )}

          {/* Actions */}
          {actions && (
            <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
              {actions}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};