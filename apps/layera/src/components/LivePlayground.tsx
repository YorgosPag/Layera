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

  // Color Settings - ENTERPRISE SINGLE SOURCE OF TRUTH
  const [colorCategory, setColorCategory] = useState<'buttons' | 'backgrounds' | 'text' | 'borders'>('buttons');
  const [primaryColor, setPrimaryColor] = useState('#007bff');
  const [secondaryColor, setSecondaryColor] = useState('#6c757d');
  const [successColor, setSuccessColor] = useState('#28a745');
  const [warningColor, setWarningColor] = useState('#ffc107');
  const [dangerColor, setDangerColor] = useState('#dc3545');
  const [infoColor, setInfoColor] = useState('#17a2b8');

  console.log('🎛️ Current states:', { activeSection, buttonVariant, buttonSize, buttonText, withIcon });

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const applyToApp = () => {
    console.log('🚀 Applied settings:', { buttonVariant, buttonSize, buttonText, withIcon });
    window.dispatchEvent(new CustomEvent('playgroundUpdate', {
      detail: { buttonVariant, buttonSize, buttonText, withIcon }
    }));
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
                {/* Rectangle Button */}
                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  icon={withIcon ? <PlusIcon size="sm" /> : undefined}
                  iconPosition="left"
                >
                  {buttonText}
                </Button>

                {/* Square Button */}
                <SquareButton
                  icon={<SearchIcon size="sm" />}
                  variant={buttonVariant}
                  size={buttonSize}
                  aria-label={`Τετράγωνο ${buttonVariant} πλήκτρο`}
                  tooltip={`Live ${buttonVariant} τετράγωνο`}
                />
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
                <Button variant="primary" size={buttonSize}>
                  Primary Color
                </Button>
                <Button variant="secondary" size={buttonSize}>
                  Secondary Color
                </Button>
                <Button variant="success" size={buttonSize}>
                  Success Color
                </Button>
                <Button variant="warning" size={buttonSize}>
                  Warning Color
                </Button>
                <Button variant="danger" size={buttonSize}>
                  Danger Color
                </Button>
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
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {primaryColor.toUpperCase()}
                </Text>
              </Box>

              {/* Secondary Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Secondary Color
                </h4>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {secondaryColor.toUpperCase()}
                </Text>
              </Box>

              {/* Success Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Success Color
                </h4>
                <input
                  type="color"
                  value={successColor}
                  onChange={(e) => setSuccessColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {successColor.toUpperCase()}
                </Text>
              </Box>

              {/* Warning Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Warning Color
                </h4>
                <input
                  type="color"
                  value={warningColor}
                  onChange={(e) => setWarningColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {warningColor.toUpperCase()}
                </Text>
              </Box>

              {/* Danger Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Danger Color
                </h4>
                <input
                  type="color"
                  value={dangerColor}
                  onChange={(e) => setDangerColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {dangerColor.toUpperCase()}
                </Text>
              </Box>

              {/* Info Color Control */}
              <Box className="layera-card layera-padding--lg">
                <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
                  Info Color
                </h4>
                <input
                  type="color"
                  value={infoColor}
                  onChange={(e) => setInfoColor(e.target.value)}
                  className="layera-input layera-width--full layera-margin-bottom--sm"
                />
                <Text className="layera-typography" data-size="sm" data-color="secondary">
                  {infoColor.toUpperCase()}
                </Text>
              </Box>
            </Box>

            {/* Apply Colors Button */}
            <Box className="layera-text-center layera-margin-bottom--xl">
              <Button
                variant="primary"
                size="lg"
                onClick={applyColorsToApp}
                className="layera-button layera-button--primary"
              >
                🚀 Εφαρμογή Χρωμάτων για {colorCategory.toUpperCase()}
              </Button>
              <Text className="layera-typography layera-margin-top--sm" data-size="xs" data-color="secondary">
                Θα επηρεαστούν όλα τα στοιχεία τύπου "{colorCategory}" στην εφαρμογή
              </Text>
            </Box>

            {/* Current Color Values Display */}
            <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
              <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="base" data-weight="semibold">
                🎨 Παλέτα Χρωμάτων για {colorCategory.toUpperCase()}:
              </h4>
              <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
{`{
  primary: "${primaryColor}",
  secondary: "${secondaryColor}",
  success: "${successColor}",
  warning: "${warningColor}",
  danger: "${dangerColor}",
  info: "${infoColor}"
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