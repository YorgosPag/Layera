import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

interface LayoutPlaygroundProps {
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

export const LayoutPlayground: React.FC<LayoutPlaygroundProps> = ({
  currentColors,
  colorCategory
}) => {
  const getLayoutStyle = (colorValue: string) => {
    const baseStyle = {
      padding: '16px',
      borderRadius: '8px',
      minHeight: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
          backgroundColor: '#f8f9fa',
          color: colorValue,
          border: '1px solid #e5e5e5'
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: '#ffffff',
          color: '#333333',
          border: `3px solid ${colorValue}`
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Layout
        </h3>

        <Box className="layera-grid layera-grid--gap-md" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Box style={getLayoutStyle(currentColors.primary)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Primary</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>

          <Box style={getLayoutStyle(currentColors.secondary)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Secondary</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>

          <Box style={getLayoutStyle(currentColors.success)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Success</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>

          <Box style={getLayoutStyle(currentColors.warning)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Warning</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>

          <Box style={getLayoutStyle(currentColors.danger)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Danger</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>

          <Box style={getLayoutStyle(currentColors.info)}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Info</h4>
              <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>Layout Section</p>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};