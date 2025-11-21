/**
 * 🔲 LAYERA BUTTON CLASS - Button component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το button component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Button components
 */

import { BUTTON_VARIABLES, ButtonVariant, ButtonSize, ButtonState } from './buttons.variables';
import { BUTTON_VARIANTS, ButtonVariantType, ButtonSizeType } from './buttons.variants';

// BUTTON COMPONENT SYSTEM CLASS - Enterprise structure
export class ButtonComponentSystem {
  // Component tokens
  static readonly variables = BUTTON_VARIABLES;
  static readonly variants = BUTTON_VARIANTS;

  // Utility methods για validation
  static isValidVariant(variant: string): variant is ButtonVariant {
    return ['primary', 'secondary', 'ghost', 'danger'].includes(variant);
  }

  static isValidSize(size: string): size is ButtonSize {
    return ['xs', 'sm', 'md', 'lg', 'xl'].includes(size);
  }

  static isValidState(state: string): state is ButtonState {
    return ['default', 'hover', 'active', 'disabled', 'focus'].includes(state);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για button
  static getButtonCSS(
    variant: ButtonVariant = 'primary',
    size: ButtonSize = 'md',
    state: ButtonState = 'default'
  ) {
    const variantStyle = this.variants[variant][state];
    const sizeStyle = this.variants.size[size];

    return {
      // Core styles
      backgroundColor: variantStyle.background,
      color: variantStyle.color,
      border: variantStyle.border,
      boxShadow: variantStyle.shadow,
      transition: variantStyle.transition,

      // Size styles
      padding: sizeStyle.padding,
      borderRadius: sizeStyle.borderRadius,

      // Base button properties
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      outline: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: '500',
      lineHeight: '1',
      textDecoration: 'none',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  // Helper για creating CSS classes
  static generateCSSClasses() {
    let css = '';

    // Base button class
    css += `
.layera-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  user-select: none;
  outline: none;
  cursor: pointer;
  transition: ${this.variables['button-transition-default']};
}

.layera-button:disabled {
  cursor: not-allowed;
}
`;

    // Variant classes
    (['primary', 'secondary', 'ghost', 'danger'] as const).forEach(variant => {
      const variantStyles = this.variants[variant];

      css += `
.layera-button--${variant} {
  background-color: ${variantStyles.default.background};
  color: ${variantStyles.default.color};
  border: ${variantStyles.default.border};
  box-shadow: ${variantStyles.default.shadow};
}

.layera-button--${variant}:hover:not(:disabled) {
  background-color: ${variantStyles.hover.background};
  color: ${variantStyles.hover.color};
  border: ${variantStyles.hover.border};
  box-shadow: ${variantStyles.hover.shadow};
}

.layera-button--${variant}:active:not(:disabled) {
  background-color: ${variantStyles.active.background};
  color: ${variantStyles.active.color};
  border: ${variantStyles.active.border};
  box-shadow: ${variantStyles.active.shadow};
}

.layera-button--${variant}:disabled {
  background-color: ${variantStyles.disabled.background};
  color: ${variantStyles.disabled.color};
  border: ${variantStyles.disabled.border};
  box-shadow: ${variantStyles.disabled.shadow};
}
`;
    });

    // Size classes
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach(size => {
      const sizeStyles = this.variants.size[size];

      css += `
.layera-button--${size} {
  padding: ${sizeStyles.padding};
  border-radius: ${sizeStyles.borderRadius};
}
`;
    });

    return css;
  }

  // Helper για focus ring accessibility
  static getFocusRingCSS() {
    return `
.layera-button:focus-visible {
  outline: 2px solid var(--layera-color-primary-500);
  outline-offset: 2px;
}
`;
  }

  // Helper για creating React/Vue/Angular component props
  static getComponentProps(variant: ButtonVariant, size: ButtonSize, disabled: boolean = false) {
    return {
      'data-variant': variant,
      'data-size': size,
      'data-disabled': disabled,
      className: `layera-button layera-button--${variant} layera-button--${size}`,
      disabled,
      'aria-disabled': disabled,
    };
  }
}

// BUTTON COMPONENT RULES - Enterprise specifications
export const BUTTON_COMPONENT_RULES = {
  // Usage guidelines
  usage: {
    primary: 'Main call-to-action, only one per page/section',
    secondary: 'Secondary actions, supporting primary CTA',
    ghost: 'Minimal actions, tertiary importance',
    danger: 'Destructive actions only (delete, remove, etc.)',
    sizing: 'md for default, lg for hero CTAs, sm for compact spaces',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'All button variants meet WCAG AA contrast requirements',
    focus: 'Visible focus indicators for keyboard navigation',
    disabled: 'aria-disabled attribute and visual disabled state',
    labels: 'Clear, descriptive button text or aria-label',
    touch: 'Minimum 44px touch target for mobile',
  },

  // UX guidelines
  ux: {
    hierarchy: 'Primary > Secondary > Ghost for visual hierarchy',
    consistency: 'Use same variant and size for similar actions',
    placement: 'Primary actions on right, secondary on left',
    loading: 'Show loading state for async actions',
    feedback: 'Provide clear feedback for successful actions',
  },

  // Implementation guidelines
  implementation: {
    states: 'Handle all interactive states (hover, active, focus, disabled)',
    responsive: 'Consider mobile touch targets and spacing',
    performance: 'Use CSS transitions for smooth interactions',
    frameworks: 'Support React, Vue, Angular with component props',
  },

  // Component mapping suggestions
  componentMapping: {
    forms: ['primary for submit', 'secondary for cancel'],
    modals: ['primary for confirm', 'ghost for close'],
    cards: ['ghost or secondary for actions'],
    navigation: ['ghost for nav items', 'primary for CTAs'],
    tables: ['ghost for row actions', 'secondary for bulk actions'],
    deletion: ['danger for destructive actions only'],
  },
} as const;