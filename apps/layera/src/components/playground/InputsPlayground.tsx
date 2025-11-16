import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
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
  // Input field configurations
  const inputConfigs = [
    { key: 'primary', label: 'Primary Input', placeholder: 'Primary πεδίο', colorValue: currentColors.primary },
    { key: 'secondary', label: 'Secondary Input', placeholder: 'Secondary πεδίο', colorValue: currentColors.secondary },
    { key: 'success', label: 'Success Input', placeholder: 'Success πεδίο', colorValue: currentColors.success },
    { key: 'warning', label: 'Warning Input', placeholder: 'Warning πεδίο', colorValue: currentColors.warning },
    { key: 'danger', label: 'Danger Input', placeholder: 'Danger πεδίο', colorValue: currentColors.danger },
    { key: 'info', label: 'Info Input', placeholder: 'Info πεδίο', colorValue: currentColors.info }
  ];
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
            gap: 'var(--layera-space-lg)',
            width: 'var(--layera-global-layout-width-full)',
            justifyContent: 'var(--layera-global-justifyContent-center)',
            alignItems: 'var(--layera-global-alignItems-center)',
            paddingTop: 'var(--layera-global-spacing-4)',
            paddingBottom: 'var(--layera-global-spacing-4)'
          }}
        >
          {inputConfigs.map(({ key, label, placeholder, colorValue }, index) => (
            <Box
              key={key}
              className="layera-min-width--150"
              style={{
                marginRight: index < inputConfigs.length - 1 ? 'var(--layera-global-spacing-2)' : undefined
              }}
            >
              <Text
                className="layera-typography layera-margin-bottom--xs layera-display--block"
                data-size="xs"
                data-weight="bold"
              >
                {label}
              </Text>
              <input
                type="text"
                placeholder={placeholder}
                style={getInputStyle(colorValue)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};