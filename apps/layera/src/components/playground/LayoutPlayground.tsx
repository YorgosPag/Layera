import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { LayoutPlaygroundProps } from '../../types/unified-interfaces';

export const LayoutPlayground: React.FC<LayoutPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  layoutRadius = 'md',
  layoutSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // ✅ ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΔΙΠΛΟΤΥΠΩΝ FUNCTIONS - Χρήση κεντρικών helper functions
  const { getRadiusInGreek, getRadiusToken, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για τμήματα layout',
      `μεγέθους ${getSizeInGreek(layoutSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(layoutRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

  // Layout section configurations
  // REMOVED: All hardcoded helper functions that violated ZERO ΣΚΛΗΡΕΣ ΤΙΜΕΣ rule
  // Layout colors are now handled EXCLUSIVELY through CSS classes and tokens

  const layoutConfigs = [
    { key: 'primary', title: 'Primary', description: 'Layout Section', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary', description: 'Layout Section', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success', description: 'Layout Section', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning', description: 'Layout Section', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger', description: 'Layout Section', colorValue: currentColors.danger },
    { key: 'info', title: 'Info', description: 'Layout Section', colorValue: currentColors.info }
  ];

  // REMOVED: DOM manipulation violation - CSS variables are handled by useCSSVariables.ts

  // Helper to get appropriate CSS classes with dynamic data attributes
  const getLayoutClasses = (_key: string) => {
    const baseClasses = "layera-padding--md layera-height--6xl layera-width--card layera-flex layera-flex--align-center layera-flex--justify-center layera-flex-shrink--0";

    switch (colorCategory) {
      case 'backgrounds':
        return `${baseClasses} layera-dynamic-bg layera-text-color--on-dark`;
      case 'text':
        return `${baseClasses} layera-bg--surface-primary layera-dynamic-text`;
      case 'borders':
        return `${baseClasses} layera-bg--surface-primary layera-text-color--primary layera-dynamic-border`;
      default:
        return baseClasses;
    }
  };

  // ✅ NO INLINE STYLES - Using only @layera tokens and data-attributes

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Layout
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {layoutConfigs.map(({ key, title, description }) => {
            // Debug logging
            console.log('📐 LayoutPlayground: layoutRadius prop =', layoutRadius);
            console.log('📐 LayoutPlayground: Final borderRadius =', getRadiusToken(layoutRadius));
            console.log('🎯 LayoutPlayground: key =', key);
            console.log('🎯 LayoutPlayground: classes =', getLayoutClasses(key));
            console.log('🎯 LayoutPlayground: colorCategory =', colorCategory);


            return (
              <Box
                key={key}
                className={getLayoutClasses(key)}
                data-dynamic-color={layoutConfigs.find(config => config.key === key)?.colorValue}
              >
                <Box>
                  <Text
                    className="layera-typography layera-margin-bottom--xs"
                    data-size="sm"
                    data-weight="bold"
                  >
                    {title}
                  </Text>
                  <Text
                    className="layera-typography layera-opacity--80"
                    data-size="xs"
                  >
                    {description}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};