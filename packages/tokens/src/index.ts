/**
 * 🎯 LAYERA DYNAMIC TOKEN SYSTEM v2.0
 *
 * Νέο token system που υποστηρίζει:
 * - Live preview με CSS Variables
 * - Component-specific theming
 * - Real-time updates χωρίς re-renders
 * - Design Control Panel integration
 * - Zero breaking changes με existing components
 *
 * Βασισμένο στη λεπτομερή μελέτη του FullAppPreview_Mockup.html
 * για να αποφύγουμε διπλότυπα μεταβλητών.
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 CORE COLOR TOKENS - 6-Color System από HTML Mockup
// ═══════════════════════════════════════════════════════════════════════════════════════

export * from './core/colors';
export * from './core/spacing';
export * from './core/typography';
export * from './core/borders';
export * from './core/dimensions';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔧 COMPONENT-SPECIFIC TOKENS
// ═══════════════════════════════════════════════════════════════════════════════════════

export * from './component/buttons';
export * from './component/cards';
export * from './component/modals';
export * from './component/tables';
export * from './component/headers';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎭 PRESET THEMES - Από HTML Mockup themes
// ═══════════════════════════════════════════════════════════════════════════════════════

export * from './themes/presets';
export * from './themes/dynamic';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 DYNAMIC SYSTEM - Live theming engine
// ═══════════════════════════════════════════════════════════════════════════════════════

export * from './dynamic/live-variables';
export * from './dynamic/theme-engine';
export * from './dynamic/component-targeting';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📦 UNIFIED TOKEN REGISTRY - Single source of truth
// ═══════════════════════════════════════════════════════════════════════════════════════

export { LAYERA_DYNAMIC_TOKENS } from './registry/tokens-registry';
export type { LayeraDynamicTokenRegistry } from './registry/tokens-registry';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔗 BACKWARD COMPATIBILITY - Συμβατότητα με existing components
// ═══════════════════════════════════════════════════════════════════════════════════════

export * from './legacy/compatibility';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📊 VERSION INFO
// ═══════════════════════════════════════════════════════════════════════════════════════

export const LAYERA_TOKENS_VERSION = '2.0.0';
export const LAYERA_TOKENS_BUILD_DATE = new Date().toISOString();
export const LAYERA_TOKENS_SOURCE = 'Dynamic Token System - FullAppPreview_Mockup.html analysis';