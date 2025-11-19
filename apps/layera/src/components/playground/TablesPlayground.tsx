import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { TablesPlaygroundProps } from '../../types/unified-interfaces';

// ✅ NO INLINE STYLES - Using only @layera tokens and CSS classes
// Props interface moved to unified-interfaces.ts

export const TablesPlayground: React.FC<TablesPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  tableRadius = 'md',
  tableSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Χρησιμοποιούμε τις κεντρικές helper functions από το PLAYGROUND_HELPERS utility
  const { getRadiusInGreek, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για πίνακες',
      `μεγέθους ${getSizeInGreek(tableSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(tableRadius)}`);

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

  // ✅ NO INLINE STYLES - Using CSS classes with @layera tokens
  const getDynamicTableClasses = (_colorName: string) => {
    const baseClasses = "layera-box-border layera-border--solid layera-border-color--transparent layera-padding--md layera-border-radius--md layera-flex layera-flex--justify-space-between layera-flex--align-center layera-text--size-sm layera-font-weight--medium";

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

  const colors = [
    { name: 'Primary', value: currentColors.primary },
    { name: 'Secondary', value: currentColors.secondary },
    { name: 'Success', value: currentColors.success },
    { name: 'Warning', value: currentColors.warning },
    { name: 'Danger', value: currentColors.danger },
    { name: 'Info', value: currentColors.info }
  ];

  return (
    <Box
      className="layera-padding-left--lg layera-padding-right--lg"
    >
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πίνακες
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--column">
          {colors.map((color, index) => (
            <Box
              key={color.name}
              className={`${getDynamicTableClasses(color.name)} ${index === colors.length - 1 ? "" : "layera-margin-bottom--xs"}`}
              data-color-category={colorCategory}
              data-dynamic-color={color.value}
            >
              <span>{color.name} Row</span>
              <span className="layera-opacity--80 layera-fontSize--xs">
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};