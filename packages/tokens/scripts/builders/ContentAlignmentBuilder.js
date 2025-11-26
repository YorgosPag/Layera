/**
 * ContentAlignmentBuilder.js - Enterprise Content Alignment Builder Module
 *
 * Single Responsibility: Μόνο content alignment CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Content Section Center Alignment Styles
 */
export const CONTENT_SECTION_ALIGNMENT_STYLES = {
  'layera-content-section': {
    display: 'flex !important',
    flexDirection: 'column !important',
    alignItems: 'center !important',
    textAlign: 'center !important',
    width: '100% !important'
  },
  'layera-content-section *': {
    textAlign: 'center !important'
  }
};

/**
 * ContentAlignmentBuilder Class - Enterprise Content Alignment CSS Generation
 */
export class ContentAlignmentBuilder {
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
   * Generates CSS από content alignment class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateContentAlignmentCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Content Section Alignment CSS
   * @returns {string} - Content section alignment CSS
   */
  static generateContentSectionAlignmentCSS() {
    let css = '/* CONTENT SECTION CENTER ALIGNMENT STYLES */\n';
    css += this.generateContentAlignmentCSS(CONTENT_SECTION_ALIGNMENT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Content Alignment CSS classes
   * @returns {string} - Complete content alignment CSS
   */
  static generateAllContentAlignmentCSS() {
    let css = '/* === CONTENT ALIGNMENT CLASSES === */\n\n';

    css += this.generateContentSectionAlignmentCSS();

    return css;
  }

  /**
   * Gets όλες τις available content alignment classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllContentAlignmentClasses() {
    return {
      ...CONTENT_SECTION_ALIGNMENT_STYLES
    };
  }

  /**
   * Gets specific content alignment category
   * @param {string} category - Category (contentSection)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getContentAlignmentCategory(category) {
    const categories = {
      contentSection: CONTENT_SECTION_ALIGNMENT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι content alignment classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateContentAlignmentClasses() {
    try {
      const allClasses = this.getAllContentAlignmentClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid content alignment class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for content alignment class: ${className}`);
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
      console.error('Content alignment classes validation failed:', error.message);
      return false;
    }
  }
}

export default ContentAlignmentBuilder;