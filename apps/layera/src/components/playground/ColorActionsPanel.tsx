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

interface ExtendedColorActionsPanelProps extends ColorActionsProps {
  colorHookState: ColorState;
  buttonState: ButtonState;
  applyColorsToApp: () => void;
  applySquareColorsToHeader: () => void;
}

export const ColorActionsPanel: React.FC<ExtendedColorActionsPanelProps> = ({
  colorHookState,
  buttonState,
  applyColorsToApp,
  applySquareColorsToHeader
}) => {
  return (
    <Box className="layera-text-center layera-margin-top--2xl layera-margin-bottom--xl">
      <Box className="layera-flex layera-flex--justify-center layera-flex--wrap-wrap layera-flex--gap-md layera-align-items--center">
        <Button
          variant="primary"
          size={buttonState.size}
          onClick={applyColorsToApp}
          className={`layera-btn layera-btn--${buttonState.size} layera-btn--primary`}
        >
          <RocketIcon size="sm" /> Εφαρμογή Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}
        </Button>

        {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για borders + buttons */}
        {colorHookState.colorCategory === 'borders' && colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'square' && (
          <Button
            variant="success"
            size={buttonState.size}
            onClick={applySquareColorsToHeader}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--success`}
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