import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import RoleBadge from "../components/RoleBadge";
import MfaStatus from "../components/MfaStatus";
import QuickActions from "../components/QuickActions";
import { Link, useNavigate } from "react-router-dom";
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { UserIcon, LockIcon, UnlockIcon, WarningIcon, SettingsIcon, ChartIcon } from '../components/icons/LayeraIcons';
import './Account.css';

export default function Account() {
  const { user, signOut } = useAuthContext();
  const { t, formatters } = useLayeraTranslation();
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
            title={t('account.title')}
            subtitle={t('account.info')}
          />
        </div>

        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection title={t('account.info')}>
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
            <DashboardCard
              title={t('data.personalInfo')}
              variant="info"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <strong>{t('data.fields.email')}:</strong> {user.email}
                </div>
                <div>
                  <strong>{t('data.fields.role')}:</strong> {formatters.role(user.layeraClaims?.role || "private")}
                </div>
                <div>
                  <strong>{t('data.fields.emailVerified')}:</strong> {user.emailVerified ? t('status.verified') : t('status.unverified')}
                </div>
                <div>
                  <strong>{t('data.fields.mfaEnabled')}:</strong> {user.layeraClaims?.mfa_verified ? t('status.enabled') : t('status.disabled')}
                </div>
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('account.actions.settings')}
              variant="info"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {!user.emailVerified && (
                  <div className="warning-message" style={{ color: 'var(--color-warning)', fontSize: '0.875rem' }}>
                    <WarningIcon size="sm" theme="warning" /> {t('account.messages.emailNotVerified')}
                  </div>
                )}
                {!user.layeraClaims?.mfa_verified && (
                  <div className="info-message" style={{ color: 'var(--color-info)', fontSize: '0.875rem' }}>
                    <LockIcon size="sm" theme="info" /> {t('account.messages.mfaRecommendation')}
                  </div>
                )}
              </div>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* MFA Ενέργεια αν χρειάζεται */}
        {!user.layeraClaims?.mfa_verified && (
          <div style={{ padding: 'var(--layera-space-lg)' }}>
            <DashboardSection title={t('account.security')}>
              <DashboardGrid columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                <DashboardCard
                  title={t('account.actions.enable2fa')}
                  variant="actions"
                  clickable
                  onClick={() => navigate('/mfa-enroll')}
                >
                  <LockIcon size="lg" theme="info" />
                </DashboardCard>
              </DashboardGrid>
            </DashboardSection>
          </div>
        )}

        {/* Γρήγορες Ενέργειες */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <QuickActions />
        </div>
      </PageContainer>
    </AppShell>
  );
}