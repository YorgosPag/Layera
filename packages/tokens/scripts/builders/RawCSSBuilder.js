/**
 * RawCSSBuilder.js - Enterprise Raw CSS Builder Module
 *
 * Single Responsibility: Μόνο raw CSS strings για τα υπόλοιπα sections
 * ARXES COMPLIANT - μέρος του modular CSS build system
 */

/**
 * Raw Primary Sidebar CSS - Πανομοιότυπο με HTML
 */
export const RAW_PRIMARY_SIDEBAR_CSS = `
/* ============================================= */
/*  PRIMARY SIDEBAR – ΠΑΝΟΜΟΙΟΤΥΠΟ ΜΕ HTML */
/*  Ίδιες CSS κλάσεις και τιμές με primary-sidebar.html */
/* ============================================= */

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 1rem;
  order: 0;
  height: calc(100vh - 65px);
  min-height: calc(100vh - 65px);
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  position: fixed;
  top: 57px;
  left: 0;
  z-index: 999;
}

.sidebar h3 {
  margin-top: 0;    /* ✅ Reset default margin - όπως στο HTML */
  margin-bottom: 1rem;
  color: #ecf0f1;
  font-family: Arial, sans-serif; /* ✅ Ακριβώς όπως HTML: Arial, sans-serif */
}

.menu-item {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #34495e;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-family: Arial, sans-serif; /* ✅ FORCE Arial όπως HTML - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

.menu-item:hover {
  background: #3498db;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.primary-btn {
  background: #4A90E2;
  color: white;
}

.layera-sidebar-title {
  margin: 0 0 var(--layera-sidebar-title-margin);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  color: var(--layera-sidebar-title);
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
}

.layera-sidebar-quick-actions {
  margin-top: var(--layera-sidebar-section-gap);
}

/* Button variants για Sidebar */
.layera-button {
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
  width: 100%;
  padding: var(--layera-menu-item-padding);
  margin-bottom: var(--layera-menu-item-margin-bottom);
  border-radius: var(--layera-menu-item-radius);
  font-size: var(--layera-font-size-base);
  font-weight: var(--layera-font-weight-medium);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
}

/* Menu Item Button (default = outline-like) */
.layera-button--sidebar-menu {
  background-color: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
}

.layera-button--sidebar-menu:hover {
  background-color: var(--layera-sidebar-menu-item-hover);
}

.layera-button--sidebar-menu:focus {
  background-color: var(--layera-sidebar-menu-item-active);
}

/* Primary Login Button */
.layera-button--sidebar-primary {
  background-color: var(--layera-sidebar-primary-bg);
  color: var(--layera-sidebar-primary-text);
  width: 100%; /* ✅ ΑΚΡΙΒΩΣ όπως HTML: width: 100% - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

.layera-button--sidebar-primary:hover {
  background-color: var(--layera-sidebar-primary-hover);
}

/* Input styling για Sidebar */
/* ⚠️ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΑΥΤΑ ΤΑ INPUT FIELDS! */
.layera-input--sidebar {
  width: 100%;
  padding: var(--layera-input-padding);
  margin-bottom: var(--layera-input-margin-bottom);
  background-color: var(--layera-sidebar-input-bg);
  border: 1px solid var(--layera-sidebar-input-border);
  border-radius: var(--layera-input-radius);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-base);
  outline: none;
  transition: border-color 0.2s ease;
}

.layera-input--sidebar:focus {
  border-color: var(--layera-sidebar-input-border-focus);
}

.layera-input--sidebar::placeholder {
  color: var(--layera-sidebar-text-muted);
}

/* Layers list container */
.layers-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--layera-sidebar-input-border);
  border-radius: var(--layera-input-radius);
  background-color: var(--layera-sidebar-input-bg);
  margin-bottom: var(--layera-space-4);
}

.layer-item {
  padding: var(--layera-space-2) var(--layera-space-3);
  border-bottom: 1px solid var(--layera-sidebar-input-border);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layer-item:last-child {
  border-bottom: none;
}

.layer-item:hover {
  background-color: var(--layera-sidebar-menu-item-hover);
}

.layer-item.active {
  background-color: var(--layera-sidebar-menu-item-active);
  color: var(--layera-sidebar-primary-text);
}

/* Visibility toggle for layers */
.layer-visibility {
  width: 16px;
  height: 16px;
  background: transparent;
  border: 2px solid var(--layera-sidebar-text-muted);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.layer-visibility.visible {
  background-color: var(--layera-color-primary);
  border-color: var(--layera-color-primary);
}

.layer-visibility.visible::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 1px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* Export section styling */
.export-section {
  margin-top: var(--layera-sidebar-section-gap);
  padding-top: var(--layera-space-4);
  border-top: 1px solid var(--layera-sidebar-input-border);
}

.export-format {
  display: flex;
  gap: var(--layera-space-2);
  margin-bottom: var(--layera-space-3);
  flex-wrap: wrap;
}

.format-btn {
  padding: var(--layera-space-1) var(--layera-space-3);
  background-color: var(--layera-sidebar-input-bg);
  border: 1px solid var(--layera-sidebar-input-border);
  border-radius: var(--layera-input-radius);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 60px;
  text-align: center;
}

.format-btn:hover {
  background-color: var(--layera-sidebar-menu-item-hover);
}

.format-btn.active {
  background-color: var(--layera-color-primary);
  border-color: var(--layera-color-primary);
  color: white;
}

/* Quality slider styling */
.quality-control {
  margin-bottom: var(--layera-space-4);
}

.quality-label {
  display: block;
  margin-bottom: var(--layera-space-2);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-sm);
  font-weight: var(--layera-font-weight-medium);
}

.quality-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--layera-sidebar-input-border);
  outline: none;
  -webkit-appearance: none;
  margin-bottom: var(--layera-space-2);
}

.quality-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--layera-color-primary);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.quality-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--layera-color-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.quality-value {
  color: var(--layera-sidebar-text-muted);
  font-size: var(--layera-font-size-xs);
  text-align: right;
}

/* Progress bar styling */
.export-progress {
  margin: var(--layera-space-3) 0;
  background-color: var(--layera-sidebar-input-bg);
  border-radius: var(--layera-input-radius);
  height: 8px;
  overflow: hidden;
  border: 1px solid var(--layera-sidebar-input-border);
}

.progress-fill {
  height: 100%;
  background-color: var(--layera-color-primary);
  width: 0%;
  transition: width 0.3s ease;
}

/* Status message styling */
.status-message {
  padding: var(--layera-space-2);
  border-radius: var(--layera-input-radius);
  font-size: var(--layera-font-size-sm);
  text-align: center;
  margin-top: var(--layera-space-3);
}

.status-message.success {
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #4caf50;
}

.status-message.error {
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
}

.status-message.info {
  background-color: rgba(33, 150, 243, 0.1);
  border: 1px solid rgba(33, 150, 243, 0.3);
  color: #2196f3;
}

/* Responsive adjustments για μικρές οθόνες */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    top: auto;
    left: auto;
    z-index: auto;
  }

  .format-btn {
    min-width: 50px;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

  .export-format {
    gap: 0.25rem;
  }
}

/* Loading state styling */
.sidebar.loading {
  opacity: 0.7;
  pointer-events: none;
}

.sidebar.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border: 3px solid var(--layera-sidebar-input-border);
  border-top: 3px solid var(--layera-color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Scrollbar για layers container */
.layers-container::-webkit-scrollbar {
  width: 8px;
}

.layers-container::-webkit-scrollbar-track {
  background: var(--layera-sidebar-input-bg);
  border-radius: 4px;
}

.layers-container::-webkit-scrollbar-thumb {
  background: var(--layera-sidebar-input-border);
  border-radius: 4px;
}

.layers-container::-webkit-scrollbar-thumb:hover {
  background: var(--layera-sidebar-text-muted);
}

/* Tooltip για layer items */
.layer-item[title] {
  position: relative;
}

/* Interactive hover effects για όλα τα στοιχεία */
.layera-button,
.format-btn,
.layer-visibility,
.quality-slider {
  transition: all 0.2s ease;
}

/* Focus styles για accessibility */
.layera-button:focus,
.layera-input--sidebar:focus,
.format-btn:focus,
.quality-slider:focus {
  outline: 2px solid var(--layera-color-primary);
  outline-offset: 2px;
}

/* Card buttons με χρώματα */
.btn-container {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.color-btn {
  flex: 1;
  min-width: 60px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.color-btn.primary { background-color: #4A90E2; }
.color-btn.secondary { background-color: #9013FE; }
.color-btn.success { background-color: #4CAF50; }
.color-btn.warning { background-color: #FF9800; }
.color-btn.danger { background-color: #F44336; }
.color-btn.info { background-color: #2196F3; }

/* Textarea για Warning Card */
.warning-text {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #FF9800;
  background-color: rgba(255, 152, 0, 0.1);
}

/* Checkbox container για Danger Card */
.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #F44336;
}

.checkbox-container label {
  color: #666;
}
`;

/**
 * RawCSSBuilder Class - Enterprise Raw CSS Generation
 */
export class RawCSSBuilder {
  /**
   * Generates Primary Sidebar CSS
   * @returns {string} - Primary sidebar CSS
   */
  static generatePrimarySidebarCSS() {
    return RAW_PRIMARY_SIDEBAR_CSS;
  }

  /**
   * Generates όλες τις Raw CSS sections
   * @returns {string} - Complete raw CSS
   */
  static generateAllRawCSS() {
    let css = '/* === RAW CSS SECTIONS === */\n';

    css += this.generatePrimarySidebarCSS();

    return css;
  }

  /**
   * Validates που το raw CSS είναι έγκυρο
   * @returns {boolean} - true αν είναι έγκυρο
   */
  static validateRawCSS() {
    try {
      // Basic validation - check if CSS strings exist and are not empty
      if (!RAW_PRIMARY_SIDEBAR_CSS || RAW_PRIMARY_SIDEBAR_CSS.trim().length === 0) {
        throw new Error('Primary sidebar CSS is empty or undefined');
      }

      return true;
    } catch (error) {
      console.error('Raw CSS validation failed:', error.message);
      return false;
    }
  }
}

export default RawCSSBuilder;