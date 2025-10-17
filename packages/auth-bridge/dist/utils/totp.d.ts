import type { LayeraUser } from '../types/auth.js';
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
 * Γεννά secret key για TOTP
 *
 * @returns Random secret key
 */
export declare function generateTotpSecret(): string;
/**
 * Δημιουργεί QR code URL για TOTP setup
 *
 * @param user - Χρήστης
 * @param secret - TOTP secret
 * @param config - TOTP configuration
 * @returns QR code URL
 */
export declare function generateQrCodeUrl(user: LayeraUser, secret: string, config?: Partial<TotpConfig>): string;
/**
 * Γεννά backup codes για recovery
 *
 * @param count - Πλήθος backup codes
 * @returns Array με backup codes
 */
export declare function generateBackupCodes(count?: number): string[];
/**
 * Ξεκινά TOTP setup για χρήστη
 *
 * @param user - Χρήστης
 * @param config - TOTP configuration
 * @returns TOTP setup result
 */
export declare function initiateTotpSetup(user: LayeraUser, config?: Partial<TotpConfig>): TotpSetupResult;
/**
 * Επαληθεύει TOTP code
 *
 * @param secret - User's TOTP secret
 * @param token - Εισαγόμενος κωδικός
 * @param window - Time window tolerance (±periods)
 * @returns Εάν ο κωδικός είναι έγκυρος
 */
export declare function verifyTotpCode(secret: string, token: string, window?: number): boolean;
/**
 * Επαληθεύει backup code
 *
 * @param backupCodes - Διαθέσιμα backup codes
 * @param inputCode - Εισαγόμενος κωδικός
 * @returns Εάν ο κωδικός είναι έγκυρος
 */
export declare function verifyBackupCode(backupCodes: string[], inputCode: string): boolean;
/**
 * Καταναλώνει backup code (αφαιρεί από τη λίστα)
 *
 * @param backupCodes - Διαθέσιμα backup codes
 * @param usedCode - Χρησιμοποιημένος κωδικός
 * @returns Νέα λίστα με backup codes
 */
export declare function consumeBackupCode(backupCodes: string[], usedCode: string): string[];
//# sourceMappingURL=totp.d.ts.map