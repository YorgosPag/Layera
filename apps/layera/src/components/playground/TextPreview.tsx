import React from 'react';

/**
 * TextPreview Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Text Preview ενότητα
 * Γραμμές 244-272 από το αρχικό ColorPreviewArea.tsx
 */

interface TextPreviewProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const TextPreview: React.FC<TextPreviewProps> = ({
  currentColors
}) => {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.primary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Primary Text</h4>
        <p style={{ color: currentColors.primary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.secondary, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Secondary Text</h4>
        <p style={{ color: currentColors.secondary, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.success, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Success Text</h4>
        <p style={{ color: currentColors.success, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.warning, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Warning Text</h4>
        <p style={{ color: currentColors.warning, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.danger, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Danger Text</h4>
        <p style={{ color: currentColors.danger, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <h4 style={{ color: currentColors.info, margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Info Text</h4>
        <p style={{ color: currentColors.info, margin: '0', fontSize: '12px' }}>Sample paragraph</p>
      </div>
    </>
  );
};