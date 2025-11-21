/**
 * 🃏 LAYERA CARD CLASS - Card component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το card component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Card components
 */

import { CARD_VARIABLES, CardVariant, CardSize, CardPadding } from './cards.variables';
import { CARD_VARIANTS, CardVariantType, CardSizeType, CardPaddingType } from './cards.variants';

// CARD COMPONENT SYSTEM CLASS - Enterprise structure
export class CardComponentSystem {
  // Component tokens
  static readonly variables = CARD_VARIABLES;
  static readonly variants = CARD_VARIANTS;

  // Utility methods για validation
  static isValidVariant(variant: string): variant is CardVariant {
    return ['elevated', 'outlined', 'filled', 'property', 'job', 'info', 'success', 'warning', 'error', 'neutral'].includes(variant);
  }

  static isValidSize(size: string): size is CardSize {
    return ['sm', 'md', 'lg', 'xl'].includes(size);
  }

  static isValidPadding(padding: string): padding is CardPadding {
    return ['none', 'sm', 'md', 'lg'].includes(padding);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για card
  static getCardCSS(
    variant: CardVariant = 'elevated',
    size: CardSize = 'md',
    padding: CardPadding = 'md'
  ) {
    const variantStyle = this.variants[variant];
    const sizeStyle = this.variants.size[size];
    const paddingStyle = this.variants.padding[padding];

    return {
      // Core styles from variant
      backgroundColor: variantStyle.background,
      border: variantStyle.border,
      borderRadius: variantStyle.borderRadius,
      boxShadow: variantStyle.shadow,

      // Size styles
      minHeight: sizeStyle.minHeight,
      maxWidth: sizeStyle.maxWidth,

      // Padding styles
      padding: paddingStyle.padding,

      // Base card properties
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
    };
  }

  // Helper για creating CSS classes
  static generateCSSClasses() {
    let css = '';

    // Base card class
    css += `
.layera-card {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: ${this.variables['card-transition']};
  font-family: ${this.variables['card-font-family']};
  color: ${this.variables['card-text-color']};
}

.layera-card[data-clickable="true"] {
  cursor: pointer;
}

.layera-card[data-hoverable="true"]:hover {
  transform: translateY(-2px);
  box-shadow: ${this.variables['card-shadow-hover']};
}

.layera-card__header {
  display: flex;
  align-items: flex-start;
  gap: ${this.variables['card-header-gap']};
  margin-bottom: ${this.variables['card-header-margin-bottom']};
}

.layera-card__icon {
  flex-shrink: 0;
  width: ${this.variables['card-icon-size']};
  height: ${this.variables['card-icon-size']};
  display: flex;
  align-items: center;
  justify-content: center;
}

.layera-card__headerContent {
  flex: 1;
  min-width: 0;
}

.layera-card__title {
  font-size: ${this.variables['card-title-font-size']};
  font-weight: ${this.variables['card-title-font-weight']};
  line-height: ${this.variables['card-title-line-height']};
  color: ${this.variables['card-title-color']};
  margin-bottom: ${this.variables['card-title-margin-bottom']};
}

.layera-card__subtitle {
  font-size: ${this.variables['card-subtitle-font-size']};
  font-weight: ${this.variables['card-subtitle-font-weight']};
  color: ${this.variables['card-subtitle-color']};
  margin-bottom: ${this.variables['card-subtitle-margin-bottom']};
}

.layera-card__description {
  font-size: ${this.variables['card-description-font-size']};
  color: ${this.variables['card-description-color']};
  line-height: ${this.variables['card-description-line-height']};
}

.layera-card__actions {
  flex-shrink: 0;
  margin-left: auto;
}

.layera-card__content {
  flex: 1;
  min-height: 0;
}

.layera-card__footer {
  margin-top: ${this.variables['card-footer-margin-top']};
  padding-top: ${this.variables['card-footer-padding-top']};
  border-top: ${this.variables['card-footer-border']};
}
`;

    // Variant classes - με data-attribute ΚΑΙ BEM class για flexibility
    (['elevated', 'outlined', 'filled', 'property', 'job', 'info', 'success', 'warning', 'error', 'neutral'] as const).forEach(variant => {
      const variantStyles = this.variants[variant];

      css += `
.layera-card[data-variant="${variant}"],
.layera-card--${variant} {
  background-color: ${variantStyles.background};
  border: ${variantStyles.border};
  border-radius: ${variantStyles.borderRadius};
  box-shadow: ${variantStyles.shadow};
}
`;
    });

    // Size classes
    (['sm', 'md', 'lg', 'xl'] as const).forEach(size => {
      const sizeStyles = this.variants.size[size];

      css += `
.layera-card[data-size="${size}"] {
  min-height: ${sizeStyles.minHeight};
  max-width: ${sizeStyles.maxWidth};
}
`;
    });

    // Padding classes
    (['none', 'sm', 'md', 'lg'] as const).forEach(paddingSize => {
      const paddingStyles = this.variants.padding[paddingSize];

      css += `
.layera-card[data-padding="${paddingSize}"] {
  padding: ${paddingStyles.padding};
}
`;
    });

    return css;
  }

  // Helper για focus ring accessibility
  static getFocusRingCSS() {
    return `
.layera-card[data-clickable="true"]:focus-visible {
  outline: 2px solid var(--layera-color-primary-500);
  outline-offset: 2px;
}
`;
  }

  // Helper για creating React/Vue/Angular component props
  static getComponentProps(
    variant: CardVariant,
    size: CardSize,
    padding: CardPadding,
    clickable: boolean = false,
    hoverable: boolean = false
  ) {
    return {
      'data-variant': variant,
      'data-size': size,
      'data-padding': padding,
      'data-clickable': clickable.toString(),
      'data-hoverable': hoverable.toString(),
      className: 'layera-card',
    };
  }
}

// CARD COMPONENT RULES - Enterprise specifications
export const CARD_COMPONENT_RULES = {
  // Usage guidelines
  usage: {
    elevated: 'Default cards with shadow elevation',
    outlined: 'Cards with border, no shadow',
    filled: 'Cards with background color',
    property: 'Property-specific styling with backdrop',
    job: 'Job-specific styling',
    info: 'Informational cards - blue theme',
    success: 'Success state cards - green theme',
    warning: 'Warning state cards - yellow/orange theme',
    error: 'Error state cards - red theme',
    neutral: 'Neutral state cards - gray theme',
    sizing: 'md for default, lg for featured content, sm for compact spaces',
    padding: 'md for default, lg for spacious content, sm/none for compact',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'All card variants meet WCAG AA contrast requirements',
    focus: 'Visible focus indicators for keyboard navigation when clickable',
    clickable: 'Proper role and tabIndex for interactive cards',
    headers: 'Semantic header structure within cards',
    touch: 'Minimum 44px touch target for interactive elements',
  },

  // UX guidelines
  ux: {
    hierarchy: 'Use elevation and borders to create visual hierarchy',
    consistency: 'Use same variant and size for similar content types',
    spacing: 'Consistent internal spacing using padding variants',
    loading: 'Show loading state for async content',
    empty: 'Provide empty states for cards without content',
    overflow: 'Handle content overflow gracefully',
  },

  // Implementation guidelines
  implementation: {
    structure: 'Use semantic HTML structure (header, content, footer)',
    responsive: 'Cards adapt to container width responsively',
    performance: 'Use CSS transitions for smooth hover effects',
    frameworks: 'Support React, Vue, Angular with component props',
    nesting: 'Avoid deeply nested cards - prefer flat structure',
  },

  // Component mapping suggestions
  componentMapping: {
    dashboard: ['stats cards', 'chart cards', 'metric cards'],
    forms: ['form sections', 'input groups'],
    lists: ['list items', 'grid items'],
    content: ['articles', 'blog posts', 'media items'],
    navigation: ['feature cards', 'category cards'],
    feedback: ['alerts in card format', 'notifications'],
  },
} as const;