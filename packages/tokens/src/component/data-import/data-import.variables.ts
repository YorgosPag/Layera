/**
 * 📂 LAYERA DATA IMPORT COMPONENT TOKENS
 *
 * Component tokens για Data Import workflows που χαρτογραφούν semantic tokens
 * σε συγκεκριμένες import operations χρήσεις
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

// UNIFIED DATA IMPORT VARIABLES - Όλα τα data import tokens ενωμένα για CSS export
export const DATA_IMPORT_VARIABLES = {
  // BASE IMPORT CONTAINER TOKENS
  'import-container-background': BACKGROUND_VARIABLES['background-default'],
  'import-container-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-container-border-radius': BORDER_VARIABLES['border-radius-8'],
  'import-container-shadow': SHADOW_VARIABLES['shadow-lg'],
  'import-container-padding': SPACING_VARIABLES['spacing-6'],
  'import-container-margin': SPACING_VARIABLES['spacing-4'],

  // IMPORT WIZARD/STEPPER TOKENS
  'import-wizard-background': BACKGROUND_VARIABLES['background-default'],
  'import-wizard-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-wizard-padding': SPACING_VARIABLES['spacing-5'],
  'import-wizard-gap': SPACING_VARIABLES['spacing-4'],
  'import-wizard-min-height': '400px',

  // WIZARD STEP TOKENS
  'import-step-background': BACKGROUND_VARIABLES['background-muted'],
  'import-step-background-active': BACKGROUND_VARIABLES['background-active'],
  'import-step-background-completed': BACKGROUND_VARIABLES['background-success'],
  'import-step-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'import-step-text-color': TEXT_VARIABLES['text-secondary'],
  'import-step-text-active': TEXT_VARIABLES['text-primary'],
  'import-step-text-completed': TEXT_VARIABLES['text-primary'],
  'import-step-text-disabled': TEXT_VARIABLES['text-disabled'],
  'import-step-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-step-border-active': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'import-step-border-radius': BORDER_VARIABLES['border-radius-full'],
  'import-step-size': SPACING_VARIABLES['spacing-10'],
  'import-step-connector-width': '2px',
  'import-step-connector-color': BORDER_SEMANTIC_VARIABLES['border-default'],

  // FILE SELECTION TOKENS
  'import-file-selector-background': BACKGROUND_VARIABLES['background-muted'],
  'import-file-selector-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'import-file-selector-background-dragover': BACKGROUND_VARIABLES['background-active'],
  'import-file-selector-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-file-selector-border-dragover': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'import-file-selector-border-radius': BORDER_VARIABLES['border-radius-8'],
  'import-file-selector-border-style': 'dashed',
  'import-file-selector-padding': SPACING_VARIABLES['spacing-8'],
  'import-file-selector-min-height': '200px',
  'import-file-selector-text-color': TEXT_VARIABLES['text-secondary'],
  'import-file-selector-text-dragover': TEXT_VARIABLES['text-primary'],
  'import-file-selector-icon-size': SPACING_VARIABLES['spacing-12'],
  'import-file-selector-icon-color': TEXT_VARIABLES['text-tertiary'],

  // SELECTED FILE TOKENS
  'import-file-item-background': BACKGROUND_VARIABLES['background-default'],
  'import-file-item-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-file-item-border-radius': BORDER_VARIABLES['border-radius-4'],
  'import-file-item-padding': SPACING_VARIABLES['spacing-3'],
  'import-file-item-margin': SPACING_VARIABLES['spacing-2'],
  'import-file-item-gap': SPACING_VARIABLES['spacing-3'],
  'import-file-icon-size': SPACING_VARIABLES['spacing-6'],
  'import-file-icon-color': TEXT_VARIABLES['text-secondary'],
  'import-file-name-color': TEXT_VARIABLES['text-primary'],
  'import-file-size-color': TEXT_VARIABLES['text-tertiary'],
  'import-file-remove-color': TEXT_VARIABLES['text-error'],
  'import-file-remove-hover': TEXT_VARIABLES['text-error-hover'],

  // DATA PREVIEW TABLE TOKENS
  'import-preview-table-background': BACKGROUND_VARIABLES['background-default'],
  'import-preview-table-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-preview-table-border-radius': BORDER_VARIABLES['border-radius-4'],
  'import-preview-header-background': BACKGROUND_VARIABLES['background-muted'],
  'import-preview-header-text': TEXT_VARIABLES['text-primary'],
  'import-preview-header-padding': SPACING_VARIABLES['spacing-3'],
  'import-preview-cell-padding': SPACING_VARIABLES['spacing-2'],
  'import-preview-cell-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'import-preview-row-hover': BACKGROUND_VARIABLES['background-hover'],
  'import-preview-max-height': '300px',

  // FIELD MAPPING TOKENS
  'import-mapping-container-background': BACKGROUND_VARIABLES['background-default'],
  'import-mapping-container-padding': SPACING_VARIABLES['spacing-4'],
  'import-mapping-container-gap': SPACING_VARIABLES['spacing-4'],
  'import-mapping-field-background': BACKGROUND_VARIABLES['background-muted'],
  'import-mapping-field-background-mapped': BACKGROUND_VARIABLES['background-success'],
  'import-mapping-field-background-error': BACKGROUND_VARIABLES['background-error'],
  'import-mapping-field-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-mapping-field-border-mapped': BORDER_SEMANTIC_VARIABLES['border-success'],
  'import-mapping-field-border-error': BORDER_SEMANTIC_VARIABLES['border-error'],
  'import-mapping-field-border-radius': BORDER_VARIABLES['border-radius-4'],
  'import-mapping-field-padding': SPACING_VARIABLES['spacing-3'],
  'import-mapping-field-text': TEXT_VARIABLES['text-primary'],
  'import-mapping-field-text-mapped': TEXT_VARIABLES['text-primary'],
  'import-mapping-field-text-error': TEXT_VARIABLES['text-primary'],

  // FIELD MAPPING CONNECTOR TOKENS
  'import-mapping-connector-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'import-mapping-connector-width': '2px',
  'import-mapping-connector-style': 'solid',
  'import-mapping-connector-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],

  // VALIDATION TOKENS
  'import-validation-container-background': BACKGROUND_VARIABLES['background-default'],
  'import-validation-container-padding': SPACING_VARIABLES['spacing-4'],
  'import-validation-error-background': BACKGROUND_VARIABLES['background-error'],
  'import-validation-error-border': BORDER_SEMANTIC_VARIABLES['border-error'],
  'import-validation-error-text': TEXT_VARIABLES['text-primary'],
  'import-validation-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'import-validation-warning-border': BORDER_SEMANTIC_VARIABLES['border-warning'],
  'import-validation-warning-text': TEXT_VARIABLES['text-primary'],
  'import-validation-success-background': BACKGROUND_VARIABLES['background-success'],
  'import-validation-success-border': BORDER_SEMANTIC_VARIABLES['border-success'],
  'import-validation-success-text': TEXT_VARIABLES['text-primary'],
  'import-validation-icon-size': SPACING_VARIABLES['spacing-5'],
  'import-validation-padding': SPACING_VARIABLES['spacing-3'],
  'import-validation-border-radius': BORDER_VARIABLES['border-radius-4'],

  // PROGRESS BAR TOKENS
  'import-progress-background': BACKGROUND_VARIABLES['background-muted'],
  'import-progress-fill': BACKGROUND_VARIABLES['background-active'],
  'import-progress-height': SPACING_VARIABLES['spacing-2'],
  'import-progress-border-radius': BORDER_VARIABLES['border-radius-full'],
  'import-progress-transition': MOTION_VARIABLES['transition-normal'],
  'import-progress-text-color': TEXT_VARIABLES['text-secondary'],
  'import-progress-percentage-color': TEXT_VARIABLES['text-primary'],

  // PROGRESS VARIANTS
  'import-progress-success-fill': BACKGROUND_VARIABLES['background-success'],
  'import-progress-error-fill': BACKGROUND_VARIABLES['background-error'],
  'import-progress-warning-fill': BACKGROUND_VARIABLES['background-warning'],

  // IMPORT SUMMARY TOKENS
  'import-summary-background': BACKGROUND_VARIABLES['background-default'],
  'import-summary-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-summary-border-radius': BORDER_VARIABLES['border-radius-8'],
  'import-summary-padding': SPACING_VARIABLES['spacing-5'],
  'import-summary-gap': SPACING_VARIABLES['spacing-4'],
  'import-summary-success-color': TEXT_VARIABLES['text-success'],
  'import-summary-error-color': TEXT_VARIABLES['text-error'],
  'import-summary-warning-color': TEXT_VARIABLES['text-warning'],
  'import-summary-total-color': TEXT_VARIABLES['text-primary'],

  // IMPORT STATUS INDICATORS
  'import-status-pending-background': BACKGROUND_VARIABLES['background-muted'],
  'import-status-pending-text': TEXT_VARIABLES['text-secondary'],
  'import-status-processing-background': BACKGROUND_VARIABLES['background-active'],
  'import-status-processing-text': TEXT_VARIABLES['text-primary'],
  'import-status-success-background': BACKGROUND_VARIABLES['background-success'],
  'import-status-success-text': TEXT_VARIABLES['text-primary'],
  'import-status-error-background': BACKGROUND_VARIABLES['background-error'],
  'import-status-error-text': TEXT_VARIABLES['text-primary'],
  'import-status-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'import-status-warning-text': TEXT_VARIABLES['text-primary'],

  // IMPORT ACTIONS TOKENS
  'import-actions-container-padding': SPACING_VARIABLES['spacing-4'],
  'import-actions-gap': SPACING_VARIABLES['spacing-3'],
  'import-actions-border-top': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-cancel-button-background': BACKGROUND_VARIABLES['background-muted'],
  'import-cancel-button-text': TEXT_VARIABLES['text-secondary'],
  'import-next-button-background': BACKGROUND_VARIABLES['background-active'],
  'import-next-button-text': TEXT_VARIABLES['text-primary'],
  'import-finish-button-background': BACKGROUND_VARIABLES['background-success'],
  'import-finish-button-text': TEXT_VARIABLES['text-primary'],

  // IMPORT OPTIONS TOKENS
  'import-options-background': BACKGROUND_VARIABLES['background-muted'],
  'import-options-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'import-options-border-radius': BORDER_VARIABLES['border-radius-4'],
  'import-options-padding': SPACING_VARIABLES['spacing-4'],
  'import-options-gap': SPACING_VARIABLES['spacing-3'],
  'import-checkbox-size': SPACING_VARIABLES['spacing-5'],
  'import-radio-size': SPACING_VARIABLES['spacing-5'],

  // IMPORT ERROR HANDLING TOKENS
  'import-error-container-background': BACKGROUND_VARIABLES['background-error'],
  'import-error-container-border': BORDER_SEMANTIC_VARIABLES['border-error'],
  'import-error-container-padding': SPACING_VARIABLES['spacing-4'],
  'import-error-text': TEXT_VARIABLES['text-primary'],
  'import-error-icon-size': SPACING_VARIABLES['spacing-6'],
  'import-retry-button-background': BACKGROUND_VARIABLES['background-active'],
  'import-retry-button-text': TEXT_VARIABLES['text-primary'],

  // IMPORT TRANSITION TOKENS
  'import-transition-duration': MOTION_VARIABLES['motion-duration-normal'],
  'import-transition-easing': MOTION_VARIABLES['motion-easing-ease-in-out'],
  'import-step-transition': `all ${MOTION_VARIABLES['motion-duration-fast']} ${MOTION_VARIABLES['motion-easing-ease']}`,

  // IMPORT RESPONSIVE TOKENS
  'import-mobile-padding': SPACING_VARIABLES['spacing-3'],
  'import-mobile-gap': SPACING_VARIABLES['spacing-2'],
  'import-desktop-padding': SPACING_VARIABLES['spacing-6'],
  'import-desktop-gap': SPACING_VARIABLES['spacing-4'],

  // IMPORT ACCESSIBILITY TOKENS
  'import-focus-outline': `2px solid ${BORDER_SEMANTIC_VARIABLES['border-focus']}`,
  'import-focus-outline-offset': '2px',
  'import-aria-live': 'polite',
  'import-aria-busy': 'true',

  // IMPORT LOADING STATES
  'import-loading-opacity': '0.6',
  'import-loading-animation': `pulse ${MOTION_VARIABLES['motion-duration-slow']} infinite`,
  'import-spinner-size': SPACING_VARIABLES['spacing-8'],
  'import-spinner-border-width': '3px',
} as const;

// Helper types για type safety
export type ImportStepType = 'file-selection' | 'data-preview' | 'field-mapping' | 'validation' | 'import-progress' | 'summary';
export type ImportStepState = 'pending' | 'active' | 'completed' | 'error' | 'disabled';
export type ImportValidationLevel = 'error' | 'warning' | 'success' | 'info';
export type ImportProgressState = 'idle' | 'processing' | 'success' | 'error' | 'paused';
export type ImportFileType = 'csv' | 'excel' | 'json' | 'xml' | 'text';
export type ImportMappingState = 'unmapped' | 'mapped' | 'auto-mapped' | 'error' | 'required';