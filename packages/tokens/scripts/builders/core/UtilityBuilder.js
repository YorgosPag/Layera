/**
 * UtilityBuilder.js - Enterprise Utility Classes Builder Module
 *
 * Single Responsibility: Μόνο utility CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Basic Utility Classes - Core utilities
 */
export const BASIC_UTILITY_CLASSES = {
  'layera-gap': {
    gap: 'var(--live-component-gap)'
  },
  'layera-padding': {
    padding: 'var(--live-padding)'
  },
  'layera-font-size': {
    fontSize: 'var(--live-font-size)'
  }
};

/**
 * Typography Utility Classes - Margin και typography utilities
 */
export const TYPOGRAPHY_UTILITY_CLASSES = {
  'layera-margin-bottom--xs': {
    marginBottom: 'var(--layera-space-1)'
  },
  'layera-margin-bottom--sm': {
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-margin-bottom--md': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-margin-bottom--lg': {
    marginBottom: 'var(--layera-space-6)'
  },
  'layera-margin-bottom--xl': {
    marginBottom: 'var(--layera-space-8)'
  },
  'layera-margin-top--lg': {
    marginTop: 'var(--layera-space-6)'
  },
  'layera-margin-top--xl': {
    marginTop: 'var(--layera-space-8)'
  }
};

/**
 * Padding Utility Classes - Header και padding utilities
 */
export const PADDING_UTILITY_CLASSES = {
  'layera-padding--sm': {
    padding: 'var(--layera-space-3)'
  },
  'layera-padding-header': {
    padding: 'var(--layera-space-3) var(--layera-space-4)'
  }
};

/**
 * Profile Button Utility - ΠΑΝΟΜΟΙΟΤΥΠΟ με HTML
 */
export const PROFILE_BUTTON_UTILITY = {
  'layera-profile-btn': {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    fontSize: '0.85rem',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  }
};

/**
 * Flex Utility Classes - Flexbox utilities
 */
export const FLEX_UTILITY_CLASSES = {
  'layera-flex': {
    display: 'flex'
  },
  'layera-flex--gap-xs': {
    gap: 'var(--layera-space-1)'
  },
  'layera-flex--gap-sm': {
    gap: 'var(--layera-space-2)'
  },
  'layera-flex--gap-md': {
    gap: 'var(--layera-space-4)'
  },
  'layera-flex--justify-between': {
    justifyContent: 'space-between'
  },
  'layera-flex--align-center': {
    alignItems: 'center'
  },
  'layera-flex--grow': {
    flex: '1'
  },
  'layera-flex--wrap': {
    flexWrap: 'wrap'
  },
  'layera-flex--direction-column': {
    flexDirection: 'column'
  },
  'layera-flex--direction-row': {
    flexDirection: 'row'
  }
};

/**
 * Width Utility Classes - Width και sizing utilities
 */
export const WIDTH_UTILITY_CLASSES = {
  'layera-width--full': {
    width: '100%'
  },
  'layera-width--auto': {
    width: 'auto'
  },
  'layera-width--fit': {
    width: 'fit-content'
  }
};

/**
 * Text Utility Classes - Text alignment utilities
 */
export const TEXT_UTILITY_CLASSES = {
  'layera-text--align-left': {
    textAlign: 'left'
  },
  'layera-text--align-center': {
    textAlign: 'center'
  },
  'layera-text--align-right': {
    textAlign: 'right'
  }
};

/**
 * Border Utility Classes - Border utilities
 */
export const BORDER_UTILITY_CLASSES = {
  'layera-border': {
    border: '1px solid var(--layera-color-border)'
  },
  'layera-border--none': {
    border: 'none'
  },
  'layera-border-radius': {
    borderRadius: 'var(--layera-radius-md)'
  }
};

/**
 * UtilityBuilder Class - Enterprise Utility CSS Generation
 */
export class UtilityBuilder {
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
   * Generates CSS από utility class definitions
   * @param {object} classDefinitions - Object με utility class definitions
   * @returns {string} - CSS string
   */
  static generateUtilityCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Basic Utility CSS
   * @returns {string} - Basic utility CSS
   */
  static generateBasicUtilitiesCSS() {
    let css = '/* BASIC UTILITIES */\n';
    css += this.generateUtilityCSS(BASIC_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Typography Utility CSS
   * @returns {string} - Typography utility CSS
   */
  static generateTypographyUtilitiesCSS() {
    let css = '/* TYPOGRAPHY UTILITIES */\n';
    css += this.generateUtilityCSS(TYPOGRAPHY_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Padding Utility CSS
   * @returns {string} - Padding utility CSS
   */
  static generatePaddingUtilitiesCSS() {
    let css = '/* PADDING UTILITIES - ΓΙΑ HEADER ΑΚΡΙΒΕΙΑ */\n';
    css += this.generateUtilityCSS(PADDING_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Profile Button CSS - ΠΑΝΟΜΟΙΟΤΥΠΟ με HTML
   * @returns {string} - Profile button CSS
   */
  static generateProfileButtonCSS() {
    let css = '/* PROFILE BUTTON - ΠΑΝΟΜΟΙΟΤΥΠΟ με HTML */\n';
    css += this.generateUtilityCSS(PROFILE_BUTTON_UTILITY);
    return css;
  }

  /**
   * Generates Flex Utility CSS
   * @returns {string} - Flex utility CSS
   */
  static generateFlexUtilitiesCSS() {
    let css = '/* FLEX UTILITIES */\n';
    css += this.generateUtilityCSS(FLEX_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Width Utility CSS
   * @returns {string} - Width utility CSS
   */
  static generateWidthUtilitiesCSS() {
    let css = '/* WIDTH UTILITIES */\n';
    css += this.generateUtilityCSS(WIDTH_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Text Utility CSS
   * @returns {string} - Text utility CSS
   */
  static generateTextUtilitiesCSS() {
    let css = '/* TEXT UTILITIES */\n';
    css += this.generateUtilityCSS(TEXT_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates Border Utility CSS
   * @returns {string} - Border utility CSS
   */
  static generateBorderUtilitiesCSS() {
    let css = '/* BORDER UTILITIES */\n';
    css += this.generateUtilityCSS(BORDER_UTILITY_CLASSES);
    return css;
  }

  /**
   * Generates όλες τις Utility CSS classes
   * @returns {string} - Complete utilities CSS
   */
  static generateAllUtilitiesCSS() {
    let css = '/* === LAYERA UTILITY CLASSES === */\n\n';

    css += this.generateBasicUtilitiesCSS();
    css += this.generateTypographyUtilitiesCSS();
    css += this.generatePaddingUtilitiesCSS();
    css += this.generateProfileButtonCSS();
    css += this.generateFlexUtilitiesCSS();
    css += this.generateWidthUtilitiesCSS();
    css += this.generateTextUtilitiesCSS();
    css += this.generateBorderUtilitiesCSS();

    return css;
  }

  /**
   * Gets όλες τις available utility classes
   * @returns {object} - Object με όλες τις utility class definitions
   */
  static getAllUtilityClasses() {
    return {
      ...BASIC_UTILITY_CLASSES,
      ...TYPOGRAPHY_UTILITY_CLASSES,
      ...PADDING_UTILITY_CLASSES,
      ...PROFILE_BUTTON_UTILITY,
      ...FLEX_UTILITY_CLASSES,
      ...WIDTH_UTILITY_CLASSES,
      ...TEXT_UTILITY_CLASSES,
      ...BORDER_UTILITY_CLASSES
    };
  }

  /**
   * Gets specific utility category
   * @param {string} category - Utility category
   * @returns {object|null} - Utility group ή null αν δεν υπάρχει
   */
  static getUtilityCategory(category) {
    const categories = {
      basic: BASIC_UTILITY_CLASSES,
      typography: TYPOGRAPHY_UTILITY_CLASSES,
      padding: PADDING_UTILITY_CLASSES,
      profile: PROFILE_BUTTON_UTILITY,
      flex: FLEX_UTILITY_CLASSES,
      width: WIDTH_UTILITY_CLASSES,
      text: TEXT_UTILITY_CLASSES,
      border: BORDER_UTILITY_CLASSES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι utility classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateUtilityClasses() {
    try {
      const allClasses = this.getAllUtilityClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid utility class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for utility class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in utility class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in utility class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Utility classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets utility classes by functionality
   * @param {string} functionality - Functionality type (spacing, layout, typography, etc.)
   * @returns {string[]} - Array με utility class names
   */
  static getUtilitiesByFunctionality(functionality) {
    const functionalityMap = {
      spacing: ['typography', 'padding'],
      layout: ['flex', 'width'],
      visual: ['border', 'text'],
      interactive: ['profile']
    };

    const categories = functionalityMap[functionality] || [];
    const utilityClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getUtilityCategory(category);
      if (categoryClasses) {
        utilityClasses.push(...Object.keys(categoryClasses));
      }
    });

    return utilityClasses;
  }
}

export default UtilityBuilder;