import type { TotpConfig } from '../utils/totp.js';
/**
 * Props για TotpSetup component
 */
interface TotpSetupProps {
    /** TOTP configuration */
    config?: Partial<TotpConfig>;
    /** Callback όταν ολοκληρωθεί το setup */
    onComplete?: () => void;
    /** Callback όταν ακυρωθεί το setup */
    onCancel?: () => void;
    /** Custom styling */
    className?: string;
}
/**
 * Component για TOTP setup process
 *
 * @example
 * ```typescript
 * <TotpSetup
 *   config={{ appName: 'MyApp' }}
 *   onComplete={() => setMfaEnabled(true)}
 *   onCancel={() => setShowSetup(false)}
 * />
 * ```
 */
export declare function TotpSetup({ config, onComplete, onCancel, className }: TotpSetupProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Component για TOTP verification κατά την είσοδο
 */
interface TotpVerificationProps {
    /** Callback με τον κωδικό επαλήθευσης */
    onVerify: (code: string) => Promise<void>;
    /** Callback για χρήση backup code */
    onUseBackup?: (code: string) => Promise<void>;
    /** Εάν φορτώνει */
    loading?: boolean;
    /** Τυχόν σφάλμα */
    error?: string;
    /** Custom styling */
    className?: string;
}
export declare function TotpVerification({ onVerify, onUseBackup, loading, error, className }: TotpVerificationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TotpSetup.d.ts.map