/**
 * ApplyToSelectorBuilder.js - Right Sidebar Apply to Selector Builder
 *
 * Single Responsibility: Μόνο apply-to-selector controls CSS generation
 * ARXES COMPLIANT - αντιστοιχεί στο html/htmlComponents/sidebar/right-sidebar/apply-to-selector.html
 */

/**
 * Apply to Selector Base Styles
 */
export const APPLY_TO_SELECTOR_BASE_STYLES = {
  'layera-apply-to-selector': {
    padding: 'var(--layera-space-4)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-4)',
    border: '1px solid var(--layera-color-border)'
  },
  'layera-apply-selector-title': {
    fontSize: 'var(--layera-font-size-sm)',
    fontWeight: 'var(--layera-font-weight-semibold)',
    color: 'var(--layera-sidebar-text)',
    marginBottom: 'var(--layera-space-3)'
  }
};

/**
 * Selector Target Dropdown Styles
 */
export const SELECTOR_TARGET_DROPDOWN_STYLES = {
  'layera-selector-target-dropdown': {
    width: '100%',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    border: '1px solid var(--layera-color-border)',
    borderRadius: 'var(--layera-radius-sm)',
    background: 'white',
    color: 'var(--layera-sidebar-text)',
    fontSize: 'var(--layera-font-size-sm)',
    marginBottom: 'var(--layera-space-3)'
  },
  'layera-selector-target-dropdown:focus': {
    outline: 'none',
    borderColor: 'var(--layera-color-primary)',
    boxShadow: '0 0 0 2px var(--layera-color-primary)20'
  }
};

/**
 * Selector Preview Styles
 */
export const SELECTOR_PREVIEW_STYLES = {
  'layera-selector-preview': {
    background: 'rgba(0,0,0,0.05)',
    padding: 'var(--layera-space-3)',
    borderRadius: 'var(--layera-radius-sm)',
    marginBottom: 'var(--layera-space-3)',
    border: '1px dashed var(--layera-color-border)'
  },
  'layera-selector-preview-label': {
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-sidebar-text)',
    opacity: '0.7',
    marginBottom: 'var(--layera-space-2)'
  },
  'layera-selector-preview-code': {
    fontFamily: 'monospace',
    fontSize: 'var(--layera-font-size-xs)',
    color: 'var(--layera-color-primary)',
    background: 'white',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-xs)',
    border: '1px solid var(--layera-color-border)'
  }
};

/**
 * Apply Actions Styles
 */
export const APPLY_ACTIONS_STYLES = {
  'layera-apply-actions': {
    display: 'flex',
    gap: 'var(--layera-space-2)',
    marginTop: 'var(--layera-space-3)'
  },
  'layera-apply-button': {
    flex: '1',
    padding: 'var(--layera-space-2) var(--layera-space-3)',
    background: 'var(--layera-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-sm)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  'layera-apply-button:hover': {
    opacity: '0.9'
  },
  'layera-apply-button--secondary': {
    background: 'var(--layera-color-secondary)',
    color: 'white'
  }
};

/**
 * Selector Status Indicators
 */
export const SELECTOR_STATUS_STYLES = {
  'layera-selector-status': {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--layera-space-2)',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--layera-radius-sm)',
    fontSize: 'var(--layera-font-size-xs)',
    marginTop: 'var(--layera-space-2)'
  },
  'layera-selector-status--success': {
    background: 'var(--layera-color-success)20',
    color: 'var(--layera-color-success)',
    border: '1px solid var(--layera-color-success)40'
  },
  'layera-selector-status--warning': {
    background: 'var(--layera-color-warning)20',
    color: 'var(--layera-color-warning)',
    border: '1px solid var(--layera-color-warning)40'
  },
  'layera-selector-status--error': {
    background: 'var(--layera-color-danger)20',
    color: 'var(--layera-color-danger)',
    border: '1px solid var(--layera-color-danger)40'
  }
};

/**
 * ApplyToSelectorBuilder Class - Enterprise Apply to Selector CSS Generation
 */
export class ApplyToSelectorBuilder {
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
   * Generates CSS από apply to selector class definitions
   * @param {object} classDefinitions - Object με class definitions
   * @returns {string} - CSS string
   */
  static generateApplyToSelectorCSS(classDefinitions) {
    let css = '';

    Object.entries(classDefinitions).forEach(([className, styles]) => {
      css += `.${className} {\n`;
      css += this.objectToCSSString(styles);
      css += '\n}\n\n';
    });

    return css;
  }

  /**
   * Generates Apply to Selector Base CSS
   * @returns {string} - Apply to selector base CSS
   */
  static generateApplyToSelectorBaseCSS() {
    let css = '/* APPLY TO SELECTOR BASE STYLES */\n';
    css += this.generateApplyToSelectorCSS(APPLY_TO_SELECTOR_BASE_STYLES);
    return css;
  }

  /**
   * Generates Selector Target Dropdown CSS
   * @returns {string} - Selector target dropdown CSS
   */
  static generateSelectorTargetDropdownCSS() {
    let css = '/* SELECTOR TARGET DROPDOWN STYLES */\n';
    css += this.generateApplyToSelectorCSS(SELECTOR_TARGET_DROPDOWN_STYLES);
    return css;
  }

  /**
   * Generates Selector Preview CSS
   * @returns {string} - Selector preview CSS
   */
  static generateSelectorPreviewCSS() {
    let css = '/* SELECTOR PREVIEW STYLES */\n';
    css += this.generateApplyToSelectorCSS(SELECTOR_PREVIEW_STYLES);
    return css;
  }

  /**
   * Generates Apply Actions CSS
   * @returns {string} - Apply actions CSS
   */
  static generateApplyActionsCSS() {
    let css = '/* APPLY ACTIONS STYLES */\n';
    css += this.generateApplyToSelectorCSS(APPLY_ACTIONS_STYLES);
    return css;
  }

  /**
   * Generates Selector Status CSS
   * @returns {string} - Selector status CSS
   */
  static generateSelectorStatusCSS() {
    let css = '/* SELECTOR STATUS STYLES */\n';
    css += this.generateApplyToSelectorCSS(SELECTOR_STATUS_STYLES);
    return css;
  }

  /**
   * Generates όλες τις Apply to Selector CSS classes
   * @returns {string} - Complete apply to selector CSS
   */
  static generateAllApplyToSelectorCSS() {
    let css = '/* === RIGHT SIDEBAR: APPLY TO SELECTOR === */\n\n';

    css += this.generateApplyToSelectorBaseCSS();
    css += this.generateSelectorTargetDropdownCSS();
    css += this.generateSelectorPreviewCSS();
    css += this.generateApplyActionsCSS();
    css += this.generateSelectorStatusCSS();

    return css;
  }

  /**
   * Gets όλες τις available apply to selector classes
   * @returns {object} - Object με όλες τις class definitions
   */
  static getAllApplyToSelectorClasses() {
    return {
      ...APPLY_TO_SELECTOR_BASE_STYLES,
      ...SELECTOR_TARGET_DROPDOWN_STYLES,
      ...SELECTOR_PREVIEW_STYLES,
      ...APPLY_ACTIONS_STYLES,
      ...SELECTOR_STATUS_STYLES
    };
  }
}

export default ApplyToSelectorBuilder;