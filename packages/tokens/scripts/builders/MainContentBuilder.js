/**
 * MainContentBuilder.js - Enterprise Main Content Builder Module
 *
 * Single Responsibility: Μόνο main content area CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Main Content Container Styles
 */
export const MAIN_CONTENT_CONTAINER_STYLES = {
  'main-content-container': {
    flex: '1',
    background: 'var(--layera-color-surface)',
    minHeight: '100vh',
    order: '2'
  }
};

/**
 * Main Content UI Elements Styles
 */
export const MAIN_CONTENT_UI_STYLES = {
  'main-content-tab-button': {
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-color-text)',
    border: '1px solid var(--layera-color-border)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'main-content-card': {
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Main Content Table Styles
 */
export const MAIN_CONTENT_TABLE_STYLES = {
  'main-content-table': {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    overflow: 'hidden'
  },
  'main-content-table-header': {
    background: 'var(--live-primary-color)',
    color: 'white',
    padding: 'var(--layera-space-3)',
    textAlign: 'left',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'main-content-table-cell': {
    padding: 'var(--layera-space-3)',
    borderBottom: '1px solid var(--layera-color-border)'
  },
  'main-content-table-row': {
    borderBottom: '1px solid var(--layera-color-border)'
  },
  'main-content-table-row:nth-child(even)': {
    background: 'var(--layera-color-surface)'
  },
  'main-content-table-button': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    border: 'none',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-sm)'
  }
};

/**
 * MainContentBuilder Class - Enterprise Main Content CSS Generation
 */
export class MainContentBuilder {
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
   * Generates CSS από main content class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateMainContentCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Main Content Container CSS
   * @returns {string} - Container CSS
   */
  static generateContainerCSS() {
    let css = '/* MAIN CONTENT CONTAINER STYLES */\n';
    css += this.generateMainContentCSS(MAIN_CONTENT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Main Content UI Elements CSS
   * @returns {string} - UI elements CSS
   */
  static generateUIElementsCSS() {
    let css = '/* MAIN CONTENT UI ELEMENTS STYLES */\n';
    css += this.generateMainContentCSS(MAIN_CONTENT_UI_STYLES);
    return css;
  }

  /**
   * Generates Main Content Table CSS
   * @returns {string} - Table CSS
   */
  static generateTableCSS() {
    let css = '/* MAIN CONTENT TABLE STYLES */\n';
    css += this.generateMainContentCSS(MAIN_CONTENT_TABLE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Main Content CSS classes
   * @returns {string} - Complete main content CSS
   */
  static generateAllMainContentCSS() {
    let css = '/* === MAIN CONTENT CLASSES === */\n\n';

    css += this.generateContainerCSS();
    css += this.generateUIElementsCSS();
    css += this.generateTableCSS();

    return css;
  }

  /**
   * Gets όλες τις available main content classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllMainContentClasses() {
    return {
      ...MAIN_CONTENT_CONTAINER_STYLES,
      ...MAIN_CONTENT_UI_STYLES,
      ...MAIN_CONTENT_TABLE_STYLES
    };
  }

  /**
   * Gets specific main content category
   * @param {string} category - Category (container, ui, table)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getMainContentCategory(category) {
    const categories = {
      container: MAIN_CONTENT_CONTAINER_STYLES,
      ui: MAIN_CONTENT_UI_STYLES,
      table: MAIN_CONTENT_TABLE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι main content classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateMainContentClasses() {
    try {
      const allClasses = this.getAllMainContentClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid main content class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for main content class: ${className}`);
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
      console.error('Main content classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets main content classes by component type
   * @param {string} component - Component type (layout, interaction, data)
   * @returns {string[]} - Array με class names
   */
  static getMainContentClassesByComponent(component) {
    const componentMap = {
      layout: ['container'],
      interaction: ['ui'],
      data: ['table']
    };

    const categories = componentMap[component] || [];
    const mainContentClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getMainContentCategory(category);
      if (categoryClasses) {
        mainContentClasses.push(...Object.keys(categoryClasses));
      }
    });

    return mainContentClasses;
  }
}

export default MainContentBuilder;