/**
 * 🎭 LAYERA DISCLOSURE COMPONENT TOKENS
 *
 * Component tokens για Accordion, Tabs, Collapsible και άλλα disclosure components
 * που χαρτογραφούν semantic tokens σε συγκεκριμένες disclosure χρήσεις
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

// UNIFIED DISCLOSURE VARIABLES - Όλα τα disclosure tokens ενωμένα για CSS export
export const DISCLOSURE_VARIABLES = {
  // BASE ACCORDION TOKENS
  'accordion-background': BACKGROUND_VARIABLES['background-default'],
  'accordion-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'accordion-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'accordion-border-radius': BORDER_VARIABLES['border-radius-8'],
  'accordion-shadow': SHADOW_VARIABLES['shadow-sm'],

  // ACCORDION HEADER/TRIGGER TOKENS
  'accordion-header-background': BACKGROUND_VARIABLES['background-default'],
  'accordion-header-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'accordion-header-background-active': BACKGROUND_VARIABLES['background-active'],
  'accordion-header-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'accordion-header-padding': `SPACING_VARIABLES['component-padding-medium']`,
  'accordion-header-margin': SPACING_VARIABLES['spacing-0'],
  'accordion-header-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'accordion-header-border-radius': BORDER_VARIABLES['border-radius-4'],

  // ACCORDION HEADER TEXT TOKENS
  'accordion-header-text-color': TEXT_VARIABLES['text-primary'],
  'accordion-header-text-hover': TEXT_VARIABLES['text-primary'],
  'accordion-header-text-active': TEXT_VARIABLES['text-primary'],
  'accordion-header-text-disabled': TEXT_VARIABLES['text-disabled'],
  'accordion-header-font-size': '16px',
  'accordion-header-font-weight': '600',
  'accordion-header-line-height': '1.5',

  // ACCORDION CONTENT/PANEL TOKENS
  'accordion-content-background': BACKGROUND_VARIABLES['background-default'],
  'accordion-content-padding': `SPACING_VARIABLES['component-padding-medium']`,
  'accordion-content-margin': SPACING_VARIABLES['spacing-0'],
  'accordion-content-border': 'none',
  'accordion-content-border-top': BORDER_SEMANTIC_VARIABLES['border-default'],
  'accordion-content-text-color': TEXT_VARIABLES['text-secondary'],
  'accordion-content-font-size': '14px',
  'accordion-content-line-height': '1.6',

  // ACCORDION ICON TOKENS
  'accordion-icon-size': SPACING_VARIABLES['spacing-5'],
  'accordion-icon-color': TEXT_VARIABLES['text-tertiary'],
  'accordion-icon-hover': TEXT_VARIABLES['text-secondary'],
  'accordion-icon-active': TEXT_VARIABLES['text-primary'],
  'accordion-icon-transition': MOTION_VARIABLES['transition-normal'],
  'accordion-icon-rotation-open': '180deg',
  'accordion-icon-rotation-closed': '0deg',

  // ACCORDION ANIMATION TOKENS
  'accordion-animation-duration': MOTION_VARIABLES['duration-normal'],
  'accordion-animation-easing': MOTION_VARIABLES['easing-ease-in-out'],
  'accordion-transition': `all ${MOTION_VARIABLES['duration-normal']} ${MOTION_VARIABLES['easing-ease-in-out']}`,

  // ACCORDION SIZE VARIANTS
  'accordion-sm-header-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'accordion-sm-content-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'accordion-sm-font-size': '14px',
  'accordion-sm-icon-size': SPACING_VARIABLES['spacing-4'],

  'accordion-md-header-padding': `SPACING_VARIABLES['component-padding-medium']`,
  'accordion-md-content-padding': `SPACING_VARIABLES['component-padding-medium']`,
  'accordion-md-font-size': '16px',
  'accordion-md-icon-size': SPACING_VARIABLES['spacing-5'],

  'accordion-lg-header-padding': `${SPACING_VARIABLES['spacing-5']} ${SPACING_VARIABLES['spacing-8']}`,
  'accordion-lg-content-padding': `${SPACING_VARIABLES['spacing-5']} ${SPACING_VARIABLES['spacing-8']}`,
  'accordion-lg-font-size': '18px',
  'accordion-lg-icon-size': SPACING_VARIABLES['spacing-6'],

  // ACCORDION GROUP/LIST TOKENS
  'accordion-group-gap': SPACING_VARIABLES['spacing-2'],
  'accordion-group-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'accordion-group-border-radius': BORDER_VARIABLES['border-radius-8'],
  'accordion-group-shadow': SHADOW_VARIABLES['shadow-sm'],

  // ACCORDION STATE TOKENS
  'accordion-focus-outline': `2px solid ${BORDER_SEMANTIC_VARIABLES['border-focus']}`,
  'accordion-focus-outline-offset': '2px',
  'accordion-disabled-opacity': '0.6',
  'accordion-loading-opacity': '0.7',

  // ENHANCED TABS TOKENS (βελτιωμένα)
  'tabs-container-background': BACKGROUND_VARIABLES['background-default'],
  'tabs-container-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'tabs-container-border-radius': BORDER_VARIABLES['border-radius-8'],
  'tabs-container-shadow': 'none',

  // TABS LIST/BAR TOKENS
  'tabs-list-background': BACKGROUND_VARIABLES['background-muted'],
  'tabs-list-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'tabs-list-border-radius': BORDER_VARIABLES['border-radius-6'],
  'tabs-list-padding': SPACING_VARIABLES['spacing-1'],
  'tabs-list-gap': SPACING_VARIABLES['spacing-1'],
  'tabs-list-scroll-behavior': 'smooth',

  // TABS TRIGGER/BUTTON TOKENS
  'tabs-trigger-background': 'transparent',
  'tabs-trigger-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'tabs-trigger-background-active': BACKGROUND_VARIABLES['background-default'],
  'tabs-trigger-background-selected': BACKGROUND_VARIABLES['background-default'],
  'tabs-trigger-border': 'none',
  'tabs-trigger-border-radius': BORDER_VARIABLES['border-radius-4'],
  'tabs-trigger-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,
  'tabs-trigger-margin': SPACING_VARIABLES['spacing-0'],

  // TABS TRIGGER TEXT TOKENS
  'tabs-trigger-text-color': TEXT_VARIABLES['text-secondary'],
  'tabs-trigger-text-hover': TEXT_VARIABLES['text-primary'],
  'tabs-trigger-text-active': TEXT_VARIABLES['text-primary'],
  'tabs-trigger-text-selected': TEXT_VARIABLES['text-primary'],
  'tabs-trigger-text-disabled': TEXT_VARIABLES['text-disabled'],
  'tabs-trigger-font-size': '14px',
  'tabs-trigger-font-weight': '500',
  'tabs-trigger-line-height': '1.4',

  // TABS CONTENT/PANEL TOKENS
  'tabs-content-background': BACKGROUND_VARIABLES['background-default'],
  'tabs-content-border': 'none',
  'tabs-content-border-radius': BORDER_VARIABLES['border-radius-6'],
  'tabs-content-padding': SPACING_VARIABLES['spacing-6'],
  'tabs-content-margin-top': SPACING_VARIABLES['spacing-4'],
  'tabs-content-text-color': TEXT_VARIABLES['text-primary'],
  'tabs-content-font-size': '14px',
  'tabs-content-line-height': '1.6',

  // TABS UNDERLINE/INDICATOR TOKENS
  'tabs-indicator-background': BACKGROUND_VARIABLES['background-active'],
  'tabs-indicator-height': '2px',
  'tabs-indicator-border-radius': BORDER_VARIABLES['border-radius-full'],
  'tabs-indicator-transition': `all ${MOTION_VARIABLES['duration-fast']} ${MOTION_VARIABLES['easing-ease-out']}`,

  // TABS SIZE VARIANTS
  'tabs-sm-trigger-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-3']}`,
  'tabs-sm-content-padding': SPACING_VARIABLES['spacing-4'],
  'tabs-sm-font-size': '12px',
  'tabs-sm-indicator-height': '1px',

  'tabs-md-trigger-padding': `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-4']}`,
  'tabs-md-content-padding': SPACING_VARIABLES['spacing-6'],
  'tabs-md-font-size': '14px',
  'tabs-md-indicator-height': '2px',

  'tabs-lg-trigger-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-6']}`,
  'tabs-lg-content-padding': SPACING_VARIABLES['spacing-8'],
  'tabs-lg-font-size': '16px',
  'tabs-lg-indicator-height': '3px',

  // TABS ORIENTATION TOKENS
  'tabs-vertical-list-width': SPACING_VARIABLES['spacing-48'],
  'tabs-vertical-trigger-text-align': 'left',
  'tabs-vertical-trigger-justify': 'flex-start',
  'tabs-vertical-content-margin-left': SPACING_VARIABLES['spacing-4'],

  // TABS ICON TOKENS
  'tabs-icon-size': SPACING_VARIABLES['spacing-4'],
  'tabs-icon-margin-right': SPACING_VARIABLES['spacing-2'],
  'tabs-icon-color': TEXT_VARIABLES['text-tertiary'],
  'tabs-icon-active': TEXT_VARIABLES['text-primary'],

  // COLLAPSIBLE TOKENS
  'collapsible-background': BACKGROUND_VARIABLES['background-default'],
  'collapsible-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'collapsible-border-radius': BORDER_VARIABLES['border-radius-6'],
  'collapsible-shadow': 'none',

  // COLLAPSIBLE TRIGGER TOKENS
  'collapsible-trigger-background': 'transparent',
  'collapsible-trigger-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'collapsible-trigger-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'collapsible-trigger-text-color': TEXT_VARIABLES['text-primary'],
  'collapsible-trigger-font-weight': '500',

  // COLLAPSIBLE CONTENT TOKENS
  'collapsible-content-padding': `${SPACING_VARIABLES['spacing-0']} ${SPACING_VARIABLES['spacing-4']} ${SPACING_VARIABLES['spacing-4']}`,
  'collapsible-content-animation': `slideDown ${MOTION_VARIABLES['duration-normal']} ${MOTION_VARIABLES['easing-ease-out']}`,

  // DISCLOSURE STATE TOKENS
  'disclosure-focus-ring': `0 0 0 2px ${BORDER_SEMANTIC_VARIABLES['border-focus']}`,
  'disclosure-focus-ring-offset': '2px',
  'disclosure-disabled-cursor': 'not-allowed',

  // DISCLOSURE ACCESSIBILITY TOKENS
  'disclosure-aria-expanded': 'true',
  'disclosure-aria-collapsed': 'false',
  'disclosure-role': 'button',
  'disclosure-tabindex': '0',

  // DISCLOSURE RESPONSIVE TOKENS
  'disclosure-mobile-padding': SPACING_VARIABLES['spacing-3'],
  'disclosure-desktop-padding': SPACING_VARIABLES['spacing-4'],
  'disclosure-mobile-font-size': '14px',
  'disclosure-desktop-font-size': '16px',

  // DISCLOSURE VARIANT TOKENS
  'disclosure-ghost-background': 'transparent',
  'disclosure-ghost-border': 'none',
  'disclosure-ghost-shadow': 'none',

  'disclosure-elevated-background': BACKGROUND_VARIABLES['background-default'],
  'disclosure-elevated-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'disclosure-elevated-shadow': SHADOW_VARIABLES['shadow-md'],

  'disclosure-outlined-background': 'transparent',
  'disclosure-outlined-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'disclosure-outlined-shadow': 'none',
} as const;

// Helper types για type safety
export type DisclosureType = 'accordion' | 'tabs' | 'collapsible';
export type DisclosureSize = 'sm' | 'md' | 'lg';
export type DisclosureVariant = 'default' | 'ghost' | 'elevated' | 'outlined';
export type DisclosureState = 'default' | 'hover' | 'active' | 'disabled' | 'open' | 'closed';
export type TabsOrientation = 'horizontal' | 'vertical';
export type AccordionBehavior = 'single' | 'multiple' | 'collapsible';