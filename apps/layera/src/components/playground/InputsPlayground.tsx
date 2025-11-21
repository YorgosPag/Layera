import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';

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
      </Box>
    </Box>
  );
};