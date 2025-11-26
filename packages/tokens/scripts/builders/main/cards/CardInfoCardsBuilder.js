/**
 * CardInfoCardsBuilder - HTML-aligned Enterprise CSS Builder
 *
 * Δημιουργεί CSS για card-info-cards.html functionality:
 * - Info Context theming με blue/information colors
 * - Components Grid layout για 6 themed cards (same as danger cards but info-focused)
 * - 6 Themed Card variants με info styling
 * - Info-specific Features (tooltips, help systems, documentation)
 * - Information Display (data presentation, statistics, metrics)
 * - Help Systems (FAQ integration, search assistance)
 * - Interactive Info (expandable details, collapsible sections)
 * - Info Animations (gentle pulses, fade-ins, smooth transitions)
 * - Knowledge Base integration
 * - Search και filter functionality
 * - Accessibility για screen readers
 *
 * HTML Reference: html/htmlComponents/main/cards/card-info-cards.html
 */

export class CardInfoCardsBuilder {

  /**
   * Δημιουργεί όλα τα CSS για Card Info Cards functionality
   */
  static generateAllCardInfoCardsCSS() {
    let css = '/* === CARD INFO CARDS === */\n\n';

    css += this.generateInfoContextCSS();
    css += this.generateInfoComponentsGridCSS();
    css += this.generateInfoCardsCSS();
    css += this.generateInfoFeaturesCSS();
    css += this.generateInformationDisplayCSS();
    css += this.generateHelpSystemsCSS();
    css += this.generateInteractiveInfoCSS();
    css += this.generateInfoAnimationsCSS();
    css += this.generateKnowledgeBaseCSS();
    css += this.generateInfoResponsiveCSS();
    css += this.generateInfoAccessibilityCSS();

    return css;
  }

  /**
   * Info Context - Info theming και header styling
   */
  static generateInfoContextCSS() {
    return `/* INFO CONTEXT STYLES */
.layera-info-context {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border: 2px solid #90caf9;
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-6);
  margin: var(--layera-space-4) 0;
  position: relative;
}

.layera-info-context::before {
  content: 'ℹ️';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--layera-color-info);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  animation: layera-info-glow 3s ease-in-out infinite;
}

.layera-info-header {
  text-align: center;
  color: var(--layera-color-info);
  margin-bottom: var(--layera-space-4);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-bold);
  padding: var(--layera-space-3);
  background: rgba(33, 150, 243, 0.1);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(33, 150, 243, 0.2);
  position: relative;
}

.layera-info-badge {
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
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

.layera-info-banner {
  background: linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%);
  border: 1px solid var(--layera-color-info);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  margin: var(--layera-space-3) 0;
  color: #0277bd;
  font-weight: var(--layera-weight-medium);
  text-align: center;
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
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: layera-info-shine 3s ease-in-out infinite;
}

`;
  }

  /**
   * Info Components Grid - Grid με info theming
   */
  static generateInfoComponentsGridCSS() {
    return `/* INFO COMPONENTS GRID STYLES */
.layera-info-components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--layera-space-4);
  padding: var(--layera-space-6);
  background: linear-gradient(135deg, #f3f8ff 0%, #e8f4f8 100%);
  border: 1px solid #b3e5fc;
  border-radius: var(--layera-radius-lg);
  position: relative;
}

.layera-info-components-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--layera-color-info) 0%, #03a9f4 100%);
  border-radius: var(--layera-radius-lg) var(--layera-radius-lg) 0 0;
}

.layera-info-grid-header {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--layera-color-info);
  margin-bottom: var(--layera-space-3);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  padding: var(--layera-space-3);
  background: rgba(33, 150, 243, 0.08);
  border-radius: var(--layera-radius-md);
  border: 1px solid rgba(33, 150, 243, 0.15);
}

.layera-info-grid-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(33, 150, 243, 0.05);
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-md);
  margin: var(--layera-space-3) 0;
  grid-column: 1 / -1;
}

.layera-info-stat {
  text-align: center;
  color: var(--layera-color-info);
}

.layera-info-stat-number {
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  display: block;
}

.layera-info-stat-label {
  font-size: var(--layera-text-xs);
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

`;
  }

  /**
   * Info Cards - Card styling με info theming
   */
  static generateInfoCardsCSS() {
    return `/* INFO CARDS STYLES */
.layera-info-card {
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
  transition: all 0.3s var(--layera-transition-smooth);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-left: 4px solid var(--layera-color-info);
  position: relative;
  overflow: hidden;
}

.layera-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.2);
  border-color: var(--layera-color-info);
}

.layera-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--layera-color-info);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-3);
}

.layera-info-card-title {
  color: var(--layera-color-info);
  font-size: var(--layera-text-lg);
  font-weight: var(--layera-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin: 0;
}

.layera-info-card-icon {
  width: 20px;
  height: 20px;
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--layera-text-xs);
}

.layera-info-card-meta {
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
  display: flex;
  align-items: center;
  gap: var(--layera-space-1);
}

.layera-info-card-content {
  margin-bottom: var(--layera-space-3);
  line-height: var(--layera-leading-relaxed);
}

.layera-info-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--layera-space-2);
}

`;
  }

  /**
   * Info Features - Tooltips, help systems, documentation
   */
  static generateInfoFeaturesCSS() {
    return `/* INFO FEATURES STYLES */
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
  color: var(--layera-color-on-info);
  padding: var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-xs);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s var(--layera-transition-smooth);
  z-index: 100;
}

.layera-info-tooltip::after {
  content: '';
  position: absolute;
  bottom: 115%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--layera-color-info);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-tooltip:hover::before,
.layera-info-tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

.layera-info-helptext {
  background: rgba(33, 150, 243, 0.1);
  border: 1px solid rgba(33, 150, 243, 0.3);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-2);
  margin: var(--layera-space-2) 0;
  font-size: var(--layera-text-sm);
  color: #0277bd;
  display: flex;
  align-items: flex-start;
  gap: var(--layera-space-2);
}

.layera-info-helptext-icon {
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-bold);
  flex-shrink: 0;
}

.layera-info-documentation-link {
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
  color: var(--layera-color-info);
  text-decoration: none;
  font-size: var(--layera-text-sm);
  font-weight: var(--layera-weight-medium);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-documentation-link:hover {
  background: rgba(33, 150, 243, 0.1);
  transform: translateX(2px);
}

.layera-info-learn-more {
  background: transparent;
  border: 1px solid var(--layera-color-info);
  color: var(--layera-color-info);
  padding: var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-text-sm);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
  display: inline-flex;
  align-items: center;
  gap: var(--layera-space-1);
  text-decoration: none;
}

.layera-info-learn-more:hover {
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
  transform: translateY(-1px);
}

`;
  }

  /**
   * Information Display - Data presentation, statistics
   */
  static generateInformationDisplayCSS() {
    return `/* INFORMATION DISPLAY STYLES */
.layera-info-display-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--layera-space-3);
  margin: var(--layera-space-3) 0;
}

.layera-info-metric {
  background: var(--layera-color-surface);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  text-align: center;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-metric:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);
  border-color: var(--layera-color-info);
}

.layera-info-metric-value {
  font-size: var(--layera-text-2xl);
  font-weight: var(--layera-weight-bold);
  color: var(--layera-color-info);
  display: block;
  margin-bottom: var(--layera-space-1);
}

.layera-info-metric-label {
  font-size: var(--layera-text-sm);
  color: var(--layera-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layera-info-metric-trend {
  font-size: var(--layera-text-xs);
  margin-top: var(--layera-space-1);
  padding: var(--layera-space-1);
  border-radius: var(--layera-radius-sm);
}

.layera-info-metric-trend.up {
  background: rgba(76, 175, 80, 0.1);
  color: var(--layera-color-success);
}

.layera-info-metric-trend.down {
  background: rgba(244, 67, 54, 0.1);
  color: var(--layera-color-danger);
}

.layera-info-metric-trend.stable {
  background: rgba(33, 150, 243, 0.1);
  color: var(--layera-color-info);
}

.layera-info-chart-placeholder {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%);
  border: 1px dashed rgba(33, 150, 243, 0.3);
  border-radius: var(--layera-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--layera-color-info);
  font-size: var(--layera-text-sm);
  margin: var(--layera-space-3) 0;
}

`;
  }

  /**
   * Help Systems - FAQ, search assistance
   */
  static generateHelpSystemsCSS() {
    return `/* HELP SYSTEMS STYLES */
.layera-help-system {
  background: var(--layera-color-surface);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-md);
  overflow: hidden;
  margin: var(--layera-space-3) 0;
}

.layera-help-header {
  background: rgba(33, 150, 243, 0.1);
  padding: var(--layera-space-3);
  border-bottom: 1px solid rgba(33, 150, 243, 0.2);
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-help-content {
  padding: var(--layera-space-3);
}

.layera-faq-item {
  border-bottom: 1px solid rgba(33, 150, 243, 0.1);
  padding: var(--layera-space-3) 0;
}

.layera-faq-item:last-child {
  border-bottom: none;
}

.layera-faq-question {
  font-weight: var(--layera-weight-semibold);
  color: var(--layera-color-text);
  margin-bottom: var(--layera-space-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.3s var(--layera-transition-smooth);
}

.layera-faq-question:hover {
  color: var(--layera-color-info);
}

.layera-faq-answer {
  color: var(--layera-color-text-muted);
  line-height: var(--layera-leading-relaxed);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s var(--layera-transition-smooth);
}

.layera-faq-item.open .layera-faq-answer {
  max-height: 200px;
}

.layera-faq-toggle {
  color: var(--layera-color-info);
  font-size: var(--layera-text-lg);
  transition: transform 0.3s var(--layera-transition-smooth);
}

.layera-faq-item.open .layera-faq-toggle {
  transform: rotate(180deg);
}

.layera-search-assistance {
  background: rgba(33, 150, 243, 0.05);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  margin: var(--layera-space-3) 0;
}

.layera-search-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--layera-space-2);
  margin-top: var(--layera-space-2);
}

.layera-search-tag {
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
  padding: var(--layera-space-1) var(--layera-space-2);
  border-radius: var(--layera-radius-full);
  font-size: var(--layera-text-xs);
  cursor: pointer;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-search-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

`;
  }

  /**
   * Interactive Info - Expandable details, collapsible sections
   */
  static generateInteractiveInfoCSS() {
    return `/* INTERACTIVE INFO STYLES */
.layera-info-expandable {
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-md);
  overflow: hidden;
  margin: var(--layera-space-3) 0;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-expandable.expanded {
  border-color: var(--layera-color-info);
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
}

.layera-info-expandable-header {
  background: rgba(33, 150, 243, 0.05);
  padding: var(--layera-space-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s var(--layera-transition-smooth);
}

.layera-info-expandable-header:hover {
  background: rgba(33, 150, 243, 0.1);
}

.layera-info-expandable-title {
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin: 0;
}

.layera-info-expandable-icon {
  color: var(--layera-color-info);
  font-size: var(--layera-text-lg);
  transition: transform 0.3s var(--layera-transition-smooth);
}

.layera-info-expandable.expanded .layera-info-expandable-icon {
  transform: rotate(180deg);
}

.layera-info-expandable-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s var(--layera-transition-smooth);
}

.layera-info-expandable.expanded .layera-info-expandable-content {
  max-height: 500px;
}

.layera-info-expandable-body {
  padding: var(--layera-space-3);
  border-top: 1px solid rgba(33, 150, 243, 0.1);
}

.layera-info-collapsible {
  margin: var(--layera-space-2) 0;
}

.layera-info-collapsible-trigger {
  background: none;
  border: none;
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-medium);
  cursor: pointer;
  text-decoration: underline;
  font-size: var(--layera-text-sm);
  transition: color 0.3s var(--layera-transition-smooth);
}

.layera-info-collapsible-trigger:hover {
  color: #1976d2;
}

.layera-info-details {
  background: rgba(33, 150, 243, 0.03);
  border-left: 3px solid var(--layera-color-info);
  padding: var(--layera-space-3);
  margin: var(--layera-space-2) 0;
  border-radius: 0 var(--layera-radius-sm) var(--layera-radius-sm) 0;
  font-size: var(--layera-text-sm);
  line-height: var(--layera-leading-relaxed);
}

`;
  }

  /**
   * Info Animations - Gentle animations για info content
   */
  static generateInfoAnimationsCSS() {
    return `/* INFO ANIMATIONS */
@keyframes layera-info-glow {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
  }
  50% {
    box-shadow: 0 2px 20px rgba(33, 150, 243, 0.3), 0 4px 40px rgba(33, 150, 243, 0.1);
  }
}

@keyframes layera-info-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes layera-info-fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes layera-info-pulse-gentle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@keyframes layera-info-slide-in {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.layera-info-animated {
  animation: layera-info-fade-in 0.5s var(--layera-transition-smooth);
}

.layera-info-pulse {
  animation: layera-info-pulse-gentle 3s ease-in-out infinite;
}

.layera-info-slide {
  animation: layera-info-slide-in 0.6s var(--layera-transition-smooth);
}

.layera-info-card:nth-child(1) { animation-delay: 0.1s; }
.layera-info-card:nth-child(2) { animation-delay: 0.2s; }
.layera-info-card:nth-child(3) { animation-delay: 0.3s; }
.layera-info-card:nth-child(4) { animation-delay: 0.4s; }
.layera-info-card:nth-child(5) { animation-delay: 0.5s; }
.layera-info-card:nth-child(6) { animation-delay: 0.6s; }

.layera-info-loading {
  position: relative;
}

.layera-info-loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid rgba(33, 150, 243, 0.3);
  border-top: 2px solid var(--layera-color-info);
  border-radius: 50%;
  animation: layera-info-loading-spin 1s linear infinite;
}

@keyframes layera-info-loading-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
  }

  /**
   * Knowledge Base - Documentation και knowledge management
   */
  static generateKnowledgeBaseCSS() {
    return `/* KNOWLEDGE BASE STYLES */
.layera-knowledge-base {
  background: var(--layera-color-surface);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-lg);
  padding: var(--layera-space-4);
  margin: var(--layera-space-4) 0;
}

.layera-knowledge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--layera-space-4);
  padding-bottom: var(--layera-space-3);
  border-bottom: 1px solid rgba(33, 150, 243, 0.1);
}

.layera-knowledge-title {
  color: var(--layera-color-info);
  font-size: var(--layera-text-xl);
  font-weight: var(--layera-weight-bold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin: 0;
}

.layera-knowledge-search {
  width: 100%;
  max-width: 300px;
  padding: var(--layera-space-2);
  border: 1px solid rgba(33, 150, 243, 0.3);
  border-radius: var(--layera-radius-sm);
  background: var(--layera-color-background);
  color: var(--layera-color-text);
  font-size: var(--layera-text-sm);
}

.layera-knowledge-search:focus {
  outline: none;
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.layera-knowledge-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--layera-space-3);
  margin-bottom: var(--layera-space-4);
}

.layera-knowledge-category {
  background: rgba(33, 150, 243, 0.05);
  border: 1px solid rgba(33, 150, 243, 0.2);
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-3);
  transition: all 0.3s var(--layera-transition-smooth);
  cursor: pointer;
}

.layera-knowledge-category:hover {
  border-color: var(--layera-color-info);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);
}

.layera-knowledge-category-title {
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-semibold);
  margin-bottom: var(--layera-space-2);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-knowledge-category-description {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
  line-height: var(--layera-leading-relaxed);
}

.layera-knowledge-articles {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-2);
}

.layera-knowledge-article {
  padding: var(--layera-space-3);
  border: 1px solid rgba(33, 150, 243, 0.1);
  border-radius: var(--layera-radius-sm);
  transition: all 0.3s var(--layera-transition-smooth);
  cursor: pointer;
}

.layera-knowledge-article:hover {
  background: rgba(33, 150, 243, 0.05);
  border-color: rgba(33, 150, 243, 0.3);
}

.layera-knowledge-article-title {
  color: var(--layera-color-info);
  font-weight: var(--layera-weight-medium);
  margin-bottom: var(--layera-space-1);
}

.layera-knowledge-article-excerpt {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-text-sm);
  line-height: var(--layera-leading-normal);
}

`;
  }

  /**
   * Info Responsive - Mobile optimization
   */
  static generateInfoResponsiveCSS() {
    return `/* INFO RESPONSIVE STYLES */
@media (max-width: 768px) {
  .layera-info-components-grid {
    grid-template-columns: 1fr;
    gap: var(--layera-space-3);
    padding: var(--layera-space-4);
  }

  .layera-info-context {
    padding: var(--layera-space-4);
  }

  .layera-info-display-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--layera-space-2);
  }

  .layera-info-metric {
    padding: var(--layera-space-2);
  }

  .layera-info-metric-value {
    font-size: var(--layera-text-xl);
  }

  .layera-knowledge-categories {
    grid-template-columns: 1fr;
  }

  .layera-knowledge-header {
    flex-direction: column;
    gap: var(--layera-space-3);
    align-items: stretch;
  }

  .layera-knowledge-search {
    max-width: none;
  }

  .layera-help-system {
    margin: var(--layera-space-2) 0;
  }

  .layera-search-suggestions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .layera-info-components-grid {
    padding: var(--layera-space-3);
    gap: var(--layera-space-2);
  }

  .layera-info-card {
    padding: var(--layera-space-3);
  }

  .layera-info-header {
    font-size: var(--layera-text-base);
    padding: var(--layera-space-2);
  }

  .layera-info-display-grid {
    grid-template-columns: 1fr 1fr;
  }

  .layera-knowledge-base {
    padding: var(--layera-space-3);
  }

  .layera-info-expandable-content {
    font-size: var(--layera-text-sm);
  }

  .layera-faq-question {
    font-size: var(--layera-text-sm);
  }
}

@media (max-width: 320px) {
  .layera-info-display-grid {
    grid-template-columns: 1fr;
  }

  .layera-info-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--layera-space-2);
  }

  .layera-search-suggestions {
    justify-content: flex-start;
  }
}

`;
  }

  /**
   * Info Accessibility - Screen reader και keyboard support
   */
  static generateInfoAccessibilityCSS() {
    return `/* INFO ACCESSIBILITY STYLES */
.layera-info-card:focus {
  outline: 2px solid var(--layera-color-info);
  outline-offset: 2px;
}

.layera-info-expandable-header:focus {
  outline: 2px solid var(--layera-color-info);
  outline-offset: -2px;
}

.layera-faq-question:focus {
  outline: 2px solid var(--layera-color-info);
  outline-offset: 2px;
}

.layera-knowledge-search:focus {
  outline: none;
  border-color: var(--layera-color-info);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.2);
}

.layera-info-tooltip:focus::before,
.layera-info-tooltip:focus::after {
  opacity: 1;
  visibility: visible;
}

/* Screen reader only content */
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

/* High contrast support */
@media (prefers-contrast: high) {
  .layera-info-card,
  .layera-info-expandable,
  .layera-help-system {
    border-width: 2px;
  }

  .layera-info-tooltip::before {
    border: 1px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .layera-info-animated,
  .layera-info-pulse,
  .layera-info-slide,
  .layera-info-card,
  .layera-info-glow,
  .layera-info-loading::after {
    animation: none;
    transition: none;
  }

  .layera-info-card:hover {
    transform: none;
  }

  .layera-info-expandable-icon {
    transition: none;
  }
}

/* Focus management */
.layera-info-skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--layera-color-info);
  color: var(--layera-color-on-info);
  padding: var(--layera-space-2) var(--layera-space-3);
  text-decoration: none;
  border-radius: var(--layera-radius-sm);
  transition: top 0.3s;
  z-index: 1000;
}

.layera-info-skip-link:focus {
  top: 6px;
}

/* Keyboard navigation */
.layera-info-keyboard-hint {
  font-size: var(--layera-text-xs);
  color: var(--layera-color-text-muted);
  margin-top: var(--layera-space-1);
  font-style: italic;
}

`;
  }
}