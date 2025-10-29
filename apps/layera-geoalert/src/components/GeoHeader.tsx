import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup, Flex } from '@layera/layout';
import { ThemeSwitcher, useTheme } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon, GlobeIcon, SettingsIcon } from '@layera/icons';
import { SPACING_SCALE } from '@layera/constants';

interface GeoHeaderProps {
  onBackClick?: () => void;
  isIPhone14ProMax?: boolean;
}

/**
 * GeoHeader - Standardized header for GeoAlert app
 */
export const GeoHeader: React.FC<GeoHeaderProps> = ({ onBackClick, isIPhone14ProMax = false }) => {
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
    <Flex align="center" gap="sm">
      {/* Back button εμφανίζεται για όλες τις συσκευές */}
      {onBackClick && (
        <Button
          variant="ghost"
          size="md"
          onClick={onBackClick}
          icon={<ArrowLeftIcon size="sm" theme="neutral" />}
          iconPosition="only"
          title={t('header.backButton.title')}
        />
      )}
      <LayeraHeader
        title="Layera GeoAlert"
        subtitle={showIcons ? "" : t('geoalert.subtitle')}
        variant="minimal"
        actions={
          showIcons ? (
            <HeaderActionsGroup>
              {/* Enterprise Language Switch Button */}
              <Button
              variant="ghost"
              size="sm"
              icon={<GlobeIcon size="sm" theme="neutral" />}
              iconPosition="only"
              title={t('header.languageButton.title')}
              onClick={(): void => {
                const currentLang = document.documentElement.lang || 'el';
                const newLang = currentLang === 'el' ? 'en' : 'el';
              }}
              padding="sm"
              borderRadius="md"
              className="layera-transition-fast layera-bg-surface-overlay"
            />

            {/* Enterprise Theme Switch Button */}
            <Button
              variant="ghost"
              size="sm"
              icon={<SettingsIcon size="sm" theme="neutral" />}
              iconPosition="only"
              title={t('header.themeButton.title')}
              onClick={(): void => {
                toggleTheme();
              }}
              padding="sm"
              borderRadius="md"
              className="layera-transition-fast layera-bg-surface-overlay"
            />
          </HeaderActionsGroup>
          ) : (
            <HeaderActionsGroup>
              <LanguageSwitcher />
              <ThemeSwitcher variant="icon" size="md" />
            </HeaderActionsGroup>
          )
        }
      />
    </Flex>
  );
};