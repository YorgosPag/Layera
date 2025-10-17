import { useAuthContext } from '@layera/auth-bridge';
import { Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import './Data.css';

export default function Data() {
  const { user } = useAuthContext();
  const { t } = useLayeraTranslation();

  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return t('data.fields.notAvailable');
    return new Date(dateString).toLocaleString('el-GR');
  };

  return (
    <div className="data-container">
      <nav className="data-nav">
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

      <div className="data-content">
        <div className="data-card">
          <div className="data-header">
            <div className="data-icon">
              📊
            </div>
            <h2 className="data-title">{t('data.title')}</h2>
            <p className="data-subtitle">
              {t('data.subtitle')}
            </p>
          </div>

          <div className="data-sections">
            <div className="data-section">
              <h3>👤 {t('data.personalInfo')}</h3>
              <div className="data-table">
                <div className="data-row">
                  <span className="data-label">{t('data.fields.email')}:</span>
                  <span className="data-value">{user.email}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.name')}:</span>
                  <span className="data-value">{user.displayName || t('data.fields.notAvailable')}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.userId')}:</span>
                  <span className="data-value">{user.uid}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.role')}:</span>
                  <span className="data-value">{user.layeraClaims?.role || 'private'}</span>
                </div>
              </div>
            </div>

            <div className="data-section">
              <h3>🔐 {t('data.security')}</h3>
              <div className="data-table">
                <div className="data-row">
                  <span className="data-label">{t('data.fields.emailVerified')}:</span>
                  <span className={`data-value ${user.emailVerified ? 'verified' : 'unverified'}`}>
                    {user.emailVerified ? '✅ ' + t('status.verified') : '❌ ' + t('status.unverified')}
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.mfaEnabled')}:</span>
                  <span className={`data-value ${user.layeraClaims?.mfa_verified ? 'verified' : 'unverified'}`}>
                    {user.layeraClaims?.mfa_verified ? '✅ ' + t('status.enabled') : '❌ ' + t('status.disabled')}
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.lastSignIn')}:</span>
                  <span className="data-value">{formatDate(user.metadata?.lastSignInTime)}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.accountCreated')}:</span>
                  <span className="data-value">{formatDate(user.metadata?.creationTime)}</span>
                </div>
              </div>
            </div>

            <div className="data-section">
              <h3>📱 {t('data.devices')}</h3>
              <div className="data-table">
                <div className="data-row">
                  <span className="data-label">{t('data.fields.currentDevice')}:</span>
                  <span className="data-value">{t('data.fields.webBrowser')}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.ipAddress')}:</span>
                  <span className="data-value">{t('data.fields.encrypted')}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">{t('data.fields.connectionProvider')}:</span>
                  <span className="data-value">
                    {user.providerData?.map(p => p.providerId).join(', ') || 'Email/Password'}
                  </span>
                </div>
              </div>
            </div>

            <div className="data-section">
              <h3>📁 {t('data.export')}</h3>
              <div className="export-actions">
                <p>{t('data.exportDescription')}</p>
                <div className="export-buttons">
                  <button className="export-btn">
                    📄 {t('data.exportFormats.pdf')}
                  </button>
                  <button className="export-btn">
                    📊 {t('data.exportFormats.json')}
                  </button>
                  <button className="export-btn">
                    📈 {t('data.exportFormats.csv')}
                  </button>
                </div>
              </div>
            </div>

            <div className="data-section privacy">
              <h3>🔒 {t('data.privacy')}</h3>
              <div className="privacy-info">
                <p>
                  <strong>{t('data.privacyPoints.title')}</strong>
                </p>
                <ul>
                  <li>{t('data.privacyPoints.encryption')}</li>
                  <li>{t('data.privacyPoints.noSharing')}</li>
                  <li>{t('data.privacyPoints.deleteAnytime')}</li>
                  <li>{t('data.privacyPoints.compliance')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="data-actions">
            <Link to="/dashboard" className="back-link">
              ← {t('navigation.back')} Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}