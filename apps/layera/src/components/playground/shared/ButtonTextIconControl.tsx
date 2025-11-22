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

      {/* CSS Info για BUTTON TEXT & ICONS */}
      <Box className="layera-border--dashed layera-border-width--1 layera-border-color--info layera-padding--md layera-margin-bottom--sm layera-bg--surface-secondary layera-border-radius--md">
        <Text className="layera-typography layera-margin-bottom--xs layera-flex layera-flex--align-center layera-gap--xs" data-size="xs" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> CSS Πληροφορίες
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Variable:</strong> --layera-live-button-content
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>Selector:</strong> .layera-button[data-text="{buttonState.text}"]
        </Text>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-color="secondary">
          <strong>HTML Attribute:</strong> data-layera-button-icon="{buttonState.withIcon ? 'enabled' : 'disabled'}"
        </Text>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          Τρέχον κείμενο: <span className="layera-typography" data-weight="bold" data-color="success">"{buttonState.text}"</span>
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Προσαρμόστε το κείμενο και την εμφάνιση εικονιδίων στα πλήκτρα
      </Text>
    </Box>
  );
};