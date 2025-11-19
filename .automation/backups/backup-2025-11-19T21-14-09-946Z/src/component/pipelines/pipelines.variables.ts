/**
 * 🔧 LAYERA PIPELINE COMPONENT TOKENS
 *
 * Component tokens για Pipeline components που χαρτογραφούν semantic tokens σε συγκεκριμένες pipeline χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';
import { DIMENSIONS_VARIABLES } from '../../core/dimensions/dimensions.variables';

// PIPELINE MODAL TOKENS - Από modal.css styling
export const PIPELINE_MODAL_TOKENS = {
  // Overlay styling
  'pipeline-modal-overlay-background': BACKGROUND_VARIABLES['color-semantic-overlay-dark'],
  'pipeline-modal-overlay-z-index': '1000',
  'pipeline-modal-overlay-padding-mobile': SPACING_VARIABLES['spacing-2'],
  'pipeline-modal-overlay-padding-tablet': SPACING_VARIABLES['spacing-3'],
  'pipeline-modal-overlay-padding-desktop': SPACING_VARIABLES['spacing-4'],

  // Container styling
  'pipeline-modal-container-background': BACKGROUND_VARIABLES['color-surface-primary'],
  'pipeline-modal-container-border-radius': BORDER_VARIABLES['border-radius-lg'],
  'pipeline-modal-container-shadow': SHADOW_VARIABLES['shadow-2xl'],
  'pipeline-modal-container-z-index': '1001',

  // Card styling
  'pipeline-card-border': `${SPACING_VARIABLES['spacing-0-5']} solid`,
  'pipeline-card-border-radius': BORDER_VARIABLES['border-radius-md'],
  'pipeline-card-background': BACKGROUND_VARIABLES['color-surface-primary'],
  'pipeline-card-transition': MOTION_VARIABLES['transition-all'],
  'pipeline-card-hover-shadow': SHADOW_VARIABLES['shadow-md'],
  'pipeline-card-hover-transform': `translateY(-${SPACING_VARIABLES['spacing-0-25']})`,

  // Typography
  'pipeline-card-title-font-size': '1rem',
  'pipeline-card-title-font-weight': '600',
  'pipeline-card-title-line-height': '1.2',
  'pipeline-card-title-color': TEXT_VARIABLES['text-primary'],

  'pipeline-card-text-font-size': '0.875rem',
  'pipeline-card-text-line-height': '1.6',
  'pipeline-card-text-color': TEXT_VARIABLES['text-secondary'],

  // Icon sizing
  'pipeline-icon-size-mobile': SPACING_VARIABLES['spacing-5'],
  'pipeline-icon-size-desktop': SPACING_VARIABLES['spacing-6'],
} as const;

// PIPELINE RESPONSIVE TOKENS - Media query και responsive behavior
export const PIPELINE_RESPONSIVE_TOKENS = {
  // Floating panel sizing (από modal.css)
  'pipeline-floating-panel-width': SPACING_VARIABLES['spacing-100'],
  'pipeline-floating-panel-max-width': SPACING_VARIABLES['spacing-100'],
  'pipeline-floating-panel-width-large': SPACING_VARIABLES['spacing-112'],
  'pipeline-floating-panel-max-width-large': SPACING_VARIABLES['spacing-112'],

  // Positioning
  'pipeline-floating-panel-top': SPACING_VARIABLES['spacing-20'],
  'pipeline-floating-panel-right': SPACING_VARIABLES['spacing-5'],
  'pipeline-floating-panel-max-height': `calc(100vh - ${SPACING_VARIABLES['spacing-30']})`,

  // Desktop transparency
  'pipeline-overlay-background-desktop': DIMENSIONS_VARIABLES['shared-dimensions-transparent'],

  // Animation
  'pipeline-slide-animation': 'slide-in-from-right',
  'pipeline-slide-duration': MOTION_VARIABLES['transition-normal'],
} as const;

// UNIFIED PIPELINE VARIABLES - Όλα τα pipeline tokens ενωμένα για CSS export
export const PIPELINE_VARIABLES = {
  ...PIPELINE_MODAL_TOKENS,
  ...PIPELINE_RESPONSIVE_TOKENS,
} as const;

// Export για χρήση σε άλλα modules
export {
  PIPELINE_MODAL_TOKENS as PipelineModalTokens,
  PIPELINE_RESPONSIVE_TOKENS as PipelineResponsiveTokens,
};