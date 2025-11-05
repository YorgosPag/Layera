import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Flex, FlexColumn, Box } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
// import { Text, Heading } from '@layera/typography'; // Temporarily disabled until package is fixed

// Temporary local Text component
const Text = ({ children, size = 'base', color = 'primary', weight = 'normal', font = 'sans', marginTop, wordBreak, ...props }) => {
  const styles = {
    fontSize: size === 'sm' ? 'var(--la-font-size-sm)' : size === 'base' ? 'var(--la-font-size-base)' : 'var(--la-font-size-base)',
    color: color === 'primary' ? 'var(--la-color-primary)' : color === 'secondary' ? 'var(--la-color-secondary)' : color === 'success' ? 'var(--la-color-success)' : color === 'warning' ? 'var(--la-color-warning)' : color === 'error' ? 'var(--la-color-error)' : 'var(--la-color-primary)',
    fontWeight: weight === 'semibold' ? '600' : weight === 'bold' ? '700' : '400',
    fontFamily: font === 'mono' ? 'monospace' : 'inherit',
    marginTop: marginTop === 'sm' ? 'var(--la-space-sm)' : marginTop === 'xs' ? 'var(--la-space-xs)' : marginTop || '0',
    wordBreak: wordBreak || 'normal',
    margin: '0'
  };
  return <span style={styles} {...props}>{children}</span>;
};
import { SPACING_SCALE } from '@layera/constants';
// import { SmartphoneIcon, CheckIcon, SettingsIcon, ChartIcon, ShieldIcon, FolderIcon, LockIcon, UserIcon, FileIcon, XIcon } from '@layera/icons';
// ΠΡΟΣΩΡΙΝΟ: Σχολιασμένα όλα τα icons μέχρι να λυθεί το export problem
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
      <PageContainer maxWidth="full" padding="lg">
          <PageHeader
            title={t('data.title')}
            subtitle={t('data.subtitle')}
          />

        {/* Personal Information Section */}
        <Box padding="lg">
          <DashboardSection
            title={t('data.personalInfo')}
            icon={<span>👤</span>} // icon={<UserIcon size="md" theme="neutral" />}
          >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 4 }}>
            <DashboardCard
              title={t('data.fields.email')}
              variant="info"
            >
              <h4 style={{ margin: 0, color: 'var(--la-color-primary)', fontSize: 'var(--la-font-size-lg)' }}>
                {user.email}
              </h4>
              <Flex align="center" gap="sm" marginTop="sm">
                {user.emailVerified ? (
                  <>
                    <span>✓</span> {/* <CheckIcon size="sm" theme="success" /> */}
                    <span style={{ color: 'var(--la-color-success)' }}>{t('status.verified')}</span>
                  </>
                ) : (
                  <>
                    <span>✗</span> {/* <XIcon size="sm" theme="danger" /> */}
                    <span style={{ color: 'var(--la-color-error)' }}>{t('status.unverified')}</span>
                  </>
                )}
              </Flex>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.displayName')}
              variant="info"
            >
              <h4 style={{ margin: 0, color: 'var(--la-color-primary)', fontSize: 'var(--la-font-size-lg)' }}>
                {user.displayName || t('data.fields.notAvailable')}
              </h4>
              <p style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-color-secondary)', margin: '0.5rem 0 0 0' }}>
                {user.displayName ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
              </p>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.userId')}
              variant="info"
            >
              <Text size="sm" font="mono" color="secondary" wordBreak="break-all">
                {user.uid}
              </Text>
              <Text size="sm" color="secondary" marginTop="sm">
                Μοναδικό αναγνωριστικό
              </Text>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.role')}
              variant="info"
            >
              <h4 style={{ margin: 0, color: 'var(--la-color-primary)', fontSize: 'var(--la-font-size-lg)' }}>
                {t(`roles.${user.layeraClaims?.role || 'private'}`)}
              </h4>
              <Text size="sm" color="secondary" marginTop="sm">
                Τύπος λογαριασμού
              </Text>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Security Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('data.security')}
          icon={<span>🛡️</span>} // icon={<ShieldIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <DashboardCard
              title={t('data.fields.mfaEnabled')}
              variant="status"
            >
              <Flex align="center" gap="md">
                {user.layeraClaims?.mfa_verified ? (
                  <>
                    <span>🔒</span> {/* <LockIcon size="lg" theme="success" /> */}
                    <Box>
                      <Text weight="semibold" color="success">
                        {t('status.enabled')}
                      </Text>
                      <Text size="sm" color="secondary">
                        {t('account.badges.mfaActive')}
                      </Text>
                    </Box>
                  </>
                ) : (
                  <>
                    <span>⚠️</span> {/* <XIcon size="lg" theme="warning" /> */}
                    <Box>
                      <Text weight="semibold" color="warning">
                        {t('status.disabled')}
                      </Text>
                      <Text size="sm" color="secondary">
                        {t('account.badges.mfaInactive')}
                      </Text>
                    </Box>
                  </>
                )}
              </Flex>
              {!user.layeraClaims?.mfa_verified && (
                <Button
                  variant="primary"
                  size="sm"
                  marginTop="md"
                  onClick={() => navigate('/mfa-enroll')}
                >
                  {t('account.actions.enable2fa')}
                </Button>
              )}
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Account Information Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('dashboard.accountDetails')}
          icon={<span>👤</span>} // icon={<UserIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <DashboardCard
              title={t('data.fields.accountCreated')}
              variant="info"
            >
              <Text size="base" color="primary">
                {formatDate(user.metadata?.creationTime)}
              </Text>
              <Text size="sm" color="secondary" marginTop="xs">
                Ημερομηνία δημιουργίας
              </Text>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.lastSignIn')}
              variant="info"
            >
              <Text size="base" color="primary">
                {formatDate(user.metadata?.lastSignInTime)}
              </Text>
              <Text size="sm" color="secondary" marginTop="xs">
                Τελευταία σύνδεση
              </Text>
            </DashboardCard>
          </DashboardGrid>
          </DashboardSection>
        </Box>

        {/* Data Export Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('data.export')}
          icon={<span>📁</span>} // icon={<FolderIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.exportDescription')}
            variant="actions"
          >
            <Flex direction="column" gap="lg">
              <Flex gap="lg" wrap={true}>
                <Button variant="secondary" size="sm">
                  <span>📄</span> {/* <FileIcon size="sm" theme="neutral" /> */}
                  {t('data.exportFormats.pdf')}
                </Button>
                <Button variant="secondary" size="sm">
                  <span>📄</span> {/* <FileIcon size="sm" theme="neutral" /> */}
                  {t('data.exportFormats.json')}
                </Button>
                <Button variant="secondary" size="sm">
                  <span>📄</span> {/* <FileIcon size="sm" theme="neutral" /> */}
                  {t('data.exportFormats.csv')}
                </Button>
              </Flex>
            </Flex>
          </DashboardCard>
          </DashboardSection>
        </Box>

        {/* Privacy Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('data.privacy')}
          icon={<span>🔒</span>} // icon={<LockIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.privacyPoints.title')}
            variant="info"
          >
            <Flex direction="column" gap="md">
              <Flex align="flex-start" gap="sm">
                <span>✓</span> {/* <CheckIcon size="sm" theme="success" marginTop="xs" /> */}
                <span>{t('data.privacyPoints.encryption')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <span>✓</span> {/* <CheckIcon size="sm" theme="success" marginTop="xs" /> */}
                <span>{t('data.privacyPoints.noSharing')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <span>✓</span> {/* <CheckIcon size="sm" theme="success" marginTop="xs" /> */}
                <span>{t('data.privacyPoints.deleteAnytime')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <span>✓</span> {/* <CheckIcon size="sm" theme="success" marginTop="xs" /> */}
                <span>{t('data.privacyPoints.compliance')}</span>
              </Flex>
            </Flex>
          </DashboardCard>
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