/**
 * LayoutSecondaryCardsBuilder.js - Layout Secondary Cards Builder
 *
 * Single Responsibility: Μόνο layout secondary cards CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/main/layout/layout-secondary-cards.html
 */

/**
 * Secondary Layout Container Styles
 */
export const SECONDARY_LAYOUT_CONTAINER_STYLES = {
  'layera-secondary-layout': {
    padding: 'var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #f3e5f5 100%)',
    border: '2px solid var(--layera-color-secondary)',
    borderRadius: 'var(--layera-radius-lg)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(144, 19, 254, 0.15)'
  },
  'layera-secondary-layout::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, var(--layera-color-secondary) 0%, #ba68c8 50%, var(--layera-color-secondary) 100%)',
    animation: 'secondaryWave 5s ease-in-out infinite'
  },
  'layera-secondary-layout::after': {
    content: '🗂️',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-lg)',
    opacity: '0.8',
    animation: 'secondaryFloat 4s ease-in-out infinite'
  }
};

/**
 * Secondary Layout Header Styles
 */
export const SECONDARY_LAYOUT_HEADER_STYLES = {
  'layera-secondary-header': {
    margin: '0 0 var(--layera-space-3) 0',
    color: 'var(--layera-color-secondary)',
    fontSize: 'var(--layera-font-size-lg)',
    fontWeight: 'var(--layera-font-weight-bold)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    textShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative'
  },
  'layera-secondary-header::before': {
    content: '🗂️',
    fontSize: 'var(--layera-font-size-xl)',
    animation: 'secondaryRotate 6s ease-in-out infinite'
  },
  'layera-secondary-header::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '0',
    width: '80px',
    height: '2px',
    background: 'linear-gradient(90deg, var(--layera-color-secondary), transparent)',
    borderRadius: 'var(--layera-radius-full)'
  }
};

/**
 * Secondary Layout Content Styles
 */
export const SECONDARY_LAYOUT_CONTENT_STYLES = {
  'layera-secondary-content': {
    marginBottom: 'var(--layera-space-4)'
  },
  'layera-secondary-description': {
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)',
    margin: '0 0 var(--layera-space-4) 0',
    padding: 'var(--layera-space-3)',
    background: 'rgba(144, 19, 254, 0.08)',
    border: '1px solid rgba(144, 19, 254, 0.2)',
    borderRadius: 'var(--layera-radius-md)',
    fontWeight: 'var(--layera-font-weight-medium)',
    position: 'relative',
    lineHeight: '1.6'
  },
  'layera-secondary-description::before': {
    content: '📋',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-3)',
    fontSize: 'var(--layera-font-size-sm)',
    opacity: '0.8'
  },
  'layera-secondary-description-text': {
    marginLeft: 'var(--layera-space-6)',
    fontStyle: 'italic'
  }
};

/**
 * Secondary Layout Select Styles
 */
export const SECONDARY_LAYOUT_SELECT_STYLES = {
  'layera-secondary-select': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    border: '2px solid var(--layera-color-secondary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-sm)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    marginBottom: 'var(--layera-space-3)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(144, 19, 254, 0.15)',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"%239013FE\\\"><polyline points=\\\"6,9 12,15 18,9\\\"></polyline></svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right var(--layera-space-3) center',
    backgroundSize: '18px',
    paddingRight: 'var(--layera-space-10)',
    cursor: 'pointer'
  },
  'layera-secondary-select:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-secondary)',
    boxShadow: '0 0 0 4px rgba(144, 19, 254, 0.25), 0 4px 16px rgba(144, 19, 254, 0.3)',
    background: '#faf8ff',
    transform: 'translateY(-1px)'
  },
  'layera-secondary-select:hover': {
    borderColor: '#7b1fa2',
    boxShadow: '0 4px 12px rgba(144, 19, 254, 0.25)',
    background: '#faf8ff'
  },
  'layera-secondary-option': {
    padding: 'var(--layera-space-2)',
    background: 'white',
    color: 'var(--layera-text-primary)',
    fontSize: 'var(--layera-font-size-sm)'
  },
  'layera-secondary-option:checked': {
    background: 'var(--layera-color-secondary)',
    color: 'white'
  }
};

/**
 * Secondary Layout Button Styles
 */
export const SECONDARY_LAYOUT_BUTTON_STYLES = {
  'layera-secondary-btn': {
    width: '100%',
    padding: 'var(--layera-space-3) var(--layera-space-4)',
    background: 'linear-gradient(135deg, var(--layera-color-secondary) 0%, #7b1fa2 100%)',
    color: 'white',
    border: '2px solid var(--layera-color-secondary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-md)',
    fontWeight: 'var(--layera-font-weight-bold)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 16px rgba(144, 19, 254, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-secondary-btn::before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.6s ease'
  },
  'layera-secondary-btn:hover::before': {
    left: '100%'
  },
  'layera-secondary-btn:hover': {
    background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 24px rgba(144, 19, 254, 0.5)',
    borderColor: '#6a1b9a'
  },
  'layera-secondary-btn:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(144, 19, 254, 0.6)'
  }
};

/**
 * Secondary Layout Feature Indicators Styles
 */
export const SECONDARY_LAYOUT_FEATURE_INDICATORS_STYLES = {
  'layera-secondary-feature-strip': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '3px',
    background: 'repeating-linear-gradient(45deg, var(--layera-color-secondary), var(--layera-color-secondary) 12px, transparent 12px, transparent 24px)',
    animation: 'secondarySlide 6s linear infinite'
  },
  'layera-secondary-badge': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--layera-space-1)',
    padding: 'var(--layera-space-1) var(--layera-space-3)',
    background: 'var(--layera-color-secondary)',
    color: 'white',
    fontSize: 'var(--layera-font-size-xs)',
    fontWeight: 'var(--layera-font-weight-bold)',
    borderRadius: 'var(--layera-radius-full)',
    marginBottom: 'var(--layera-space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 6px rgba(144, 19, 254, 0.3)'
  },
  'layera-secondary-badge::before': {
    content: '📂',
    fontSize: '12px'
  }
};

/**
 * Secondary Layout Option Features Styles
 */
export const SECONDARY_LAYOUT_OPTION_FEATURES_STYLES = {
  'layera-secondary-option-notice': {
    marginTop: 'var(--layera-space-4)',
    padding: 'var(--layera-space-3)',
    background: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
    border: '1px solid var(--layera-color-secondary)',
    borderRadius: 'var(--layera-radius-md)',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-text-muted)',
    position: 'relative'
  },
  'layera-secondary-option-notice::before': {
    content: '⚙️',
    position: 'absolute',
    top: 'var(--layera-space-2)',
    left: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)',
    color: 'var(--layera-color-secondary)'
  },
  'layera-secondary-option-text': {
    marginLeft: 'var(--layera-space-6)',
    lineHeight: '1.5',
    fontWeight: 'var(--layera-font-weight-medium)'
  },
  'layera-secondary-option-list': {
    marginTop: 'var(--layera-space-3)',
    padding: '0',
    listStyle: 'none'
  },
  'layera-secondary-option-item': {
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'white',
    border: '1px solid rgba(144, 19, 254, 0.2)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: 'var(--layera-font-size-sm)',
    position: 'relative'
  },
  'layera-secondary-option-item:hover': {
    background: 'var(--layera-color-secondary)10',
    borderColor: 'var(--layera-color-secondary)',
    transform: 'translateX(4px)'
  },
  'layera-secondary-option-item::before': {
    content: 'attr(data-icon)',
    marginRight: 'var(--layera-space-2)',
    fontSize: 'var(--layera-font-size-sm)'
  }
};

/**
 * Secondary Layout Animations Styles
 */
export const SECONDARY_LAYOUT_ANIMATIONS_STYLES = {
  '@keyframes secondaryWave': {
    '0%': { transform: 'scaleY(1)', opacity: '1' },
    '50%': { transform: 'scaleY(1.3)', opacity: '0.8' },
    '100%': { transform: 'scaleY(1)', opacity: '1' }
  },
  '@keyframes secondaryFloat': {
    '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.8' },
    '33%': { transform: 'translateY(-3px) rotate(2deg)', opacity: '1' },
    '66%': { transform: 'translateY(3px) rotate(-2deg)', opacity: '0.9' },
    '100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.8' }
  },
  '@keyframes secondaryRotate': {
    '0%': { transform: 'rotate(0deg) scale(1)' },
    '25%': { transform: 'rotate(3deg) scale(1.05)' },
    '50%': { transform: 'rotate(0deg) scale(1)' },
    '75%': { transform: 'rotate(-3deg) scale(1.05)' },
    '100%': { transform: 'rotate(0deg) scale(1)' }
  },
  '@keyframes secondarySlide': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(24px)' }
  },
  '@keyframes secondaryPulse': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '50%': { transform: 'scale(1.05)', opacity: '0.9' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  }
};

/**
 * Secondary Layout States Styles
 */
export const SECONDARY_LAYOUT_STATES_STYLES = {
  'layera-secondary-layout--loading': {
    opacity: '0.9',
    pointerEvents: 'none',
    animation: 'secondaryPulse 2s ease-in-out infinite'
  },
  'layera-secondary-layout--expanded': {
    borderColor: 'var(--layera-color-success)',
    background: 'linear-gradient(135deg, var(--layera-color-surface) 0%, #f1f8e9 100%)',
    boxShadow: '0 8px 24px rgba(144, 19, 254, 0.25)'
  },
  'layera-secondary-layout--minimized': {
    transform: 'scale(0.98)',
    opacity: '0.8',
    boxShadow: '0 2px 8px rgba(144, 19, 254, 0.15)'
  },
  'layera-secondary-btn--loading': {
    background: '#9e9e9e',
    cursor: 'not-allowed',
    transform: 'none'
  },
  'layera-secondary-btn--loading::after': {
    content: '🔄',
    marginLeft: 'var(--layera-space-2)',
    animation: 'secondaryRotate 2s linear infinite'
  },
  'layera-secondary-select--filled': {
    borderColor: 'var(--layera-color-success)',
    background: '#f9fff9'
  },
  'layera-secondary-select--processing': {
    background: 'linear-gradient(90deg, #faf8ff 0%, #f3e5f5 50%, #faf8ff 100%)',
    backgroundSize: '200% 100%',
    animation: 'secondarySlide 3s linear infinite'
  }
};

/**
 * Secondary Layout Interactive Features Styles
 */
export const SECONDARY_LAYOUT_INTERACTIVE_FEATURES_STYLES = {
  'layera-secondary-dropdown': {
    position: 'relative'
  },
  'layera-secondary-dropdown-menu': {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'white',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-md)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    zIndex: '1000',
    maxHeight: '250px',
    overflowY: 'auto',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease'
  },
  'layera-secondary-dropdown-menu--visible': {
    opacity: '1',
    visibility: 'visible',
    transform: 'translateY(0)'
  },
  'layera-secondary-dropdown-item': {
    padding: 'var(--layera-space-3)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--layera-color-border)',
    fontSize: 'var(--layera-font-size-sm)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)'
  },
  'layera-secondary-dropdown-item:hover': {
    background: 'var(--layera-color-secondary)10',
    color: 'var(--layera-color-secondary)'
  },
  'layera-secondary-status-indicator': {
    position: 'absolute',
    bottom: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--layera-color-secondary)',
    animation: 'secondaryPulse 2s ease-in-out infinite'
  }
};

/**
 * Secondary Layout Responsive Styles
 */
export const SECONDARY_LAYOUT_RESPONSIVE_STYLES = {
  '@media (max-width: 768px)': {
    'layera-secondary-layout': {
      padding: 'var(--layera-space-3)',
      margin: 'var(--layera-space-2)'
    },
    'layera-secondary-header': {
      fontSize: 'var(--layera-font-size-md)',
      flexDirection: 'column',
      textAlign: 'center',
      gap: 'var(--layera-space-1)'
    },
    'layera-secondary-btn': {
      padding: 'var(--layera-space-4)',
      fontSize: 'var(--layera-font-size-md)'
    },
    'layera-secondary-option-item': {
      padding: 'var(--layera-space-3)',
      fontSize: 'var(--layera-font-size-sm)'
    }
  },
  '@media (max-width: 480px)': {
    'layera-secondary-layout': {
      borderRadius: 'var(--layera-radius-md)',
      margin: 'var(--layera-space-1)'
    },
    'layera-secondary-select': {
      fontSize: 'var(--layera-font-size-md)',
      padding: 'var(--layera-space-4)'
    },
    'layera-secondary-description': {
      fontSize: 'var(--layera-font-size-sm)',
      padding: 'var(--layera-space-2)'
    },
    'layera-secondary-option-item': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--layera-space-1)'
    }
  }
};

/**
 * LayoutSecondaryCardsBuilder Class - Enterprise Layout Secondary Cards CSS Generation
 */
export class LayoutSecondaryCardsBuilder {
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
   * Generates CSS από layout secondary cards class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutSecondaryCardsCSS(classDefinitions) {
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
   * Generates Secondary Layout Container CSS
   * @returns {string} - Secondary layout container CSS
   */
  static generateSecondaryLayoutContainerCSS() {
    let css = '/* SECONDARY LAYOUT CONTAINER STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_CONTAINER_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Header CSS
   * @returns {string} - Secondary layout header CSS
   */
  static generateSecondaryLayoutHeaderCSS() {
    let css = '/* SECONDARY LAYOUT HEADER STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_HEADER_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Content CSS
   * @returns {string} - Secondary layout content CSS
   */
  static generateSecondaryLayoutContentCSS() {
    let css = '/* SECONDARY LAYOUT CONTENT STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_CONTENT_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Select CSS
   * @returns {string} - Secondary layout select CSS
   */
  static generateSecondaryLayoutSelectCSS() {
    let css = '/* SECONDARY LAYOUT SELECT STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_SELECT_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Button CSS
   * @returns {string} - Secondary layout button CSS
   */
  static generateSecondaryLayoutButtonCSS() {
    let css = '/* SECONDARY LAYOUT BUTTON STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_BUTTON_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Feature Indicators CSS
   * @returns {string} - Secondary layout feature indicators CSS
   */
  static generateSecondaryLayoutFeatureIndicatorsCSS() {
    let css = '/* SECONDARY LAYOUT FEATURE INDICATORS STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_FEATURE_INDICATORS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Option Features CSS
   * @returns {string} - Secondary layout option features CSS
   */
  static generateSecondaryLayoutOptionFeaturesCSS() {
    let css = '/* SECONDARY LAYOUT OPTION FEATURES STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_OPTION_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Animations CSS
   * @returns {string} - Secondary layout animations CSS
   */
  static generateSecondaryLayoutAnimationsCSS() {
    let css = '/* SECONDARY LAYOUT ANIMATIONS STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_ANIMATIONS_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout States CSS
   * @returns {string} - Secondary layout states CSS
   */
  static generateSecondaryLayoutStatesCSS() {
    let css = '/* SECONDARY LAYOUT STATES STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_STATES_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Interactive Features CSS
   * @returns {string} - Secondary layout interactive features CSS
   */
  static generateSecondaryLayoutInteractiveFeaturesCSS() {
    let css = '/* SECONDARY LAYOUT INTERACTIVE FEATURES STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_INTERACTIVE_FEATURES_STYLES);
    return css;
  }

  /**
   * Generates Secondary Layout Responsive CSS
   * @returns {string} - Secondary layout responsive CSS
   */
  static generateSecondaryLayoutResponsiveCSS() {
    let css = '/* SECONDARY LAYOUT RESPONSIVE STYLES */\n';
    css += this.generateLayoutSecondaryCardsCSS(SECONDARY_LAYOUT_RESPONSIVE_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Layout Secondary Cards CSS classes
   * @returns {string} - Complete layout secondary cards CSS
   */
  static generateAllLayoutSecondaryCardsCSS() {
    let css = '/* === LAYOUT SECONDARY CARDS === */\n\n';

    css += this.generateSecondaryLayoutContainerCSS();
    css += this.generateSecondaryLayoutHeaderCSS();
    css += this.generateSecondaryLayoutContentCSS();
    css += this.generateSecondaryLayoutSelectCSS();
    css += this.generateSecondaryLayoutButtonCSS();
    css += this.generateSecondaryLayoutFeatureIndicatorsCSS();
    css += this.generateSecondaryLayoutOptionFeaturesCSS();
    css += this.generateSecondaryLayoutAnimationsCSS();
    css += this.generateSecondaryLayoutStatesCSS();
    css += this.generateSecondaryLayoutInteractiveFeaturesCSS();
    css += this.generateSecondaryLayoutResponsiveCSS();

    return css;
  }

  /**
   * Gets όλες τις available layout secondary cards classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllLayoutSecondaryCardsClasses() {
    return {
      ...SECONDARY_LAYOUT_CONTAINER_STYLES,
      ...SECONDARY_LAYOUT_HEADER_STYLES,
      ...SECONDARY_LAYOUT_CONTENT_STYLES,
      ...SECONDARY_LAYOUT_SELECT_STYLES,
      ...SECONDARY_LAYOUT_BUTTON_STYLES,
      ...SECONDARY_LAYOUT_FEATURE_INDICATORS_STYLES,
      ...SECONDARY_LAYOUT_OPTION_FEATURES_STYLES,
      ...SECONDARY_LAYOUT_ANIMATIONS_STYLES,
      ...SECONDARY_LAYOUT_STATES_STYLES,
      ...SECONDARY_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      ...SECONDARY_LAYOUT_RESPONSIVE_STYLES
    };
  }

  /**
   * Gets specific layout secondary cards category
   * @param {string} category - Category (container, header, content, select, button, featureIndicators, optionFeatures, animations, states, interactiveFeatures, responsive)
   * @returns {object|null} - Category classes ή null αν δεν υπάρχει
   */
  static getLayoutSecondaryCardsCategory(category) {
    const categories = {
      container: SECONDARY_LAYOUT_CONTAINER_STYLES,
      header: SECONDARY_LAYOUT_HEADER_STYLES,
      content: SECONDARY_LAYOUT_CONTENT_STYLES,
      select: SECONDARY_LAYOUT_SELECT_STYLES,
      button: SECONDARY_LAYOUT_BUTTON_STYLES,
      featureIndicators: SECONDARY_LAYOUT_FEATURE_INDICATORS_STYLES,
      optionFeatures: SECONDARY_LAYOUT_OPTION_FEATURES_STYLES,
      animations: SECONDARY_LAYOUT_ANIMATIONS_STYLES,
      states: SECONDARY_LAYOUT_STATES_STYLES,
      interactiveFeatures: SECONDARY_LAYOUT_INTERACTIVE_FEATURES_STYLES,
      responsive: SECONDARY_LAYOUT_RESPONSIVE_STYLES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout secondary cards classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutSecondaryCardsClasses() {
    try {
      const allClasses = this.getAllLayoutSecondaryCardsClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid layout secondary cards class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for layout secondary cards class: ${className}`);
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
      console.error('Layout secondary cards classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutSecondaryCardsBuilder;