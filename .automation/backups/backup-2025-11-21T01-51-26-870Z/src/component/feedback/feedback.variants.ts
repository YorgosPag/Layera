/**
 * 📢 LAYERA FEEDBACK VARIANTS - CSS Classes & Component Combinations
 *
 * Pre-built CSS class combinations που συνδυάζουν variables για
 * complete feedback component styling (Alerts, Toasts, Notifications).
 * Enterprise-grade component system με full customization.
 */

// TYPE DEFINITIONS
export type FeedbackComponentVariantType = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type FeedbackComponentSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type FeedbackComponentStateType = 'visible' | 'entering' | 'exiting' | 'hidden';
export type FeedbackComponentTypeType = 'alert' | 'toast' | 'notification' | 'banner' | 'inline' | 'modal';

// BASE FEEDBACK CSS CLASSES
export const FEEDBACK_COMPONENT_BASE_CLASSES = {
  // Base feedback container
  base: 'layera-feedback layera-feedback--base',

  // Layout classes
  container: 'layera-feedback__container',
  wrapper: 'layera-feedback__wrapper',
  content: 'layera-feedback__content',

  // Icon classes
  icon: 'layera-feedback__icon',
  iconContainer: 'layera-feedback__icon-container',

  // Text content classes
  title: 'layera-feedback__title',
  message: 'layera-feedback__message',

  // Action classes
  actions: 'layera-feedback__actions',
  closeButton: 'layera-feedback__close',

  // Progress classes (για auto-dismiss)
  progress: 'layera-feedback__progress',
  progressBar: 'layera-feedback__progress-bar',
} as const;

// VARIANT CLASSES - Συνδυασμοί χρωμάτων και styles
export const FEEDBACK_COMPONENT_VARIANTS = {
  success: {
    container: 'layera-feedback layera-feedback--success',
    icon: 'layera-feedback__icon layera-feedback__icon--success',
    title: 'layera-feedback__title layera-feedback__title--success',
    message: 'layera-feedback__message layera-feedback__message--success',
    closeButton: 'layera-feedback__close layera-feedback__close--success',
    progressBar: 'layera-feedback__progress-bar layera-feedback__progress-bar--success',
  },

  warning: {
    container: 'layera-feedback layera-feedback--warning',
    icon: 'layera-feedback__icon layera-feedback__icon--warning',
    title: 'layera-feedback__title layera-feedback__title--warning',
    message: 'layera-feedback__message layera-feedback__message--warning',
    closeButton: 'layera-feedback__close layera-feedback__close--warning',
    progressBar: 'layera-feedback__progress-bar layera-feedback__progress-bar--warning',
  },

  error: {
    container: 'layera-feedback layera-feedback--error',
    icon: 'layera-feedback__icon layera-feedback__icon--error',
    title: 'layera-feedback__title layera-feedback__title--error',
    message: 'layera-feedback__message layera-feedback__message--error',
    closeButton: 'layera-feedback__close layera-feedback__close--error',
    progressBar: 'layera-feedback__progress-bar layera-feedback__progress-bar--error',
  },

  info: {
    container: 'layera-feedback layera-feedback--info',
    icon: 'layera-feedback__icon layera-feedback__icon--info',
    title: 'layera-feedback__title layera-feedback__title--info',
    message: 'layera-feedback__message layera-feedback__message--info',
    closeButton: 'layera-feedback__close layera-feedback__close--info',
    progressBar: 'layera-feedback__progress-bar layera-feedback__progress-bar--info',
  },

  neutral: {
    container: 'layera-feedback layera-feedback--neutral',
    icon: 'layera-feedback__icon layera-feedback__icon--neutral',
    title: 'layera-feedback__title layera-feedback__title--neutral',
    message: 'layera-feedback__message layera-feedback__message--neutral',
    closeButton: 'layera-feedback__close layera-feedback__close--neutral',
    progressBar: 'layera-feedback__progress-bar layera-feedback__progress-bar--neutral',
  },
} as const;

// SIZE CLASSES
export const FEEDBACK_COMPONENT_SIZES = {
  sm: {
    container: 'layera-feedback layera-feedback--sm',
    icon: 'layera-feedback__icon layera-feedback__icon--sm',
    title: 'layera-feedback__title layera-feedback__title--sm',
    message: 'layera-feedback__message layera-feedback__message--sm',
    closeButton: 'layera-feedback__close layera-feedback__close--sm',
    actions: 'layera-feedback__actions layera-feedback__actions--sm',
  },

  md: {
    container: 'layera-feedback layera-feedback--md',
    icon: 'layera-feedback__icon layera-feedback__icon--md',
    title: 'layera-feedback__title layera-feedback__title--md',
    message: 'layera-feedback__message layera-feedback__message--md',
    closeButton: 'layera-feedback__close layera-feedback__close--md',
    actions: 'layera-feedback__actions layera-feedback__actions--md',
  },

  lg: {
    container: 'layera-feedback layera-feedback--lg',
    icon: 'layera-feedback__icon layera-feedback__icon--lg',
    title: 'layera-feedback__title layera-feedback__title--lg',
    message: 'layera-feedback__message layera-feedback__message--lg',
    closeButton: 'layera-feedback__close layera-feedback__close--lg',
    actions: 'layera-feedback__actions layera-feedback__actions--lg',
  },

  xl: {
    container: 'layera-feedback layera-feedback--xl',
    icon: 'layera-feedback__icon layera-feedback__icon--xl',
    title: 'layera-feedback__title layera-feedback__title--xl',
    message: 'layera-feedback__message layera-feedback__message--xl',
    closeButton: 'layera-feedback__close layera-feedback__close--xl',
    actions: 'layera-feedback__actions layera-feedback__actions--xl',
  },
} as const;

// TYPE CLASSES - Διαφορετικοί τύποι feedback components
export const FEEDBACK_COMPONENT_TYPES = {
  alert: {
    container: 'layera-feedback layera-feedback--alert',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--alert',
  },

  toast: {
    container: 'layera-feedback layera-feedback--toast',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--toast',
  },

  notification: {
    container: 'layera-feedback layera-feedback--notification',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--notification',
  },

  banner: {
    container: 'layera-feedback layera-feedback--banner',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--banner',
  },

  inline: {
    container: 'layera-feedback layera-feedback--inline',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--inline',
  },

  modal: {
    container: 'layera-feedback layera-feedback--modal',
    wrapper: 'layera-feedback__wrapper layera-feedback__wrapper--modal',
  },
} as const;

// STATE CLASSES - Animation & visibility states
export const FEEDBACK_COMPONENT_STATES = {
  visible: 'layera-feedback--visible',
  entering: 'layera-feedback--entering',
  exiting: 'layera-feedback--exiting',
  hidden: 'layera-feedback--hidden',
  dismissible: 'layera-feedback--dismissible',
  permanent: 'layera-feedback--permanent',
} as const;

// POSITION CLASSES - Toast positioning
export const FEEDBACK_COMPONENT_POSITIONS = {
  'top-left': 'layera-feedback--position-top-left',
  'top-center': 'layera-feedback--position-top-center',
  'top-right': 'layera-feedback--position-top-right',
  'bottom-left': 'layera-feedback--position-bottom-left',
  'bottom-center': 'layera-feedback--position-bottom-center',
  'bottom-right': 'layera-feedback--position-bottom-right',
  'center': 'layera-feedback--position-center',
} as const;

// COMPREHENSIVE FEEDBACK COMPONENT VARIANTS - Όλα μαζί
export const FEEDBACK_COMPONENT_FULL_VARIANTS = {
  // Success variants
  'success-sm-alert': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.success.container} ${FEEDBACK_COMPONENT_SIZES.sm.container} ${FEEDBACK_COMPONENT_TYPES.alert.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.success.icon} ${FEEDBACK_COMPONENT_SIZES.sm.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.success.title} ${FEEDBACK_COMPONENT_SIZES.sm.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.success.message} ${FEEDBACK_COMPONENT_SIZES.sm.message}`,
  },

  'success-md-toast': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.success.container} ${FEEDBACK_COMPONENT_SIZES.md.container} ${FEEDBACK_COMPONENT_TYPES.toast.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.success.icon} ${FEEDBACK_COMPONENT_SIZES.md.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.success.title} ${FEEDBACK_COMPONENT_SIZES.md.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.success.message} ${FEEDBACK_COMPONENT_SIZES.md.message}`,
  },

  // Warning variants
  'warning-md-alert': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.warning.container} ${FEEDBACK_COMPONENT_SIZES.md.container} ${FEEDBACK_COMPONENT_TYPES.alert.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.warning.icon} ${FEEDBACK_COMPONENT_SIZES.md.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.warning.title} ${FEEDBACK_COMPONENT_SIZES.md.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.warning.message} ${FEEDBACK_COMPONENT_SIZES.md.message}`,
  },

  // Error variants
  'error-lg-banner': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.error.container} ${FEEDBACK_COMPONENT_SIZES.lg.container} ${FEEDBACK_COMPONENT_TYPES.banner.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.error.icon} ${FEEDBACK_COMPONENT_SIZES.lg.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.error.title} ${FEEDBACK_COMPONENT_SIZES.lg.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.error.message} ${FEEDBACK_COMPONENT_SIZES.lg.message}`,
  },

  // Info variants
  'info-md-notification': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.info.container} ${FEEDBACK_COMPONENT_SIZES.md.container} ${FEEDBACK_COMPONENT_TYPES.notification.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.info.icon} ${FEEDBACK_COMPONENT_SIZES.md.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.info.title} ${FEEDBACK_COMPONENT_SIZES.md.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.info.message} ${FEEDBACK_COMPONENT_SIZES.md.message}`,
  },

  // Neutral variants
  'neutral-sm-inline': {
    container: `${FEEDBACK_COMPONENT_VARIANTS.neutral.container} ${FEEDBACK_COMPONENT_SIZES.sm.container} ${FEEDBACK_COMPONENT_TYPES.inline.container}`,
    icon: `${FEEDBACK_COMPONENT_VARIANTS.neutral.icon} ${FEEDBACK_COMPONENT_SIZES.sm.icon}`,
    title: `${FEEDBACK_COMPONENT_VARIANTS.neutral.title} ${FEEDBACK_COMPONENT_SIZES.sm.title}`,
    message: `${FEEDBACK_COMPONENT_VARIANTS.neutral.message} ${FEEDBACK_COMPONENT_SIZES.sm.message}`,
  },
} as const;

// UTILITY CLASSES
export const FEEDBACK_COMPONENT_UTILITIES = {
  // Layout utilities
  'feedback-flex': 'layera-feedback--flex',
  'feedback-flex-column': 'layera-feedback--flex-column',
  'feedback-justify-center': 'layera-feedback--justify-center',
  'feedback-align-center': 'layera-feedback--align-center',

  // Spacing utilities
  'feedback-margin-auto': 'layera-feedback--margin-auto',
  'feedback-padding-none': 'layera-feedback--padding-none',

  // Animation utilities
  'feedback-fade': 'layera-feedback--fade',
  'feedback-slide': 'layera-feedback--slide',
  'feedback-shake': 'layera-feedback--shake',

  // Interaction utilities
  'feedback-clickable': 'layera-feedback--clickable',
  'feedback-non-clickable': 'layera-feedback--non-clickable',
} as const;

// HELPER FUNCTIONS για variant generation
export const generateFeedbackClasses = (
  variant: FeedbackComponentVariantType = 'info',
  size: FeedbackComponentSizeType = 'md',
  type: FeedbackComponentTypeType = 'alert',
  position?: string
) => {
  const baseClasses = FEEDBACK_COMPONENT_VARIANTS[variant];
  const sizeClasses = FEEDBACK_COMPONENT_SIZES[size];
  const typeClasses = FEEDBACK_COMPONENT_TYPES[type];

  return {
    container: `${baseClasses.container} ${sizeClasses.container} ${typeClasses.container}${position ? ` ${FEEDBACK_COMPONENT_POSITIONS[position as keyof typeof FEEDBACK_COMPONENT_POSITIONS]}` : ''}`,
    icon: `${baseClasses.icon} ${sizeClasses.icon}`,
    title: `${baseClasses.title} ${sizeClasses.title}`,
    message: `${baseClasses.message} ${sizeClasses.message}`,
    closeButton: `${baseClasses.closeButton} ${sizeClasses.closeButton}`,
    actions: sizeClasses.actions,
    wrapper: typeClasses.wrapper,
  };
};