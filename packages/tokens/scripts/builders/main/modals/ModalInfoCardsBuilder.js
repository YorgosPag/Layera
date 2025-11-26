/**
 * ModalInfoCardsBuilder - Enterprise Modal Info Cards CSS Builder
 *
 * HTML-aligned enterprise CSS builder για info-themed modal components
 * Παράγει CSS για informational modal workflows με communication patterns
 */

export class ModalInfoCardsBuilder {

  /**
   * Generates complete modal info cards CSS
   */
  static generateAllModalInfoCardsCSS() {
    let css = '/* === MODAL INFO CARDS === */\n\n';

    css += this.generateInfoModalContextCSS();
    css += this.generateInfoWorkflowsSystemCSS();
    css += this.generateCommunicationPatternsCSS();
    css += this.generateInformationalComponentsCSS();
    css += this.generateDataManagementModalCSS();
    css += this.generateInfoModalAnimationsCSS();
    css += this.generateInfoModalButtonsCSS();
    css += this.generateInfoInputVariationsCSS();
    css += this.generateInfoModalResponsiveCSS();
    css += this.generateInfoModalAccessibilityCSS();
    css += this.generateInfoModalInteractionsCSS();

    return css;
  }

  /**
   * INFO MODAL CONTEXT
   */
  static generateInfoModalContextCSS() {
    return `
/* INFO MODAL CONTEXT */
.layera-info-modal-context {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid #90caf9;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-xl);
  position: relative;
  overflow: hidden;
}

.layera-info-modal-context::before {
  content: "ℹ️";
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-info);
  color: var(--layera-color-white);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  animation: info-glow 3s ease-in-out infinite;
}

.layera-info-modal-header {
  text-align: center;
  color: var(--layera-color-info);
  margin-bottom: var(--layera-spacing-lg);
  font-weight: var(--layera-font-weight-semibold);
  font-size: var(--layera-font-size-base);
  padding: var(--layera-spacing-sm);
  background: rgba(33, 150, 243, 0.05);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(33, 150, 243, 0.2);
}

.layera-info-banner {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 2px solid var(--layera-color-info);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-md);
  margin-bottom: var(--layera-spacing-lg);
  color: #0277bd;
  text-align: center;
  font-weight: var(--layera-font-weight-medium);
  position: relative;
  overflow: hidden;
}

.layera-info-banner::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.2), transparent);
  animation: info-shine 3s ease-in-out infinite;
}

@keyframes info-glow {
  0%, 100% { transform: translateX(-50%) scale(1); box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3); }
  50% { transform: translateX(-50%) scale(1.05); box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4); }
}

@keyframes info-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.layera-info-notification {
  background: var(--layera-color-info-100);
  border: 1px solid var(--layera-color-info-300);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-sm);
  margin: var(--layera-spacing-sm) 0;
  color: var(--layera-color-info-800);
  font-size: var(--layera-font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-info-notification::before {
  content: "💡";
  font-size: 1.1em;
}

`;
  }

  /**
   * INFO WORKFLOWS SYSTEM
   */
  static generateInfoWorkflowsSystemCSS() {
    return `
/* INFO WORKFLOWS SYSTEM */
.layera-info-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg);
  padding: var(--layera-spacing-xl);
  background: linear-gradient(135deg, #f8fdff 0%, #e3f2fd 100%);
  border-radius: var(--layera-border-radius-lg);
  position: relative;
}

.layera-info-modal-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-info) 0%, #03a9f4 100%);
  border-radius: var(--layera-border-radius-lg) var(--layera-border-radius-lg) 0 0;
}

.layera-info-workflow-header {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--layera-color-info);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-bold);
  margin-bottom: var(--layera-spacing-md);
  padding: var(--layera-spacing-md);
  background: rgba(33, 150, 243, 0.08);
  border-radius: var(--layera-border-radius-md);
  border: 1px solid rgba(33, 150, 243, 0.2);
  position: relative;
}

.layera-info-workflow-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(33, 150, 243, 0.05);
  padding: var(--layera-spacing-md);
  border-radius: var(--layera-border-radius-md);
  margin: var(--layera-spacing-md) 0;
  grid-column: 1 / -1;
}

.layera-info-stat-item {
  text-align: center;
  color: var(--layera-color-info);
}

.layera-info-stat-number {
  font-size: var(--layera-font-size-xl);
  font-weight: var(--layera-font-weight-bold);
  display: block;
  margin-bottom: var(--layera-spacing-xs);
}

.layera-info-stat-label {
  font-size: var(--layera-font-size-xs);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layera-info-workflow-type {
  background: var(--layera-color-info-50);
  border: 1px solid var(--layera-color-info-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
  position: relative;
}

.layera-info-workflow-type::before {
  content: attr(data-workflow-type);
  position: absolute;
  top: -8px;
  left: var(--layera-spacing-md);
  background: var(--layera-color-info);
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
   * COMMUNICATION PATTERNS
   */
  static generateCommunicationPatternsCSS() {
    return `
/* COMMUNICATION PATTERNS */
.layera-communication-modal {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-left: 4px solid var(--layera-color-info);
  position: relative;
  overflow: hidden;
}

.layera-communication-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-info);
  transition: all var(--layera-transition-fast);
}

.layera-communication-modal:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(33, 150, 243, 0.2);
}

.layera-communication-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-spacing-md);
}

.layera-communication-title {
  color: var(--layera-color-info);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  margin: 0;
}

.layera-communication-icon {
  width: 24px;
  height: 24px;
  background: var(--layera-color-info);
  color: var(--layera-color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--layera-font-size-sm);
}

.layera-communication-meta {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-text-tertiary);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-communication-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
  margin-bottom: var(--layera-spacing-lg);
}

.layera-communication-field {
  position: relative;
}

.layera-communication-field-icon {
  position: absolute;
  left: var(--layera-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  color: var(--layera-color-info);
  font-size: 1em;
  pointer-events: none;
  z-index: 5;
}

.layera-communication-input-with-icon {
  padding-left: var(--layera-spacing-xl);
}

.layera-documentation-link {
  background: var(--layera-color-info-100);
  border: 1px solid var(--layera-color-info-200);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-sm) var(--layera-spacing-md);
  margin: var(--layera-spacing-sm) 0;
  color: var(--layera-color-info-800);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  font-size: var(--layera-font-size-sm);
  transition: all var(--layera-transition-fast);
}

.layera-documentation-link:hover {
  background: var(--layera-color-info-200);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
}

.layera-documentation-link::before {
  content: "📚";
  font-size: 1.1em;
}

`;
  }

  /**
   * INFORMATIONAL COMPONENTS
   */
  static generateInformationalComponentsCSS() {
    return `
/* INFORMATIONAL COMPONENTS */
.layera-info-modal-item {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--layera-color-border);
  transition: all var(--layera-transition-normal);
  position: relative;
  overflow: hidden;
}

.layera-info-modal-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.layera-info-modal-item h4 {
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  margin: 0 0 var(--layera-spacing-md) 0;
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

/* Modal Type Variants for Info Context */
.layera-info-modal-item.layera-modal-primary {
  border-left: 4px solid var(--layera-color-primary);
  background: linear-gradient(135deg, var(--layera-color-primary-25), var(--layera-color-background-primary));
}

.layera-info-modal-item.layera-modal-primary h4 {
  color: var(--layera-color-primary);
}

.layera-info-modal-item.layera-modal-secondary {
  border-left: 4px solid var(--layera-color-secondary);
  background: linear-gradient(135deg, var(--layera-color-secondary-25), var(--layera-color-background-primary));
}

.layera-info-modal-item.layera-modal-secondary h4 {
  color: var(--layera-color-secondary);
}

.layera-info-modal-item.layera-modal-success {
  border-left: 4px solid var(--layera-color-success);
  background: linear-gradient(135deg, var(--layera-color-success-25), var(--layera-color-background-primary));
}

.layera-info-modal-item.layera-modal-success h4 {
  color: var(--layera-color-success);
}

.layera-info-modal-item.layera-modal-warning {
  border-left: 4px solid var(--layera-color-warning);
  background: linear-gradient(135deg, var(--layera-color-warning-25), var(--layera-color-background-primary));
}

.layera-info-modal-item.layera-modal-warning h4 {
  color: var(--layera-color-warning);
}

.layera-info-modal-item.layera-modal-danger {
  border-left: 4px solid var(--layera-color-danger);
  background: linear-gradient(135deg, var(--layera-color-danger-25), var(--layera-color-background-primary));
}

.layera-info-modal-item.layera-modal-danger h4 {
  color: var(--layera-color-danger);
}

.layera-info-modal-item.layera-modal-info {
  border-left: 4px solid var(--layera-color-info);
  background: linear-gradient(135deg, var(--layera-color-info-25), var(--layera-color-background-primary));
  border: 2px solid var(--layera-color-info-200);
}

.layera-info-modal-item.layera-modal-info h4 {
  color: var(--layera-color-info);
}

.layera-info-modal-item.layera-modal-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--layera-color-info);
}

.layera-info-modal-item.layera-modal-info:hover {
  box-shadow: 0 8px 24px rgba(33, 150, 243, 0.2);
  animation: info-highlight 1s ease-in-out;
}

@keyframes info-highlight {
  0%, 100% { transform: translateY(-4px); }
  50% { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(33, 150, 243, 0.3); }
}

.layera-info-content {
  margin-bottom: var(--layera-spacing-md);
  line-height: var(--layera-line-height-relaxed);
}

.layera-info-tags {
  display: flex;
  gap: var(--layera-spacing-xs);
  margin: var(--layera-spacing-sm) 0;
  flex-wrap: wrap;
}

.layera-info-tag {
  background: var(--layera-color-info-100);
  color: var(--layera-color-info-800);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-medium);
  border: 1px solid var(--layera-color-info-200);
}

`;
  }

  /**
   * DATA MANAGEMENT MODAL
   */
  static generateDataManagementModalCSS() {
    return `
/* DATA MANAGEMENT MODAL */
.layera-data-management-section {
  background: var(--layera-color-info-50);
  border: 1px solid var(--layera-color-info-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-privacy-controls {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
  padding: var(--layera-spacing-md);
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-border);
}

.layera-privacy-level-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layera-privacy-level-private {
  background: var(--layera-color-danger-100);
  color: var(--layera-color-danger-800);
  border: 1px solid var(--layera-color-danger-300);
}

.layera-privacy-level-private::before {
  content: "🔴";
  font-size: 0.8em;
}

.layera-privacy-level-internal {
  background: var(--layera-color-warning-100);
  color: var(--layera-color-warning-800);
  border: 1px solid var(--layera-color-warning-300);
}

.layera-privacy-level-internal::before {
  content: "🟡";
  font-size: 0.8em;
}

.layera-privacy-level-public {
  background: var(--layera-color-success-100);
  color: var(--layera-color-success-800);
  border: 1px solid var(--layera-color-success-300);
}

.layera-privacy-level-public::before {
  content: "🟢";
  font-size: 0.8em;
}

.layera-contact-management {
  background: var(--layera-color-info-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-contact-field-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--layera-spacing-sm);
  margin-bottom: var(--layera-spacing-md);
}

.layera-contact-avatar {
  width: 48px;
  height: 48px;
  background: var(--layera-color-info);
  color: var(--layera-color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  margin-bottom: var(--layera-spacing-md);
  margin-right: var(--layera-spacing-md);
  float: left;
}

.layera-feedback-section {
  background: var(--layera-color-secondary-25);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
  margin: var(--layera-spacing-md) 0;
}

.layera-feedback-type-selector {
  display: flex;
  gap: var(--layera-spacing-sm);
  margin-bottom: var(--layera-spacing-md);
  flex-wrap: wrap;
}

.layera-feedback-type-option {
  padding: var(--layera-spacing-sm) var(--layera-spacing-md);
  background: var(--layera-color-background-primary);
  border: 2px solid var(--layera-color-border);
  border-radius: var(--layera-border-radius-sm);
  cursor: pointer;
  transition: all var(--layera-transition-fast);
  font-size: var(--layera-font-size-sm);
}

.layera-feedback-type-option:hover {
  border-color: var(--layera-color-secondary);
  background: var(--layera-color-secondary-50);
}

.layera-feedback-type-option.selected {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
  border-color: var(--layera-color-secondary);
}

`;
  }

  /**
   * INFO MODAL ANIMATIONS
   */
  static generateInfoModalAnimationsCSS() {
    return `
/* INFO MODAL ANIMATIONS */
@keyframes info-modal-slide-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes info-modal-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes info-pulse-glow {
  0% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(33, 150, 243, 0); }
  100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
}

@keyframes info-content-fade {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.layera-info-modal-item {
  animation: info-modal-slide-in 0.6s ease-out;
  animation-delay: calc(var(--modal-index, 0) * 0.1s);
  animation-fill-mode: both;
}

.layera-info-modal-highlight {
  animation: info-pulse-glow 2s ease-in-out infinite;
}

.layera-info-content-animated {
  animation: info-content-fade 0.5s ease-out;
}

.layera-info-modal-interactive:hover {
  animation: info-modal-bounce 0.3s ease-out;
}

.layera-info-notification-slide {
  transform: translateX(-100%);
  transition: transform var(--layera-transition-normal);
}

.layera-info-notification-slide.show {
  transform: translateX(0);
}

.layera-info-loading-state {
  position: relative;
}

.layera-info-loading-state::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--layera-color-border);
  border-top: 2px solid var(--layera-color-info);
  border-radius: 50%;
  animation: info-loading-spin 1s linear infinite;
}

@keyframes info-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
  }

  /**
   * INFO MODAL BUTTONS
   */
  static generateInfoModalButtonsCSS() {
    return `
/* INFO MODAL BUTTONS */
.layera-info-modal-actions {
  display: flex;
  gap: var(--layera-spacing-sm);
  margin-top: var(--layera-spacing-lg);
  justify-content: flex-end;
  align-items: center;
}

.layera-info-modal-btn {
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
  position: relative;
  overflow: hidden;
}

.layera-info-modal-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--layera-transition-normal);
}

.layera-info-modal-btn:hover::before {
  left: 100%;
}

.layera-info-modal-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.layera-info-modal-btn:active {
  transform: translateY(0);
}

/* Specific Info Modal Button Types */
.layera-info-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
}

.layera-info-primary-btn:hover {
  background: var(--layera-color-primary-700);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.layera-info-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-info-secondary-btn:hover {
  background: var(--layera-color-secondary-700);
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.3);
}

.layera-info-success-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-white);
}

.layera-info-success-btn:hover {
  background: var(--layera-color-success-700);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.layera-info-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
}

.layera-info-warning-btn:hover {
  background: var(--layera-color-warning-700);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.layera-info-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
}

.layera-info-danger-btn:hover {
  background: var(--layera-color-danger-700);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.layera-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
  border: 2px solid var(--layera-color-info-300);
}

.layera-info-btn:hover {
  background: var(--layera-color-info-700);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
  border-color: var(--layera-color-info-700);
}

.layera-info-btn::after {
  content: "ℹ️";
  margin-left: var(--layera-spacing-xs);
}

/* Cancel and Close Buttons */
.layera-info-cancel-btn,
.layera-info-close-btn {
  background: var(--layera-color-border-secondary);
  color: var(--layera-color-text-secondary);
  border: 1px solid var(--layera-color-border);
}

.layera-info-cancel-btn:hover,
.layera-info-close-btn:hover {
  background: var(--layera-color-border);
  color: var(--layera-color-text-primary);
}

`;
  }

  /**
   * INFO INPUT VARIATIONS
   */
  static generateInfoInputVariationsCSS() {
    return `
/* INFO INPUT VARIATIONS */
.layera-info-modal-input {
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

.layera-info-modal-input:focus {
  outline: none;
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  background: var(--layera-color-info-25);
}

.layera-info-modal-input::placeholder {
  color: var(--layera-color-text-tertiary);
  opacity: 0.7;
}

/* Context-specific info input styling */
.layera-info-modal-item.layera-modal-primary .layera-info-modal-input {
  border-color: var(--layera-color-primary-200);
}

.layera-info-modal-item.layera-modal-primary .layera-info-modal-input:focus {
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-primary-25);
}

.layera-info-modal-item.layera-modal-secondary .layera-info-modal-input {
  border-color: var(--layera-color-secondary-200);
}

.layera-info-modal-item.layera-modal-secondary .layera-info-modal-input:focus {
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
  background: var(--layera-color-secondary-25);
}

.layera-info-modal-item.layera-modal-success .layera-info-modal-input {
  border-color: var(--layera-color-success-200);
}

.layera-info-modal-item.layera-modal-success .layera-info-modal-input:focus {
  border-color: var(--layera-color-success);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background: var(--layera-color-success-25);
}

.layera-info-modal-item.layera-modal-warning .layera-info-modal-input {
  border-color: var(--layera-color-warning-200);
}

.layera-info-modal-item.layera-modal-warning .layera-info-modal-input:focus {
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  background: var(--layera-color-warning-25);
}

.layera-info-modal-item.layera-modal-danger .layera-info-modal-input {
  border-color: var(--layera-color-danger-300);
  background: var(--layera-color-danger-25);
}

.layera-info-modal-item.layera-modal-danger .layera-info-modal-input:focus {
  border-color: var(--layera-color-danger);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
  background: var(--layera-color-danger-50);
}

.layera-info-modal-item.layera-modal-info .layera-info-modal-input {
  border-color: var(--layera-color-info-300);
  background: var(--layera-color-info-25);
}

.layera-info-modal-item.layera-modal-info .layera-info-modal-input:focus {
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
  background: var(--layera-color-info-50);
}

/* Specialized Input Types */
.layera-info-modal-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: var(--layera-font-family-sans);
  line-height: var(--layera-line-height-relaxed);
}

.layera-info-modal-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--layera-spacing-sm) center;
  background-size: 20px;
  padding-right: var(--layera-spacing-xl);
  cursor: pointer;
}

.layera-info-modal-checkbox {
  width: auto;
  margin: 0;
  accent-color: var(--layera-color-info);
  transform: scale(1.2);
}

.layera-info-checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  cursor: pointer;
  font-size: var(--layera-font-size-sm);
  color: var(--layera-color-text-primary);
  margin: var(--layera-spacing-sm) 0;
}

.layera-info-checkbox-label:hover {
  color: var(--layera-color-info);
}

/* Input Type Specific Styling */
.layera-info-modal-input[type="url"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Cpath d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 012-2h2a2 2 0 012 2v2m-4 0h4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
  padding-left: var(--layera-spacing-xl);
}

.layera-info-modal-input[type="tel"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Cpath d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
  padding-left: var(--layera-spacing-xl);
}

.layera-info-modal-input[type="email"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Cpath d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/%3E%3Cpolyline points='22,6 12,13 2,6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left var(--layera-spacing-sm) center;
  background-size: 16px;
  padding-left: var(--layera-spacing-xl);
}

`;
  }

  /**
   * INFO MODAL RESPONSIVE
   */
  static generateInfoModalResponsiveCSS() {
    return `
/* INFO MODAL RESPONSIVE */
@media (max-width: 768px) {
  .layera-info-modal-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md);
    padding: var(--layera-spacing-lg);
  }

  .layera-info-modal-item {
    padding: var(--layera-spacing-md);
  }

  .layera-info-modal-actions {
    flex-direction: column;
    gap: var(--layera-spacing-sm);
  }

  .layera-info-modal-btn {
    width: 100%;
  }

  .layera-contact-field-group {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-xs);
  }

  .layera-feedback-type-selector {
    flex-direction: column;
  }

  .layera-info-workflow-stats {
    flex-direction: column;
    gap: var(--layera-spacing-sm);
  }
}

@media (max-width: 480px) {
  .layera-info-modal-grid {
    padding: var(--layera-spacing-md);
    gap: var(--layera-spacing-sm);
  }

  .layera-info-modal-item {
    padding: var(--layera-spacing-sm);
  }

  .layera-info-modal-item h4 {
    font-size: var(--layera-font-size-base);
  }

  .layera-info-modal-input,
  .layera-info-modal-textarea,
  .layera-info-modal-select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: var(--layera-spacing-sm);
  }

  .layera-info-workflow-header {
    font-size: var(--layera-font-size-base);
    padding: var(--layera-spacing-sm);
  }

  .layera-communication-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--layera-spacing-sm);
  }
}

@media (max-width: 320px) {
  .layera-info-modal-grid {
    padding: var(--layera-spacing-sm);
  }

  .layera-info-modal-item {
    padding: var(--layera-spacing-xs);
  }

  .layera-info-modal-btn {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-xs);
  }
}

`;
  }

  /**
   * INFO MODAL ACCESSIBILITY
   */
  static generateInfoModalAccessibilityCSS() {
    return `
/* INFO MODAL ACCESSIBILITY */
.layera-info-modal-item:focus {
  outline: 2px solid var(--layera-color-info);
  outline-offset: 2px;
}

.layera-info-modal-input:focus,
.layera-info-modal-textarea:focus,
.layera-info-modal-select:focus {
  outline: none;
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
}

.layera-info-modal-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.layera-info-checkbox:focus {
  outline: 2px solid var(--layera-color-info);
  outline-offset: 2px;
}

.layera-info-modal-sr-only {
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

.layera-info-modal[role="dialog"] {
  outline: none;
}

.layera-info-modal-title[id] {
  margin-bottom: var(--layera-spacing-lg);
}

.layera-info-modal-description[id] {
  margin-bottom: var(--layera-spacing-md);
  color: var(--layera-color-text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .layera-info-modal-item,
  .layera-info-modal-btn,
  .layera-info-notification-slide,
  .layera-info-loading-state::after {
    animation: none;
    transition: none;
  }

  .layera-info-modal-item:hover,
  .layera-info-modal-btn:hover {
    transform: none;
  }
}

@media (prefers-high-contrast: active) {
  .layera-info-modal-item {
    border-width: 2px;
  }

  .layera-info-modal-input,
  .layera-info-modal-textarea,
  .layera-info-modal-select {
    border-width: 2px;
  }

  .layera-info-modal-btn {
    border: 2px solid currentColor;
  }
}

.layera-info-modal-help-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-text-secondary);
  margin-top: var(--layera-spacing-xs);
}

.layera-info-modal-error-text {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-danger);
  margin-top: var(--layera-spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
}

.layera-info-modal-error-text::before {
  content: "⚠️";
  font-size: 0.8em;
}

`;
  }

  /**
   * INFO MODAL INTERACTIONS
   */
  static generateInfoModalInteractionsCSS() {
    return `
/* INFO MODAL INTERACTIONS */
.layera-info-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
}

.layera-info-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs);
}

.layera-info-label {
  font-weight: var(--layera-font-weight-medium);
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-sm);
  margin-bottom: var(--layera-spacing-xs);
}

.layera-info-required {
  color: var(--layera-color-info);
  margin-left: var(--layera-spacing-xs);
}

.layera-info-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--layera-spacing-md);
  border-top: 1px solid var(--layera-color-border);
  margin-top: var(--layera-spacing-md);
}

.layera-info-modal-progress {
  width: 100%;
  height: 4px;
  background: var(--layera-color-border);
  border-radius: var(--layera-border-radius-full);
  margin: var(--layera-spacing-md) 0;
  overflow: hidden;
}

.layera-info-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--layera-color-info) 0%, #03a9f4 100%);
  border-radius: var(--layera-border-radius-full);
  transition: width var(--layera-transition-slow);
  width: 0%;
}

.layera-info-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(33, 150, 243, 0.1);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1000;
}

.layera-info-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.layera-info-modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  box-shadow: 0 20px 60px rgba(33, 150, 243, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-normal);
  z-index: 1001;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  border: 2px solid var(--layera-color-info-200);
}

.layera-info-modal-dialog.active {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.layera-info-tooltip {
  position: relative;
  display: inline-block;
  cursor: help;
}

.layera-info-tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-info);
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

.layera-info-tooltip::after {
  content: '';
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--layera-color-info);
  opacity: 0;
  visibility: hidden;
  transition: all var(--layera-transition-fast);
}

.layera-info-tooltip:hover::before,
.layera-info-tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

`;
  }
}