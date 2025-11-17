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
  /** Card radius for styling */
  cardRadius?: string;
  /** Card size for styling */
  cardSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const CardsPlayground: React.FC<CardsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  cardRadius = 'md',
  cardSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Helper function για translation των radius values
  const getRadiusInGreek = (radius: string) => {
    switch(radius) {
      case 'none': return 'χωρίς καμπυλότητα';
      case 'xs': return 'ελαφρά καμπυλότητα';
      case 'sm': return 'μικρή καμπυλότητα';
      case 'md': return 'μεσαία καμπυλότητα';
      case 'lg': return 'μεγάλη καμπυλότητα';
      case 'xl': return 'πολύ μεγάλη καμπυλότητα';
      case 'round': return 'πλήρως στρογγυλά';
      default: return radius;
    }
  };

  // Helper function για translation των hover effects
  const getHoverEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς hover effect';
      case 'normal': return 'κανονικό hover effect';
      case 'glow': return 'φωτεινό hover effect';
      case 'shadow': return 'σκιώδες hover effect';
      default: return effect;
    }
  };

  // Helper function για translation των active effects
  const getActiveEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς active effect';
      case 'scale': return 'μεγέθυνση κατά το πάτημα';
      case 'press': return 'πίεση κατά το πάτημα';
      case 'ripple': return 'κύματα κατά το πάτημα';
      default: return effect;
    }
  };

  // Helper function για size translation
  const getSizeInGreek = (size: string) => {
    switch(size) {
      case 'xs': return 'πολύ μικρά';
      case 'sm': return 'μικρά';
      case 'md': return 'μεσαία';
      case 'lg': return 'μεγάλα';
      case 'xl': return 'πολύ μεγάλα';
      default: return size;
    }
  };

  // Helper function για category translation
  const getCategoryInGreek = (category: string) => {
    switch(category.toLowerCase()) {
      case 'backgrounds': return 'ΦΟΝΤΑ';
      case 'text': return 'ΚΕΙΜΕΝΑ';
      case 'borders': return 'ΠΕΡΙΓΡΑΜΜΑΤΑ';
      default: return category.toUpperCase();
    }
  };

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

  // Helper function για μετατροπή radius values σε tokens
  const getRadiusToken = (radius: string) => {
    switch(radius) {
      case 'none': return '0px';
      case 'xs': return 'var(--layera-radius-xs)';      // 2px
      case 'sm': return 'var(--layera-radius-sm)';      // 4px
      case 'md': return 'var(--layera-radius-md)';      // 6px - default για κάρτες
      case 'lg': return 'var(--layera-radius-lg)';      // 8px
      case 'xl': return 'var(--layera-radius-xl)';      // 12px
      case 'xxl': return 'var(--layera-radius-xxl)';    // 16px
      case 'round': return 'var(--layera-radius-full)'; // πλήρως στρογγυλά
      default: return 'var(--layera-radius-card)';      // 8px fallback
    }
  };

  // Base card style object
  const cardStyle = {
    height: 'var(--layera-fontSize-6xl)',
    width: 'calc(var(--layera-fontSize-6xl) * 3)',
    minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
    borderRadius: getRadiusToken(cardRadius)
  };

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

  // Initialize CSS variables for fallback values - ensure real-time preview has defaults
  React.useEffect(() => {
    const root = document.documentElement;
    cardConfigs.forEach(({ key, colorValue }) => {
      // Set initial CSS variables if not already set by real-time preview
      if (!root.style.getPropertyValue(`--layera-card-bg-${key}`)) {
        root.style.setProperty(`--layera-card-bg-${key}`, getBackgroundColor(colorValue));
        root.style.setProperty(`--layera-card-text-${key}`, getTextColor(colorValue));
        root.style.setProperty(`--layera-card-border-${key}`, getBorderStyle(colorValue));
      }
    });
  }, [cardConfigs, colorCategory, borderWidth]);

  return (
    <Box
      style={{
        paddingLeft: 'var(--layera-size-6)',
        paddingRight: 'var(--layera-size-6)'
      } as React.CSSProperties}
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
              className="layera-flex layera-flex-column layera-flex--align-center layera-flex--justify-center layera-padding--md"
              style={{
                ...cardStyle,
                // Χρήση CSS variables για real-time preview support
                backgroundColor: `var(--layera-card-bg-${key}, ${getBackgroundColor(colorValue)})`,
                color: `var(--layera-card-text-${key}, ${getTextColor(colorValue)})`,
                border: `var(--layera-card-border-${key}, ${getBorderStyle(colorValue)})`
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