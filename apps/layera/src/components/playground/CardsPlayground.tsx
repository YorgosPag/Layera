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

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '8px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 0'
        }}>
          {/* Primary Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.primary),
              color: getTextColor(currentColors.primary),
              border: getBorderStyle(currentColors.primary),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Primary</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Κύρια κάρτα</p>
          </div>

          {/* Secondary Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.secondary),
              color: getTextColor(currentColors.secondary),
              border: getBorderStyle(currentColors.secondary),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Secondary</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Δευτερεύουσα κάρτα</p>
          </div>

          {/* Success Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.success),
              color: getTextColor(currentColors.success),
              border: getBorderStyle(currentColors.success),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Success</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Κάρτα επιτυχίας</p>
          </div>

          {/* Warning Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.warning),
              color: getTextColor(currentColors.warning),
              border: getBorderStyle(currentColors.warning),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Warning</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Κάρτα προειδοποίησης</p>
          </div>

          {/* Danger Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.danger),
              color: getTextColor(currentColors.danger),
              border: getBorderStyle(currentColors.danger),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Danger</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Κάρτα κινδύνου</p>
          </div>

          {/* Info Card */}
          <div
            style={{
              backgroundColor: getBackgroundColor(currentColors.info),
              color: getTextColor(currentColors.info),
              border: getBorderStyle(currentColors.info),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              padding: '12px'
            }}
          >
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>Info</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8, lineHeight: '1.1' }}>Κάρτα πληροφοριών</p>
          </div>
        </div>
      </Box>
    </Box>
  );
};