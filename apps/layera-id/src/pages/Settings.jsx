import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { Select } from '@layera/forms';
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
          light: t('settings.items.theme.light'),
          dark: t('settings.items.theme.dark'),
          system: t('settings.items.theme.system')
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
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.changePassword.description')}
              </Box>
              <Button variant="primary" size="sm">
                {t('actions.change')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.twoFactor.title')}
              variant="actions"
            >
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.twoFactor.description', {
                  status: user.layeraClaims?.mfa_verified ? t('settings.items.twoFactor.statusActive') : t('settings.items.twoFactor.statusInactive')
                })}
              </Box>
              {!user.layeraClaims?.mfa_verified ? (
                <Button variant="primary" size="sm" onClick={() => navigate('/mfa-enroll')}>
                  {t('actions.enable')}
                </Button>
              ) : (
                <Button variant="primary" size="sm">
                  {t('actions.manage')}
                </Button>
              )}
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.emailVerification.title')}
              variant="info"
            >
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.emailVerification.description', {
                  status: user.emailVerified ? t('settings.items.emailVerification.statusVerified') : t('settings.items.emailVerification.statusUnverified')
                })}
              </Box>
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
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.emailNotifications.description')}
              </Box>
              <Button variant="primary" size="sm">
                {t('actions.manage')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.smsNotifications.title')}
              variant="actions"
            >
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.smsNotifications.description')}
              </Box>
              <Button variant="primary" size="sm">
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
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.theme.description')}
              </Box>
              <FlexCenter width="full">
                <Select
                  options={[
                    { value: 'light', label: t('settings.items.theme.light') },
                    { value: 'dark', label: t('settings.items.theme.dark') },
                    { value: 'system', label: t('settings.items.theme.system') }
                  ]}
                  placeholder={t('settings.items.theme.title')}
                  size="medium"
                  fullWidth
                />
              </FlexCenter>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.language.title')}
              variant="actions"
              className="layera-card--dropdown-container"
            >
              <Box color="secondary" marginBottom="md" style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                {t('settings.items.language.description')}
              </Box>
              <FlexCenter width="full">
                <Select
                  options={[
                    { value: 'el', label: '🇬🇷 Ελληνικά' },
                    { value: 'en', label: '🇺🇸 English' }
                  ]}
                  placeholder={t('settings.items.language.title')}
                  size="medium"
                  fullWidth
                />
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