/**
 * CSS Build Script για Dynamic Token System
 *
 * Generates CSS files από τα TypeScript tokens
 * ARXES COMPLIANT - includes enterprise layout classes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ENTERPRISE LAYOUT CLASSES - Embedded για build
const LAYERA_LAYOUT_OVERLAY_CLASSES = {
  'layera-layout-fullscreen-overlay': {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '9999',
    background: 'white'
  },
  'layera-layout-close-button': {
    position: 'absolute',
    top: 'var(--layera-space-2)',
    right: 'var(--layera-space-2)',
    background: 'var(--live-danger-color)',
    color: 'white',
    padding: 'var(--layera-space-2)',
    borderRadius: 'var(--live-border-radius)',
    cursor: 'pointer',
    zIndex: '10000',
    border: 'none'
  }
};

const LAYERA_LAYOUT_NAVIGATION_CLASSES = {
  'layera-layout-main-container': {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },
  'layera-layout-flex-container': {
    display: 'flex',
    flex: '1',
    minHeight: '0'
  },
  'layera-layout-sidebar-transition': {
    transition: 'width 0.3s ease',
    overflow: 'hidden'
  },
  'layera-settings-sidebar': {
    width: '280px',
    background: '#34495e',
    color: 'white',
    height: '100vh',
    order: '1'
  }
};

const LAYERA_LAYOUT_UTILITY_CLASSES = {
  'layera-layout-full-width': {
    width: '100%'
  },
  'layera-layout-full-height': {
    height: '100%'
  },
  'layera-layout-bg-primary': {
    background: 'var(--live-primary-color)'
  },
  'layera-layout-bg-white': {
    background: 'white'
  },
  'layera-layout-padding-md': {
    padding: 'var(--layera-space-4)'
  },
  'layera-layout-margin-md': {
    margin: 'var(--layera-space-4)'
  },
  // ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ UTILITY CLASSES - ULTRA HIGH SPECIFICITY
  'layera-center-text': {
    textAlign: 'center !important'
  },
  'layera-force-center': {
    textAlign: 'center !important',
    display: 'block !important',
    margin: '0 auto !important',
    width: '100% !important'
  },
  'layera-ultra-center': {
    textAlign: 'center !important',
    display: 'block !important',
    margin: '0 auto !important',
    width: '100% !important',
    position: 'relative !important'
  },
  'layera-center-flex': {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  },
  'layera-center-flex-column': {
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  },
  'layera-center-content': {
    textAlign: 'center !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    alignItems: 'center !important'
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulate token values για CSS generation
const tokens = {
  colors: {
    '--layera-color-primary': '#4A90E2',
    '--layera-color-secondary': '#9013FE',
    '--layera-color-success': '#4CAF50',
    '--layera-color-warning': '#FF9800',
    '--layera-color-danger': '#F44336',
    '--layera-color-info': '#2196F3'
  },

  live: {
    '--live-primary-color': '#4A90E2',
    '--live-secondary-color': '#9013FE',
    '--live-success-color': '#4CAF50',
    '--live-warning-color': '#FF9800',
    '--live-danger-color': '#F44336',
    '--live-info-color': '#2196F3',
    '--live-component-gap': '16px',
    '--live-padding': '16px',
    '--live-button-padding': '16px',
    '--live-font-size': '16px',
    '--live-border-radius': '8px'
  },

  spacing: {
    '--layera-space-1': '4px',
    '--layera-space-2': '8px',
    '--layera-space-3': '12px',
    '--layera-space-4': '16px',
    '--layera-space-6': '24px',
    '--layera-space-8': '32px'
  },

  // Header-specific tokens από Grok AI
  header: {
    '--layera-color-active-border': '#FBBF24',
    '--layera-color-header-bg': '#4A90E2',
    '--layera-color-header-text': '#ffffff',
    '--layera-color-header-input-bg': 'rgba(255,255,255,0.20)',
    '--layera-color-header-input-border': 'rgba(255,255,255,0.30)',
    '--layera-color-header-toggle-bg': 'rgba(255,255,255,0.15)',
    '--layera-header-height': '56px',
    '--layera-color-btn-size': '32px',
    '--layera-input-height': '36px',
    '--layera-toggle-btn-size': '36px'
  },

  typography: {
    '--layera-font-size-xs': '0.75rem',
    '--layera-font-size-sm': '0.875rem',
    '--layera-font-size-base': '1rem',
    '--layera-font-size-lg': '1.125rem',
    '--layera-font-size-xl': '1.25rem',
    '--layera-font-size-2xl': '1.5rem',
    '--layera-font-weight-normal': '400',
    '--layera-font-weight-medium': '500',
    '--layera-font-weight-semibold': '600',
    '--layera-text-align-center': 'center',
    '--layera-text-align-left': 'left',
    '--layera-text-align-right': 'right'
  },

  radius: {
    '--layera-radius-sm': '4px',
    '--layera-radius-md': '6px',
    '--layera-radius-lg': '8px',
    '--layera-shadow-header': '0 2px 10px rgba(0,0,0,0.12)'
  },

  // Primary Sidebar tokens από Grok AI
  sidebar: {
    '--layera-sidebar-bg': '#2c3e50',
    '--layera-sidebar-text': '#ffffff',
    '--layera-sidebar-menu-item-bg': '#34495e',
    '--layera-sidebar-menu-item-hover': '#3498db',
    '--layera-sidebar-title': '#ecf0f1',
    '--layera-sidebar-input-bg': '#34495e',
    '--layera-sidebar-input-border': 'transparent',
    '--layera-sidebar-width': '250px',
    '--layera-sidebar-primary-width': '250px', // ⚠️ ΜΗΝ ΑΛΛΑΞΕΙΣ ΠΟΤΕ! Πανομοιότυπο με HTML: width: 250px
    '--layera-sidebar-padding': 'var(--layera-space-4)',
    '--layera-sidebar-title-margin': 'var(--layera-space-6)',
    '--layera-sidebar-section-gap': 'var(--layera-space-8)',
    '--layera-menu-item-padding': '0.75rem',
    '--layera-menu-item-margin-bottom': '0.5rem',
    '--layera-menu-item-radius': 'var(--layera-radius-md)'
  }
};

function generateCSS() {
  let css = '/**\n * LAYERA DYNAMIC TOKENS v2.0\n * Generated CSS Variables\n */\n\n:root {\n';

  // Add all token categories
  Object.values(tokens).forEach(category => {
    Object.entries(category).forEach(([name, value]) => {
      css += `  ${name}: ${value};\n`;
    });
  });

  css += '}\n\n';

  // Add component classes που χρησιμοποιούν τα tokens
  css += `/* Button variants */
.layera-button-primary {
  background: var(--live-primary-color);
  color: white;
  border: 1px solid var(--live-primary-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

.layera-button-secondary {
  background: var(--live-secondary-color);
  color: white;
  border: 1px solid var(--live-secondary-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

/* Card variants */
.layera-card-primary {
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid var(--live-primary-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-card-secondary {
  background: rgba(144, 19, 254, 0.1);
  border: 1px solid var(--live-secondary-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

/* Modal variants */
.layera-modal-primary {
  border-left: 4px solid var(--live-primary-color);
  background: white;
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

/* Card variants - ALL 6 COLORS */
.layera-card-success {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid var(--live-success-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-card-warning {
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid var(--live-warning-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-card-danger {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid var(--live-danger-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-card-info {
  background: rgba(33, 150, 243, 0.1);
  border: 1px solid var(--live-info-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

/* Button variants - ALL 6 COLORS */
.layera-button-success {
  background: var(--live-success-color);
  color: white;
  border: 1px solid var(--live-success-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

.layera-button-warning {
  background: var(--live-warning-color);
  color: white;
  border: 1px solid var(--live-warning-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

.layera-button-danger {
  background: var(--live-danger-color);
  color: white;
  border: 1px solid var(--live-danger-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

.layera-button-info {
  background: var(--live-info-color);
  color: white;
  border: 1px solid var(--live-info-color);
  border-radius: var(--live-border-radius);
  padding: var(--live-button-padding);
}

/* Modal variants - ALL 5 COLORS */
.layera-modal-secondary {
  border-left: 4px solid var(--live-secondary-color);
  background: white;
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-modal-success {
  border-left: 4px solid var(--live-success-color);
  background: white;
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-modal-warning {
  border-left: 4px solid var(--live-warning-color);
  background: white;
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

.layera-modal-danger {
  border-left: 4px solid var(--live-danger-color);
  background: white;
  border-radius: var(--live-border-radius);
  padding: var(--live-padding);
}

/* Utility classes */
.layera-gap { gap: var(--live-component-gap); }
.layera-padding { padding: var(--live-padding); }
.layera-font-size { font-size: var(--live-font-size); }

/* Typography utilities */
.layera-margin-bottom--xs { margin-bottom: var(--layera-space-1); }
.layera-margin-bottom--sm { margin-bottom: var(--layera-space-2); }
.layera-margin-bottom--md { margin-bottom: var(--layera-space-4); }
.layera-margin-bottom--lg { margin-bottom: var(--layera-space-6); }
.layera-margin-bottom--xl { margin-bottom: var(--layera-space-8); }

.layera-margin-top--lg { margin-top: var(--layera-space-6); }
.layera-margin-top--xl { margin-top: var(--layera-space-8); }

/* Padding utilities - ΓΙΑ HEADER ΑΚΡΙΒΕΙΑ */
.layera-padding--sm { padding: var(--layera-space-3); }
.layera-padding-header { padding: var(--layera-space-3) var(--layera-space-4); }

/* Profile button - ΠΑΝΟΜΟΙΟΤΥΠΟ με HTML */
.layera-profile-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: var(--layera-space-1) var(--layera-space-2);
  font-size: 0.85rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

/* Flex utilities */
.layera-flex { display: flex; }
.layera-flex--gap-xs { gap: var(--layera-space-1); }
.layera-flex--gap-sm { gap: var(--layera-space-2); }
.layera-flex--gap-md { gap: var(--layera-space-4); }
.layera-flex--justify-between { justify-content: space-between; }
.layera-flex--align-center { align-items: center; }
.layera-flex--grow { flex: 1; }
.layera-flex--wrap { flex-wrap: wrap; }

/* Width utilities */
.layera-width--full { width: 100%; }

/* ============================================= */
/*  HEADER COMPONENT CLASSES από GROK AI        */
/* ============================================= */

.layera-app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: var(--layera-header-height);
  background-color: var(--layera-color-header-bg);
  color: var(--layera-color-header-text);
  box-shadow: var(--layera-shadow-header);
  padding: var(--layera-space-3) var(--layera-space-4);
}

.layera-header-left {
  display: flex;
  align-items: center;
  gap: var(--layera-space-4);
}

.layera-header-title {
  margin: 0;
  font-size: var(--layera-font-size-xl);
  font-weight: var(--layera-font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-header-nav {
  display: flex;
  align-items: center;
  gap: var(--layera-space-3);
}

/* Color Buttons (P S Su W D I) */
.layera-color-btn {
  width: var(--layera-color-btn-size);
  height: var(--layera-color-btn-size);
  border-radius: var(--layera-radius-sm);
  border: none;
  color: #ffffff;
  font-size: var(--layera-font-size-xs);
  font-weight: var(--layera-font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layera-color-btn--primary { background-color: var(--layera-color-primary); }
.layera-color-btn--secondary { background-color: var(--layera-color-secondary); }
.layera-color-btn--success { background-color: var(--layera-color-success); }
.layera-color-btn--warning { background-color: var(--layera-color-warning); }
.layera-color-btn--danger { background-color: var(--layera-color-danger); }
.layera-color-btn--info { background-color: var(--layera-color-info); }

.layera-color-btn--active {
  border: 2px solid var(--layera-color-active-border);
  box-shadow: 0 0 0 2px var(--layera-color-active-border);
  transform: scale(0.95);
}

/* Toggle Buttons (Settings / Palette) */
.layera-toggle-btn {
  width: var(--layera-toggle-btn-size);
  height: var(--layera-toggle-btn-size);
  background-color: var(--layera-color-header-toggle-bg);
  border: 1px solid var(--layera-color-header-input-border);
  border-radius: var(--layera-radius-sm);
  color: var(--layera-color-header-text);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layera-toggle-btn:hover {
  background-color: rgba(255,255,255,0.25);
}

/* Input Fields (Search & Location) */
.layera-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.layera-input-search,
.layera-input-location {
  height: var(--layera-input-height);
  padding: 0 var(--layera-space-4) 0 2.5rem;
  background-color: var(--layera-color-header-input-bg);
  border: 1px solid var(--layera-color-header-input-border);
  border-radius: var(--layera-radius-sm);
  color: var(--layera-color-header-text);
  font-size: var(--layera-font-size-sm);
  outline: none;
  transition: all 0.2s ease;
}

.layera-input-search::placeholder,
.layera-input-location::placeholder {
  color: rgba(255,255,255,0.6);
}

.layera-input-search:focus,
.layera-input-location:focus {
  background-color: rgba(255,255,255,0.30);
}

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

/* Primary Login Button */
.layera-button--primary-sidebar {
  background-color: var(--layera-color-primary);
  color: white;
  justify-content: center;
  font-weight: var(--layera-font-weight-semibold);
  width: 100%; /* ✅ ΑΚΡΙΒΩΣ όπως HTML: width: 100% - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

.layera-button--primary-sidebar:hover {
  background-color: var(--layera-color-primary);
  opacity: 0.9;
}

/* Input styling για Sidebar */
/* ⚠️ ΣΗΜΕΙΩΣΗ: ΜΗΝ ΑΛΛΑΞΕΙΣ ΑΥΤΑ ΤΑ INPUT FIELDS! */
/* Έχουν πανομοιότυπο μέγεθος και styling με την HTML εφαρμογή */
.layera-input--sidebar {
  width: 100%;              /* ✅ Ακριβώς όπως HTML: width: 100% */
  padding: 0.5rem;          /* ✅ Ακριβώς όπως HTML: padding: 0.5rem */
  background-color: white;  /* ✅ Λευκό φόντο όπως HTML */
  border: none;             /* ✅ Χωρίς border όπως HTML */
  border-radius: 4px;       /* ✅ Ακριβώς όπως HTML: border-radius: 4px */
  color: black;             /* ✅ Μαύρο κείμενο για λευκό φόντο */
  font-family: Arial, sans-serif;  /* ✅ Ακριβώς όπως HTML body */
  font-size: 16px;          /* ✅ Default browser size όπως HTML */
  outline: none;
  box-sizing: border-box;
}

.layera-input--sidebar::placeholder {
  color: rgba(0, 0, 0, 0.6); /* ✅ Σκούρα placeholders για λευκό φόντο - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

.layera-input--sidebar-container {
  margin-bottom: 0.5rem; /* ✅ Spacing ακριβώς όπως HTML - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

.layera-input--sidebar-filter {
  margin-bottom: 1rem; /* ✅ Filter input έχει περισσότερο spacing - ΜΗΝ ΑΛΛΑΞΕΙΣ! */
}

/* Sidebar h3 - ΑΚΡΙΒΩΣ όπως HTML */
.sidebar-h3 {
  margin-bottom: 1rem; /* ✅ Ακριβώς όπως HTML: margin-bottom: 1rem */
  color: #ecf0f1;      /* ✅ Ακριβώς όπως HTML: color: #ecf0f1 */
}

.sidebar-h3-second {
  margin-bottom: 1rem; /* ✅ Ακριβώς όπως HTML: margin-bottom: 1rem */
  margin-top: 2rem;    /* ✅ Ακριβώς όπως HTML: margin-top: 2rem */
  color: #ecf0f1;      /* ✅ Ακριβώς όπως HTML: color: #ecf0f1 */
}

/* ============================================= */
/*  FULL APP LAYOUT – CLEAN GROK (ARXES FIXED) */
/*  Χρησιμοποιεί ΜΟΝΟ υπάρχουσες --layera-* vars */
/* ============================================= */

.layera-header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layera-color-btn-group {
  display: flex;
  gap: var(--layera-space-2);
}

/* App Layout Container */
.layera-app-layout {
  display: flex;
  height: calc(100vh - var(--layera-header-height));
  margin-top: var(--layera-header-height);
}

/* Secondary Sidebars */
.layera-sidebar-secondary {
  width: 0;
  background-color: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  transition: width 0.3s ease;
  overflow: hidden;
  padding: 0;
  flex-shrink: 0;
  order: 1;
}

.layera-sidebar-secondary--open {
  width: var(--layera-sidebar-width);
  padding: var(--layera-space-4);
}

.layera-sidebar-secondary--right {
  order: 3;
}

/* Main Content */
.layera-main-content {
  flex: 1;
  padding: var(--layera-space-4);
  background-color: white;
  overflow-y: auto;
  order: 2;
}

/* Tabs System */
.layera-tabs {
  display: flex;
  gap: 0;
  margin-bottom: var(--layera-space-4);
  overflow-x: auto;
}

.layera-tab {
  padding: var(--layera-space-3) var(--layera-space-4);
  background-color: var(--layera-sidebar-title);
  color: var(--layera-sidebar-bg);
  border-radius: var(--layera-radius-sm) var(--layera-radius-sm) 0 0;
  font-weight: var(--layera-font-weight-medium);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layera-tab--active {
  background-color: white;
  font-weight: var(--layera-font-weight-semibold);
}

.layera-tab--primary--active {
  border-bottom: 3px solid var(--layera-color-primary);
  color: var(--layera-color-primary);
}
.layera-tab--secondary--active {
  border-bottom: 3px solid var(--layera-color-secondary);
  color: var(--layera-color-secondary);
}
.layera-tab--success--active {
  border-bottom: 3px solid var(--layera-color-success);
  color: var(--layera-color-success);
}
.layera-tab--warning--active {
  border-bottom: 3px solid var(--layera-color-warning);
  color: var(--layera-color-warning);
}
.layera-tab--danger--active {
  border-bottom: 3px solid var(--layera-color-danger);
  color: var(--layera-color-danger);
}
.layera-tab--info--active {
  border-bottom: 3px solid var(--layera-color-info);
  color: var(--layera-color-info);
}

.layera-tab-panel {
  background-color: white;
  border-radius: 0 var(--layera-radius-sm) var(--layera-radius-sm) var(--layera-radius-sm);
  padding: var(--layera-space-4);
  box-shadow: var(--layera-shadow-header);
}

/* Cards Grid */
.layera-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--layera-space-4);
}

/* Enhanced Cards με inputs */
.layera-card-header {
  padding: var(--layera-space-3);
  border-bottom: 1px solid var(--layera-color-border);
}

.layera-card-content {
  padding: var(--layera-space-4);
}

.layera-card-inputs {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
}

.layera-card-input {
  width: 100%;
  padding: var(--layera-space-2);
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  font-size: var(--layera-font-size-sm);
  outline: none;
  transition: border-color 0.2s ease;
}

.layera-card-input:focus {
  border-color: var(--layera-color-primary);
}

.layera-card-input--primary:focus {
  border-color: var(--layera-color-primary);
}

.layera-card-input--secondary:focus {
  border-color: var(--layera-color-secondary);
}

.layera-card-input--success:focus {
  border-color: var(--layera-color-success);
}

.layera-card-input--warning:focus {
  border-color: var(--layera-color-warning);
}

.layera-card-input--danger:focus {
  border-color: var(--layera-color-danger);
}

.layera-card-input--info:focus {
  border-color: var(--layera-color-info);
}

.layera-card-footer {
  padding: var(--layera-space-3);
  border-top: 1px solid var(--layera-color-border);
}

.layera-card-button {
  width: 100%;
}

/* PRIMARY LAYOUT TAB - Pixel-perfect με HTML mockup */
.layera-primary-heading {
  color: var(--layera-color-primary);
  margin-bottom: var(--layera-space-4);
}

.layera-primary-description {
  color: #555;
  font-size: var(--layera-font-size-sm);
  margin-bottom: var(--layera-space-4);
}

.layera-primary-controls {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
  margin-bottom: var(--layera-space-6);
}

.layera-input--primary {
  border: 1px solid var(--layera-color-primary);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  font-size: var(--layera-font-size-sm);
  outline: none;
  transition: border-color 0.2s ease;
}

.layera-input--primary:focus {
  border-color: var(--layera-color-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.layera-button--primary {
  background-color: var(--layera-color-primary);
  color: white;
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.layera-button--primary:hover {
  opacity: 0.9;
}

/* ALL CARDS STYLING - Pixel-perfect με την εικόνα */
.layera-card--primary {
  border: 2px solid var(--layera-color-primary);
  background-color: #E3F2FD;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--secondary {
  border: 2px solid var(--layera-color-secondary);
  background-color: #F3E5F5;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--success {
  border: 2px solid var(--layera-color-success);
  background-color: #E8F5E8;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--warning {
  border: 2px solid var(--layera-color-warning);
  background-color: #FFF3E0;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--danger {
  border: 2px solid var(--layera-color-danger);
  background-color: #FFEBEE;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--info {
  border: 2px solid var(--layera-color-info);
  background-color: #E1F5FE;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-card--primary:hover,
.layera-card--secondary:hover,
.layera-card--success:hover,
.layera-card--warning:hover,
.layera-card--danger:hover,
.layera-card--info:hover {
  transform: translateY(-2px);
}

/* Card buttons με χρώματα */
.layera-card-button--primary {
  background-color: var(--layera-color-primary);
  color: white;
}

.layera-card-button--secondary {
  background-color: var(--layera-color-secondary);
  color: white;
}

.layera-card-button--success {
  background-color: var(--layera-color-success);
  color: white;
}

.layera-card-button--warning {
  background-color: var(--layera-color-warning);
  color: white;
}

.layera-card-button--danger {
  background-color: var(--layera-color-danger);
  color: white;
}

.layera-card-button--info {
  background-color: var(--layera-color-info);
  color: white;
}

/* Textarea για Warning Card */
.layera-card-textarea {
  resize: vertical;
  min-height: 60px;
}

/* Checkbox container για Danger Card */
.layera-checkbox-container {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
  margin-top: var(--layera-space-2);
}

.layera-checkbox {
  margin-right: var(--layera-space-1);
}

.layera-placeholder-content {
  text-align: center;
  padding: var(--layera-space-8);
  color: #666;
}

/* RIGHT SIDEBAR STYLE CONTROLS */
.layera-control-group {
  margin-bottom: var(--layera-space-6);
  border-bottom: 1px solid var(--layera-color-border);
  padding-bottom: var(--layera-space-4);
}

.layera-control-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.layera-control-group-title {
  color: var(--layera-sidebar-text);
  margin-bottom: var(--layera-space-3);
  font-size: var(--layera-font-size-sm);
}

.layera-color-control {
  margin-bottom: var(--layera-space-2);
}

.layera-color-label {
  display: block;
  margin-bottom: var(--layera-space-1);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-xs);
}

.layera-color-input-group {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-color-picker {
  width: 40px;
  height: 32px;
  border: none;
  border-radius: var(--layera-radius-xs);
  cursor: pointer;
  background: transparent;
}

.layera-color-hex-input {
  flex: 1;
  padding: var(--layera-space-1);
  border: none;
  border-radius: var(--layera-radius-xs);
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-xs);
}

.layera-layout-control {
  margin-bottom: var(--layera-space-2);
}

.layera-range-input {
  width: 100%;
  margin-top: var(--layera-space-1);
  accent-color: var(--layera-color-primary);
}

.layera-preset-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--layera-space-2);
}

.layera-preset-button {
  font-size: var(--layera-font-size-xs);
  padding: var(--layera-space-2);
}

.layera-target-selector {
  margin-bottom: var(--layera-space-3);
}

.layera-target-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--layera-space-1);
  margin-top: var(--layera-space-1);
}

.layera-target-btn {
  padding: var(--layera-space-1);
  border: 1px solid var(--layera-color-border);
  background: transparent;
  color: var(--layera-sidebar-text);
  border-radius: var(--layera-radius-xs);
  font-size: var(--layera-font-size-xs);
}

.layera-target-btn--active {
  border-color: var(--layera-color-primary);
  background: var(--layera-color-primary);
  color: white;
}

.layera-typography-control {
  margin-bottom: var(--layera-space-2);
}

.layera-typography-select {
  width: 100%;
  padding: var(--layera-space-1);
  border: none;
  border-radius: var(--layera-radius-xs);
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-xs);
}

.layera-range-group {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.layera-range-value {
  min-width: 35px;
  color: var(--layera-sidebar-text);
  font-size: var(--layera-font-size-xs);
}

/* Preset Themes Buttons */
.layera-preset-column {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-2);
}

.layera-preset-ocean {
  background: var(--layera-color-primary);
  color: white;
  border: none;
}

.layera-preset-nature {
  background: var(--layera-color-success);
  color: white;
  border: none;
}

.layera-preset-sunset {
  background: var(--layera-color-warning);
  color: white;
  border: none;
}

.layera-preset-royal {
  background: var(--layera-color-secondary);
  color: white;
  border: none;
}

.layera-preset-dark {
  background: #212121;
  color: white;
  border: none;
}

.layera-preset-pastel {
  background: #E1BEE7;
  color: #333;
  border: none;
}

.layera-export-buttons {
  display: flex;
  gap: var(--layera-space-2);
  margin-top: var(--layera-space-4);
}

.layera-export-btn,
.layera-reset-btn {
  flex: 1;
  font-size: var(--layera-font-size-xs);
}

/* Right Sidebar Scrolling */
.layera-sidebar-scrollable {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layera-sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--layera-space-4);
  gap: var(--layera-space-4);
  display: flex;
  flex-direction: column;
}

/* Custom Scrollbar για δεξιά μπάρα */
.layera-sidebar-content::-webkit-scrollbar {
  width: 8px;
}

.layera-sidebar-content::-webkit-scrollbar-track {
  background: var(--layera-color-background-secondary);
  border-radius: var(--layera-radius-sm);
}

.layera-sidebar-content::-webkit-scrollbar-thumb {
  background: var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
}

.layera-sidebar-content::-webkit-scrollbar-thumb:hover {
  background: var(--layera-color-border-hover);
}

/* MAIN CONTENT SCROLLABLE */
.layera-main-scrollable {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.layera-main-content-inner {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: var(--layera-space-4);
  gap: var(--layera-space-4);
  display: flex;
  flex-direction: column;
}

.layera-main-content-inner::-webkit-scrollbar {
  width: 8px;
}

.layera-main-content-inner::-webkit-scrollbar-track {
  background: transparent;
}

.layera-main-content-inner::-webkit-scrollbar-thumb {
  background: var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
}

.layera-main-content-inner::-webkit-scrollbar-thumb:hover {
  background: var(--layera-color-border-hover);
}

/* TAB SYSTEM STYLES */
.layera-tab-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-4);
}

.layera-secondary-layout {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-4);
  padding: var(--layera-space-6);
  background: var(--layera-color-surface);
  border-radius: var(--layera-radius-lg);
}

.layera-secondary-title {
  color: var(--layera-color-secondary);
  margin-bottom: var(--layera-space-4);
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
}

.layera-secondary-text {
  color: var(--layera-color-text-muted);
  font-size: var(--layera-font-size-base);
  margin-bottom: var(--layera-space-4);
}

.layera-secondary-controls {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
  margin-bottom: var(--layera-space-6);
}

.layera-secondary-select {
  border: 1px solid var(--layera-color-secondary);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  font-size: var(--layera-font-size-base);
  background-color: var(--layera-color-surface);
  color: var(--layera-color-text);
}

.layera-secondary-button {
  background-color: var(--layera-color-secondary);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  font-weight: var(--layera-font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.layera-secondary-button:hover {
  opacity: 0.9;
}

/* SECONDARY CARDS STYLES */
.layera-secondary-cards-title {
  background-color: var(--layera-color-secondary);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-4);
}

.layera-secondary-card {
  border: 2px solid var(--layera-color-secondary);
  background-color: #F3E5F5;
  border-radius: var(--layera-radius-md);
  padding: var(--layera-space-4);
  transition: transform 0.3s ease;
}

.layera-secondary-card:hover {
  transform: translateY(-2px);
}

.layera-secondary-inputs {
  display: flex;
  flex-direction: column;
  gap: var(--layera-space-3);
  margin-top: var(--layera-space-3);
}

.layera-secondary-input {
  border: 1px solid var(--layera-color-secondary);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  font-size: var(--layera-font-size-base);
  background-color: var(--layera-color-surface);
  color: var(--layera-color-text);
}

.layera-secondary-search-button {
  background-color: var(--layera-color-secondary);
  color: var(--layera-color-surface);
  width: 100%;
  border-radius: var(--layera-radius-sm);
}

/* SUCCESS CARDS STYLES */
.layera-success-cards-title {
  background-color: var(--layera-color-success);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-4);
}

.layera-card-textarea {
  border: 1px solid var(--layera-color-border);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  font-size: var(--layera-font-size-base);
  background-color: var(--layera-color-surface);
  color: var(--layera-color-text);
  resize: vertical;
  font-family: inherit;
  width: 100%;
}

.layera-card-textarea--primary {
  border-color: var(--layera-color-primary);
}

.layera-card-textarea--danger {
  border-color: var(--layera-color-danger);
}

.layera-card-textarea--info {
  border-color: var(--layera-color-info);
}

.layera-card-textarea--warning {
  border-color: var(--layera-color-warning);
}

/* WARNING CARDS STYLES */
.layera-warning-cards-title {
  background-color: var(--layera-color-warning);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-4);
}

.layera-warning-message {
  background-color: #FFF3CD;
  border: 1px solid var(--layera-color-warning);
  border-radius: var(--layera-radius-sm);
  padding: var(--layera-space-3);
  margin-bottom: var(--layera-space-4);
  text-align: center;
}

.layera-warning-message Text {
  color: #856404;
  font-style: italic;
}

/* DANGER CARDS STYLES */
.layera-danger-cards-title {
  background-color: var(--layera-color-danger);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-4);
}

/* INFO CARDS STYLES */
.layera-info-cards-title {
  background-color: var(--layera-color-info);
  color: var(--layera-color-surface);
  padding: var(--layera-space-3) var(--layera-space-4);
  border-radius: var(--layera-radius-sm);
  margin-bottom: var(--layera-space-4);
}

/* ENTERPRISE LAYOUT CLASSES */
`;

  // Add layout classes από τα TypeScript modules
  const allLayoutClasses = {
    ...LAYERA_LAYOUT_OVERLAY_CLASSES,
    ...LAYERA_LAYOUT_NAVIGATION_CLASSES,
    ...LAYERA_LAYOUT_UTILITY_CLASSES
  };

  Object.entries(allLayoutClasses).forEach(([className, styles]) => {
    css += `.${className} {\n`;
    Object.entries(styles).forEach(([property, value]) => {
      css += `  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};\n`;
    });
    css += '}\n\n';
  });

  // ΚΕΝΤΡΙΚΗ ΣΤΟΙΧΙΣΗ - CLEAN SOLUTION
  css += `
/* THEMES SECTION CENTER ALIGNMENT */
.layera-content-section {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
}

.layera-content-section * {
  text-align: center !important;
}

/* TYPOGRAPHY CLASSES - ΓΙΑ @layera/typography COMPONENTS */
.layera-text-4xl {
  font-size: 2.25rem !important;
  line-height: 2.5rem !important;
}

.layera-text-2xl {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
}

.layera-text-lg {
  font-size: 1.125rem !important;
  line-height: 1.75rem !important;
}

.layera-font-extrabold {
  font-weight: 800 !important;
}

.layera-font-bold {
  font-weight: 700 !important;
}

.layera-text-align-center {
  text-align: center !important;
}

.layera-text-color-primary {
  color: var(--layera-color-primary) !important;
}

.layera-text-color-secondary {
  color: #6b7280 !important;
}

.layera-leading-relaxed {
  line-height: 1.625 !important;
}

`;

  return css;
}

// Create dist directory αν δεν υπάρχει
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate και save CSS
const css = generateCSS();
const cssPath = path.join(distDir, 'tokens.css');
fs.writeFileSync(cssPath, css);

console.log('✅ CSS tokens generated:', cssPath);