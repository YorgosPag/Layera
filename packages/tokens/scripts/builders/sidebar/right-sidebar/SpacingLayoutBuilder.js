/**
 * SpacingLayoutBuilder.js - Right Sidebar Spacing & Layout Builder
 *
 * Single Responsibility: Μόνο spacing & layout controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/spacing-layout.html
 */

/**
 * Spacing Layout Panel Base Styles
 */
export const SPACING_LAYOUT_PANEL_BASE_STYLES = {
  'layera-spacing-layout-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-spacing-layout-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-spacing-layout-icon': {
    fontSize: 'var(--layera-font-size-md)',
    opacity: '0.8'
  }
};

/**
 * Component Gap Controls Styles
 */
export const COMPONENT_GAP_CONTROLS_STYLES = {
  'layera-component-gap-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-component-gap-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-component-gap-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-component-gap-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-component-gap-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-component-gap-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Padding Controls Styles
 */
export const PADDING_CONTROLS_STYLES = {
  'layera-padding-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-padding-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-padding-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-padding-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-padding-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-padding-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Border Radius Controls Styles
 */
export const BORDER_RADIUS_CONTROLS_STYLES = {
  'layera-border-radius-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-border-radius-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-border-radius-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-border-radius-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-border-radius-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-border-radius-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Border Width Controls Styles
 */
export const BORDER_WIDTH_CONTROLS_STYLES = {
  'layera-border-width-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-border-width-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-border-width-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-border-width-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-border-width-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '16px',
    height: '16px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  'layera-border-width-display': {
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    minWidth: '35px',
    textAlign: 'right',
    opacity: '0.8'
  }
};

/**
 * Border Style Controls Styles
 */
export const BORDER_STYLE_CONTROLS_STYLES = {
  'layera-border-style-section': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-border-style-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-border-style-select': {
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
  'layera-border-style-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Box Shadow Controls Styles
 */
export const BOX_SHADOW_CONTROLS_STYLES = {
  'layera-box-shadow-section': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-box-shadow-label': {
    display: 'block',
    marginBottom: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-box-shadow-select': {
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
  'layera-box-shadow-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Spacing Layout Preview Styles
 */
export const SPACING_LAYOUT_PREVIEW_STYLES = {
  'layera-spacing-layout-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginTop: 'var(--layera-space-4)',
    border: '1px dashed var(--layera-color-border)'
  },
  'layera-spacing-layout-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginBottom: 'var(--layera-space-2)',
    textAlign: 'center'
  },
  'layera-spacing-layout-preview-demo': {
    background: 'var(--layera-color-primary)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '2px solid transparent'
  },
  'layera-spacing-layout-preview-values': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    marginTop: 'var(--layera-space-2)',
    textAlign: 'center',
    opacity: '0.8',
    lineHeight: '1.4'
  }
};

/**
 * SpacingLayoutBuilder Class - Enterprise Spacing & Layout CSS Generation
 */
export class SpacingLayoutBuilder {
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
   * Generates CSS από spacing layout class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateSpacingLayoutCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Spacing Layout Panel Base CSS
   * @returns {string} - Panel base CSS
   */
  static generateSpacingLayoutPanelBaseCSS() {
    let css = '/* SPACING LAYOUT PANEL BASE STYLES */\n';
    css += this.generateSpacingLayoutCSS(SPACING_LAYOUT_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Component Gap Controls CSS
   * @returns {string} - Component gap controls CSS
   */
  static generateComponentGapControlsCSS() {
    let css = '/* COMPONENT GAP CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(COMPONENT_GAP_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Padding Controls CSS
   * @returns {string} - Padding controls CSS
   */
  static generatePaddingControlsCSS() {
    let css = '/* PADDING CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(PADDING_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Controls CSS
   * @returns {string} - Border radius controls CSS
   */
  static generateBorderRadiusControlsCSS() {
    let css = '/* BORDER RADIUS CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(BORDER_RADIUS_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Border Width Controls CSS
   * @returns {string} - Border width controls CSS
   */
  static generateBorderWidthControlsCSS() {
    let css = '/* BORDER WIDTH CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(BORDER_WIDTH_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Border Style Controls CSS
   * @returns {string} - Border style controls CSS
   */
  static generateBorderStyleControlsCSS() {
    let css = '/* BORDER STYLE CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(BORDER_STYLE_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Box Shadow Controls CSS
   * @returns {string} - Box shadow controls CSS
   */
  static generateBoxShadowControlsCSS() {
    let css = '/* BOX SHADOW CONTROLS STYLES */\n';
    css += this.generateSpacingLayoutCSS(BOX_SHADOW_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates Spacing Layout Preview CSS
   * @returns {string} - Preview CSS
   */
  static generateSpacingLayoutPreviewCSS() {
    let css = '/* SPACING LAYOUT PREVIEW STYLES */\n';
    css += this.generateSpacingLayoutCSS(SPACING_LAYOUT_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Spacing Layout CSS classes
   * @returns {string} - Complete spacing layout CSS
   */
  static generateAllSpacingLayoutCSS() {
    let css = '/* === RIGHT SIDEBAR: SPACING LAYOUT === */\n\n';

    css += this.generateSpacingLayoutPanelBaseCSS();
    css += this.generateComponentGapControlsCSS();
    css += this.generatePaddingControlsCSS();
    css += this.generateBorderRadiusControlsCSS();
    css += this.generateBorderWidthControlsCSS();
    css += this.generateBorderStyleControlsCSS();
    css += this.generateBoxShadowControlsCSS();
    css += this.generateSpacingLayoutPreviewCSS();

    return css;
  }

  /**
   * Gets όλες τις available spacing layout classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllSpacingLayoutClasses() {
    return {
      ...SPACING_LAYOUT_PANEL_BASE_STYLES,
      ...COMPONENT_GAP_CONTROLS_STYLES,
      ...PADDING_CONTROLS_STYLES,
      ...BORDER_RADIUS_CONTROLS_STYLES,
      ...BORDER_WIDTH_CONTROLS_STYLES,
      ...BORDER_STYLE_CONTROLS_STYLES,
      ...BOX_SHADOW_CONTROLS_STYLES,
      ...SPACING_LAYOUT_PREVIEW_STYLES
    };
  }

  /**
   * Gets specific spacing layout category
   * @param {string} category - Category (panelBase, componentGap, padding, borderRadius, borderWidth, borderStyle, boxShadow, preview)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getSpacingLayoutCategory(category) {
    const categories = {
      panelBase: SPACING_LAYOUT_PANEL_BASE_STYLES,
      componentGap: COMPONENT_GAP_CONTROLS_STYLES,
      padding: PADDING_CONTROLS_STYLES,
      borderRadius: BORDER_RADIUS_CONTROLS_STYLES,
      borderWidth: BORDER_WIDTH_CONTROLS_STYLES,
      borderStyle: BORDER_STYLE_CONTROLS_STYLES,
      boxShadow: BOX_SHADOW_CONTROLS_STYLES,
      preview: SPACING_LAYOUT_PREVIEW_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι spacing layout classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateSpacingLayoutClasses() {
    try {
      const allClasses = this.getAllSpacingLayoutClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid spacing layout class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for spacing layout class: ${className}`);
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
      console.error('Spacing layout classes validation failed:', error.message);
      return false;
    }
  }
}

export default SpacingLayoutBuilder;