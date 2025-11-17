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

  // Font size state for text category
  const [fontSize, setFontSize] = useState<FontSizeValue>('base');

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
                borderRadius={borderRadius}
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
              hoverEffect={hoverEffect}
              onHoverEffectChange={setHoverEffect}
              activeEffect={activeEffect}
              onActiveEffectChange={setActiveEffect}
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              onPreview={startPreview}
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
                <Box className="layera-card layera-padding--lg">
                  <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                    Σχήμα Πλήκτρου
                  </h4>
                  <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                    <Button
                      variant={buttonState.shape === 'rectangular' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => buttonActions.setShape('rectangular')}
                    >
                      <RulerIcon size="sm" /> Παραλληλόγραμμο
                    </Button>
                    <Button
                      variant={buttonState.shape === 'square' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => buttonActions.setShape('square')}
                    >
                      <PolygonIcon size="sm" /> Τετράγωνο
                    </Button>
                    <Button
                      variant={buttonState.shape === 'rounded' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => buttonActions.setShape('rounded')}
                    >
                      <CompassIcon size="sm" /> Στρογγυλό
                    </Button>
                  </Box>
                </Box>

                {/* Size Control - ΔΕΥΤΕΡΟ */}
                <Box className="layera-card layera-padding--lg">
                  <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                    Size
                  </h4>
                  <Box className="layera-flex layera-flex--gap-sm">
                    {buttonSizes.map((size) => (
                      <Button
                        key={size}
                        variant={buttonState.size === size ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => buttonActions.setSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Text & Icon Control - ΤΡΙΤΟ */}
                <Box className="layera-card layera-padding--lg">
                  <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                    Κείμενο & Εικονίδιο
                  </h4>
                  <Box className="layera-flex layera-flex--gap-md layera-flex--align-center">
                    <input
                      type="text"
                      value={buttonState.text}
                      onChange={(e) => buttonActions.setText(e.target.value)}
                      className="layera-form"
                      data-element="input"
                    />
                    <Button
                      variant={buttonState.withIcon ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => buttonActions.setWithIcon(!buttonState.withIcon)}
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
            />
          </Box>

          {/* Apply Colors Buttons */}
          <Box className="layera-margin-bottom--xl">
            <ColorActionsPanel
              colorHookState={colorHookState}
              applyColorsToApp={applyColorsToApp}
              applySquareColorsToHeader={applySquareColorsToHeader}
            />
          </Box>

          {/* Factory Settings Panel */}
          <Box className="layera-margin-bottom--xl">
            <FactorySettingsPanel
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
          </Box>

          {/* Color Values & CSS Variables */}
          <Box className="layera-margin-bottom--xl">
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
