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

interface ActiveControlProps {
  /** Current active effect value ('none', 'scale', 'opacity', 'press') */
  value: string;
  /** Callback when active effect changes */
  onChange: (value: string) => void;
  /** Element type για description context */
  elementType?: string;
  /** CSS class για styling */
  className?: string;
}

export const ActiveControl: React.FC<ActiveControlProps> = ({
  value = 'scale',
  onChange,
  elementType = 'στοιχεία',
  className = ''
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
        opacity: '1'
      }
    },
    {
      value: 'scale',
      label: 'Scale',
      description: 'Μικραίνει όταν πατιέται',
      preview: {
        transform: 'scale(0.95)',
        opacity: '1'
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

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange]);

  const getCurrentOption = () => {
    return activeOptions.find(option => option.value === value) || activeOptions[1];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        <SettingsIcon size="sm" /> Active Effects
      </h4>

      {/* Active Effect Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm layera-margin-bottom--md">
        {activeOptions.map((option) => (
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

      {/* Live Preview of Current Active Effect */}
      <Box
        className="layera-margin-bottom--sm"
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
        style={{
          padding: '12px',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          border: '1px solid var(--layera-color-border-primary)',
          textAlign: 'center',
          transition: 'all 0.1s ease',
          cursor: 'pointer',
          userSelect: 'none',
          ...(isPressed && value !== 'none' ? currentOption.preview : {})
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