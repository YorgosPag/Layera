import React, { useState, useEffect } from 'react';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon, PaletteIcon, LayersIcon, EditIcon, PolygonIcon, RulerIcon, CompassIcon, CheckIcon, RocketIcon } from '@layera/icons';
import { ButtonsSection } from './playground/ButtonsSection';
import { ColorsSection } from './playground/ColorsSection';
import { saveColorTheme, loadCurrentThemeFromLocalStorage } from '../services/colorThemeService';
import { useAuth } from '@layera/auth-bridge';
import { useRealTimePreview } from '../hooks/useRealTimePreview';
import { useButtonState } from '../hooks/useButtonState';
import { useColorState } from '../hooks/useColorState';
import { useCSSVariables } from '../hooks/useCSSVariables';

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

  // ==============================
  // STATE MANAGEMENT
  // ==============================

  /** Active section in the playground interface */
  const [activeSection, setActiveSection] = useState<'buttons' | 'colors' | 'tokens'>('buttons');


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
  // UTILITY FUNCTIONS
  // ==============================

  /**
   * Gets the current color palette based on selected button shape
   * @returns Color object with primary, secondary, success, warning, danger, info
   */
  const getCurrentColors = () => {
    return getCurrentPalette();
  };

  const getCurrentSetters = () => {
    switch (colorHookState.colorButtonShape) {
      case 'rectangular':
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('success', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('info', value)
        };
      case 'square':
        return {
          setPrimary: (value: string) => colorActions.updateSquarePalette('primary', value),
          setSecondary: (value: string) => colorActions.updateSquarePalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateSquarePalette('success', value),
          setWarning: (value: string) => colorActions.updateSquarePalette('warning', value),
          setDanger: (value: string) => colorActions.updateSquarePalette('danger', value),
          setInfo: (value: string) => colorActions.updateSquarePalette('info', value)
        };
      case 'rounded':
        return {
          setPrimary: (value: string) => colorActions.updateRoundedPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRoundedPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRoundedPalette('success', value),
          setWarning: (value: string) => colorActions.updateRoundedPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRoundedPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRoundedPalette('info', value)
        };
      default:
        return {
          setPrimary: (value: string) => colorActions.updateRectangularPalette('primary', value),
          setSecondary: (value: string) => colorActions.updateRectangularPalette('secondary', value),
          setSuccess: (value: string) => colorActions.updateRectangularPalette('success', value),
          setWarning: (value: string) => colorActions.updateRectangularPalette('warning', value),
          setDanger: (value: string) => colorActions.updateRectangularPalette('danger', value),
          setInfo: (value: string) => colorActions.updateRectangularPalette('info', value)
        };
    }
  };

  // ==============================
  // COMPUTED VALUES
  // ==============================

  /** Current color palette based on selected button shape */
  const currentColors = getCurrentColors();
  /** Current color setters based on selected button shape */
  const currentSetters = getCurrentSetters();

  // ==============================
  // EFFECTS
  // ==============================

  // Φόρτωση αποθηκευμένων χρωμάτων από localStorage
  useEffect(() => {

    try {
      const stored = localStorage.getItem('layera-current-theme');
      if (stored) {
        const savedState = JSON.parse(stored);

        // Εφαρμογή των αποθηκευμένων χρωμάτων
        if (savedState.buttonState.shape && savedState.buttonState.shape !== colorHookState.colorButtonShape) {
          colorActions.setColorButtonShape(savedState.buttonState.shape);
        }

        if (savedState.colorCategory && savedState.colorCategory !== colorHookState.colorCategory) {
          colorActions.setColorCategory(savedState.colorCategory);
        }

        // Εφαρμογή χρωμάτων ανάλογα με το σχήμα
        if (savedState.buttonState.shape === 'square') {
          if (savedState.primaryColor) colorActions.updateSquarePalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateSquarePalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateSquarePalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateSquarePalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateSquarePalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateSquarePalette('info', savedState.infoColor);
        } else if (savedState.buttonState.shape === 'rectangular') {
          if (savedState.primaryColor) colorActions.updateRectangularPalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRectangularPalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRectangularPalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRectangularPalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRectangularPalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRectangularPalette('info', savedState.infoColor);
        } else if (savedState.buttonState.shape === 'rounded') {
          if (savedState.primaryColor) colorActions.updateRoundedPalette('primary', savedState.primaryColor);
          if (savedState.secondaryColor) colorActions.updateRoundedPalette('secondary', savedState.secondaryColor);
          if (savedState.successColor) colorActions.updateRoundedPalette('success', savedState.successColor);
          if (savedState.warningColor) colorActions.updateRoundedPalette('warning', savedState.warningColor);
          if (savedState.dangerColor) colorActions.updateRoundedPalette('danger', savedState.dangerColor);
          if (savedState.infoColor) colorActions.updateRoundedPalette('info', savedState.infoColor);
        }

      } else {
      }
    } catch (error) {
      console.error('WARNING:Σφάλμα φόρτωσης χρωμάτων:', error);
    }
  }, []);

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
    const currentColors = getCurrentColors();

    // Apply colors via CSS Variables hook
    await cssActions.applyColorsToApp(colorHookState.colorCategory, currentColors);

    // Αποθήκευση στο Firebase
    const colorData = {
      colorCategory: colorHookState.colorCategory,
      shape: colorHookState.colorButtonShape,
      primaryColor: currentColors.primary,
      secondaryColor: currentColors.secondary,
      successColor: currentColors.success,
      warningColor: currentColors.warning,
      dangerColor: currentColors.danger,
      infoColor: currentColors.info
    };

    // Αποθήκευση και στο localStorage για γρήγορη φόρτωση
    try {
      localStorage.setItem('layera-current-theme', JSON.stringify(colorData));
    } catch (error) {
      console.warn('WARNING:Σφάλμα αποθήκευσης στο localStorage:', error);
    }

    // Αποθήκευση στο Firebase (μόνο αν είναι διαθέσιμο)
    const hasRealFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key';

    if (hasRealFirebaseConfig) {
      try {
        const themeId = await saveColorTheme(colorData, user || undefined, `${colorHookState.colorCategory}-theme-${Date.now()}`);
      } catch (error) {
        console.error('WARNING:Σφάλμα αποθήκευσης στο Firebase:', error);
      }
    } else {
      // Firebase disabled (demo credentials), χρησιμοποιούμε μόνο localStorage
    }

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
      {/* Header με κουμπί κλεισίματος */}
      <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-padding--lg layera-border-bottom--default layera-bg-surface--secondary layera-position--sticky layera-top--0 layera-z-index--overlay">
        <h1 className="layera-typography" data-size="xl" data-weight="bold" data-color="primary">
          <SettingsIcon size="sm" /> Live Playground - Ζωντανές Ρυθμίσεις
        </h1>
        <button
          onClick={onClose}
          className="layera-button layera-button--outline layera-padding-x--lg layera-padding-y--sm layera-cursor--pointer"
        >
          ✕ Κλείσιμο
        </button>
      </Box>

      {/* Main Content */}
      <Box
        className="layera-bg-surface--secondary layera-text-color--primary layera-padding--2xl layera-max-width--container-xl layera-margin-x--auto"
      >
        {/* TEST - Θα δεις αυτό το κείμενο */}
        <h2 className="layera-typography layera-margin-bottom--xl" data-color="primary" data-size="2xl" data-weight="bold">
          <CheckIcon size="sm" /> ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs */}
        <Box className="layera-flex layera-flex--gap-sm layera-margin-bottom--lg layera-padding--md layera-border-radius--md layera-bg-semantic--neutral-light">
          <Button
            variant={activeSection === 'buttons' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('buttons')}
          >
            <PaletteIcon size="sm" /> Buttons
          </Button>
          <Button
            variant={activeSection === 'colors' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => {
              setActiveSection('colors');
            }}
          >
            <PaletteIcon size="sm" /> Colors
          </Button>
          <Button
            variant={activeSection === 'tokens' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('tokens')}
          >
            <SettingsIcon size="sm" /> Tokens
          </Button>
        </Box>

        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <Box>
            {/* Live Preview Area */}
            <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
              <h3 className="layera-typography layera-margin-bottom--xl" data-size="lg" data-weight="bold" data-color="primary">
                <CheckIcon size="sm" /> Live Preview
              </h3>

              <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
                {/* Rectangular Button */}
                {buttonState.shape === 'rectangular' && (
                  <Button
                    variant={buttonState.variant}
                    size={buttonState.size}
                    icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
                    iconPosition="left"
                  >
                    {buttonState.text}
                  </Button>
                )}

                {/* Square Button */}
                {buttonState.shape === 'square' && (
                  <SquareButton
                    icon={<SearchIcon size="sm" />}
                    variant={buttonState.variant}
                    size={buttonState.size}
                    aria-label={`Τετράγωνο ${buttonState.variant} πλήκτρο`}
                    tooltip={`Live ${buttonState.variant} τετράγωνο`}
                  />
                )}

                {/* Rounded Button */}
                {buttonState.shape === 'rounded' && (
                  <button
                    style={{
                      backgroundColor: buttonState.variant === 'primary' ? '#007bff' : buttonState.variant === 'secondary' ? '#6c757d' : '#28a745',
                      color: 'white',
                      padding: buttonState.size === 'xs' ? '4px 12px' : buttonState.size === 'sm' ? '6px 16px' : buttonState.size === 'md' ? '8px 20px' : buttonState.size === 'lg' ? '12px 24px' : '16px 32px',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {buttonState.withIcon && <span>⚪</span>}
                    {buttonState.text}
                  </button>
                )}
              </Box>
            </Box>

            {/* Controls Grid */}
            <Box
              className="layera-grid layera-grid--gap-xl layera-margin-bottom--xl"
              style={{
                gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
              }}
            >
              {/* Variant Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Variant
                </h4>
                <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                  {buttonVariants.map((variant) => (
                    <Button
                      key={variant}
                      variant={buttonState.variant === variant ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => buttonActions.setVariant(variant)}
                    >
                      {variant}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Size Control */}
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

              {/* Text & Icon Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Κείμενο & Εικονίδιο
                </h4>
                <input
                  type="text"
                  value={buttonState.text}
                  onChange={(e) => buttonActions.setText(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Button
                  variant={buttonState.withIcon ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => buttonActions.setWithIcon(!buttonState.withIcon)}
                >
                  {buttonState.withIcon ? <><CheckIcon size="sm" /> Με εικονίδιο</> : <><CloseIcon size="sm" /> Χωρίς εικονίδιο</>}
                </Button>
              </Box>

              {/* Shape Control */}
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
            </Box>


            {/* Current Settings Display */}
            <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
              <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                <SettingsIcon size="sm" /> Τρέχουσες Ρυθμίσεις:
              </h4>
              <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
{`{
  variant: "${buttonState.variant}",
  size: "${buttonState.size}",
  text: "${buttonState.text}",
  buttonState.withIcon: ${buttonState.withIcon}
}`}
              </pre>
            </Box>
          </Box>
        )}

        {/* Colors Section - ENTERPRISE COLOR MANAGEMENT */}
        {activeSection === 'colors' && (
          <Box>
            {/* Category and Shape Selection - Side by Side */}
            <Box
              className={`layera-grid layera-margin-bottom--xl ${colorHookState.colorCategory === 'buttons' ? 'layera-grid--gap-lg' : ''}`}
              style={{
                gridTemplateColumns: colorHookState.colorCategory === 'buttons' ? '1fr 1fr' : '1fr'
              } as React.CSSProperties}
            >
              {/* Color Category Selection */}
              <Box className="layera-card layera-padding--lg">
                <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                  <CheckIcon size="sm" /> Επιλογή Κατηγορίας Αντικειμένων
                </h3>
                <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                  <Button
                    variant={colorHookState.colorCategory === 'buttons' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => colorActions.setColorCategory('buttons')}
                  >
                    <PaletteIcon size="sm" /> Buttons
                  </Button>
                  <Button
                    variant={colorHookState.colorCategory === 'backgrounds' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => colorActions.setColorCategory('backgrounds')}
                  >
                    <LayersIcon size="sm" /> Backgrounds
                  </Button>
                  <Button
                    variant={colorHookState.colorCategory === 'text' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => colorActions.setColorCategory('text')}
                  >
                    <EditIcon size="sm" /> Text
                  </Button>
                  <Button
                    variant={colorHookState.colorCategory === 'borders' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => colorActions.setColorCategory('borders')}
                  >
                    <PolygonIcon size="sm" /> Borders
                  </Button>
                </Box>
                <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
                  Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
                </Text>
              </Box>

              {/* Button Shape Selection - Only for Buttons Category */}
              {colorHookState.colorCategory === 'buttons' && (
                <Box className="layera-card layera-padding--lg">
                  <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                    <PaletteIcon size="sm" /> Σχήμα Πλήκτρων Preview
                  </h3>
                  <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                    <Button
                      variant={colorHookState.colorButtonShape === 'rectangular' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => colorActions.setColorButtonShape('rectangular')}
                    >
                      <RulerIcon size="sm" /> Παραλληλόγραμμα
                    </Button>
                    <Button
                      variant={colorHookState.colorButtonShape === 'square' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => {
                        colorActions.setColorButtonShape('square');
                      }}
                    >
                      <PolygonIcon size="sm" /> Τετράγωνα
                    </Button>
                    <Button
                      variant={colorHookState.colorButtonShape === 'rounded' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => colorActions.setColorButtonShape('rounded')}
                    >
                      <CompassIcon size="sm" /> Στρογγυλά
                    </Button>
                  </Box>
                  <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
                    Επιλέξτε το σχήμα των πλήκτρων στην προεπισκόπηση χρωμάτων
                  </Text>
                </Box>
              )}
            </Box>

            {/* Live Color Preview Area */}
            <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
              <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                <PaletteIcon size="md" /> Live Preview - {colorHookState.colorCategory.toUpperCase()}
              </h3>
              <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
                {colorHookState.colorCategory === 'buttons' && <><PaletteIcon size="sm" /> Τα χρώματα θα επηρεάσουν όλα τα κουμπιά στην εφαρμογή</>}
                {colorHookState.colorCategory === 'backgrounds' && <><LayersIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα φόντα στην εφαρμογή</>}
                {colorHookState.colorCategory === 'text' && <><EditIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα κείμενα στην εφαρμογή</>}
                {colorHookState.colorCategory === 'borders' && <><PolygonIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα περιγράμματα στην εφαρμογή</>}
              </Text>

              <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
                {/* BUTTONS CATEGORY - Show actual buttons */}
                {colorHookState.colorCategory === 'buttons' && (
                  <>
                    <button style={{
                      backgroundColor: currentColors.primary,
                      color: 'white',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'P' : 'Primary Color'}
                    </button>
                    <button style={{
                      backgroundColor: currentColors.secondary,
                      color: 'white',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'S' : 'Secondary Color'}
                    </button>
                    <button style={{
                      backgroundColor: currentColors.success,
                      color: 'white',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'Su' : 'Success Color'}
                    </button>
                    <button style={{
                      backgroundColor: currentColors.warning,
                      color: 'black',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'W' : 'Warning Color'}
                    </button>
                    <button style={{
                      backgroundColor: currentColors.danger,
                      color: 'white',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'D' : 'Danger Color'}
                    </button>
                    <button style={{
                      backgroundColor: currentColors.info,
                      color: 'white',
                      padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
                      border: 'none',
                      borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
                      cursor: 'pointer',
                      minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {colorHookState.colorButtonShape === 'square' ? 'I' : 'Info Color'}
                    </button>
                  </>
                )}

                {/* BACKGROUNDS CATEGORY - Show colored background boxes */}
                {colorHookState.colorCategory === 'backgrounds' && (
                  <>
                    <div style={{
                      backgroundColor: currentColors.primary,
                      color: 'white',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Primary<br/>Background
                    </div>
                    <div style={{
                      backgroundColor: currentColors.secondary,
                      color: 'white',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Secondary<br/>Background
                    </div>
                    <div style={{
                      backgroundColor: currentColors.success,
                      color: 'white',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Success<br/>Background
                    </div>
                    <div style={{
                      backgroundColor: currentColors.warning,
                      color: 'black',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Warning<br/>Background
                    </div>
                    <div style={{
                      backgroundColor: currentColors.danger,
                      color: 'white',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Danger<br/>Background
                    </div>
                    <div style={{
                      backgroundColor: currentColors.info,
                      color: 'white',
                      padding: '20px',
                      border: '2px solid #ccc',
                      borderRadius: '8px',
                      minWidth: '120px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}>
                      Info<br/>Background
                    </div>
                  </>
                )}

                {/* TEXT CATEGORY - Show colored text samples */}
                {colorHookState.colorCategory === 'text' && (
                  <>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.primary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Primary Text</h4>
                      <p style={{ color: currentColors.primary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.secondary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Secondary Text</h4>
                      <p style={{ color: currentColors.secondary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.success, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Success Text</h4>
                      <p style={{ color: currentColors.success, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.warning, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Warning Text</h4>
                      <p style={{ color: currentColors.warning, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.danger, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Danger Text</h4>
                      <p style={{ color: currentColors.danger, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                      <h4 style={{ color: currentColors.info, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Info Text</h4>
                      <p style={{ color: currentColors.info, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
                    </div>
                  </>
                )}

                {/* BORDERS CATEGORY - Show colored border samples */}
                {colorHookState.colorCategory === 'borders' && (
                  <>
                    <div style={{
                      border: `3px solid ${currentColors.primary}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Primary<br/>Border
                    </div>
                    <div style={{
                      border: `3px solid ${currentColors.secondary}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Secondary<br/>Border
                    </div>
                    <div style={{
                      border: `3px solid ${currentColors.success}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Success<br/>Border
                    </div>
                    <div style={{
                      border: `3px solid ${currentColors.warning}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Warning<br/>Border
                    </div>
                    <div style={{
                      border: `3px solid ${currentColors.danger}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Danger<br/>Border
                    </div>
                    <div style={{
                      border: `3px solid ${currentColors.info}`,
                      borderRadius: '8px',
                      padding: '15px',
                      minWidth: '100px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: 'white'
                    }}>
                      Info<br/>Border
                    </div>
                  </>
                )}
              </Box>
            </Box>

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

        {activeSection === 'tokens' && (
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
    </Box>
  );
};

export default LivePlayground;
