import { auth } from '../firebase';
import { PhoneAuthProvider, RecaptchaVerifier, multiFactor } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext, UserAvatar } from '@layera/auth-bridge';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { Button } from '@layera/buttons';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, PageHeader } from '@layera/layout';
import { DashboardGrid, DashboardSection, DashboardCard } from '@layera/cards';
import { LockIcon, ShieldIcon, RocketIcon, SmartphoneIcon, CheckIcon } from './icons/LayeraIcons';
import QuickActions from './QuickActions';
import '@layera/layout/styles';
import '@layera/cards/styles';
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
            title={t('mfa.title')}
            subtitle={t('mfa.subtitle')}
          />
        </div>

        {/* Security Information Section */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
            title={t('mfa.whyNeeded.title')}
            icon={<ShieldIcon size="md" theme="neutral" />}
          >
            <DashboardCard
              title={t('mfa.whyNeeded.description')}
              variant="info"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                  <span>{t('mfa.whyNeeded.benefits.passwordProtection')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                  <span>{t('mfa.whyNeeded.benefits.secureAccess')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckIcon size="sm" theme="success" style={{ marginTop: '0.125rem' }} />
                  <span>{t('mfa.whyNeeded.benefits.unauthorizedAlert')}</span>
                </div>
              </div>
            </DashboardCard>
          </DashboardSection>
        </div>

        {/* MFA Setup Form */}
        <div style={{ padding: 'var(--layera-space-lg)' }}>
          <DashboardSection
            title={t('mfa.form.enableButton')}
            icon={<LockIcon size="md" theme="neutral" />}
          >
            <DashboardCard
              title={t('mfa.form.phoneLabel')}
              variant="actions"
            >
              <form onSubmit={(e) => { e.preventDefault(); start(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="phone" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                    <SmartphoneIcon size="sm" theme="neutral" /> {t('mfa.form.phoneLabel')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid var(--layera-layout-border)',
                      borderRadius: 'var(--layera-radius-md)',
                      fontSize: '1rem',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                    placeholder="+30 6912345678"
                    disabled={loading}
                    required
                  />
                  <small style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    {t('mfa.form.phoneHint')}
                  </small>
                </div>

                <div id="recaptcha" style={{ margin: '1rem 0' }}></div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading || !phone.trim()}
                  style={{ width: '100%' }}
                >
                  {loading ? (
                    <>⏳ {t('common.processing')}</>
                  ) : (
                    <><RocketIcon size="sm" theme="neutral" /> {t('mfa.form.enableButton')}</>
                  )}
                </Button>
              </form>
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