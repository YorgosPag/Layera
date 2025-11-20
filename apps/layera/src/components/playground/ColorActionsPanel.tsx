import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { RocketIcon, CheckIcon } from '@layera/icons';
import { ColorActionsProps } from '../../types/unified-interfaces';

/**
 * ColorActionsPanel Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Apply Colors Buttons ενότητα
 * Γραμμές 191-221 από το αρχικό LivePlayground.tsx
 * Props interface moved to unified-interfaces.ts
 */

import type { ColorState } from '../../hooks/useColorState.js';
import type { ButtonState } from '../../hooks/useButtonState.js';

interface ExtendedColorActionsPanelProps {
  colorHookState: ColorState;
  buttonState: ButtonState;
  applyColorsToApp: () => void;
  applySquareColorsToHeader: () => void;
  onSave?: () => void;
  onLoad?: () => void;
  onReset?: () => void;
}

export const ColorActionsPanel: React.FC<ExtendedColorActionsPanelProps> = ({
  colorHookState,
  buttonState,
  applyColorsToApp,
  applySquareColorsToHeader
}) => {
  return (
    <Box className="layera-card layera-padding--lg layera-text-center layera-margin-top--2xl layera-margin-bottom--xl layera-bg-surface--success layera-border-color--success layera-border-width--2">
      <Box className="layera-flex layera-flex--justify-center layera-flex--wrap-wrap layera-flex--gap-md layera-align-items--center">
        <Button
          variant="primary"
          size={buttonState.size}
          onClick={applyColorsToApp}
          className={`layera-button layera-button--${buttonState.size} layera-button--primary`}
        >
          <RocketIcon size="sm" /> Εφαρμογή Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}
        </Button>

        {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για borders + buttons */}
        {colorHookState.colorCategory === 'borders' && colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'square' && (
          <Button
            variant="success"
            size={buttonState.size}
            onClick={applySquareColorsToHeader}
            className={`layera-button layera-button--${buttonState.size} layera-button--success`}
          >
            <CheckIcon size="sm" /> Εφαρμογή στην Επικεφαλίδα
          </Button>
        )}
      </Box>
      <Text className="layera-typography layera-margin-top--sm" data-size="xs" data-color="secondary">
        {colorHookState.colorCategory === 'borders' && colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'square'
          ? 'Εφαρμόστε τα χρώματα των τετράγωνων πλήκτρων στην επικεφαλίδα'
          : `Θα επηρεαστούν όλα τα "${colorHookState.elementType}" με "${colorHookState.colorCategory}" στην εφαρμογή`
        }
      </Text>
    </Box>
  );
};