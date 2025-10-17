import { useState, useCallback } from 'react';
import { initiateTotpSetup, verifyTotpCode, verifyBackupCode, consumeBackupCode } from '../utils/totp.js';
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
export function useTotp(user, config = {}) {
    const [state, setState] = useState({
        loading: false,
        error: null,
        setupData: null,
        isEnabled: user?.mfaStatus.enabled && user?.mfaStatus.method === 'totp' || false
    });
    /**
     * Ενημερώνει το state
     */
    const updateState = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);
    /**
     * Ξεκινά TOTP setup process
     */
    const startSetup = useCallback(async () => {
        if (!user) {
            return {
                success: false,
                error: 'Χρήστης δεν είναι συνδεδεμένος'
            };
        }
        try {
            updateState({ loading: true, error: null });
            const setupData = initiateTotpSetup(user, config);
            updateState({ setupData, loading: false });
            return {
                success: true,
                data: setupData
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία εκκίνησης TOTP setup';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [user, config, updateState]);
    /**
     * Επαληθεύει TOTP setup με verification code
     */
    const verifySetup = useCallback(async (verificationCode) => {
        if (!state.setupData) {
            return {
                success: false,
                error: 'TOTP setup δεν έχει ξεκινήσει'
            };
        }
        try {
            updateState({ loading: true, error: null });
            const isValid = verifyTotpCode(state.setupData.secret, verificationCode);
            if (!isValid) {
                updateState({ loading: false, error: 'Λάθος κωδικός επαλήθευσης' });
                return {
                    success: false,
                    error: 'Λάθος κωδικός επαλήθευσης'
                };
            }
            // Εδώ θα καλούσαμε Firebase Cloud Function για να ενεργοποιήσουμε το TOTP
            // await enableTotpForUser(user.uid, state.setupData.secret, state.setupData.backupCodes);
            updateState({
                loading: false,
                isEnabled: true,
                setupData: null
            });
            return { success: true };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία επαλήθευσης TOTP';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [state.setupData, updateState]);
    /**
     * Επαληθεύει TOTP token για είσοδο
     */
    const verifyToken = useCallback(async (token, secret) => {
        try {
            updateState({ loading: true, error: null });
            const isValid = verifyTotpCode(secret, token);
            updateState({ loading: false });
            if (isValid) {
                return { success: true };
            }
            else {
                return {
                    success: false,
                    error: 'Λάθος κωδικός TOTP'
                };
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία επαλήθευσης TOTP';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [updateState]);
    /**
     * Επαληθεύει backup code
     */
    const verifyBackup = useCallback(async (backupCode, availableBackupCodes) => {
        try {
            updateState({ loading: true, error: null });
            const isValid = verifyBackupCode(availableBackupCodes, backupCode);
            if (!isValid) {
                updateState({ loading: false, error: 'Λάθος backup κωδικός' });
                return {
                    success: false,
                    error: 'Λάθος backup κωδικός'
                };
            }
            const remainingCodes = consumeBackupCode(availableBackupCodes, backupCode);
            // Εδώ θα καλούσαμε Firebase Cloud Function για να ενημερώσουμε τα backup codes
            // await updateBackupCodes(user.uid, remainingCodes);
            updateState({ loading: false });
            return {
                success: true,
                data: remainingCodes
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία επαλήθευσης backup κωδικού';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [updateState]);
    /**
     * Απενεργοποιεί TOTP
     */
    const disable = useCallback(async () => {
        if (!user) {
            return {
                success: false,
                error: 'Χρήστης δεν είναι συνδεδεμένος'
            };
        }
        try {
            updateState({ loading: true, error: null });
            // Εδώ θα καλούσαμε Firebase Cloud Function για να απενεργοποιήσουμε το TOTP
            // await disableTotpForUser(user.uid);
            updateState({
                loading: false,
                isEnabled: false,
                setupData: null
            });
            return { success: true };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία απενεργοποίησης TOTP';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [user, updateState]);
    /**
     * Γεννά νέα backup codes
     */
    const regenerateBackupCodes = useCallback(async () => {
        if (!user) {
            return {
                success: false,
                error: 'Χρήστης δεν είναι συνδεδεμένος'
            };
        }
        try {
            updateState({ loading: true, error: null });
            // Γέννηση νέων backup codes
            const { generateBackupCodes } = await import('../utils/totp.js');
            const newBackupCodes = generateBackupCodes();
            // Εδώ θα καλούσαμε Firebase Cloud Function για να ενημερώσουμε τα backup codes
            // await updateBackupCodes(user.uid, newBackupCodes);
            updateState({ loading: false });
            return {
                success: true,
                data: newBackupCodes
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Αποτυχία γέννησης νέων backup codes';
            updateState({ loading: false, error: errorMessage });
            return {
                success: false,
                error: errorMessage
            };
        }
    }, [user, updateState]);
    return {
        ...state,
        startSetup,
        verifySetup,
        verifyToken,
        verifyBackup,
        disable,
        regenerateBackupCodes
    };
}
