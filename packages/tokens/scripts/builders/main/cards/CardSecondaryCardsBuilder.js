/**
 * CardSecondaryCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για card-secondary-cards.html functionality:
 * - Secondary Context theming με purple/secondary colors
 * - Advanced Input Types (range sliders, tel, search inputs)
 * - Enhanced Select Dropdowns με priority levels και scopes
 * - Secondary Features (configuration, settings, advanced options)
 * - Priority Management με color coding και visual indicators
 * - Search και Filter functionality με help integration
 * - Configuration Management (settings panels, scope selectors)
 * - Secondary Animations (smooth transitions, hover effects)
 * - Settings Integration (configuration flows, option management)
 * - Filter Systems (category filters, search assistance)
 * - Accessibility για advanced users
 *
 * HTML Reference: html/htmlComponents/main/cards/card-secondary-cards.html
 */

export class CardSecondaryCardsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Card Secondary Cards functionality
   */
  static generateAllCardSecondaryCardsCSS() {
    let css = '/* === CARD SECONDARY CARDS === */\n\n';

    css += this.generateSecondaryContextCSS();
    css += this.generateAdvancedInputTypesCSS();
    css += this.generateEnhancedSelectsCSS();
    css += this.generateSecondaryFeaturesCSS();
    css += this.generatePriorityManagementCSS();
    css += this.generateSearchAndFilterCSS();
    css += this.generateConfigurationManagementCSS();
    css += this.generateSecondaryAnimationsCSS();
    css += this.generateSettingsIntegrationCSS();
    css += this.generateSecondaryResponsiveCSS();
    css += this.generateSecondaryAccessibilityCSS();

    return css;
  }

  /**
   * Secondary Context - Secondary theming και purple styling
   */
  static generateSecondaryContextCSS() {
    return `/* SECONDARY CONTEXT STYLES */
.layera-secondary-context {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border: 2px solid #ce93d8;
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  margin: var(--layera-space-4) 0;
  position: relative;
}

.layera-secondary-context::before {
  content: '⚙️';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-secondary);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  animation: layera-secondary-pulse 3s ease-in-out infinite;
}

.layera-secondary-banner {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-md);
  margin: var(--layera-space-3) 0;
  text-align: center;
  font-weight: var(--layera-weight-semibold);
  position: relative;
  overflow: hidden;
}

.layera-secondary-banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: layera-secondary-shine 3s ease-in-out infinite;
}

.layera-secondary-header {
  color: var(--layera-color-secondary);
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  margin-bottom: var(--layera-space-4);
  text-align: center;
  padding: var(--layera-space-3);
  background: rgba(144, 19, 254, 0.1);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(144, 19, 254, 0.2);
}

.layera-secondary-badge {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-full);
  font-size: var(--layera-text-xs);
  font-weight: var(--layera-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
}

`;
  }

  /**
   * Advanced Input Types - Range sliders, tel, search
   */
  static generateAdvancedInputTypesCSS() {
    return `/* ADVANCED INPUT TYPES STYLES */
.layera-secondary-range {
  width: 100%;
  height: 6px;
  margin: var(--layera-space-3) 0;
  background: rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-full);
  outline: none;
  transition: all 0.3s var(--layera-transition-smooth);
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.layera-secondary-range::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--layera-color-secondary);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  border: 3px solid var(--layera-color-surface);
  box-shadow: 0 2px 6px rgba(144, 19, 254, 0.3);
}

.layera-secondary-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 3px 10px rgba(144, 19, 254, 0.4);
}

.layera-secondary-range::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: var(--layera-color-secondary);
  cursor: pointer;
  border: 3px solid var(--layera-color-surface);
  box-shadow: 0 2px 6px rgba(144, 19, 254, 0.3);
}

.layera-secondary-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.3);
}

.layera-secondary-tel {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid rgba(144, 19, 254, 0.3);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  box-sizing: border-box;
  position: relative;
}

.layera-secondary-tel:focus {
  outline: none;
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
  background: var(--layera-color-surface);
}

.layera-secondary-tel::before {
  content: '📞';
  position: absolute;
  left: var(--layera-space-3);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.layera-secondary-search {
  width: 100%;
  padding: var(--layera-space-3) var(--layera-space-3) var(--layera-space-3) var(--layera-space-5);
  border: 2px solid rgba(144, 19, 254, 0.3);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background) url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239013FE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='11' cy='11' r='8'%3e%3c/circle%3e%3cpolyline points='21,21 16.5,16.5'%3e%3c/polyline%3e%3c/svg%3e") no-repeat var(--layera-space-3) center;
  background-size: 16px;
  color: var(--layera-color-text);
  box-sizing: border-box;
}

.layera-secondary-search:focus {
  outline: none;
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
  background-color: var(--layera-color-surface);
}

.layera-secondary-search::placeholder {
  color: rgba(144, 19, 254, 0.6);
  font-weight: var(--layera-weight-medium);
}

.layera-range-value-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--layera-space-1);
  font-size: var(--layera-text-sm);
  color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-medium);
}

.layera-range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--layera-space-1);
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
}

`;
  }

  /**
   * Enhanced Selects - Priority levels, scopes, categories
   */
  static generateEnhancedSelectsCSS() {
    return `/* ENHANCED SELECTS STYLES */
.layera-secondary-select {
  width: 100%;
  padding: var(--layera-space-3) var(--layera-space-5) var(--layera-space-3) var(--layera-space-3);
  border: 2px solid rgba(144, 19, 254, 0.3);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  box-sizing: border-box;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239013FE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right var(--layera-space-3) center;
  background-size: 1rem;
}

.layera-secondary-select:focus {
  outline: none;
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
  background-color: var(--layera-color-surface);
}

.layera-secondary-select:hover {
  border-color: var(--layera-color-secondary);
  background-color: rgba(144, 19, 254, 0.02);
}

.layera-priority-select {
  position: relative;
}

.layera-priority-select option {
  padding: var(--layera-space-2);
  color: var(--layera-color-text);
  background: var(--layera-color-background);
}

.layera-priority-select option[value="high"] {
  background: rgba(244, 67, 54, 0.1);
  color: var(--layera-color-danger);
}

.layera-priority-select option[value="medium"] {
  background: rgba(255, 152, 0, 0.1);
  color: var(--layera-color-warning);
}

.layera-priority-select option[value="low"] {
  background: rgba(76, 175, 80, 0.1);
  color: var(--layera-color-success);
}

.layera-scope-select {
  border-color: rgba(244, 67, 54, 0.3);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F44336' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.layera-scope-select:focus {
  border-color: var(--layera-color-danger);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.layera-category-select {
  border-color: rgba(33, 150, 243, 0.3);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232196F3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.layera-category-select:focus {
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.layera-select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.layera-select-icon {
  position: absolute;
  left: var(--layera-space-3);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: var(--layera-text-base);
  color: rgba(144, 19, 254, 0.7);
}

.layera-select-wrapper .layera-secondary-select {
  padding-left: var(--layera-space-5);
}

`;
  }

  /**
   * Secondary Features - Configuration, settings, advanced options
   */
  static generateSecondaryFeaturesCSS() {
    return `/* SECONDARY FEATURES STYLES */
.layera-secondary-card {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.1);
  transition: all 0.3s var(--layera-transition-smooth);
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-left: 4px solid var(--layera-color-secondary);
  position: relative;
  overflow: hidden;
}

.layera-secondary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(144, 19, 254, 0.2);
  border-color: var(--layera-color-secondary);
}

.layera-secondary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-secondary);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-configuration-panel {
  background: rgba(144, 19, 254, 0.05);
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  margin: var(--layera-space-3) 0;
}

.layera-configuration-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-3);
  color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-semibold);
}

.layera-configuration-options {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
}

.layera-configuration-group {
  background: var(--layera-color-surface);
  border: 1px solid rgba(144, 19, 254, 0.15);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
}

.layera-configuration-group-title {
  color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-medium);
  font-size: var(--layera-text-sm);
  margin-bottom: var(--layera-space-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layera-settings-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--layera-space-2);
  background: rgba(144, 19, 254, 0.03);
  border-radius: var(--layera-radius-sm);
  border: 1px solid rgba(144, 19, 254, 0.1);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-settings-toggle:hover {
  background: rgba(144, 19, 254, 0.08);
  border-color: rgba(144, 19, 254, 0.2);
}

.layera-settings-toggle.active {
  background: rgba(144, 19, 254, 0.1);
  border-color: var(--layera-color-secondary);
}

.layera-toggle-switch {
  width: 40px;
  height: 20px;
  background: var(--layera-color-border);
  border-radius: var(--layera-radius-full);
  position: relative;
  transition: all 0.3s var(--layera-transition-smooth);
  cursor: pointer;
}

.layera-toggle-switch.active {
  background: var(--layera-color-secondary);
}

.layera-toggle-switch::after {
  content: '';
  width: 16px;
  height: 16px;
  background: var(--layera-color-surface);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-toggle-switch.active::after {
  left: 22px;
}

`;
  }

  /**
   * Priority Management - Priority levels με color coding
   */
  static generatePriorityManagementCSS() {
    return `/* PRIORITY MANAGEMENT STYLES */
.layera-priority-system {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-2);
  margin: var(--layera-space-3) 0;
}

.layera-priority-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-2);
  padding: var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-priority-critical {
  background: rgba(244, 67, 54, 0.1);
  color: var(--layera-color-danger);
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.layera-priority-high {
  background: rgba(255, 87, 34, 0.1);
  color: #ff5722;
  border: 1px solid rgba(255, 87, 34, 0.3);
}

.layera-priority-medium {
  background: rgba(255, 152, 0, 0.1);
  color: var(--layera-color-warning);
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.layera-priority-low {
  background: rgba(76, 175, 80, 0.1);
  color: var(--layera-color-success);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.layera-priority-none {
  background: rgba(158, 158, 158, 0.1);
  color: var(--layera-color-text-muted);
  border: 1px solid rgba(158, 158, 158, 0.3);
}

.layera-priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.layera-priority-critical .layera-priority-dot {
  background: var(--layera-color-danger);
  animation: layera-priority-pulse 1.5s ease-in-out infinite;
}

.layera-priority-high .layera-priority-dot {
  background: #ff5722;
}

.layera-priority-medium .layera-priority-dot {
  background: var(--layera-color-warning);
}

.layera-priority-low .layera-priority-dot {
  background: var(--layera-color-success);
}

.layera-priority-none .layera-priority-dot {
  background: var(--layera-color-text-muted);
}

.layera-priority-selector {
  display: flex;
  gap: var(--layera-space-2);
  flex-wrap: wrap;
  margin: var(--layera-space-2) 0;
}

.layera-priority-option {
  padding: var(--layera-space-2) var(--layera-space-3);
  border: 2px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
}

.layera-priority-option:hover {
  border-color: var(--layera-color-secondary);
  background: rgba(144, 19, 254, 0.05);
}

.layera-priority-option.selected {
  border-color: var(--layera-color-secondary);
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
}

`;
  }

  /**
   * Search and Filter - Search functionality με help integration
   */
  static generateSearchAndFilterCSS() {
    return `/* SEARCH AND FILTER STYLES */
.layera-search-system {
  background: var(--layera-color-surface);
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  margin: var(--layera-space-3) 0;
}

.layera-search-header {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin-bottom: var(--layera-space-3);
  color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-semibold);
}

.layera-search-input-group {
  position: relative;
  margin-bottom: var(--layera-space-3);
}

.layera-search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--layera-color-surface);
  border: 1px solid rgba(144, 19, 254, 0.3);
  border-top: none;
  border-radius: 0 0 var(--layera-radius-sm) var(--layera-radius-sm);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.15);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
}

.layera-search-suggestion {
  padding: var(--layera-space-2) var(--layera-space-3);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  color: var(--layera-color-text);
}

.layera-search-suggestion:hover {
  background: rgba(144, 19, 254, 0.1);
  color: var(--layera-color-secondary);
}

.layera-search-suggestion-icon {
  color: var(--layera-color-secondary);
  font-size: var(--layera-text-sm);
}

.layera-filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--layera-space-2);
  margin: var(--layera-space-3) 0;
}

.layera-filter-tag {
  background: rgba(144, 19, 254, 0.1);
  color: var(--layera-color-secondary);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-full);
  font-size: var(--layera-text-xs);
  font-weight: var(--layera-weight-medium);
  border: 1px solid rgba(144, 19, 254, 0.2);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
}

.layera-filter-tag:hover {
  background: rgba(144, 19, 254, 0.2);
  border-color: var(--layera-color-secondary);
  transform: translateY(-1px);
}

.layera-filter-tag.active {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
  border-color: var(--layera-color-secondary);
}

.layera-filter-tag-remove {
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 0;
  margin-left: var(--layera-space-1);
  font-size: var(--layera-text-xs);
  opacity: 0.7;
  transition: opacity 0.3s var(--layera-transition-smooth);
}

.layera-filter-tag-remove:hover {
  opacity: 1;
}

.layera-search-results {
  border-top: 1px solid rgba(144, 19, 254, 0.1);
  padding-top: var(--layera-space-3);
  margin-top: var(--layera-space-3);
}

.layera-search-result-count {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
  margin-bottom: var(--layera-space-2);
}

.layera-search-no-results {
  text-align: center;
  padding: var(--layera-space-4);
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
}

`;
  }

  /**
   * Configuration Management - Settings panels, scope selectors
   */
  static generateConfigurationManagementCSS() {
    return `/* CONFIGURATION MANAGEMENT STYLES */
.layera-config-manager {
  background: var(--layera-color-surface);
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-5);
  margin: var(--layera-space-4) 0;
}

.layera-config-tabs {
  display: flex;
  gap: 0;
  margin-bottom: var(--layera-space-4);
  border-bottom: 1px solid rgba(144, 19, 254, 0.2);
}

.layera-config-tab {
  padding: var(--layera-space-3) var(--layera-space-4);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--layera-color-text-muted);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  font-weight: var(--layera-weight-medium);
}

.layera-config-tab:hover {
  color: var(--layera-color-secondary);
  background: rgba(144, 19, 254, 0.05);
}

.layera-config-tab.active {
  color: var(--layera-color-secondary);
  border-bottom-color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-semibold);
}

.layera-config-section {
  margin-bottom: var(--layera-space-4);
}

.layera-config-section-title {
  color: var(--layera-color-secondary);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  margin-bottom: var(--layera-space-3);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-config-field {
  margin-bottom: var(--layera-space-3);
}

.layera-config-label {
  display: block;
  color: var(--layera-color-text);
  font-weight: var(--layera-weight-medium);
  margin-bottom: var(--layera-space-1);
  font-size: var(--layera-text-sm);
}

.layera-config-description {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-xs);
  margin-top: var(--layera-space-1);
  line-height: var(--layera-leading-relaxed);
}

.layera-config-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--layera-space-3);
  padding-top: var(--layera-space-4);
  border-top: 1px solid rgba(144, 19, 254, 0.1);
  margin-top: var(--layera-space-4);
}

.layera-config-button {
  padding: var(--layera-space-3) var(--layera-space-4);
  border: none;
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-semibold);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-config-button-primary {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
}

.layera-config-button-primary:hover {
  background: #7c0fe1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.3);
}

.layera-config-button-secondary {
  background: transparent;
  color: var(--layera-color-secondary);
  border: 1px solid var(--layera-color-secondary);
}

.layera-config-button-secondary:hover {
  background: rgba(144, 19, 254, 0.1);
}

.layera-config-reset {
  background: transparent;
  color: var(--layera-color-text-muted);
  border: 1px solid var(--layera-color-border);
}

.layera-config-reset:hover {
  background: rgba(158, 158, 158, 0.1);
  border-color: var(--layera-color-text-muted);
}

`;
  }

  /**
   * Secondary Animations - Smooth transitions
   */
  static generateSecondaryAnimationsCSS() {
    return `/* SECONDARY ANIMATIONS */
@keyframes layera-secondary-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(144, 19, 254, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(144, 19, 254, 0.3);
  }
}

@keyframes layera-secondary-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes layera-priority-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@keyframes layera-secondary-fade-in {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-secondary-slide-in {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.layera-secondary-animated {
  animation: layera-secondary-fade-in 0.5s var(--layera-transition-smooth);
}

.layera-secondary-slide {
  animation: layera-secondary-slide-in 0.6s var(--layera-transition-smooth);
}

.layera-secondary-stagger .layera-secondary-card:nth-child(1) { animation-delay: 0.1s; }
.layera-secondary-stagger .layera-secondary-card:nth-child(2) { animation-delay: 0.2s; }
.layera-secondary-stagger .layera-secondary-card:nth-child(3) { animation-delay: 0.3s; }
.layera-secondary-stagger .layera-secondary-card:nth-child(4) { animation-delay: 0.4s; }
.layera-secondary-stagger .layera-secondary-card:nth-child(5) { animation-delay: 0.5s; }
.layera-secondary-stagger .layera-secondary-card:nth-child(6) { animation-delay: 0.6s; }

.layera-secondary-loading {
  position: relative;
  pointer-events: none;
  opacity: 0.7;
}

.layera-secondary-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 2px solid rgba(144, 19, 254, 0.3);
  border-top: 2px solid var(--layera-color-secondary);
  border-radius: 50%;
  animation: layera-secondary-loading-spin 1s linear infinite;
}

@keyframes layera-secondary-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.layera-config-transition {
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.15);
}

`;
  }

  /**
   * Settings Integration - Configuration flows
   */
  static generateSettingsIntegrationCSS() {
    return `/* SETTINGS INTEGRATION STYLES */
.layera-settings-dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--layera-space-4);
  min-height: 400px;
  background: var(--layera-color-surface);
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-lg);
  overflow: hidden;
}

.layera-settings-sidebar {
  background: rgba(144, 19, 254, 0.05);
  padding: var(--layera-space-4);
  border-right: 1px solid rgba(144, 19, 254, 0.2);
}

.layera-settings-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.layera-settings-nav-item {
  margin-bottom: var(--layera-space-1);
}

.layera-settings-nav-link {
  display: block;
  padding: var(--layera-space-2) var(--layera-space-3);
  color: var(--layera-color-text-muted);
  text-decoration: none;
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
}

.layera-settings-nav-link:hover,
.layera-settings-nav-link.active {
  background: rgba(144, 19, 254, 0.1);
  color: var(--layera-color-secondary);
  transform: translateX(4px);
}

.layera-settings-nav-link.active {
  font-weight: var(--layera-weight-semibold);
  border-left: 3px solid var(--layera-color-secondary);
  padding-left: var(--layera-space-2);
}

.layera-settings-main {
  padding: var(--layera-space-4);
}

.layera-settings-header {
  margin-bottom: var(--layera-space-4);
  padding-bottom: var(--layera-space-3);
  border-bottom: 1px solid rgba(144, 19, 254, 0.1);
}

.layera-settings-title {
  color: var(--layera-color-secondary);
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  margin: 0 0 var(--layera-space-1) 0;
}

.layera-settings-subtitle {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
  margin: 0;
}

.layera-settings-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-4);
}

.layera-settings-fieldset {
  border: 1px solid rgba(144, 19, 254, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  margin: 0;
}

.layera-settings-legend {
  color: var(--layera-color-secondary);
  font-weight: var(--layera-weight-semibold);
  padding: 0 var(--layera-space-2);
  font-size: var(--layera-text-sm);
}

.layera-settings-status {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  padding: var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
}

.layera-settings-status.success {
  background: rgba(76, 175, 80, 0.1);
  color: var(--layera-color-success);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.layera-settings-status.error {
  background: rgba(244, 67, 54, 0.1);
  color: var(--layera-color-danger);
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.layera-settings-status.warning {
  background: rgba(255, 152, 0, 0.1);
  color: var(--layera-color-warning);
  border: 1px solid rgba(255, 152, 0, 0.3);
}

`;
  }

  /**
   * Secondary Responsive - Mobile optimization
   */
  static generateSecondaryResponsiveCSS() {
    return `/* SECONDARY RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-settings-dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .layera-settings-sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(144, 19, 254, 0.2);
  }

  .layera-settings-nav {
    display: flex;
    gap: var(--layera-space-1);
    overflow-x: auto;
    padding-bottom: var(--layera-space-2);
  }

  .layera-settings-nav-item {
    flex-shrink: 0;
    margin-bottom: 0;
  }

  .layera-settings-nav-link {
    white-space: nowrap;
    font-size: var(--layera-text-xs);
  }

  .layera-priority-selector {
    flex-direction: column;
  }

  .layera-priority-option {
    width: 100%;
    text-align: center;
  }

  .layera-filter-tags {
    justify-content: center;
  }

  .layera-config-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .layera-config-button {
    justify-content: center;
  }

  .layera-configuration-options {
    gap: var(--layera-space-2);
  }
}

@media (max-width: 480px) {
  .layera-secondary-context {
    padding: var(--layera-space-3);
  }

  .layera-secondary-card {
    padding: var(--layera-space-3);
  }

  .layera-secondary-range::-webkit-slider-thumb {
    height: 24px;
    width: 24px;
  }

  .layera-secondary-range::-moz-range-thumb {
    height: 24px;
    width: 24px;
  }

  .layera-search-suggestions {
    position: static;
    margin-top: var(--layera-space-2);
    border: 1px solid rgba(144, 19, 254, 0.3);
    border-radius: var(--layera-radius-sm);
  }

  .layera-config-manager {
    padding: var(--layera-space-3);
  }

  .layera-config-tabs {
    flex-direction: column;
    gap: var(--layera-space-1);
  }

  .layera-config-tab {
    border-bottom: none;
    border-left: 2px solid transparent;
    text-align: left;
  }

  .layera-config-tab.active {
    border-bottom: none;
    border-left-color: var(--layera-color-secondary);
  }

  .layera-settings-main {
    padding: var(--layera-space-3);
  }

  .layera-settings-fieldset {
    padding: var(--layera-space-3);
  }
}

@media (max-width: 320px) {
  .layera-filter-tags {
    flex-direction: column;
    align-items: stretch;
  }

  .layera-filter-tag {
    justify-content: center;
  }

  .layera-configuration-group {
    padding: var(--layera-space-2);
  }

  .layera-priority-system {
    gap: var(--layera-space-1);
  }
}

`;
  }

  /**
   * Secondary Accessibility - Advanced users accessibility
   */
  static generateSecondaryAccessibilityCSS() {
    return `/* SECONDARY ACCESSIBILITY STYLES */
.layera-secondary-card:focus,
.layera-config-button:focus,
.layera-settings-nav-link:focus {
  outline: 2px solid var(--layera-color-secondary);
  outline-offset: 2px;
}

.layera-secondary-range:focus {
  outline: 2px solid var(--layera-color-secondary);
  outline-offset: 4px;
}

.layera-secondary-search:focus,
.layera-secondary-select:focus,
.layera-secondary-tel:focus {
  outline: none;
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.2);
}

.layera-priority-option:focus,
.layera-filter-tag:focus {
  outline: 2px solid var(--layera-color-secondary);
  outline-offset: 2px;
}

.layera-toggle-switch:focus {
  outline: 2px solid var(--layera-color-secondary);
  outline-offset: 2px;
  border-radius: var(--layera-radius-full);
}

/* Screen reader support */
.layera-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.layera-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
  padding: var(--layera-space-2) var(--layera-space-3);
  text-decoration: none;
  border-radius: var(--layera-radius-sm);
  transition: top 0.3s;
  z-index: 1000;
}

.layera-skip-link:focus {
  top: 6px;
}

/* High contrast support */
@media (prefers-contrast: high) {
  .layera-secondary-card,
  .layera-configuration-panel,
  .layera-config-manager {
    border-width: 2px;
  }

  .layera-secondary-range,
  .layera-secondary-search,
  .layera-secondary-select,
  .layera-secondary-tel {
    border-width: 2px;
  }

  .layera-config-button,
  .layera-priority-option {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .layera-secondary-animated,
  .layera-secondary-slide,
  .layera-secondary-pulse,
  .layera-secondary-loading::after,
  .layera-priority-critical .layera-priority-dot {
    animation: none;
    transition: none;
  }

  .layera-secondary-card:hover,
  .layera-hover-lift:hover {
    transform: none;
  }

  .layera-secondary-banner::after {
    animation: none;
  }

  .layera-toggle-switch::after {
    transition: left 0.1s;
  }
}

/* Focus management */
.layera-focus-trap {
  position: relative;
}

.layera-focus-trap:focus-within {
  outline: 2px solid var(--layera-color-secondary);
  outline-offset: 2px;
  border-radius: var(--layera-radius-sm);
}

/* Keyboard navigation hints */
.layera-keyboard-hint {
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
  margin-top: var(--layera-space-1);
  font-style: italic;
}

/* ARIA live regions */
.layera-status-live {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Range slider accessibility */
.layera-secondary-range[aria-describedby] {
  margin-bottom: var(--layera-space-1);
}

.layera-range-description {
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
  margin-top: var(--layera-space-1);
}

`;
  }
}