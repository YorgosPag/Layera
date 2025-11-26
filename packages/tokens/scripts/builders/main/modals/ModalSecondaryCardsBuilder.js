/**
 * ModalSecondaryCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για modal secondary cards components
 * Βασισμένο στο: html\htmlComponents\main\modals\modal-secondary-cards.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Secondary business workflows (configuration, alerts, maintenance, tutorials)
 * - Secondary theming με μωβ βάση (#9013FE)
 * - Advanced input types (date, number, textarea, email, datetime-local, password, url)
 * - Business support functions
 * - Color-coded modal categories
 * - Enterprise workflow patterns
 */

export class ModalSecondaryCardsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Modal Secondary Cards CSS
   */
  static generateAllModalSecondaryCardsCSS() {
    let css = '/* === MODAL SECONDARY CARDS === */\n\n';

    css += this.generateSecondaryModalContextCSS();
    css += this.generateBusinessSupportWorkflowsCSS();
    css += this.generateSecondaryModalComponentsCSS();
    css += this.generateWorkflowManagementPatternsCSS();
    css += this.generateAdvancedConfigurationInputsCSS();
    css += this.generateSecondaryModalAnimationsCSS();
    css += this.generateBusinessSupportButtonsCSS();
    css += this.generateSecondaryModalFormsCSS();
    css += this.generateSecondaryModalResponsiveCSS();
    css += this.generateSecondaryModalAccessibilityCSS();
    css += this.generateSecondaryModalInteractionsCSS();

    return css;
  }

  /**
   * Secondary Modal Context - Μωβ θεματική βάση
   */
  static generateSecondaryModalContextCSS() {
    return `
/* SECONDARY MODAL CONTEXT */
.layera-secondary-modal-context {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border: 2px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-md, 8px);
}

.layera-secondary-modal-theme {
  --secondary-primary: var(--layera-colors-purple-600, #9013FE);
  --secondary-light: var(--layera-colors-purple-100, #f3e5f5);
  --secondary-dark: var(--layera-colors-purple-800, #6a1b99);
  --secondary-text: var(--layera-colors-purple-900, #4a148c);
}

`;
  }

  /**
   * Business Support Workflows - Configuration, alerts, maintenance, tutorials
   */
  static generateBusinessSupportWorkflowsCSS() {
    return `
/* BUSINESS SUPPORT WORKFLOWS */
.layera-support-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg, 16px);
  padding: var(--layera-spacing-xl, 24px);
}

/* Workflow Management Modal */
.layera-workflow-modal {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid var(--layera-colors-blue-500, #4A90E2);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

/* Configuration Modal */
.layera-config-modal {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border: 2px solid var(--layera-colors-purple-500, #9013FE);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

/* Celebration/Success Modal */
.layera-celebration-modal {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 2px solid var(--layera-colors-green-500, #4CAF50);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

/* System Alert Modal */
.layera-system-alert-modal {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid var(--layera-colors-orange-500, #FF9800);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

/* System Maintenance Modal */
.layera-maintenance-modal {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 2px solid var(--layera-colors-red-500, #F44336);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

/* Tutorial Modal */
.layera-tutorial-modal {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 2px solid var(--layera-colors-blue-400, #2196F3);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
}

`;
  }

  /**
   * Secondary Modal Components - Titles, inputs, buttons
   */
  static generateSecondaryModalComponentsCSS() {
    return `
/* SECONDARY MODAL COMPONENTS */
.layera-secondary-modal-title {
  font-size: var(--layera-typography-size-lg, 18px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  color: var(--layera-colors-purple-800, #6a1b99);
  margin-bottom: var(--layera-spacing-md, 8px);
  border-bottom: 2px solid var(--layera-colors-purple-200, #e1bee7);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

.layera-secondary-modal-content {
  background: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-sm, 4px);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.15);
}

.layera-secondary-modal-footer {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-lg, 16px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-purple-200, #e1bee7);
}

`;
  }

  /**
   * Workflow Management Patterns - Workflow types, configurations
   */
  static generateWorkflowManagementPatternsCSS() {
    return `
/* WORKFLOW MANAGEMENT PATTERNS */
.layera-workflow-selector {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-size: var(--layera-typography-size-base, 14px);
}

.layera-workflow-date {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-config-number-input {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-config-notes {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  height: 60px;
  resize: none;
  background: var(--layera-colors-white, #ffffff);
  font-family: var(--layera-typography-family-base, system-ui);
}

.layera-alert-level-selector {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-alert-datetime {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

`;
  }

  /**
   * Advanced Configuration Inputs - Specialized input types
   */
  static generateAdvancedConfigurationInputsCSS() {
    return `
/* ADVANCED CONFIGURATION INPUTS */
.layera-achievement-title {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-winner-email {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-maintenance-reason {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  height: 60px;
  resize: none;
  background: var(--layera-colors-white, #ffffff);
  font-family: var(--layera-typography-family-base, system-ui);
}

.layera-admin-confirmation {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

.layera-tutorial-url {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-tutorial-duration {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

`;
  }

  /**
   * Secondary Modal Animations - Smooth transitions
   */
  static generateSecondaryModalAnimationsCSS() {
    return `
/* SECONDARY MODAL ANIMATIONS */
.layera-secondary-modal-enter {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
  transition: all 0.2s ease-out;
}

.layera-secondary-modal-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.layera-secondary-modal-exit {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 0.15s ease-in;
}

.layera-secondary-modal-exit-active {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.layera-secondary-modal-backdrop {
  background: rgba(144, 19, 254, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease-out;
}

`;
  }

  /**
   * Business Support Buttons - Themed action buttons
   */
  static generateBusinessSupportButtonsCSS() {
    return `
/* BUSINESS SUPPORT BUTTONS */
.layera-workflow-btn {
  background: var(--layera-colors-blue-500, #4A90E2);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-workflow-btn:hover {
  background: var(--layera-colors-blue-600, #357abd);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
}

.layera-config-btn {
  background: var(--layera-colors-purple-500, #9013FE);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-config-btn:hover {
  background: var(--layera-colors-purple-600, #7b1fa2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(144, 19, 254, 0.3);
}

.layera-announce-btn {
  background: var(--layera-colors-green-500, #4CAF50);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-announce-btn:hover {
  background: var(--layera-colors-green-600, #388e3c);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.layera-alert-btn {
  background: var(--layera-colors-orange-500, #FF9800);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-alert-btn:hover {
  background: var(--layera-colors-orange-600, #f57c00);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
}

.layera-maintenance-btn {
  background: var(--layera-colors-red-500, #F44336);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-maintenance-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

.layera-tutorial-btn {
  background: var(--layera-colors-blue-400, #2196F3);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-tutorial-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
}

.layera-secondary-cancel-btn {
  background: var(--layera-colors-gray-400, #ccc);
  color: var(--layera-colors-gray-800, #424242);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-normal, 400);
  transition: all 0.2s ease;
}

.layera-secondary-cancel-btn:hover {
  background: var(--layera-colors-gray-500, #9e9e9e);
  transform: translateY(-1px);
}

`;
  }

  /**
   * Secondary Modal Forms - Form layout and structure
   */
  static generateSecondaryModalFormsCSS() {
    return `
/* SECONDARY MODAL FORMS */
.layera-secondary-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-secondary-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs, 2px);
}

.layera-secondary-form-label {
  font-size: var(--layera-typography-size-sm, 12px);
  font-weight: var(--layera-typography-weight-medium, 500);
  color: var(--layera-colors-purple-700, #8e24aa);
  margin-bottom: var(--layera-spacing-xs, 2px);
}

.layera-secondary-form-help {
  font-size: var(--layera-typography-size-xs, 11px);
  color: var(--layera-colors-gray-600, #757575);
  margin-top: var(--layera-spacing-xs, 2px);
}

.layera-secondary-form-actions {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-md, 8px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-purple-200, #e1bee7);
}

`;
  }

  /**
   * Secondary Modal Responsive - Mobile and tablet adaptations
   */
  static generateSecondaryModalResponsiveCSS() {
    return `
/* SECONDARY MODAL RESPONSIVE */
@media (max-width: 768px) {
  .layera-support-modal-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md, 8px);
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-secondary-modal-title {
    font-size: var(--layera-typography-size-base, 14px);
  }

  .layera-secondary-form-actions {
    flex-direction: column;
  }

  .layera-workflow-btn,
  .layera-config-btn,
  .layera-announce-btn,
  .layera-alert-btn,
  .layera-maintenance-btn,
  .layera-tutorial-btn,
  .layera-secondary-cancel-btn {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--layera-spacing-xs, 2px);
  }
}

@media (max-width: 480px) {
  .layera-secondary-modal-content {
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-workflow-modal,
  .layera-config-modal,
  .layera-celebration-modal,
  .layera-system-alert-modal,
  .layera-maintenance-modal,
  .layera-tutorial-modal {
    padding: var(--layera-spacing-md, 8px);
  }
}

`;
  }

  /**
   * Secondary Modal Accessibility - ARIA and keyboard support
   */
  static generateSecondaryModalAccessibilityCSS() {
    return `
/* SECONDARY MODAL ACCESSIBILITY */
.layera-secondary-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(144, 19, 254, 0.2);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.layera-secondary-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  z-index: 1001;
}

.layera-secondary-modal-focus-trap {
  outline: none;
}

.layera-secondary-modal-sr-only {
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

.layera-workflow-btn:focus,
.layera-config-btn:focus,
.layera-announce-btn:focus,
.layera-alert-btn:focus,
.layera-maintenance-btn:focus,
.layera-tutorial-btn:focus,
.layera-secondary-cancel-btn:focus {
  outline: 2px solid var(--layera-colors-purple-500, #9013FE);
  outline-offset: 2px;
}

.layera-workflow-selector:focus,
.layera-workflow-date:focus,
.layera-config-number-input:focus,
.layera-config-notes:focus,
.layera-alert-level-selector:focus,
.layera-alert-datetime:focus,
.layera-achievement-title:focus,
.layera-winner-email:focus,
.layera-maintenance-reason:focus,
.layera-admin-confirmation:focus,
.layera-tutorial-url:focus,
.layera-tutorial-duration:focus {
  outline: 2px solid var(--layera-colors-purple-500, #9013FE);
  outline-offset: 1px;
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
}

`;
  }

  /**
   * Secondary Modal Interactions - Hover states and transitions
   */
  static generateSecondaryModalInteractionsCSS() {
    return `
/* SECONDARY MODAL INTERACTIONS */
.layera-workflow-modal:hover,
.layera-config-modal:hover,
.layera-celebration-modal:hover,
.layera-system-alert-modal:hover,
.layera-maintenance-modal:hover,
.layera-tutorial-modal:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(144, 19, 254, 0.15);
  transition: all 0.3s ease;
}

.layera-workflow-selector:hover,
.layera-config-number-input:hover,
.layera-alert-level-selector:hover,
.layera-achievement-title:hover,
.layera-winner-email:hover,
.layera-tutorial-url:hover,
.layera-tutorial-duration:hover {
  border-color: var(--layera-colors-purple-600, #7b1fa2);
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.1);
}

.layera-workflow-date:hover,
.layera-alert-datetime:hover {
  border-color: var(--layera-colors-orange-600, #f57c00);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.1);
}

.layera-config-notes:hover,
.layera-maintenance-reason:hover {
  border-color: var(--layera-colors-purple-600, #7b1fa2);
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.1);
}

.layera-admin-confirmation:hover {
  border-color: var(--layera-colors-red-600, #d32f2f);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.1);
}

.layera-secondary-modal-backdrop:hover {
  backdrop-filter: blur(6px);
}

`;
  }
}