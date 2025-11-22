import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
import { Text } from '@layera/typography';
import { PlusIcon, SearchIcon, CheckIcon, CloseIcon, SettingsIcon, CompassIcon } from '@layera/icons';
import { ButtonState } from '../../hooks/useButtonState';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { useColorState } from '../../hooks/useColorState';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { ButtonPlaygroundProps, PlaygroundColors } from '../../types/unified-interfaces';

/**
 * ButtonsPlayground Component
 *
 * Enterprise-grade component για button testing και configuration
 * - Live preview area με διαφορετικά button shapes
 * - Controls grid για variant, size, text, icon, shape
 * - Current settings display
 * - Clean separation από main LivePlayground
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Well-defined props interface
 * - Single Responsibility Principle
 * Props interface moved to unified-interfaces.ts
 */

interface ExtendedButtonPlaygroundProps extends Omit<ButtonPlaygroundProps, 'currentColors'> {
  /** Button state από το useButtonState hook */
  buttonState: ButtonState;
  /** Current colors - μπορεί να είναι partial */
  currentColors?: Partial<PlaygroundColors>;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Button radius for styling */
  buttonRadius?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const ButtonsPlayground: React.FC<ExtendedButtonPlaygroundProps> = ({
  buttonState,
  colorCategory = 'borders',
  currentColors = {},
  borderWidth = 2,
  buttonRadius = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {
  // State για το Variables Info Popup
  const [showVariablesPopup, setShowVariablesPopup] = useState(false);
  // ✅ ARXES COMPLIANT: Χρήση κεντρικού hook για CSS Variables
  const { actions } = useCSSVariables();

  // ✅ Color State Hook για έλεγχο alpha preview mode
  const { state: colorHookState } = useColorState();

  // Helper function για translation του shape
  const getShapeInGreek = (shape: string) => {
    switch(shape) {
      case 'rectangular': return 'Παραλληλόγραμμο';
      case 'square': return 'Τετράγωνο';
      case 'rounded': return 'Στρογγυλό';
      default: return shape;
    }
  };

  // ✅ ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΔΙΠΛΟΤΥΠΩΝ FUNCTIONS - Χρήση κεντρικών helper functions
  const { getRadiusInGreek, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για πλήκτρα',
      `σχήματος ${getShapeInGreek(buttonState.shape)}`,
      `μεγέθους ${getSizeInGreek(buttonState.size)}`,
      buttonState.withIcon ? 'με εικονίδιο' : 'χωρίς εικονίδιο'
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(buttonRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

  // Helper function για εξαγωγή hex χρώματος από CSS variable ή απλό string
  const extractColor = (colorValue: string, fallback: string): string => {
    if (!colorValue) return fallback;
    if (colorValue.startsWith('#')) return colorValue;

    // Αν είναι CSS variable, εξάγει το fallback hex value
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : fallback;
  };

  // Helper function για border width token
  const getBorderWidthToken = (width: number): string => {
    return `var(--layera-global-borderWidth-${width})`;
  };

  // Dynamic colors with fallbacks using design tokens
  const colors = {
    primary: extractColor(currentColors.primary || '', 'var(--layera-colors-text-primary)'),
    secondary: extractColor(currentColors.secondary || '', 'var(--layera-colors-text-secondary)'),
    success: extractColor(currentColors.success || '', 'var(--layera-colors-primary-success)'),
    warning: extractColor(currentColors.warning || '', 'var(--layera-colors-primary-warning)'),
    danger: extractColor(currentColors.danger || '', 'var(--layera-colors-primary-danger)'),
    info: extractColor(currentColors.info || '', 'var(--layera-colors-status-info)')
  };

  // Border width για outline button
  const dynamicBorderWidth = getBorderWidthToken(borderWidth);

  // ✅ ARXES COMPLIANT: Χρήση κεντρικού hook για button color styling
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // ✅ RGBA PROTECTION: Δεν κάνουμε override αν υπάρχουν ήδη RGBA τιμές
      // Ελέγχουμε αν τα CSS variables έχουν ήδη rgba() τιμές
      const root = document.documentElement;

      // Apply each color individually using the enterprise pattern
      Object.entries(colors).forEach(([colorKey, colorValue]) => {
        const capitalizedKey = `${colorKey}Color`;
        const cssVariableName = `--layera-live-button-${colorKey}`;

        // Έλεγχος αν υπάρχει ήδη RGBA τιμή
        const currentValue = root.style.getPropertyValue(cssVariableName);

        if (currentValue && currentValue.includes('rgba(')) {
          return; // ΔΕΝ κάνουμε override αν υπάρχει RGBA
        }

        actions.applySpecificButtonColor(capitalizedKey, colorValue);
      });
    }
  }, [colors, actions, colorHookState?.elementType, colorHookState?.colorCategory]);

  return (
    <Box>
      {/* Live Preview Area - Ενοποιημένο με 6 χρωματιστά buttons */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πλήκτρα
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>


        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap-wrap layera-align-items--center">
          {/* Τα 6 χρωματιστά buttons με enterprise min-width + auto logic */}
          <Button
            variant="primary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'P' : 'Primary'}
          </Button>
          <Button
            variant="secondary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SettingsIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'S' : 'Secondary'}
          </Button>
          <Button
            variant="success"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'Su' : 'Success'}
          </Button>
          <Button
            variant="warning"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'W' : 'Warning'}
          </Button>
          <Button
            variant="danger"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'D' : 'Danger'}
          </Button>
          <Button
            variant="info"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SearchIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </Button>
          <Button
            variant="outline"
            size={buttonState.size}
            icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </Button>
          <Button
            variant="ghost"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CompassIcon size="sm" /> : undefined}
            className="layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </Button>
        </Box>

        {/* Information Icon για Button Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            ℹ️ Όλες οι Μεταβλητές Πλήκτρων
          </Button>
        </Box>
      </Box>

      {/* Variables Info Popup */}
      {showVariablesPopup && (
        <Box className="layera-position--fixed layera-top--0 layera-left--0 layera-width--full layera-height--full layera-bg--overlay layera-z-index--modal layera-flex layera-flex--justify-center layera-flex--align-center">
          <Box className="layera-bg--surface-primary layera-border-radius--lg layera-padding--xl layera-margin--md layera-width--modal-large layera-height--modal-large layera-overflow--auto layera-border--solid layera-border-width--2 layera-border-color--primary">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                🎯 Όλες οι Μεταβλητές Πλήκτρων
              </Text>
              <Button
                variant="ghost"
                size="sm"
                icon={<CloseIcon size="sm" />}
                onClick={() => setShowVariablesPopup(false)}
                className="layera-opacity--70 layera-hover--opacity-100"
              >
                ✕
              </Button>
            </Box>

            {/* Variables Table */}
            <Box className="layera-overflow--auto">
              <table className="layera-table layera-width--full layera-border--solid layera-border-width--1 layera-border-color--primary layera-border-radius--md">
                <thead className="layera-bg--surface-secondary">
                  <tr>
                    <th className="layera-padding--md layera-text--align-left layera-border-bottom--solid layera-border-width--1 layera-border-color--primary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🏷️ Κατηγορία</Text>
                    </th>
                    <th className="layera-padding--md layera-text--align-left layera-border-bottom--solid layera-border-width--1 layera-border-color--primary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🔧 CSS Variable</Text>
                    </th>
                    <th className="layera-padding--md layera-text--align-left layera-border-bottom--solid layera-border-width--1 layera-border-color--primary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎯 Selector</Text>
                    </th>
                    <th className="layera-padding--md layera-text--align-left layera-border-bottom--solid layera-border-width--1 layera-border-color--primary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">📋 HTML Attribute</Text>
                    </th>
                    <th className="layera-padding--md layera-text--align-left layera-border-bottom--solid layera-border-width--1 layera-border-color--primary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">✨ Τρέχουσα Τιμή</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Background Colors */}
                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--info">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Primary Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-primary</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="primary"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="primary"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Primary</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--info">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Secondary Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-secondary</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="secondary"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="secondary"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Secondary</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--success">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Success Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-success</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="success"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="success"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Success</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--warning">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Warning Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-warning</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="warning"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="warning"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Warning</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--danger">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Danger Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-danger</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="danger"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="danger"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Danger</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--info">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Info Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-info</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="info"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="info"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Info</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--secondary">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Outline Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-outline</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="outline"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="outline"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Outline</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--secondary">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎨 Ghost Φόντο</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-button-background-ghost</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="ghost"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--secondary">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-background="ghost"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">Ghost</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--success">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">📏 Μέγεθος</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-button-size</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-size="{buttonState.size}"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-size="{buttonState.size}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{buttonState.size}</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--warning">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🔷 Σχήμα</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-button-shape</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-shape="{buttonState.shape}"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--warning">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-shape="{buttonState.shape}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{buttonState.shape}</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--danger">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">📝 Κείμενο & Εικονίδια</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-button-content</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-text="{buttonState.text}"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-icon="{buttonState.withIcon ? 'enabled' : 'disabled'}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">"{buttonState.text}" | {buttonState.withIcon ? 'With Icon' : 'No Icon'}</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--info">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🌊 Καμπυλότητα</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-buttons-primary</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-radius="{buttonRadius}"]</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--info">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-radius="{buttonRadius}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{buttonRadius}</Text>
                    </td>
                  </tr>

                  <tr className="layera-border-bottom--dashed layera-border-width--1 layera-border-color--success">
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">⚡ Hover Effects</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-button-primary</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="primary"]:hover</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--success">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-hover="{hoverEffect}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{hoverEffect}</Text>
                    </td>
                  </tr>

                  <tr>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">🎯 Active Effects</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">--layera-live-button-primary</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">.layera-button[data-variant="primary"]:active</Text>
                    </td>
                    <td className="layera-padding--md layera-border-right--dashed layera-border-width--1 layera-border-color--danger">
                      <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">data-layera-button-active="{activeEffect}"</Text>
                    </td>
                    <td className="layera-padding--md">
                      <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{activeEffect}</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>

            {/* Footer */}
            <Box className="layera-margin-top--lg layera-text-center">
              <Text className="layera-typography" data-size="sm" data-color="secondary">
                💡 Αυτές είναι όλες οι CSS μεταβλητές που επηρεάζουν τα πλήκτρα
              </Text>
            </Box>
          </Box>
        </Box>
      )}

    </Box>
  );
};