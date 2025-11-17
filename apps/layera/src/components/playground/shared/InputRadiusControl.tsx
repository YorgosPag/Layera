import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * InputRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών input fields και form controls
 * - Επιλογές: None (0px), Small (2px), Medium (4px), Large (6px), XL (8px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-input tokens για inputs
 * - Separation of concerns από Button/Layout/Card/Modal/Border radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface InputRadiusControlProps {
  /** Current input radius value ('none', 'xs', 'md', 'lg', 'xl') */
  value: string;
  /** Callback when input radius changes */
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

export const InputRadiusControl: React.FC<InputRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'πεδία εισαγωγής',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available input radius options with their tokens - Enterprise unified hierarchy (0, 4, 8, 12, 16px)
  const inputRadiusOptions = [
    {
      value: 'none',
      label: '0px',
      token: '0px',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνα πεδία)'
    },
    {
      value: 'sm',
      label: '4px',
      token: 'var(--layera-radius-sm)',
      description: 'Ελαφρώς καμπύλες (4px)'
    },
    {
      value: 'lg',
      label: '8px',
      token: 'var(--layera-radius-lg)',
      description: 'Μεσαία καμπύλες (8px - default για πεδία)'
    },
    {
      value: 'xl',
      label: '12px',
      token: 'var(--layera-radius-xl)',
      description: 'Πολύ καμπύλες (12px)'
    },
    {
      value: 'xxl',
      label: '16px',
      token: 'var(--layera-radius-xxl)',
      description: 'Μεγάλες καμπύλες (16px - ειδικά πεδία)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    console.log('🔧 InputRadiusControl: Sending preview', { key: 'inputRadius', value: newValue });
    if (onPreview) {
      onPreview('inputRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return inputRadiusOptions.find(option => option.value === value) || inputRadiusOptions[2]; // Default to 'lg' (8px)
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Πεδίων
      </h4>

      {/* Input Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {inputRadiusOptions.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Input Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center layera-transition--normal layera-border--solid layera-border-width--2 layera-border-color--primary layera-min-height--3 layera-flex layera-flex--align-center layera-flex--justify-center ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        style={{
          borderRadius: currentOption.token
        } as React.CSSProperties}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'} - Για inputs, textareas, selects
      </Text>
    </Box>
  );
};