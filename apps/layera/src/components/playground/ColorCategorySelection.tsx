import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon } from '@layera/icons';

/**
 * ColorCategorySelection Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Category and Shape Selection ενότητα
 * Γραμμές 170-253 από το αρχικό LivePlayground.tsx
 */

import type { UseColorStateReturn } from '../../hooks/useColorState.js';

interface ColorCategorySelectionProps {
  colorHookState: UseColorStateReturn;
  colorActions: UseColorStateReturn;
}

export const ColorCategorySelection: React.FC<ColorCategorySelectionProps> = ({
  colorHookState,
  colorActions
}) => {
  return (
    <Box
      className={`layera-grid layera-margin-bottom--xl ${colorHookState.colorCategory === 'buttons' ? 'layera-grid--gap-lg' : ''}`}
      style={{
        gridTemplateColumns: colorHookState.colorCategory === 'buttons' ? '1fr 1fr' : '1fr'
      } as React.CSSProperties}
    >
      {/* Color Category Selection */}
      <Box className="layera-card layera-padding--lg">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Επιλογή Κατηγορίας Αντικειμένων
        </h3>
        <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
          <Button
            variant={colorHookState.colorCategory === 'buttons' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setColorCategory('buttons')}
          >
            <PaletteIcon size="sm" /> Buttons
          </Button>
          <Button
            variant={colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setColorCategory('backgrounds')}
          >
            <LayersIcon size="sm" /> Backgrounds
          </Button>
          <Button
            variant={colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setColorCategory('text')}
          >
            <EditIcon size="sm" /> Text
          </Button>
          <Button
            variant={colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setColorCategory('borders')}
          >
            <PolygonIcon size="sm" /> Borders
          </Button>
        </Box>
        <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
          Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
        </Text>
      </Box>

      {/* Button Shape Selection - Only for Buttons Category */}
      {colorHookState.colorCategory === 'buttons' && (
        <Box className="layera-card layera-padding--lg">
          <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
            <PaletteIcon size="sm" /> Σχήμα Πλήκτρων Preview
          </h3>
          <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
            <Button
              variant={colorHookState.colorButtonShape === 'rectangular' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => colorActions.setColorButtonShape('rectangular')}
            >
              <RulerIcon size="sm" /> Παραλληλόγραμμα
            </Button>
            <Button
              variant={colorHookState.colorButtonShape === 'square' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                colorActions.setColorButtonShape('square');
              }}
            >
              <PolygonIcon size="sm" /> Τετράγωνα
            </Button>
            <Button
              variant={colorHookState.colorButtonShape === 'rounded' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => colorActions.setColorButtonShape('rounded')}
            >
              <CompassIcon size="sm" /> Στρογγυλά
            </Button>
          </Box>
          <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
            Επιλέξτε το σχήμα των πλήκτρων στην προεπισκόπηση χρωμάτων
          </Text>
        </Box>
      )}
    </Box>
  );
};