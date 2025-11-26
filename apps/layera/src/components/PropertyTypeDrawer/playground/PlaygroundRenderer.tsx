import React from 'react';
import { Box } from '@layera/layout';
import { ButtonsPlayground } from './ButtonsPlayground';
import { CardsPlayground } from './CardsPlayground';
import { ModalsPlayground } from './ModalsPlayground';
import { InputsPlayground } from './InputsPlayground';
import { LayoutPlayground } from './LayoutPlayground';
import { TablesPlayground } from './TablesPlayground';
import { HeaderPlayground } from './HeaderPlayground';
import type { FontSizeValue, CardSizeValue, ModalSizeValue, InputSizeValue, TableSizeValue } from '../../types/sizes';
import type { ModalTextAlignValue } from './shared/ModalTextAlignControl';
import { ColorCategory, ElementType, ColorPaletteWithAlpha } from '../../hooks/useColorState';
import type { ButtonState } from '../../hooks/useButtonState';

/**
 * ARXES COMPLIANT Playground Renderer Component
 *
 * Enterprise-grade component για rendering playground content based on element type:
 * - Centralized conditional rendering logic
 * - Clean separation από main LivePlayground component
 * - Type-safe element type switching
 * - Consistent prop passing σε όλα τα playground components
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 * - React 19.1.1 compatibility
 */

export interface PlaygroundRendererProps {
  // Element type selection
  elementType: string;
  colorCategory: ColorCategory;

  // Common playground props
  borderWidth: number;
  hoverEffect: string;
  activeEffect: string;

  // Size configs
  cardSize: CardSizeValue;
  modalSize: ModalSizeValue;
  modalTextAlign: ModalTextAlignValue;
  inputSize: InputSizeValue;
  tableSize: TableSizeValue;

  // Radius configs
  buttonRadius: string;
  cardRadius: string;
  modalRadius: string;
  inputRadius: string;
  layoutRadius: string;
  headerRadius: string;
  tableRadius: string;

  // Button state
  buttonState: ButtonState;

  // Functions
  convertColorPaletteWithAlphaToLegacy: (palette: ColorPaletteWithAlpha) => Record<string, string>;
  getElementColors: (elementType: ElementType, category: ColorCategory) => ColorPaletteWithAlpha;
}

/**
 * ARXES Compliant: Centralized playground content renderer
 * Ολοκληρωμένο rendering logic για όλα τα element types
 */
export const PlaygroundRenderer: React.FC<PlaygroundRendererProps> = ({
  elementType,
  colorCategory,
  borderWidth,
  hoverEffect,
  activeEffect,
  cardSize,
  modalSize,
  modalTextAlign,
  inputSize,
  tableSize,
  buttonRadius,
  cardRadius,
  modalRadius,
  inputRadius,
  layoutRadius,
  headerRadius,
  tableRadius,
  buttonState,
  convertColorPaletteWithAlphaToLegacy,
  getElementColors
}) => {

  /**
   * ARXES Compliant: Buttons element type rendering
   */
  if (elementType === 'buttons') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <ButtonsPlayground
          buttonState={buttonState}
          colorCategory={colorCategory}
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('buttons', colorCategory))}
          borderWidth={borderWidth}
          buttonRadius={buttonRadius}
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Cards element type rendering
   */
  if (elementType === 'cards') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <CardsPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('cards', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          cardRadius={cardRadius}
          cardSize={cardSize}
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Modals element type rendering
   */
  if (elementType === 'modals') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <ModalsPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('modals', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          modalRadius={modalRadius}
          modalSize={modalSize}
          modalTextAlign={modalTextAlign}
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Inputs element type rendering
   */
  if (elementType === 'inputs') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <InputsPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('inputs', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          inputRadius={inputRadius}
          inputSize={inputSize}
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Layout element type rendering
   */
  if (elementType === 'layout') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <LayoutPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('layout', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          layoutRadius={layoutRadius}
          layoutSize="md"
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Headers element type rendering
   */
  if (elementType === 'headers') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column">
        <HeaderPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('headers', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          headerRadius={headerRadius}
          headerSize="md"
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  /**
   * ARXES Compliant: Tables element type rendering
   */
  if (elementType === 'tables') {
    return (
      <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
        <TablesPlayground
          currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors('tables', colorCategory))}
          colorCategory={colorCategory}
          borderWidth={borderWidth}
          tableRadius={tableRadius}
          tableSize={tableSize}
          hoverEffect={hoverEffect}
          activeEffect={activeEffect}
        />
      </Box>
    );
  }

  // Fallback: No element type selected
  return null;
};