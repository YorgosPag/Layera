/**
 * LayoutTabsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για layout-tabs.html functionality:
 * - Tabs System με 6 θέματα (Primary, Secondary, Success, Warning, Danger, Info)
 * - Layout Controls με search και grid configuration
 * - Tab Navigation με active states και hover effects
 * - Tab Content containers
 * - Themed button styles
 *
 * HTML Reference: html/htmlComponents/main/layout/layout-tabs.html
 */

export class LayoutTabsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Layout Tabs functionality
   */
  static generateAllLayoutTabsCSS() {
    let css = '/* === LAYOUT TABS === */\n\n';

    css += this.generateLayoutControlsCSS();
    css += this.generateTabsSystemCSS();
    css += this.generateTabNavigationCSS();
    css += this.generateTabContentCSS();
    css += this.generateTabThemingCSS();
    css += this.generateTabButtonStylesCSS();
    css += this.generateTabInteractiveStatesCSS();
    css += this.generateTabResponsiveCSS();
    css += this.generateTabAnimationsCSS();
    css += this.generateTabAccessibilityCSS();
    css += this.generateTabVariantsCSS();

    return css;
  }

  /**
   * Layout Controls - Search και Grid Configuration
   */
  static generateLayoutControlsCSS() {
    return `/* LAYOUT CONTROLS STYLES */
.layera-layout-controls {
  margin-bottom: var(--layera-space-4);
  text-align: center;
  padding: var(--layera-space-3);
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
}

.layera-layout-controls h3 {
  margin-bottom: var(--layera-space-2);
  color: var(--layera-color-text);
  font-weight: var(--layera-weight-semibold);
}

.layera-layout-controls-inputs {
  display: flex;
  justify-content: center;
  gap: var(--layera-space-3);
  flex-wrap: wrap;
  margin-bottom: var(--layera-space-3);
}

.layera-layout-search {
  padding: var(--layera-space-2);
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  min-width: 200px;
  background: var(--layera-color-background);
}

.layera-layout-grid-config {
  padding: var(--layera-space-2);
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  width: 120px;
  background: var(--layera-color-background);
}

`;
  }

  /**
   * Tabs System - Container και βασική δομή
   */
  static generateTabsSystemCSS() {
    return `/* TABS SYSTEM STYLES */
.layera-tabs-container {
  margin-bottom: var(--layera-space-4);
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
}

.layera-tabs-nav {
  display: flex;
  gap: 0;
  margin-bottom: var(--layera-space-3);
  overflow-x: auto;
  flex-wrap: wrap;
  border-radius: var(--layera-radius-md) var(--layera-radius-md) 0 0;
}

.layera-tabs-nav::-webkit-scrollbar {
  height: 4px;
}

.layera-tabs-nav::-webkit-scrollbar-track {
  background: var(--layera-color-background);
  border-radius: var(--layera-radius-sm);
}

.layera-tabs-nav::-webkit-scrollbar-thumb {
  background: var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
}

`;
  }

  /**
   * Tab Navigation - Buttons και navigation controls
   */
  static generateTabNavigationCSS() {
    return `/* TAB NAVIGATION STYLES */
.layera-tab-button {
  padding: var(--layera-space-3) var(--layera-space-4);
  border: none;
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s var(--layera-transition-smooth);
  white-space: nowrap;
  font-weight: var(--layera-weight-medium);
  font-size: var(--layera-text-sm);
  min-width: 120px;
  position: relative;
}

.layera-tab-button:hover {
  background: var(--layera-color-surface);
  transform: translateY(-1px);
}

.layera-tab-button:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-tab-button.active-tab {
  background: var(--layera-color-surface);
  color: var(--layera-color-text);
  font-weight: var(--layera-weight-semibold);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

`;
  }

  /**
   * Tab Content - Content containers και panes
   */
  static generateTabContentCSS() {
    return `/* TAB CONTENT STYLES */
.layera-tab-content {
  background: var(--layera-color-surface);
  border-radius: 0 var(--layera-radius-md) var(--layera-radius-md) var(--layera-radius-md);
  padding: var(--layera-space-4);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  min-height: 300px;
}

.layera-tab-pane {
  display: none;
  opacity: 0;
  transition: opacity 0.3s var(--layera-transition-smooth);
}

.layera-tab-pane.active-pane {
  display: block;
  opacity: 1;
}

.layera-tab-content-container {
  width: 100%;
  min-height: 200px;
  padding: var(--layera-space-2);
  background: var(--layera-color-background);
  border-radius: var(--layera-radius-sm);
  border: 1px solid var(--layera-color-border);
}

`;
  }

  /**
   * Tab Theming - 6 θέματα colors για tabs
   */
  static generateTabThemingCSS() {
    return `/* TAB THEMING STYLES */
.layera-tab-button.tab-primary.active-tab {
  border-bottom-color: var(--layera-color-primary);
  color: var(--layera-color-primary);
}

.layera-tab-button.tab-secondary.active-tab {
  border-bottom-color: var(--layera-color-secondary);
  color: var(--layera-color-secondary);
}

.layera-tab-button.tab-success.active-tab {
  border-bottom-color: var(--layera-color-success);
  color: var(--layera-color-success);
}

.layera-tab-button.tab-warning.active-tab {
  border-bottom-color: var(--layera-color-warning);
  color: var(--layera-color-warning);
}

.layera-tab-button.tab-danger.active-tab {
  border-bottom-color: var(--layera-color-danger);
  color: var(--layera-color-danger);
}

.layera-tab-button.tab-info.active-tab {
  border-bottom-color: var(--layera-color-info);
  color: var(--layera-color-info);
}

`;
  }

  /**
   * Tab Button Styles - Themed button styles που ταιριάζουν με tabs
   */
  static generateTabButtonStylesCSS() {
    return `/* TAB BUTTON STYLES */
.layera-btn-tab {
  padding: var(--layera-space-2) var(--layera-space-4);
  border: none;
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  font-weight: var(--layera-weight-medium);
  font-size: var(--layera-text-sm);
}

.layera-btn-tab:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.layera-btn-tab:active {
  transform: translateY(0);
}

.layera-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
}

.layera-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
}

.layera-success-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-on-success);
}

.layera-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-on-warning);
}

.layera-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-on-danger);
}

.layera-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
}

`;
  }

  /**
   * Tab Interactive States - Hover, focus, disabled states
   */
  static generateTabInteractiveStatesCSS() {
    return `/* TAB INTERACTIVE STATES */
.layera-tab-button:hover:not(.active-tab) {
  background: linear-gradient(135deg, var(--layera-color-background) 0%, var(--layera-color-surface) 100%);
}

.layera-tab-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--layera-color-disabled);
  color: var(--layera-color-on-disabled);
}

.layera-tab-button:disabled:hover {
  transform: none;
  background: var(--layera-color-disabled);
}

.layera-tab-button.loading {
  position: relative;
  color: transparent;
}

.layera-tab-button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border: 2px solid var(--layera-color-border);
  border-top: 2px solid var(--layera-color-primary);
  border-radius: 50%;
  animation: layera-tab-loading 1s linear infinite;
}

`;
  }

  /**
   * Tab Responsive - Mobile και responsive behavior
   */
  static generateTabResponsiveCSS() {
    return `/* TAB RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-tabs-nav {
    flex-direction: column;
    gap: var(--layera-space-1);
  }

  .layera-tab-button {
    width: 100%;
    border-bottom: none;
    border-left: 3px solid transparent;
    text-align: left;
    border-radius: var(--layera-radius-sm);
  }

  .layera-tab-button.active-tab {
    border-bottom: none;
  }

  .layera-tab-button.tab-primary.active-tab {
    border-left-color: var(--layera-color-primary);
    border-bottom-color: transparent;
  }

  .layera-tab-button.tab-secondary.active-tab {
    border-left-color: var(--layera-color-secondary);
    border-bottom-color: transparent;
  }

  .layera-tab-button.tab-success.active-tab {
    border-left-color: var(--layera-color-success);
    border-bottom-color: transparent;
  }

  .layera-tab-button.tab-warning.active-tab {
    border-left-color: var(--layera-color-warning);
    border-bottom-color: transparent;
  }

  .layera-tab-button.tab-danger.active-tab {
    border-left-color: var(--layera-color-danger);
    border-bottom-color: transparent;
  }

  .layera-tab-button.tab-info.active-tab {
    border-left-color: var(--layera-color-info);
    border-bottom-color: transparent;
  }

  .layera-tab-content {
    border-radius: var(--layera-radius-md);
    margin-top: var(--layera-space-3);
  }

  .layera-layout-controls-inputs {
    flex-direction: column;
    align-items: center;
  }

  .layera-layout-search {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .layera-tab-button {
    padding: var(--layera-space-2);
    font-size: var(--layera-text-xs);
  }

  .layera-tab-content {
    padding: var(--layera-space-3);
  }
}

`;
  }

  /**
   * Tab Animations - Smooth transitions και animations
   */
  static generateTabAnimationsCSS() {
    return `/* TAB ANIMATIONS */
@keyframes layera-tab-loading {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes layera-tab-slide-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-tab-border-expand {
  0% { width: 0; }
  100% { width: 100%; }
}

.layera-tab-pane.active-pane {
  animation: layera-tab-slide-in 0.3s var(--layera-transition-smooth);
}

.layera-tab-button.active-tab::before {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  height: 3px;
  background: currentColor;
  animation: layera-tab-border-expand 0.3s var(--layera-transition-smooth);
}

`;
  }

  /**
   * Tab Accessibility - Screen reader και keyboard navigation
   */
  static generateTabAccessibilityCSS() {
    return `/* TAB ACCESSIBILITY */
.layera-tab-button[role="tab"] {
  position: relative;
}

.layera-tab-button[role="tab"]:focus {
  z-index: 1;
}

.layera-tab-button[aria-selected="true"] {
  background: var(--layera-color-surface);
  font-weight: var(--layera-weight-semibold);
}

.layera-tab-pane[role="tabpanel"] {
  outline: none;
}

.layera-tab-pane[role="tabpanel"]:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

/* Screen reader only text */
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

`;
  }

  /**
   * Tab Variants - Διαφορετικά styles για διαφορετικές χρήσεις
   */
  static generateTabVariantsCSS() {
    return `/* TAB VARIANTS */
/* Minimal variant */
.layera-tabs-container.minimal .layera-tab-button {
  background: transparent;
  border-bottom: 2px solid transparent;
  padding: var(--layera-space-2) var(--layera-space-3);
}

.layera-tabs-container.minimal .layera-tab-button:hover {
  background: var(--layera-color-surface);
}

.layera-tabs-container.minimal .layera-tab-button.active-tab {
  background: transparent;
  border-bottom-width: 2px;
}

/* Filled variant */
.layera-tabs-container.filled .layera-tab-button {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md) var(--layera-radius-md) 0 0;
  margin-right: var(--layera-space-1);
}

.layera-tabs-container.filled .layera-tab-button.active-tab {
  background: var(--layera-color-background);
  border-bottom: 3px solid transparent;
}

/* Enclosed variant */
.layera-tabs-container.enclosed .layera-tabs-nav {
  background: var(--layera-color-background);
  padding: var(--layera-space-1);
  border-radius: var(--layera-radius-md);
}

.layera-tabs-container.enclosed .layera-tab-button {
  border-radius: var(--layera-radius-sm);
  margin: 0 var(--layera-space-1);
}

.layera-tabs-container.enclosed .layera-tab-button.active-tab {
  background: var(--layera-color-surface);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

`;
  }
}