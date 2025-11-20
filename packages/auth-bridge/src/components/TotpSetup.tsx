import React, { useState } from 'react';
import { useAuthContext } from './AuthProvider.js';
import { useTotp } from '../hooks/useTotp.js';
import type { TotpConfig } from '../utils/totp.js';
import { Box } from '@layera/layout';

// Re-export TotpVerification from separate file
export { TotpVerification, type TotpVerificationProps } from './TotpVerification.js';

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
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Αντιγράφηκε στο clipboard!');
    } catch (error) {
      console.error('Αποτυχία αντιγραφής:', error);
    }
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
            className="layera-button layera-button--primary"
          >
            {loading ? 'Προετοιμασία...' : 'Ξεκίνημα Setup'}
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              className="layera-button layera-button--secondary"
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
                  onClick={() => copyToClipboard(setupData.secret)}
                  className="copy-button"
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
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
              onClick={() => copyToClipboard(setupData.backupCodes.join('\n'))}
              className="copy-backup-button"
            >
              Αντιγραφή όλων των backup codes
            </button>
          </Box>
        </Box>

        <Box className="setup-actions">
          <button
            onClick={handleVerifyCode}
            disabled={loading || verificationCode.length !== 6}
            className="layera-button layera-button--primary"
          >
            {loading ? 'Επαλήθευση...' : 'Ολοκλήρωση Setup'}
          </button>

          <button
            onClick={() => setStep('start')}
            className="layera-button layera-button--secondary"
          >
            Πίσω
          </button>

          {onCancel && (
            <button
              onClick={onCancel}
              className="layera-button layera-button--secondary"
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

// TotpVerification component moved to separate file: ./TotpVerification.tsx
// Import and use: import { TotpVerification } from './TotpVerification.js';