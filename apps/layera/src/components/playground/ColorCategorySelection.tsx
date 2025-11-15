import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, MonitorIcon, BuildingIcon, ChartIcon } from '@layera/icons';

/**
 * ColorCategorySelection Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Category and Shape Selection ενότητα
 * Γραμμές 170-253 από το αρχικό LivePlayground.tsx
 */

import type { UseColorStateReturn, ColorState, ColorStateActions } from '../../hooks/useColorState.js';

interface ColorCategorySelectionProps {
  colorHookState: ColorState;
  colorActions: ColorStateActions;
}

export const ColorCategorySelection: React.FC<ColorCategorySelectionProps> = ({
  colorHookState,
  colorActions
}) => {
  // Hot reload trigger
  // Debug για να δούμε αν αλλάζει το state όταν αλλάζουμε χρώματα
  console.log('🎯 ColorCategorySelection State:', {
    colorCategory: colorHookState.colorCategory,
    elementType: colorHookState.elementType,
    backgroundsButtonVariant: colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline',
    textButtonVariant: colorHookState.colorCategory === 'text' ? 'primary' : 'outline',
    bordersButtonVariant: colorHookState.colorCategory === 'borders' ? 'primary' : 'outline',
    buttonsElementVariant: colorHookState.elementType === 'buttons' ? 'primary' : 'outline',
    cardsElementVariant: colorHookState.elementType === 'cards' ? 'primary' : 'outline'
  });

  // Expose debug function to window for console testing
  if (typeof window !== 'undefined') {
    (window as any).debugColorState = () => {
      console.group('🔍 Button State Debug');

      // Find all category buttons
      const categoryButtons = document.querySelectorAll('[data-testid^="category-"] button, .layera-button');
      console.log('📍 Found Category Buttons:', categoryButtons.length);

      categoryButtons.forEach((btn, index) => {
        const btnElement = btn as HTMLElement;
        const computedStyle = window.getComputedStyle(btnElement);
        const classList = Array.from(btnElement.classList);
        const text = btnElement.textContent?.trim();

        console.log(`Button ${index + 1}: "${text}"`, {
          classList,
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          border: computedStyle.border,
          variant: classList.find(c => c.includes('primary') || c.includes('outline')) || 'unknown'
        });
      });

      // State info
      console.log('🎯 Current State:', {
        colorCategory: colorHookState.colorCategory,
        elementType: colorHookState.elementType
      });

      console.groupEnd();
      return 'Debug completed - check above for button states';
    };
  }

  return (
    <Box
      className="layera-grid layera-margin-bottom--xl layera-grid--gap-lg"
      style={{
        gridTemplateColumns: '1fr 1fr'
      } as React.CSSProperties}
    >
      {/* Color Category Selection */}
      <Box className="layera-card layera-padding--lg">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Επιλογή Κατηγορίας Αντικειμένων
        </h3>
        <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
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

      {/* Element Type Selection - For All Categories */}
      <Box className="layera-card layera-padding--lg">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <PolygonIcon size="sm" /> Τύπος Στοιχείων για {colorHookState.colorCategory === 'backgrounds' ? 'Φόντα' : colorHookState.colorCategory === 'text' ? 'Κείμενα' : 'Περιγράμματα'}
        </h3>
        <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
          <Button
            variant={colorHookState.elementType === 'cards' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('cards')}
          >
            <LayersIcon size="sm" /> Κάρτες
          </Button>
          <Button
            variant={colorHookState.elementType === 'modals' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('modals')}
          >
            <MonitorIcon size="sm" /> Modals
          </Button>
          <Button
            variant={colorHookState.elementType === 'layout' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('layout')}
          >
            <BuildingIcon size="sm" /> Layout
          </Button>
          <Button
            variant={colorHookState.elementType === 'buttons' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('buttons')}
          >
            <CheckIcon size="sm" /> Πλήκτρα
          </Button>
          <Button
            variant={colorHookState.elementType === 'inputs' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('inputs')}
          >
            <EditIcon size="sm" /> Πεδία
          </Button>
          <Button
            variant={colorHookState.elementType === 'tables' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => colorActions.setElementType('tables')}
          >
            <ChartIcon size="sm" /> Πίνακες
          </Button>
        </Box>
        <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
          Επιλέξτε ποια στοιχεία θα επηρεάζονται από τα {colorHookState.colorCategory === 'backgrounds' ? 'background' : colorHookState.colorCategory === 'text' ? 'text' : 'border'} χρώματα
        </Text>
      </Box>
    </Box>
  );
};