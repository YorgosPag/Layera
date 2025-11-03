import React, { useState, useEffect } from 'react';
import { AppShellProps } from '../../types';
import { Box } from '../Box';

/**
 * AppShell - Core layout component που παρέχει unified structure
 * για όλες τις Layera εφαρμογές
 */
export const AppShell: React.FC<AppShellProps> = ({
  children,
  header,
  sidebar,
  footer,
  layout = 'dashboard',
  className = '',
  sidebarCollapsed = false,
  onSidebarToggle
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle sidebar toggle
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSidebarToggle = (): void => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      onSidebarToggle?.(!sidebarCollapsed);
    }
  };

  // Close mobile sidebar when clicking outside
  const handleBackdropClick = (): void => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, isSidebarOpen]);

  const shellClasses = [
    'layera-app-shell',
    `layera-app-shell--${layout}`,
    sidebarCollapsed && !isMobile ? 'sidebar-collapsed' : '',
    !sidebar ? 'no-sidebar' : '',
    className
  ].filter(Boolean).join(' ');

  const sidebarClasses = [
    'layera-layout-sidebar',
    'layera-sidebar-transition',
    isMobile && isSidebarOpen ? 'sidebar-open' : ''
  ].filter(Boolean).join(' ');

  return (
    <Box className={shellClasses}>
      {/* Skip to content link για accessibility */}
      <a href="#main-content" className="layera-skip-to-content">
        Skip to main content
      </a>

      {/* Header */}
      {header && (
        <header className="layera-layout-header">
          {header}
        </header>
      )}

      {/* Sidebar */}
      {sidebar && (
        <>
          <aside className={sidebarClasses}>
            {sidebar}
          </aside>

          {/* Mobile backdrop */}
          {isMobile && (
            <Box
              className={`layera-layout-sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* Main content */}
      <main id="main-content" className="layera-layout-content">
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer className="layera-layout-footer">
          {footer}
        </footer>
      )}
    </Box>
  );
};