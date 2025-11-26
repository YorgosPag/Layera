/**
 * CSS Build Script για Dynamic Token System
 *
 * Generates CSS files από τα TypeScript tokens
 * ARXES COMPLIANT - includes enterprise layout classes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TokensBuilder } from './builders/core/TokensBuilder.js';
import { LayoutBuilder } from './builders/LayoutBuilder.js';
import { ComponentsBuilder } from './builders/ComponentsBuilder.js';
import { UtilityBuilder } from './builders/core/UtilityBuilder.js';
import { ThemeBuilder } from './builders/core/ThemeBuilder.js';
import { HeaderBuilder } from './builders/header/HeaderBuilder.js';
import { RawCSSBuilder } from './builders/RawCSSBuilder.js';
import { RightSidebarBuilder } from './builders/RightSidebarBuilder.js';
import { TabSystemBuilder } from './builders/TabSystemBuilder.js';
import { CardsAdvancedBuilder } from './builders/CardsAdvancedBuilder.js';
import { TypographyBuilder } from './builders/TypographyBuilder.js';
import { SettingsBuilder } from './builders/SettingsBuilder.js';
import { MainContentBuilder } from './builders/MainContentBuilder.js';
import { PrimarySidebarBuilder } from './builders/sidebar/primary-sidebar/PrimarySidebarBuilder.js';
import { SecondarySidebarBuilder } from './builders/SecondarySidebarBuilder.js';
import { CardsExtendedBuilder } from './builders/CardsExtendedBuilder.js';
import { AppLayoutBuilder } from './builders/AppLayoutBuilder.js';
import { FinalLayoutBuilder } from './builders/FinalLayoutBuilder.js';
import { ContentAlignmentBuilder } from './builders/ContentAlignmentBuilder.js';
import { ColorSystemBuilder } from './builders/sidebar/right-sidebar/ColorSystemBuilder.js';
import { BorderRadiusBuilder } from './builders/sidebar/right-sidebar/BorderRadiusBuilder.js';
import { ApplyToSelectorBuilder } from './builders/sidebar/right-sidebar/ApplyToSelectorBuilder.js';
import { ComponentsBuilder as RightSidebarComponentsBuilder } from './builders/sidebar/right-sidebar/ComponentsBuilder.js';
import { ComponentsBuilder as ScriptsComponentsBuilder } from './builders/scripts/ComponentsBuilder.js';
import { NavigationBuilder } from './builders/scripts/NavigationBuilder.js';
import { TypographyBuilder as ScriptsTypographyBuilder } from './builders/scripts/TypographyBuilder.js';
import { LayoutDangerCardsBuilder } from './builders/main/layout/LayoutDangerCardsBuilder.js';
import { LayoutInfoCardsBuilder } from './builders/main/layout/LayoutInfoCardsBuilder.js';
import { LayoutPrimaryCardsBuilder } from './builders/main/layout/LayoutPrimaryCardsBuilder.js';
import { LayoutSecondaryCardsBuilder } from './builders/main/layout/LayoutSecondaryCardsBuilder.js';
import { LayoutSuccessCardsBuilder } from './builders/main/layout/LayoutSuccessCardsBuilder.js';
import { LayoutTabsBuilder } from './builders/main/layout/LayoutTabsBuilder.js';
import { LayoutWarningCardsBuilder } from './builders/main/layout/LayoutWarningCardsBuilder.js';
import { CardDangerCardsBuilder } from './builders/main/cards/CardDangerCardsBuilder.js';
import { CardInfoCardsBuilder } from './builders/main/cards/CardInfoCardsBuilder.js';
import { CardPrimaryCardsBuilder } from './builders/main/cards/CardPrimaryCardsBuilder.js';
import { CardSecondaryCardsBuilder } from './builders/main/cards/CardSecondaryCardsBuilder.js';
import { CardSuccessCardsBuilder } from './builders/main/cards/CardSuccessCardsBuilder.js';
import { CardWarningCardsBuilder } from './builders/main/cards/CardWarningCardsBuilder.js';
import { CardsTabsBuilder } from './builders/main/cards/CardsTabsBuilder.js';
import { ComponentSizesBuilder } from './builders/sidebar/right-sidebar/ComponentSizesBuilder.js';
import { PresetThemesBuilder } from './builders/sidebar/right-sidebar/PresetThemesBuilder.js';
import { QuickRadiusPresetsBuilder } from './builders/sidebar/right-sidebar/QuickRadiusPresetsBuilder.js';
import { SecondarySidebarRightBuilder } from './builders/sidebar/right-sidebar/SecondarySidebarRightBuilder.js';
import { SpacingLayoutBuilder } from './builders/sidebar/right-sidebar/SpacingLayoutBuilder.js';
import { RightSidebarTypographyBuilder } from './builders/sidebar/right-sidebar/RightSidebarTypographyBuilder.js';
import { SecondarySidebarLeftBuilder } from './builders/sidebar/secondary-sidebar-left/SecondarySidebarLeftBuilder.js';
import { AppCoreBuilder } from './builders/scripts/AppCoreBuilder.js';
import { ColorsBuilder } from './builders/scripts/ColorsBuilder.js';

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

// Generate primary sidebar CSS using PrimarySidebarBuilder (HTML-aligned enterprise modular approach)
const primarySidebarCSS = PrimarySidebarBuilder.generateAllPrimarySidebarCSS();

// Generate secondary sidebar CSS using SecondarySidebarBuilder (enterprise modular approach)
const secondarySidebarCSS = SecondarySidebarBuilder.generateAllSecondarySidebarCSS();

// Generate extended cards CSS using CardsExtendedBuilder (enterprise modular approach)
const cardsExtendedCSS = CardsExtendedBuilder.generateAllCardsExtendedCSS();

// Generate app layout CSS using AppLayoutBuilder (enterprise modular approach)
const appLayoutCSS = AppLayoutBuilder.generateAllAppLayoutCSS();


// Generate final layout CSS using FinalLayoutBuilder (enterprise modular approach)
const finalLayoutCSS = FinalLayoutBuilder.generateAllFinalLayoutCSS();

// Generate content alignment CSS using ContentAlignmentBuilder (enterprise modular approach)
const contentAlignmentCSS = ContentAlignmentBuilder.generateAllContentAlignmentCSS();

// Generate color system CSS using ColorSystemBuilder (enterprise modular approach)
const colorSystemCSS = ColorSystemBuilder.generateAllColorSystemCSS();

// Generate border radius CSS using BorderRadiusBuilder (enterprise modular approach)
const borderRadiusCSS = BorderRadiusBuilder.generateAllBorderRadiusCSS();

// Generate apply to selector CSS using ApplyToSelectorBuilder (enterprise modular approach)
const applyToSelectorCSS = ApplyToSelectorBuilder.generateAllApplyToSelectorCSS();

// Generate components CSS using RightSidebarComponentsBuilder (enterprise modular approach)
const rightSidebarComponentsCSS = RightSidebarComponentsBuilder.generateAllComponentsCSS();

// Generate component sizes CSS using ComponentSizesBuilder (enterprise modular approach)
const componentSizesCSS = ComponentSizesBuilder.generateAllComponentSizesCSS();

// Generate preset themes CSS using PresetThemesBuilder (enterprise modular approach)
const presetThemesCSS = PresetThemesBuilder.generateAllPresetThemesCSS();

// Generate quick radius presets CSS using QuickRadiusPresetsBuilder (enterprise modular approach)
const quickRadiusPresetsCSS = QuickRadiusPresetsBuilder.generateAllQuickRadiusPresetsCSS();

// Generate secondary sidebar right CSS using SecondarySidebarRightBuilder (enterprise modular approach)
const secondarySidebarRightCSS = SecondarySidebarRightBuilder.generateAllSecondarySidebarRightCSS();

// Generate spacing layout CSS using SpacingLayoutBuilder (enterprise modular approach)
const spacingLayoutCSS = SpacingLayoutBuilder.generateAllSpacingLayoutCSS();

// Generate right sidebar typography CSS using RightSidebarTypographyBuilder (enterprise modular approach)
const rightSidebarTypographyCSS = RightSidebarTypographyBuilder.generateAllRightSidebarTypographyCSS();

// Generate secondary sidebar left CSS using SecondarySidebarLeftBuilder (HTML-aligned enterprise modular approach)
const secondarySidebarLeftCSS = SecondarySidebarLeftBuilder.generateAllSecondarySidebarLeftCSS();

// Generate app core JavaScript UI states CSS using AppCoreBuilder (HTML-aligned enterprise modular approach)
const appCoreCSS = AppCoreBuilder.generateAllAppCoreCSS();

// Generate 6-color system JavaScript support CSS using ColorsBuilder (HTML-aligned enterprise modular approach)
const colorsCSS = ColorsBuilder.generateAllColorsCSS();

// Generate component sizes JavaScript support CSS using ScriptsComponentsBuilder (HTML-aligned enterprise modular approach)
const scriptsComponentsCSS = ScriptsComponentsBuilder.generateAllComponentsCSS();

// Generate navigation JavaScript support CSS using NavigationBuilder (HTML-aligned enterprise modular approach)
const navigationCSS = NavigationBuilder.generateAllNavigationCSS();

// Generate typography JavaScript support CSS using ScriptsTypographyBuilder (HTML-aligned enterprise modular approach)
const scriptsTypographyCSS = ScriptsTypographyBuilder.generateAllTypographyCSS();

// Generate layout danger cards CSS using LayoutDangerCardsBuilder (HTML-aligned enterprise modular approach)
const layoutDangerCardsCSS = LayoutDangerCardsBuilder.generateAllLayoutDangerCardsCSS();

// Generate layout info cards CSS using LayoutInfoCardsBuilder (HTML-aligned enterprise modular approach)
const layoutInfoCardsCSS = LayoutInfoCardsBuilder.generateAllLayoutInfoCardsCSS();

// Generate layout primary cards CSS using LayoutPrimaryCardsBuilder (HTML-aligned enterprise modular approach)
const layoutPrimaryCardsCSS = LayoutPrimaryCardsBuilder.generateAllLayoutPrimaryCardsCSS();

// Generate layout secondary cards CSS using LayoutSecondaryCardsBuilder (HTML-aligned enterprise modular approach)
const layoutSecondaryCardsCSS = LayoutSecondaryCardsBuilder.generateAllLayoutSecondaryCardsCSS();

// Generate layout success cards CSS using LayoutSuccessCardsBuilder (HTML-aligned enterprise modular approach)
const layoutSuccessCardsCSS = LayoutSuccessCardsBuilder.generateAllLayoutSuccessCardsCSS();

// Generate layout tabs CSS using LayoutTabsBuilder (HTML-aligned enterprise modular approach)
const layoutTabsCSS = LayoutTabsBuilder.generateAllLayoutTabsCSS();

// Generate layout warning cards CSS using LayoutWarningCardsBuilder (HTML-aligned enterprise modular approach)
const layoutWarningCardsCSS = LayoutWarningCardsBuilder.generateAllLayoutWarningCardsCSS();

// Generate card danger cards CSS using CardDangerCardsBuilder (HTML-aligned enterprise modular approach)
const cardDangerCardsCSS = CardDangerCardsBuilder.generateAllCardDangerCardsCSS();

// Generate card info cards CSS using CardInfoCardsBuilder (HTML-aligned enterprise modular approach)
const cardInfoCardsCSS = CardInfoCardsBuilder.generateAllCardInfoCardsCSS();

// Generate card primary cards CSS using CardPrimaryCardsBuilder (HTML-aligned enterprise modular approach)
const cardPrimaryCardsCSS = CardPrimaryCardsBuilder.generateAllCardPrimaryCardsCSS();

// Generate card secondary cards CSS using CardSecondaryCardsBuilder (HTML-aligned enterprise modular approach)
const cardSecondaryCardsCSS = CardSecondaryCardsBuilder.generateAllCardSecondaryCardsCSS();

// Generate card success cards CSS using CardSuccessCardsBuilder (HTML-aligned enterprise modular approach)
const cardSuccessCardsCSS = CardSuccessCardsBuilder.generateAllCardSuccessCardsCSS();

// Generate card warning cards CSS using CardWarningCardsBuilder (HTML-aligned enterprise modular approach)
const cardWarningCardsCSS = CardWarningCardsBuilder.generateAllCardWarningCardsCSS();

// Generate cards tabs CSS using CardsTabsBuilder (HTML-aligned enterprise modular approach)
const cardsTabsCSS = CardsTabsBuilder.generateAllCardsTabsCSS();

// Generate raw CSS using RawCSSBuilder (enterprise modular approach)
const rawCSS = RawCSSBuilder.generateAllRawCSS();

// Generate remaining CSS from old function (will be modularized progressively)
const remainingCSS = generateCSS();

// Combine όλα τα enterprise modules
const css = tokensCSS + layoutCSS + componentsCSS + utilitiesCSS + themesCSS + headerCSS + rightSidebarCSS + tabSystemCSS + cardsAdvancedCSS + typographyCSS + settingsCSS + mainContentCSS + primarySidebarCSS + secondarySidebarCSS + cardsExtendedCSS + appLayoutCSS + finalLayoutCSS + contentAlignmentCSS + colorSystemCSS + borderRadiusCSS + applyToSelectorCSS + rightSidebarComponentsCSS + componentSizesCSS + presetThemesCSS + quickRadiusPresetsCSS + secondarySidebarRightCSS + spacingLayoutCSS + rightSidebarTypographyCSS + secondarySidebarLeftCSS + appCoreCSS + colorsCSS + scriptsComponentsCSS + navigationCSS + scriptsTypographyCSS + layoutDangerCardsCSS + layoutInfoCardsCSS + layoutPrimaryCardsCSS + layoutSecondaryCardsCSS + layoutSuccessCardsCSS + layoutTabsCSS + layoutWarningCardsCSS + cardDangerCardsCSS + cardInfoCardsCSS + cardPrimaryCardsCSS + cardSecondaryCardsCSS + cardSuccessCardsCSS + cardWarningCardsCSS + cardsTabsCSS + rawCSS + remainingCSS;
const cssPath = path.join(distDir, 'tokens.css');
fs.writeFileSync(cssPath, css);

console.log('✅ CSS tokens generated:', cssPath);