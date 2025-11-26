/**
 * CardDangerCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για card-danger-cards.html functionality:
 * - Components Grid layout για 6 themed cards
 * - 6 Themed Card variants (Primary, Secondary, Success, Warning, Danger, Info)
 * - Card Item structure και styling
 * - Themed Input fields (text, email, number, date, password, url, tel, textarea, select)
 * - Themed Buttons για κάθε θέμα
 * - Checkbox και form elements
 * - Danger-context styling
 * - Grid responsive layout
 * - Card interactions και animations
 * - Form validation states
 * - Accessibility support
 *
 * HTML Reference: html/htmlComponents/main/cards/card-danger-cards.html
 */

export class CardDangerCardsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Card Danger Cards functionality
   */
  static generateAllCardDangerCardsCSS() {
    let css = '/* === CARD DANGER CARDS === */\n\n';

    css += this.generateComponentsGridCSS();
    css += this.generateCardItemCSS();
    css += this.generateThemedCardsCSS();
    css += this.generateThemedInputsCSS();
    css += this.generateThemedButtonsCSS();
    css += this.generateFormElementsCSS();
    css += this.generateDangerContextCSS();
    css += this.generateCardInteractionsCSS();
    css += this.generateFormValidationCSS();
    css += this.generateCardResponsiveCSS();
    css += this.generateCardAccessibilityCSS();

    return css;
  }

  /**
   * Components Grid - Layout container για cards
   */
  static generateComponentsGridCSS() {
    return `/* COMPONENTS GRID STYLES */
.layera-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--layera-space-4);
  padding: var(--layera-space-4);
  margin: var(--layera-space-3) 0;
  width: 100%;
  box-sizing: border-box;
}

.layera-danger-components-grid {
  background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%);
  border: 1px solid #fecaca;
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  position: relative;
}

.layera-danger-components-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-danger) 0%, #ef4444 100%);
  border-radius: var(--layera-radius-lg) var(--layera-radius-lg) 0 0;
}

.layera-grid-header {
  text-align: center;
  color: var(--layera-color-danger);
  margin-bottom: var(--layera-space-4);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  padding: var(--layera-space-3);
  background: rgba(244, 67, 54, 0.05);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(244, 67, 54, 0.1);
}

`;
  }

  /**
   * Card Item - Βασική δομή κάθε card
   */
  static generateCardItemCSS() {
    return `/* CARD ITEM STYLES */
.layera-card-item {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s var(--layera-transition-smooth);
  border: 1px solid var(--layera-color-border);
  position: relative;
  overflow: hidden;
}

.layera-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-color: var(--layera-color-primary);
}

.layera-card-item h4 {
  margin: 0 0 var(--layera-space-3) 0;
  color: var(--layera-color-text);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-card-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-border);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-card-elevated {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.layera-card-flat {
  box-shadow: none;
  border: 2px solid var(--layera-color-border);
}

`;
  }

  /**
   * Themed Cards - 6 θέματα για cards
   */
  static generateThemedCardsCSS() {
    return `/* THEMED CARDS STYLES */
.layera-card-primary {
  border-left: 4px solid var(--layera-color-primary);
}

.layera-card-primary::before {
  background: var(--layera-color-primary);
}

.layera-card-primary:hover {
  border-color: var(--layera-color-primary);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.2);
}

.layera-card-primary h4 {
  color: var(--layera-color-primary);
}

.layera-card-secondary {
  border-left: 4px solid var(--layera-color-secondary);
}

.layera-card-secondary::before {
  background: var(--layera-color-secondary);
}

.layera-card-secondary:hover {
  border-color: var(--layera-color-secondary);
  box-shadow: 0 8px 25px rgba(144, 19, 254, 0.2);
}

.layera-card-secondary h4 {
  color: var(--layera-color-secondary);
}

.layera-card-success {
  border-left: 4px solid var(--layera-color-success);
}

.layera-card-success::before {
  background: var(--layera-color-success);
}

.layera-card-success:hover {
  border-color: var(--layera-color-success);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
}

.layera-card-success h4 {
  color: var(--layera-color-success);
}

.layera-card-warning {
  border-left: 4px solid var(--layera-color-warning);
}

.layera-card-warning::before {
  background: var(--layera-color-warning);
}

.layera-card-warning:hover {
  border-color: var(--layera-color-warning);
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.2);
}

.layera-card-warning h4 {
  color: var(--layera-color-warning);
}

.layera-card-danger {
  border-left: 4px solid var(--layera-color-danger);
  position: relative;
}

.layera-card-danger::before {
  background: var(--layera-color-danger);
}

.layera-card-danger:hover {
  border-color: var(--layera-color-danger);
  box-shadow: 0 8px 25px rgba(244, 67, 54, 0.2);
  animation: layera-danger-glow 0.5s ease-in-out;
}

.layera-card-danger h4 {
  color: var(--layera-color-danger);
}

.layera-card-info {
  border-left: 4px solid var(--layera-color-info);
}

.layera-card-info::before {
  background: var(--layera-color-info);
}

.layera-card-info:hover {
  border-color: var(--layera-color-info);
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.2);
}

.layera-card-info h4 {
  color: var(--layera-color-info);
}

`;
  }

  /**
   * Themed Inputs - Input fields με themed styling
   */
  static generateThemedInputsCSS() {
    return `/* THEMED INPUTS STYLES */
.layera-card-input {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  box-sizing: border-box;
}

.layera-card-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-surface);
}

.layera-card-input::placeholder {
  color: var(--layera-color-text-muted);
  opacity: 0.7;
}

/* Primary themed inputs */
.layera-card-primary .layera-card-input,
.layera-card-input.primary {
  border-color: var(--layera-color-primary);
}

.layera-card-primary .layera-card-input:focus,
.layera-card-input.primary:focus {
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

/* Secondary themed inputs */
.layera-card-secondary .layera-card-input,
.layera-card-input.secondary {
  border-color: var(--layera-color-secondary);
}

.layera-card-secondary .layera-card-input:focus,
.layera-card-input.secondary:focus {
  border-color: var(--layera-color-secondary);
  box-shadow: 0 0 0 3px rgba(144, 19, 254, 0.1);
}

/* Success themed inputs */
.layera-card-success .layera-card-input,
.layera-card-input.success {
  border-color: var(--layera-color-success);
}

.layera-card-success .layera-card-input:focus,
.layera-card-input.success:focus {
  border-color: var(--layera-color-success);
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

/* Warning themed inputs */
.layera-card-warning .layera-card-input,
.layera-card-input.warning {
  border-color: var(--layera-color-warning);
}

.layera-card-warning .layera-card-input:focus,
.layera-card-input.warning:focus {
  border-color: var(--layera-color-warning);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
}

/* Danger themed inputs */
.layera-card-danger .layera-card-input,
.layera-card-input.danger {
  border-color: var(--layera-color-danger);
}

.layera-card-danger .layera-card-input:focus,
.layera-card-input.danger:focus {
  border-color: var(--layera-color-danger);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

/* Info themed inputs */
.layera-card-info .layera-card-input,
.layera-card-input.info {
  border-color: var(--layera-color-info);
}

.layera-card-info .layera-card-input:focus,
.layera-card-input.info:focus {
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

`;
  }

  /**
   * Themed Buttons - Action buttons για κάθε θέμα
   */
  static generateThemedButtonsCSS() {
    return `/* THEMED BUTTONS STYLES */
.layera-card-btn {
  padding: var(--layera-space-3) var(--layera-space-4);
  border: none;
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-base);
  font-weight: var(--layera-weight-semibold);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-2);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  justify-content: center;
}

.layera-card-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.layera-card-btn:active {
  transform: translateY(0);
}

.layera-card-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Primary button */
.layera-card-primary-btn,
.layera-card-primary .layera-card-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
}

.layera-card-primary-btn:hover,
.layera-card-primary .layera-card-btn:hover {
  background: #3d7bc6;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

/* Secondary button */
.layera-card-secondary-btn,
.layera-card-secondary .layera-card-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-on-secondary);
}

.layera-card-secondary-btn:hover,
.layera-card-secondary .layera-card-btn:hover {
  background: #7c0fe1;
  box-shadow: 0 4px 12px rgba(144, 19, 254, 0.3);
}

/* Success button */
.layera-card-success-btn,
.layera-card-success .layera-card-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-on-success);
}

.layera-card-success-btn:hover,
.layera-card-success .layera-card-btn:hover {
  background: #43a047;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Warning button */
.layera-card-warning-btn,
.layera-card-warning .layera-card-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-on-warning);
}

.layera-card-warning-btn:hover,
.layera-card-warning .layera-card-btn:hover {
  background: #f57700;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

/* Danger button */
.layera-card-danger-btn,
.layera-card-danger .layera-card-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-on-danger);
  position: relative;
}

.layera-card-danger-btn:hover,
.layera-card-danger .layera-card-btn:hover {
  background: #e53935;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
  animation: layera-danger-pulse 0.3s ease-in-out;
}

/* Info button */
.layera-card-info-btn,
.layera-card-info .layera-card-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
}

.layera-card-info-btn:hover,
.layera-card-info .layera-card-btn:hover {
  background: #1e88e5;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

`;
  }

  /**
   * Form Elements - Select, textarea, checkbox styling
   */
  static generateFormElementsCSS() {
    return `/* FORM ELEMENTS STYLES */
.layera-card-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  box-sizing: border-box;
}

.layera-card-textarea:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-surface);
}

.layera-card-select {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-border);
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
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right var(--layera-space-3) center;
  background-size: 1rem;
  padding-right: calc(var(--layera-space-3) + 1.5rem);
}

.layera-card-select:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.layera-card-checkbox-label {
  display: flex;
  align-items: center;
  margin: var(--layera-space-2) 0;
  cursor: pointer;
  font-size: var(--layera-text-sm);
  color: var(--layera-color-text);
  gap: var(--layera-space-2);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-card-checkbox-label:hover {
  color: var(--layera-color-primary);
}

.layera-card-checkbox {
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--layera-color-primary);
}

.layera-card-danger .layera-card-checkbox {
  accent-color: var(--layera-color-danger);
}

.layera-card-danger .layera-card-checkbox-label:hover {
  color: var(--layera-color-danger);
}

/* Input types specific styling */
.layera-card-input[type="password"] {
  font-family: text-security-disc;
}

.layera-card-input[type="date"],
.layera-card-input[type="time"],
.layera-card-input[type="datetime-local"] {
  cursor: pointer;
}

.layera-card-input[type="number"] {
  text-align: right;
}

`;
  }

  /**
   * Danger Context - Ειδικό styling για danger context
   */
  static generateDangerContextCSS() {
    return `/* DANGER CONTEXT STYLES */
.layera-danger-context {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 2px solid #fecaca;
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  margin: var(--layera-space-4) 0;
  position: relative;
}

.layera-danger-context::before {
  content: '⚠️';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-danger);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  animation: layera-danger-pulse 2s ease-in-out infinite;
}

.layera-danger-header {
  text-align: center;
  color: var(--layera-color-danger);
  margin-bottom: var(--layera-space-4);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-bold);
  padding: var(--layera-space-3);
  background: rgba(244, 67, 54, 0.05);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(244, 67, 54, 0.2);
  position: relative;
}

.layera-danger-warning {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid var(--layera-color-danger);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  margin: var(--layera-space-3) 0;
  color: #b91c1c;
  font-weight: var(--layera-weight-medium);
  text-align: center;
  animation: layera-danger-glow 3s ease-in-out infinite;
}

.layera-danger-grid {
  background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%);
  border: 2px solid #fca5a5;
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  position: relative;
}

.layera-danger-grid::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-danger) 0%, #dc2626 100%);
  border-radius: 0 0 var(--layera-radius-lg) var(--layera-radius-lg);
}

`;
  }

  /**
   * Card Interactions - Hover και animations
   */
  static generateCardInteractionsCSS() {
    return `/* CARD INTERACTIONS */
@keyframes layera-danger-glow {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.1);
  }
  50% {
    box-shadow: 0 2px 20px rgba(244, 67, 54, 0.3), 0 4px 40px rgba(244, 67, 54, 0.1);
  }
}

@keyframes layera-danger-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes layera-card-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-card-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.layera-card-item {
  animation: layera-card-slide-in 0.5s var(--layera-transition-smooth);
}

.layera-card-item:nth-child(1) { animation-delay: 0.1s; }
.layera-card-item:nth-child(2) { animation-delay: 0.2s; }
.layera-card-item:nth-child(3) { animation-delay: 0.3s; }
.layera-card-item:nth-child(4) { animation-delay: 0.4s; }
.layera-card-item:nth-child(5) { animation-delay: 0.5s; }
.layera-card-item:nth-child(6) { animation-delay: 0.6s; }

.layera-card-interactive:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: layera-card-shine 0.6s ease-out;
}

.layera-card-clickable {
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-card-clickable:active {
  transform: scale(0.98);
}

.layera-card-loading {
  opacity: 0.7;
  pointer-events: none;
  position: relative;
}

.layera-card-loading::after {
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
  animation: layera-card-loading-spin 1s linear infinite;
}

@keyframes layera-card-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
  }

  /**
   * Form Validation - Validation states για inputs
   */
  static generateFormValidationCSS() {
    return `/* FORM VALIDATION STYLES */
.layera-card-input.valid {
  border-color: var(--layera-color-success);
  background: rgba(76, 175, 80, 0.05);
}

.layera-card-input.valid:focus {
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.layera-card-input.invalid {
  border-color: var(--layera-color-danger);
  background: rgba(244, 67, 54, 0.05);
  animation: layera-input-shake 0.5s ease-in-out;
}

.layera-card-input.invalid:focus {
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

@keyframes layera-input-shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
}

.layera-validation-message {
  font-size: var(--layera-text-xs);
  margin-top: var(--layera-space-1);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  display: flex;
  align-items: center;
  gap: var(--layera-space-1);
}

.layera-validation-message.error {
  color: var(--layera-color-danger);
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.2);
}

.layera-validation-message.success {
  color: var(--layera-color-success);
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.layera-validation-message.warning {
  color: var(--layera-color-warning);
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.2);
}

.layera-required-indicator {
  color: var(--layera-color-danger);
  margin-left: var(--layera-space-1);
  font-weight: var(--layera-weight-bold);
}

`;
  }

  /**
   * Card Responsive - Mobile optimization
   */
  static generateCardResponsiveCSS() {
    return `/* CARD RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-components-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-space-3);
    padding: var(--layera-space-3);
  }

  .layera-danger-components-grid {
    padding: var(--layera-space-4);
  }

  .layera-card-item {
    padding: var(--layera-space-3);
  }

  .layera-card-item h4 {
    font-size: var(--layera-text-base);
  }

  .layera-card-input,
  .layera-card-textarea,
  .layera-card-select {
    font-size: 16px; /* Prevents zoom on iOS */
    padding: var(--layera-space-2);
  }

  .layera-card-btn {
    width: 100%;
    justify-content: center;
    padding: var(--layera-space-3);
  }

  .layera-grid-header {
    font-size: var(--layera-text-base);
    padding: var(--layera-space-2);
  }

  .layera-danger-context {
    padding: var(--layera-space-4);
  }
}

@media (max-width: 480px) {
  .layera-components-grid {
    padding: var(--layera-space-2);
    gap: var(--layera-space-2);
  }

  .layera-card-item {
    padding: var(--layera-space-2);
  }

  .layera-card-input,
  .layera-card-textarea,
  .layera-card-select {
    padding: var(--layera-space-2);
    margin: var(--layera-space-1) 0;
  }

  .layera-card-btn {
    padding: var(--layera-space-2);
    font-size: var(--layera-text-sm);
  }

  .layera-card-item h4 {
    font-size: var(--layera-text-sm);
  }
}

@media (max-width: 320px) {
  .layera-components-grid {
    padding: var(--layera-space-1);
  }

  .layera-card-item {
    padding: var(--layera-space-2);
    margin: var(--layera-space-1) 0;
  }
}

`;
  }

  /**
   * Card Accessibility - Screen reader και keyboard navigation
   */
  static generateCardAccessibilityCSS() {
    return `/* CARD ACCESSIBILITY STYLES */
.layera-card-item:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-card-input:focus,
.layera-card-textarea:focus,
.layera-card-select:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.layera-card-btn:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-card-checkbox:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
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

.layera-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  padding: var(--layera-space-2) var(--layera-space-3);
  text-decoration: none;
  border-radius: var(--layera-radius-sm);
  transition: top 0.3s;
  z-index: 1000;
}

.layera-skip-link:focus {
  top: 6px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .layera-card-item {
    border-width: 2px;
  }

  .layera-card-input,
  .layera-card-textarea,
  .layera-card-select {
    border-width: 2px;
  }

  .layera-card-btn {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .layera-card-item,
  .layera-card-btn,
  .layera-card-input,
  .layera-danger-context::before {
    animation: none;
    transition: none;
  }

  .layera-card-item:hover {
    transform: none;
  }

  .layera-card-btn:hover {
    transform: none;
  }
}

`;
  }
}