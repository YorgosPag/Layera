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
}

export const Header: React.FC<HeaderProps> = ({ onAddContentClick }) => {

  return (
    <Box style={headerStyles.container}>
        {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
        <Box style={headerStyles.flexContainer}>
          <button onClick={onAddContentClick} style={headerStyles.actionButton}>
            <PlusIcon size="sm" style={headerStyles.whiteIcon} />
          </button>
          <span style={headerStyles.headerTitle}>Geo-Canvas</span>
        </Box>

        {/* Κέντρο: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SearchIcon size="md" style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size="md" style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <MenuIcon size="md" style={headerStyles.whiteIcon} />
          </button>
        </Box>

        {/* Δεξιά: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SettingsIcon size="md" style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size="md" style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <UserIcon size="md" style={headerStyles.whiteIcon} />
          </button>
        </Box>
      </Box>
  );
};