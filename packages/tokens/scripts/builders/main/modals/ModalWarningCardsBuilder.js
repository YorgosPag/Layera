/**
 * ModalWarningCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για modal warning cards components
 * Βασισμένο στο: html\htmlComponents\main\modals\modal-warning-cards.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Warning-focused workflows (reviews, assignments, promotions, performance, suspension, training)
 * - Warning theming με πορτοκαλί βάση (#FF9800)
 * - HR-focused workflows και human resources management
 * - Advanced input types (textarea, select, email, date, text, number, url)
 * - Warning layout με διαφορετική διάταξη των modals
 * - Enterprise HR patterns
 */

export class ModalWarningCardsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Modal Warning Cards CSS
   */
  static generateAllModalWarningCardsCSS() {
    let css = '/* === MODAL WARNING CARDS === */\n\n';

    css += this.generateWarningModalContextCSS();
    css += this.generateHRWorkflowsCSS();
    css += this.generateWarningModalComponentsCSS();
    css += this.generatePerformanceManagementPatternsCSS();
    css += this.generateHRManagementInputsCSS();
    css += this.generateWarningModalAnimationsCSS();
    css += this.generateHRActionButtonsCSS();
    css += this.generateWarningModalFormsCSS();
    css += this.generateWarningModalResponsiveCSS();
    css += this.generateWarningModalAccessibilityCSS();
    css += this.generateWarningModalInteractionsCSS();

    return css;
  }

  /**
   * Warning Modal Context - Πορτοκαλί θεματική βάση
   */
  static generateWarningModalContextCSS() {
    return `
/* WARNING MODAL CONTEXT */
.layera-warning-modal-context {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-md, 8px);
}

.layera-warning-modal-theme {
  --warning-primary: var(--layera-colors-orange-600, #FF9800);
  --warning-light: var(--layera-colors-orange-100, #fff8e1);
  --warning-dark: var(--layera-colors-orange-800, #ef6c00);
  --warning-text: var(--layera-colors-orange-900, #e65100);
}

.layera-warning-layout-header {
  text-align: center;
  color: var(--layera-colors-orange-500, #FF9800);
  margin-bottom: var(--layera-spacing-lg, 16px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  border-bottom: 2px solid var(--layera-colors-orange-200, #ffecb3);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

.layera-warning-alert-icon {
  display: inline-block;
  margin-right: var(--layera-spacing-xs, 2px);
  font-size: 1.2em;
  animation: warningPulse 2s ease-in-out infinite;
}

@keyframes warningPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

`;
  }

  /**
   * HR Workflows - Reviews, assignments, promotions, performance, suspension, training
   */
  static generateHRWorkflowsCSS() {
    return `
/* HR WORKFLOWS */
.layera-hr-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg, 16px);
  padding: var(--layera-spacing-xl, 24px);
}

/* Review Modal */
.layera-review-modal {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid var(--layera-colors-blue-500, #4A90E2);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-review-modal::before {
  content: "📝";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
}

/* Assignment Modal */
.layera-assignment-modal {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border: 2px solid var(--layera-colors-purple-500, #9013FE);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-assignment-modal::before {
  content: "👤";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.3);
}

/* Promotion Modal */
.layera-promotion-modal {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 2px solid var(--layera-colors-green-500, #4CAF50);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-promotion-modal::before {
  content: "🎉";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

/* Performance Warning Modal */
.layera-performance-modal {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid var(--layera-colors-orange-500, #FF9800);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-performance-modal::before {
  content: "📈";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

/* Suspension Modal */
.layera-suspension-modal {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 2px solid var(--layera-colors-red-500, #F44336);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-suspension-modal::before {
  content: "⏸️";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

/* Training Modal */
.layera-training-modal {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 2px solid var(--layera-colors-blue-400, #2196F3);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-training-modal::before {
  content: "🎓";
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 24px;
  background: var(--layera-colors-white, #ffffff);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

`;
  }

  /**
   * Warning Modal Components - Titles, inputs, buttons
   */
  static generateWarningModalComponentsCSS() {
    return `
/* WARNING MODAL COMPONENTS */
.layera-warning-modal-title {
  font-size: var(--layera-typography-size-lg, 18px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  color: var(--layera-colors-orange-800, #ef6c00);
  margin-bottom: var(--layera-spacing-md, 8px);
  border-bottom: 2px solid var(--layera-colors-orange-200, #ffecb3);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

.layera-warning-modal-content {
  background: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-sm, 4px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
}

.layera-warning-modal-footer {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-lg, 16px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-orange-200, #ffecb3);
}

`;
  }

  /**
   * Performance Management Patterns - Performance tracking and improvement
   */
  static generatePerformanceManagementPatternsCSS() {
    return `
/* PERFORMANCE MANAGEMENT PATTERNS */
.layera-performance-warning {
  border-left: 4px solid var(--layera-colors-orange-500, #FF9800);
  padding-left: var(--layera-spacing-md, 8px);
  background: linear-gradient(90deg, rgba(255, 152, 0, 0.1) 0%, transparent 100%);
}

.layera-performance-indicator {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-performance-indicator::before {
  content: "⚠️";
  color: var(--layera-colors-orange-500, #FF9800);
  font-weight: bold;
}

.layera-hr-priority-high {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 1px solid var(--layera-colors-red-300, #ffcdd2);
  color: var(--layera-colors-red-800, #c62828);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-xs, 11px);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-hr-priority-medium {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 1px solid var(--layera-colors-orange-300, #ffecb3);
  color: var(--layera-colors-orange-800, #ef6c00);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-xs, 11px);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-hr-priority-low {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 1px solid var(--layera-colors-green-300, #c8e6c9);
  color: var(--layera-colors-green-800, #2e7d32);
  padding: var(--layera-spacing-xs, 2px) var(--layera-spacing-sm, 4px);
  border-radius: var(--layera-spacing-xs, 2px);
  font-size: var(--layera-typography-size-xs, 11px);
  font-weight: var(--layera-typography-weight-bold, 700);
}

`;
  }

  /**
   * HR Management Inputs - Specialized inputs for HR processes
   */
  static generateHRManagementInputsCSS() {
    return `
/* HR MANAGEMENT INPUTS */
.layera-review-comments {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  height: 60px;
  resize: none;
  background: var(--layera-colors-white, #ffffff);
  font-family: var(--layera-typography-family-base, system-ui);
}

.layera-rating-selector {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-size: var(--layera-typography-size-base, 14px);
}

.layera-assign-user-email {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-due-date {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

.layera-new-position {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-new-salary {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
  font-weight: var(--layera-typography-weight-bold, 700);
  text-align: right;
}

.layera-performance-metric {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-improvement-areas {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  height: 60px;
  resize: none;
  background: var(--layera-colors-white, #ffffff);
  font-family: var(--layera-typography-family-base, system-ui);
}

.layera-suspension-reason {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-suspension-duration {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-training-type {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-training-url {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

`;
  }

  /**
   * Warning Modal Animations - Warning-specific transitions
   */
  static generateWarningModalAnimationsCSS() {
    return `
/* WARNING MODAL ANIMATIONS */
.layera-warning-modal-enter {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
  transition: all 0.25s ease-out;
}

.layera-warning-modal-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.layera-warning-modal-exit {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 0.2s ease-in;
}

.layera-warning-modal-exit-active {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.layera-warning-modal-backdrop {
  background: rgba(255, 152, 0, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.25s ease-out;
}

.layera-warning-shake {
  animation: warningShake 0.5s ease-in-out;
}

@keyframes warningShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.layera-hr-highlight {
  animation: hrHighlight 2s ease-in-out infinite;
}

@keyframes hrHighlight {
  0%, 100% { background-color: transparent; }
  50% { background-color: rgba(255, 152, 0, 0.1); }
}

`;
  }

  /**
   * HR Action Buttons - HR-specific action buttons
   */
  static generateHRActionButtonsCSS() {
    return `
/* HR ACTION BUTTONS */
.layera-submit-review-btn {
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

.layera-submit-review-btn:hover {
  background: var(--layera-colors-blue-600, #357abd);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
}

.layera-assign-task-btn {
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

.layera-assign-task-btn:hover {
  background: var(--layera-colors-purple-600, #7b1fa2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(144, 19, 254, 0.4);
}

.layera-promote-btn {
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

.layera-promote-btn:hover {
  background: var(--layera-colors-green-600, #388e3c);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

.layera-create-plan-btn {
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

.layera-create-plan-btn:hover {
  background: var(--layera-colors-orange-600, #f57c00);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4);
}

.layera-suspend-btn {
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

.layera-suspend-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
}

.layera-enroll-btn {
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

.layera-enroll-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(33, 150, 243, 0.4);
}

.layera-warning-cancel-btn,
.layera-warning-close-btn {
  background: var(--layera-colors-gray-400, #ccc);
  color: var(--layera-colors-gray-800, #424242);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-normal, 400);
  transition: all 0.2s ease;
}

.layera-warning-cancel-btn:hover,
.layera-warning-close-btn:hover {
  background: var(--layera-colors-gray-500, #9e9e9e);
  transform: translateY(-1px);
}

`;
  }

  /**
   * Warning Modal Forms - HR form layout
   */
  static generateWarningModalFormsCSS() {
    return `
/* WARNING MODAL FORMS */
.layera-warning-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-warning-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs, 2px);
}

.layera-warning-form-label {
  font-size: var(--layera-typography-size-sm, 12px);
  font-weight: var(--layera-typography-weight-medium, 500);
  color: var(--layera-colors-orange-700, #f57c00);
  margin-bottom: var(--layera-spacing-xs, 2px);
}

.layera-warning-form-help {
  font-size: var(--layera-typography-size-xs, 11px);
  color: var(--layera-colors-gray-600, #757575);
  margin-top: var(--layera-spacing-xs, 2px);
}

.layera-warning-form-actions {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-md, 8px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-orange-200, #ffecb3);
}

`;
  }

  /**
   * Warning Modal Responsive - Mobile and tablet adaptations
   */
  static generateWarningModalResponsiveCSS() {
    return `
/* WARNING MODAL RESPONSIVE */
@media (max-width: 768px) {
  .layera-hr-modal-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md, 8px);
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-warning-modal-title {
    font-size: var(--layera-typography-size-base, 14px);
  }

  .layera-warning-form-actions {
    flex-direction: column;
  }

  .layera-submit-review-btn,
  .layera-assign-task-btn,
  .layera-promote-btn,
  .layera-create-plan-btn,
  .layera-suspend-btn,
  .layera-enroll-btn,
  .layera-warning-cancel-btn,
  .layera-warning-close-btn {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--layera-spacing-xs, 2px);
  }

  .layera-review-modal::before,
  .layera-assignment-modal::before,
  .layera-promotion-modal::before,
  .layera-performance-modal::before,
  .layera-suspension-modal::before,
  .layera-training-modal::before {
    top: -5px;
    right: -5px;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .layera-warning-modal-content {
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-review-modal,
  .layera-assignment-modal,
  .layera-promotion-modal,
  .layera-performance-modal,
  .layera-suspension-modal,
  .layera-training-modal {
    padding: var(--layera-spacing-md, 8px);
  }
}

`;
  }

  /**
   * Warning Modal Accessibility - ARIA and keyboard support
   */
  static generateWarningModalAccessibilityCSS() {
    return `
/* WARNING MODAL ACCESSIBILITY */
.layera-warning-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 152, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.layera-warning-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  z-index: 1001;
}

.layera-warning-modal-focus-trap {
  outline: none;
}

.layera-warning-modal-sr-only {
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

.layera-submit-review-btn:focus,
.layera-assign-task-btn:focus,
.layera-promote-btn:focus,
.layera-create-plan-btn:focus,
.layera-suspend-btn:focus,
.layera-enroll-btn:focus,
.layera-warning-cancel-btn:focus,
.layera-warning-close-btn:focus {
  outline: 2px solid var(--layera-colors-orange-500, #FF9800);
  outline-offset: 2px;
}

.layera-review-comments:focus,
.layera-rating-selector:focus,
.layera-assign-user-email:focus,
.layera-due-date:focus,
.layera-new-position:focus,
.layera-new-salary:focus,
.layera-performance-metric:focus,
.layera-improvement-areas:focus,
.layera-suspension-reason:focus,
.layera-suspension-duration:focus,
.layera-training-type:focus,
.layera-training-url:focus {
  outline: 2px solid var(--layera-colors-orange-500, #FF9800);
  outline-offset: 1px;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

`;
  }

  /**
   * Warning Modal Interactions - Hover states and warning transitions
   */
  static generateWarningModalInteractionsCSS() {
    return `
/* WARNING MODAL INTERACTIONS */
.layera-review-modal:hover,
.layera-assignment-modal:hover,
.layera-promotion-modal:hover,
.layera-performance-modal:hover,
.layera-suspension-modal:hover,
.layera-training-modal:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 152, 0, 0.2);
  transition: all 0.3s ease;
}

.layera-review-comments:hover,
.layera-improvement-areas:hover {
  border-color: var(--layera-colors-orange-600, #f57c00);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
}

.layera-rating-selector:hover,
.layera-training-type:hover {
  border-color: var(--layera-colors-blue-600, #357abd);
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
}

.layera-assign-user-email:hover,
.layera-due-date:hover {
  border-color: var(--layera-colors-purple-600, #7b1fa2);
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.15);
}

.layera-new-position:hover {
  border-color: var(--layera-colors-green-600, #388e3c);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%);
}

.layera-new-salary:hover {
  border-color: var(--layera-colors-green-600, #388e3c);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-performance-metric:hover {
  border-color: var(--layera-colors-orange-600, #f57c00);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #fffde7 100%);
}

.layera-suspension-reason:hover,
.layera-suspension-duration:hover {
  border-color: var(--layera-colors-red-600, #d32f2f);
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #ffebee 100%);
}

.layera-training-url:hover {
  border-color: var(--layera-colors-blue-500, #1976d2);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
}

.layera-warning-modal-backdrop:hover {
  backdrop-filter: blur(6px);
}

/* HR Warning Effects */
.layera-hr-critical:hover {
  animation: hrCritical 1s ease-in-out;
}

@keyframes hrCritical {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.02); }
  50% { transform: scale(1.05); }
  75% { transform: scale(1.02); }
}

`;
  }
}