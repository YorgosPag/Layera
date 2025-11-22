import React from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
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
  // ✅ ARXES COMPLIANT: Χρήση κεντρικού hook για CSS Variables
  const { actions } = useCSSVariables();

  // ✅ Color State Hook για έλεγχο alpha preview mode
  const { colorHookState } = useColorState();

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
    console.log('🏠 ButtonsPlayground useEffect TRIGGERED:', {
      colors,
      elementType: colorHookState?.elementType,
      colorCategory: colorHookState?.colorCategory
    });

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
          console.log('🚫 SKIPPING ButtonsPlayground - RGBA value exists:', { colorKey, currentValue });
          return; // ΔΕΝ κάνουμε override αν υπάρχει RGBA
        }

        console.log('🏠 ButtonsPlayground applying:', { colorKey, capitalizedKey, colorValue, currentValue });
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
            className="layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </Button>
          <Button
            variant="outline"
            size={buttonState.size}
            icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
            className={`layera-button layera-button--${buttonState.size} layera-button--outline layera-text--align-center`}
          >
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </Button>
          <Button
            variant="ghost"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CompassIcon size="sm" /> : undefined}
            className={`layera-button layera-button--${buttonState.size} layera-button--ghost layera-text--align-center`}
          >
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </Button>
        </Box>
      </Box>

    </Box>
  );
};