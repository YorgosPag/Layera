import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, CloseIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, PaletteIcon } from '@layera/icons';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { PlaygroundRenderer } from './playground/PlaygroundRenderer';
import { PlaygroundControls } from './playground/PlaygroundControls';
import type { ColorWithAlpha } from './playground/shared/ColorPickerWithAlpha';
import type { ModalTextAlignValue } from './playground/shared/ModalTextAlignControl';
import type { BaseSize, ModalSizeValue, InputSizeValue } from '../types/sizes';
import { usePlaygroundHooks } from '../hooks/usePlaygroundHooks';
import { ColorPaletteWithAlpha, ColorCategory, ElementType } from '../hooks/useColorState';
// useColorHelpers functionality merged into other hooks

/**
 * Live Playground - Enterprise Component Testing Interface
 *
 * ARXES Compliant Live Testing Interface:
 * - Real-time component testing and configuration
 * - Enterprise CSS Variables management (single source of truth)
 * - Live color palette system with multiple button shapes
 * - Responsive fullscreen interface with organized sections
 * - Direct integration with header button styling
 *
 * @author Claude Code - Enterprise Development Assistant
 * @version 2.0.0 - Refactored for clean enterprise architecture
 */


import { LivePlaygroundProps } from '../types/unified-interfaces';

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ onClose }) => {

  // ==============================
  // CENTRALIZED HOOKS MANAGEMENT
  // ==============================

  const {
    // Authentication
    user,

    // Button Management
    buttonState,
    buttonActions,
    buttonSizes,

    // Color Management
    colorHookState,
    colorActions,
    getElementColors,

    // Playground State
    playgroundActions,
    borderWidth,
    fontSize,
    alphaEnabled,
    borderRadius,
    buttonRadius,
    layoutRadius,
    cardRadius,
    modalRadius,
    inputRadius,
    tableRadius,
    headerRadius,
    hoverEffect,
    activeEffect,
    cardSize,
    modalSize,
    inputSize,
    tableSize,
    modalTextAlign,

    // Actions
    convertColorPaletteWithAlphaToLegacy,
    applyColorsToApp,
    applySquareColorsToHeader,
    handleElementPreview,

    // Real-time Preview
    startPreview
  } = usePlaygroundHooks();

  return (
    <Box
      data-layera-playground="true"
      className="layera-playground-fullscreen"
      data-type="fullscreen"
    >
      <PlaygroundHeader
        onClose={onClose}
      />
          {/* Dynamic Content Based on Element Type Selection */}
          <PlaygroundRenderer
            elementType={colorHookState.elementType as string}
            colorCategory={colorHookState.colorCategory as ColorCategory}
            borderWidth={borderWidth}
            hoverEffect={hoverEffect}
            activeEffect={activeEffect}
            cardSize={cardSize as BaseSize}
            modalSize={modalSize as ModalSizeValue}
            modalTextAlign={modalTextAlign as ModalTextAlignValue}
            inputSize={inputSize as InputSizeValue}
            tableSize={tableSize as BaseSize}
            buttonRadius={buttonRadius}
            cardRadius={cardRadius}
            modalRadius={modalRadius}
            inputRadius={inputRadius}
            layoutRadius={layoutRadius}
            headerRadius={headerRadius}
            tableRadius={tableRadius}
            buttonState={buttonState}
            convertColorPaletteWithAlphaToLegacy={convertColorPaletteWithAlphaToLegacy}
            getElementColors={getElementColors}
          />

          {/* Playground Controls - Centralized controls management */}
          <PlaygroundControls
            colorHookState={colorHookState}
            buttonState={buttonState}
            colorActions={colorActions}
            playgroundActions={playgroundActions}
            buttonActions={buttonActions}
            buttonSizes={buttonSizes}
            borderWidth={borderWidth}
            borderRadius={borderRadius}
            buttonRadius={buttonRadius}
            layoutRadius={layoutRadius}
            cardRadius={cardRadius}
            modalRadius={modalRadius}
            inputRadius={inputRadius}
            tableRadius={tableRadius}
            headerRadius={headerRadius}
            hoverEffect={hoverEffect}
            activeEffect={activeEffect}
            fontSize={fontSize}
            cardSize={cardSize}
            modalSize={modalSize}
            modalTextAlign={modalTextAlign as ModalTextAlignValue}
            inputSize={inputSize}
            tableSize={tableSize}
            alphaEnabled={alphaEnabled}
            getElementColors={getElementColors as (elementType: ElementType, category: ColorCategory) => ColorPaletteWithAlpha}
            handleElementPreview={handleElementPreview as (key: string, value: string | ColorWithAlpha, elementType: ElementType, colorCategory: ColorCategory, startPreview: any) => void}
            startPreview={startPreview}
            applyColorsToApp={applyColorsToApp}
            applySquareColorsToHeader={applySquareColorsToHeader}
            user={user}
          />
    </Box>
  );
};

export default LivePlayground;
