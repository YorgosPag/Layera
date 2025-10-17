import type { LayeraUser, AuthResult } from '../types/auth.js';
import type { TotpSetupResult, TotpConfig } from '../utils/totp.js';
/**
 * Hook για διαχείριση TOTP authentication
 *
 * @param user - Τρέχων χρήστης
 * @param config - TOTP configuration
 * @returns TOTP state και λειτουργίες
 *
 * @example
 * ```typescript
 * const {
 *   setupData,
 *   isEnabled,
 *   loading,
 *   startSetup,
 *   verifySetup,
 *   verifyToken,
 *   disable
 * } = useTotp(user);
 *
 * // Ξεκίνημα TOTP setup
 * const handleSetup = async () => {
 *   const result = await startSetup();
 *   if (result.success) {
 *     // Εμφάνιση QR code
 *     console.log('QR Code:', result.data?.qrCodeUrl);
 *   }
 * };
 * ```
 */
export declare function useTotp(user: LayeraUser | null, config?: Partial<TotpConfig>): {
    startSetup: () => Promise<AuthResult<TotpSetupResult>>;
    verifySetup: (verificationCode: string) => Promise<AuthResult>;
    verifyToken: (token: string, secret: string) => Promise<AuthResult>;
    verifyBackup: (backupCode: string, availableBackupCodes: string[]) => Promise<AuthResult<string[]>>;
    disable: () => Promise<AuthResult>;
    regenerateBackupCodes: () => Promise<AuthResult<string[]>>;
    loading: boolean;
    error: string | null;
    setupData: TotpSetupResult | null;
    isEnabled: boolean;
};
//# sourceMappingURL=useTotp.d.ts.map