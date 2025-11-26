/**
 * LayoutSuccessCardsBuilder.js - Layout Success Cards Builder
 *
 * Single Responsibility: Μόνο layout success cards CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/main/layout/layout-success-cards.html
 */

/**
 * Success Layout Container Styles
 */
export const SUCCESS_LAYOUT_CONTAINER_STYLES = {
  'layera-success-layout': {
    padding: 'var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #e8f5e8 100%)',
    border: '2px solid var(--layera-color-success)',
    borderRadius: 'var(--layera-radius-lg)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(76, 175, 80, 0.15)'
  },
  'layera-success-layout::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--layera-color-success) 0%, #66bb6a 50%, var(--layera-color-success) 100%)',
    animation: 'successGlow 3s ease-in-out infinite'
  },
  'layera-success-layout::after': {
    content: '✅',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.9',
    animation: 'successCelebrate 4s ease-in-out infinite'
  }
};

/**
 * Success Layout Header Styles
 */
export const SUCCESS_LAYOUT_HEADER_STYLES = {
  'layera-success-header': {
    margin: '0 0 var(--layera-space-3) 0',
    color: 'var(--layera-color-success)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    textShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  'layera-success-header::before': {
    content: '✅',
    fontSize: 'var(--layera-font-size-xl)',
    animation: 'successBounce 2s ease-in-out infinite'
  },
  'layera-success-header::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '70px',
    height: '3px',
    background: 'linear-gradient(90deg, var(--layera-color-success), transparent)',
    borderRadius: 'var(--layera-radius-full)',
    animation: 'successExpand 2s ease-in-out infinite'
  }
};

/**
 * Success Layout Content Styles
 */
export const SUCCESS_LAYOUT_CONTENT_STYLES = {
  'layera-success-content': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-success-description': {
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0 0 var(--layera-space-4) 0',
    padding: 'var(--layera-space-3)',
    background: 'rgba(76, 175, 80, 0.08)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
    borderRadius: 'var(--layera-radius-md)',
    fontWeight: 'var(--layera-font-weight-medium)',
    position: 'relative',
    lineHeight: '1.6'
  },
  'layera-success-description::before': {
    content: '🎉',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)',
    animation: 'successSpark 3s ease-in-out infinite'
  },
  'layera-success-description-text': {
    marginLeft: 'var(--layera-space-6)',
    fontWeight: 'var(--layera-font-weight-semibold)'
  }
};

/**
 * Success Layout Input Styles
 */
export const SUCCESS_LAYOUT_INPUT_STYLES = {
  'layera-success-input': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    border: '2px solid var(--layera-color-success)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.15)',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-success-input::placeholder': {
    color: 'var(--layera-color-success)',
    opacity: '0.8',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-success-input:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-success)',
    boxShadow: '0 0 0 4px rgba(76, 175, 80, 0.25), 0 4px 16px rgba(76, 175, 80, 0.3)',
    background: '#f9fff9',
    transform: 'translateY(-1px) scale(1.01)'
  },
  'layera-success-input:hover': {
    borderColor: '#388e3c',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.25)',
    background: '#f9fff9'
  },
  'layera-success-input:valid': {
    borderColor: 'var(--layera-color-success)',
    background: '#f1f8e9',
    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.2), inset 0 1px 3px rgba(76, 175, 80, 0.1)'
  }
};

/**
 * Success Layout Button Styles
 */
export const SUCCESS_LAYOUT_BUTTON_STYLES = {
  'layera-success-btn': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-success) 0%, #388e3c 100%)',
    color: 'white',
    border: '2px solid var(--layera-color-success)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-bold)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 16px rgba(76, 175, 80, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-success-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transition: 'left 0.6s ease'
  },
  'layera-success-btn:hover::before': {
    left: '100%'
  },
  'layera-success-btn:hover': {
    background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 8px 24px rgba(76, 175, 80, 0.5)',
    borderColor: '#2e7d32'
  },
  'layera-success-btn:active': {
    transform: 'translateY(-1px) scale(1.01)',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.6)'
  }
};

/**
 * Success Layout Achievement Indicators Styles
 */
export const SUCCESS_LAYOUT_ACHIEVEMENT_INDICATORS_STYLES = {
  'layera-success-achievement-strip': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '4px',
    background: 'repeating-linear-gradient(90deg, var(--layera-color-success) 0%, #66bb6a 25%, var(--layera-color-success) 50%)',
    animation: 'successMarch 4s linear infinite'
  },
  'layera-success-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-3)',
    background: 'var(--layera-color-success)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    borderRadius: 'var(--layera-radius-full)',
    marginBottom: 'var(--layera-space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 6px rgba(76, 175, 80, 0.3)',
    animation: 'successPulse 2s ease-in-out infinite'
  },
  'layera-success-badge::before': {
    content: '💰',
    fontSize: '12px'
  }
};

/**
 * Success Layout Celebration Features Styles
 */
export const SUCCESS_LAYOUT_CELEBRATION_FEATURES_STYLES = {
  'layera-success-celebration-notice': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)',
    border: '1px solid var(--layera-color-success)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    position: 'relative'
  },
  'layera-success-celebration-notice::before': {
    content: '🏆',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-success)',
    animation: 'successTrophy 3s ease-in-out infinite'
  },
  'layera-success-celebration-text': {
    marginLeft: 'var(--layera-space-6)',
    lineHeight: '1.5',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-success-metrics': {
    marginTop: 'var(--layera-space-3)',
    display: 'flex',
    gap: 'var(--layera-space-3)',
    flexWrap: 'wrap'
  },
  'layera-success-metric': {
    flex: '1',
    minWidth: '120px',
    padding: 'var(--layera-space-2)',
    background: 'white',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    borderRadius: 'var(--layera-radius-sm)',
    textAlign: 'center',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    color: 'var(--layera-color-success)',
    transition: 'all 0.2s ease'
  },
  'layera-success-metric:hover': {
    background: 'var(--layera-color-success)10',
    borderColor: 'var(--layera-color-success)',
    transform: 'translateY(-2px)'
  },
  'layera-success-metric-value': {
    display: 'block',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-black)',
    color: 'var(--layera-color-success)',
    marginBottom: 'var(--layera-space-1)'
  },
  'layera-success-metric-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }
};

/**
 * Success Layout Animations Styles
 */
export const SUCCESS_LAYOUT_ANIMATIONS_STYLES = {
  '@keyframes successGlow': {
    '0%': { opacity: '1', boxShadow: '0 0 5px var(--layera-color-success)' },
    '50%': { opacity: '0.8', boxShadow: '0 0 20px var(--layera-color-success)' },
    '100%': { opacity: '1', boxShadow: '0 0 5px var(--layera-color-success)' }
  },
  '@keyframes successCelebrate': {
    '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.9' },
    '25%': { transform: 'scale(1.1) rotate(5deg)', opacity: '1' },
    '50%': { transform: 'scale(1) rotate(0deg)', opacity: '0.9' },
    '75%': { transform: 'scale(1.05) rotate(-3deg)', opacity: '1' },
    '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.9' }
  },
  '@keyframes successBounce': {
    '0%': { transform: 'translateY(0px) scale(1)' },
    '50%': { transform: 'translateY(-4px) scale(1.1)' },
    '100%': { transform: 'translateY(0px) scale(1)' }
  },
  '@keyframes successExpand': {
    '0%': { width: '70px', opacity: '1' },
    '50%': { width: '100px', opacity: '0.8' },
    '100%': { width: '70px', opacity: '1' }
  },
  '@keyframes successSpark': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.2)', opacity: '0.8' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  '@keyframes successMarch': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(50px)' }
  },
  '@keyframes successPulse': {
    '0%': { transform: 'scale(1)', boxShadow: '0 2px 6px rgba(76, 175, 80, 0.3)' },
    '50%': { transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(76, 175, 80, 0.5)' },
    '100%': { transform: 'scale(1)', boxShadow: '0 2px 6px rgba(76, 175, 80, 0.3)' }
  },
  '@keyframes successTrophy': {
    '0%': { transform: 'rotate(0deg) scale(1)' },
    '25%': { transform: 'rotate(10deg) scale(1.1)' },
    '50%': { transform: 'rotate(0deg) scale(1)' },
    '75%': { transform: 'rotate(-10deg) scale(1.1)' },
    '100%': { transform: 'rotate(0deg) scale(1)' }
  }
};

/**
 * Success Layout States Styles
 */
export const SUCCESS_LAYOUT_STATES_STYLES = {
  'layera-success-layout--processing': {
    opacity: '0.9',
    animation: 'successPulse 2s ease-in-out infinite'
  },
  'layera-success-layout--completed': {
    borderColor: 'var(--layera-color-success)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #e8f5e8 100%)',
    boxShadow: '0 8px 32px rgba(76, 175, 80, 0.25)'
  },
  'layera-success-layout--celebrating': {
    animation: 'successCelebrate 1s ease-in-out infinite'
  },
  'layera-success-btn--processing': {
    background: '#81c784',
    cursor: 'not-allowed',
    transform: 'none'
  },
  'layera-success-btn--processing::after': {
    content: '⏳',
    marginLeft: 'var(--layera-space-2)',
    animation: 'successSpark 2s ease-in-out infinite'
  },
  'layera-success-input--achieved': {
    borderColor: 'var(--layera-color-success)',
    background: '#e8f5e8',
    fontWeight: 'var(--layera-font-weight-bold)',
    color: 'var(--layera-color-success)'
  },
  'layera-success-input--calculating': {
    background: 'linear-gradient(90deg, #f9fff9 0%, #e8f5e8 50%, #f9fff9 100%)',
    backgroundSize: '200% 100%',
    animation: 'successMarch 3s linear infinite'
  }
};

/**
 * Success Layout Interactive Features Styles
 */
export const SUCCESS_LAYOUT_INTERACTIVE_FEATURES_STYLES = {
  'layera-success-calculator': {
    position: 'relative'
  },
  'layera-success-progress-ring': {
    position: 'absolute',
    top: '50%',
    right: 'var(--layera-space-2)',
    transform: 'translateY(-50%)',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid var(--layera-color-border)',
    borderTop: '2px solid var(--layera-color-success)',
    animation: 'spin 1s linear infinite',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  },
  'layera-success-calculator--active .layera-success-progress-ring': {
    opacity: '1'
  },
  'layera-success-confetti': {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    overflow: 'hidden'
  },
  'layera-success-confetti::before': {
    content: '🎊',
    position: 'absolute',
    top: '-20px',
    left: '20%',
    fontSize: '20px',
    animation: 'confettiFall 3s ease-in infinite',
    opacity: '0'
  },
  'layera-success-confetti::after': {
    content: '✨',
    position: 'absolute',
    top: '-20px',
    right: '20%',
    fontSize: '16px',
    animation: 'confettiFall 3s ease-in infinite 0.5s',
    opacity: '0'
  },
  'layera-success-layout--celebrating .layera-success-confetti::before': {
    opacity: '1'
  },
  'layera-success-layout--celebrating .layera-success-confetti::after': {
    opacity: '1'
  },
  '@keyframes confettiFall': {
    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
    '100%': { transform: 'translateY(200px) rotate(360deg)', opacity: '0' }
  },
  '@keyframes spin': {
    '0%': { transform: 'translateY(-50%) rotate(0deg)' },
    '100%': { transform: 'translateY(-50%) rotate(360deg)' }
  }
};

/**
 * Success Layout Responsive Styles
 */
export const SUCCESS_LAYOUT_RESPONSIVE_STYLES = {
  '@media (max-width: 768px)': {
    'layera-success-layout': {
      padding: 'var(--layera-space-3)',
      margin: 'var(--layera-space-2)'
    },
    'layera-success-header': {
      fontSize: 'var(--layera-font-size-md)',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 'var(--layera-space-1)'
    },
    'layera-success-btn': {
      padding: 'var(--layera-space-4)',
      fontSize: 'var(--layera-font-size-md)'
    },
    'layera-success-metrics': {
      flexDirection: 'column'
    }
  },
  '@media (max-width: 480px)': {
    'layera-success-layout': {
      borderRadius: 'var(--layera-radius-md)',
      margin: 'var(--layera-space-1)'
    },
    'layera-success-input': {
      fontSize: 'var(--layera-font-size-md)',
      padding: 'var(--layera-space-4)'
    },
    'layera-success-description': {
      fontSize: 'var(--layera-font-size-sm)',
      padding: 'var(--layera-space-2)'
    },
    'layera-success-metric': {
      minWidth: 'auto',
      flex: '1 1 100%'
    }
  }
};

/**
 * LayoutSuccessCardsBuilder Class - Enterprise Layout Success Cards CSS Generation
 */
export class LayoutSuccessCardsBuilder {
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
   * Generates CSS από layout success cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutSuccessCardsCSS(classDefinitions) {
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
   * Generates Success Layout Container CSS
   * @returns {string} - Success layout container CSS
   */
  static generateSuccessLayoutContainerCSS() {
    let css = '/* SUCCESS LAYOUT CONTAINER STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Header CSS
   * @returns {string} - Success layout header CSS
   */
  static generateSuccessLayoutHeaderCSS() {
    let css = '/* SUCCESS LAYOUT HEADER STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Content CSS
   * @returns {string} - Success layout content CSS
   */
  static generateSuccessLayoutContentCSS() {
    let css = '/* SUCCESS LAYOUT CONTENT STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Input CSS
   * @returns {string} - Success layout input CSS
   */
  static generateSuccessLayoutInputCSS() {
    let css = '/* SUCCESS LAYOUT INPUT STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_INPUT_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Button CSS
   * @returns {string} - Success layout button CSS
   */
  static generateSuccessLayoutButtonCSS() {
    let css = '/* SUCCESS LAYOUT BUTTON STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Achievement Indicators CSS
   * @returns {string} - Success layout achievement indicators CSS
   */
  static generateSuccessLayoutAchievementIndicatorsCSS() {
    let css = '/* SUCCESS LAYOUT ACHIEVEMENT INDICATORS STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_ACHIEVEMENT_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Celebration Features CSS
   * @returns {string} - Success layout celebration features CSS
   */
  static generateSuccessLayoutCelebrationFeaturesCSS() {
    let css = '/* SUCCESS LAYOUT CELEBRATION FEATURES STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_CELEBRATION_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Animations CSS
   * @returns {string} - Success layout animations CSS
   */
  static generateSuccessLayoutAnimationsCSS() {
    let css = '/* SUCCESS LAYOUT ANIMATIONS STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates Success Layout States CSS
   * @returns {string} - Success layout states CSS
   */
  static generateSuccessLayoutStatesCSS() {
    let css = '/* SUCCESS LAYOUT STATES STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_STATES_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Interactive Features CSS
   * @returns {string} - Success layout interactive features CSS
   */
  static generateSuccessLayoutInteractiveFeaturesCSS() {
    let css = '/* SUCCESS LAYOUT INTERACTIVE FEATURES STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_INTERACTIVE_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Success Layout Responsive CSS
   * @returns {string} - Success layout responsive CSS
   */
  static generateSuccessLayoutResponsiveCSS() {
    let css = '/* SUCCESS LAYOUT RESPONSIVE STYLES */\n';
    css += this.generateLayoutSuccessCardsCSS(SUCCESS_LAYOUT_RESPONSIVE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Layout Success Cards CSS classes
   * @returns {string} - Complete layout success cards CSS
   */
  static generateAllLayoutSuccessCardsCSS() {
    let css = '/* === LAYOUT SUCCESS CARDS === */\n\n';

    css += this.generateSuccessLayoutContainerCSS();
    css += this.generateSuccessLayoutHeaderCSS();
    css += this.generateSuccessLayoutContentCSS();
    css += this.generateSuccessLayoutInputCSS();
    css += this.generateSuccessLayoutButtonCSS();
    css += this.generateSuccessLayoutAchievementIndicatorsCSS();
    css += this.generateSuccessLayoutCelebrationFeaturesCSS();
    css += this.generateSuccessLayoutAnimationsCSS();
    css += this.generateSuccessLayoutStatesCSS();
    css += this.generateSuccessLayoutInteractiveFeaturesCSS();
    css += this.generateSuccessLayoutResponsiveCSS();

    return css;
  }

  /**
   * Gets όλες τις available layout success cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllLayoutSuccessCardsClasses() {
    return {
      ...SUCCESS_LAYOUT_CONTAINER_STYLES,
      ...SUCCESS_LAYOUT_HEADER_STYLES,
      ...SUCCESS_LAYOUT_CONTENT_STYLES,
      ...SUCCESS_LAYOUT_INPUT_STYLES,
      ...SUCCESS_LAYOUT_BUTTON_STYLES,
      ...SUCCESS_LAYOUT_ACHIEVEMENT_INDICATORS_STYLES,
      ...SUCCESS_LAYOUT_CELEBRATION_FEATURES_STYLES,
      ...SUCCESS_LAYOUT_ANIMATIONS_STYLES,
      ...SUCCESS_LAYOUT_STATES_STYLES,
      ...SUCCESS_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      ...SUCCESS_LAYOUT_RESPONSIVE_STYLES
    };
  }

  /**
   * Gets specific layout success cards category
   * @param {string} category - Category (container, header, content, input, button, achievementIndicators, celebrationFeatures, animations, states, interactiveFeatures, responsive)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getLayoutSuccessCardsCategory(category) {
    const categories = {
      container: SUCCESS_LAYOUT_CONTAINER_STYLES,
      header: SUCCESS_LAYOUT_HEADER_STYLES,
      content: SUCCESS_LAYOUT_CONTENT_STYLES,
      input: SUCCESS_LAYOUT_INPUT_STYLES,
      button: SUCCESS_LAYOUT_BUTTON_STYLES,
      achievementIndicators: SUCCESS_LAYOUT_ACHIEVEMENT_INDICATORS_STYLES,
      celebrationFeatures: SUCCESS_LAYOUT_CELEBRATION_FEATURES_STYLES,
      animations: SUCCESS_LAYOUT_ANIMATIONS_STYLES,
      states: SUCCESS_LAYOUT_STATES_STYLES,
      interactiveFeatures: SUCCESS_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      responsive: SUCCESS_LAYOUT_RESPONSIVE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout success cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutSuccessCardsClasses() {
    try {
      const allClasses = this.getAllLayoutSuccessCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid layout success cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for layout success cards class: ${className}`);
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
      console.error('Layout success cards classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutSuccessCardsBuilder;