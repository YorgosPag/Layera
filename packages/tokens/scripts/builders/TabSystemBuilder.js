/**
 * TabSystemBuilder.js - Enterprise Tab System Builder Module
 *
 * Single Responsibility: Μόνο tab system CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Tab Panel Layout Styles
 */
export const TAB_PANEL_STYLES = {
  'layera-tab-panel': {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-4)'
  }
};

/**
 * Secondary Layout Styles
 */
export const SECONDARY_LAYOUT_STYLES = {
  'layera-secondary-layout': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-4)',
    padding: 'var(--layera-space-6)',
    background: 'var(--layera-color-surface)',
    borderRadius: 'var(--layera-radius-lg)'
  },
  'layera-secondary-title': {
    color: 'var(--layera-color-secondary)',
    marginBottom: 'var(--layera-space-4)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'layera-secondary-text': {
    color: 'var(--layera-color-text-muted)',
    fontSize: 'var(--layera-font-size-base)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Secondary Controls Styles
 */
export const SECONDARY_CONTROLS_STYLES = {
  'layera-secondary-controls': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-3)',
    marginBottom: 'var(--layera-space-6)'
  },
  'layera-secondary-select': {
    border: '1px solid var(--layera-color-secondary)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-base)',
    backgroundColor: 'var(--layera-color-surface)',
    color: 'var(--layera-color-text)'
  },
  'layera-secondary-button': {
    backgroundColor: 'var(--layera-color-secondary)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  'layera-secondary-button:hover': {
    opacity: '0.9'
  }
};

/**
 * TabSystemBuilder Class - Enterprise Tab System CSS Generation
 */
export class TabSystemBuilder {
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
   * Generates CSS από tab system class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateTabSystemCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Tab Panel CSS
   * @returns {string} - Tab panel CSS
   */
  static generateTabPanelCSS() {
    let css = '/* TAB PANEL LAYOUT STYLES */\n';
    css += this.generateTabSystemCSS(TAB_PANEL_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout CSS
   * @returns {string} - Secondary layout CSS
   */
  static generateSecondaryLayoutCSS() {
    let css = '/* SECONDARY LAYOUT STYLES */\n';
    css += this.generateTabSystemCSS(SECONDARY_LAYOUT_STYLES);
    return css;
  }

  /**
   * Generates Secondary Controls CSS
   * @returns {string} - Secondary controls CSS
   */
  static generateSecondaryControlsCSS() {
    let css = '/* SECONDARY CONTROLS STYLES */\n';
    css += this.generateTabSystemCSS(SECONDARY_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Tab System CSS classes
   * @returns {string} - Complete tab system CSS
   */
  static generateAllTabSystemCSS() {
    let css = '/* === TAB SYSTEM CLASSES === */\n\n';

    css += this.generateTabPanelCSS();
    css += this.generateSecondaryLayoutCSS();
    css += this.generateSecondaryControlsCSS();

    return css;
  }

  /**
   * Gets όλες τις available tab system classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllTabSystemClasses() {
    return {
      ...TAB_PANEL_STYLES,
      ...SECONDARY_LAYOUT_STYLES,
      ...SECONDARY_CONTROLS_STYLES
    };
  }

  /**
   * Gets specific tab system category
   * @param {string} category - Category (panels, layout, controls)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getTabSystemCategory(category) {
    const categories = {
      panels: TAB_PANEL_STYLES,
      layout: SECONDARY_LAYOUT_STYLES,
      controls: SECONDARY_CONTROLS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι tab system classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateTabSystemClasses() {
    try {
      const allClasses = this.getAllTabSystemClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid tab system class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for tab system class: ${className}`);
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
      console.error('Tab system classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets tab system classes by functionality
   * @param {string} functionality - Functionality type (navigation, content, interaction)
   * @returns {string[]} - Array με class names
   */
  static getTabSystemClassesByFunctionality(functionality) {
    const functionalityMap = {
      navigation: ['panels'],
      content: ['layout'],
      interaction: ['controls']
    };

    const categories = functionalityMap[functionality] || [];
    const tabSystemClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getTabSystemCategory(category);
      if (categoryClasses) {
        tabSystemClasses.push(...Object.keys(categoryClasses));
      }
    });

    return tabSystemClasses;
  }
}

export default TabSystemBuilder;