import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, PolygonIcon, RulerIcon, CompassIcon } from '@layera/icons';

/**
 * ButtonShapeControl Component
 *
 * Παρέχει επιλογές σχήματος πλήκτρων για buttons element type
 * - 3 βασικά σχήματα: rectangular, square, rounded
 * - Βασισμένα στα Material Design, Ant Design standards
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Bootstrap, Chakra UI, Mantine button systems
 */

import type { ButtonState, ButtonActions } from '../../../hooks/useButtonState.js';

interface ButtonShapeControlProps {
  buttonState: ButtonState;
  buttonActions: ButtonActions;
  className?: string;
}

export const ButtonShapeControl: React.FC<ButtonShapeControlProps> = ({
  buttonState,
  buttonActions,
  className = ''
}) => {
  return (
    <Box
      className={`layera-card layera-padding--lg layera-text--align-center ${className}`}
      data-variant="primary"
    >
      <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <PolygonIcon size="sm" /> Σχήμα Πλήκτρου
      </h3>
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center layera-align-items--center layera-margin-bottom--md">
        <Button
          variant={buttonState.shape === 'rectangular' ? 'primary' : 'outline'}
          size={buttonState.size}
          onClick={() => buttonActions.setShape('rectangular')}
          className={`layera-button layera-button--${buttonState.size} layera-button--${buttonState.shape === 'rectangular' ? 'primary' : 'outline'}`}
        >
          <RulerIcon size="sm" /> Παραλληλόγραμμο
        </Button>
        <Button
          variant={buttonState.shape === 'square' ? 'primary' : 'outline'}
          size={buttonState.size}
          onClick={() => buttonActions.setShape('square')}
          className={`layera-button layera-button--${buttonState.size} layera-button--${buttonState.shape === 'square' ? 'primary' : 'outline'}`}
        >
          <PolygonIcon size="sm" /> Τετράγωνο
        </Button>
        <Button
          variant={buttonState.shape === 'rounded' ? 'primary' : 'outline'}
          size={buttonState.size}
          onClick={() => buttonActions.setShape('rounded')}
          className={`layera-button layera-button--${buttonState.size} layera-button--${buttonState.shape === 'rounded' ? 'primary' : 'outline'}`}
        >
          <CompassIcon size="sm" /> Στρογγυλό
        </Button>
      </Box>

      {/* CSS Info για BACKGROUNDS στα CARDS */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-primary layera-text-align--left">
        <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs"
              data-size="xs" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> CSS Info:
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Variable:</strong> --layera-live-card-primary
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Selector:</strong> .layera-card[data-variant="primary"]
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          <strong>HTML Attribute:</strong> data-layera-card-primary="active"
        </Text>
      </Box>
    </Box>
  );
};