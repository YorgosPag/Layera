/**
 * 🔔 LAYERA FEEDBACK VARIANTS - Semantic feedback combinations
 *
 * Προκαθορισμένες συνδυασμοί feedback tokens για συγκεκριμένες χρήσεις
 * Component-ready feedback variants που χαρτογραφούν σε semantic tokens
 */

import { FEEDBACK_VARIABLES as FEEDBACK_SEMANTIC } from './feedback.variables';

// SEMANTIC FEEDBACK VARIANTS - Context-based feedback combinations
export const FEEDBACK_VARIANTS = {
  // Alert contexts
  alert: {
    success: {
      text: FEEDBACK_SEMANTIC['feedback-success-text'],
      background: FEEDBACK_SEMANTIC['feedback-success-background'],
      border: FEEDBACK_SEMANTIC['feedback-success-border'],
      icon: FEEDBACK_SEMANTIC['feedback-success-icon'],
      usage: 'Success alerts, confirmation messages',
    },
    warning: {
      text: FEEDBACK_SEMANTIC['feedback-warning-text'],
      background: FEEDBACK_SEMANTIC['feedback-warning-background'],
      border: FEEDBACK_SEMANTIC['feedback-warning-border'],
      icon: FEEDBACK_SEMANTIC['feedback-warning-icon'],
      usage: 'Warning alerts, cautionary messages',
    },
    error: {
      text: FEEDBACK_SEMANTIC['feedback-error-text'],
      background: FEEDBACK_SEMANTIC['feedback-error-background'],
      border: FEEDBACK_SEMANTIC['feedback-error-border'],
      icon: FEEDBACK_SEMANTIC['feedback-error-icon'],
      usage: 'Error alerts, validation messages',
    },
    info: {
      text: FEEDBACK_SEMANTIC['feedback-info-text'],
      background: FEEDBACK_SEMANTIC['feedback-info-background'],
      border: FEEDBACK_SEMANTIC['feedback-info-border'],
      icon: FEEDBACK_SEMANTIC['feedback-info-icon'],
      usage: 'Info alerts, helpful messages',
    },
    neutral: {
      text: FEEDBACK_SEMANTIC['feedback-info-text'],
      background: FEEDBACK_SEMANTIC['feedback-info-background'],
      border: FEEDBACK_SEMANTIC['feedback-info-border'],
      icon: FEEDBACK_SEMANTIC['feedback-info-icon'],
      usage: 'Neutral alerts, general messages',
    },
  },

  // Badge contexts
  badge: {
    success: {
      text: FEEDBACK_SEMANTIC['feedback-success-text'],
      background: FEEDBACK_SEMANTIC['feedback-success-background'],
      usage: 'Success badges, status indicators',
    },
    warning: {
      text: FEEDBACK_SEMANTIC['feedback-warning-text'],
      background: FEEDBACK_SEMANTIC['feedback-warning-background'],
      usage: 'Warning badges, attention indicators',
    },
    error: {
      text: FEEDBACK_SEMANTIC['feedback-error-text'],
      background: FEEDBACK_SEMANTIC['feedback-error-background'],
      usage: 'Error badges, critical indicators',
    },
    info: {
      text: FEEDBACK_SEMANTIC['feedback-info-text'],
      background: FEEDBACK_SEMANTIC['feedback-info-background'],
      usage: 'Info badges, informational indicators',
    },
  },

  // Input validation contexts
  validation: {
    success: {
      text: FEEDBACK_SEMANTIC['feedback-success-text'],
      border: FEEDBACK_SEMANTIC['feedback-success-border'],
      icon: FEEDBACK_SEMANTIC['feedback-success-icon'],
      usage: 'Valid input states, success feedback',
    },
    error: {
      text: FEEDBACK_SEMANTIC['feedback-error-text'],
      border: FEEDBACK_SEMANTIC['feedback-error-border'],
      icon: FEEDBACK_SEMANTIC['feedback-error-icon'],
      usage: 'Invalid input states, error feedback',
    },
    warning: {
      text: FEEDBACK_SEMANTIC['feedback-warning-text'],
      border: FEEDBACK_SEMANTIC['feedback-warning-border'],
      icon: FEEDBACK_SEMANTIC['feedback-warning-icon'],
      usage: 'Warning input states, cautionary feedback',
    },
  },

  // Toast/Notification contexts
  toast: {
    success: {
      text: FEEDBACK_SEMANTIC['feedback-success-text'],
      background: FEEDBACK_SEMANTIC['feedback-success-background'],
      border: FEEDBACK_SEMANTIC['feedback-success-border'],
      usage: 'Success notifications, completion messages',
    },
    warning: {
      text: FEEDBACK_SEMANTIC['feedback-warning-text'],
      background: FEEDBACK_SEMANTIC['feedback-warning-background'],
      border: FEEDBACK_SEMANTIC['feedback-warning-border'],
      usage: 'Warning notifications, cautionary toasts',
    },
    error: {
      text: FEEDBACK_SEMANTIC['feedback-error-text'],
      background: FEEDBACK_SEMANTIC['feedback-error-background'],
      border: FEEDBACK_SEMANTIC['feedback-error-border'],
      usage: 'Error notifications, failure messages',
    },
    info: {
      text: FEEDBACK_SEMANTIC['feedback-info-text'],
      background: FEEDBACK_SEMANTIC['feedback-info-background'],
      border: FEEDBACK_SEMANTIC['feedback-info-border'],
      usage: 'Info notifications, system messages',
    },
  },
} as const;

// Helper types
export type FeedbackVariant = keyof typeof FEEDBACK_VARIANTS;