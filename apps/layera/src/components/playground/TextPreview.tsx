import React from 'react';
import { Box } from '@layera/layout';
import { Text, Heading } from '@layera/typography';

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
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.primary }}>Primary Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.primary }}>Sample paragraph</Text>
      </Box>
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.secondary }}>Secondary Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.secondary }}>Sample paragraph</Text>
      </Box>
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.success }}>Success Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.success }}>Sample paragraph</Text>
      </Box>
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.warning }}>Warning Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.warning }}>Sample paragraph</Text>
      </Box>
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.danger }}>Danger Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.danger }}>Sample paragraph</Text>
      </Box>
      <Box className="layera-layout layera-text-center layera-padding--sm">
        <Heading as="h4" className="layera-typography layera-margin-bottom--xs" data-size="lg" data-weight="bold" style={{ color: currentColors.info }}>Info Text</Heading>
        <Text className="layera-typography layera-margin--none" data-size="xs" style={{ color: currentColors.info }}>Sample paragraph</Text>
      </Box>
    </>
  );
};