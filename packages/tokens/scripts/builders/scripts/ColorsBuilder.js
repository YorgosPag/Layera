/**
 * ColorsBuilder.js - 6-Color System JavaScript Support Builder
 *
 * Single Responsibility: Μόνο 6-Color System JavaScript functionality CSS support
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/scripts/colors.html
 */

/**
 * Target Component Selection Styles
 */
export const TARGET_COMPONENT_SELECTION_STYLES = {
  'layera-target-btn': {
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'transparent',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px'
  },
  'layera-target-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)10',
    transform: 'translateY(-1px)'
  },
  'layera-target-btn--active': {
    background: 'var(--layera-color-primary)',
    borderColor: 'var(--layera-color-primary)',
    color: 'white',
    boxShadow: '0 2px 8px var(--layera-color-primary)40'
  },
  'layera-target-selection-container': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-2)',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: 'var(--layera-radius-sm)'
  }
};

/**
 * Color Picker Controls Styles
 */
export const COLOR_PICKER_CONTROLS_STYLES = {
  'layera-color-control-group': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-3)',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white'
  },
  'layera-color-picker': {
    width: '40px',
    height: '30px',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    appearance: 'none',
    background: 'transparent'
  },
  'layera-color-picker::-webkit-color-swatch': {
    border: 'none',
    borderRadius: 'calc(var(--layera-radius-sm) - 2px)'
  },
  'layera-color-input': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontFamily: 'monospace',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-color-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-color-label': {
    minWidth: '80px',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-sidebar-text)'
  }
};

/**
 * Color Application Preview Styles
 */
export const COLOR_APPLICATION_PREVIEW_STYLES = {
  'layera-color-preview-container': {
    padding: 'var(--layera-space-4)',
    border: '1px dashed var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    marginTop: 'var(--layera-space-4)',
    background: 'rgba(0,0,0,0.02)'
  },
  'layera-color-preview-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)',
    textAlign: 'center'
  },
  'layera-color-preview-elements': {
    display: 'flex',
    gap: 'var(--layera-space-3)',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  'layera-color-preview-card': {
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '2px solid transparent',
    background: 'white',
    transition: 'all 0.3s ease',
    minWidth: '100px',
    textAlign: 'center'
  },
  'layera-color-preview-button': {
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid transparent',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-color-primary)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'var(--layera-font-weight-medium)'
  }
};

/**
 * Color System Current Target Indicator Styles
 */
export const CURRENT_TARGET_INDICATOR_STYLES = {
  'layera-current-target-indicator': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'var(--layera-color-info)15',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-info)30',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-current-target-icon': {
    fontSize: 'var(--layera-font-size-md)',
    color: 'var(--layera-color-info)'
  },
  'layera-current-target-text': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-info)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-current-target-value': {
    fontSize: 'var(--layera-font-size-sm)',
    fontFamily: 'monospace',
    background: 'var(--layera-color-info)20',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-xs)',
    color: 'var(--layera-color-info)'
  }
};

/**
 * Color System Feedback Styles
 */
export const COLOR_SYSTEM_FEEDBACK_STYLES = {
  'layera-color-feedback': {
    position: 'fixed',
    top: 'var(--layera-space-4)',
    right: 'var(--layera-space-4)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'var(--layera-color-success)',
    color: 'white',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    opacity: '0',
    transform: 'translateY(-20px)',
    transition: 'all 0.3s ease',
    zIndex: '9999',
    pointerEvents: 'none'
  },
  'layera-color-feedback--visible': {
    opacity: '1',
    transform: 'translateY(0)'
  },
  'layera-color-feedback--error': {
    background: 'var(--layera-color-danger)'
  }
};

/**
 * Advanced Color Controls Styles
 */
export const ADVANCED_COLOR_CONTROLS_STYLES = {
  'layera-advanced-color-section': {
    marginTop: 'var(--layera-space-6)',
    padding: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'rgba(0,0,0,0.02)'
  },
  'layera-advanced-color-title': {
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-color-type-group': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-color-type-label': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'block'
  }
};

/**
 * Dynamic Color Application Styles
 */
export const DYNAMIC_COLOR_APPLICATION_STYLES = {
  'layera-dynamic-color-applied': {
    position: 'relative'
  },
  'layera-dynamic-color-applied::after': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, var(--layera-color-success), transparent)',
    animation: 'layera-color-applied-flash 0.8s ease'
  },
  'layera-color-transition': {
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  'layera-color-transition--background': {
    transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  'layera-color-transition--border': {
    transition: 'border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

/**
 * Color Palette Display Styles
 */
export const COLOR_PALETTE_DISPLAY_STYLES = {
  'layera-color-palette': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-color-swatch': {
    width: '60px',
    height: '60px',
    borderRadius: 'var(--layera-radius-sm)',
    border: '2px solid white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-color-swatch:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  'layera-color-swatch--active': {
    border: '2px solid var(--layera-color-primary)',
    transform: 'scale(1.05)'
  },
  'layera-color-swatch-label': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    padding: 'var(--layera-space-1)',
    textAlign: 'center'
  }
};

/**
 * Color System Animations
 */
export const COLOR_SYSTEM_ANIMATIONS_STYLES = {
  '@keyframes layera-color-applied-flash': {
    '0%': { opacity: '0', transform: 'scaleX(0)' },
    '50%': { opacity: '1', transform: 'scaleX(1)' },
    '100%': { opacity: '0', transform: 'scaleX(0)' }
  },
  '@keyframes layera-color-pulse': {
    '0%': { boxShadow: '0 0 0 0 var(--layera-color-primary)40' },
    '70%': { boxShadow: '0 0 0 10px var(--layera-color-primary)00' },
    '100%': { boxShadow: '0 0 0 0 var(--layera-color-primary)00' }
  }
};

/**
 * ColorsBuilder Class - Enterprise 6-Color System JavaScript Support CSS Generation
 */
export class ColorsBuilder {
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
   * Generates CSS από colors class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateColorsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([selector, styles]) => {
      if (selector.startsWith('@keyframes')) {
        // Handle keyframes
        css += `${selector} {\n`;
        Object.entries(styles).forEach(([key, value]) => {
          if (typeof value === 'object') {
            css += `  ${key} {\n`;
            css += this.objectToCSSString(value);
            css += '\n  }\n';
          }
        });
        css += '}\n\n';
      } else {
        // Handle regular CSS classes
        css += `.${selector} {\n`;
        css += this.objectToCSSString(styles);
        css += '\n}\n\n';
      }
    });

    return css;
  }

  /**
   * Generates Target Component Selection CSS
   * @returns {string} - Target selection CSS
   */
  static generateTargetComponentSelectionCSS() {
    let css = '/* TARGET COMPONENT SELECTION STYLES */\n';
    css += this.generateColorsCSS(TARGET_COMPONENT_SELECTION_STYLES);
    return css;
  }

  /**
   * Generates Color Picker Controls CSS
   * @returns {string} - Color picker CSS
   */
  static generateColorPickerControlsCSS() {
    let css = '/* COLOR PICKER CONTROLS STYLES */\n';
    css += this.generateColorsCSS(COLOR_PICKER_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Color Application Preview CSS
   * @returns {string} - Preview CSS
   */
  static generateColorApplicationPreviewCSS() {
    let css = '/* COLOR APPLICATION PREVIEW STYLES */\n';
    css += this.generateColorsCSS(COLOR_APPLICATION_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Current Target Indicator CSS
   * @returns {string} - Target indicator CSS
   */
  static generateCurrentTargetIndicatorCSS() {
    let css = '/* CURRENT TARGET INDICATOR STYLES */\n';
    css += this.generateColorsCSS(CURRENT_TARGET_INDICATOR_STYLES);
    return css;
  }

  /**
   * Generates Color System Feedback CSS
   * @returns {string} - Feedback CSS
   */
  static generateColorSystemFeedbackCSS() {
    let css = '/* COLOR SYSTEM FEEDBACK STYLES */\n';
    css += this.generateColorsCSS(COLOR_SYSTEM_FEEDBACK_STYLES);
    return css;
  }

  /**
   * Generates Advanced Color Controls CSS
   * @returns {string} - Advanced controls CSS
   */
  static generateAdvancedColorControlsCSS() {
    let css = '/* ADVANCED COLOR CONTROLS STYLES */\n';
    css += this.generateColorsCSS(ADVANCED_COLOR_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Dynamic Color Application CSS
   * @returns {string} - Dynamic application CSS
   */
  static generateDynamicColorApplicationCSS() {
    let css = '/* DYNAMIC COLOR APPLICATION STYLES */\n';
    css += this.generateColorsCSS(DYNAMIC_COLOR_APPLICATION_STYLES);
    return css;
  }

  /**
   * Generates Color Palette Display CSS
   * @returns {string} - Palette display CSS
   */
  static generateColorPaletteDisplayCSS() {
    let css = '/* COLOR PALETTE DISPLAY STYLES */\n';
    css += this.generateColorsCSS(COLOR_PALETTE_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates Color System Animations CSS
   * @returns {string} - Animations CSS
   */
  static generateColorSystemAnimationsCSS() {
    let css = '/* COLOR SYSTEM ANIMATIONS */\n';
    css += this.generateColorsCSS(COLOR_SYSTEM_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις 6-Color System CSS classes
   * @returns {string} - Complete colors system CSS
   */
  static generateAllColorsCSS() {
    let css = '/* === 6-COLOR SYSTEM JAVASCRIPT SUPPORT === */\n\n';

    css += this.generateTargetComponentSelectionCSS();
    css += this.generateColorPickerControlsCSS();
    css += this.generateColorApplicationPreviewCSS();
    css += this.generateCurrentTargetIndicatorCSS();
    css += this.generateColorSystemFeedbackCSS();
    css += this.generateAdvancedColorControlsCSS();
    css += this.generateDynamicColorApplicationCSS();
    css += this.generateColorPaletteDisplayCSS();
    css += this.generateColorSystemAnimationsCSS();

    return css;
  }

  /**
   * Gets όλες τις available colors system classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllColorsClasses() {
    return {
      ...TARGET_COMPONENT_SELECTION_STYLES,
      ...COLOR_PICKER_CONTROLS_STYLES,
      ...COLOR_APPLICATION_PREVIEW_STYLES,
      ...CURRENT_TARGET_INDICATOR_STYLES,
      ...COLOR_SYSTEM_FEEDBACK_STYLES,
      ...ADVANCED_COLOR_CONTROLS_STYLES,
      ...DYNAMIC_COLOR_APPLICATION_STYLES,
      ...COLOR_PALETTE_DISPLAY_STYLES,
      ...COLOR_SYSTEM_ANIMATIONS_STYLES
    };
  }

  /**
   * Gets specific colors system category
   * @param {string} category - Category (targetSelection, colorPicker, preview, targetIndicator, feedback, advancedControls, dynamicApplication, paletteDisplay, animations)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getColorsCategory(category) {
    const categories = {
      targetSelection: TARGET_COMPONENT_SELECTION_STYLES,
      colorPicker: COLOR_PICKER_CONTROLS_STYLES,
      preview: COLOR_APPLICATION_PREVIEW_STYLES,
      targetIndicator: CURRENT_TARGET_INDICATOR_STYLES,
      feedback: COLOR_SYSTEM_FEEDBACK_STYLES,
      advancedControls: ADVANCED_COLOR_CONTROLS_STYLES,
      dynamicApplication: DYNAMIC_COLOR_APPLICATION_STYLES,
      paletteDisplay: COLOR_PALETTE_DISPLAY_STYLES,
      animations: COLOR_SYSTEM_ANIMATIONS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι colors system classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateColorsClasses() {
    try {
      const allClasses = this.getAllColorsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid colors class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for colors class: ${className}`);
        }

        // Handle keyframes differently
        if (className.startsWith('@keyframes')) {
          Object.entries(styles).forEach(([key, value]) => {
            if (typeof value !== 'object' && typeof value !== 'string') {
              throw new Error(`Invalid keyframe value: ${value} for key: ${key} in: ${className}`);
            }
          });
        } else {
          Object.entries(styles).forEach(([property, value]) => {
            if (typeof property !== 'string' || !property.trim()) {
              throw new Error(`Invalid CSS property: ${property} in class: ${className}`);
            }
            if (typeof value !== 'string' && typeof value !== 'number') {
              throw new Error(`Invalid CSS value: ${value} for property: ${property} in class: ${className}`);
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error('Colors system classes validation failed:', error.message);
      return false;
    }
  }
}

export default ColorsBuilder;