import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon, CloseIcon } from '@layera/icons';

/**
 * ModalsPlayground Component
 *
 * Live Preview για modals με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστά modals (P, S, Su, W, D, I)
 */

interface ModalsPlaygroundProps {
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

export const ModalsPlayground: React.FC<ModalsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2
}) => {
  // Helper functions same as CardsPlayground
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      return colorValue === '#f59e0b' ? '#000000' : '#ffffff';
    }
    return '#333333';
  };

  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return '#ffffff';
  };

  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-global-borderWidth-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return '1px solid #e5e5e5';
  };

  const modalStyle = {
    height: 'var(--layera-fontSize-6xl)',
    width: 'calc(var(--layera-fontSize-6xl) * 3)',
    minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    borderRadius: 'var(--layera-radius-lg)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'var(--layera-global-justifyContent-center)',
    alignItems: 'var(--layera-global-alignItems-center)',
    position: 'relative' as const,
    boxShadow: 'var(--layera-shadow-md)',
    flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)'
  };

  const modalConfigs = [
    { key: 'primary', title: 'Primary Modal', description: 'Κύριο modal', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Modal', description: 'Δευτερεύον modal', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Modal', description: 'Modal επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Modal', description: 'Modal προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Modal', description: 'Modal κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Modal', description: 'Modal πληροφοριών', colorValue: currentColors.info }
  ];

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
        </h3>

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {modalConfigs.map(({ key, title, description, colorValue }) => (
            <Box
              key={key}
              className="layera-padding--md"
              style={{
                ...modalStyle,
                backgroundColor: getBackgroundColor(colorValue),
                color: getTextColor(colorValue),
                border: getBorderStyle(colorValue)
              }}
            >
              <Box className="layera-flex layera-flex--justify-between layera-flex--align-center">
                <Text className="layera-typography" data-size="sm" data-weight="bold">
                  {title}
                </Text>
                <CloseIcon size="sm" />
              </Box>
              <Text className="layera-typography layera-margin-top--sm layera-opacity--80" data-size="xs">
                {description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};