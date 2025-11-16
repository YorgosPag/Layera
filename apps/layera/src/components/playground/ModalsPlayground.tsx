import React from 'react';
import { Box } from '@layera/layout';
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

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
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
          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.primary),
              color: getTextColor(currentColors.primary),
              border: getBorderStyle(currentColors.primary)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Primary Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Κύριο modal
            </p>
          </Box>

          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.secondary),
              color: getTextColor(currentColors.secondary),
              border: getBorderStyle(currentColors.secondary)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Secondary Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Δευτερεύον modal
            </p>
          </Box>

          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.success),
              color: getTextColor(currentColors.success),
              border: getBorderStyle(currentColors.success)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Success Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Modal επιτυχίας
            </p>
          </Box>

          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.warning),
              color: getTextColor(currentColors.warning),
              border: getBorderStyle(currentColors.warning)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Warning Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Modal προειδοποίησης
            </p>
          </Box>

          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.danger),
              color: getTextColor(currentColors.danger),
              border: getBorderStyle(currentColors.danger)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Danger Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Modal κινδύνου
            </p>
          </Box>

          <Box
            style={{
              padding: 'var(--layera-global-spacing-3)',
              ...modalStyle,
              backgroundColor: getBackgroundColor(currentColors.info),
              color: getTextColor(currentColors.info),
              border: getBorderStyle(currentColors.info)
            }}
          >
            <Box style={{
              display: 'flex',
              justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
              alignItems: 'var(--layera-global-alignItems-center)'
            }}>
              <h4 style={{
                margin: 'var(--layera-global-spacing-0)',
                fontSize: 'var(--layera-fontSize-sm)',
                fontWeight: 'var(--layera-fontWeight-bold)'
              }}>
                Info Modal
              </h4>
              <CloseIcon size="sm" />
            </Box>
            <p style={{
              margin: 'var(--layera-global-spacing-2) var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8'
            }}>
              Modal πληροφοριών
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};