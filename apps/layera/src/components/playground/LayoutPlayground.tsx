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
  /** Border width for borders category (0, 1, 2, or 3) */
  borderWidth?: number;
  /** Border radius for borders category ('none', 'xs', 'md', 'lg') */
  borderRadius?: string;
}

export const LayoutPlayground: React.FC<LayoutPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  borderRadius = 'md'
}) => {
  const getLayoutStyle = (colorValue: string) => {
    const baseStyle = {
      padding: '12px',
      borderRadius: `var(--layera-global-borderRadius-${borderRadius})`,
      height: 'var(--layera-fontSize-6xl)',
      width: 'calc(var(--layera-fontSize-6xl) * 3)',
      minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
      maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
      flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
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
          border: borderWidth === 0 ? 'none' : `var(--layera-global-borderWidth-${borderWidth}) solid ${colorValue}`
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

        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 'var(--layera-iconInteractive-sizing-padding-md)',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--layera-iconInteractive-sizing-padding-xl) 0'
        }}>
          <Box style={getLayoutStyle(currentColors.primary)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Primary</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.secondary)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Secondary</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.success)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Success</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.warning)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Warning</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.danger)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Danger</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.info)}>
            <Box>
              <h4 style={{ margin: '0 0 var(--layera-iconInteractive-sizing-padding-sm) 0', fontSize: 'var(--layera-la-fontSize-sm)', fontWeight: 'bold' }}>Info</h4>
              <p style={{ margin: 0, fontSize: 'var(--layera-la-fontSize-xs)', opacity: 0.8 }}>Layout Section</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};