/**
 * 🎭 LAYERA DISCLOSURE VARIANTS - Disclosure component combinations
 *
 * Προκαθορισμένες συνδυασμοί disclosure tokens για συγκεκριμένες χρήσεις
 * Component-ready disclosure variants που χαρτογραφούν σε semantic tokens
 */

import { DISCLOSURE_VARIABLES } from './disclosure.variables';

// ACCORDION VARIANTS - Different accordion configurations
export const ACCORDION_VARIANTS = {
  // Default accordion
  default: {
    background: DISCLOSURE_VARIABLES['accordion-background'],
    border: DISCLOSURE_VARIABLES['accordion-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    shadow: DISCLOSURE_VARIABLES['accordion-shadow'],
    usage: 'Standard accordion with border and shadow',
  },

  // Ghost accordion (no visual container)
  ghost: {
    background: DISCLOSURE_VARIABLES['disclosure-ghost-background'],
    border: DISCLOSURE_VARIABLES['disclosure-ghost-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    shadow: DISCLOSURE_VARIABLES['disclosure-ghost-shadow'],
    usage: 'Minimal accordion without background',
  },

  // Elevated accordion
  elevated: {
    background: DISCLOSURE_VARIABLES['disclosure-elevated-background'],
    border: DISCLOSURE_VARIABLES['disclosure-elevated-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    shadow: DISCLOSURE_VARIABLES['disclosure-elevated-shadow'],
    usage: 'Prominent accordion with elevated appearance',
  },

  // Outlined accordion
  outlined: {
    background: DISCLOSURE_VARIABLES['disclosure-outlined-background'],
    border: DISCLOSURE_VARIABLES['disclosure-outlined-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    shadow: DISCLOSURE_VARIABLES['disclosure-outlined-shadow'],
    usage: 'Accordion with border only',
  },

} as const;

// TABS VARIANTS - Different tabs configurations
export const TABS_VARIANTS = {
  // Line tabs (default)
  line: {
    background: DISCLOSURE_VARIABLES['tabs-background'],
    borderBottom: DISCLOSURE_VARIABLES['tabs-border-bottom'],
    indicatorBackground: DISCLOSURE_VARIABLES['tabs-indicator-background'],
    indicatorHeight: DISCLOSURE_VARIABLES['tabs-indicator-height'],
    usage: 'Standard line tabs with underline indicator',
  },

  // Enclosed tabs (with background)
  enclosed: {
    background: DISCLOSURE_VARIABLES['tabs-background'],
    border: DISCLOSURE_VARIABLES['accordion-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    activeBackground: DISCLOSURE_VARIABLES['tabs-trigger-background-active'],
    usage: 'Tabs with background and borders',
  },

  // Soft tabs (subtle background)
  soft: {
    background: 'transparent',
    activeBackground: DISCLOSURE_VARIABLES['tabs-trigger-background-hover'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    usage: 'Tabs with subtle background on active state',
  },

  // Solid tabs (prominent background)
  solid: {
    background: DISCLOSURE_VARIABLES['tabs-background'],
    activeBackground: DISCLOSURE_VARIABLES['tabs-trigger-background-active'],
    border: DISCLOSURE_VARIABLES['accordion-border'],
    borderRadius: DISCLOSURE_VARIABLES['accordion-border-radius'],
    usage: 'Tabs with solid background and borders',
  },

} as const;

// SIZE VARIANTS - Different disclosure sizes
export const DISCLOSURE_SIZE_VARIANTS = {
  small: {
    // Accordion sizes
    accordionHeaderPadding: DISCLOSURE_VARIABLES['accordion-sm-header-padding'],
    accordionContentPadding: DISCLOSURE_VARIABLES['accordion-sm-content-padding'],
    accordionFontSize: DISCLOSURE_VARIABLES['accordion-sm-font-size'],

    // Tabs sizes
    tabsTriggerPadding: DISCLOSURE_VARIABLES['tabs-sm-trigger-padding'],
    tabsContentPadding: DISCLOSURE_VARIABLES['tabs-sm-content-padding'],
    tabsFontSize: DISCLOSURE_VARIABLES['tabs-sm-font-size'],
    tabsIndicatorHeight: DISCLOSURE_VARIABLES['tabs-sm-indicator-height'],

    usage: 'Compact disclosure components',
  },

  medium: {
    // Accordion sizes
    accordionHeaderPadding: DISCLOSURE_VARIABLES['accordion-md-header-padding'],
    accordionContentPadding: DISCLOSURE_VARIABLES['accordion-md-content-padding'],
    accordionFontSize: DISCLOSURE_VARIABLES['accordion-md-font-size'],

    // Tabs sizes
    tabsTriggerPadding: DISCLOSURE_VARIABLES['tabs-md-trigger-padding'],
    tabsContentPadding: DISCLOSURE_VARIABLES['tabs-md-content-padding'],
    tabsFontSize: DISCLOSURE_VARIABLES['tabs-md-font-size'],
    tabsIndicatorHeight: DISCLOSURE_VARIABLES['tabs-md-indicator-height'],

    usage: 'Standard disclosure components',
  },

  large: {
    // Accordion sizes
    accordionHeaderPadding: DISCLOSURE_VARIABLES['accordion-lg-header-padding'],
    accordionContentPadding: DISCLOSURE_VARIABLES['accordion-lg-content-padding'],
    accordionFontSize: DISCLOSURE_VARIABLES['accordion-lg-font-size'],

    // Tabs sizes
    tabsTriggerPadding: DISCLOSURE_VARIABLES['tabs-lg-trigger-padding'],
    tabsContentPadding: DISCLOSURE_VARIABLES['tabs-lg-content-padding'],
    tabsFontSize: DISCLOSURE_VARIABLES['tabs-lg-font-size'],
    tabsIndicatorHeight: DISCLOSURE_VARIABLES['tabs-lg-indicator-height'],

    usage: 'Large disclosure components',
  },

} as const;

// COLLAPSIBLE VARIANTS - Simple show/hide content
export const COLLAPSIBLE_VARIANTS = {
  // Default collapsible
  default: {
    triggerBackground: DISCLOSURE_VARIABLES['collapsible-trigger-background'],
    triggerBackgroundHover: DISCLOSURE_VARIABLES['collapsible-trigger-background-hover'],
    triggerPadding: DISCLOSURE_VARIABLES['collapsible-trigger-padding'],
    contentPadding: DISCLOSURE_VARIABLES['collapsible-content-padding'],
    usage: 'Standard collapsible content',
  },

  // Minimal collapsible
  minimal: {
    triggerBackground: 'transparent',
    triggerBackgroundHover: DISCLOSURE_VARIABLES['collapsible-trigger-background-hover'],
    triggerPadding: DISCLOSURE_VARIABLES['collapsible-sm-trigger-padding'],
    contentPadding: DISCLOSURE_VARIABLES['collapsible-sm-content-padding'],
    usage: 'Minimal collapsible without background',
  },

} as const;

// ORIENTATION VARIANTS - For tabs
export const TABS_ORIENTATION_VARIANTS = {
  horizontal: {
    tabsDirection: 'row',
    tabsGap: DISCLOSURE_VARIABLES['tabs-gap'],
    usage: 'Horizontal tabs layout',
  },

  vertical: {
    tabsDirection: 'column',
    tabsGap: DISCLOSURE_VARIABLES['tabs-gap'],
    usage: 'Vertical tabs layout',
  },

} as const;

// Helper types
export type AccordionVariantType = keyof typeof ACCORDION_VARIANTS;
export type TabsVariantType = keyof typeof TABS_VARIANTS;
export type DisclosureSizeVariantType = keyof typeof DISCLOSURE_SIZE_VARIANTS;
export type CollapsibleVariantType = keyof typeof COLLAPSIBLE_VARIANTS;
export type TabsOrientationVariantType = keyof typeof TABS_ORIENTATION_VARIANTS;