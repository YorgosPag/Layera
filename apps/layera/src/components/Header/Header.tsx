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
  onAddContentClick?: () => void;
  onTestPanelClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddContentClick, onTestPanelClick }) => {

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