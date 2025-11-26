/**
 * SecondarySidebarBuilder.js - Enterprise Secondary Sidebar Builder Module
 *
 * Single Responsibility: Μόνο secondary sidebar CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Secondary Sidebar Core Styles
 */
export const SECONDARY_SIDEBAR_CORE_STYLES = {
  'secondary-sidebar-left': {
    flex: '0 0 auto',
    width: '0',
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    padding: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    borderLeft: '1px solid var(--layera-sidebar-menu-item-bg)',
    borderRight: '1px solid var(--layera-sidebar-menu-item-bg)',
    boxSizing: 'border-box',
    height: 'calc(100vh - var(--layera-header-height))',
    position: 'relative',
    contain: 'layout style',
    order: '1'
  },
  'secondary-sidebar-left.open': {
    width: '280px',
    padding: 'var(--layera-space-4)',
    overflowY: 'auto',
    overflowX: 'hidden'
  }
};

/**
 * Secondary Sidebar Right Styles
 */
export const SECONDARY_SIDEBAR_RIGHT_STYLES = {
  'secondary-sidebar-right': {
    flex: '0 0 auto',
    background: 'var(--layera-sidebar-bg)',
    color: 'var(--layera-sidebar-text)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    borderLeft: '1px solid var(--layera-sidebar-menu-item-bg)',
    height: '100%',
    position: 'relative',
    contain: 'layout style'
  }
};

/**
 * Sidebar Secondary Base Styles
 */
export const SIDEBAR_SECONDARY_BASE_STYLES = {
  'sidebar-secondary': {
    width: '0',
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    padding: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    borderLeft: '1px solid var(--layera-sidebar-menu-item-bg)',
    boxSizing: 'border-box',
    height: 'calc(100vh - var(--layera-header-height))'
  },
  'sidebar-secondary.open': {
    width: 'var(--layera-sidebar-width)',
    padding: 'var(--layera-space-4)',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  'sidebar-secondary.left': {
    borderLeft: '1px solid var(--layera-sidebar-menu-item-bg)',
    borderRight: '1px solid var(--layera-sidebar-menu-item-bg)',
    order: '1'
  }
};

/**
 * Sidebar Secondary Scrollbar Styles
 */
export const SIDEBAR_SECONDARY_SCROLLBAR_STYLES = {
  'sidebar-secondary::-webkit-scrollbar': {
    width: 'var(--layera-space-2)'
  },
  'sidebar-secondary::-webkit-scrollbar-track': {
    background: 'var(--layera-sidebar-bg)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'sidebar-secondary::-webkit-scrollbar-thumb': {
    background: 'var(--layera-sidebar-menu-item-bg)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-sidebar-menu-item-bg)'
  },
  'sidebar-secondary::-webkit-scrollbar-thumb:hover': {
    background: 'var(--layera-sidebar-menu-item-hover)'
  }
};

/**
 * Sidebar Secondary Typography Styles
 */
export const SIDEBAR_SECONDARY_TYPOGRAPHY_STYLES = {
  'sidebar-secondary h3': {
    marginTop: '0',
    marginBottom: 'var(--layera-space-4)',
    color: 'var(--layera-sidebar-title)',
    fontSize: 'var(--layera-font-size-base)',
    borderBottom: '1px solid var(--layera-sidebar-menu-item-bg)',
    paddingBottom: 'var(--layera-space-2)',
    fontFamily: 'Arial, sans-serif'
  }
};

/**
 * Secondary Sidebar Setting Groups
 */
export const SECONDARY_SIDEBAR_SETTING_STYLES = {
  'setting-group': {
    marginBottom: 'var(--layera-space-4)'
  },
  'secondary-sidebar-setting-group': {
    marginBottom: 'var(--layera-space-4)'
  }
};

/**
 * Secondary Sidebar Labels
 */
export const SECONDARY_SIDEBAR_LABEL_STYLES = {
  'secondary-sidebar-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-title)'
  }
};

/**
 * Secondary Sidebar Select Controls
 */
export const SECONDARY_SIDEBAR_SELECT_STYLES = {
  'secondary-sidebar-select': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-sidebar-input-bg)',
    color: 'var(--layera-sidebar-text)'
  }
};

/**
 * Secondary Sidebar Button Groups
 */
export const SECONDARY_SIDEBAR_BUTTON_GROUP_STYLES = {
  'secondary-sidebar-button-group': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  }
};

/**
 * Secondary Sidebar Buttons
 */
export const SECONDARY_SIDEBAR_BUTTON_STYLES = {
  'secondary-sidebar-button': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  },
  'secondary-sidebar-button:hover': {
    opacity: '0.8'
  },
  'secondary-sidebar-button--light': {
    background: 'var(--layera-color-primary)',
    color: 'var(--layera-sidebar-text)'
  },
  'secondary-sidebar-button--dark': {
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)'
  }
};

/**
 * Secondary Sidebar Checkbox Controls
 */
export const SECONDARY_SIDEBAR_CHECKBOX_STYLES = {
  'secondary-sidebar-checkbox-group': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'secondary-sidebar-checkbox': {
    margin: '0'
  },
  'secondary-sidebar-checkbox-label': {
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0'
  }
};

/**
 * Secondary Sidebar Full Width Buttons
 */
export const SECONDARY_SIDEBAR_FULL_WIDTH_STYLES = {
  'secondary-sidebar-full-width-button': {
    width: '100%',
    marginTop: 'var(--layera-space-4)'
  },
  'danger-btn': {
    background: 'var(--layera-color-danger)',
    color: 'var(--layera-sidebar-text)'
  }
};

/**
 * SecondarySidebarBuilder Class - Enterprise Secondary Sidebar CSS Generation
 */
export class SecondarySidebarBuilder {
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
   * Generates CSS από secondary sidebar class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateSecondarySidebarCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Secondary Sidebar Core CSS
   * @returns {string} - Core secondary sidebar CSS
   */
  static generateSecondarySidebarCoreCSS() {
    let css = '/* SECONDARY SIDEBAR CORE STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_CORE_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Right CSS
   * @returns {string} - Right secondary sidebar CSS
   */
  static generateSecondarySidebarRightCSS() {
    let css = '/* SECONDARY SIDEBAR RIGHT STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_RIGHT_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Secondary Base CSS
   * @returns {string} - Sidebar secondary base CSS
   */
  static generateSidebarSecondaryBaseCSS() {
    let css = '/* SIDEBAR SECONDARY BASE STYLES */\n';
    css += this.generateSecondarySidebarCSS(SIDEBAR_SECONDARY_BASE_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Secondary Scrollbar CSS
   * @returns {string} - Scrollbar CSS
   */
  static generateSidebarSecondaryScrollbarCSS() {
    let css = '/* SIDEBAR SECONDARY SCROLLBAR STYLES */\n';
    css += this.generateSecondarySidebarCSS(SIDEBAR_SECONDARY_SCROLLBAR_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Secondary Typography CSS
   * @returns {string} - Typography CSS
   */
  static generateSidebarSecondaryTypographyCSS() {
    let css = '/* SIDEBAR SECONDARY TYPOGRAPHY STYLES */\n';
    css += this.generateSecondarySidebarCSS(SIDEBAR_SECONDARY_TYPOGRAPHY_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Setting CSS
   * @returns {string} - Setting groups CSS
   */
  static generateSecondarySidebarSettingCSS() {
    let css = '/* SECONDARY SIDEBAR SETTING STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_SETTING_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Label CSS
   * @returns {string} - Label CSS
   */
  static generateSecondarySidebarLabelCSS() {
    let css = '/* SECONDARY SIDEBAR LABEL STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_LABEL_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Select CSS
   * @returns {string} - Select CSS
   */
  static generateSecondarySidebarSelectCSS() {
    let css = '/* SECONDARY SIDEBAR SELECT STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_SELECT_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Button Group CSS
   * @returns {string} - Button group CSS
   */
  static generateSecondarySidebarButtonGroupCSS() {
    let css = '/* SECONDARY SIDEBAR BUTTON GROUP STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_BUTTON_GROUP_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Button CSS
   * @returns {string} - Button CSS
   */
  static generateSecondarySidebarButtonCSS() {
    let css = '/* SECONDARY SIDEBAR BUTTON STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Checkbox CSS
   * @returns {string} - Checkbox CSS
   */
  static generateSecondarySidebarCheckboxCSS() {
    let css = '/* SECONDARY SIDEBAR CHECKBOX STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_CHECKBOX_STYLES);
    return css;
  }

  /**
   * Generates Secondary Sidebar Full Width CSS
   * @returns {string} - Full width CSS
   */
  static generateSecondarySidebarFullWidthCSS() {
    let css = '/* SECONDARY SIDEBAR FULL WIDTH STYLES */\n';
    css += this.generateSecondarySidebarCSS(SECONDARY_SIDEBAR_FULL_WIDTH_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Secondary Sidebar CSS classes
   * @returns {string} - Complete secondary sidebar CSS
   */
  static generateAllSecondarySidebarCSS() {
    let css = '/* === SECONDARY SIDEBAR CLASSES === */\n\n';

    css += this.generateSecondarySidebarCoreCSS();
    css += this.generateSecondarySidebarRightCSS();
    css += this.generateSidebarSecondaryBaseCSS();
    css += this.generateSidebarSecondaryScrollbarCSS();
    css += this.generateSidebarSecondaryTypographyCSS();
    css += this.generateSecondarySidebarSettingCSS();
    css += this.generateSecondarySidebarLabelCSS();
    css += this.generateSecondarySidebarSelectCSS();
    css += this.generateSecondarySidebarButtonGroupCSS();
    css += this.generateSecondarySidebarButtonCSS();
    css += this.generateSecondarySidebarCheckboxCSS();
    css += this.generateSecondarySidebarFullWidthCSS();

    return css;
  }

  /**
   * Gets όλες τις available secondary sidebar classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllSecondarySidebarClasses() {
    return {
      ...SECONDARY_SIDEBAR_CORE_STYLES,
      ...SECONDARY_SIDEBAR_RIGHT_STYLES,
      ...SIDEBAR_SECONDARY_BASE_STYLES,
      ...SIDEBAR_SECONDARY_SCROLLBAR_STYLES,
      ...SIDEBAR_SECONDARY_TYPOGRAPHY_STYLES,
      ...SECONDARY_SIDEBAR_SETTING_STYLES,
      ...SECONDARY_SIDEBAR_LABEL_STYLES,
      ...SECONDARY_SIDEBAR_SELECT_STYLES,
      ...SECONDARY_SIDEBAR_BUTTON_GROUP_STYLES,
      ...SECONDARY_SIDEBAR_BUTTON_STYLES,
      ...SECONDARY_SIDEBAR_CHECKBOX_STYLES,
      ...SECONDARY_SIDEBAR_FULL_WIDTH_STYLES
    };
  }

  /**
   * Gets specific secondary sidebar category
   * @param {string} category - Category (core, right, base, scrollbar, typography, setting, label, select, buttonGroup, button, checkbox, fullWidth)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getSecondarySidebarCategory(category) {
    const categories = {
      core: SECONDARY_SIDEBAR_CORE_STYLES,
      right: SECONDARY_SIDEBAR_RIGHT_STYLES,
      base: SIDEBAR_SECONDARY_BASE_STYLES,
      scrollbar: SIDEBAR_SECONDARY_SCROLLBAR_STYLES,
      typography: SIDEBAR_SECONDARY_TYPOGRAPHY_STYLES,
      setting: SECONDARY_SIDEBAR_SETTING_STYLES,
      label: SECONDARY_SIDEBAR_LABEL_STYLES,
      select: SECONDARY_SIDEBAR_SELECT_STYLES,
      buttonGroup: SECONDARY_SIDEBAR_BUTTON_GROUP_STYLES,
      button: SECONDARY_SIDEBAR_BUTTON_STYLES,
      checkbox: SECONDARY_SIDEBAR_CHECKBOX_STYLES,
      fullWidth: SECONDARY_SIDEBAR_FULL_WIDTH_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι secondary sidebar classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSecondarySidebarClasses() {
    try {
      const allClasses = this.getAllSecondarySidebarClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid secondary sidebar class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for secondary sidebar class: ${className}`);
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
      console.error('Secondary sidebar classes validation failed:', error.message);
      return false;
    }
  }

  /**
   * Gets secondary sidebar classes by component type
   * @param {string} component - Component type (layout, interaction, styling, controls)
   * @returns {string[]} - Array με class names
   */
  static getSecondarySidebarClassesByComponent(component) {
    const componentMap = {
      layout: ['core', 'right', 'base'],
      interaction: ['button', 'checkbox', 'select'],
      styling: ['scrollbar', 'typography'],
      controls: ['setting', 'label', 'buttonGroup', 'fullWidth']
    };

    const categories = componentMap[component] || [];
    const secondarySidebarClasses = [];

    categories.forEach(category => {
      const categoryClasses = this.getSecondarySidebarCategory(category);
      if (categoryClasses) {
        secondarySidebarClasses.push(...Object.keys(categoryClasses));
      }
    });

    return secondarySidebarClasses;
  }
}

export default SecondarySidebarBuilder;