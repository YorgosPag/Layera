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

// Χρώματα από HTML header - μεταφέρονται ως design tokens
const HEADER_COLORS = [
  { name: 'primary', label: 'P', color: '#4A90E2' },
  { name: 'secondary', label: 'S', color: '#9013FE' },
  { name: 'success', label: 'Su', color: '#4CAF50' },
  { name: 'warning', label: 'W', color: '#FF9800' },
  { name: 'danger', label: 'D', color: '#F44336' },
  { name: 'info', label: 'I', color: '#2196F3' }
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
    <Box
      className="layera-app-header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Left Section: Title + Color Buttons - ακριβώς όπως HTML */}
      <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Heading
          className="layera-typography"
          data-size="lg"
          style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'white'
          }}
        >
          🎨 Layera Design System Preview
        </Heading>

        {/* 6 Color Buttons - ακριβώς όπως HTML */}
        <Box className="header-buttons" style={{ display: 'flex', gap: '0.5rem', margin: 0, flexWrap: 'wrap' }}>
          {HEADER_COLORS.map(({ name, label, color }) => (
            <button
              key={name}
              className={`color-btn ${name}-btn ${activeHeaderColor === name ? 'active' : ''}`}
              onClick={() => handleColorChange(name)}
              style={{
                padding: '0.2rem 0.4rem',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: 'white',
                fontWeight: 500,
                minWidth: '24px',
                background: color
              }}
            >
              {label}
            </button>
          ))}
        </Box>
      </Box>

      {/* Right Section: Navigation - ακριβώς όπως HTML */}
      <Box className="header-nav" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {/* Toggle Controls για Sidebars */}
        <Box className="sidebar-toggles" style={{ display: 'flex', gap: '0.5rem', marginRight: '1rem' }}>
          <button
            className="btn toggle-btn"
            onClick={() => onToggleSidebar?.('left')}
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              padding: '0.4rem',
              fontSize: '0.8rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            title="Toggle Left Sidebar"
          >
            ⚙️
          </button>
          <button
            className="btn toggle-btn"
            onClick={() => onToggleSidebar?.('right')}
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              padding: '0.4rem',
              fontSize: '0.8rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            title="Toggle Right Sidebar"
          >
            🎨
          </button>
        </Box>

        {/* Search Inputs - ακριβώς όπως HTML */}
        <input
          type="search"
          placeholder="🔍 Search..."
          style={{
            padding: '0.4rem',
            border: 'none',
            borderRadius: '3px',
            marginRight: '0.75rem',
            fontSize: '0.85rem'
          }}
        />
        <input
          type="text"
          placeholder="📍 Location"
          style={{
            padding: '0.4rem',
            border: 'none',
            borderRadius: '3px',
            marginRight: '0.75rem',
            fontSize: '0.85rem'
          }}
        />

        {/* Profile Button - ακριβώς όπως HTML */}
        <button
          className="btn"
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '0.4rem 0.8rem',
            fontSize: '0.85rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          👤 Profile
        </button>
      </Box>
    </Box>
  );
};