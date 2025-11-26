/**
 * ComponentsBuilder.js - Component Sizes JavaScript Support Builder
 *
 * Single Responsibility: Μόνο component sizes JavaScript functionality CSS support
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/scripts/components.html
 */

/**
 * Component Size Controls Display Styles
 */
export const COMPONENT_SIZE_CONTROLS_DISPLAY_STYLES = {
  'layera-component-size-control': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    marginBottom: 'var(--layera-space-3)',
    padding: 'var(--layera-space-2)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white'
  },
  'layera-component-size-label': {
    minWidth: '120px',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    color: 'var(--layera-sidebar-text)'
  },
  'layera-component-size-slider': {
    flex: '1',
    appearance: 'none',
    height: '6px',
    background: 'var(--layera-color-border)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer'
  },
  'layera-component-size-slider::-webkit-slider-thumb': {
    appearance: 'none',
    width: '18px',
    height: '18px',
    background: 'var(--layera-color-primary)',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  'layera-component-size-display': {
    minWidth: '50px',
    padding: 'var(--layera-space-1)',
    background: 'var(--layera-color-surface)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    textAlign: 'center',
    color: 'var(--layera-sidebar-text)'
  }
};

/**
 * Dynamic Component Updates Styles
 */
export const DYNAMIC_COMPONENT_UPDATES_STYLES = {
  'layera-dynamic-update': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  },
  'layera-dynamic-update--active': {
    boxShadow: '0 0 0 2px var(--layera-color-primary)40',
    zIndex: '1'
  },
  'layera-dynamic-update::after': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    border: '2px solid var(--layera-color-primary)',
    borderRadius: 'inherit',
    opacity: '0',
    transition: 'opacity 0.2s ease',
    pointerEvents: 'none'
  },
  'layera-dynamic-update--updating::after': {
    opacity: '1'
  }
};

/**
 * Button Size Properties Styles
 */
export const BUTTON_SIZE_PROPERTIES_STYLES = {
  'layera-button-height-control': {
    background: 'var(--layera-color-info)10',
    borderColor: 'var(--layera-color-info)30'
  },
  'layera-button-padding-control': {
    background: 'var(--layera-color-success)10',
    borderColor: 'var(--layera-color-success)30'
  },
  'layera-button-fontsize-control': {
    background: 'var(--layera-color-warning)10',
    borderColor: 'var(--layera-color-warning)30'
  },
  'layera-button-dynamic': {
    transition: 'height 0.3s ease, padding 0.3s ease, font-size 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  }
};

/**
 * Card Size Properties Styles
 */
export const CARD_SIZE_PROPERTIES_STYLES = {
  'layera-card-height-control': {
    background: 'var(--layera-color-primary)10',
    borderColor: 'var(--layera-color-primary)30'
  },
  'layera-card-dynamic': {
    transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative'
  },
  'layera-card-dynamic--updating': {
    overflow: 'hidden'
  },
  'layera-card-overflow-indicator': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '20px',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  },
  'layera-card-dynamic--overflow .layera-card-overflow-indicator': {
    opacity: '1'
  }
};

/**
 * Modal Size Properties Styles
 */
export const MODAL_SIZE_PROPERTIES_STYLES = {
  'layera-modal-width-control': {
    background: 'var(--layera-color-danger)10',
    borderColor: 'var(--layera-color-danger)30'
  },
  'layera-modal-dynamic': {
    transition: 'width 0.3s ease, max-width 0.3s ease, min-width 0.3s ease',
    flex: '0 0 auto',
    boxSizing: 'border-box'
  },
  'layera-modal-size-indicator': {
    position: 'absolute',
    top: 'var(--layera-space-1)',
    right: 'var(--layera-space-1)',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: 'var(--layera-space-1)',
    borderRadius: 'var(--layera-radius-xs)',
    fontSize: 'var(--layera-font-size-xs)',
    fontFamily: 'monospace',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  },
  'layera-modal-dynamic--updating .layera-modal-size-indicator': {
    opacity: '1'
  }
};

/**
 * Border Radius Properties Styles
 */
export const BORDER_RADIUS_PROPERTIES_STYLES = {
  'layera-border-radius-control': {
    background: 'var(--layera-color-secondary)10',
    borderColor: 'var(--layera-color-secondary)30'
  },
  'layera-border-radius-preview': {
    position: 'relative'
  },
  'layera-border-radius-preview::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    border: '2px dashed var(--layera-color-secondary)',
    borderRadius: 'inherit',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  'layera-border-radius-preview--updating::before': {
    opacity: '0.5'
  },
  'layera-component-border-radius-dynamic': {
    transition: 'border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

/**
 * Component Property Group Styles
 */
export const COMPONENT_PROPERTY_GROUP_STYLES = {
  'layera-component-property-group': {
    marginBottom: 'var(--layera-space-6)',
    padding: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'rgba(0,0,0,0.02)'
  },
  'layera-component-property-title': {
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    paddingBottom: 'var(--layera-space-2)',
    borderBottom: '1px solid var(--layera-color-border)'
  },
  'layera-component-property-icon': {
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.8'
  }
};

/**
 * Real-time Feedback Styles
 */
export const REAL_TIME_FEEDBACK_STYLES = {
  'layera-property-feedback': {
    position: 'fixed',
    bottom: 'var(--layera-space-4)',
    left: 'var(--layera-space-4)',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'rgba(0,0,0,0.9)',
    color: 'white',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    fontFamily: 'monospace',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    maxWidth: '300px'
  },
  'layera-property-feedback--visible': {
    opacity: '1',
    transform: 'translateY(0)'
  },
  'layera-property-feedback--success': {
    background: 'var(--layera-color-success)',
    color: 'white'
  },
  'layera-property-feedback--error': {
    background: 'var(--layera-color-danger)',
    color: 'white'
  }
};

/**
 * Component Testing Tools Styles
 */
export const COMPONENT_TESTING_TOOLS_STYLES = {
  'layera-component-testing': {
    position: 'fixed',
    top: 'var(--layera-space-4)',
    left: 'var(--layera-space-4)',
    background: 'white',
    border: '2px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-sm)',
    padding: 'var(--layera-space-3)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: '9998',
    display: 'none'
  },
  'layera-component-testing--visible': {
    display: 'block'
  },
  'layera-testing-button': {
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'var(--layera-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    cursor: 'pointer',
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    transition: 'all 0.2s ease'
  },
  'layera-testing-button:hover': {
    background: 'var(--layera-color-primary-hover)',
    transform: 'translateY(-1px)'
  }
};

/**
 * Component Size Animations
 */
export const COMPONENT_SIZE_ANIMATIONS_STYLES = {
  '@keyframes layera-property-flash': {
    '0%': { boxShadow: '0 0 0 0 var(--layera-color-primary)60' },
    '50%': { boxShadow: '0 0 0 8px var(--layera-color-primary)20' },
    '100%': { boxShadow: '0 0 0 0 var(--layera-color-primary)00' }
  },
  '@keyframes layera-size-pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.02)' },
    '100%': { transform: 'scale(1)' }
  },
  '@keyframes layera-property-update': {
    '0%': { opacity: '0.7', transform: 'scale(0.98)' },
    '50%': { opacity: '1', transform: 'scale(1.01)' },
    '100%': { opacity: '1', transform: 'scale(1)' }
  }
};

/**
 * ComponentsBuilder Class - Enterprise Component Sizes JavaScript Support CSS Generation
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
   * Generates CSS από components script class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateComponentsScriptCSS(classDefinitions) {
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
   * Generates Component Size Controls Display CSS
   * @returns {string} - Controls display CSS
   */
  static generateComponentSizeControlsDisplayCSS() {
    let css = '/* COMPONENT SIZE CONTROLS DISPLAY STYLES */\n';
    css += this.generateComponentsScriptCSS(COMPONENT_SIZE_CONTROLS_DISPLAY_STYLES);
    return css;
  }

  /**
   * Generates Dynamic Component Updates CSS
   * @returns {string} - Dynamic updates CSS
   */
  static generateDynamicComponentUpdatesCSS() {
    let css = '/* DYNAMIC COMPONENT UPDATES STYLES */\n';
    css += this.generateComponentsScriptCSS(DYNAMIC_COMPONENT_UPDATES_STYLES);
    return css;
  }

  /**
   * Generates Button Size Properties CSS
   * @returns {string} - Button size CSS
   */
  static generateButtonSizePropertiesCSS() {
    let css = '/* BUTTON SIZE PROPERTIES STYLES */\n';
    css += this.generateComponentsScriptCSS(BUTTON_SIZE_PROPERTIES_STYLES);
    return css;
  }

  /**
   * Generates Card Size Properties CSS
   * @returns {string} - Card size CSS
   */
  static generateCardSizePropertiesCSS() {
    let css = '/* CARD SIZE PROPERTIES STYLES */\n';
    css += this.generateComponentsScriptCSS(CARD_SIZE_PROPERTIES_STYLES);
    return css;
  }

  /**
   * Generates Modal Size Properties CSS
   * @returns {string} - Modal size CSS
   */
  static generateModalSizePropertiesCSS() {
    let css = '/* MODAL SIZE PROPERTIES STYLES */\n';
    css += this.generateComponentsScriptCSS(MODAL_SIZE_PROPERTIES_STYLES);
    return css;
  }

  /**
   * Generates Border Radius Properties CSS
   * @returns {string} - Border radius CSS
   */
  static generateBorderRadiusPropertiesCSS() {
    let css = '/* BORDER RADIUS PROPERTIES STYLES */\n';
    css += this.generateComponentsScriptCSS(BORDER_RADIUS_PROPERTIES_STYLES);
    return css;
  }

  /**
   * Generates Component Property Group CSS
   * @returns {string} - Property group CSS
   */
  static generateComponentPropertyGroupCSS() {
    let css = '/* COMPONENT PROPERTY GROUP STYLES */\n';
    css += this.generateComponentsScriptCSS(COMPONENT_PROPERTY_GROUP_STYLES);
    return css;
  }

  /**
   * Generates Real-time Feedback CSS
   * @returns {string} - Feedback CSS
   */
  static generateRealTimeFeedbackCSS() {
    let css = '/* REAL-TIME FEEDBACK STYLES */\n';
    css += this.generateComponentsScriptCSS(REAL_TIME_FEEDBACK_STYLES);
    return css;
  }

  /**
   * Generates Component Testing Tools CSS
   * @returns {string} - Testing tools CSS
   */
  static generateComponentTestingToolsCSS() {
    let css = '/* COMPONENT TESTING TOOLS STYLES */\n';
    css += this.generateComponentsScriptCSS(COMPONENT_TESTING_TOOLS_STYLES);
    return css;
  }

  /**
   * Generates Component Size Animations CSS
   * @returns {string} - Animations CSS
   */
  static generateComponentSizeAnimationsCSS() {
    let css = '/* COMPONENT SIZE ANIMATIONS */\n';
    css += this.generateComponentsScriptCSS(COMPONENT_SIZE_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Components Script CSS classes
   * @returns {string} - Complete components script CSS
   */
  static generateAllComponentsCSS() {
    let css = '/* === COMPONENT SIZES JAVASCRIPT SUPPORT === */\n\n';

    css += this.generateComponentSizeControlsDisplayCSS();
    css += this.generateDynamicComponentUpdatesCSS();
    css += this.generateButtonSizePropertiesCSS();
    css += this.generateCardSizePropertiesCSS();
    css += this.generateModalSizePropertiesCSS();
    css += this.generateBorderRadiusPropertiesCSS();
    css += this.generateComponentPropertyGroupCSS();
    css += this.generateRealTimeFeedbackCSS();
    css += this.generateComponentTestingToolsCSS();
    css += this.generateComponentSizeAnimationsCSS();

    return css;
  }

  /**
   * Gets όλες τις available components script classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllComponentsScriptClasses() {
    return {
      ...COMPONENT_SIZE_CONTROLS_DISPLAY_STYLES,
      ...DYNAMIC_COMPONENT_UPDATES_STYLES,
      ...BUTTON_SIZE_PROPERTIES_STYLES,
      ...CARD_SIZE_PROPERTIES_STYLES,
      ...MODAL_SIZE_PROPERTIES_STYLES,
      ...BORDER_RADIUS_PROPERTIES_STYLES,
      ...COMPONENT_PROPERTY_GROUP_STYLES,
      ...REAL_TIME_FEEDBACK_STYLES,
      ...COMPONENT_TESTING_TOOLS_STYLES,
      ...COMPONENT_SIZE_ANIMATIONS_STYLES
    };
  }

  /**
   * Gets specific components script category
   * @param {string} category - Category (controlsDisplay, dynamicUpdates, buttonSize, cardSize, modalSize, borderRadius, propertyGroup, feedback, testingTools, animations)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getComponentsScriptCategory(category) {
    const categories = {
      controlsDisplay: COMPONENT_SIZE_CONTROLS_DISPLAY_STYLES,
      dynamicUpdates: DYNAMIC_COMPONENT_UPDATES_STYLES,
      buttonSize: BUTTON_SIZE_PROPERTIES_STYLES,
      cardSize: CARD_SIZE_PROPERTIES_STYLES,
      modalSize: MODAL_SIZE_PROPERTIES_STYLES,
      borderRadius: BORDER_RADIUS_PROPERTIES_STYLES,
      propertyGroup: COMPONENT_PROPERTY_GROUP_STYLES,
      feedback: REAL_TIME_FEEDBACK_STYLES,
      testingTools: COMPONENT_TESTING_TOOLS_STYLES,
      animations: COMPONENT_SIZE_ANIMATIONS_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι components script classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateComponentsScriptClasses() {
    try {
      const allClasses = this.getAllComponentsScriptClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid components script class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for components script class: ${className}`);
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
      console.error('Components script classes validation failed:', error.message);
      return false;
    }
  }
}

export default ComponentsBuilder;