import React from 'react';
import { Box } from '@layera/layout';
import { PaletteIcon, SettingsIcon } from '@layera/icons';

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
}

export const ColorValueDisplay: React.FC<ColorValueDisplayProps> = ({
  colorHookState,
  currentColors
}) => {
  return (
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
          <SettingsIcon size="sm" /> CSS Μεταβλητές για {colorHookState.colorCategory.toUpperCase()} στα {colorHookState.elementType.toUpperCase()}{colorHookState.elementType === 'buttons' ? ` (${colorHookState.colorButtonShape})` : ''}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
          {colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'rectangular' && `{
  --layera-${colorHookState.colorCategory}-button-primary: "${currentColors.primary}",
  --layera-${colorHookState.colorCategory}-button-secondary: "${currentColors.secondary}",
  --layera-${colorHookState.colorCategory}-button-success: "${currentColors.success}",
  --layera-${colorHookState.colorCategory}-button-warning: "${currentColors.warning}",
  --layera-${colorHookState.colorCategory}-button-danger: "${currentColors.danger}",
  --layera-${colorHookState.colorCategory}-button-info: "${currentColors.info}"
}`}
          {colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'square' && `{
  --layera-${colorHookState.colorCategory}-button-square-primary: "${currentColors.primary}",
  --layera-${colorHookState.colorCategory}-button-square-secondary: "${currentColors.secondary}",
  --layera-${colorHookState.colorCategory}-button-square-success: "${currentColors.success}",
  --layera-${colorHookState.colorCategory}-button-square-warning: "${currentColors.warning}",
  --layera-${colorHookState.colorCategory}-button-square-danger: "${currentColors.danger}",
  --layera-${colorHookState.colorCategory}-button-square-info: "${currentColors.info}"
}`}
          {colorHookState.elementType === 'buttons' && colorHookState.colorButtonShape === 'rounded' && `{
  --layera-${colorHookState.colorCategory}-button-rounded-primary: "${currentColors.primary}",
  --layera-${colorHookState.colorCategory}-button-rounded-secondary: "${currentColors.secondary}",
  --layera-${colorHookState.colorCategory}-button-rounded-success: "${currentColors.success}",
  --layera-${colorHookState.colorCategory}-button-rounded-warning: "${currentColors.warning}",
  --layera-${colorHookState.colorCategory}-button-rounded-danger: "${currentColors.danger}",
  --layera-${colorHookState.colorCategory}-button-rounded-info: "${currentColors.info}"
}`}
          {colorHookState.elementType !== 'buttons' && `{
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-primary: "${currentColors.primary}",
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-secondary: "${currentColors.secondary}",
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-success: "${currentColors.success}",
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-warning: "${currentColors.warning}",
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-danger: "${currentColors.danger}",
  --layera-${colorHookState.colorCategory}-${colorHookState.elementType}-info: "${currentColors.info}"
}`}
        </pre>
      </Box>
    </Box>
  );
};