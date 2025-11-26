/**
 * CardsTabsBuilder - Enterprise Cards with Tabs CSS Builder
 *
 * HTML-aligned enterprise CSS builder για advanced cards με tabs system
 * Παράγει CSS για 6-color theming με interactive tab navigation
 */

export class CardsTabsBuilder {

  /**
   * Generates complete cards with tabs CSS
   */
  static generateAllCardsTabsCSS() {
    let css = '/* === CARDS TABS SYSTEM === */\n\n';

    css += this.generateCardsSectionCSS();
    css += this.generateTabsNavigationCSS();
    css += this.generateTabContentSystemCSS();
    css += this.generateSixColorThemingCSS();
    css += this.generateCardsGridSystemCSS();
    css += this.generateTabAnimationsCSS();
    css += this.generateTabButtonsCSS();
    css += this.generateTabResponsiveCSS();
    css += this.generateTabAccessibilityCSS();
    css += this.generateTabInteractionsCSS();
    css += this.generateTabScrollingSystemCSS();

    return css;
  }

  /**
   * CARDS SECTION FOUNDATION
   */
  static generateCardsSectionCSS() {
    return `
/* CARDS SECTION FOUNDATION */
.layera-cards-section {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  margin-bottom: var(--layera-spacing-xl);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--layera-color-border);
  position: relative;
}

.layera-section-title {
  color: var(--layera-color-text-primary);
  font-size: var(--layera-font-size-xl);
  font-weight: var(--layera-font-weight-semibold);
  margin-bottom: var(--layera-spacing-lg);
  padding-bottom: var(--layera-spacing-sm);
  border-bottom: 1px solid var(--layera-color-border);
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-sm);
}

.layera-cards-section-wrapper {
  position: relative;
  min-height: 400px;
  transition: all var(--layera-transition-normal);
}

.layera-cards-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--layera-spacing-md);
}

.layera-cards-counter {
  background: var(--layera-color-info-100);
  color: var(--layera-color-info-800);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-medium);
}

`;
  }

  /**
   * TABS NAVIGATION SYSTEM
   */
  static generateTabsNavigationCSS() {
    return `
/* TABS NAVIGATION SYSTEM */
.layera-tabs-container {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-md);
  overflow: hidden;
  border: 1px solid var(--layera-color-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.layera-tabs-nav {
  display: flex;
  background: var(--layera-color-background-secondary);
  border-bottom: 1px solid var(--layera-color-border);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--layera-color-border-secondary) var(--layera-color-background-secondary);
  position: relative;
}

.layera-tabs-nav::-webkit-scrollbar {
  height: 6px;
}

.layera-tabs-nav::-webkit-scrollbar-track {
  background: var(--layera-color-background-secondary);
}

.layera-tabs-nav::-webkit-scrollbar-thumb {
  background: var(--layera-color-border-secondary);
  border-radius: var(--layera-border-radius-full);
}

.layera-tabs-nav::-webkit-scrollbar-thumb:hover {
  background: var(--layera-color-border);
}

.layera-tabs-nav-gradient {
  position: relative;
}

.layera-tabs-nav-gradient::before,
.layera-tabs-nav-gradient::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 10;
}

.layera-tabs-nav-gradient::before {
  left: 0;
  background: linear-gradient(to right, var(--layera-color-background-secondary), transparent);
}

.layera-tabs-nav-gradient::after {
  right: 0;
  background: linear-gradient(to left, var(--layera-color-background-secondary), transparent);
}

`;
  }

  /**
   * TAB CONTENT SYSTEM
   */
  static generateTabContentSystemCSS() {
    return `
/* TAB CONTENT SYSTEM */
.layera-tab-content {
  padding: var(--layera-spacing-lg);
  background: var(--layera-color-background-primary);
  min-height: 300px;
  position: relative;
}

.layera-tab-pane {
  display: none;
  animation: layera-tab-fade-in 0.3s ease-out;
}

.layera-tab-pane.layera-active-pane {
  display: block;
}

.layera-tab-pane-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--layera-color-text-secondary);
}

.layera-tab-pane-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--layera-color-text-tertiary);
  font-style: italic;
}

.layera-tab-pane-empty::before {
  content: "🃏";
  font-size: 3rem;
  margin-bottom: var(--layera-spacing-md);
  opacity: 0.5;
}

@keyframes layera-tab-fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.layera-tab-content-container {
  position: relative;
  transition: all var(--layera-transition-normal);
}

.layera-tab-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}

`;
  }

  /**
   * SIX COLOR THEMING SYSTEM
   */
  static generateSixColorThemingCSS() {
    return `
/* SIX COLOR THEMING SYSTEM */
.layera-tab-button {
  padding: var(--layera-spacing-md) var(--layera-spacing-lg);
  background: transparent;
  border: none;
  color: var(--layera-color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  flex: 1;
  min-width: 140px;
  font-size: var(--layera-font-size-sm);
  font-family: var(--layera-font-family-sans);
  font-weight: var(--layera-font-weight-medium);
  transition: all var(--layera-transition-fast);
  border-bottom: 3px solid transparent;
  position: relative;
}

.layera-tab-button:hover {
  background: var(--layera-color-primary-50);
  color: var(--layera-color-primary);
}

.layera-tab-button.layera-active-tab {
  background: var(--layera-color-primary-50);
  color: var(--layera-color-primary);
  border-bottom-color: var(--layera-color-primary);
  font-weight: var(--layera-font-weight-semibold);
}

/* Primary Tab Theme */
.layera-tab-button.layera-tab-primary:hover {
  background: var(--layera-color-primary-50);
  color: var(--layera-color-primary);
}

.layera-tab-button.layera-tab-primary.layera-active-tab {
  background: var(--layera-color-primary-50);
  color: var(--layera-color-primary);
  border-bottom-color: var(--layera-color-primary);
}

/* Secondary Tab Theme */
.layera-tab-button.layera-tab-secondary:hover {
  background: var(--layera-color-secondary-50);
  color: var(--layera-color-secondary);
}

.layera-tab-button.layera-tab-secondary.layera-active-tab {
  background: var(--layera-color-secondary-50);
  color: var(--layera-color-secondary);
  border-bottom-color: var(--layera-color-secondary);
}

/* Success Tab Theme */
.layera-tab-button.layera-tab-success:hover {
  background: var(--layera-color-success-50);
  color: var(--layera-color-success);
}

.layera-tab-button.layera-tab-success.layera-active-tab {
  background: var(--layera-color-success-50);
  color: var(--layera-color-success);
  border-bottom-color: var(--layera-color-success);
}

/* Warning Tab Theme */
.layera-tab-button.layera-tab-warning:hover {
  background: var(--layera-color-warning-50);
  color: var(--layera-color-warning);
}

.layera-tab-button.layera-tab-warning.layera-active-tab {
  background: var(--layera-color-warning-50);
  color: var(--layera-color-warning);
  border-bottom-color: var(--layera-color-warning);
}

/* Danger Tab Theme */
.layera-tab-button.layera-tab-danger:hover {
  background: var(--layera-color-danger-50);
  color: var(--layera-color-danger);
}

.layera-tab-button.layera-tab-danger.layera-active-tab {
  background: var(--layera-color-danger-50);
  color: var(--layera-color-danger);
  border-bottom-color: var(--layera-color-danger);
}

/* Info Tab Theme */
.layera-tab-button.layera-tab-info:hover {
  background: var(--layera-color-info-50);
  color: var(--layera-color-info);
}

.layera-tab-button.layera-tab-info.layera-active-tab {
  background: var(--layera-color-info-50);
  color: var(--layera-color-info);
  border-bottom-color: var(--layera-color-info);
}

`;
  }

  /**
   * CARDS GRID SYSTEM
   */
  static generateCardsGridSystemCSS() {
    return `
/* CARDS GRID SYSTEM */
.layera-tabs-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--layera-spacing-lg);
  margin-bottom: var(--layera-spacing-lg);
}

.layera-tabs-card-item {
  background: var(--layera-color-background-primary);
  border-radius: var(--layera-border-radius-lg);
  padding: var(--layera-spacing-lg);
  border: 1px solid var(--layera-color-border);
  border-left: 4px solid var(--layera-color-text-tertiary);
  transition: all var(--layera-transition-normal);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
}

.layera-tabs-card-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.layera-tabs-card-item h4 {
  color: var(--layera-color-text-primary);
  margin: 0 0 var(--layera-spacing-md) 0;
  font-size: var(--layera-font-size-base);
  font-weight: var(--layera-font-weight-semibold);
}

/* Card Color Variants */
.layera-tabs-card-item.layera-card-primary {
  border-color: var(--layera-color-border);
  background: var(--layera-color-primary-25);
  border-left-color: var(--layera-color-primary);
}

.layera-tabs-card-item.layera-card-secondary {
  border-color: var(--layera-color-border);
  background: var(--layera-color-secondary-25);
  border-left-color: var(--layera-color-secondary);
}

.layera-tabs-card-item.layera-card-success {
  border-color: var(--layera-color-border);
  background: var(--layera-color-success-25);
  border-left-color: var(--layera-color-success);
}

.layera-tabs-card-item.layera-card-warning {
  border-color: var(--layera-color-border);
  background: var(--layera-color-warning-25);
  border-left-color: var(--layera-color-warning);
}

.layera-tabs-card-item.layera-card-danger {
  border-color: var(--layera-color-border);
  background: var(--layera-color-danger-25);
  border-left-color: var(--layera-color-danger);
}

.layera-tabs-card-item.layera-card-info {
  border-color: var(--layera-color-border);
  background: var(--layera-color-info-25);
  border-left-color: var(--layera-color-info);
}

`;
  }

  /**
   * TAB ANIMATIONS
   */
  static generateTabAnimationsCSS() {
    return `
/* TAB ANIMATIONS */
@keyframes layera-tab-slide-in {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes layera-tab-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes layera-tab-glow {
  0% { box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(74, 144, 226, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 144, 226, 0); }
}

.layera-tab-button-animated {
  animation: layera-tab-slide-in 0.3s ease-out;
}

.layera-tab-button:active {
  animation: layera-tab-bounce 0.2s ease-out;
}

.layera-tab-button.layera-tab-highlight {
  animation: layera-tab-glow 2s ease-in-out infinite;
}

.layera-tabs-card-item-enter {
  animation: layera-tab-fade-in 0.5s ease-out;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
  animation-fill-mode: both;
}

.layera-tab-transition {
  transition: all var(--layera-transition-slow);
}

.layera-tab-button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: currentColor;
  transition: all var(--layera-transition-fast);
  transform: translateX(-50%);
}

.layera-tab-button:hover::after {
  width: 80%;
}

.layera-tab-button.layera-active-tab::after {
  width: 100%;
}

`;
  }

  /**
   * TAB BUTTONS SYSTEM
   */
  static generateTabButtonsCSS() {
    return `
/* TAB BUTTONS SYSTEM */
.layera-tabs-btn {
  padding: var(--layera-spacing-sm) var(--layera-spacing-lg);
  border: none;
  border-radius: var(--layera-border-radius-sm);
  cursor: pointer;
  font-size: var(--layera-font-size-sm);
  font-family: var(--layera-font-family-sans);
  font-weight: var(--layera-font-weight-medium);
  transition: all var(--layera-transition-fast);
  width: 100%;
  margin-top: var(--layera-spacing-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--layera-spacing-xs);
}

.layera-tabs-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.layera-tabs-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.layera-tabs-primary-btn {
  background: var(--layera-color-primary);
  color: var(--layera-color-white);
}

.layera-tabs-primary-btn:hover {
  background: var(--layera-color-primary-700);
}

.layera-tabs-secondary-btn {
  background: var(--layera-color-secondary);
  color: var(--layera-color-white);
}

.layera-tabs-secondary-btn:hover {
  background: var(--layera-color-secondary-700);
}

.layera-tabs-success-btn {
  background: var(--layera-color-success);
  color: var(--layera-color-white);
}

.layera-tabs-success-btn:hover {
  background: var(--layera-color-success-700);
}

.layera-tabs-warning-btn {
  background: var(--layera-color-warning);
  color: var(--layera-color-white);
}

.layera-tabs-warning-btn:hover {
  background: var(--layera-color-warning-700);
}

.layera-tabs-danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
}

.layera-tabs-danger-btn:hover {
  background: var(--layera-color-danger-700);
}

.layera-tabs-info-btn {
  background: var(--layera-color-info);
  color: var(--layera-color-white);
}

.layera-tabs-info-btn:hover {
  background: var(--layera-color-info-700);
}

`;
  }

  /**
   * TAB RESPONSIVE DESIGN
   */
  static generateTabResponsiveCSS() {
    return `
/* TAB RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .layera-tabs-nav {
    flex-direction: column;
    overflow-x: visible;
  }

  .layera-tab-button {
    min-width: auto;
    flex: none;
    width: 100%;
    text-align: left;
    border-bottom: none;
    border-left: 3px solid transparent;
  }

  .layera-tab-button.layera-active-tab {
    border-bottom: none;
    border-left-color: currentColor;
  }

  .layera-tabs-cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--layera-spacing-md);
  }

  .layera-tab-content {
    padding: var(--layera-spacing-md);
  }

  .layera-section-title {
    font-size: var(--layera-font-size-lg);
  }
}

@media (max-width: 480px) {
  .layera-tabs-cards-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-sm);
  }

  .layera-tabs-card-item {
    padding: var(--layera-spacing-md);
  }

  .layera-tab-button {
    padding: var(--layera-spacing-sm);
    font-size: var(--layera-font-size-xs);
  }

  .layera-cards-section {
    padding: var(--layera-spacing-md);
    margin-bottom: var(--layera-spacing-lg);
  }
}

`;
  }

  /**
   * TAB ACCESSIBILITY
   */
  static generateTabAccessibilityCSS() {
    return `
/* TAB ACCESSIBILITY */
.layera-tab-button:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
  z-index: 10;
  position: relative;
}

.layera-tabs-card-item:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-tabs-btn:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .layera-tab-button,
  .layera-tabs-card-item,
  .layera-tabs-btn,
  .layera-tab-pane {
    animation: none;
    transition: none;
  }

  .layera-tabs-card-item:hover,
  .layera-tabs-btn:hover {
    transform: none;
  }
}

@media (prefers-high-contrast: active) {
  .layera-tab-button {
    border: 1px solid;
  }

  .layera-tabs-card-item {
    border-width: 2px;
  }

  .layera-tabs-btn {
    border: 2px solid currentColor;
  }
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

.layera-tab-button[aria-selected="true"] {
  position: relative;
}

.layera-tab-button[aria-selected="true"]::before {
  content: "✓";
  position: absolute;
  left: var(--layera-spacing-xs);
  opacity: 0.7;
  font-size: 0.8em;
}

`;
  }

  /**
   * TAB INTERACTIONS
   */
  static generateTabInteractionsCSS() {
    return `
/* TAB INTERACTIONS */
.layera-tab-interaction-zone {
  position: relative;
  user-select: none;
}

.layera-tab-button-group {
  display: flex;
  background: var(--layera-color-background-secondary);
  border-radius: var(--layera-border-radius-md);
  padding: var(--layera-spacing-xs);
  gap: var(--layera-spacing-xs);
}

.layera-tab-badge {
  position: absolute;
  top: var(--layera-spacing-xs);
  right: var(--layera-spacing-xs);
  background: var(--layera-color-danger);
  color: var(--layera-color-white);
  font-size: var(--layera-font-size-xs);
  padding: var(--layera-spacing-xs) var(--layera-spacing-sm);
  border-radius: var(--layera-border-radius-full);
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--layera-font-weight-bold);
}

.layera-tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--layera-color-primary);
  transition: all var(--layera-transition-normal);
  border-radius: var(--layera-border-radius-full) var(--layera-border-radius-full) 0 0;
}

.layera-tab-close {
  background: none;
  border: none;
  color: var(--layera-color-text-tertiary);
  cursor: pointer;
  padding: var(--layera-spacing-xs);
  margin-left: var(--layera-spacing-xs);
  border-radius: var(--layera-border-radius-sm);
  opacity: 0;
  transition: all var(--layera-transition-fast);
}

.layera-tab-button:hover .layera-tab-close {
  opacity: 1;
}

.layera-tab-close:hover {
  background: var(--layera-color-danger-100);
  color: var(--layera-color-danger);
}

.layera-tabs-keyboard-navigation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

`;
  }

  /**
   * TAB SCROLLING SYSTEM
   */
  static generateTabScrollingSystemCSS() {
    return `
/* TAB SCROLLING SYSTEM */
.layera-tabs-scroll-container {
  position: relative;
  overflow: hidden;
}

.layera-tabs-scroll-button {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(90deg, var(--layera-color-background-secondary), transparent);
  border: none;
  cursor: pointer;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--layera-color-text-secondary);
  transition: all var(--layera-transition-fast);
  opacity: 0;
  pointer-events: none;
}

.layera-tabs-scroll-button.layera-scroll-visible {
  opacity: 1;
  pointer-events: all;
}

.layera-tabs-scroll-button:hover {
  background: linear-gradient(90deg, var(--layera-color-primary-50), transparent);
  color: var(--layera-color-primary);
}

.layera-tabs-scroll-left {
  left: 0;
  background: linear-gradient(90deg, var(--layera-color-background-secondary), transparent);
}

.layera-tabs-scroll-right {
  right: 0;
  background: linear-gradient(270deg, var(--layera-color-background-secondary), transparent);
}

.layera-tabs-scroll-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--layera-color-primary);
  transition: all var(--layera-transition-normal);
  border-radius: var(--layera-border-radius-full);
}

.layera-tab-overflow-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 30px;
  pointer-events: none;
  z-index: 12;
}

.layera-tab-overflow-shadow.layera-shadow-left {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent);
}

.layera-tab-overflow-shadow.layera-shadow-right {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.1), transparent);
}

`;
  }
}