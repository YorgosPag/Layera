import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
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

  // Base card style object
  const cardStyle = {
    height: 'var(--layera-fontSize-6xl)',
    width: 'calc(var(--layera-fontSize-6xl) * 3)',
    minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
    borderRadius: 'var(--layera-radius-md)'
  };

  // Card configurations
  const cardConfigs = [
    { key: 'primary', title: 'Primary', description: 'Κύρια κάρτα', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary', description: 'Δευτερεύουσα κάρτα', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success', description: 'Κάρτα επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning', description: 'Κάρτα προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger', description: 'Κάρτα κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info', description: 'Κάρτα πληροφοριών', colorValue: currentColors.info }
  ];

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

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-sm layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {cardConfigs.map(({ key, title, description, colorValue }) => (
            <Box
              key={key}
              className="layera-flex layera-flex-column layera-flex--align-center layera-flex--justify-center layera-padding--md"
              style={{
                ...cardStyle,
                '--layera-card-bg-color': getBackgroundColor(colorValue),
                '--layera-card-text-color': getTextColor(colorValue),
                '--layera-card-border': getBorderStyle(colorValue),
                backgroundColor: 'var(--layera-card-bg-color)',
                color: 'var(--layera-card-text-color)',
                border: 'var(--layera-card-border)'
              } as React.CSSProperties}
            >
              <Text
                className="layera-typography layera-margin-bottom--xs layera-line-height--tight"
                data-size="sm"
                data-weight="bold"
              >
                {title}
              </Text>
              <Text
                className="layera-typography layera-opacity--80 layera-line-height--tight"
                data-size="xs"
              >
                {description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};