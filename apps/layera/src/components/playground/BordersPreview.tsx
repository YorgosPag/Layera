import React from 'react';
import { Box } from '@layera/layout';

/**
 * BordersPreview Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Borders Preview ενότητα
 * Γραμμές 274-368 από το αρχικό ColorPreviewArea.tsx
 */

interface BordersPreviewProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const BordersPreview: React.FC<BordersPreviewProps> = ({
  currentColors
}) => {
  // Border box configurations
  const borderConfigs = [
    { key: 'primary', label: 'Primary', colorValue: currentColors.primary },
    { key: 'secondary', label: 'Secondary', colorValue: currentColors.secondary },
    { key: 'success', label: 'Success', colorValue: currentColors.success },
    { key: 'warning', label: 'Warning', colorValue: currentColors.warning },
    { key: 'danger', label: 'Danger', colorValue: currentColors.danger },
    { key: 'info', label: 'Info', colorValue: currentColors.info }
  ];

  // Base border box style
  const baseBorderStyle = {
    height: 'var(--layera-spacing-component-preview-box-height)',
    minWidth: 'var(--layera-global-minWidth-120)',
    borderRadius: 'var(--layera-global-borderRadius-md)',
    padding: 'var(--layera-global-spacing-3)',
    fontSize: 'var(--layera-global-fontSize-xs)',
    fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
    backgroundColor: 'var(--layera-color-surface-primary)'
  };
  return (
    <>
      {borderConfigs.map(({ key, label, colorValue }) => (
        <Box
          key={key}
          className="flex--base align-center justify-center text-center"
          style={{
            ...baseBorderStyle,
            '--layera-border-preview-color': colorValue,
            border: `var(--layera-global-borderWidth-3) solid var(--layera-border-preview-color)`
          } as React.CSSProperties}
        >
          {label}<br/>Border
        </Box>
      ))}
    </>
  );
};