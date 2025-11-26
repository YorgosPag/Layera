/**
 * ComponentSizesBuilder.js - Right Sidebar Component Sizes Builder
 *
 * Single Responsibility: Μόνο component sizes controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/component-sizes.html
 */

/**
 * Component Sizes Panel Base Styles
 */
export const COMPONENT_SIZES_PANEL_BASE_STYLES = {
  'layera-component-sizes-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-component-sizes-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Size Categories Selector Styles
 */
export const SIZE_CATEGORIES_SELECTOR_STYLES = {
  'layera-size-categories': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-size-category-btn': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'transparent',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-size-category-btn:hover': {
    background: 'white',
    color: 'var(--layera-color-primary)'
  },
  'layera-size-category-btn--active': {
    background: 'white',
    color: 'var(--layera-color-primary)',
    fontWeight: 'var(--layera-font-weight-medium)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

/**
 * Size Options Grid Styles
 */
export const SIZE_OPTIONS_GRID_STYLES = {
  'layera-size-options-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-size-option': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-size-option:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05',
    transform: 'translateY(-1px)'
  },
  'layera-size-option--selected': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)15',
    color: 'var(--layera-color-primary)'
  },
  'layera-size-option-label': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    marginBottom: 'var(--layera-space-1)'
  },
  'layera-size-option-value': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7'
  }
};

/**
 * Custom Size Input Styles
 */
export const CUSTOM_SIZE_INPUT_STYLES = {
  'layera-custom-size-section': {
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    border: '1px dashed var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-custom-size-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'block'
  },
  'layera-custom-size-inputs': {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: 'var(--layera-space-2)',
    alignItems: 'center'
  },
  'layera-custom-size-input': {
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  'layera-custom-size-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-custom-size-separator': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.5'
  }
};

/**
 * Size Preview Styles
 */
export const SIZE_PREVIEW_STYLES = {
  'layera-size-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-3)',
    textAlign: 'center'
  },
  'layera-size-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-size-preview-demo': {
    background: 'var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-sm)',
    margin: '0 auto',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-size-preview-dimensions': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    marginTop: 'var(--layera-space-2)',
    opacity: '0.8'
  }
};

/**
 * Size Presets Styles
 */
export const SIZE_PRESETS_STYLES = {
  'layera-size-presets': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-size-presets-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-size-presets-list': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--layera-space-1)'
  },
  'layera-size-preset-chip': {
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-size-preset-chip:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-size-preset-chip--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  }
};

/**
 * Responsive Size Controls
 */
export const RESPONSIVE_SIZE_CONTROLS_STYLES = {
  'layera-responsive-size-controls': {
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-responsive-size-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-responsive-breakpoints': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-breakpoint-btn': {
    flex: '1',
    padding: 'var(--layera-space-1)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  'layera-breakpoint-btn:hover': {
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-breakpoint-btn--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  }
};

/**
 * ComponentSizesBuilder Class - Enterprise Component Sizes CSS Generation
 */
export class ComponentSizesBuilder {
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
   * Generates CSS από component sizes class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateComponentSizesCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Component Sizes Panel Base CSS
   * @returns {string} - Component sizes panel base CSS
   */
  static generateComponentSizesPanelBaseCSS() {
    let css = '/* COMPONENT SIZES PANEL BASE STYLES */\n';
    css += this.generateComponentSizesCSS(COMPONENT_SIZES_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Size Categories Selector CSS
   * @returns {string} - Size categories selector CSS
   */
  static generateSizeCategoriesSelectorCSS() {
    let css = '/* SIZE CATEGORIES SELECTOR STYLES */\n';
    css += this.generateComponentSizesCSS(SIZE_CATEGORIES_SELECTOR_STYLES);
    return css;
  }

  /**
   * Generates Size Options Grid CSS
   * @returns {string} - Size options grid CSS
   */
  static generateSizeOptionsGridCSS() {
    let css = '/* SIZE OPTIONS GRID STYLES */\n';
    css += this.generateComponentSizesCSS(SIZE_OPTIONS_GRID_STYLES);
    return css;
  }

  /**
   * Generates Custom Size Input CSS
   * @returns {string} - Custom size input CSS
   */
  static generateCustomSizeInputCSS() {
    let css = '/* CUSTOM SIZE INPUT STYLES */\n';
    css += this.generateComponentSizesCSS(CUSTOM_SIZE_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Size Preview CSS
   * @returns {string} - Size preview CSS
   */
  static generateSizePreviewCSS() {
    let css = '/* SIZE PREVIEW STYLES */\n';
    css += this.generateComponentSizesCSS(SIZE_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Size Presets CSS
   * @returns {string} - Size presets CSS
   */
  static generateSizePresetsCSS() {
    let css = '/* SIZE PRESETS STYLES */\n';
    css += this.generateComponentSizesCSS(SIZE_PRESETS_STYLES);
    return css;
  }

  /**
   * Generates Responsive Size Controls CSS
   * @returns {string} - Responsive size controls CSS
   */
  static generateResponsiveSizeControlsCSS() {
    let css = '/* RESPONSIVE SIZE CONTROLS STYLES */\n';
    css += this.generateComponentSizesCSS(RESPONSIVE_SIZE_CONTROLS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Component Sizes CSS classes
   * @returns {string} - Complete component sizes CSS
   */
  static generateAllComponentSizesCSS() {
    let css = '/* === RIGHT SIDEBAR: COMPONENT SIZES === */\n\n';

    css += this.generateComponentSizesPanelBaseCSS();
    css += this.generateSizeCategoriesSelectorCSS();
    css += this.generateSizeOptionsGridCSS();
    css += this.generateCustomSizeInputCSS();
    css += this.generateSizePreviewCSS();
    css += this.generateSizePresetsCSS();
    css += this.generateResponsiveSizeControlsCSS();

    return css;
  }

  /**
   * Gets όλες τις available component sizes classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllComponentSizesClasses() {
    return {
      ...COMPONENT_SIZES_PANEL_BASE_STYLES,
      ...SIZE_CATEGORIES_SELECTOR_STYLES,
      ...SIZE_OPTIONS_GRID_STYLES,
      ...CUSTOM_SIZE_INPUT_STYLES,
      ...SIZE_PREVIEW_STYLES,
      ...SIZE_PRESETS_STYLES,
      ...RESPONSIVE_SIZE_CONTROLS_STYLES
    };
  }

  /**
   * Gets specific component sizes category
   * @param {string} category - Category (panelBase, categoriesSelector, optionsGrid, customInput, preview, presets, responsiveControls)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getComponentSizesCategory(category) {
    const categories = {
      panelBase: COMPONENT_SIZES_PANEL_BASE_STYLES,
      categoriesSelector: SIZE_CATEGORIES_SELECTOR_STYLES,
      optionsGrid: SIZE_OPTIONS_GRID_STYLES,
      customInput: CUSTOM_SIZE_INPUT_STYLES,
      preview: SIZE_PREVIEW_STYLES,
      presets: SIZE_PRESETS_STYLES,
      responsiveControls: RESPONSIVE_SIZE_CONTROLS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι component sizes classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateComponentSizesClasses() {
    try {
      const allClasses = this.getAllComponentSizesClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid component sizes class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for component sizes class: ${className}`);
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
      console.error('Component sizes classes validation failed:', error.message);
      return false;
    }
  }
}

export default ComponentSizesBuilder;