/**
 * ComponentsBuilder.js - Enterprise Components CSS Builder Module
 *
 * Single Responsibility: Μόνο component CSS classes generation (Button, Card, Modal)
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Button Component Styles - All variants
 */
export const BUTTON_COMPONENT_STYLES = {
  'layera-button-primary': {
    background: 'var(--live-primary-color)',
    color: 'white',
    border: '1px solid var(--live-primary-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  },
  'layera-button-secondary': {
    background: 'var(--live-secondary-color)',
    color: 'white',
    border: '1px solid var(--live-secondary-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  },
  'layera-button-success': {
    background: 'var(--live-success-color)',
    color: 'white',
    border: '1px solid var(--live-success-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  },
  'layera-button-warning': {
    background: 'var(--live-warning-color)',
    color: 'white',
    border: '1px solid var(--live-warning-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  },
  'layera-button-danger': {
    background: 'var(--live-danger-color)',
    color: 'white',
    border: '1px solid var(--live-danger-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  },
  'layera-button-info': {
    background: 'var(--live-info-color)',
    color: 'white',
    border: '1px solid var(--live-info-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-button-padding)'
  }
};

/**
 * Card Component Styles - All 6 theme colors
 */
export const CARD_COMPONENT_STYLES = {
  'layera-card-primary': {
    background: 'rgba(74, 144, 226, 0.1)',
    border: '1px solid var(--live-primary-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-card-secondary': {
    background: 'rgba(144, 19, 254, 0.1)',
    border: '1px solid var(--live-secondary-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-card-success': {
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid var(--live-success-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-card-warning': {
    background: 'rgba(255, 152, 0, 0.1)',
    border: '1px solid var(--live-warning-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-card-danger': {
    background: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid var(--live-danger-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-card-info': {
    background: 'rgba(33, 150, 243, 0.1)',
    border: '1px solid var(--live-info-color)',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  }
};

/**
 * Modal Component Styles - All variants
 */
export const MODAL_COMPONENT_STYLES = {
  'layera-modal-primary': {
    borderLeft: '4px solid var(--live-primary-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-modal-secondary': {
    borderLeft: '4px solid var(--live-secondary-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-modal-success': {
    borderLeft: '4px solid var(--live-success-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-modal-warning': {
    borderLeft: '4px solid var(--live-warning-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-modal-danger': {
    borderLeft: '4px solid var(--live-danger-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  },
  'layera-modal-info': {
    borderLeft: '4px solid var(--live-info-color)',
    background: 'white',
    borderRadius: 'var(--live-border-radius)',
    padding: 'var(--live-padding)'
  }
};

/**
 * ComponentsBuilder Class - Enterprise Component CSS Generation
 */
export class ComponentsBuilder {
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
   * Generates CSS από component class definitions
   * @param {object} classDefinitions - Object με component class definitions
   * @returns {string} - CSS string
   */
  static generateComponentCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Button CSS classes
   * @returns {string} - Button CSS
   */
  static generateButtonCSS() {
    let css = '/* BUTTON VARIANTS */\n';
    css += this.generateComponentCSS(BUTTON_COMPONENT_STYLES);
    return css;
  }

  /**
   * Generates Card CSS classes
   * @returns {string} - Card CSS
   */
  static generateCardCSS() {
    let css = '/* CARD VARIANTS - ALL 6 COLORS */\n';
    css += this.generateComponentCSS(CARD_COMPONENT_STYLES);
    return css;
  }

  /**
   * Generates Modal CSS classes
   * @returns {string} - Modal CSS
   */
  static generateModalCSS() {
    let css = '/* MODAL VARIANTS */\n';
    css += this.generateComponentCSS(MODAL_COMPONENT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Component CSS classes
   * @returns {string} - Complete components CSS
   */
  static generateAllComponentsCSS() {
    let css = '/* === LAYERA COMPONENT CLASSES === */\n\n';

    css += this.generateButtonCSS();
    css += this.generateCardCSS();
    css += this.generateModalCSS();

    return css;
  }

  /**
   * Gets όλες τις available component classes
   * @returns {object} - Object με όλες τις component class definitions
   */
  static getAllComponentClasses() {
    return {
      ...BUTTON_COMPONENT_STYLES,
      ...CARD_COMPONENT_STYLES,
      ...MODAL_COMPONENT_STYLES
    };
  }

  /**
   * Gets specific component category
   * @param {string} category - Component category (button, card, modal)
   * @returns {object|null} - Component group ή null αν δεν υπάρχει
   */
  static getComponentCategory(category) {
    const categories = {
      button: BUTTON_COMPONENT_STYLES,
      card: CARD_COMPONENT_STYLES,
      modal: MODAL_COMPONENT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι component classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateComponentClasses() {
    try {
      const allClasses = this.getAllComponentClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid component class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for component class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in component class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in component class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Component classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets component class variants by type
   * @param {string} componentType - Component type (button, card, modal)
   * @returns {string[]} - Array με variant names
   */
  static getComponentVariants(componentType) {
    const category = this.getComponentCategory(componentType);
    if (!category) return [];

    return Object.keys(category).map(className => {
      // Extract variant από class name (e.g., "layera-button-primary" → "primary")
      return className.split('-').pop();
    });
  }
}

export default ComponentsBuilder;