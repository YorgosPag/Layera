/**
 * 🧭 LAYERA NAVIGATION COMPONENT TOKENS
 *
 * Component tokens για Navigation components που χαρτογραφούν semantic tokens σε συγκεκριμένες navigation χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';
import { FONT_SIZE_SCALE, FONT_WEIGHT_SCALE, LINE_HEIGHT_SCALE, FONT_FAMILY_SCALE } from '../../core/typography/typography.variables';

// UNIFIED NAVIGATION VARIABLES - Όλα τα navigation tokens ενωμένα για CSS export
export const NAVIGATION_VARIABLES = {
  // BASE NAVIGATION TOKENS
  'nav-background': BACKGROUND_VARIABLES['background-default'],
  'nav-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'nav-background-active': BACKGROUND_VARIABLES['background-active'],
  'nav-background-disabled': BACKGROUND_VARIABLES['background-disabled'],

  // NAVIGATION TEXT TOKENS
  'nav-text-color': TEXT_VARIABLES['text-primary'],
  'nav-text-hover': TEXT_VARIABLES['text-primary'],
  'nav-text-active': TEXT_VARIABLES['text-primary'],
  'nav-text-disabled': TEXT_VARIABLES['text-disabled'],
  'nav-link-color': TEXT_VARIABLES['text-link'],
  'nav-link-hover': TEXT_VARIABLES['text-link-hover'],

  // NAVIGATION BORDER TOKENS
  'nav-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'nav-border-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],
  'nav-border-active': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'nav-border-radius': BORDER_VARIABLES['border-radius-4'],

  // NAVIGATION SPACING TOKENS
  'nav-padding': SPACING_VARIABLES['spacing-4'],
  'nav-gap': SPACING_VARIABLES['spacing-2'],
  'nav-item-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,
  'nav-item-margin': SPACING_VARIABLES['spacing-1'],
  'nav-section-gap': SPACING_VARIABLES['spacing-8'],

  // NAVIGATION SHADOW TOKENS
  'nav-shadow': SHADOW_VARIABLES['shadow-sm'],
  'nav-shadow-hover': SHADOW_VARIABLES['shadow-md'],

  // NAVIGATION TRANSITIONS
  'nav-transition': MOTION_VARIABLES['transition-normal'],

  // NAVBAR SPECIFIC TOKENS
  'navbar-height': SPACING_VARIABLES['spacing-16'],
  'navbar-background': BACKGROUND_VARIABLES['background-default'],
  'navbar-border-bottom': BORDER_SEMANTIC_VARIABLES['border-default'],
  'navbar-padding': `${SPACING_VARIABLES['spacing-0']} ${SPACING_VARIABLES['spacing-6']}`,
  'navbar-shadow': SHADOW_VARIABLES['shadow-sm'],

  // SIDEBAR NAVIGATION TOKENS
  'sidebar-width': SPACING_VARIABLES['spacing-64'],
  'sidebar-width-collapsed': SPACING_VARIABLES['spacing-16'],
  'sidebar-background': BACKGROUND_VARIABLES['background-default'],
  'sidebar-border-right': BORDER_SEMANTIC_VARIABLES['border-default'],
  'sidebar-padding': SPACING_VARIABLES['spacing-4'],

  // BREADCRUMB TOKENS
  'breadcrumb-separator-color': TEXT_VARIABLES['text-tertiary'],
  'breadcrumb-link-color': TEXT_VARIABLES['text-link'],
  'breadcrumb-current-color': TEXT_VARIABLES['text-primary'],
  'breadcrumb-gap': SPACING_VARIABLES['spacing-2'],

  // MENU TOKENS
  'menu-background': BACKGROUND_VARIABLES['background-default'],
  'menu-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'menu-border-radius': BORDER_VARIABLES['border-radius-8'],
  'menu-shadow': SHADOW_VARIABLES['shadow-lg'],
  'menu-padding': SPACING_VARIABLES['spacing-2'],
  'menu-item-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,
  'menu-item-border-radius': BORDER_VARIABLES['border-radius-4'],

  // DROPDOWN TOKENS
  'dropdown-background': BACKGROUND_VARIABLES['background-default'],
  'dropdown-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'dropdown-border-radius': BORDER_VARIABLES['border-radius-8'],
  'dropdown-shadow': SHADOW_VARIABLES['shadow-xl'],
  'dropdown-padding': SPACING_VARIABLES['spacing-2'],
  'dropdown-max-height': SPACING_VARIABLES['spacing-80'],
  'dropdown-z-index': SPACING_VARIABLES['spacing-25'],


  // MOBILE NAVIGATION TOKENS
  'mobile-nav-height': SPACING_VARIABLES['spacing-14'],
  'mobile-nav-background': BACKGROUND_VARIABLES['background-default'],
  'mobile-nav-border-top': BORDER_SEMANTIC_VARIABLES['border-default'],
  'mobile-nav-padding': SPACING_VARIABLES['spacing-2'],

  // PAGINATION TOKENS
  'pagination-item-size': SPACING_VARIABLES['spacing-10'],
  'pagination-item-border-radius': BORDER_VARIABLES['border-radius-4'],
  'pagination-gap': SPACING_VARIABLES['spacing-1'],
  'pagination-current-background': BACKGROUND_VARIABLES['background-active'],
  'pagination-current-color': TEXT_VARIABLES['text-primary'],

  // NAVIGATION ICON TOKENS
  'nav-icon-size': SPACING_VARIABLES['spacing-5'],
  'nav-icon-color': TEXT_VARIABLES['text-secondary'],
  'nav-icon-hover': TEXT_VARIABLES['text-primary'],
  'nav-icon-margin': SPACING_VARIABLES['spacing-2'],

  // NAVIGATION ICON SIZES (από component/icons)
  'nav-icon-size-mobile': SPACING_VARIABLES['spacing-8'],   // lg για touch
  'nav-icon-size-desktop': SPACING_VARIABLES['spacing-5'],  // md για desktop

  // NAVIGATION ICON TYPES (από component/icons)
  'nav-icon-menu-size': SPACING_VARIABLES['spacing-5'],
  'nav-icon-close-size': SPACING_VARIABLES['spacing-5'],
  'nav-icon-back-size': SPACING_VARIABLES['spacing-5'],
  'nav-icon-forward-size': SPACING_VARIABLES['spacing-5'],

  // NAVIGATION TYPOGRAPHY TOKENS (από core/typography)
  'nav-link-font-size': FONT_SIZE_SCALE.base,        // 16px
  'nav-link-font-weight': FONT_WEIGHT_SCALE.medium,  // 500
  'nav-link-line-height': LINE_HEIGHT_SCALE.tight,   // 1.25
  'nav-link-font-family': FONT_FAMILY_SCALE.system,

  'nav-label-font-size': FONT_SIZE_SCALE.sm,         // 14px
  'nav-label-font-weight': FONT_WEIGHT_SCALE.normal, // 400
  'nav-label-line-height': LINE_HEIGHT_SCALE.tight,  // 1.25
  'nav-label-font-family': FONT_FAMILY_SCALE.system,

  // NAVIGATION STATE TOKENS
  'nav-loading-opacity': BACKGROUND_VARIABLES['background-muted'],
  'nav-disabled-opacity': TEXT_VARIABLES['text-disabled'],

  // ENTERPRISE TEXT ALIGNMENT - Headers
  'header-text-align-horizontal-left': 'var(--layera-core-text-align-left)',
  'header-text-align-horizontal-center': 'var(--layera-core-text-align-center)',
  'header-text-align-horizontal-right': 'var(--layera-core-text-align-right)',
  'header-text-align-horizontal-justify': 'var(--layera-core-text-align-justify)',
  'header-text-align-vertical-top': 'var(--layera-core-text-align-vertical-top)',
  'header-text-align-vertical-middle': 'var(--layera-core-text-align-vertical-middle)',
  'header-text-align-vertical-bottom': 'var(--layera-core-text-align-vertical-bottom)',
} as const;

// Helper types για type safety
export type NavigationType = 'navbar' | 'sidebar' | 'breadcrumb' | 'menu' | 'dropdown' | 'mobile' | 'pagination';
export type NavigationState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';
export type NavigationVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'minimal';
export type NavigationSize = 'sm' | 'md' | 'lg';