import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, CloseIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, PaletteIcon } from '@layera/icons';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { ButtonsPlayground } from './playground/ButtonsPlayground';
import { CardsPlayground } from './playground/CardsPlayground';
import { ModalsPlayground } from './playground/ModalsPlayground';
import { InputsPlayground } from './playground/InputsPlayground';
import { LayoutPlayground } from './playground/LayoutPlayground';
import { TablesPlayground } from './playground/TablesPlayground';
import { HeaderPlayground } from './playground/HeaderPlayground';
import { CategorySelection } from './playground/CategorySelection';
import { ColorControlsGridWithAlpha } from './playground/ColorControlsGridWithAlpha';
import { ColorActionsPanel } from './playground/ColorActionsPanel';
import { SettingsDisplay } from './playground/SettingsDisplay';
import { FactorySettingsPanel } from './playground/FactorySettingsPanel';
import { ButtonShapeControl } from './playground/shared/ButtonShapeControl';
import { ButtonSizeControl } from './playground/shared/ButtonSizeControl';
import { ButtonTextIconControl } from './playground/shared/ButtonTextIconControl';
import type { ColorWithAlpha } from './playground/shared/ColorPickerWithAlpha';
import type { FontSizeValue, CardSizeValue, ModalSizeValue, InputSizeValue, TableSizeValue, UnifiedSizeConfig } from '../types/sizes';
import type { ModalTextAlignValue } from './playground/shared/ModalTextAlignControl';
import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from '../hooks/useRealTimePreview';
import { useButtonState } from '../hooks/useButtonState';
import { useColorState, ColorPaletteWithAlpha, ColorCategory } from '../hooks/useColorState';
import { useCSSVariables } from '../hooks/useCSSVariables';
import { useStorage } from '../hooks/useStorage';
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
  const { state: colorHookState, actions: colorActions, getCategoryPalette } = useColorState();

  // CSS Variables Management
  const { actions: cssActions } = useCSSVariables();

  // Storage Management
  const { actions: storageActions } = useStorage({ colorState: colorHookState, colorActions });


  // Color helper functions - simplified to use existing hooks
  const getColorsForCategory = (category: string) => {
    return getCategoryPalette(category as ColorCategory);
  };

  // ==============================
  // STATE MANAGEMENT
  // ==============================

  // ✅ UNIFIED STYLING CONFIG - multiple states → 1 object (ARXES compliant)
  const [stylingConfig, setStylingConfig] = useState({
    borderWidth: 2,
    fontSize: 'base' as FontSizeValue,
    alphaEnabled: true
  });

  // Helper functions για backward compatibility
  const borderWidth = stylingConfig.borderWidth;
  const fontSize = stylingConfig.fontSize;
  const alphaEnabled = stylingConfig.alphaEnabled;

  const setBorderWidth = (value: number) => setStylingConfig(prev => ({ ...prev, borderWidth: value }));
  const setFontSize = (value: FontSizeValue) => setStylingConfig(prev => ({ ...prev, fontSize: value }));
  const setAlphaEnabled = (value: boolean) => setStylingConfig(prev => ({ ...prev, alphaEnabled: value }));

  // ✅ UNIFIED RADIUS CONFIG - 7 states → 1 object (ARXES compliant)
  const [radiusConfig, setRadiusConfig] = useState({
    border: 'md',
    button: 'md',
    layout: 'md',
    card: 'md',
    modal: 'md',
    input: 'md',
    table: 'md',
    header: 'lg'
  });

  // Helper functions για backward compatibility
  const borderRadius = radiusConfig.border;
  const buttonRadius = radiusConfig.button;
  const layoutRadius = radiusConfig.layout;
  const cardRadius = radiusConfig.card;
  const modalRadius = radiusConfig.modal;
  const inputRadius = radiusConfig.input;
  const tableRadius = radiusConfig.table;
  const headerRadius = radiusConfig.header;

  const setBorderRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, border: value }));
  const setButtonRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, button: value }));
  const setLayoutRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, layout: value }));
  const setCardRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, card: value }));
  const setModalRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, modal: value }));
  const setInputRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, input: value }));
  const setTableRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, table: value }));
  const setHeaderRadius = (value: string) => setRadiusConfig(prev => ({ ...prev, header: value }));

  // ✅ UNIFIED EFFECTS CONFIG - 2 states → 1 object (ARXES compliant)
  const [effectsConfig, setEffectsConfig] = useState({
    hover: 'normal',
    active: 'scale'
  });

  // Helper functions για backward compatibility
  const hoverEffect = effectsConfig.hover;
  const activeEffect = effectsConfig.active;

  const setHoverEffect = (value: string) => setEffectsConfig(prev => ({ ...prev, hover: value }));
  const setActiveEffect = (value: string) => setEffectsConfig(prev => ({ ...prev, active: value }));


  // ✅ UNIFIED SIZE CONFIG - 4 states → 1 object (ARXES compliant)
  const [sizeConfig, setSizeConfig] = useState({
    card: 'md' as CardSizeValue,
    modal: 'md' as ModalSizeValue,
    input: 'md' as InputSizeValue,
    table: 'md' as TableSizeValue
  });

  // Helper functions για backward compatibility
  const cardSize = sizeConfig.card;
  const modalSize = sizeConfig.modal;
  const inputSize = sizeConfig.input;
  const tableSize = sizeConfig.table;

  const setCardSize = (value: CardSizeValue) => setSizeConfig(prev => ({ ...prev, card: value }));
  const setModalSize = (value: ModalSizeValue) => setSizeConfig(prev => ({ ...prev, modal: value }));
  const setInputSize = (value: InputSizeValue) => setSizeConfig(prev => ({ ...prev, input: value }));
  const setTableSize = (value: TableSizeValue) => setSizeConfig(prev => ({ ...prev, table: value }));

  // Modal Text Alignment State
  const [modalTextAlign, setModalTextAlign] = useState<ModalTextAlignValue>('middle');


  // Real-time preview hook for header buttons
  const { startPreview } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      console.log('🎯 useRealTimePreview onCommit CALLED:', { key, value, colorCategory: colorHookState?.colorCategory, elementType: colorHookState?.elementType });

      // ✅ ΑΠΟΦΥΓΗ OVERRIDE: ΔΕΝ κάνουμε commit όταν είμαστε σε alpha preview mode
      // Διατηρούμε τις RGBA τιμές στα CSS variables χωρίς επαναφορά
      if (colorHookState?.elementType === 'buttons' && colorHookState?.colorCategory === 'backgrounds') {
        console.log('🚫 SKIPPING onCommit για buttons background - διατήρηση RGBA values');
        return; // ΔΕΝ καλούμε updateSquarePalette που επαναφέρει defaults
      }

      // Update the actual color state when preview is committed
      // ΜΟΝΟ για buttons category επηρεάζει τα header buttons (legacy behavior)
      if (key === 'buttonsSecondaryColor') {
        console.log('🔄 Calling updateSquarePalette για legacy behavior');
        colorActions.updateSquarePalette('secondaryColor', value);
      }
    },
    debounceMs: 100
  });



  // ==============================
  // HELPER FUNCTIONS
  // ==============================

  // Conversion function for backward compatibility με playground components
  const convertColorPaletteWithAlphaToLegacy = (palette: ColorPaletteWithAlpha) => {
    // Helper function για safe extraction του hex value
    const safeExtractHex = (color: string | { hex: string } | undefined): string => {
      if (!color) return 'var(--layera-color-surface-primary)';
      if (typeof color === 'string') return color; // Factory settings format
      if (typeof color === 'object' && color.hex) return color.hex; // ColorWithAlpha format
      return 'var(--layera-color-surface-primary)'; // Fallback
    };

    const converted = {
      primary: safeExtractHex(palette.primaryColor),
      secondary: safeExtractHex(palette.secondaryColor),
      success: safeExtractHex(palette.successColor),
      warning: safeExtractHex(palette.warningColor),
      danger: safeExtractHex(palette.dangerColor),
      info: safeExtractHex(palette.infoColor)
    };

    // Επιπλέον έλεγχος για το αν τα χρώματα είναι μηδενικά (ΜΟΝΟ πραγματικά άκυρα)
    const hasNullColors = Object.values(converted).some(color =>
      !color || color === 'undefined' || color === '' || color === null
    );

    if (hasNullColors) {
      console.warn('Warning: Some colors may not be properly set:', converted);
    }

    return converted;
  };

  // ==============================
  // EVENT HANDLERS
  // ==============================


  // ==============================
  // CSS VARIABLES INTEGRATION
  // ==============================

  const applyColorsToApp = async () => {
    // Get autonomous colors for current category
    const categoryColors = getColorsForCategory(colorHookState.colorCategory);

    // Apply colors via CSS Variables hook
    await cssActions.applyColorsToApp(colorHookState.colorCategory, categoryColors, colorHookState.elementType);

    // Save theme via Storage hook
    const themeData = {
      colorCategory: colorHookState.colorCategory,
      shape: colorHookState.colorButtonShape,
      primaryColor: categoryColors.primaryColor.hex,
      secondaryColor: categoryColors.secondaryColor.hex,
      successColor: categoryColors.successColor.hex,
      warningColor: categoryColors.warningColor.hex,
      dangerColor: categoryColors.dangerColor.hex,
      infoColor: categoryColors.infoColor.hex
    };

    await storageActions.saveToStorage(themeData, user || undefined);

    window.dispatchEvent(new CustomEvent('colorsUpdate', {
      detail: { category: colorHookState.colorCategory, ...categoryColors }
    }));
  };

  const applySquareColorsToHeader = () => {
    cssActions.applySquareColorsToHeader();
  };

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
          {colorHookState.elementType === 'buttons' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <ButtonsPlayground
                buttonState={buttonState}
                colorCategory={colorHookState.colorCategory}
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                borderWidth={borderWidth}
                buttonRadius={buttonRadius}
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {colorHookState.elementType === 'cards' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <CardsPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                cardRadius={cardRadius}
                cardSize={cardSize}
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {colorHookState.elementType === 'modals' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <ModalsPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                modalRadius={modalRadius}
                modalSize={modalSize}
                modalTextAlign={modalTextAlign}
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {colorHookState.elementType === 'inputs' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <InputsPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                inputRadius={inputRadius}
                inputSize={inputSize}
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {colorHookState.elementType === 'layout' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <LayoutPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                layoutRadius={layoutRadius}
                layoutSize="md"
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {colorHookState.elementType === 'headers' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <HeaderPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                headerRadius={headerRadius}
                headerSize="md"
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}


          {colorHookState.elementType === 'tables' && (
            <Box className="layera-margin-bottom--xl global-display-flex global-flexDirection-column global-alignItems-center">
              <TablesPlayground
                currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                tableRadius={tableRadius}
                tableSize={tableSize}
                hoverEffect={hoverEffect}
                activeEffect={activeEffect}
              />
            </Box>
          )}

          {/* Always show color management sections */}
          {/* Category and Element Type Selection - Πάνω από Button Controls */}
          <Box className="layera-margin-bottom--xl">
            <CategorySelection
              colorHookState={colorHookState}
              colorActions={colorActions}
              borderWidth={borderWidth}
              onBorderWidthChange={setBorderWidth}
              borderRadius={borderRadius}
              onBorderRadiusChange={setBorderRadius}
              buttonRadius={buttonRadius}
              onButtonRadiusChange={setButtonRadius}
              layoutRadius={layoutRadius}
              onLayoutRadiusChange={setLayoutRadius}
              cardRadius={cardRadius}
              onCardRadiusChange={setCardRadius}
              modalRadius={modalRadius}
              onModalRadiusChange={setModalRadius}
              inputRadius={inputRadius}
              onInputRadiusChange={setInputRadius}
              tableRadius={tableRadius}
              onTableRadiusChange={setTableRadius}
              headerRadius={headerRadius}
              onHeaderRadiusChange={setHeaderRadius}
              hoverEffect={hoverEffect}
              onHoverEffectChange={setHoverEffect}
              activeEffect={activeEffect}
              onActiveEffectChange={setActiveEffect}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              cardSize={cardSize}
              onCardSizeChange={setCardSize}
              modalSize={modalSize}
              onModalSizeChange={setModalSize}
              modalTextAlign={modalTextAlign}
              onModalTextAlignChange={setModalTextAlign}
              inputSize={inputSize}
              onInputSizeChange={setInputSize}
              tableSize={tableSize}
              onTableSizeChange={setTableSize}
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
            currentColors={getColorsForCategory(colorHookState.colorCategory)}
            currentSetters={{
              primaryColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'primaryColor', value),
              secondaryColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'secondaryColor', value),
              successColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'successColor', value),
              warningColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'warningColor', value),
              dangerColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'dangerColor', value),
              infoColor: (value: string) => colorActions.updateCategoryPalette(colorHookState.colorCategory, 'infoColor', value)
            }}
            startPreview={(key: string, value: string | ColorWithAlpha) => {
              console.log('📡 LivePlayground startPreview CALLED:', { key, value, elementType: colorHookState.elementType, colorCategory: colorHookState.colorCategory });

              const previewValue = typeof value === 'string' ? value : value.rgba;

              if (colorHookState.elementType === 'buttons' &&
                 colorHookState.colorCategory === 'backgrounds') {
                // ✅ ALPHA SUPPORT: Χρησιμοποιούμε rgba για διαφάνεια
                const colorValue = typeof value === 'string' ? value : (value.rgba || value.hex);
                console.log('🎯 LivePlayground BUTTONS CSS ACTION #1:', { key, colorValue, value, elementType: colorHookState.elementType, colorCategory: colorHookState.colorCategory });
                cssActions.applySpecificButtonColor(key, colorValue);
                console.log('✅ LivePlayground BUTTONS CSS ACTION #1 COMPLETED');
              }

              if (colorHookState.elementType === 'cards' &&
                 colorHookState.colorCategory === 'backgrounds') {
                const colorValue = typeof value === 'string' ? value : value.hex;
                console.log('🃏 LivePlayground CARDS ACTION:', { key, colorValue });
                cssActions.applySpecificCardColor(key, colorValue);
              }

              if (colorHookState.elementType === 'modals' &&
                 colorHookState.colorCategory === 'backgrounds') {
                const colorValue = typeof value === 'string' ? value : value.hex;
                console.log('🪟 LivePlayground MODALS ACTION:', { key, colorValue });
                cssActions.applySpecificModalColor(key, colorValue);
              }

              if (colorHookState.elementType === 'layout' &&
                 colorHookState.colorCategory === 'backgrounds') {
                const colorValue = typeof value === 'string' ? value : value.hex;
                console.log('📐 LivePlayground LAYOUT ACTION:', { key, colorValue });
                cssActions.applySpecificLayoutColor(key, colorValue);
              }

              if (colorHookState.elementType === 'headers' &&
                 colorHookState.colorCategory === 'backgrounds') {
                const colorValue = typeof value === 'string' ? value : value.hex;
                console.log('🎩 LivePlayground HEADERS ACTION:', { key, colorValue });
                cssActions.applySpecificHeaderColor(key, colorValue);
              }

              console.log('🔗 Calling useRealTimePreview hook startPreview:', { key, previewValue });
              startPreview(key, previewValue, colorHookState.colorCategory, colorHookState.elementType);
              console.log('✅ useRealTimePreview hook startPreview COMPLETED');
            }}
            colorCategory={colorHookState.colorCategory}
            alphaEnabled={alphaEnabled}
            onAlphaToggle={setAlphaEnabled}
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
              currentColors={convertColorPaletteWithAlphaToLegacy(getColorsForCategory(colorHookState.colorCategory))}
              buttonState={buttonState}
            />
          </Box>
    </Box>
  );
};

export default LivePlayground;
