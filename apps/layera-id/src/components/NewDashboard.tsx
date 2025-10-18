import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { CheckIcon, XIcon } from './icons/LayeraIcons';
import '@layera/layout/styles';
import '@layera/cards/styles';

/**
 * NewDashboard - Modernized dashboard με @layera/layout και @layera/cards
 */
const NewDashboard: React.FC = () => {
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

  // Header actions
  const headerActions = (
    <HeaderActionsGroup>
      <LanguageSwitcher variant="toggle" showFlags={true} />
      <ThemeSwitcher variant="icon" size="md" />
      {user && (
        <>
          <UserAvatar
            user={user}
            size="medium"
            onClick={() => navigate('/account')}
          />
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            {t('navigation.logout')}
          </Button>
        </>
      )}
    </HeaderActionsGroup>
  );

  return (
    <AppShell
      layout="dashboard"
      header={
        <LayeraHeader
          title="Layera ID"
          subtitle="Enterprise Identity Management"
          variant="standard"
          actions={headerActions}
        />
      }
    >
      <PageContainer maxWidth="xl" padding="lg">
        <PageHeader
          title={t('dashboard:welcome', { name: user?.displayName || user?.email })}
          subtitle={user ? t('dashboard:user.successfulLogin', { email: user.email }) : ''}
        />

        {user && (
          <>
            {/* User Status Cards */}
            <DashboardSection
              title={t('dashboard:user.info')}
              subtitle="Overview of your account status"
            >
              <DashboardGrid columns={{ xs: 1, md: 2, lg: 4 }}>
                <DashboardCard
                  title={t('data.fields.emailVerified')}
                  variant="status"
                  metric={{
                    value: user.emailVerified ? t('status.verified') : t('status.unverified'),
                    label: 'Email Status'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    {user.emailVerified ? (
                      <CheckIcon size="lg" theme="success" />
                    ) : (
                      <XIcon size="lg" theme="danger" />
                    )}
                  </div>
                </DashboardCard>

                <DashboardCard
                  title={t('data.fields.mfaEnabled')}
                  variant="status"
                  metric={{
                    value: user.layeraClaims?.mfa_verified ? t('status.enabled') : t('status.disabled'),
                    label: 'MFA Status'
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    {user.layeraClaims?.mfa_verified ? (
                      <CheckIcon size="lg" theme="success" />
                    ) : (
                      <XIcon size="lg" theme="danger" />
                    )}
                  </div>
                </DashboardCard>

                <DashboardCard
                  title={t('data.fields.role')}
                  variant="info"
                  metric={{
                    value: t(`roles.${user.layeraClaims?.role || 'private'}`),
                    label: 'Account Role'
                  }}
                />

                <DashboardCard
                  title="Account Age"
                  variant="stats"
                  metric={{
                    value: user.metadata?.creationTime
                      ? Math.floor((Date.now() - new Date(user.metadata.creationTime).getTime()) / (1000 * 60 * 60 * 24))
                      : 0,
                    label: 'Days since created'
                  }}
                />
              </DashboardGrid>
            </DashboardSection>

            {/* User Details Card */}
            <DashboardSection title="Account Details">
              <DashboardGrid columns={{ xs: 1, lg: 2 }}>
                <DashboardCard
                  title="Personal Information"
                  variant="info"
                  className="layera-dashboard-card--span-2"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <strong>{t('data.fields.email')}:</strong> {user.email}
                    </div>
                    {user.displayName && (
                      <div>
                        <strong>{t('data.fields.displayName')}:</strong> {user.displayName}
                      </div>
                    )}
                    <div>
                      <strong>{t('data.fields.userId')}:</strong>
                      <Text size="sm" color="secondary" style={{ fontFamily: 'monospace' }}>
                        {user.uid}
                      </Text>
                    </div>
                    <div>
                      <strong>{t('data.fields.accountCreated')}:</strong> {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                    </div>
                    <div>
                      <strong>{t('data.fields.lastSignIn')}:</strong> {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                    </div>
                  </div>
                </DashboardCard>
              </DashboardGrid>
            </DashboardSection>

            {/* Quick Actions */}
            <DashboardSection title={t('dashboard:quickActions.title')}>
              <DashboardGrid columns={{ xs: 1, sm: 2, lg: 3 }}>
                <DashboardCard
                  title={t('dashboard:cards.account.title')}
                  variant="actions"
                  clickable
                  onClick={() => navigate('/account')}
                >
                  <Text>Manage your account settings and profile information</Text>
                </DashboardCard>

                <DashboardCard
                  title={t('dashboard:cards.settings.title')}
                  variant="actions"
                  clickable
                  onClick={() => navigate('/settings')}
                >
                  <Text>Configure application preferences and security settings</Text>
                </DashboardCard>

                <DashboardCard
                  title={t('dashboard:cards.data.title')}
                  variant="actions"
                  clickable
                  onClick={() => navigate('/data')}
                >
                  <Text>View and manage your data and privacy settings</Text>
                </DashboardCard>

                {!user?.layeraClaims?.mfa_verified && (
                  <DashboardCard
                    title={t('dashboard:cards.mfa.title')}
                    variant="stats"
                    clickable
                    onClick={() => navigate('/mfa-enroll')}
                  >
                    <Text>Enable multi-factor authentication for enhanced security</Text>
                  </DashboardCard>
                )}

                {user?.layeraClaims?.role === 'admin' && (
                  <DashboardCard
                    title={t('dashboard:admin.roleManagement')}
                    variant="chart"
                    clickable
                    onClick={() => navigate('/admin/roles')}
                  >
                    <Text>Manage user roles and permissions</Text>
                  </DashboardCard>
                )}
              </DashboardGrid>
            </DashboardSection>
          </>
        )}
      </PageContainer>
    </AppShell>
  );
};

export default NewDashboard;