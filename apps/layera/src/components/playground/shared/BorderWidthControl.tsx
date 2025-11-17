import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { RulerIcon } from '@layera/icons';

/**
 * BorderWidthControl Component
 *
 * Ρύθμιση πάχους περιγραμμάτων για όλους τους τύπους στοιχείων
 * - Επιλογές: Thin (1px), Medium (2px), Thick (3px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-global-borderWidth-{1,2,3} tokens
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface BorderWidthControlProps {
  /** Current border width value (0, 1, 2, or 3) */
  value: number;
  /** Callback when border width changes */
  onChange: (value: number) => void;
  /** Element type για description context */
  elementType?: string;
  /** CSS class για styling */
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const BorderWidthControl: React.FC<BorderWidthControlProps> = ({
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
      description: '1px περίγραμμα'
    },
    {
      value: 2,
      label: 'Μεσαίο',
      token: 'var(--layera-global-borderWidth-2)',
      description: '3px περίγραμμα'
    },
    {
      value: 3,
      label: 'Χοντρό',
      token: 'var(--layera-global-borderWidth-3)',
      description: '5px περίγραμμα'
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
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <RulerIcon size="sm" /> Πάχος Περιγραμμάτων
      </h4>

      {/* Border Width Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm layera-margin-bottom--md layera-flex--justify-center">
        {borderWidthOptions.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${value === option.value ? 'primary' : 'outline'}`}
            style={{
              transition: 'var(--layera-iconInteractive-interactive-transition-normal)',
              opacity: isChanging && value === option.value ? 0.7 : 1
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Border Width */}
      <Box
        className="layera-margin-bottom--sm"
        style={{
          padding: 'var(--layera-iconInteractive-sizing-padding-lg)',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          border: value === 0 ? 'none' : `${currentOption.token} solid var(--layera-color-border-primary)`,
          textAlign: 'center',
          transition: 'all 0.2s ease',
          transform: isChanging ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
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