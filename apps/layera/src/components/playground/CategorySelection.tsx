import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { UnifiedCard } from '@layera/cards';
import { PaletteIcon, LayersIcon, EditIcon, PolygonIcon, CompassIcon, CheckIcon, MonitorIcon, BuildingIcon, ChartIcon } from '@layera/icons';
import { BorderWidthControl } from './shared/BorderWidthControl';
import { BorderRadiusControl } from './shared/BorderRadiusControl';
import { HoverControl } from './shared/HoverControl';
import { ActiveControl } from './shared/ActiveControl';
import { FontSizeControl } from './shared/FontSizeControl';
import { CardSizeControl } from './shared/CardSizeControl';
import { ModalSizeControl } from './shared/ModalSizeControl';
import { InputSizeControl } from './shared/InputSizeControl';
import { TableSizeControl } from './shared/TableSizeControl';
import type { FontSizeValue, CardSizeValue, ModalSizeValue, InputSizeValue, TableSizeValue } from '../../types/sizes';
import { ButtonRadiusControl } from './shared/ButtonRadiusControl';
import { LayoutRadiusControl } from './shared/LayoutRadiusControl';
import { CardRadiusControl } from './shared/CardRadiusControl';
import { ModalRadiusControl } from './shared/ModalRadiusControl';
import { InputRadiusControl } from './shared/InputRadiusControl';
import { TableRadiusControl } from './shared/TableRadiusControl';
import { HeaderRadiusControl } from './shared/HeaderRadiusControl';

/**
 * CategorySelection Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Category and Shape Selection ενότητα
 * Γραμμές 170-253 από το αρχικό LivePlayground.tsx
 */

import type { UseColorStateReturn, ColorState, ColorStateActions } from '../../hooks/useColorState.js';
import { CategoryProps } from '../../types/unified-interfaces';

import type { ButtonState } from '../../hooks/useButtonState.js';

interface ExtendedCategorySelectionProps {
  colorHookState: ColorState;
  colorActions: ColorStateActions;
  borderWidth: number;
  onBorderWidthChange: (value: number) => void;
  borderRadius?: string;
  onBorderRadiusChange?: (value: string) => void;
  buttonRadius?: string;
  onButtonRadiusChange?: (value: string) => void;
  layoutRadius?: string;
  onLayoutRadiusChange?: (value: string) => void;
  cardRadius?: string;
  onCardRadiusChange?: (value: string) => void;
  modalRadius?: string;
  onModalRadiusChange?: (value: string) => void;
  inputRadius?: string;
  onInputRadiusChange?: (value: string) => void;
  tableRadius?: string;
  onTableRadiusChange?: (value: string) => void;
  headerRadius?: string;
  onHeaderRadiusChange?: (value: string) => void;
  hoverEffect?: string;
  onHoverEffectChange?: (value: string) => void;
  activeEffect?: string;
  onActiveEffectChange?: (value: string) => void;
  fontSize?: FontSizeValue;
  onFontSizeChange?: (value: FontSizeValue) => void;
  cardSize?: CardSizeValue;
  onCardSizeChange?: (value: CardSizeValue) => void;
  modalSize?: ModalSizeValue;
  onModalSizeChange?: (value: ModalSizeValue) => void;
  inputSize?: InputSizeValue;
  onInputSizeChange?: (value: InputSizeValue) => void;
  tableSize?: TableSizeValue;
  onTableSizeChange?: (value: TableSizeValue) => void;
  onPreview?: (key: string, value: string) => void;
  buttonState?: ButtonState;
}

export const CategorySelection: React.FC<ExtendedCategorySelectionProps> = ({
  colorHookState,
  colorActions,
  borderWidth,
  onBorderWidthChange,
  borderRadius: _borderRadius = 'md',
  onBorderRadiusChange: _onBorderRadiusChange,
  buttonRadius = 'md',
  onButtonRadiusChange,
  layoutRadius = 'md',
  onLayoutRadiusChange,
  cardRadius = 'md',
  onCardRadiusChange,
  modalRadius = 'md',
  onModalRadiusChange,
  inputRadius = 'md',
  onInputRadiusChange,
  tableRadius = 'md',
  onTableRadiusChange,
  headerRadius = 'lg',
  onHeaderRadiusChange,
  hoverEffect = 'normal',
  onHoverEffectChange,
  activeEffect = 'scale',
  onActiveEffectChange,
  fontSize = 'base',
  onFontSizeChange,
  cardSize = 'md',
  onCardSizeChange,
  modalSize = 'md',
  onModalSizeChange,
  inputSize = 'md',
  onInputSizeChange,
  tableSize = 'md',
  onTableSizeChange,
  onPreview,
  buttonState
}) => {
  // Hot reload trigger
  // Debug removed to reduce console noise

  // Debug function removed to reduce console noise

  // Check if current element type supports hover effects
  const isInteractiveElement = ['buttons', 'cards', 'inputs', 'modals', 'tables', 'layout'].includes(colorHookState.elementType);

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
      {/* #1: Επιλογή Κατηγορίας Αντικειμένων (Card 1) */}
      <UnifiedCard
        config={{
          id: 'color-category-selection',
          type: 'selection',
          title: '🔴🔴🔴 ΕΔΏ ΕΙΝΑΙ Η ΚΑΡΤΑ - Επιλογή Κατηγορίας Αντικειμένων 🔴🔴🔴',
          description: '⚠️ DEBUG MODE: Αν βλέπεις αυτό το μήνυμα, η κάρτα λειτουργεί! ⚠️',
          icon: <CheckIcon size="sm" />,
          variant: 'warning',
          content: (
            <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center">
              <Button
                variant={colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setColorCategory('backgrounds')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}`}
              >
                <LayersIcon size="sm" /> Backgrounds
              </Button>
              <Button
                variant={colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setColorCategory('text')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}`}
              >
                <EditIcon size="sm" /> Text
              </Button>
              <Button
                variant={colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setColorCategory('borders')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}`}
              >
                <PolygonIcon size="sm" /> Borders
              </Button>
            </Box>
          )
        }}
      />

      {/* #2: Τύπος Στοιχείου για Περιγράμματα (Card 2) */}
      <UnifiedCard
        config={{
          id: 'element-type-selection',
          type: 'selection',
          title: `Τύπος Στοιχείων για ${colorHookState.colorCategory === 'backgrounds' ? 'Φόντα' : colorHookState.colorCategory === 'text' ? 'Κείμενα' : 'Περιγράμματα'}`,
          description: `Επιλέξτε ποια στοιχεία θα επηρεάζονται από τα ${colorHookState.colorCategory === 'backgrounds' ? 'background' : colorHookState.colorCategory === 'text' ? 'text' : 'border'} χρώματα`,
          icon: <PolygonIcon size="sm" />,
          variant: 'outlined',
          content: (
            <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center">
              <Button
                variant={colorHookState.elementType === 'cards' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('cards')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'cards' ? 'primary' : 'outline'}`}
              >
                <LayersIcon size="sm" /> Κάρτες
              </Button>
              <Button
                variant={colorHookState.elementType === 'modals' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('modals')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'modals' ? 'primary' : 'outline'}`}
              >
                <MonitorIcon size="sm" /> Modals
              </Button>
              <Button
                variant={colorHookState.elementType === 'layout' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('layout')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'layout' ? 'primary' : 'outline'}`}
              >
                <BuildingIcon size="sm" /> Layout
              </Button>
              <Button
                variant={colorHookState.elementType === 'headers' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('headers')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'headers' ? 'primary' : 'outline'}`}
              >
                <CompassIcon size="sm" /> Headers
              </Button>
              <Button
                variant={colorHookState.elementType === 'buttons' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('buttons')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'buttons' ? 'primary' : 'outline'}`}
              >
                <CheckIcon size="sm" /> Πλήκτρα
              </Button>
              <Button
                variant={colorHookState.elementType === 'inputs' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('inputs')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'inputs' ? 'primary' : 'outline'}`}
              >
                <EditIcon size="sm" /> Πεδία
              </Button>
              <Button
                variant={colorHookState.elementType === 'tables' ? 'primary' : 'outline'}
                size={buttonState?.size || 'sm'}
                onClick={() => colorActions.setElementType('tables')}
                className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${colorHookState.elementType === 'tables' ? 'primary' : 'outline'}`}
              >
                <ChartIcon size="sm" /> Πίνακες
              </Button>
            </Box>
          )
        }}
      />

      {/* Button Radius Control - ΜΟΝΟ για backgrounds category με buttons element ΚΑΙ όταν το shape ΔΕΝ είναι rounded */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'buttons' && onButtonRadiusChange && buttonState?.shape !== 'rounded' && (
        <ButtonRadiusControl
          value={buttonRadius}
          onChange={onButtonRadiusChange}
          elementType="πλήκτρα"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Border Width Control - ΜΟΝΟ για borders category */}
      {colorHookState.colorCategory === 'borders' && (
        <UnifiedCard
          config={{
            id: 'border-width-control',
            type: 'data',
            title: 'Πάχος Περιγραμμάτων',
            description: `Ρυθμίστε το πάχος των περιγραμμάτων για ${colorHookState.elementType}`,
            icon: <PolygonIcon size="sm" />,
            variant: 'info',
            content: (
              <BorderWidthControl
                value={borderWidth}
                onChange={onBorderWidthChange}
                elementType={colorHookState.elementType}
                className="layera-height--auto layera-text--align-center"
                onPreview={onPreview}
                buttonState={buttonState}
              />
            )
          }}
        />
      )}

      {/* ΑΦΑΙΡΕΘΗΚΕ: Border Radius Control από borders category - Γιώργος 17/11/2025 */}
      {/* Η καμπυλότητα ορίζεται πλέον ΜΟΝΟ από τις ειδικές ρυθμίσεις κάθε element type */}
      {/* {colorHookState.colorCategory === 'borders' && onBorderRadiusChange && (
        <BorderRadiusControl
          value={borderRadius}
          onChange={onBorderRadiusChange}
          elementType={colorHookState.elementType}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )} */}

      {/* Font Size Control - ΜΟΝΟ για text κατηγορία */}
      {colorHookState.colorCategory === 'text' && onFontSizeChange && (
        <UnifiedCard
          config={{
            id: 'font-size-control',
            type: 'data',
            title: 'Μέγεθος Γραμματοσειράς',
            description: 'Ρυθμίστε το μέγεθος της γραμματοσειράς για κείμενα',
            icon: <EditIcon size="sm" />,
            variant: 'filled',
            content: (
              <FontSizeControl
                fontSize={fontSize}
                onFontSizeChange={onFontSizeChange}
                className="layera-height--auto layera-text--align-center"
                onPreview={onPreview}
                buttonState={buttonState}
              />
            )
          }}
        />
      )}

      {/* Layout Radius Control - ΜΟΝΟ για backgrounds category με layout element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'layout' && onLayoutRadiusChange && (
        <LayoutRadiusControl
          value={layoutRadius}
          onChange={onLayoutRadiusChange}
          elementType="layout στοιχεία"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Card Radius Control - ΜΟΝΟ για backgrounds category με cards element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'cards' && onCardRadiusChange && (
        <CardRadiusControl
          value={cardRadius}
          onChange={onCardRadiusChange}
          elementType="κάρτες"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Card Size Control - ΜΟΝΟ για οποιαδήποτε category με cards element */}
      {colorHookState.elementType === 'cards' && onCardSizeChange && (
        <CardSizeControl
          cardSize={cardSize}
          onCardSizeChange={onCardSizeChange}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Modal Radius Control - ΜΟΝΟ για backgrounds category με modals element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'modals' && onModalRadiusChange && (
        <ModalRadiusControl
          value={modalRadius}
          onChange={onModalRadiusChange}
          elementType="modals"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Modal Size Control - ΜΟΝΟ για οποιαδήποτε category με modals element */}
      {colorHookState.elementType === 'modals' && onModalSizeChange && (
        <ModalSizeControl
          modalSize={modalSize}
          onModalSizeChange={onModalSizeChange}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Input Radius Control - ΜΟΝΟ για backgrounds category με inputs element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'inputs' && onInputRadiusChange && (
        <InputRadiusControl
          value={inputRadius}
          onChange={onInputRadiusChange}
          elementType="πεδία εισαγωγής"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Input Size Control - ΜΟΝΟ για οποιαδήποτε category με inputs element */}
      {colorHookState.elementType === 'inputs' && onInputSizeChange && (
        <InputSizeControl
          inputSize={inputSize}
          onInputSizeChange={onInputSizeChange}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Table Radius Control - ΜΟΝΟ για backgrounds category με tables element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'tables' && onTableRadiusChange && (
        <TableRadiusControl
          value={tableRadius}
          onChange={onTableRadiusChange}
          elementType="πίνακες"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Table Size Control - ΜΟΝΟ για οποιαδήποτε category με tables element */}
      {colorHookState.elementType === 'tables' && onTableSizeChange && (
        <TableSizeControl
          tableSize={tableSize}
          onTableSizeChange={onTableSizeChange}
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}

      {/* Header Radius Control - ΜΟΝΟ για backgrounds category με headers element */}
      {colorHookState.colorCategory === 'backgrounds' && colorHookState.elementType === 'headers' && onHeaderRadiusChange && (
        <HeaderRadiusControl
          value={headerRadius}
          onChange={onHeaderRadiusChange}
          elementType="headers"
          className="layera-height--auto layera-text--align-center"
          onPreview={onPreview}
          buttonState={buttonState}
        />
      )}


      {/* #3: Hover Effects (Card 3) - ΜΟΝΟ για interactive elements */}
      {isInteractiveElement && onHoverEffectChange && (
        <UnifiedCard
          config={{
            id: 'hover-effects-control',
            type: 'data',
            title: 'Hover Effects',
            description: `Ρυθμίστε τα hover effects για ${colorHookState.elementType}`,
            icon: <CompassIcon size="sm" />,
            variant: 'success',
            content: (
              <HoverControl
                value={hoverEffect}
                onChange={onHoverEffectChange}
                elementType={colorHookState.elementType}
                className="layera-height--auto layera-text--align-center"
                onPreview={onPreview}
                buttonState={buttonState}
              />
            )
          }}
        />
      )}

      {/* #4: Active Effects (Card 4) - ΜΟΝΟ για interactive elements */}
      {isInteractiveElement && onActiveEffectChange && (
        <UnifiedCard
          config={{
            id: 'active-effects-control',
            type: 'data',
            title: 'Active Effects',
            description: `Ρυθμίστε τα active effects για ${colorHookState.elementType}`,
            icon: <CheckIcon size="sm" />,
            variant: 'warning',
            content: (
              <ActiveControl
                value={activeEffect}
                onChange={onActiveEffectChange}
                elementType={colorHookState.elementType}
                className="layera-height--auto layera-text--align-center"
                onPreview={onPreview}
                buttonState={buttonState}
              />
            )
          }}
        />
      )}
    </Box>
  );
};