import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * ButtonRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών πλήκτρων για όλους τους τύπους στοιχείων
 * - Επιλογές: None (0px), Small (2px), Medium (6px), Large (8px), Round (50%)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-* tokens για πλήκτρα
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ButtonRadiusControlProps {
  /** Current button radius value ('none', 'xs', 'md', 'lg', 'round') */
  value: string;
  /** Callback when button radius changes */
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

export const ButtonRadiusControl: React.FC<ButtonRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'πλήκτρα',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available button radius options with their tokens
  const buttonRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: '0px',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνα)'
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
      token: 'var(--layera-radius-button)',
      description: 'Μεσαία καμπύλες (6px)'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: '0.5rem',
      description: 'Πολύ καμπύλες (8px)'
    },
    {
      value: 'round',
      label: 'Στρογγυλά',
      token: '50%',
      description: 'Πλήρως στρογγυλά (50%)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('buttonRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return buttonRadiusOptions.find(option => option.value === value) || buttonRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Πλήκτρων
      </h4>

      {/* Button Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {buttonRadiusOptions.map((option) => (
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

      {/* Live Preview of Current Button Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-text-align--center layera-transition--normal ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        style={{
          borderRadius: currentOption.token,
          border: '2px solid var(--layera-color-border-primary)'
        } as React.CSSProperties}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
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