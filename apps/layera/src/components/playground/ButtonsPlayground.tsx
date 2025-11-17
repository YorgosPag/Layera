import React from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, CheckIcon, CloseIcon, SettingsIcon, RulerIcon, PolygonIcon, CompassIcon } from '@layera/icons';
import { ButtonState } from '../../hooks/useButtonState';

// Dynamic CSS injection που διατηρεί 100% την ίδια εμφάνιση
const injectDynamicStyles = (colors: any, buttonState: any, dynamicBorderWidth: string) => {
  const styleId = 'layera-dynamic-button-styles';
  let existingStyle = document.getElementById(styleId);

  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .layera-outline-dynamic {
      background-color: transparent !important;
      color: ${colors.primary} !important;
      padding: ${buttonState.shape === 'square' ? '16px' : '8px 16px'} !important;
      border: ${dynamicBorderWidth} solid ${colors.primary} !important;
      border-radius: ${buttonState.shape === 'rounded' ? 'var(--layera-icon-performance-performance-loading-lazy-root-margin)' : buttonState.shape === 'square' ? '6px' : '6px'} !important;
      cursor: var(--layera-global-cursor-pointer) !important;
      min-width: ${buttonState.shape === 'square' ? 'var(--layera-icon-performance-performance-loading-lazy-root-margin)' : '120px'} !important;
      height: ${buttonState.shape === 'square' ? 'var(--layera-icon-performance-performance-loading-lazy-root-margin)' : 'auto'} !important;
      display: var(--layera-global-layout-display-flex) !important;
      align-items: var(--layera-global-align-items-center) !important;
      justify-content: var(--layera-global-justify-content-center) !important;
      gap: 6px !important;
      font-size: ${buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'} !important;
    }

    .layera-ghost-dynamic {
      background-color: transparent !important;
      color: ${colors.secondary} !important;
      padding: ${buttonState.shape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: var(--layera-global-border-none) !important;
      border-radius: ${buttonState.shape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: var(--layera-global-cursor-pointer) !important;
      min-width: ${buttonState.shape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${buttonState.shape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: var(--layera-global-layout-display-flex) !important;
      align-items: var(--layera-global-align-items-center) !important;
      justify-content: var(--layera-global-justify-content-center) !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: ${buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'} !important;
    }
  `;

  document.head.appendChild(style);
};


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
 */

interface ButtonsPlaygroundProps {
  /** Button state από το useButtonState hook */
  buttonState: ButtonState;
  /** Color category for description */
  colorCategory?: string;
  /** Current colors for live preview from color state */
  currentColors?: Record<string, string>;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Button radius for styling */
  buttonRadius?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const ButtonsPlayground: React.FC<ButtonsPlaygroundProps> = ({
  buttonState,
  colorCategory = 'borders',
  currentColors = {},
  borderWidth = 2,
  buttonRadius = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Helper function για translation του shape
  const getShapeInGreek = (shape: string) => {
    switch(shape) {
      case 'rectangular': return 'Παραλληλόγραμμο';
      case 'square': return 'Τετράγωνο';
      case 'rounded': return 'Στρογγυλό';
      default: return shape;
    }
  };

  // Helper function για translation των radius values
  const getRadiusInGreek = (radius: string) => {
    switch(radius) {
      case 'none': return 'χωρίς καμπυλότητα';
      case 'xs': return 'ελαφρά καμπυλότητα';
      case 'sm': return 'μικρή καμπυλότητα';
      case 'md': return 'μεσαία καμπυλότητα';
      case 'lg': return 'μεγάλη καμπυλότητα';
      case 'xl': return 'πολύ μεγάλη καμπυλότητα';
      case 'round': return 'πλήρως στρογγυλά';
      default: return radius;
    }
  };

  // Helper function για translation των hover effects
  const getHoverEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς hover effect';
      case 'normal': return 'κανονικό hover effect';
      case 'glow': return 'φωτεινό hover effect';
      case 'shadow': return 'σκιώδες hover effect';
      default: return effect;
    }
  };

  // Helper function για translation των active effects
  const getActiveEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς active effect';
      case 'scale': return 'μεγέθυνση κατά το πάτημα';
      case 'press': return 'πίεση κατά το πάτημα';
      case 'ripple': return 'κύματα κατά το πάτημα';
      default: return effect;
    }
  };

  // Helper function για size translation
  const getSizeInGreek = (size: string) => {
    switch(size) {
      case 'xs': return 'πολύ μικρά';
      case 'sm': return 'μικρά';
      case 'md': return 'μεσαία';
      case 'lg': return 'μεγάλα';
      case 'xl': return 'πολύ μεγάλα';
      default: return size;
    }
  };

  // Helper function για category translation
  const getCategoryInGreek = (category: string) => {
    switch(category.toLowerCase()) {
      case 'backgrounds': return 'ΦΟΝΤΑ';
      case 'text': return 'ΚΕΙΜΕΝΑ';
      case 'borders': return 'ΠΕΡΙΓΡΑΜΜΑΤΑ';
      default: return category.toUpperCase();
    }
  };

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
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
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
    primary: extractColor(currentColors.primary, 'var(--layera-color-text-primary, #6366f1)'),
    secondary: extractColor(currentColors.secondary, 'var(--layera-color-text-secondary, #6b7280)'),
    success: extractColor(currentColors.success, 'var(--layera-color-semantic-success-primary, #10b981)'),
    warning: extractColor(currentColors.warning, 'var(--layera-color-semantic-warning-primary, #f59e0b)'),
    danger: extractColor(currentColors.danger, 'var(--layera-color-semantic-error-primary, #ef4444)'),
    info: extractColor(currentColors.info, 'var(--layera-color-semantic-info-primary, #6366f1)')
  };

  // Border width για outline button
  const dynamicBorderWidth = getBorderWidthToken(borderWidth);

  // Inject dynamic styles για ARXES compliance χωρίς αλλαγή εμφάνισης
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      injectDynamicStyles(colors, buttonState, dynamicBorderWidth);
    }
  }, [colors, buttonState, dynamicBorderWidth]);

  return (
    <Box
      className="layera-padding-left--lg layera-padding-right--lg"
    >
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
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--primary layera-margin-right--sm`}
          >
            {buttonState.shape === 'square' ? 'P' : 'Primary'}
          </Button>
          <Button
            variant="secondary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SettingsIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--secondary layera-margin-right--sm`}
          >
            {buttonState.shape === 'square' ? 'S' : 'Secondary'}
          </Button>
          <Button
            variant="success"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--success layera-margin-right--sm`}
          >
            {buttonState.shape === 'square' ? 'Su' : 'Success'}
          </Button>
          <Button
            variant="warning"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--warning layera-margin-right--sm`}
          >
            {buttonState.shape === 'square' ? 'W' : 'Warning'}
          </Button>
          <Button
            variant="danger"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--danger layera-margin-right--sm`}
          >
            {buttonState.shape === 'square' ? 'D' : 'Danger'}
          </Button>
          <Button
            variant="info"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SearchIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--info`}
          >
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </Button>
          <Button
            variant="outline"
            size={buttonState.size}
            icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--outline`}
          >
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </Button>
          <Button
            variant="ghost"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CompassIcon size="sm" /> : undefined}
            className={`layera-btn layera-btn--${buttonState.size} layera-btn--ghost`}
          >
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </Button>
        </Box>
      </Box>


    </Box>
  );
};