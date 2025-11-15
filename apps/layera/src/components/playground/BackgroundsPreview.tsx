import React from 'react';
import { Box } from '@layera/layout';

/**
 * BackgroundsPreview Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Backgrounds Preview ενότητα
 * Γραμμές 136-242 από το αρχικό ColorPreviewArea.tsx
 */

interface BackgroundsPreviewProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const BackgroundsPreview: React.FC<BackgroundsPreviewProps> = ({
  currentColors
}) => {
  return (
    <>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.primary,
          color: 'var(--layera-color-white)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Primary<br/>Background
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.secondary,
          color: 'var(--layera-color-white)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Secondary<br/>Background
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.success,
          color: 'var(--layera-color-white)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Success<br/>Background
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.warning,
          color: 'var(--layera-color-black)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Warning<br/>Background
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.danger,
          color: 'var(--layera-color-white)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Danger<br/>Background
      </Box>
      <Box
        className="layera-height--40 layera-min-width--120 flex--base align-center justify-center text-center"
        style={{
          backgroundColor: currentColors.info,
          color: 'var(--layera-color-white)',
          padding: 'var(--layera-global-spacing-3, 15px)',
          border: 'var(--layera-global-borderWidth-2) solid var(--layera-color-border-default)',
          borderRadius: 'var(--layera-global-borderRadius-md)',
          fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
          fontSize: 'var(--layera-global-fontSize-xs, 12px)'
        }}>
        Info<br/>Background
      </Box>
    </>
  );
};