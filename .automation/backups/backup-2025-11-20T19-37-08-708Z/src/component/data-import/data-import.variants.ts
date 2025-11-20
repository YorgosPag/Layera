/**
 * 📂 LAYERA DATA IMPORT VARIANTS - Προκαθορισμένοι συνδυασμοί import tokens
 *
 * Component-ready import variants που χαρτογραφούν σε component tokens
 * Παρέχει έτοιμες συνταγές για διαφορετικούς τύπους data import workflows
 */

import { DATA_IMPORT_VARIABLES } from './data-import.variables';

// IMPORT WIZARD STEP VARIANTS - Διαφορετικές καταστάσεις steps
export const IMPORT_STEP_VARIANTS = {
  // Pending step - not yet started
  pending: {
    background: DATA_IMPORT_VARIABLES['import-step-background'],
    textColor: DATA_IMPORT_VARIABLES['import-step-text-color'],
    border: DATA_IMPORT_VARIABLES['import-step-border'],
    borderRadius: DATA_IMPORT_VARIABLES['import-step-border-radius'],
    size: DATA_IMPORT_VARIABLES['import-step-size'],
    usage: 'Steps που δεν έχουν ενεργοποιηθεί ακόμα',
  },

  // Active step - currently being worked on
  active: {
    background: DATA_IMPORT_VARIABLES['import-step-background-active'],
    textColor: DATA_IMPORT_VARIABLES['import-step-text-active'],
    border: DATA_IMPORT_VARIABLES['import-step-border-active'],
    borderRadius: DATA_IMPORT_VARIABLES['import-step-border-radius'],
    size: DATA_IMPORT_VARIABLES['import-step-size'],
    usage: 'Step που είναι ενεργό αυτή τη στιγμή',
  },

  // Completed step - successfully finished
  completed: {
    background: DATA_IMPORT_VARIABLES['import-step-background-completed'],
    textColor: DATA_IMPORT_VARIABLES['import-step-text-completed'],
    border: DATA_IMPORT_VARIABLES['import-step-border-active'],
    borderRadius: DATA_IMPORT_VARIABLES['import-step-border-radius'],
    size: DATA_IMPORT_VARIABLES['import-step-size'],
    usage: 'Steps που έχουν ολοκληρωθεί επιτυχώς',
  },

  // Disabled step - cannot be accessed
  disabled: {
    background: DATA_IMPORT_VARIABLES['import-step-background-disabled'],
    textColor: DATA_IMPORT_VARIABLES['import-step-text-disabled'],
    border: DATA_IMPORT_VARIABLES['import-step-border'],
    borderRadius: DATA_IMPORT_VARIABLES['import-step-border-radius'],
    size: DATA_IMPORT_VARIABLES['import-step-size'],
    usage: 'Steps που δεν μπορούν να προσπελαστούν',
  },
} as const;

// FILE SELECTOR VARIANTS - Διαφορετικές καταστάσεις file selector
export const FILE_SELECTOR_VARIANTS = {
  // Default state
  default: {
    background: DATA_IMPORT_VARIABLES['import-file-selector-background'],
    border: DATA_IMPORT_VARIABLES['import-file-selector-border'],
    borderStyle: DATA_IMPORT_VARIABLES['import-file-selector-border-style'],
    borderRadius: DATA_IMPORT_VARIABLES['import-file-selector-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-file-selector-padding'],
    minHeight: DATA_IMPORT_VARIABLES['import-file-selector-min-height'],
    textColor: DATA_IMPORT_VARIABLES['import-file-selector-text-color'],
    iconColor: DATA_IMPORT_VARIABLES['import-file-selector-icon-color'],
    usage: 'Default file selector state',
  },

  // Hover state
  hover: {
    background: DATA_IMPORT_VARIABLES['import-file-selector-background-hover'],
    border: DATA_IMPORT_VARIABLES['import-file-selector-border'],
    borderStyle: DATA_IMPORT_VARIABLES['import-file-selector-border-style'],
    borderRadius: DATA_IMPORT_VARIABLES['import-file-selector-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-file-selector-padding'],
    minHeight: DATA_IMPORT_VARIABLES['import-file-selector-min-height'],
    textColor: DATA_IMPORT_VARIABLES['import-file-selector-text-color'],
    iconColor: DATA_IMPORT_VARIABLES['import-file-selector-icon-color'],
    usage: 'File selector hover state',
  },

  // Drag over state - when file is being dragged over
  dragover: {
    background: DATA_IMPORT_VARIABLES['import-file-selector-background-dragover'],
    border: DATA_IMPORT_VARIABLES['import-file-selector-border-dragover'],
    borderStyle: DATA_IMPORT_VARIABLES['import-file-selector-border-style'],
    borderRadius: DATA_IMPORT_VARIABLES['import-file-selector-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-file-selector-padding'],
    minHeight: DATA_IMPORT_VARIABLES['import-file-selector-min-height'],
    textColor: DATA_IMPORT_VARIABLES['import-file-selector-text-dragover'],
    iconColor: DATA_IMPORT_VARIABLES['import-file-selector-icon-color'],
    usage: 'File selector drag over state',
  },
} as const;

// VALIDATION MESSAGE VARIANTS - Διαφορετικά επίπεδα validation
export const VALIDATION_MESSAGE_VARIANTS = {
  // Error messages
  error: {
    background: DATA_IMPORT_VARIABLES['import-validation-error-background'],
    border: DATA_IMPORT_VARIABLES['import-validation-error-border'],
    textColor: DATA_IMPORT_VARIABLES['import-validation-error-text'],
    borderRadius: DATA_IMPORT_VARIABLES['import-validation-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-validation-padding'],
    iconSize: DATA_IMPORT_VARIABLES['import-validation-icon-size'],
    usage: 'Validation error messages',
  },

  // Warning messages
  warning: {
    background: DATA_IMPORT_VARIABLES['import-validation-warning-background'],
    border: DATA_IMPORT_VARIABLES['import-validation-warning-border'],
    textColor: DATA_IMPORT_VARIABLES['import-validation-warning-text'],
    borderRadius: DATA_IMPORT_VARIABLES['import-validation-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-validation-padding'],
    iconSize: DATA_IMPORT_VARIABLES['import-validation-icon-size'],
    usage: 'Validation warning messages',
  },

  // Success messages
  success: {
    background: DATA_IMPORT_VARIABLES['import-validation-success-background'],
    border: DATA_IMPORT_VARIABLES['import-validation-success-border'],
    textColor: DATA_IMPORT_VARIABLES['import-validation-success-text'],
    borderRadius: DATA_IMPORT_VARIABLES['import-validation-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-validation-padding'],
    iconSize: DATA_IMPORT_VARIABLES['import-validation-icon-size'],
    usage: 'Validation success messages',
  },
} as const;

// FIELD MAPPING VARIANTS - Διαφορετικές καταστάσεις field mapping
export const FIELD_MAPPING_VARIANTS = {
  // Unmapped field
  unmapped: {
    background: DATA_IMPORT_VARIABLES['import-mapping-field-background'],
    border: DATA_IMPORT_VARIABLES['import-mapping-field-border'],
    borderRadius: DATA_IMPORT_VARIABLES['import-mapping-field-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-mapping-field-padding'],
    textColor: DATA_IMPORT_VARIABLES['import-mapping-field-text'],
    usage: 'Fields που δεν έχουν γίνει map ακόμα',
  },

  // Successfully mapped field
  mapped: {
    background: DATA_IMPORT_VARIABLES['import-mapping-field-background-mapped'],
    border: DATA_IMPORT_VARIABLES['import-mapping-field-border-mapped'],
    borderRadius: DATA_IMPORT_VARIABLES['import-mapping-field-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-mapping-field-padding'],
    textColor: DATA_IMPORT_VARIABLES['import-mapping-field-text-mapped'],
    usage: 'Fields που έχουν γίνει map επιτυχώς',
  },

  // Error in mapping
  error: {
    background: DATA_IMPORT_VARIABLES['import-mapping-field-background-error'],
    border: DATA_IMPORT_VARIABLES['import-mapping-field-border-error'],
    borderRadius: DATA_IMPORT_VARIABLES['import-mapping-field-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-mapping-field-padding'],
    textColor: DATA_IMPORT_VARIABLES['import-mapping-field-text-error'],
    usage: 'Fields με mapping errors',
  },
} as const;

// IMPORT STATUS VARIANTS - Διαφορετικές καταστάσεις import process
export const IMPORT_STATUS_VARIANTS = {
  // Pending import
  pending: {
    background: DATA_IMPORT_VARIABLES['import-status-pending-background'],
    textColor: DATA_IMPORT_VARIABLES['import-status-pending-text'],
    usage: 'Import που περιμένει να ξεκινήσει',
  },

  // Processing import
  processing: {
    background: DATA_IMPORT_VARIABLES['import-status-processing-background'],
    textColor: DATA_IMPORT_VARIABLES['import-status-processing-text'],
    animation: DATA_IMPORT_VARIABLES['import-loading-animation'],
    usage: 'Import που εκτελείται αυτή τη στιγμή',
  },

  // Successful import
  success: {
    background: DATA_IMPORT_VARIABLES['import-status-success-background'],
    textColor: DATA_IMPORT_VARIABLES['import-status-success-text'],
    usage: 'Import που ολοκληρώθηκε επιτυχώς',
  },

  // Failed import
  error: {
    background: DATA_IMPORT_VARIABLES['import-status-error-background'],
    textColor: DATA_IMPORT_VARIABLES['import-status-error-text'],
    usage: 'Import που απέτυχε',
  },

  // Import with warnings
  warning: {
    background: DATA_IMPORT_VARIABLES['import-status-warning-background'],
    textColor: DATA_IMPORT_VARIABLES['import-status-warning-text'],
    usage: 'Import που ολοκληρώθηκε με warnings',
  },
} as const;

// PROGRESS BAR VARIANTS - Διαφορετικά progress states
export const PROGRESS_BAR_VARIANTS = {
  // Default progress
  default: {
    background: DATA_IMPORT_VARIABLES['import-progress-background'],
    fill: DATA_IMPORT_VARIABLES['import-progress-fill'],
    height: DATA_IMPORT_VARIABLES['import-progress-height'],
    borderRadius: DATA_IMPORT_VARIABLES['import-progress-border-radius'],
    transition: DATA_IMPORT_VARIABLES['import-progress-transition'],
    textColor: DATA_IMPORT_VARIABLES['import-progress-text-color'],
    percentageColor: DATA_IMPORT_VARIABLES['import-progress-percentage-color'],
    usage: 'Default progress indicator',
  },

  // Success progress
  success: {
    background: DATA_IMPORT_VARIABLES['import-progress-background'],
    fill: DATA_IMPORT_VARIABLES['import-progress-success-fill'],
    height: DATA_IMPORT_VARIABLES['import-progress-height'],
    borderRadius: DATA_IMPORT_VARIABLES['import-progress-border-radius'],
    transition: DATA_IMPORT_VARIABLES['import-progress-transition'],
    textColor: DATA_IMPORT_VARIABLES['import-progress-text-color'],
    percentageColor: DATA_IMPORT_VARIABLES['import-progress-percentage-color'],
    usage: 'Success progress indicator',
  },

  // Error progress
  error: {
    background: DATA_IMPORT_VARIABLES['import-progress-background'],
    fill: DATA_IMPORT_VARIABLES['import-progress-error-fill'],
    height: DATA_IMPORT_VARIABLES['import-progress-height'],
    borderRadius: DATA_IMPORT_VARIABLES['import-progress-border-radius'],
    transition: DATA_IMPORT_VARIABLES['import-progress-transition'],
    textColor: DATA_IMPORT_VARIABLES['import-progress-text-color'],
    percentageColor: DATA_IMPORT_VARIABLES['import-progress-percentage-color'],
    usage: 'Error progress indicator',
  },

  // Warning progress
  warning: {
    background: DATA_IMPORT_VARIABLES['import-progress-background'],
    fill: DATA_IMPORT_VARIABLES['import-progress-warning-fill'],
    height: DATA_IMPORT_VARIABLES['import-progress-height'],
    borderRadius: DATA_IMPORT_VARIABLES['import-progress-border-radius'],
    transition: DATA_IMPORT_VARIABLES['import-progress-transition'],
    textColor: DATA_IMPORT_VARIABLES['import-progress-text-color'],
    percentageColor: DATA_IMPORT_VARIABLES['import-progress-percentage-color'],
    usage: 'Warning progress indicator',
  },
} as const;

// IMPORT BUTTON VARIANTS - Διαφορετικά κουμπιά για import actions
export const IMPORT_BUTTON_VARIANTS = {
  // Cancel button
  cancel: {
    background: DATA_IMPORT_VARIABLES['import-cancel-button-background'],
    textColor: DATA_IMPORT_VARIABLES['import-cancel-button-text'],
    usage: 'Cancel import operation',
  },

  // Next step button
  next: {
    background: DATA_IMPORT_VARIABLES['import-next-button-background'],
    textColor: DATA_IMPORT_VARIABLES['import-next-button-text'],
    usage: 'Proceed to next step',
  },

  // Finish import button
  finish: {
    background: DATA_IMPORT_VARIABLES['import-finish-button-background'],
    textColor: DATA_IMPORT_VARIABLES['import-finish-button-text'],
    usage: 'Complete import process',
  },

  // Retry import button
  retry: {
    background: DATA_IMPORT_VARIABLES['import-retry-button-background'],
    textColor: DATA_IMPORT_VARIABLES['import-retry-button-text'],
    usage: 'Retry failed import',
  },
} as const;

// IMPORT CONTAINER VARIANTS - Διαφορετικά στυλ container
export const IMPORT_CONTAINER_VARIANTS = {
  // Default wizard container
  wizard: {
    background: DATA_IMPORT_VARIABLES['import-wizard-background'],
    border: DATA_IMPORT_VARIABLES['import-wizard-border'],
    padding: DATA_IMPORT_VARIABLES['import-wizard-padding'],
    gap: DATA_IMPORT_VARIABLES['import-wizard-gap'],
    minHeight: DATA_IMPORT_VARIABLES['import-wizard-min-height'],
    usage: 'Main wizard container',
  },

  // Error container
  error: {
    background: DATA_IMPORT_VARIABLES['import-error-container-background'],
    border: DATA_IMPORT_VARIABLES['import-error-container-border'],
    padding: DATA_IMPORT_VARIABLES['import-error-container-padding'],
    textColor: DATA_IMPORT_VARIABLES['import-error-text'],
    iconSize: DATA_IMPORT_VARIABLES['import-error-icon-size'],
    usage: 'Error message container',
  },

  // Summary container
  summary: {
    background: DATA_IMPORT_VARIABLES['import-summary-background'],
    border: DATA_IMPORT_VARIABLES['import-summary-border'],
    borderRadius: DATA_IMPORT_VARIABLES['import-summary-border-radius'],
    padding: DATA_IMPORT_VARIABLES['import-summary-padding'],
    gap: DATA_IMPORT_VARIABLES['import-summary-gap'],
    usage: 'Import summary container',
  },
} as const;

// RESPONSIVE VARIANTS - Mobile/Desktop adaptations
export const RESPONSIVE_IMPORT_VARIANTS = {
  mobile: {
    padding: DATA_IMPORT_VARIABLES['import-mobile-padding'],
    gap: DATA_IMPORT_VARIABLES['import-mobile-gap'],
    usage: 'Mobile-optimized layout',
  },

  desktop: {
    padding: DATA_IMPORT_VARIABLES['import-desktop-padding'],
    gap: DATA_IMPORT_VARIABLES['import-desktop-gap'],
    usage: 'Desktop-optimized layout',
  },
} as const;

// MASTER IMPORT VARIANTS - Όλα τα variants μαζί
export const DATA_IMPORT_VARIANTS = {
  steps: IMPORT_STEP_VARIANTS,
  fileSelector: FILE_SELECTOR_VARIANTS,
  validation: VALIDATION_MESSAGE_VARIANTS,
  fieldMapping: FIELD_MAPPING_VARIANTS,
  status: IMPORT_STATUS_VARIANTS,
  progress: PROGRESS_BAR_VARIANTS,
  buttons: IMPORT_BUTTON_VARIANTS,
  containers: IMPORT_CONTAINER_VARIANTS,
  responsive: RESPONSIVE_IMPORT_VARIANTS,
} as const;

// Helper types για type safety
export type ImportStepVariant = keyof typeof IMPORT_STEP_VARIANTS;
export type FileSelectorVariant = keyof typeof FILE_SELECTOR_VARIANTS;
export type ValidationVariant = keyof typeof VALIDATION_MESSAGE_VARIANTS;
export type FieldMappingVariant = keyof typeof FIELD_MAPPING_VARIANTS;
export type ImportStatusVariant = keyof typeof IMPORT_STATUS_VARIANTS;
export type ProgressBarVariant = keyof typeof PROGRESS_BAR_VARIANTS;
export type ImportButtonVariant = keyof typeof IMPORT_BUTTON_VARIANTS;
export type ImportContainerVariant = keyof typeof IMPORT_CONTAINER_VARIANTS;
export type ResponsiveVariant = keyof typeof RESPONSIVE_IMPORT_VARIANTS;