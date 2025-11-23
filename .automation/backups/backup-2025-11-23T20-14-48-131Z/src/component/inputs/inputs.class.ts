/**
 * 📝 LAYERA INPUT CLASS - Input component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το input component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Input components
 */

import { INPUT_VARIABLES, InputSize, InputState, InputVariant, InputType } from './inputs.variables';
import { INPUT_VARIANTS, InputVariantType, InputSizeType, InputStateType } from './inputs.variants';

// INPUT COMPONENT SYSTEM CLASS - Enterprise structure
export class InputComponentSystem {
  // Component tokens
  static readonly variables = INPUT_VARIABLES;
  static readonly variants = INPUT_VARIANTS;

  // Utility methods για validation
  static isValidSize(size: string): size is InputSize {
    return ['sm', 'md', 'lg'].includes(size);
  }

  static isValidState(state: string): state is InputState {
    return ['default', 'hover', 'focus', 'disabled', 'error', 'success', 'warning'].includes(state);
  }

  static isValidVariant(variant: string): variant is InputVariant {
    return ['default', 'filled', 'outlined', 'underlined'].includes(variant);
  }

  static isValidType(type: string): type is InputType {
    return ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'range', 'file'].includes(type);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για input
  static getInputCSS(
    variant: InputVariant = 'default',
    size: InputSize = 'md',
    state: InputState = 'default',
    type: InputType = 'text'
  ) {
    const variantStyle = this.variants[variant][state];
    const sizeStyle = this.variants.size[size];

    const baseStyles = {
      // Base input properties
      fontFamily: 'inherit',
      fontWeight: '400',
      outline: 'none',
      transition: this.variables['input-transition'],
      boxSizing: 'border-box' as const,
      width: '100%',

      // Variant styles
      backgroundColor: variantStyle.background,
      color: variantStyle.color,
      border: variantStyle.border,
      borderRadius: variantStyle.borderRadius,
      boxShadow: variantStyle.shadow,

      // Size styles
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
    };

    // Type-specific adjustments
    if (type === 'textarea') {
      return {
        ...baseStyles,
        height: this.variables['textarea-min-height'],
        resize: this.variables['textarea-resize'] as const,
        lineHeight: this.variables['textarea-line-height'],
      };
    }

    if (type === 'select') {
      return {
        ...baseStyles,
        paddingRight: this.variables['select-padding-right'],
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1rem',
        appearance: 'none' as const,
      };
    }

    if (type === 'checkbox' || type === 'radio') {
      const checkboxRadius = type === 'radio' ? this.variables['radio-border-radius'] : this.variables['checkbox-border-radius'];
      return {
        width: this.variables[`${type}-size`],
        height: this.variables[`${type}-size`],
        borderRadius: checkboxRadius,
        backgroundColor: variantStyle.background,
        border: variantStyle.border,
        cursor: 'pointer',
        appearance: 'none' as const,
      };
    }

    if (type === 'range') {
      return {
        ...baseStyles,
        height: this.variables['range-track-height'],
        backgroundColor: this.variables['range-track-background'],
        borderRadius: this.variables['range-track-border-radius'],
        appearance: 'none' as const,
        cursor: 'pointer',
      };
    }

    if (type === 'file') {
      return {
        ...baseStyles,
        cursor: 'pointer',
      };
    }

    return baseStyles;
  }

  // Helper για creating CSS classes
  static generateCSSClasses() {
    let css = '';

    // Base input class
    css += `
.layera-input {
  font-family: inherit;
  font-weight: 400;
  outline: none;
  transition: ${this.variables['input-transition']};
  box-sizing: border-box;
  width: 100%;
  display: block;
}

.layera-input:disabled {
  cursor: not-allowed;
  opacity: ${this.variables['input-loading-opacity']};
}

.layera-input::placeholder {
  color: ${this.variables['input-text-placeholder']};
}

.layera-input:focus {
  outline: none;
  box-shadow: ${this.variables['input-shadow-focus']};
}

/* Input Group */
.layera-input-group {
  display: flex;
  align-items: stretch;
  gap: ${this.variables['input-group-gap']};
}

.layera-input-group .layera-input {
  flex: 1;
  min-width: 0;
}

/* Input Addon */
.layera-input-addon {
  display: flex;
  align-items: center;
  padding: ${this.variables['input-addon-padding']};
  background-color: ${this.variables['input-addon-background']};
  border: ${this.variables['input-addon-border']};
  color: ${this.variables['input-addon-color']};
  border-radius: ${this.variables['input-border-radius']};
  white-space: nowrap;
}

.layera-input-addon--prefix {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.layera-input-addon--suffix {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}

/* Label */
.layera-input-label {
  display: block;
  font-size: ${this.variables['label-font-size']};
  font-weight: ${this.variables['label-font-weight']};
  color: ${this.variables['label-color']};
  margin-bottom: ${this.variables['label-margin-bottom']};
}

.layera-input-label--disabled {
  color: ${this.variables['label-color-disabled']};
}

.layera-input-label--required::after {
  content: " *";
  color: ${this.variables['label-required-color']};
}

/* Helper Text */
.layera-input-helper {
  font-size: ${this.variables['helper-text-font-size']};
  margin-top: ${this.variables['helper-text-margin-top']};
  color: ${this.variables['helper-text-color']};
}

.layera-input-helper--error {
  color: ${this.variables['helper-text-error']};
}

.layera-input-helper--success {
  color: ${this.variables['helper-text-success']};
}

.layera-input-helper--warning {
  color: ${this.variables['helper-text-warning']};
}
`;

    // Variant classes
    (['default', 'filled', 'outlined', 'underlined'] as const).forEach(variant => {
      const variantStyles = this.variants[variant];

      css += `
.layera-input[data-variant="${variant}"] {
  background-color: ${variantStyles.default.background};
  color: ${variantStyles.default.color};
  border: ${variantStyles.default.border};
  border-radius: ${variantStyles.default.borderRadius};
  box-shadow: ${variantStyles.default.shadow};
}

.layera-input[data-variant="${variant}"]:hover:not(:disabled):not(:focus) {
  background-color: ${variantStyles.hover.background};
  border-color: ${variantStyles.hover.border};
}

.layera-input[data-variant="${variant}"]:focus {
  background-color: ${variantStyles.focus.background};
  border-color: ${variantStyles.focus.border};
  box-shadow: ${variantStyles.focus.shadow};
}

.layera-input[data-variant="${variant}"]:disabled {
  background-color: ${variantStyles.disabled.background};
  color: ${variantStyles.disabled.color};
  border-color: ${variantStyles.disabled.border};
}

.layera-input[data-variant="${variant}"][data-state="error"] {
  background-color: ${variantStyles.error.background};
  border-color: ${variantStyles.error.border};
  box-shadow: ${variantStyles.error.shadow};
}

.layera-input[data-variant="${variant}"][data-state="success"] {
  background-color: ${variantStyles.success.background};
  border-color: ${variantStyles.success.border};
  box-shadow: ${variantStyles.success.shadow};
}

.layera-input[data-variant="${variant}"][data-state="warning"] {
  background-color: ${variantStyles.warning.background};
  border-color: ${variantStyles.warning.border};
  box-shadow: ${variantStyles.warning.shadow};
}
`;
    });

    // Size classes
    (['sm', 'md', 'lg'] as const).forEach(size => {
      const sizeStyles = this.variants.size[size];

      css += `
.layera-input[data-size="${size}"] {
  height: ${sizeStyles.height};
  padding: ${sizeStyles.padding};
  font-size: ${sizeStyles.fontSize};
  line-height: ${sizeStyles.lineHeight};
}
`;
    });

    // Type-specific classes
    css += `
/* Textarea */
.layera-input[data-type="textarea"] {
  min-height: ${this.variables['textarea-min-height']};
  resize: ${this.variables['textarea-resize']};
  line-height: ${this.variables['textarea-line-height']};
}

/* Select */
.layera-input[data-type="select"] {
  padding-right: ${this.variables['select-padding-right']};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  appearance: none;
}

/* Checkbox */
.layera-input[data-type="checkbox"] {
  width: ${this.variables['checkbox-size']};
  height: ${this.variables['checkbox-size']};
  border-radius: ${this.variables['checkbox-border-radius']};
  appearance: none;
  cursor: pointer;
}

.layera-input[data-type="checkbox"]:checked {
  background-color: ${this.variables['checkbox-checked-background']};
  border-color: ${this.variables['checkbox-checked-border']};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m13.854 3.646-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 9.586l6.646-6.64a.5.5 0 0 1 .708.708z'/%3E%3C/svg%3E");
}

/* Radio */
.layera-input[data-type="radio"] {
  width: ${this.variables['radio-size']};
  height: ${this.variables['radio-size']};
  border-radius: ${this.variables['radio-border-radius']};
  appearance: none;
  cursor: pointer;
}

.layera-input[data-type="radio"]:checked {
  background-color: ${this.variables['radio-checked-background']};
  border-color: ${this.variables['radio-checked-border']};
  background-image: radial-gradient(circle, white ${this.variables['radio-dot-size']}, transparent ${this.variables['radio-dot-size']});
}

/* Range */
.layera-input[data-type="range"] {
  height: ${this.variables['range-track-height']};
  background-color: ${this.variables['range-track-background']};
  border-radius: ${this.variables['range-track-border-radius']};
  appearance: none;
  cursor: pointer;
}

.layera-input[data-type="range"]::-webkit-slider-thumb {
  width: ${this.variables['range-thumb-size']};
  height: ${this.variables['range-thumb-size']};
  background-color: ${this.variables['range-thumb-background']};
  border: ${this.variables['range-thumb-border']};
  border-radius: 50%;
  box-shadow: ${this.variables['range-thumb-shadow']};
  appearance: none;
  cursor: pointer;
}

.layera-input[data-type="range"]::-webkit-slider-thumb:hover {
  box-shadow: ${this.variables['range-thumb-hover-shadow']};
}

/* File */
.layera-input[data-type="file"] {
  cursor: pointer;
}

.layera-input[data-type="file"]::-webkit-file-upload-button {
  background-color: ${this.variables['file-input-button-background']};
  border: ${this.variables['file-input-button-border']};
  color: ${this.variables['file-input-button-color']};
  padding: ${this.variables['file-input-button-padding']};
  border-radius: ${this.variables['input-border-radius']};
  cursor: pointer;
  margin-right: 0.5rem;
}

.layera-input[data-type="file"]::-webkit-file-upload-button:hover {
  background-color: ${this.variables['file-input-button-hover-background']};
}
`;

    return css;
  }

  // Helper για focus ring accessibility
  static getFocusRingCSS() {
    return `
.layera-input:focus-visible {
  outline: ${this.variables['input-focus-ring-width']} ${this.variables['input-focus-ring-style']} ${this.variables['input-focus-ring-color']};
  outline-offset: ${this.variables['input-focus-ring-offset']};
}
`;
  }

  // Helper για creating React/Vue/Angular component props
  static getComponentProps(
    variant: InputVariant,
    size: InputSize,
    type: InputType,
    state: InputState = 'default',
    disabled: boolean = false
  ) {
    return {
      'data-variant': variant,
      'data-size': size,
      'data-type': type,
      'data-state': state,
      'data-disabled': disabled.toString(),
      className: 'layera-input',
      disabled,
      'aria-disabled': disabled,
    };
  }
}

// INPUT COMPONENT RULES - Enterprise specifications
export const INPUT_COMPONENT_RULES = {
  // Usage guidelines
  usage: {
    default: 'Standard input appearance with border',
    filled: 'Filled background, minimal border',
    outlined: 'Prominent border, transparent background',
    underlined: 'Bottom border only, minimal styling',
    sizing: 'md for default, lg for prominent forms, sm for compact spaces',
    validation: 'Always provide clear error states and helper text',
  },

  // Accessibility guidelines
  accessibility: {
    labels: 'Always associate labels with inputs using for/id or aria-label',
    contrast: 'All input variants meet WCAG AA contrast requirements',
    focus: 'Visible focus indicators for keyboard navigation',
    errors: 'Error messages linked with aria-describedby',
    required: 'Required fields marked with aria-required and visual indicators',
    placeholders: 'Use placeholders sparingly, prefer labels',
  },

  // UX guidelines
  ux: {
    validation: 'Validate on blur, show success on valid input',
    errors: 'Show specific, actionable error messages',
    loading: 'Show loading states for async validation',
    grouping: 'Group related inputs with fieldsets',
    progression: 'Clear form progression and step indicators',
    feedback: 'Immediate feedback for formatting requirements',
  },

  // Implementation guidelines
  implementation: {
    states: 'Handle all interactive states (default, hover, focus, disabled, error)',
    responsive: 'Adapt input sizes for mobile touch targets',
    performance: 'Debounce validation for better performance',
    frameworks: 'Support controlled and uncontrolled components',
    types: 'Use appropriate input types for better mobile experience',
  },

  // Component mapping suggestions
  componentMapping: {
    forms: ['text inputs', 'selects', 'textareas', 'checkboxes', 'radios'],
    search: ['search inputs with autocomplete'],
    filters: ['range inputs', 'checkboxes', 'selects'],
    settings: ['switches', 'checkboxes', 'selects'],
    uploads: ['file inputs with drag-and-drop'],
    numeric: ['number inputs with steppers'],
  },
} as const;