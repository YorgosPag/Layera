import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuthContext } from './AuthProvider.js';
import { useTotp } from '../hooks/useTotp.js';
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
export function TotpSetup({ config, onComplete, onCancel, className = '' }) {
    const { user } = useAuthContext();
    const { setupData, loading, error, startSetup, verifySetup } = useTotp(user, config);
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState('start');
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
        if (!verificationCode.trim())
            return;
        const result = await verifySetup(verificationCode);
        if (result.success) {
            onComplete?.();
        }
    };
    /**
     * Αντιγράφει το secret στο clipboard
     */
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('Αντιγράφηκε στο clipboard!');
        }
        catch (error) {
            console.error('Αποτυχία αντιγραφής:', error);
        }
    };
    if (step === 'start') {
        return (_jsxs("div", { className: `totp-setup ${className}`, children: [_jsxs("div", { className: "setup-header", children: [_jsx("h2", { children: "\u0395\u03BD\u03B5\u03C1\u03B3\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 2FA (TOTP)" }), _jsx("p", { children: "\u0397 \u03B4\u03AF\u03B3\u03C1\u03B1\u03BC\u03BC\u03B7 \u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 \u03C4\u03B1\u03C5\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2 \u03C0\u03C1\u03BF\u03C3\u03B8\u03AD\u03C4\u03B5\u03B9 \u03AD\u03BD\u03B1 \u03B5\u03C0\u03B9\u03C0\u03BB\u03AD\u03BF\u03BD \u03B5\u03C0\u03AF\u03C0\u03B5\u03B4\u03BF \u03B1\u03C3\u03C6\u03AC\u03BB\u03B5\u03B9\u03B1\u03C2 \u03C3\u03C4\u03BF\u03BD \u03BB\u03BF\u03B3\u03B1\u03C1\u03B9\u03B1\u03C3\u03BC\u03CC \u03C3\u03B1\u03C2." })] }), _jsxs("div", { className: "setup-steps", children: [_jsx("h3", { children: "\u03A4\u03B9 \u03B8\u03B1 \u03C7\u03C1\u03B5\u03B9\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5:" }), _jsxs("ol", { children: [_jsx("li", { children: "\u039C\u03AF\u03B1 \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE authenticator (Google Authenticator, Authy, 1Password, \u03BA\u03BB\u03C0)" }), _jsx("li", { children: "\u03A4\u03BF \u03BA\u03B9\u03BD\u03B7\u03C4\u03CC \u03C3\u03B1\u03C2 \u03C4\u03B7\u03BB\u03AD\u03C6\u03C9\u03BD\u03BF" })] })] }), error && (_jsx("div", { className: "error-message", children: error })), _jsxs("div", { className: "setup-actions", children: [_jsx("button", { onClick: handleStartSetup, disabled: loading, className: "btn btn-primary", children: loading ? 'Προετοιμασία...' : 'Ξεκίνημα Setup' }), onCancel && (_jsx("button", { onClick: onCancel, className: "btn btn-secondary", children: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7" }))] })] }));
    }
    if (step === 'verify' && setupData) {
        return (_jsxs("div", { className: `totp-setup ${className}`, children: [_jsxs("div", { className: "setup-header", children: [_jsx("h2", { children: "\u03A1\u03CD\u03B8\u03BC\u03B9\u03C3\u03B7 Authenticator" }), _jsx("p", { children: "\u0391\u03BA\u03BF\u03BB\u03BF\u03C5\u03B8\u03AE\u03C3\u03C4\u03B5 \u03C4\u03B1 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03B2\u03AE\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF setup:" })] }), _jsxs("div", { className: "setup-content", children: [_jsxs("div", { className: "qr-section", children: [_jsx("h3", { children: "\u0392\u03AE\u03BC\u03B1 1: \u03A3\u03BA\u03AC\u03BD\u03B1\u03C1\u03B5 \u03C4\u03BF QR Code" }), _jsx("div", { className: "qr-code-container", children: _jsx("img", { src: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.qrCodeUrl)}`, alt: "TOTP QR Code", className: "qr-code" }) }), _jsx("p", { className: "qr-instructions", children: "\u0386\u03BD\u03BF\u03B9\u03BE\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE authenticator \u03BA\u03B1\u03B9 \u03C3\u03BA\u03AC\u03BD\u03B1\u03C1\u03B5 \u03B1\u03C5\u03C4\u03CC\u03BD \u03C4\u03BF\u03BD QR \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC." })] }), _jsxs("div", { className: "manual-section", children: [_jsx("h3", { children: "\u0395\u03BD\u03B1\u03BB\u03BB\u03B1\u03BA\u03C4\u03B9\u03BA\u03AC: \u03A7\u03B5\u03B9\u03C1\u03BF\u03BA\u03AF\u03BD\u03B7\u03C4\u03B7 \u03B5\u03B9\u03C3\u03B1\u03B3\u03C9\u03B3\u03AE" }), _jsxs("div", { className: "manual-key", children: [_jsx("label", { children: "Secret Key:" }), _jsxs("div", { className: "key-display", children: [_jsx("code", { children: setupData.manualEntryKey }), _jsx("button", { onClick: () => copyToClipboard(setupData.secret), className: "copy-btn", title: "\u0391\u03BD\u03C4\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE", children: "\uD83D\uDCCB" })] })] })] }), _jsxs("div", { className: "verification-section", children: [_jsx("h3", { children: "\u0392\u03AE\u03BC\u03B1 2: \u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03B5\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7\u03C2" }), _jsx("p", { children: "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD 6-\u03C8\u03AE\u03C6\u03B9\u03BF \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03C0\u03BF\u03C5 \u03B5\u03BC\u03C6\u03B1\u03BD\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03C3\u03C4\u03B7\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE authenticator:" }), _jsx("div", { className: "verification-input", children: _jsx("input", { type: "text", value: verificationCode, onChange: (e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6)), placeholder: "123456", className: "totp-input", maxLength: 6, autoComplete: "off" }) }), error && (_jsx("div", { className: "error-message", children: error }))] }), _jsxs("div", { className: "backup-codes-section", children: [_jsx("h3", { children: "Backup Codes" }), _jsx("p", { children: "\u0391\u03C0\u03BF\u03B8\u03B7\u03BA\u03B5\u03CD\u03C3\u03C4\u03B5 \u03B1\u03C5\u03C4\u03BF\u03CD\u03C2 \u03C4\u03BF\u03C5\u03C2 \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD\u03C2 \u03C3\u03B5 \u03B1\u03C3\u03C6\u03B1\u03BB\u03AD\u03C2 \u03BC\u03AD\u03C1\u03BF\u03C2. \u039C\u03C0\u03BF\u03C1\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C4\u03BF\u03C5\u03C2 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03B1\u03BD \u03C7\u03AC\u03C3\u03B5\u03C4\u03B5 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7 \u03C3\u03C4\u03BF authenticator:" }), _jsx("div", { className: "backup-codes", children: setupData.backupCodes.map((code, index) => (_jsx("code", { className: "backup-code", children: code }, index))) }), _jsx("button", { onClick: () => copyToClipboard(setupData.backupCodes.join('\n')), className: "copy-backup-btn", children: "\u0391\u03BD\u03C4\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03CC\u03BB\u03C9\u03BD \u03C4\u03C9\u03BD backup codes" })] })] }), _jsxs("div", { className: "setup-actions", children: [_jsx("button", { onClick: handleVerifyCode, disabled: loading || verificationCode.length !== 6, className: "btn btn-primary", children: loading ? 'Επαλήθευση...' : 'Ολοκλήρωση Setup' }), _jsx("button", { onClick: () => setStep('start'), className: "btn btn-secondary", children: "\u03A0\u03AF\u03C3\u03C9" }), onCancel && (_jsx("button", { onClick: onCancel, className: "btn btn-secondary", children: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7" }))] })] }));
    }
    return null;
}
export function TotpVerification({ onVerify, onUseBackup, loading = false, error, className = '' }) {
    const [code, setCode] = useState('');
    const [showBackup, setShowBackup] = useState(false);
    const [backupCode, setBackupCode] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.length === 6) {
            await onVerify(code);
        }
    };
    const handleBackupSubmit = async (e) => {
        e.preventDefault();
        if (backupCode.trim() && onUseBackup) {
            await onUseBackup(backupCode.trim());
        }
    };
    return (_jsxs("div", { className: `totp-verification ${className}`, children: [_jsxs("div", { className: "verification-header", children: [_jsx("h2", { children: "\u0395\u03C0\u03B1\u03BB\u03AE\u03B8\u03B5\u03C5\u03C3\u03B7 \u03A4\u03B1\u03C5\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2" }), _jsx("p", { children: "\u0395\u03B9\u03C3\u03AC\u03B3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD 6-\u03C8\u03AE\u03C6\u03B9\u03BF \u03BA\u03C9\u03B4\u03B9\u03BA\u03CC \u03B1\u03C0\u03CC \u03C4\u03B7\u03BD \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE authenticator:" })] }), !showBackup ? (_jsxs("form", { onSubmit: handleSubmit, className: "verification-form", children: [_jsx("div", { className: "totp-input-group", children: _jsx("input", { type: "text", value: code, onChange: (e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6)), placeholder: "123456", className: "totp-input", maxLength: 6, autoComplete: "one-time-code", autoFocus: true }) }), error && (_jsx("div", { className: "error-message", children: error })), _jsx("button", { type: "submit", disabled: loading || code.length !== 6, className: "btn btn-primary", children: loading ? 'Επαλήθευση...' : 'Επαλήθευση' }), onUseBackup && (_jsx("button", { type: "button", onClick: () => setShowBackup(true), className: "btn btn-link", children: "\u03A7\u03C1\u03AE\u03C3\u03B7 backup \u03BA\u03C9\u03B4\u03B9\u03BA\u03BF\u03CD" }))] })) : (_jsxs("form", { onSubmit: handleBackupSubmit, className: "backup-form", children: [_jsxs("div", { className: "backup-input-group", children: [_jsx("label", { htmlFor: "backup-code", children: "Backup Code:" }), _jsx("input", { id: "backup-code", type: "text", value: backupCode, onChange: (e) => setBackupCode(e.target.value), placeholder: "ABCD1234", className: "backup-input", autoComplete: "off" })] }), error && (_jsx("div", { className: "error-message", children: error })), _jsxs("div", { className: "backup-actions", children: [_jsx("button", { type: "submit", disabled: loading || !backupCode.trim(), className: "btn btn-primary", children: loading ? 'Επαλήθευση...' : 'Χρήση Backup Code' }), _jsx("button", { type: "button", onClick: () => setShowBackup(false), className: "btn btn-secondary", children: "\u03A0\u03AF\u03C3\u03C9 \u03C3\u03C4\u03BF\u03BD TOTP" })] })] }))] }));
}
