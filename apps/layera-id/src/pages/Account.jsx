import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import QuickActions from "../components/QuickActions";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Box, FlexColumn } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { SPACING_SCALE } from '@layera/constants';
// import { UserIcon, SettingsIcon, LockIcon, ChartIcon, UnlockIcon, WarningIcon } from '@layera/icons'; // DISABLED: Export issues
import './Account.css';

export default function Account() {
  const { user, signOut } = useAuthContext();
  const { t } = useLayeraTranslation();

  // Role formatting function using translations
  const formatRole = (role) => {
    return t(`roles.${role}`) || t('roles.private');
  };
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
      <LanguageSwitcher variant="toggle" showFlags={true} />
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
            title={t('account.title')}
            subtitle={t('account.info')}
          />
        </Box>

        <Box padding="lg">
          <DashboardSection title={t('account.info')}>
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
            <DashboardCard
              title={t('data.personalInfo')}
              variant="info"
            >
              <FlexColumn gap="md">
                <Box>
                  <strong>{t('data.fields.email')}:</strong> {user.email}
                </Box>
                <Box>
                  <strong>{t('data.fields.role')}:</strong> {formatRole(user.layeraClaims?.role || "private")}
                </Box>
                <Box>
                  <strong>{t('data.fields.emailVerified')}:</strong> {user.emailVerified ? t('status.verified') : t('status.unverified')}
                </Box>
                <Box>
                  <strong>{t('data.fields.mfaEnabled')}:</strong> {user.layeraClaims?.mfa_verified ? t('status.enabled') : t('status.disabled')}
                </Box>
              </FlexColumn>
            </DashboardCard>

            <DashboardCard
              title={t('account.actions.settings')}
              variant="info"
            >
              <FlexColumn gap="lg">
                {!user.emailVerified && (
                  <Box className="warning-message" color="warning" fontSize="sm">
                    <span style={{fontSize: '16px'}}>⚠️</span> {t('account.messages.emailNotVerified')}
                  </Box>
                )}
                {!user.layeraClaims?.mfa_verified && (
                  <Box className="info-message" color="info" fontSize="sm">
                    <span style={{fontSize: '16px'}}>🔒</span> {t('account.messages.mfaRecommendation')}
                  </Box>
                )}
              </FlexColumn>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* MFA Ενέργεια αν χρειάζεται */}
        {!user.layeraClaims?.mfa_verified && (
          <Box padding="lg">
            <DashboardSection title={t('account.security')}>
              <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                <DashboardCard
                  title={t('account.actions.enable2fa')}
                  variant="actions"
                  clickable
                  onClick={() => navigate('/mfa-enroll')}
                >
                  <span style={{fontSize: '24px'}}>🔒</span>
                </DashboardCard>
              </DashboardGrid>
            </DashboardSection>
          </Box>
        )}

        {/* Γρήγορες Ενέργειες */}
        <Box padding="lg">
          <QuickActions />
        </Box>
      </PageContainer>
    </AppShell>
  );
}