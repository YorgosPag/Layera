import React from 'react';

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
      <div style={{
        border: `3px solid ${currentColors.primary}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Primary<br/>Border
      </div>
      <div style={{
        border: `3px solid ${currentColors.secondary}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Secondary<br/>Border
      </div>
      <div style={{
        border: `3px solid ${currentColors.success}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Success<br/>Border
      </div>
      <div style={{
        border: `3px solid ${currentColors.warning}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Warning<br/>Border
      </div>
      <div style={{
        border: `3px solid ${currentColors.danger}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Danger<br/>Border
      </div>
      <div style={{
        border: `3px solid ${currentColors.info}`,
        borderRadius: '8px',
        padding: '15px',
        minWidth: '100px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: 'white'
      }}>
        Info<br/>Border
      </div>
    </>
  );
};