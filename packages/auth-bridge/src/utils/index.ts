export {
  initializeFirebaseApp,
  getFirebaseAuth,
  getFirebaseApp,
  getFirebaseDb,
  db
} from './firebase.js';

export {
  getCustomClaims,
  calculateMfaStatus,
  createLayeraUser,
  hasAccess,
  requiresMfaVerification,
  isFullyAuthenticated
} from './claims.js';

export {
  generateTotpSecret,
  generateQrCodeUrl,
  generateBackupCodes,
  initiateTotpSetup,
  verifyTotpCode,
  verifyBackupCode,
  consumeBackupCode
} from './totp.js';

export type {
  TotpConfig,
  TotpSetupResult
} from './totp.js';