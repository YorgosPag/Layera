import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * HoverControl Component
 *
 * Ρύθμιση hover effects για interactive στοιχεία
 * - Επιλογές: None, Subtle, Normal, Strong
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί hover tokens από το design system
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface HoverControlProps {
  /** Current hover effect value ('none', 'subtle', 'normal', 'strong') */
  value: string;
  /** Callback when hover effect changes */
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

export const HoverControl: React.FC<HoverControlProps> = ({
  value = 'normal',
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available hover effect options
  const hoverOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      description: 'Χωρίς hover effect',
      preview: {
        opacity: 'var(--layera-icon-interactive-interactive-opacity-default)',
        transform: 'none',
        background: 'var(--layera-color-surface-primary)'
      }
    },
    {
      value: 'subtle',
      label: 'Ελαφρύ',
      description: 'Ελαφρύ hover effect',
      preview: {
        opacity: '0.9',
        transform: 'none',
        background: 'var(--layera-color-surface-hover)'
      }
    },
    {
      value: 'normal',
      label: 'Κανονικό',
      description: 'Κανονικό hover effect',
      preview: {
        opacity: '0.8',
        transform: 'translateY(-1px)',
        background: 'var(--layera-color-surface-hover)'
      }
    },
    {
      value: 'strong',
      label: 'Έντονο',
      description: 'Έντονο hover effect',
      preview: {
        opacity: '0.8',
        transform: 'translateY(-2px) scale(1.02)',
        background: 'var(--layera-color-surface-hover)'
      }
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
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Hover Effects
      </h4>

      {/* Hover Effect Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {hoverOptions.map((option) => (
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

      {/* Live Preview of Current Hover Effect */}
      <Box
        className="layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-border-radius--md layera-border--sm layera-border-color--primary layera-text-align--center layera-cursor--pointer layera-transition--normal"
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Hover me: {currentOption.description}
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