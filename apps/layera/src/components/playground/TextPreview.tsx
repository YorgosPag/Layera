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
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.primary, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Primary Text</h4>
        <p style={{ color: currentColors.primary, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.secondary, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Secondary Text</h4>
        <p style={{ color: currentColors.secondary, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.success, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Success Text</h4>
        <p style={{ color: currentColors.success, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.warning, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Warning Text</h4>
        <p style={{ color: currentColors.warning, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.danger, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Danger Text</h4>
        <p style={{ color: currentColors.danger, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
      <div style={{ textAlign: 'var(--layera-global-textAlign-center, center)', padding: 'var(--layera-global-spacing-2, 10px)' }}>
        <h4 style={{ color: currentColors.info, margin: 'var(--layera-global-margin-0, 0) var(--layera-global-margin-0, 0) var(--layera-global-spacing-1, 5px) var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-base, 16px)', fontWeight: 'var(--layera-global-fontWeight-bold, bold)' }}>Info Text</h4>
        <p style={{ color: currentColors.info, margin: 'var(--layera-global-margin-0, 0)', fontSize: 'var(--layera-global-fontSize-xs, 12px)' }}>Sample paragraph</p>
      </div>
    </>
  );
};