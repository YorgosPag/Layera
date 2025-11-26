/**
 * LayoutPrimaryCardsBuilder.js - Layout Primary Cards Builder
 *
 * Single Responsibility: Μόνο layout primary cards CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/main/layout/layout-primary-cards.html
 */

/**
 * Primary Layout Container Styles
 */
export const PRIMARY_LAYOUT_CONTAINER_STYLES = {
  'layera-primary-layout': {
    padding: 'var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #e3f2fd 100%)',
    border: '2px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-lg)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(74, 144, 226, 0.15)'
  },
  'layera-primary-layout::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--layera-color-primary) 0%, #42a5f5 50%, var(--layera-color-primary) 100%)',
    animation: 'primaryShine 4s ease-in-out infinite'
  },
  'layera-primary-layout::after': {
    content: '📋',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.8',
    animation: 'primaryBob 3s ease-in-out infinite'
  }
};

/**
 * Primary Layout Header Styles
 */
export const PRIMARY_LAYOUT_HEADER_STYLES = {
  'layera-primary-header': {
    margin: '0 0 var(--layera-space-3) 0',
    color: 'var(--layera-color-primary)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    textShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  'layera-primary-header::before': {
    content: '📋',
    fontSize: 'var(--layera-font-size-xl)',
    animation: 'primaryPulse 2s ease-in-out infinite'
  },
  'layera-primary-header::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '60px',
    height: '2px',
    background: 'var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-full)'
  }
};

/**
 * Primary Layout Content Styles
 */
export const PRIMARY_LAYOUT_CONTENT_STYLES = {
  'layera-primary-content': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-primary-description': {
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0 0 var(--layera-space-4) 0',
    padding: 'var(--layera-space-3)',
    background: 'rgba(74, 144, 226, 0.08)',
    border: '1px solid rgba(74, 144, 226, 0.2)',
    borderRadius: 'var(--layera-radius-md)',
    fontWeight: 'var(--layera-font-weight-medium)',
    position: 'relative',
    lineHeight: '1.6'
  },
  'layera-primary-description::before': {
    content: '⭐',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)',
    opacity: '0.8'
  },
  'layera-primary-description-text': {
    marginLeft: 'var(--layera-space-6)',
    fontStyle: 'italic'
  }
};

/**
 * Primary Layout Input Styles
 */
export const PRIMARY_LAYOUT_INPUT_STYLES = {
  'layera-primary-input': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    border: '2px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(74, 144, 226, 0.15)',
    position: 'relative'
  },
  'layera-primary-input::placeholder': {
    color: 'var(--layera-color-primary)',
    opacity: '0.7',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-primary-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 4px rgba(74, 144, 226, 0.25), 0 4px 16px rgba(74, 144, 226, 0.3)',
    background: '#fafbff',
    transform: 'translateY(-1px)'
  },
  'layera-primary-input:hover': {
    borderColor: '#3b82f6',
    boxShadow: '0 4px 12px rgba(74, 144, 226, 0.25)',
    background: '#fafbff'
  },
  'layera-primary-input:valid': {
    borderColor: 'var(--layera-color-success)',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2)'
  }
};

/**
 * Primary Layout Button Styles
 */
export const PRIMARY_LAYOUT_BUTTON_STYLES = {
  'layera-primary-btn': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-primary) 0%, #3b82f6 100%)',
    color: 'white',
    border: '2px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-bold)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 16px rgba(74, 144, 226, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-primary-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.6s ease'
  },
  'layera-primary-btn:hover::before': {
    left: '100%'
  },
  'layera-primary-btn:hover': {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(74, 144, 226, 0.5)',
    borderColor: '#2563eb'
  },
  'layera-primary-btn:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(74, 144, 226, 0.6)'
  }
};

/**
 * Primary Layout Feature Indicators Styles
 */
export const PRIMARY_LAYOUT_FEATURE_INDICATORS_STYLES = {
  'layera-primary-feature-strip': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'repeating-linear-gradient(90deg, var(--layera-color-primary), var(--layera-color-primary) 20px, transparent 20px, transparent 40px)',
    animation: 'primaryFlow 5s linear infinite'
  },
  'layera-primary-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-3)',
    background: 'var(--layera-color-primary)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    borderRadius: 'var(--layera-radius-full)',
    marginBottom: 'var(--layera-space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 6px rgba(74, 144, 226, 0.3)'
  },
  'layera-primary-badge::before': {
    content: '🔍',
    fontSize: '12px'
  }
};

/**
 * Primary Layout Action Features Styles
 */
export const PRIMARY_LAYOUT_ACTION_FEATURES_STYLES = {
  'layera-primary-action-notice': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, #e3f2fd 0%, #f3f4f6 100%)',
    border: '1px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    position: 'relative'
  },
  'layera-primary-action-notice::before': {
    content: '🚀',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-primary)'
  },
  'layera-primary-action-text': {
    marginLeft: 'var(--layera-space-6)',
    lineHeight: '1.5',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-primary-quick-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-3)',
    flexWrap: 'wrap'
  },
  'layera-primary-quick-action': {
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'white',
    border: '1px solid var(--layera-color-primary)',
    borderRadius: 'var(--layera-radius-sm)',
    color: 'var(--layera-color-primary)',
    fontSize: 'var(--layera-font-size-xs)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-primary-quick-action:hover': {
    background: 'var(--layera-color-primary)',
    color: 'white',
    transform: 'translateY(-1px)'
  }
};

/**
 * Primary Layout Animations Styles
 */
export const PRIMARY_LAYOUT_ANIMATIONS_STYLES = {
  '@keyframes primaryShine': {
    '0%': { opacity: '1', transform: 'scaleX(1)' },
    '50%': { opacity: '0.8', transform: 'scaleX(1.05)' },
    '100%': { opacity: '1', transform: 'scaleX(1)' }
  },
  '@keyframes primaryBob': {
    '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.8' },
    '50%': { transform: 'translateY(-4px) rotate(2deg)', opacity: '1' },
    '100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.8' }
  },
  '@keyframes primaryPulse': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.08)', opacity: '0.9' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  '@keyframes primaryFlow': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(40px)' }
  },
  '@keyframes primaryRipple': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(4)', opacity: '0' }
  }
};

/**
 * Primary Layout States Styles
 */
export const PRIMARY_LAYOUT_STATES_STYLES = {
  'layera-primary-layout--loading': {
    opacity: '0.9',
    pointerEvents: 'none',
    animation: 'primaryPulse 2s ease-in-out infinite'
  },
  'layera-primary-layout--active': {
    borderColor: 'var(--layera-color-success)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #f0f9ff 100%)',
    boxShadow: '0 8px 24px rgba(74, 144, 226, 0.25)'
  },
  'layera-primary-layout--focused': {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 32px rgba(74, 144, 226, 0.3)'
  },
  'layera-primary-btn--loading': {
    background: '#94a3b8',
    cursor: 'not-allowed',
    transform: 'none'
  },
  'layera-primary-btn--loading::after': {
    content: '⏳',
    marginLeft: 'var(--layera-space-2)',
    animation: 'primaryBob 2s ease-in-out infinite'
  },
  'layera-primary-input--filled': {
    borderColor: 'var(--layera-color-success)',
    background: '#f9fff9'
  },
  'layera-primary-input--searching': {
    background: 'linear-gradient(90deg, #fafbff 0%, #e3f2fd 50%, #fafbff 100%)',
    backgroundSize: '200% 100%',
    animation: 'primaryFlow 2s linear infinite'
  }
};

/**
 * Primary Layout Interactive Features Styles
 */
export const PRIMARY_LAYOUT_INTERACTIVE_FEATURES_STYLES = {
  'layera-primary-searchable': {
    position: 'relative'
  },
  'layera-primary-search-results': {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    zIndex: '1000',
    maxHeight: '200px',
    overflowY: 'auto',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease'
  },
  'layera-primary-search-results--visible': {
    opacity: '1',
    visibility: 'visible',
    transform: 'translateY(0)'
  },
  'layera-primary-search-item': {
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--layera-color-border)',
    fontSize: 'var(--layera-font-size-sm)',
    transition: 'all 0.2s ease'
  },
  'layera-primary-search-item:hover': {
    background: 'var(--layera-color-primary)10',
    color: 'var(--layera-color-primary)'
  },
  'layera-primary-progress-indicator': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '2px',
    background: 'var(--layera-color-primary)',
    width: '0%',
    transition: 'width 0.5s ease',
    borderRadius: 'var(--layera-radius-full)'
  }
};

/**
 * Primary Layout Responsive Styles
 */
export const PRIMARY_LAYOUT_RESPONSIVE_STYLES = {
  '@media (max-width: 768px)': {
    'layera-primary-layout': {
      padding: 'var(--layera-space-3)',
      margin: 'var(--layera-space-2)'
    },
    'layera-primary-header': {
      fontSize: 'var(--layera-font-size-md)',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 'var(--layera-space-1)'
    },
    'layera-primary-btn': {
      padding: 'var(--layera-space-4)',
      fontSize: 'var(--layera-font-size-md)'
    },
    'layera-primary-quick-actions': {
      justifyContent: 'center'
    }
  },
  '@media (max-width: 480px)': {
    'layera-primary-layout': {
      borderRadius: 'var(--layera-radius-md)',
      margin: 'var(--layera-space-1)'
    },
    'layera-primary-input': {
      fontSize: 'var(--layera-font-size-md)',
      padding: 'var(--layera-space-4)'
    },
    'layera-primary-description': {
      fontSize: 'var(--layera-font-size-sm)',
      padding: 'var(--layera-space-2)'
    },
    'layera-primary-quick-action': {
      flex: '1',
      textAlign: 'center'
    }
  }
};

/**
 * LayoutPrimaryCardsBuilder Class - Enterprise Layout Primary Cards CSS Generation
 */
export class LayoutPrimaryCardsBuilder {
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
   * Generates CSS από layout primary cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutPrimaryCardsCSS(classDefinitions) {
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
   * Generates Primary Layout Container CSS
   * @returns {string} - Primary layout container CSS
   */
  static generatePrimaryLayoutContainerCSS() {
    let css = '/* PRIMARY LAYOUT CONTAINER STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Header CSS
   * @returns {string} - Primary layout header CSS
   */
  static generatePrimaryLayoutHeaderCSS() {
    let css = '/* PRIMARY LAYOUT HEADER STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Content CSS
   * @returns {string} - Primary layout content CSS
   */
  static generatePrimaryLayoutContentCSS() {
    let css = '/* PRIMARY LAYOUT CONTENT STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Input CSS
   * @returns {string} - Primary layout input CSS
   */
  static generatePrimaryLayoutInputCSS() {
    let css = '/* PRIMARY LAYOUT INPUT STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Button CSS
   * @returns {string} - Primary layout button CSS
   */
  static generatePrimaryLayoutButtonCSS() {
    let css = '/* PRIMARY LAYOUT BUTTON STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Feature Indicators CSS
   * @returns {string} - Primary layout feature indicators CSS
   */
  static generatePrimaryLayoutFeatureIndicatorsCSS() {
    let css = '/* PRIMARY LAYOUT FEATURE INDICATORS STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_FEATURE_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Action Features CSS
   * @returns {string} - Primary layout action features CSS
   */
  static generatePrimaryLayoutActionFeaturesCSS() {
    let css = '/* PRIMARY LAYOUT ACTION FEATURES STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_ACTION_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Animations CSS
   * @returns {string} - Primary layout animations CSS
   */
  static generatePrimaryLayoutAnimationsCSS() {
    let css = '/* PRIMARY LAYOUT ANIMATIONS STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout States CSS
   * @returns {string} - Primary layout states CSS
   */
  static generatePrimaryLayoutStatesCSS() {
    let css = '/* PRIMARY LAYOUT STATES STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_STATES_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Interactive Features CSS
   * @returns {string} - Primary layout interactive features CSS
   */
  static generatePrimaryLayoutInteractiveFeaturesCSS() {
    let css = '/* PRIMARY LAYOUT INTERACTIVE FEATURES STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_INTERACTIVE_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Primary Layout Responsive CSS
   * @returns {string} - Primary layout responsive CSS
   */
  static generatePrimaryLayoutResponsiveCSS() {
    let css = '/* PRIMARY LAYOUT RESPONSIVE STYLES */\n';
    css += this.generateLayoutPrimaryCardsCSS(PRIMARY_LAYOUT_RESPONSIVE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Layout Primary Cards CSS classes
   * @returns {string} - Complete layout primary cards CSS
   */
  static generateAllLayoutPrimaryCardsCSS() {
    let css = '/* === LAYOUT PRIMARY CARDS === */\n\n';

    css += this.generatePrimaryLayoutContainerCSS();
    css += this.generatePrimaryLayoutHeaderCSS();
    css += this.generatePrimaryLayoutContentCSS();
    css += this.generatePrimaryLayoutInputCSS();
    css += this.generatePrimaryLayoutButtonCSS();
    css += this.generatePrimaryLayoutFeatureIndicatorsCSS();
    css += this.generatePrimaryLayoutActionFeaturesCSS();
    css += this.generatePrimaryLayoutAnimationsCSS();
    css += this.generatePrimaryLayoutStatesCSS();
    css += this.generatePrimaryLayoutInteractiveFeaturesCSS();
    css += this.generatePrimaryLayoutResponsiveCSS();

    return css;
  }

  /**
   * Gets όλες τις available layout primary cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllLayoutPrimaryCardsClasses() {
    return {
      ...PRIMARY_LAYOUT_CONTAINER_STYLES,
      ...PRIMARY_LAYOUT_HEADER_STYLES,
      ...PRIMARY_LAYOUT_CONTENT_STYLES,
      ...PRIMARY_LAYOUT_INPUT_STYLES,
      ...PRIMARY_LAYOUT_BUTTON_STYLES,
      ...PRIMARY_LAYOUT_FEATURE_INDICATORS_STYLES,
      ...PRIMARY_LAYOUT_ACTION_FEATURES_STYLES,
      ...PRIMARY_LAYOUT_ANIMATIONS_STYLES,
      ...PRIMARY_LAYOUT_STATES_STYLES,
      ...PRIMARY_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      ...PRIMARY_LAYOUT_RESPONSIVE_STYLES
    };
  }

  /**
   * Gets specific layout primary cards category
   * @param {string} category - Category (container, header, content, input, button, featureIndicators, actionFeatures, animations, states, interactiveFeatures, responsive)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getLayoutPrimaryCardsCategory(category) {
    const categories = {
      container: PRIMARY_LAYOUT_CONTAINER_STYLES,
      header: PRIMARY_LAYOUT_HEADER_STYLES,
      content: PRIMARY_LAYOUT_CONTENT_STYLES,
      input: PRIMARY_LAYOUT_INPUT_STYLES,
      button: PRIMARY_LAYOUT_BUTTON_STYLES,
      featureIndicators: PRIMARY_LAYOUT_FEATURE_INDICATORS_STYLES,
      actionFeatures: PRIMARY_LAYOUT_ACTION_FEATURES_STYLES,
      animations: PRIMARY_LAYOUT_ANIMATIONS_STYLES,
      states: PRIMARY_LAYOUT_STATES_STYLES,
      interactiveFeatures: PRIMARY_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      responsive: PRIMARY_LAYOUT_RESPONSIVE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout primary cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutPrimaryCardsClasses() {
    try {
      const allClasses = this.getAllLayoutPrimaryCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid layout primary cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for layout primary cards class: ${className}`);
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
      console.error('Layout primary cards classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutPrimaryCardsBuilder;