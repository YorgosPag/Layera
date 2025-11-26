/**
 * BorderRadiusBuilder.js - Right Sidebar Border Radius Builder
 *
 * Single Responsibility: Μόνο border-radius controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/border-radius.html
 */

/**
 * Border Radius Base Styles
 */
export const BORDER_RADIUS_BASE_STYLES = {
  'layera-border-radius-control': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-border-radius-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Border Radius Slider Styles
 */
export const BORDER_RADIUS_SLIDER_STYLES = {
  'layera-radius-slider-container': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-radius-slider-label': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-radius-value-display': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-color-primary)',
    fontFamily: 'monospace',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-radius-slider': {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: 'var(--layera-color-border)',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none'
  },
  'layera-radius-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'var(--layera-color-primary)',
    cursor: 'pointer'
  },
  'layera-radius-slider::-moz-range-thumb': {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: 'var(--layera-color-primary)',
    cursor: 'pointer',
    border: 'none'
  }
};

/**
 * Border Radius Presets Styles
 */
export const BORDER_RADIUS_PRESETS_STYLES = {
  'layera-radius-presets': {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-radius-preset': {
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  'layera-radius-preset:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)10'
  },
  'layera-radius-preset--active': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)20',
    color: 'var(--layera-color-primary)'
  },
  'layera-radius-preset-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    marginTop: 'var(--layera-space-1)'
  }
};

/**
 * Border Radius Preview Styles
 */
export const BORDER_RADIUS_PREVIEW_STYLES = {
  'layera-radius-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-radius-preview-box': {
    width: '80px',
    height: '80px',
    background: 'var(--layera-color-primary)',
    margin: '0 auto',
    transition: 'border-radius 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)'
  },
  'layera-radius-preview-label': {
    textAlign: 'center',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    marginTop: 'var(--layera-space-2)',
    opacity: '0.8'
  }
};

/**
 * Border Radius Input Styles
 */
export const BORDER_RADIUS_INPUT_STYLES = {
  'layera-radius-input-group': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-radius-input': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  'layera-radius-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-radius-unit': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7'
  }
};

/**
 * Border Radius Advanced Controls
 */
export const BORDER_RADIUS_ADVANCED_STYLES = {
  'layera-radius-advanced': {
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-radius-advanced-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-radius-corner-controls': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--layera-space-2)'
  },
  'layera-radius-corner-input': {
    padding: 'var(--layera-space-1)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    textAlign: 'center'
  }
};

/**
 * BorderRadiusBuilder Class - Enterprise Border Radius CSS Generation
 */
export class BorderRadiusBuilder {
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
   * Generates CSS από border radius class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateBorderRadiusCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Border Radius Base CSS
   * @returns {string} - Border radius base CSS
   */
  static generateBorderRadiusBaseCSS() {
    let css = '/* BORDER RADIUS BASE STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_BASE_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Slider CSS
   * @returns {string} - Border radius slider CSS
   */
  static generateBorderRadiusSliderCSS() {
    let css = '/* BORDER RADIUS SLIDER STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_SLIDER_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Presets CSS
   * @returns {string} - Border radius presets CSS
   */
  static generateBorderRadiusPresetsCSS() {
    let css = '/* BORDER RADIUS PRESETS STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_PRESETS_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Preview CSS
   * @returns {string} - Border radius preview CSS
   */
  static generateBorderRadiusPreviewCSS() {
    let css = '/* BORDER RADIUS PREVIEW STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Input CSS
   * @returns {string} - Border radius input CSS
   */
  static generateBorderRadiusInputCSS() {
    let css = '/* BORDER RADIUS INPUT STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Advanced CSS
   * @returns {string} - Border radius advanced CSS
   */
  static generateBorderRadiusAdvancedCSS() {
    let css = '/* BORDER RADIUS ADVANCED STYLES */\n';
    css += this.generateBorderRadiusCSS(BORDER_RADIUS_ADVANCED_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Border Radius CSS classes
   * @returns {string} - Complete border radius CSS
   */
  static generateAllBorderRadiusCSS() {
    let css = '/* === RIGHT SIDEBAR: BORDER RADIUS === */\n\n';

    css += this.generateBorderRadiusBaseCSS();
    css += this.generateBorderRadiusSliderCSS();
    css += this.generateBorderRadiusPresetsCSS();
    css += this.generateBorderRadiusPreviewCSS();
    css += this.generateBorderRadiusInputCSS();
    css += this.generateBorderRadiusAdvancedCSS();

    return css;
  }

  /**
   * Gets όλες τις available border radius classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllBorderRadiusClasses() {
    return {
      ...BORDER_RADIUS_BASE_STYLES,
      ...BORDER_RADIUS_SLIDER_STYLES,
      ...BORDER_RADIUS_PRESETS_STYLES,
      ...BORDER_RADIUS_PREVIEW_STYLES,
      ...BORDER_RADIUS_INPUT_STYLES,
      ...BORDER_RADIUS_ADVANCED_STYLES
    };
  }

  /**
   * Gets specific border radius category
   * @param {string} category - Category (base, slider, presets, preview, input, advanced)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getBorderRadiusCategory(category) {
    const categories = {
      base: BORDER_RADIUS_BASE_STYLES,
      slider: BORDER_RADIUS_SLIDER_STYLES,
      presets: BORDER_RADIUS_PRESETS_STYLES,
      preview: BORDER_RADIUS_PREVIEW_STYLES,
      input: BORDER_RADIUS_INPUT_STYLES,
      advanced: BORDER_RADIUS_ADVANCED_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι border radius classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateBorderRadiusClasses() {
    try {
      const allClasses = this.getAllBorderRadiusClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid border radius class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for border radius class: ${className}`);
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
      console.error('Border radius classes validation failed:', error.message);
      return false;
    }
  }
}

export default BorderRadiusBuilder;