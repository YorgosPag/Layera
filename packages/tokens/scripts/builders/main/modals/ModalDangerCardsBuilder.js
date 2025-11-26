/**
 * ModalDangerCardsBuilder - Enterprise Modal Danger Cards CSS Builder
 *
 * HTML-aligned enterprise CSS builder για danger-themed modal components
 * Παράγει CSS για critical modal actions με safety confirmation patterns
 */

export class ModalDangerCardsBuilder {

  /**
   * Generates complete modal danger cards CSS
   */
  static generateAllModalDangerCardsCSS() {
    let css = '/* === MODAL DANGER CARDS === */\n\n';

    css += this.generateDangerModalContextCSS();
    css += this.generateModalComponentsGridCSS();
    css += this.generateModalItemSystemCSS();
    css += this.generateCriticalSafetyPatternsCSS();
    css += this.generateModalActionButtonsCSS();
    css += this.generateDangerConfirmationSystemCSS();
    css += this.generateModalInputVariationsCSS();
    css += this.generateModalAnimationsCSS();
    css += this.generateModalResponsiveDesignCSS();
    css += this.generateModalAccessibilityCSS();
    css += this.generateModalInteractionsCSS();

    return css;
  }

  /**
   * DANGER MODAL CONTEXT
   */
  static generateDangerModalContextCSS() {
    return `
/* DANGER MODAL CONTEXT */
.layera-danger-modal-context {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 2px solid #fca5a5;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-xl);
  position: relative;
  overflow: hidden;
}

.layera-danger-modal-context::before {
  content: "🚨";
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
  animation: danger-pulse 2s ease-in-out infinite;
}

.layera-danger-modal-header {
  text-align: center;
  color: var(--layera-color-danger);
  margin-bottom: var(--layera-spacing-lg);
  font-weight: var(--layera-font-weight-semibold);
  font-size: var(--layera-font-size-base);
  padding: var(--layera-spacing-sm);
  background: rgba(244, 67, 54, 0.05);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.layera-danger-warning-banner {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid var(--layera-color-danger);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-md);
  margin-bottom: var(--layera-spacing-lg);
  color: #b91c1c;
  text-align: center;
  font-weight: var(--layera-font-weight-bold);
  animation: warning-glow 3s ease-in-out infinite;
}

@keyframes danger-pulse {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.1); }
}

@keyframes warning-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.3); }
  50% { box-shadow: 0 0 0 8px rgba(244, 67, 54, 0); }
}

`;
  }

  /**
   * MODAL COMPONENTS GRID
   */
  static generateModalComponentsGridCSS() {
    return `
/* MODAL COMPONENTS GRID */
.layera-modal-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg);
  padding: var(--layera-spacing-xl);
  background: linear-gradient(135deg, #fff8f8 0%, #fef2f2 100%);
  border-radius: var(--layera-border-radius-lg);
  position: relative;
}

.layera-modal-components-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-danger) 0%, #dc2626 100%);
  border-radius: var(--layera-border-radius-lg) var(--layera-border-radius-lg) 0 0;
}

.layera-modal-grid-header {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--layera-color-danger);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-bold);
  margin-bottom: var(--layera-spacing-md);
  padding: var(--layera-spacing-md);
  background: rgba(244, 67, 54, 0.08);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.layera-modal-danger-layout {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
  background: var(--layera-color-danger-25);
  border: 1px dashed var(--layera-color-danger-200);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-xl);
  position: relative;
}

.layera-modal-danger-layout::after {
  content: "DANGER ZONE";
  position: absolute;
  top: var(--layera-spacing-xs);
  right: var(--layera-spacing-xs);
  background: var(--layera-color-danger);
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
   * MODAL ITEM SYSTEM
   */
  static generateModalItemSystemCSS() {
    return `
/* MODAL ITEM SYSTEM */
.layera-modal-item {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--layera-color-border);
  transition: all var(--layera-transition-normal);
  position: relative;
  overflow: hidden;
}

.layera-modal-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.layera-modal-item h4 {
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  margin: 0 0 var(--layera-spacing-md) 0;
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-modal-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: all var(--layera-transition-fast);
}

/* Modal Type Variants */
.layera-modal-item.layera-modal-primary {
  border-left: 4px solid var(--layera-color-primary);
}

.layera-modal-item.layera-modal-primary::before {
  background: var(--layera-color-primary);
}

.layera-modal-item.layera-modal-primary h4 {
  color: var(--layera-color-primary);
}

.layera-modal-item.layera-modal-secondary {
  border-left: 4px solid var(--layera-color-secondary);
}

.layera-modal-item.layera-modal-secondary::before {
  background: var(--layera-color-secondary);
}

.layera-modal-item.layera-modal-secondary h4 {
  color: var(--layera-color-secondary);
}

.layera-modal-item.layera-modal-success {
  border-left: 4px solid var(--layera-color-success);
}

.layera-modal-item.layera-modal-success::before {
  background: var(--layera-color-success);
}

.layera-modal-item.layera-modal-success h4 {
  color: var(--layera-color-success);
}

.layera-modal-item.layera-modal-warning {
  border-left: 4px solid var(--layera-color-warning);
}

.layera-modal-item.layera-modal-warning::before {
  background: var(--layera-color-warning);
}

.layera-modal-item.layera-modal-warning h4 {
  color: var(--layera-color-warning);
}

.layera-modal-item.layera-modal-danger {
  border-left: 4px solid var(--layera-color-danger);
  border: 2px solid var(--layera-color-danger-200);
  background: var(--layera-color-danger-25);
}

.layera-modal-item.layera-modal-danger::before {
  background: var(--layera-color-danger);
  height: 6px;
}

.layera-modal-item.layera-modal-danger h4 {
  color: var(--layera-color-danger);
}

.layera-modal-item.layera-modal-danger:hover {
  box-shadow: 0 8px 24px rgba(244, 67, 54, 0.2);
  animation: danger-glow 1s ease-in-out;
}

.layera-modal-item.layera-modal-info {
  border-left: 4px solid var(--layera-color-info);
}

.layera-modal-item.layera-modal-info::before {
  background: var(--layera-color-info);
}

.layera-modal-item.layera-modal-info h4 {
  color: var(--layera-color-info);
}

@keyframes danger-glow {
  0%, 100% { transform: translateY(-4px); }
  50% { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(244, 67, 54, 0.3); }
}

`;
  }

  /**
   * CRITICAL SAFETY PATTERNS
   */
  static generateCriticalSafetyPatternsCSS() {
    return `
/* CRITICAL SAFETY PATTERNS */
.layera-critical-action-warning {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid var(--layera-color-danger);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-md);
  margin: var(--layera-spacing-md) 0;
  color: #b91c1c;
  font-weight: var(--layera-font-weight-bold);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.layera-critical-action-warning::before {
  content: "💀";
  position: absolute;
  left: var(--layera-spacing-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2em;
  animation: danger-pulse 1.5s ease-in-out infinite;
}

.layera-critical-action-warning::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(244, 67, 54, 0.2), transparent);
  animation: critical-shine 2s ease-in-out infinite;
}

@keyframes critical-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.layera-termination-confirmation {
  background: var(--layera-color-danger-50);
  border: 2px dashed var(--layera-color-danger);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-confirmation-input {
  background: var(--layera-color-background-primary);
  border: 2px solid var(--layera-color-danger);
  color: var(--layera-color-danger);
  font-weight: var(--layera-font-weight-bold);
  text-align: center;
  text-transform: uppercase;
}

.layera-confirmation-input:focus {
  outline: none;
  border-color: var(--layera-color-danger-700);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
  background: var(--layera-color-danger-25);
}

.layera-confirmation-input::placeholder {
  color: var(--layera-color-danger-400);
  font-weight: var(--layera-font-weight-normal);
  text-transform: none;
}

.layera-admin-password-field {
  position: relative;
}

.layera-admin-password-field::after {
  content: "🔒";
  position: absolute;
  right: var(--layera-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--layera-color-danger);
  font-size: 1.1em;
  pointer-events: none;
}

.layera-permanent-action-notice {
  background: var(--layera-color-danger-100);
  border: 1px solid var(--layera-color-danger-300);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-sm);
  margin: var(--layera-spacing-sm) 0;
  color: var(--layera-color-danger-800);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-medium);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

`;
  }

  /**
   * MODAL ACTION BUTTONS
   */
  static generateModalActionButtonsCSS() {
    return `
/* MODAL ACTION BUTTONS */
.layera-modal-actions {
  display: flex;
  gap: var(--layera-spacing-sm);
  margin-top: var(--layera-spacing-lg);
  justify-content: flex-end;
}

.layera-modal-btn {
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
  min-width: 100px;
  justify-content: center;
}

.layera-modal-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.layera-modal-btn:active {
  transform: translateY(0);
}

.layera-modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Primary Modal Button */
.layera-modal-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
}

.layera-modal-primary-btn:hover {
  background: var(--layera-color-primary-700);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

/* Secondary Modal Button */
.layera-modal-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-modal-secondary-btn:hover {
  background: var(--layera-color-secondary-700);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.3);
}

/* Success Modal Button */
.layera-modal-success-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-white);
}

.layera-modal-success-btn:hover {
  background: var(--layera-color-success-700);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Warning Modal Button */
.layera-modal-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
}

.layera-modal-warning-btn:hover {
  background: var(--layera-color-warning-700);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

/* Danger Modal Button */
.layera-modal-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  position: relative;
  border: 2px solid var(--layera-color-danger-300);
  text-transform: uppercase;
  font-weight: var(--layera-font-weight-bold);
  letter-spacing: 0.5px;
}

.layera-modal-danger-btn:hover {
  background: var(--layera-color-danger-700);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
  animation: danger-button-shake 0.5s ease-in-out;
}

.layera-modal-danger-btn::before {
  content: "💀";
  margin-right: var(--layera-spacing-xs);
}

@keyframes danger-button-shake {
  0%, 100% { transform: translateY(-1px); }
  25% { transform: translateY(-1px) translateX(-2px); }
  75% { transform: translateY(-1px) translateX(2px); }
}

/* Info Modal Button */
.layera-modal-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
}

.layera-modal-info-btn:hover {
  background: var(--layera-color-info-700);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

/* Cancel/Close Buttons */
.layera-modal-cancel-btn,
.layera-modal-close-btn {
  background: var(--layera-color-border-secondary);
  color: var(--layera-color-text-secondary);
  border: 1px solid var(--layera-color-border);
}

.layera-modal-cancel-btn:hover,
.layera-modal-close-btn:hover {
  background: var(--layera-color-border);
  color: var(--layera-color-text-primary);
}

`;
  }

  /**
   * DANGER CONFIRMATION SYSTEM
   */
  static generateDangerConfirmationSystemCSS() {
    return `
/* DANGER CONFIRMATION SYSTEM */
.layera-danger-confirmation-stage {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 2px solid var(--layera-color-danger-300);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
  position: relative;
}

.layera-danger-confirmation-stage::before {
  content: "⚠️ DANGER ZONE ⚠️";
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-sm);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
}

.layera-confirmation-step {
  margin: var(--layera-spacing-md) 0;
  padding: var(--layera-spacing-md);
  background: var(--layera-color-background-primary);
  border: 1px solid var(--layera-color-danger-200);
  border-radius: var(--layera-border-radius-sm);
  position: relative;
}

.layera-confirmation-step-number {
  position: absolute;
  top: -12px;
  left: var(--layera-spacing-sm);
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
}

.layera-confirmation-checklist {
  list-style: none;
  padding: 0;
  margin: var(--layera-spacing-md) 0;
}

.layera-confirmation-checklist-item {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  padding: var(--layera-spacing-sm);
  margin: var(--layera-spacing-xs) 0;
  background: var(--layera-color-danger-25);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-danger-200);
}

.layera-confirmation-checklist-item::before {
  content: "☐";
  color: var(--layera-color-danger);
  font-size: 1.2em;
  font-weight: var(--layera-font-weight-bold);
}

.layera-confirmation-checklist-item.checked::before {
  content: "☑️";
}

.layera-confirmation-progress {
  width: 100%;
  height: 6px;
  background: var(--layera-color-border);
  border-radius: var(--layera-border-radius-full);
  margin: var(--layera-spacing-md) 0;
  overflow: hidden;
}

.layera-confirmation-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--layera-color-danger) 0%, #dc2626 100%);
  border-radius: var(--layera-border-radius-full);
  transition: width var(--layera-transition-slow);
  width: 0%;
}

.layera-final-confirmation-barrier {
  background: var(--layera-color-danger-100);
  border: 3px solid var(--layera-color-danger);
  border-style: dashed;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-xl);
  margin: var(--layera-spacing-lg) 0;
  text-align: center;
  position: relative;
  animation: danger-barrier-pulse 2s ease-in-out infinite;
}

@keyframes danger-barrier-pulse {
  0%, 100% { border-color: var(--layera-color-danger); }
  50% { border-color: #dc2626; }
}

`;
  }

  /**
   * MODAL INPUT VARIATIONS
   */
  static generateModalInputVariationsCSS() {
    return `
/* MODAL INPUT VARIATIONS */
.layera-modal-input {
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

.layera-modal-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.layera-modal-input::placeholder {
  color: var(--layera-color-text-tertiary);
  opacity: 0.7;
}

/* Context-specific input styling */
.layera-modal-primary .layera-modal-input {
  border-color: var(--layera-color-primary-200);
}

.layera-modal-primary .layera-modal-input:focus {
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.layera-modal-secondary .layera-modal-input {
  border-color: var(--layera-color-secondary-200);
}

.layera-modal-secondary .layera-modal-input:focus {
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
}

.layera-modal-success .layera-modal-input {
  border-color: var(--layera-color-success-200);
}

.layera-modal-success .layera-modal-input:focus {
  border-color: var(--layera-color-success);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.layera-modal-warning .layera-modal-input {
  border-color: var(--layera-color-warning-200);
}

.layera-modal-warning .layera-modal-input:focus {
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.layera-modal-danger .layera-modal-input {
  border-color: var(--layera-color-danger-300);
  background: var(--layera-color-danger-25);
}

.layera-modal-danger .layera-modal-input:focus {
  border-color: var(--layera-color-danger);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
  background: var(--layera-color-danger-50);
}

.layera-modal-info .layera-modal-input {
  border-color: var(--layera-color-info-200);
}

.layera-modal-info .layera-modal-input:focus {
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

/* Textarea Styling */
.layera-modal-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: var(--layera-font-family-sans);
}

/* Select Styling */
.layera-modal-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--layera-spacing-sm) center;
  background-size: 20px;
  padding-right: var(--layera-spacing-xl);
  cursor: pointer;
}

/* Input Type Specific */
.layera-modal-input[type="email"]::before {
  content: "📧";
}

.layera-modal-input[type="password"] {
  font-family: text-security-disc;
}

.layera-modal-input[type="url"] {
  padding-left: var(--layera-spacing-lg);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
}

.layera-modal-input[type="datetime-local"] {
  cursor: pointer;
  color-scheme: light;
}

`;
  }

  /**
   * MODAL ANIMATIONS
   */
  static generateModalAnimationsCSS() {
    return `
/* MODAL ANIMATIONS */
@keyframes modal-slide-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modal-fade-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes modal-danger-shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes modal-critical-glow {
  0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.5); }
  50% { box-shadow: 0 0 0 15px rgba(244, 67, 54, 0); }
  100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
}

.layera-modal-item {
  animation: modal-slide-in 0.6s ease-out;
  animation-delay: calc(var(--modal-index, 0) * 0.1s);
  animation-fill-mode: both;
}

.layera-modal-danger-btn:active {
  animation: modal-danger-shake 0.5s ease-in-out;
}

.layera-modal-critical-action {
  animation: modal-critical-glow 2s ease-in-out infinite;
}

.layera-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1000;
}

.layera-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.layera-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1001;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

.layera-modal.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

`;
  }

  /**
   * MODAL RESPONSIVE DESIGN
   */
  static generateModalResponsiveDesignCSS() {
    return `
/* MODAL RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .layera-modal-components-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md);
    padding: var(--layera-spacing-lg);
  }

  .layera-modal-item {
    padding: var(--layera-spacing-md);
  }

  .layera-modal-actions {
    flex-direction: column;
    gap: var(--layera-spacing-sm);
  }

  .layera-modal-btn {
    width: 100%;
  }

  .layera-modal {
    width: 95vw;
    max-width: none;
    margin: var(--layera-spacing-sm);
    transform: translate(-50%, -50%) scale(0.9);
  }

  .layera-modal.active {
    transform: translate(-50%, -50%) scale(1);
  }

  .layera-danger-modal-header {
    font-size: var(--layera-font-size-sm);
  }
}

@media (max-width: 480px) {
  .layera-modal-components-grid {
    padding: var(--layera-spacing-md);
    gap: var(--layera-spacing-sm);
  }

  .layera-modal-item {
    padding: var(--layera-spacing-sm);
  }

  .layera-modal-item h4 {
    font-size: var(--layera-font-size-base);
  }

  .layera-modal-input,
  .layera-modal-textarea,
  .layera-modal-select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: var(--layera-spacing-sm);
  }

  .layera-critical-action-warning {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-xs);
  }

  .layera-modal-danger-layout {
    padding: var(--layera-spacing-md);
  }
}

@media (max-width: 320px) {
  .layera-modal-components-grid {
    padding: var(--layera-spacing-sm);
  }

  .layera-modal-item {
    padding: var(--layera-spacing-xs);
  }

  .layera-modal-btn {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-xs);
  }
}

`;
  }

  /**
   * MODAL ACCESSIBILITY
   */
  static generateModalAccessibilityCSS() {
    return `
/* MODAL ACCESSIBILITY */
.layera-modal-item:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-modal-input:focus,
.layera-modal-textarea:focus,
.layera-modal-select:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.layera-modal-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.layera-modal-danger-btn:focus {
  outline-color: var(--layera-color-danger);
}

.layera-modal-sr-only {
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

.layera-modal[role="dialog"] {
  outline: none;
}

.layera-modal-close-btn[aria-label] {
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--layera-color-border-secondary);
  border-radius: 50%;
  position: absolute;
  top: var(--layera-spacing-sm);
  right: var(--layera-spacing-sm);
}

@media (prefers-reduced-motion: reduce) {
  .layera-modal-item,
  .layera-modal-btn,
  .layera-modal,
  .layera-modal-overlay {
    animation: none;
    transition: none;
  }

  .layera-modal-item:hover,
  .layera-modal-btn:hover {
    transform: none;
  }
}

@media (prefers-high-contrast: active) {
  .layera-modal-item {
    border-width: 2px;
  }

  .layera-modal-input,
  .layera-modal-textarea,
  .layera-modal-select {
    border-width: 2px;
  }

  .layera-modal-btn {
    border: 2px solid currentColor;
  }
}

.layera-modal-title {
  font-size: var(--layera-font-size-xl);
  font-weight: var(--layera-font-weight-bold);
  margin: 0 0 var(--layera-spacing-lg) 0;
  color: var(--layera-color-text-primary);
}

.layera-modal-description {
  color: var(--layera-color-text-secondary);
  margin-bottom: var(--layera-spacing-lg);
  line-height: var(--layera-line-height-relaxed);
}

`;
  }

  /**
   * MODAL INTERACTIONS
   */
  static generateModalInteractionsCSS() {
    return `
/* MODAL INTERACTIONS */
.layera-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
}

.layera-modal-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs);
}

.layera-modal-label {
  font-weight: var(--layera-font-weight-medium);
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-sm);
}

.layera-modal-required {
  color: var(--layera-color-danger);
}

.layera-modal-help-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-text-secondary);
  margin-top: var(--layera-spacing-xs);
}

.layera-modal-error-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-danger);
  margin-top: var(--layera-spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
}

.layera-modal-error-text::before {
  content: "⚠️";
  font-size: 0.8em;
}

.layera-modal-loading {
  position: relative;
  opacity: 0.7;
  pointer-events: none;
}

.layera-modal-loading::after {
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
  animation: modal-loading-spin 1s linear infinite;
}

@keyframes modal-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.layera-modal-backdrop-click {
  cursor: pointer;
}

.layera-modal-no-scroll {
  overflow: hidden;
}

.layera-modal-draggable {
  cursor: move;
}

.layera-modal-resizable {
  resize: both;
  overflow: auto;
  min-width: 300px;
  min-height: 200px;
}

`;
  }
}