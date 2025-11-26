/**
 * ComponentsBuilder.js - Right Sidebar Components Builder
 *
 * Single Responsibility: Μόνο components selection και controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/components.html
 */

/**
 * Components Panel Base Styles
 */
export const COMPONENTS_PANEL_BASE_STYLES = {
  'layera-components-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-components-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Component Categories List Styles
 */
export const COMPONENT_CATEGORIES_STYLES = {
  'layera-component-categories': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-category-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    marginBottom: 'var(--layera-space-1)',
    border: '1px solid transparent',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-category-item:hover': {
    background: 'var(--layera-color-primary)10',
    borderColor: 'var(--layera-color-primary)30'
  },
  'layera-category-item--active': {
    background: 'var(--layera-color-primary)20',
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-category-name': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-category-count': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    background: 'rgba(0,0,0,0.1)',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-xs)'
  }
};

/**
 * Component Items Grid Styles
 */
export const COMPONENT_ITEMS_GRID_STYLES = {
  'layera-components-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-component-item': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  'layera-component-item:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  'layera-component-item--selected': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)15',
    color: 'var(--layera-color-primary)'
  },
  'layera-component-icon': {
    width: '24px',
    height: '24px',
    marginBottom: 'var(--layera-space-2)',
    opacity: '0.7'
  },
  'layera-component-name': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    lineHeight: '1.3'
  }
};

/**
 * Component Preview Styles
 */
export const COMPONENT_PREVIEW_STYLES = {
  'layera-component-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-3)',
    border: '1px dashed var(--layera-color-border)'
  },
  'layera-component-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginBottom: 'var(--layera-space-2)',
    textAlign: 'center'
  },
  'layera-component-preview-box': {
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)'
  }
};

/**
 * Component Actions Styles
 */
export const COMPONENT_ACTIONS_STYLES = {
  'layera-component-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-component-action-btn': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-component-action-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-component-action-btn--primary': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-component-action-btn--primary:hover': {
    opacity: '0.9'
  }
};

/**
 * Component Search Styles
 */
export const COMPONENT_SEARCH_STYLES = {
  'layera-component-search': {
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-component-search-input': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-component-search-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-component-search-input::placeholder': {
    color: 'var(--layera-sidebar-text)',
    opacity: '0.6'
  }
};

/**
 * Component Properties Panel
 */
export const COMPONENT_PROPERTIES_STYLES = {
  'layera-component-properties': {
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-component-properties-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-component-property-item': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--layera-space-2) 0',
    borderBottom: '1px solid var(--layera-color-border)20'
  },
  'layera-component-property-item:last-child': {
    borderBottom: 'none'
  },
  'layera-component-property-name': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-component-property-value': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-color-primary)'
  }
};

/**
 * ComponentsBuilder Class - Enterprise Components CSS Generation
 */
export class ComponentsBuilder {
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
   * Generates CSS από components class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateComponentsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Components Panel Base CSS
   * @returns {string} - Components panel base CSS
   */
  static generateComponentsPanelBaseCSS() {
    let css = '/* COMPONENTS PANEL BASE STYLES */\n';
    css += this.generateComponentsCSS(COMPONENTS_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Component Categories CSS
   * @returns {string} - Component categories CSS
   */
  static generateComponentCategoriesCSS() {
    let css = '/* COMPONENT CATEGORIES STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_CATEGORIES_STYLES);
    return css;
  }

  /**
   * Generates Component Items Grid CSS
   * @returns {string} - Component items grid CSS
   */
  static generateComponentItemsGridCSS() {
    let css = '/* COMPONENT ITEMS GRID STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_ITEMS_GRID_STYLES);
    return css;
  }

  /**
   * Generates Component Preview CSS
   * @returns {string} - Component preview CSS
   */
  static generateComponentPreviewCSS() {
    let css = '/* COMPONENT PREVIEW STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Component Actions CSS
   * @returns {string} - Component actions CSS
   */
  static generateComponentActionsCSS() {
    let css = '/* COMPONENT ACTIONS STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_ACTIONS_STYLES);
    return css;
  }

  /**
   * Generates Component Search CSS
   * @returns {string} - Component search CSS
   */
  static generateComponentSearchCSS() {
    let css = '/* COMPONENT SEARCH STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_SEARCH_STYLES);
    return css;
  }

  /**
   * Generates Component Properties CSS
   * @returns {string} - Component properties CSS
   */
  static generateComponentPropertiesCSS() {
    let css = '/* COMPONENT PROPERTIES STYLES */\n';
    css += this.generateComponentsCSS(COMPONENT_PROPERTIES_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Components CSS classes
   * @returns {string} - Complete components CSS
   */
  static generateAllComponentsCSS() {
    let css = '/* === RIGHT SIDEBAR: COMPONENTS === */\n\n';

    css += this.generateComponentsPanelBaseCSS();
    css += this.generateComponentCategoriesCSS();
    css += this.generateComponentItemsGridCSS();
    css += this.generateComponentPreviewCSS();
    css += this.generateComponentActionsCSS();
    css += this.generateComponentSearchCSS();
    css += this.generateComponentPropertiesCSS();

    return css;
  }

  /**
   * Gets όλες τις available components classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllComponentsClasses() {
    return {
      ...COMPONENTS_PANEL_BASE_STYLES,
      ...COMPONENT_CATEGORIES_STYLES,
      ...COMPONENT_ITEMS_GRID_STYLES,
      ...COMPONENT_PREVIEW_STYLES,
      ...COMPONENT_ACTIONS_STYLES,
      ...COMPONENT_SEARCH_STYLES,
      ...COMPONENT_PROPERTIES_STYLES
    };
  }

  /**
   * Gets specific components category
   * @param {string} category - Category (panelBase, categories, itemsGrid, preview, actions, search, properties)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getComponentsCategory(category) {
    const categories = {
      panelBase: COMPONENTS_PANEL_BASE_STYLES,
      categories: COMPONENT_CATEGORIES_STYLES,
      itemsGrid: COMPONENT_ITEMS_GRID_STYLES,
      preview: COMPONENT_PREVIEW_STYLES,
      actions: COMPONENT_ACTIONS_STYLES,
      search: COMPONENT_SEARCH_STYLES,
      properties: COMPONENT_PROPERTIES_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι components classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateComponentsClasses() {
    try {
      const allClasses = this.getAllComponentsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid components class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for components class: ${className}`);
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
      console.error('Components classes validation failed:', error.message);
      return false;
    }
  }
}

export default ComponentsBuilder;