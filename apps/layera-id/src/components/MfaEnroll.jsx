import { auth } from '../firebase';
import { PhoneAuthProvider, RecaptchaVerifier, multiFactor } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import './MfaEnroll.css';

export default function MfaEnroll() {
  const { t } = useLayeraTranslation();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'

  async function start() {
    if (!phone.trim()) {
      alert(t('mfa.errors.enterPhone'));
      return;
    }

    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const session = await multiFactor(auth.currentUser).getSession();
      const provider = new PhoneAuthProvider(auth);
      const verId = await provider.verifyPhoneNumber({ phoneNumber: phone, session }, recaptcha);
      const code = window.prompt(t('mfa.prompts.enterSmsCode'));

      if (code) {
        const cred = PhoneAuthProvider.credential(verId, code);
        await multiFactor(auth.currentUser).enroll(cred, 'primary');
        alert(t('mfa.success.enrollmentComplete'));
        window.location.href = '/account';
      }
    } catch (error) {
      console.error('2FA enrollment error:', error);

      let errorMessage = error.message;

      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = t('mfa.errors.operationNotAllowed');
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = t('mfa.errors.tooManyRequests');
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = t('mfa.errors.invalidPhoneNumber');
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = t('mfa.errors.requiresRecentLogin');
      }

      alert(t('common.error') + ': ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mfa-container">
      <nav className="mfa-nav">
        <div className="nav-brand">
          <h1>Layera</h1>
        </div>
        <div className="nav-user">
          <LanguageSwitcher
            variant="toggle"
            className="language-switcher-nav"
            showFlags={true}
          />
        </div>
      </nav>

      <div className="mfa-content">
        <div className="mfa-card">
          <div className="mfa-header">
            <div className="mfa-icon">
              🔒
            </div>
            <h2 className="mfa-title">{t('mfa.title')}</h2>
            <p className="mfa-subtitle">
              {t('mfa.subtitle')}
            </p>
          </div>

          <div className="security-info">
            <h4>
              🛡️ {t('mfa.whyNeeded.title')}
            </h4>
            <p>{t('mfa.whyNeeded.description')}</p>
            <ul>
              <li>{t('mfa.whyNeeded.benefits.passwordProtection')}</li>
              <li>{t('mfa.whyNeeded.benefits.secureAccess')}</li>
              <li>{t('mfa.whyNeeded.benefits.unauthorizedAlert')}</li>
            </ul>
          </div>

          <form className="mfa-form" onSubmit={(e) => { e.preventDefault(); start(); }}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                📱 {t('mfa.form.phoneLabel')}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+30 697 405 0023"
                className="form-input"
                disabled={loading}
                required
              />
              <small className="form-hint">
                {t('mfa.form.phoneHint')}
              </small>
            </div>

            <div className="recaptcha-container">
              <div id="recaptcha"></div>
            </div>

            <div className="mfa-actions">
              <button
                type="submit"
                className="mfa-button"
                disabled={loading || !phone.trim()}
              >
                {loading ? (
                  <>
                    ⏳ {t('common.processing')}
                  </>
                ) : (
                  <>
                    🚀 {t('mfa.form.enableButton')}
                  </>
                )}
              </button>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/account" className="back-link">
              ← {t('navigation.back')} {t('navigation.account')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}