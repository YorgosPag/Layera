import React, { useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';
import { useControlThrottle } from '../../../hooks/useControlThrottle';

/**
 * ButtonRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών πλήκτρων για όλους τους τύπους στοιχείων
 * - Επιλογές: None, Small, Medium, Large, Round
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-* tokens για πλήκτρα
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ButtonRadiusControlProps {
  /** Current button radius value ('none', 'xs', 'md', 'lg', 'round') */
  value: string;
  /** Callback when button radius changes */
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

export const ButtonRadiusControl: React.FC<ButtonRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'πλήκτρα',
  className = '',
  onPreview,
  buttonState
}) => {
  const { value: currentValue, isChanging, handleChange } = useControlThrottle({
    initialValue: value,
    onChange,
    onPreview: onPreview ? (val) => onPreview('buttonRadius', val) : undefined
  });

  // Available button radius options with their tokens - Updated hierarchy
  const buttonRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: '0',
      description: 'Χωρίς καμπυλότητα - τετράγωνα πλήκτρα'
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
      description: 'Μεσαία καμπύλες - default για πλήκτρα'
    },
    {
      value: 'xl',
      label: 'Πολύ',
      token: 'var(--layera-radius-xl)',
      description: 'Πολύ καμπύλες'
    },
    {
      value: 'xxl',
      label: 'Μεγάλες',
      token: 'var(--layera-radius-xxl)',
      description: 'Μεγάλες καμπύλες - ειδικά πλήκτρα'
    }
  ];

  const getCurrentOption = () => {
    return buttonRadiusOptions.find(option => option.value === currentValue) || buttonRadiusOptions[2]; // Default to 'lg'
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="md" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Πλήκτρων
      </h4>

      {/* Button Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {buttonRadiusOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={currentValue === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`${index < buttonRadiusOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${currentValue === option.value ? 'primary' : 'outline'} ${isChanging && currentValue === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Button Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-primary layera-text-align--center layera-transition--normal layera-border--solid layera-border-width--2 layera-border-color--primary layera-dynamic-radius ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        data-dynamic-radius={currentOption.token}
      >
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {currentOption.description}
        </Text>
      </Box>

      {/* CSS Information για developers */}
      <Box className="layera-border--dashed layera-border-width--1 layera-border-color--info layera-padding--md layera-margin-bottom--sm layera-bg--surface-secondary layera-border-radius--md">
        <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs" data-size="xs" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> CSS Πληροφορίες
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Variable:</strong> {`--layera-live-${elementType || 'buttons'}-primary`}
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Selector:</strong> {`.layera-${elementType || 'buttons'}[data-variant="primary"]`}
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>HTML Attribute:</strong> {`data-layera-${elementType || 'buttons'}-primary="active"`}
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          Τρέχον token: <span className="layera-typography" data-weight="bold" data-color="success">{currentOption.token}</span>
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