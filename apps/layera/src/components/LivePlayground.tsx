import React, { useState, useEffect } from 'react';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon } from '@layera/icons';

/**
 * Live Playground - Ζωντανή δοκιμή components σε πραγματικό χρόνο
 *
 * ARXES Compliant Live Testing Interface:
 * - Άμεση προεπισκόπηση αλλαγών στα buttons της εφαρμογής
 * - Live ρυθμίσεις που επηρεάζουν τα πραγματικά components
 * - Πλήρης συμμόρφωση με enterprise standards
 * - Fullscreen interface με καρτέλες
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LivePlaygroundProps {
  onClose: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ onClose }) => {
  console.log('🔍 LivePlayground component rendered!');

  // Debug CSS tokens
  useEffect(() => {
    console.log('🎨 Checking CSS tokens...');

    // Ελέγχω αν τα CSS custom properties λειτουργούν
    const testElement = document.createElement('div');
    testElement.style.color = 'var(--layera-color-text-primary)';
    document.body.appendChild(testElement);
    const computedColor = getComputedStyle(testElement).color;
    document.body.removeChild(testElement);

    if (computedColor !== 'var(--layera-color-text-primary)' && computedColor !== '') {
      console.log('🎯 CSS tokens are working! Test color:', computedColor);
    } else {
      console.warn('⚠️ CSS tokens not working yet...');
    }
  }, []);
  const [activeSection, setActiveSection] = useState<'buttons' | 'colors' | 'tokens'>('buttons');

  // Button Settings
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('secondary');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('md');
  const [buttonText, setButtonText] = useState('Live Button');
  const [withIcon, setWithIcon] = useState(true);
  const [buttonShape, setButtonShape] = useState<'rectangular' | 'square' | 'rounded'>('rectangular');

  // Color Settings - ENTERPRISE SINGLE SOURCE OF TRUTH
  const [colorButtonShape, setColorButtonShape] = useState<'rectangular' | 'square' | 'rounded'>('rectangular');
  const [colorCategory, setColorCategory] = useState<'buttons' | 'backgrounds' | 'text' | 'borders'>('buttons');

  // Rectangular Button Colors
  const [rectPrimaryColor, setRectPrimaryColor] = useState('#007bff');
  const [rectSecondaryColor, setRectSecondaryColor] = useState('#6c757d');
  const [rectSuccessColor, setRectSuccessColor] = useState('#28a745');
  const [rectWarningColor, setRectWarningColor] = useState('#ffc107');
  const [rectDangerColor, setRectDangerColor] = useState('#dc3545');
  const [rectInfoColor, setRectInfoColor] = useState('#17a2b8');

  // Square Button Colors
  const [squarePrimaryColor, setSquarePrimaryColor] = useState('#FF4444');
  const [squareSecondaryColor, setSquareSecondaryColor] = useState('#44FF44');
  const [squareSuccessColor, setSquareSuccessColor] = useState('#4444FF');
  const [squareWarningColor, setSquareWarningColor] = useState('#FFAA00');
  const [squareDangerColor, setSquareDangerColor] = useState('#AA00FF');
  const [squareInfoColor, setSquareInfoColor] = useState('#00AAFF');

  // Rounded Button Colors
  const [roundedPrimaryColor, setRoundedPrimaryColor] = useState('#800080');
  const [roundedSecondaryColor, setRoundedSecondaryColor] = useState('#008080');
  const [roundedSuccessColor, setRoundedSuccessColor] = useState('#808000');
  const [roundedWarningColor, setRoundedWarningColor] = useState('#FFA500');
  const [roundedDangerColor, setRoundedDangerColor] = useState('#FF6347');
  const [roundedInfoColor, setRoundedInfoColor] = useState('#4169E1');

  // Helper functions to get colors based on shape
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

  const currentColors = getCurrentColors();
  const currentSetters = getCurrentSetters();

  console.log('🎛️ Current states:', { activeSection, buttonVariant, buttonSize, buttonText, withIcon });

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const applyToApp = () => {
    console.log('🚀 Applied settings:', { buttonVariant, buttonSize, buttonText, withIcon });
    window.dispatchEvent(new CustomEvent('playgroundUpdate', {
      detail: { buttonVariant, buttonSize, buttonText, withIcon }
    }));
  };

  // ΕΦΑΡΜΟΓΗ ΧΡΩΜΑΤΩΝ ΤΕΤΡΑΓΩΝΩΝ ΠΛΗΚΤΡΩΝ ΣΤΗΝ ΕΠΙΚΕΦΑΛΙΔΑ
  const applySquareColorsToHeader = () => {
    const root = document.documentElement;

    // Εφαρμόζουμε τα χρώματα των square buttons στην επικεφαλίδα
    // Όλα τα SquareButton της επικεφαλίδας είναι variant="secondary"
    root.style.setProperty('--layera-color-button-secondary', currentColors.secondary);

    console.log('🎯 Square colors applied to header:', {
      secondary: currentColors.secondary,
      shape: colorButtonShape
    });
  };

  // ENTERPRISE COLOR APPLICATION - TARGETED CSS VARIABLES UPDATE
  const applyColorsToApp = () => {
    const root = document.documentElement;
    const colorMap = {
      buttons: {
        primary: `--layera-color-button-primary`,
        secondary: `--layera-color-button-secondary`,
        success: `--layera-color-button-success`,
        warning: `--layera-color-button-warning`,
        danger: `--layera-color-button-danger`,
        info: `--layera-color-button-info`
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
    root.style.setProperty(categoryColors.primary, primaryColor);
    root.style.setProperty(categoryColors.secondary, secondaryColor);
    root.style.setProperty(categoryColors.success, successColor);
    root.style.setProperty(categoryColors.warning, warningColor);
    root.style.setProperty(categoryColors.danger, dangerColor);
    root.style.setProperty(categoryColors.info, infoColor);

    console.log(`🎨 Applied ${colorCategory} colors:`, {
      primaryColor, secondaryColor, successColor, warningColor, dangerColor, infoColor
    });

    window.dispatchEvent(new CustomEvent('colorsUpdate', {
      detail: { category: colorCategory, primaryColor, secondaryColor, successColor, warningColor, dangerColor, infoColor }
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
          🎛️ Live Playground - Ζωντανές Ρυθμίσεις
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
          ✅ ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs */}
        <Box className="layera-flex layera-flex--gap-sm layera-margin-bottom--lg layera-padding--md layera-border-radius--md layera-bg-semantic--neutral-light">
          <Button
            variant={activeSection === 'buttons' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('buttons')}
          >
            🔘 Buttons
          </Button>
          <Button
            variant={activeSection === 'colors' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('colors')}
          >
            🎨 Colors
          </Button>
          <Button
            variant={activeSection === 'tokens' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('tokens')}
          >
            ⚙️ Tokens
          </Button>
        </Box>

        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <Box>
            {/* Live Preview Area */}
            <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
              <h3 className="layera-typography layera-margin-bottom--xl" data-size="lg" data-weight="bold" data-color="primary">
                🎯 Live Preview
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
                  {withIcon ? '✅ Με εικονίδιο' : '❌ Χωρίς εικονίδιο'}
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
                    📐 Παραλληλόγραμμο
                  </Button>
                  <Button
                    variant={buttonShape === 'square' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setButtonShape('square')}
                  >
                    ⬜ Τετράγωνο
                  </Button>
                  <Button
                    variant={buttonShape === 'rounded' ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setButtonShape('rounded')}
                  >
                    🔵 Στρογγυλό
                  </Button>
                </Box>
              </Box>
            </Box>


            {/* Current Settings Display */}
            <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
              <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                📝 Τρέχουσες Ρυθμίσεις:
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
            {/* Color Category Selection */}
            <Box className="layera-card layera-padding--lg layera-margin-bottom--xl">
              <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                🎯 Επιλογή Κατηγορίας Αντικειμένων
              </h3>
              <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                <Button
                  variant={colorCategory === 'buttons' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setColorCategory('buttons')}
                >
                  🔘 Buttons
                </Button>
                <Button
                  variant={colorCategory === 'backgrounds' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setColorCategory('backgrounds')}
                >
                  🎨 Backgrounds
                </Button>
                <Button
                  variant={colorCategory === 'text' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setColorCategory('text')}
                >
                  📝 Text
                </Button>
                <Button
                  variant={colorCategory === 'borders' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setColorCategory('borders')}
                >
                  🔲 Borders
                </Button>
              </Box>
              <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
                Επιλέξτε ποια αντικείμενα θα επηρεάσουν οι αλλαγές χρωμάτων
              </Text>
            </Box>

            {/* Button Shape Selection - Only for Buttons Category */}
            {colorCategory === 'buttons' && (
              <Box className="layera-card layera-padding--lg layera-margin-bottom--xl">
                <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                  🔘 Σχήμα Πλήκτρων Preview
                </h3>
                <Box className="layera-flex layera-flex--wrap layera-flex--gap-sm">
                  <Button
                    variant={colorButtonShape === 'rectangular' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorButtonShape('rectangular')}
                  >
                    📐 Παραλληλόγραμμα
                  </Button>
                  <Button
                    variant={colorButtonShape === 'square' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorButtonShape('square')}
                  >
                    ⬜ Τετράγωνα
                  </Button>
                  <Button
                    variant={colorButtonShape === 'rounded' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setColorButtonShape('rounded')}
                  >
                    🔵 Στρογγυλά
                  </Button>
                </Box>
                <Text className="layera-typography layera-margin-top--sm" data-size="sm" data-color="secondary">
                  Επιλέξτε το σχήμα των πλήκτρων στην προεπισκόπηση χρωμάτων
                </Text>
              </Box>
            )}

            {/* Live Color Preview Area */}
            <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
              <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
                🎨 Live Preview - {colorCategory.toUpperCase()}
              </h3>
              <Text className="layera-typography layera-margin-bottom--lg" data-size="sm" data-color="secondary">
                {colorCategory === 'buttons' && '🔘 Τα χρώματα θα επηρεάσουν όλα τα κουμπιά στην εφαρμογή'}
                {colorCategory === 'backgrounds' && '🎨 Τα χρώματα θα επηρεάσουν τα φόντα στην εφαρμογή'}
                {colorCategory === 'text' && '📝 Τα χρώματα θα επηρεάσουν τα κείμενα στην εφαρμογή'}
                {colorCategory === 'borders' && '🔲 Τα χρώματα θα επηρεάσουν τα περιγράμματα στην εφαρμογή'}
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
              className="layera-grid layera-grid--gap-xl layera-margin-bottom--xl"
              style={{
                gridTemplateColumns: 'var(--layera-global-gridTemplateColumns-autoFit)'
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
                  onChange={(e) => currentSetters.setSecondary(e.target.value)}
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
                  🚀 Εφαρμογή Χρωμάτων για {colorCategory.toUpperCase()}
                </Button>

                {/* Κουμπί για εφαρμογή στην επικεφαλίδα - μόνο για buttons + square */}
                {colorCategory === 'buttons' && colorButtonShape === 'square' && (
                  <Button
                    variant="success"
                    size="lg"
                    onClick={applySquareColorsToHeader}
                    className="layera-button layera-button--success"
                  >
                    🎯 Εφαρμογή στην Επικεφαλίδα
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

            {/* Current Color Values Display */}
            <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
              <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                🎨 Παλέτα Χρωμάτων για {colorCategory.toUpperCase()}:
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
          </Box>
        )}

        {activeSection === 'tokens' && (
          <Box className="layera-flex layera-flex--direction-column layera-flex--justify-center layera-text-center layera-padding--2xl layera-min-height--card">
            <h2 className="layera-typography layera-margin-bottom--lg layera-text-color--neutral-medium" data-size="2xl">
              🚧 Tokens Playground
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