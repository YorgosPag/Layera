/**
 * CardsExtendedBuilder.js - Enterprise Extended Cards Builder Module
 *
 * Single Responsibility: Μόνο extended cards CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Cards Grid Layout Styles
 */
export const CARDS_GRID_STYLES = {
  'layera-cards-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--layera-space-4)'
  }
};

/**
 * Enhanced Cards Structure Styles
 */
export const ENHANCED_CARDS_STRUCTURE_STYLES = {
  'layera-card-header': {
    padding: 'var(--layera-space-3)',
    borderBottom: '1px solid var(--layera-color-border)'
  },
  'layera-card-content': {
    padding: 'var(--layera-space-4)'
  },
  'layera-card-footer': {
    padding: 'var(--layera-space-3)',
    borderTop: '1px solid var(--layera-color-border)'
  }
};

/**
 * Card Inputs Styles
 */
export const CARD_INPUTS_STYLES = {
  'layera-card-inputs': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-3)'
  },
  'layera-card-input': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  'layera-card-input:focus': {
    borderColor: 'var(--layera-color-primary)'
  }
};

/**
 * Card Input Focus Variants
 */
export const CARD_INPUT_FOCUS_VARIANTS = {
  'layera-card-input--primary:focus': {
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-card-input--secondary:focus': {
    borderColor: 'var(--layera-color-secondary)'
  },
  'layera-card-input--success:focus': {
    borderColor: 'var(--layera-color-success)'
  },
  'layera-card-input--warning:focus': {
    borderColor: 'var(--layera-color-warning)'
  },
  'layera-card-input--danger:focus': {
    borderColor: 'var(--layera-color-danger)'
  },
  'layera-card-input--info:focus': {
    borderColor: 'var(--layera-color-info)'
  }
};

/**
 * Card Button Styles
 */
export const CARD_BUTTON_STYLES = {
  'layera-card-button': {
    width: '100%'
  }
};

/**
 * Primary Layout Card Styles
 */
export const PRIMARY_LAYOUT_CARD_STYLES = {
  'layera-primary-heading': {
    color: 'var(--layera-color-primary)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-primary-description': {
    color: '#555',
    fontSize: 'var(--layera-font-size-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-primary-controls': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-3)',
    marginBottom: 'var(--layera-space-6)'
  }
};

/**
 * Primary Input and Button Styles
 */
export const PRIMARY_INPUT_BUTTON_STYLES = {
  'layera-input--primary': {
    border: '1px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  'layera-input--primary:focus': {
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
  },
  'layera-button--primary': {
    backgroundColor: 'var(--layera-color-primary)',
    color: 'white',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  'layera-button--primary:hover': {
    opacity: '0.9'
  }
};

/**
 * Card Color Variants
 */
export const CARD_COLOR_VARIANTS = {
  'layera-card--primary': {
    border: '2px solid var(--layera-color-primary)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  },
  'layera-card--secondary': {
    border: '2px solid var(--layera-color-secondary)',
    backgroundColor: '#F3E5F5',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  },
  'layera-card--success': {
    border: '2px solid var(--layera-color-success)',
    backgroundColor: '#E8F5E8',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  },
  'layera-card--warning': {
    border: '2px solid var(--layera-color-warning)',
    backgroundColor: '#FFF3E0',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  },
  'layera-card--danger': {
    border: '2px solid var(--layera-color-danger)',
    backgroundColor: '#FFEBEE',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  },
  'layera-card--info': {
    border: '2px solid var(--layera-color-info)',
    backgroundColor: '#E1F5FE',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    transition: 'transform 0.3s ease'
  }
};

/**
 * Card Hover Effects
 */
export const CARD_HOVER_EFFECTS = {
  'layera-card--primary:hover': {
    transform: 'translateY(-2px)'
  },
  'layera-card--secondary:hover': {
    transform: 'translateY(-2px)'
  },
  'layera-card--success:hover': {
    transform: 'translateY(-2px)'
  },
  'layera-card--warning:hover': {
    transform: 'translateY(-2px)'
  },
  'layera-card--danger:hover': {
    transform: 'translateY(-2px)'
  },
  'layera-card--info:hover': {
    transform: 'translateY(-2px)'
  }
};

/**
 * Card Button Color Variants
 */
export const CARD_BUTTON_COLOR_VARIANTS = {
  'layera-card-button--primary': {
    backgroundColor: 'var(--layera-color-primary)',
    color: 'white'
  },
  'layera-card-button--secondary': {
    backgroundColor: 'var(--layera-color-secondary)',
    color: 'white'
  },
  'layera-card-button--success': {
    backgroundColor: 'var(--layera-color-success)',
    color: 'white'
  },
  'layera-card-button--warning': {
    backgroundColor: 'var(--layera-color-warning)',
    color: 'white'
  },
  'layera-card-button--danger': {
    backgroundColor: 'var(--layera-color-danger)',
    color: 'white'
  },
  'layera-card-button--info': {
    backgroundColor: 'var(--layera-color-info)',
    color: 'white'
  }
};

/**
 * Card Textarea Styles
 */
export const CARD_TEXTAREA_STYLES = {
  'layera-card-textarea': {
    resize: 'vertical',
    minHeight: '60px'
  }
};

/**
 * Card Checkbox Styles
 */
export const CARD_CHECKBOX_STYLES = {
  'layera-checkbox-container': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-2)'
  },
  'layera-checkbox': {
    marginRight: 'var(--layera-space-1)'
  }
};

/**
 * Placeholder Content Styles
 */
export const PLACEHOLDER_CONTENT_STYLES = {
  'layera-placeholder-content': {
    textAlign: 'center',
    padding: 'var(--layera-space-8)',
    color: '#666'
  }
};

/**
 * CardsExtendedBuilder Class - Enterprise Extended Cards CSS Generation
 */
export class CardsExtendedBuilder {
  /**
   * Converts CSS object notation to CSS string
   * @param {object} cssObject - CSS object με properties
   * @returns {string} - CSS string representation
   */
  static objectToCSSString(cssObject) {
    return Object.entries(cssObject)
      .map(([property, value]) => {
        // Convert camelCase to kebab-case
        const kebabProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `  ${kebabProperty}: ${value};`;
      })
      .join('\n');
  }

  /**
   * Generates CSS από extended cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateCardsExtendedCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Cards Grid CSS
   * @returns {string} - Cards grid CSS
   */
  static generateCardsGridCSS() {
    let css = '/* CARDS GRID LAYOUT STYLES */\n';
    css += this.generateCardsExtendedCSS(CARDS_GRID_STYLES);
    return css;
  }

  /**
   * Generates Enhanced Cards Structure CSS
   * @returns {string} - Enhanced cards structure CSS
   */
  static generateEnhancedCardsStructureCSS() {
    let css = '/* ENHANCED CARDS STRUCTURE STYLES */\n';
    css += this.generateCardsExtendedCSS(ENHANCED_CARDS_STRUCTURE_STYLES);
    return css;
  }

  /**
   * Generates Card Inputs CSS
   * @returns {string} - Card inputs CSS
   */
  static generateCardInputsCSS() {
    let css = '/* CARD INPUTS STYLES */\n';
    css += this.generateCardsExtendedCSS(CARD_INPUTS_STYLES);
    return css;
  }

  /**
   * Generates Card Input Focus Variants CSS
   * @returns {string} - Card input focus variants CSS
   */
  static generateCardInputFocusVariantsCSS() {
    let css = '/* CARD INPUT FOCUS VARIANTS */\n';
    css += this.generateCardsExtendedCSS(CARD_INPUT_FOCUS_VARIANTS);
    return css;
  }

  /**
   * Generates Card Button CSS
   * @returns {string} - Card button CSS
   */
  static generateCardButtonCSS() {
    let css = '/* CARD BUTTON STYLES */\n';
    css += this.generateCardsExtendedCSS(CARD_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Card CSS
   * @returns {string} - Primary layout card CSS
   */
  static generatePrimaryLayoutCardCSS() {
    let css = '/* PRIMARY LAYOUT CARD STYLES */\n';
    css += this.generateCardsExtendedCSS(PRIMARY_LAYOUT_CARD_STYLES);
    return css;
  }

  /**
   * Generates Primary Input Button CSS
   * @returns {string} - Primary input button CSS
   */
  static generatePrimaryInputButtonCSS() {
    let css = '/* PRIMARY INPUT AND BUTTON STYLES */\n';
    css += this.generateCardsExtendedCSS(PRIMARY_INPUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Card Color Variants CSS
   * @returns {string} - Card color variants CSS
   */
  static generateCardColorVariantsCSS() {
    let css = '/* CARD COLOR VARIANTS */\n';
    css += this.generateCardsExtendedCSS(CARD_COLOR_VARIANTS);
    return css;
  }

  /**
   * Generates Card Hover Effects CSS
   * @returns {string} - Card hover effects CSS
   */
  static generateCardHoverEffectsCSS() {
    let css = '/* CARD HOVER EFFECTS */\n';
    css += this.generateCardsExtendedCSS(CARD_HOVER_EFFECTS);
    return css;
  }

  /**
   * Generates Card Button Color Variants CSS
   * @returns {string} - Card button color variants CSS
   */
  static generateCardButtonColorVariantsCSS() {
    let css = '/* CARD BUTTON COLOR VARIANTS */\n';
    css += this.generateCardsExtendedCSS(CARD_BUTTON_COLOR_VARIANTS);
    return css;
  }

  /**
   * Generates Card Textarea CSS
   * @returns {string} - Card textarea CSS
   */
  static generateCardTextareaCSS() {
    let css = '/* CARD TEXTAREA STYLES */\n';
    css += this.generateCardsExtendedCSS(CARD_TEXTAREA_STYLES);
    return css;
  }

  /**
   * Generates Card Checkbox CSS
   * @returns {string} - Card checkbox CSS
   */
  static generateCardCheckboxCSS() {
    let css = '/* CARD CHECKBOX STYLES */\n';
    css += this.generateCardsExtendedCSS(CARD_CHECKBOX_STYLES);
    return css;
  }

  /**
   * Generates Placeholder Content CSS
   * @returns {string} - Placeholder content CSS
   */
  static generatePlaceholderContentCSS() {
    let css = '/* PLACEHOLDER CONTENT STYLES */\n';
    css += this.generateCardsExtendedCSS(PLACEHOLDER_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Extended Cards CSS classes
   * @returns {string} - Complete extended cards CSS
   */
  static generateAllCardsExtendedCSS() {
    let css = '/* === EXTENDED CARDS CLASSES === */\n\n';

    css += this.generateCardsGridCSS();
    css += this.generateEnhancedCardsStructureCSS();
    css += this.generateCardInputsCSS();
    css += this.generateCardInputFocusVariantsCSS();
    css += this.generateCardButtonCSS();
    css += this.generatePrimaryLayoutCardCSS();
    css += this.generatePrimaryInputButtonCSS();
    css += this.generateCardColorVariantsCSS();
    css += this.generateCardHoverEffectsCSS();
    css += this.generateCardButtonColorVariantsCSS();
    css += this.generateCardTextareaCSS();
    css += this.generateCardCheckboxCSS();
    css += this.generatePlaceholderContentCSS();

    return css;
  }

  /**
   * Gets όλες τις available extended cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllCardsExtendedClasses() {
    return {
      ...CARDS_GRID_STYLES,
      ...ENHANCED_CARDS_STRUCTURE_STYLES,
      ...CARD_INPUTS_STYLES,
      ...CARD_INPUT_FOCUS_VARIANTS,
      ...CARD_BUTTON_STYLES,
      ...PRIMARY_LAYOUT_CARD_STYLES,
      ...PRIMARY_INPUT_BUTTON_STYLES,
      ...CARD_COLOR_VARIANTS,
      ...CARD_HOVER_EFFECTS,
      ...CARD_BUTTON_COLOR_VARIANTS,
      ...CARD_TEXTAREA_STYLES,
      ...CARD_CHECKBOX_STYLES,
      ...PLACEHOLDER_CONTENT_STYLES
    };
  }

  /**
   * Gets specific extended cards category
   * @param {string} category - Category (grid, structure, inputs, inputFocus, button, primaryLayout, primaryInputButton, colorVariants, hoverEffects, buttonColorVariants, textarea, checkbox, placeholder)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getCardsExtendedCategory(category) {
    const categories = {
      grid: CARDS_GRID_STYLES,
      structure: ENHANCED_CARDS_STRUCTURE_STYLES,
      inputs: CARD_INPUTS_STYLES,
      inputFocus: CARD_INPUT_FOCUS_VARIANTS,
      button: CARD_BUTTON_STYLES,
      primaryLayout: PRIMARY_LAYOUT_CARD_STYLES,
      primaryInputButton: PRIMARY_INPUT_BUTTON_STYLES,
      colorVariants: CARD_COLOR_VARIANTS,
      hoverEffects: CARD_HOVER_EFFECTS,
      buttonColorVariants: CARD_BUTTON_COLOR_VARIANTS,
      textarea: CARD_TEXTAREA_STYLES,
      checkbox: CARD_CHECKBOX_STYLES,
      placeholder: PLACEHOLDER_CONTENT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι extended cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateCardsExtendedClasses() {
    try {
      const allClasses = this.getAllCardsExtendedClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid extended cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for extended cards class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Extended cards classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets extended cards classes by functionality type
   * @param {string} functionality - Functionality type (layout, interaction, styling, content)
   * @returns {string[]} - Array με class names
   */
  static getCardsExtendedClassesByFunctionality(functionality) {
    const functionalityMap = {
      layout: ['grid', 'structure', 'primaryLayout'],
      interaction: ['inputs', 'inputFocus', 'button', 'primaryInputButton'],
      styling: ['colorVariants', 'hoverEffects', 'buttonColorVariants'],
      content: ['textarea', 'checkbox', 'placeholder']
    };

    const categories = functionalityMap[functionality] || [];
    const cardsExtendedClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getCardsExtendedCategory(category);
      if (categoryClasses) {
        cardsExtendedClasses.push(...Object.keys(categoryClasses));
      }
    });

    return cardsExtendedClasses;
  }
}

export default CardsExtendedBuilder;