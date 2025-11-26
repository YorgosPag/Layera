/**
 * HeaderExtendedBuilder.js - Enterprise Header Extended Builder Module
 *
 * Single Responsibility: Μόνο extended header CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Header Container Core Styles
 */
export const HEADER_CONTAINER_CORE_STYLES = {
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
  'header-left-section': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-4)'
  }
};

/**
 * Header Content Core Styles
 */
export const HEADER_CONTENT_CORE_STYLES = {
  'layera-header-content': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

/**
 * Header Logo Styles
 */
export const HEADER_LOGO_STYLES = {
  'header-logo': {
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    margin: '0'
  }
};

/**
 * Header Color Buttons Styles
 */
export const HEADER_COLOR_BUTTONS_STYLES = {
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
 * Header Navigation Styles
 */
export const HEADER_NAVIGATION_STYLES = {
  'header-nav': {
    display: 'flex',
    gap: 'var(--layera-space-4)',
    alignItems: 'center'
  },
  'header-sidebar-toggles': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginRight: 'var(--layera-space-4)'
  }
};

/**
 * Header Toggle Button Styles
 */
export const HEADER_TOGGLE_BUTTON_STYLES = {
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
 * Header Search Styles
 */
export const HEADER_SEARCH_STYLES = {
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
 * Header Profile Button Styles
 */
export const HEADER_PROFILE_BUTTON_STYLES = {
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
 * Primary Sidebar Components in Header Context
 */
export const PRIMARY_SIDEBAR_HEADER_CONTEXT_STYLES = {
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
  }
};

/**
 * Primary Sidebar Login Components
 */
export const PRIMARY_SIDEBAR_LOGIN_STYLES = {
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
 * HeaderExtendedBuilder Class - Enterprise Header Extended CSS Generation
 */
export class HeaderExtendedBuilder {
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
   * Generates CSS από header extended class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateHeaderExtendedCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Header Container Core CSS
   * @returns {string} - Header container core CSS
   */
  static generateHeaderContainerCoreCSS() {
    let css = '/* HEADER CONTAINER CORE STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_CONTAINER_CORE_STYLES);
    return css;
  }

  /**
   * Generates Header Content Core CSS
   * @returns {string} - Header content core CSS
   */
  static generateHeaderContentCoreCSS() {
    let css = '/* HEADER CONTENT CORE STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_CONTENT_CORE_STYLES);
    return css;
  }

  /**
   * Generates Header Logo CSS
   * @returns {string} - Header logo CSS
   */
  static generateHeaderLogoCSS() {
    let css = '/* HEADER LOGO STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_LOGO_STYLES);
    return css;
  }

  /**
   * Generates Header Color Buttons CSS
   * @returns {string} - Header color buttons CSS
   */
  static generateHeaderColorButtonsCSS() {
    let css = '/* HEADER COLOR BUTTONS STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_COLOR_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Header Navigation CSS
   * @returns {string} - Header navigation CSS
   */
  static generateHeaderNavigationCSS() {
    let css = '/* HEADER NAVIGATION STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_NAVIGATION_STYLES);
    return css;
  }

  /**
   * Generates Header Toggle Button CSS
   * @returns {string} - Header toggle button CSS
   */
  static generateHeaderToggleButtonCSS() {
    let css = '/* HEADER TOGGLE BUTTON STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_TOGGLE_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Header Search CSS
   * @returns {string} - Header search CSS
   */
  static generateHeaderSearchCSS() {
    let css = '/* HEADER SEARCH STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_SEARCH_STYLES);
    return css;
  }

  /**
   * Generates Header Profile Button CSS
   * @returns {string} - Header profile button CSS
   */
  static generateHeaderProfileButtonCSS() {
    let css = '/* HEADER PROFILE BUTTON STYLES */\n';
    css += this.generateHeaderExtendedCSS(HEADER_PROFILE_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Primary Sidebar Header Context CSS
   * @returns {string} - Primary sidebar header context CSS
   */
  static generatePrimarySidebarHeaderContextCSS() {
    let css = '/* PRIMARY SIDEBAR HEADER CONTEXT STYLES */\n';
    css += this.generateHeaderExtendedCSS(PRIMARY_SIDEBAR_HEADER_CONTEXT_STYLES);
    return css;
  }

  /**
   * Generates Primary Sidebar Login CSS
   * @returns {string} - Primary sidebar login CSS
   */
  static generatePrimarySidebarLoginCSS() {
    let css = '/* PRIMARY SIDEBAR LOGIN STYLES */\n';
    css += this.generateHeaderExtendedCSS(PRIMARY_SIDEBAR_LOGIN_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Header Extended CSS classes
   * @returns {string} - Complete header extended CSS
   */
  static generateAllHeaderExtendedCSS() {
    let css = '/* === HEADER EXTENDED CLASSES === */\n\n';

    css += this.generateHeaderContainerCoreCSS();
    css += this.generateHeaderContentCoreCSS();
    css += this.generateHeaderLogoCSS();
    css += this.generateHeaderColorButtonsCSS();
    css += this.generateHeaderNavigationCSS();
    css += this.generateHeaderToggleButtonCSS();
    css += this.generateHeaderSearchCSS();
    css += this.generateHeaderProfileButtonCSS();
    css += this.generatePrimarySidebarHeaderContextCSS();
    css += this.generatePrimarySidebarLoginCSS();

    return css;
  }

  /**
   * Gets όλες τις available header extended classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllHeaderExtendedClasses() {
    return {
      ...HEADER_CONTAINER_CORE_STYLES,
      ...HEADER_CONTENT_CORE_STYLES,
      ...HEADER_LOGO_STYLES,
      ...HEADER_COLOR_BUTTONS_STYLES,
      ...HEADER_NAVIGATION_STYLES,
      ...HEADER_TOGGLE_BUTTON_STYLES,
      ...HEADER_SEARCH_STYLES,
      ...HEADER_PROFILE_BUTTON_STYLES,
      ...PRIMARY_SIDEBAR_HEADER_CONTEXT_STYLES,
      ...PRIMARY_SIDEBAR_LOGIN_STYLES
    };
  }

  /**
   * Gets specific header extended category
   * @param {string} category - Category (containerCore, contentCore, logo, colorButtons, navigation, toggleButton, search, profileButton, sidebarHeaderContext, sidebarLogin)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getHeaderExtendedCategory(category) {
    const categories = {
      containerCore: HEADER_CONTAINER_CORE_STYLES,
      contentCore: HEADER_CONTENT_CORE_STYLES,
      logo: HEADER_LOGO_STYLES,
      colorButtons: HEADER_COLOR_BUTTONS_STYLES,
      navigation: HEADER_NAVIGATION_STYLES,
      toggleButton: HEADER_TOGGLE_BUTTON_STYLES,
      search: HEADER_SEARCH_STYLES,
      profileButton: HEADER_PROFILE_BUTTON_STYLES,
      sidebarHeaderContext: PRIMARY_SIDEBAR_HEADER_CONTEXT_STYLES,
      sidebarLogin: PRIMARY_SIDEBAR_LOGIN_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι header extended classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateHeaderExtendedClasses() {
    try {
      const allClasses = this.getAllHeaderExtendedClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid header extended class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for header extended class: ${className}`);
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
      console.error('Header extended classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets header extended classes by functionality type
   * @param {string} functionality - Functionality type (structure, interaction, navigation, content)
   * @returns {string[]} - Array με class names
   */
  static getHeaderExtendedClassesByFunctionality(functionality) {
    const functionalityMap = {
      structure: ['containerCore', 'contentCore'],
      interaction: ['toggleButton', 'colorButtons', 'profileButton'],
      navigation: ['navigation', 'search'],
      content: ['logo', 'sidebarHeaderContext', 'sidebarLogin']
    };

    const categories = functionalityMap[functionality] || [];
    const headerExtendedClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getHeaderExtendedCategory(category);
      if (categoryClasses) {
        headerExtendedClasses.push(...Object.keys(categoryClasses));
      }
    });

    return headerExtendedClasses;
  }
}

export default HeaderExtendedBuilder;