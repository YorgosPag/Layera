/**
 * HeaderBuilder.js - Enterprise Header Classes Builder Module
 *
 * Single Responsibility: Μόνο header component CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * App Header Component Styles - Main header layout
 */
export const APP_HEADER_STYLES = {
  'layera-app-header': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
    minHeight: 'var(--layera-header-height)',
    backgroundColor: 'var(--layera-color-header-bg)',
    color: 'var(--layera-color-header-text)',
    boxShadow: 'var(--layera-shadow-header)',
    padding: 'var(--layera-space-3) var(--layera-space-4)'
  },
  'layera-header-left': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-4)'
  },
  'layera-header-title': {
    margin: '0',
    fontSize: 'var(--layera-font-size-xl)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-header-nav': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-3)'
  }
};

/**
 * Header Color Button Styles - Color selection buttons (P S Su W D I)
 */
export const HEADER_COLOR_BUTTON_STYLES = {
  'layera-color-btn': {
    width: 'var(--layera-color-btn-size)',
    height: 'var(--layera-color-btn-size)',
    borderRadius: 'var(--layera-radius-sm)',
    border: 'none',
    color: '#ffffff',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  'layera-color-btn--primary': {
    backgroundColor: 'var(--layera-color-primary)'
  },
  'layera-color-btn--secondary': {
    backgroundColor: 'var(--layera-color-secondary)'
  },
  'layera-color-btn--success': {
    backgroundColor: 'var(--layera-color-success)'
  },
  'layera-color-btn--warning': {
    backgroundColor: 'var(--layera-color-warning)'
  },
  'layera-color-btn--danger': {
    backgroundColor: 'var(--layera-color-danger)'
  },
  'layera-color-btn--info': {
    backgroundColor: 'var(--layera-color-info)'
  },
  'layera-color-btn--active': {
    border: '2px solid var(--layera-color-active-border)',
    boxShadow: '0 0 0 2px var(--layera-color-active-border)',
    transform: 'scale(0.95)'
  }
};

/**
 * Header Toggle Button Styles - Settings/Palette toggle buttons
 */
export const HEADER_TOGGLE_BUTTON_STYLES = {
  'layera-toggle-btn': {
    width: 'var(--layera-toggle-btn-size)',
    height: 'var(--layera-toggle-btn-size)',
    backgroundColor: 'var(--layera-color-header-toggle-bg)',
    border: '1px solid var(--layera-color-header-input-border)',
    borderRadius: 'var(--layera-radius-sm)',
    color: 'var(--layera-color-header-text)',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-toggle-btn:hover': {
    backgroundColor: 'rgba(255,255,255,0.25)'
  }
};

/**
 * Header Input Field Styles - Search & Location inputs
 */
export const HEADER_INPUT_STYLES = {
  'layera-input-wrapper': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  'layera-input-search': {
    height: 'var(--layera-input-height)',
    padding: '0 var(--layera-space-4) 0 2.5rem',
    backgroundColor: 'var(--layera-color-header-input-bg)',
    border: '1px solid var(--layera-color-header-input-border)',
    borderRadius: 'var(--layera-radius-sm)',
    color: 'var(--layera-color-header-text)',
    fontSize: 'var(--layera-font-size-sm)',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  'layera-input-location': {
    height: 'var(--layera-input-height)',
    padding: '0 var(--layera-space-4) 0 2.5rem',
    backgroundColor: 'var(--layera-color-header-input-bg)',
    border: '1px solid var(--layera-color-header-input-border)',
    borderRadius: 'var(--layera-radius-sm)',
    color: 'var(--layera-color-header-text)',
    fontSize: 'var(--layera-font-size-sm)',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  'layera-input-search::placeholder': {
    color: 'rgba(255,255,255,0.6)'
  },
  'layera-input-location::placeholder': {
    color: 'rgba(255,255,255,0.6)'
  },
  'layera-input-search:focus': {
    backgroundColor: 'rgba(255,255,255,0.30)'
  },
  'layera-input-location:focus': {
    backgroundColor: 'rgba(255,255,255,0.30)'
  }
};

/**
 * HeaderBuilder Class - Enterprise Header CSS Generation
 */
export class HeaderBuilder {
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
   * Generates CSS από header class definitions
   * @param {object} classDefinitions - Object με header class definitions
   * @returns {string} - CSS string
   */
  static generateHeaderCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates App Header CSS
   * @returns {string} - App header CSS
   */
  static generateAppHeaderCSS() {
    let css = '/* APP HEADER COMPONENT STYLES */\n';
    css += this.generateHeaderCSS(APP_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Color Button CSS
   * @returns {string} - Color button CSS
   */
  static generateColorButtonCSS() {
    let css = '/* HEADER COLOR BUTTON STYLES */\n';
    css += this.generateHeaderCSS(HEADER_COLOR_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Toggle Button CSS
   * @returns {string} - Toggle button CSS
   */
  static generateToggleButtonCSS() {
    let css = '/* HEADER TOGGLE BUTTON STYLES */\n';
    css += this.generateHeaderCSS(HEADER_TOGGLE_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Input Field CSS
   * @returns {string} - Input field CSS
   */
  static generateInputCSS() {
    let css = '/* HEADER INPUT FIELD STYLES */\n';
    css += this.generateHeaderCSS(HEADER_INPUT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Header CSS classes
   * @returns {string} - Complete header CSS
   */
  static generateAllHeaderCSS() {
    let css = '/* === LAYERA HEADER CLASSES === */\n\n';

    css += this.generateAppHeaderCSS();
    css += this.generateColorButtonCSS();
    css += this.generateToggleButtonCSS();
    css += this.generateInputCSS();

    return css;
  }

  /**
   * Gets όλες τις available header classes
   * @returns {object} - Object με όλες τις header class definitions
   */
  static getAllHeaderClasses() {
    return {
      ...APP_HEADER_STYLES,
      ...HEADER_COLOR_BUTTON_STYLES,
      ...HEADER_TOGGLE_BUTTON_STYLES,
      ...HEADER_INPUT_STYLES
    };
  }

  /**
   * Gets specific header category
   * @param {string} category - Header category (app, colorButtons, toggleButtons, inputs)
   * @returns {object|null} - Header group ή null αν δεν υπάρχει
   */
  static getHeaderCategory(category) {
    const categories = {
      app: APP_HEADER_STYLES,
      colorButtons: HEADER_COLOR_BUTTON_STYLES,
      toggleButtons: HEADER_TOGGLE_BUTTON_STYLES,
      inputs: HEADER_INPUT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι header classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateHeaderClasses() {
    try {
      const allClasses = this.getAllHeaderClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid header class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for header class: ${className}`);
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (typeof property !== 'string' || !property.trim()) {
            throw new Error(`Invalid CSS property: ${property} in header class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in header class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Header classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets header classes by functionality
   * @param {string} functionality - Functionality type (layout, interactive, styling)
   * @returns {string[]} - Array με header class names
   */
  static getHeaderClassesByFunctionality(functionality) {
    const functionalityMap = {
      layout: ['app'],
      interactive: ['colorButtons', 'toggleButtons', 'inputs'],
      styling: ['colorButtons', 'toggleButtons']
    };

    const categories = functionalityMap[functionality] || [];
    const headerClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getHeaderCategory(category);
      if (categoryClasses) {
        headerClasses.push(...Object.keys(categoryClasses));
      }
    });

    return headerClasses;
  }
}

export default HeaderBuilder;