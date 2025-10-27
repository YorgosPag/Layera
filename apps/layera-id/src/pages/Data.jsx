import React from 'react';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Flex, FlexColumn, Box } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
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
      <PageContainer maxWidth="full" padding="lg">
          <PageHeader
            title={t('data.title')}
            subtitle={t('data.subtitle')}
          />

        {/* Personal Information Section */}
        <Box padding="lg">
          <DashboardSection
            title={t('data.personalInfo')}
            icon={<UserIcon size="md" theme="neutral" />}
          >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 4 }}>
            <DashboardCard
              title={t('data.fields.email')}
              variant="info"
            >
              <Heading level={4} color="primary">
                {user.email}
              </Heading>
              <Flex align="center" gap="sm" marginTop="sm">
                {user.emailVerified ? (
                  <>
                    <CheckIcon size="sm" theme="success" />
                    <Text color="success">{t('status.verified')}</Text>
                  </>
                ) : (
                  <>
                    <XIcon size="sm" theme="danger" />
                    <Text color="error">{t('status.unverified')}</Text>
                  </>
                )}
              </Flex>
            </DashboardCard>

            <DashboardCard
              title={t('data.fields.displayName')}
              variant="info"
            >
              <Heading level={4} color="primary">
                {user.displayName || t('data.fields.notAvailable')}
              </Heading>
              <Text size="sm" color="secondary" marginTop="sm">
                {user.displayName ? 'Διαθέσιμο' : 'Μη διαθέσιμο'}
              </Text>
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
              <Heading level={4} color="primary">
                {t(`roles.${user.layeraClaims?.role || 'private'}`)}
              </Heading>
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
          icon={<ShieldIcon size="md" theme="neutral" />}
        >
          <DashboardGrid columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <DashboardCard
              title={t('data.fields.mfaEnabled')}
              variant="status"
            >
              <Flex align="center" gap="md">
                {user.layeraClaims?.mfa_verified ? (
                  <>
                    <LockIcon size="lg" theme="success" />
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
                    <XIcon size="lg" theme="warning" />
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
          icon={<UserIcon size="md" theme="neutral" />}
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
          icon={<FolderIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.exportDescription')}
            variant="actions"
          >
            <Flex direction="column" gap="lg">
              <Flex gap="lg" wrap={true}>
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
        </Box>

        {/* Privacy Section */}
        <Box padding="lg">
          <DashboardSection
          title={t('data.privacy')}
          icon={<LockIcon size="md" theme="neutral" />}
        >
          <DashboardCard
            title={t('data.privacyPoints.title')}
            variant="info"
          >
            <Flex direction="column" gap="md">
              <Flex align="flex-start" gap="sm">
                <CheckIcon size="sm" theme="success" marginTop="xs" />
                <span>{t('data.privacyPoints.encryption')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <CheckIcon size="sm" theme="success" marginTop="xs" />
                <span>{t('data.privacyPoints.noSharing')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <CheckIcon size="sm" theme="success" marginTop="xs" />
                <span>{t('data.privacyPoints.deleteAnytime')}</span>
              </Flex>
              <Flex align="flex-start" gap="sm">
                <CheckIcon size="sm" theme="success" marginTop="xs" />
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