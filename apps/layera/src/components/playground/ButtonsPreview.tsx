import React from 'react';

/**
 * ButtonsPreview Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Buttons Preview ενότητα
 * Γραμμές 40-134 από το αρχικό ColorPreviewArea.tsx
 */

interface ButtonsPreviewProps {
  colorHookState: {
    colorButtonShape: string;
  };
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const ButtonsPreview: React.FC<ButtonsPreviewProps> = ({
  colorHookState,
  currentColors
}) => {
  return (
    <>
      <button style={{
        backgroundColor: currentColors.primary,
        color: 'white',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'P' : 'Primary Color'}
      </button>
      <button style={{
        backgroundColor: currentColors.secondary,
        color: 'white',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'S' : 'Secondary Color'}
      </button>
      <button style={{
        backgroundColor: currentColors.success,
        color: 'white',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'Su' : 'Success Color'}
      </button>
      <button style={{
        backgroundColor: currentColors.warning,
        color: 'black',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'W' : 'Warning Color'}
      </button>
      <button style={{
        backgroundColor: currentColors.danger,
        color: 'white',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'D' : 'Danger Color'}
      </button>
      <button style={{
        backgroundColor: currentColors.info,
        color: 'white',
        padding: colorHookState.colorButtonShape === 'square' ? '16px' : '8px 16px',
        border: 'none',
        borderRadius: colorHookState.colorButtonShape === 'rounded' ? '50px' : colorHookState.colorButtonShape === 'square' ? '6px' : '6px',
        cursor: 'pointer',
        minWidth: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        height: colorHookState.colorButtonShape === 'square' ? '50px' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {colorHookState.colorButtonShape === 'square' ? 'I' : 'Info Color'}
      </button>
    </>
  );
};