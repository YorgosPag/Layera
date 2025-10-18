import { useAuthContext } from '@layera/auth-bridge';
import { Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { SettingsIcon, ShieldIcon, BellIcon, PaletteIcon, WarningIcon } from '../components/icons/LayeraIcons';
import './Settings.css';

export default function Settings() {
  const { user } = useAuthContext();
  const { t } = useLayeraTranslation();

  if (!user) return null;

  return (
    <div className="settings-container">
      <nav className="settings-nav">
        <div className="nav-brand">
          <h1>Layera</h1>
        </div>
        <div className="nav-user">
          <LanguageSwitcher
            variant="toggle"
            className="language-switcher-nav"
            showFlags={true}
          />
          <ThemeSwitcher
            variant="icon"
            size="md"
            className="theme-switcher-nav"
          />
        </div>
      </nav>

      <div className="settings-content">
        <div className="settings-card">
          <div className="settings-header">
            <div className="settings-icon">
              <SettingsIcon size="lg" theme="primary" />
            </div>
            <h2 className="settings-title">{t('settings.title')}</h2>
            <p className="settings-subtitle">
              {t('settings.subtitle')}
            </p>
          </div>

          <div className="settings-sections">
            <div className="settings-section">
              <h3><ShieldIcon size="md" theme="neutral" /> {t('settings.sections.security')}</h3>
              <div className="settings-items">
                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.changePassword.title')}</strong>
                    <small>{t('settings.items.changePassword.description')}</small>
                  </div>
                  <button className="settings-btn secondary">{t('actions.change')}</button>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.twoFactor.title')}</strong>
                    <small>{t('settings.items.twoFactor.description', { status: user.layeraClaims?.mfa_verified ? t('settings.items.twoFactor.statusActive') : t('settings.items.twoFactor.statusInactive') })}</small>
                  </div>
                  <Link to="/mfa-enroll">
                    <button className="settings-btn">
                      {user.layeraClaims?.mfa_verified ? t('actions.manage') : t('actions.enable')}
                    </button>
                  </Link>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.emailVerification.title')}</strong>
                    <small>{t('settings.items.emailVerification.description', { status: user.emailVerified ? t('settings.items.emailVerification.statusVerified') : t('settings.items.emailVerification.statusUnverified') })}</small>
                  </div>
                  {!user.emailVerified && (
                    <button className="settings-btn">{t('actions.verify')}</button>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3><BellIcon size="md" theme="neutral" /> {t('settings.sections.notifications')}</h3>
              <div className="settings-items">
                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.emailNotifications.title')}</strong>
                    <small>{t('settings.items.emailNotifications.description')}</small>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.smsNotifications.title')}</strong>
                    <small>{t('settings.items.smsNotifications.description')}</small>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3><PaletteIcon size="md" theme="neutral" /> {t('settings.sections.appearance')}</h3>
              <div className="settings-items">
                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.theme.title')}</strong>
                    <small>{t('settings.items.theme.description')}</small>
                  </div>
                  <select className="settings-select">
                    <option value="light">{t('settings.items.theme.options.light')}</option>
                    <option value="dark">{t('settings.items.theme.options.dark')}</option>
                    <option value="auto">{t('settings.items.theme.options.auto')}</option>
                  </select>
                </div>

                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.language.title')}</strong>
                    <small>{t('settings.items.language.description')}</small>
                  </div>
                  <select className="settings-select">
                    <option value="el">{t('settings.items.language.options.el')}</option>
                    <option value="en">{t('settings.items.language.options.en')}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section danger">
              <h3><WarningIcon size="md" theme="warning" /> {t('settings.sections.dangerZone')}</h3>
              <div className="settings-items">
                <div className="settings-item">
                  <div className="item-info">
                    <strong>{t('settings.items.deleteAccount.title')}</strong>
                    <small>{t('settings.items.deleteAccount.description')}</small>
                  </div>
                  <button className="settings-btn danger">{t('actions.delete')}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <Link to="/dashboard" className="back-link">
              ← {t('navigation.back')} Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}