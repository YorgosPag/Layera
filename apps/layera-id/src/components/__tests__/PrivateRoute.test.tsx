import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { AuthProvider } from '@layera/auth-bridge';

// Mock the auth bridge
vi.mock('@layera/auth-bridge', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  useAuthContext: vi.fn(),
  RoleGuard: ({ children }: { children: React.ReactNode }) => <div data-testid="role-guard">{children}</div>,
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
          <div>Protected content</div>
        </PrivateRoute>
      </TestWrapper>
    );

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
  });

  it('wraps content with RoleGuard when role is specified', () => {
    render(
      <TestWrapper>
        <PrivateRoute requiredRole="admin">
          <div>Admin content</div>
        </PrivateRoute>
      </TestWrapper>
    );

    expect(screen.getByTestId('role-guard')).toBeInTheDocument();
  });
});