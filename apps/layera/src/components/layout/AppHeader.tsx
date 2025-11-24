import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * ARXES COMPLIANT App Header Component
 *
 * Αντιστοιχεί στο header του FullAppPreview_Mockup.html:
 * - Τίτλος με emoji
 * - 6 χρωματιστά κουμπιά (P, S, Su, W, D, I)
 * - Navigation με toggle buttons
 * - Search inputs
 * - Profile button
 *
 * Χρησιμοποιεί υπάρχοντα @layera/* components και tokens
 */

interface AppHeaderProps {
  onToggleSidebar: (position: 'left' | 'right') => void;
  onHeaderColorChange: (color: string) => void;
  activeHeaderColor?: string;
}

const HEADER_COLORS = [
  { name: 'primary', label: 'P', variant: 'primary' as const },
  { name: 'secondary', label: 'S', variant: 'secondary' as const },
  { name: 'success', label: 'Su', variant: 'success' as const },
  { name: 'warning', label: 'W', variant: 'warning' as const },
  { name: 'danger', label: 'D', variant: 'danger' as const },
  { name: 'info', label: 'I', variant: 'info' as const }
] as const;

export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleSidebar,
  onHeaderColorChange,
  activeHeaderColor = 'primary'
}) => {

  const handleColorChange = React.useCallback((colorName: string) => {
    onHeaderColorChange(colorName);
  }, [onHeaderColorChange]);

  return (
    <Box
      className="layera-app-header layera-flex layera-flex--justify-between layera-flex--align-center layera-padding--md"
      style={{
        background: 'var(--live-primary-color)',
        color: 'white',
        minHeight: 'auto'
      }}
    >
      {/* Left Section: Title + Color Buttons */}
      <Flex className="layera-flex--align-center layera-flex--gap-md">
        <Heading
          className="layera-typography"
          data-size="lg"
          data-weight="semibold"
          style={{ color: 'white', margin: 0 }}
        >
          🎨 Layera Design System Preview
        </Heading>

        {/* 6 Color Buttons */}
        <Flex className="layera-flex--gap-xs layera-flex--wrap">
          {HEADER_COLORS.map(({ name, label, variant }) => (
            <Button
              key={name}
              variant={activeHeaderColor === name ? 'primary' : 'outline'}
              size="xs"
              onClick={() => handleColorChange(name)}
              className="layera-button layera-header-color-btn"
              style={{
                minWidth: '24px',
                color: 'white',
                background: `var(--live-${name}-color)`,
                border: activeHeaderColor === name ? '2px solid white' : '1px solid rgba(255,255,255,0.3)'
              }}
            >
              {label}
            </Button>
          ))}
        </Flex>
      </Flex>

      {/* Right Section: Navigation */}
      <Flex className="layera-flex--align-center layera-flex--gap-md">
        {/* Sidebar Toggle Buttons */}
        <Flex className="layera-flex--gap-xs">
          <Button
            variant="outline"
            size="xs"
            onClick={() => onToggleSidebar('left')}
            className="layera-button"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            title="Toggle Left Sidebar"
          >
            ⚙️
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => onToggleSidebar('right')}
            className="layera-button"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
            title="Toggle Right Sidebar"
          >
            🎨
          </Button>
        </Flex>

        {/* Search Inputs */}
        <input
          type="search"
          placeholder="🔍 Search..."
          className="layera-input layera-header-search"
          style={{
            padding: 'var(--layera-space-2)',
            border: 'none',
            borderRadius: 'var(--live-border-radius)',
            fontSize: 'var(--layera-fontSize-sm)'
          }}
        />
        <input
          type="text"
          placeholder="📍 Location"
          className="layera-input layera-header-location"
          style={{
            padding: 'var(--layera-space-2)',
            border: 'none',
            borderRadius: 'var(--live-border-radius)',
            fontSize: 'var(--layera-fontSize-sm)'
          }}
        />

        {/* Profile Button */}
        <Button
          variant="outline"
          size="sm"
          className="layera-button"
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          👤 Profile
        </Button>
      </Flex>
    </Box>
  );
};