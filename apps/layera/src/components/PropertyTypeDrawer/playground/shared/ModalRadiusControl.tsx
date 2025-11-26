import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * ModalRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών modals και dialog components
 * - Επιλογές: None, Small, Medium, Large, XL
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-modal tokens για modals
 * - Separation of concerns από Button/Layout/Card/Border radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ModalRadiusControlProps {
  /** Current modal radius value ('none', 'xs', 'md', 'lg', 'xl') */
  value: string;
  /** Callback when modal radius changes */
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

export const ModalRadiusControl: React.FC<ModalRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'modals',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available modal radius options with their tokens
  const modalRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: '0',
      description: 'Χωρίς καμπυλότητα - τετράγωνα modals'
    },
    {
      value: 'sm',
      label: 'Ελαφρώς',
      token: 'var(--layera-radius-sm)',
      description: 'Ελαφρώς καμπύλες'
    },
    {
      value: 'lg',
      label: 'Μεσαία',
      token: 'var(--layera-radius-lg)',
      description: 'Μεσαία καμπύλες'
    },
    {
      value: 'xl',
      label: 'Πολύ',
      token: 'var(--layera-radius-xl)',
      description: 'Πολύ καμπύλες - default για modals'
    },
    {
      value: 'xxl',
      label: 'Μεγάλες',
      token: 'var(--layera-radius-xxl)',
      description: 'Μεγάλες καμπύλες - ειδικά modals'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview

    if (onPreview) {
      onPreview('modalRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return modalRadiusOptions.find(option => option.value === value) || modalRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Modals
      </h4>

      {/* Modal Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {modalRadiusOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`${index < modalRadiusOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Modal Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-text-align--center layera-transition--normal layera-border--solid layera-border-width--2 layera-border-color--primary layera-min-height--5 layera-dynamic-radius ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        data-dynamic-radius={currentOption.token}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'} - Για dialogs, popups, overlays
      </Text>
    </Box>
  );
};