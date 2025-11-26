import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';

/**
 * Reference Header Component - Πανομοιότυπο με HTML header
 *
 * Αντιστοιχεί 1:1 με html/htmlComponents/header/header.html
 * Χρησιμοποιεί @layera/* components αντί για hardcoded HTML/CSS
 */

interface HeaderProps {
  onToggleSidebar?: (position: 'left' | 'right') => void;
  onHeaderColorChange?: (color: string) => void;
  activeHeaderColor?: string;
}

// Χρώματα χρησιμοποιώντας design tokens
const HEADER_COLORS = [
  { name: 'primary', label: 'P', color: 'var(--layera-color-primary)' },
  { name: 'secondary', label: 'S', color: 'var(--layera-color-secondary)' },
  { name: 'success', label: 'Su', color: 'var(--layera-color-success)' },
  { name: 'warning', label: 'W', color: 'var(--layera-color-warning)' },
  { name: 'danger', label: 'D', color: 'var(--layera-color-danger)' },
  { name: 'info', label: 'I', color: 'var(--layera-color-info)' }
] as const;

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onHeaderColorChange,
  activeHeaderColor = 'primary'
}) => {
  const handleColorChange = React.useCallback((colorName: string) => {
    onHeaderColorChange?.(colorName);
  }, [onHeaderColorChange]);

  return (
    <Box className="layera-app-header header-container">
      {/* Left Section: Title + Color Buttons - ακριβώς όπως HTML */}
      <Box className="header-left-section">
        <Heading
          className="layera-typography header-logo"
          data-size="lg"
        >
          🎨 Layera Design System Preview
        </Heading>

        {/* 6 Color Buttons - ακριβώς όπως HTML */}
        <Box className="header-buttons header-buttons-group">
          {HEADER_COLORS.map(({ name, label, color }) => (
            <button
              key={name}
              className={`color-btn ${name}-btn ${activeHeaderColor === name ? 'active' : ''}`}
              onClick={() => handleColorChange(name)}
              className="header-color-button"
              style={{ backgroundColor: color }}
            >
              {label}
            </button>
          ))}
        </Box>
      </Box>

      {/* Right Section: Navigation - ακριβώς όπως HTML */}
      <Box className="header-nav">
        {/* Toggle Controls για Sidebars */}
        <Box className="sidebar-toggles header-sidebar-toggles">
          <button
            className="btn toggle-btn"
            onClick={() => onToggleSidebar?.('left')}
            className="header-toggle-button"
            title="Toggle Left Sidebar"
          >
            ⚙️
          </button>
          <button
            className="btn toggle-btn"
            onClick={() => onToggleSidebar?.('right')}
            className="header-toggle-button"
            title="Toggle Right Sidebar"
          >
            🎨
          </button>
        </Box>

        {/* Search Inputs - ακριβώς όπως HTML */}
        <input
          type="search"
          placeholder="🔍 Search..."
          className="header-search-input"
        />
        <input
          type="text"
          placeholder="📍 Location"
          className="header-search-input"
        />

        {/* Profile Button - ακριβώς όπως HTML */}
        <button className="btn header-profile-button">
          👤 Profile
        </button>
      </Box>
    </Box>
  );
};