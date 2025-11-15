import React, { useState, useEffect } from 'react';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon, PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, RocketIcon } from '@layera/icons';
import { ButtonsSection } from './playground/ButtonsSection';
import { PlaygroundHeader } from './playground/PlaygroundHeader';
import { ButtonsPlayground } from './playground/ButtonsPlayground';
import { ColorCategorySelection } from './playground/ColorCategorySelection';
import { ColorPreviewArea } from './playground/ColorPreviewArea';
import { ColorControlsGrid } from './playground/ColorControlsGrid';
import { ColorActionsPanel } from './playground/ColorActionsPanel';
import { ColorValueDisplay } from './playground/ColorValueDisplay';
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
  // console.log('LivePlayground φορτώνει...');

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
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory)}
            />

            {/* Color Controls Grid */}
            <ColorControlsGrid
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory) as unknown as Record<string, string>}
              currentSetters={colorHelpersActions.getSettersForCategory(colorHookState.colorCategory) as unknown as Record<string, (value: string) => void>}
              startPreview={startPreview}
              colorCategory={colorHookState.colorCategory}
            />

            {/* Apply Colors Buttons */}
            <ColorActionsPanel
              colorHookState={colorHookState}
              applyColorsToApp={applyColorsToApp}
              applySquareColorsToHeader={applySquareColorsToHeader}
            />

            {/* Color Values & CSS Variables - Side by Side */}
            <ColorValueDisplay
              colorHookState={colorHookState}
              currentColors={colorHelpersActions.getColorsForCategory(colorHookState.colorCategory) as unknown as Record<string, string>}
            />
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
