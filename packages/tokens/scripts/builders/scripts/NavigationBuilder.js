/**
 * NavigationBuilder.js - Navigation JavaScript Support Builder
 *
 * Single Responsibility: Μόνο navigation JavaScript functionality CSS support
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/scripts/navigation.html
 */

/**
 * Tab Navigation Base Styles
 */
export const TAB_NAVIGATION_BASE_STYLES = {
  'layera-tab-container': {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-space-4)',
    background: 'var(--layera-color-surface)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-tab-buttons-row': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    borderBottom: '1px solid var(--layera-color-border)',
    paddingBottom: 'var(--layera-space-2)'
  },
  'layera-tab-button': {
    padding: 'var(--layera-space-2) var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'var(--layera-color-surface)',
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none'
  },
  'layera-tab-button:hover': {
    background: 'var(--layera-color-primary)10',
    borderColor: 'var(--layera-color-primary)',
    transform: 'translateY(-1px)'
  },
  'layera-tab-button.active-tab': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 2px 4px var(--layera-color-primary)40'
  }
};

/**
 * Tab Pane Display Styles
 */
export const TAB_PANE_DISPLAY_STYLES = {
  'layera-tab-content': {
    minHeight: '200px',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-tab-pane': {
    display: 'none',
    animation: 'fadeOut 0.2s ease',
    padding: 'var(--layera-space-4)',
    background: 'var(--layera-color-background)',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-tab-pane.active-pane': {
    display: 'block',
    animation: 'fadeIn 0.3s ease'
  }
};

/**
 * Layout Tab Switching Styles
 */
export const LAYOUT_TAB_SWITCHING_STYLES = {
  'layera-layout-controls .tab-pane': {
    background: 'var(--layera-color-surface)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-layout-controls .tab-button': {
    minWidth: '100px',
    textAlign: 'center',
    position: 'relative'
  },
  'layera-layout-controls .tab-button::after': {
    content: '""',
    position: 'absolute',
    bottom: '-3px',
    left: '0',
    width: '100%',
    height: '2px',
    background: 'var(--layera-color-primary)',
    transform: 'scaleX(0)',
    transition: 'transform 0.2s ease'
  },
  'layera-layout-controls .tab-button.active-tab::after': {
    transform: 'scaleX(1)'
  }
};

/**
 * Modal Tab Switching Styles
 */
export const MODAL_TAB_SWITCHING_STYLES = {
  'layera-modals-section .tab-pane': {
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, var(--layera-color-background) 100%)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-lg)',
    padding: 'var(--layera-space-6)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  'layera-modals-section .tab-button': {
    border: '2px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  },
  'layera-modals-section .tab-button:hover': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
  },
  'layera-modals-section .tab-button.active-tab': {
    background: 'linear-gradient(45deg, var(--layera-color-primary) 0%, var(--layera-color-secondary) 100%)',
    borderColor: 'var(--layera-color-primary)'
  }
};

/**
 * Cards Tab Switching Styles
 */
export const CARDS_TAB_SWITCHING_STYLES = {
  'layera-cards-section .tab-pane': {
    background: 'var(--layera-color-background)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    position: 'relative'
  },
  'layera-cards-section .tab-pane::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '4px',
    height: '100%',
    background: 'var(--layera-color-primary)',
    borderRadius: '0 var(--layera-radius-sm) var(--layera-radius-sm) 0'
  },
  'layera-cards-section .tab-button': {
    borderRadius: 'var(--layera-radius-sm)',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-cards-section .tab-button::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, var(--layera-color-primary)20, transparent)',
    transition: 'left 0.5s ease'
  },
  'layera-cards-section .tab-button.active-tab::before': {
    left: '100%'
  }
};

/**
 * Tables Tab Switching Styles
 */
export const TABLES_TAB_SWITCHING_STYLES = {
  'layera-tables-section .tab-pane': {
    background: 'var(--layera-color-surface)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    padding: 'var(--layera-space-4)',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
  },
  'layera-tables-section .tab-button': {
    borderRadius: 'var(--layera-radius-sm)',
    fontFamily: 'var(--layera-font-family-mono)',
    fontSize: 'var(--layera-font-size-xs)',
    letterSpacing: '0.5px'
  },
  'layera-tables-section .tab-button.active-tab': {
    background: 'var(--layera-color-success)',
    color: 'white',
    borderColor: 'var(--layera-color-success)',
    fontWeight: 'var(--layera-font-weight-bold)'
  },
  'layera-tables-section .tab-button:hover': {
    background: 'var(--layera-color-success)10',
    borderColor: 'var(--layera-color-success)'
  }
};

/**
 * Header Color Change Styles
 */
export const HEADER_COLOR_CHANGE_STYLES = {
  'layera-header-buttons': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    padding: 'var(--layera-space-3)',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 'var(--layera-radius-md)',
    backdropFilter: 'blur(10px)'
  },
  'layera-header-color-btn': {
    width: '40px',
    height: '40px',
    border: '2px solid transparent',
    borderRadius: 'var(--layera-radius-full)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  'layera-header-color-btn:hover': {
    transform: 'scale(1.1)',
    borderColor: 'white',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
  },
  'layera-header-color-btn.active': {
    transform: 'scale(1.15)',
    borderColor: 'white',
    boxShadow: '0 0 0 4px rgba(255,255,255,0.3)'
  },
  'layera-header-color-btn--primary': {
    background: '#4A90E2'
  },
  'layera-header-color-btn--secondary': {
    background: '#9013FE'
  },
  'layera-header-color-btn--success': {
    background: '#4CAF50'
  },
  'layera-header-color-btn--warning': {
    background: '#FF9800'
  },
  'layera-header-color-btn--danger': {
    background: '#F44336'
  },
  'layera-header-color-btn--info': {
    background: '#2196F3'
  }
};

/**
 * Tab Animation Effects Styles
 */
export const TAB_ANIMATION_EFFECTS_STYLES = {
  '@keyframes fadeIn': {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  '@keyframes fadeOut': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-10px)' }
  },
  '@keyframes slideIn': {
    '0%': { opacity: '0', transform: 'translateX(-20px)' },
    '100%': { opacity: '1', transform: 'translateX(0)' }
  },
  '@keyframes slideOut': {
    '0%': { opacity: '1', transform: 'translateX(0)' },
    '100%': { opacity: '0', transform: 'translateX(20px)' }
  }
};

/**
 * Navigation State Indicators Styles
 */
export const NAVIGATION_STATE_INDICATORS_STYLES = {
  'layera-nav-indicator': {
    position: 'absolute',
    top: '50%',
    right: 'var(--layera-space-2)',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: 'var(--layera-radius-full)',
    background: 'var(--layera-color-success)',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  },
  'layera-tab-button.active-tab .layera-nav-indicator': {
    opacity: '1'
  },
  'layera-nav-breadcrumb': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-text-muted)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-nav-breadcrumb-item': {
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  },
  'layera-nav-breadcrumb-item:hover': {
    color: 'var(--layera-color-primary)'
  },
  'layera-nav-breadcrumb-separator': {
    fontSize: 'var(--layera-font-size-xs)',
    opacity: '0.6'
  }
};

/**
 * Navigation Error Handling Styles
 */
export const NAVIGATION_ERROR_HANDLING_STYLES = {
  'layera-nav-error-toast': {
    position: 'fixed',
    top: 'var(--layera-space-4)',
    right: 'var(--layera-space-4)',
    background: 'var(--layera-color-danger)',
    color: 'white',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards'
  },
  'layera-nav-loading-state': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-2)',
    padding: 'var(--layera-space-4)',
    color: 'var(--layera-text-muted)',
    fontSize: 'var(--layera-font-size-sm)'
  },
  'layera-nav-loading-spinner': {
    width: '16px',
    height: '16px',
    border: '2px solid var(--layera-color-border)',
    borderTop: '2px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-full)',
    animation: 'spin 1s linear infinite'
  },
  '@keyframes slideInRight': {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  },
  '@keyframes slideOutRight': {
    '0%': { transform: 'translateX(0)', opacity: '1' },
    '100%': { transform: 'translateX(100%)', opacity: '0' }
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

/**
 * NavigationBuilder Class - Enterprise Navigation JavaScript Support CSS Generation
 */
export class NavigationBuilder {
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
   * Generates CSS από navigation class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateNavigationCSS(classDefinitions) {
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
   * Generates Tab Navigation Base CSS
   * @returns {string} - Tab navigation base CSS
   */
  static generateTabNavigationBaseCSS() {
    let css = '/* TAB NAVIGATION BASE STYLES */\n';
    css += this.generateNavigationCSS(TAB_NAVIGATION_BASE_STYLES);
    return css;
  }

  /**
   * Generates Tab Pane Display CSS
   * @returns {string} - Tab pane display CSS
   */
  static generateTabPaneDisplayCSS() {
    let css = '/* TAB PANE DISPLAY STYLES */\n';
    css += this.generateNavigationCSS(TAB_PANE_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates Layout Tab Switching CSS
   * @returns {string} - Layout tab switching CSS
   */
  static generateLayoutTabSwitchingCSS() {
    let css = '/* LAYOUT TAB SWITCHING STYLES */\n';
    css += this.generateNavigationCSS(LAYOUT_TAB_SWITCHING_STYLES);
    return css;
  }

  /**
   * Generates Modal Tab Switching CSS
   * @returns {string} - Modal tab switching CSS
   */
  static generateModalTabSwitchingCSS() {
    let css = '/* MODAL TAB SWITCHING STYLES */\n';
    css += this.generateNavigationCSS(MODAL_TAB_SWITCHING_STYLES);
    return css;
  }

  /**
   * Generates Cards Tab Switching CSS
   * @returns {string} - Cards tab switching CSS
   */
  static generateCardsTabSwitchingCSS() {
    let css = '/* CARDS TAB SWITCHING STYLES */\n';
    css += this.generateNavigationCSS(CARDS_TAB_SWITCHING_STYLES);
    return css;
  }

  /**
   * Generates Tables Tab Switching CSS
   * @returns {string} - Tables tab switching CSS
   */
  static generateTablesTabSwitchingCSS() {
    let css = '/* TABLES TAB SWITCHING STYLES */\n';
    css += this.generateNavigationCSS(TABLES_TAB_SWITCHING_STYLES);
    return css;
  }

  /**
   * Generates Header Color Change CSS
   * @returns {string} - Header color change CSS
   */
  static generateHeaderColorChangeCSS() {
    let css = '/* HEADER COLOR CHANGE STYLES */\n';
    css += this.generateNavigationCSS(HEADER_COLOR_CHANGE_STYLES);
    return css;
  }

  /**
   * Generates Tab Animation Effects CSS
   * @returns {string} - Tab animation effects CSS
   */
  static generateTabAnimationEffectsCSS() {
    let css = '/* TAB ANIMATION EFFECTS STYLES */\n';
    css += this.generateNavigationCSS(TAB_ANIMATION_EFFECTS_STYLES);
    return css;
  }

  /**
   * Generates Navigation State Indicators CSS
   * @returns {string} - Navigation state indicators CSS
   */
  static generateNavigationStateIndicatorsCSS() {
    let css = '/* NAVIGATION STATE INDICATORS STYLES */\n';
    css += this.generateNavigationCSS(NAVIGATION_STATE_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Navigation Error Handling CSS
   * @returns {string} - Navigation error handling CSS
   */
  static generateNavigationErrorHandlingCSS() {
    let css = '/* NAVIGATION ERROR HANDLING STYLES */\n';
    css += this.generateNavigationCSS(NAVIGATION_ERROR_HANDLING_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Navigation CSS classes
   * @returns {string} - Complete navigation CSS
   */
  static generateAllNavigationCSS() {
    let css = '/* === NAVIGATION JAVASCRIPT SUPPORT === */\n\n';

    css += this.generateTabNavigationBaseCSS();
    css += this.generateTabPaneDisplayCSS();
    css += this.generateLayoutTabSwitchingCSS();
    css += this.generateModalTabSwitchingCSS();
    css += this.generateCardsTabSwitchingCSS();
    css += this.generateTablesTabSwitchingCSS();
    css += this.generateHeaderColorChangeCSS();
    css += this.generateTabAnimationEffectsCSS();
    css += this.generateNavigationStateIndicatorsCSS();
    css += this.generateNavigationErrorHandlingCSS();

    return css;
  }

  /**
   * Gets όλες τις available navigation classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllNavigationClasses() {
    return {
      ...TAB_NAVIGATION_BASE_STYLES,
      ...TAB_PANE_DISPLAY_STYLES,
      ...LAYOUT_TAB_SWITCHING_STYLES,
      ...MODAL_TAB_SWITCHING_STYLES,
      ...CARDS_TAB_SWITCHING_STYLES,
      ...TABLES_TAB_SWITCHING_STYLES,
      ...HEADER_COLOR_CHANGE_STYLES,
      ...TAB_ANIMATION_EFFECTS_STYLES,
      ...NAVIGATION_STATE_INDICATORS_STYLES,
      ...NAVIGATION_ERROR_HANDLING_STYLES
    };
  }

  /**
   * Gets specific navigation category
   * @param {string} category - Category (tabBase, tabPane, layoutTab, modalTab, cardsTab, tablesTab, headerColor, animations, stateIndicators, errorHandling)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getNavigationCategory(category) {
    const categories = {
      tabBase: TAB_NAVIGATION_BASE_STYLES,
      tabPane: TAB_PANE_DISPLAY_STYLES,
      layoutTab: LAYOUT_TAB_SWITCHING_STYLES,
      modalTab: MODAL_TAB_SWITCHING_STYLES,
      cardsTab: CARDS_TAB_SWITCHING_STYLES,
      tablesTab: TABLES_TAB_SWITCHING_STYLES,
      headerColor: HEADER_COLOR_CHANGE_STYLES,
      animations: TAB_ANIMATION_EFFECTS_STYLES,
      stateIndicators: NAVIGATION_STATE_INDICATORS_STYLES,
      errorHandling: NAVIGATION_ERROR_HANDLING_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι navigation classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateNavigationClasses() {
    try {
      const allClasses = this.getAllNavigationClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid navigation class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for navigation class: ${className}`);
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
      console.error('Navigation classes validation failed:', error.message);
      return false;
    }
  }
}

export default NavigationBuilder;