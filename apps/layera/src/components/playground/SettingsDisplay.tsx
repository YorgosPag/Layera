import React from 'react';
import { Box } from '@layera/layout';
import { PaletteIcon, SettingsIcon } from '@layera/icons';
import { getCSSVariablePrefix } from '../../services/theme';

/**
 * SettingsDisplay Component
 *
 * Εμφανίζει τις τρέχουσες ρυθμίσεις (button settings, colors, CSS variables)
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Settings Display ενότητα
 * Γραμμές 199-279 από το αρχικό LivePlayground.tsx
 */

import type { ColorState } from '../../hooks/useColorState.js';

interface SettingsDisplayProps {
  colorHookState: ColorState;
  currentColors: Record<string, string>;
  buttonState?: {
    variant: string;
    size: string;
    text: string;
    withIcon: boolean;
  };
}

export const SettingsDisplay: React.FC<SettingsDisplayProps> = ({
  colorHookState,
  currentColors,
  buttonState
}) => {
  return (
    <>
      {/* Current Settings Display - για buttons */}
      {colorHookState.elementType === 'buttons' && buttonState && (
        <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-surface--primary layera-border-color--primary layera-border-width--2" data-family="mono" data-size="sm">
          <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="lg" data-weight="bold">
            <SettingsIcon size="sm" /> Τρέχουσες Ρυθμίσεις:
          </h4>
          <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break" data-family="mono">
{`{
  variant: "${buttonState.variant}",
  size: "${buttonState.size}",
  text: "${buttonState.text}",
  withIcon: ${buttonState.withIcon}
}`}
          </pre>
        </Box>
      )}

      {/* Current Color Values Display */}
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-surface--secondary layera-border-color--secondary layera-border-width--2" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark layera-word-wrap--break layera-overflow-wrap--break layera-white-space--normal" data-size="lg" data-weight="bold">
          <PaletteIcon size="sm" /> Παλέτα Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break" data-family="mono">
{`{
  primary: "${currentColors?.primary || 'var(--layera-colors-text-primary)'}",
  secondary: "${currentColors?.secondary || 'var(--layera-colors-text-secondary)'}",
  success: "${currentColors?.success || 'var(--layera-colors-primary-success)'}",
  warning: "${currentColors?.warning || 'var(--layera-colors-primary-warning)'}",
  danger: "${currentColors?.danger || 'var(--layera-colors-primary-danger)'}",
  info: "${currentColors?.info || 'var(--layera-colors-status-info)'}"
}`}
        </pre>
      </Box>

      {/* CSS Variables Display - ENTERPRISE DYNAMIC VERSION */}
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-surface--danger layera-border-color--danger layera-border-width--2" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark layera-word-wrap--break layera-overflow-wrap--break layera-white-space--normal" data-size="lg" data-weight="bold">
          <SettingsIcon size="sm" /> CSS Μεταβλητές για {colorHookState.colorCategory.toUpperCase()} στα {colorHookState.elementType.toUpperCase()}{colorHookState.elementType === 'buttons' ? ` (${colorHookState.colorButtonShape})` : ''}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break" data-family="mono">
          {(() => {
            // ENTERPRISE: Dynamic CSS variable reading από DOM - Single source of truth από theme.ts
            const prefix = getCSSVariablePrefix(colorHookState.colorCategory, colorHookState.colorButtonShape);
            const colorNames = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

            // Read actual values από DOM που δημιούργησε το theme.ts
            const cssVariables = colorNames.map(colorName => {
              const varName = `${prefix}${colorName}`;
              const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || currentColors?.[colorName] || 'var(--layera-colors-text-primary)';
              return `  ${varName}: "${value}"`;
            }).join(',\n');

            return `{\n${cssVariables}\n}`;
          })()}
        </pre>
      </Box>
    </>
  );
};