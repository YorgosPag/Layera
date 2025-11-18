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

  return (
    <>
      {borderConfigs.map(({ key, label, colorValue }) => (
        <Box
          key={key}
          className="layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-height--preview layera-min-width--120 layera-border-radius--md layera-padding--md layera-fontSize--xs layera-fontWeight--bold layera-bg-surface--primary layera-border--dynamic"
          data-dynamic-border-color={colorValue}
        >
          {label}<br/>Border
        </Box>
      ))}
    </>
  );
};