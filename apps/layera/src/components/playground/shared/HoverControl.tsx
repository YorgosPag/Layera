import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';
import { HoverControlProps } from '../../../types/unified-interfaces';

/**
 * HoverControl Component
 *
 * Ρύθμιση hover effects για interactive στοιχεία
 * - Επιλογές: None, Subtle, Normal, Strong
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί hover tokens από το design system
 * Props interface moved to unified-interfaces.ts
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ExtendedHoverControlProps extends HoverControlProps {
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const HoverControl: React.FC<ExtendedHoverControlProps> = ({
  value = 'normal',
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // ✅ ARXES COMPLIANT: Hover options ΧΩΡΙΣ inline CSS objects
  // Χρησιμοποιούμε data attributes για semantic state management
  const hoverOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      description: 'Χωρίς hover effect',
      dataClass: 'layera-hover--none'
    },
    {
      value: 'subtle',
      label: 'Ελαφρύ',
      description: 'Ελαφρύ hover effect',
      dataClass: 'layera-hover--subtle'
    },
    {
      value: 'normal',
      label: 'Κανονικό',
      description: 'Κανονικό hover effect',
      dataClass: 'layera-hover--normal'
    },
    {
      value: 'strong',
      label: 'Έντονο',
      description: 'Έντονο hover effect',
      dataClass: 'layera-hover--strong'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('hoverEffect', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return hoverOptions.find(option => option.value === value) || hoverOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Hover Effects
      </h4>

      {/* Hover Effect Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {hoverOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`${index < hoverOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Hover Effect */}
      <Box
        className="layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border-radius--md layera-border--sm layera-border-color--primary layera-text-align--center layera-cursor--pointer layera-transition--normal"
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Hover me: {currentOption.description}
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
        Επιλέξτε το hover effect για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};