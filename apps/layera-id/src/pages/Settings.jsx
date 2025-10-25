import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { SPACING_SCALE } from '@layera/constants';
import { SettingsIcon, ShieldIcon, BellIcon, PaletteIcon, WarningIcon, ChartIcon, UserIcon, FolderIcon } from '../components/icons/LayeraIcons';
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
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <PageHeader
            title={t('settings.title')}
            subtitle={t('settings.subtitle')}
          />
        </div>

        {/* Security Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('settings.sections.security')}
          icon={<ShieldIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.changePassword.title')}
              variant="actions"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.changePassword.description')}
              </p>
              <Button variant="secondary" size="sm">
                {t('actions.change')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.twoFactor.title')}
              variant="actions"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.twoFactor.description', {
                  status: user.layeraClaims?.mfa_verified ? t('settings.items.twoFactor.statusActive') : t('settings.items.twoFactor.statusInactive')
                })}
              </p>
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
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.emailVerification.description', {
                  status: user.emailVerified ? t('settings.items.emailVerification.statusVerified') : t('settings.items.emailVerification.statusUnverified')
                })}
              </p>
              {!user.emailVerified && (
                <Button variant="primary" size="sm">
                  {t('actions.verify')}
                </Button>
              )}
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Notifications Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('settings.sections.notifications')}
          icon={<BellIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.emailNotifications.title')}
              variant="actions"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.emailNotifications.description')}
              </p>
              <Button variant="secondary" size="sm">
                {t('actions.manage')}
              </Button>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.smsNotifications.title')}
              variant="actions"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.smsNotifications.description')}
              </p>
              <Button variant="secondary" size="sm">
                {t('actions.manage')}
              </Button>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Appearance Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('settings.sections.appearance')}
          icon={<PaletteIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
            <DashboardCard
              title={t('settings.items.theme.title')}
              variant="actions"
              className="layera-card--dropdown-container"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.theme.description')}
              </p>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
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
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('settings.items.language.title')}
              variant="actions"
              className="layera-card--dropdown-container"
            >
              <p style={{ marginBottom: `${SPACING_SCALE.MD}px`, color: 'var(--color-text-secondary)' }}>
                {t('settings.items.language.description')}
              </p>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <LanguageSwitcher variant="dropdown" showFlags={true} align="center" />
              </div>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Navigation */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <QuickActions />
        </div>
      </PageContainer>
    </AppShell>
  );
}