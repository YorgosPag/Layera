import React from 'react';
import { Box, Stack } from '../../../../packages/layout/src';
import { Text } from '../../../../packages/typography/src';
import { useLayeraTranslation } from '@layera/tolgee';

const LoginPage: React.FC = () => {
  const { t } = useLayeraTranslation();

  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <Text size="lg" color="secondary" lineHeight="normal">
          {t('auth.subtitle')}
        </Text>
      </Box>

          <Stack as="form" className="layera-stack--spacing-lg">
            <Box>
              <label htmlFor="email" className="layera-form-label">
                <Text size="sm" weight="medium" color="primary">
                  {t('auth.email')}
                </Text>
              </label>
              <input
                type="email"
                id="email"
                className="layera-form-input"
                placeholder={t('auth.emailPlaceholder')}
              />
            </Box>

            <Box>
              <label htmlFor="password" className="layera-form-label">
                <Text size="sm" weight="medium" color="primary">
                  {t('auth.password')}
                </Text>
              </label>
              <input
                type="password"
                id="password"
                className="layera-form-input"
                placeholder={t('auth.passwordPlaceholder')}
              />
            </Box>

            <Box
              as="button"
              type="submit"
              className="layera-full-width layera-padding--md layera-button-primary"
            >
              {t('auth.login')}
            </Box>
          </Stack>

          <Box className="layera-margin-top--lg layera-text-center">
            <Text color="secondary">
              {t('auth.noAccount')}
            </Text>
          </Box>


    </Box>
  );
};

export default LoginPage;