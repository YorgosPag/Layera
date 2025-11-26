/**
 * LayoutInfoCardsBuilder.js - Layout Info Cards Builder
 *
 * Single Responsibility: Μόνο layout info cards CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/main/layout/layout-info-cards.html
 */

/**
 * Info Layout Container Styles
 */
export const INFO_LAYOUT_CONTAINER_STYLES = {
  'layera-info-layout': {
    padding: 'var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #e3f2fd 100%)',
    border: '2px solid var(--layera-color-info)',
    borderRadius: 'var(--layera-radius-lg)',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-info-layout::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--layera-color-info) 0%, #42a5f5 50%, var(--layera-color-info) 100%)',
    animation: 'infoGlow 3s ease-in-out infinite'
  },
  'layera-info-layout::after': {
    content: 'ℹ️',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.7',
    animation: 'infoFloat 4s ease-in-out infinite'
  }
};

/**
 * Info Layout Header Styles
 */
export const INFO_LAYOUT_HEADER_STYLES = {
  'layera-info-header': {
    margin: '0 0 var(--layera-space-3) 0',
    color: 'var(--layera-color-info)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  'layera-info-header::before': {
    content: 'ℹ️',
    fontSize: 'var(--layera-font-size-xl)',
    animation: 'infoRotate 6s linear infinite'
  }
};

/**
 * Info Layout Content Styles
 */
export const INFO_LAYOUT_CONTENT_STYLES = {
  'layera-info-content': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-info-description': {
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0 0 var(--layera-space-4) 0',
    padding: 'var(--layera-space-2)',
    background: 'rgba(33, 150, 243, 0.1)',
    border: '1px solid rgba(33, 150, 243, 0.2)',
    borderRadius: 'var(--layera-radius-sm)',
    fontWeight: 'var(--layera-font-weight-medium)',
    position: 'relative'
  },
  'layera-info-description::before': {
    content: '💡',
    position: 'absolute',
    top: 'var(--layera-space-1)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    opacity: '0.8'
  },
  'layera-info-description-text': {
    marginLeft: 'var(--layera-space-6)'
  }
};

/**
 * Info Layout Input Styles
 */
export const INFO_LAYOUT_INPUT_STYLES = {
  'layera-info-input': {
    width: '100%',
    padding: 'var(--layera-space-3)',
    border: '2px solid var(--layera-color-info)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(33, 150, 243, 0.2)'
  },
  'layera-info-input::placeholder': {
    color: 'var(--layera-color-info)',
    opacity: '0.7',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-info-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-info)',
    boxShadow: '0 0 0 4px rgba(33, 150, 243, 0.2), 0 4px 12px rgba(33, 150, 243, 0.3)',
    background: '#f3f8ff',
    transform: 'translateY(-1px)'
  },
  'layera-info-input:hover': {
    borderColor: '#1976d2',
    boxShadow: '0 4px 8px rgba(33, 150, 243, 0.25)'
  },
  'layera-info-input:valid': {
    borderColor: 'var(--layera-color-success)',
    boxShadow: '0 2px 4px rgba(76, 175, 80, 0.2)'
  }
};

/**
 * Info Layout Button Styles
 */
export const INFO_LAYOUT_BUTTON_STYLES = {
  'layera-info-btn': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-info) 0%, #1976d2 100%)',
    color: 'white',
    border: '2px solid var(--layera-color-info)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-bold)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)'
  },
  'layera-info-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.5s ease'
  },
  'layera-info-btn:hover::before': {
    left: '100%'
  },
  'layera-info-btn:hover': {
    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.5)',
    borderColor: '#1565c0'
  },
  'layera-info-btn:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.6)'
  }
};

/**
 * Info Layout Information Indicators Styles
 */
export const INFO_LAYOUT_INFORMATION_INDICATORS_STYLES = {
  'layera-info-indicator-strip': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'repeating-linear-gradient(90deg, var(--layera-color-info), var(--layera-color-info) 15px, transparent 15px, transparent 30px)',
    animation: 'infoFlow 4s linear infinite'
  },
  'layera-info-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'var(--layera-color-info)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    borderRadius: 'var(--layera-radius-full)',
    marginBottom: 'var(--layera-space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  'layera-info-badge::before': {
    content: '🌐',
    fontSize: '12px'
  }
};

/**
 * Info Layout Help Features Styles
 */
export const INFO_LAYOUT_HELP_FEATURES_STYLES = {
  'layera-info-help-notice': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, #e1f5fe 0%, #e8f5e8 100%)',
    border: '1px solid var(--layera-color-info)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    position: 'relative'
  },
  'layera-info-help-notice::before': {
    content: '💬',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-info)'
  },
  'layera-info-help-text': {
    marginLeft: 'var(--layera-space-6)',
    lineHeight: '1.4',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-info-tooltip': {
    position: 'relative',
    display: 'inline-block',
    cursor: 'help'
  },
  'layera-info-tooltip::after': {
    content: 'attr(data-tooltip)',
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--layera-color-info)',
    color: 'white',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    whiteSpace: 'nowrap',
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s ease',
    zIndex: '1000'
  },
  'layera-info-tooltip:hover::after': {
    opacity: '1',
    visibility: 'visible'
  }
};

/**
 * Info Layout Animations Styles
 */
export const INFO_LAYOUT_ANIMATIONS_STYLES = {
  '@keyframes infoGlow': {
    '0%': { opacity: '1', boxShadow: '0 0 5px var(--layera-color-info)' },
    '50%': { opacity: '0.8', boxShadow: '0 0 15px var(--layera-color-info)' },
    '100%': { opacity: '1', boxShadow: '0 0 5px var(--layera-color-info)' }
  },
  '@keyframes infoFloat': {
    '0%': { transform: 'translateY(0px)', opacity: '0.7' },
    '50%': { transform: 'translateY(-3px)', opacity: '1' },
    '100%': { transform: 'translateY(0px)', opacity: '0.7' }
  },
  '@keyframes infoRotate': {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(5deg)' },
    '50%': { transform: 'rotate(0deg)' },
    '75%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(0deg)' }
  },
  '@keyframes infoFlow': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(30px)' }
  },
  '@keyframes infoPulse': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.05)', opacity: '0.9' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  }
};

/**
 * Info Layout States Styles
 */
export const INFO_LAYOUT_STATES_STYLES = {
  'layera-info-layout--loading': {
    opacity: '0.8',
    pointerEvents: 'none'
  },
  'layera-info-layout--success': {
    borderColor: 'var(--layera-color-success)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #f1f8e9 100%)'
  },
  'layera-info-layout--expanded': {
    animation: 'infoPulse 2s ease-in-out infinite'
  },
  'layera-info-btn--loading': {
    background: '#90a4ae',
    cursor: 'not-allowed',
    transform: 'none'
  },
  'layera-info-btn--loading::after': {
    content: '📡',
    marginLeft: 'var(--layera-space-2)',
    animation: 'infoFloat 2s ease-in-out infinite'
  },
  'layera-info-input--filled': {
    borderColor: 'var(--layera-color-success)',
    background: '#f9fff9'
  },
  'layera-info-input--empty': {
    borderColor: 'var(--layera-color-warning)',
    background: '#fff9f0'
  }
};

/**
 * Info Layout Interactive Features Styles
 */
export const INFO_LAYOUT_INTERACTIVE_FEATURES_STYLES = {
  'layera-info-expandable': {
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  'layera-info-expandable:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(33, 150, 243, 0.3)'
  },
  'layera-info-collapsible-content': {
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    opacity: '0'
  },
  'layera-info-collapsible-content--expanded': {
    maxHeight: '200px',
    opacity: '1'
  },
  'layera-info-progress-bar': {
    width: '100%',
    height: '4px',
    background: 'var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-full)',
    overflow: 'hidden',
    marginTop: 'var(--layera-space-2)'
  },
  'layera-info-progress-fill': {
    height: '100%',
    background: 'linear-gradient(90deg, var(--layera-color-info), #42a5f5)',
    borderRadius: 'var(--layera-radius-full)',
    width: '0%',
    transition: 'width 0.3s ease',
    animation: 'infoFlow 2s linear infinite'
  }
};

/**
 * Info Layout Responsive Styles
 */
export const INFO_LAYOUT_RESPONSIVE_STYLES = {
  '@media (max-width: 768px)': {
    'layera-info-layout': {
      padding: 'var(--layera-space-3)',
      margin: 'var(--layera-space-2)'
    },
    'layera-info-header': {
      fontSize: 'var(--layera-font-size-md)',
      flexDirection: 'column',
      textAlign: 'center'
    },
    'layera-info-btn': {
      padding: 'var(--layera-space-4)',
      fontSize: 'var(--layera-font-size-md)'
    }
  },
  '@media (max-width: 480px)': {
    'layera-info-layout': {
      borderRadius: 'var(--layera-radius-sm)',
      margin: 'var(--layera-space-1)'
    },
    'layera-info-input': {
      fontSize: 'var(--layera-font-size-md)',
      padding: 'var(--layera-space-4)'
    },
    'layera-info-help-notice': {
      fontSize: 'var(--layera-font-size-sm)'
    }
  }
};

/**
 * LayoutInfoCardsBuilder Class - Enterprise Layout Info Cards CSS Generation
 */
export class LayoutInfoCardsBuilder {
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
   * Generates CSS από layout info cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutInfoCardsCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      // Handle media queries
      if (className.startsWith('@media')) {
        css += `${className} {\n`;
        Object.entries(styles).forEach(([selector, selectorStyles]) => {
          css += `  .${selector} {\n`;
          css += this.objectToCSSString(selectorStyles).replace(/^/gm, '    ');
          css += '\n  }\n';
        });
        css += '}\n\n';
      }
      // Handle keyframes
      else if (className.startsWith('@keyframes')) {
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
   * Generates Info Layout Container CSS
   * @returns {string} - Info layout container CSS
   */
  static generateInfoLayoutContainerCSS() {
    let css = '/* INFO LAYOUT CONTAINER STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Header CSS
   * @returns {string} - Info layout header CSS
   */
  static generateInfoLayoutHeaderCSS() {
    let css = '/* INFO LAYOUT HEADER STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Content CSS
   * @returns {string} - Info layout content CSS
   */
  static generateInfoLayoutContentCSS() {
    let css = '/* INFO LAYOUT CONTENT STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Input CSS
   * @returns {string} - Info layout input CSS
   */
  static generateInfoLayoutInputCSS() {
    let css = '/* INFO LAYOUT INPUT STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Button CSS
   * @returns {string} - Info layout button CSS
   */
  static generateInfoLayoutButtonCSS() {
    let css = '/* INFO LAYOUT BUTTON STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Information Indicators CSS
   * @returns {string} - Info layout information indicators CSS
   */
  static generateInfoLayoutInformationIndicatorsCSS() {
    let css = '/* INFO LAYOUT INFORMATION INDICATORS STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_INFORMATION_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Help Features CSS
   * @returns {string} - Info layout help features CSS
   */
  static generateInfoLayoutHelpFeaturesCSS() {
    let css = '/* INFO LAYOUT HELP FEATURES STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_HELP_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Animations CSS
   * @returns {string} - Info layout animations CSS
   */
  static generateInfoLayoutAnimationsCSS() {
    let css = '/* INFO LAYOUT ANIMATIONS STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates Info Layout States CSS
   * @returns {string} - Info layout states CSS
   */
  static generateInfoLayoutStatesCSS() {
    let css = '/* INFO LAYOUT STATES STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_STATES_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Interactive Features CSS
   * @returns {string} - Info layout interactive features CSS
   */
  static generateInfoLayoutInteractiveFeaturesCSS() {
    let css = '/* INFO LAYOUT INTERACTIVE FEATURES STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_INTERACTIVE_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Info Layout Responsive CSS
   * @returns {string} - Info layout responsive CSS
   */
  static generateInfoLayoutResponsiveCSS() {
    let css = '/* INFO LAYOUT RESPONSIVE STYLES */\n';
    css += this.generateLayoutInfoCardsCSS(INFO_LAYOUT_RESPONSIVE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Layout Info Cards CSS classes
   * @returns {string} - Complete layout info cards CSS
   */
  static generateAllLayoutInfoCardsCSS() {
    let css = '/* === LAYOUT INFO CARDS === */\n\n';

    css += this.generateInfoLayoutContainerCSS();
    css += this.generateInfoLayoutHeaderCSS();
    css += this.generateInfoLayoutContentCSS();
    css += this.generateInfoLayoutInputCSS();
    css += this.generateInfoLayoutButtonCSS();
    css += this.generateInfoLayoutInformationIndicatorsCSS();
    css += this.generateInfoLayoutHelpFeaturesCSS();
    css += this.generateInfoLayoutAnimationsCSS();
    css += this.generateInfoLayoutStatesCSS();
    css += this.generateInfoLayoutInteractiveFeaturesCSS();
    css += this.generateInfoLayoutResponsiveCSS();

    return css;
  }

  /**
   * Gets όλες τις available layout info cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllLayoutInfoCardsClasses() {
    return {
      ...INFO_LAYOUT_CONTAINER_STYLES,
      ...INFO_LAYOUT_HEADER_STYLES,
      ...INFO_LAYOUT_CONTENT_STYLES,
      ...INFO_LAYOUT_INPUT_STYLES,
      ...INFO_LAYOUT_BUTTON_STYLES,
      ...INFO_LAYOUT_INFORMATION_INDICATORS_STYLES,
      ...INFO_LAYOUT_HELP_FEATURES_STYLES,
      ...INFO_LAYOUT_ANIMATIONS_STYLES,
      ...INFO_LAYOUT_STATES_STYLES,
      ...INFO_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      ...INFO_LAYOUT_RESPONSIVE_STYLES
    };
  }

  /**
   * Gets specific layout info cards category
   * @param {string} category - Category (container, header, content, input, button, informationIndicators, helpFeatures, animations, states, interactiveFeatures, responsive)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getLayoutInfoCardsCategory(category) {
    const categories = {
      container: INFO_LAYOUT_CONTAINER_STYLES,
      header: INFO_LAYOUT_HEADER_STYLES,
      content: INFO_LAYOUT_CONTENT_STYLES,
      input: INFO_LAYOUT_INPUT_STYLES,
      button: INFO_LAYOUT_BUTTON_STYLES,
      informationIndicators: INFO_LAYOUT_INFORMATION_INDICATORS_STYLES,
      helpFeatures: INFO_LAYOUT_HELP_FEATURES_STYLES,
      animations: INFO_LAYOUT_ANIMATIONS_STYLES,
      states: INFO_LAYOUT_STATES_STYLES,
      interactiveFeatures: INFO_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      responsive: INFO_LAYOUT_RESPONSIVE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout info cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutInfoCardsClasses() {
    try {
      const allClasses = this.getAllLayoutInfoCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid layout info cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for layout info cards class: ${className}`);
        }

        // Skip validation for special CSS constructs like @media and @keyframes
        if (!className.startsWith('@')) {
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
      console.error('Layout info cards classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutInfoCardsBuilder;