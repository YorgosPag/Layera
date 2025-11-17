import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CompassIcon } from '@layera/icons';

/**
 * BorderRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας περιγραμμάτων για όλους τους τύπους στοιχείων
 * - Επιλογές: None (0px), Small (2px), Medium (6px), Large (8px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-global-borderRadius-{none,xs,md,lg} tokens
 */

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
}

export const BorderRadiusControl: React.FC<BorderRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'στοιχεία',
  className = '',
  onPreview
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available border radius options with their tokens
  const borderRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: 'var(--layera-global-borderRadius-none)',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνα)'
    },
    {
      value: 'xs',
      label: 'Ελαφρώς',
      token: 'var(--layera-global-borderRadius-xs)',
      description: 'Ελαφρώς καμπύλες (2px)'
    },
    {
      value: 'md',
      label: 'Μεσαία',
      token: 'var(--layera-global-borderRadius-md)',
      description: 'Μεσαία καμπύλες (6px)'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: 'var(--layera-global-borderRadius-lg)',
      description: 'Πολύ καμπύλες (8px)'
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
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <CompassIcon size="sm" /> Καμπυλότητα Περιγραμμάτων
      </h4>

      {/* Border Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm layera-margin-bottom--md layera-flex--justify-center">
        {borderRadiusOptions.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleChange(option.value)}
            style={{
              transition: 'var(--layera-iconInteractive-interactive-transition-normal)',
              opacity: isChanging && value === option.value ? 0.7 : 1
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Border Radius */}
      <Box
        className="layera-margin-bottom--sm"
        style={{
          padding: 'var(--layera-iconInteractive-sizing-padding-lg)',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: currentOption.token,
          border: '2px solid var(--layera-color-border-primary)',
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
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'}
      </Text>
    </Box>
  );
};