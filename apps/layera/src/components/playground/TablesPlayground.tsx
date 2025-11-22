import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CheckIcon, BellIcon, SettingsIcon, LocationIcon, CloseIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { TablesPlaygroundProps } from '../../types/unified-interfaces';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createTablesVariablesData } from './shared/TablesVariablesData';

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
  // State για το Variables Info Popup
  const [showVariablesPopup, setShowVariablesPopup] = useState(false);

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
    <Box>
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
              <span className="layera-text--align-center">{color.name} Row</span>
              <span className="layera-opacity--80 layera-fontSize--xs layera-text--align-center">
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>

        {/* Information Icon για Table Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            <BellIcon size="sm" /> Όλες οι Μεταβλητές Tables
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary layera-width--full">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="sm" /> Όλες οι Μεταβλητές Tables
              </Text>
              <Button
                variant="ghost"
                size="sm"
                icon={<CloseIcon size="sm" />}
                onClick={() => setShowVariablesPopup(false)}
                className="layera-opacity--70 layera-hover--opacity-100"
              >
                ✕
              </Button>
            </Box>

            {/* Accordion Structure για Variables */}
            <Box className="layera-space-y--md layera-margin-bottom--lg">
              <VariablesInfoAccordion
                categories={createTablesVariablesData(
                  colorCategory,
                  borderWidth,
                  tableRadius,
                  tableSize,
                  hoverEffect,
                  activeEffect
                )}
                defaultExpandedCategory="backgroundColors"
              />
            </Box>
        </Box>
      )}
    </Box>
  );
};