/**
 * AppCoreBuilder.js - App Core JavaScript UI States Builder
 *
 * Single Responsibility: Μόνο app core JavaScript UI states και support CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/scripts/app-core.html
 */

/**
 * Component Loading States Styles
 */
export const COMPONENT_LOADING_STATES_STYLES = {
  'layera-loading-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--layera-space-6)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7'
  },
  'layera-loading-spinner': {
    width: '20px',
    height: '20px',
    border: '2px solid var(--layera-color-border)',
    borderTop: '2px solid var(--layera-color-primary)',
    borderRadius: '50%',
    animation: 'layera-spin 1s linear infinite',
    marginRight: 'var(--layera-space-2)'
  },
  'layera-loading-text': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-sidebar-text)',
    fontWeight: 'var(--layera-font-weight-medium)'
  }
};

/**
 * Component Error States Styles
 */
export const COMPONENT_ERROR_STATES_STYLES = {
  'layera-error-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--layera-space-4)',
    background: 'var(--layera-color-danger)10',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-danger)30',
    margin: 'var(--layera-space-2)'
  },
  'layera-error-icon': {
    fontSize: 'var(--layera-font-size-md)',
    color: 'var(--layera-color-danger)',
    marginRight: 'var(--layera-space-2)'
  },
  'layera-error-text': {
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-danger)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-error-url': {
    fontFamily: 'monospace',
    background: 'var(--layera-color-danger)15',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-xs)',
    marginLeft: 'var(--layera-space-1)'
  }
};

/**
 * Sidebar Toggle Button Styles
 */
export const SIDEBAR_TOGGLE_BUTTON_STYLES = {
  'layera-sidebar-toggle': {
    padding: 'var(--layera-space-2)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-sidebar-toggle:hover': {
    background: 'rgba(255,255,255,0.25)',
    borderColor: 'rgba(255,255,255,0.4)',
    transform: 'translateY(-1px)'
  },
  'layera-sidebar-toggle--active': {
    background: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.5)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  'layera-sidebar-toggle--left': {
    borderRadius: 'var(--layera-radius-sm) 0 0 var(--layera-radius-sm)'
  },
  'layera-sidebar-toggle--right': {
    borderRadius: '0 var(--layera-radius-sm) var(--layera-radius-sm) 0'
  }
};

/**
 * Component Loading Success States Styles
 */
export const COMPONENT_SUCCESS_STATES_STYLES = {
  'layera-success-indicator': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    color: 'var(--layera-color-success)',
    fontSize: 'var(--layera-font-size-xs)',
    opacity: '0.8',
    animation: 'layera-fade-in 0.3s ease'
  },
  'layera-success-icon': {
    fontSize: 'var(--layera-font-size-sm)'
  },
  'layera-component-loaded': {
    borderLeft: '3px solid var(--layera-color-success)',
    paddingLeft: 'var(--layera-space-2)',
    background: 'var(--layera-color-success)05',
    borderRadius: '0 var(--layera-radius-sm) var(--layera-radius-sm) 0'
  }
};

/**
 * Component Containers Styles
 */
export const COMPONENT_CONTAINERS_STYLES = {
  'layera-component-container': {
    minHeight: '40px',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  'layera-component-container--loading': {
    background: 'var(--layera-color-muted)05',
    borderRadius: 'var(--layera-radius-sm)'
  },
  'layera-component-container--loaded': {
    background: 'transparent'
  },
  'layera-component-container--error': {
    background: 'var(--layera-color-danger)05',
    borderRadius: 'var(--layera-radius-sm)',
    border: '1px solid var(--layera-color-danger)20'
  }
};

/**
 * Dynamic Component Loading Styles
 */
export const DYNAMIC_COMPONENT_LOADING_STYLES = {
  'layera-dynamic-loader': {
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-dynamic-loader::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, var(--layera-color-primary), transparent)',
    animation: 'layera-loading-slide 2s infinite'
  },
  'layera-async-component': {
    opacity: '0',
    transform: 'translateY(10px)',
    transition: 'all 0.4s ease'
  },
  'layera-async-component--loaded': {
    opacity: '1',
    transform: 'translateY(0)'
  }
};

/**
 * Console Logging Styles (for debugging UI)
 */
export const CONSOLE_LOGGING_STYLES = {
  'layera-debug-console': {
    position: 'fixed',
    bottom: 'var(--layera-space-4)',
    right: 'var(--layera-space-4)',
    maxWidth: '400px',
    maxHeight: '200px',
    overflowY: 'auto',
    background: 'rgba(0,0,0,0.9)',
    color: 'white',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    zIndex: '9999',
    border: '1px solid var(--layera-color-border)',
    display: 'none'
  },
  'layera-debug-console--visible': {
    display: 'block'
  },
  'layera-debug-log': {
    margin: 'var(--layera-space-1) 0',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-xs)'
  },
  'layera-debug-log--success': {
    color: 'var(--layera-color-success)',
    background: 'var(--layera-color-success)10'
  },
  'layera-debug-log--error': {
    color: 'var(--layera-color-danger)',
    background: 'var(--layera-color-danger)10'
  },
  'layera-debug-log--info': {
    color: 'var(--layera-color-info)',
    background: 'var(--layera-color-info)10'
  }
};

/**
 * Global App States Styles
 */
export const GLOBAL_APP_STATES_STYLES = {
  'layera-app-loading': {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10000',
    backdropFilter: 'blur(5px)'
  },
  'layera-app-ready': {
    opacity: '1',
    transition: 'opacity 0.5s ease'
  },
  'layera-app-error': {
    background: 'var(--layera-color-danger)10',
    border: '2px solid var(--layera-color-danger)'
  }
};

/**
 * Animations and Keyframes
 */
export const ANIMATIONS_STYLES = {
  '@keyframes layera-spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  '@keyframes layera-fade-in': {
    '0%': { opacity: '0', transform: 'translateY(5px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  '@keyframes layera-loading-slide': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' }
  },
  '@keyframes layera-pulse': {
    '0%': { opacity: '0.6' },
    '50%': { opacity: '1' },
    '100%': { opacity: '0.6' }
  }
};

/**
 * AppCoreBuilder Class - Enterprise App Core JavaScript UI CSS Generation
 */
export class AppCoreBuilder {
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
   * Generates CSS από app core class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateAppCoreCSS(classDefinitions) {
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
   * Generates Component Loading States CSS
   * @returns {string} - Loading states CSS
   */
  static generateComponentLoadingStatesCSS() {
    let css = '/* COMPONENT LOADING STATES STYLES */\n';
    css += this.generateAppCoreCSS(COMPONENT_LOADING_STATES_STYLES);
    return css;
  }

  /**
   * Generates Component Error States CSS
   * @returns {string} - Error states CSS
   */
  static generateComponentErrorStatesCSS() {
    let css = '/* COMPONENT ERROR STATES STYLES */\n';
    css += this.generateAppCoreCSS(COMPONENT_ERROR_STATES_STYLES);
    return css;
  }

  /**
   * Generates Sidebar Toggle Button CSS
   * @returns {string} - Toggle button CSS
   */
  static generateSidebarToggleButtonCSS() {
    let css = '/* SIDEBAR TOGGLE BUTTON STYLES */\n';
    css += this.generateAppCoreCSS(SIDEBAR_TOGGLE_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Component Success States CSS
   * @returns {string} - Success states CSS
   */
  static generateComponentSuccessStatesCSS() {
    let css = '/* COMPONENT SUCCESS STATES STYLES */\n';
    css += this.generateAppCoreCSS(COMPONENT_SUCCESS_STATES_STYLES);
    return css;
  }

  /**
   * Generates Component Containers CSS
   * @returns {string} - Containers CSS
   */
  static generateComponentContainersCSS() {
    let css = '/* COMPONENT CONTAINERS STYLES */\n';
    css += this.generateAppCoreCSS(COMPONENT_CONTAINERS_STYLES);
    return css;
  }

  /**
   * Generates Dynamic Component Loading CSS
   * @returns {string} - Dynamic loading CSS
   */
  static generateDynamicComponentLoadingCSS() {
    let css = '/* DYNAMIC COMPONENT LOADING STYLES */\n';
    css += this.generateAppCoreCSS(DYNAMIC_COMPONENT_LOADING_STYLES);
    return css;
  }

  /**
   * Generates Console Logging CSS
   * @returns {string} - Console logging CSS
   */
  static generateConsoleLoggingCSS() {
    let css = '/* CONSOLE LOGGING STYLES */\n';
    css += this.generateAppCoreCSS(CONSOLE_LOGGING_STYLES);
    return css;
  }

  /**
   * Generates Global App States CSS
   * @returns {string} - App states CSS
   */
  static generateGlobalAppStatesCSS() {
    let css = '/* GLOBAL APP STATES STYLES */\n';
    css += this.generateAppCoreCSS(GLOBAL_APP_STATES_STYLES);
    return css;
  }

  /**
   * Generates Animations CSS
   * @returns {string} - Animations CSS
   */
  static generateAnimationsCSS() {
    let css = '/* ANIMATIONS AND KEYFRAMES */\n';
    css += this.generateAppCoreCSS(ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις App Core CSS classes
   * @returns {string} - Complete app core CSS
   */
  static generateAllAppCoreCSS() {
    let css = '/* === APP CORE JAVASCRIPT UI STATES === */\n\n';

    css += this.generateComponentLoadingStatesCSS();
    css += this.generateComponentErrorStatesCSS();
    css += this.generateSidebarToggleButtonCSS();
    css += this.generateComponentSuccessStatesCSS();
    css += this.generateComponentContainersCSS();
    css += this.generateDynamicComponentLoadingCSS();
    css += this.generateConsoleLoggingCSS();
    css += this.generateGlobalAppStatesCSS();
    css += this.generateAnimationsCSS();

    return css;
  }

  /**
   * Gets όλες τις available app core classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllAppCoreClasses() {
    return {
      ...COMPONENT_LOADING_STATES_STYLES,
      ...COMPONENT_ERROR_STATES_STYLES,
      ...SIDEBAR_TOGGLE_BUTTON_STYLES,
      ...COMPONENT_SUCCESS_STATES_STYLES,
      ...COMPONENT_CONTAINERS_STYLES,
      ...DYNAMIC_COMPONENT_LOADING_STYLES,
      ...CONSOLE_LOGGING_STYLES,
      ...GLOBAL_APP_STATES_STYLES,
      ...ANIMATIONS_STYLES
    };
  }

  /**
   * Gets specific app core category
   * @param {string} category - Category (loadingStates, errorStates, toggleButton, successStates, containers, dynamicLoading, consoleLogging, globalStates, animations)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getAppCoreCategory(category) {
    const categories = {
      loadingStates: COMPONENT_LOADING_STATES_STYLES,
      errorStates: COMPONENT_ERROR_STATES_STYLES,
      toggleButton: SIDEBAR_TOGGLE_BUTTON_STYLES,
      successStates: COMPONENT_SUCCESS_STATES_STYLES,
      containers: COMPONENT_CONTAINERS_STYLES,
      dynamicLoading: DYNAMIC_COMPONENT_LOADING_STYLES,
      consoleLogging: CONSOLE_LOGGING_STYLES,
      globalStates: GLOBAL_APP_STATES_STYLES,
      animations: ANIMATIONS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι app core classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateAppCoreClasses() {
    try {
      const allClasses = this.getAllAppCoreClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid app core class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for app core class: ${className}`);
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
      console.error('App core classes validation failed:', error.message);
      return false;
    }
  }
}

export default AppCoreBuilder;