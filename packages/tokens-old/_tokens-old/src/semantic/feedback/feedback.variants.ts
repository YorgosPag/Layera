/**
 * 🔔 LAYERA FEEDBACK VARIANTS - Semantic feedback combinations
 *
 * Προκαθορισμένες συνδυασμοί feedback tokens για συγκεκριμένες χρήσεις
 * Component-ready feedback variants που χαρτογραφούν σε semantic tokens
 */

import { FEEDBACK_SEMANTIC } from './feedback.variables';

// SEMANTIC FEEDBACK VARIANTS - Context-based feedback combinations
export const FEEDBACK_VARIANTS = {
  // Alert contexts
  alert: {
    success: {
      text: FEEDBACK_SEMANTIC.successText,
      background: FEEDBACK_SEMANTIC.successBackground,
      border: FEEDBACK_SEMANTIC.successBorder,
      icon: FEEDBACK_SEMANTIC.successIcon,
      usage: 'Success alerts, confirmation messages',
    },
    warning: {
      text: FEEDBACK_SEMANTIC.warningText,
      background: FEEDBACK_SEMANTIC.warningBackground,
      border: FEEDBACK_SEMANTIC.warningBorder,
      icon: FEEDBACK_SEMANTIC.warningIcon,
      usage: 'Warning alerts, cautionary messages',
    },
    error: {
      text: FEEDBACK_SEMANTIC.errorText,
      background: FEEDBACK_SEMANTIC.errorBackground,
      border: FEEDBACK_SEMANTIC.errorBorder,
      icon: FEEDBACK_SEMANTIC.errorIcon,
      usage: 'Error alerts, validation messages',
    },
    info: {
      text: FEEDBACK_SEMANTIC.infoText,
      background: FEEDBACK_SEMANTIC.infoBackground,
      border: FEEDBACK_SEMANTIC.infoBorder,
      icon: FEEDBACK_SEMANTIC.infoIcon,
      usage: 'Info alerts, helpful messages',
    },
    neutral: {
      text: FEEDBACK_SEMANTIC.neutralText,
      background: FEEDBACK_SEMANTIC.neutralBackground,
      border: FEEDBACK_SEMANTIC.neutralBorder,
      icon: FEEDBACK_SEMANTIC.neutralIcon,
      usage: 'Neutral alerts, general messages',
    },
  },

  // Badge contexts
  badge: {
    success: {
      text: FEEDBACK_SEMANTIC.successText,
      background: FEEDBACK_SEMANTIC.successBackground,
      usage: 'Success badges, status indicators',
    },
    warning: {
      text: FEEDBACK_SEMANTIC.warningText,
      background: FEEDBACK_SEMANTIC.warningBackground,
      usage: 'Warning badges, attention indicators',
    },
    error: {
      text: FEEDBACK_SEMANTIC.errorText,
      background: FEEDBACK_SEMANTIC.errorBackground,
      usage: 'Error badges, critical indicators',
    },
    info: {
      text: FEEDBACK_SEMANTIC.infoText,
      background: FEEDBACK_SEMANTIC.infoBackground,
      usage: 'Info badges, informational indicators',
    },
  },

  // Input validation contexts
  validation: {
    success: {
      text: FEEDBACK_SEMANTIC.successText,
      border: FEEDBACK_SEMANTIC.successBorder,
      icon: FEEDBACK_SEMANTIC.successIcon,
      usage: 'Valid input states, success feedback',
    },
    error: {
      text: FEEDBACK_SEMANTIC.errorText,
      border: FEEDBACK_SEMANTIC.errorBorder,
      icon: FEEDBACK_SEMANTIC.errorIcon,
      usage: 'Invalid input states, error feedback',
    },
    warning: {
      text: FEEDBACK_SEMANTIC.warningText,
      border: FEEDBACK_SEMANTIC.warningBorder,
      icon: FEEDBACK_SEMANTIC.warningIcon,
      usage: 'Warning input states, cautionary feedback',
    },
  },

  // Toast/Notification contexts
  toast: {
    success: {
      text: FEEDBACK_SEMANTIC.successText,
      background: FEEDBACK_SEMANTIC.successBackground,
      border: FEEDBACK_SEMANTIC.successBorder,
      usage: 'Success notifications, completion messages',
    },
    warning: {
      text: FEEDBACK_SEMANTIC.warningText,
      background: FEEDBACK_SEMANTIC.warningBackground,
      border: FEEDBACK_SEMANTIC.warningBorder,
      usage: 'Warning notifications, cautionary toasts',
    },
    error: {
      text: FEEDBACK_SEMANTIC.errorText,
      background: FEEDBACK_SEMANTIC.errorBackground,
      border: FEEDBACK_SEMANTIC.errorBorder,
      usage: 'Error notifications, failure messages',
    },
    info: {
      text: FEEDBACK_SEMANTIC.infoText,
      background: FEEDBACK_SEMANTIC.infoBackground,
      border: FEEDBACK_SEMANTIC.infoBorder,
      usage: 'Info notifications, system messages',
    },
  },
} as const;

// Helper types
export type FeedbackVariant = keyof typeof FEEDBACK_VARIANTS;