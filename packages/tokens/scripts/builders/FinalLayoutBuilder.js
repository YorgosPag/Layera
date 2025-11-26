/**
 * FinalLayoutBuilder.js - Enterprise Final Layout Builder Module
 *
 * Single Responsibility: Μόνο final layout fundamentals CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * App Container Core Styles
 */
export const APP_CONTAINER_CORE_STYLES = {
  'app-container': {
    display: 'flex',
    height: 'calc(100vh - var(--layera-header-height))',
    minHeight: 'calc(100vh - var(--layera-header-height))',
    maxHeight: 'calc(100vh - var(--layera-header-height))',
    width: '100vw',
    marginTop: 'var(--layera-header-height)',
    overflow: 'hidden'
  }
};

/**
 * Main Content Container Core Styles
 */
export const MAIN_CONTENT_CONTAINER_CORE_STYLES = {
  '#main-content-container': {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0'
  },
  'main-content': {
    flex: '1',
    padding: 'var(--layera-space-4)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    background: 'white',
    height: 'calc(100vh - var(--layera-header-height))',
    maxHeight: 'calc(100vh - var(--layera-header-height))'
  }
};

/**
 * FinalLayoutBuilder Class - Enterprise Final Layout CSS Generation
 */
export class FinalLayoutBuilder {
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
   * Generates CSS από final layout class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateFinalLayoutCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      if (className.startsWith('#')) {
        css += `${className} {\n`;
      } else {
        css += `.${className} {\n`;
      }
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates App Container Core CSS
   * @returns {string} - App container core CSS
   */
  static generateAppContainerCoreCSS() {
    let css = '/* APP CONTAINER CORE STYLES */\n';
    css += this.generateFinalLayoutCSS(APP_CONTAINER_CORE_STYLES);
    return css;
  }

  /**
   * Generates Main Content Container Core CSS
   * @returns {string} - Main content container core CSS
   */
  static generateMainContentContainerCoreCSS() {
    let css = '/* MAIN CONTENT CONTAINER CORE STYLES */\n';
    css += this.generateFinalLayoutCSS(MAIN_CONTENT_CONTAINER_CORE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Final Layout CSS classes
   * @returns {string} - Complete final layout CSS
   */
  static generateAllFinalLayoutCSS() {
    let css = '/* === FINAL LAYOUT CLASSES === */\n\n';

    css += this.generateAppContainerCoreCSS();
    css += this.generateMainContentContainerCoreCSS();

    return css;
  }

  /**
   * Gets όλες τις available final layout classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllFinalLayoutClasses() {
    return {
      ...APP_CONTAINER_CORE_STYLES,
      ...MAIN_CONTENT_CONTAINER_CORE_STYLES
    };
  }

  /**
   * Gets specific final layout category
   * @param {string} category - Category (appContainer, mainContentContainer)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getFinalLayoutCategory(category) {
    const categories = {
      appContainer: APP_CONTAINER_CORE_STYLES,
      mainContentContainer: MAIN_CONTENT_CONTAINER_CORE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι final layout classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateFinalLayoutClasses() {
    try {
      const allClasses = this.getAllFinalLayoutClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid final layout class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for final layout class: ${className}`);
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
      console.error('Final layout classes validation failed:', error.message);
      return false;
    }
  }
}

export default FinalLayoutBuilder;