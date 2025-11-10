import React from 'react';
import { Box, Stack } from '../../../../packages/layout/src';

const LoginPage: React.FC = () => {
  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <p className="la-text-lg la-text-secondary la-leading-normal">
          Συνδεθείτε στο λογαριασμό σας
        </p>
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


    </Box>
  );
};

export default LoginPage;