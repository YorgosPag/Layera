import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

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
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.primary }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'white' }}>
          Primary<br/>Background
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.secondary }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'white' }}>
          Secondary<br/>Background
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.success }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'white' }}>
          Success<br/>Background
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.warning }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'black' }}>
          Warning<br/>Background
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.danger }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'white' }}>
          Danger<br/>Background
        </Text>
      </Box>
      <Box
        className="layera-layout layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--lg layera-border layera-border-radius--md layera-min-width--120 layera-height--80"
        style={{ backgroundColor: currentColors.info }}
      >
        <Text className="layera-typography" data-size="xs" data-weight="bold" style={{ color: 'white' }}>
          Info<br/>Background
        </Text>
      </Box>
    </>
  );
};