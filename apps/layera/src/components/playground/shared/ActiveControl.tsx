import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';
import { useControlThrottle } from '../../../hooks/useControlThrottle';

/**
 * ActiveControl Component
 *
 * Ρύθμιση active/pressed state για interactive στοιχεία
 * - Επιλογές: None, Scale, Opacity, Press
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ActiveControlProps {
  /** Current active effect value ('none', 'scale', 'opacity', 'press') */
  value: string;
  /** Callback when active effect changes */
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

export const ActiveControl: React.FC<ActiveControlProps> = ({
  value = 'scale',
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const { value: currentValue, isChanging, handleChange } = useControlThrottle({
    initialValue: value,
    onChange,
    onPreview: onPreview ? (val) => onPreview('activeEffect', val) : undefined
  });
  const [isPressed, setIsPressed] = useState(false);

  // ✅ ARXES COMPLIANT: Active options ΧΩΡΙΣ inline CSS objects
  // Χρησιμοποιούμε data attributes για semantic state management
  const activeOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      description: 'Χωρίς active effect',
      dataClass: 'layera-active--none'
    },
    {
      value: 'scale',
      label: 'Scale',
      description: 'Μικραίνει όταν πατιέται',
      dataClass: 'layera-active--scale'
    },
    {
      value: 'opacity',
      label: 'Opacity',
      description: 'Γίνεται διαφανές όταν πατιέται',
      dataClass: 'layera-active--opacity'
    },
    {
      value: 'press',
      label: 'Press',
      description: 'Scale + Opacity όταν πατιέται',
      dataClass: 'layera-active--press'
    }
  ];

  const getCurrentOption = () => {
    return activeOptions.find(option => option.value === currentValue) || activeOptions[1];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Active Effects
      </h4>

      {/* Active Effect Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {activeOptions.map((option) => (
          <Button
            key={option.value}
            variant={currentValue === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${currentValue === option.value ? 'primary' : 'outline'} ${isChanging && currentValue === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Active Effect */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border-radius--md layera-border--sm layera-border-color--primary layera-text-align--center layera-transition--fast layera-cursor--pointer layera-user-select--none ${isPressed && currentValue !== 'none' ? 'layera-transform--scale-95 layera-opacity--80' : ''}`}
        onMouseDown={() => {
          if (currentValue !== 'none') {
            setIsPressed(true);
          }
        }}
        onMouseUp={() => {
          setIsPressed(false);
        }}
        onMouseLeave={() => {
          setIsPressed(false);
        }}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Press me: {currentOption.description}
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
        Επιλέξτε το active effect για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};