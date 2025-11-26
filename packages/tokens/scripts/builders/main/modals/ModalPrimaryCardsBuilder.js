/**
 * ModalPrimaryCardsBuilder - Enterprise Modal Primary Cards CSS Builder
 *
 * HTML-aligned enterprise CSS builder για primary-themed modal components
 * Παράγει CSS για core business modal workflows με primary theming patterns
 */

export class ModalPrimaryCardsBuilder {

  /**
   * Generates complete modal primary cards CSS
   */
  static generateAllModalPrimaryCardsCSS() {
    let css = '/* === MODAL PRIMARY CARDS === */\n\n';

    css += this.generatePrimaryModalContextCSS();
    css += this.generateCoreBusinessWorkflowsCSS();
    css += this.generatePrimaryModalComponentsCSS();
    css += this.generateBusinessProcessPatternsCSS();
    css += this.generateAdvancedInputSystemCSS();
    css += this.generatePrimaryModalAnimationsCSS();
    css += this.generateBusinessActionButtonsCSS();
    css += this.generatePrimaryModalFormsCSS();
    css += this.generatePrimaryModalResponsiveCSS();
    css += this.generatePrimaryModalAccessibilityCSS();
    css += this.generatePrimaryModalInteractionsCSS();

    return css;
  }

  /**
   * PRIMARY MODAL CONTEXT
   */
  static generatePrimaryModalContextCSS() {
    return `
/* PRIMARY MODAL CONTEXT */
.layera-primary-modal-context {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid #90caf9;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-xl);
  position: relative;
  overflow: hidden;
}

.layera-primary-modal-context::before {
  content: "🏢";
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  animation: primary-pulse 3s ease-in-out infinite;
}

.layera-primary-modal-header {
  text-align: center;
  color: var(--layera-color-primary);
  margin-bottom: var(--layera-spacing-lg);
  font-weight: var(--layera-font-weight-semibold);
  font-size: var(--layera-font-size-base);
  padding: var(--layera-spacing-sm);
  background: rgba(74, 144, 226, 0.05);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.layera-primary-banner {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid var(--layera-color-primary);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-md);
  margin-bottom: var(--layera-spacing-lg);
  color: #1565c0;
  text-align: center;
  font-weight: var(--layera-font-weight-medium);
  position: relative;
  overflow: hidden;
}

.layera-primary-banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.2), transparent);
  animation: primary-shine 3s ease-in-out infinite;
}

@keyframes primary-pulse {
  0%, 100% { transform: translateX(-50%) scale(1); box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3); }
  50% { transform: translateX(-50%) scale(1.05); box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4); }
}

@keyframes primary-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.layera-primary-notification {
  background: var(--layera-color-primary-100);
  border: 1px solid var(--layera-color-primary-300);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-sm);
  margin: var(--layera-spacing-sm) 0;
  color: var(--layera-color-primary-800);
  font-size: var(--layera-font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-primary-notification::before {
  content: "💼";
  font-size: 1.1em;
}

`;
  }

  /**
   * CORE BUSINESS WORKFLOWS
   */
  static generateCoreBusinessWorkflowsCSS() {
    return `
/* CORE BUSINESS WORKFLOWS */
.layera-business-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg);
  padding: var(--layera-spacing-xl);
  background: linear-gradient(135deg, #f8fdff 0%, #e3f2fd 100%);
  border-radius: var(--layera-border-radius-lg);
  position: relative;
}

.layera-business-modal-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-primary) 0%, #1976d2 100%);
  border-radius: var(--layera-border-radius-lg) var(--layera-border-radius-lg) 0 0;
}

.layera-business-workflow-header {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--layera-color-primary);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-bold);
  margin-bottom: var(--layera-spacing-md);
  padding: var(--layera-spacing-md);
  background: rgba(74, 144, 226, 0.08);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.layera-workflow-registration {
  background: var(--layera-color-primary-50);
  border: 1px solid var(--layera-color-primary-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-workflow-assignment {
  background: var(--layera-color-secondary-50);
  border: 1px solid var(--layera-color-secondary-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-workflow-payment {
  background: var(--layera-color-success-50);
  border: 1px solid var(--layera-color-success-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-workflow-reporting {
  background: var(--layera-color-warning-50);
  border: 1px solid var(--layera-color-warning-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-workflow-deletion {
  background: var(--layera-color-danger-50);
  border: 1px solid var(--layera-color-danger-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
  border: 2px dashed var(--layera-color-danger);
}

.layera-workflow-help {
  background: var(--layera-color-info-50);
  border: 1px solid var(--layera-color-info-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-business-process-indicator {
  position: absolute;
  top: var(--layera-spacing-xs);
  right: var(--layera-spacing-xs);
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

`;
  }

  /**
   * PRIMARY MODAL COMPONENTS
   */
  static generatePrimaryModalComponentsCSS() {
    return `
/* PRIMARY MODAL COMPONENTS */
.layera-primary-modal-item {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-left: 4px solid var(--layera-color-primary);
  transition: all var(--layera-transition-normal);
  position: relative;
  overflow: hidden;
}

.layera-primary-modal-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-primary);
  transition: all var(--layera-transition-fast);
}

.layera-primary-modal-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
  border-color: var(--layera-color-primary);
}

.layera-primary-modal-item:hover::before {
  height: 6px;
  background: linear-gradient(90deg, var(--layera-color-primary) 0%, #1976d2 100%);
}

.layera-primary-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-spacing-md);
}

.layera-primary-modal-title {
  color: var(--layera-color-primary);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  margin: 0;
}

.layera-primary-modal-badge {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layera-primary-modal-content {
  margin-bottom: var(--layera-spacing-md);
  line-height: var(--layera-line-height-relaxed);
}

.layera-primary-modal-progress {
  width: 100%;
  height: 6px;
  background: var(--layera-color-border);
  border-radius: var(--layera-border-radius-full);
  margin: var(--layera-spacing-md) 0;
  overflow: hidden;
}

.layera-primary-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--layera-color-primary) 0%, #1976d2 100%);
  border-radius: var(--layera-border-radius-full);
  transition: width var(--layera-transition-slow);
  width: 0%;
}

/* Modal Type Variants for Primary Context */
.layera-primary-modal-item.layera-modal-primary {
  border-left-color: var(--layera-color-primary);
  background: linear-gradient(135deg, var(--layera-color-primary-25), var(--layera-color-background-primary));
}

.layera-primary-modal-item.layera-modal-secondary {
  border-left-color: var(--layera-color-secondary);
  background: linear-gradient(135deg, var(--layera-color-secondary-25), var(--layera-color-background-primary));
}

.layera-primary-modal-item.layera-modal-success {
  border-left-color: var(--layera-color-success);
  background: linear-gradient(135deg, var(--layera-color-success-25), var(--layera-color-background-primary));
}

.layera-primary-modal-item.layera-modal-warning {
  border-left-color: var(--layera-color-warning);
  background: linear-gradient(135deg, var(--layera-color-warning-25), var(--layera-color-background-primary));
}

.layera-primary-modal-item.layera-modal-danger {
  border-left-color: var(--layera-color-danger);
  background: linear-gradient(135deg, var(--layera-color-danger-25), var(--layera-color-background-primary));
  border: 2px solid var(--layera-color-danger-200);
}

.layera-primary-modal-item.layera-modal-info {
  border-left-color: var(--layera-color-info);
  background: linear-gradient(135deg, var(--layera-color-info-25), var(--layera-color-background-primary));
}

`;
  }

  /**
   * BUSINESS PROCESS PATTERNS
   */
  static generateBusinessProcessPatternsCSS() {
    return `
/* BUSINESS PROCESS PATTERNS */
.layera-user-registration-form {
  background: var(--layera-color-primary-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-registration-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
  margin-bottom: var(--layera-spacing-md);
}

.layera-department-assignment {
  background: var(--layera-color-secondary-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-department-selector {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
}

.layera-priority-slider-container {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
  margin: var(--layera-spacing-md) 0;
}

.layera-priority-slider {
  width: 100%;
  height: 6px;
  background: var(--layera-color-border);
  border-radius: var(--layera-border-radius-full);
  outline: none;
  appearance: none;
  cursor: pointer;
}

.layera-priority-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--layera-color-secondary);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(144, 19, 254, 0.3);
}

.layera-priority-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--layera-color-secondary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(144, 19, 254, 0.3);
}

.layera-payment-processing {
  background: var(--layera-color-success-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
  position: relative;
}

.layera-payment-security-indicator {
  position: absolute;
  top: var(--layera-spacing-sm);
  right: var(--layera-spacing-sm);
  background: var(--layera-color-success);
  color: var(--layera-color-white);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
}

.layera-payment-security-indicator::before {
  content: "🔒";
  font-size: 0.8em;
}

.layera-issue-reporting {
  background: var(--layera-color-warning-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-urgency-checkbox-container {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  background: var(--layera-color-warning-50);
  padding: var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-warning-200);
  margin: var(--layera-spacing-sm) 0;
}

.layera-deletion-confirmation {
  background: var(--layera-color-danger-25);
  border: 2px dashed var(--layera-color-danger);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
  position: relative;
}

.layera-deletion-warning {
  background: var(--layera-color-danger-100);
  border: 1px solid var(--layera-color-danger-300);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-sm);
  margin: var(--layera-spacing-sm) 0;
  color: var(--layera-color-danger-800);
  font-weight: var(--layera-font-weight-bold);
  font-size: var(--layera-font-size-sm);
  text-align: center;
}

.layera-consequence-confirmation {
  display: flex;
  align-items: flex-start;
  gap: var(--layera-spacing-sm);
  background: var(--layera-color-danger-50);
  padding: var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-danger-200);
  margin: var(--layera-spacing-sm) 0;
}

.layera-help-search-system {
  background: var(--layera-color-info-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-knowledge-base-search {
  position: relative;
}

.layera-search-icon {
  position: absolute;
  left: var(--layera-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--layera-color-info);
  font-size: 1em;
  pointer-events: none;
}

.layera-help-topic-selector {
  margin: var(--layera-spacing-sm) 0;
}

`;
  }

  /**
   * ADVANCED INPUT SYSTEM
   */
  static generateAdvancedInputSystemCSS() {
    return `
/* ADVANCED INPUT SYSTEM */
.layera-primary-modal-input {
  width: 100%;
  padding: var(--layera-spacing-md);
  border: 2px solid var(--layera-color-border);
  border-radius: var(--layera-border-radius-sm);
  background: var(--layera-color-background-primary);
  color: var(--layera-color-text-primary);
  font-family: var(--layera-font-family-sans);
  font-size: var(--layera-font-size-sm);
  margin: var(--layera-spacing-sm) 0;
  transition: all var(--layera-transition-fast);
  box-sizing: border-box;
}

.layera-primary-modal-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-primary-25);
}

.layera-primary-modal-input::placeholder {
  color: var(--layera-color-text-tertiary);
  opacity: 0.7;
}

/* Context-specific input styling */
.layera-primary-modal-item.layera-modal-primary .layera-primary-modal-input {
  border-color: var(--layera-color-primary-200);
}

.layera-primary-modal-item.layera-modal-primary .layera-primary-modal-input:focus {
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-primary-25);
}

.layera-primary-modal-item.layera-modal-secondary .layera-primary-modal-input {
  border-color: var(--layera-color-secondary-200);
}

.layera-primary-modal-item.layera-modal-secondary .layera-primary-modal-input:focus {
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
  background: var(--layera-color-secondary-25);
}

.layera-primary-modal-item.layera-modal-success .layera-primary-modal-input {
  border-color: var(--layera-color-success-200);
}

.layera-primary-modal-item.layera-modal-success .layera-primary-modal-input:focus {
  border-color: var(--layera-color-success);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background: var(--layera-color-success-25);
}

.layera-primary-modal-item.layera-modal-warning .layera-primary-modal-input {
  border-color: var(--layera-color-warning-200);
}

.layera-primary-modal-item.layera-modal-warning .layera-primary-modal-input:focus {
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  background: var(--layera-color-warning-25);
}

.layera-primary-modal-item.layera-modal-danger .layera-primary-modal-input {
  border-color: var(--layera-color-danger-300);
  background: var(--layera-color-danger-25);
}

.layera-primary-modal-item.layera-modal-danger .layera-primary-modal-input:focus {
  border-color: var(--layera-color-danger);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
  background: var(--layera-color-danger-50);
}

.layera-primary-modal-item.layera-modal-info .layera-primary-modal-input {
  border-color: var(--layera-color-info-200);
}

.layera-primary-modal-item.layera-modal-info .layera-primary-modal-input:focus {
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  background: var(--layera-color-info-25);
}

/* Specialized Input Types */
.layera-primary-modal-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: var(--layera-font-family-sans);
  line-height: var(--layera-line-height-relaxed);
}

.layera-primary-modal-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234A90E2'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--layera-spacing-sm) center;
  background-size: 20px;
  padding-right: var(--layera-spacing-xl);
  cursor: pointer;
}

.layera-primary-modal-range {
  width: 100%;
  height: 6px;
  background: var(--layera-color-border);
  border-radius: var(--layera-border-radius-full);
  outline: none;
  appearance: none;
  cursor: pointer;
  margin: var(--layera-spacing-sm) 0;
}

.layera-primary-modal-range::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--layera-color-primary);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(74, 144, 226, 0.3);
  transition: all var(--layera-transition-fast);
}

.layera-primary-modal-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.layera-primary-modal-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--layera-color-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(74, 144, 226, 0.3);
}

.layera-primary-modal-checkbox {
  width: auto;
  margin: 0;
  accent-color: var(--layera-color-primary);
  transform: scale(1.2);
}

.layera-primary-checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  cursor: pointer;
  font-size: var(--layera-font-size-sm);
  color: var(--layera-color-text-primary);
  margin: var(--layera-spacing-sm) 0;
}

.layera-primary-checkbox-label:hover {
  color: var(--layera-color-primary);
}

/* Input Type Specific Styling */
.layera-primary-modal-input[type="email"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234A90E2'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpolyline points='22,6 12,13 2,6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
  padding-left: var(--layera-spacing-xl);
}

.layera-primary-modal-input[type="search"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234A90E2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
  padding-left: var(--layera-spacing-xl);
}

.layera-primary-modal-input[type="number"] {
  text-align: right;
}

`;
  }

  /**
   * PRIMARY MODAL ANIMATIONS
   */
  static generatePrimaryModalAnimationsCSS() {
    return `
/* PRIMARY MODAL ANIMATIONS */
@keyframes primary-modal-slide-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes primary-modal-scale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes primary-glow-pulse {
  0% { box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(74, 144, 226, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 144, 226, 0); }
}

@keyframes primary-progress-fill {
  0% { width: 0%; }
  100% { width: 100%; }
}

.layera-primary-modal-item {
  animation: primary-modal-slide-in 0.6s ease-out;
  animation-delay: calc(var(--modal-index, 0) * 0.1s);
  animation-fill-mode: both;
}

.layera-primary-modal-highlight {
  animation: primary-glow-pulse 2s ease-in-out infinite;
}

.layera-primary-modal-loading {
  position: relative;
  opacity: 0.7;
  pointer-events: none;
}

.layera-primary-modal-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--layera-color-border);
  border-top: 2px solid var(--layera-color-primary);
  border-radius: 50%;
  animation: primary-loading-spin 1s linear infinite;
}

@keyframes primary-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.layera-primary-modal-success {
  animation: primary-modal-scale 0.5s ease-out;
}

.layera-primary-progress-animated .layera-primary-progress-bar {
  animation: primary-progress-fill 2s ease-out;
}

.layera-primary-modal-fade-in {
  opacity: 0;
  animation: primary-modal-fade-in 0.5s ease-out forwards;
}

@keyframes primary-modal-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

`;
  }

  /**
   * BUSINESS ACTION BUTTONS
   */
  static generateBusinessActionButtonsCSS() {
    return `
/* BUSINESS ACTION BUTTONS */
.layera-primary-modal-actions {
  display: flex;
  gap: var(--layera-spacing-sm);
  margin-top: var(--layera-spacing-lg);
  justify-content: flex-end;
  align-items: center;
}

.layera-primary-modal-btn {
  padding: var(--layera-spacing-sm) var(--layera-spacing-lg);
  border: none;
  border-radius: var(--layera-border-radius-sm);
  font-family: var(--layera-font-family-sans);
  font-size: var(--layera-font-size-sm);
  font-weight: var(--layera-font-weight-medium);
  cursor: pointer;
  transition: all var(--layera-transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
  text-decoration: none;
  min-width: 120px;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.layera-primary-modal-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--layera-transition-normal);
}

.layera-primary-modal-btn:hover::before {
  left: 100%;
}

.layera-primary-modal-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.layera-primary-modal-btn:active {
  transform: translateY(0);
}

/* Business Action Button Types */
.layera-primary-create-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
  border: 2px solid var(--layera-color-primary-300);
}

.layera-primary-create-btn:hover {
  background: var(--layera-color-primary-700);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.layera-primary-create-btn::after {
  content: "✓";
  margin-left: var(--layera-spacing-xs);
}

.layera-primary-assign-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-primary-assign-btn:hover {
  background: var(--layera-color-secondary-700);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.3);
}

.layera-primary-payment-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-white);
  position: relative;
}

.layera-primary-payment-btn:hover {
  background: var(--layera-color-success-700);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.layera-primary-payment-btn::after {
  content: "💳";
  margin-left: var(--layera-spacing-xs);
}

.layera-primary-report-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
}

.layera-primary-report-btn:hover {
  background: var(--layera-color-warning-700);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.layera-primary-delete-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  border: 2px solid var(--layera-color-danger-300);
  text-transform: uppercase;
  font-weight: var(--layera-font-weight-bold);
  letter-spacing: 0.5px;
}

.layera-primary-delete-btn:hover {
  background: var(--layera-color-danger-700);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
  animation: danger-button-shake 0.3s ease-in-out;
}

@keyframes danger-button-shake {
  0%, 100% { transform: translateY(-1px); }
  25% { transform: translateY(-1px) translateX(-2px); }
  75% { transform: translateY(-1px) translateX(2px); }
}

.layera-primary-help-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
}

.layera-primary-help-btn:hover {
  background: var(--layera-color-info-700);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

/* Cancel and Close Buttons */
.layera-primary-cancel-btn,
.layera-primary-close-btn {
  background: var(--layera-color-border-secondary);
  color: var(--layera-color-text-secondary);
  border: 1px solid var(--layera-color-border);
}

.layera-primary-cancel-btn:hover,
.layera-primary-close-btn:hover {
  background: var(--layera-color-border);
  color: var(--layera-color-text-primary);
}

`;
  }

  /**
   * PRIMARY MODAL FORMS
   */
  static generatePrimaryModalFormsCSS() {
    return `
/* PRIMARY MODAL FORMS */
.layera-primary-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
}

.layera-primary-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs);
}

.layera-primary-label {
  font-weight: var(--layera-font-weight-medium);
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-sm);
  margin-bottom: var(--layera-spacing-xs);
}

.layera-primary-required {
  color: var(--layera-color-primary);
  margin-left: var(--layera-spacing-xs);
}

.layera-primary-help-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-text-secondary);
  margin-top: var(--layera-spacing-xs);
}

.layera-primary-error-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-danger);
  margin-top: var(--layera-spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
}

.layera-primary-error-text::before {
  content: "⚠️";
  font-size: 0.8em;
}

.layera-primary-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--layera-spacing-md);
  border-top: 1px solid var(--layera-color-border);
  margin-top: var(--layera-spacing-md);
}

.layera-form-validation-status {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  font-size: var(--layera-font-size-sm);
  color: var(--layera-color-text-secondary);
}

.layera-form-validation-status.valid {
  color: var(--layera-color-success);
}

.layera-form-validation-status.invalid {
  color: var(--layera-color-danger);
}

.layera-form-validation-status::before {
  content: "⚪";
  font-size: 0.8em;
}

.layera-form-validation-status.valid::before {
  content: "✅";
}

.layera-form-validation-status.invalid::before {
  content: "❌";
}

`;
  }

  /**
   * PRIMARY MODAL RESPONSIVE
   */
  static generatePrimaryModalResponsiveCSS() {
    return `
/* PRIMARY MODAL RESPONSIVE */
@media (max-width: 768px) {
  .layera-business-modal-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md);
    padding: var(--layera-spacing-lg);
  }

  .layera-primary-modal-item {
    padding: var(--layera-spacing-md);
  }

  .layera-primary-modal-actions {
    flex-direction: column;
    gap: var(--layera-spacing-sm);
  }

  .layera-primary-modal-btn {
    width: 100%;
  }

  .layera-primary-modal-footer {
    flex-direction: column;
    gap: var(--layera-spacing-sm);
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .layera-business-modal-grid {
    padding: var(--layera-spacing-md);
    gap: var(--layera-spacing-sm);
  }

  .layera-primary-modal-item {
    padding: var(--layera-spacing-sm);
  }

  .layera-primary-modal-title {
    font-size: var(--layera-font-size-base);
  }

  .layera-primary-modal-input,
  .layera-primary-modal-textarea,
  .layera-primary-modal-select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: var(--layera-spacing-sm);
  }

  .layera-business-workflow-header {
    font-size: var(--layera-font-size-base);
    padding: var(--layera-spacing-sm);
  }
}

@media (max-width: 320px) {
  .layera-business-modal-grid {
    padding: var(--layera-spacing-sm);
  }

  .layera-primary-modal-item {
    padding: var(--layera-spacing-xs);
  }

  .layera-primary-modal-btn {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-xs);
  }
}

`;
  }

  /**
   * PRIMARY MODAL ACCESSIBILITY
   */
  static generatePrimaryModalAccessibilityCSS() {
    return `
/* PRIMARY MODAL ACCESSIBILITY */
.layera-primary-modal-item:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-primary-modal-input:focus,
.layera-primary-modal-textarea:focus,
.layera-primary-modal-select:focus,
.layera-primary-modal-range:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.layera-primary-modal-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.layera-primary-checkbox:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-primary-modal-sr-only {
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

.layera-primary-modal[role="dialog"] {
  outline: none;
}

.layera-primary-modal-title[id] {
  margin-bottom: var(--layera-spacing-lg);
}

.layera-primary-modal-description[id] {
  margin-bottom: var(--layera-spacing-md);
  color: var(--layera-color-text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .layera-primary-modal-item,
  .layera-primary-modal-btn,
  .layera-primary-progress-bar {
    animation: none;
    transition: none;
  }

  .layera-primary-modal-item:hover,
  .layera-primary-modal-btn:hover {
    transform: none;
  }
}

@media (prefers-high-contrast: active) {
  .layera-primary-modal-item {
    border-width: 2px;
  }

  .layera-primary-modal-input,
  .layera-primary-modal-textarea,
  .layera-primary-modal-select {
    border-width: 2px;
  }

  .layera-primary-modal-btn {
    border: 2px solid currentColor;
  }
}

`;
  }

  /**
   * PRIMARY MODAL INTERACTIONS
   */
  static generatePrimaryModalInteractionsCSS() {
    return `
/* PRIMARY MODAL INTERACTIONS */
.layera-primary-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(74, 144, 226, 0.1);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1000;
}

.layera-primary-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.layera-primary-modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  box-shadow: 0 20px 60px rgba(74, 144, 226, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1001;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  border: 2px solid var(--layera-color-primary-200);
}

.layera-primary-modal-dialog.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.layera-primary-tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}

.layera-primary-tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  font-size: var(--layera-font-size-xs);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-fast);
  z-index: 100;
}

.layera-primary-tooltip::after {
  content: '';
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--layera-color-primary);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-fast);
}

.layera-primary-tooltip:hover::before,
.layera-primary-tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

.layera-primary-modal-backdrop-click {
  cursor: pointer;
}

.layera-primary-modal-no-scroll {
  overflow: hidden;
}

.layera-primary-modal-draggable {
  cursor: move;
}

.layera-primary-modal-resizable {
  resize: both;
  overflow: auto;
  min-width: 300px;
  min-height: 200px;
}

.layera-business-workflow-indicator {
  display: inline-flex;
  align-items: center;
  background: var(--layera-color-primary-100);
  color: var(--layera-color-primary-800);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-medium);
  border: 1px solid var(--layera-color-primary-200);
  gap: var(--layera-spacing-xs);
}

.layera-business-workflow-indicator::before {
  content: "💼";
  font-size: 0.8em;
}

`;
  }
}