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
      console.log('🎯 GeoHeader: Theme hook not available, using fallback');
    }
  }

  // Debug logs removed for production optimization

  return (
    <Flex align="center" style={{ gap: `${SPACING_SCALE.SM}px` }}>
      {/* Back button εμφανίζεται για όλες τις συσκευές */}
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
              title="Αλλαγή Γλώσσας"
              onClick={() => {
                console.log('🌐 Language switch clicked!');
                const currentLang = document.documentElement.lang || 'el';
                const newLang = currentLang === 'el' ? 'en' : 'el';
                console.log('🌐 Language switch:', currentLang, '->', newLang);
              }}
              style={{
                padding: `${SPACING_SCALE.SM}px`,
                borderRadius: `${SPACING_SCALE.XS + 2}px`,
                transition: 'var(--layera-transition-fast)',
                backgroundColor: 'var(--color-bg-surface-overlay)'
              }}
            />

            {/* Enterprise Theme Switch Button */}
            <Button
              variant="ghost"
              size="sm"
              icon={<SettingsIcon size="sm" theme="neutral" />}
              iconPosition="only"
              title="Αλλαγή Θέματος (Light/Dark)"
              onClick={() => {
                console.log('🎨 Theme switch clicked!');
                console.log('🎨 Theme switch:', theme, '-> toggling');
                toggleTheme();
              }}
              style={{
                padding: `${SPACING_SCALE.SM}px`,
                borderRadius: `${SPACING_SCALE.XS + 2}px`,
                transition: 'var(--layera-transition-fast)',
                backgroundColor: 'var(--color-bg-surface-overlay)'
              }}
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