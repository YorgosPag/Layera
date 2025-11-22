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
import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from '../hooks/useRealTimePreview';
import { useButtonState } from '../hooks/useButtonState';
import { useColorState, ColorPaletteWithAlpha, ColorCategory } from '../hooks/useColorState';
import { useCSSVariables } from '../hooks/useCSSVariables';
import { useStorage } from '../hooks/useStorage';
import { usePlaygroundState } from '../hooks/usePlaygroundState';
import { usePlaygroundActions } from '../hooks/usePlaygroundActions';
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

  // Authentication
  const { user } = useAuth();

  // ==============================
  // HOOK INTEGRATIONS
  // ==============================

  // Button State Management
  const { state: buttonState, actions: buttonActions, sizes: buttonSizes } = useButtonState();

  // Color State Management
  const { state: colorHookState, actions: colorActions, getCategoryPalette, getElementColors } = useColorState();

  // CSS Variables Management
  const { actions: cssActions } = useCSSVariables();

  // Storage Management
  const { actions: storageActions } = useStorage({ colorState: colorHookState, colorActions });

  // Playground State Management
  const {
    actions: playgroundActions,
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
    modalTextAlign
  } = usePlaygroundState();

  // Playground Actions Management
  const {
    getColorsForCategory,
    convertColorPaletteWithAlphaToLegacy,
    applyColorsToApp,
    applySquareColorsToHeader,
    handleElementPreview
  } = usePlaygroundActions({
    colorHookState,
    colorActions,
    cssActions,
    storageActions,
    getCategoryPalette,
    getElementColors,
    user
  });


  // Real-time preview hook for header buttons
  const { startPreview } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      // ✅ ΑΠΟΦΥΓΗ OVERRIDE: ΔΕΝ κάνουμε commit όταν είμαστε σε alpha preview mode
      // Διατηρούμε τις RGBA τιμές στα CSS variables χωρίς επαναφορά
      if (colorHookState?.elementType === 'buttons' && colorHookState?.colorCategory === 'backgrounds') {
        return; // ΔΕΝ καλούμε updateSquarePalette που επαναφέρει defaults
      }

      // Update the actual color state when preview is committed
      // ΜΟΝΟ για buttons category επηρεάζει τα header buttons (legacy behavior)
      if (key === 'buttonsSecondaryColor') {
        colorActions.updateSquarePalette('secondaryColor', value);
      }
    },
    debounceMs: 100
  });

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
            elementType={colorHookState.elementType}
            colorCategory={colorHookState.colorCategory}
            borderWidth={borderWidth}
            hoverEffect={hoverEffect}
            activeEffect={activeEffect}
            cardSize={cardSize}
            modalSize={modalSize}
            modalTextAlign={modalTextAlign}
            inputSize={inputSize}
            tableSize={tableSize}
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
            modalTextAlign={modalTextAlign}
            inputSize={inputSize}
            tableSize={tableSize}
            alphaEnabled={alphaEnabled}
            getElementColors={getElementColors}
            convertColorPaletteWithAlphaToLegacy={convertColorPaletteWithAlphaToLegacy}
            handleElementPreview={handleElementPreview}
            startPreview={startPreview}
            applyColorsToApp={applyColorsToApp}
            applySquareColorsToHeader={applySquareColorsToHeader}
            user={user}
          />
    </Box>
  );
};

export default LivePlayground;
