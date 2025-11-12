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
import { headerStyles } from './Header.styles';

interface HeaderProps {
  onAddContentClick?: () => void;
  onTestPanelClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddContentClick, onTestPanelClick }) => {

  return (
    <Box style={headerStyles.container}>
        {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
        <Box style={headerStyles.flexContainer}>
          <button onClick={onAddContentClick} style={headerStyles.actionButton}>
            <PlusIcon size="sm" />
          </button>
          <span style={headerStyles.headerTitle}>Geo-Canvas</span>
          <button onClick={onTestPanelClick} style={headerStyles.ghostButton}>
            <SettingsIcon size="sm" />
          </button>
        </Box>

        {/* Κέντρο: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SearchIcon size="md" />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size="md" />
          </button>
          <button style={headerStyles.ghostButton}>
            <MenuIcon size="md" />
          </button>
        </Box>

        {/* Δεξιά: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SettingsIcon size="md" />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size="md" />
          </button>
          <button style={headerStyles.ghostButton}>
            <UserIcon size="md" />
          </button>
        </Box>
      </Box>
  );
};