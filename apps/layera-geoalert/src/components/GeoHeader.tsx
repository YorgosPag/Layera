import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup } from '@layera/layout';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC = () => {
  const { t } = useLayeraTranslation();

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