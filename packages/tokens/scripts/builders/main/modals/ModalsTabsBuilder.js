/**
 * ModalsTabsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για modals tabs components
 * Βασισμένο στο: html\htmlComponents\main\modals\modals-tabs.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Complete tabs navigation system for modals
 * - 6 color-coded tab categories (primary, secondary, success, warning, danger, info)
 * - Modal styling με border-left colors και responsive grid
 * - Interactive tab system με active states
 * - Responsive design με overflow και wrap support
 * - Enterprise modal organization patterns
 */

export class ModalsTabsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Modals Tabs CSS
   */
  static generateAllModalsTabsCSS() {
    let css = '/* === MODALS TABS SYSTEM === */\n\n';

    css += this.generateModalItemsCSS();
    css += this.generateModalGridSystemCSS();
    css += this.generateTabsNavigationCSS();
    css += this.generateTabButtonsCSS();
    css += this.generateTabActiveStatesCSS();
    css += this.generateTabContentCSS();
    css += this.generateModalButtonsCSS();
    css += this.generateModalSectionCSS();
    css += this.generateTabsResponsiveCSS();
    css += this.generateTabsAccessibilityCSS();
    css += this.generateTabsInteractionsCSS();

    return css;
  }

  /**
   * Modal Items - Basic modal styling
   */
  static generateModalItemsCSS() {
    return `
/* MODAL ITEMS STYLING */
.layera-modal-item {
  background: var(--layera-colors-white, #ffffff);
  border-radius: var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-lg, 16px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  min-height: 120px;
  border: 1px solid var(--layera-colors-gray-300, #e0e0e0);
  width: 400px;
  max-width: 100%;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.layera-modal-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Modal Color Variants */
.layera-modal-primary {
  border-left-color: var(--layera-colors-blue-500, #4A90E2);
}

.layera-modal-secondary {
  border-left-color: var(--layera-colors-purple-500, #9013FE);
}

.layera-modal-success {
  border-left-color: var(--layera-colors-green-500, #4CAF50);
}

.layera-modal-warning {
  border-left-color: var(--layera-colors-orange-500, #FF9800);
}

.layera-modal-danger {
  border-left-color: var(--layera-colors-red-500, #F44336);
}

.layera-modal-info {
  border-left-color: var(--layera-colors-blue-400, #2196F3);
}

`;
  }

  /**
   * Modal Grid System - Special grid for modals with variable widths
   */
  static generateModalGridSystemCSS() {
    return `
/* MODAL GRID SYSTEM */
.layera-modals-section .layera-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--layera-spacing-lg, 16px);
  margin-bottom: var(--layera-spacing-lg, 16px);
}

.layera-modals-section .layera-modal-item {
  width: 100%;
}

.layera-modal-container {
  background: var(--layera-colors-white, #ffffff);
  border-radius: var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-xl, 24px);
  margin-bottom: var(--layera-spacing-xl, 32px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.layera-modal-section-title {
  margin-top: 0;
  margin-bottom: var(--layera-spacing-lg, 16px);
  color: var(--layera-colors-gray-800, #2c3e50);
  font-size: var(--layera-typography-size-xl, 20px);
  font-weight: var(--layera-typography-weight-semibold, 600);
}

`;
  }

  /**
   * Tabs Navigation - Main navigation system
   */
  static generateTabsNavigationCSS() {
    return `
/* TABS NAVIGATION SYSTEM */
.layera-tabs-container {
  margin-bottom: var(--layera-spacing-lg, 16px);
}

.layera-tabs-nav {
  display: flex;
  gap: 0;
  margin-bottom: var(--layera-spacing-lg, 16px);
  overflow-x: auto;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--layera-colors-gray-300, #e0e0e0);
  background: var(--layera-colors-gray-50, #f8f9fa);
  border-radius: var(--layera-spacing-md, 8px) var(--layera-spacing-md, 8px) 0 0;
  padding: var(--layera-spacing-sm, 4px);
}

.layera-tabs-nav::-webkit-scrollbar {
  height: 4px;
}

.layera-tabs-nav::-webkit-scrollbar-track {
  background: var(--layera-colors-gray-100, #f5f5f5);
  border-radius: 2px;
}

.layera-tabs-nav::-webkit-scrollbar-thumb {
  background: var(--layera-colors-gray-400, #bdbdbd);
  border-radius: 2px;
}

.layera-tabs-nav::-webkit-scrollbar-thumb:hover {
  background: var(--layera-colors-gray-500, #9e9e9e);
}

`;
  }

  /**
   * Tab Buttons - Interactive tab navigation buttons
   */
  static generateTabButtonsCSS() {
    return `
/* TAB BUTTONS */
.layera-tab-button {
  padding: var(--layera-spacing-md, 8px) var(--layera-spacing-lg, 16px);
  border: none;
  background: var(--layera-colors-gray-100, #ecf0f1);
  color: var(--layera-colors-gray-700, #2c3e50);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-weight: var(--layera-typography-weight-medium, 500);
  font-size: var(--layera-typography-size-sm, 14px);
  border-radius: var(--layera-spacing-sm, 4px) var(--layera-spacing-sm, 4px) 0 0;
  position: relative;
  overflow: hidden;
}

.layera-tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.layera-tab-button:hover::before {
  left: 100%;
}

.layera-tab-button:hover {
  background: var(--layera-colors-gray-200, #d5dbdb);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layera-tab-button:focus {
  outline: 2px solid var(--layera-colors-blue-500, #4A90E2);
  outline-offset: 2px;
}

.layera-tab-button:active {
  transform: translateY(0);
}

`;
  }

  /**
   * Tab Active States - Active tab styling for each color variant
   */
  static generateTabActiveStatesCSS() {
    return `
/* TAB ACTIVE STATES */
.layera-tab-button.layera-active-tab {
  background: var(--layera-colors-white, #ffffff);
  color: var(--layera-colors-gray-800, #2c3e50);
  font-weight: var(--layera-typography-weight-bold, 700);
  transform: translateY(0);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

/* Primary Tab Active */
.layera-tab-button.layera-tab-primary.layera-active-tab {
  border-bottom-color: var(--layera-colors-blue-500, #4A90E2);
  color: var(--layera-colors-blue-600, #4A90E2);
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
}

.layera-tab-button.layera-tab-primary:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-blue-300, #90caf9);
  color: var(--layera-colors-blue-500, #4A90E2);
}

/* Secondary Tab Active */
.layera-tab-button.layera-tab-secondary.layera-active-tab {
  border-bottom-color: var(--layera-colors-purple-500, #9013FE);
  color: var(--layera-colors-purple-600, #9013FE);
  background: linear-gradient(135deg, #ffffff 0%, #faf8ff 100%);
}

.layera-tab-button.layera-tab-secondary:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-purple-300, #ce93d8);
  color: var(--layera-colors-purple-500, #9013FE);
}

/* Success Tab Active */
.layera-tab-button.layera-tab-success.layera-active-tab {
  border-bottom-color: var(--layera-colors-green-500, #4CAF50);
  color: var(--layera-colors-green-600, #4CAF50);
  background: linear-gradient(135deg, #ffffff 0%, #f8fff8 100%);
}

.layera-tab-button.layera-tab-success:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-green-300, #a5d6a7);
  color: var(--layera-colors-green-500, #4CAF50);
}

/* Warning Tab Active */
.layera-tab-button.layera-tab-warning.layera-active-tab {
  border-bottom-color: var(--layera-colors-orange-500, #FF9800);
  color: var(--layera-colors-orange-600, #FF9800);
  background: linear-gradient(135deg, #ffffff 0%, #fffdf8 100%);
}

.layera-tab-button.layera-tab-warning:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-orange-300, #ffcc80);
  color: var(--layera-colors-orange-500, #FF9800);
}

/* Danger Tab Active */
.layera-tab-button.layera-tab-danger.layera-active-tab {
  border-bottom-color: var(--layera-colors-red-500, #F44336);
  color: var(--layera-colors-red-600, #F44336);
  background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
}

.layera-tab-button.layera-tab-danger:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-red-300, #ef9a9a);
  color: var(--layera-colors-red-500, #F44336);
}

/* Info Tab Active */
.layera-tab-button.layera-tab-info.layera-active-tab {
  border-bottom-color: var(--layera-colors-blue-400, #2196F3);
  color: var(--layera-colors-blue-500, #2196F3);
  background: linear-gradient(135deg, #ffffff 0%, #f8fcff 100%);
}

.layera-tab-button.layera-tab-info:hover:not(.layera-active-tab) {
  border-bottom-color: var(--layera-colors-blue-200, #81d4fa);
  color: var(--layera-colors-blue-400, #2196F3);
}

`;
  }

  /**
   * Tab Content - Content panels and panes
   */
  static generateTabContentCSS() {
    return `
/* TAB CONTENT */
.layera-tab-content {
  background: var(--layera-colors-white, #ffffff);
  border-radius: 0 var(--layera-spacing-md, 8px) var(--layera-spacing-md, 8px) var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-lg, 16px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  min-height: 200px;
  border-top: none;
}

.layera-tab-pane {
  display: none;
  animation: fadeIn 0.3s ease-in-out;
}

.layera-tab-pane.layera-active-pane {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.layera-modal-cards-container {
  width: 100%;
}

.layera-tab-empty-state {
  text-align: center;
  color: var(--layera-colors-gray-500, #9e9e9e);
  font-style: italic;
  padding: var(--layera-spacing-xl, 24px);
}

.layera-tab-empty-state::before {
  content: "📋";
  display: block;
  font-size: 48px;
  margin-bottom: var(--layera-spacing-md, 8px);
  opacity: 0.5;
}

`;
  }

  /**
   * Modal Buttons - Button styles for modals
   */
  static generateModalButtonsCSS() {
    return `
/* MODAL BUTTONS */
.layera-modal-btn {
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-lg, 16px);
  border: none;
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  font-weight: var(--layera-typography-weight-medium, 500);
  font-size: var(--layera-typography-size-sm, 14px);
}

.layera-modal-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.layera-modal-btn:active {
  transform: translateY(0);
}

.layera-modal-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Modal Button Variants */
.layera-modal-primary-btn {
  background: var(--layera-colors-blue-500, #4A90E2);
  color: var(--layera-colors-white, #ffffff);
}

.layera-modal-secondary-btn {
  background: var(--layera-colors-purple-500, #9013FE);
  color: var(--layera-colors-white, #ffffff);
}

.layera-modal-success-btn {
  background: var(--layera-colors-green-500, #4CAF50);
  color: var(--layera-colors-white, #ffffff);
}

.layera-modal-warning-btn {
  background: var(--layera-colors-orange-500, #FF9800);
  color: var(--layera-colors-white, #ffffff);
}

.layera-modal-danger-btn {
  background: var(--layera-colors-red-500, #F44336);
  color: var(--layera-colors-white, #ffffff);
}

.layera-modal-info-btn {
  background: var(--layera-colors-blue-400, #2196F3);
  color: var(--layera-colors-white, #ffffff);
}

`;
  }

  /**
   * Modal Section - Section layout for modal components
   */
  static generateModalSectionCSS() {
    return `
/* MODAL SECTION LAYOUT */
.layera-component-section {
  background: var(--layera-colors-white, #ffffff);
  border-radius: var(--layera-spacing-md, 8px);
  padding: var(--layera-spacing-xl, 24px);
  margin-bottom: var(--layera-spacing-xl, 32px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--layera-colors-gray-200, #e0e0e0);
}

.layera-section-title {
  margin-top: 0;
  margin-bottom: var(--layera-spacing-lg, 16px);
  color: var(--layera-colors-gray-800, #2c3e50);
  font-size: var(--layera-typography-size-xl, 20px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  border-bottom: 2px solid var(--layera-colors-gray-200, #e0e0e0);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

.layera-section-subtitle {
  color: var(--layera-colors-gray-600, #757575);
  font-size: var(--layera-typography-size-sm, 14px);
  margin-bottom: var(--layera-spacing-lg, 16px);
  font-style: italic;
}

.layera-modals-section {
  position: relative;
}

.layera-modals-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg,
    var(--layera-colors-blue-500, #4A90E2) 0%,
    var(--layera-colors-purple-500, #9013FE) 17%,
    var(--layera-colors-green-500, #4CAF50) 34%,
    var(--layera-colors-orange-500, #FF9800) 51%,
    var(--layera-colors-red-500, #F44336) 68%,
    var(--layera-colors-blue-400, #2196F3) 100%
  );
  border-radius: 2px;
}

`;
  }

  /**
   * Tabs Responsive - Mobile and tablet adaptations
   */
  static generateTabsResponsiveCSS() {
    return `
/* TABS RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .layera-tabs-nav {
    flex-direction: column;
    gap: var(--layera-spacing-xs, 2px);
    overflow-x: visible;
  }

  .layera-tab-button {
    width: 100%;
    text-align: left;
    border-radius: var(--layera-spacing-sm, 4px);
    border-bottom: none;
    border-left: 3px solid transparent;
    margin-bottom: var(--layera-spacing-xs, 2px);
  }

  .layera-tab-button.layera-active-tab {
    border-bottom: none;
  }

  .layera-tab-button.layera-tab-primary.layera-active-tab {
    border-left-color: var(--layera-colors-blue-500, #4A90E2);
    border-bottom-color: transparent;
  }

  .layera-tab-button.layera-tab-secondary.layera-active-tab {
    border-left-color: var(--layera-colors-purple-500, #9013FE);
    border-bottom-color: transparent;
  }

  .layera-tab-button.layera-tab-success.layera-active-tab {
    border-left-color: var(--layera-colors-green-500, #4CAF50);
    border-bottom-color: transparent;
  }

  .layera-tab-button.layera-tab-warning.layera-active-tab {
    border-left-color: var(--layera-colors-orange-500, #FF9800);
    border-bottom-color: transparent;
  }

  .layera-tab-button.layera-tab-danger.layera-active-tab {
    border-left-color: var(--layera-colors-red-500, #F44336);
    border-bottom-color: transparent;
  }

  .layera-tab-button.layera-tab-info.layera-active-tab {
    border-left-color: var(--layera-colors-blue-400, #2196F3);
    border-bottom-color: transparent;
  }

  .layera-tab-content {
    border-radius: var(--layera-spacing-md, 8px);
    margin-top: var(--layera-spacing-md, 8px);
  }

  .layera-modals-section .layera-components-grid {
    grid-template-columns: 1fr;
  }

  .layera-modal-item {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .layera-tab-button {
    padding: var(--layera-spacing-md, 8px);
    font-size: var(--layera-typography-size-xs, 12px);
  }

  .layera-tab-content {
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-component-section {
    padding: var(--layera-spacing-lg, 16px);
  }

  .layera-section-title {
    font-size: var(--layera-typography-size-lg, 18px);
  }
}

`;
  }

  /**
   * Tabs Accessibility - ARIA and keyboard support
   */
  static generateTabsAccessibilityCSS() {
    return `
/* TABS ACCESSIBILITY */
.layera-tabs-container {
  outline: none;
}

.layera-tab-button[aria-selected="true"] {
  /* Active tab already styled above */
}

.layera-tab-button[aria-selected="false"] {
  /* Inactive tab styling */
}

.layera-tab-button:focus-visible {
  outline: 2px solid var(--layera-colors-blue-500, #4A90E2);
  outline-offset: 2px;
  z-index: 1;
  position: relative;
}

.layera-tab-pane[aria-hidden="true"] {
  display: none;
}

.layera-tab-pane[aria-hidden="false"] {
  display: block;
}

.layera-tab-sr-only {
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

/* High contrast mode support */
@media (prefers-contrast: high) {
  .layera-tab-button {
    border: 1px solid;
  }

  .layera-tab-button.layera-active-tab {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .layera-tab-button,
  .layera-tab-pane,
  .layera-modal-item {
    transition: none;
    animation: none;
  }
}

`;
  }

  /**
   * Tabs Interactions - Hover states and interactive effects
   */
  static generateTabsInteractionsCSS() {
    return `
/* TABS INTERACTIONS */
.layera-tab-button {
  position: relative;
}

.layera-tab-button:hover:not(.layera-active-tab) {
  background: var(--layera-colors-gray-200, #d5dbdb);
  color: var(--layera-colors-gray-800, #2c3e50);
}

.layera-tab-button:active {
  transform: translateY(1px);
}

/* Tab Badge for Counts */
.layera-tab-badge {
  background: var(--layera-colors-gray-400, #bdbdbd);
  color: var(--layera-colors-white, #ffffff);
  border-radius: 10px;
  padding: 2px 6px;
  font-size: var(--layera-typography-size-xs, 11px);
  font-weight: var(--layera-typography-weight-bold, 700);
  margin-left: var(--layera-spacing-xs, 2px);
  min-width: 16px;
  text-align: center;
  display: inline-block;
}

.layera-tab-primary .layera-tab-badge { background: var(--layera-colors-blue-500, #4A90E2); }
.layera-tab-secondary .layera-tab-badge { background: var(--layera-colors-purple-500, #9013FE); }
.layera-tab-success .layera-tab-badge { background: var(--layera-colors-green-500, #4CAF50); }
.layera-tab-warning .layera-tab-badge { background: var(--layera-colors-orange-500, #FF9800); }
.layera-tab-danger .layera-tab-badge { background: var(--layera-colors-red-500, #F44336); }
.layera-tab-info .layera-tab-badge { background: var(--layera-colors-blue-400, #2196F3); }

/* Tab Loading State */
.layera-tab-loading {
  position: relative;
}

.layera-tab-loading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    currentColor 50%,
    transparent 100%
  );
  animation: tabLoading 2s infinite;
}

@keyframes tabLoading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Modal Cards Container Animation */
.layera-modal-cards-container {
  transition: all 0.3s ease;
}

.layera-modal-cards-container.layera-loading {
  opacity: 0.5;
  pointer-events: none;
}

/* Tabs Navigation Scroll Indicators */
.layera-tabs-nav.layera-scrollable::before,
.layera-tabs-nav.layera-scrollable::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 1;
}

.layera-tabs-nav.layera-scrollable::before {
  left: 0;
  background: linear-gradient(90deg,
    var(--layera-colors-gray-50, #f8f9fa) 0%,
    transparent 100%
  );
}

.layera-tabs-nav.layera-scrollable::after {
  right: 0;
  background: linear-gradient(270deg,
    var(--layera-colors-gray-50, #f8f9fa) 0%,
    transparent 100%
  );
}

`;
  }
}