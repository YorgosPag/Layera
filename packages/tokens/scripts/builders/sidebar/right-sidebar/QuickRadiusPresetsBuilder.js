/**
 * QuickRadiusPresetsBuilder.js - Right Sidebar Quick Radius Presets Builder
 *
 * Single Responsibility: Μόνο quick radius presets controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/quick-radius-presets.html
 */

/**
 * Quick Radius Presets Panel Base Styles
 */
export const QUICK_RADIUS_PRESETS_PANEL_BASE_STYLES = {
  'layera-quick-radius-presets-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-quick-radius-presets-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Quick Radius Presets Grid Styles
 */
export const QUICK_RADIUS_PRESETS_GRID_STYLES = {
  'layera-quick-radius-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-quick-radius-preset': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '80px',
    justifyContent: 'center'
  },
  'layera-quick-radius-preset:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05',
    transform: 'translateY(-1px)'
  },
  'layera-quick-radius-preset--selected': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)15',
    color: 'var(--layera-color-primary)'
  },
  'layera-quick-radius-preview': {
    width: '32px',
    height: '32px',
    background: 'var(--layera-color-primary)',
    marginBottom: 'var(--layera-space-1)',
    transition: 'border-radius 0.2s ease'
  },
  'layera-quick-radius-label': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-medium)',
    textAlign: 'center',
    lineHeight: '1.2'
  },
  'layera-quick-radius-value': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginTop: 'var(--layera-space-1)'
  }
};

/**
 * Radius Categories Styles
 */
export const RADIUS_CATEGORIES_STYLES = {
  'layera-radius-categories': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    marginBottom: 'var(--layera-space-3)',
    padding: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-radius-category-btn': {
    flex: '1',
    padding: 'var(--layera-space-2)',
    border: 'none',
    borderRadius: 'var(--layera-radius-xs)',
    background: 'transparent',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  'layera-radius-category-btn:hover': {
    background: 'white',
    color: 'var(--layera-color-primary)'
  },
  'layera-radius-category-btn--active': {
    background: 'white',
    color: 'var(--layera-color-primary)',
    fontWeight: 'var(--layera-font-weight-medium)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

/**
 * Custom Quick Radius Input Styles
 */
export const CUSTOM_QUICK_RADIUS_INPUT_STYLES = {
  'layera-custom-quick-radius-section': {
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    border: '1px dashed var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-custom-quick-radius-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'block',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-custom-quick-radius-input': {
    width: '100%',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    textAlign: 'center',
    fontFamily: 'monospace'
  },
  'layera-custom-quick-radius-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-custom-quick-radius-preview': {
    width: '40px',
    height: '40px',
    background: 'var(--layera-color-primary)',
    margin: 'var(--layera-space-2) auto',
    transition: 'border-radius 0.3s ease'
  }
};

/**
 * Radius Apply Actions Styles
 */
export const RADIUS_APPLY_ACTIONS_STYLES = {
  'layera-radius-apply-section': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'rgba(0,0,0,0.03)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-radius-apply-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)'
  },
  'layera-radius-apply-btn': {
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
  'layera-radius-apply-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-radius-apply-btn--primary': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-radius-apply-btn--primary:hover': {
    opacity: '0.9'
  }
};

/**
 * Radius Favorites Styles
 */
export const RADIUS_FAVORITES_STYLES = {
  'layera-radius-favorites-section': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-radius-favorites-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-radius-favorites-list': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--layera-space-1)'
  },
  'layera-radius-favorite-chip': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-radius-favorite-chip:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-radius-favorite-preview': {
    width: '12px',
    height: '12px',
    background: 'var(--layera-color-primary)',
    borderRadius: 'inherit'
  },
  'layera-radius-favorite-remove': {
    marginLeft: 'var(--layera-space-1)',
    color: 'var(--layera-color-danger)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-xs)'
  }
};

/**
 * Recent Radius Values Styles
 */
export const RECENT_RADIUS_VALUES_STYLES = {
  'layera-recent-radius-section': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-recent-radius-title': {
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-recent-radius-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-1)'
  },
  'layera-recent-radius-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--layera-space-2)',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-recent-radius-item:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05'
  },
  'layera-recent-radius-value': {
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-recent-radius-time': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.6'
  }
};

/**
 * QuickRadiusPresetsBuilder Class - Enterprise Quick Radius Presets CSS Generation
 */
export class QuickRadiusPresetsBuilder {
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
   * Generates CSS από quick radius presets class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateQuickRadiusPresetsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Quick Radius Presets Panel Base CSS
   * @returns {string} - Quick radius presets panel base CSS
   */
  static generateQuickRadiusPresetsPanelBaseCSS() {
    let css = '/* QUICK RADIUS PRESETS PANEL BASE STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(QUICK_RADIUS_PRESETS_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Quick Radius Presets Grid CSS
   * @returns {string} - Quick radius presets grid CSS
   */
  static generateQuickRadiusPresetsGridCSS() {
    let css = '/* QUICK RADIUS PRESETS GRID STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(QUICK_RADIUS_PRESETS_GRID_STYLES);
    return css;
  }

  /**
   * Generates Radius Categories CSS
   * @returns {string} - Radius categories CSS
   */
  static generateRadiusCategoriesCSS() {
    let css = '/* RADIUS CATEGORIES STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(RADIUS_CATEGORIES_STYLES);
    return css;
  }

  /**
   * Generates Custom Quick Radius Input CSS
   * @returns {string} - Custom quick radius input CSS
   */
  static generateCustomQuickRadiusInputCSS() {
    let css = '/* CUSTOM QUICK RADIUS INPUT STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(CUSTOM_QUICK_RADIUS_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Radius Apply Actions CSS
   * @returns {string} - Radius apply actions CSS
   */
  static generateRadiusApplyActionsCSS() {
    let css = '/* RADIUS APPLY ACTIONS STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(RADIUS_APPLY_ACTIONS_STYLES);
    return css;
  }

  /**
   * Generates Radius Favorites CSS
   * @returns {string} - Radius favorites CSS
   */
  static generateRadiusFavoritesCSS() {
    let css = '/* RADIUS FAVORITES STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(RADIUS_FAVORITES_STYLES);
    return css;
  }

  /**
   * Generates Recent Radius Values CSS
   * @returns {string} - Recent radius values CSS
   */
  static generateRecentRadiusValuesCSS() {
    let css = '/* RECENT RADIUS VALUES STYLES */\n';
    css += this.generateQuickRadiusPresetsCSS(RECENT_RADIUS_VALUES_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Quick Radius Presets CSS classes
   * @returns {string} - Complete quick radius presets CSS
   */
  static generateAllQuickRadiusPresetsCSS() {
    let css = '/* === RIGHT SIDEBAR: QUICK RADIUS PRESETS === */\n\n';

    css += this.generateQuickRadiusPresetsPanelBaseCSS();
    css += this.generateQuickRadiusPresetsGridCSS();
    css += this.generateRadiusCategoriesCSS();
    css += this.generateCustomQuickRadiusInputCSS();
    css += this.generateRadiusApplyActionsCSS();
    css += this.generateRadiusFavoritesCSS();
    css += this.generateRecentRadiusValuesCSS();

    return css;
  }

  /**
   * Gets όλες τις available quick radius presets classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllQuickRadiusPresetsClasses() {
    return {
      ...QUICK_RADIUS_PRESETS_PANEL_BASE_STYLES,
      ...QUICK_RADIUS_PRESETS_GRID_STYLES,
      ...RADIUS_CATEGORIES_STYLES,
      ...CUSTOM_QUICK_RADIUS_INPUT_STYLES,
      ...RADIUS_APPLY_ACTIONS_STYLES,
      ...RADIUS_FAVORITES_STYLES,
      ...RECENT_RADIUS_VALUES_STYLES
    };
  }

  /**
   * Gets specific quick radius presets category
   * @param {string} category - Category (panelBase, presetsGrid, categories, customInput, applyActions, favorites, recentValues)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getQuickRadiusPresetsCategory(category) {
    const categories = {
      panelBase: QUICK_RADIUS_PRESETS_PANEL_BASE_STYLES,
      presetsGrid: QUICK_RADIUS_PRESETS_GRID_STYLES,
      categories: RADIUS_CATEGORIES_STYLES,
      customInput: CUSTOM_QUICK_RADIUS_INPUT_STYLES,
      applyActions: RADIUS_APPLY_ACTIONS_STYLES,
      favorites: RADIUS_FAVORITES_STYLES,
      recentValues: RECENT_RADIUS_VALUES_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι quick radius presets classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateQuickRadiusPresetsClasses() {
    try {
      const allClasses = this.getAllQuickRadiusPresetsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid quick radius presets class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for quick radius presets class: ${className}`);
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
      console.error('Quick radius presets classes validation failed:', error.message);
      return false;
    }
  }
}

export default QuickRadiusPresetsBuilder;