import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, EditIcon, CheckIcon, CloseIcon } from '@layera/icons';

/**
 * ButtonTextIconControl Component
 *
 * Παρέχει ρυθμίσεις κειμένου και εικονιδίων για buttons element type
 * - Επεξεργασία κειμένου πλήκτρου
 * - Ενεργοποίηση/απενεργοποίηση εικονιδίων
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Material Design, Ant Design standards
 */

import type { ButtonState, ButtonStateActions } from '../../../hooks/useButtonState.js';

interface ButtonTextIconControlProps {
  buttonState: ButtonState;
  buttonActions: ButtonStateActions;
  className?: string;
}

export const ButtonTextIconControl: React.FC<ButtonTextIconControlProps> = ({
  buttonState,
  buttonActions,
  className = ''
}) => {
  return (
    <Box className={`layera-card layera-padding--lg layera-text--align-center ${className}`} data-variant="primary">
      <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <EditIcon size="sm" /> Κείμενο & Εικονίδιο
      </h3>
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--align-center layera-flex--justify-center layera-margin-bottom--md">
        <input
          type="text"
          value={buttonState.text}
          onChange={(e) => buttonActions.setText(e.target.value)}
          className="layera-form"
          data-element="input"
        />
        <Button
          variant={buttonState.withIcon ? 'primary' : 'outline'}
          size={buttonState.size}
          onClick={() => buttonActions.setWithIcon(!buttonState.withIcon)}
          className={`layera-button layera-button--${buttonState.size} layera-button--${buttonState.withIcon ? 'primary' : 'outline'}`}
        >
          {buttonState.withIcon ? <><CheckIcon size="sm" /> Με εικονίδιο</> : <><CloseIcon size="sm" /> Χωρίς εικονίδιο</>}
        </Button>
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          Preview: Κείμενο "{buttonState.text}" | Εικονίδιο {buttonState.withIcon ? 'Ενεργό' : 'Ανενεργό'}
        </Text>
      </Box>


      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Προσαρμόστε το κείμενο και την εμφάνιση εικονιδίων στα πλήκτρα
      </Text>
    </Box>
  );
};