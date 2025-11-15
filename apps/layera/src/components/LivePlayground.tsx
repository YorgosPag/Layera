import React, { useState, useEffect } from 'react';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon, PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, RocketIcon } from '@layera/icons';
import { ButtonsSection } from './playground/ButtonsSection';
import { ColorsSection } from './playground/ColorsSection';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { ButtonsPlayground } from './playground/ButtonsPlayground';
import { ColorCategorySelection } from './playground/ColorCategorySelection';
import { ColorPreviewArea } from './playground/ColorPreviewArea';
import { loadCurrentThemeFromLocalStorage } from '../services/colorThemeService';
import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from '../hooks/useRealTimePreview';
import { useButtonState } from '../hooks/useButtonState';
import { useColorState } from '../hooks/useColorState';
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
  // console.log('LivePlayground φορτώνει...');

  // Authentication
  const { user } = useAuth();

  // ==============================
  // HOOK INTEGRATIONS
  // ==============================

  // Button State Management
  const { state: buttonState, actions: buttonActions, variants: buttonVariants, sizes: buttonSizes } = useButtonState();

  // Color State Management
  const { state: colorHookState, actions: colorActions, colorCategories, colorButtonShapes, getCurrentPalette } = useColorState();

  // CSS Variables Management
  const { actions: cssActions } = useCSSVariables();

  // Storage Management
  const { actions: storageActions } = useStorage({ colorState: colorHookState, colorActions });

  // Navigation Management
  const { state: navigationState, actions: navigationActions } = useNavigation();

  // Color Helpers Management
  const { currentColors, currentSetters } = useColorHelpers({
    colorState: colorHookState,
    colorActions,
    getCurrentPalette
  });

  // ==============================
  // STATE MANAGEMENT
  // ==============================



  // Real-time preview hook for header buttons
  const { startPreview, isPreviewActive } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      // Update the actual color state when preview is committed
      if (key === 'secondaryColor') {
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

    // Apply colors via CSS Variables hook
    await cssActions.applyColorsToApp(colorHookState.colorCategory, currentColors);

    // Save theme via Storage hook
    const themeData = {
      colorCategory: colorHookState.colorCategory,
      shape: colorHookState.colorButtonShape,
      primaryColor: currentColors.primary,
      secondaryColor: currentColors.secondary,
      successColor: currentColors.success,
      warningColor: currentColors.warning,
      dangerColor: currentColors.danger,
      infoColor: currentColors.info
    };

    await storageActions.saveToStorage(themeData, user);

    window.dispatchEvent(new CustomEvent('colorsUpdate', {
      detail: { category: colorHookState.colorCategory, ...currentColors }
    }));
  };

  const applySquareColorsToHeader = () => {
    cssActions.applySquareColorsToHeader();
  };

  return (
    <Box
      data-layera-playground="true"
      className="layera-position--fixed layera-top--0 layera-left--0 layera-bg-surface-light layera-full-width layera-layout-content layera-map--fullscreen"
      style={{
        '--layera-map-fullscreen-z-index': 'var(--layera-z-index-overlay)',
        zIndex: 'var(--layera-map-fullscreen-z-index, 1000)'
      } as React.CSSProperties}
    >
      <PlaygroundHeader
        onClose={onClose}
        activeSection={navigationState.activeSection}
        onSectionChange={navigationActions.setActiveSection}
      />

        {/* Buttons Section */}
        {navigationState.activeSection === 'buttons' && (
          <ButtonsPlayground
            buttonState={buttonState}
            buttonActions={buttonActions}
            buttonVariants={buttonVariants}
            buttonSizes={buttonSizes}
          />
        )}

        {/* Colors Section - ENTERPRISE COLOR MANAGEMENT */}
        {navigationState.activeSection === 'colors' && (
          <Box>
            {/* Category and Shape Selection - Side by Side */}
            <ColorCategorySelection
              colorHookState={colorHookState}
              colorActions={colorActions}
            />

            {/* Live Color Preview Area */}
            <ColorPreviewArea
              colorHookState={colorHookState}
              currentColors={currentColors}
            />

            {/* Color Controls Grid */}
            <Box
              className="layera-grid layera-margin-bottom--xl"
              style={{
                gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)',
                gap: '2rem'
              } as React.CSSProperties}
            >
              {/* Primary Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Primary Color
                </h4>
                <input
                  type="color"
                  value={currentColors.primary}
                  onChange={(e) => currentSetters.setPrimary(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.primary.toUpperCase()}
                </Text>
              </Box>

              {/* Secondary Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Secondary Color
                </h4>
                <input
                  type="color"
                  value={currentColors.secondary}
                  onInput={(e) => {
                    // Real-time preview while dragging
                    const newColor = (e.target as HTMLInputElement).value;
                    startPreview('secondaryColor', newColor);
                  }}
                  onChange={(e) => {
                    // Final commit when color selection is done
                    const newColor = e.target.value;
                    currentSetters.setSecondary(newColor);
                  }}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.secondary.toUpperCase()}
                </Text>
              </Box>

              {/* Success Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Success Color
                </h4>
                <input
                  type="color"
                  value={currentColors.success}
                  onChange={(e) => currentSetters.setSuccess(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.success.toUpperCase()}
                </Text>
              </Box>

              {/* Warning Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Warning Color
                </h4>
                <input
                  type="color"
                  value={currentColors.warning}
                  onChange={(e) => currentSetters.setWarning(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.warning.toUpperCase()}
                </Text>
              </Box>

              {/* Danger Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Danger Color
                </h4>
                <input
                  type="color"
                  value={currentColors.danger}
                  onChange={(e) => currentSetters.setDanger(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.danger.toUpperCase()}
                </Text>
              </Box>

              {/* Info Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Info Color
                </h4>
                <input
                  type="color"
                  value={currentColors.info}
                  onChange={(e) => currentSetters.setInfo(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {currentColors.info.toUpperCase()}
                </Text>
              </Box>
            </Box>

            {/* Apply Colors Buttons */}
            <Box className="layera-text-center layera-margin-bottom--xl">
              <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-md">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={applyColorsToApp}
                  className="layera-button layera-button--primary"
                >
                  <RocketIcon size="sm" /> Εφαρμογή Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}
                </Button>

                {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για buttons + square */}
                {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'square' && (
                  <Button
                    variant="success"
                    size="lg"
                    onClick={applySquareColorsToHeader}
                    className="layera-button layera-button--success"
                  >
                    <CheckIcon size="sm" /> Εφαρμογή στην Επικεφαλίδα
                  </Button>
                )}
              </Box>
              <Text className="layera-typography layera-margin-top--sm" data-size="xs" data-color="secondary">
                {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'square'
                  ? 'Εφαρμόστε τα χρώματα των τετράγωνων πλήκτρων στην επικεφαλίδα'
                  : `Θα επηρεαστούν όλα τα στοιχεία τύπου "${colorHookState.colorCategory}" στην εφαρμογή`
                }
              </Text>
            </Box>

            {/* Color Values & CSS Variables - Side by Side */}
            <Box
              className="layera-grid layera-grid--gap-lg"
              style={{
                gridTemplateColumns: '1fr 1fr'
              } as React.CSSProperties}
            >
              {/* Current Color Values Display */}
              <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
                <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                  <PaletteIcon size="sm" /> Παλέτα Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}:
                </h4>
                <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
{`{
  primary: "${currentColors.primary}",
  secondary: "${currentColors.secondary}",
  success: "${currentColors.success}",
  warning: "${currentColors.warning}",
  danger: "${currentColors.danger}",
  info: "${currentColors.info}"
}`}
                </pre>
              </Box>

              {/* CSS Variables Display */}
              <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--info-light" data-family="mono" data-size="sm">
                <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                  <SettingsIcon size="sm" /> CSS Μεταβλητές για {colorHookState.colorCategory.toUpperCase()}{colorHookState.colorCategory === 'buttons' ? ` (${colorHookState.colorButtonShape})` : ''}:
                </h4>
                <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
                  {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'rectangular' && `{
  --layera-color-button-primary: "${currentColors.primary}",
  --layera-color-button-secondary: "${currentColors.secondary}",
  --layera-color-button-success: "${currentColors.success}",
  --layera-color-button-warning: "${currentColors.warning}",
  --layera-color-button-danger: "${currentColors.danger}",
  --layera-color-button-info: "${currentColors.info}"
}`}
                  {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'square' && `{
  --layera-color-button-square-primary: "${currentColors.primary}",
  --layera-color-button-square-secondary: "${currentColors.secondary}",
  --layera-color-button-square-success: "${currentColors.success}",
  --layera-color-button-square-warning: "${currentColors.warning}",
  --layera-color-button-square-danger: "${currentColors.danger}",
  --layera-color-button-square-info: "${currentColors.info}"
}`}
                  {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'rounded' && `{
  --layera-color-button-rounded-primary: "${currentColors.primary}",
  --layera-color-button-rounded-secondary: "${currentColors.secondary}",
  --layera-color-button-rounded-success: "${currentColors.success}",
  --layera-color-button-rounded-warning: "${currentColors.warning}",
  --layera-color-button-rounded-danger: "${currentColors.danger}",
  --layera-color-button-rounded-info: "${currentColors.info}"
}`}
                  {colorHookState.colorCategory === 'backgrounds' && `{
  --layera-color-bg-primary: "${currentColors.primary}",
  --layera-color-bg-secondary: "${currentColors.secondary}",
  --layera-color-bg-success: "${currentColors.success}",
  --layera-color-bg-warning: "${currentColors.warning}",
  --layera-color-bg-danger: "${currentColors.danger}",
  --layera-color-bg-info: "${currentColors.info}"
}`}
                  {colorHookState.colorCategory === 'text' && `{
  --layera-color-text-primary: "${currentColors.primary}",
  --layera-color-text-secondary: "${currentColors.secondary}",
  --layera-color-text-success: "${currentColors.success}",
  --layera-color-text-warning: "${currentColors.warning}",
  --layera-color-text-danger: "${currentColors.danger}",
  --layera-color-text-info: "${currentColors.info}"
}`}
                  {colorHookState.colorCategory === 'borders' && `{
  --layera-color-border-primary: "${currentColors.primary}",
  --layera-color-border-secondary: "${currentColors.secondary}",
  --layera-color-border-success: "${currentColors.success}",
  --layera-color-border-warning: "${currentColors.warning}",
  --layera-color-border-danger: "${currentColors.danger}",
  --layera-color-border-info: "${currentColors.info}"
}`}
                </pre>
              </Box>
            </Box>
          </Box>
        )}

        {navigationState.activeSection === 'tokens' && (
          <Box className="layera-flex layera-flex--direction-column layera-flex--justify-center layera-text-center layera-padding--2xl layera-min-height--card">
            <h2 className="layera-typography layera-margin-bottom--lg layera-text-color--neutral-medium" data-size="2xl">
              <SettingsIcon size="sm" /> Tokens Playground
            </h2>
            <p className="layera-typography layera-margin--none layera-text-color--neutral-medium" data-size="lg">
              Σύντομα διαθέσιμο - Live design token editing
            </p>
          </Box>
        )}
    </Box>
  );
};

export default LivePlayground;
