/**
 * PresetThemesBuilder.js - Right Sidebar Preset Themes Builder
 *
 * Single Responsibility: Μόνο preset themes controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/preset-themes.html
 */

/**
 * Preset Themes Panel Base Styles
 */
export const PRESET_THEMES_PANEL_BASE_STYLES = {
  'layera-preset-themes-panel': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-preset-themes-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Theme Categories Tabs Styles
 */
export const THEME_CATEGORIES_TABS_STYLES = {
  'layera-theme-categories-tabs': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    marginBottom: 'var(--layera-space-4)',
    padding: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-theme-category-tab': {
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
  'layera-theme-category-tab:hover': {
    background: 'white',
    color: 'var(--layera-color-primary)'
  },
  'layera-theme-category-tab--active': {
    background: 'white',
    color: 'var(--layera-color-primary)',
    fontWeight: 'var(--layera-font-weight-medium)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

/**
 * Preset Themes Grid Styles
 */
export const PRESET_THEMES_GRID_STYLES = {
  'layera-preset-themes-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--layera-space-3)',
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-preset-theme-card': {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  'layera-preset-theme-card:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  'layera-preset-theme-card--selected': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)15',
    boxShadow: '0 0 0 2px var(--layera-color-primary)30'
  },
  'layera-preset-theme-preview': {
    height: '60px',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-2)',
    display: 'flex',
    overflow: 'hidden'
  },
  'layera-preset-theme-color': {
    flex: '1',
    transition: 'transform 0.2s ease'
  },
  'layera-preset-theme-color:hover': {
    transform: 'scaleX(1.1)',
    zIndex: '1'
  }
};

/**
 * Theme Information Styles
 */
export const THEME_INFORMATION_STYLES = {
  'layera-preset-theme-info': {
    textAlign: 'center'
  },
  'layera-preset-theme-name': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-1)'
  },
  'layera-preset-theme-description': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    lineHeight: '1.3'
  },
  'layera-preset-theme-tags': {
    display: 'flex',
    gap: 'var(--layera-space-1)',
    justifyContent: 'center',
    marginTop: 'var(--layera-space-2)',
    flexWrap: 'wrap'
  },
  'layera-preset-theme-tag': {
    padding: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.8'
  }
};

/**
 * Theme Actions Styles
 */
export const THEME_ACTIONS_STYLES = {
  'layera-preset-theme-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-theme-action-btn': {
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
  'layera-theme-action-btn:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-theme-action-btn--primary': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  },
  'layera-theme-action-btn--primary:hover': {
    opacity: '0.9'
  }
};

/**
 * Custom Theme Creator Styles
 */
export const CUSTOM_THEME_CREATOR_STYLES = {
  'layera-custom-theme-creator': {
    border: '2px dashed var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-4)',
    textAlign: 'center',
    marginBottom: 'var(--layera-space-4)',
    transition: 'all 0.2s ease'
  },
  'layera-custom-theme-creator:hover': {
    borderColor: 'var(--layera-color-primary)',
    background: 'var(--layera-color-primary)05'
  },
  'layera-custom-theme-creator-icon': {
    fontSize: 'var(--layera-font-size-lg)',
    color: 'var(--layera-color-primary)',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-custom-theme-creator-text': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)',
    marginBottom: 'var(--layera-space-1)'
  },
  'layera-custom-theme-creator-subtitle': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7'
  }
};

/**
 * Theme Search και Filters
 */
export const THEME_SEARCH_FILTERS_STYLES = {
  'layera-theme-search-section': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-theme-search-input': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-theme-search-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  },
  'layera-theme-search-input::placeholder': {
    color: 'var(--layera-sidebar-text)',
    opacity: '0.6'
  },
  'layera-theme-filters': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--layera-space-1)'
  },
  'layera-theme-filter-chip': {
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  'layera-theme-filter-chip:hover': {
    borderColor: 'var(--layera-color-primary)',
    color: 'var(--layera-color-primary)'
  },
  'layera-theme-filter-chip--active': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)'
  }
};

/**
 * Current Theme Display Styles
 */
export const CURRENT_THEME_DISPLAY_STYLES = {
  'layera-current-theme-display': {
    background: 'var(--layera-color-primary)10',
    border: '1px solid var(--layera-color-primary)30',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    marginTop: 'var(--layera-space-4)'
  },
  'layera-current-theme-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-color-primary)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-current-theme-info': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-current-theme-colors': {
    display: 'flex',
    height: '20px',
    borderRadius: 'var(--layera-radius-xs)',
    overflow: 'hidden',
    flex: '1'
  },
  'layera-current-theme-color': {
    flex: '1'
  },
  'layera-current-theme-name': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-color-primary)'
  }
};

/**
 * PresetThemesBuilder Class - Enterprise Preset Themes CSS Generation
 */
export class PresetThemesBuilder {
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
   * Generates CSS από preset themes class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generatePresetThemesCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Preset Themes Panel Base CSS
   * @returns {string} - Preset themes panel base CSS
   */
  static generatePresetThemesPanelBaseCSS() {
    let css = '/* PRESET THEMES PANEL BASE STYLES */\n';
    css += this.generatePresetThemesCSS(PRESET_THEMES_PANEL_BASE_STYLES);
    return css;
  }

  /**
   * Generates Theme Categories Tabs CSS
   * @returns {string} - Theme categories tabs CSS
   */
  static generateThemeCategoriesTabsCSS() {
    let css = '/* THEME CATEGORIES TABS STYLES */\n';
    css += this.generatePresetThemesCSS(THEME_CATEGORIES_TABS_STYLES);
    return css;
  }

  /**
   * Generates Preset Themes Grid CSS
   * @returns {string} - Preset themes grid CSS
   */
  static generatePresetThemesGridCSS() {
    let css = '/* PRESET THEMES GRID STYLES */\n';
    css += this.generatePresetThemesCSS(PRESET_THEMES_GRID_STYLES);
    return css;
  }

  /**
   * Generates Theme Information CSS
   * @returns {string} - Theme information CSS
   */
  static generateThemeInformationCSS() {
    let css = '/* THEME INFORMATION STYLES */\n';
    css += this.generatePresetThemesCSS(THEME_INFORMATION_STYLES);
    return css;
  }

  /**
   * Generates Theme Actions CSS
   * @returns {string} - Theme actions CSS
   */
  static generateThemeActionsCSS() {
    let css = '/* THEME ACTIONS STYLES */\n';
    css += this.generatePresetThemesCSS(THEME_ACTIONS_STYLES);
    return css;
  }

  /**
   * Generates Custom Theme Creator CSS
   * @returns {string} - Custom theme creator CSS
   */
  static generateCustomThemeCreatorCSS() {
    let css = '/* CUSTOM THEME CREATOR STYLES */\n';
    css += this.generatePresetThemesCSS(CUSTOM_THEME_CREATOR_STYLES);
    return css;
  }

  /**
   * Generates Theme Search Filters CSS
   * @returns {string} - Theme search filters CSS
   */
  static generateThemeSearchFiltersCSS() {
    let css = '/* THEME SEARCH FILTERS STYLES */\n';
    css += this.generatePresetThemesCSS(THEME_SEARCH_FILTERS_STYLES);
    return css;
  }

  /**
   * Generates Current Theme Display CSS
   * @returns {string} - Current theme display CSS
   */
  static generateCurrentThemeDisplayCSS() {
    let css = '/* CURRENT THEME DISPLAY STYLES */\n';
    css += this.generatePresetThemesCSS(CURRENT_THEME_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Preset Themes CSS classes
   * @returns {string} - Complete preset themes CSS
   */
  static generateAllPresetThemesCSS() {
    let css = '/* === RIGHT SIDEBAR: PRESET THEMES === */\n\n';

    css += this.generatePresetThemesPanelBaseCSS();
    css += this.generateThemeCategoriesTabsCSS();
    css += this.generatePresetThemesGridCSS();
    css += this.generateThemeInformationCSS();
    css += this.generateThemeActionsCSS();
    css += this.generateCustomThemeCreatorCSS();
    css += this.generateThemeSearchFiltersCSS();
    css += this.generateCurrentThemeDisplayCSS();

    return css;
  }

  /**
   * Gets όλες τις available preset themes classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllPresetThemesClasses() {
    return {
      ...PRESET_THEMES_PANEL_BASE_STYLES,
      ...THEME_CATEGORIES_TABS_STYLES,
      ...PRESET_THEMES_GRID_STYLES,
      ...THEME_INFORMATION_STYLES,
      ...THEME_ACTIONS_STYLES,
      ...CUSTOM_THEME_CREATOR_STYLES,
      ...THEME_SEARCH_FILTERS_STYLES,
      ...CURRENT_THEME_DISPLAY_STYLES
    };
  }

  /**
   * Gets specific preset themes category
   * @param {string} category - Category (panelBase, categoriesTabs, themesGrid, themeInfo, themeActions, customCreator, searchFilters, currentDisplay)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getPresetThemesCategory(category) {
    const categories = {
      panelBase: PRESET_THEMES_PANEL_BASE_STYLES,
      categoriesTabs: THEME_CATEGORIES_TABS_STYLES,
      themesGrid: PRESET_THEMES_GRID_STYLES,
      themeInfo: THEME_INFORMATION_STYLES,
      themeActions: THEME_ACTIONS_STYLES,
      customCreator: CUSTOM_THEME_CREATOR_STYLES,
      searchFilters: THEME_SEARCH_FILTERS_STYLES,
      currentDisplay: CURRENT_THEME_DISPLAY_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι preset themes classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validatePresetThemesClasses() {
    try {
      const allClasses = this.getAllPresetThemesClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid preset themes class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for preset themes class: ${className}`);
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
      console.error('Preset themes classes validation failed:', error.message);
      return false;
    }
  }
}

export default PresetThemesBuilder;