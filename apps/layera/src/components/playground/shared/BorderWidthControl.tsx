import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';
import { RulerIcon } from '@layera/icons';
import { BorderWidthControlProps } from '../../../types/unified-interfaces';

/**
 * BorderWidthControl Component
 *
 * Ρύθμιση πάχους περιγραμμάτων για όλους τους τύπους στοιχείων
 * - Επιλογές: Thin, Medium, Thick
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-global-borderWidth-{1,2,3} tokens
 * Props interface moved to unified-interfaces.ts
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ExtendedBorderWidthControlProps extends BorderWidthControlProps {
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const BorderWidthControl: React.FC<ExtendedBorderWidthControlProps> = ({
  value = 2,
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available border width options with their tokens
  const borderWidthOptions = [
    {
      value: 0,
      label: 'Χωρίς',
      token: '0',
      description: 'Χωρίς περίγραμμα'
    },
    {
      value: 1,
      label: 'Λεπτό',
      token: 'var(--layera-global-borderWidth-1)',
      description: 'Λεπτό περίγραμμα'
    },
    {
      value: 2,
      label: 'Μεσαίο',
      token: 'var(--layera-global-borderWidth-2)',
      description: 'Μεσαίο περίγραμμα'
    },
    {
      value: 3,
      label: 'Χοντρό',
      token: 'var(--layera-global-borderWidth-3)',
      description: 'Χοντρό περίγραμμα'
    }
  ];

  const handleChange = useCallback((newValue: number) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('borderWidth', newValue.toString());
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return borderWidthOptions.find(option => option.value === value) || borderWidthOptions[1];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <RulerIcon size="sm" /> Πάχος Περιγραμμάτων
      </h4>

      {/* Border Width Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {borderWidthOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`${index < borderWidthOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Border Width */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border-radius--md layera-text-align--center layera-transition--normal ${value === 0 ? 'layera-border--none' : 'layera-border--sm layera-border-color--primary'} ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* CSS Info για BACKGROUNDS στα CARDS */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-primary layera-text-align--left">
        <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs"
              data-size="xs" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> CSS Info:
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Variable:</strong> --layera-live-card-primary
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Selector:</strong> .layera-card[data-variant="primary"]
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          <strong>HTML Attribute:</strong> data-layera-card-primary="active"
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το πάχος των περιγραμμάτων για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};