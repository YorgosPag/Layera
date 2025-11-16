import React from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, CheckIcon, CloseIcon, SettingsIcon, RulerIcon, PolygonIcon, CompassIcon } from '@layera/icons';
import { ButtonState } from '../../hooks/useButtonState';

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
}

export const ButtonsPlayground: React.FC<ButtonsPlaygroundProps> = ({
  buttonState,
  colorCategory = 'borders',
  currentColors = {},
  borderWidth = 2
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
  return (
    <Box>
      {/* Live Preview Area - Ενοποιημένο με 6 χρωματιστά buttons */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πλήκτρα
        </h3>
        <p className="layera-typography layera-margin-bottom--md" data-size="sm" data-color="secondary">
          {colorCategory.toUpperCase()} για πλήκτρα σχήματος {getShapeInGreek(buttonState.shape)} μεγέθους {buttonState.size} {buttonState.withIcon ? 'με εικονίδιο' : 'χωρίς εικονίδιο'}
        </p>

        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap layera-flex--gap-md">
          {/* Τα 6 χρωματιστά buttons με δυναμικές τιμές */}
          <Button
            variant="primary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-button-dynamic-primary"
          >
            {buttonState.shape === 'square' ? 'P' : 'Primary'}
          </Button>
          <Button
            variant="secondary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SettingsIcon size="sm" /> : undefined}
            className="layera-button-dynamic-secondary"
          >
            {buttonState.shape === 'square' ? 'S' : 'Secondary'}
          </Button>
          <Button
            variant="success"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-button-dynamic-success"
            style={{ backgroundColor: colors.success }}
          >
            {buttonState.shape === 'square' ? 'Su' : 'Success'}
          </Button>
          <Button
            variant="warning"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-button-dynamic-warning"
            style={{ backgroundColor: colors.warning }}
          >
            {buttonState.shape === 'square' ? 'W' : 'Warning'}
          </Button>
          <Button
            variant="danger"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-button-dynamic-danger"
            style={{ backgroundColor: colors.danger }}
          >
            {buttonState.shape === 'square' ? 'D' : 'Danger'}
          </Button>
          <Button
            variant="info"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SearchIcon size="sm" /> : undefined}
            className="layera-button-dynamic-info"
            style={{ backgroundColor: colors.info }}
          >
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </Button>
          <button style={{
            backgroundColor: 'transparent', // outline
            color: colors.primary,
            padding: buttonState.shape === 'square' ? '16px' : '8px 16px',
            border: `${dynamicBorderWidth} solid ${colors.primary}`,
            borderRadius: buttonState.shape === 'rounded' ? '50px' : buttonState.shape === 'square' ? '6px' : '6px',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? '50px' : '120px',
            height: buttonState.shape === 'square' ? '50px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.withIcon && <PlusIcon size="sm" />}
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </button>
          <button style={{
            backgroundColor: 'transparent', // ghost
            color: colors.secondary,
            padding: buttonState.shape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)',
            border: 'none',
            borderRadius: buttonState.shape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)',
            cursor: 'pointer',
            minWidth: buttonState.shape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px',
            height: buttonState.shape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--layera-iconInteractive-sizing-padding-sm)',
            fontSize: buttonState.size === 'xs' ? '12px' : buttonState.size === 'sm' ? '14px' : buttonState.size === 'md' ? '16px' : buttonState.size === 'lg' ? '18px' : '20px'
          }}>
            {buttonState.withIcon && <CompassIcon size="sm" />}
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </button>
        </Box>
      </Box>


    </Box>
  );
};