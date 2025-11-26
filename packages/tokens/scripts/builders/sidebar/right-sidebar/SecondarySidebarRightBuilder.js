/**
 * SecondarySidebarRightBuilder.js - Right Sidebar Secondary Sidebar Builder
 *
 * Single Responsibility: Μόνο secondary sidebar right controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/secondary-sidebar-right.html
 */

/**
 * Secondary Sidebar Right Base Styles
 */
export const SECONDARY_SIDEBAR_RIGHT_BASE_STYLES = {
  'layera-secondary-sidebar-right': {
    position: 'fixed',
    top: 'var(--layera-header-height)',
    right: '0',
    width: '0',
    height: 'calc(100vh - var(--layera-header-height))',
    background: 'var(--layera-sidebar-bg)',
    borderLeft: '1px solid var(--layera-color-border)',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    zIndex: '900'
  },
  'layera-secondary-sidebar-right--open': {
    width: 'var(--layera-sidebar-width)'
  },
  'layera-secondary-sidebar-right-content': {
    padding: 'var(--layera-space-4)',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
};

/**
 * Secondary Sidebar Header Styles
 */
export const SECONDARY_SIDEBAR_HEADER_STYLES = {
  'layera-secondary-sidebar-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--layera-space-4)',
    paddingBottom: 'var(--layera-space-3)',
    borderBottom: '1px solid var(--layera-color-border)'
  },
  'layera-secondary-sidebar-title': {
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-title)',
    margin: '0'
  },
  'layera-secondary-sidebar-close': {
    background: 'transparent',
    border: 'none',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-sm)',
    transition: 'background 0.2s ease'
  },
  'layera-secondary-sidebar-close:hover': {
    background: 'rgba(0,0,0,0.1)'
  }
};

/**
 * Secondary Sidebar Sections Styles
 */
export const SECONDARY_SIDEBAR_SECTIONS_STYLES = {
  'layera-secondary-sidebar-section': {
    marginBottom: 'var(--layera-space-6)'
  },
  'layera-secondary-sidebar-section:last-child': {
    marginBottom: '0'
  },
  'layera-secondary-sidebar-section-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-title)',
    marginBottom: 'var(--layera-space-3)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-secondary-sidebar-section-content': {
    paddingLeft: 'var(--layera-space-2)'
  }
};

/**
 * Secondary Sidebar Controls Styles
 */
export const SECONDARY_SIDEBAR_CONTROLS_STYLES = {
  'layera-secondary-sidebar-control': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-secondary-sidebar-control-label': {
    display: 'block',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-secondary-sidebar-input': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)'
  },
  'layera-secondary-sidebar-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-secondary-sidebar-select': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)',
    cursor: 'pointer'
  }
};

/**
 * Secondary Sidebar Buttons Styles
 */
export const SECONDARY_SIDEBAR_BUTTONS_STYLES = {
  'layera-secondary-sidebar-button': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-secondary-sidebar-button:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-secondary-sidebar-button--primary': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-secondary-sidebar-button--primary:hover': {
    opacity: '0.9'
  },
  'layera-secondary-sidebar-button-group': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  },
  'layera-secondary-sidebar-button-group .layera-secondary-sidebar-button': {
    flex: '1',
    marginBottom: '0'
  }
};

/**
 * Secondary Sidebar Toggle Styles
 */
export const SECONDARY_SIDEBAR_TOGGLE_STYLES = {
  'layera-secondary-sidebar-toggle': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-secondary-sidebar-toggle-label': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    flex: '1'
  },
  'layera-secondary-sidebar-switch': {
    position: 'relative',
    width: '44px',
    height: '24px',
    background: 'var(--layera-color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  },
  'layera-secondary-sidebar-switch--active': {
    background: 'var(--layera-color-primary)'
  },
  'layera-secondary-sidebar-switch-thumb': {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    transition: 'transform 0.2s ease'
  },
  'layera-secondary-sidebar-switch--active .layera-secondary-sidebar-switch-thumb': {
    transform: 'translateX(20px)'
  }
};

/**
 * Secondary Sidebar Tabs Styles
 */
export const SECONDARY_SIDEBAR_TABS_STYLES = {
  'layera-secondary-sidebar-tabs': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-secondary-sidebar-tab': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'transparent',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  'layera-secondary-sidebar-tab:hover': {
    background: 'white',
    color: 'var(--layera-color-primary)'
  },
  'layera-secondary-sidebar-tab--active': {
    background: 'white',
    color: 'var(--layera-color-primary)',
    fontWeight: 'var(--layera-font-weight-medium)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  'layera-secondary-sidebar-tab-content': {
    display: 'none'
  },
  'layera-secondary-sidebar-tab-content--active': {
    display: 'block'
  }
};

/**
 * Secondary Sidebar List Styles
 */
export const SECONDARY_SIDEBAR_LIST_STYLES = {
  'layera-secondary-sidebar-list': {
    margin: '0',
    padding: '0',
    listStyle: 'none'
  },
  'layera-secondary-sidebar-list-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    marginBottom: 'var(--layera-space-2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-secondary-sidebar-list-item:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05'
  },
  'layera-secondary-sidebar-list-item--selected': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)15',
    color: 'var(--layera-color-primary)'
  },
  'layera-secondary-sidebar-list-item-text': {
    fontSize: 'var(--layera-font-size-sm)',
    flex: '1'
  },
  'layera-secondary-sidebar-list-item-action': {
    background: 'transparent',
    border: 'none',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-xs)',
    padding: 'var(--layera-space-1)'
  }
};

/**
 * Secondary Sidebar Footer Styles
 */
export const SECONDARY_SIDEBAR_FOOTER_STYLES = {
  'layera-secondary-sidebar-footer': {
    marginTop: 'auto',
    paddingTop: 'var(--layera-space-4)',
    borderTop: '1px solid var(--layera-color-border)'
  },
  'layera-secondary-sidebar-footer-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  },
  'layera-secondary-sidebar-footer-button': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-secondary-sidebar-footer-button:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  }
};

/**
 * SecondarySidebarRightBuilder Class - Enterprise Secondary Sidebar Right CSS Generation
 */
export class SecondarySidebarRightBuilder {
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
   * Generates CSS από secondary sidebar right class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateSecondarySidebarRightCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Secondary Sidebar Right Base CSS
   * @returns {string} - Secondary sidebar right base CSS
   */
  static generateSecondarySidebarRightBaseCSS() {
    let css = '/* SECONDARY SIDEBAR RIGHT BASE STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_RIGHT_BASE_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Header CSS
   * @returns {string} - Secondary sidebar header CSS
   */
  static generateSecondarySidebarHeaderCSS() {
    let css = '/* SECONDARY SIDEBAR HEADER STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Sections CSS
   * @returns {string} - Secondary sidebar sections CSS
   */
  static generateSecondarySidebarSectionsCSS() {
    let css = '/* SECONDARY SIDEBAR SECTIONS STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_SECTIONS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Controls CSS
   * @returns {string} - Secondary sidebar controls CSS
   */
  static generateSecondarySidebarControlsCSS() {
    let css = '/* SECONDARY SIDEBAR CONTROLS STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Buttons CSS
   * @returns {string} - Secondary sidebar buttons CSS
   */
  static generateSecondarySidebarButtonsCSS() {
    let css = '/* SECONDARY SIDEBAR BUTTONS STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Toggle CSS
   * @returns {string} - Secondary sidebar toggle CSS
   */
  static generateSecondarySidebarToggleCSS() {
    let css = '/* SECONDARY SIDEBAR TOGGLE STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_TOGGLE_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Tabs CSS
   * @returns {string} - Secondary sidebar tabs CSS
   */
  static generateSecondarySidebarTabsCSS() {
    let css = '/* SECONDARY SIDEBAR TABS STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_TABS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar List CSS
   * @returns {string} - Secondary sidebar list CSS
   */
  static generateSecondarySidebarListCSS() {
    let css = '/* SECONDARY SIDEBAR LIST STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_LIST_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Footer CSS
   * @returns {string} - Secondary sidebar footer CSS
   */
  static generateSecondarySidebarFooterCSS() {
    let css = '/* SECONDARY SIDEBAR FOOTER STYLES */\n';
    css += this.generateSecondarySidebarRightCSS(SECONDARY_SIDEBAR_FOOTER_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Secondary Sidebar Right CSS classes
   * @returns {string} - Complete secondary sidebar right CSS
   */
  static generateAllSecondarySidebarRightCSS() {
    let css = '/* === RIGHT SIDEBAR: SECONDARY SIDEBAR RIGHT === */\n\n';

    css += this.generateSecondarySidebarRightBaseCSS();
    css += this.generateSecondarySidebarHeaderCSS();
    css += this.generateSecondarySidebarSectionsCSS();
    css += this.generateSecondarySidebarControlsCSS();
    css += this.generateSecondarySidebarButtonsCSS();
    css += this.generateSecondarySidebarToggleCSS();
    css += this.generateSecondarySidebarTabsCSS();
    css += this.generateSecondarySidebarListCSS();
    css += this.generateSecondarySidebarFooterCSS();

    return css;
  }

  /**
   * Gets όλες τις available secondary sidebar right classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllSecondarySidebarRightClasses() {
    return {
      ...SECONDARY_SIDEBAR_RIGHT_BASE_STYLES,
      ...SECONDARY_SIDEBAR_HEADER_STYLES,
      ...SECONDARY_SIDEBAR_SECTIONS_STYLES,
      ...SECONDARY_SIDEBAR_CONTROLS_STYLES,
      ...SECONDARY_SIDEBAR_BUTTONS_STYLES,
      ...SECONDARY_SIDEBAR_TOGGLE_STYLES,
      ...SECONDARY_SIDEBAR_TABS_STYLES,
      ...SECONDARY_SIDEBAR_LIST_STYLES,
      ...SECONDARY_SIDEBAR_FOOTER_STYLES
    };
  }

  /**
   * Gets specific secondary sidebar right category
   * @param {string} category - Category (base, header, sections, controls, buttons, toggle, tabs, list, footer)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getSecondarySidebarRightCategory(category) {
    const categories = {
      base: SECONDARY_SIDEBAR_RIGHT_BASE_STYLES,
      header: SECONDARY_SIDEBAR_HEADER_STYLES,
      sections: SECONDARY_SIDEBAR_SECTIONS_STYLES,
      controls: SECONDARY_SIDEBAR_CONTROLS_STYLES,
      buttons: SECONDARY_SIDEBAR_BUTTONS_STYLES,
      toggle: SECONDARY_SIDEBAR_TOGGLE_STYLES,
      tabs: SECONDARY_SIDEBAR_TABS_STYLES,
      list: SECONDARY_SIDEBAR_LIST_STYLES,
      footer: SECONDARY_SIDEBAR_FOOTER_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι secondary sidebar right classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSecondarySidebarRightClasses() {
    try {
      const allClasses = this.getAllSecondarySidebarRightClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid secondary sidebar right class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for secondary sidebar right class: ${className}`);
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
      console.error('Secondary sidebar right classes validation failed:', error.message);
      return false;
    }
  }
}

export default SecondarySidebarRightBuilder;