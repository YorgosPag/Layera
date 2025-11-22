import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * ButtonSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους πλήκτρων για buttons element type
 * - Δυναμικά μεγέθη από το buttonSizes array
 * - Βασισμένα στα Material Design, Ant Design standards
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Bootstrap, Chakra UI, Mantine button systems
 */

import type { ButtonState, ButtonStateActions } from '../../../hooks/useButtonState.js';
import type { ButtonSize } from '../../../types/sizes';

interface ButtonSizeControlProps {
  buttonState: ButtonState;
  buttonActions: ButtonStateActions;
  buttonSizes: ButtonSize[];
  className?: string;
}

export const ButtonSizeControl: React.FC<ButtonSizeControlProps> = ({
  buttonState,
  buttonActions,
  buttonSizes,
  className = ''
}) => {
  return (
    <Box className={`layera-card layera-padding--lg layera-text--align-center ${className}`} data-variant="primary">
      <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Μέγεθος Πλήκτρων
      </h3>
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center layera-align-items--center layera-margin-bottom--md">
        {buttonSizes.map((size, index) => (
          <Button
            key={size}
            variant={buttonState.size === size ? 'primary' : 'outline'}
            size={buttonState.size}
            onClick={() => buttonActions.setSize(size)}
            className={`${index < buttonSizes.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState.size} layera-button--${buttonState.size === size ? 'primary' : 'outline'}`}
          >
            {size}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {buttonState.size === 'xs' ? 'Πολύ μικρά - compact UI' : buttonState.size === 'sm' ? 'Μικρά - κανονικά forms' : buttonState.size === 'md' ? 'Μεσαία - default πλήκτρα' : buttonState.size === 'lg' ? 'Μεγάλα - call-to-action' : 'Πολύ μεγάλα - hero sections'}
        </Text>
      </Box>

      {/* CSS Info για BUTTON SIZES */}
      <Box className="layera-border--dashed layera-border-width--1 layera-border-color--info layera-padding--md layera-margin-bottom--sm layera-bg--surface-secondary layera-border-radius--md">
        <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs" data-size="xs" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> CSS Πληροφορίες
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Variable:</strong> --layera-live-button-size
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Selector:</strong> .layera-button[data-size="{buttonState.size}"]
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>HTML Attribute:</strong> data-layera-button-size="{buttonState.size}"
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          Τρέχον μέγεθος: <span className="layera-typography" data-weight="bold" data-color="success">{buttonState.size}</span>
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος των πλήκτρων ανάλογα με τη σημαντικότητα
      </Text>
    </Box>
  );
};