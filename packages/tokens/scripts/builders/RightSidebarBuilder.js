/**
 * RightSidebarBuilder.js - Enterprise Right Sidebar Builder Module
 *
 * Single Responsibility: Μόνο right sidebar controls CSS generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Right Sidebar Control Group Styles
 */
export const RIGHT_SIDEBAR_CONTROL_STYLES = {
  'layera-control-group': {
    marginBottom: 'var(--layera-space-6)',
    borderBottom: '1px solid var(--layera-color-border)',
    paddingBottom: 'var(--layera-space-4)'
  },
  'layera-control-group:last-child': {
    borderBottom: 'none',
    marginBottom: '0'
  },
  'layera-control-group-title': {
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)'
  }
};

/**
 * Color Control Styles
 */
export const COLOR_CONTROL_STYLES = {
  'layera-color-control': {
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-color-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-1)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)'
  },
  'layera-color-input-group': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-color-picker': {
    width: '40px',
    height: '32px',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    cursor: 'pointer',
    background: 'transparent'
  },
  'layera-color-hex-input': {
    flex: '1',
    padding: 'var(--layera-space-1)',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'var(--layera-sidebar-menu-item-bg)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    outline: 'none'
  }
};

/**
 * Range Control Styles
 */
export const RANGE_CONTROL_STYLES = {
  'layera-range-control': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-range-input-group': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-range-value': {
    minWidth: '35px',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)'
  }
};

/**
 * Preset Themes Styles
 */
export const PRESET_THEMES_STYLES = {
  'layera-preset-column': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-2)'
  },
  'layera-preset-ocean': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-xs)',
    transition: 'all 0.2s ease'
  },
  'layera-preset-sunset': {
    background: 'var(--layera-color-warning)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-xs)',
    transition: 'all 0.2s ease'
  },
  'layera-preset-forest': {
    background: 'var(--layera-color-success)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-xs)',
    transition: 'all 0.2s ease'
  }
};

/**
 * Right Sidebar Scrolling Styles
 */
export const RIGHT_SIDEBAR_SCROLLING_STYLES = {
  'layera-settings-sidebar': {
    width: '280px',
    background: '#34495e',
    color: 'white',
    height: '100vh',
    order: '1',
    overflowY: 'auto',
    padding: 'var(--layera-space-4)',
    borderLeft: '1px solid var(--layera-color-border)'
  },
  'layera-settings-sidebar::-webkit-scrollbar': {
    width: '8px'
  },
  'layera-settings-sidebar::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '4px'
  },
  'layera-settings-sidebar::-webkit-scrollbar-thumb': {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '4px'
  },
  'layera-settings-sidebar::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255,255,255,0.3)'
  }
};

/**
 * RightSidebarBuilder Class - Enterprise Right Sidebar CSS Generation
 */
export class RightSidebarBuilder {
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
   * Generates CSS από right sidebar class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateRightSidebarCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Control Group CSS
   * @returns {string} - Control group CSS
   */
  static generateControlGroupCSS() {
    let css = '/* RIGHT SIDEBAR CONTROL GROUP STYLES */\n';
    css += this.generateRightSidebarCSS(RIGHT_SIDEBAR_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Color Control CSS
   * @returns {string} - Color control CSS
   */
  static generateColorControlCSS() {
    let css = '/* COLOR CONTROL STYLES */\n';
    css += this.generateRightSidebarCSS(COLOR_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Range Control CSS
   * @returns {string} - Range control CSS
   */
  static generateRangeControlCSS() {
    let css = '/* RANGE CONTROL STYLES */\n';
    css += this.generateRightSidebarCSS(RANGE_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Preset Themes CSS
   * @returns {string} - Preset themes CSS
   */
  static generatePresetThemesCSS() {
    let css = '/* PRESET THEMES STYLES */\n';
    css += this.generateRightSidebarCSS(PRESET_THEMES_STYLES);
    return css;
  }

  /**
   * Generates Scrolling CSS
   * @returns {string} - Scrolling CSS
   */
  static generateScrollingCSS() {
    let css = '/* RIGHT SIDEBAR SCROLLING STYLES */\n';
    css += this.generateRightSidebarCSS(RIGHT_SIDEBAR_SCROLLING_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Right Sidebar CSS classes
   * @returns {string} - Complete right sidebar CSS
   */
  static generateAllRightSidebarCSS() {
    let css = '/* === RIGHT SIDEBAR CLASSES === */\n\n';

    css += this.generateControlGroupCSS();
    css += this.generateColorControlCSS();
    css += this.generateRangeControlCSS();
    css += this.generatePresetThemesCSS();
    css += this.generateScrollingCSS();

    return css;
  }

  /**
   * Gets όλες τις available right sidebar classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllRightSidebarClasses() {
    return {
      ...RIGHT_SIDEBAR_CONTROL_STYLES,
      ...COLOR_CONTROL_STYLES,
      ...RANGE_CONTROL_STYLES,
      ...PRESET_THEMES_STYLES,
      ...RIGHT_SIDEBAR_SCROLLING_STYLES
    };
  }

  /**
   * Gets specific right sidebar category
   * @param {string} category - Category (controls, colors, ranges, presets, scrolling)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getRightSidebarCategory(category) {
    const categories = {
      controls: RIGHT_SIDEBAR_CONTROL_STYLES,
      colors: COLOR_CONTROL_STYLES,
      ranges: RANGE_CONTROL_STYLES,
      presets: PRESET_THEMES_STYLES,
      scrolling: RIGHT_SIDEBAR_SCROLLING_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι right sidebar classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateRightSidebarClasses() {
    try {
      const allClasses = this.getAllRightSidebarClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid right sidebar class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for right sidebar class: ${className}`);
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
      console.error('Right sidebar classes validation failed:', error.message);
      return false;
    }
  }
}

export default RightSidebarBuilder;