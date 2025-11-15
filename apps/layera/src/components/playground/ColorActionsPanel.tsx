import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { RocketIcon, CheckIcon } from '@layera/icons';

/**
 * ColorActionsPanel Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Apply Colors Buttons ενότητα
 * Γραμμές 191-221 από το αρχικό LivePlayground.tsx
 */

import type { ColorState } from '../../hooks/useColorState.js';

interface ColorActionsPanelProps {
  colorHookState: ColorState;
  applyColorsToApp: () => void;
  applySquareColorsToHeader: () => void;
}

export const ColorActionsPanel: React.FC<ColorActionsPanelProps> = ({
  colorHookState,
  applyColorsToApp,
  applySquareColorsToHeader
}) => {
  return (
    <Box className="layera-text-center layera-margin-bottom--xl">
      <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-md">
        <Button
          variant="primary"
          size="lg"
          onClick={applyColorsToApp}
          className="layera-button layera-button--primary"
        >
          <RocketIcon size="sm" /> Εφαρμογή Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}
        </Button>

        {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για borders + buttons */}
        {colorHookState.colorCategory === 'borders' && colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'square' && (
          <Button
            variant="success"
            size="lg"
            onClick={applySquareColorsToHeader}
            className="layera-button layera-button--success"
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