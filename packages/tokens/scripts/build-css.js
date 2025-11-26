/**
 * CSS Build Script για Dynamic Token System
 *
 * Generates CSS files από τα TypeScript tokens
 * ARXES COMPLIANT - includes enterprise layout classes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TokensBuilder } from './builders/TokensBuilder.js';
import { LayoutBuilder } from './builders/LayoutBuilder.js';
import { ComponentsBuilder } from './builders/ComponentsBuilder.js';
import { UtilityBuilder } from './builders/UtilityBuilder.js';
import { ThemeBuilder } from './builders/ThemeBuilder.js';
import { HeaderBuilder } from './builders/HeaderBuilder.js';
import { RawCSSBuilder } from './builders/RawCSSBuilder.js';
import { RightSidebarBuilder } from './builders/RightSidebarBuilder.js';
import { TabSystemBuilder } from './builders/TabSystemBuilder.js';
import { CardsAdvancedBuilder } from './builders/CardsAdvancedBuilder.js';
import { TypographyBuilder } from './builders/TypographyBuilder.js';
import { SettingsBuilder } from './builders/SettingsBuilder.js';
import { MainContentBuilder } from './builders/MainContentBuilder.js';
import { PrimarySidebarBuilder } from './builders/PrimarySidebarBuilder.js';

// Layout Classes νow managed by LayoutBuilder module


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tokens νow managed by TokensBuilder module

function generateCSS() {
  // MINIMAL CSS - Most content now handled by specialized builders
  let css = `
/* === REMAINING CSS - TO BE MODULARIZED === */

/* Sidebar CSS νow handled by RawCSSBuilder module */
/* Right Sidebar CSS νow handled by RawCSSBuilder module */
/* Settings Sidebar CSS νow handled by RawCSSBuilder module */
/* Typography CSS will be handled by TypographyBuilder module */
/* Main Content CSS will be handled by MainContentBuilder module */

/* TODO: Continue progressive modularization */
/*  Ίδιες CSS κλάσεις και τιμές με primary-sidebar.html */
/* ============================================= */

/* Primary Sidebar CSS νow handled by PrimarySidebarBuilder module */

/* ============================================= */
/*  SECONDARY LEFT SIDEBAR – ΠΑΝΟΜΟΙΟΤΥΠΟ ΜΕ HTML */
/*  Ίδιες CSS κλάσεις και τιμές με secondary-sidebar-left.html */
/* ============================================= */

/* ===== MAIN CONTAINER - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.app-container {
  display: flex;
  height: calc(100vh - var(--layera-header-height));
  min-height: calc(100vh - var(--layera-header-height));
  max-height: calc(100vh - var(--layera-header-height));
  width: 100vw;
  margin-top: var(--layera-header-height);
  overflow: hidden;
}

/* ===== PRIMARY SIDEBAR - ΚΡΑΤΗΜΑ ΤΗΝ ΑΡΧΙΚΗ ΚΛΑΣΗ .sidebar ===== */
/* Η κλάση .sidebar ήδη υπάρχει και δουλεύει σωστά - δεν την αγγίζουμε */

/* ===== SECONDARY LEFT SIDEBAR - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.secondary-sidebar-left {
  flex: 0 0 auto; /* ✅ ΣΗΜΑΝΤΙΚΟ: auto για να δουλεύει το toggle */
  width: 0; /* ✅ Κλειστό by default */
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease; /* ✅ Smooth transition */
  border-left: 1px solid var(--layera-sidebar-menu-item-bg);
  border-right: 1px solid var(--layera-sidebar-menu-item-bg);
  box-sizing: border-box;
  height: calc(100vh - var(--layera-header-height));
  position: relative;
  contain: layout style;
  order: 1; /* ✅ Ανάμεσα στο Primary Sidebar και Main Content */
}

/* ✅ ΚΡΙΣΙΜΟΣ ΚΑΝΟΝΑΣ: Όταν το secondary sidebar ανοίγει */
.secondary-sidebar-left.open {
  width: 280px; /* ✅ Συγκεκριμένο πλάτος όπως στο HTML */
  padding: var(--layera-space-4);
  overflow-y: auto;
  overflow-x: hidden;
}

/* ===== MAIN CONTENT AREA - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
#main-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main-content {
  flex: 1;
  padding: var(--layera-space-4);
  overflow-y: scroll;
  overflow-x: hidden;
  background: white;
  height: calc(100vh - var(--layera-header-height));
  max-height: calc(100vh - var(--layera-header-height));
}

/* ===== RIGHT SECONDARY SIDEBAR - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.secondary-sidebar-right {
  flex: 0 0 auto; /* ✅ ΣΗΜΑΝΤΙΚΟ: auto για να δουλεύει το toggle */
  background: var(--layera-sidebar-bg);
  color: var(--layera-sidebar-text);
  overflow-y: scroll;
  overflow-x: hidden;
  border-left: 1px solid var(--layera-sidebar-menu-item-bg);
  height: 100%;
  position: relative;
  contain: layout style;
}

.sidebar-secondary {
  width: 0;
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  border-left: 1px solid var(--layera-sidebar-menu-item-bg);
  box-sizing: border-box;
  height: calc(100vh - var(--layera-header-height)); /* ✅ Χρήση token για header height */
}

.sidebar-secondary.open {
  width: var(--layera-sidebar-width); /* ✅ Χρήση token αντί για σκληρή τιμή */
  padding: var(--layera-space-4);
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-secondary.left {
  border-left: 1px solid var(--layera-sidebar-menu-item-bg);
  border-right: 1px solid var(--layera-sidebar-menu-item-bg);
  order: 1; /* ✅ Ανάμεσα στο Primary Sidebar και Main Content */
}

.sidebar-secondary::-webkit-scrollbar {
  width: var(--layera-space-2);
}

.sidebar-secondary::-webkit-scrollbar-track {
  background: var(--layera-sidebar-bg);
  border-radius: var(--layera-radius-sm);
}

.sidebar-secondary::-webkit-scrollbar-thumb {
  background: var(--layera-sidebar-menu-item-bg);
  border-radius: var(--layera-radius-sm);
  border: 1px solid var(--layera-sidebar-menu-item-bg);
}

.sidebar-secondary::-webkit-scrollbar-thumb:hover {
  background: var(--layera-sidebar-menu-item-hover);
}

.sidebar-secondary h3 {
  margin-top: 0;
  margin-bottom: var(--layera-space-4);
  color: var(--layera-sidebar-title);
  font-size: var(--layera-font-size-base);
  border-bottom: 1px solid var(--layera-sidebar-menu-item-bg);
  padding-bottom: var(--layera-space-2);
  font-family: Arial, sans-serif; /* ✅ Ακριβώς όπως HTML */
}

.setting-group {
  margin-bottom: var(--layera-space-4);
}

.danger-btn {
  background: var(--layera-color-danger);
  color: var(--layera-sidebar-text);
}

/* ===== SECONDARY SIDEBAR COMPONENTS - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.secondary-sidebar-setting-group {
  margin-bottom: var(--layera-space-4);
}

.secondary-sidebar-label {
  display: block;
  margin-bottom: var(--layera-space-2);
  font-size: var(--layera-font-size-sm);
  color: var(--layera-sidebar-title);
}

.secondary-sidebar-select {
  width: 100%;
  padding: var(--layera-space-2);
  border: none;
  border-radius: var(--layera-radius-sm);
  background: var(--layera-sidebar-input-bg);
  color: var(--layera-sidebar-text);
}

.secondary-sidebar-button-group {
  display: flex;
  gap: var(--layera-space-2);
}

.secondary-sidebar-button {
  flex: 1;
  padding: var(--layera-space-2);
  border: none;
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.secondary-sidebar-button:hover {
  opacity: 0.8;
}

.secondary-sidebar-button--light {
  background: var(--layera-color-primary);
  color: var(--layera-sidebar-text);
}

.secondary-sidebar-button--dark {
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
}

.secondary-sidebar-checkbox-group {
  display: flex;
  align-items: center;
  gap: var(--layera-space-2);
}

.secondary-sidebar-checkbox {
  margin: 0;
}

.secondary-sidebar-checkbox-label {
  font-size: var(--layera-font-size-sm);
  margin: 0;
}

.secondary-sidebar-full-width-button {
  width: 100%;
  margin-top: var(--layera-space-4);
}

/* ===== HEADER COMPONENTS - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--layera-color-header-bg);
  color: var(--layera-color-header-text);
  height: var(--layera-header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--layera-space-4);
  box-shadow: var(--layera-shadow-header);
}

.header-left-section {
  display: flex;
  align-items: center;
  gap: var(--layera-space-4);
}

.header-logo {
  font-size: var(--layera-font-size-lg);
  font-weight: var(--layera-font-weight-semibold);
  margin: 0;
}

.header-buttons-group {
  display: flex;
  gap: var(--layera-space-2);
  margin: 0;
  flex-wrap: wrap;
}

.header-color-button {
  width: var(--layera-color-btn-size);
  height: var(--layera-color-btn-size);
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-color-button:hover {
  border-color: var(--layera-color-header-text);
}

.header-nav {
  display: flex;
  gap: var(--layera-space-4);
  align-items: center;
}

.header-sidebar-toggles {
  display: flex;
  gap: var(--layera-space-2);
  margin-right: var(--layera-space-4);
}

.header-toggle-button {
  background: var(--layera-color-header-toggle-bg);
  color: var(--layera-color-header-text);
  border: none;
  padding: var(--layera-space-2);
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: opacity 0.2s ease;
  font-size: var(--layera-font-size-sm);
}

.header-toggle-button:hover {
  opacity: 0.8;
}

.header-search-container {
  position: relative;
}

.header-search-input {
  background: var(--layera-color-header-input-bg);
  border: 1px solid var(--layera-color-header-input-border);
  color: var(--layera-color-header-text);
  padding: var(--layera-space-2) var(--layera-space-6) var(--layera-space-2) var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  width: 200px;
  outline: none;
}

.header-search-input::placeholder {
  color: var(--layera-color-header-text);
  opacity: 0.7;
}

.header-profile-button {
  background: var(--layera-color-header-toggle-bg);
  color: var(--layera-color-header-text);
  padding: var(--layera-space-2) var(--layera-space-3);
  font-size: var(--layera-font-size-sm);
  border: none;
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.header-profile-button:hover {
  opacity: 0.8;
}

/* ===== PRIMARY SIDEBAR COMPONENTS - ΧΡΗΣΗ TOKENS ΜΟΝΟ ===== */
.primary-sidebar-heading {
  color: var(--layera-sidebar-title);
}

.primary-sidebar-heading--actions {
  color: var(--layera-sidebar-title);
  margin-top: var(--layera-space-8);
}

.primary-sidebar-input {
  padding: var(--layera-space-3);
  border: none;
  border-radius: var(--layera-radius-sm);
  background: var(--layera-sidebar-input-bg);
  color: var(--layera-sidebar-text);
  width: 100%;
}

.primary-sidebar-menu-item {
  background: var(--layera-sidebar-menu-item-bg);
  color: var(--layera-sidebar-text);
  border: none;
  width: 100%;
  text-align: left;
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.primary-sidebar-menu-item--active {
  background: var(--layera-sidebar-menu-item-hover);
}

.primary-sidebar-login-button {
  background: var(--layera-color-primary);
  border: none;
  width: 100%;
  color: var(--layera-sidebar-text);
  padding: var(--layera-space-3);
  border-radius: var(--layera-radius-sm);
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.primary-sidebar-login-button:hover {
  opacity: 0.9;
}

.primary-sidebar-login-input {
  padding: var(--layera-space-3);
  border: none;
  border-radius: var(--live-border-radius);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
  font-size: var(--layera-font-size-sm);
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

/* Right Sidebar CSS νow handled by RightSidebarBuilder module */

/* TAB SYSTEM STYLES νow handled by TabSystemBuilder module */

/* Advanced Cards CSS νow handled by CardsAdvancedBuilder module */

/* ENTERPRISE LAYOUT CLASSES */
`;

  // Layout classes νow handled by LayoutBuilder module

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

/* Typography CSS νow handled by TypographyBuilder module */

/* Settings Sidebar & App Header CSS νow handled by SettingsBuilder module */

/* Main Content CSS νow handled by MainContentBuilder module */

`;

  return css;
}

// Create dist directory αν δεν υπάρχει
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generate tokens CSS using TokensBuilder (enterprise modular approach)
const tokensCSS = TokensBuilder.generateTokensCSS();

// Generate layout CSS using LayoutBuilder (enterprise modular approach)
const layoutCSS = LayoutBuilder.generateAllLayoutCSS();

// Generate components CSS using ComponentsBuilder (enterprise modular approach)
const componentsCSS = ComponentsBuilder.generateAllComponentsCSS();

// Generate utilities CSS using UtilityBuilder (enterprise modular approach)
const utilitiesCSS = UtilityBuilder.generateAllUtilitiesCSS();

// Generate themes CSS using ThemeBuilder (enterprise modular approach)
const themesCSS = ThemeBuilder.generateAllThemesCSS();

// Generate header CSS using HeaderBuilder (enterprise modular approach)
const headerCSS = HeaderBuilder.generateAllHeaderCSS();

// Generate right sidebar CSS using RightSidebarBuilder (enterprise modular approach)
const rightSidebarCSS = RightSidebarBuilder.generateAllRightSidebarCSS();

// Generate tab system CSS using TabSystemBuilder (enterprise modular approach)
const tabSystemCSS = TabSystemBuilder.generateAllTabSystemCSS();

// Generate advanced cards CSS using CardsAdvancedBuilder (enterprise modular approach)
const cardsAdvancedCSS = CardsAdvancedBuilder.generateAllAdvancedCardsCSS();

// Generate typography CSS using TypographyBuilder (enterprise modular approach)
const typographyCSS = TypographyBuilder.generateAllTypographyCSS();

// Generate settings & header CSS using SettingsBuilder (enterprise modular approach)
const settingsCSS = SettingsBuilder.generateAllSettingsCSS();

// Generate main content CSS using MainContentBuilder (enterprise modular approach)
const mainContentCSS = MainContentBuilder.generateAllMainContentCSS();

// Generate primary sidebar CSS using PrimarySidebarBuilder (enterprise modular approach)
const primarySidebarCSS = PrimarySidebarBuilder.generateAllPrimarySidebarCSS();

// Generate raw CSS using RawCSSBuilder (enterprise modular approach)
const rawCSS = RawCSSBuilder.generateAllRawCSS();

// Generate remaining CSS from old function (will be modularized progressively)
const remainingCSS = generateCSS();

// Combine όλα τα enterprise modules
const css = tokensCSS + layoutCSS + componentsCSS + utilitiesCSS + themesCSS + headerCSS + rightSidebarCSS + tabSystemCSS + cardsAdvancedCSS + typographyCSS + settingsCSS + mainContentCSS + primarySidebarCSS + rawCSS + remainingCSS;
const cssPath = path.join(distDir, 'tokens.css');
fs.writeFileSync(cssPath, css);

console.log('✅ CSS tokens generated:', cssPath);