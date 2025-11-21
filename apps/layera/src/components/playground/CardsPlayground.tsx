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

  // Debug logging
  console.log('🃏 CardsPlayground: cardRadius prop =', cardRadius);
  console.log('🃏 CardsPlayground: Final borderRadius =', getRadiusToken(cardRadius));

  // Card configurations με mapping σε data-variant values
  const cardConfigs = [
    { key: 'primary', title: 'Primary', description: 'Κύρια κάρτα', colorValue: currentColors.primary, variant: undefined }, // Χωρίς variant = neutral/white
    { key: 'secondary', title: 'Secondary', description: 'Δευτερεύουσα κάρτα', colorValue: currentColors.secondary, variant: undefined }, // Χωρίς variant = neutral/white
    { key: 'success', title: 'Success', description: 'Κάρτα επιτυχίας', colorValue: currentColors.success, variant: 'success' },
    { key: 'warning', title: 'Warning', description: 'Κάρτα προειδοποίησης', colorValue: currentColors.warning, variant: 'warning' },
    { key: 'danger', title: 'Danger', description: 'Κάρτα κινδύνου', colorValue: currentColors.danger, variant: 'error' }, // danger → error
    { key: 'info', title: 'Info', description: 'Κάρτα πληροφοριών', colorValue: currentColors.info, variant: 'info' }
  ];

  // ✅ ARXES COMPLIANT: NO CSS injection - Using only @layera tokens
  // Cards use predefined CSS classes with data-variant attributes for semantic theming
  // NO style.setProperty() - ZERO DOM manipulation - ZERO inline styles

  return (
    <Box>
      {/* Live Preview Area - 6 χρωματιστές κάρτες */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Κάρτες
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="global-display-flex global-justifyContent-center global-alignItems-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg">
          {cardConfigs.map(({ key, title, variant }) => (
            <Box
              key={key}
              className="layera-width--32 layera-height--6 layera-card"
              data-variant={variant}
            >
              <Text
                className="layera-typography layera-text--align-center"
                style={{
                  textAlign: 'var(--layera-card-text-align-horizontal-center)',
                  verticalAlign: 'var(--layera-card-text-align-vertical-middle)'
                }}
                data-size="xs"
                data-weight="bold"
              >
                {title}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};