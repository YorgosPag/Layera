/**
 * CardSuccessCardsBuilder - Enterprise Success Cards CSS Builder
 *
 * HTML-aligned enterprise CSS builder για success-themed card collections
 * Παράγει CSS για multi-card grids με διαφορετικά success states
 */

export class CardSuccessCardsBuilder {

  /**
   * Generates complete success cards CSS
   */
  static generateAllCardSuccessCardsCSS() {
    let css = '/* === CARD SUCCESS CARDS === */\n\n';

    css += this.generateSuccessContextCSS();
    css += this.generateMultiCardGridCSS();
    css += this.generateSuccessStatesCSS();
    css += this.generateInputVariationsCSS();
    css += this.generateSuccessButtonsCSS();
    css += this.generateSuccessAnimationsCSS();
    css += this.generateCardStatusSystemCSS();
    css += this.generateSuccessIconographyCSS();
    css += this.generateSuccessResponsiveCSS();
    css += this.generateSuccessAccessibilityCSS();
    css += this.generateSuccessInteractionsCSS();

    return css;
  }

  /**
   * SUCCESS CONTEXT STYLES
   */
  static generateSuccessContextCSS() {
    return `
/* SUCCESS CONTEXT STYLES */
.layera-success-context {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 2px solid #81c784;
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.layera-success-theme {
  --success-primary: #4caf50;
  --success-light: #81c784;
  --success-dark: #388e3c;
  --success-bg: #e8f5e8;
  --success-border: #c8e6c9;
}

`;
  }

  /**
   * MULTI-CARD GRID SYSTEM
   */
  static generateMultiCardGridCSS() {
    return `
/* MULTI-CARD GRID SYSTEM */
.layera-success-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--layera-spacing-lg);
  padding: var(--layera-spacing-xl);
}

.layera-success-card-collection {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-md);
  min-height: 100vh;
  background: var(--layera-color-background-tertiary);
}

.layera-success-card-wrapper {
  position: relative;
  transition: all var(--layera-transition-normal);
  border-radius: var(--layera-border-radius-md);
  overflow: hidden;
}

.layera-success-card-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

`;
  }

  /**
   * SUCCESS STATES SYSTEM
   */
  static generateSuccessStatesCSS() {
    return `
/* SUCCESS STATES SYSTEM */
.layera-card-primary {
  background: var(--layera-color-primary-50);
  border-left: 4px solid var(--layera-color-primary);
  color: var(--layera-color-primary-900);
}

.layera-card-secondary {
  background: var(--layera-color-secondary-50);
  border-left: 4px solid var(--layera-color-secondary);
  color: var(--layera-color-secondary-900);
}

.layera-card-success {
  background: var(--layera-color-success-50);
  border-left: 4px solid var(--layera-color-success);
  color: var(--layera-color-success-900);
  position: relative;
}

.layera-card-success::before {
  content: "✅";
  position: absolute;
  top: var(--layera-spacing-sm);
  right: var(--layera-spacing-sm);
  font-size: 1.2em;
  opacity: 0.7;
}

.layera-card-warning {
  background: var(--layera-color-warning-50);
  border-left: 4px solid var(--layera-color-warning);
  color: var(--layera-color-warning-900);
}

.layera-card-danger {
  background: var(--layera-color-danger-50);
  border-left: 4px solid var(--layera-color-danger);
  color: var(--layera-color-danger-900);
}

.layera-card-info {
  background: var(--layera-color-info-50);
  border-left: 4px solid var(--layera-color-info);
  color: var(--layera-color-info-900);
}

`;
  }

  /**
   * INPUT VARIATIONS FOR SUCCESS CARDS
   */
  static generateInputVariationsCSS() {
    return `
/* INPUT VARIATIONS FOR SUCCESS CARDS */
.layera-success-input {
  width: 100%;
  padding: var(--layera-spacing-md);
  border: 2px solid var(--layera-color-success-200);
  border-radius: var(--layera-border-radius-sm);
  background: var(--layera-color-background-primary);
  color: var(--layera-color-text-primary);
  font-family: var(--layera-font-family-sans);
  transition: all var(--layera-transition-fast);
}

.layera-success-input:focus {
  outline: none;
  border-color: var(--layera-color-success);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.layera-success-textarea {
  min-height: 80px;
  resize: vertical;
  font-family: var(--layera-font-family-sans);
}

.layera-success-date-input,
.layera-success-time-input,
.layera-success-datetime-input {
  cursor: pointer;
}

.layera-success-email-input {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--layera-spacing-sm) center;
  background-size: 20px;
  padding-right: var(--layera-spacing-xl);
}

.layera-success-checkbox {
  width: auto;
  margin-right: var(--layera-spacing-sm);
  accent-color: var(--layera-color-success);
}

`;
  }

  /**
   * SUCCESS BUTTONS
   */
  static generateSuccessButtonsCSS() {
    return `
/* SUCCESS BUTTONS */
.layera-success-button {
  background: var(--layera-color-success);
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
}

.layera-success-button:hover {
  background: var(--layera-color-success-700);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.layera-success-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
}

.layera-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
}

.layera-primary-btn:hover {
  background: var(--layera-color-primary-700);
}

.layera-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-secondary-btn:hover {
  background: var(--layera-color-secondary-700);
}

.layera-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
}

.layera-warning-btn:hover {
  background: var(--layera-color-warning-700);
}

.layera-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
}

.layera-danger-btn:hover {
  background: var(--layera-color-danger-700);
}

.layera-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
}

.layera-info-btn:hover {
  background: var(--layera-color-info-700);
}

`;
  }

  /**
   * SUCCESS ANIMATIONS
   */
  static generateSuccessAnimationsCSS() {
    return `
/* SUCCESS ANIMATIONS */
@keyframes layera-success-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes layera-success-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.layera-success-animated {
  animation: layera-success-slide-in 0.5s ease-out;
}

.layera-success-pulse {
  animation: layera-success-pulse 2s ease-in-out infinite;
}

.layera-success-card-enter {
  animation: layera-success-slide-in 0.6s ease-out;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
  animation-fill-mode: both;
}

`;
  }

  /**
   * CARD STATUS SYSTEM
   */
  static generateCardStatusSystemCSS() {
    return `
/* CARD STATUS SYSTEM */
.layera-card-status-indicator {
  position: absolute;
  top: var(--layera-spacing-xs);
  right: var(--layera-spacing-xs);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--layera-color-success);
  box-shadow: 0 0 0 2px var(--layera-color-white);
}

.layera-card-status-pending {
  background: var(--layera-color-warning);
}

.layera-card-status-error {
  background: var(--layera-color-danger);
}

.layera-card-status-info {
  background: var(--layera-color-info);
}

.layera-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--layera-spacing-md);
}

.layera-card-title {
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-bold);
  color: var(--layera-color-text-primary);
  margin: 0;
}

`;
  }

  /**
   * SUCCESS ICONOGRAPHY
   */
  static generateSuccessIconographyCSS() {
    return `
/* SUCCESS ICONOGRAPHY */
.layera-success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--layera-spacing-sm);
}

.layera-success-emoji {
  font-size: 1.2em;
  margin-right: var(--layera-spacing-sm);
}

.layera-card-icon-primary::before {
  content: "📄";
}

.layera-card-icon-secondary::before {
  content: "📅";
}

.layera-card-icon-success::before {
  content: "🏆";
}

.layera-card-icon-warning::before {
  content: "⏰";
}

.layera-card-icon-danger::before {
  content: "🚫";
}

.layera-card-icon-info::before {
  content: "📧";
}

`;
  }

  /**
   * SUCCESS RESPONSIVE DESIGN
   */
  static generateSuccessResponsiveCSS() {
    return `
/* SUCCESS RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .layera-success-cards-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md);
    padding: var(--layera-spacing-md);
  }

  .layera-success-card-wrapper {
    margin-bottom: var(--layera-spacing-sm);
  }

  .layera-success-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .layera-success-cards-grid {
    padding: var(--layera-spacing-sm);
  }

  .layera-success-input,
  .layera-success-textarea {
    padding: var(--layera-spacing-sm);
  }

  .layera-card-title {
    font-size: var(--layera-font-size-base);
  }
}

`;
  }

  /**
   * SUCCESS ACCESSIBILITY
   */
  static generateSuccessAccessibilityCSS() {
    return `
/* SUCCESS ACCESSIBILITY */
.layera-success-card-wrapper:focus-within {
  outline: 2px solid var(--layera-color-success);
  outline-offset: 2px;
}

.layera-success-input:focus,
.layera-success-textarea:focus {
  outline: 2px solid var(--layera-color-success);
  outline-offset: 2px;
}

.layera-success-button:focus {
  outline: 2px solid var(--layera-color-success-300);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .layera-success-animated,
  .layera-success-pulse,
  .layera-success-card-enter {
    animation: none;
  }

  .layera-success-card-wrapper:hover {
    transform: none;
  }
}

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
   * SUCCESS INTERACTIONS
   */
  static generateSuccessInteractionsCSS() {
    return `
/* SUCCESS INTERACTIONS */
.layera-success-card-interactive {
  cursor: pointer;
  user-select: none;
}

.layera-success-card-interactive:hover {
  background: var(--layera-color-success-25);
}

.layera-success-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm);
  margin-bottom: var(--layera-spacing-md);
}

.layera-success-form-row {
  display: flex;
  gap: var(--layera-spacing-sm);
  align-items: center;
}

.layera-success-label {
  display: flex;
  align-items: center;
  font-weight: var(--layera-font-weight-medium);
  color: var(--layera-color-text-secondary);
  margin-bottom: var(--layera-spacing-xs);
}

.layera-success-card-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--layera-spacing-sm);
  margin-top: var(--layera-spacing-md);
  padding-top: var(--layera-spacing-md);
  border-top: 1px solid var(--layera-color-border);
}

`;
  }
}