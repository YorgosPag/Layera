/**
 * 📂 LAYERA AUTH BRIDGE VARIANTS - Προκαθορισμένοι συνδυασμοί auth bridge tokens
 *
 * Component-ready auth variants που χαρτογραφούν σε component tokens
 * Παρέχει έτοιμες συνταγές για διαφορετικούς τύπους authentication workflows
 */

import { AUTH_BRIDGE_VARIABLES } from './auth-bridge.variables';

// LOGIN FORM VARIANTS - Διαφορετικά στυλ login forms
export const LOGIN_FORM_VARIANTS = {
  // Default login form
  default: {
    background: AUTH_BRIDGE_VARIABLES['auth-container-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-container-border'],
    padding: AUTH_BRIDGE_VARIABLES['auth-container-padding'],
    gap: AUTH_BRIDGE_VARIABLES['auth-form-gap'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-container-border-radius'],
    width: AUTH_BRIDGE_VARIABLES['auth-form-width'],
    usage: 'Standard login form με email και password',
  },

  // Compact login form
  compact: {
    background: AUTH_BRIDGE_VARIABLES['auth-container-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-container-border'],
    padding: AUTH_BRIDGE_VARIABLES['auth-form-padding-compact'],
    gap: AUTH_BRIDGE_VARIABLES['auth-form-gap-compact'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-container-border-radius'],
    width: AUTH_BRIDGE_VARIABLES['auth-form-width-compact'],
    usage: 'Compact login form για modals και dialogs',
  },

  // Full-screen login form
  fullscreen: {
    background: AUTH_BRIDGE_VARIABLES['auth-container-background'],
    border: 'none',
    padding: AUTH_BRIDGE_VARIABLES['auth-container-padding'],
    gap: AUTH_BRIDGE_VARIABLES['auth-form-gap'],
    borderRadius: '0',
    width: '100%',
    usage: 'Full-screen login για splash pages',
  },
} as const;

// AUTH INPUT VARIANTS - Διαφορετικές καταστάσεις auth inputs
export const AUTH_INPUT_VARIANTS = {
  // Default input state
  default: {
    background: AUTH_BRIDGE_VARIABLES['auth-input-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-input-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-input-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-input-padding'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-input-text'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    height: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    usage: 'Default auth input field',
  },

  // Focus state
  focus: {
    background: AUTH_BRIDGE_VARIABLES['auth-input-background-focus'],
    border: AUTH_BRIDGE_VARIABLES['auth-input-border-focus'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-input-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-input-padding'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-input-text'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    height: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    usage: 'Auth input με focus',
  },

  // Error state
  error: {
    background: AUTH_BRIDGE_VARIABLES['auth-input-background-error'],
    border: AUTH_BRIDGE_VARIABLES['auth-input-border-error'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-input-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-input-padding'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-input-text-error'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    height: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    usage: 'Auth input με validation error',
  },

  // Success state
  success: {
    background: AUTH_BRIDGE_VARIABLES['auth-input-background-success'],
    border: AUTH_BRIDGE_VARIABLES['auth-input-border-success'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-input-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-input-padding'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-input-text-success'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    height: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    usage: 'Auth input με successful validation',
  },
} as const;

// AUTH BUTTON VARIANTS - Διαφορετικά κουμπιά για auth actions
export const AUTH_BUTTON_VARIANTS = {
  // Primary login button
  primary: {
    background: AUTH_BRIDGE_VARIABLES['auth-button-background-primary'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-button-text-primary'],
    border: AUTH_BRIDGE_VARIABLES['auth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-button-padding'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-button-font-size'],
    fontWeight: AUTH_BRIDGE_VARIABLES['auth-button-font-weight'],
    height: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    usage: 'Primary login/signup button',
  },

  // Secondary auth button
  secondary: {
    background: AUTH_BRIDGE_VARIABLES['auth-button-background-secondary'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-button-text-secondary'],
    border: AUTH_BRIDGE_VARIABLES['auth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-button-padding'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-button-font-size'],
    fontWeight: AUTH_BRIDGE_VARIABLES['auth-button-font-weight'],
    height: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    usage: 'Secondary auth actions',
  },

  // Outline auth button
  outline: {
    background: 'transparent',
    textColor: AUTH_BRIDGE_VARIABLES['auth-button-text-outline'],
    border: AUTH_BRIDGE_VARIABLES['auth-button-border-outline'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-button-padding'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-button-font-size'],
    fontWeight: AUTH_BRIDGE_VARIABLES['auth-button-font-weight'],
    height: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    usage: 'Outline auth button για subtle actions',
  },

  // Disabled button
  disabled: {
    background: AUTH_BRIDGE_VARIABLES['auth-button-background-disabled'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-button-text-disabled'],
    border: AUTH_BRIDGE_VARIABLES['auth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-button-padding'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-button-font-size'],
    fontWeight: AUTH_BRIDGE_VARIABLES['auth-button-font-weight'],
    height: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    usage: 'Disabled auth button state',
  },
} as const;

// OAUTH PROVIDER VARIANTS - Διαφορετικά OAuth providers
export const OAUTH_PROVIDER_VARIANTS = {
  // Google OAuth
  google: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-google-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-google-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'Google OAuth login button',
  },

  // Facebook OAuth
  facebook: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-facebook-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-facebook-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'Facebook OAuth login button',
  },

  // GitHub OAuth
  github: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-github-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-github-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'GitHub OAuth login button',
  },

  // Microsoft OAuth
  microsoft: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-microsoft-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-microsoft-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'Microsoft OAuth login button',
  },

  // Apple OAuth
  apple: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-apple-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-apple-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'Apple OAuth login button',
  },

  // Generic OAuth
  generic: {
    background: AUTH_BRIDGE_VARIABLES['auth-oauth-generic-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-oauth-generic-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-oauth-button-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-oauth-button-padding'],
    height: AUTH_BRIDGE_VARIABLES['auth-oauth-button-height'],
    iconSize: AUTH_BRIDGE_VARIABLES['auth-oauth-icon-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-oauth-button-gap'],
    usage: 'Generic OAuth provider button',
  },
} as const;

// MFA VARIANTS - Multi-Factor Authentication variants
export const MFA_VARIANTS = {
  // MFA container
  container: {
    background: AUTH_BRIDGE_VARIABLES['auth-mfa-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-mfa-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-mfa-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-mfa-padding'],
    gap: AUTH_BRIDGE_VARIABLES['auth-mfa-gap'],
    usage: 'MFA challenge container',
  },

  // MFA code input
  codeInput: {
    background: AUTH_BRIDGE_VARIABLES['auth-input-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-input-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-input-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-mfa-code-padding'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-input-text'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-mfa-code-font-size'],
    textAlign: 'center',
    width: AUTH_BRIDGE_VARIABLES['auth-mfa-code-width'],
    height: AUTH_BRIDGE_VARIABLES['auth-mfa-code-height'],
    usage: 'Individual MFA code digit input',
  },

  // MFA QR code
  qrCode: {
    background: AUTH_BRIDGE_VARIABLES['auth-mfa-qr-background'],
    border: AUTH_BRIDGE_VARIABLES['auth-mfa-qr-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-mfa-qr-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-mfa-qr-padding'],
    size: AUTH_BRIDGE_VARIABLES['auth-mfa-qr-size'],
    usage: 'MFA setup QR code container',
  },
} as const;

// PASSWORD STRENGTH VARIANTS - Password strength indicators
export const PASSWORD_STRENGTH_VARIANTS = {
  // Weak password
  weak: {
    background: AUTH_BRIDGE_VARIABLES['auth-password-weak-background'],
    color: AUTH_BRIDGE_VARIABLES['auth-password-weak-color'],
    border: AUTH_BRIDGE_VARIABLES['auth-password-weak-border'],
    usage: 'Weak password strength indicator',
  },

  // Medium password
  medium: {
    background: AUTH_BRIDGE_VARIABLES['auth-password-medium-background'],
    color: AUTH_BRIDGE_VARIABLES['auth-password-medium-color'],
    border: AUTH_BRIDGE_VARIABLES['auth-password-medium-border'],
    usage: 'Medium password strength indicator',
  },

  // Strong password
  strong: {
    background: AUTH_BRIDGE_VARIABLES['auth-password-strong-background'],
    color: AUTH_BRIDGE_VARIABLES['auth-password-strong-color'],
    border: AUTH_BRIDGE_VARIABLES['auth-password-strong-border'],
    usage: 'Strong password strength indicator',
  },

  // Very strong password
  veryStrong: {
    background: AUTH_BRIDGE_VARIABLES['auth-password-very-strong-background'],
    color: AUTH_BRIDGE_VARIABLES['auth-password-very-strong-color'],
    border: AUTH_BRIDGE_VARIABLES['auth-password-very-strong-border'],
    usage: 'Very strong password strength indicator',
  },
} as const;

// SESSION STATUS VARIANTS - Session status indicators
export const SESSION_STATUS_VARIANTS = {
  // Active session
  active: {
    background: AUTH_BRIDGE_VARIABLES['auth-session-active-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-session-active-text'],
    indicatorColor: AUTH_BRIDGE_VARIABLES['auth-session-active-indicator'],
    usage: 'Active session indicator',
  },

  // Expired session
  expired: {
    background: AUTH_BRIDGE_VARIABLES['auth-session-expired-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-session-expired-text'],
    indicatorColor: AUTH_BRIDGE_VARIABLES['auth-session-expired-indicator'],
    usage: 'Expired session indicator',
  },

  // Expiring soon session
  expiringSoon: {
    background: AUTH_BRIDGE_VARIABLES['auth-session-expiring-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-session-expiring-text'],
    indicatorColor: AUTH_BRIDGE_VARIABLES['auth-session-expiring-indicator'],
    usage: 'Session expiring soon indicator',
  },
} as const;

// AUTH ERROR VARIANTS - Authentication error messages
export const AUTH_ERROR_VARIANTS = {
  // Invalid credentials
  invalidCredentials: {
    background: AUTH_BRIDGE_VARIABLES['auth-error-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-error-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-error-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-error-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-error-padding'],
    iconColor: AUTH_BRIDGE_VARIABLES['auth-error-icon-color'],
    usage: 'Invalid login credentials error',
  },

  // Account locked
  accountLocked: {
    background: AUTH_BRIDGE_VARIABLES['auth-error-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-error-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-error-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-error-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-error-padding'],
    iconColor: AUTH_BRIDGE_VARIABLES['auth-error-icon-color'],
    usage: 'Account locked error message',
  },

  // Password reset required
  passwordReset: {
    background: AUTH_BRIDGE_VARIABLES['auth-warning-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-warning-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-warning-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-error-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-error-padding'],
    iconColor: AUTH_BRIDGE_VARIABLES['auth-warning-icon-color'],
    usage: 'Password reset required warning',
  },

  // Network error
  networkError: {
    background: AUTH_BRIDGE_VARIABLES['auth-error-background'],
    textColor: AUTH_BRIDGE_VARIABLES['auth-error-text'],
    border: AUTH_BRIDGE_VARIABLES['auth-error-border'],
    borderRadius: AUTH_BRIDGE_VARIABLES['auth-error-border-radius'],
    padding: AUTH_BRIDGE_VARIABLES['auth-error-padding'],
    iconColor: AUTH_BRIDGE_VARIABLES['auth-error-icon-color'],
    usage: 'Network connection error',
  },
} as const;

// RESPONSIVE AUTH VARIANTS - Mobile/Desktop adaptations
export const RESPONSIVE_AUTH_VARIANTS = {
  mobile: {
    containerPadding: AUTH_BRIDGE_VARIABLES['auth-mobile-padding'],
    formWidth: AUTH_BRIDGE_VARIABLES['auth-mobile-form-width'],
    inputHeight: AUTH_BRIDGE_VARIABLES['auth-mobile-input-height'],
    buttonHeight: AUTH_BRIDGE_VARIABLES['auth-mobile-button-height'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-mobile-font-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-mobile-gap'],
    usage: 'Mobile-optimized auth layout',
  },

  tablet: {
    containerPadding: AUTH_BRIDGE_VARIABLES['auth-tablet-padding'],
    formWidth: AUTH_BRIDGE_VARIABLES['auth-tablet-form-width'],
    inputHeight: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    buttonHeight: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-form-gap'],
    usage: 'Tablet-optimized auth layout',
  },

  desktop: {
    containerPadding: AUTH_BRIDGE_VARIABLES['auth-desktop-padding'],
    formWidth: AUTH_BRIDGE_VARIABLES['auth-form-width'],
    inputHeight: AUTH_BRIDGE_VARIABLES['auth-input-height'],
    buttonHeight: AUTH_BRIDGE_VARIABLES['auth-button-height'],
    fontSize: AUTH_BRIDGE_VARIABLES['auth-input-font-size'],
    gap: AUTH_BRIDGE_VARIABLES['auth-form-gap'],
    usage: 'Desktop-optimized auth layout',
  },
} as const;

// MASTER AUTH BRIDGE VARIANTS - Όλα τα variants μαζί
export const AUTH_BRIDGE_VARIANTS = {
  forms: LOGIN_FORM_VARIANTS,
  inputs: AUTH_INPUT_VARIANTS,
  buttons: AUTH_BUTTON_VARIANTS,
  oauth: OAUTH_PROVIDER_VARIANTS,
  mfa: MFA_VARIANTS,
  passwordStrength: PASSWORD_STRENGTH_VARIANTS,
  sessionStatus: SESSION_STATUS_VARIANTS,
  errors: AUTH_ERROR_VARIANTS,
  responsive: RESPONSIVE_AUTH_VARIANTS,
} as const;

// Helper types για type safety
export type LoginFormVariant = keyof typeof LOGIN_FORM_VARIANTS;
export type AuthInputVariant = keyof typeof AUTH_INPUT_VARIANTS;
export type AuthButtonVariant = keyof typeof AUTH_BUTTON_VARIANTS;
export type OAuthProviderVariant = keyof typeof OAUTH_PROVIDER_VARIANTS;
export type MfaVariant = keyof typeof MFA_VARIANTS;
export type PasswordStrengthVariant = keyof typeof PASSWORD_STRENGTH_VARIANTS;
export type SessionStatusVariant = keyof typeof SESSION_STATUS_VARIANTS;
export type AuthErrorVariant = keyof typeof AUTH_ERROR_VARIANTS;
export type ResponsiveAuthVariant = keyof typeof RESPONSIVE_AUTH_VARIANTS;