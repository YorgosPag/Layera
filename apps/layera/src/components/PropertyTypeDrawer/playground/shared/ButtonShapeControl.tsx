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

import type { ButtonState, ButtonStateActions } from '../../../hooks/useButtonState.js';

interface ButtonShapeControlProps {
  buttonState: ButtonState;
  buttonActions: ButtonStateActions;
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
          className={`layera-margin-right--sm layera-button layera-button--${buttonState.size} layera-button--${buttonState.shape === 'rectangular' ? 'primary' : 'outline'}`}
        >
          <RulerIcon size="sm" /> Παραλληλόγραμμο
        </Button>
        <Button
          variant={buttonState.shape === 'square' ? 'primary' : 'outline'}
          size={buttonState.size}
          onClick={() => buttonActions.setShape('square')}
          className={`layera-margin-right--sm layera-button layera-button--${buttonState.size} layera-button--${buttonState.shape === 'square' ? 'primary' : 'outline'}`}
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

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: {buttonState.shape === 'rectangular' ? 'Παραλληλόγραμμο σχήμα - κλασικό' : buttonState.shape === 'square' ? 'Τετράγωνο σχήμα - συμπαγές' : 'Στρογγυλό σχήμα - μοντέρνο'}
        </Text>
      </Box>


      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το σχήμα των πλήκτρων ανάλογα με το design style
      </Text>
    </Box>
  );
};