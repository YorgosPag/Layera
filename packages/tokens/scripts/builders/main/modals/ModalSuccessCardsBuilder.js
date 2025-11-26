/**
 * ModalSuccessCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Γενεράει CSS για modal success cards components
 * Βασισμένο στο: html\htmlComponents\main\modals\modal-success-cards.html
 *
 * ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ:
 * - Success-focused workflows (rewards, badges, completion, reminders, backup, statistics)
 * - Success theming με πράσινη βάση (#4CAF50)
 * - Achievement-focused workflows και celebration patterns
 * - Advanced input types (text, number, select, time, checkbox, email, date)
 * - Success layout με διαφορετική διάταξη των modals
 * - Enterprise achievement patterns
 */

export class ModalSuccessCardsBuilder {
  /**
   * Κύρια μέθοδος γενεραρίας όλου του Modal Success Cards CSS
   */
  static generateAllModalSuccessCardsCSS() {
    let css = '/* === MODAL SUCCESS CARDS === */\n\n';

    css += this.generateSuccessModalContextCSS();
    css += this.generateAchievementWorkflowsCSS();
    css += this.generateSuccessModalComponentsCSS();
    css += this.generateCelebrationPatternsCSS();
    css += this.generateRewardSystemInputsCSS();
    css += this.generateSuccessModalAnimationsCSS();
    css += this.generateAchievementButtonsCSS();
    css += this.generateSuccessModalFormsCSS();
    css += this.generateSuccessModalResponsiveCSS();
    css += this.generateSuccessModalAccessibilityCSS();
    css += this.generateSuccessModalInteractionsCSS();

    return css;
  }

  /**
   * Success Modal Context - Πράσινη θεματική βάση
   */
  static generateSuccessModalContextCSS() {
    return `
/* SUCCESS MODAL CONTEXT */
.layera-success-modal-context {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 2px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-md, 8px);
}

.layera-success-modal-theme {
  --success-primary: var(--layera-colors-green-600, #4CAF50);
  --success-light: var(--layera-colors-green-100, #e8f5e8);
  --success-dark: var(--layera-colors-green-800, #2e7d32);
  --success-text: var(--layera-colors-green-900, #1b5e20);
}

.layera-success-layout-header {
  text-align: center;
  color: var(--layera-colors-green-500, #4CAF50);
  margin-bottom: var(--layera-spacing-lg, 16px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  border-bottom: 2px solid var(--layera-colors-green-200, #c8e6c9);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

`;
  }

  /**
   * Achievement Workflows - Rewards, badges, completion tracking
   */
  static generateAchievementWorkflowsCSS() {
    return `
/* ACHIEVEMENT WORKFLOWS */
.layera-achievement-modal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-spacing-lg, 16px);
  padding: var(--layera-spacing-xl, 24px);
}

/* Reward Modal */
.layera-reward-modal {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid var(--layera-colors-blue-500, #4A90E2);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-reward-modal::before {
  content: "🎁";
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

/* Badge Modal */
.layera-badge-modal {
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
  border: 2px solid var(--layera-colors-purple-500, #9013FE);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-badge-modal::before {
  content: "🏆";
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

/* Task Completion Modal */
.layera-completion-modal {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border: 2px solid var(--layera-colors-green-500, #4CAF50);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-completion-modal::before {
  content: "✅";
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

/* Reminder Modal */
.layera-reminder-modal {
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border: 2px solid var(--layera-colors-orange-500, #FF9800);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-reminder-modal::before {
  content: "⏰";
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

/* Backup Modal */
.layera-backup-modal {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 2px solid var(--layera-colors-red-500, #F44336);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-backup-modal::before {
  content: "💾";
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

/* Statistics Modal */
.layera-statistics-modal {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 2px solid var(--layera-colors-blue-400, #2196F3);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-md, 8px);
  position: relative;
}

.layera-statistics-modal::before {
  content: "📊";
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
   * Success Modal Components - Titles, inputs, buttons
   */
  static generateSuccessModalComponentsCSS() {
    return `
/* SUCCESS MODAL COMPONENTS */
.layera-success-modal-title {
  font-size: var(--layera-typography-size-lg, 18px);
  font-weight: var(--layera-typography-weight-semibold, 600);
  color: var(--layera-colors-green-800, #2e7d32);
  margin-bottom: var(--layera-spacing-md, 8px);
  border-bottom: 2px solid var(--layera-colors-green-200, #c8e6c9);
  padding-bottom: var(--layera-spacing-sm, 4px);
}

.layera-success-modal-content {
  background: var(--layera-colors-white, #ffffff);
  padding: var(--layera-spacing-lg, 16px);
  border-radius: var(--layera-spacing-sm, 4px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.layera-success-modal-footer {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-lg, 16px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-green-200, #c8e6c9);
}

`;
  }

  /**
   * Celebration Patterns - Success animations and celebrations
   */
  static generateCelebrationPatternsCSS() {
    return `
/* CELEBRATION PATTERNS */
.layera-celebration-sparkle {
  position: relative;
  overflow: hidden;
}

.layera-celebration-sparkle::after {
  content: "✨";
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  animation: sparkle 2s infinite;
  opacity: 0.7;
}

@keyframes sparkle {
  0%, 100% { transform: scale(0.8) rotate(0deg); opacity: 0.7; }
  25% { transform: scale(1.2) rotate(90deg); opacity: 1; }
  50% { transform: scale(0.9) rotate(180deg); opacity: 0.8; }
  75% { transform: scale(1.1) rotate(270deg); opacity: 1; }
}

.layera-success-badge-glow {
  position: relative;
}

.layera-success-badge-glow::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #4CAF50, #8BC34A, #4CAF50);
  border-radius: var(--layera-spacing-md, 8px);
  z-index: -1;
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

.layera-achievement-pulse {
  animation: achievementPulse 2s ease-in-out infinite;
}

@keyframes achievementPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

`;
  }

  /**
   * Reward System Inputs - Specialized inputs for achievements
   */
  static generateRewardSystemInputsCSS() {
    return `
/* REWARD SYSTEM INPUTS */
.layera-reward-title {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-points-earned {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-500, #4A90E2);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
  font-weight: var(--layera-typography-weight-bold, 700);
  text-align: right;
}

.layera-badge-selector {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-size: var(--layera-typography-size-base, 14px);
}

.layera-badge-reason {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-purple-500, #9013FE);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-task-completed {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-weight: var(--layera-typography-weight-medium, 500);
}

.layera-completion-time {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-green-500, #4CAF50);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

.layera-reminder-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: var(--layera-spacing-sm, 4px);
  font-weight: var(--layera-typography-weight-medium, 500);
  color: var(--layera-colors-orange-700, #ef6c00);
}

.layera-reminder-checkbox input {
  margin-right: var(--layera-spacing-sm, 4px);
  transform: scale(1.2);
}

.layera-notification-email {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-orange-500, #FF9800);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-backup-type {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-backup-location {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-red-500, #F44336);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
  font-family: monospace;
}

.layera-report-date {
  width: 100%;
  padding: var(--layera-spacing-sm, 4px);
  border: 1px solid var(--layera-colors-blue-400, #2196F3);
  border-radius: var(--layera-spacing-sm, 4px);
  margin-bottom: var(--layera-spacing-sm, 4px);
  background: var(--layera-colors-white, #ffffff);
}

.layera-report-type {
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
   * Success Modal Animations - Smooth success transitions
   */
  static generateSuccessModalAnimationsCSS() {
    return `
/* SUCCESS MODAL ANIMATIONS */
.layera-success-modal-enter {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
  transition: all 0.3s ease-out;
}

.layera-success-modal-enter-active {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.layera-success-modal-exit {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition: all 0.2s ease-in;
}

.layera-success-modal-exit-active {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.layera-success-modal-backdrop {
  background: rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease-out;
}

.layera-success-bounce {
  animation: successBounce 0.6s ease-out;
}

@keyframes successBounce {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); opacity: 0.8; }
  70% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}

`;
  }

  /**
   * Achievement Buttons - Success-themed action buttons
   */
  static generateAchievementButtonsCSS() {
    return `
/* ACHIEVEMENT BUTTONS */
.layera-claim-reward-btn {
  background: var(--layera-colors-blue-500, #4A90E2);
  color: var(--layera-colors-white, #ffffff);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-medium, 500);
  transition: all 0.2s ease;
  margin-right: var(--layera-spacing-xs, 2px);
  position: relative;
  overflow: hidden;
}

.layera-claim-reward-btn:hover {
  background: var(--layera-colors-blue-600, #357abd);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
}

.layera-claim-reward-btn::before {
  content: "🎁";
  margin-right: var(--layera-spacing-xs, 2px);
}

.layera-award-badge-btn {
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

.layera-award-badge-btn:hover {
  background: var(--layera-colors-purple-600, #7b1fa2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(144, 19, 254, 0.4);
}

.layera-mark-complete-btn {
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

.layera-mark-complete-btn:hover {
  background: var(--layera-colors-green-600, #388e3c);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

.layera-set-reminder-btn {
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

.layera-set-reminder-btn:hover {
  background: var(--layera-colors-orange-600, #f57c00);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4);
}

.layera-start-backup-btn {
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

.layera-start-backup-btn:hover {
  background: var(--layera-colors-red-600, #d32f2f);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
}

.layera-generate-report-btn {
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

.layera-generate-report-btn:hover {
  background: var(--layera-colors-blue-500, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(33, 150, 243, 0.4);
}

.layera-success-later-btn,
.layera-success-cancel-btn,
.layera-success-close-btn,
.layera-success-skip-btn {
  background: var(--layera-colors-gray-400, #ccc);
  color: var(--layera-colors-gray-800, #424242);
  border: none;
  padding: var(--layera-spacing-sm, 4px) var(--layera-spacing-md, 8px);
  border-radius: var(--layera-spacing-sm, 4px);
  cursor: pointer;
  font-weight: var(--layera-typography-weight-normal, 400);
  transition: all 0.2s ease;
}

.layera-success-later-btn:hover,
.layera-success-cancel-btn:hover,
.layera-success-close-btn:hover,
.layera-success-skip-btn:hover {
  background: var(--layera-colors-gray-500, #9e9e9e);
  transform: translateY(-1px);
}

`;
  }

  /**
   * Success Modal Forms - Achievement form layout
   */
  static generateSuccessModalFormsCSS() {
    return `
/* SUCCESS MODAL FORMS */
.layera-success-modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-sm, 4px);
}

.layera-success-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-spacing-xs, 2px);
}

.layera-success-form-label {
  font-size: var(--layera-typography-size-sm, 12px);
  font-weight: var(--layera-typography-weight-medium, 500);
  color: var(--layera-colors-green-700, #388e3c);
  margin-bottom: var(--layera-spacing-xs, 2px);
}

.layera-success-form-help {
  font-size: var(--layera-typography-size-xs, 11px);
  color: var(--layera-colors-gray-600, #757575);
  margin-top: var(--layera-spacing-xs, 2px);
}

.layera-success-form-actions {
  display: flex;
  gap: var(--layera-spacing-sm, 4px);
  justify-content: flex-end;
  margin-top: var(--layera-spacing-md, 8px);
  padding-top: var(--layera-spacing-md, 8px);
  border-top: 1px solid var(--layera-colors-green-200, #c8e6c9);
}

`;
  }

  /**
   * Success Modal Responsive - Mobile and tablet adaptations
   */
  static generateSuccessModalResponsiveCSS() {
    return `
/* SUCCESS MODAL RESPONSIVE */
@media (max-width: 768px) {
  .layera-achievement-modal-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-spacing-md, 8px);
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-success-modal-title {
    font-size: var(--layera-typography-size-base, 14px);
  }

  .layera-success-form-actions {
    flex-direction: column;
  }

  .layera-claim-reward-btn,
  .layera-award-badge-btn,
  .layera-mark-complete-btn,
  .layera-set-reminder-btn,
  .layera-start-backup-btn,
  .layera-generate-report-btn,
  .layera-success-later-btn,
  .layera-success-cancel-btn,
  .layera-success-close-btn,
  .layera-success-skip-btn {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--layera-spacing-xs, 2px);
  }

  .layera-reward-modal::before,
  .layera-badge-modal::before,
  .layera-completion-modal::before,
  .layera-reminder-modal::before,
  .layera-backup-modal::before,
  .layera-statistics-modal::before {
    top: -5px;
    right: -5px;
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .layera-success-modal-content {
    padding: var(--layera-spacing-md, 8px);
  }

  .layera-reward-modal,
  .layera-badge-modal,
  .layera-completion-modal,
  .layera-reminder-modal,
  .layera-backup-modal,
  .layera-statistics-modal {
    padding: var(--layera-spacing-md, 8px);
  }
}

`;
  }

  /**
   * Success Modal Accessibility - ARIA and keyboard support
   */
  static generateSuccessModalAccessibilityCSS() {
    return `
/* SUCCESS MODAL ACCESSIBILITY */
.layera-success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(4px);
  z-index: 1000;
}

.layera-success-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  z-index: 1001;
}

.layera-success-modal-focus-trap {
  outline: none;
}

.layera-success-modal-sr-only {
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

.layera-claim-reward-btn:focus,
.layera-award-badge-btn:focus,
.layera-mark-complete-btn:focus,
.layera-set-reminder-btn:focus,
.layera-start-backup-btn:focus,
.layera-generate-report-btn:focus,
.layera-success-later-btn:focus,
.layera-success-cancel-btn:focus,
.layera-success-close-btn:focus,
.layera-success-skip-btn:focus {
  outline: 2px solid var(--layera-colors-green-500, #4CAF50);
  outline-offset: 2px;
}

.layera-reward-title:focus,
.layera-points-earned:focus,
.layera-badge-selector:focus,
.layera-badge-reason:focus,
.layera-task-completed:focus,
.layera-completion-time:focus,
.layera-notification-email:focus,
.layera-backup-type:focus,
.layera-backup-location:focus,
.layera-report-date:focus,
.layera-report-type:focus {
  outline: 2px solid var(--layera-colors-green-500, #4CAF50);
  outline-offset: 1px;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.layera-reminder-checkbox input:focus {
  outline: 2px solid var(--layera-colors-orange-500, #FF9800);
  outline-offset: 2px;
}

`;
  }

  /**
   * Success Modal Interactions - Hover states and success transitions
   */
  static generateSuccessModalInteractionsCSS() {
    return `
/* SUCCESS MODAL INTERACTIONS */
.layera-reward-modal:hover,
.layera-badge-modal:hover,
.layera-completion-modal:hover,
.layera-reminder-modal:hover,
.layera-backup-modal:hover,
.layera-statistics-modal:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
}

.layera-reward-title:hover,
.layera-badge-reason:hover,
.layera-task-completed:hover,
.layera-notification-email:hover,
.layera-backup-location:hover {
  border-color: var(--layera-colors-green-600, #388e3c);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
}

.layera-points-earned:hover {
  border-color: var(--layera-colors-blue-600, #357abd);
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.layera-badge-selector:hover,
.layera-backup-type:hover,
.layera-report-type:hover {
  border-color: var(--layera-colors-purple-600, #7b1fa2);
  box-shadow: 0 2px 8px rgba(144, 19, 254, 0.15);
}

.layera-completion-time:hover,
.layera-report-date:hover {
  border-color: var(--layera-colors-green-600, #388e3c);
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
  font-weight: var(--layera-typography-weight-bold, 700);
}

.layera-reminder-checkbox:hover {
  color: var(--layera-colors-orange-800, #e65100);
  transform: scale(1.02);
}

.layera-success-modal-backdrop:hover {
  backdrop-filter: blur(6px);
}

/* Success Celebration Effects */
.layera-success-celebration:hover {
  animation: celebrate 0.6s ease-out;
}

@keyframes celebrate {
  0% { transform: scale(1); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.05) rotate(-3deg); }
  75% { transform: scale(1.08) rotate(2deg); }
  100% { transform: scale(1) rotate(0deg); }
}

`;
  }
}