/**
 * CardsAdvancedBuilder.js - Enterprise Advanced Cards Builder Module
 *
 * Single Responsibility: Μόνο advanced card CSS variants (SUCCESS, WARNING, DANGER, INFO)
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Success Cards Styles
 */
export const SUCCESS_CARDS_STYLES = {
  'layera-success-cards-title': {
    backgroundColor: 'var(--layera-color-success)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Card Textarea Styles και variants
 */
export const CARD_TEXTAREA_STYLES = {
  'layera-card-textarea': {
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-base)',
    backgroundColor: 'var(--layera-color-surface)',
    color: 'var(--layera-color-text)',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%'
  },
  'layera-card-textarea--primary': {
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-card-textarea--danger': {
    borderColor: 'var(--layera-color-danger)'
  },
  'layera-card-textarea--info': {
    borderColor: 'var(--layera-color-info)'
  },
  'layera-card-textarea--warning': {
    borderColor: 'var(--layera-color-warning)'
  }
};

/**
 * Warning Cards Styles
 */
export const WARNING_CARDS_STYLES = {
  'layera-warning-cards-title': {
    backgroundColor: 'var(--layera-color-warning)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-warning-message': {
    backgroundColor: '#FFF3CD',
    border: '1px solid var(--layera-color-warning)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    marginBottom: 'var(--layera-space-4)',
    textAlign: 'center'
  },
  'layera-warning-message Text': {
    color: '#856404',
    fontStyle: 'italic'
  }
};

/**
 * Danger Cards Styles
 */
export const DANGER_CARDS_STYLES = {
  'layera-danger-cards-title': {
    backgroundColor: 'var(--layera-color-danger)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Info Cards Styles
 */
export const INFO_CARDS_STYLES = {
  'layera-info-cards-title': {
    backgroundColor: 'var(--layera-color-info)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * CardsAdvancedBuilder Class - Enterprise Advanced Card CSS Generation
 */
export class CardsAdvancedBuilder {
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
   * Generates CSS από advanced card class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateAdvancedCardsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Success Cards CSS
   * @returns {string} - Success cards CSS
   */
  static generateSuccessCardsCSS() {
    let css = '/* SUCCESS CARDS STYLES */\n';
    css += this.generateAdvancedCardsCSS(SUCCESS_CARDS_STYLES);
    return css;
  }

  /**
   * Generates Card Textarea CSS
   * @returns {string} - Card textarea CSS
   */
  static generateCardTextareaCSS() {
    let css = '/* CARD TEXTAREA STYLES */\n';
    css += this.generateAdvancedCardsCSS(CARD_TEXTAREA_STYLES);
    return css;
  }

  /**
   * Generates Warning Cards CSS
   * @returns {string} - Warning cards CSS
   */
  static generateWarningCardsCSS() {
    let css = '/* WARNING CARDS STYLES */\n';
    css += this.generateAdvancedCardsCSS(WARNING_CARDS_STYLES);
    return css;
  }

  /**
   * Generates Danger Cards CSS
   * @returns {string} - Danger cards CSS
   */
  static generateDangerCardsCSS() {
    let css = '/* DANGER CARDS STYLES */\n';
    css += this.generateAdvancedCardsCSS(DANGER_CARDS_STYLES);
    return css;
  }

  /**
   * Generates Info Cards CSS
   * @returns {string} - Info cards CSS
   */
  static generateInfoCardsCSS() {
    let css = '/* INFO CARDS STYLES */\n';
    css += this.generateAdvancedCardsCSS(INFO_CARDS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Advanced Card CSS classes
   * @returns {string} - Complete advanced cards CSS
   */
  static generateAllAdvancedCardsCSS() {
    let css = '/* === ADVANCED CARDS CLASSES === */\n\n';

    css += this.generateSuccessCardsCSS();
    css += this.generateCardTextareaCSS();
    css += this.generateWarningCardsCSS();
    css += this.generateDangerCardsCSS();
    css += this.generateInfoCardsCSS();

    return css;
  }

  /**
   * Gets όλες τις available advanced cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllAdvancedCardsClasses() {
    return {
      ...SUCCESS_CARDS_STYLES,
      ...CARD_TEXTAREA_STYLES,
      ...WARNING_CARDS_STYLES,
      ...DANGER_CARDS_STYLES,
      ...INFO_CARDS_STYLES
    };
  }

  /**
   * Gets specific advanced cards category
   * @param {string} category - Category (success, textarea, warning, danger, info)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getAdvancedCardsCategory(category) {
    const categories = {
      success: SUCCESS_CARDS_STYLES,
      textarea: CARD_TEXTAREA_STYLES,
      warning: WARNING_CARDS_STYLES,
      danger: DANGER_CARDS_STYLES,
      info: INFO_CARDS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι advanced cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateAdvancedCardsClasses() {
    try {
      const allClasses = this.getAllAdvancedCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid advanced cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for advanced cards class: ${className}`);
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
      console.error('Advanced cards classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets advanced cards classes by theme
   * @param {string} theme - Theme type (primary, success, warning, danger, info)
   * @returns {string[]} - Array με class names
   */
  static getAdvancedCardsClassesByTheme(theme) {
    const themeMap = {
      primary: ['textarea'],
      success: ['success'],
      warning: ['warning'],
      danger: ['danger'],
      info: ['info']
    };

    const categories = themeMap[theme] || [];
    const advancedCardsClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getAdvancedCardsCategory(category);
      if (categoryClasses) {
        advancedCardsClasses.push(...Object.keys(categoryClasses));
      }
    });

    return advancedCardsClasses;
  }
}

export default CardsAdvancedBuilder;