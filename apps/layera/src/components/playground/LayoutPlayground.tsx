import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
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
  // Layout section configurations
  const layoutConfigs = [
    { key: 'primary', title: 'Primary', description: 'Layout Section', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary', description: 'Layout Section', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success', description: 'Layout Section', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning', description: 'Layout Section', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger', description: 'Layout Section', colorValue: currentColors.danger },
    { key: 'info', title: 'Info', description: 'Layout Section', colorValue: currentColors.info }
  ];
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

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {layoutConfigs.map(({ key, title, description, colorValue }) => (
            <Box key={key} style={getLayoutStyle(colorValue)}>
              <Box>
                <Text
                  className="layera-typography layera-margin-bottom--xs"
                  data-size="sm"
                  data-weight="bold"
                >
                  {title}
                </Text>
                <Text
                  className="layera-typography layera-opacity--80"
                  data-size="xs"
                >
                  {description}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};