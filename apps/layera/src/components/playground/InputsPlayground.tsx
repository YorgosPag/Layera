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
      padding: 'var(--layera-global-spacing-3)',
      borderRadius: 'var(--layera-radius-md)',
      fontSize: 'var(--layera-fontSize-sm)',
      width: 'var(--layera-global-layout-width-full)',
      outline: 'none'
    };

    switch (colorCategory) {
      case 'backgrounds':
        return {
          ...baseStyle,
          backgroundColor: colorValue,
          color: colorValue === 'var(--layera-icon-colorWarning)' ? 'var(--layera-color-text-primary)' : 'var(--layera-color-text-on-dark)',
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: colorValue,
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: 'var(--layera-color-text-primary)',
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

        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 'var(--layera-global-spacing-6)',
            width: 'var(--layera-global-layout-width-full)',
            justifyContent: 'var(--layera-global-justifyContent-center)',
            alignItems: 'var(--layera-global-alignItems-center)',
            paddingTop: 'var(--layera-global-spacing-4)',
            paddingBottom: 'var(--layera-global-spacing-4)'
          }}
        >
          <Box style={{
            minWidth: '150px',
            marginRight: 'var(--layera-global-spacing-2)'
          }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>
              Primary Input
            </label>
            <input
              type="text"
              placeholder="Primary πεδίο"
              style={getInputStyle(currentColors.primary)}
            />
          </Box>

          <Box style={{
            minWidth: '150px',
            marginRight: 'var(--layera-global-spacing-2)'
          }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>Secondary Input</label>
            <input
              type="text"
              placeholder="Secondary πεδίο"
              style={getInputStyle(currentColors.secondary)}
            />
          </Box>

          <Box style={{
            minWidth: '150px',
            marginRight: 'var(--layera-global-spacing-2)'
          }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>Success Input</label>
            <input
              type="text"
              placeholder="Success πεδίο"
              style={getInputStyle(currentColors.success)}
            />
          </Box>

          <Box style={{
            minWidth: '150px',
            marginRight: 'var(--layera-global-spacing-2)'
          }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>Warning Input</label>
            <input
              type="text"
              placeholder="Warning πεδίο"
              style={getInputStyle(currentColors.warning)}
            />
          </Box>

          <Box style={{
            minWidth: '150px',
            marginRight: 'var(--layera-global-spacing-2)'
          }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>Danger Input</label>
            <input
              type="text"
              placeholder="Danger πεδίο"
              style={getInputStyle(currentColors.danger)}
            />
          </Box>

          <Box style={{ minWidth: '150px' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--layera-global-spacing-1)',
              fontSize: 'var(--layera-fontSize-xs)',
              fontWeight: 'var(--layera-fontWeight-bold)'
            }}>
              Info Input
            </label>
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