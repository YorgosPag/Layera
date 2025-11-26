/**
 * HeaderBuilder.js - Enterprise Unified Header Builder Module
 *
 * Single Responsibility: Μόνο header component CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 *
 * UNIFIED CONSOLIDATION: HeaderBuilder + HeaderExtendedBuilder = ONE unified module
 */

/**
 * Header Core Structure Styles - Main header container και layout
 */
export const HEADER_CORE_STRUCTURE_STYLES = {
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
  'header-container': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
    background: 'var(--layera-color-header-bg)',
    color: 'var(--layera-color-header-text)',
    height: 'var(--layera-header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--layera-space-4)',
    boxShadow: 'var(--layera-shadow-header)'
  },
  'layera-header-content': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

/**
 * Header Layout Components - Left section, navigation, etc.
 */
export const HEADER_LAYOUT_COMPONENTS_STYLES = {
  'layera-header-left': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-4)'
  },
  'header-left-section': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-4)'
  },
  'header-nav': {
    display: 'flex',
    gap: 'var(--layera-space-4)',
    alignItems: 'center'
  },
  'layera-header-nav': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-3)'
  },
  'header-sidebar-toggles': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginRight: 'var(--layera-space-4)'
  }
};

/**
 * Header Content Elements - Title, logo, branding
 */
export const HEADER_CONTENT_ELEMENTS_STYLES = {
  'layera-header-title': {
    margin: '0',
    fontSize: 'var(--layera-font-size-xl)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'header-logo': {
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    margin: '0'
  }
};

/**
 * Header Color Buttons - UNIFIED από HeaderBuilder + HeaderExtendedBuilder
 */
export const HEADER_COLOR_BUTTONS_STYLES = {
  'layera-color-btn': {
    width: 'var(--layera-color-btn-size)',
    height: 'var(--layera-color-btn-size)',
    borderRadius: '50%',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  'layera-color-btn:hover': {
    borderColor: 'var(--layera-color-header-text)',
    opacity: '0.8'
  },
  'layera-color-btn--active': {
    borderColor: 'var(--layera-color-active-border)',
    borderWidth: '3px'
  },
  'header-buttons-group': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    margin: '0',
    flexWrap: 'wrap'
  },
  'layera-color-btn-group': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  },
  'header-color-button': {
    width: 'var(--layera-color-btn-size)',
    height: 'var(--layera-color-btn-size)',
    borderRadius: '50%',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'header-color-button:hover': {
    borderColor: 'var(--layera-color-header-text)'
  }
};

/**
 * Header Toggle Buttons - UNIFIED από HeaderBuilder + HeaderExtendedBuilder
 */
export const HEADER_TOGGLE_BUTTONS_STYLES = {
  'layera-sidebar-toggle-btn': {
    background: 'var(--layera-color-header-toggle-bg)',
    color: 'var(--layera-color-header-text)',
    border: 'none',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-sidebar-toggle-btn:hover': {
    opacity: '0.8'
  },
  'layera-sidebar-toggle-btn--active': {
    backgroundColor: 'var(--layera-color-header-text)',
    color: 'var(--layera-color-header-bg)'
  },
  'header-toggle-button': {
    background: 'var(--layera-color-header-toggle-bg)',
    color: 'var(--layera-color-header-text)',
    border: 'none',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
    fontSize: 'var(--layera-font-size-sm)'
  },
  'header-toggle-button:hover': {
    opacity: '0.8'
  }
};

/**
 * Header Input Elements - Search, forms
 */
export const HEADER_INPUT_ELEMENTS_STYLES = {
  'layera-header-input': {
    background: 'var(--layera-color-header-input-bg)',
    border: '1px solid var(--layera-color-header-input-border)',
    color: 'var(--layera-color-header-text)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    outline: 'none'
  },
  'layera-header-input::placeholder': {
    color: 'var(--layera-color-header-text)',
    opacity: '0.7'
  },
  'header-search-container': {
    position: 'relative'
  },
  'header-search-input': {
    background: 'var(--layera-color-header-input-bg)',
    border: '1px solid var(--layera-color-header-input-border)',
    color: 'var(--layera-color-header-text)',
    padding: 'var(--layera-space-2) var(--layera-space-6) var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    width: '200px',
    outline: 'none'
  },
  'header-search-input::placeholder': {
    color: 'var(--layera-color-header-text)',
    opacity: '0.7'
  }
};

/**
 * Header Profile και User Actions
 */
export const HEADER_PROFILE_STYLES = {
  'header-profile-button': {
    background: 'var(--layera-color-header-toggle-bg)',
    color: 'var(--layera-color-header-text)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  },
  'header-profile-button:hover': {
    opacity: '0.8'
  }
};

/**
 * Primary Sidebar Elements στο Header Context (από HeaderExtendedBuilder)
 */
export const HEADER_SIDEBAR_CONTEXT_STYLES = {
  'primary-sidebar-heading': {
    color: 'var(--layera-sidebar-title)'
  },
  'primary-sidebar-heading--actions': {
    color: 'var(--layera-sidebar-title)',
    marginTop: 'var(--layera-space-8)'
  },
  'primary-sidebar-input': {
    padding: 'var(--layera-space-3)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-sidebar-input-bg)',
    color: 'var(--layera-sidebar-text)',
    width: '100%'
  },
  'primary-sidebar-menu-item': {
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  'primary-sidebar-menu-item--active': {
    background: 'var(--layera-sidebar-menu-item-hover)'
  },
  'primary-sidebar-login-button': {
    background: 'var(--layera-color-primary)',
    border: 'none',
    width: '100%',
    color: 'var(--layera-sidebar-text)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  'primary-sidebar-login-button:hover': {
    opacity: '0.9'
  },
  'primary-sidebar-login-input': {
    padding: 'var(--layera-space-3)',
    border: 'none',
    borderRadius: 'var(--live-border-radius)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    width: '100%',
    fontSize: 'var(--layera-font-size-sm)'
  }
};

/**
 * HeaderBuilder Class - Enterprise Unified Header CSS Generation
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
   * @param {object} classDefinitions - Object με class definitions
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
   * Generates Header Core Structure CSS
   * @returns {string} - Header core structure CSS
   */
  static generateHeaderCoreStructureCSS() {
    let css = '/* HEADER CORE STRUCTURE STYLES */\n';
    css += this.generateHeaderCSS(HEADER_CORE_STRUCTURE_STYLES);
    return css;
  }

  /**
   * Generates Header Layout Components CSS
   * @returns {string} - Header layout components CSS
   */
  static generateHeaderLayoutComponentsCSS() {
    let css = '/* HEADER LAYOUT COMPONENTS STYLES */\n';
    css += this.generateHeaderCSS(HEADER_LAYOUT_COMPONENTS_STYLES);
    return css;
  }

  /**
   * Generates Header Content Elements CSS
   * @returns {string} - Header content elements CSS
   */
  static generateHeaderContentElementsCSS() {
    let css = '/* HEADER CONTENT ELEMENTS STYLES */\n';
    css += this.generateHeaderCSS(HEADER_CONTENT_ELEMENTS_STYLES);
    return css;
  }

  /**
   * Generates Header Color Buttons CSS
   * @returns {string} - Header color buttons CSS
   */
  static generateHeaderColorButtonsCSS() {
    let css = '/* HEADER COLOR BUTTONS STYLES */\n';
    css += this.generateHeaderCSS(HEADER_COLOR_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Header Toggle Buttons CSS
   * @returns {string} - Header toggle buttons CSS
   */
  static generateHeaderToggleButtonsCSS() {
    let css = '/* HEADER TOGGLE BUTTONS STYLES */\n';
    css += this.generateHeaderCSS(HEADER_TOGGLE_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Header Input Elements CSS
   * @returns {string} - Header input elements CSS
   */
  static generateHeaderInputElementsCSS() {
    let css = '/* HEADER INPUT ELEMENTS STYLES */\n';
    css += this.generateHeaderCSS(HEADER_INPUT_ELEMENTS_STYLES);
    return css;
  }

  /**
   * Generates Header Profile CSS
   * @returns {string} - Header profile CSS
   */
  static generateHeaderProfileCSS() {
    let css = '/* HEADER PROFILE STYLES */\n';
    css += this.generateHeaderCSS(HEADER_PROFILE_STYLES);
    return css;
  }

  /**
   * Generates Header Sidebar Context CSS
   * @returns {string} - Header sidebar context CSS
   */
  static generateHeaderSidebarContextCSS() {
    let css = '/* HEADER SIDEBAR CONTEXT STYLES */\n';
    css += this.generateHeaderCSS(HEADER_SIDEBAR_CONTEXT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Header CSS classes - UNIFIED APPROACH
   * @returns {string} - Complete unified header CSS
   */
  static generateAllHeaderCSS() {
    let css = '/* === UNIFIED HEADER CLASSES === */\n\n';

    css += this.generateHeaderCoreStructureCSS();
    css += this.generateHeaderLayoutComponentsCSS();
    css += this.generateHeaderContentElementsCSS();
    css += this.generateHeaderColorButtonsCSS();
    css += this.generateHeaderToggleButtonsCSS();
    css += this.generateHeaderInputElementsCSS();
    css += this.generateHeaderProfileCSS();
    css += this.generateHeaderSidebarContextCSS();

    return css;
  }

  /**
   * Gets όλες τις available header classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllHeaderClasses() {
    return {
      ...HEADER_CORE_STRUCTURE_STYLES,
      ...HEADER_LAYOUT_COMPONENTS_STYLES,
      ...HEADER_CONTENT_ELEMENTS_STYLES,
      ...HEADER_COLOR_BUTTONS_STYLES,
      ...HEADER_TOGGLE_BUTTONS_STYLES,
      ...HEADER_INPUT_ELEMENTS_STYLES,
      ...HEADER_PROFILE_STYLES,
      ...HEADER_SIDEBAR_CONTEXT_STYLES
    };
  }

  /**
   * Gets specific header category
   * @param {string} category - Category (coreStructure, layoutComponents, contentElements, colorButtons, toggleButtons, inputElements, profile, sidebarContext)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getHeaderCategory(category) {
    const categories = {
      coreStructure: HEADER_CORE_STRUCTURE_STYLES,
      layoutComponents: HEADER_LAYOUT_COMPONENTS_STYLES,
      contentElements: HEADER_CONTENT_ELEMENTS_STYLES,
      colorButtons: HEADER_COLOR_BUTTONS_STYLES,
      toggleButtons: HEADER_TOGGLE_BUTTONS_STYLES,
      inputElements: HEADER_INPUT_ELEMENTS_STYLES,
      profile: HEADER_PROFILE_STYLES,
      sidebarContext: HEADER_SIDEBAR_CONTEXT_STYLES
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
            throw new Error(`Invalid CSS property: ${property} in class: ${className}`);
          }
          if (typeof value !== 'string' && typeof value !== 'number') {
            throw new Error(`Invalid CSS value: ${value} for property: ${property} in class: ${className}`);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Header classes validation failed:', error.message);
      return false;
    }
  }
}

export default HeaderBuilder;