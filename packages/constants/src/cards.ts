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
    border: `${SPACING_SCALE.XXS}px solid var(--color-border-strong)`,
    borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
    padding: `${SPACING_SCALE.LG}px`,
    margin: '0 auto',
    position: 'relative' as const,
    maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`,
    boxSizing: 'border-box' as const,
    backgroundColor: '#2994c6' // 🔴 SST: Ενιαίο χρώμα φόντο παντού
  },

  // 🌐 GLOBAL CARD COLORS - Single Source of Truth για ΟΛΕΣ τις κάρτες
  COLORS: {
    PRIMARY: '#8B4513',        // 🟤 Κύριο χρώμα κάρτας (καφέ παντού)
    SUCCESS: '#2994c6',        // 🟢 Success κάρτες (ενιαίο #2994c6 παντού)
    INFO: '#2994c6',           // 🔵 Info κάρτες (ενιαίο #2994c6 παντού)
    WARNING: '#2994c6',        // 🟡 Warning κάρτες (ενιαίο #2994c6 παντού)
    ERROR: '#2994c6',          // 🔴 Error κάρτες (ενιαίο #2994c6 παντού)
    ORANGE: '#2994c6'          // 🟠 Πορτοκαλί κάρτες (ενιαίο #2994c6 παντού)
  },

  // 🔲 GLOBAL CARD BORDERS - Single Source of Truth για ΟΛΕΣ τις κάρτες
  BORDERS: {
    PRIMARY: '#c5c722',        // 🔴 Κύριο περίγραμμα κάρτας (ενιαίο #c5c722 παντού)
    SUCCESS: '#c5c722',        // 🟢 Success περίγραμμα (ενιαίο #c5c722 παντού)
    INFO: '#c5c722',           // 🔵 Info περίγραμμα (ενιαίο #c5c722 παντού)
    WARNING: '#c5c722',        // 🟡 Warning περίγραμμα (ενιαίο #c5c722 παντού)
    ERROR: '#c5c722',          // 🔴 Error περίγραμμα (ενιαίο #c5c722 παντού)
    ORANGE: '#c5c722'          // 🟠 Πορτοκαλί περίγραμμα (ενιαίο #c5c722 παντού)
  },

  // Modal content styles (for StepOrchestrator modal)
  MODAL_CONTENT: {
    borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
    paddingTop: `${SPACING_SCALE.LG}px`,
    paddingBottom: `${SPACING_SCALE.XL}px`,
    paddingLeft: `${SPACING_SCALE.LG}px`,
    paddingRight: `${SPACING_SCALE.LG}px`,
    border: `${SPACING_SCALE.XXS}px solid ${BRAND_COLORS.PRIMARY}`,
    position: 'relative' as const,
    maxWidth: `${SPACING_SCALE.CONTAINER_MD}px`,
    backgroundColor: '#2994c6' // 🔴 SST: Ενιαίο χρώμα φόντο παντού
  },

  // Button container styles
  BUTTON_CONTAINER: {
    padding: `${SPACING_SCALE.MD}px ${SPACING_SCALE.XL}px`,
    border: `${SPACING_SCALE.XXS}px solid var(--color-border-strong)`,
    borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
    backgroundColor: '#2994c6' // 🔴 SST: Ενιαίο χρώμα φόντο παντού
  },

  // Internal step card styles
  STEP_CARD: {
    padding: `${SPACING_SCALE.MD}px`,
    borderRadius: `${BORDER_RADIUS_SCALE.MD}px`,
    border: `${SPACING_SCALE.XXS}px solid ${BRAND_COLORS.PRIMARY}`,
    backgroundColor: '#2994c6', // 🔴 SST: Ενιαίο χρώμα φόντο παντού
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
    backgroundColor: '#2994c6' // 🔴 SST: Ενιαίο χρώμα φόντο παντού
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
export const getCardOrangeColor = () => WORKFLOW_CARD_STYLES.COLORS.ORANGE;

/**
 * 🔲 GLOBAL BORDER UTILITIES - Single Source of Truth για ΟΛΕΣ τις κάρτες
 */
export const getCardPrimaryBorder = () => WORKFLOW_CARD_STYLES.BORDERS.PRIMARY;
export const getCardSuccessBorder = () => WORKFLOW_CARD_STYLES.BORDERS.SUCCESS;
export const getCardInfoBorder = () => WORKFLOW_CARD_STYLES.BORDERS.INFO;
export const getCardWarningBorder = () => WORKFLOW_CARD_STYLES.BORDERS.WARNING;
export const getCardErrorBorder = () => WORKFLOW_CARD_STYLES.BORDERS.ERROR;
export const getCardOrangeBorder = () => WORKFLOW_CARD_STYLES.BORDERS.ORANGE;