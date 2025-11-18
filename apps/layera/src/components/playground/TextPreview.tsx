import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

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
  const colorEntries = [
    { key: 'primary', label: 'Primary Text', value: currentColors.primary },
    { key: 'secondary', label: 'Secondary Text', value: currentColors.secondary },
    { key: 'success', label: 'Success Text', value: currentColors.success },
    { key: 'warning', label: 'Warning Text', value: currentColors.warning },
    { key: 'danger', label: 'Danger Text', value: currentColors.danger },
    { key: 'info', label: 'Info Text', value: currentColors.info }
  ];

  return (
    <>
      {colorEntries.map(({ key, label, value }) => (
        <Box
          key={key}
          className="layera-flex layera-flex--align-center layera-flex--justify-center layera-text-center layera-padding--md layera-height--preview layera-min-width--preview"
        >
          <Box>
            <Text
              className="layera-typography layera-margin-bottom--xs layera-color--dynamic"
              data-size="base"
              data-weight="bold"
              data-color="dynamic"
              data-dynamic-color={value}
            >
              {label}
            </Text>
            <Text
              className="layera-typography layera-color--dynamic"
              data-size="xs"
              data-color="dynamic"
              data-dynamic-color={value}
            >
              Sample paragraph
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};