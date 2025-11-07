import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { FormField, FormSection, FormActions, Input } from '@layera/forms';
import { Button } from '@layera/buttons';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell, LayeraHeader, HeaderActionsGroup, PageContainer, FlexCenter, Box, Flex } from '@layera/layout';
import { DashboardCard } from '@layera/cards';
import { FORM_TYPES, FORM_SIZES, SPACING_SCALE, BORDER_RADIUS_SCALE, getCardInfoColor, getCardInfoBorder } from '@layera/constants';
// import { Text } from '@layera/typography'; // Temporarily disabled until package is fixed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, loading } = useAuthContext();
  const { t, currentLanguage } = useLayeraTranslation();
  const navigate = useNavigate();

  // Clear error when language changes
  useEffect(() => {
    if (error) {
      setError(''); // Clear any existing errors when language changes
    }
  }, [currentLanguage, error]);

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
          light: t('settings.items.theme.light'),
          dark: t('settings.items.theme.dark'),
          system: t('settings.items.theme.system')
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
            width="full"
            maxWidth="450px"
            style={{
              backgroundColor: getCardInfoColor(), // 🔴 SST: Login form color από μοναδική πηγή αλήθειας
              border: `3px solid ${getCardInfoBorder()}` // 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας #b929c6
            }}
          >
          {error && (
            <Box
              color="danger"
              borderRadius="input"
              marginBottom="md"
              fontSize="sm"
              padding="var(--la-space-sm-plus-xs)" // 🎯 SST: Complex spacing token
              style={{
                background: "var(--la-bg-danger-subtle, color-mix(in srgb, var(--la-bg-danger) 10%, transparent))",
                border: "1px solid var(--la-border-danger-subtle, color-mix(in srgb, var(--la-bg-danger) 30%, transparent))"
              }}
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
                  placeholder={t('forms.placeholders.email')}
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
                  placeholder={t('forms.placeholders.password')}
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
              top="50%"
              height="1px"
              style={{
                background: 'var(--la-border-primary)',
                zIndex: 1
              }}
            />
            <span
              style={{
                backgroundColor: 'var(--la-bg-primary)',
                padding: '0 var(--la-space-md-minus-xs-half)', // 🎯 SST: Complex spacing token
                position: 'relative',
                zIndex: 2
              }}
            >
              ή
            </span>
          </Box>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={async () => {
              try {
                // Simulate Google sign-in logic (to be implemented with proper Google auth)
                navigate('/dashboard');
              } catch (error) {
                console.error('Google sign-in error:', error);
                setError(t('errors.authError'));
              }
            }}
            style={{ marginBottom: `${SPACING_SCALE.MD}px` }}
          >
            {t('auth.signInWithGoogle')}
          </Button>

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