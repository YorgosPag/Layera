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
      padding: 'var(--layera-global-spacing-3)',
      borderRadius: `var(--layera-global-borderRadius-${borderRadius})`,
      height: 'var(--layera-fontSize-6xl)',
      width: 'calc(var(--layera-fontSize-6xl) * 3)',
      minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
      maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
      flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
      display: 'flex',
      alignItems: 'var(--layera-global-alignItems-center)',
      justifyContent: 'var(--layera-global-justifyContent-center)'
    };

    switch (colorCategory) {
      case 'backgrounds':
        return {
          ...baseStyle,
          backgroundColor: colorValue,
          color: colorValue === '#f59e0b' ? 'var(--layera-color-text-primary)' : 'var(--layera-color-text-on-dark)',
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-bg-secondary)',
          color: colorValue,
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: 'var(--layera-color-text-primary)',
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

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 'var(--layera-global-spacing-2)',
            width: 'var(--layera-global-layout-width-full)',
            justifyContent: 'var(--layera-global-justifyContent-center)',
            alignItems: 'var(--layera-global-alignItems-center)',
            paddingTop: 'var(--layera-global-spacing-4)',
            paddingBottom: 'var(--layera-global-spacing-4)'
          }}
        >
          <Box style={getLayoutStyle(currentColors.primary)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Primary
              </h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.secondary)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>Secondary</h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.success)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>Success</h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.warning)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>Warning</h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.danger)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>Danger</h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>

          <Box style={getLayoutStyle(currentColors.info)}>
            <Box>
              <h4 style={{
                margin: '0 0 var(--layera-global-spacing-1) 0',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>Info</h4>
              <p style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-xs)',
                opacity: '0.8'
              }}>
                Layout Section
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};