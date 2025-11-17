import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

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
  const [isChanging, setIsChanging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Available active effect options
  const activeOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      description: 'Χωρίς active effect',
      preview: {
        transform: 'none',
        opacity: 'var(--layera-icon-interactive-interactive-opacity-default)'
      }
    },
    {
      value: 'scale',
      label: 'Scale',
      description: 'Μικραίνει όταν πατιέται',
      preview: {
        transform: 'scale(0.95)',
        opacity: 'var(--layera-icon-interactive-interactive-opacity-default)'
      }
    },
    {
      value: 'opacity',
      label: 'Opacity',
      description: 'Γίνεται διαφανές όταν πατιέται',
      preview: {
        transform: 'none',
        opacity: '0.7'
      }
    },
    {
      value: 'press',
      label: 'Press',
      description: 'Scale + Opacity όταν πατιέται',
      preview: {
        transform: 'scale(0.95)',
        opacity: '0.8'
      }
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('activeEffect', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return activeOptions.find(option => option.value === value) || activeOptions[1];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Active Effects
      </h4>

      {/* Active Effect Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {activeOptions.map((option) => (
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

      {/* Live Preview of Current Active Effect */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border-radius--md layera-border--sm layera-border-color--primary layera-text-align--center layera-transition--fast layera-cursor--pointer layera-user-select--none ${isPressed && value !== 'none' ? 'layera-transform--scale-95 layera-opacity--80' : ''}`}
        onMouseDown={() => {
          if (value !== 'none') {
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

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το active effect για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};