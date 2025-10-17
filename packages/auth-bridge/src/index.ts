/**
 * @fileoverview Layera Auth Bridge - Reusable authentication package
 *
 * Παρέχει επαναχρησιμοποιήσιμα components, hooks και utilities
 * για authentication σε Layera applications
 *
 * @version 1.0.0
 * @author Layera Team
 * @see {@link https://layera.dev/docs/auth-bridge | Documentation}
 */

// Types
export type {
  UserRole,
  MfaStatus,
  LayeraCustomClaims,
  LayeraUser,
  AuthConfig,
  AuthState,
  AuthCallbacks,
  AuthResult,
  SignUpParams,
  SignInParams
} from './types/index.js';

// Utilities
export {
  initializeFirebaseApp,
  getFirebaseAuth,
  getFirebaseApp,
  getCustomClaims,
  calculateMfaStatus,
  createLayeraUser,
  hasAccess,
  requiresMfaVerification,
  isFullyAuthenticated
} from './utils/index.js';

// Hooks
export {
  useAuth,
  useRoleGuard,
  useHasAnyRole,
  useHasAllRoles,
  useTotp
} from './hooks/index.js';

export type { RoleGuardResult } from './hooks/index.js';

// Components
export {
  AuthProvider,
  useAuthContext,
  RoleGuard,
  withRoleGuard,
  UserDisplay,
  UserAvatar,
  TotpSetup,
  TotpVerification,
  GoogleSignInButton
} from './components/index.js';

export type { GoogleSignInButtonProps } from './components/index.js';