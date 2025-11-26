/**
 * SidebarBuilder.js - Enterprise Sidebar Classes Builder Module
 *
 * Single Responsibility: Μόνο sidebar component CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Primary Sidebar Component Styles - Main left sidebar
 */
export const PRIMARY_SIDEBAR_STYLES = {
  // Θα συμπληρωθεί με τα primary sidebar CSS
};

/**
 * Right Sidebar Component Styles - Right control panel
 */
export const RIGHT_SIDEBAR_STYLES = {
  // Θα συμπληρωθεί με τα right sidebar CSS
};

/**
 * Settings Sidebar Component Styles - Settings panel
 */
export const SETTINGS_SIDEBAR_STYLES = {
  // Θα συμπληρωθεί με τα settings sidebar CSS
};

/**
 * SidebarBuilder Class - Enterprise Sidebar CSS Generation
 */
export class SidebarBuilder {
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
   * Generates CSS από sidebar class definitions
   * @param {object} classDefinitions - Object με sidebar class definitions
   * @returns {string} - CSS string
   */
  static generateSidebarCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Primary Sidebar CSS
   * @returns {string} - Primary sidebar CSS
   */
  static generatePrimarySidebarCSS() {
    let css = '/* PRIMARY SIDEBAR COMPONENT STYLES */\n';
    css += this.generateSidebarCSS(PRIMARY_SIDEBAR_STYLES);
    return css;
  }

  /**
   * Generates Right Sidebar CSS
   * @returns {string} - Right sidebar CSS
   */
  static generateRightSidebarCSS() {
    let css = '/* RIGHT SIDEBAR COMPONENT STYLES */\n';
    css += this.generateSidebarCSS(RIGHT_SIDEBAR_STYLES);
    return css;
  }

  /**
   * Generates Settings Sidebar CSS
   * @returns {string} - Settings sidebar CSS
   */
  static generateSettingsSidebarCSS() {
    let css = '/* SETTINGS SIDEBAR COMPONENT STYLES */\n';
    css += this.generateSidebarCSS(SETTINGS_SIDEBAR_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Sidebar CSS classes
   * @returns {string} - Complete sidebar CSS
   */
  static generateAllSidebarsCSS() {
    let css = '/* === LAYERA SIDEBAR CLASSES === */\n\n';

    css += this.generatePrimarySidebarCSS();
    css += this.generateRightSidebarCSS();
    css += this.generateSettingsSidebarCSS();

    return css;
  }

  /**
   * Gets όλες τις available sidebar classes
   * @returns {object} - Object με όλες τις sidebar class definitions
   */
  static getAllSidebarClasses() {
    return {
      ...PRIMARY_SIDEBAR_STYLES,
      ...RIGHT_SIDEBAR_STYLES,
      ...SETTINGS_SIDEBAR_STYLES
    };
  }

  /**
   * Gets specific sidebar category
   * @param {string} category - Sidebar category (primary, right, settings)
   * @returns {object|null} - Sidebar group ή null αν δεν υπάρχει
   */
  static getSidebarCategory(category) {
    const categories = {
      primary: PRIMARY_SIDEBAR_STYLES,
      right: RIGHT_SIDEBAR_STYLES,
      settings: SETTINGS_SIDEBAR_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι sidebar classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSidebarClasses() {
    try {
      const allClasses = this.getAllSidebarClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid sidebar class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for sidebar class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in sidebar class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in sidebar class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Sidebar classes validation failed:', error.message);
      return false;
    }
  }
}

export default SidebarBuilder;