import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CompassIcon, SettingsIcon } from '@layera/icons';

/**
 * BorderRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας περιγραμμάτων για όλους τους τύπους στοιχείων
 * - Επιλογές: None, Small, Medium, Large
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-global-borderRadius-{none,xs,md,lg} tokens
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface BorderRadiusControlProps {
  /** Current border radius value ('none', 'xs', 'md', 'lg') */
  value: string;
  /** Callback when border radius changes */
  onChange: (value: string) => void;
  /** Element type για description context */
  elementType?: string;
  /** CSS class για styling */
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const BorderRadiusControl: React.FC<BorderRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available border radius options with their tokens
  const borderRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: 'var(--layera-global-borderRadius-none)',
      description: 'Χωρίς καμπυλότητα - τετράγωνα'
    },
    {
      value: 'xs',
      label: 'Ελαφρώς',
      token: 'var(--layera-global-borderRadius-xs)',
      description: 'Ελαφρώς καμπύλες'
    },
    {
      value: 'md',
      label: 'Μεσαία',
      token: 'var(--layera-global-borderRadius-md)',
      description: 'Μεσαία καμπύλες'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: 'var(--layera-global-borderRadius-lg)',
      description: 'Πολύ καμπύλες'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('borderRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return borderRadiusOptions.find(option => option.value === value) || borderRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <CompassIcon size="sm" /> Καμπυλότητα Περιγραμμάτων
      </h4>

      {/* Border Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {borderRadiusOptions.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Border Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border--md layera-border-color--primary layera-text-align--center layera-transition--normal ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
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
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};