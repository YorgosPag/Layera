import React, { useState } from 'react';
import { useAuthContext } from './AuthProvider.js';
import { useTotp } from '../hooks/useTotp.js';
import type { TotpConfig } from '../utils/totp.js';
import { Box } from '@layera/layout';

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
export function TotpSetup({
  config,
  onComplete,
  onCancel,
  className = ''
}: TotpSetupProps) {
  const { user } = useAuthContext();
  const {
    setupData,
    loading,
    error,
    startSetup,
    verifySetup
  } = useTotp(user, config);

  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'start' | 'verify'>('start');

  /**
   * Ξεκινά το TOTP setup
   */
  const handleStartSetup = async () => {
    const result = await startSetup();
    if (result.success) {
      setStep('verify');
    }
  };

  /**
   * Επαληθεύει τον κωδικό και ολοκληρώνει το setup
   */
  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) return;

    const result = await verifySetup(verificationCode);
    if (result.success) {
      onComplete?.();
    }
  };

  /**
   * Αντιγράφει το secret στο clipboard
   */
  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Αντιγράφηκε στο clipboard!');
    } catch (error) {
      console.error('Αποτυχία αντιγραφής:', error);
    }
  };

  const handleCopyClick = (text: string) => {
    copyToClipboard(text).catch(console.error);
  };

  if (step === 'start') {
    return (
      <Box className={`totp-setup ${className}`}>
        <Box className="setup-header">
          <h2>Ενεργοποίηση 2FA (TOTP)</h2>
          <p>
            Η δίγραμμη επαλήθευση ταυτότητας προσθέτει ένα επιπλέον επίπεδο ασφάλειας στον λογαριασμό σας.
          </p>
        </Box>

        <Box className="setup-steps">
          <h3>Τι θα χρειαστείτε:</h3>
          <ol>
            <li>Μία εφαρμογή authenticator (Google Authenticator, Authy, 1Password, κλπ)</li>
            <li>Το κινητό σας τηλέφωνο</li>
          </ol>
        </Box>

        {error && (
          <Box className="error-message">
            {error}
          </Box>
        )}

        <Box className="setup-actions">
          <button
            onClick={handleStartSetup}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Προετοιμασία...' : 'Ξεκίνημα Setup'}
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Ακύρωση
            </button>
          )}
        </Box>
      </Box>
    );
  }

  if (step === 'verify' && setupData) {
    return (
      <Box className={`totp-setup ${className}`}>
        <Box className="setup-header">
          <h2>Ρύθμιση Authenticator</h2>
          <p>Ακολουθήστε τα παρακάτω βήματα για να ολοκληρώσετε το setup:</p>
        </Box>

        <Box className="setup-content">
          {/* QR Code Section */}
          <Box className="qr-section">
            <h3>Βήμα 1: Σκάναρε το QR Code</h3>
            <Box className="qr-code-container">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qrCodeUrl)}`}
                alt="TOTP QR Code"
                className="qr-code"
              />
            </Box>
            <p className="qr-instructions">
              Άνοιξε την εφαρμογή authenticator και σκάναρε αυτόν τον QR κωδικό.
            </p>
          </Box>

          {/* Manual Entry Section */}
          <Box className="manual-section">
            <h3>Εναλλακτικά: Χειροκίνητη εισαγωγή</h3>
            <Box className="manual-key">
              <label>Secret Key:</label>
              <Box className="key-display">
                <code>{setupData.manualEntryKey}</code>
                <button
                  onClick={(): void => handleCopyClick(setupData.secret)}
                  className="copy-btn"
                  title="Αντιγραφή"
                >
                  📋
                </button>
              </Box>
            </Box>
          </Box>

          {/* Verification Section */}
          <Box className="verification-section">
            <h3>Βήμα 2: Εισάγετε τον κωδικό επαλήθευσης</h3>
            <p>
              Εισάγετε τον 6-ψήφιο κωδικό που εμφανίζεται στην εφαρμογή authenticator:
            </p>

            <Box className="verification-input">
              <input
                type="text"
                value={verificationCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="totp-input"
                maxLength={6}
                autoComplete="off"
              />
            </Box>

            {error && (
              <Box className="error-message">
                {error}
              </Box>
            )}
          </Box>

          {/* Backup Codes Section */}
          <Box className="backup-codes-section">
            <h3>Backup Codes</h3>
            <p>
              Αποθηκεύστε αυτούς τους κωδικούς σε ασφαλές μέρος. Μπορείτε να τους χρησιμοποιήσετε
              αν χάσετε πρόσβαση στο authenticator:
            </p>
            <Box className="backup-codes">
              {setupData.backupCodes.map((code, index) => (
                <code key={index} className="backup-code">
                  {code}
                </code>
              ))}
            </Box>
            <button
              onClick={(): void => handleCopyClick(setupData.backupCodes.join('\n'))}
              className="copy-backup-btn"
            >
              Αντιγραφή όλων των backup codes
            </button>
          </Box>
        </Box>

        <Box className="setup-actions">
          <button
            onClick={handleVerifyCode}
            disabled={loading || verificationCode.length !== 6}
            className="btn btn-primary"
          >
            {loading ? 'Επαλήθευση...' : 'Ολοκλήρωση Setup'}
          </button>

          <button
            onClick={(): void => setStep('start')}
            className="btn btn-secondary"
          >
            Πίσω
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Ακύρωση
            </button>
          )}
        </Box>
      </Box>
    );
  }

  return null;
}

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
            className="btn btn-primary"
          >
            {loading ? 'Επαλήθευση...' : 'Επαλήθευση'}
          </button>

          {onUseBackup && (
            <button
              type="button"
              onClick={(): void => setShowBackup(true)}
              className="btn btn-link"
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackupCode(e.target.value)}
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
              className="btn btn-primary"
            >
              {loading ? 'Επαλήθευση...' : 'Χρήση Backup Code'}
            </button>

            <button
              type="button"
              onClick={(): void => setShowBackup(false)}
              className="btn btn-secondary"
            >
              Πίσω στον TOTP
            </button>
          </Box>
        </form>
      )}
    </Box>
  );
}