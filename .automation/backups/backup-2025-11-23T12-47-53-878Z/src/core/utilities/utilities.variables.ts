/**
 * 🔧 LAYERA UTILITIES VARIABLES - Concrete global utility values
 *
 * ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΣΚΛΗΡΩΝ ΤΙΜΩΝ για global utilities!
 * Όλες οι global utility τιμές ορίζονται εδώ και μόνο εδώ.
 *
 * Enterprise Standards:
 * - Standard CSS values for maximum compatibility
 * - Global utilities για common patterns
 * - Semantic naming για maintainability
 */

import type { UtilitiesTokensClass } from './utilities.class';
import { SPACING_VARIABLES } from '../spacing/spacing.variables';
import { BORDER_STYLE_SCALE } from '../borders/borders.variables';

// GLOBAL DISPLAY VALUES - Standard CSS display values
export const GLOBAL_DISPLAY = {
  flex: 'flex',
  block: 'block',
  inline: 'inline',
  inlineBlock: 'inline-block',
  grid: 'grid',
  none: 'none',
} as const;

// GLOBAL POSITION VALUES - Standard CSS position values
export const GLOBAL_POSITION = {
  static: 'static',
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
} as const;

// GLOBAL CURSOR VALUES - Standard CSS cursor values
export const GLOBAL_CURSOR = {
  auto: 'auto',
  pointer: 'pointer',
  notAllowed: 'not-allowed',
  wait: 'wait',
  text: 'text',
  move: 'move',
  grabbing: 'grabbing',
} as const;

// GLOBAL FLEX VALUES - Flexbox alignment values
export const GLOBAL_FLEX = {
  alignCenter: 'center',
  alignStart: 'flex-start',
  alignEnd: 'flex-end',
  justifyCenter: 'center',
  justifyStart: 'flex-start',
  justifyEnd: 'flex-end',
  justifyBetween: 'space-between',
  justifyAround: 'space-around',
  directionRow: 'row',
  directionColumn: 'column',
  wrapNowrap: 'nowrap',
  wrapWrap: 'wrap',
} as const;

// GLOBAL GRID VALUES - Grid template values
export const GLOBAL_GRID = {
  autoFit280: 'repeat(auto-fit, minmax(280px, 1fr))',
} as const;

// GLOBAL TEXT ALIGN VALUES - Standard CSS text-align values
export const GLOBAL_TEXT_ALIGN = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
} as const;

// CONSOLIDATED UTILITIES TOKENS - Ready for CSS generation
export const UTILITIES_TOKENS: UtilitiesTokensClass = {
  display: GLOBAL_DISPLAY,
  position: GLOBAL_POSITION,
  cursor: GLOBAL_CURSOR,
  flex: GLOBAL_FLEX,
  grid: GLOBAL_GRID,
  textAlign: GLOBAL_TEXT_ALIGN,
  border: BORDER_STYLE_SCALE,

  // System configuration
  namespace: 'layera-global',
  version: '1.0.0',
  accessibility: true,
} as const;

// CSS VARIABLES για export (από GoogleSignInButton.css)
export const UTILITIES_VARIABLES = {
  // Display utilities
  'global-display-flex': GLOBAL_DISPLAY.flex,
  'global-display-block': GLOBAL_DISPLAY.block,
  'global-display-inline': GLOBAL_DISPLAY.inline,
  'global-display-none': GLOBAL_DISPLAY.none,

  // Cursor utilities
  'global-cursor-pointer': GLOBAL_CURSOR.pointer,
  'global-cursor-auto': GLOBAL_CURSOR.auto,
  'global-cursor-not-allowed': GLOBAL_CURSOR.notAllowed,
  'global-cursor-move': GLOBAL_CURSOR.move,
  'global-cursor-grabbing': GLOBAL_CURSOR.grabbing,

  // Flex utilities
  'global-alignItems-center': GLOBAL_FLEX.alignCenter,
  'global-alignItems-start': GLOBAL_FLEX.alignStart,
  'global-alignItems-end': GLOBAL_FLEX.alignEnd,
  'global-justifyContent-center': GLOBAL_FLEX.justifyCenter,
  'global-justifyContent-start': GLOBAL_FLEX.justifyStart,
  'global-justifyContent-end': GLOBAL_FLEX.justifyEnd,
  'global-justifyContent-between': GLOBAL_FLEX.justifyBetween,
  'global-flexDirection-row': GLOBAL_FLEX.directionRow,
  'global-flexDirection-column': GLOBAL_FLEX.directionColumn,
  'global-flexWrap-nowrap': GLOBAL_FLEX.wrapNowrap,
  'global-flexWrap-wrap': GLOBAL_FLEX.wrapWrap,

  // Border utilities (χρησιμοποιεί BORDER_STYLE_SCALE από borders)
  'global-border-none': BORDER_STYLE_SCALE.none,
  'global-border-hidden': BORDER_STYLE_SCALE.hidden,
  'global-border-solid': BORDER_STYLE_SCALE.solid,
  'global-border-dashed': BORDER_STYLE_SCALE.dashed,
  'global-border-dotted': BORDER_STYLE_SCALE.dotted,

  // Grid utilities
  'layera-grid--auto-fit-280': GLOBAL_GRID.autoFit280,

  // CORE TEXT ALIGNMENT VALUES - Πηγή αλήθειας για όλα τα text alignments
  'layera-core-text-align-left': 'left',
  'layera-core-text-align-center': 'center',
  'layera-core-text-align-right': 'right',
  'layera-core-text-align-justify': 'justify',
  'layera-core-text-align-vertical-top': 'top',
  'layera-core-text-align-vertical-middle': 'middle',
  'layera-core-text-align-vertical-bottom': 'bottom',

  // Text alignment utilities - Horizontal (reference τις core μεταβλητές)
  'layera-text--align-left': 'var(--layera-core-text-align-left)',
  'layera-text--align-center': 'var(--layera-core-text-align-center)',
  'layera-text--align-right': 'var(--layera-core-text-align-right)',
  'layera-text--align-justify': 'var(--layera-core-text-align-justify)',

  // Text alignment utilities - Vertical (reference τις core μεταβλητές)
  'layera-text--align-vertical-top': 'var(--layera-core-text-align-vertical-top)',
  'layera-text--align-vertical-middle': 'var(--layera-core-text-align-vertical-middle)',
  'layera-text--align-vertical-bottom': 'var(--layera-core-text-align-vertical-bottom)',


  // Sizing utilities (χρησιμοποιεί υπάρχοντα spacing tokens)
  'layera-width--30': SPACING_VARIABLES['spacing-30'],  // 120px
  'layera-width--32': SPACING_VARIABLES['spacing-32'],  // 128px
  'layera-width--20': SPACING_VARIABLES['spacing-20'],  // 80px - compact cards
  'layera-width--24': SPACING_VARIABLES['spacing-24'],  // 96px - compact cards

  // Header specific utilities
  'layera-header-width--full': '100%',
  'layera-header-center-column': '250px', // Σταθερή κεντρική στήλη - αυξημένο για μακρύτερα κείμενα για headers alignment
  'layera-height--10': SPACING_VARIABLES['spacing-10'], // 40px
  'layera-height--6': SPACING_VARIABLES['spacing-6'],   // 24px - compact cards
  'layera-height--8': SPACING_VARIABLES['spacing-8'],   // 32px - compact cards
  'layera-height--20': SPACING_VARIABLES['spacing-20'], // 80px - square cards

  // Layera Flex utilities (για συμβατότητα με τα 34 αρχεία που τις χρησιμοποιούν)
  'layera-flex': 'flex',
  'layera-flex--align-center': 'center',
  'layera-flex--align-start': 'flex-start',
  'layera-flex--align-end': 'flex-end',
  'layera-flex--justify-center': 'center',
  'layera-flex--justify-start': 'flex-start',
  'layera-flex--justify-end': 'flex-end',
  'layera-flex--justify-space-between': 'space-between',
  'layera-flex--justify-space-around': 'space-around',
  'layera-flex--direction-row': 'row',
  'layera-flex--direction-column': 'column',
  'layera-flex--wrap-nowrap': 'nowrap',
  'layera-flex--wrap-wrap': 'wrap',


  // Spacing utilities (από LivePlayground)
  'margin-bottom-xl': SPACING_VARIABLES['spacing-8'],
} as const;

// HEADER GRID VARIABLES - Γεννώνται ως CSS custom properties
export const HEADER_GRID_VARIABLES = {
  'layera-header-center-column': '250px', // Σταθερή κεντρική στήλη - αυξημένο για μακρύτερα κείμενα
  'layera-grid-template-columns--header': '1fr var(--layera-header-center-column) 1fr',
  'layera-gap--2': SPACING_VARIABLES['spacing-2'], // 8px
} as const;

// CARD TEXT ALIGNMENT VARIABLES - Για κάρτες με κείμενα (όπως τα modals)
export const CARD_TEXT_ALIGNMENT_VARIABLES = {
  // Card text alignment CSS variables (reference τις core μεταβλητές)
  'layera-card-text-align-horizontal-left': 'var(--layera-core-text-align-left)',
  'layera-card-text-align-horizontal-center': 'var(--layera-core-text-align-center)',
  'layera-card-text-align-horizontal-right': 'var(--layera-core-text-align-right)',
  'layera-card-text-align-horizontal-justify': 'var(--layera-core-text-align-justify)',
  'layera-card-text-align-vertical-top': 'var(--layera-core-text-align-vertical-top)',
  'layera-card-text-align-vertical-middle': 'var(--layera-core-text-align-vertical-middle)',
  'layera-card-text-align-vertical-bottom': 'var(--layera-core-text-align-vertical-bottom)',
} as const;

// Export για χρήση σε άλλα modules
export {
  GLOBAL_DISPLAY as GlobalDisplay,
  GLOBAL_POSITION as GlobalPosition,
  GLOBAL_CURSOR as GlobalCursor,
  GLOBAL_FLEX as GlobalFlex,
  GLOBAL_GRID as GlobalGrid,
  GLOBAL_TEXT_ALIGN as GlobalTextAlign,
  BORDER_STYLE_SCALE as GlobalBorder,
};