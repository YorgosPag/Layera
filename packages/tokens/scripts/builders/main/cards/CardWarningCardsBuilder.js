/**
 * CardWarningCardsBuilder - Enterprise Warning Cards CSS Builder
 *
 * HTML-aligned enterprise CSS builder για warning-themed card collections
 * Παράγει CSS για diverse input types με warning layout διάταξη
 */

export class CardWarningCardsBuilder {

  /**
   * Generates complete warning cards CSS
   */
  static generateAllCardWarningCardsCSS() {
    let css = '/* === CARD WARNING CARDS === */\n\n';

    css += this.generateWarningContextCSS();
    css += this.generateWarningLayoutCSS();
    css += this.generateDiverseInputTypesCSS();
    css += this.generateWarningStatesCSS();
    css += this.generateRiskConfirmationCSS();
    css += this.generateWarningAnimationsCSS();
    css += this.generateWarningIconographyCSS();
    css += this.generateWarningButtonsCSS();
    css += this.generateWarningResponsiveCSS();
    css += this.generateWarningAccessibilityCSS();
    css += this.generateWarningInteractionsCSS();

    return css;
  }

  /**
   * WARNING CONTEXT STYLES
   */
  static generateWarningContextCSS() {
    return `
/* WARNING CONTEXT STYLES */
.layera-warning-context {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid #ffb74d;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
}

.layera-warning-theme {
  --warning-primary: #ff9800;
  --warning-light: #ffb74d;
  --warning-dark: #f57c00;
  --warning-bg: #fff8e1;
  --warning-border: #ffecb3;
}

.layera-warning-header {
  text-align: center;
  color: var(--layera-color-warning);
  margin-bottom: var(--layera-spacing-lg);
  font-weight: var(--layera-font-weight-semibold);
}

.layera-warning-indicator {
  display: inline-flex;
  align-items: center;
  background: var(--layera-color-warning-100);
  color: var(--layera-color-warning-800);
  padding: var(--layera-spacing-sm) var(--layera-spacing-md);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-warning-300);
  font-size: var(--layera-font-size-sm);
  margin-bottom: var(--layera-spacing-md);
}

`;
  }

  /**
   * WARNING LAYOUT SYSTEM
   */
  static generateWarningLayoutCSS() {
    return `
/* WARNING LAYOUT SYSTEM */
.layera-warning-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--layera-spacing-lg);
  padding: var(--layera-spacing-xl);
  background: linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%);
}

.layera-warning-layout-alternative {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
  background: var(--layera-color-warning-25);
  border: 1px dashed var(--layera-color-warning-200);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-lg);
}

.layera-warning-card-container {
  position: relative;
  transition: all var(--layera-transition-normal);
}

.layera-warning-card-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.2);
}

.layera-warning-card-container::before {
  content: "⚠️";
  position: absolute;
  top: -10px;
  right: -10px;
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

`;
  }

  /**
   * DIVERSE INPUT TYPES SYSTEM
   */
  static generateDiverseInputTypesCSS() {
    return `
/* DIVERSE INPUT TYPES SYSTEM */
.layera-warning-input-text,
.layera-warning-input-email,
.layera-warning-input-search,
.layera-warning-input-number,
.layera-warning-input-date,
.layera-warning-input-password,
.layera-warning-input-url,
.layera-warning-input-tel {
  width: 100%;
  padding: var(--layera-spacing-md);
  border: 2px solid var(--layera-color-warning-200);
  border-radius: var(--layera-border-radius-sm);
  background: var(--layera-color-background-primary);
  color: var(--layera-color-text-primary);
  font-family: var(--layera-font-family-sans);
  transition: all var(--layera-transition-fast);
  margin: var(--layera-spacing-sm) 0;
}

.layera-warning-input-text:focus,
.layera-warning-input-email:focus,
.layera-warning-input-search:focus,
.layera-warning-input-number:focus,
.layera-warning-input-date:focus,
.layera-warning-input-password:focus,
.layera-warning-input-url:focus,
.layera-warning-input-tel:focus {
  outline: none;
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  background: var(--layera-color-warning-25);
}

.layera-warning-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: var(--layera-font-family-sans);
  border: 2px solid var(--layera-color-warning-200);
}

.layera-warning-textarea:focus {
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.layera-warning-select {
  width: 100%;
  padding: var(--layera-spacing-md);
  border: 2px solid var(--layera-color-warning-200);
  border-radius: var(--layera-border-radius-sm);
  background: var(--layera-color-background-primary);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff9800'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--layera-spacing-sm) center;
  background-size: 20px;
  padding-right: var(--layera-spacing-xl);
}

.layera-warning-select:focus {
  outline: none;
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

.layera-warning-checkbox {
  width: auto;
  margin-right: var(--layera-spacing-sm);
  accent-color: var(--layera-color-warning);
  transform: scale(1.2);
}

`;
  }

  /**
   * WARNING STATES SYSTEM
   */
  static generateWarningStatesCSS() {
    return `
/* WARNING STATES SYSTEM */
.layera-warning-card-primary {
  background: var(--layera-color-primary-50);
  border-left: 4px solid var(--layera-color-primary);
  color: var(--layera-color-primary-900);
  position: relative;
}

.layera-warning-card-secondary {
  background: var(--layera-color-secondary-50);
  border-left: 4px solid var(--layera-color-secondary);
  color: var(--layera-color-secondary-900);
}

.layera-warning-card-success {
  background: var(--layera-color-success-50);
  border-left: 4px solid var(--layera-color-success);
  color: var(--layera-color-success-900);
}

.layera-warning-card-warning {
  background: var(--layera-color-warning-50);
  border-left: 4px solid var(--layera-color-warning);
  color: var(--layera-color-warning-900);
  position: relative;
}

.layera-warning-card-warning::after {
  content: "⚠️";
  position: absolute;
  top: var(--layera-spacing-sm);
  right: var(--layera-spacing-sm);
  font-size: 1.2em;
  opacity: 0.8;
  animation: warning-pulse 2s ease-in-out infinite;
}

.layera-warning-card-danger {
  background: var(--layera-color-danger-50);
  border-left: 4px solid var(--layera-color-danger);
  color: var(--layera-color-danger-900);
  border: 2px solid var(--layera-color-danger-200);
}

.layera-warning-card-info {
  background: var(--layera-color-info-50);
  border-left: 4px solid var(--layera-color-info);
  color: var(--layera-color-info-900);
}

@keyframes warning-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

`;
  }

  /**
   * RISK CONFIRMATION SYSTEM
   */
  static generateRiskConfirmationCSS() {
    return `
/* RISK CONFIRMATION SYSTEM */
.layera-risk-confirmation {
  background: var(--layera-color-danger-50);
  border: 2px solid var(--layera-color-danger-200);
  border-radius: var(--layera-border-radius-sm);
  padding: var(--layera-spacing-md);
  margin: var(--layera-spacing-sm) 0;
}

.layera-risk-checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: var(--layera-spacing-sm);
  margin: var(--layera-spacing-md) 0;
  padding: var(--layera-spacing-sm);
  background: var(--layera-color-danger-25);
  border-radius: var(--layera-border-radius-sm);
  border: 1px solid var(--layera-color-danger-200);
}

.layera-risk-checkbox {
  margin-top: 2px;
  accent-color: var(--layera-color-danger);
}

.layera-risk-label {
  font-size: var(--layera-font-size-sm);
  color: var(--layera-color-danger-800);
  font-weight: var(--layera-font-weight-medium);
  user-select: none;
  cursor: pointer;
}

.layera-password-confirmation {
  position: relative;
}

.layera-password-confirmation::after {
  content: "🔒";
  position: absolute;
  right: var(--layera-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
}

.layera-confirmation-required {
  opacity: 0.6;
  pointer-events: none;
  transition: all var(--layera-transition-fast);
}

.layera-confirmation-completed {
  opacity: 1;
  pointer-events: all;
}

`;
  }

  /**
   * WARNING ANIMATIONS
   */
  static generateWarningAnimationsCSS() {
    return `
/* WARNING ANIMATIONS */
@keyframes layera-warning-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes layera-warning-glow {
  0% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(255, 152, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0); }
}

@keyframes layera-warning-slide-in {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.layera-warning-shake {
  animation: layera-warning-shake 0.5s ease-in-out;
}

.layera-warning-glow {
  animation: layera-warning-glow 2s ease-in-out infinite;
}

.layera-warning-animated {
  animation: layera-warning-slide-in 0.6s ease-out;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
  animation-fill-mode: both;
}

.layera-warning-attention {
  position: relative;
}

.layera-warning-attention::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--layera-color-warning);
  border-radius: var(--layera-border-radius-md);
  animation: layera-warning-glow 2s ease-in-out infinite;
}

`;
  }

  /**
   * WARNING ICONOGRAPHY
   */
  static generateWarningIconographyCSS() {
    return `
/* WARNING ICONOGRAPHY */
.layera-warning-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--layera-spacing-sm);
  color: var(--layera-color-warning);
}

.layera-warning-emoji {
  font-size: 1.2em;
  margin-right: var(--layera-spacing-sm);
}

.layera-warning-input-icon::before {
  position: absolute;
  right: var(--layera-spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
  font-size: 1em;
}

.layera-warning-input-text::before {
  content: "📝";
}

.layera-warning-input-email::before {
  content: "📧";
}

.layera-warning-input-search::before {
  content: "🔍";
}

.layera-warning-input-number::before {
  content: "💰";
}

.layera-warning-input-date::before {
  content: "📅";
}

.layera-warning-input-password::before {
  content: "🔒";
}

.layera-warning-input-url::before {
  content: "🌐";
}

.layera-warning-input-tel::before {
  content: "📞";
}

.layera-warning-textarea::before {
  content: "⚠️";
}

`;
  }

  /**
   * WARNING BUTTONS
   */
  static generateWarningButtonsCSS() {
    return `
/* WARNING BUTTONS */
.layera-warning-button {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
  border: none;
  padding: var(--layera-spacing-md) var(--layera-spacing-lg);
  border-radius: var(--layera-border-radius-sm);
  font-family: var(--layera-font-family-sans);
  font-weight: var(--layera-font-weight-semibold);
  cursor: pointer;
  transition: all var(--layera-transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.layera-warning-button:hover {
  background: var(--layera-color-warning-700);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.layera-warning-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
}

.layera-warning-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
}

.layera-warning-primary-btn:hover {
  background: var(--layera-color-primary-700);
}

.layera-warning-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-warning-secondary-btn:hover {
  background: var(--layera-color-secondary-700);
}

.layera-warning-success-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-white);
}

.layera-warning-success-btn:hover {
  background: var(--layera-color-success-700);
}

.layera-warning-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  position: relative;
  border: 2px solid var(--layera-color-danger-300);
}

.layera-warning-danger-btn:hover {
  background: var(--layera-color-danger-700);
  animation: layera-warning-shake 0.3s ease-in-out;
}

.layera-warning-danger-btn::before {
  content: "⚠️";
  margin-right: var(--layera-spacing-xs);
}

.layera-warning-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
}

.layera-warning-info-btn:hover {
  background: var(--layera-color-info-700);
}

`;
  }

  /**
   * WARNING RESPONSIVE DESIGN
   */
  static generateWarningResponsiveCSS() {
    return `
/* WARNING RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .layera-warning-layout {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md);
    padding: var(--layera-spacing-md);
  }

  .layera-warning-card-container {
    margin-bottom: var(--layera-spacing-sm);
  }

  .layera-warning-button {
    width: 100%;
    justify-content: center;
  }

  .layera-warning-header {
    font-size: var(--layera-font-size-base);
  }
}

@media (max-width: 480px) {
  .layera-warning-layout {
    padding: var(--layera-spacing-sm);
  }

  .layera-warning-input-text,
  .layera-warning-input-email,
  .layera-warning-input-search,
  .layera-warning-input-number,
  .layera-warning-input-date,
  .layera-warning-input-password,
  .layera-warning-input-url,
  .layera-warning-input-tel,
  .layera-warning-textarea,
  .layera-warning-select {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-sm);
  }
}

`;
  }

  /**
   * WARNING ACCESSIBILITY
   */
  static generateWarningAccessibilityCSS() {
    return `
/* WARNING ACCESSIBILITY */
.layera-warning-card-container:focus-within {
  outline: 3px solid var(--layera-color-warning);
  outline-offset: 2px;
}

.layera-warning-input-text:focus,
.layera-warning-input-email:focus,
.layera-warning-input-search:focus,
.layera-warning-input-number:focus,
.layera-warning-input-date:focus,
.layera-warning-input-password:focus,
.layera-warning-input-url:focus,
.layera-warning-input-tel:focus,
.layera-warning-textarea:focus,
.layera-warning-select:focus {
  outline: 2px solid var(--layera-color-warning);
  outline-offset: 2px;
}

.layera-warning-button:focus {
  outline: 2px solid var(--layera-color-warning-300);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .layera-warning-shake,
  .layera-warning-glow,
  .layera-warning-animated {
    animation: none;
  }

  .layera-warning-card-container:hover {
    transform: none;
  }

  .layera-warning-card-warning::after {
    animation: none;
  }
}

@media (prefers-high-contrast: active) {
  .layera-warning-card-container {
    border: 2px solid;
  }

  .layera-warning-button {
    border: 2px solid var(--layera-color-warning-800);
  }
}

.layera-warning-sr-only {
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
   * WARNING INTERACTIONS
   */
  static generateWarningInteractionsCSS() {
    return `
/* WARNING INTERACTIONS */
.layera-warning-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
  margin-bottom: var(--layera-spacing-md);
}

.layera-warning-form-row {
  display: flex;
  gap: var(--layera-spacing-sm);
  align-items: center;
}

.layera-warning-label {
  display: flex;
  align-items: center;
  font-weight: var(--layera-font-weight-medium);
  color: var(--layera-color-text-secondary);
  margin-bottom: var(--layera-spacing-xs);
}

.layera-warning-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--layera-spacing-sm);
  margin-top: var(--layera-spacing-md);
  padding-top: var(--layera-spacing-md);
  border-top: 1px solid var(--layera-color-border);
}

.layera-warning-card-title {
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-bold);
  color: var(--layera-color-text-primary);
  margin: 0 0 var(--layera-spacing-md) 0;
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-warning-validation-message {
  font-size: var(--layera-font-size-xs);
  color: var(--layera-color-warning-700);
  margin-top: var(--layera-spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-xs);
}

.layera-warning-validation-message::before {
  content: "⚠️";
  font-size: 0.8em;
}

`;
  }
}