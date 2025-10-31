import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, FlexCenter, Box } from '@layera/layout';
// import { Text } from '@layera/typography'; // Temporarily disabled until package is fixed
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { SPACING_SCALE } from '@layera/constants';
// import { SettingsIcon, UserIcon, ShieldIcon, ChartIcon, FolderIcon, BellIcon, PaletteIcon, WarningIcon } from '@layera/icons'; // DISABLED: Export issues
import QuickActions from '../components/QuickActions';

export default function Settings() {
  const { user, signOut } = useAuthContext();
  const { t, currentLanguage } = useLayeraTranslation();
  const navigate = useNavigate();

  if (!user) return null;

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
      <ThemeSwitcher
        variant="icon"
        size="md"
        labels={{
          light: currentLanguage === 'el' ? 'Φωτεινό θέμα' : 'Light',
          dark: currentLanguage === 'el' ? 'Σκοτεινό θέμα' : 'Dark',
          system: currentLanguage === 'el' ? 'Σύστημα' : 'System'
        }}
      />
      <LanguageSwitcher variant="toggle" showFlags={true} />
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
        <Box padding="lg">
          <PageHeader
            title={t('settings.title')}
            subtitle={t('settings.subtitle')}
          />
        </Box>

        {/* Security Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('settings.sections.security')}
          icon={<span style={{fontSize: '20px'}}>🛡️</span>}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.changePassword.title')}
              variant="actions"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.changePassword.description')}
              </Text>
              <Button variant="secondary" size="sm">
                {t('actions.change')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.twoFactor.title')}
              variant="actions"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.twoFactor.description', {
                  status: user.layeraClaims?.mfa_verified ? t('settings.items.twoFactor.statusActive') : t('settings.items.twoFactor.statusInactive')
                })}
              </Text>
              {!user.layeraClaims?.mfa_verified ? (
                <Button variant="primary" size="sm" onClick={() => navigate('/mfa-enroll')}>
                  {t('actions.enable')}
                </Button>
              ) : (
                <Button variant="secondary" size="sm">
                  {t('actions.manage')}
                </Button>
              )}
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.emailVerification.title')}
              variant="info"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.emailVerification.description', {
                  status: user.emailVerified ? t('settings.items.emailVerification.statusVerified') : t('settings.items.emailVerification.statusUnverified')
                })}
              </Text>
              {!user.emailVerified && (
                <Button variant="primary" size="sm">
                  {t('actions.verify')}
                </Button>
              )}
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Notifications Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('settings.sections.notifications')}
          icon={<span style={{fontSize: '20px'}}>🔔</span>}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.emailNotifications.title')}
              variant="actions"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.emailNotifications.description')}
              </Text>
              <Button variant="secondary" size="sm">
                {t('actions.manage')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.smsNotifications.title')}
              variant="actions"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.smsNotifications.description')}
              </Text>
              <Button variant="secondary" size="sm">
                {t('actions.manage')}
              </Button>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Appearance Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('settings.sections.appearance')}
          icon={<span style={{fontSize: '20px'}}>🎨</span>}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.theme.title')}
              variant="actions"
              className="layera-card--dropdown-container"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.theme.description')}
              </Text>
              <FlexCenter width="full">
                <ThemeSwitcher
                  variant="dropdown"
                  size="md"
                  align="center"
                  labels={{
                    light: currentLanguage === 'el' ? 'Φωτεινό θέμα' : 'Light',
                    dark: currentLanguage === 'el' ? 'Σκοτεινό θέμα' : 'Dark',
                    system: currentLanguage === 'el' ? 'Σύστημα' : 'System'
                  }}
                />
              </FlexCenter>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.language.title')}
              variant="actions"
              className="layera-card--dropdown-container"
            >
              <Text color="secondary" marginBottom="md">
                {t('settings.items.language.description')}
              </Text>
              <FlexCenter width="full">
                <LanguageSwitcher variant="dropdown" showFlags={true} align="center" />
              </FlexCenter>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Navigation */}
        <Box padding="lg">
          <QuickActions />
        </Box>
      </PageContainer>
    </AppShell>
  );
}