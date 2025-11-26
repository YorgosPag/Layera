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
import { SecondarySidebarBuilder } from './builders/SecondarySidebarBuilder.js';
import { CardsExtendedBuilder } from './builders/CardsExtendedBuilder.js';
import { AppLayoutBuilder } from './builders/AppLayoutBuilder.js';
import { HeaderExtendedBuilder } from './builders/HeaderExtendedBuilder.js';
import { FinalLayoutBuilder } from './builders/FinalLayoutBuilder.js';
import { ContentAlignmentBuilder } from './builders/ContentAlignmentBuilder.js';

// Layout Classes νow managed by LayoutBuilder module


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tokens νow managed by TokensBuilder module

function generateCSS() {
  // CLEAN MINIMAL CSS - All content now handled by specialized builders
  let css = `
/* === FULLY MODULARIZED CSS BUILD SYSTEM === */
/* All CSS classes are now handled by specialized enterprise builders */

/* Primary Sidebar Legacy Support */
/* Η κλάση .sidebar ήδη υπάρχει και δουλεύει σωστά - διατηρείται για backward compatibility */

/* All other CSS νow handled by enterprise builder modules */
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

// Generate secondary sidebar CSS using SecondarySidebarBuilder (enterprise modular approach)
const secondarySidebarCSS = SecondarySidebarBuilder.generateAllSecondarySidebarCSS();

// Generate extended cards CSS using CardsExtendedBuilder (enterprise modular approach)
const cardsExtendedCSS = CardsExtendedBuilder.generateAllCardsExtendedCSS();

// Generate app layout CSS using AppLayoutBuilder (enterprise modular approach)
const appLayoutCSS = AppLayoutBuilder.generateAllAppLayoutCSS();

// Generate header extended CSS using HeaderExtendedBuilder (enterprise modular approach)
const headerExtendedCSS = HeaderExtendedBuilder.generateAllHeaderExtendedCSS();

// Generate final layout CSS using FinalLayoutBuilder (enterprise modular approach)
const finalLayoutCSS = FinalLayoutBuilder.generateAllFinalLayoutCSS();

// Generate content alignment CSS using ContentAlignmentBuilder (enterprise modular approach)
const contentAlignmentCSS = ContentAlignmentBuilder.generateAllContentAlignmentCSS();

// Generate raw CSS using RawCSSBuilder (enterprise modular approach)
const rawCSS = RawCSSBuilder.generateAllRawCSS();

// Generate remaining CSS from old function (will be modularized progressively)
const remainingCSS = generateCSS();

// Combine όλα τα enterprise modules
const css = tokensCSS + layoutCSS + componentsCSS + utilitiesCSS + themesCSS + headerCSS + rightSidebarCSS + tabSystemCSS + cardsAdvancedCSS + typographyCSS + settingsCSS + mainContentCSS + primarySidebarCSS + secondarySidebarCSS + cardsExtendedCSS + appLayoutCSS + headerExtendedCSS + finalLayoutCSS + contentAlignmentCSS + rawCSS + remainingCSS;
const cssPath = path.join(distDir, 'tokens.css');
fs.writeFileSync(cssPath, css);

console.log('✅ CSS tokens generated:', cssPath);