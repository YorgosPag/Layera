import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup } from '@layera/layout';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon } from '@layera/icons';

interface GeoHeaderProps {
  onBackClick?: () => void;
}

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC<GeoHeaderProps> = ({ onBackClick }) => {
  const { t } = useLayeraTranslation();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {onBackClick && (
        <Button
          variant="ghost"
          size="md"
          onClick={onBackClick}
          icon={<ArrowLeftIcon size="sm" theme="neutral" />}
          iconPosition="only"
          title="Πίσω στο Dashboard"
        />
      )}
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
    </div>
  );
};