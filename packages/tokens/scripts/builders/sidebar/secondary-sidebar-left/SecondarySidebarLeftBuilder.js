/**
 * SecondarySidebarLeftBuilder.js - Secondary Sidebar Left Builder
 *
 * Single Responsibility: Μόνο secondary sidebar left CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/secondary-sidebar-left.html
 */

/**
 * Secondary Sidebar Left Base Styles
 */
export const SECONDARY_SIDEBAR_LEFT_BASE_STYLES = {
  'sidebar-secondary': {
    width: '0',
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-sidebar-text)',
    padding: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    borderLeft: '1px solid var(--layera-color-border)',
    boxSizing: 'border-box',
    height: 'calc(100vh - var(--layera-header-height))',
    position: 'relative'
  },
  'sidebar-secondary.open': {
    width: '280px',
    padding: 'var(--layera-space-4)',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  'sidebar-secondary.left': {
    borderLeft: '1px solid var(--layera-color-border)',
    borderRight: '1px solid var(--layera-color-border)',
    order: '1'
  }
};

/**
 * Custom Scrollbar Styles
 */
export const CUSTOM_SCROLLBAR_STYLES = {
  'sidebar-secondary::-webkit-scrollbar': {
    width: '8px'
  },
  'sidebar-secondary::-webkit-scrollbar-track': {
    background: 'var(--layera-sidebar-bg)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'sidebar-secondary::-webkit-scrollbar-thumb': {
    background: 'var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-surface)'
  },
  'sidebar-secondary::-webkit-scrollbar-thumb:hover': {
    background: 'var(--layera-color-border-hover)'
  }
};

/**
 * Scroll Indicator Styles
 */
export const SCROLL_INDICATOR_STYLES = {
  'sidebar-secondary::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    right: '0',
    width: '2px',
    height: '20px',
    background: 'linear-gradient(to bottom, var(--layera-color-primary), transparent)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  'sidebar-secondary.open:hover::before': {
    opacity: '0.7'
  }
};

/**
 * Secondary Sidebar Headers Styles
 */
export const SECONDARY_SIDEBAR_HEADERS_STYLES = {
  'sidebar-secondary h3': {
    marginTop: '0',
    marginBottom: 'var(--layera-space-4)',
    color: 'var(--layera-sidebar-title)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    borderBottom: '1px solid var(--layera-color-border)',
    paddingBottom: 'var(--layera-space-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  }
};

/**
 * Setting Groups Styles
 */
export const SETTING_GROUPS_STYLES = {
  'layera-setting-group': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-setting-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)',
    opacity: '0.9'
  }
};

/**
 * Form Controls Styles
 */
export const FORM_CONTROLS_STYLES = {
  'layera-secondary-select': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\"><polyline points=\\"6,9 12,15 18,9\\"></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: 'var(--layera-space-8)'
  },
  'layera-secondary-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Theme Mode Buttons Styles
 */
export const THEME_MODE_BUTTONS_STYLES = {
  'layera-theme-mode-container': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  },
  'layera-theme-mode-btn': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-1)'
  },
  'layera-theme-mode-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)10'
  },
  'layera-theme-mode-btn--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-theme-mode-btn--light': {
    background: 'var(--layera-color-primary)',
    color: 'white'
  },
  'layera-theme-mode-btn--dark': {
    background: 'var(--layera-color-muted)',
    color: 'white'
  }
};

/**
 * Checkbox Controls Styles
 */
export const CHECKBOX_CONTROLS_STYLES = {
  'layera-checkbox-container': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-checkbox': {
    margin: '0',
    width: '16px',
    height: '16px',
    accentColor: 'var(--layera-color-primary)'
  },
  'layera-checkbox-label': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    userSelect: 'none'
  }
};

/**
 * Action Buttons Styles
 */
export const ACTION_BUTTONS_STYLES = {
  'layera-btn': {
    padding: 'var(--layera-space-2) var(--layera-space-4)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-btn:hover': {
    opacity: '0.9',
    transform: 'translateY(-1px)'
  },
  'layera-btn--danger': {
    background: 'var(--layera-color-danger)',
    color: 'white',
    width: '100%',
    marginTop: 'var(--layera-space-4)'
  },
  'layera-btn--danger:hover': {
    background: 'var(--layera-color-danger-hover)',
    boxShadow: '0 2px 8px var(--layera-color-danger)40'
  }
};

/**
 * Security Section Styles
 */
export const SECURITY_SECTION_STYLES = {
  'layera-security-section': {
    marginTop: 'var(--layera-space-6)',
    paddingTop: 'var(--layera-space-4)',
    borderTop: '1px solid var(--layera-color-border)'
  },
  'layera-security-title': {
    margin: '0 0 var(--layera-space-4) 0',
    color: 'var(--layera-sidebar-title)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  }
};

/**
 * SecondarySidebarLeftBuilder Class - Enterprise Secondary Sidebar Left CSS Generation
 */
export class SecondarySidebarLeftBuilder {
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
   * Generates CSS από secondary sidebar left class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateSecondarySidebarLeftCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Secondary Sidebar Left Base CSS
   * @returns {string} - Base CSS
   */
  static generateSecondarySidebarLeftBaseCSS() {
    let css = '/* SECONDARY SIDEBAR LEFT BASE STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(SECONDARY_SIDEBAR_LEFT_BASE_STYLES);
    return css;
  }

  /**
   * Generates Custom Scrollbar CSS
   * @returns {string} - Scrollbar CSS
   */
  static generateCustomScrollbarCSS() {
    let css = '/* CUSTOM SCROLLBAR STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(CUSTOM_SCROLLBAR_STYLES);
    return css;
  }

  /**
   * Generates Scroll Indicator CSS
   * @returns {string} - Scroll indicator CSS
   */
  static generateScrollIndicatorCSS() {
    let css = '/* SCROLL INDICATOR STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(SCROLL_INDICATOR_STYLES);
    return css;
  }

  /**
   * Generates Headers CSS
   * @returns {string} - Headers CSS
   */
  static generateHeadersCSS() {
    let css = '/* SECONDARY SIDEBAR HEADERS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(SECONDARY_SIDEBAR_HEADERS_STYLES);
    return css;
  }

  /**
   * Generates Setting Groups CSS
   * @returns {string} - Setting groups CSS
   */
  static generateSettingGroupsCSS() {
    let css = '/* SETTING GROUPS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(SETTING_GROUPS_STYLES);
    return css;
  }

  /**
   * Generates Form Controls CSS
   * @returns {string} - Form controls CSS
   */
  static generateFormControlsCSS() {
    let css = '/* FORM CONTROLS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(FORM_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Theme Mode Buttons CSS
   * @returns {string} - Theme mode buttons CSS
   */
  static generateThemeModeButtonsCSS() {
    let css = '/* THEME MODE BUTTONS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(THEME_MODE_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Checkbox Controls CSS
   * @returns {string} - Checkbox controls CSS
   */
  static generateCheckboxControlsCSS() {
    let css = '/* CHECKBOX CONTROLS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(CHECKBOX_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Action Buttons CSS
   * @returns {string} - Action buttons CSS
   */
  static generateActionButtonsCSS() {
    let css = '/* ACTION BUTTONS STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(ACTION_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Security Section CSS
   * @returns {string} - Security section CSS
   */
  static generateSecuritySectionCSS() {
    let css = '/* SECURITY SECTION STYLES */\n';
    css += this.generateSecondarySidebarLeftCSS(SECURITY_SECTION_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Secondary Sidebar Left CSS classes
   * @returns {string} - Complete secondary sidebar left CSS
   */
  static generateAllSecondarySidebarLeftCSS() {
    let css = '/* === SECONDARY SIDEBAR LEFT === */\n\n';

    css += this.generateSecondarySidebarLeftBaseCSS();
    css += this.generateCustomScrollbarCSS();
    css += this.generateScrollIndicatorCSS();
    css += this.generateHeadersCSS();
    css += this.generateSettingGroupsCSS();
    css += this.generateFormControlsCSS();
    css += this.generateThemeModeButtonsCSS();
    css += this.generateCheckboxControlsCSS();
    css += this.generateActionButtonsCSS();
    css += this.generateSecuritySectionCSS();

    return css;
  }

  /**
   * Gets όλες τις available secondary sidebar left classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllSecondarySidebarLeftClasses() {
    return {
      ...SECONDARY_SIDEBAR_LEFT_BASE_STYLES,
      ...CUSTOM_SCROLLBAR_STYLES,
      ...SCROLL_INDICATOR_STYLES,
      ...SECONDARY_SIDEBAR_HEADERS_STYLES,
      ...SETTING_GROUPS_STYLES,
      ...FORM_CONTROLS_STYLES,
      ...THEME_MODE_BUTTONS_STYLES,
      ...CHECKBOX_CONTROLS_STYLES,
      ...ACTION_BUTTONS_STYLES,
      ...SECURITY_SECTION_STYLES
    };
  }

  /**
   * Gets specific secondary sidebar left category
   * @param {string} category - Category (base, scrollbar, indicator, headers, settingGroups, formControls, themeModeButtons, checkboxControls, actionButtons, securitySection)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getSecondarySidebarLeftCategory(category) {
    const categories = {
      base: SECONDARY_SIDEBAR_LEFT_BASE_STYLES,
      scrollbar: CUSTOM_SCROLLBAR_STYLES,
      indicator: SCROLL_INDICATOR_STYLES,
      headers: SECONDARY_SIDEBAR_HEADERS_STYLES,
      settingGroups: SETTING_GROUPS_STYLES,
      formControls: FORM_CONTROLS_STYLES,
      themeModeButtons: THEME_MODE_BUTTONS_STYLES,
      checkboxControls: CHECKBOX_CONTROLS_STYLES,
      actionButtons: ACTION_BUTTONS_STYLES,
      securitySection: SECURITY_SECTION_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι secondary sidebar left classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSecondarySidebarLeftClasses() {
    try {
      const allClasses = this.getAllSecondarySidebarLeftClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid secondary sidebar left class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for secondary sidebar left class: ${className}`);
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
      console.error('Secondary sidebar left classes validation failed:', error.message);
      return false;
    }
  }
}

export default SecondarySidebarLeftBuilder;