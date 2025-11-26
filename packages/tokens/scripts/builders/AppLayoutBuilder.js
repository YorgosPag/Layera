/**
 * AppLayoutBuilder.js - Enterprise App Layout Builder Module
 *
 * Single Responsibility: Μόνο app layout CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Full App Layout Core Styles
 */
export const APP_LAYOUT_CORE_STYLES = {
  'layera-app-layout': {
    display: 'flex',
    height: 'calc(100vh - var(--layera-header-height))',
    marginTop: 'var(--layera-header-height)'
  }
};

/**
 * Secondary Sidebars Layout Styles
 */
export const SECONDARY_SIDEBARS_LAYOUT_STYLES = {
  'layera-sidebar-secondary': {
    width: '0',
    backgroundColor: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    padding: '0',
    flexShrink: '0',
    order: '1'
  },
  'layera-sidebar-secondary--open': {
    width: 'var(--layera-sidebar-width)',
    padding: 'var(--layera-space-4)'
  },
  'layera-sidebar-secondary--right': {
    order: '3'
  }
};

/**
 * Main Content Layout Styles
 */
export const MAIN_CONTENT_LAYOUT_STYLES = {
  'layera-main-content': {
    flex: '1',
    padding: 'var(--layera-space-4)',
    backgroundColor: 'white',
    overflowY: 'auto',
    order: '2'
  }
};

/**
 * Tabs System Layout Styles
 */
export const TABS_SYSTEM_LAYOUT_STYLES = {
  'layera-tabs': {
    display: 'flex',
    gap: '0',
    marginBottom: 'var(--layera-space-4)',
    overflowX: 'auto'
  },
  'layera-tab': {
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    backgroundColor: 'var(--layera-sidebar-title)',
    color: 'var(--layera-sidebar-bg)',
    borderRadius: 'var(--layera-radius-sm) var(--layera-radius-sm) 0 0',
    fontWeight: 'var(--layera-font-weight-medium)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-tab--active': {
    backgroundColor: 'white',
    fontWeight: 'var(--layera-font-weight-semibold)'
  }
};

/**
 * Tab Color Variants Styles
 */
export const TAB_COLOR_VARIANTS_STYLES = {
  'layera-tab--primary--active': {
    borderBottom: '3px solid var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-tab--secondary--active': {
    borderBottom: '3px solid var(--layera-color-secondary)',
    color: 'var(--layera-color-secondary)'
  },
  'layera-tab--success--active': {
    borderBottom: '3px solid var(--layera-color-success)',
    color: 'var(--layera-color-success)'
  },
  'layera-tab--warning--active': {
    borderBottom: '3px solid var(--layera-color-warning)',
    color: 'var(--layera-color-warning)'
  },
  'layera-tab--danger--active': {
    borderBottom: '3px solid var(--layera-color-danger)',
    color: 'var(--layera-color-danger)'
  },
  'layera-tab--info--active': {
    borderBottom: '3px solid var(--layera-color-info)',
    color: 'var(--layera-color-info)'
  }
};

/**
 * Tab Panel Styles
 */
export const TAB_PANEL_STYLES = {
  'layera-tab-panel': {
    backgroundColor: 'white',
    borderRadius: '0 var(--layera-radius-sm) var(--layera-radius-sm) var(--layera-radius-sm)',
    padding: 'var(--layera-space-4)',
    boxShadow: 'var(--layera-shadow-header)'
  }
};

/**
 * AppLayoutBuilder Class - Enterprise App Layout CSS Generation
 */
export class AppLayoutBuilder {
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
   * Generates CSS από app layout class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateAppLayoutCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates App Layout Core CSS
   * @returns {string} - App layout core CSS
   */
  static generateAppLayoutCoreCSS() {
    let css = '/* APP LAYOUT CORE STYLES */\n';
    css += this.generateAppLayoutCSS(APP_LAYOUT_CORE_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebars Layout CSS
   * @returns {string} - Secondary sidebars layout CSS
   */
  static generateSecondarySidebarsLayoutCSS() {
    let css = '/* SECONDARY SIDEBARS LAYOUT STYLES */\n';
    css += this.generateAppLayoutCSS(SECONDARY_SIDEBARS_LAYOUT_STYLES);
    return css;
  }

  /**
   * Generates Main Content Layout CSS
   * @returns {string} - Main content layout CSS
   */
  static generateMainContentLayoutCSS() {
    let css = '/* MAIN CONTENT LAYOUT STYLES */\n';
    css += this.generateAppLayoutCSS(MAIN_CONTENT_LAYOUT_STYLES);
    return css;
  }

  /**
   * Generates Tabs System Layout CSS
   * @returns {string} - Tabs system layout CSS
   */
  static generateTabsSystemLayoutCSS() {
    let css = '/* TABS SYSTEM LAYOUT STYLES */\n';
    css += this.generateAppLayoutCSS(TABS_SYSTEM_LAYOUT_STYLES);
    return css;
  }

  /**
   * Generates Tab Color Variants CSS
   * @returns {string} - Tab color variants CSS
   */
  static generateTabColorVariantsCSS() {
    let css = '/* TAB COLOR VARIANTS STYLES */\n';
    css += this.generateAppLayoutCSS(TAB_COLOR_VARIANTS_STYLES);
    return css;
  }

  /**
   * Generates Tab Panel CSS
   * @returns {string} - Tab panel CSS
   */
  static generateTabPanelCSS() {
    let css = '/* TAB PANEL STYLES */\n';
    css += this.generateAppLayoutCSS(TAB_PANEL_STYLES);
    return css;
  }

  /**
   * Generates όλες τις App Layout CSS classes
   * @returns {string} - Complete app layout CSS
   */
  static generateAllAppLayoutCSS() {
    let css = '/* === APP LAYOUT CLASSES === */\n\n';

    css += this.generateAppLayoutCoreCSS();
    css += this.generateSecondarySidebarsLayoutCSS();
    css += this.generateMainContentLayoutCSS();
    css += this.generateTabsSystemLayoutCSS();
    css += this.generateTabColorVariantsCSS();
    css += this.generateTabPanelCSS();

    return css;
  }

  /**
   * Gets όλες τις available app layout classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllAppLayoutClasses() {
    return {
      ...APP_LAYOUT_CORE_STYLES,
      ...SECONDARY_SIDEBARS_LAYOUT_STYLES,
      ...MAIN_CONTENT_LAYOUT_STYLES,
      ...TABS_SYSTEM_LAYOUT_STYLES,
      ...TAB_COLOR_VARIANTS_STYLES,
      ...TAB_PANEL_STYLES
    };
  }

  /**
   * Gets specific app layout category
   * @param {string} category - Category (core, secondarySidebars, mainContent, tabsSystem, tabColorVariants, tabPanel)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getAppLayoutCategory(category) {
    const categories = {
      core: APP_LAYOUT_CORE_STYLES,
      secondarySidebars: SECONDARY_SIDEBARS_LAYOUT_STYLES,
      mainContent: MAIN_CONTENT_LAYOUT_STYLES,
      tabsSystem: TABS_SYSTEM_LAYOUT_STYLES,
      tabColorVariants: TAB_COLOR_VARIANTS_STYLES,
      tabPanel: TAB_PANEL_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι app layout classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateAppLayoutClasses() {
    try {
      const allClasses = this.getAllAppLayoutClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid app layout class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for app layout class: ${className}`);
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
      console.error('App layout classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets app layout classes by component type
   * @param {string} component - Component type (structure, navigation, content, interaction)
   * @returns {string[]} - Array με class names
   */
  static getAppLayoutClassesByComponent(component) {
    const componentMap = {
      structure: ['core', 'secondarySidebars', 'mainContent'],
      navigation: ['tabsSystem', 'tabColorVariants'],
      content: ['tabPanel'],
      interaction: ['tabsSystem', 'tabColorVariants']
    };

    const categories = componentMap[component] || [];
    const appLayoutClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getAppLayoutCategory(category);
      if (categoryClasses) {
        appLayoutClasses.push(...Object.keys(categoryClasses));
      }
    });

    return appLayoutClasses;
  }
}

export default AppLayoutBuilder;