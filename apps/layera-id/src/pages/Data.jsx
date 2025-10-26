import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Flex, FlexColumn, Box } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { SPACING_SCALE } from '@layera/constants';
import { SmartphoneIcon, CheckIcon, SettingsIcon, ChartIcon, ShieldIcon, FolderIcon, LockIcon, UserIcon, FileIcon, XIcon } from '@layera/icons';
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
              <Flex align="center" style={{ marginTop: `${SPACING_SCALE.SM}px`, gap: `${SPACING_SCALE.SM}px` }}>
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
              </Flex>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.displayName')}
              variant="info"
            >
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {user.displayName || t('data.fields.notAvailable')}
              </div>
              <div style={{ marginTop: `${SPACING_SCALE.SM}px`, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {user.displayName ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
              </div>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.userId')}
              variant="info"
            >
              <Box style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: 'var(--color-text-secondary)', wordBreak: 'break-all' }}>
                {user.uid}
              </Box>
              <div style={{ marginTop: `${SPACING_SCALE.SM}px`, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
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
              <div style={{ marginTop: `${SPACING_SCALE.SM}px`, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
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
              <Flex align="center" style={{ gap: `${SPACING_SCALE.MD}px` }}>
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
              </Flex>
              {!user.layeraClaims?.mfa_verified && (
                <Button
                  variant="primary"
                  size="sm"
                  style={{ marginTop: `${SPACING_SCALE.MD}px` }}
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
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: `${SPACING_SCALE.XS}px` }}>
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
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: `${SPACING_SCALE.XS}px` }}>
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
            <Flex direction="column" style={{ gap: '1rem' }}>
              <Flex style={{ gap: '1rem', flexWrap: 'wrap' }}>
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
              </Flex>
            </Flex>
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
            <Flex direction="column" style={{ gap: `${SPACING_SCALE.MD}px` }}>
              <Flex align="flex-start" style={{ gap: `${SPACING_SCALE.SM}px` }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: `${SPACING_SCALE.XS}px` }} />
                <span>{t('data.privacyPoints.encryption')}</span>
              </Flex>
              <Flex align="flex-start" style={{ gap: `${SPACING_SCALE.SM}px` }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: `${SPACING_SCALE.XS}px` }} />
                <span>{t('data.privacyPoints.noSharing')}</span>
              </Flex>
              <Flex align="flex-start" style={{ gap: `${SPACING_SCALE.SM}px` }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: `${SPACING_SCALE.XS}px` }} />
                <span>{t('data.privacyPoints.deleteAnytime')}</span>
              </Flex>
              <Flex align="flex-start" style={{ gap: `${SPACING_SCALE.SM}px` }}>
                <CheckIcon size="sm" theme="success" style={{ marginTop: `${SPACING_SCALE.XS}px` }} />
                <span>{t('data.privacyPoints.compliance')}</span>
              </Flex>
            </Flex>
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