import React, { useState } from 'react';
import { useAuthContext, GoogleSignInButton } from '@layera/auth-bridge';
import { useNavigate, Link } from 'react-router-dom';
import { FormField, FormSection, FormActions, Input } from '@layera/forms';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { FORM_TYPES, FORM_SIZES, getCardInfoColor } from '@layera/constants';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuthContext();
  const { t } = useLayeraTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError(t('errors.passwordMismatch'));
    }

    if (password.length < 6) {
      return setError(t('errors.passwordTooShort'));
    }

    try {
      setError('');
      setLoading(true);

      // Δημιουργία λογαριασμού με auth-bridge
      const result = await signUp({
        email,
        password,
        displayName: displayName || undefined
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || t('errors.unknownError'));
      }
    } catch (error) {
      setError(t('errors.unknownError'));
      console.error(error);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);

      const result = await signInWithGoogle();

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || t('errors.authError'));
      }
    } catch (error) {
      setError(t('errors.authError'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-container">
      <BaseCard
        title={t('auth.register')}
        className="auth-card-replacement"
        style={{ backgroundColor: getCardInfoColor() }} // 🔴 SST: Register form color από μοναδική πηγή αλήθειας
      >
        {error && <Box className="error-message">{error}</Box>}

        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormField
              labelKey="forms.labels.name"
              hintKey="forms.hints.displayName"
            >
              <Input
                type={FORM_TYPES.TEXT}
                size={FORM_SIZES.MEDIUM}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholderKey="forms.placeholders.displayName"
                disabled={loading}
                fullWidth
                autoComplete="name"
              />
            </FormField>

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
                disabled={loading}
                fullWidth
                autoComplete="email"
              />
            </FormField>

            <FormField
              labelKey="forms.labels.password"
              hintKey="forms.hints.passwordRequirements"
              required
            >
              <Input
                type={FORM_TYPES.PASSWORD}
                size={FORM_SIZES.MEDIUM}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholderKey="forms.placeholders.password"
                disabled={loading}
                fullWidth
                autoComplete="new-password"
              />
            </FormField>

            <FormField
              labelKey="forms.labels.confirmPassword"
              required
            >
              <Input
                type={FORM_TYPES.PASSWORD}
                size={FORM_SIZES.MEDIUM}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholderKey="forms.placeholders.confirmPassword"
                disabled={loading}
                fullWidth
                autoComplete="new-password"
              />
            </FormField>

            <FormActions>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                loading={loading}
                loadingText={t('common.processing')}
                fullWidth
              >
                {t('auth.register')}
              </Button>
            </FormActions>
          </FormSection>
        </form>

        <Box className="auth-divider">
          <span>ή</span>
        </Box>

        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          disabled={loading}
        />

        <Box className="auth-links">
          <p>
            {t('auth.hasAccount')} <Link to="/login">{t('auth.login')}</Link>
          </p>
        </Box>
      </BaseCard>
    </Box>
  );
};

export default Register;