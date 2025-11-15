import React from 'react';
import { Box } from '@layera/layout';

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
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.primary, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Primary Text</h4>
          <p style={{ color: currentColors.primary, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.secondary, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Secondary Text</h4>
          <p style={{ color: currentColors.secondary, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.success, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Success Text</h4>
          <p style={{ color: currentColors.success, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.warning, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Warning Text</h4>
          <p style={{ color: currentColors.warning, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.danger, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Danger Text</h4>
          <p style={{ color: currentColors.danger, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
      <Box
        className="flex--base align-center justify-center text-center"
        style={{
          height: 'var(--layera-spacing-component-preview-border-height)',
          minWidth: 'var(--layera-spacing-component-preview-border-min-width)',
          padding: 'var(--layera-global-spacing-3)'
        }}>
        <div>
          <h4 style={{ color: currentColors.info, margin: 'var(--layera-global-margin-0) var(--layera-global-margin-0) var(--layera-global-spacing-1) var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-base)', fontWeight: 'var(--layera-global-fontWeight-bold)' }}>Info Text</h4>
          <p style={{ color: currentColors.info, margin: 'var(--layera-global-margin-0)', fontSize: 'var(--layera-global-fontSize-xs)' }}>Sample paragraph</p>
        </div>
      </Box>
    </>
  );
};