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
      <Box style={{
        border: `var(--layera-global-borderWidth-3, 3px) solid ${currentColors.primary}`,
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        padding: 'var(--layera-global-spacing-3, 15px)',
        minWidth: 'var(--layera-global-minWidth-100, 100px)',
        height: 'var(--layera-global-height-30, 30px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        backgroundColor: 'var(--layera-color-surface-primary, white)'
      }}>
        Primary<br/>Border
      </Box>
      <Box style={{
        border: `3px solid ${currentColors.secondary}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Secondary<br/>Border
      </Box>
      <Box style={{
        border: `3px solid ${currentColors.success}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Success<br/>Border
      </Box>
      <Box style={{
        border: `3px solid ${currentColors.warning}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Warning<br/>Border
      </Box>
      <Box style={{
        border: `3px solid ${currentColors.danger}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Danger<br/>Border
      </Box>
      <Box style={{
        border: `3px solid ${currentColors.info}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Info<br/>Border
      </Box>
    </>
  );
};