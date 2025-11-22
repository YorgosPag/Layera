import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, CloseIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, PaletteIcon } from '@layera/icons';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { PlaygroundRenderer } from './playground/PlaygroundRenderer';
import { CategorySelection } from './playground/CategorySelection';
import { ColorControlsGridWithAlpha } from './playground/ColorControlsGridWithAlpha';
import { ColorActionsPanel } from './playground/ColorActionsPanel';
import { SettingsDisplay } from './playground/SettingsDisplay';
import { FactorySettingsPanel } from './playground/FactorySettingsPanel';
import { ButtonShapeControl } from './playground/shared/ButtonShapeControl';
import { ButtonSizeControl } from './playground/shared/ButtonSizeControl';
import { ButtonTextIconControl } from './playground/shared/ButtonTextIconControl';
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

          {/* Always show color management sections */}
          {/* Category and Element Type Selection - Πάνω από Button Controls */}
          <Box className="layera-margin-bottom--xl">
            <CategorySelection
              colorHookState={colorHookState}
              colorActions={colorActions}
              borderWidth={borderWidth}
              onBorderWidthChange={playgroundActions.setBorderWidth}
              borderRadius={borderRadius}
              onBorderRadiusChange={playgroundActions.setBorderRadius}
              buttonRadius={buttonRadius}
              onButtonRadiusChange={playgroundActions.setButtonRadius}
              layoutRadius={layoutRadius}
              onLayoutRadiusChange={playgroundActions.setLayoutRadius}
              cardRadius={cardRadius}
              onCardRadiusChange={playgroundActions.setCardRadius}
              modalRadius={modalRadius}
              onModalRadiusChange={playgroundActions.setModalRadius}
              inputRadius={inputRadius}
              onInputRadiusChange={playgroundActions.setInputRadius}
              tableRadius={tableRadius}
              onTableRadiusChange={playgroundActions.setTableRadius}
              headerRadius={headerRadius}
              onHeaderRadiusChange={playgroundActions.setHeaderRadius}
              hoverEffect={hoverEffect}
              onHoverEffectChange={playgroundActions.setHoverEffect}
              activeEffect={activeEffect}
              onActiveEffectChange={playgroundActions.setActiveEffect}
              fontSize={fontSize}
              onFontSizeChange={playgroundActions.setFontSize}
              cardSize={cardSize}
              onCardSizeChange={playgroundActions.setCardSize}
              modalSize={modalSize}
              onModalSizeChange={playgroundActions.setModalSize}
              modalTextAlign={modalTextAlign}
              onModalTextAlignChange={playgroundActions.setModalTextAlign}
              inputSize={inputSize}
              onInputSizeChange={playgroundActions.setInputSize}
              tableSize={tableSize}
              onTableSizeChange={playgroundActions.setTableSize}
              onPreview={startPreview}
              buttonState={buttonState}
            />
          </Box>

          {/* Button Controls Grid - ΜΟΝΟ για buttons elementType */}
          {colorHookState.elementType === 'buttons' && (
            <Box className="layera-margin-bottom--xl">
              <Box
                className="layera-grid layera-grid--gap-lg layera-margin-top--lg layera-margin-bottom--xl layera-grid--auto-fit-280 layera-padding--lg"
              >
                {/* Button Shape Control */}
                <ButtonShapeControl
                  buttonState={buttonState}
                  buttonActions={buttonActions}
                />

                {/* Button Size Control */}
                <ButtonSizeControl
                  buttonState={buttonState}
                  buttonActions={buttonActions}
                  buttonSizes={buttonSizes}
                />

                {/* Button Text & Icon Control */}
                <ButtonTextIconControl
                  buttonState={buttonState}
                  buttonActions={buttonActions}
                />
              </Box>
            </Box>
          )}

          {/* Color Controls Grid με Alpha Support */}
          <ColorControlsGridWithAlpha
            currentColors={getElementColors(colorHookState.elementType, colorHookState.colorCategory)}
            currentSetters={{
              primaryColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'primaryColor', value),
              secondaryColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'secondaryColor', value),
              successColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'successColor', value),
              warningColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'warningColor', value),
              dangerColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'dangerColor', value),
              infoColor: (value: string) => colorActions.updateElementTypePalette(colorHookState.elementType, colorHookState.colorCategory, 'infoColor', value)
            }}
            startPreview={(key: string, value: string | ColorWithAlpha) => {
              handleElementPreview(key, value, colorHookState.elementType, colorHookState.colorCategory, startPreview);
            }}
            colorCategory={colorHookState.colorCategory}
            alphaEnabled={alphaEnabled}
            onAlphaToggle={playgroundActions.setAlphaEnabled}
            buttonState={buttonState}
          />

          {/* Apply Colors Buttons */}
          <Box className="layera-margin-bottom--xl">
            <ColorActionsPanel
              colorHookState={colorHookState}
              buttonState={buttonState}
              applyColorsToApp={applyColorsToApp}
              applySquareColorsToHeader={applySquareColorsToHeader}
            />
          </Box>

          {/* #9 & #10: Εργοστασιακές Ρυθμίσεις & Τρέχουσες Ρυθμίσεις (Cards 9 & 10) */}
          <Box className="layera-grid--auto-fit-280 layera-margin-bottom--xl">
            {/* #9: Εργοστασιακές Ρυθμίσεις (Factory Settings) */}
            <FactorySettingsPanel
                buttonState={buttonState}
                onSettingsChange={(settings) => {
                  // Εφαρμόζει τις νέες ρυθμίσεις στο color state
                  // Φιλτράρει το outlineColor που δεν πρέπει να εμφανίζεται ως color picker
                  Object.entries(settings).forEach(([key, value]) => {
                    if (typeof key === 'string' && typeof value === 'string' && key !== 'outlineColor') {
                      const validColorKeys = ['primaryColor', 'secondaryColor', 'successColor', 'warningColor', 'dangerColor', 'infoColor'];
                      if (validColorKeys.includes(key)) {
                        colorActions.updateCategoryPalette(colorHookState.colorCategory, key as keyof ColorPaletteWithAlpha, value);
                      }
                    }
                  });
                }}
                onPreview={startPreview}
                currentUserId={user?.uid}
              />

            {/* #10: Τρέχουσες Ρυθμίσεις (Color Value Display) */}
            <SettingsDisplay
              colorHookState={colorHookState}
              currentColors={convertColorPaletteWithAlphaToLegacy(getElementColors(colorHookState.elementType, colorHookState.colorCategory))}
              buttonState={buttonState}
            />
          </Box>
    </Box>
  );
};

export default LivePlayground;
