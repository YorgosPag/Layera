/**
 * LayoutWarningCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για layout-warning-cards.html functionality:
 * - Warning Layout Container στυλ
 * - Warning Headers και messaging
 * - Warning Content areas και text inputs
 * - Warning Button styles
 * - Warning Alert System
 * - Warning Icons και visual indicators
 * - Warning Animations για attention
 * - Warning States για different severity
 * - Warning Interactive states
 * - Warning Responsive design
 * - Warning Accessibility features
 *
 * HTML Reference: html/htmlComponents/main/layout/layout-warning-cards.html
 */

export class LayoutWarningCardsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Warning Layout functionality
   */
  static generateAllLayoutWarningCardsCSS() {
    let css = '/* === LAYOUT WARNING CARDS === */\n\n';

    css += this.generateWarningLayoutContainerCSS();
    css += this.generateWarningLayoutHeaderCSS();
    css += this.generateWarningLayoutContentCSS();
    css += this.generateWarningLayoutInputCSS();
    css += this.generateWarningLayoutButtonCSS();
    css += this.generateWarningLayoutAlertSystemCSS();
    css += this.generateWarningLayoutIconsCSS();
    css += this.generateWarningLayoutAnimationsCSS();
    css += this.generateWarningLayoutStatesCSS();
    css += this.generateWarningLayoutInteractiveCSS();
    css += this.generateWarningLayoutResponsiveCSS();

    return css;
  }

  /**
   * Warning Layout Container - Βασικό container styling
   */
  static generateWarningLayoutContainerCSS() {
    return `/* WARNING LAYOUT CONTAINER STYLES */
.layera-warning-layout {
  padding: var(--layera-space-4);
  background: linear-gradient(135deg, var(--layera-color-surface) 0%, #fff8e1 100%);
  border-radius: var(--layera-radius-md);
  border: 1px solid var(--layera-color-warning);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.1);
  margin: var(--layera-space-3);
  position: relative;
  overflow: hidden;
}

.layera-warning-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-warning) 0%, #ffb74d 100%);
}

.layera-warning-container {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  border-left: 4px solid var(--layera-color-warning);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.layera-warning-card {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  color: #856404;
  position: relative;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-warning-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
}

`;
  }

  /**
   * Warning Layout Header - Headers και titles
   */
  static generateWarningLayoutHeaderCSS() {
    return `/* WARNING LAYOUT HEADER STYLES */
.layera-warning-header {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin-bottom: var(--layera-space-3);
  color: var(--layera-color-warning);
  font-weight: var(--layera-weight-semibold);
}

.layera-warning-title {
  color: var(--layera-color-warning);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-bold);
  margin: 0 0 var(--layera-space-2) 0;
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-warning-subtitle {
  color: #d68910;
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
  margin: 0 0 var(--layera-space-3) 0;
  opacity: 0.8;
}

.layera-warning-icon {
  font-size: var(--layera-text-xl);
  color: var(--layera-color-warning);
  animation: layera-warning-pulse 2s ease-in-out infinite;
}

.layera-warning-badge {
  background: var(--layera-color-warning);
  color: var(--layera-color-on-warning);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-full);
  font-size: var(--layera-text-xs);
  font-weight: var(--layera-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

`;
  }

  /**
   * Warning Layout Content - Content areas και text
   */
  static generateWarningLayoutContentCSS() {
    return `/* WARNING LAYOUT CONTENT STYLES */
.layera-warning-content {
  padding: var(--layera-space-3);
  background: rgba(255, 152, 0, 0.05);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-3);
  position: relative;
}

.layera-warning-text {
  color: #d68910;
  font-size: var(--layera-text-base);
  line-height: var(--layera-leading-relaxed);
  margin: 0 0 var(--layera-space-2) 0;
}

.layera-warning-description {
  color: #b7950b;
  font-size: var(--layera-text-sm);
  line-height: var(--layera-leading-normal);
  margin: 0;
  opacity: 0.9;
}

.layera-warning-details {
  background: #fef5e7;
  border: 1px dashed var(--layera-color-warning);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  margin: var(--layera-space-2) 0;
}

.layera-warning-message {
  display: flex;
  align-items: flex-start;
  gap: var(--layera-space-2);
  padding: var(--layera-space-3);
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-radius: var(--layera-radius-md);
  border: 1px solid #ffcc02;
}

`;
  }

  /**
   * Warning Layout Input - Input fields με warning styling
   */
  static generateWarningLayoutInputCSS() {
    return `/* WARNING LAYOUT INPUT STYLES */
.layera-warning-input {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-3);
  background: #fffbf0;
  color: #d68910;
  font-size: var(--layera-text-base);
  transition: all 0.3s var(--layera-transition-smooth);
  resize: none;
}

.layera-warning-input:focus {
  outline: none;
  border-color: #ff8f00;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  background: #ffffff;
}

.layera-warning-input::placeholder {
  color: #d68910;
  opacity: 0.7;
}

.layera-warning-textarea {
  width: 100%;
  min-height: 80px;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-sm);
  background: #fffbf0;
  color: #d68910;
  font-size: var(--layera-text-base);
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-warning-textarea:focus {
  outline: none;
  border-color: #ff8f00;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  background: #ffffff;
}

.layera-warning-select {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-sm);
  background: #fffbf0;
  color: #d68910;
  font-size: var(--layera-text-base);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

`;
  }

  /**
   * Warning Layout Button - Action buttons
   */
  static generateWarningLayoutButtonCSS() {
    return `/* WARNING LAYOUT BUTTON STYLES */
.layera-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-on-warning);
  border: none;
  padding: var(--layera-space-3) var(--layera-space-4);
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
}

.layera-warning-btn:hover {
  background: #ff8f00;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.layera-warning-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.2);
}

.layera-warning-btn:disabled {
  background: #d7ccc8;
  color: #8d6e63;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.layera-warning-btn-outline {
  background: transparent;
  color: var(--layera-color-warning);
  border: 2px solid var(--layera-color-warning);
  padding: var(--layera-space-2) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-medium);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-warning-btn-outline:hover {
  background: var(--layera-color-warning);
  color: var(--layera-color-on-warning);
  transform: translateY(-1px);
}

.layera-warning-btn-ghost {
  background: rgba(255, 152, 0, 0.1);
  color: var(--layera-color-warning);
  border: 1px solid transparent;
  padding: var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-medium);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-warning-btn-ghost:hover {
  background: rgba(255, 152, 0, 0.2);
  border-color: var(--layera-color-warning);
}

`;
  }

  /**
   * Warning Alert System - Alert notifications
   */
  static generateWarningLayoutAlertSystemCSS() {
    return `/* WARNING ALERT SYSTEM STYLES */
.layera-warning-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--layera-space-3);
  padding: var(--layera-space-4);
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border: 1px solid #ffeaa7;
  border-left: 4px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-md);
  margin: var(--layera-space-3) 0;
  position: relative;
  animation: layera-warning-alert-slide-in 0.5s var(--layera-transition-smooth);
}

.layera-warning-alert-icon {
  font-size: var(--layera-text-xl);
  color: var(--layera-color-warning);
  flex-shrink: 0;
  margin-top: 2px;
}

.layera-warning-alert-content {
  flex: 1;
}

.layera-warning-alert-title {
  font-weight: var(--layera-weight-bold);
  color: #d68910;
  margin: 0 0 var(--layera-space-1) 0;
  font-size: var(--layera-text-base);
}

.layera-warning-alert-message {
  color: #b7950b;
  font-size: var(--layera-text-sm);
  line-height: var(--layera-leading-normal);
  margin: 0;
}

.layera-warning-alert-close {
  position: absolute;
  top: var(--layera-space-2);
  right: var(--layera-space-2);
  background: none;
  border: none;
  color: #d68910;
  font-size: var(--layera-text-lg);
  cursor: pointer;
  padding: var(--layera-space-1);
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-warning-alert-close:hover {
  background: rgba(255, 152, 0, 0.1);
  color: var(--layera-color-warning);
}

.layera-warning-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  background: #fff3cd;
  border: 1px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-md);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
  animation: layera-warning-notification-slide 0.5s var(--layera-transition-smooth);
}

`;
  }

  /**
   * Warning Icons - Icon system για warnings
   */
  static generateWarningLayoutIconsCSS() {
    return `/* WARNING ICONS STYLES */
.layera-warning-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 152, 0, 0.1);
  border-radius: var(--layera-radius-full);
  color: var(--layera-color-warning);
  font-size: var(--layera-text-xl);
  margin-right: var(--layera-space-3);
  flex-shrink: 0;
}

.layera-warning-icon-large {
  width: 60px;
  height: 60px;
  font-size: 2rem;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.2) 100%);
}

.layera-warning-icon-small {
  width: 24px;
  height: 24px;
  font-size: var(--layera-text-sm);
  margin-right: var(--layera-space-1);
}

.layera-warning-triangle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.layera-warning-triangle::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid var(--layera-color-warning);
  z-index: -1;
}

.layera-warning-exclamation {
  color: var(--layera-color-on-warning);
  font-weight: var(--layera-weight-bold);
  font-size: var(--layera-text-lg);
}

`;
  }

  /**
   * Warning Animations - Attention animations
   */
  static generateWarningLayoutAnimationsCSS() {
    return `/* WARNING ANIMATIONS */
@keyframes layera-warning-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes layera-warning-shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
}

@keyframes layera-warning-alert-slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-warning-notification-slide {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes layera-warning-glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.6), 0 0 30px rgba(255, 152, 0, 0.4);
  }
}

.layera-warning-animated {
  animation: layera-warning-pulse 2s ease-in-out infinite;
}

.layera-warning-shake-on-hover:hover {
  animation: layera-warning-shake 0.5s ease-in-out;
}

.layera-warning-glow {
  animation: layera-warning-glow 2s ease-in-out infinite;
}

`;
  }

  /**
   * Warning States - Different severity levels
   */
  static generateWarningLayoutStatesCSS() {
    return `/* WARNING STATES STYLES */
.layera-warning-low {
  background: #fffbf0;
  border-color: #ffcc02;
  color: #f57f17;
}

.layera-warning-medium {
  background: #fff8e1;
  border-color: var(--layera-color-warning);
  color: #d68910;
}

.layera-warning-high {
  background: #fff3e0;
  border-color: #ff8f00;
  color: #ef6c00;
  animation: layera-warning-pulse 1.5s ease-in-out infinite;
}

.layera-warning-critical {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-color: #ff6f00;
  color: #bf360c;
  animation: layera-warning-glow 2s ease-in-out infinite;
}

.layera-warning-urgent {
  background: #ffcc80;
  border: 2px solid #ff8f00;
  color: #bf360c;
  font-weight: var(--layera-weight-bold);
  animation: layera-warning-shake 2s ease-in-out infinite;
}

.layera-warning-resolved {
  background: #f1f8e9;
  border-color: #8bc34a;
  color: #558b2f;
  opacity: 0.7;
}

.layera-warning-pending {
  background: #e3f2fd;
  border-color: #2196f3;
  color: #1976d2;
  position: relative;
}

.layera-warning-pending::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #2196f3;
  border-radius: 50%;
  animation: layera-warning-pulse 1s ease-in-out infinite;
}

`;
  }

  /**
   * Warning Interactive - Hover και focus states
   */
  static generateWarningLayoutInteractiveCSS() {
    return `/* WARNING INTERACTIVE STYLES */
.layera-warning-interactive {
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  position: relative;
  overflow: hidden;
}

.layera-warning-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.15);
  border-color: #ff8f00;
}

.layera-warning-interactive:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: layera-warning-shine 0.6s ease-out;
}

.layera-warning-interactive:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.3);
}

.layera-warning-clickable {
  transition: all 0.2s var(--layera-transition-smooth);
}

.layera-warning-clickable:active {
  transform: scale(0.98);
}

.layera-warning-expandable {
  max-height: 100px;
  overflow: hidden;
  transition: max-height 0.3s var(--layera-transition-smooth);
}

.layera-warning-expandable.expanded {
  max-height: 500px;
}

.layera-warning-collapsible-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  transition: background-color 0.3s var(--layera-transition-smooth);
}

.layera-warning-collapsible-header:hover {
  background: rgba(255, 152, 0, 0.05);
}

.layera-warning-toggle-icon {
  transform: rotate(0deg);
  transition: transform 0.3s var(--layera-transition-smooth);
}

.layera-warning-toggle-icon.rotated {
  transform: rotate(180deg);
}

`;
  }

  /**
   * Warning Responsive - Mobile optimization
   */
  static generateWarningLayoutResponsiveCSS() {
    return `/* WARNING RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-warning-layout {
    margin: var(--layera-space-2);
    padding: var(--layera-space-3);
  }

  .layera-warning-container {
    padding: var(--layera-space-3);
  }

  .layera-warning-alert {
    flex-direction: column;
    text-align: center;
  }

  .layera-warning-alert-icon {
    align-self: center;
    margin-top: 0;
    margin-bottom: var(--layera-space-2);
  }

  .layera-warning-btn {
    width: 100%;
    justify-content: center;
  }

  .layera-warning-input,
  .layera-warning-textarea,
  .layera-warning-select {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .layera-warning-notification {
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    max-width: none;
  }

  .layera-warning-icon-container {
    width: 32px;
    height: 32px;
    font-size: var(--layera-text-lg);
  }
}

@media (max-width: 480px) {
  .layera-warning-layout {
    margin: var(--layera-space-1);
    padding: var(--layera-space-2);
  }

  .layera-warning-title {
    font-size: var(--layera-text-base);
  }

  .layera-warning-btn {
    padding: var(--layera-space-2) var(--layera-space-3);
    font-size: var(--layera-text-sm);
  }

  .layera-warning-message {
    flex-direction: column;
    text-align: center;
  }

  .layera-warning-alert {
    padding: var(--layera-space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .layera-warning-animated,
  .layera-warning-pulse,
  .layera-warning-glow,
  .layera-warning-shake-on-hover:hover {
    animation: none;
  }
}

`;
  }
}