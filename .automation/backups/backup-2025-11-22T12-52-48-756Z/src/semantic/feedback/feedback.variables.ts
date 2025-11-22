/**
 * 🔔 LAYERA FEEDBACK SEMANTIC TOKENS
 *
 * Semantic feedback tokens που χαρτογραφούν core colors σε συγκεκριμένες feedback χρήσεις
 * Enterprise semantic layer για alerts, notifications και status indicators
 */

import { COLOR_SCALE } from '../../core/colors/colors.variables';

// FEEDBACK SEMANTIC SCALE - Αφαιρέθηκε διπλότυπο export - μόνο FEEDBACK_VARIABLES

// UNIFIED FEEDBACK VARIABLES - CSS Variables για export
export const FEEDBACK_VARIABLES = {
  // Success feedback
  'feedback-success-text': COLOR_SCALE.success.dark,
  'feedback-success-background': COLOR_SCALE.success.light,
  'feedback-success-border': COLOR_SCALE.success.main,
  'feedback-success-icon': COLOR_SCALE.success.main,

  // Warning feedback
  'feedback-warning-text': COLOR_SCALE.warning.dark,
  'feedback-warning-background': COLOR_SCALE.warning.light,
  'feedback-warning-border': COLOR_SCALE.warning.main,
  'feedback-warning-icon': COLOR_SCALE.warning.main,

  // Error feedback
  'feedback-error-text': COLOR_SCALE.error.dark,
  'feedback-error-background': COLOR_SCALE.error.light,
  'feedback-error-border': COLOR_SCALE.error.main,
  'feedback-error-icon': COLOR_SCALE.error.main,

  // Info feedback
  'feedback-info-text': COLOR_SCALE.info.dark,
  'feedback-info-background': COLOR_SCALE.info.light,
  'feedback-info-border': COLOR_SCALE.info.main,
  'feedback-info-icon': COLOR_SCALE.info.main,

  // Neutral feedback
  'feedback-neutral-text': COLOR_SCALE.secondary[700],
  'feedback-neutral-background': COLOR_SCALE.secondary[50],
  'feedback-neutral-border': COLOR_SCALE.secondary[200],
  'feedback-neutral-icon': COLOR_SCALE.secondary[500],
} as const;

// Helper types για type safety
export type FeedbackVariables = keyof typeof FEEDBACK_VARIABLES;