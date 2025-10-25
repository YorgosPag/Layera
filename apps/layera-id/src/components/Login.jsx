import React, { useState } from 'react';
import { useAuthContext, GoogleSignInButton } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { FormField, FormSection, FormActions, Input } from '@layera/forms';
import { Button } from '@layera/buttons';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer } from '@layera/layout';
import { DashboardCard } from '@layera/cards';
import { FORM_TYPES, FORM_SIZES, SPACING_SCALE } from '@layera/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, loading } = useAuthContext();
  const { t, currentLanguage } = useLayeraTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);

    const result = await signIn({
      email,
      password,
      rememberMe: true
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || t('errors.authError'));
    }

    setIsLoading(false);
  };

  // Header actions με θέμα και γλώσσα
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
          width: '100%'
        }}>
          <DashboardCard
            title={t('auth.login')}
            variant="form"
            style={{ width: '100%', maxWidth: '450px' }}
          >
          {error && (
            <div style={{
              background: 'color-mix(in srgb, var(--layera-bg-danger) 10%, transparent)',
              color: 'var(--layera-bg-danger)',
              padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
              marginBottom: `${SPACING_SCALE.MD}px`,
              fontSize: '14px',
              border: '1px solid color-mix(in srgb, var(--layera-bg-danger) 30%, transparent)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormField
                labelKey="forms.labels.email"
                required
              >
                <Input
                  type={FORM_TYPES.EMAIL}
                  size={FORM_SIZES.MEDIUM}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholderKey="forms.placeholders.email"
                  disabled={isLoading || loading}
                  fullWidth
                  autoComplete="email"
                />
              </FormField>

              <FormField
                labelKey="forms.labels.password"
                required
              >
                <Input
                  type={FORM_TYPES.PASSWORD}
                  size={FORM_SIZES.MEDIUM}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholderKey="forms.placeholders.password"
                  disabled={isLoading || loading}
                  fullWidth
                  autoComplete="current-password"
                />
              </FormField>

              <FormActions>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading || loading}
                  loading={isLoading || loading}
                  loadingText={t('common.processing')}
                  fullWidth
                >
                  {t('auth.login')}
                </Button>
              </FormActions>
            </FormSection>
          </form>

          <div style={{
            margin: `${SPACING_SCALE.XL}px 0`,
            textAlign: 'center',
            position: 'relative',
            color: 'var(--layera-text-secondary)',
            fontSize: '14px'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '1px',
              background: 'var(--layera-border-primary)',
              zIndex: '1'
            }}></div>
            <span style={{
              background: 'var(--layera-bg-primary)',
              padding: `0 ${SPACING_SCALE.MD - SPACING_SCALE.XS}px`,
              position: 'relative',
              zIndex: '2'
            }}>
              ή
            </span>
          </div>

          <GoogleSignInButton
            onSuccess={(user) => {
              console.log('Google sign-in successful:', user.email);
              navigate('/dashboard');
            }}
            onError={(error) => {
              console.error('Google sign-in error:', error);
              setError(error);
            }}
            style={{ marginBottom: `${SPACING_SCALE.MD}px`, width: '100%' }}
          />

          <div style={{
            marginTop: `${SPACING_SCALE.XL}px`,
            textAlign: 'center',
            fontSize: '14px'
          }}>
            <Link
              to="/forgot-password"
              style={{
                color: 'var(--layera-bg-info)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {t('auth.forgotPassword')}
            </Link>
            <p style={{
              margin: `${SPACING_SCALE.SM}px 0`,
              color: 'var(--layera-text-secondary)'
            }}>
              {t('auth.noAccount')} {' '}
              <Link
                to="/register"
                style={{
                  color: 'var(--layera-bg-info)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </DashboardCard>
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default Login;