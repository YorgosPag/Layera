/**
 * LayoutDangerCardsBuilder.js - Layout Danger Cards Builder
 *
 * Single Responsibility: Μόνο layout danger cards CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/main/layout/layout-danger-cards.html
 */

/**
 * Danger Layout Container Styles
 */
export const DANGER_LAYOUT_CONTAINER_STYLES = {
  'layera-danger-layout': {
    padding: 'var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #fef5f5 100%)',
    border: '2px solid var(--layera-color-danger)',
    borderRadius: 'var(--layera-radius-lg)',
    position: 'relative',
    overflow: 'hidden'
  },
  'layera-danger-layout::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--layera-color-danger) 0%, #ff6b6b 50%, var(--layera-color-danger) 100%)',
    animation: 'dangerPulse 2s ease-in-out infinite'
  },
  'layera-danger-layout::after': {
    content: '⚠️',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.7',
    animation: 'warningBlink 3s ease-in-out infinite'
  }
};

/**
 * Danger Layout Header Styles
 */
export const DANGER_LAYOUT_HEADER_STYLES = {
  'layera-danger-header': {
    margin: '0 0 var(--layera-space-3) 0',
    color: 'var(--layera-color-danger)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  'layera-danger-header::before': {
    content: '🚨',
    fontSize: 'var(--layera-font-size-xl)',
    animation: 'emergencyFlash 1.5s ease-in-out infinite'
  }
};

/**
 * Danger Layout Content Styles
 */
export const DANGER_LAYOUT_CONTENT_STYLES = {
  'layera-danger-content': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-danger-description': {
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0 0 var(--layera-space-4) 0',
    padding: 'var(--layera-space-2)',
    background: 'rgba(244, 67, 54, 0.1)',
    border: '1px solid rgba(244, 67, 54, 0.2)',
    borderRadius: 'var(--layera-radius-sm)',
    fontWeight: 'var(--layera-font-weight-medium)'
  }
};

/**
 * Danger Layout Input Styles
 */
export const DANGER_LAYOUT_INPUT_STYLES = {
  'layera-danger-input': {
    width: '100%',
    padding: 'var(--layera-space-3)',
    border: '2px solid var(--layera-color-danger)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    fontFamily: 'var(--layera-font-family-mono)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(244, 67, 54, 0.2)'
  },
  'layera-danger-input::placeholder': {
    color: 'var(--layera-color-danger)',
    opacity: '0.7',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-danger-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-danger)',
    boxShadow: '0 0 0 4px rgba(244, 67, 54, 0.2), 0 4px 12px rgba(244, 67, 54, 0.3)',
    background: '#fff5f5'
  },
  'layera-danger-input:hover': {
    borderColor: '#d32f2f',
    boxShadow: '0 4px 8px rgba(244, 67, 54, 0.25)'
  }
};

/**
 * Danger Layout Button Styles
 */
export const DANGER_LAYOUT_BUTTON_STYLES = {
  'layera-danger-btn': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-danger) 0%, #d32f2f 100%)',
    color: 'white',
    border: '2px solid var(--layera-color-danger)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-bold)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 12px rgba(244, 67, 54, 0.4)'
  },
  'layera-danger-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s ease'
  },
  'layera-danger-btn:hover::before': {
    left: '100%'
  },
  'layera-danger-btn:hover': {
    background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(244, 67, 54, 0.5)',
    borderColor: '#c62828'
  },
  'layera-danger-btn:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(244, 67, 54, 0.6)'
  }
};

/**
 * Danger Layout Warning Indicators Styles
 */
export const DANGER_LAYOUT_WARNING_INDICATORS_STYLES = {
  'layera-danger-warning-strip': {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'repeating-linear-gradient(45deg, var(--layera-color-danger), var(--layera-color-danger) 10px, transparent 10px, transparent 20px)',
    animation: 'warningStripe 2s linear infinite'
  },
  'layera-danger-confirmation-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-2)',
    background: 'var(--layera-color-danger)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    borderRadius: 'var(--layera-radius-full)',
    marginBottom: 'var(--layera-space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  'layera-danger-confirmation-badge::before': {
    content: '🔒',
    fontSize: '12px'
  }
};

/**
 * Danger Layout Security Features Styles
 */
export const DANGER_LAYOUT_SECURITY_FEATURES_STYLES = {
  'layera-danger-security-notice': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, #fff3e0 0%, #ffebee 100%)',
    border: '1px solid var(--layera-color-warning)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    position: 'relative'
  },
  'layera-danger-security-notice::before': {
    content: '⚡',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-warning)'
  },
  'layera-danger-security-text': {
    marginLeft: 'var(--layera-space-6)',
    lineHeight: '1.4',
    fontWeight: 'var(--layera-font-weight-medium)'
  }
};

/**
 * Danger Layout Animations Styles
 */
export const DANGER_LAYOUT_ANIMATIONS_STYLES = {
  '@keyframes dangerPulse': {
    '0%': { opacity: '1', transform: 'scaleY(1)' },
    '50%': { opacity: '0.7', transform: 'scaleY(0.8)' },
    '100%': { opacity: '1', transform: 'scaleY(1)' }
  },
  '@keyframes warningBlink': {
    '0%': { opacity: '0.7' },
    '50%': { opacity: '1' },
    '100%': { opacity: '0.7' }
  },
  '@keyframes emergencyFlash': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.1)', opacity: '0.8' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  '@keyframes warningStripe': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(20px)' }
  },
  '@keyframes dangerShake': {
    '0%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-2px)' },
    '50%': { transform: 'translateX(2px)' },
    '75%': { transform: 'translateX(-1px)' },
    '100%': { transform: 'translateX(0)' }
  }
};

/**
 * Danger Layout States Styles
 */
export const DANGER_LAYOUT_STATES_STYLES = {
  'layera-danger-layout--loading': {
    opacity: '0.7',
    pointerEvents: 'none'
  },
  'layera-danger-layout--confirmed': {
    borderColor: 'var(--layera-color-success)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #f1f8e9 100%)'
  },
  'layera-danger-layout--error': {
    animation: 'dangerShake 0.5s ease-in-out',
    borderColor: '#b71c1c'
  },
  'layera-danger-btn--loading': {
    background: '#666',
    cursor: 'not-allowed',
    transform: 'none'
  },
  'layera-danger-btn--loading::after': {
    content: '⏳',
    marginLeft: 'var(--layera-space-2)'
  },
  'layera-danger-input--invalid': {
    borderColor: '#b71c1c',
    background: '#ffebee',
    animation: 'dangerShake 0.3s ease-in-out'
  }
};

/**
 * Danger Layout Responsive Styles
 */
export const DANGER_LAYOUT_RESPONSIVE_STYLES = {
  '@media (max-width: 768px)': {
    'layera-danger-layout': {
      padding: 'var(--layera-space-3)',
      margin: 'var(--layera-space-2)'
    },
    'layera-danger-header': {
      fontSize: 'var(--layera-font-size-md)',
      flexDirection: 'column',
      textAlign: 'center'
    },
    'layera-danger-btn': {
      padding: 'var(--layera-space-4)',
      fontSize: 'var(--layera-font-size-md)'
    }
  },
  '@media (max-width: 480px)': {
    'layera-danger-layout': {
      borderRadius: 'var(--layera-radius-sm)',
      margin: 'var(--layera-space-1)'
    },
    'layera-danger-input': {
      fontSize: 'var(--layera-font-size-md)',
      padding: 'var(--layera-space-4)'
    }
  }
};

/**
 * LayoutDangerCardsBuilder Class - Enterprise Layout Danger Cards CSS Generation
 */
export class LayoutDangerCardsBuilder {
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
   * Generates CSS από layout danger cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutDangerCardsCSS(classDefinitions) {
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
   * Generates Danger Layout Container CSS
   * @returns {string} - Danger layout container CSS
   */
  static generateDangerLayoutContainerCSS() {
    let css = '/* DANGER LAYOUT CONTAINER STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Header CSS
   * @returns {string} - Danger layout header CSS
   */
  static generateDangerLayoutHeaderCSS() {
    let css = '/* DANGER LAYOUT HEADER STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Content CSS
   * @returns {string} - Danger layout content CSS
   */
  static generateDangerLayoutContentCSS() {
    let css = '/* DANGER LAYOUT CONTENT STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Input CSS
   * @returns {string} - Danger layout input CSS
   */
  static generateDangerLayoutInputCSS() {
    let css = '/* DANGER LAYOUT INPUT STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Button CSS
   * @returns {string} - Danger layout button CSS
   */
  static generateDangerLayoutButtonCSS() {
    let css = '/* DANGER LAYOUT BUTTON STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Warning Indicators CSS
   * @returns {string} - Danger layout warning indicators CSS
   */
  static generateDangerLayoutWarningIndicatorsCSS() {
    let css = '/* DANGER LAYOUT WARNING INDICATORS STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_WARNING_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Security Features CSS
   * @returns {string} - Danger layout security features CSS
   */
  static generateDangerLayoutSecurityFeaturesCSS() {
    let css = '/* DANGER LAYOUT SECURITY FEATURES STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_SECURITY_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Animations CSS
   * @returns {string} - Danger layout animations CSS
   */
  static generateDangerLayoutAnimationsCSS() {
    let css = '/* DANGER LAYOUT ANIMATIONS STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout States CSS
   * @returns {string} - Danger layout states CSS
   */
  static generateDangerLayoutStatesCSS() {
    let css = '/* DANGER LAYOUT STATES STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_STATES_STYLES);
    return css;
  }

  /**
   * Generates Danger Layout Responsive CSS
   * @returns {string} - Danger layout responsive CSS
   */
  static generateDangerLayoutResponsiveCSS() {
    let css = '/* DANGER LAYOUT RESPONSIVE STYLES */\n';
    css += this.generateLayoutDangerCardsCSS(DANGER_LAYOUT_RESPONSIVE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Layout Danger Cards CSS classes
   * @returns {string} - Complete layout danger cards CSS
   */
  static generateAllLayoutDangerCardsCSS() {
    let css = '/* === LAYOUT DANGER CARDS === */\n\n';

    css += this.generateDangerLayoutContainerCSS();
    css += this.generateDangerLayoutHeaderCSS();
    css += this.generateDangerLayoutContentCSS();
    css += this.generateDangerLayoutInputCSS();
    css += this.generateDangerLayoutButtonCSS();
    css += this.generateDangerLayoutWarningIndicatorsCSS();
    css += this.generateDangerLayoutSecurityFeaturesCSS();
    css += this.generateDangerLayoutAnimationsCSS();
    css += this.generateDangerLayoutStatesCSS();
    css += this.generateDangerLayoutResponsiveCSS();

    return css;
  }

  /**
   * Gets όλες τις available layout danger cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllLayoutDangerCardsClasses() {
    return {
      ...DANGER_LAYOUT_CONTAINER_STYLES,
      ...DANGER_LAYOUT_HEADER_STYLES,
      ...DANGER_LAYOUT_CONTENT_STYLES,
      ...DANGER_LAYOUT_INPUT_STYLES,
      ...DANGER_LAYOUT_BUTTON_STYLES,
      ...DANGER_LAYOUT_WARNING_INDICATORS_STYLES,
      ...DANGER_LAYOUT_SECURITY_FEATURES_STYLES,
      ...DANGER_LAYOUT_ANIMATIONS_STYLES,
      ...DANGER_LAYOUT_STATES_STYLES,
      ...DANGER_LAYOUT_RESPONSIVE_STYLES
    };
  }

  /**
   * Gets specific layout danger cards category
   * @param {string} category - Category (container, header, content, input, button, warningIndicators, securityFeatures, animations, states, responsive)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getLayoutDangerCardsCategory(category) {
    const categories = {
      container: DANGER_LAYOUT_CONTAINER_STYLES,
      header: DANGER_LAYOUT_HEADER_STYLES,
      content: DANGER_LAYOUT_CONTENT_STYLES,
      input: DANGER_LAYOUT_INPUT_STYLES,
      button: DANGER_LAYOUT_BUTTON_STYLES,
      warningIndicators: DANGER_LAYOUT_WARNING_INDICATORS_STYLES,
      securityFeatures: DANGER_LAYOUT_SECURITY_FEATURES_STYLES,
      animations: DANGER_LAYOUT_ANIMATIONS_STYLES,
      states: DANGER_LAYOUT_STATES_STYLES,
      responsive: DANGER_LAYOUT_RESPONSIVE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout danger cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutDangerCardsClasses() {
    try {
      const allClasses = this.getAllLayoutDangerCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid layout danger cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for layout danger cards class: ${className}`);
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
      console.error('Layout danger cards classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutDangerCardsBuilder;