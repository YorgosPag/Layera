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

import type { ButtonState, ButtonActions } from '../../../hooks/useButtonState.js';

interface ButtonTextIconControlProps {
  buttonState: ButtonState;
  buttonActions: ButtonActions;
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