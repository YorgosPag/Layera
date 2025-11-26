/**
 * LayoutBuilder.js - Enterprise Layout Classes Builder Module
 *
 * Single Responsibility: Μόνο layout CSS classes generation
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Layout Overlay Classes - For fullscreen overlays και close buttons
 */
export const LAYERA_LAYOUT_OVERLAY_CLASSES = {
  'layera-layout-fullscreen-overlay': {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '9999',
    background: 'white'
  },
  'layera-layout-close-button': {
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    background: 'var(--live-danger-color)',
    color: 'white',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--live-border-radius)',
    cursor: 'pointer',
    zIndex: '10000',
    border: 'none'
  }
};

/**
 * Layout Navigation Classes - For main containers και navigation layouts
 */
export const LAYERA_LAYOUT_NAVIGATION_CLASSES = {
  'layera-layout-main-container': {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },
  'layera-layout-flex-container': {
    display: 'flex',
    flex: '1',
    minHeight: '0'
  },
  'layera-layout-sidebar-transition': {
    transition: 'width 0.3s ease',
    overflow: 'hidden'
  },
  'layera-settings-sidebar': {
    width: '280px',
    background: '#34495e',
    color: 'white',
    height: '100vh',
    order: '1'
  }
};

/**
 * Layout Utility Classes - For common layout patterns
 */
export const LAYERA_LAYOUT_UTILITY_CLASSES = {
  'layera-layout-full-width': {
    width: '100%'
  },
  'layera-layout-full-height': {
    height: '100%'
  },
  'layera-layout-bg-primary': {
    background: 'var(--live-primary-color)'
  },
  'layera-layout-bg-white': {
    background: 'white'
  },
  'layera-layout-padding-md': {
    padding: 'var(--layera-space-4)'
  },
  'layera-layout-margin-md': {
    margin: 'var(--layera-space-4)'
  },
  // ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ UTILITY CLASSES - ULTRA HIGH SPECIFICITY
  'layera-center-text': {
    textAlign: 'center !important'
  },
  'layera-force-center': {
    textAlign: 'center !important',
    display: 'block !important',
    margin: '0 auto !important',
    width: '100% !important'
  },
  'layera-ultra-center': {
    textAlign: 'center !important',
    display: 'block !important',
    margin: '0 auto !important',
    width: '100% !important',
    position: 'relative !important'
  },
  'layera-center-flex': {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  },
  'layera-center-flex-column': {
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  },
  'layera-center-content': {
    textAlign: 'center !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  }
};

/**
 * LayoutBuilder Class - Enterprise Layout CSS Generation
 */
export class LayoutBuilder {
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
   * Generates CSS από layout class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateLayoutCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates όλες τις Layout CSS classes
   * @returns {string} - Complete layout CSS
   */
  static generateAllLayoutCSS() {
    let css = '/* === LAYERA LAYOUT CLASSES === */\n\n';

    // Overlay Classes
    css += '/* OVERLAY CLASSES */\n';
    css += this.generateLayoutCSS(LAYERA_LAYOUT_OVERLAY_CLASSES);

    // Navigation Classes
    css += '/* NAVIGATION CLASSES */\n';
    css += this.generateLayoutCSS(LAYERA_LAYOUT_NAVIGATION_CLASSES);

    // Utility Classes
    css += '/* UTILITY CLASSES */\n';
    css += this.generateLayoutCSS(LAYERA_LAYOUT_UTILITY_CLASSES);

    return css;
  }

  /**
   * Gets όλες τις available layout classes
   * @returns {object} - Object με όλες τις layout class definitions
   */
  static getAllLayoutClasses() {
    return {
      ...LAYERA_LAYOUT_OVERLAY_CLASSES,
      ...LAYERA_LAYOUT_NAVIGATION_CLASSES,
      ...LAYERA_LAYOUT_UTILITY_CLASSES
    };
  }

  /**
   * Gets specific layout category
   * @param {string} category - Layout category (overlay, navigation, utility)
   * @returns {object|null} - Layout group ή null αν δεν υπάρχει
   */
  static getLayoutCategory(category) {
    const categories = {
      overlay: LAYERA_LAYOUT_OVERLAY_CLASSES,
      navigation: LAYERA_LAYOUT_NAVIGATION_CLASSES,
      utility: LAYERA_LAYOUT_UTILITY_CLASSES
    };

    return categories[category] || null;
  }

  /**
   * Validates ότι όλες οι layout classes έχουν valid CSS
   * @returns {boolean} - true αν όλες είναι έγκυρες
   */
  static validateLayoutClasses() {
    try {
      const allClasses = this.getAllLayoutClasses();

      Object.entries(allClasses).forEach(([className, styles]) => {
        if (typeof className !== 'string' || !className.trim()) {
          throw new Error(`Invalid class name: ${className}`);
        }
        if (typeof styles !== 'object' || styles === null) {
          throw new Error(`Invalid styles for class: ${className}`);
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
      console.error('Layout classes validation failed:', error.message);
      return false;
    }
  }
}

export default LayoutBuilder;