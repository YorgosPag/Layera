import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useLayeraTranslation();

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    } else {
      console.error('Logout error:', result.error);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Layera</h1>
        </div>
        <div className="nav-user">
          {user && (
            <>
              <LanguageSwitcher
                variant="toggle"
                className="language-switcher-nav"
                showFlags={true}
              />
              <UserAvatar
                user={user}
                size="medium"
                onClick={() => navigate('/account')}
              />
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-button">
                {t('navigation.logout')}
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>{t('dashboard:welcome', { name: user?.displayName || user?.email })}</h2>
          {user && (
            <>
              <p>{t('dashboard:user.successfulLogin', { email: user.email })}</p>

              {user.displayName && (
                <p>{t('dashboard:user.usernameDisplay', { name: user.displayName })}</p>
              )}

              <div className="user-info">
                <h3>{t('dashboard:user.info')}</h3>

                <div className="user-details">
                  <div className="user-field">
                    <strong>{t('data.fields.email')}:</strong> {user.email}
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.role')}:</strong> {t(`roles.${user.layeraClaims?.role || 'private'}`)}
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.emailVerified')}:</strong>
                    <span className={user.emailVerified ? 'status-verified' : 'status-unverified'}>
                      {user.emailVerified ? ` ✅ ${t('status.verified')}` : ` ❌ ${t('status.unverified')}`}
                    </span>
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.mfaEnabled')}:</strong>
                    <span className={user.layeraClaims?.mfa_verified ? 'status-verified' : 'status-unverified'}>
                      {user.layeraClaims?.mfa_verified ? ` ✅ ${t('status.enabled')}` : ` ❌ ${t('status.disabled')}`}
                    </span>
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.userId')}:</strong> {user.uid}
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.accountCreated')}:</strong> {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.lastSignIn')}:</strong> {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                  </div>
                </div>
              </div>

          <div className="dashboard-actions">
            <h3>{t('dashboard:quickActions.title')}</h3>
            <div className="action-buttons">
              <Link to="/account">
                <button className="action-button">{t('dashboard:cards.account.title')}</button>
              </Link>
              <Link to="/settings">
                <button className="action-button">{t('dashboard:cards.settings.title')}</button>
              </Link>
              <Link to="/data">
                <button className="action-button">{t('dashboard:cards.data.title')}</button>
              </Link>
              {!user?.layeraClaims?.mfa_verified && (
                <Link to="/mfa-enroll">
                  <button className="action-button" style={{ backgroundColor: '#28a745' }}>
                    {t('dashboard:cards.mfa.title')}
                  </button>
                </Link>
              )}
              {user?.layeraClaims?.role === 'admin' && (
                <Link to="/admin/roles">
                  <button className="action-button" style={{ backgroundColor: '#dc3545' }}>
                    {t('dashboard:admin.roleManagement')}
                  </button>
                </Link>
              )}
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;