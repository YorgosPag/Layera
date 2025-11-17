import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * LayoutRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών Layout στοιχείων
 * - Επιλογές: None (0px), Small (2px), Medium (6px), Large (8px), XL (12px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-layout tokens για layout elements
 * - Separation of concerns από Button/Border radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface LayoutRadiusControlProps {
  /** Current layout radius value ('none', 'xs', 'md', 'lg', 'xl') */
  value: string;
  /** Callback when layout radius changes */
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

export const LayoutRadiusControl: React.FC<LayoutRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'layout στοιχεία',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available layout radius options with their tokens
  const layoutRadiusOptions = [
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
      token: 'var(--layera-radius-layout)',
      description: 'Μεσαία καμπύλες (6px)'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: '0.5rem',
      description: 'Πολύ καμπύλες (8px)'
    },
    {
      value: 'xl',
      label: 'Μεγάλες',
      token: '0.75rem',
      description: 'Μεγάλες καμπύλες (12px - layouts)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('layoutRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return layoutRadiusOptions.find(option => option.value === value) || layoutRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Layout
      </h4>

      {/* Layout Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {layoutRadiusOptions.map((option) => (
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

      {/* Live Preview of Current Layout Radius */}
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
        {isChanging && ' (ενημερώνεται...)'} - Για κάρτες, containers, panels
      </Text>
    </Box>
  );
};