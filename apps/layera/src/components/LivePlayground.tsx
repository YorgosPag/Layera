import React, { useState, useEffect } from 'react';
import styles from './LivePlayground.module.css';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon, PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, RocketIcon } from '@layera/icons';
import { ButtonsSection } from './playground/ButtonsSection';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { ButtonsPlayground } from './playground/ButtonsPlayground';
import { CardsPlayground } from './playground/CardsPlayground';
import { ModalsPlayground } from './playground/ModalsPlayground';
import { InputsPlayground } from './playground/InputsPlayground';
import { LayoutPlayground } from './playground/LayoutPlayground';
import { TablesPlayground } from './playground/TablesPlayground';
import { ColorCategorySelection } from './playground/ColorCategorySelection';
import { ColorPreviewArea } from './playground/ColorPreviewArea';
import { ColorControlsGridWithAlpha } from './playground/ColorControlsGridWithAlpha';
import { ColorActionsPanel } from './playground/ColorActionsPanel';
import { ColorValueDisplay } from './playground/ColorValueDisplay';
import { FactorySettingsPanel } from './playground/FactorySettingsPanel';
import type { ColorWithAlpha } from './playground/shared/ColorPickerWithAlpha';
import type { FontSizeValue } from './playground/shared/FontSizeControl';
import { CardSizeControl, type CardSizeValue } from './playground/shared/CardSizeControl';
import { ModalSizeControl, type ModalSizeValue } from './playground/shared/ModalSizeControl';
import { InputSizeControl, type InputSizeValue } from './playground/shared/InputSizeControl';
import { TableSizeControl, type TableSizeValue } from './playground/shared/TableSizeControl';
import { ButtonRadiusControl } from './playground/shared/ButtonRadiusControl';
import { LayoutRadiusControl } from './playground/shared/LayoutRadiusControl';
import { CardRadiusControl } from './playground/shared/CardRadiusControl';
import { ModalRadiusControl } from './playground/shared/ModalRadiusControl';
import { InputRadiusControl } from './playground/shared/InputRadiusControl';
import { TableRadiusControl } from './playground/shared/TableRadiusControl';
import { loadCurrentThemeFromLocalStorage } from '../services/colorThemeService';
import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from '../hooks/useRealTimePreview';
import { useButtonState } from '../hooks/useButtonState';
import { useColorState, ColorPalette } from '../hooks/useColorState';
import { useCSSVariables } from '../hooks/useCSSVariables';
import { useStorage } from '../hooks/useStorage';
import { useNavigation } from '../hooks/useNavigation';
import { useColorHelpers } from '../hooks/useColorHelpers';

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


interface LivePlaygroundProps {
  onClose: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ onClose }) => {

  // Authentication
  const { user } = useAuth();

  // ==============================
  // HOOK INTEGRATIONS
  // ==============================

  // Button State Management
  const { state: buttonState, actions: buttonActions, variants: buttonVariants, sizes: buttonSizes } = useButtonState();

  // Color State Management
  const { state: colorHookState, actions: colorActions, colorCategories, colorButtonShapes, getCurrentPalette, getCategoryPalette } = useColorState();

  // CSS Variables Management
  const { actions: cssActions } = useCSSVariables();

  // Storage Management
  const { actions: storageActions } = useStorage({ colorState: colorHookState, colorActions });

  // Navigation Management
  const { state: navigationState, actions: navigationActions } = useNavigation();

  // Color Helpers Management
  const { currentColors, currentSetters, categoryColors, categorySetters, actions: colorHelpersActions } = useColorHelpers({
    colorState: colorHookState,
    colorActions,
    getCurrentPalette,
    getCategoryPalette
  });

  // ==============================
  // STATE MANAGEMENT
  // ==============================

  // Border width state for borders category
  const [borderWidth, setBorderWidth] = useState<number>(2);

  // Border radius state for borders category
  const [borderRadius, setBorderRadius] = useState<string>('md');

  // Hover effect state for interactive elements
  const [hoverEffect, setHoverEffect] = useState<string>('normal');

  // Active effect state for interactive elements
  const [activeEffect, setActiveEffect] = useState<string>('scale');

  // Button radius state for buttons
  const [buttonRadius, setButtonRadius] = useState<string>('md');

  // Layout radius state for layout category
  const [layoutRadius, setLayoutRadius] = useState<string>('md');

  // Card radius state for cards category
  const [cardRadius, setCardRadius] = useState<string>('md');

  // Modal radius state for modals category
  const [modalRadius, setModalRadius] = useState<string>('md');

  // Input radius state for inputs category
  const [inputRadius, setInputRadius] = useState<string>('md');

  // Table radius state for tables category
  const [tableRadius, setTableRadius] = useState<string>('md');

  // Font size state for text category
  const [fontSize, setFontSize] = useState<FontSizeValue>('base');

  // Card size state for cards category
  const [cardSize, setCardSize] = useState<CardSizeValue>('md');

  // Modal size state for modals category
  const [modalSize, setModalSize] = useState<ModalSizeValue>('md');

  // Input size state for inputs category
  const [inputSize, setInputSize] = useState<InputSizeValue>('md');

  // Table size state for tables category
  const [tableSize, setTableSize] = useState<TableSizeValue>('md');

  // Alpha state for color controls
  const [alphaEnabled, setAlphaEnabled] = useState<boolean>(false);

  // Real-time preview hook for header buttons
  const { startPreview, isPreviewActive } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      // Update the actual color state when preview is committed
      // ΜΟΝΟ για buttons category επηρεάζει τα header buttons
      if (key === 'buttonsSecondaryColor') {
        colorActions.updateSquarePalette('secondary', value);
      }
    },
    debounceMs: 1000
  });



  // ==============================
  // EVENT HANDLERS
  // ==============================

  /**
   * Applies current button settings to the application
   * Dispatches custom event for other components to listen
   */
  const applyToApp = () => {
    window.dispatchEvent(new CustomEvent('playgroundUpdate', {
      detail: {
        variant: buttonState.variant,
        size: buttonState.size,
        text: buttonState.text,
        withIcon: buttonState.withIcon
      }
    }));
  };

  // ==============================
  // CSS VARIABLES INTEGRATION
  // ==============================

  const applyColorsToApp = async () => {
    // Get autonomous colors for current category
    const categoryColors = colorHelpersActions.getColorsForCategory(colorHookState.colorCategory);

    // Apply colors via CSS Variables hook
    await cssActions.applyColorsToApp(colorHookState.colorCategory, categoryColors as ColorPalette, colorHookState.elementType);

    // Save theme via Storage hook
    const themeData = {
      colorCategory: colorHookState.colorCategory,
      shape: colorHookState.colorButtonShape,
      primaryColor: categoryColors.primary,
      secondaryColor: categoryColors.secondary,
      successColor: categoryColors.success,
      warningColor: categoryColors.warning,
      dangerColor: categoryColors.danger,
      infoColor: categoryColors.info
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
      className={styles.playgroundUnified}
      data-type="fullscreen"
    >
      <PlaygroundHeader
        onClose={onClose}
      />
          {/* Dynamic Content Based on Element Type Selection */}
          {colorHookState.elementType === 'buttons' && (
            <Box className="layera-margin-bottom--xl">
              <ButtonsPlayground
                buttonState={buttonState}
                colorCategory={colorHookState.colorCategory}
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory) as unknown as Record<string, string>}
                borderWidth={borderWidth}
              />
            </Box>
          )}

          {colorHookState.elementType === 'cards' && (
            <Box className="layera-margin-bottom--xl">
              <CardsPlayground
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
              />
            </Box>
          )}

          {colorHookState.elementType === 'modals' && (
            <Box className="layera-margin-bottom--xl">
              <ModalsPlayground
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
              />
            </Box>
          )}

          {colorHookState.elementType === 'inputs' && (
            <Box className="layera-margin-bottom--xl">
              <InputsPlayground
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
              />
            </Box>
          )}

          {colorHookState.elementType === 'layout' && (
            <Box className="layera-margin-bottom--xl">
              <LayoutPlayground
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
                borderRadius={layoutRadius}
              />
            </Box>
          )}


          {colorHookState.elementType === 'tables' && (
            <Box className="layera-margin-bottom--xl">
              <TablesPlayground
                currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
                colorCategory={colorHookState.colorCategory}
                borderWidth={borderWidth}
              />
            </Box>
          )}

          {/* Always show color management sections */}
          {/* Live Color Preview Area */}
          <Box className="layera-margin-bottom--xl">
            <ColorPreviewArea
              colorHookState={colorHookState}
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
            />
          </Box>

          {/* Category and Element Type Selection - Πάνω από Button Controls */}
          <Box className="layera-margin-bottom--xl">
            <ColorCategorySelection
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
                className="layera-grid layera-grid--gap-lg layera-margin-top--lg layera-margin-bottom--xl"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'var(--layera-global-utilities-grid-autoFit280)',
                  gap: 'var(--layera-size-8)',
                  padding: 'var(--layera-size-6)'
                } as React.CSSProperties}
              >
                {/* Shape Control - ΠΡΩΤΟ */}
                <Box className="layera-card layera-padding--lg layera-text--align-center">
                  <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                    <PolygonIcon size="sm" /> Σχήμα Πλήκτρου
                  </h3>
                  <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center layera-align-items--center">
                    <Button
                      variant={buttonState.shape === 'rectangular' ? 'primary' : 'outline'}
                      size={buttonState.size}
                      onClick={() => buttonActions.setShape('rectangular')}
                      className={`layera-btn layera-btn--${buttonState.size} layera-btn--${buttonState.shape === 'rectangular' ? 'primary' : 'outline'}`}
                    >
                      <RulerIcon size="sm" /> Παραλληλόγραμμο
                    </Button>
                    <Button
                      variant={buttonState.shape === 'square' ? 'primary' : 'outline'}
                      size={buttonState.size}
                      onClick={() => buttonActions.setShape('square')}
                      className={`layera-btn layera-btn--${buttonState.size} layera-btn--${buttonState.shape === 'square' ? 'primary' : 'outline'}`}
                    >
                      <PolygonIcon size="sm" /> Τετράγωνο
                    </Button>
                    <Button
                      variant={buttonState.shape === 'rounded' ? 'primary' : 'outline'}
                      size={buttonState.size}
                      onClick={() => buttonActions.setShape('rounded')}
                      className={`layera-btn layera-btn--${buttonState.size} layera-btn--${buttonState.shape === 'rounded' ? 'primary' : 'outline'}`}
                    >
                      <CompassIcon size="sm" /> Στρογγυλό
                    </Button>
                  </Box>
                </Box>

                {/* Size Control - ΔΕΥΤΕΡΟ */}
                <Box className="layera-card layera-padding--lg layera-text--align-center">
                  <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                    <SettingsIcon size="sm" /> Μέγεθος Πλήκτρων
                  </h3>
                  <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center layera-align-items--center">
                    {buttonSizes.map((size) => (
                      <Button
                        key={size}
                        variant={buttonState.size === size ? 'primary' : 'outline'}
                        size={buttonState.size}
                        onClick={() => buttonActions.setSize(size)}
                        className={`layera-btn layera-btn--${buttonState.size} layera-btn--${buttonState.size === size ? 'primary' : 'outline'}`}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Text & Icon Control - ΤΡΙΤΟ */}
                <Box className="layera-card layera-padding--lg layera-text--align-center">
                  <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                    <EditIcon size="sm" /> Κείμενο & Εικονίδιο
                  </h3>
                  <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--align-center layera-flex--justify-center">
                    <input
                      type="text"
                      value={buttonState.text}
                      onChange={(e) => buttonActions.setText(e.target.value)}
                      className="layera-form"
                      data-element="input"
                    />
                    <Button
                      variant={buttonState.withIcon ? 'primary' : 'outline'}
                      size={buttonState.size}
                      onClick={() => buttonActions.setWithIcon(!buttonState.withIcon)}
                      className={`layera-btn layera-btn--${buttonState.size} layera-btn--${buttonState.withIcon ? 'primary' : 'outline'}`}
                    >
                      {buttonState.withIcon ? <><CheckIcon size="sm" /> Με εικονίδιο</> : <><CloseIcon size="sm" /> Χωρίς εικονίδιο</>}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Color Controls Grid με Alpha Support */}
          <Box className="layera-margin-bottom--xl">
            <ColorControlsGridWithAlpha
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory) as unknown as Record<string, ColorWithAlpha | string>}
              currentSetters={colorHelpersActions.getSettersForCategory(colorHookState.colorCategory) as unknown as Record<string, (value: ColorWithAlpha | string) => void>}
              startPreview={(key: string, value: string | ColorWithAlpha) => {
                const previewValue = typeof value === 'string' ? value : value.rgba;
                startPreview(key, previewValue);
              }}
              colorCategory={colorHookState.colorCategory}
              alphaEnabled={alphaEnabled}
              onAlphaToggle={setAlphaEnabled}
              buttonState={buttonState}
            />
          </Box>

          {/* Apply Colors Buttons */}
          <Box className="layera-margin-bottom--xl">
            <ColorActionsPanel
              colorHookState={colorHookState}
              buttonState={buttonState}
              applyColorsToApp={applyColorsToApp}
              applySquareColorsToHeader={applySquareColorsToHeader}
            />
          </Box>

          {/* Unified Factory Settings & Display Panel */}
          <Box className="layera-grid--auto-fit-280 layera-margin-bottom--xl">
            <FactorySettingsPanel
              buttonState={buttonState}
              onSettingsChange={(settings) => {
                // Εφαρμόζει τις νέες ρυθμίσεις στο color state
                Object.entries(settings).forEach(([key, value]) => {
                  if (typeof key === 'string' && typeof value === 'string') {
                    colorActions.updateCategoryPalette(colorHookState.colorCategory, key as any, value);
                  }
                });
              }}
              onPreview={startPreview}
              currentUserId={user?.uid}
            />

            <ColorValueDisplay
              colorHookState={colorHookState}
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory) as unknown as Record<string, string>}
              buttonState={buttonState}
            />
          </Box>
    </Box>
  );
};

export default LivePlayground;
