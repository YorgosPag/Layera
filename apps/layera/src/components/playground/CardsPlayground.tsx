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
}

export const CardsPlayground: React.FC<CardsPlaygroundProps> = ({
  currentColors,
  colorCategory
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
    if (colorCategory === 'borders') return `2px solid ${colorValue}`;
    return '1px solid #e5e5e5'; // subtle border for others
  };

  return (
    <Box>
      {/* Live Preview Area - 6 χρωματιστές κάρτες */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Κάρτες
        </h3>

        <Box className="layera-grid layera-grid--gap-md" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {/* Primary Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.primary),
              color: getTextColor(currentColors.primary),
              border: getBorderStyle(currentColors.primary),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Primary</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Κύρια κάρτα</p>
          </Box>

          {/* Secondary Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.secondary),
              color: getTextColor(currentColors.secondary),
              border: getBorderStyle(currentColors.secondary),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Secondary</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Δευτερεύουσα κάρτα</p>
          </Box>

          {/* Success Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.success),
              color: getTextColor(currentColors.success),
              border: getBorderStyle(currentColors.success),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Success</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Κάρτα επιτυχίας</p>
          </Box>

          {/* Warning Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.warning),
              color: getTextColor(currentColors.warning),
              border: getBorderStyle(currentColors.warning),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Warning</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Κάρτα προειδοποίησης</p>
          </Box>

          {/* Danger Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.danger),
              color: getTextColor(currentColors.danger),
              border: getBorderStyle(currentColors.danger),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Danger</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Κάρτα κινδύνου</p>
          </Box>

          {/* Info Card */}
          <Box
            className="layera-padding--lg layera-border-radius--md"
            style={{
              backgroundColor: getBackgroundColor(currentColors.info),
              color: getTextColor(currentColors.info),
              border: getBorderStyle(currentColors.info),
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>Info</h4>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Κάρτα πληροφοριών</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};