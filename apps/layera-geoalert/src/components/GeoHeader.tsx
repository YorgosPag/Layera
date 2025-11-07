import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup, Flex } from '@layera/layout';
import { ThemeSwitcher, useTheme } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon, GlobeIcon, SettingsIcon, PlusIcon } from '@layera/icons';
import { SPACING_SCALE, getCardOrangeColor } from '@layera/constants';

interface GeoHeaderProps {
  onBackClick?: () => void;
  onStepBackClick?: () => void; // 🧡 ΠΡΟΣΩΡΙΝΟ: Κουμπί για πηγαίνω πίσω στα steps
  isMobileDevice?: boolean;
  onNewEntryClick?: () => void;
}

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC<GeoHeaderProps> = ({ onBackClick, onStepBackClick, isMobileDevice = false, onNewEntryClick }) => {
  // Εμφάνιση εικονιδίων για mobile συσκευές
  const showIcons = isMobileDevice;
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
      backgroundColor: 'var(--la-header-bg)', // 🎯 SST: Header background token
      color: 'var(--la-header-text)', // 🎯 SST: Header text token
      padding: 'var(--la-header-padding)', // 🎯 SST: Header padding token
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'var(--la-header-height)', // 🎯 SST: Header height token
      borderBottom: 'var(--la-header-border)', // 🎯 SST: Header border token
      position: 'relative',
      zIndex: 'var(--la-header-z-index)' // 🎯 SST: Header z-index token
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
            style={{ color: 'var(--la-header-text)' }} // 🎯 SST: Header text token
          />
        )}

        {/* 🧡 ΠΡΟΣΩΡΙΝΟ: Πορτοκαλί κουμπί για navigation στα steps */}
        {onStepBackClick && (
          <Button
            variant="primary"
            size="sm"
            onClick={onStepBackClick}
            icon={<ArrowLeftIcon size="sm" theme="neutral" />}
            title="Πίσω στο προηγούμενο step"
            style={{
              backgroundColor: getCardOrangeColor(), // 🔴 SST: Χρώμα από μοναδική πηγή αλήθειας
              color: 'var(--la-header-text)', // 🎯 SST: Header text token
              border: 'none',
              borderRadius: 'var(--la-button-border-radius)', // 🎯 SST: Button border radius token
              padding: 'var(--la-button-padding-sm)' // 🎯 SST: Button padding token
            }}
          >
            {!showIcons && "Πίσω"}
          </Button>
        )}
        <span style={{
          color: 'var(--la-header-text)', // 🎯 SST: Header text token
          fontSize: 'var(--la-font-size-md)', // 🎯 SST: Font size token
          fontWeight: 'var(--la-font-weight-semibold)', // 🎯 SST: Font weight token
          marginLeft: 'var(--la-gap-sm)' // 🎯 SST: Gap token
        }}>
          Geo-Canvas
        </span>
      </Flex>

      {/* Right side - Actions */}
      <Flex align="center" gap="sm">
        {/* Νέα Καταχώρηση Button - SST Compliance */}
        {onNewEntryClick && (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusIcon size="sm" theme="neutral" />}
            onClick={(): void => {
              onNewEntryClick?.();
            }}
            title={t('common.newEntry')}
          >
            {!showIcons && t('common.newEntry')}
          </Button>
        )}

        {/* Language & Theme Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--la-gap-sm)' }}> {/* 🎯 SST: Gap token */}
          <LanguageSwitcher />
          <ThemeSwitcher
            variant="icon"
            size="md"
            labels={{
              light: t('settings.items.theme.light'),
              dark: t('settings.items.theme.dark'),
              system: t('settings.items.theme.system')
            }}
          />
        </div>
      </Flex>
    </div>
  );
};