import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CheckIcon, BellIcon, SettingsIcon, LocationIcon, CloseIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createInputsVariablesData } from './shared/InputsVariablesData';

interface InputsPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Input radius for styling */
  inputRadius?: string;
  /** Input size for styling */
  inputSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const InputsPlayground: React.FC<InputsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  inputRadius = 'md',
  inputSize = 'md',
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
      'για πεδία εισόδου',
      `μεγέθους ${getSizeInGreek(inputSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(inputRadius)}`);

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

  // Input field configurations
  const inputConfigs = [
    { key: 'primary', label: 'Primary Input', placeholder: 'Primary πεδίο', colorValue: currentColors.primary },
    { key: 'secondary', label: 'Secondary Input', placeholder: 'Secondary πεδίο', colorValue: currentColors.secondary },
    { key: 'success', label: 'Success Input', placeholder: 'Success πεδίο', colorValue: currentColors.success },
    { key: 'warning', label: 'Warning Input', placeholder: 'Warning πεδίο', colorValue: currentColors.warning },
    { key: 'danger', label: 'Danger Input', placeholder: 'Danger πεδίο', colorValue: currentColors.danger },
    { key: 'info', label: 'Info Input', placeholder: 'Info πεδίο', colorValue: currentColors.info }
  ];



  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πεδία
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box
          className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-width--full layera-padding--lg"
        >
          {inputConfigs.map(({ key, placeholder }) => (
            <Box
              key={key}
              className="layera-width--200 layera-text-align--center layera-margin-right--sm"
            >
              <Box
                as="input"
                type="text"
                placeholder={placeholder}
                className="layera-input layera-width--full layera-padding--md layera-text--align-center layera-border--solid layera-border-width--1 layera-border-radius--lg"
              />
            </Box>
          ))}
        </Box>

        {/* Information Icon για Input Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            Όλες οι Μεταβλητές Inputs
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary layera-width--full">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="sm" /> Όλες οι Μεταβλητές Inputs
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
                categories={createInputsVariablesData(
                  colorCategory,
                  borderWidth,
                  inputRadius,
                  inputSize,
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