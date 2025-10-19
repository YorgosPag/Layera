import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { ChartIcon, UserIcon, ShieldIcon, SmartphoneIcon, FolderIcon, FileIcon, CheckIcon, XIcon, LockIcon, SettingsIcon } from '../components/icons/LayeraIcons';
import QuickActions from '../components/QuickActions';

export default function Data() {
  const { user, signOut } = useAuthContext();
  const { t } = useLayeraTranslation();
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

  const formatDate = (dateString) => {
    if (!dateString) return t('data.fields.notAvailable');
    return new Date(dateString).toLocaleString('el-GR');
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
            title={t('data.title')}
            subtitle={t('data.subtitle')}
          />
        </div>

        {/* Personal Information Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
            title={t('data.personalInfo')}
            icon={<UserIcon size="md" theme="neutral" />}
          >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 4 }}>
            <DashboardCard
              title={t('data.fields.email')}
              variant="info"
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {user.email}
              </div>
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {user.emailVerified ? (
                  <>
                    <CheckIcon size="sm" theme="success" />
                    <span style={{ color: 'var(--color-success)' }}>{t('status.verified')}</span>
                  </>
                ) : (
                  <>
                    <XIcon size="sm" theme="danger" />
                    <span style={{ color: 'var(--color-error)' }}>{t('status.unverified')}</span>
                  </>
                )}
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.displayName')}
              variant="info"
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {user.displayName || t('data.fields.notAvailable')}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {user.displayName ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.userId')}
              variant="info"
            >
              <div style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--color-text-secondary)', wordBreak: 'break-all' }}>
                {user.uid}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Μοναδικό αναγνωριστικό
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.role')}
              variant="info"
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {t(`roles.${user.layeraClaims?.role || 'private'}`)}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Τύπος λογαριασμού
              </div>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Security Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('data.security')}
          icon={<ShieldIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <DashboardCard
              title={t('data.fields.mfaEnabled')}
              variant="status"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {user.layeraClaims?.mfa_verified ? (
                  <>
                    <LockIcon size="lg" theme="success" />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--color-success)' }}>
                        {t('status.enabled')}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {t('account.badges.mfaActive')}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <XIcon size="lg" theme="warning" />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--color-warning)' }}>
                        {t('status.disabled')}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {t('account.badges.mfaInactive')}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {!user.layeraClaims?.mfa_verified && (
                <Button
                  variant="primary"
                  size="sm"
                  style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/mfa-enroll')}
                >
                  {t('account.actions.enable2fa')}
                </Button>
              )}
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Account Information Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('dashboard.accountDetails')}
          icon={<UserIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <DashboardCard
              title={t('data.fields.accountCreated')}
              variant="info"
            >
              <div style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                {formatDate(user.metadata?.creationTime)}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Ημερομηνία δημιουργίας
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.lastSignIn')}
              variant="info"
            >
              <div style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                {formatDate(user.metadata?.lastSignInTime)}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                Τελευταία σύνδεση
              </div>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </div>

        {/* Data Export Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('data.export')}
          icon={<FolderIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.exportDescription')}
            variant="actions"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="secondary" size="sm">
                  <FileIcon size="sm" theme="neutral" />
                  {t('data.exportFormats.pdf')}
                </Button>
                <Button variant="secondary" size="sm">
                  <FileIcon size="sm" theme="neutral" />
                  {t('data.exportFormats.json')}
                </Button>
                <Button variant="secondary" size="sm">
                  <FileIcon size="sm" theme="neutral" />
                  {t('data.exportFormats.csv')}
                </Button>
              </div>
            </div>
          </DashboardCard>
          </DashboardSection>
        </div>

        {/* Privacy Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
          title={t('data.privacy')}
          icon={<LockIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.privacyPoints.title')}
            variant="info"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                <span>{t('data.privacyPoints.encryption')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                <span>{t('data.privacyPoints.noSharing')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                <span>{t('data.privacyPoints.deleteAnytime')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                <span>{t('data.privacyPoints.compliance')}</span>
              </div>
            </div>
          </DashboardCard>
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