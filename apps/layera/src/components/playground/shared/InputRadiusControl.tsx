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

  // Available input radius options with their tokens
  const inputRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: '0px',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνα inputs)'
    },
    {
      value: 'xs',
      label: 'Ελαφρώς',
      token: '0.125rem',
      description: 'Ελαφρώς καμπύλες (2px)'
    },
    {
      value: 'md',
      label: 'Μεσαία',
      token: 'var(--layera-radius-input)',
      description: 'Μεσαία καμπύλες (4px - inputs)'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: '0.375rem',
      description: 'Πολύ καμπύλες (6px)'
    },
    {
      value: 'xl',
      label: 'Μεγάλες',
      token: '0.5rem',
      description: 'Μεγάλες καμπύλες (8px - special inputs)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('inputRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return inputRadiusOptions.find(option => option.value === value) || inputRadiusOptions[2];
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
        className={`layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center layera-transition--normal ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        style={{
          borderRadius: currentOption.token,
          border: '2px solid var(--layera-color-border-primary)',
          minHeight: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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