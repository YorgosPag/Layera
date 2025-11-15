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
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.primary}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Primary<br/>Border
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.secondary}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Secondary<br/>Border
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.success}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Success<br/>Border
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.warning}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Warning<br/>Border
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.danger}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Danger<br/>Border
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.info}`,
          borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          backgroundColor: 'var(--layera-color-surface-primary, white)'
        }}>
        Info<br/>Border
      </Box>
    </>
  );
};