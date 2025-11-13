/**
 * Header.tsx - Enterprise Header Component
 *
 * ARXES Compliant header implementation
 * - Clean component logic
 * - Separated styles
 * - Type-safe props
 * - Zero inline styles
 */

import React from 'react';
import { Box } from '@layera/layout';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';

interface HeaderProps {
  // Existing Geo-Canvas Mode Props (πρέπει να διατηρηθούν)
  onAddContentClick?: () => void;
  onTestPanelClick?: () => void;

  // NEW - Enterprise Mode Props (για μελλοντική χρήση)
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'geo-canvas' | 'enterprise';
}

export const Header: React.FC<HeaderProps> = ({
  onAddContentClick,
  onTestPanelClick,
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = 'geo-canvas' // Default: διατηρεί την τρέχουσα λειτουργικότητα
}) => {

  // Enterprise Mode Rendering
  if (variant === 'enterprise') {
    return (
      <Box data-layout="header-fixed">
        <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-width--full">
          {/* Left section - Logo + Title */}
          <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
            {logo && <Box className="layera-flex layera-flex--align-center">{logo}</Box>}
            <Box>
              <span className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">{title}</span>
              {subtitle && <span className="layera-typography" data-size="base" data-color="secondary">{subtitle}</span>}
            </Box>
          </Box>

          {/* Center section - Navigation */}
          {navigation && (
            <Box as="nav" className="layera-flex layera-flex--align-center layera-flex--justify-center layera-flex--gap-md" role="navigation">
              {navigation}
            </Box>
          )}

          {/* Right section - Actions */}
          <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
            {actions}
          </Box>
        </Box>
      </Box>
    );
  }

  // Default Geo-Canvas Mode Rendering (ΑΜΕΤΑΒΛΗΤΟ)
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
};