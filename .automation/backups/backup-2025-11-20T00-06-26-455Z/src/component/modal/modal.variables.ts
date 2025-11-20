/**
 * 🔲 LAYERA MODAL COMPONENT TOKENS
 *
 * Component tokens για Modal components που χαρτογραφούν semantic tokens σε συγκεκριμένες modal χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';


// UNIFIED MODAL VARIABLES - Όλα τα modal tokens ενωμένα για CSS export
export const MODAL_VARIABLES = {
  // BACKDROP TOKENS
  'modal-backdrop-background': 'rgba(0, 0, 0, 0.5)',
  'modal-backdrop-blur': 'blur(4px)',
  'modal-backdrop-z-index': '1000',
  'modal-content-z-index': '1001',
  'modal-backdrop-transition': MOTION_VARIABLES['transition-normal'],

  // CONTENT TOKENS
  'modal-content-background': BACKGROUND_VARIABLES['background-default'],
  'modal-content-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'modal-content-border-radius': BORDER_VARIABLES['border-radius-12'],
  'modal-content-shadow': SHADOW_VARIABLES['shadow-xl'],
  'modal-content-text': TEXT_VARIABLES['text-primary'],
  'modal-header-text': TEXT_VARIABLES['text-primary'],
  'modal-footer-text': TEXT_VARIABLES['text-secondary'],
  'modal-content-transition': MOTION_VARIABLES['transition-normal'],
  'modal-scale-enter': 'scale(0.95)',
  'modal-scale-exit': 'scale(0.95)',
  'modal-scale-open': 'scale(1)',

  // SIZE TOKENS
  'modal-sm-width': SPACING_VARIABLES['spacing-80'],   // 320px
  'modal-sm-max-width': '90vw',
  'modal-sm-padding': SPACING_VARIABLES['spacing-4'],
  'modal-md-width': SPACING_VARIABLES['spacing-125'],  // 500px
  'modal-md-max-width': '90vw',
  'modal-md-padding': SPACING_VARIABLES['spacing-6'],
  'modal-lg-width': SPACING_VARIABLES['spacing-200'],  // 800px
  'modal-lg-max-width': '95vw',
  'modal-lg-padding': SPACING_VARIABLES['spacing-8'],
  'modal-xl-width': SPACING_VARIABLES['spacing-300'],  // 1200px
  'modal-xl-max-width': '98vw',
  'modal-xl-padding': SPACING_VARIABLES['spacing-10'],
  'modal-fullscreen-width': '100vw',
  'modal-fullscreen-height': '100vh',
  'modal-fullscreen-padding': SPACING_VARIABLES['spacing-6'],

  // HEADER TOKENS
  'modal-header-padding': `${SPACING_VARIABLES['spacing-6']} ${SPACING_VARIABLES['spacing-6']} ${SPACING_VARIABLES['spacing-4']} ${SPACING_VARIABLES['spacing-6']}`,
  'modal-header-border-bottom': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'modal-header-background': 'transparent',
  'modal-title-font-weight': '600',
  'modal-title-color': TEXT_VARIABLES['text-primary'],
  'modal-close-size': SPACING_VARIABLES['spacing-8'],
  'modal-close-color': TEXT_VARIABLES['text-secondary'],
  'modal-close-hover-color': TEXT_VARIABLES['text-primary'],
  'modal-close-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'modal-close-border-radius': BORDER_VARIABLES['border-radius-4'],

  // BODY TOKENS
  'modal-body-padding': SPACING_VARIABLES['component-padding-medium'],
  'modal-body-max-height': '60vh',
  'modal-body-overflow': 'auto',
  'modal-body-color': TEXT_VARIABLES['text-primary'],
  'modal-body-line-height': '1.5',

  // FOOTER TOKENS
  'modal-footer-padding': `${SPACING_VARIABLES['spacing-4']} ${SPACING_VARIABLES['spacing-6']} ${SPACING_VARIABLES['spacing-6']} ${SPACING_VARIABLES['spacing-6']}`,
  'modal-footer-border-top': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'modal-footer-background': 'transparent',
  'modal-footer-button-gap': SPACING_VARIABLES['spacing-3'],
  'modal-footer-justify': 'flex-end',
} as const;

// Helper types για type safety
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
export type ModalPlacement = 'center' | 'top' | 'bottom';
export type ModalVariant = 'default' | 'dialog' | 'drawer';