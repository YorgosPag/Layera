import React from 'react';
import { Box, Flex } from '@layera/layout';
import { AppHeader } from './AppHeader';
import { PrimarySidebar } from './PrimarySidebar';
import { SettingsSidebar } from './SettingsSidebar';
import { DesignControlPanel } from '../design-control/DesignControlPanel';
import { MainContent } from './MainContent';

/**
 * ARXES COMPLIANT Full App Layout Component
 *
 * Αναπαράγει την ακριβή διάταξη του FullAppPreview_Mockup.html:
 * - Header με 6-color system
 * - Primary Sidebar (Navigation)
 * - Settings Sidebar (Secondary Left)
 * - Main Content Area με tabs
 * - Design Control Panel (Secondary Right)
 *
 * Χρησιμοποιεί υπάρχοντα @layera/* components και tokens
 */

export const FullAppLayout: React.FC = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(true);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<string>('themes');
  const [headerColor, setHeaderColor] = React.useState<string>('primary');

  const handleSidebarToggle = React.useCallback((position: 'left' | 'right') => {
    if (position === 'left') {
      setLeftSidebarOpen(prev => !prev);
    } else {
      setRightSidebarOpen(prev => !prev);
    }
  }, []);

  const handleHeaderColorChange = React.useCallback((color: string) => {
    setHeaderColor(color);
    // Update CSS custom property for live color change
    document.documentElement.style.setProperty('--live-primary-color', `var(--live-${color}-color)`);
  }, []);

  const handleNavigationClick = React.useCallback((itemId: string) => {
    console.log(`Navigation clicked: ${itemId}`);
    // Handle navigation logic here
  }, []);

  const handleTabChange = React.useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleSettingsChange = React.useCallback((setting: string, value: unknown) => {
    console.log(`Settings changed: ${setting} = ${value}`);
    // Handle settings changes here
  }, []);

  const handleLockScreen = React.useCallback(() => {
    console.log('Lock screen requested');
    // Handle lock screen functionality
  }, []);

  return (
    <Box className="layera-layout layera-layout-main-container">
      {/* App Header */}
      <AppHeader
        onToggleSidebar={handleSidebarToggle}
        onHeaderColorChange={handleHeaderColorChange}
        activeHeaderColor={headerColor}
      />

      {/* Main Layout Container */}
      <Flex className="layera-layout layera-layout-flex-container">
        {/* Primary Sidebar (Navigation) */}
        <PrimarySidebar onNavigationClick={handleNavigationClick} />

        {/* Settings Sidebar (Secondary Left) */}
        <SettingsSidebar
          isOpen={leftSidebarOpen}
          onLanguageChange={(language) => handleSettingsChange('language', language)}
          onThemeModeChange={(mode) => handleSettingsChange('themeMode', mode)}
          onDeviceModeChange={(device) => handleSettingsChange('deviceMode', device)}
          onNotificationsToggle={(enabled) => handleSettingsChange('notifications', enabled)}
          onAutoLogoutChange={(timeout) => handleSettingsChange('autoLogout', timeout)}
          onLockScreen={handleLockScreen}
        />

        {/* Main Content Area */}
        <MainContent
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Design Control Panel (Secondary Right) */}
        <Box className={`layera-layout layera-layout-sidebar-transition ${rightSidebarOpen ? 'layera-layout-full-width' : ''}`}>
          {rightSidebarOpen && (
            <DesignControlPanel />
          )}
        </Box>
      </Flex>
    </Box>
  );
};