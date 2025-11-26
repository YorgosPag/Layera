/**
 * TypographyBuilder.js - Typography JavaScript Support Builder
 *
 * Single Responsibility: Μόνο typography JavaScript functionality CSS support
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/scripts/typography.html
 */

/**
 * Typography Controls Display Styles
 */
export const TYPOGRAPHY_CONTROLS_DISPLAY_STYLES = {
  'layera-typography-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-3)',
    marginBottom: 'var(--layera-space-3)',
    padding: 'var(--layera-space-3)',
    background: 'var(--layera-color-surface)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    transition: 'all 0.2s ease'
  },
  'layera-typography-control:hover': {
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 2px 8px var(--layera-color-primary)20'
  },
  'layera-typography-label': {
    minWidth: '140px',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-text-primary)',
    textAlign: 'right',
    paddingRight: 'var(--layera-space-2)'
  },
  'layera-typography-input': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    transition: 'all 0.2s ease'
  },
  'layera-typography-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-typography-display': {
    minWidth: '60px',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'var(--layera-color-background)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    textAlign: 'center',
    fontFamily: 'var(--layera-font-family-mono)'
  }
};

/**
 * Font Family Control Styles
 */
export const FONT_FAMILY_CONTROL_STYLES = {
  'layera-font-family-select': {
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    fontSize: 'var(--layera-font-size-sm)',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\"><polyline points=\\\"6,9 12,15 18,9\\\"></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: 'var(--layera-space-8)'
  },
  'layera-font-preview': {
    padding: 'var(--layera-space-2)',
    background: 'var(--layera-color-background)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    fontStyle: 'italic',
    color: 'var(--layera-text-muted)',
    minWidth: '120px'
  }
};

/**
 * Font Size Control Styles
 */
export const FONT_SIZE_CONTROL_STYLES = {
  'layera-font-size-slider': {
    appearance: 'none',
    height: '6px',
    background: 'linear-gradient(to right, var(--layera-color-border), var(--layera-color-primary))',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },
  'layera-font-size-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '20px',
    height: '20px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    border: '2px solid white',
    transition: 'all 0.2s ease'
  },
  'layera-font-size-slider::-webkit-slider-thumb:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  },
  'layera-font-size-input': {
    width: '60px',
    textAlign: 'center',
    fontFamily: 'var(--layera-font-family-mono)',
    fontWeight: 'var(--layera-font-weight-medium)'
  }
};

/**
 * Font Weight Control Styles
 */
export const FONT_WEIGHT_CONTROL_STYLES = {
  'layera-font-weight-buttons': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    background: 'var(--layera-color-background)',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-font-weight-btn': {
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'transparent',
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '40px',
    textAlign: 'center'
  },
  'layera-font-weight-btn:hover': {
    background: 'var(--layera-color-primary)10',
    color: 'var(--layera-color-primary)'
  },
  'layera-font-weight-btn--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'layera-font-weight-btn--100': {
    fontWeight: '100'
  },
  'layera-font-weight-btn--300': {
    fontWeight: '300'
  },
  'layera-font-weight-btn--400': {
    fontWeight: '400'
  },
  'layera-font-weight-btn--500': {
    fontWeight: '500'
  },
  'layera-font-weight-btn--700': {
    fontWeight: '700'
  },
  'layera-font-weight-btn--900': {
    fontWeight: '900'
  }
};

/**
 * Line Height Control Styles
 */
export const LINE_HEIGHT_CONTROL_STYLES = {
  'layera-line-height-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-line-height-slider': {
    appearance: 'none',
    height: '6px',
    background: 'linear-gradient(to right, var(--layera-color-warning), var(--layera-color-success))',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-line-height-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '18px',
    height: '18px',
    background: 'var(--layera-color-success)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    border: '2px solid white'
  },
  'layera-line-height-preview': {
    fontSize: 'var(--layera-font-size-sm)',
    padding: 'var(--layera-space-2)',
    background: 'var(--layera-color-background)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    minWidth: '100px',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

/**
 * Text Color Control Styles
 */
export const TEXT_COLOR_CONTROL_STYLES = {
  'layera-text-color-picker': {
    width: '50px',
    height: '35px',
    border: '2px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    appearance: 'none',
    background: 'none',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  'layera-text-color-picker:hover': {
    borderColor: 'var(--layera-color-primary)',
    transform: 'scale(1.05)'
  },
  'layera-text-color-input': {
    fontFamily: 'var(--layera-font-family-mono)',
    fontSize: 'var(--layera-font-size-xs)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  'layera-text-color-presets': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    alignItems: 'center'
  },
  'layera-color-preset-btn': {
    width: '24px',
    height: '24px',
    border: '2px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative'
  },
  'layera-color-preset-btn:hover': {
    borderColor: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  'layera-color-preset-btn--active::after': {
    content: '✓',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
  }
};

/**
 * Header Size Control Styles
 */
export const HEADER_SIZE_CONTROL_STYLES = {
  'layera-header-size-control': {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 'var(--layera-space-2)',
    padding: 'var(--layera-space-2)',
    background: 'var(--layera-color-background)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-header-size-btn': {
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-header-size-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)10'
  },
  'layera-header-size-btn--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-header-size-btn--h1': {
    fontSize: 'var(--layera-font-size-xl)',
    fontWeight: 'var(--layera-font-weight-bold)'
  },
  'layera-header-size-btn--h2': {
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)'
  },
  'layera-header-size-btn--h3': {
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'layera-header-size-btn--h4': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'layera-header-size-btn--h5': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-header-size-btn--h6': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    opacity: '0.8'
  }
};

/**
 * Typography Target Selection Styles
 */
export const TYPOGRAPHY_TARGET_SELECTION_STYLES = {
  'layera-typography-targets': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, var(--layera-color-background) 0%, var(--layera-color-surface) 100%)',
    borderRadius: 'var(--layera-radius-md)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-target-btn': {
    padding: 'var(--layera-space-2) var(--layera-space-4)',
    border: '2px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-target-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, var(--layera-color-primary)30, transparent)',
    transition: 'left 0.5s ease'
  },
  'layera-target-btn:hover::before': {
    left: '100%'
  },
  'layera-target-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px var(--layera-color-primary)20'
  },
  'layera-target-btn--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px var(--layera-color-primary)40'
  },
  'layera-target-btn--all': {
    background: 'var(--layera-color-info)',
    borderColor: 'var(--layera-color-info)'
  },
  'layera-target-btn--cards': {
    background: 'var(--layera-color-success)',
    borderColor: 'var(--layera-color-success)'
  },
  'layera-target-btn--buttons': {
    background: 'var(--layera-color-warning)',
    borderColor: 'var(--layera-color-warning)'
  },
  'layera-target-btn--header': {
    background: 'var(--layera-color-danger)',
    borderColor: 'var(--layera-color-danger)'
  }
};

/**
 * Typography Preview Styles
 */
export const TYPOGRAPHY_PREVIEW_STYLES = {
  'layera-typography-preview': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-4)',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  'layera-typography-preview h1': {
    margin: '0 0 var(--layera-space-3) 0',
    padding: '0'
  },
  'layera-typography-preview h2': {
    margin: '0 0 var(--layera-space-2) 0',
    padding: '0'
  },
  'layera-typography-preview h3': {
    margin: '0 0 var(--layera-space-2) 0',
    padding: '0'
  },
  'layera-typography-preview p': {
    margin: '0 0 var(--layera-space-2) 0',
    padding: '0'
  },
  'layera-typography-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    fontWeight: 'var(--layera-font-weight-medium)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: 'var(--layera-space-1)'
  }
};

/**
 * Typography Live Update Styles
 */
export const TYPOGRAPHY_LIVE_UPDATE_STYLES = {
  'layera-typography-live-indicator': {
    position: 'absolute',
    top: 'var(--layera-space-1)',
    right: 'var(--layera-space-1)',
    width: '8px',
    height: '8px',
    background: 'var(--layera-color-success)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  'layera-typography-update-flash': {
    animation: 'flash 0.3s ease'
  },
  '@keyframes pulse': {
    '0%': { opacity: '1' },
    '50%': { opacity: '0.5' },
    '100%': { opacity: '1' }
  },
  '@keyframes flash': {
    '0%': { background: 'var(--layera-color-primary)20' },
    '50%': { background: 'var(--layera-color-primary)40' },
    '100%': { background: 'transparent' }
  }
};

/**
 * TypographyBuilder Class - Enterprise Typography JavaScript Support CSS Generation
 */
export class TypographyBuilder {
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
      // Handle keyframes
      if (className.startsWith('@keyframes')) {
        css += `${className} {\n`;
        Object.entries(styles).forEach(([keyframe, keyframeStyles]) => {
          css += `  ${keyframe} {\n`;
          css += this.objectToCSSString(keyframeStyles);
          css += '\n  }\n';
        });
        css += '}\n\n';
      } else {
        css += `.${className} {\n`;
        css += this.objectToCSSString(styles);
        css += '\n}\n\n';
      }
    });

    return css;
  }

  /**
   * Generates Typography Controls Display CSS
   * @returns {string} - Typography controls display CSS
   */
  static generateTypographyControlsDisplayCSS() {
    let css = '/* TYPOGRAPHY CONTROLS DISPLAY STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_CONTROLS_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates Font Family Control CSS
   * @returns {string} - Font family control CSS
   */
  static generateFontFamilyControlCSS() {
    let css = '/* FONT FAMILY CONTROL STYLES */\n';
    css += this.generateTypographyCSS(FONT_FAMILY_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Font Size Control CSS
   * @returns {string} - Font size control CSS
   */
  static generateFontSizeControlCSS() {
    let css = '/* FONT SIZE CONTROL STYLES */\n';
    css += this.generateTypographyCSS(FONT_SIZE_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Font Weight Control CSS
   * @returns {string} - Font weight control CSS
   */
  static generateFontWeightControlCSS() {
    let css = '/* FONT WEIGHT CONTROL STYLES */\n';
    css += this.generateTypographyCSS(FONT_WEIGHT_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Line Height Control CSS
   * @returns {string} - Line height control CSS
   */
  static generateLineHeightControlCSS() {
    let css = '/* LINE HEIGHT CONTROL STYLES */\n';
    css += this.generateTypographyCSS(LINE_HEIGHT_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Text Color Control CSS
   * @returns {string} - Text color control CSS
   */
  static generateTextColorControlCSS() {
    let css = '/* TEXT COLOR CONTROL STYLES */\n';
    css += this.generateTypographyCSS(TEXT_COLOR_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Header Size Control CSS
   * @returns {string} - Header size control CSS
   */
  static generateHeaderSizeControlCSS() {
    let css = '/* HEADER SIZE CONTROL STYLES */\n';
    css += this.generateTypographyCSS(HEADER_SIZE_CONTROL_STYLES);
    return css;
  }

  /**
   * Generates Typography Target Selection CSS
   * @returns {string} - Typography target selection CSS
   */
  static generateTypographyTargetSelectionCSS() {
    let css = '/* TYPOGRAPHY TARGET SELECTION STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_TARGET_SELECTION_STYLES);
    return css;
  }

  /**
   * Generates Typography Preview CSS
   * @returns {string} - Typography preview CSS
   */
  static generateTypographyPreviewCSS() {
    let css = '/* TYPOGRAPHY PREVIEW STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Typography Live Update CSS
   * @returns {string} - Typography live update CSS
   */
  static generateTypographyLiveUpdateCSS() {
    let css = '/* TYPOGRAPHY LIVE UPDATE STYLES */\n';
    css += this.generateTypographyCSS(TYPOGRAPHY_LIVE_UPDATE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Typography CSS classes
   * @returns {string} - Complete typography CSS
   */
  static generateAllTypographyCSS() {
    let css = '/* === TYPOGRAPHY JAVASCRIPT SUPPORT === */\n\n';

    css += this.generateTypographyControlsDisplayCSS();
    css += this.generateFontFamilyControlCSS();
    css += this.generateFontSizeControlCSS();
    css += this.generateFontWeightControlCSS();
    css += this.generateLineHeightControlCSS();
    css += this.generateTextColorControlCSS();
    css += this.generateHeaderSizeControlCSS();
    css += this.generateTypographyTargetSelectionCSS();
    css += this.generateTypographyPreviewCSS();
    css += this.generateTypographyLiveUpdateCSS();

    return css;
  }

  /**
   * Gets όλες τις available typography classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllTypographyClasses() {
    return {
      ...TYPOGRAPHY_CONTROLS_DISPLAY_STYLES,
      ...FONT_FAMILY_CONTROL_STYLES,
      ...FONT_SIZE_CONTROL_STYLES,
      ...FONT_WEIGHT_CONTROL_STYLES,
      ...LINE_HEIGHT_CONTROL_STYLES,
      ...TEXT_COLOR_CONTROL_STYLES,
      ...HEADER_SIZE_CONTROL_STYLES,
      ...TYPOGRAPHY_TARGET_SELECTION_STYLES,
      ...TYPOGRAPHY_PREVIEW_STYLES,
      ...TYPOGRAPHY_LIVE_UPDATE_STYLES
    };
  }

  /**
   * Gets specific typography category
   * @param {string} category - Category (controlsDisplay, fontFamily, fontSize, fontWeight, lineHeight, textColor, headerSize, targetSelection, preview, liveUpdate)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getTypographyCategory(category) {
    const categories = {
      controlsDisplay: TYPOGRAPHY_CONTROLS_DISPLAY_STYLES,
      fontFamily: FONT_FAMILY_CONTROL_STYLES,
      fontSize: FONT_SIZE_CONTROL_STYLES,
      fontWeight: FONT_WEIGHT_CONTROL_STYLES,
      lineHeight: LINE_HEIGHT_CONTROL_STYLES,
      textColor: TEXT_COLOR_CONTROL_STYLES,
      headerSize: HEADER_SIZE_CONTROL_STYLES,
      targetSelection: TYPOGRAPHY_TARGET_SELECTION_STYLES,
      preview: TYPOGRAPHY_PREVIEW_STYLES,
      liveUpdate: TYPOGRAPHY_LIVE_UPDATE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι typography classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateTypographyClasses() {
    try {
      const allClasses = this.getAllTypographyClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid typography class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for typography class: ${className}`);
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
      console.error('Typography classes validation failed:', error.message);
      return false;
    }
  }
}

export default TypographyBuilder;