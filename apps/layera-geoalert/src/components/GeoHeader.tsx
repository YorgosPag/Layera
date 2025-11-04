import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup, Flex } from '@layera/layout';
import { ThemeSwitcher, useTheme } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon, GlobeIcon, SettingsIcon, PlusIcon } from '@layera/icons';
import { SPACING_SCALE } from '@layera/constants';

interface GeoHeaderProps {
  onBackClick?: () => void;
  isIPhone14ProMax?: boolean;
  onNewEntryClick?: () => void;
}

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC<GeoHeaderProps> = ({ onBackClick, isIPhone14ProMax = false, onNewEntryClick }) => {
  // Εμφάνιση εικονιδίων μόνο για iPhone
  const showIcons = isIPhone14ProMax;
  const { t } = useLayeraTranslation();

  // Safe theme hook usage με fallback
  let theme = 'light';
  let toggleTheme = () => {};

  try {
    const themeHook = useTheme();
    theme = themeHook.theme;
    toggleTheme = themeHook.toggleTheme;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
    }
  }

  // Debug logs removed for production optimization

  return (
    <div style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '48px',
      borderBottom: '1px solid #333',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Left side - Back button + Title */}
      <Flex align="center" gap="sm">
        {onBackClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            icon={<ArrowLeftIcon size="sm" theme="neutral" />}
            iconPosition="only"
            title={t('header.backButton.title')}
            style={{ color: '#ffffff' }}
          />
        )}
        <span style={{
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '600',
          marginLeft: '8px'
        }}>
          Geo-Canvas
        </span>
      </Flex>

      {/* Right side - Actions */}
      <Flex align="center" gap="sm">
        {/* Νέα Καταχώρηση Button */}
        {onNewEntryClick && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon size="sm" theme="neutral" />}
            onClick={() => {
              console.log('🔥 GeoHeader button clicked!');
              onNewEntryClick?.();
            }}
            title="Νέα Καταχώρηση"
            style={{
              backgroundColor: '#0066cc',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px'
            }}
          >
            {!showIcons && "Νέα Καταχώρηση"}
          </Button>
        )}

        {/* Language & Theme Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LanguageSwitcher />
          <ThemeSwitcher variant="icon" size="md" />
        </div>
      </Flex>
    </div>
  );
};