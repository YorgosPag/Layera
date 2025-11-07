/**
 * Cards - Unified Card Styling Constants
 * Single Source of Truth για τα στυλ των καρτών σε StepOrchestrator και WorkflowPlaceholder
 */

import { SPACING_SCALE, BORDER_RADIUS_SCALE } from './themes';
import { BRAND_COLORS } from './config';

/**
 * Standard στυλ για workflow/step cards που χρησιμοποιούνται
 * στο StepOrchestrator και WorkflowPlaceholder
 */
export const WORKFLOW_CARD_STYLES = {
  // Main container styles
  CONTAINER: {
    border: `var(--la-border-width-xxs) solid var(--color-border-strong)`, // 🎯 SST: Border width token
    borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
    padding: 'var(--la-space-6)', // 🎯 SST: LG padding (24px)
    margin: '0 auto',
    position: 'relative' as const,
    maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`,
    boxSizing: 'border-box' as const,
    backgroundColor: 'var(--la-card-background)' // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  },

  // 🌐 GLOBAL CARD COLORS - Single Source of Truth για ΟΛΕΣ τις κάρτες
  COLORS: {
    PRIMARY: 'var(--la-card-background)',   // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    SUCCESS: 'var(--la-card-background)',   // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    INFO: 'var(--la-card-background)',      // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    WARNING: 'var(--la-card-background)',   // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    ERROR: 'var(--la-card-background)',     // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    ORANGE: 'var(--la-card-background)'     // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  },

  // 🔲 GLOBAL CARD BORDERS - Single Source of Truth για ΟΛΕΣ τις κάρτες
  BORDERS: {
    PRIMARY: 'var(--la-card-border-color)',    // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    SUCCESS: 'var(--la-card-border-color)',    // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    INFO: 'var(--la-card-border-color)',       // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    WARNING: 'var(--la-card-border-color)',    // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    ERROR: 'var(--la-card-border-color)',      // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    ORANGE: 'var(--la-card-border-color)'      // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  },

  // Modal content styles (for StepOrchestrator modal)
  MODAL_CONTENT: {
    borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
    paddingTop: 'var(--la-space-6)', // 🎯 SST: LG padding (24px)
    paddingBottom: `${SPACING_SCALE.XL}px`,
    paddingLeft: 'var(--la-space-6)', // 🎯 SST: LG padding (24px)
    paddingRight: 'var(--la-space-6)', // 🎯 SST: LG padding (24px)
    border: `var(--la-border-width-xxs) solid ${BRAND_COLORS.PRIMARY}`, // 🎯 SST: Border width token
    position: 'relative' as const,
    maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`,
    backgroundColor: 'var(--la-card-background)' // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  },

  // Button container styles
  BUTTON_CONTAINER: {
    padding: `${SPACING_SCALE.MD}px ${SPACING_SCALE.XL}px`,
    border: `var(--la-border-width-xxs) solid var(--color-border-strong)`, // 🎯 SST: Border width token
    borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
    backgroundColor: 'var(--la-card-background)' // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  },

  // Internal step card styles
  STEP_CARD: {
    padding: `${SPACING_SCALE.MD}px`,
    borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
    border: `var(--la-border-width-xxs) solid ${BRAND_COLORS.PRIMARY}`, // 🎯 SST: Border width token
    backgroundColor: 'var(--la-color-error)', // 🎯 SST: Error color token
    // Browser button reset για να εξασφαλίσουμε SST compliance
    appearance: 'none' as const,
    outline: 'none',
    userSelect: 'none' as const,
    WebkitAppearance: 'none' as const,
    MozAppearance: 'none' as const,
    msUserSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    MozUserSelect: 'none' as const
  },

  // Step cards container styles
  STEP_CONTAINER: {
    width: '100%',
    maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`,
    alignSelf: 'center' as const,
    backgroundColor: 'var(--la-card-background)' // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
  }
} as const;

/**
 * Utility functions για consistent styling
 */
export const getWorkflowCardContainerStyle = () => WORKFLOW_CARD_STYLES.CONTAINER;
export const getWorkflowCardModalStyle = () => WORKFLOW_CARD_STYLES.MODAL_CONTENT;
export const getWorkflowCardButtonStyle = () => WORKFLOW_CARD_STYLES.BUTTON_CONTAINER;
export const getWorkflowCardStepStyle = () => WORKFLOW_CARD_STYLES.STEP_CARD;
export const getWorkflowCardStepContainerStyle = () => WORKFLOW_CARD_STYLES.STEP_CONTAINER;

/**
 * 🌐 GLOBAL COLOR UTILITIES - Single Source of Truth για ΟΛΕΣ τις κάρτες
 */
export const getCardPrimaryColor = () => WORKFLOW_CARD_STYLES.COLORS.PRIMARY;
export const getCardSuccessColor = () => WORKFLOW_CARD_STYLES.COLORS.SUCCESS;
export const getCardInfoColor = () => WORKFLOW_CARD_STYLES.COLORS.INFO;
export const getCardWarningColor = () => WORKFLOW_CARD_STYLES.COLORS.WARNING;
export const getCardErrorColor = () => WORKFLOW_CARD_STYLES.COLORS.ERROR;
export const getCardOrangeColor = () => WORKFLOW_CARD_STYLES.COLORS.WARNING; // Uses warning color token

/**
 * 🔲 GLOBAL BORDER UTILITIES - Single Source of Truth για ΟΛΕΣ τις κάρτες
 */
export const getCardPrimaryBorder = () => WORKFLOW_CARD_STYLES.BORDERS.PRIMARY;
export const getCardSuccessBorder = () => WORKFLOW_CARD_STYLES.BORDERS.SUCCESS;
export const getCardInfoBorder = () => WORKFLOW_CARD_STYLES.BORDERS.INFO;
export const getCardWarningBorder = () => WORKFLOW_CARD_STYLES.BORDERS.WARNING;
export const getCardErrorBorder = () => WORKFLOW_CARD_STYLES.BORDERS.ERROR;
export const getCardOrangeBorder = () => WORKFLOW_CARD_STYLES.BORDERS.WARNING; // Uses warning border token