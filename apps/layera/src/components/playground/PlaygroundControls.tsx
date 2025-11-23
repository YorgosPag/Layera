import React from 'react';
import { Box } from '@layera/layout';
import { CategorySelection } from './CategorySelection';
import { ButtonShapeControl } from './shared/ButtonShapeControl';
import { ButtonSizeControl } from './shared/ButtonSizeControl';
import { ButtonTextIconControl } from './shared/ButtonTextIconControl';
import { ColorControlsGridWithAlpha } from './ColorControlsGridWithAlpha';
import { ColorActionsPanel } from './ColorActionsPanel';
import { FactorySettingsPanel } from './FactorySettingsPanel';
import { SettingsDisplay } from './SettingsDisplay';
import type { ColorWithAlpha } from './shared/ColorPickerWithAlpha';
import type { ModalTextAlignValue } from './shared/ModalTextAlignControl';
import { ColorCategory, ColorPaletteWithAlpha, ElementType, ColorState, ColorStateActions } from '../../hooks/useColorState';
import type { ButtonState, ButtonStateActions } from '../../hooks/useButtonState';
import type { PlaygroundStateActions } from '../../hooks/usePlaygroundState';
import type { BaseSize } from '../../types/sizes';

/**
 * ARXES COMPLIANT Playground Controls Component
 *
 * Enterprise-grade component για centralized playground controls management:
 * - Category selection και element type controls
 * - Button-specific controls (shape, size, text/icon)
 * - Color controls grid με alpha support
 * - Color actions panel
 * - Factory settings και current settings display
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 * - React 19.1.1 compatibility
 */

export interface PlaygroundControlsProps {
  // State objects
  colorHookState: ColorState;
  buttonState: ButtonState;

  // Actions objects
  colorActions: ColorStateActions;
  playgroundActions: PlaygroundStateActions;
  buttonActions: ButtonStateActions;

  // Size options
  buttonSizes: readonly BaseSize[];

  // State values
  borderWidth: number;
  borderRadius: string;
  buttonRadius: string;
  layoutRadius: string;
  cardRadius: string;
  modalRadius: string;
  inputRadius: string;
  tableRadius: string;
  headerRadius: string;
  hoverEffect: string;
  activeEffect: string;
  fontSize: string;
  cardSize: BaseSize;
  modalSize: string;
  modalTextAlign: ModalTextAlignValue;
  inputSize: string;
  tableSize: BaseSize;
  alphaEnabled: boolean;

  // Functions
  getElementColors: (elementType: ElementType, category: ColorCategory) => ColorPaletteWithAlpha;
  handleElementPreview: (key: string, value: string | ColorWithAlpha, elementType: ElementType, colorCategory: ColorCategory, startPreview: (key: string, value: string) => void) => void;
  startPreview: (key: string, value: string) => void;
  applyColorsToApp: () => Promise<void>;
  applySquareColorsToHeader: () => void;

  // User
  user?: unknown;
}

/**
 * ARXES Compliant: Centralized playground controls renderer
 * Ολοκληρωμένο controls management για όλα τα playground sections
 */
export const PlaygroundControls: React.FC<PlaygroundControlsProps> = ({
  colorHookState,
  buttonState,
  colorActions,
  playgroundActions,
  buttonActions,
  buttonSizes,
  borderWidth,
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
  fontSize,
  cardSize,
  modalSize,
  modalTextAlign,
  inputSize,
  tableSize,
  alphaEnabled,
  getElementColors,
  handleElementPreview,
  startPreview,
  applyColorsToApp,
  applySquareColorsToHeader,
  user
}) => {

  // ✅ ENSURE INITIAL CONTEXT: Set initial data-layera-element-type on mount
  React.useEffect(() => {

    applyColorsToApp();
  }, [applyColorsToApp]);

  return (
    <>
      {/* Category and Element Type Selection */}
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
        elementType={colorHookState.elementType}
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

      {/* Factory Settings & Current Settings */}
      <Box className="layera-grid--auto-fit-280 layera-margin-bottom--xl">
        {/* Factory Settings */}
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

        {/* Current Settings Display */}
        <SettingsDisplay
          colorHookState={colorHookState}
          buttonState={buttonState}
        />
      </Box>
    </>
  );
};