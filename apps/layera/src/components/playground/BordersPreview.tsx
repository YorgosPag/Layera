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
  return (
    <>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.primary}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Primary<br/>Border
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.secondary}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Secondary<br/>Border
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.success}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Success<br/>Border
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.warning}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Warning<br/>Border
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.danger}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Danger<br/>Border
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-box-height)',
          minWidth: 'var(--layera-global-minWidth-120)',
          border: `var(--layera-global-borderWidth-3) solid ${currentColors.info}`,
          borderRadius: 'var(--layera-global-borderRadius-md)',
          padding: 'var(--layera-global-spacing-3)',
          fontSize: 'var(--layera-global-fontSize-xs)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary)'
        }}>
        Info<br/>Border
      </Box>
    </>
  );
};