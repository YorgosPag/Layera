/**
 * Auth Bridge Index - Export all auth bridge tokens
 *
 * 📂 Κεντρικό σημείο export για όλο το auth bridge system
 * - Variables & actual values
 * - Variants & component combinations
 * - Class system & CSS generation
 *
 * Enterprise Standards:
 * - TypeScript strict mode
 * - React 19.1.1 compatible
 * - Single export point για auth bridge
 */

// Actual auth bridge values
export {
  AUTH_BRIDGE_VARIABLES,
} from './auth-bridge.variables';

// Auth bridge variants
export {
  AUTH_BRIDGE_VARIANTS,
  LOGIN_FORM_VARIANTS,
  AUTH_INPUT_VARIANTS,
  AUTH_BUTTON_VARIANTS,
  OAUTH_PROVIDER_VARIANTS,
  MFA_VARIANTS,
  PASSWORD_STRENGTH_VARIANTS,
  SESSION_STATUS_VARIANTS,
  AUTH_ERROR_VARIANTS,
  RESPONSIVE_AUTH_VARIANTS,
} from './auth-bridge.variants';

// Auth bridge component system class
export {
  AuthBridgeComponentSystem,
  LAYERA_AUTH_BRIDGE_CSS,
  getAuthBridgeCSS,
} from './auth-bridge.class';

// Helper types from variables file
export type {
  LoginFormType,
  AuthInputType,
  AuthButtonType,
  OAuthProvider,
  MfaMethodType,
  PasswordStrengthLevel,
  SessionState,
  AuthErrorType,
  AuthValidationType,
  AuthLoadingState,
  AuthResponseBreakpoint,
} from './auth-bridge.variables';

// Helper types from variants file
export type {
  LoginFormVariant,
  AuthInputVariant,
  AuthButtonVariant,
  OAuthProviderVariant,
  MfaVariant,
  PasswordStrengthVariant,
  SessionStatusVariant,
  AuthErrorVariant,
  ResponsiveAuthVariant,
} from './auth-bridge.variants';

// Default exports για εύκολη χρήση
export const AuthBridge = {
  variables: AUTH_BRIDGE_VARIABLES,
  variants: AUTH_BRIDGE_VARIANTS,
  system: AuthBridgeComponentSystem,
  css: LAYERA_AUTH_BRIDGE_CSS,
} as const;

// Re-export των imports για convenience
import { AUTH_BRIDGE_VARIABLES } from './auth-bridge.variables';
import { AUTH_BRIDGE_VARIANTS } from './auth-bridge.variants';
import { AuthBridgeComponentSystem, LAYERA_AUTH_BRIDGE_CSS } from './auth-bridge.class';