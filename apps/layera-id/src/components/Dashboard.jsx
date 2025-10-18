import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { CheckIcon, XIcon } from './icons/LayeraIcons';
import './Dashboard.css';
import '../styles/typography.css';
import '../../../../packages/buttons/dist/styles.css';
import '@layera/theme-switcher/styles';

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
          <Heading as="h1" size="2xl" color="primary">Layera</Heading>
        </div>
        <div className="nav-user">
          {user && (
            <>
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
              <UserAvatar
                user={user}
                size="medium"
                onClick={() => navigate('/account')}
              />
              <span className="user-email">{user.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                {t('navigation.logout')}
              </Button>
            </>
          )}
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <Heading as="h2" size="xl" color="primary">{t('dashboard:welcome', { name: user?.displayName || user?.email })}</Heading>
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
                      {user.emailVerified ? <> <CheckIcon size="xs" theme="success" /> {t('status.verified')}</> : <> <XIcon size="xs" theme="danger" /> {t('status.unverified')}</>}
                    </span>
                  </div>
                  <div className="user-field">
                    <strong>{t('data.fields.mfaEnabled')}:</strong>
                    <span className={user.layeraClaims?.mfa_verified ? 'status-verified' : 'status-unverified'}>
                      {user.layeraClaims?.mfa_verified ? <> <CheckIcon size="xs" theme="success" /> {t('status.enabled')}</> : <> <XIcon size="xs" theme="danger" /> {t('status.disabled')}</>}
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
                <Button variant="secondary" size="md" fullWidth>
                  {t('dashboard:cards.account.title')}
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="secondary" size="md" fullWidth>
                  {t('dashboard:cards.settings.title')}
                </Button>
              </Link>
              <Link to="/data">
                <Button variant="secondary" size="md" fullWidth>
                  {t('dashboard:cards.data.title')}
                </Button>
              </Link>
              {!user?.layeraClaims?.mfa_verified && (
                <Link to="/mfa-enroll">
                  <Button variant="primary" size="md" fullWidth>
                    {t('dashboard:cards.mfa.title')}
                  </Button>
                </Link>
              )}
              {user?.layeraClaims?.role === 'admin' && (
                <Link to="/admin/roles">
                  <Button variant="danger" size="md" fullWidth>
                    {t('dashboard:admin.roleManagement')}
                  </Button>
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