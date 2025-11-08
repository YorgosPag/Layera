import React from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { AuthProvider } from '@layera/auth-bridge';
import { Box } from '@layera/layout';

// Mock the auth bridge
vi.mock('@layera/auth-bridge', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <Box data-testid="auth-provider">{children}</Box>,
  useAuthContext: vi.fn(),
  RoleGuard: ({ children }: { children: React.ReactNode }) => <Box data-testid="role-guard">{children}</Box>,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('PrivateRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <PrivateRoute>
          <Box>Protected content</Box>
        </PrivateRoute>
      </TestWrapper>
    );

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  });

  it('wraps content with RoleGuard when role is specified', () => {
    render(
      <TestWrapper>
        <PrivateRoute requirePro={true}>
          <Box>Admin content</Box>
        </PrivateRoute>
      </TestWrapper>
    );

    expect(screen.getByTestId('role-guard')).toBeInTheDocument();
  });
});