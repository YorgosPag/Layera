import React from 'react';
import { Box } from '@layera/layout';
import { PaletteIcon, SettingsIcon } from '@layera/icons';

/**
 * ColorValueDisplay Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Color Values Display ενότητα
 * Γραμμές 199-279 από το αρχικό LivePlayground.tsx
 */

interface ColorValueDisplayProps {
  colorHookState: any;
  currentColors: any;
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
          <SettingsIcon size="sm" /> CSS Μεταβλητές για {colorHookState.colorCategory.toUpperCase()}{colorHookState.colorCategory === 'buttons' ? ` (${colorHookState.colorButtonShape})` : ''}:
        </h4>
        <pre className="layera-typography layera-margin--none layera-text-color--neutral-dark" data-family="mono">
          {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'rectangular' && `{
  --layera-color-button-primary: "${currentColors.primary}",
  --layera-color-button-secondary: "${currentColors.secondary}",
  --layera-color-button-success: "${currentColors.success}",
  --layera-color-button-warning: "${currentColors.warning}",
  --layera-color-button-danger: "${currentColors.danger}",
  --layera-color-button-info: "${currentColors.info}"
}`}
          {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'square' && `{
  --layera-color-button-square-primary: "${currentColors.primary}",
  --layera-color-button-square-secondary: "${currentColors.secondary}",
  --layera-color-button-square-success: "${currentColors.success}",
  --layera-color-button-square-warning: "${currentColors.warning}",
  --layera-color-button-square-danger: "${currentColors.danger}",
  --layera-color-button-square-info: "${currentColors.info}"
}`}
          {colorHookState.colorCategory === 'buttons' && colorHookState.colorButtonShape === 'rounded' && `{
  --layera-color-button-rounded-primary: "${currentColors.primary}",
  --layera-color-button-rounded-secondary: "${currentColors.secondary}",
  --layera-color-button-rounded-success: "${currentColors.success}",
  --layera-color-button-rounded-warning: "${currentColors.warning}",
  --layera-color-button-rounded-danger: "${currentColors.danger}",
  --layera-color-button-rounded-info: "${currentColors.info}"
}`}
          {colorHookState.colorCategory === 'backgrounds' && `{
  --layera-color-bg-primary: "${currentColors.primary}",
  --layera-color-bg-secondary: "${currentColors.secondary}",
  --layera-color-bg-success: "${currentColors.success}",
  --layera-color-bg-warning: "${currentColors.warning}",
  --layera-color-bg-danger: "${currentColors.danger}",
  --layera-color-bg-info: "${currentColors.info}"
}`}
          {colorHookState.colorCategory === 'text' && `{
  --layera-color-text-primary: "${currentColors.primary}",
  --layera-color-text-secondary: "${currentColors.secondary}",
  --layera-color-text-success: "${currentColors.success}",
  --layera-color-text-warning: "${currentColors.warning}",
  --layera-color-text-danger: "${currentColors.danger}",
  --layera-color-text-info: "${currentColors.info}"
}`}
          {colorHookState.colorCategory === 'borders' && `{
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
  );
};