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
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
}

export const InputsPlayground: React.FC<InputsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2
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
          border: `var(--layera-global-borderWidth-${borderWidth}) solid ${colorValue}`
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

        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 'var(--layera-global-spacing-6)',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--layera-iconInteractive-sizing-padding-xl) 0'
        }}>
          <Box style={{ minWidth: '150px', marginRight: 'var(--layera-iconInteractive-sizing-padding-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Primary Input</label>
            <input
              type="text"
              placeholder="Primary πεδίο"
              style={getInputStyle(currentColors.primary)}
            />
          </Box>

          <Box style={{ minWidth: '150px', marginRight: 'var(--layera-iconInteractive-sizing-padding-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Secondary Input</label>
            <input
              type="text"
              placeholder="Secondary πεδίο"
              style={getInputStyle(currentColors.secondary)}
            />
          </Box>

          <Box style={{ minWidth: '150px', marginRight: 'var(--layera-iconInteractive-sizing-padding-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Success Input</label>
            <input
              type="text"
              placeholder="Success πεδίο"
              style={getInputStyle(currentColors.success)}
            />
          </Box>

          <Box style={{ minWidth: '150px', marginRight: 'var(--layera-iconInteractive-sizing-padding-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Warning Input</label>
            <input
              type="text"
              placeholder="Warning πεδίο"
              style={getInputStyle(currentColors.warning)}
            />
          </Box>

          <Box style={{ minWidth: '150px', marginRight: 'var(--layera-iconInteractive-sizing-padding-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Danger Input</label>
            <input
              type="text"
              placeholder="Danger πεδίο"
              style={getInputStyle(currentColors.danger)}
            />
          </Box>

          <Box style={{ minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: 'var(--layera-iconInteractive-sizing-padding-sm)', fontSize: 'var(--layera-la-fontSize-xs)', fontWeight: 'bold' }}>Info Input</label>
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