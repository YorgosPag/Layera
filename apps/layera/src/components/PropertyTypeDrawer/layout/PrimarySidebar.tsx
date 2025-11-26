import React from 'react';
import { Box } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * ARXES COMPLIANT Primary Sidebar Component
 *
 * Αντιστοιχεί στο primary sidebar του FullAppPreview_Mockup.html:
 * - Navigation menu items
 * - Filter search input
 * - Quick Actions section
 * - Login form
 *
 * Χρησιμοποιεί υπάρχοντα @layera/* components και tokens
 */

const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: '🏠 Dashboard', active: true },
  { id: 'analytics', label: '📊 Analytics', active: false },
  { id: 'settings', label: '⚙️ Settings', active: false },
  { id: 'users', label: '👥 Users', active: false },
  { id: 'reports', label: '📋 Reports', active: false },
  { id: 'tools', label: '🔧 Tools', active: false }
] as const;

interface PrimarySidebarProps {
  onNavigationClick?: (itemId: string) => void;
}

export const PrimarySidebar: React.FC<PrimarySidebarProps> = ({
  onNavigationClick
}) => {
  const [filterText, setFilterText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleMenuItemClick = React.useCallback((itemId: string) => {
    onNavigationClick?.(itemId);
  }, [onNavigationClick]);

  const handleLogin = React.useCallback(() => {
    console.log('Login attempt:', { email, password });
    // Handle login logic here
  }, [email, password]);

  const filteredItems = NAVIGATION_ITEMS.filter(item =>
    item.label.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box className="layera-layout layera-primary-sidebar layera-padding--md">
      {/* Navigation Section */}
      <Heading
        className="layera-typography layera-margin-bottom--md primary-sidebar-heading"
        data-size="md"
        data-weight="semibold"
      >
        📂 Navigation
      </Heading>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="🔍 Filter menu..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="layera-input layera-width--full layera-margin-bottom--md primary-sidebar-input"
      />

      {/* Menu Items */}
      <Box className="layera-flex layera-flex--direction-column layera-flex--gap-xs layera-margin-bottom--xl">
        {filteredItems.map(({ id, label, active }) => (
          <Button
            key={id}
            variant={active ? 'primary' : 'outline'}
            size="md"
            onClick={() => handleMenuItemClick(id)}
            className={`layera-button layera-width--full layera-text--align-left layera-menu-item primary-sidebar-menu-item ${active ? 'primary-sidebar-menu-item--active' : ''}`}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Quick Actions Section */}
      <Heading
        className="layera-typography layera-margin-bottom--md primary-sidebar-heading--actions"
        data-size="md"
        data-weight="semibold"
      >
        ⚙️ Quick Actions
      </Heading>

      {/* Login Form */}
      <Box className="layera-flex layera-flex--direction-column layera-flex--gap-sm">
        <input
          type="email"
          placeholder="📧 Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="layera-input layera-width--full primary-sidebar-login-input"
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="layera-input layera-width--full primary-sidebar-login-input"
        />

        <Button
          variant="primary"
          size="md"
          onClick={handleLogin}
          className="layera-button layera-width--full primary-sidebar-login-button"
        >
          🔑 Login
        </Button>
      </Box>
    </Box>
  );
};