/**
 * TokensBuilder.js - Enterprise CSS Tokens Builder Module
 *
 * Single Responsibility: Μόνο token-to-CSS conversion logic
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Core Design Tokens - Μοναδική πηγή αλήθειας
 */
export const tokens = {
  colors: {
    '--layera-color-primary': '#4A90E2',
    '--layera-color-secondary': '#9013FE',
    '--layera-color-success': '#4CAF50',
    '--layera-color-warning': '#FF9800',
    '--layera-color-danger': '#F44336',
    '--layera-color-info': '#2196F3'
  },

  live: {
    '--live-primary-color': '#4A90E2',
    '--live-secondary-color': '#9013FE',
    '--live-success-color': '#4CAF50',
    '--live-warning-color': '#FF9800',
    '--live-danger-color': '#F44336',
    '--live-info-color': '#2196F3',
    '--live-component-gap': '16px',
    '--live-padding': '16px',
    '--live-button-padding': '16px',
    '--live-font-size': '16px',
    '--live-border-radius': '8px'
  },

  spacing: {
    '--layera-space-1': '4px',
    '--layera-space-2': '8px',
    '--layera-space-3': '12px',
    '--layera-space-4': '16px',
    '--layera-space-6': '24px',
    '--layera-space-8': '32px'
  },

  // Header-specific tokens από Grok AI
  header: {
    '--layera-color-active-border': '#FBBF24',
    '--layera-color-header-bg': '#4A90E2',
    '--layera-color-header-text': '#ffffff',
    '--layera-color-header-input-bg': 'rgba(255,255,255,0.20)',
    '--layera-color-header-input-border': 'rgba(255,255,255,0.30)',
    '--layera-color-header-toggle-bg': 'rgba(255,255,255,0.15)',
    '--layera-header-height': '40px',
    '--layera-color-btn-size': '32px',
    '--layera-input-height': '36px',
    '--layera-toggle-btn-size': '36px'
  },

  typography: {
    '--layera-font-size-xs': '0.75rem',
    '--layera-font-size-sm': '0.875rem',
    '--layera-font-size-base': '1rem',
    '--layera-font-size-lg': '1.125rem',
    '--layera-font-size-xl': '1.25rem',
    '--layera-font-size-2xl': '1.5rem',
    '--layera-font-weight-normal': '400',
    '--layera-font-weight-medium': '500',
    '--layera-font-weight-semibold': '600',
    '--layera-text-align-center': 'center',
    '--layera-text-align-left': 'left',
    '--layera-text-align-right': 'right'
  },

  radius: {
    '--layera-radius-sm': '4px',
    '--layera-radius-md': '6px',
    '--layera-radius-lg': '8px',
    '--layera-shadow-header': '0 2px 10px rgba(0,0,0,0.12)'
  },

  // Primary Sidebar tokens από Grok AI
  sidebar: {
    '--layera-sidebar-bg': '#2c3e50',
    '--layera-sidebar-text': '#ffffff',
    '--layera-sidebar-menu-item-bg': '#34495e',
    '--layera-sidebar-menu-item-hover': '#3498db',
    '--layera-sidebar-title': '#ecf0f1',
    '--layera-sidebar-input-bg': '#34495e',
    '--layera-sidebar-input-border': '#5a6c7d',
    '--layera-sidebar-input-text': '#ffffff',
    '--layera-sidebar-button-bg': '#3498db',
    '--layera-sidebar-button-hover': '#2980b9',
    '--layera-sidebar-width': '280px'
  }
};

/**
 * TokensBuilder Class - Enterprise CSS Tokens Generation
 */
export class TokensBuilder {
  /**
   * Generates CSS variables από design tokens
   * @returns {string} - CSS με όλες τις CSS variables
   */
  static generateTokensCSS() {
    let css = '/* === LAYERA DESIGN TOKENS === */\n\n';
    css += ':root {\n';

    // Process όλες τις κατηγορίες tokens
    Object.entries(tokens).forEach(([category, tokenGroup]) => {
      css += `  /* ${category.toUpperCase()} TOKENS */\n`;

      Object.entries(tokenGroup).forEach(([tokenName, tokenValue]) => {
        css += `  ${tokenName}: ${tokenValue};\n`;
      });

      css += '\n';
    });

    css += '}\n\n';
    return css;
  }

  /**
   * Exports όλα τα available tokens γιa external use
   * @returns {object} - Flat object με όλα τα tokens
   */
  static getAllTokens() {
    const allTokens = {};

    Object.values(tokens).forEach(tokenGroup => {
      Object.assign(allTokens, tokenGroup);
    });

    return allTokens;
  }

  /**
   * Gets specific token category
   * @param {string} category - Token category (colors, spacing, κλπ)
   * @returns {object|null} - Token group ή null αν δεν υπάρχει
   */
  static getTokenCategory(category) {
    return tokens[category] || null;
  }

  /**
   * Validates ότι όλα τα tokens έχουν valid values
   * @returns {boolean} - true αν όλα είναι έγκυρα
   */
  static validateTokens() {
    try {
      Object.entries(tokens).forEach(([category, tokenGroup]) => {
        Object.entries(tokenGroup).forEach(([tokenName, tokenValue]) => {
          if (!tokenName.startsWith('--')) {
            throw new Error(`Invalid token name: ${tokenName} (must start with --)`);
          }
          if (typeof tokenValue !== 'string' || !tokenValue.trim()) {
            throw new Error(`Invalid token value: ${tokenName} = ${tokenValue}`);
          }
        });
      });
      return true;
    } catch (error) {
      console.error('Token validation failed:', error.message);
      return false;
    }
  }
}

export default TokensBuilder;