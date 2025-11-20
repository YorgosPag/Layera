/**
 * 🔐 LAYERA AUTH BRIDGE COMPONENT TOKENS
 *
 * Component tokens για Authentication Bridge που χαρτογραφούν semantic tokens
 * σε συγκεκριμένες authentication χρήσεις
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

// UNIFIED AUTH BRIDGE VARIABLES - Όλα τα auth tokens ενωμένα για CSS export
export const AUTH_BRIDGE_VARIABLES = {
  // BASE AUTH CONTAINER TOKENS
  'auth-container-background': BACKGROUND_VARIABLES['background-default'],
  'auth-container-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-container-border-radius': BORDER_VARIABLES['border-radius-8'],
  'auth-container-shadow': SHADOW_VARIABLES['shadow-lg'],
  'auth-container-padding': SPACING_VARIABLES['spacing-8'],
  'auth-container-margin': SPACING_VARIABLES['spacing-4'],
  'auth-container-max-width': '400px',
  'auth-container-min-height': '500px',

  // AUTH FORM TOKENS
  'auth-form-background': BACKGROUND_VARIABLES['background-default'],
  'auth-form-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'auth-form-border-radius': BORDER_VARIABLES['border-radius-6'],
  'auth-form-padding': SPACING_VARIABLES['spacing-6'],
  'auth-form-gap': SPACING_VARIABLES['spacing-4'],
  'auth-form-shadow': SHADOW_VARIABLES['shadow-sm'],

  // AUTH HEADER TOKENS
  'auth-header-background': BACKGROUND_VARIABLES['background-default'],
  'auth-header-padding': SPACING_VARIABLES['spacing-6'],
  'auth-header-text-align': 'center',
  'auth-header-border-bottom': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'auth-logo-size': SPACING_VARIABLES['spacing-12'],
  'auth-logo-margin-bottom': SPACING_VARIABLES['spacing-4'],

  // AUTH TITLE & SUBTITLE TOKENS
  'auth-title-color': TEXT_VARIABLES['text-primary'],
  'auth-title-font-size': '24px',
  'auth-title-font-weight': '700',
  'auth-title-line-height': '1.2',
  'auth-title-margin-bottom': SPACING_VARIABLES['spacing-2'],
  'auth-subtitle-color': TEXT_VARIABLES['text-secondary'],
  'auth-subtitle-font-size': '14px',
  'auth-subtitle-font-weight': '400',
  'auth-subtitle-line-height': '1.4',
  'auth-subtitle-margin-bottom': SPACING_VARIABLES['spacing-4'],

  // AUTH INPUT TOKENS
  'auth-input-background': BACKGROUND_VARIABLES['background-default'],
  'auth-input-background-focus': BACKGROUND_VARIABLES['background-default'],
  'auth-input-background-error': BACKGROUND_VARIABLES['background-error'],
  'auth-input-background-success': BACKGROUND_VARIABLES['background-success'],
  'auth-input-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-input-border-focus': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-input-border-error': BORDER_SEMANTIC_VARIABLES['border-error'],
  'auth-input-border-success': BORDER_SEMANTIC_VARIABLES['border-success'],
  'auth-input-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-input-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'auth-input-font-size': '14px',
  'auth-input-line-height': '1.4',
  'auth-input-text-color': TEXT_VARIABLES['text-primary'],
  'auth-input-placeholder-color': TEXT_VARIABLES['text-tertiary'],
  'auth-input-transition': MOTION_VARIABLES['transition-fast'],

  // AUTH LABEL TOKENS
  'auth-label-color': TEXT_VARIABLES['text-primary'],
  'auth-label-font-size': '14px',
  'auth-label-font-weight': '500',
  'auth-label-margin-bottom': SPACING_VARIABLES['spacing-1'],
  'auth-label-required-color': TEXT_VARIABLES['text-error'],

  // AUTH BUTTON TOKENS
  'auth-button-primary-background': BACKGROUND_VARIABLES['background-active'],
  'auth-button-primary-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'auth-button-primary-background-active': BACKGROUND_VARIABLES['background-active'],
  'auth-button-primary-background-disabled': BACKGROUND_VARIABLES['background-disabled'],
  'auth-button-primary-text': TEXT_VARIABLES['text-primary'],
  'auth-button-primary-text-disabled': TEXT_VARIABLES['text-disabled'],
  'auth-button-primary-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-button-primary-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-button-primary-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-6']}`,
  'auth-button-primary-font-size': '14px',
  'auth-button-primary-font-weight': '600',
  'auth-button-primary-transition': MOTION_VARIABLES['transition-fast'],
  'auth-button-primary-shadow': SHADOW_VARIABLES['shadow-sm'],

  // AUTH SECONDARY BUTTON TOKENS
  'auth-button-secondary-background': 'transparent',
  'auth-button-secondary-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'auth-button-secondary-text': TEXT_VARIABLES['text-secondary'],
  'auth-button-secondary-text-hover': TEXT_VARIABLES['text-primary'],
  'auth-button-secondary-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-button-secondary-border-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],
  'auth-button-secondary-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-6']}`,

  // AUTH LINK TOKENS
  'auth-link-color': TEXT_VARIABLES['text-link'],
  'auth-link-color-hover': TEXT_VARIABLES['text-link-hover'],
  'auth-link-font-size': '14px',
  'auth-link-font-weight': '500',
  'auth-link-text-decoration': 'none',
  'auth-link-text-decoration-hover': 'underline',

  // AUTH ERROR MESSAGE TOKENS
  'auth-error-background': BACKGROUND_VARIABLES['background-error'],
  'auth-error-border': BORDER_SEMANTIC_VARIABLES['border-error'],
  'auth-error-text': TEXT_VARIABLES['text-primary'],
  'auth-error-icon-color': TEXT_VARIABLES['text-error'],
  'auth-error-padding': SPACING_VARIABLES['spacing-3'],
  'auth-error-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-error-margin-bottom': SPACING_VARIABLES['spacing-3'],
  'auth-error-font-size': '12px',

  // AUTH SUCCESS MESSAGE TOKENS
  'auth-success-background': BACKGROUND_VARIABLES['background-success'],
  'auth-success-border': BORDER_SEMANTIC_VARIABLES['border-success'],
  'auth-success-text': TEXT_VARIABLES['text-primary'],
  'auth-success-icon-color': TEXT_VARIABLES['text-success'],
  'auth-success-padding': SPACING_VARIABLES['spacing-3'],
  'auth-success-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-success-margin-bottom': SPACING_VARIABLES['spacing-3'],

  // AUTH WARNING MESSAGE TOKENS
  'auth-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'auth-warning-border': BORDER_SEMANTIC_VARIABLES['border-warning'],
  'auth-warning-text': TEXT_VARIABLES['text-primary'],
  'auth-warning-icon-color': TEXT_VARIABLES['text-warning'],
  'auth-warning-padding': SPACING_VARIABLES['spacing-3'],
  'auth-warning-border-radius': BORDER_VARIABLES['border-radius-4'],

  // OAUTH PROVIDER TOKENS
  'auth-oauth-container-padding': SPACING_VARIABLES['spacing-4'],
  'auth-oauth-container-gap': SPACING_VARIABLES['spacing-3'],
  'auth-oauth-button-background': BACKGROUND_VARIABLES['background-default'],
  'auth-oauth-button-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'auth-oauth-button-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-oauth-button-border-hover': BORDER_SEMANTIC_VARIABLES['border-hover'],
  'auth-oauth-button-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-oauth-button-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'auth-oauth-button-text': TEXT_VARIABLES['text-primary'],
  'auth-oauth-button-font-size': '14px',
  'auth-oauth-button-font-weight': '500',
  'auth-oauth-icon-size': SPACING_VARIABLES['spacing-5'],
  'auth-oauth-icon-margin-right': SPACING_VARIABLES['spacing-2'],

  // OAUTH DIVIDER TOKENS
  'auth-divider-color': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-divider-text-color': TEXT_VARIABLES['text-tertiary'],
  'auth-divider-text-background': BACKGROUND_VARIABLES['background-default'],
  'auth-divider-margin': `${SPACING_VARIABLES['spacing-4']} 0`,
  'auth-divider-font-size': '12px',
  'auth-divider-padding': `0 ${SPACING_VARIABLES['spacing-3']}`,

  // PASSWORD STRENGTH TOKENS
  'auth-password-strength-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-password-strength-border-radius': BORDER_VARIABLES['border-radius-2'],
  'auth-password-strength-height': SPACING_VARIABLES['spacing-1'],
  'auth-password-strength-margin-top': SPACING_VARIABLES['spacing-2'],
  'auth-password-strength-weak-color': TEXT_VARIABLES['text-error'],
  'auth-password-strength-medium-color': TEXT_VARIABLES['text-warning'],
  'auth-password-strength-strong-color': TEXT_VARIABLES['text-success'],
  'auth-password-strength-text-size': '12px',

  // MFA/2FA TOKENS
  'auth-mfa-container-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-mfa-container-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-mfa-container-border-radius': BORDER_VARIABLES['border-radius-6'],
  'auth-mfa-container-padding': SPACING_VARIABLES['spacing-4'],
  'auth-mfa-code-input-background': BACKGROUND_VARIABLES['background-default'],
  'auth-mfa-code-input-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-mfa-code-input-border-radius': BORDER_VARIABLES['border-radius-4'],
  'auth-mfa-code-input-width': SPACING_VARIABLES['spacing-12'],
  'auth-mfa-code-input-height': SPACING_VARIABLES['spacing-12'],
  'auth-mfa-code-input-font-size': '18px',
  'auth-mfa-code-input-font-weight': '600',
  'auth-mfa-code-input-text-align': 'center',
  'auth-mfa-code-container-gap': SPACING_VARIABLES['spacing-2'],

  // SESSION MANAGEMENT TOKENS
  'auth-session-indicator-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-session-indicator-text': TEXT_VARIABLES['text-secondary'],
  'auth-session-indicator-padding': `${SPACING_VARIABLES['spacing-1']} ${SPACING_VARIABLES['spacing-3']}`,
  'auth-session-indicator-border-radius': BORDER_VARIABLES['border-radius-full'],
  'auth-session-indicator-font-size': '12px',
  'auth-session-timeout-warning-background': BACKGROUND_VARIABLES['background-warning'],
  'auth-session-timeout-warning-text': TEXT_VARIABLES['text-primary'],
  'auth-session-active-indicator': TEXT_VARIABLES['text-success'],
  'auth-session-expired-indicator': TEXT_VARIABLES['text-error'],

  // AUTH MODAL/POPUP TOKENS
  'auth-modal-overlay-background': 'rgba(0, 0, 0, 0.5)',
  'auth-modal-background': BACKGROUND_VARIABLES['background-default'],
  'auth-modal-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-modal-border-radius': BORDER_VARIABLES['border-radius-8'],
  'auth-modal-shadow': SHADOW_VARIABLES['shadow-xl'],
  'auth-modal-padding': SPACING_VARIABLES['spacing-6'],
  'auth-modal-max-width': '420px',
  'auth-modal-z-index': '1000',

  // AUTH LOADING STATES
  'auth-loading-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-loading-text': TEXT_VARIABLES['text-secondary'],
  'auth-loading-spinner-size': SPACING_VARIABLES['spacing-5'],
  'auth-loading-spinner-border-width': '2px',
  'auth-loading-spinner-border-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-loading-animation-duration': MOTION_VARIABLES['duration-slow'],

  // AUTH STEP INDICATOR TOKENS (για multi-step auth)
  'auth-step-indicator-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-step-indicator-background-active': BACKGROUND_VARIABLES['background-active'],
  'auth-step-indicator-background-completed': BACKGROUND_VARIABLES['background-success'],
  'auth-step-indicator-text': TEXT_VARIABLES['text-secondary'],
  'auth-step-indicator-text-active': TEXT_VARIABLES['text-primary'],
  'auth-step-indicator-text-completed': TEXT_VARIABLES['text-primary'],
  'auth-step-indicator-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-step-indicator-border-active': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-step-indicator-size': SPACING_VARIABLES['spacing-8'],
  'auth-step-indicator-border-radius': BORDER_VARIABLES['border-radius-full'],

  // AUTH REMEMBER ME TOKENS
  'auth-remember-checkbox-background': BACKGROUND_VARIABLES['background-default'],
  'auth-remember-checkbox-background-checked': BACKGROUND_VARIABLES['background-active'],
  'auth-remember-checkbox-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'auth-remember-checkbox-border-checked': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'auth-remember-checkbox-size': SPACING_VARIABLES['spacing-4'],
  'auth-remember-checkbox-border-radius': BORDER_VARIABLES['border-radius-2'],
  'auth-remember-label-color': TEXT_VARIABLES['text-secondary'],
  'auth-remember-label-font-size': '13px',

  // AUTH FOOTER TOKENS
  'auth-footer-background': BACKGROUND_VARIABLES['background-muted'],
  'auth-footer-border-top': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'auth-footer-padding': SPACING_VARIABLES['spacing-4'],
  'auth-footer-text-color': TEXT_VARIABLES['text-tertiary'],
  'auth-footer-text-align': 'center',
  'auth-footer-font-size': '12px',
  'auth-footer-link-color': TEXT_VARIABLES['text-link'],

  // AUTH TRANSITIONS & ANIMATIONS
  'auth-form-transition': `all ${MOTION_VARIABLES['duration-normal']} ${MOTION_VARIABLES['easing-ease-out']}`,
  'auth-input-focus-transition': `border-color ${MOTION_VARIABLES['duration-fast']} ${MOTION_VARIABLES['easing-ease-out']}`,
  'auth-button-hover-transition': `all ${MOTION_VARIABLES['duration-fast']} ${MOTION_VARIABLES['easing-ease-out']}`,
  'auth-modal-enter-animation': `fadeIn ${MOTION_VARIABLES['duration-normal']} ${MOTION_VARIABLES['easing-ease-out']}`,
  'auth-modal-exit-animation': `fadeOut ${MOTION_VARIABLES['duration-fast']} ${MOTION_VARIABLES['easing-ease-out']}`,

  // AUTH RESPONSIVE TOKENS
  'auth-mobile-container-padding': SPACING_VARIABLES['spacing-4'],
  'auth-mobile-form-padding': SPACING_VARIABLES['spacing-4'],
  'auth-mobile-button-font-size': '16px',
  'auth-mobile-input-font-size': '16px',
  'auth-desktop-container-padding': SPACING_VARIABLES['spacing-8'],

  // AUTH ACCESSIBILITY TOKENS
  'auth-focus-outline': `2px solid ${BORDER_SEMANTIC_VARIABLES['border-focus']}`,
  'auth-focus-outline-offset': '2px',
  'auth-screen-reader-only': 'sr-only',
  'auth-high-contrast-border': '2px solid',
  'auth-high-contrast-text': 'currentColor',
} as const;

// Helper types για type safety
export type AuthFlowType = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'mfa' | 'verify-email';
export type AuthState = 'idle' | 'loading' | 'success' | 'error' | 'warning';
export type AuthInputType = 'email' | 'password' | 'text' | 'tel' | 'mfa-code';
export type AuthProviderType = 'google' | 'facebook' | 'github' | 'microsoft' | 'apple' | 'twitter';
export type AuthButtonType = 'primary' | 'secondary' | 'oauth' | 'link';
export type AuthModalType = 'popup' | 'inline' | 'fullscreen';
export type AuthPasswordStrength = 'weak' | 'medium' | 'strong';
export type AuthSessionState = 'active' | 'expired' | 'timeout-warning';