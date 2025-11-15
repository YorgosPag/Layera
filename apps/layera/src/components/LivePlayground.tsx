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

/**
 * Live Playground - Enterprise Component Testing Interface
 *
 * ARXES Compliant Live Testing Interface:
 * - Real-time component testing and configuration
 * - 🏗️ Enterprise CSS Variables management (single source of truth)
 * - Live color palette system with multiple button shapes
 * - 📱 Responsive fullscreen interface with organized sections
 * - 🔧 Direct integration with header button styling
 *
 * @author Claude Code - Enterprise Development Assistant
 * @version 2.0.0 - Refactored for clean enterprise architecture
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LivePlaygroundProps {
  onClose: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ onClose }) => {
  // console.log('🎮 LivePlayground φορτώνει...');

  // Authentication
  const { user } = useAuth();

  // ==============================
  // STATE MANAGEMENT
  // ==============================

  /** Active section in the playground interface */
  const [activeSection, setActiveSection] = useState<'buttons' | 'colors' | 'tokens'>('buttons');

  // Button Configuration
  /** Current button variant for testing */
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('secondary');
  /** Current button size for testing */
  const [buttonSize, setButtonSize] = useState<ButtonSize>('md');
  /** Text displayed on test buttons */
  const [buttonText, setButtonText] = useState('Live Button');
  /** Whether test buttons show icons */
  const [withIcon, setWithIcon] = useState(true);
  /** Button shape for button testing section */
  const [buttonShape, setButtonShape] = useState<'rectangular' | 'square' | 'rounded'>('rectangular');

  // Color Configuration
  /** Button shape for color testing (connected to header buttons) */
  const [colorButtonShape, setColorButtonShape] = useState<'rectangular' | 'square' | 'rounded'>('square');
  /** Color category being modified */
  const [colorCategory, setColorCategory] = useState<'buttons' | 'backgrounds' | 'text' | 'borders'>('buttons');

  // Color Palettes for Different Button Shapes
  /** Rectangular button color palette */
  const [rectPrimaryColor, setRectPrimaryColor] = useState('#007bff');
  const [rectSecondaryColor, setRectSecondaryColor] = useState('#6c757d');
  const [rectSuccessColor, setRectSuccessColor] = useState('#28a745');
  const [rectWarningColor, setRectWarningColor] = useState('#ffc107');
  const [rectDangerColor, setRectDangerColor] = useState('#dc3545');
  const [rectInfoColor, setRectInfoColor] = useState('#17a2b8');

  /** Square button color palette (connected to header buttons) */
  const [squarePrimaryColor, setSquarePrimaryColor] = useState('#FF4444');
  const [squareSecondaryColor, setSquareSecondaryColor] = useState('#44FF44');
  const [squareSuccessColor, setSquareSuccessColor] = useState('#4444FF');
  const [squareWarningColor, setSquareWarningColor] = useState('#FFAA00');
  const [squareDangerColor, setSquareDangerColor] = useState('#AA00FF');
  const [squareInfoColor, setSquareInfoColor] = useState('#00AAFF');

  /** Rounded button color palette */
  const [roundedPrimaryColor, setRoundedPrimaryColor] = useState('#800080');
  const [roundedSecondaryColor, setRoundedSecondaryColor] = useState('#008080');
  const [roundedSuccessColor, setRoundedSuccessColor] = useState('#808000');
  const [roundedWarningColor, setRoundedWarningColor] = useState('#FFA500');
  const [roundedDangerColor, setRoundedDangerColor] = useState('#FF6347');
  const [roundedInfoColor, setRoundedInfoColor] = useState('#4169E1');

  // Real-time preview hook for header buttons
  const { startPreview, isPreviewActive } = useRealTimePreview({
    onCommit: (key: string, value: string) => {
      // Update the actual color state when preview is committed
      if (key === 'secondaryColor') {
        setSquareSecondaryColor(value);
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
    switch (colorButtonShape) {
      case 'rectangular':
        return {
          primary: rectPrimaryColor, secondary: rectSecondaryColor, success: rectSuccessColor,
          warning: rectWarningColor, danger: rectDangerColor, info: rectInfoColor
        };
      case 'square':
        return {
          primary: squarePrimaryColor, secondary: squareSecondaryColor, success: squareSuccessColor,
          warning: squareWarningColor, danger: squareDangerColor, info: squareInfoColor
        };
      case 'rounded':
        return {
          primary: roundedPrimaryColor, secondary: roundedSecondaryColor, success: roundedSuccessColor,
          warning: roundedWarningColor, danger: roundedDangerColor, info: roundedInfoColor
        };
      default:
        return {
          primary: rectPrimaryColor, secondary: rectSecondaryColor, success: rectSuccessColor,
          warning: rectWarningColor, danger: rectDangerColor, info: rectInfoColor
        };
    }
  };

  const getCurrentSetters = () => {
    switch (colorButtonShape) {
      case 'rectangular':
        return {
          setPrimary: setRectPrimaryColor, setSecondary: setRectSecondaryColor, setSuccess: setRectSuccessColor,
          setWarning: setRectWarningColor, setDanger: setRectDangerColor, setInfo: setRectInfoColor
        };
      case 'square':
        return {
          setPrimary: setSquarePrimaryColor, setSecondary: setSquareSecondaryColor, setSuccess: setSquareSuccessColor,
          setWarning: setSquareWarningColor, setDanger: setSquareDangerColor, setInfo: setSquareInfoColor
        };
      case 'rounded':
        return {
          setPrimary: setRoundedPrimaryColor, setSecondary: setRoundedSecondaryColor, setSuccess: setRoundedSuccessColor,
          setWarning: setRoundedWarningColor, setDanger: setRoundedDangerColor, setInfo: setRoundedInfoColor
        };
      default:
        return {
          setPrimary: setRectPrimaryColor, setSecondary: setRectSecondaryColor, setSuccess: setRectSuccessColor,
          setWarning: setRectWarningColor, setDanger: setRectDangerColor, setInfo: setRectInfoColor
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
  /** Available button variants for testing */
  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
  /** Available button sizes for testing */
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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
        if (savedState.buttonShape && savedState.buttonShape !== colorButtonShape) {
          setColorButtonShape(savedState.buttonShape);
        }

        if (savedState.colorCategory && savedState.colorCategory !== colorCategory) {
          setColorCategory(savedState.colorCategory);
        }

        // Εφαρμογή χρωμάτων ανάλογα με το σχήμα
        if (savedState.buttonShape === 'square') {
          setSquarePrimaryColor(savedState.primaryColor || squarePrimaryColor);
          setSquareSecondaryColor(savedState.secondaryColor || squareSecondaryColor);
          setSquareSuccessColor(savedState.successColor || squareSuccessColor);
          setSquareWarningColor(savedState.warningColor || squareWarningColor);
          setSquareDangerColor(savedState.dangerColor || squareDangerColor);
          setSquareInfoColor(savedState.infoColor || squareInfoColor);
        } else if (savedState.buttonShape === 'rectangular') {
          setRectPrimaryColor(savedState.primaryColor || rectPrimaryColor);
          setRectSecondaryColor(savedState.secondaryColor || rectSecondaryColor);
          setRectSuccessColor(savedState.successColor || rectSuccessColor);
          setRectWarningColor(savedState.warningColor || rectWarningColor);
          setRectDangerColor(savedState.dangerColor || rectDangerColor);
          setRectInfoColor(savedState.infoColor || rectInfoColor);
        } else if (savedState.buttonShape === 'rounded') {
          setRoundedPrimaryColor(savedState.primaryColor || roundedPrimaryColor);
          setRoundedSecondaryColor(savedState.secondaryColor || roundedSecondaryColor);
          setRoundedSuccessColor(savedState.successColor || roundedSuccessColor);
          setRoundedWarningColor(savedState.warningColor || roundedWarningColor);
          setRoundedDangerColor(savedState.dangerColor || roundedDangerColor);
          setRoundedInfoColor(savedState.infoColor || roundedInfoColor);
        }

      } else {
      }
    } catch (error) {
      console.error('⚠️ Σφάλμα φόρτωσης χρωμάτων:', error);
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
      detail: { buttonVariant, buttonSize, buttonText, withIcon }
    }));
  };

  // ==============================
  // CSS VARIABLES MANAGEMENT
  // ==============================

  /**
   * Enterprise CSS Variables Management
   * Δημιουργεί και διαχειρίζεται CSS μεταβλητές για μοναδική πηγή αλήθειας
   */
  const ensureCSSVariablesExist = () => {
    const root = document.documentElement;

    // Δημιουργώ τις CSS μεταβλητές αν δεν υπάρχουν
    root.style.setProperty('--layera-btn-secondary-bg', currentColors.secondary);
    root.style.setProperty('--layera-btn-secondary-border', currentColors.secondary);
    root.style.setProperty('--layera-btn-secondary-color', '#ffffff');
    root.style.setProperty('--layera-btn-secondary-hover-bg', currentColors.secondary + 'CC');
    root.style.setProperty('--layera-btn-secondary-hover-border', currentColors.secondary + 'CC');

    // Εξασφαλίζω ότι υπάρχουν τα CSS rules
    let customStyle = document.getElementById('layera-css-variables');
    if (!customStyle) {
      customStyle = document.createElement('style');
      customStyle.id = 'layera-css-variables';
      document.head.appendChild(customStyle);

      customStyle.textContent = `
        .layera-btn--secondary {
          background-color: var(--layera-btn-secondary-bg) !important;
          border-color: var(--layera-btn-secondary-border) !important;
          color: var(--layera-btn-secondary-color) !important;
        }
        .layera-btn--secondary:hover {
          background-color: var(--layera-btn-secondary-hover-bg) !important;
          border-color: var(--layera-btn-secondary-hover-border) !important;
        }
      `;
    }
  };

  /**
   * Εφαρμόζει χρώματα στα header buttons μέσω CSS Variables
   * Μοναδική πηγή αλήθειας για το styling των secondary buttons
   */
  const applySquareColorsToHeader = () => {
    // Εξασφαλίζω ότι υπάρχουν οι CSS μεταβλητές και rules
    ensureCSSVariablesExist();
  };

  // ENTERPRISE COLOR APPLICATION - TARGETED CSS VARIABLES UPDATE
  const applyColorsToApp = async () => {
    const root = document.documentElement;
    const colorMap = {
      buttons: {
        primary: `--layera-btn-primary-bg`,
        secondary: `--layera-btn-secondary-bg`,
        success: `--layera-btn-success-bg`,
        warning: `--layera-btn-warning-bg`,
        danger: `--layera-btn-danger-bg`,
        info: `--layera-btn-info-bg`
      },
      backgrounds: {
        primary: `--layera-color-bg-primary`,
        secondary: `--layera-color-bg-secondary`,
        success: `--layera-color-bg-success`,
        warning: `--layera-color-bg-warning`,
        danger: `--layera-color-bg-danger`,
        info: `--layera-color-bg-info`
      },
      text: {
        primary: `--layera-color-text-primary`,
        secondary: `--layera-color-text-secondary`,
        success: `--layera-color-text-success`,
        warning: `--layera-color-text-warning`,
        danger: `--layera-color-text-danger`,
        info: `--layera-color-text-info`
      },
      borders: {
        primary: `--layera-color-border-primary`,
        secondary: `--layera-color-border-secondary`,
        success: `--layera-color-border-success`,
        warning: `--layera-color-border-warning`,
        danger: `--layera-color-border-danger`,
        info: `--layera-color-border-info`
      }
    };

    const categoryColors = colorMap[colorCategory];
    const currentColors = getCurrentColors();

    if (colorCategory === 'buttons') {
      // Εφαρμογή χρωμάτων για buttons (background, color, border)
      const oldBg = root.style.getPropertyValue('--layera-btn-secondary-bg') || 'not set';

      root.style.setProperty('--layera-btn-secondary-bg', currentColors.secondary);
      root.style.setProperty('--layera-btn-secondary-color', '#ffffff');
      root.style.setProperty('--layera-btn-secondary-border', currentColors.secondary);

      // EMERGENCY OVERRIDE - Δυνατό CSS injection για άμεση εφαρμογή
      const emergencyStyle = `
        .layera-btn-secondary {
          background-color: ${currentColors.secondary} !important;
          border-color: ${currentColors.secondary} !important;
          color: #ffffff !important;
        }
      `;

      // Αφαίρεση παλιού emergency style αν υπάρχει
      const oldEmergencyStyle = document.getElementById('layera-emergency-button-style');
      if (oldEmergencyStyle) {
        oldEmergencyStyle.remove();
      }

      // Προσθήκη νέου emergency style
      const styleElement = document.createElement('style');
      styleElement.id = 'layera-emergency-button-style';
      styleElement.textContent = emergencyStyle;
      document.head.appendChild(styleElement);


      const newBg = root.style.getPropertyValue('--layera-btn-secondary-bg');


      // Διπλός έλεγχος - ας δούμε αν το CSS variable υπάρχει στο DOM
      const computedStyle = getComputedStyle(document.documentElement);
      const computedBg = computedStyle.getPropertyValue('--layera-btn-secondary-bg');
    } else {
      // Εφαρμογή για άλλες κατηγορίες (backgrounds, text, borders)
      root.style.setProperty(categoryColors.primary, currentColors.primary);
      root.style.setProperty(categoryColors.secondary, currentColors.secondary);
      root.style.setProperty(categoryColors.success, currentColors.success);
      root.style.setProperty(categoryColors.warning, currentColors.warning);
      root.style.setProperty(categoryColors.danger, currentColors.danger);
      root.style.setProperty(categoryColors.info, currentColors.info);
    }


    // Αποθήκευση στο Firebase
    const colorState = {
      colorCategory,
      buttonShape: colorButtonShape,
      primaryColor: currentColors.primary,
      secondaryColor: currentColors.secondary,
      successColor: currentColors.success,
      warningColor: currentColors.warning,
      dangerColor: currentColors.danger,
      infoColor: currentColors.info
    };

    // Αποθήκευση και στο localStorage για γρήγορη φόρτωση
    try {
      localStorage.setItem('layera-current-theme', JSON.stringify(colorState));
    } catch (error) {
      console.warn('⚠️ Σφάλμα αποθήκευσης στο localStorage:', error);
    }

    // Αποθήκευση στο Firebase (μόνο αν είναι διαθέσιμο)
    const hasRealFirebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key';

    if (hasRealFirebaseConfig) {
      try {
        const themeId = await saveColorTheme(colorState, user || undefined, `${colorCategory}-theme-${Date.now()}`);
      } catch (error) {
        console.error('⚠️ Σφάλμα αποθήκευσης στο Firebase:', error);
      }
    } else {
      // Firebase disabled (demo credentials), χρησιμοποιούμε μόνο localStorage
    }

    window.dispatchEvent(new CustomEvent('colorsUpdate', {
      detail: { category: colorCategory, ...currentColors }
    }));
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
                {buttonShape === 'rectangular' && (
                  <Button
                    variant={buttonVariant}
                    size={buttonSize}
                    icon={withIcon ? <PlusIcon size="sm" /> : undefined}
                    iconPosition="left"
                  >
                    {buttonText}
                  </Button>
                )}

                {/* Square Button */}
                {buttonShape === 'square' && (
                  <SquareButton
                    icon={<SearchIcon size="sm" />}
                    variant={buttonVariant}
                    size={buttonSize}
                    aria-label={`Τετράγωνο ${buttonVariant} πλήκτρο`}
                    tooltip={`Live ${buttonVariant} τετράγωνο`}
                  />
                )}

                {/* Rounded Button */}
                {buttonShape === 'rounded' && (
                  <button
                    style={{
                      backgroundColor: buttonVariant === 'primary' ? '#007bff' : buttonVariant === 'secondary' ? '#6c757d' : '#28a745',
                      color: 'white',
                      padding: buttonSize === 'xs' ? '4px 12px' : buttonSize === 'sm' ? '6px 16px' : buttonSize === 'md' ? '8px 20px' : buttonSize === 'lg' ? '12px 24px' : '16px 32px',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontSize: buttonSize === 'xs' ? '12px' : buttonSize === 'sm' ? '14px' : buttonSize === 'md' ? '16px' : buttonSize === 'lg' ? '18px' : '20px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {withIcon && <span>⚪</span>}
                    {buttonText}
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
                  {variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={buttonVariant === variant ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setButtonVariant(variant)}
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
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={buttonSize === size ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setButtonSize(size)}
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
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Button
                  variant={withIcon ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setWithIcon(!withIcon)}
                >
                  {withIcon ? <><CheckIcon size="sm" /> Με εικονίδιο</> : <><CloseIcon size="sm" /> Χωρίς εικονίδιο</>}
                </Button>
              </Box>

              {/* Shape Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Σχήμα Πλήκτρου
                </h4>
                <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                  <Button
                    variant={buttonShape === 'rectangular' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setButtonShape('rectangular')}
                  >
                    <RulerIcon size="sm" /> Παραλληλόγραμμο
                  </Button>
                  <Button
                    variant={buttonShape === 'square' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setButtonShape('square')}
                  >
                    <PolygonIcon size="sm" /> Τετράγωνο
                  </Button>
                  <Button
                    variant={buttonShape === 'rounded' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setButtonShape('rounded')}
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
  variant: "${buttonVariant}",
  size: "${buttonSize}",
  text: "${buttonText}",
  withIcon: ${withIcon}
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
              className={`layera-grid layera-margin-bottom--xl ${colorCategory === 'buttons' ? 'layera-grid--gap-lg' : ''}`}
              style={{
                gridTemplateColumns: colorCategory === 'buttons' ? '1fr 1fr' : '1fr'
              } as React.CSSProperties}
            >
              {/* Color Category Selection */}
              <Box className="layera-card layera-padding--lg">
                <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                  <CheckIcon size="sm" /> Επιλογή Κατηγορίας Αντικειμένων
                </h3>
                <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                  <Button
                    variant={colorCategory === 'buttons' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorCategory('buttons')}
                  >
                    <PaletteIcon size="sm" /> Buttons
                  </Button>
                  <Button
                    variant={colorCategory === 'backgrounds' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorCategory('backgrounds')}
                  >
                    <LayersIcon size="sm" /> Backgrounds
                  </Button>
                  <Button
                    variant={colorCategory === 'text' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorCategory('text')}
                  >
                    <EditIcon size="sm" /> Text
                  </Button>
                  <Button
                    variant={colorCategory === 'borders' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorCategory('borders')}
                  >
                    <PolygonIcon size="sm" /> Borders
                  </Button>
                </Box>
                <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
                  Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
                </Text>
              </Box>

              {/* Button Shape Selection - Only for Buttons Category */}
              {colorCategory === 'buttons' && (
                <Box className="layera-card layera-padding--lg">
                  <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                    <PaletteIcon size="sm" /> Σχήμα Πλήκτρων Preview
                  </h3>
                  <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                    <Button
                      variant={colorButtonShape === 'rectangular' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setColorButtonShape('rectangular')}
                    >
                      <RulerIcon size="sm" /> Παραλληλόγραμμα
                    </Button>
                    <Button
                      variant={colorButtonShape === 'square' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setColorButtonShape('square');
                      }}
                    >
                      <PolygonIcon size="sm" /> Τετράγωνα
                    </Button>
                    <Button
                      variant={colorButtonShape === 'rounded' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setColorButtonShape('rounded')}
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
                <PaletteIcon size="md" /> Live Preview - {colorCategory.toUpperCase()}
              </h3>
              <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
                {colorCategory === 'buttons' && <><PaletteIcon size="sm" /> Τα χρώματα θα επηρεάσουν όλα τα κουμπιά στην εφαρμογή</>}
                {colorCategory === 'backgrounds' && <><LayersIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα φόντα στην εφαρμογή</>}
                {colorCategory === 'text' && <><EditIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα κείμενα στην εφαρμογή</>}
                {colorCategory === 'borders' && <><PolygonIcon size="sm" /> Τα χρώματα θα επηρεάσουν τα περιγράμματα στην εφαρμογή</>}
              </Text>

              <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-xl">
                <button style={{
                  backgroundColor: currentColors.primary,
                  color: 'white',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'P' : 'Primary Color'}
                </button>
                <button style={{
                  backgroundColor: currentColors.secondary,
                  color: 'white',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'S' : 'Secondary Color'}
                </button>
                <button style={{
                  backgroundColor: currentColors.success,
                  color: 'white',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'Su' : 'Success Color'}
                </button>
                <button style={{
                  backgroundColor: currentColors.warning,
                  color: 'black',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'W' : 'Warning Color'}
                </button>
                <button style={{
                  backgroundColor: currentColors.danger,
                  color: 'white',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'D' : 'Danger Color'}
                </button>
                <button style={{
                  backgroundColor: currentColors.info,
                  color: 'white',
                  padding: colorButtonShape === 'square' ? '16px' : '8px 16px',
                  border: 'none',
                  borderRadius: colorButtonShape === 'rounded' ? '50px' : colorButtonShape === 'square' ? '6px' : '6px',
                  cursor: 'pointer',
                  minWidth: colorButtonShape === 'square' ? '50px' : 'auto',
                  height: colorButtonShape === 'square' ? '50px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {colorButtonShape === 'square' ? 'I' : 'Info Color'}
                </button>
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
                  <RocketIcon size="sm" /> Εφαρμογή Χρωμάτων για {colorCategory.toUpperCase()}
                </Button>

                {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για buttons + square */}
                {colorCategory === 'buttons' && colorButtonShape === 'square' && (
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
                {colorCategory === 'buttons' && colorButtonShape === 'square'
                  ? 'Εφαρμόστε τα χρώματα των τετράγωνων πλήκτρων στην επικεφαλίδα'
                  : `Θα επηρεαστούν όλα τα στοιχεία τύπου "${colorCategory}" στην εφαρμογή`
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
                  <PaletteIcon size="sm" /> Παλέτα Χρωμάτων για {colorCategory.toUpperCase()}:
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
                  🔧 CSS Μεταβλητές για {colorCategory.toUpperCase()}{colorCategory === 'buttons' ? ` (${colorButtonShape})` : ''}:
                </h4>
                <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
                  {colorCategory === 'buttons' && colorButtonShape === 'rectangular' && `{
  --layera-color-button-primary: "${currentColors.primary}",
  --layera-color-button-secondary: "${currentColors.secondary}",
  --layera-color-button-success: "${currentColors.success}",
  --layera-color-button-warning: "${currentColors.warning}",
  --layera-color-button-danger: "${currentColors.danger}",
  --layera-color-button-info: "${currentColors.info}"
}`}
                  {colorCategory === 'buttons' && colorButtonShape === 'square' && `{
  --layera-color-button-square-primary: "${currentColors.primary}",
  --layera-color-button-square-secondary: "${currentColors.secondary}",
  --layera-color-button-square-success: "${currentColors.success}",
  --layera-color-button-square-warning: "${currentColors.warning}",
  --layera-color-button-square-danger: "${currentColors.danger}",
  --layera-color-button-square-info: "${currentColors.info}"
}`}
                  {colorCategory === 'buttons' && colorButtonShape === 'rounded' && `{
  --layera-color-button-rounded-primary: "${currentColors.primary}",
  --layera-color-button-rounded-secondary: "${currentColors.secondary}",
  --layera-color-button-rounded-success: "${currentColors.success}",
  --layera-color-button-rounded-warning: "${currentColors.warning}",
  --layera-color-button-rounded-danger: "${currentColors.danger}",
  --layera-color-button-rounded-info: "${currentColors.info}"
}`}
                  {colorCategory === 'backgrounds' && `{
  --layera-color-bg-primary: "${currentColors.primary}",
  --layera-color-bg-secondary: "${currentColors.secondary}",
  --layera-color-bg-success: "${currentColors.success}",
  --layera-color-bg-warning: "${currentColors.warning}",
  --layera-color-bg-danger: "${currentColors.danger}",
  --layera-color-bg-info: "${currentColors.info}"
}`}
                  {colorCategory === 'text' && `{
  --layera-color-text-primary: "${currentColors.primary}",
  --layera-color-text-secondary: "${currentColors.secondary}",
  --layera-color-text-success: "${currentColors.success}",
  --layera-color-text-warning: "${currentColors.warning}",
  --layera-color-text-danger: "${currentColors.danger}",
  --layera-color-text-info: "${currentColors.info}"
}`}
                  {colorCategory === 'borders' && `{
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
