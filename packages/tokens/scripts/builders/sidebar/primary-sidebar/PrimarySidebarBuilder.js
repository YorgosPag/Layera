/**
 * PrimarySidebarBuilder.js - Enterprise Primary Sidebar Builder Module
 *
 * Single Responsibility: Μόνο primary sidebar CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Core Sidebar Base Styles
 */
export const CORE_SIDEBAR_STYLES = {
  'sidebar': {
    width: '250px',
    background: '#2c3e50',
    color: 'white',
    padding: '1rem',
    order: '0',
    height: 'calc(100vh - 65px)',
    minHeight: 'calc(100vh - 65px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '57px',
    left: '0',
    zIndex: '999'
  },
  'sidebar h3': {
    marginTop: '0',
    marginBottom: '1rem',
    color: '#ecf0f1',
    fontFamily: 'Arial, sans-serif'
  }
};

/**
 * Basic Menu Items Styles
 */
export const BASIC_MENU_STYLES = {
  'menu-item': {
    padding: '0.75rem',
    marginBottom: '0.5rem',
    background: '#34495e',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s',
    fontFamily: 'Arial, sans-serif'
  },
  'menu-item:hover': {
    background: '#3498db'
  }
};

/**
 * Basic Button Styles
 */
export const BASIC_BUTTON_STYLES = {
  'btn': {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  'btn:hover': {
    opacity: '0.8'
  },
  'primary-btn': {
    background: '#4A90E2',
    color: 'white'
  }
};

/**
 * Layera Sidebar Elements Styles
 */
export const LAYERA_SIDEBAR_ELEMENTS_STYLES = {
  'layera-sidebar-title': {
    margin: '0 0 var(--layera-sidebar-title-margin)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-title)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-3)'
  },
  'layera-sidebar-quick-actions': {
    marginTop: 'var(--layera-sidebar-section-gap)'
  }
};

/**
 * Advanced Button Variants Styles
 */
export const ADVANCED_BUTTON_STYLES = {
  'layera-button': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-3)',
    width: '100%',
    padding: 'var(--layera-menu-item-padding)',
    marginBottom: 'var(--layera-menu-item-margin-bottom)',
    borderRadius: 'var(--layera-menu-item-radius)',
    fontSize: 'var(--layera-font-size-base)',
    fontWeight: 'var(--layera-font-weight-medium)',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none'
  },
  'layera-button--sidebar-menu': {
    backgroundColor: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-button--sidebar-menu:hover': {
    backgroundColor: 'var(--layera-sidebar-menu-item-hover)'
  },
  'layera-button--primary-sidebar': {
    backgroundColor: 'var(--layera-color-primary)',
    color: 'white',
    justifyContent: 'center',
    fontWeight: 'var(--layera-font-weight-semibold)',
    width: '100%'
  },
  'layera-button--primary-sidebar:hover': {
    backgroundColor: 'var(--layera-color-primary)',
    opacity: '0.9'
  }
};

/**
 * Input Styling for Sidebar
 */
export const SIDEBAR_INPUT_STYLES = {
  'layera-input--sidebar': {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  'layera-input--sidebar::placeholder': {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  'layera-input--sidebar-container': {
    marginBottom: '0.5rem'
  },
  'layera-input--sidebar-filter': {
    marginBottom: '1rem'
  }
};

/**
 * Sidebar Headers Styles
 */
export const SIDEBAR_HEADER_STYLES = {
  'sidebar-h3': {
    marginBottom: '1rem',
    color: '#ecf0f1'
  },
  'sidebar-h3-second': {
    marginBottom: '1rem',
    marginTop: '2rem',
    color: '#ecf0f1'
  }
};

/**
 * PrimarySidebarBuilder Class - Enterprise Primary Sidebar CSS Generation
 */
export class PrimarySidebarBuilder {
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
   * Generates CSS από primary sidebar class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generatePrimarySidebarCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Core Sidebar CSS
   * @returns {string} - Core sidebar CSS
   */
  static generateCoreSidebarCSS() {
    let css = '/* CORE SIDEBAR BASE STYLES */\n';
    css += this.generatePrimarySidebarCSS(CORE_SIDEBAR_STYLES);
    return css;
  }

  /**
   * Generates Basic Menu CSS
   * @returns {string} - Basic menu CSS
   */
  static generateBasicMenuCSS() {
    let css = '/* BASIC MENU ITEMS STYLES */\n';
    css += this.generatePrimarySidebarCSS(BASIC_MENU_STYLES);
    return css;
  }

  /**
   * Generates Basic Button CSS
   * @returns {string} - Basic button CSS
   */
  static generateBasicButtonCSS() {
    let css = '/* BASIC BUTTON STYLES */\n';
    css += this.generatePrimarySidebarCSS(BASIC_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Layera Sidebar Elements CSS
   * @returns {string} - Layera sidebar elements CSS
   */
  static generateLayeraSidebarElementsCSS() {
    let css = '/* LAYERA SIDEBAR ELEMENTS STYLES */\n';
    css += this.generatePrimarySidebarCSS(LAYERA_SIDEBAR_ELEMENTS_STYLES);
    return css;
  }

  /**
   * Generates Advanced Button CSS
   * @returns {string} - Advanced button CSS
   */
  static generateAdvancedButtonCSS() {
    let css = '/* ADVANCED BUTTON VARIANTS STYLES */\n';
    css += this.generatePrimarySidebarCSS(ADVANCED_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Input CSS
   * @returns {string} - Sidebar input CSS
   */
  static generateSidebarInputCSS() {
    let css = '/* SIDEBAR INPUT STYLES */\n';
    css += this.generatePrimarySidebarCSS(SIDEBAR_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Header CSS
   * @returns {string} - Sidebar header CSS
   */
  static generateSidebarHeaderCSS() {
    let css = '/* SIDEBAR HEADER STYLES */\n';
    css += this.generatePrimarySidebarCSS(SIDEBAR_HEADER_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Primary Sidebar CSS classes
   * @returns {string} - Complete primary sidebar CSS
   */
  static generateAllPrimarySidebarCSS() {
    let css = '/* === PRIMARY SIDEBAR CLASSES === */\n\n';

    css += this.generateCoreSidebarCSS();
    css += this.generateBasicMenuCSS();
    css += this.generateBasicButtonCSS();
    css += this.generateLayeraSidebarElementsCSS();
    css += this.generateAdvancedButtonCSS();
    css += this.generateSidebarInputCSS();
    css += this.generateSidebarHeaderCSS();

    return css;
  }

  /**
   * Gets όλες τις available primary sidebar classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllPrimarySidebarClasses() {
    return {
      ...CORE_SIDEBAR_STYLES,
      ...BASIC_MENU_STYLES,
      ...BASIC_BUTTON_STYLES,
      ...LAYERA_SIDEBAR_ELEMENTS_STYLES,
      ...ADVANCED_BUTTON_STYLES,
      ...SIDEBAR_INPUT_STYLES,
      ...SIDEBAR_HEADER_STYLES
    };
  }

  /**
   * Gets specific primary sidebar category
   * @param {string} category - Category (core, menu, button, elements, advanced, input, header)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getPrimarySidebarCategory(category) {
    const categories = {
      core: CORE_SIDEBAR_STYLES,
      menu: BASIC_MENU_STYLES,
      button: BASIC_BUTTON_STYLES,
      elements: LAYERA_SIDEBAR_ELEMENTS_STYLES,
      advanced: ADVANCED_BUTTON_STYLES,
      input: SIDEBAR_INPUT_STYLES,
      header: SIDEBAR_HEADER_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι primary sidebar classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validatePrimarySidebarClasses() {
    try {
      const allClasses = this.getAllPrimarySidebarClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid primary sidebar class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for primary sidebar class: ${className}`);
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
      console.error('Primary sidebar classes validation failed:', error.message);
      return false;
    }
  }
}

export default PrimarySidebarBuilder;