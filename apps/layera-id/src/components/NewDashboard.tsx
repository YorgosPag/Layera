import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { CheckIcon, XIcon, UserIcon, SettingsIcon, FolderIcon, LockIcon, ShieldIcon, ChartIcon } from './icons/LayeraIcons';
import QuickActions from './QuickActions';
import '../../../../packages/layout/dist/styles.css';
import '../../../../packages/cards/dist/styles.css';

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
      layout="fullscreen"
      header={
        <LayeraHeader
          title={t('app.name')}
          subtitle={t('app.subtitle')}
          variant="standard"
          actions={headerActions}
        />
      }
    >
      <PageContainer maxWidth="full" padding="none">
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <PageHeader
            title={t('dashboard:welcome', { name: user?.displayName || user?.email })}
            subtitle={user ? t('dashboard:user.successfulLogin', { email: user.email }) : ''}
          />
        </div>

        {user && (
          <>
            {/* User Status Cards */}
            <div style={{ padding: 'var(--layera-space-lg)' }}>
              <DashboardSection
                title={t('dashboard:user.info')}
                subtitle={t('dashboard.overview')}
              >
              <DashboardGrid columns={{ xs: 1, sm: 2, md: 2, lg: 4 }}>
                <DashboardCard
                  title={t('data.fields.emailVerified')}
                  variant="status"
                  metric={{
                    value: user.emailVerified ? t('status.verified') : t('status.unverified'),
                    label: t('dashboard.emailStatus')
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
                    label: t('dashboard.mfaStatus')
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
                    label: t('dashboard.accountRole')
                  }}
                />

                <DashboardCard
                  title={t('dashboard.accountAge')}
                  variant="stats"
                  metric={{
                    value: user.metadata?.creationTime
                      ? Math.floor((Date.now() - new Date(user.metadata.creationTime).getTime()) / (1000 * 60 * 60 * 24))
                      : 0,
                    label: t('dashboard.daysSinceCreated')
                  }}
                />
              </DashboardGrid>
              </DashboardSection>
            </div>

            {/* User Details Card */}
            <div style={{ padding: 'var(--layera-space-lg)' }}>
              <DashboardSection title={t('dashboard.accountDetails')}>
                <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
                <DashboardCard
                  title={t('dashboard.personalInformation')}
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
            </div>

            {/* MFA Action if needed */}
            {!user?.layeraClaims?.mfa_verified && (
              <div style={{ padding: 'var(--layera-space-lg)' }}>
                <DashboardSection title={t('account.security')}>
                  <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                  <DashboardCard
                    title={t('dashboard:cards.mfa.title')}
                    variant="stats"
                    clickable
                    onClick={() => navigate('/mfa-enroll')}
                  >
                    <LockIcon size="lg" theme="info" />
                    <Text>{t('dashboard.actionDescriptions.enableMfa')}</Text>
                  </DashboardCard>
                </DashboardGrid>
                </DashboardSection>
              </div>
            )}

            {/* Admin Actions */}
            {user?.layeraClaims?.role === 'admin' && (
              <div style={{ padding: 'var(--layera-space-lg)' }}>
                <DashboardSection title={t('dashboard:admin.roleManagement')}>
                  <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                  <DashboardCard
                    title={t('dashboard:admin.roleManagement')}
                    variant="chart"
                    clickable
                    onClick={() => navigate('/admin/roles')}
                  >
                    <ShieldIcon size="lg" theme="info" />
                    <Text>Manage user roles and permissions</Text>
                  </DashboardCard>
                </DashboardGrid>
                </DashboardSection>
              </div>
            )}

            {/* Quick Actions */}
            <div style={{ padding: 'var(--layera-space-lg)' }}>
              <QuickActions />
            </div>
          </>
        )}
      </PageContainer>
    </AppShell>
  );
};

export default NewDashboard;