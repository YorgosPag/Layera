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

interface BorderWidthControlProps {
  /** Current border width value (1, 2, or 3) */
  value: number;
  /** Callback when border width changes */
  onChange: (value: number) => void;
  /** Element type για description context */
  elementType?: string;
  /** CSS class για styling */
  className?: string;
}

export const BorderWidthControl: React.FC<BorderWidthControlProps> = ({
  value = 2,
  onChange,
  elementType = 'στοιχεία',
  className = ''
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available border width options with their tokens
  const borderWidthOptions = [
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
      description: '2px περίγραμμα'
    },
    {
      value: 3,
      label: 'Χοντρό',
      token: 'var(--layera-global-borderWidth-3)',
      description: '3px περίγραμμα'
    }
  ];

  const handleChange = useCallback((newValue: number) => {
    setIsChanging(true);
    onChange(newValue);

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange]);

  const getCurrentOption = () => {
    return borderWidthOptions.find(option => option.value === value) || borderWidthOptions[1];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        <RulerIcon size="sm" /> Πάχος Περιγραμμάτων
      </h4>

      {/* Border Width Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm layera-margin-bottom--md">
        {borderWidthOptions.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleChange(option.value)}
            style={{
              transition: 'all 0.2s ease',
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
          padding: '12px',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          border: `${currentOption.token} solid var(--layera-color-border-primary)`,
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