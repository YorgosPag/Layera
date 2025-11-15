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
}

export const TablesPlayground: React.FC<TablesPlaygroundProps> = ({
  currentColors,
  colorCategory
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
          border: `2px solid ${colorValue}`
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

        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {colors.map((color, index) => (
            <Box
              key={color.name}
              style={{
                ...getTableStyle(color.value),
                padding: '12px 16px',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <span>{color.name} Row</span>
              <span style={{ opacity: 0.8, fontSize: '12px' }}>
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};