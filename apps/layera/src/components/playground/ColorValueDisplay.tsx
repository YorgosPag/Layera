import React from 'react';
import { Box } from '@layera/layout';
import { PaletteIcon, SettingsIcon } from '@layera/icons';
import { getCSSVariablePrefix } from '../../services/theme';

/**
 * ColorValueDisplay Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Color Values Display ενότητα
 * Γραμμές 199-279 από το αρχικό LivePlayground.tsx
 */

import type { ColorState } from '../../hooks/useColorState.js';

interface ColorValueDisplayProps {
  colorHookState: ColorState;
  currentColors: Record<string, string>;
  buttonState?: {
    variant: string;
    size: string;
    text: string;
    withIcon: boolean;
  };
}

export const ColorValueDisplay: React.FC<ColorValueDisplayProps> = ({
  colorHookState,
  currentColors,
  buttonState
}) => {
  return (
    <>
      {/* Current Settings Display - για buttons */}
      {colorHookState.elementType === 'buttons' && buttonState && (
        <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
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
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--neutral-light" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="lg" data-weight="bold" className="layera-word-wrap--break layera-overflow-wrap--break layera-white-space--normal">
          <PaletteIcon size="sm" /> Παλέτα Χρωμάτων για {colorHookState.colorCategory.toUpperCase()}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono" className="layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break">
{`{
  primary: "${currentColors?.primary || '#000000'}",
  secondary: "${currentColors?.secondary || '#000000'}",
  success: "${currentColors?.success || '#000000'}",
  warning: "${currentColors?.warning || '#000000'}",
  danger: "${currentColors?.danger || '#000000'}",
  info: "${currentColors?.info || '#000000'}"
}`}
        </pre>
      </Box>

      {/* CSS Variables Display - ENTERPRISE DYNAMIC VERSION */}
      <Box className="layera-card layera-padding--lg layera-typography layera-border--default layera-bg-semantic--info-light" data-family="mono" data-size="sm">
        <h4 className="layera-typography layera-margin-bottom--sm layera-text-color--neutral-dark" data-size="lg" data-weight="bold" className="layera-word-wrap--break layera-overflow-wrap--break layera-white-space--normal">
          <SettingsIcon size="sm" /> CSS Μεταβλητές για {colorHookState.colorCategory.toUpperCase()} στα {colorHookState.elementType.toUpperCase()}{colorHookState.elementType === 'buttons' ? ` (${colorHookState.colorButtonShape})` : ''}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono" className="layera-white-space--pre-wrap layera-word-wrap--break layera-overflow-wrap--break">
          {(() => {
            // ENTERPRISE: Dynamic CSS variable reading από DOM - Single source of truth από theme.ts
            const prefix = getCSSVariablePrefix(colorHookState.colorCategory, colorHookState.colorButtonShape);
            const colorNames = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

            // Read actual values από DOM που δημιούργησε το theme.ts
            const cssVariables = colorNames.map(colorName => {
              const varName = `${prefix}${colorName}`;
              const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || currentColors?.[colorName] || '#000000';
              return `  ${varName}: "${value}"`;
            }).join(',\n');

            return `{\n${cssVariables}\n}`;
          })()}
        </pre>
      </Box>
    </>
  );
};