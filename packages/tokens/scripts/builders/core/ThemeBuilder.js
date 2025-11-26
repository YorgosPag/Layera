/**
 * ThemeBuilder.js - Enterprise Theme Variants Builder Module
 *
 * Single Responsibility: Μόνο theme variant CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Card Title Theme Styles - All 6 theme colors
 */
export const CARD_TITLE_THEME_STYLES = {
  'layera-primary-cards-title': {
    backgroundColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-secondary-cards-title': {
    backgroundColor: 'var(--layera-color-secondary)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-success-cards-title': {
    backgroundColor: 'var(--layera-color-success)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-warning-cards-title': {
    backgroundColor: 'var(--layera-color-warning)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-danger-cards-title': {
    backgroundColor: 'var(--layera-color-danger)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-info-cards-title': {
    backgroundColor: 'var(--layera-color-info)',
    color: 'var(--layera-color-surface)',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Layout Theme Styles - Theme-based layout variants
 */
export const LAYOUT_THEME_STYLES = {
  'layera-theme-primary': {
    backgroundColor: 'var(--layera-color-primary)',
    color: 'white'
  },
  'layera-theme-secondary': {
    backgroundColor: 'var(--layera-color-secondary)',
    color: 'white'
  },
  'layera-theme-success': {
    backgroundColor: 'var(--layera-color-success)',
    color: 'white'
  },
  'layera-theme-warning': {
    backgroundColor: 'var(--layera-color-warning)',
    color: 'white'
  },
  'layera-theme-danger': {
    backgroundColor: 'var(--layera-color-danger)',
    color: 'white'
  },
  'layera-theme-info': {
    backgroundColor: 'var(--layera-color-info)',
    color: 'white'
  },
  'layera-theme-light': {
    backgroundColor: 'var(--layera-color-surface)',
    color: 'var(--layera-color-text)'
  },
  'layera-theme-dark': {
    backgroundColor: '#2c3e50',
    color: 'white'
  }
};

/**
 * Button Theme Variants - Advanced button styling
 */
export const BUTTON_THEME_VARIANTS = {
  'layera-button-outline': {
    background: 'transparent',
    border: '2px solid var(--layera-color-primary)',
    color: 'var(--layera-color-primary)',
    padding: 'var(--layera-space-2) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-md)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  'layera-button-ghost': {
    background: 'transparent',
    border: 'none',
    color: 'var(--layera-color-primary)',
    padding: 'var(--layera-space-2) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-md)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  'layera-button-elevated': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    border: 'none',
    padding: 'var(--layera-space-3) var(--layera-space-6)',
    borderRadius: 'var(--layera-radius-lg)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};

/**
 * Card Theme Variants - Advanced card styling
 */
export const CARD_THEME_VARIANTS = {
  'layera-card-elevated': {
    background: 'var(--layera-color-surface)',
    borderRadius: 'var(--layera-radius-lg)',
    padding: 'var(--layera-space-6)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: 'none'
  },
  'layera-card-outlined': {
    background: 'var(--layera-color-surface)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    boxShadow: 'none'
  },
  'layera-card-flat': {
    background: 'var(--layera-color-surface)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-4)',
    boxShadow: 'none'
  }
};

/**
 * ThemeBuilder Class - Enterprise Theme CSS Generation
 */
export class ThemeBuilder {
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
   * Generates CSS από theme class definitions
   * @param {object} classDefinitions - Object με theme class definitions
   * @returns {string} - CSS string
   */
  static generateThemeCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Card Title Theme CSS
   * @returns {string} - Card title theme CSS
   */
  static generateCardTitleThemeCSS() {
    let css = '/* CARD TITLE THEME STYLES */\n';
    css += this.generateThemeCSS(CARD_TITLE_THEME_STYLES);
    return css;
  }

  /**
   * Generates Layout Theme CSS
   * @returns {string} - Layout theme CSS
   */
  static generateLayoutThemeCSS() {
    let css = '/* LAYOUT THEME STYLES */\n';
    css += this.generateThemeCSS(LAYOUT_THEME_STYLES);
    return css;
  }

  /**
   * Generates Button Theme Variants CSS
   * @returns {string} - Button theme CSS
   */
  static generateButtonThemeCSS() {
    let css = '/* BUTTON THEME VARIANTS */\n';
    css += this.generateThemeCSS(BUTTON_THEME_VARIANTS);
    return css;
  }

  /**
   * Generates Card Theme Variants CSS
   * @returns {string} - Card theme CSS
   */
  static generateCardThemeCSS() {
    let css = '/* CARD THEME VARIANTS */\n';
    css += this.generateThemeCSS(CARD_THEME_VARIANTS);
    return css;
  }

  /**
   * Generates όλες τις Theme CSS classes
   * @returns {string} - Complete theme CSS
   */
  static generateAllThemesCSS() {
    let css = '/* === LAYERA THEME CLASSES === */\n\n';

    css += this.generateCardTitleThemeCSS();
    css += this.generateLayoutThemeCSS();
    css += this.generateButtonThemeCSS();
    css += this.generateCardThemeCSS();

    return css;
  }

  /**
   * Gets όλες τις available theme classes
   * @returns {object} - Object με όλες τις theme class definitions
   */
  static getAllThemeClasses() {
    return {
      ...CARD_TITLE_THEME_STYLES,
      ...LAYOUT_THEME_STYLES,
      ...BUTTON_THEME_VARIANTS,
      ...CARD_THEME_VARIANTS
    };
  }

  /**
   * Gets specific theme category
   * @param {string} category - Theme category
   * @returns {object|null} - Theme group ή null αν δεν υπάρχει
   */
  static getThemeCategory(category) {
    const categories = {
      cardTitles: CARD_TITLE_THEME_STYLES,
      layout: LAYOUT_THEME_STYLES,
      buttons: BUTTON_THEME_VARIANTS,
      cards: CARD_THEME_VARIANTS
    };

    return categories[category] || null;
  }

  /**
   * Gets available theme variants για specific component
   * @param {string} componentType - Component type (button, card, layout)
   * @returns {string[]} - Array με theme variant names
   */
  static getThemeVariants(componentType) {
    const categoryMap = {
      button: 'buttons',
      card: 'cards',
      layout: 'layout',
      cardTitle: 'cardTitles'
    };

    const category = this.getThemeCategory(categoryMap[componentType]);
    if (!category) return [];

    return Object.keys(category);
  }

  /**
   * Generates theme-aware CSS με custom properties
   * @param {string} themeName - Theme name (light, dark, primary, etc.)
   * @returns {string} - Theme-aware CSS
   */
  static generateThemeAwareCSS(themeName) {
    const themeVariables = {
      light: {
        '--theme-bg': 'var(--layera-color-surface)',
        '--theme-text': 'var(--layera-color-text)',
        '--theme-border': 'var(--layera-color-border)'
      },
      dark: {
        '--theme-bg': '#2c3e50',
        '--theme-text': 'white',
        '--theme-border': '#34495e'
      },
      primary: {
        '--theme-bg': 'var(--layera-color-primary)',
        '--theme-text': 'white',
        '--theme-border': 'var(--layera-color-primary)'
      }
    };

    const variables = themeVariables[themeName];
    if (!variables) return '';

    let css = `[data-theme="${themeName}"] {\n`;
    Object.entries(variables).forEach(([property, value]) => {
      css += `  ${property}: ${value};\n`;
    });
    css += '}\n\n';

    return css;
  }

  /**
   * Validates ότι όλες οι theme classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateThemeClasses() {
    try {
      const allClasses = this.getAllThemeClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid theme class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for theme class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in theme class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in theme class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Theme classes validation failed:', error.message);
      return false;
    }
  }
}

export default ThemeBuilder;