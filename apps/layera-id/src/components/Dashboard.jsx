import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
// import { Text, Heading } from '@layera/typography'; // Temporarily disabled until package is fixed
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import { Stack, Box } from '@layera/layout';
import { ThemeSwitcher } from '@layera/theme-switcher';
// import { CheckIcon, XIcon } from '@layera/icons'; // DISABLED: Export issues
import './Dashboard.css';
import '../styles/typography.css';

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
    <Box className="dashboard-container">
      <nav className="dashboard-nav">
        <Box className="nav-brand">
          <Heading as="h1" size="2xl" color="primary">Layera</Heading>
        </Box>
        <Box className="nav-user">
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
        </Box>
      </nav>

      <Box className="dashboard-content">
        <BaseCard
          title={t('dashboard:welcome', { name: user?.displayName || user?.email })}
          variant="welcome"
          className="welcome-card-replacement"
        >
          {user && (
            <>
              <p>{t('dashboard:user.successfulLogin', { email: user.email })}</p>

              {user.displayName && (
                <p>{t('dashboard:user.usernameDisplay', { name: user.displayName })}</p>
              )}

              <Box className="user-info">
                <h3>{t('dashboard:user.info')}</h3>

                <Box className="user-details">
                  <Box className="user-field">
                    <strong>{t('data.fields.email')}:</strong> {user.email}
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.role')}:</strong> {t(`roles.${user.layeraClaims?.role || 'private'}`)}
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.emailVerified')}:</strong>
                    <span className={user.emailVerified ? 'status-verified' : 'status-unverified'}>
                      {user.emailVerified ? <> <span style={{fontSize: '12px'}}>✅</span> {t('status.verified')}</> : <> <span style={{fontSize: '12px'}}>❌</span> {t('status.unverified')}</>}
                    </span>
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.mfaEnabled')}:</strong>
                    <span className={user.layeraClaims?.mfa_verified ? 'status-verified' : 'status-unverified'}>
                      {user.layeraClaims?.mfa_verified ? <> <span style={{fontSize: '12px'}}>✅</span> {t('status.enabled')}</> : <> <span style={{fontSize: '12px'}}>❌</span> {t('status.disabled')}</>}
                    </span>
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.userId')}:</strong> {user.uid}
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.accountCreated')}:</strong> {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                  </Box>
                  <Box className="user-field">
                    <strong>{t('data.fields.lastSignIn')}:</strong> {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                  </Box>
                </Box>
              </Box>

          <Box className="dashboard-actions">
            <h3>{t('dashboard:quickActions.title')}</h3>
            <Stack direction="vertical" spacing="sm" className="action-buttons-replacement">
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
            </Stack>
          </Box>
            </>
          )}
        </BaseCard>
      </Box>
    </Box>
  );
};

export default Dashboard;