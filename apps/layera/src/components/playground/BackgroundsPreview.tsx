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
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Primary<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.secondary,
        color: 'white',
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Secondary<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.success,
        color: 'white',
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Success<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.warning,
        color: 'black',
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Warning<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.danger,
        color: 'white',
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Danger<br/>Background
      </div>
      <div style={{
        backgroundColor: currentColors.info,
        color: 'white',
        padding: 'var(--layera-global-spacing-5, 20px)',
        border: 'var(--layera-global-borderWidth-2, 2px) solid var(--layera-color-border-default, #ccc)',
        borderRadius: 'var(--layera-global-borderRadius-md, 8px)',
        minWidth: 'var(--layera-global-minWidth-120, 120px)',
        height: 'var(--layera-spacing-component-button-height, 40px)',
        display: 'var(--layera-global-display-flex, flex)',
        alignItems: 'var(--layera-global-alignItems-center, center)',
        justifyContent: 'var(--layera-global-justifyContent-center, center)',
        fontWeight: 'var(--layera-global-fontWeight-bold, bold)',
        textAlign: 'var(--layera-global-textAlign-center, center)',
        fontSize: 'var(--layera-global-fontSize-xs, 12px)'
      }}>
        Info<br/>Background
      </div>
    </>
  );
};