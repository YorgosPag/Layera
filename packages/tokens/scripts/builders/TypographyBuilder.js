/**
 * TypographyBuilder.js - Enterprise Typography Builder Module
 *
 * Single Responsibility: Μόνο typography CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Font Size Typography Styles
 */
export const FONT_SIZE_STYLES = {
  'layera-text-4xl': {
    fontSize: '2.25rem !important',
    lineHeight: '2.5rem !important'
  },
  'layera-text-2xl': {
    fontSize: '1.5rem !important',
    lineHeight: '2rem !important'
  },
  'layera-text-lg': {
    fontSize: '1.125rem !important',
    lineHeight: '1.75rem !important'
  }
};

/**
 * Font Weight Typography Styles
 */
export const FONT_WEIGHT_STYLES = {
  'layera-font-extrabold': {
    fontWeight: '800 !important'
  },
  'layera-font-bold': {
    fontWeight: '700 !important'
  }
};

/**
 * Text Alignment Typography Styles
 */
export const TEXT_ALIGNMENT_STYLES = {
  'layera-text-align-center': {
    textAlign: 'center !important'
  }
};

/**
 * Text Color Typography Styles
 */
export const TEXT_COLOR_STYLES = {
  'layera-text-color-primary': {
    color: 'var(--layera-color-primary) !important'
  },
  'layera-text-color-secondary': {
    color: '#6b7280 !important'
  }
};

/**
 * Line Height Typography Styles
 */
export const LINE_HEIGHT_STYLES = {
  'layera-leading-relaxed': {
    lineHeight: '1.625 !important'
  }
};

/**
 * Center Content Alignment Styles
 */
export const CONTENT_ALIGNMENT_STYLES = {
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
 * TypographyBuilder Class - Enterprise Typography CSS Generation
 */
export class TypographyBuilder {
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
   * Generates CSS από typography class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateTypographyCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Font Size CSS
   * @returns {string} - Font size CSS
   */
  static generateFontSizeCSS() {
    let css = '/* FONT SIZE TYPOGRAPHY STYLES */\n';
    css += this.generateTypographyCSS(FONT_SIZE_STYLES);
    return css;
  }

  /**
   * Generates Font Weight CSS
   * @returns {string} - Font weight CSS
   */
  static generateFontWeightCSS() {
    let css = '/* FONT WEIGHT TYPOGRAPHY STYLES */\n';
    css += this.generateTypographyCSS(FONT_WEIGHT_STYLES);
    return css;
  }

  /**
   * Generates Text Alignment CSS
   * @returns {string} - Text alignment CSS
   */
  static generateTextAlignmentCSS() {
    let css = '/* TEXT ALIGNMENT TYPOGRAPHY STYLES */\n';
    css += this.generateTypographyCSS(TEXT_ALIGNMENT_STYLES);
    return css;
  }

  /**
   * Generates Text Color CSS
   * @returns {string} - Text color CSS
   */
  static generateTextColorCSS() {
    let css = '/* TEXT COLOR TYPOGRAPHY STYLES */\n';
    css += this.generateTypographyCSS(TEXT_COLOR_STYLES);
    return css;
  }

  /**
   * Generates Line Height CSS
   * @returns {string} - Line height CSS
   */
  static generateLineHeightCSS() {
    let css = '/* LINE HEIGHT TYPOGRAPHY STYLES */\n';
    css += this.generateTypographyCSS(LINE_HEIGHT_STYLES);
    return css;
  }

  /**
   * Generates Content Alignment CSS
   * @returns {string} - Content alignment CSS
   */
  static generateContentAlignmentCSS() {
    let css = '/* CONTENT ALIGNMENT STYLES */\n';
    css += this.generateTypographyCSS(CONTENT_ALIGNMENT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Typography CSS classes
   * @returns {string} - Complete typography CSS
   */
  static generateAllTypographyCSS() {
    let css = '/* === TYPOGRAPHY CLASSES === */\n\n';

    css += this.generateFontSizeCSS();
    css += this.generateFontWeightCSS();
    css += this.generateTextAlignmentCSS();
    css += this.generateTextColorCSS();
    css += this.generateLineHeightCSS();
    css += this.generateContentAlignmentCSS();

    return css;
  }

  /**
   * Gets όλες τις available typography classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllTypographyClasses() {
    return {
      ...FONT_SIZE_STYLES,
      ...FONT_WEIGHT_STYLES,
      ...TEXT_ALIGNMENT_STYLES,
      ...TEXT_COLOR_STYLES,
      ...LINE_HEIGHT_STYLES,
      ...CONTENT_ALIGNMENT_STYLES
    };
  }

  /**
   * Gets specific typography category
   * @param {string} category - Category (fontSize, fontWeight, textAlignment, textColor, lineHeight, contentAlignment)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getTypographyCategory(category) {
    const categories = {
      fontSize: FONT_SIZE_STYLES,
      fontWeight: FONT_WEIGHT_STYLES,
      textAlignment: TEXT_ALIGNMENT_STYLES,
      textColor: TEXT_COLOR_STYLES,
      lineHeight: LINE_HEIGHT_STYLES,
      contentAlignment: CONTENT_ALIGNMENT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι typography classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateTypographyClasses() {
    try {
      const allClasses = this.getAllTypographyClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid typography class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for typography class: ${className}`);
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
      console.error('Typography classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets typography classes by category
   * @param {string} functionality - Functionality type (display, body, interactive, decorative)
   * @returns {string[]} - Array με class names
   */
  static getTypographyClassesByFunctionality(functionality) {
    const functionalityMap = {
      display: ['fontSize', 'fontWeight'],
      body: ['fontSize', 'lineHeight', 'textColor'],
      interactive: ['textAlignment', 'textColor'],
      decorative: ['fontWeight', 'lineHeight']
    };

    const categories = functionalityMap[functionality] || [];
    const typographyClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getTypographyCategory(category);
      if (categoryClasses) {
        typographyClasses.push(...Object.keys(categoryClasses));
      }
    });

    return typographyClasses;
  }
}

export default TypographyBuilder;