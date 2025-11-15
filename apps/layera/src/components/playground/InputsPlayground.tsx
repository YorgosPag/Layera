import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

interface InputsPlaygroundProps {
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

export const InputsPlayground: React.FC<InputsPlaygroundProps> = ({
  currentColors,
  colorCategory
}) => {
  const getInputStyle = (colorValue: string) => {
    const baseStyle = {
      padding: '12px',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      outline: 'none'
    };

    switch (colorCategory) {
      case 'backgrounds':
        return {
          ...baseStyle,
          backgroundColor: colorValue,
          color: colorValue === '#f59e0b' ? '#000000' : '#ffffff',
          border: '1px solid #e5e5e5'
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: '#ffffff',
          color: colorValue,
          border: '1px solid #e5e5e5'
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: '#ffffff',
          color: '#333333',
          border: `2px solid ${colorValue}`
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πεδία
        </h3>

        <Box className="layera-grid layera-grid--gap-md" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Primary Input</label>
            <input
              type="text"
              placeholder="Primary πεδίο"
              style={getInputStyle(currentColors.primary)}
            />
          </Box>

          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Secondary Input</label>
            <input
              type="text"
              placeholder="Secondary πεδίο"
              style={getInputStyle(currentColors.secondary)}
            />
          </Box>

          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Success Input</label>
            <input
              type="text"
              placeholder="Success πεδίο"
              style={getInputStyle(currentColors.success)}
            />
          </Box>

          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Warning Input</label>
            <input
              type="text"
              placeholder="Warning πεδίο"
              style={getInputStyle(currentColors.warning)}
            />
          </Box>

          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Danger Input</label>
            <input
              type="text"
              placeholder="Danger πεδίο"
              style={getInputStyle(currentColors.danger)}
            />
          </Box>

          <Box>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>Info Input</label>
            <input
              type="text"
              placeholder="Info πεδίο"
              style={getInputStyle(currentColors.info)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};