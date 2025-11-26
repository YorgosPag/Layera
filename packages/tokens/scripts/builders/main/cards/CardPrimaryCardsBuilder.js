/**
 * CardPrimaryCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για card-primary-cards.html functionality:
 * - Primary Context theming με blue/primary colors και clean design
 * - Clean Components Grid layout χωρίς extra headers (pure grid)
 * - 6 Themed Card variants με focus στο primary card
 * - Primary Features (primary actions, key workflows, main CTAs)
 * - Business Logic styling (core business processes, professional appearance)
 * - Action-Oriented design (save buttons, submit actions, primary workflows)
 * - Professional Design system (clean, business-focused, enterprise-ready)
 * - Primary Animations (smooth, professional, business-appropriate)
 * - Workflow Integration (form flows, data entry, action sequences)
 * - Enterprise Styling (consistent, scalable, maintainable)
 * - Accessibility για business users
 *
 * HTML Reference: html/htmlComponents/main/cards/card-primary-cards.html
 */

export class CardPrimaryCardsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Card Primary Cards functionality
   */
  static generateAllCardPrimaryCardsCSS() {
    let css = '/* === CARD PRIMARY CARDS === */\n\n';

    css += this.generatePrimaryContextCSS();
    css += this.generateCleanComponentsGridCSS();
    css += this.generatePrimaryCardsCSS();
    css += this.generatePrimaryFeaturesCSS();
    css += this.generateBusinessLogicCSS();
    css += this.generateActionOrientedCSS();
    css += this.generateProfessionalDesignCSS();
    css += this.generatePrimaryAnimationsCSS();
    css += this.generateWorkflowIntegrationCSS();
    css += this.generatePrimaryResponsiveCSS();
    css += this.generatePrimaryAccessibilityCSS();

    return css;
  }

  /**
   * Primary Context - Primary theming και clean styling
   */
  static generatePrimaryContextCSS() {
    return `/* PRIMARY CONTEXT STYLES */
.layera-primary-context {
  background: linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%);
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  margin: var(--layera-space-4) 0;
  position: relative;
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.layera-primary-context::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-primary) 0%, #5ba3f5 100%);
  border-radius: var(--layera-radius-lg) var(--layera-radius-lg) 0 0;
}

.layera-primary-banner {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-md);
  margin: var(--layera-space-3) 0;
  text-align: center;
  font-weight: var(--layera-weight-semibold);
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
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: layera-primary-shine 3s ease-in-out infinite;
}

.layera-primary-badge {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-full);
  font-size: var(--layera-text-xs);
  font-weight: var(--layera-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
}

.layera-primary-header {
  color: var(--layera-color-primary);
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  margin-bottom: var(--layera-space-4);
  text-align: center;
  padding: var(--layera-space-3);
  background: rgba(74, 144, 226, 0.08);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(74, 144, 226, 0.15);
}

`;
  }

  /**
   * Clean Components Grid - Καθαρό grid layout
   */
  static generateCleanComponentsGridCSS() {
    return `/* CLEAN COMPONENTS GRID STYLES */
.layera-clean-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--layera-space-4);
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.layera-primary-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--layera-space-4);
  padding: var(--layera-space-4);
  background: linear-gradient(135deg, #fafcff 0%, #f0f7ff 100%);
  border: 1px solid rgba(74, 144, 226, 0.15);
  border-radius: var(--layera-radius-lg);
  position: relative;
}

.layera-primary-components-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-primary);
  border-radius: var(--layera-radius-lg) var(--layera-radius-lg) 0 0;
}

.layera-minimal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--layera-space-3);
  padding: var(--layera-space-2);
  background: transparent;
  border: none;
}

.layera-enterprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--layera-space-5);
  padding: var(--layera-space-6);
  background: var(--layera-color-surface);
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-xl);
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.layera-grid-auto-flow {
  grid-auto-flow: dense;
  align-items: start;
}

.layera-grid-equal-height .layera-card-item {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layera-grid-equal-height .layera-card-item > *:last-child {
  margin-top: auto;
}

`;
  }

  /**
   * Primary Cards - Primary-focused card styling
   */
  static generatePrimaryCardsCSS() {
    return `/* PRIMARY CARDS STYLES */
.layera-primary-card {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
  transition: all 0.3s var(--layera-transition-smooth);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-left: 4px solid var(--layera-color-primary);
  position: relative;
  overflow: hidden;
}

.layera-primary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(74, 144, 226, 0.2);
  border-color: var(--layera-color-primary);
}

.layera-primary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-primary);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-primary-card-featured {
  border: 2px solid var(--layera-color-primary);
  background: linear-gradient(135deg, var(--layera-color-surface) 0%, rgba(74, 144, 226, 0.02) 100%);
  position: relative;
}

.layera-primary-card-featured::after {
  content: 'FEATURED';
  position: absolute;
  top: var(--layera-space-2);
  right: var(--layera-space-2);
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-xs);
  font-weight: var(--layera-weight-bold);
}

.layera-primary-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-3);
  padding-bottom: var(--layera-space-2);
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
}

.layera-primary-card-title {
  color: var(--layera-color-primary);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin: 0;
}

.layera-primary-card-icon {
  width: 24px;
  height: 24px;
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border-radius: var(--layera-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-bold);
}

.layera-primary-card-content {
  margin-bottom: var(--layera-space-3);
  line-height: var(--layera-leading-relaxed);
}

.layera-primary-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--layera-space-2);
  margin-top: auto;
}

`;
  }

  /**
   * Primary Features - Primary actions και key functionality
   */
  static generatePrimaryFeaturesCSS() {
    return `/* PRIMARY FEATURES STYLES */
.layera-primary-action {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border: none;
  padding: var(--layera-space-3) var(--layera-space-5);
  border-radius: var(--layera-radius-md);
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
  min-width: 140px;
  justify-content: center;
}

.layera-primary-action:hover {
  background: #3d7bc6;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
}

.layera-primary-action:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(74, 144, 226, 0.2);
}

.layera-primary-action:disabled {
  background: var(--layera-color-disabled);
  color: var(--layera-color-on-disabled);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.layera-primary-action-large {
  padding: var(--layera-space-4) var(--layera-space-6);
  font-size: var(--layera-text-lg);
  min-width: 180px;
}

.layera-primary-action-small {
  padding: var(--layera-space-2) var(--layera-space-3);
  font-size: var(--layera-text-sm);
  min-width: 100px;
}

.layera-primary-input {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-radius: var(--layera-radius-sm);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-base);
  font-family: inherit;
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  box-sizing: border-box;
}

.layera-primary-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  background: var(--layera-color-surface);
}

.layera-primary-input::placeholder {
  color: rgba(74, 144, 226, 0.6);
  font-weight: var(--layera-weight-medium);
}

.layera-primary-input.featured {
  border-color: var(--layera-color-primary);
  background: rgba(74, 144, 226, 0.02);
}

.layera-primary-workflow {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
  padding: var(--layera-space-4);
  background: rgba(74, 144, 226, 0.05);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(74, 144, 226, 0.2);
}

.layera-primary-workflow-step {
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
  padding: var(--layera-space-2);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-primary-workflow-step:hover {
  background: rgba(74, 144, 226, 0.08);
  border-radius: var(--layera-radius-sm);
}

.layera-primary-workflow-number {
  width: 32px;
  height: 32px;
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--layera-weight-bold);
  flex-shrink: 0;
}

`;
  }

  /**
   * Business Logic - Core business functionality styling
   */
  static generateBusinessLogicCSS() {
    return `/* BUSINESS LOGIC STYLES */
.layera-business-container {
  background: var(--layera-color-surface);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-5);
  margin: var(--layera-space-4) 0;
  position: relative;
}

.layera-business-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-4);
  padding-bottom: var(--layera-space-3);
  border-bottom: 2px solid rgba(74, 144, 226, 0.1);
}

.layera-business-title {
  color: var(--layera-color-primary);
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin: 0;
}

.layera-business-subtitle {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-normal);
  margin-top: var(--layera-space-1);
}

.layera-business-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--layera-space-3);
  margin: var(--layera-space-4) 0;
}

.layera-business-metric {
  background: rgba(74, 144, 226, 0.05);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  text-align: center;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-business-metric:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
  border-color: var(--layera-color-primary);
}

.layera-business-metric-value {
  font-size: var(--layera-text-2xl);
  font-weight: var(--layera-weight-bold);
  color: var(--layera-color-primary);
  display: block;
  margin-bottom: var(--layera-space-1);
}

.layera-business-metric-label {
  font-size: var(--layera-text-sm);
  color: var(--layera-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: var(--layera-weight-medium);
}

.layera-business-process {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.03) 0%, rgba(74, 144, 226, 0.08) 100%);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  margin: var(--layera-space-3) 0;
}

.layera-business-process-steps {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-2);
}

.layera-business-step {
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
  padding: var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-business-step:hover {
  background: rgba(74, 144, 226, 0.1);
}

.layera-business-step.active {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
}

.layera-business-step-icon {
  width: 28px;
  height: 28px;
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-bold);
  flex-shrink: 0;
}

.layera-business-step.active .layera-business-step-icon {
  background: var(--layera-color-on-primary);
  color: var(--layera-color-primary);
}

`;
  }

  /**
   * Action-Oriented - Save, submit, primary CTAs
   */
  static generateActionOrientedCSS() {
    return `/* ACTION-ORIENTED STYLES */
.layera-action-toolbar {
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
  padding: var(--layera-space-3);
  background: rgba(74, 144, 226, 0.05);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(74, 144, 226, 0.15);
  margin: var(--layera-space-3) 0;
}

.layera-action-group {
  display: flex;
  gap: var(--layera-space-2);
  align-items: center;
}

.layera-action-primary {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border: none;
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-semibold);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-2);
  position: relative;
  overflow: hidden;
}

.layera-action-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.layera-action-primary:hover::before {
  left: 100%;
}

.layera-action-primary:hover {
  background: #3d7bc6;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.layera-action-secondary {
  background: transparent;
  color: var(--layera-color-primary);
  border: 2px solid var(--layera-color-primary);
  padding: var(--layera-space-2) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-medium);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-action-secondary:hover {
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  transform: translateY(-1px);
}

.layera-action-ghost {
  background: rgba(74, 144, 226, 0.1);
  color: var(--layera-color-primary);
  border: 1px solid transparent;
  padding: var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-weight-medium);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
}

.layera-action-ghost:hover {
  background: rgba(74, 144, 226, 0.2);
  border-color: rgba(74, 144, 226, 0.3);
}

.layera-action-urgent {
  background: linear-gradient(135deg, var(--layera-color-primary) 0%, #3d7bc6 100%);
  color: var(--layera-color-on-primary);
  border: none;
  padding: var(--layera-space-3) var(--layera-space-5);
  border-radius: var(--layera-radius-md);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-bold);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  animation: layera-primary-pulse 2s ease-in-out infinite;
  box-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
}

.layera-action-urgent:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(74, 144, 226, 0.4);
}

.layera-action-set {
  display: flex;
  background: var(--layera-color-surface);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-md);
  overflow: hidden;
}

.layera-action-set .layera-action-primary,
.layera-action-set .layera-action-secondary {
  border-radius: 0;
  border: none;
  border-right: 1px solid rgba(74, 144, 226, 0.2);
}

.layera-action-set .layera-action-primary:last-child,
.layera-action-set .layera-action-secondary:last-child {
  border-right: none;
}

`;
  }

  /**
   * Professional Design - Clean, business styling
   */
  static generateProfessionalDesignCSS() {
    return `/* PROFESSIONAL DESIGN STYLES */
.layera-professional-layout {
  background: var(--layera-color-background);
  padding: var(--layera-space-6);
  margin: var(--layera-space-4) 0;
  border-radius: var(--layera-radius-lg);
  border: 1px solid var(--layera-color-border);
  position: relative;
}

.layera-professional-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-5);
  padding-bottom: var(--layera-space-3);
  border-bottom: 1px solid var(--layera-color-border);
}

.layera-professional-title {
  color: var(--layera-color-text);
  font-size: var(--layera-text-2xl);
  font-weight: var(--layera-weight-bold);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
}

.layera-professional-logo {
  width: 40px;
  height: 40px;
  background: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
  border-radius: var(--layera-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--layera-weight-bold);
  font-size: var(--layera-text-lg);
}

.layera-professional-nav {
  display: flex;
  gap: var(--layera-space-4);
  align-items: center;
}

.layera-professional-nav-item {
  color: var(--layera-color-text-muted);
  text-decoration: none;
  font-weight: var(--layera-weight-medium);
  padding: var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-professional-nav-item:hover,
.layera-professional-nav-item.active {
  color: var(--layera-color-primary);
  background: rgba(74, 144, 226, 0.1);
}

.layera-professional-content {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-4);
}

.layera-professional-section {
  background: var(--layera-color-surface);
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-professional-section:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border-color: rgba(74, 144, 226, 0.3);
}

.layera-professional-section-title {
  color: var(--layera-color-primary);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  margin: 0 0 var(--layera-space-3) 0;
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-professional-section-content {
  color: var(--layera-color-text);
  line-height: var(--layera-leading-relaxed);
}

.layera-professional-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--layera-space-5);
  padding-top: var(--layera-space-3);
  border-top: 1px solid var(--layera-color-border);
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
}

.layera-professional-branding {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  color: var(--layera-color-primary);
  font-weight: var(--layera-weight-semibold);
}

`;
  }

  /**
   * Primary Animations - Smooth, professional animations
   */
  static generatePrimaryAnimationsCSS() {
    return `/* PRIMARY ANIMATIONS */
@keyframes layera-primary-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes layera-primary-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 6px 25px rgba(74, 144, 226, 0.4);
  }
}

@keyframes layera-primary-fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-primary-slide-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-primary-scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.layera-primary-animated {
  animation: layera-primary-fade-in 0.5s var(--layera-transition-smooth);
}

.layera-primary-slide {
  animation: layera-primary-slide-up 0.6s var(--layera-transition-smooth);
}

.layera-primary-scale {
  animation: layera-primary-scale-in 0.4s var(--layera-transition-smooth);
}

.layera-primary-stagger .layera-primary-card:nth-child(1) { animation-delay: 0.1s; }
.layera-primary-stagger .layera-primary-card:nth-child(2) { animation-delay: 0.2s; }
.layera-primary-stagger .layera-primary-card:nth-child(3) { animation-delay: 0.3s; }
.layera-primary-stagger .layera-primary-card:nth-child(4) { animation-delay: 0.4s; }
.layera-primary-stagger .layera-primary-card:nth-child(5) { animation-delay: 0.5s; }
.layera-primary-stagger .layera-primary-card:nth-child(6) { animation-delay: 0.6s; }

.layera-primary-loading {
  position: relative;
  pointer-events: none;
  opacity: 0.7;
}

.layera-primary-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid rgba(74, 144, 226, 0.3);
  border-top: 2px solid var(--layera-color-primary);
  border-radius: 50%;
  animation: layera-primary-loading-spin 1s linear infinite;
}

@keyframes layera-primary-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
  }

  /**
   * Workflow Integration - Form flows, sequences
   */
  static generateWorkflowIntegrationCSS() {
    return `/* WORKFLOW INTEGRATION STYLES */
.layera-workflow-container {
  background: var(--layera-color-surface);
  border: 1px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-5);
  margin: var(--layera-space-4) 0;
}

.layera-workflow-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-4);
  position: relative;
}

.layera-workflow-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(74, 144, 226, 0.2);
  z-index: 0;
}

.layera-workflow-step {
  width: 40px;
  height: 40px;
  background: var(--layera-color-background);
  border: 3px solid rgba(74, 144, 226, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--layera-weight-bold);
  color: var(--layera-color-text-muted);
  position: relative;
  z-index: 1;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-workflow-step.active {
  background: var(--layera-color-primary);
  border-color: var(--layera-color-primary);
  color: var(--layera-color-on-primary);
}

.layera-workflow-step.completed {
  background: var(--layera-color-success);
  border-color: var(--layera-color-success);
  color: var(--layera-color-on-success);
}

.layera-workflow-content {
  background: rgba(74, 144, 226, 0.03);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  margin-top: var(--layera-space-4);
}

.layera-workflow-form {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
}

.layera-workflow-field-group {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-2);
}

.layera-workflow-label {
  color: var(--layera-color-primary);
  font-weight: var(--layera-weight-semibold);
  font-size: var(--layera-text-sm);
}

.layera-workflow-input {
  width: 100%;
  padding: var(--layera-space-3);
  border: 2px solid rgba(74, 144, 226, 0.2);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-base);
  transition: all 0.3s var(--layera-transition-smooth);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
}

.layera-workflow-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.layera-workflow-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--layera-space-4);
  gap: var(--layera-space-3);
}

.layera-workflow-navigation {
  display: flex;
  gap: var(--layera-space-2);
}

.layera-workflow-nav-btn {
  padding: var(--layera-space-2) var(--layera-space-4);
  border: 1px solid rgba(74, 144, 226, 0.3);
  background: var(--layera-color-background);
  color: var(--layera-color-primary);
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-workflow-nav-btn:hover {
  background: rgba(74, 144, 226, 0.1);
  border-color: var(--layera-color-primary);
}

.layera-workflow-nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

`;
  }

  /**
   * Primary Responsive - Mobile optimization
   */
  static generatePrimaryResponsiveCSS() {
    return `/* PRIMARY RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-primary-components-grid,
  .layera-clean-components-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-space-3);
    padding: var(--layera-space-3);
  }

  .layera-primary-context {
    padding: var(--layera-space-4);
  }

  .layera-business-metrics {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--layera-space-2);
  }

  .layera-business-metric {
    padding: var(--layera-space-2);
  }

  .layera-business-metric-value {
    font-size: var(--layera-text-xl);
  }

  .layera-action-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: var(--layera-space-2);
  }

  .layera-action-group {
    flex-direction: column;
    width: 100%;
  }

  .layera-action-primary,
  .layera-action-secondary,
  .layera-action-ghost {
    width: 100%;
    justify-content: center;
  }

  .layera-professional-header {
    flex-direction: column;
    gap: var(--layera-space-3);
    align-items: stretch;
  }

  .layera-professional-nav {
    flex-direction: column;
    align-items: stretch;
  }

  .layera-professional-nav-item {
    text-align: center;
  }

  .layera-workflow-progress {
    flex-direction: column;
    gap: var(--layera-space-2);
  }

  .layera-workflow-progress::before {
    display: none;
  }

  .layera-workflow-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .layera-workflow-navigation {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .layera-primary-components-grid,
  .layera-clean-components-grid {
    padding: var(--layera-space-2);
    gap: var(--layera-space-2);
  }

  .layera-primary-card {
    padding: var(--layera-space-3);
  }

  .layera-primary-header {
    font-size: var(--layera-text-lg);
    padding: var(--layera-space-2);
  }

  .layera-business-metrics {
    grid-template-columns: 1fr 1fr;
  }

  .layera-business-container,
  .layera-workflow-container {
    padding: var(--layera-space-3);
  }

  .layera-action-primary,
  .layera-action-urgent {
    font-size: var(--layera-text-sm);
    padding: var(--layera-space-2) var(--layera-space-3);
  }

  .layera-professional-layout {
    padding: var(--layera-space-3);
  }

  .layera-professional-title {
    font-size: var(--layera-text-xl);
  }
}

@media (max-width: 320px) {
  .layera-business-metrics {
    grid-template-columns: 1fr;
  }

  .layera-primary-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--layera-space-2);
  }

  .layera-action-set {
    flex-direction: column;
  }

  .layera-action-set .layera-action-primary,
  .layera-action-set .layera-action-secondary {
    border-right: none;
    border-bottom: 1px solid rgba(74, 144, 226, 0.2);
  }

  .layera-action-set .layera-action-primary:last-child,
  .layera-action-set .layera-action-secondary:last-child {
    border-bottom: none;
  }
}

`;
  }

  /**
   * Primary Accessibility - Business user accessibility
   */
  static generatePrimaryAccessibilityCSS() {
    return `/* PRIMARY ACCESSIBILITY STYLES */
.layera-primary-card:focus,
.layera-primary-action:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-primary-input:focus {
  outline: none;
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.layera-workflow-nav-btn:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

.layera-professional-nav-item:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
  border-radius: var(--layera-radius-sm);
}

/* Screen reader support */
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

/* High contrast support */
@media (prefers-contrast: high) {
  .layera-primary-card,
  .layera-business-container,
  .layera-workflow-container {
    border-width: 2px;
  }

  .layera-primary-input,
  .layera-workflow-input {
    border-width: 2px;
  }

  .layera-primary-action,
  .layera-action-primary {
    border: 2px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .layera-primary-animated,
  .layera-primary-slide,
  .layera-primary-scale,
  .layera-primary-pulse,
  .layera-primary-loading::after {
    animation: none;
    transition: none;
  }

  .layera-primary-card:hover,
  .layera-primary-action:hover {
    transform: none;
  }

  .layera-primary-banner::after {
    animation: none;
  }
}

/* Focus management */
.layera-focus-trap {
  position: relative;
}

.layera-focus-trap:focus-within {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
  border-radius: var(--layera-radius-sm);
}

/* Keyboard navigation hints */
.layera-keyboard-hint {
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
  margin-top: var(--layera-space-1);
  font-style: italic;
}

/* ARIA live regions */
.layera-status-live {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

`;
  }
}