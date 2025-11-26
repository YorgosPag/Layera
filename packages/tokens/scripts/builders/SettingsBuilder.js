/**
 * SettingsBuilder.js - Enterprise Settings & App Header Builder Module
 *
 * Single Responsibility: Μόνο settings sidebar & app header CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Settings Sidebar Basic Styles
 */
export const SETTINGS_SIDEBAR_BASIC_STYLES = {
  'settings-sidebar-heading': {
    color: 'var(--layera-sidebar-text)',
    borderBottom: '1px solid var(--layera-color-border)',
    paddingBottom: 'var(--layera-space-2)',
    margin: '0'
  },
  'settings-sidebar-select': {
    padding: 'var(--layera-space-3)',
    border: 'none',
    borderRadius: 'var(--live-border-radius)',
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    width: '100%',
    fontSize: 'var(--layera-font-size-sm)'
  }
};

/**
 * Settings Sidebar Buttons Styles
 */
export const SETTINGS_SIDEBAR_BUTTONS_STYLES = {
  'settings-sidebar-button-light': {
    border: 'none',
    color: 'var(--layera-sidebar-text)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'var(--layera-sidebar-menu-item-bg)'
  },
  'settings-sidebar-button-dark': {
    border: 'none',
    color: 'var(--layera-sidebar-text)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'var(--layera-sidebar-menu-item-bg)'
  },
  'settings-sidebar-button-light.active': {
    background: 'var(--live-primary-color)'
  },
  'settings-sidebar-button-dark.active': {
    background: 'var(--live-primary-color)'
  }
};

/**
 * Settings Sidebar Controls Styles
 */
export const SETTINGS_SIDEBAR_CONTROLS_STYLES = {
  'settings-sidebar-checkbox': {
    margin: '0',
    accentColor: 'var(--live-primary-color)'
  },
  'settings-sidebar-lock-button': {
    background: 'var(--live-danger-color)',
    border: 'none',
    marginTop: 'var(--layera-space-4)',
    color: 'white',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  }
};

/**
 * App Header Basic Styles
 */
export const APP_HEADER_BASIC_STYLES = {
  'app-header-container': {
    background: 'var(--live-primary-color)',
    color: 'white',
    minHeight: 'auto'
  },
  'app-header-title': {
    color: 'white',
    margin: '0',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  }
};

/**
 * App Header Button Styles
 */
export const APP_HEADER_BUTTON_STYLES = {
  'app-header-color-button': {
    minWidth: '24px',
    color: 'white',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'app-header-color-button.active': {
    border: '2px solid white'
  },
  'app-header-color-button:not(.active)': {
    border: '1px solid rgba(255,255,255,0.3)'
  },
  'app-header-toggle-button': {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'app-header-profile-button': {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer'
  }
};

/**
 * App Header Input Styles
 */
export const APP_HEADER_INPUT_STYLES = {
  'app-header-search-input': {
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--live-border-radius)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    color: 'var(--layera-color-text)'
  }
};

/**
 * SettingsBuilder Class - Enterprise Settings & App Header CSS Generation
 */
export class SettingsBuilder {
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
   * Generates CSS από settings class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateSettingsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Settings Sidebar Basic CSS
   * @returns {string} - Settings sidebar basic CSS
   */
  static generateSettingsSidebarBasicCSS() {
    let css = '/* SETTINGS SIDEBAR BASIC STYLES */\n';
    css += this.generateSettingsCSS(SETTINGS_SIDEBAR_BASIC_STYLES);
    return css;
  }

  /**
   * Generates Settings Sidebar Buttons CSS
   * @returns {string} - Settings sidebar buttons CSS
   */
  static generateSettingsSidebarButtonsCSS() {
    let css = '/* SETTINGS SIDEBAR BUTTONS STYLES */\n';
    css += this.generateSettingsCSS(SETTINGS_SIDEBAR_BUTTONS_STYLES);
    return css;
  }

  /**
   * Generates Settings Sidebar Controls CSS
   * @returns {string} - Settings sidebar controls CSS
   */
  static generateSettingsSidebarControlsCSS() {
    let css = '/* SETTINGS SIDEBAR CONTROLS STYLES */\n';
    css += this.generateSettingsCSS(SETTINGS_SIDEBAR_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates App Header Basic CSS
   * @returns {string} - App header basic CSS
   */
  static generateAppHeaderBasicCSS() {
    let css = '/* APP HEADER BASIC STYLES */\n';
    css += this.generateSettingsCSS(APP_HEADER_BASIC_STYLES);
    return css;
  }

  /**
   * Generates App Header Buttons CSS
   * @returns {string} - App header buttons CSS
   */
  static generateAppHeaderButtonsCSS() {
    let css = '/* APP HEADER BUTTONS STYLES */\n';
    css += this.generateSettingsCSS(APP_HEADER_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates App Header Input CSS
   * @returns {string} - App header input CSS
   */
  static generateAppHeaderInputCSS() {
    let css = '/* APP HEADER INPUT STYLES */\n';
    css += this.generateSettingsCSS(APP_HEADER_INPUT_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Settings & App Header CSS classes
   * @returns {string} - Complete settings CSS
   */
  static generateAllSettingsCSS() {
    let css = '/* === SETTINGS & APP HEADER CLASSES === */\n\n';

    css += this.generateSettingsSidebarBasicCSS();
    css += this.generateSettingsSidebarButtonsCSS();
    css += this.generateSettingsSidebarControlsCSS();
    css += this.generateAppHeaderBasicCSS();
    css += this.generateAppHeaderButtonsCSS();
    css += this.generateAppHeaderInputCSS();

    return css;
  }

  /**
   * Gets όλες τις available settings classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllSettingsClasses() {
    return {
      ...SETTINGS_SIDEBAR_BASIC_STYLES,
      ...SETTINGS_SIDEBAR_BUTTONS_STYLES,
      ...SETTINGS_SIDEBAR_CONTROLS_STYLES,
      ...APP_HEADER_BASIC_STYLES,
      ...APP_HEADER_BUTTON_STYLES,
      ...APP_HEADER_INPUT_STYLES
    };
  }

  /**
   * Gets specific settings category
   * @param {string} category - Category (sidebarBasic, sidebarButtons, sidebarControls, headerBasic, headerButtons, headerInput)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getSettingsCategory(category) {
    const categories = {
      sidebarBasic: SETTINGS_SIDEBAR_BASIC_STYLES,
      sidebarButtons: SETTINGS_SIDEBAR_BUTTONS_STYLES,
      sidebarControls: SETTINGS_SIDEBAR_CONTROLS_STYLES,
      headerBasic: APP_HEADER_BASIC_STYLES,
      headerButtons: APP_HEADER_BUTTON_STYLES,
      headerInput: APP_HEADER_INPUT_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι settings classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSettingsClasses() {
    try {
      const allClasses = this.getAllSettingsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid settings class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for settings class: ${className}`);
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
      console.error('Settings classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets settings classes by component type
   * @param {string} component - Component type (sidebar, header, controls, buttons, inputs)
   * @returns {string[]} - Array με class names
   */
  static getSettingsClassesByComponent(component) {
    const componentMap = {
      sidebar: ['sidebarBasic', 'sidebarButtons', 'sidebarControls'],
      header: ['headerBasic', 'headerButtons', 'headerInput'],
      controls: ['sidebarControls'],
      buttons: ['sidebarButtons', 'headerButtons'],
      inputs: ['headerInput']
    };

    const categories = componentMap[component] || [];
    const settingsClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getSettingsCategory(category);
      if (categoryClasses) {
        settingsClasses.push(...Object.keys(categoryClasses));
      }
    });

    return settingsClasses;
  }
}

export default SettingsBuilder;