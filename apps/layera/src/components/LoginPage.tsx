import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Stack, LayeraHeader, HeaderActionsGroup } from '../../../../packages/layout/src';
import { ThemeSwitcher } from '@layera/theme-switcher';

const LoginPage: React.FC = () => {
  return (
    <Box className="layera-full-height layera-container--fullscreen">
      <LayeraHeader
        title="Layera"
        variant="minimal"
        actions={
          <HeaderActionsGroup>
            <ThemeSwitcher variant="icon" size="md" />
          </HeaderActionsGroup>
        }
      />

      <Box className="layera-full-height layera-flex layera-flex--center la-bg-surface-light">
      <Box className="layera-padding--xl la-bg-primary">
        <Box className="layera-text-center la-mb-8">
          <h1 className="la-text-3xl la-font-bold la-text-primary la-leading-tight la-mb-2">Είσοδος</h1>
          <p className="la-text-base la-text-secondary la-leading-normal">Συνδεθείτε στο λογαριασμό σας</p>
        </Box>

        <Stack as="form" className="layera-stack--spacing-lg">
          <Box>
            <label htmlFor="email" className="la-form-label la-text-sm la-font-medium la-text-primary">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="la-form-input"
              placeholder="example@email.com"
            />
          </Box>

          <Box>
            <label htmlFor="password" className="la-form-label la-text-sm la-font-medium la-text-primary">
              Κωδικός
            </label>
            <input
              type="password"
              id="password"
              className="la-form-input"
              placeholder="Εισάγετε τον κωδικό σας"
            />
          </Box>

          <Box
            as="button"
            type="submit"
            className="layera-full-width layera-padding--md la-btn-primary"
          >
            Είσοδος
          </Box>
        </Stack>

        <Box className="la-mt-6 layera-text-center">
          <p className="la-text-secondary">
            Δεν έχετε λογαριασμό;{' '}
            <a href="#" className="la-text-primary la-transition-opacity la-hover-opacity">
              Εγγραφείτε εδώ
            </a>
          </p>
        </Box>

        <Box className="la-mt-8 layera-text-center">
          <Link to="/" className="la-text-primary la-transition-opacity la-hover-opacity">
            ← Επιστροφή στην Αρχική
          </Link>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;