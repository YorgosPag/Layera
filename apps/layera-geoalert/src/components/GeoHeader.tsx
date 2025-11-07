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
    <Box
      backgroundColor="header-bg"
      color="header-text"
      padding="header"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="header"
      borderBottom="header"
      position="relative"
      zIndex="header"
    >
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
          <Box
            as={Button}
            variant="primary"
            size="sm"
            onClick={onStepBackClick}
            icon={<ArrowLeftIcon size="sm" theme="neutral" />}
            title="Πίσω στο προηγούμενο step"
            backgroundColor="orange"
            color="header-text"
            border="none"
            borderRadius="button"
            padding="button-sm"
          >
            {!showIcons && "Πίσω"}
          </Box>
        )}
        <Text
          color="header-text"
          fontSize="md"
          fontWeight="semibold"
          marginLeft="sm"
        >
          Geo-Canvas
        </Text>
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
    </Box>
  );
};