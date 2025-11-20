import React, { useState } from 'react';
import { Box } from '@layera/layout';

/**
 * Props για TotpVerification component
 */
export interface TotpVerificationProps {
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

/**
 * Component για TOTP verification κατά την είσοδο
 *
 * @example
 * ```typescript
 * <TotpVerification
 *   onVerify={async (code) => await verifyTotpCode(code)}
 *   onUseBackup={async (code) => await verifyBackupCode(code)}
 *   loading={isVerifying}
 *   error={verificationError}
 * />
 * ```
 */
export function TotpVerification({
  onVerify,
  onUseBackup,
  loading = false,
  error,
  className = ''
}: TotpVerificationProps) {
  const [code, setCode] = useState('');
  const [showBackup, setShowBackup] = useState(false);
  const [backupCode, setBackupCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      await onVerify(code);
    }
  };

  const handleBackupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (backupCode.trim() && onUseBackup) {
      await onUseBackup(backupCode.trim());
    }
  };

  return (
    <Box className={`totp-verification ${className}`}>
      <Box className="verification-header">
        <h2>Επαλήθευση Ταυτότητας</h2>
        <p>
          Εισάγετε τον 6-ψήφιο κωδικό από την εφαρμογή authenticator:
        </p>
      </Box>

      {!showBackup ? (
        <form onSubmit={handleSubmit} className="verification-form">
          <Box className="totp-input-group">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="totp-input"
              maxLength={6}
              autoComplete="one-time-code"
              autoFocus
            />
          </Box>

          {error && (
            <Box className="error-message">
              {error}
            </Box>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="layera-button layera-button--primary"
          >
            {loading ? 'Επαλήθευση...' : 'Επαλήθευση'}
          </button>

          {onUseBackup && (
            <button
              type="button"
              onClick={() => setShowBackup(true)}
              className="layera-button layera-button--link"
            >
              Χρήση backup κωδικού
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={handleBackupSubmit} className="backup-form">
          <Box className="backup-input-group">
            <label htmlFor="backup-code">Backup Code:</label>
            <input
              id="backup-code"
              type="text"
              value={backupCode}
              onChange={(e) => setBackupCode(e.target.value)}
              placeholder="ABCD1234"
              className="backup-input"
              autoComplete="off"
            />
          </Box>

          {error && (
            <Box className="error-message">
              {error}
            </Box>
          )}

          <Box className="backup-actions">
            <button
              type="submit"
              disabled={loading || !backupCode.trim()}
              className="layera-button layera-button--primary"
            >
              {loading ? 'Επαλήθευση...' : 'Χρήση Backup Code'}
            </button>

            <button
              type="button"
              onClick={() => setShowBackup(false)}
              className="layera-button layera-button--secondary"
            >
              Πίσω στον TOTP
            </button>
          </Box>
        </form>
      )}
    </Box>
  );
}