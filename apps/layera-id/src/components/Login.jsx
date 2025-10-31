import React, { useState } from 'react';
import { useAuthContext, GoogleSignInButton } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { FormField, FormSection, FormActions, Input } from '@layera/forms';
import { Button } from '@layera/buttons';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, FlexCenter, Box, Flex } from '@layera/layout';
import { DashboardCard } from '@layera/cards';
import { FORM_TYPES, FORM_SIZES, SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
// import { Text } from '@layera/typography'; // Temporarily disabled until package is fixed

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
        <FlexCenter
          minHeight="calc(100vh - 200px)"
          width="full"
        >
          <DashboardCard
            title={t('auth.login')}
            variant="form"
            width="full"
            maxWidth="450px"
          >
          {error && (
            <Box
              color="danger"
              borderRadius="input"
              marginBottom="md"
              fontSize="sm"
              border="danger"
              padding={`${SPACING_SCALE.SM + SPACING_SCALE.XS}px`}
              background="var(--la-bg-danger-subtle, color-mix(in srgb, var(--la-bg-danger) 10%, transparent))"
              borderColor="var(--la-border-danger-subtle, 1px solid color-mix(in srgb, var(--la-bg-danger) 30%, transparent))"
            >
              <span style={{ fontSize: 'var(--la-font-size-sm)', color: 'var(--la-color-danger)' }}>{error}</span>
            </Box>
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

          <Box
            textAlign="center"
            position="relative"
            color="secondary"
            fontSize="sm"
            margin={`${SPACING_SCALE.XL}px 0`}
          >
            <Box
              position="absolute"
              left="0"
              right="0"
              backgroundColor="border"
              zIndex="1"
              top="50%"
              height="1px"
              background="var(--la-border-primary)"
            />
            <span
              style={{
                backgroundColor: 'var(--la-bg-primary)',
                padding: `0 ${SPACING_SCALE.MD - SPACING_SCALE.XS}px`,
                position: 'relative',
                zIndex: 2
              }}
            >
              ή
            </span>
          </Box>

          <GoogleSignInButton
            onSuccess={(user) => {
              navigate('/dashboard');
            }}
            onError={(error) => {
              console.error('Google sign-in error:', error);
              setError(error);
            }}
            marginBottom="md"
            width="full"
          />

          <Box
            marginTop="xl"
            textAlign="center"
            fontSize="sm"
          >
            <Link
              to="/forgot-password"
              color="var(--la-color-info, var(--la-bg-info))"
              textDecoration="var(--la-text-decoration-none, none)"
              fontWeight="var(--la-font-weight-medium, 500)"
            >
              {t('auth.forgotPassword')}
            </Link>
            <p
              style={{
                margin: `${SPACING_SCALE.SM}px 0`,
                color: 'var(--la-text-secondary)'
              }}
            >
              {t('auth.noAccount')} {' '}
              <Link
                to="/register"
                style={{
                  color: 'var(--la-color-info, var(--la-bg-info))',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                {t('auth.register')}
              </Link>
            </p>
          </Box>
        </DashboardCard>
        </FlexCenter>
      </PageContainer>
    </AppShell>
  );
};

export default Login;