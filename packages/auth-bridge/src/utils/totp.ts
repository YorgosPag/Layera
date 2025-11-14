import type { LayeraUser, AuthResult } from '../types/auth.js';

/**
 * TOTP configuration interface
 */
export interface TotpConfig {
  /** Όνομα εφαρμογής για εμφάνιση στο authenticator */
  readonly appName: string;
  /** Διάρκεια ισχύος token σε δευτερόλεπτα */
  readonly period?: number;
  /** Μήκος κωδικού */
  readonly digits?: number;
  /** Hash algorithm */
  readonly algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
}

/**
 * TOTP setup result
 */
export interface TotpSetupResult {
  /** Secret key για τον χρήστη */
  readonly secret: string;
  /** QR code URL για εύκολη εγκατάσταση */
  readonly qrCodeUrl: string;
  /** Manual entry key για χειροκίνητη εισαγωγή */
  readonly manualEntryKey: string;
  /** Backup codes για recovery */
  readonly backupCodes: string[];
}

/**
 * Default TOTP configuration
 */
const DEFAULT_TOTP_CONFIG: Required<TotpConfig> = {
  appName: 'Layera',
  period: 30,
  digits: 6,
  algorithm: 'SHA1'
};

/**
 * Γεννά secret key για TOTP
 *
 * @returns Random secret key
 */
export function generateTotpSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';

  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return secret;
}

/**
 * Δημιουργεί QR code URL για TOTP setup
 *
 * @param user - Χρήστης
 * @param secret - TOTP secret
 * @param config - TOTP configuration
 * @returns QR code URL
 */
export function generateQrCodeUrl(
  user: LayeraUser,
  secret: string,
  config: Partial<TotpConfig> = {}
): string {
  const finalConfig = { ...DEFAULT_TOTP_CONFIG, ...config };

  const label = `${finalConfig.appName}:${user.email}`;
  const issuer = finalConfig.appName;

  const params = new URLSearchParams({
    secret,
    issuer,
    algorithm: finalConfig.algorithm,
    digits: finalConfig.digits.toString(),
    period: finalConfig.period.toString()
  });

  return `otpauth://totp/${encodeURIComponent(label)}?${params.toString()}`;
}

/**
 * Γεννά backup codes για recovery
 *
 * @param count - Πλήθος backup codes
 * @returns Array με backup codes
 */
export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    // Γεννά 8-ψήφιο κωδικό
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }

  return codes;
}

/**
 * Ξεκινά TOTP setup για χρήστη
 *
 * @param user - Χρήστης
 * @param config - TOTP configuration
 * @returns TOTP setup result
 */
export function initiateTotpSetup(
  user: LayeraUser,
  config: Partial<TotpConfig> = {}
): TotpSetupResult {
  const secret = generateTotpSecret();
  const qrCodeUrl = generateQrCodeUrl(user, secret, config);
  const backupCodes = generateBackupCodes();

  // Format manual entry key για εύκολη ανάγνωση
  const manualEntryKey = secret.match(/.{1,4}/g)?.join(' ') || secret;

  return {
    secret,
    qrCodeUrl,
    manualEntryKey,
    backupCodes
  };
}

/**
 * Επαληθεύει TOTP code
 *
 * @param secret - User's TOTP secret
 * @param token - Εισαγόμενος κωδικός
 * @param window - Time window tolerance (±periods)
 * @returns Εάν ο κωδικός είναι έγκυρος
 */
export function verifyTotpCode(
  secret: string,
  token: string,
  window = 1
): boolean {
  // Αυτή είναι μια απλοποιημένη υλοποίηση
  // Σε production θα χρησιμοποιούσαμε library όπως το 'otplib'

  const currentTime = Math.floor(Date.now() / 1000 / 30);

  for (let i = -window; i <= window; i++) {
    const timeStep = currentTime + i;
    const expectedToken = generateTotpToken(secret, timeStep);

    if (expectedToken === token) {
      return true;
    }
  }

  return false;
}

/**
 * Γεννά TOTP token για συγκεκριμένο time step
 * (Απλοποιημένη υλοποίηση - σε production χρησιμοποιήστε otplib)
 */
function generateTotpToken(secret: string, timeStep: number): string {
  // Αυτή είναι placeholder υλοποίηση
  // Σε πραγματικό project χρησιμοποιήστε το otplib ή άλλο crypto library

  const hash = simpleHash(secret + timeStep.toString());
  const truncated = hash % 1000000;

  return truncated.toString().padStart(6, '0');
}

/**
 * Απλό hash function (placeholder)
 */
function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Επαληθεύει backup code
 *
 * @param backupCodes - Διαθέσιμα backup codes
 * @param inputCode - Εισαγόμενος κωδικός
 * @returns Εάν ο κωδικός είναι έγκυρος
 */
export function verifyBackupCode(
  backupCodes: string[],
  inputCode: string
): boolean {
  const normalizedInput = inputCode.toUpperCase().trim();
  return backupCodes.some(code => code === normalizedInput);
}

/**
 * Καταναλώνει backup code (αφαιρεί από τη λίστα)
 *
 * @param backupCodes - Διαθέσιμα backup codes
 * @param usedCode - Χρησιμοποιημένος κωδικός
 * @returns Νέα λίστα με backup codes
 */
export function consumeBackupCode(
  backupCodes: string[],
  usedCode: string
): string[] {
  const normalizedCode = usedCode.toUpperCase().trim();
  return backupCodes.filter(code => code !== normalizedCode);
}