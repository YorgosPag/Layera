import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, MonitorIcon, BuildingIcon, ChartIcon } from '@layera/icons';
import { BorderWidthControl } from './shared/BorderWidthControl';
import { BorderRadiusControl } from './shared/BorderRadiusControl';
import { HoverControl } from './shared/HoverControl';
import { ActiveControl } from './shared/ActiveControl';
import { FontSizeControl, type FontSizeValue } from './shared/FontSizeControl';

/**
 * ColorCategorySelection Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Category and Shape Selection ενότητα
 * Γραμμές 170-253 από το αρχικό LivePlayground.tsx
 */

import type { UseColorStateReturn, ColorState, ColorStateActions } from '../../hooks/useColorState.js';

import type { ButtonState } from '../../hooks/useButtonState.js';

interface ColorCategorySelectionProps {
  colorHookState: ColorState;
  colorActions: ColorStateActions;
  borderWidth: number;
  onBorderWidthChange: (value: number) => void;
  borderRadius?: string;
  onBorderRadiusChange?: (value: string) => void;
  hoverEffect?: string;
  onHoverEffectChange?: (value: string) => void;
  activeEffect?: string;
  onActiveEffectChange?: (value: string) => void;
  fontSize?: FontSizeValue;
  onFontSizeChange?: (value: FontSizeValue) => void;
  onPreview?: (key: string, value: string) => void;
  buttonState?: ButtonState;
}

export const ColorCategorySelection: React.FC<ColorCategorySelectionProps> = ({
  colorHookState,
  colorActions,
  borderWidth,
  onBorderWidthChange,
  borderRadius = 'md',
  onBorderRadiusChange,
  hoverEffect = 'normal',
  onHoverEffectChange,
  activeEffect = 'scale',
  onActiveEffectChange,
  fontSize = 'base',
  onFontSizeChange,
  onPreview,
  buttonState
}) => {
  // Hot reload trigger
  // Debug removed to reduce console noise

  // Debug function removed to reduce console noise

  // Check if current element type supports hover effects
  const isInteractiveElement = ['buttons', 'cards', 'inputs'].includes(colorHookState.elementType);

  // Calculate grid columns based on what controls should show
  const getGridColumns = () => {
    let baseColumns = '1fr 1fr'; // Always show category + element type

    if (colorHookState.colorCategory === 'borders') {
      baseColumns += ' 1fr 1fr'; // Add border width + border radius
    }

    if (colorHookState.colorCategory === 'text') {
      baseColumns += ' 1fr'; // Add font size control
    }

    if (isInteractiveElement) {
      baseColumns += ' 1fr 1fr'; // Add hover control + active control
    }

    return baseColumns;
  };

  return (
    <Box className="layera-grid--auto-fit-280 layera-margin-bottom--xl">
      {/* Color Category Selection */}
      <Box className="layera-card layera-padding--lg layera-text--align-center">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Επιλογή Κατηγορίας Αντικειμένων
        </h3>
        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center">
          <Button
            variant={colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setColorCategory('backgrounds')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}`}
          >
            <LayersIcon size="sm" /> Backgrounds
          </Button>
          <Button
            variant={colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setColorCategory('text')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}`}
          >
            <EditIcon size="sm" /> Text
          </Button>
          <Button
            variant={colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setColorCategory('borders')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}`}
          >
            <PolygonIcon size="sm" /> Borders
          </Button>
        </Box>
        <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
          Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
        </Text>
      </Box>

      {/* Element Type Selection - For All Categories */}
      <Box className="layera-card layera-padding--lg layera-text--align-center">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <PolygonIcon size="sm" /> Τύπος Στοιχείων για {colorHookState.colorCategory === 'backgrounds' ? 'Φόντα' : colorHookState.colorCategory === 'text' ? 'Κείμενα' : 'Περιγράμματα'}
        </h3>
        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center">
          <Button
            variant={colorHookState.elementType === 'cards' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('cards')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'cards' ? 'primary' : 'outline'}`}
          >
            <LayersIcon size="sm" /> Κάρτες
          </Button>
          <Button
            variant={colorHookState.elementType === 'modals' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('modals')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'modals' ? 'primary' : 'outline'}`}
          >
            <MonitorIcon size="sm" /> Modals
          </Button>
          <Button
            variant={colorHookState.elementType === 'layout' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('layout')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'layout' ? 'primary' : 'outline'}`}
          >
            <BuildingIcon size="sm" /> Layout
          </Button>
          <Button
            variant={colorHookState.elementType === 'buttons' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('buttons')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'buttons' ? 'primary' : 'outline'}`}
          >
            <CheckIcon size="sm" /> Πλήκτρα
          </Button>
          <Button
            variant={colorHookState.elementType === 'inputs' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('inputs')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'inputs' ? 'primary' : 'outline'}`}
          >
            <EditIcon size="sm" /> Πεδία
          </Button>
          <Button
            variant={colorHookState.elementType === 'tables' ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => colorActions.setElementType('tables')}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${colorHookState.elementType === 'tables' ? 'primary' : 'outline'}`}
          >
            <ChartIcon size="sm" /> Πίνακες
          </Button>
        </Box>
        <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
          Επιλέξτε ποια στοιχεία θα επηρεάζονται από τα {colorHookState.colorCategory === 'backgrounds' ? 'background' : colorHookState.colorCategory === 'text' ? 'text' : 'border'} χρώματα
        </Text>
      </Box>

      {/* Border Width Control - ΜΟΝΟ για borders category */}
      {colorHookState.colorCategory === 'borders' && (
        <BorderWidthControl
          value={borderWidth}
          onChange={onBorderWidthChange}
          elementType={colorHookState.elementType}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Border Radius Control - ΜΟΝΟ για borders category */}
      {colorHookState.colorCategory === 'borders' && onBorderRadiusChange && (
        <BorderRadiusControl
          value={borderRadius}
          onChange={onBorderRadiusChange}
          elementType={colorHookState.elementType}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Font Size Control - ΜΟΝΟ για text κατηγορία */}
      {colorHookState.colorCategory === 'text' && onFontSizeChange && (
        <FontSizeControl
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}


      {/* Hover Control - ΜΟΝΟ για interactive elements */}
      {isInteractiveElement && onHoverEffectChange && (
        <HoverControl
          value={hoverEffect}
          onChange={onHoverEffectChange}
          elementType={colorHookState.elementType}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Active Control - ΜΟΝΟ για interactive elements */}
      {isInteractiveElement && onActiveEffectChange && (
        <ActiveControl
          value={activeEffect}
          onChange={onActiveEffectChange}
          elementType={colorHookState.elementType}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}
    </Box>
  );
};