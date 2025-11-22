/**
 * 🔲 LAYERA MODAL VARIANTS - Προκαθορισμένοι συνδυασμοί modal tokens
 *
 * Component-ready modal variants που χαρτογραφούν σε component tokens
 * Παρέχει έτοιμες συνταγές για διαφορετικούς τύπους modal
 */

import { MODAL_VARIABLES } from './modal.variables';

// MODAL SIZE VARIANTS - Διαφορετικά μεγέθη modal
export const MODAL_SIZE_VARIANTS = {
  sm: {
    width: MODAL_VARIABLES['modal-sm-width'],
    maxWidth: MODAL_VARIABLES['modal-sm-max-width'],
    padding: MODAL_VARIABLES['modal-sm-padding'],
    usage: 'Small modals για confirmation dialogs',
  },

  md: {
    width: MODAL_VARIABLES['modal-md-width'],
    maxWidth: MODAL_VARIABLES['modal-md-max-width'],
    padding: MODAL_VARIABLES['modal-md-padding'],
    usage: 'Default modal size για γενική χρήση',
  },

  lg: {
    width: MODAL_VARIABLES['modal-lg-width'],
    maxWidth: MODAL_VARIABLES['modal-lg-max-width'],
    padding: MODAL_VARIABLES['modal-lg-padding'],
    usage: 'Large modals για forms και detailed content',
  },

  xl: {
    width: MODAL_VARIABLES['modal-xl-width'],
    maxWidth: MODAL_VARIABLES['modal-xl-max-width'],
    padding: MODAL_VARIABLES['modal-xl-padding'],
    usage: 'Extra large modals για complex interfaces',
  },

  fullscreen: {
    width: MODAL_VARIABLES['modal-fullscreen-width'],
    height: MODAL_VARIABLES['modal-fullscreen-height'],
    padding: MODAL_VARIABLES['modal-fullscreen-padding'],
    usage: 'Fullscreen modals για mobile ή immersive experiences',
  },
} as const;

// MODAL TYPE VARIANTS - Διαφορετικοί τύποι modal
export const MODAL_TYPE_VARIANTS = {
  default: {
    background: MODAL_VARIABLES['modal-content-background'],
    border: MODAL_VARIABLES['modal-content-border'],
    borderRadius: MODAL_VARIABLES['modal-content-border-radius'],
    shadow: MODAL_VARIABLES['modal-content-shadow'],
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Standard modal για γενική χρήση',
  },

  dialog: {
    background: MODAL_VARIABLES['modal-content-background'],
    border: 'none',
    borderRadius: MODAL_VARIABLES['modal-content-border-radius'],
    shadow: MODAL_VARIABLES['modal-content-shadow'],
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Dialog modals χωρίς border για cleaner look',
  },

  drawer: {
    background: MODAL_VARIABLES['modal-content-background'],
    border: MODAL_VARIABLES['modal-content-border'],
    borderRadius: '0px',
    shadow: MODAL_VARIABLES['modal-content-shadow'],
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Drawer-style modals που ανοίγουν από την πλευρά',
  },
} as const;

// MODAL BACKDROP VARIANTS - Διαφορετικά backdrop styles
export const MODAL_BACKDROP_VARIANTS = {
  default: {
    background: MODAL_VARIABLES['modal-backdrop-background'],
    blur: MODAL_VARIABLES['modal-backdrop-blur'],
    transition: MODAL_VARIABLES['modal-backdrop-transition'],
    usage: 'Default backdrop με blur effect',
  },

  solid: {
    background: 'rgba(0, 0, 0, 0.8)',
    blur: 'none',
    transition: MODAL_VARIABLES['modal-backdrop-transition'],
    usage: 'Solid backdrop χωρίς blur για performance',
  },

  light: {
    background: 'rgba(0, 0, 0, 0.3)',
    blur: MODAL_VARIABLES['modal-backdrop-blur'],
    transition: MODAL_VARIABLES['modal-backdrop-transition'],
    usage: 'Light backdrop για λιγότερο dramatic effect',
  },

  none: {
    background: 'transparent',
    blur: 'none',
    transition: MODAL_VARIABLES['modal-backdrop-transition'],
    usage: 'Χωρίς backdrop - για popover-style modals',
  },
} as const;

// MODAL HEADER VARIANTS - Διαφορετικά header styles
export const MODAL_HEADER_VARIANTS = {
  default: {
    padding: MODAL_VARIABLES['modal-header-padding'],
    background: MODAL_VARIABLES['modal-header-background'],
    borderBottom: MODAL_VARIABLES['modal-header-border-bottom'],
    titleColor: MODAL_VARIABLES['modal-title-color'],
    usage: 'Default header με border bottom',
  },

  clean: {
    padding: MODAL_VARIABLES['modal-header-padding'],
    background: MODAL_VARIABLES['modal-header-background'],
    borderBottom: 'none',
    titleColor: MODAL_VARIABLES['modal-title-color'],
    usage: 'Clean header χωρίς border για minimal look',
  },

  accent: {
    padding: MODAL_VARIABLES['modal-header-padding'],
    background: MODAL_VARIABLES['modal-content-background'],
    borderBottom: MODAL_VARIABLES['modal-header-border-bottom'],
    titleColor: MODAL_VARIABLES['modal-title-color'],
    usage: 'Header με accent background',
  },
} as const;

// MODAL ANIMATION VARIANTS - Διαφορετικά animation patterns
export const MODAL_ANIMATION_VARIANTS = {
  scale: {
    enter: MODAL_VARIABLES['modal-scale-enter'],
    exit: MODAL_VARIABLES['modal-scale-exit'],
    open: MODAL_VARIABLES['modal-scale-open'],
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Scale animation - modal μεγαλώνει από το κέντρο',
  },

  fade: {
    enter: 'opacity(0)',
    exit: 'opacity(0)',
    open: 'opacity(1)',
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Fade animation - modal εμφανίζεται με fade',
  },

  slideUp: {
    enter: 'translateY(100%)',
    exit: 'translateY(100%)',
    open: 'translateY(0)',
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Slide up animation - modal ανεβαίνει από κάτω',
  },

  slideDown: {
    enter: 'translateY(-100%)',
    exit: 'translateY(-100%)',
    open: 'translateY(0)',
    transition: MODAL_VARIABLES['modal-content-transition'],
    usage: 'Slide down animation - modal κατεβαίνει από πάνω',
  },
} as const;

// UNIFIED MODAL VARIANTS
export const MODAL_VARIANTS = {
  size: MODAL_SIZE_VARIANTS,
  type: MODAL_TYPE_VARIANTS,
  backdrop: MODAL_BACKDROP_VARIANTS,
  header: MODAL_HEADER_VARIANTS,
  animation: MODAL_ANIMATION_VARIANTS,
} as const;

// Helper types
export type ModalSizeVariant = keyof typeof MODAL_SIZE_VARIANTS;
export type ModalTypeVariant = keyof typeof MODAL_TYPE_VARIANTS;
export type ModalBackdropVariant = keyof typeof MODAL_BACKDROP_VARIANTS;
export type ModalHeaderVariant = keyof typeof MODAL_HEADER_VARIANTS;
export type ModalAnimationVariant = keyof typeof MODAL_ANIMATION_VARIANTS;