/**
 * 🎯 LAYERA DESIGN TOKENS - MASTER INDEX
 *
 * Centralized export για ΟΛΟ το design token system
 * Μοναδικό entry point για clean imports σε όλη την εφαρμογή
 *
 * Usage:
 * import { BUTTON_VARIABLES, CARD_VARIANTS, ColorComponentSystem } from '@layera/tokens'
 */

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔬 CORE TOKENS - Foundation level (primitives)
// ═══════════════════════════════════════════════════════════════════════════════════════

// Colors - Base color palette & scales
export * from './core/colors';
export { COLOR_VARIABLES, COLOR_VARIANTS } from './core/colors';

// Spacing - 8-point grid system
export * from './core/spacing';
export { SPACING_VARIABLES, SPACING_VARIANTS } from './core/spacing';

// Typography - Font scales, weights, families
export * from './core/typography';
export { TYPOGRAPHY_VARIABLES, TYPOGRAPHY_VARIANTS } from './core/typography';

// Borders - Border widths, radius, styles
export * from './core/borders';
export { BORDER_VARIABLES, BORDER_VARIANTS, BorderSystem } from './core/borders';

// Shadows - Elevation system
export * from './core/shadows';
export { SHADOW_VARIABLES, SHADOW_VARIANTS, ShadowSystem } from './core/shadows';

// Motion - Animation durations, easings
export * from './core/motion';
export { MOTION_VARIABLES, MOTION_VARIANTS, MotionSystem } from './core/motion';

// Dimensions - Size scales, percentages
export * from './core/dimensions';
export { DIMENSION_VARIABLES, DIMENSION_VARIANTS } from './core/dimensions';

// Utilities - Core utility tokens
export * from './core/utilities';
export { UTILITIES_VARIABLES, UTILITY_VARIANTS } from './core/utilities';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 SEMANTIC TOKENS - Meaning level (contextual)
// ═══════════════════════════════════════════════════════════════════════════════════════

// Background - Semantic background colors
export * from './semantic/background';
export { BACKGROUND_VARIABLES, BACKGROUND_VARIANTS, BackgroundSemanticSystem } from './semantic/background';

// Text - Semantic text colors
export * from './semantic/text';
export { TEXT_VARIABLES, TEXT_VARIANTS, TextSemanticSystem } from './semantic/text';

// Border - Semantic border colors & contexts
export * from './semantic/border';
export { BORDER_SEMANTIC_VARIABLES, BORDER_SEMANTIC_VARIANTS, BorderSemanticSystem } from './semantic/border';

// Feedback - Status & state colors
export * from './semantic/feedback';
export { FEEDBACK_SEMANTIC_VARIABLES, FEEDBACK_SEMANTIC_VARIANTS, FeedbackSemanticSystem } from './semantic/feedback';

// Utilities - Semantic utility tokens
export * from './semantic/utilities';
export { UTILITY_SEMANTIC_VARIABLES, UTILITY_SEMANTIC_VARIANTS, UtilitySemanticSystem } from './semantic/utilities';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🧩 COMPONENT TOKENS - Component level (specific)
// ═══════════════════════════════════════════════════════════════════════════════════════

// Buttons - Complete button system
export * from './component/buttons';
export { BUTTON_VARIABLES, BUTTON_VARIANTS, ButtonComponentSystem } from './component/buttons';

// Cards - Card component system
export * from './component/cards';
export { CARD_VARIABLES, CARD_VARIANTS, CardComponentSystem } from './component/cards';

// Inputs - Form input system
export * from './component/inputs';
export { INPUT_VARIABLES, INPUT_VARIANTS, InputComponentSystem } from './component/inputs';

// Navigation - Navigation system
export * from './component/navigation';
export { NAVIGATION_VARIABLES, NAVIGATION_VARIANTS, NavigationComponentSystem } from './component/navigation';

// Layout - Layout & grid system
export * from './component/layout';
export { LAYOUT_VARIABLES, LAYOUT_VARIANTS, LayoutComponentSystem } from './component/layout';

// Modal - Modal & dialog system
export * from './component/modal';
export { MODAL_VARIABLES, MODAL_VARIANTS, ModalComponentSystem } from './component/modal';

// Icons - Icon system
export * from './component/icons';
export { ICON_VARIABLES, ICON_VARIANTS, IconComponentSystem } from './component/icons';

// Pipelines - Pipeline-specific tokens
export * from './component/pipelines';
export { PIPELINE_VARIABLES, PIPELINE_VARIANTS, PipelineComponentSystem } from './component/pipelines';

// Feedback - Alert/Toast system
export * from './component/feedback';
export { FEEDBACK_COMPONENT_VARIABLES, FEEDBACK_COMPONENT_VARIANTS, FeedbackComponentSystem } from './component/feedback';

// Tables - Table component system
export * from './component/tables';
export { TABLE_VARIABLES, TABLE_VARIANTS, TableComponentSystem } from './component/tables';

// File Upload - Complete file upload system
export * from './component/file-upload';
export { FILE_UPLOAD_VARIABLES, FILE_UPLOAD_VARIANTS, FileUploadComponentSystem } from './component/file-upload';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 CONVENIENCE COLLECTIONS - Grouped exports για common use cases
// ═══════════════════════════════════════════════════════════════════════════════════════

// Core collection - όλα τα core tokens μαζί
export const CORE_TOKENS = {
  colors: './core/colors',
  spacing: './core/spacing',
  typography: './core/typography',
  borders: './core/borders',
  shadows: './core/shadows',
  motion: './core/motion',
  dimensions: './core/dimensions',
  utilities: './core/utilities',
} as const;

// Semantic collection - όλα τα semantic tokens μαζί
export const SEMANTIC_TOKENS = {
  background: './semantic/background',
  text: './semantic/text',
  border: './semantic/border',
  feedback: './semantic/feedback',
  utilities: './semantic/utilities',
} as const;

// Component collection - όλα τα component tokens μαζί
export const COMPONENT_TOKENS = {
  buttons: './component/buttons',
  cards: './component/cards',
  inputs: './component/inputs',
  navigation: './component/navigation',
  layout: './component/layout',
  modal: './component/modal',
  icons: './component/icons',
  pipelines: './component/pipelines',
  feedback: './component/feedback',
  tables: './component/tables',
  'file-upload': './component/file-upload',
} as const;

// Full token registry για introspection
export const LAYERA_TOKENS_REGISTRY = {
  core: CORE_TOKENS,
  semantic: SEMANTIC_TOKENS,
  component: COMPONENT_TOKENS,
  version: '1.0.0',
  generated: new Date().toISOString(),
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🛠️ UTILITY TYPES - TypeScript helpers
// ═══════════════════════════════════════════════════════════════════════════════════════

// Union types για όλα τα token categories
export type CoreTokenCategory = keyof typeof CORE_TOKENS;
export type SemanticTokenCategory = keyof typeof SEMANTIC_TOKENS;
export type ComponentTokenCategory = keyof typeof COMPONENT_TOKENS;
export type TokenCategory = CoreTokenCategory | SemanticTokenCategory | ComponentTokenCategory;

// Token system metadata type
export type TokenSystemInfo = typeof LAYERA_TOKENS_REGISTRY;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📝 USAGE EXAMPLES (για documentation)
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * USAGE EXAMPLES:
 *
 * // Import specific tokens
 * import { BUTTON_VARIABLES, CARD_VARIANTS } from '@layera/tokens'
 *
 * // Import component systems
 * import { ButtonComponentSystem, CardComponentSystem } from '@layera/tokens'
 *
 * // Import by category
 * import { CORE_TOKENS, SEMANTIC_TOKENS } from '@layera/tokens'
 *
 * // Import everything
 * import * as LayeraTokens from '@layera/tokens'
 *
 * // Use in components
 * const buttonStyle = ButtonComponentSystem.getButtonCSS('primary', 'md', 'default')
 * const cardClasses = CardComponentSystem.getComponentProps('elevated', 'md', 'md')
 *
 * // Access registry info
 * console.log(LAYERA_TOKENS_REGISTRY.version) // "1.0.0"
 */