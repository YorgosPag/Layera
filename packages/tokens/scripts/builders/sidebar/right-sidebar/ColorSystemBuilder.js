/**
 * ColorSystemBuilder.js - Right Sidebar 6-Color System Builder
 *
 * Single Responsibility: Μόνο 6-color system controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/6-color-system.html
 */

/**
 * Color System Base Styles
 */
export const COLOR_SYSTEM_BASE_STYLES = {
  'layera-6color-system': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-6color-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Color Picker Grid Styles
 */
export const COLOR_PICKER_GRID_STYLES = {
  'layera-color-picker-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-color-picker-item': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--layera-space-1)'
  },
  'layera-color-picker-button': {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-color-picker-button:hover': {
    borderColor: 'var(--layera-color-border)',
    transform: 'scale(1.05)'
  },
  'layera-color-picker-button--active': {
    borderColor: 'var(--layera-color-active-border)',
    borderWidth: '3px'
  }
};

/**
 * Color Labels και Text Styles
 */
export const COLOR_LABELS_STYLES = {
  'layera-color-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    textAlign: 'center',
    opacity: '0.8'
  },
  'layera-6color-description': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    lineHeight: '1.4',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Color Variable Display Styles
 */
export const COLOR_VARIABLE_DISPLAY_STYLES = {
  'layera-color-vars-display': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-color-var-item': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--layera-space-1) 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  'layera-color-var-item:last-child': {
    borderBottom: 'none'
  }
};

/**
 * ColorSystemBuilder Class - Enterprise 6-Color System CSS Generation
 */
export class ColorSystemBuilder {
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
   * Generates CSS από color system class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateColorSystemCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Color System Base CSS
   * @returns {string} - Color system base CSS
   */
  static generateColorSystemBaseCSS() {
    let css = '/* COLOR SYSTEM BASE STYLES */\n';
    css += this.generateColorSystemCSS(COLOR_SYSTEM_BASE_STYLES);
    return css;
  }

  /**
   * Generates Color Picker Grid CSS
   * @returns {string} - Color picker grid CSS
   */
  static generateColorPickerGridCSS() {
    let css = '/* COLOR PICKER GRID STYLES */\n';
    css += this.generateColorSystemCSS(COLOR_PICKER_GRID_STYLES);
    return css;
  }

  /**
   * Generates Color Labels CSS
   * @returns {string} - Color labels CSS
   */
  static generateColorLabelsCSS() {
    let css = '/* COLOR LABELS STYLES */\n';
    css += this.generateColorSystemCSS(COLOR_LABELS_STYLES);
    return css;
  }

  /**
   * Generates Color Variable Display CSS
   * @returns {string} - Color variable display CSS
   */
  static generateColorVariableDisplayCSS() {
    let css = '/* COLOR VARIABLE DISPLAY STYLES */\n';
    css += this.generateColorSystemCSS(COLOR_VARIABLE_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Color System CSS classes
   * @returns {string} - Complete color system CSS
   */
  static generateAllColorSystemCSS() {
    let css = '/* === RIGHT SIDEBAR: 6-COLOR SYSTEM === */\n\n';

    css += this.generateColorSystemBaseCSS();
    css += this.generateColorPickerGridCSS();
    css += this.generateColorLabelsCSS();
    css += this.generateColorVariableDisplayCSS();

    return css;
  }

  /**
   * Gets όλες τις available color system classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllColorSystemClasses() {
    return {
      ...COLOR_SYSTEM_BASE_STYLES,
      ...COLOR_PICKER_GRID_STYLES,
      ...COLOR_LABELS_STYLES,
      ...COLOR_VARIABLE_DISPLAY_STYLES
    };
  }

  /**
   * Gets specific color system category
   * @param {string} category - Category (base, pickerGrid, labels, variableDisplay)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getColorSystemCategory(category) {
    const categories = {
      base: COLOR_SYSTEM_BASE_STYLES,
      pickerGrid: COLOR_PICKER_GRID_STYLES,
      labels: COLOR_LABELS_STYLES,
      variableDisplay: COLOR_VARIABLE_DISPLAY_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι color system classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateColorSystemClasses() {
    try {
      const allClasses = this.getAllColorSystemClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid color system class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for color system class: ${className}`);
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
      console.error('Color system classes validation failed:', error.message);
      return false;
    }
  }
}

export default ColorSystemBuilder;