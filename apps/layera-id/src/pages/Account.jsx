import { useAuthContext } from '@layera/auth-bridge';
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import { Link } from "react-router-dom";
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import './Account.css';

export default function Account() {
  const { user } = useAuthContext();
  const { t, formatters } = useLayeraTranslation();

  if (!user) return null;

  const getInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : 'GP';
  };

  return (
    <div className="account-container">
      <nav className="account-nav">
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

      <div className="account-content">
        <div className="account-card">
          <div className="account-header">
            <div className="account-avatar">
              {getInitials(user.email)}
            </div>
            <div className="account-title">
              <h2>{t('account.title')}</h2>
              <p className="account-email">{user.email}</p>
            </div>
          </div>

          <div className="account-info">
            <div className="info-section">
              <h3>{t('account.info')}</h3>
              <div className="badges-container">
                <div className="account-badge role-badge">
                  <span>👤</span>
                  {formatters.role(user.layeraClaims?.role || "private")}
                </div>
                <div className={`account-badge mfa-badge ${!user.layeraClaims?.mfa_verified ? 'inactive' : ''}`}>
                  <span>{user.layeraClaims?.mfa_verified ? '🔒' : '🔓'}</span>
                  {user.layeraClaims?.mfa_verified ? t('account.badges.mfaActive') : t('account.badges.mfaInactive')}
                </div>
              </div>
            </div>

            <div className="status-messages">
              {!user.emailVerified && (
                <div className="warning-message">
                  ⚠️ {t('account.messages.emailNotVerified')}
                </div>
              )}
              {!user.layeraClaims?.mfa_verified && (
                <div className="info-message">
                  🔒 {t('account.messages.mfaRecommendation')}
                </div>
              )}
            </div>
          </div>

          <div className="account-actions">
            <Link to="/dashboard" className="back-link">
              ← {t('navigation.back')} Dashboard
            </Link>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {!user.layeraClaims?.mfa_verified && (
                <Link to="/mfa-enroll" className="action-link">
                  <button className="action-button">
                    🔒 {t('account.actions.enable2fa')}
                  </button>
                </Link>
              )}
              <Link to="/settings" className="action-link">
                <button className="action-button secondary">
                  ⚙️ {t('account.actions.settings')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}