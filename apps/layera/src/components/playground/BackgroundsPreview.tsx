import React from 'react';

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
      <div style={{
        backgroundColor: currentColors.primary,
        color: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Primary<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.secondary,
        color: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Secondary<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.success,
        color: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Success<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.warning,
        color: 'black',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Warning<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.danger,
        color: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Danger<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.info,
        color: 'white',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        minWidth: '120px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px'
      }}>
        Info<br/>Background
      </div>
    </>
  );
};