import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

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
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.primary}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Primary<br/>Border
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.secondary}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Secondary<br/>Border
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.success}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Success<br/>Border
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.warning}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Warning<br/>Border
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.danger}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Danger<br/>Border
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-border-radius--md layera-min-width--100 layera-height--60 layera-bg-surface--primary"
        style={{ border: `var(--layera-global-borderWidth-2) solid ${currentColors.info}` }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold">
          Info<br/>Border
        </Text>
      </Box>
    </>
  );
};