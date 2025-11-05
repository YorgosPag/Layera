import { auth } from '../firebase';
import { PhoneAuthProvider, RecaptchaVerifier, multiFactor } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader, Flex, FlexColumn, Box } from '@layera/layout';
// import { Text, Heading } from '@layera/typography'; // Temporarily disabled until package is fixed
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { SPACING_SCALE } from '@layera/constants';
// import { SmartphoneIcon, CheckIcon, LockIcon, RocketIcon, ShieldIcon } from '@layera/icons'; // DISABLED: Export issues
import QuickActions from './QuickActions';
import './MfaEnroll.css';

export default function MfaEnroll() {
  const { user, signOut } = useAuthContext();
  const { t } = useLayeraTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('phone'); // 'phone' or 'verification'

  if (!user) return null;

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/login');
    } else {
      console.error('Logout error:', result.error);
    }
  };

  async function start() {
    if (!phone.trim()) {
      alert(t('mfa.errors.enterPhone'));
      return;
    }

    setLoading(true);
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const session = await multiFactor(auth.currentUser).getSession();
      const provider = new PhoneAuthProvider(auth);
      const verId = await provider.verifyPhoneNumber({ phoneNumber: phone, session }, recaptcha);
      const code = window.prompt(t('mfa.prompts.enterSmsCode'));

      if (code) {
        const cred = PhoneAuthProvider.credential(verId, code);
        await multiFactor(auth.currentUser).enroll(cred, 'primary');
        alert(t('mfa.success.enrollmentComplete'));
        navigate('/account');
      }
    } catch (error) {
      console.error('2FA enrollment error:', error);

      let errorMessage = error.message;

      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = t('mfa.errors.operationNotAllowed');
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = t('mfa.errors.tooManyRequests');
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = t('mfa.errors.invalidPhoneNumber');
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = t('mfa.errors.requiresRecentLogin');
      }

      alert(t('common.error') + ': ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

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
            title={t('mfa.title')}
            subtitle={t('mfa.subtitle')}
          />

        {/* Security Information Section */}
        <Box padding="lg">
          <DashboardSection
            title={t('mfa.whyNeeded.title')}
            icon={<span style={{fontSize: '20px'}}>🛡️</span>}
          >
            <DashboardCard
              title={t('mfa.whyNeeded.description')}
              variant="info"
            >
              <Flex direction="column" gap="md">
                <Flex align="flex-start" gap="sm">
                  <span style={{fontSize: '16px'}}>✅</span>
                  <span>{t('mfa.whyNeeded.benefits.passwordProtection')}</span>
                </Flex>
                <Flex align="flex-start" gap="sm">
                  <span style={{fontSize: '16px'}}>✅</span>
                  <span>{t('mfa.whyNeeded.benefits.secureAccess')}</span>
                </Flex>
                <Flex align="flex-start" gap="sm">
                  <span style={{fontSize: '16px'}}>✅</span>
                  <span>{t('mfa.whyNeeded.benefits.unauthorizedAlert')}</span>
                </Flex>
              </Flex>
            </DashboardCard>
          </DashboardSection>
        </Box>

        {/* MFA Setup Form */}
        <Box padding="lg">
          <DashboardSection
            title={t('mfa.form.enableButton')}
            icon={<span style={{fontSize: '20px'}}>🔒</span>}
          >
            <DashboardCard
              title={t('mfa.form.phoneLabel')}
              variant="actions"
            >
              <form onSubmit={(e) => { e.preventDefault(); start(); }}>
                <Flex direction="column" gap="lg">
                  <Flex direction="column" gap="sm">
                    <Flex align="center" gap="sm">
                      <span style={{fontSize: '16px'}}>📱</span>
                      <span style={{ fontWeight: 'var(--la-font-weight-semibold)' }}>{t('mfa.form.phoneLabel')}</span>
                    </Flex>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="layera-input"
                      placeholder="+30 6912345678"
                      disabled={loading}
                      required
                    />
                    <span style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-text-secondary)' }}>
                      {t('mfa.form.phoneHint')}
                    </span>
                  </Flex>

                  <Box margin="md" id="recaptcha"></Box>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading || !phone.trim()}
                    width="full"
                  >
                  {loading ? (
                    <>⏳ {t('common.processing')}</>
                  ) : (
                    <><span style={{fontSize: '16px'}}>🚀</span> {t('mfa.form.enableButton')}</>
                  )}
                </Button>
                </Flex>
              </form>
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