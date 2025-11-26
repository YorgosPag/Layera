/**
 * RightSidebarTypographyBuilder.js - Right Sidebar Typography Controls Builder
 *
 * Single Responsibility: Μόνο right sidebar typography controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/typography.html
 */

/**
 * Typography Panel Base Styles
 */
export const TYPOGRAPHY_PANEL_BASE_STYLES = {
  'layera-typography-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-typography-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-typography-icon': {
    fontSize: 'var(--layera-font-size-md)',
    opacity: '0.8'
  }
};

/**
 * Font Family Controls Styles
 */
export const FONT_FAMILY_CONTROLS_STYLES = {
  'layera-font-family-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-font-family-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-font-family-select': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-sidebar-bg)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\"><polyline points=\\"6,9 12,15 18,9\\"></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: 'var(--layera-space-8)'
  },
  'layera-font-family-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Base Font Size Controls Styles
 */
export const BASE_FONT_SIZE_CONTROLS_STYLES = {
  'layera-base-font-size-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-base-font-size-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-base-font-size-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-base-font-size-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-base-font-size-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-base-font-size-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Header Size Controls Styles
 */
export const HEADER_SIZE_CONTROLS_STYLES = {
  'layera-header-size-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-header-size-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-header-size-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-header-size-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-header-size-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-header-size-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Font Weight Controls Styles
 */
export const FONT_WEIGHT_CONTROLS_STYLES = {
  'layera-font-weight-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-font-weight-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-font-weight-select': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-sidebar-bg)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\"><polyline points=\\"6,9 12,15 18,9\\"></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: 'var(--layera-space-8)'
  },
  'layera-font-weight-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Line Height Controls Styles
 */
export const LINE_HEIGHT_CONTROLS_STYLES = {
  'layera-line-height-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-line-height-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-line-height-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-line-height-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-line-height-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-line-height-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '30px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Text Color Controls Styles
 */
export const TEXT_COLOR_CONTROLS_STYLES = {
  'layera-text-color-section': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-text-color-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-text-color-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-text-color-picker': {
    width: '30px',
    height: '25px',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    appearance: 'none',
    background: 'transparent'
  },
  'layera-text-color-picker::-webkit-color-swatch': {
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)'
  },
  'layera-text-color-input': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-sidebar-bg)',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace'
  },
  'layera-text-color-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Typography Preview Styles
 */
export const TYPOGRAPHY_PREVIEW_STYLES = {
  'layera-typography-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginTop: 'var(--layera-space-4)',
    border: '1px dashed var(--layera-color-border)'
  },
  'layera-typography-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginBottom: 'var(--layera-space-2)',
    textAlign: 'center'
  },
  'layera-typography-preview-sample': {
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease'
  },
  'layera-typography-preview-header': {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 'var(--layera-space-2)',
    lineHeight: '1.5'
  },
  'layera-typography-preview-text': {
    fontSize: '16px',
    fontWeight: '400',
    color: '#2c3e50',
    lineHeight: '1.5'
  },
  'layera-typography-preview-values': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.8',
    lineHeight: '1.4',
    textAlign: 'center'
  }
};

/**
 * RightSidebarTypographyBuilder Class - Enterprise Typography Controls CSS Generation
 */
export class RightSidebarTypographyBuilder {
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
   * Generates CSS από typography class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateTypographyCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Typography Panel Base CSS
   * @returns {string} - Panel base CSS
   */
  static generateTypographyPanelBaseCSS() {
    let css = '/* TYPOGRAPHY PANEL BASE STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Font Family Controls CSS
   * @returns {string} - Font family controls CSS
   */
  static generateFontFamilyControlsCSS() {
    let css = '/* FONT FAMILY CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(FONT_FAMILY_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Base Font Size Controls CSS
   * @returns {string} - Base font size controls CSS
   */
  static generateBaseFontSizeControlsCSS() {
    let css = '/* BASE FONT SIZE CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(BASE_FONT_SIZE_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Header Size Controls CSS
   * @returns {string} - Header size controls CSS
   */
  static generateHeaderSizeControlsCSS() {
    let css = '/* HEADER SIZE CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(HEADER_SIZE_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Font Weight Controls CSS
   * @returns {string} - Font weight controls CSS
   */
  static generateFontWeightControlsCSS() {
    let css = '/* FONT WEIGHT CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(FONT_WEIGHT_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Line Height Controls CSS
   * @returns {string} - Line height controls CSS
   */
  static generateLineHeightControlsCSS() {
    let css = '/* LINE HEIGHT CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(LINE_HEIGHT_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Text Color Controls CSS
   * @returns {string} - Text color controls CSS
   */
  static generateTextColorControlsCSS() {
    let css = '/* TEXT COLOR CONTROLS STYLES */\n';
    css += this.generateTypographyCSS(TEXT_COLOR_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Typography Preview CSS
   * @returns {string} - Preview CSS
   */
  static generateTypographyPreviewCSS() {
    let css = '/* TYPOGRAPHY PREVIEW STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Right Sidebar Typography CSS classes
   * @returns {string} - Complete typography controls CSS
   */
  static generateAllRightSidebarTypographyCSS() {
    let css = '/* === RIGHT SIDEBAR: TYPOGRAPHY CONTROLS === */\n\n';

    css += this.generateTypographyPanelBaseCSS();
    css += this.generateFontFamilyControlsCSS();
    css += this.generateBaseFontSizeControlsCSS();
    css += this.generateHeaderSizeControlsCSS();
    css += this.generateFontWeightControlsCSS();
    css += this.generateLineHeightControlsCSS();
    css += this.generateTextColorControlsCSS();
    css += this.generateTypographyPreviewCSS();

    return css;
  }

  /**
   * Gets όλες τις available typography controls classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllTypographyControlsClasses() {
    return {
      ...TYPOGRAPHY_PANEL_BASE_STYLES,
      ...FONT_FAMILY_CONTROLS_STYLES,
      ...BASE_FONT_SIZE_CONTROLS_STYLES,
      ...HEADER_SIZE_CONTROLS_STYLES,
      ...FONT_WEIGHT_CONTROLS_STYLES,
      ...LINE_HEIGHT_CONTROLS_STYLES,
      ...TEXT_COLOR_CONTROLS_STYLES,
      ...TYPOGRAPHY_PREVIEW_STYLES
    };
  }

  /**
   * Gets specific typography controls category
   * @param {string} category - Category (panelBase, fontFamily, baseFontSize, headerSize, fontWeight, lineHeight, textColor, preview)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getTypographyControlsCategory(category) {
    const categories = {
      panelBase: TYPOGRAPHY_PANEL_BASE_STYLES,
      fontFamily: FONT_FAMILY_CONTROLS_STYLES,
      baseFontSize: BASE_FONT_SIZE_CONTROLS_STYLES,
      headerSize: HEADER_SIZE_CONTROLS_STYLES,
      fontWeight: FONT_WEIGHT_CONTROLS_STYLES,
      lineHeight: LINE_HEIGHT_CONTROLS_STYLES,
      textColor: TEXT_COLOR_CONTROLS_STYLES,
      preview: TYPOGRAPHY_PREVIEW_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι typography controls classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateTypographyControlsClasses() {
    try {
      const allClasses = this.getAllTypographyControlsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid typography controls class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for typography controls class: ${className}`);
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
      console.error('Typography controls classes validation failed:', error.message);
      return false;
    }
  }
}

export default RightSidebarTypographyBuilder;