import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * HeaderRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών headers και header components
 * - Επιλογές: None (0px), Small (4px), Medium (8px), Large (12px), XL (16px)
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-header tokens για headers
 * - Separation of concerns από Button/Layout/Border radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface HeaderRadiusControlProps {
  /** Current header radius value ('none', 'sm', 'lg', 'xl', 'xxl') */
  value: string;
  /** Callback when header radius changes */
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

export const HeaderRadiusControl: React.FC<HeaderRadiusControlProps> = ({
  value = 'lg',
  onChange,
  elementType = 'headers',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available header radius options with their tokens
  const headerRadiusOptions = [
    {
      value: 'none',
      label: '0px',
      token: '0px',
      description: 'Χωρίς καμπυλότητα (0px - τετράγωνα headers)'
    },
    {
      value: 'sm',
      label: '4px',
      token: 'var(--layera-radius-sm)',
      description: 'Ελαφρώς καμπύλες (4px)'
    },
    {
      value: 'lg',
      label: '8px',
      token: 'var(--layera-radius-lg)',
      description: 'Μεσαία καμπύλες (8px - default για headers)'
    },
    {
      value: 'xl',
      label: '12px',
      token: 'var(--layera-radius-xl)',
      description: 'Πολύ καμπύλες (12px)'
    },
    {
      value: 'xxl',
      label: '16px',
      token: 'var(--layera-radius-xxl)',
      description: 'Μεγάλες καμπύλες (16px - ειδικά headers)'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    console.log('🔧 HeaderRadiusControl: Sending preview', { key: 'headerRadius', value: newValue });
    if (onPreview) {
      onPreview('headerRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return headerRadiusOptions.find(option => option.value === value) || headerRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Headers
      </h4>

      {/* Header Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {headerRadiusOptions.map((option) => (
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

      {/* Live Preview of Current Header Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-text-align--center layera-transition--normal layera-border--solid layera-border-width--2 layera-border-color--primary layera-min-height--4 ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        style={{
          borderRadius: currentOption.token
        } as React.CSSProperties}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'} - Για navigation bars, page headers, sections
      </Text>
    </Box>
  );
};