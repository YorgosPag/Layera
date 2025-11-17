import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * CardRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών καρτών και card components
 * - Επιλογές: None (0px), Small (2px), Medium (8px), Large (12px), XL (16px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-card tokens για κάρτες
 * - Separation of concerns από Button/Layout/Border radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface CardRadiusControlProps {
  /** Current card radius value ('none', 'xs', 'md', 'lg', 'xl') */
  value: string;
  /** Callback when card radius changes */
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

export const CardRadiusControl: React.FC<CardRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'κάρτες',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available card radius options with their tokens
  const cardRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: '0px',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνες κάρτες)'
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
      token: 'var(--layera-radius-card)',
      description: 'Μεσαία καμπύλες (8px - κάρτες)'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: '0.75rem',
      description: 'Πολύ καμπύλες (12px)'
    },
    {
      value: 'xl',
      label: 'Μεγάλες',
      token: '1rem',
      description: 'Μεγάλες καμπύλες (16px - special cards)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('cardRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return cardRadiusOptions.find(option => option.value === value) || cardRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Καρτών
      </h4>

      {/* Card Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {cardRadiusOptions.map((option) => (
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

      {/* Live Preview of Current Card Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-text-align--center layera-transition--normal ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        style={{
          borderRadius: currentOption.token,
          border: '2px solid var(--layera-color-border-primary)',
          minHeight: '4rem'
        } as React.CSSProperties}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'} - Για κάρτες, panels, containers
      </Text>
    </Box>
  );
};