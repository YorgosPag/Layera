import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

/**
 * CardsPlayground Component
 *
 * Live Preview για κάρτες με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστές κάρτες (P, S, Su, W, D, I)
 */

interface CardsPlaygroundProps {
  /** Current colors for the selected category */
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  /** Color category for proper styling */
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
}

export const CardsPlayground: React.FC<CardsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2
}) => {
  // Determine the CSS property to apply based on category
  const getCSSPropertyForCategory = (category: string) => {
    switch (category) {
      case 'backgrounds': return 'backgroundColor';
      case 'text': return 'color';
      case 'borders': return 'borderColor';
      default: return 'backgroundColor';
    }
  };

  const cssProperty = getCSSPropertyForCategory(colorCategory);

  // Helper to get text color based on category and color
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      // Dark backgrounds need white text, light backgrounds need black text
      return colorValue === '#f59e0b' ? '#000000' : '#ffffff'; // warning is light, others dark
    }
    return '#333333'; // default for borders
  };

  // Helper to get background color
  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return '#ffffff'; // white background for text and borders
  };

  // Helper to get border style
  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-global-borderWidth-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return '1px solid #e5e5e5'; // subtle border for others
  };

  return (
    <Box>
      {/* Live Preview Area - 6 χρωματιστές κάρτες */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Κάρτες
        </h3>

        <Box
          style={{
            display: 'var(--layera-global-display-flex)',
            flexDirection: 'var(--layera-global-flexDirection-row)',
            flexWrap: 'var(--layera-global-flexWrap-wrap)',
            gap: 'var(--layera-global-spacing-2)',
            width: 'var(--layera-global-layout-width-full)',
            justifyContent: 'var(--layera-global-justifyContent-center)',
            alignItems: 'var(--layera-global-alignItems-center)',
            paddingTop: 'var(--layera-global-spacing-4)',
            paddingBottom: 'var(--layera-global-spacing-4)'
          }}
        >
          {/* Primary Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.primary),
              color: getTextColor(currentColors.primary),
              border: getBorderStyle(currentColors.primary),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Primary
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Κύρια κάρτα
            </p>
          </Box>

          {/* Secondary Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.secondary),
              color: getTextColor(currentColors.secondary),
              border: getBorderStyle(currentColors.secondary),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Secondary
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Δευτερεύουσα κάρτα
            </p>
          </Box>

          {/* Success Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.success),
              color: getTextColor(currentColors.success),
              border: getBorderStyle(currentColors.success),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Success
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Κάρτα επιτυχίας
            </p>
          </Box>

          {/* Warning Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.warning),
              color: getTextColor(currentColors.warning),
              border: getBorderStyle(currentColors.warning),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Warning
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Κάρτα προειδοποίησης
            </p>
          </Box>

          {/* Danger Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.danger),
              color: getTextColor(currentColors.danger),
              border: getBorderStyle(currentColors.danger),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Danger
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Κάρτα κινδύνου
            </p>
          </Box>

          {/* Info Card */}
          <Box
            style={{
              backgroundColor: getBackgroundColor(currentColors.info),
              color: getTextColor(currentColors.info),
              border: getBorderStyle(currentColors.info),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              borderRadius: 'var(--layera-radius-md)',
              padding: 'var(--layera-global-spacing-3)'
            }}
          >
            <h4 style={{
              margin: '0 0 var(--layera-global-spacing-1) 0',
              fontSize: 'var(--layera-fontSize-sm)',
              fontWeight: 'var(--layera-fontWeight-bold)',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Info
            </h4>
            <p style={{
              margin: 'var(--layera-global-spacing-0)',
              fontSize: 'var(--layera-fontSize-xs)',
              opacity: '0.8',
              lineHeight: 'var(--layera-lineHeight-tight)'
            }}>
              Κάρτα πληροφοριών
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};