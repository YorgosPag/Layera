import React from 'react';

// Dynamic CSS injection για ARXES compliance χωρίς αλλαγή εμφάνισης
const injectButtonsPreviewStyles = (currentColors: any, colorHookState: any) => {
  const styleId = 'layera-buttons-preview-styles';
  let existingStyle = document.getElementById(styleId);

  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .layera-btn-preview-primary {
      background-color: ${currentColors.primary} !important;
      color: white !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }

    .layera-btn-preview-secondary {
      background-color: ${currentColors.secondary} !important;
      color: white !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }

    .layera-btn-preview-success {
      background-color: ${currentColors.success} !important;
      color: white !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }

    .layera-btn-preview-warning {
      background-color: ${currentColors.warning} !important;
      color: black !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }

    .layera-btn-preview-danger {
      background-color: ${currentColors.danger} !important;
      color: white !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }

    .layera-btn-preview-info {
      background-color: ${currentColors.info} !important;
      color: white !important;
      padding: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-iconInteractive-sizing-padding-xl)' : 'var(--layera-iconInteractive-sizing-padding-md) var(--layera-iconInteractive-sizing-padding-xl)'} !important;
      border: none !important;
      border-radius: ${colorHookState.colorButtonShape === 'rounded' ? 'var(--layera-global-button-height-xl)' : 'var(--layera-global-layoutSystem-button-outline-borderRadius)'} !important;
      cursor: pointer !important;
      min-width: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : '120px'} !important;
      height: ${colorHookState.colorButtonShape === 'square' ? 'var(--layera-global-button-height-xl)' : 'auto'} !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--layera-iconInteractive-sizing-padding-sm) !important;
      font-size: var(--layera-la-fontSize-sm) !important;
      margin-bottom: var(--layera-global-spacing-1) !important;
    }
  `;

  document.head.appendChild(style);
};

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
  // Inject dynamic styles για ARXES compliance χωρίς αλλαγή εμφάνισης
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      injectButtonsPreviewStyles(currentColors, colorHookState);
    }
  }, [currentColors, colorHookState]);

  return (
    <>
      <button className="layera-btn-preview-primary">
        {colorHookState.colorButtonShape === 'square' ? 'P' : 'Primary Color'}
      </button>
      <button className="layera-btn-preview-secondary">
        {colorHookState.colorButtonShape === 'square' ? 'S' : 'Secondary Color'}
      </button>
      <button className="layera-btn-preview-success">
        {colorHookState.colorButtonShape === 'square' ? 'Su' : 'Success Color'}
      </button>
      <button className="layera-btn-preview-warning">
        {colorHookState.colorButtonShape === 'square' ? 'W' : 'Warning Color'}
      </button>
      <button className="layera-btn-preview-danger">
        {colorHookState.colorButtonShape === 'square' ? 'D' : 'Danger Color'}
      </button>
      <button className="layera-btn-preview-info">
        {colorHookState.colorButtonShape === 'square' ? 'I' : 'Info Color'}
      </button>
    </>
  );
};