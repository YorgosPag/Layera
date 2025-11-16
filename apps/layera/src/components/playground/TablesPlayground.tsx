import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

interface TablesPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
}

export const TablesPlayground: React.FC<TablesPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2
}) => {
  const getTableStyle = (colorValue: string) => {
    switch (colorCategory) {
      case 'backgrounds':
        return {
          backgroundColor: colorValue,
          color: colorValue === '#f59e0b' ? '#000000' : '#ffffff'
        };
      case 'text':
        return {
          backgroundColor: '#ffffff',
          color: colorValue
        };
      case 'borders':
        return {
          backgroundColor: '#ffffff',
          color: '#333333',
          border: `var(--layera-global-borderWidth-${borderWidth}) solid ${colorValue}`
        };
      default:
        return {};
    }
  };

  const colors = [
    { name: 'Primary', value: currentColors.primary },
    { name: 'Secondary', value: currentColors.secondary },
    { name: 'Success', value: currentColors.success },
    { name: 'Warning', value: currentColors.warning },
    { name: 'Danger', value: currentColors.danger },
    { name: 'Info', value: currentColors.info }
  ];

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πίνακες
        </h3>

        <Box style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layera-global-spacing-1)' }}>
          {colors.map((color, index) => (
            <Box
              key={color.name}
              style={{
                ...getTableStyle(color.value),
                padding: 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
                borderRadius: 'var(--layera-global-layoutSystem-button-outline-borderRadius)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'var(--layera-la-fontSize-sm)',
                fontWeight: 'var(--layera-la-fontWeight-medium)'
              }}
            >
              <span>{color.name} Row</span>
              <span className="layera-opacity--80 layera-fontSize--xs">
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};