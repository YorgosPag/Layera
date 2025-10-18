import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayeraHeader, HeaderActionsGroup } from '@layera/layout';
import { ThemeSwitcher } from '@layera/theme-switcher';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <LayeraHeader
      title={t('title')}
      subtitle={t('subtitle')}
      variant="minimal"
      actions={
        <HeaderActionsGroup>
          <LanguageSwitcher />
          <ThemeSwitcher variant="icon" size="md" />
        </HeaderActionsGroup>
      }
    />
  );
};