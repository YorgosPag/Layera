import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
// import { Text, Heading } from '@layera/typography'; // Temporarily disabled until package is fixed
import { Button } from '@layera/buttons';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, FlexColumn, Box } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { CheckIcon, SettingsIcon, CloseIcon } from '@layera/icons';
import QuickActions from './QuickActions';

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
      <LanguageSwitcher />
      <ThemeSwitcher
        variant="icon"
        size="md"
        labels={{
          light: t('settings.items.theme.light'),
          dark: t('settings.items.theme.dark'),
          system: t('settings.items.theme.system')
        }}
      />
      {user && (
        <>
          <UserAvatar
            user={user}
            size="medium"
            onClick={(): void => navigate('/account')}
          />
          <Button variant="outline" onClick={handleLogout}>
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
        <Box padding="lg">
          <PageHeader
            title={t('dashboard.welcome', { name: user?.displayName || user?.email })}
            subtitle={user ? t('dashboard.user.successfulLogin', { email: user.email }) : ''}
          />
        </Box>

        {user && (
          <>
            {/* User Status Cards */}
            <Box padding="lg">
              <DashboardSection
                title={t('dashboard.user.info')}
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
                  <Box textAlign="center" padding="md">
                    {user.emailVerified ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Box>
                </DashboardCard>

                <DashboardCard
                  title={t('data.fields.mfaEnabled')}
                  variant="status"
                  metric={{
                    value: user.layeraClaims?.mfaVerified ? t('status.enabled') : t('status.disabled'),
                    label: t('dashboard.mfaStatus')
                  }}
                >
                  <Box textAlign="center" padding="md">
                    {user.layeraClaims?.mfaVerified ? (
                      <CheckIcon />
                    ) : (
                      <CloseIcon />
                    )}
                  </Box>
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
            </Box>

            {/* User Details Card */}
            <Box padding="lg">
              <DashboardSection title={t('dashboard.accountDetails')}>
                <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}>
                <DashboardCard
                  title={t('dashboard.personalInformation')}
                  variant="info"
                  className="layera-dashboard-card--span-2"
                >
                  <FlexColumn gap="md">
                    <Box>
                      <strong>{t('data.fields.email')}:</strong> {user.email}
                    </Box>
                    {user.displayName && (
                      <Box>
                        <strong>{t('data.fields.displayName')}:</strong> {user.displayName}
                      </Box>
                    )}
                    <Box>
                      <strong>{t('data.fields.userId')}:</strong>
                      <Box as="code" fontSize="sm" color="text.secondary">
                        {user.uid}
                      </Box>
                    </Box>
                    <Box>
                      <strong>{t('data.fields.accountCreated')}:</strong> {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                    </Box>
                    <Box>
                      <strong>{t('data.fields.lastSignIn')}:</strong> {user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('el-GR') : t('data.fields.notAvailable')}
                    </Box>
                  </FlexColumn>
                </DashboardCard>
              </DashboardGrid>
              </DashboardSection>
            </Box>

            {/* MFA Action if needed */}
            {!user?.layeraClaims?.mfaVerified && (
              <Box padding="lg">
                <DashboardSection title={t('account.security')}>
                  <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                  <DashboardCard
                    title={t('dashboard.cards.mfa.title')}
                    variant="stats"
                    clickable
                    onClick={(): void => navigate('/mfa-enroll')}
                  >
                    <SettingsIcon />
                    <span>{t('dashboard.actionDescriptions.enableMfa')}</span>
                  </DashboardCard>
                </DashboardGrid>
                </DashboardSection>
              </Box>
            )}

            {/* Admin Actions */}
            {user?.layeraClaims?.role === 'admin' && (
              <Box padding="lg">
                <DashboardSection title={t('dashboard.admin.roleManagement')}>
                  <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                  <DashboardCard
                    title={t('dashboard.admin.roleManagement')}
                    variant="chart"
                    clickable
                    onClick={(): void => navigate('/admin/roles')}
                  >
                    <SettingsIcon />
                    <span>{t('dashboard.admin.manageRoles')}</span>
                  </DashboardCard>
                </DashboardGrid>
                </DashboardSection>
              </Box>
            )}

            {/* Quick Actions */}
            <Box padding="lg">
              <QuickActions />
            </Box>
          </>
        )}
      </PageContainer>
    </AppShell>
  );
};

export default NewDashboard;