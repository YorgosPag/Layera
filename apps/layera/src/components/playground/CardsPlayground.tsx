import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { LayoutPlaygroundProps } from '../../types/unified-interfaces';

/**
 * CardsPlayground Component
 *
 * Live Preview για κάρτες με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστές κάρτες (P, S, Su, W, D, I)
 * Props interface moved to unified-interfaces.ts
 */

interface ExtendedCardsPlaygroundProps extends LayoutPlaygroundProps {
  /** Card radius for styling */
  cardRadius?: string;
  /** Card size for styling */
  cardSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const CardsPlayground: React.FC<ExtendedCardsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  cardRadius = 'md',
  cardSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Χρησιμοποιούμε τις κεντρικές helper functions από το PLAYGROUND_HELPERS utility
  const { getRadiusInGreek, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek, getRadiusToken } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για κάρτες',
      `μεγέθους ${getSizeInGreek(cardSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(cardRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

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



  // Debug logging
  console.log('🃏 CardsPlayground: cardRadius prop =', cardRadius);
  console.log('🃏 CardsPlayground: Final borderRadius =', getRadiusToken(cardRadius));

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
      return colorValue === 'var(--layera-colors-primary-warning)' ? 'var(--layera-colors-text-primary)' : 'var(--layera-colors-text-primary)'; // warning is light, others dark
    }
    return 'var(--layera-colors-text-secondary)'; // default for borders
  };

  // Helper to get background color
  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return 'var(--layera-colors-surface-light)'; // white background for text and borders
  };

  // Helper to get border style
  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-spacing-scale-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return 'var(--layera-spacing-scale-1) solid var(--layera-color-border-primary)'; // subtle border for others
  };

  // Initialize CSS variables for fallback values - ensure real-time preview has defaults
  // ✅ ARXES COMPLIANT: NO CSS injection - Using only @layera tokens
  // Cards use predefined CSS classes with data attributes for theming
  // NO style.setProperty() - ZERO DOM manipulation

  return (
    <Box
      className="layera-padding-left--lg layera-padding-right--lg"
    >
      {/* Live Preview Area - 6 χρωματιστές κάρτες */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Κάρτες
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {cardConfigs.map(({ key, title, description, colorValue }) => (
            <Box
              key={key}
              className="layera-flex layera-flex-column layera-flex--align-center layera-flex--justify-center layera-padding--md layera-height--6xl layera-width--card layera-flex-shrink--0 layera-card--dynamic"
              data-dynamic-bg={getBackgroundColor(colorValue)}
              data-dynamic-text={getTextColor(colorValue)}
              data-dynamic-border={getBorderStyle(colorValue)}
              data-dynamic-radius={getRadiusToken(cardRadius)}
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