import React from 'react';
import { Box } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * ARXES COMPLIANT Settings Sidebar Component
 *
 * Αντιστοιχεί στο left secondary sidebar του FullAppPreview_Mockup.html:
 * - System Settings (Language, Theme Mode, Device Mode, Notifications)
 * - Security Settings (Auto Logout)
 * - Lock Screen button
 *
 * Χρησιμοποιεί υπάρχοντα @layera/* components και tokens
 */

interface SettingsSidebarProps {
  isOpen: boolean;
  onLanguageChange?: (language: string) => void;
  onThemeModeChange?: (mode: string) => void;
  onDeviceModeChange?: (device: string) => void;
  onNotificationsToggle?: (enabled: boolean) => void;
  onAutoLogoutChange?: (timeout: string) => void;
  onLockScreen?: () => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  isOpen,
  onLanguageChange,
  onThemeModeChange,
  onDeviceModeChange,
  onNotificationsToggle,
  onAutoLogoutChange,
  onLockScreen
}) => {
  const [language, setLanguage] = React.useState('🇬🇷 Ελληνικά');
  const [themeMode, setThemeMode] = React.useState('light');
  const [deviceMode, setDeviceMode] = React.useState('💻 Desktop');
  const [notifications, setNotifications] = React.useState(true);
  const [autoLogout, setAutoLogout] = React.useState('15 minutes');

  const handleLanguageChange = React.useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  }, [onLanguageChange]);

  const handleThemeModeChange = React.useCallback((mode: string) => {
    setThemeMode(mode);
    onThemeModeChange?.(mode);
  }, [onThemeModeChange]);

  const handleDeviceModeChange = React.useCallback((device: string) => {
    setDeviceMode(device);
    onDeviceModeChange?.(device);
  }, [onDeviceModeChange]);

  const handleNotificationsToggle = React.useCallback((enabled: boolean) => {
    setNotifications(enabled);
    onNotificationsToggle?.(enabled);
  }, [onNotificationsToggle]);

  const handleAutoLogoutChange = React.useCallback((timeout: string) => {
    setAutoLogout(timeout);
    onAutoLogoutChange?.(timeout);
  }, [onAutoLogoutChange]);

  return (
    <Box className={`layera-layout layera-settings-sidebar ${isOpen ? 'layera-layout-full-width' : ''}`}>
      {isOpen && (
        <>
          {/* System Settings */}
          <Heading
            className="layera-typography layera-margin-bottom--md"
            data-size="md"
            data-weight="semibold"
            style={{
              color: '#ecf0f1',
              borderBottom: '1px solid #4a5568',
              paddingBottom: 'var(--layera-space-2)'
            }}
          >
            ⚙️ System Settings
          </Heading>

          {/* Language Setting */}
          <Box className="layera-margin-bottom--md">
            <Text
              className="layera-typography layera-margin-bottom--xs"
              data-size="sm"
              data-weight="medium"
            >
              🌐 Language
            </Text>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="layera-select layera-width--full"
              style={{
                padding: 'var(--layera-space-3)',
                border: 'none',
                borderRadius: 'var(--live-border-radius)',
                background: '#4a5568',
                color: 'white',
                width: '100%'
              }}
            >
              <option>🇬🇷 Ελληνικά</option>
              <option>🇺🇸 English</option>
              <option>🇫🇷 Français</option>
            </select>
          </Box>

          {/* Theme Mode Setting */}
          <Box className="layera-margin-bottom--md">
            <Text
              className="layera-typography layera-margin-bottom--xs"
              data-size="sm"
              data-weight="medium"
            >
              🌙 Theme Mode
            </Text>
            <Box className="layera-flex layera-flex--gap-xs">
              <Button
                variant={themeMode === 'light' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleThemeModeChange('light')}
                className="layera-button layera-flex--grow"
                style={{
                  background: themeMode === 'light' ? 'var(--live-primary-color)' : '#666',
                  color: 'white',
                  border: 'none'
                }}
              >
                ☀️ Light
              </Button>
              <Button
                variant={themeMode === 'dark' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleThemeModeChange('dark')}
                className="layera-button layera-flex--grow"
                style={{
                  background: themeMode === 'dark' ? 'var(--live-primary-color)' : '#666',
                  color: 'white',
                  border: 'none'
                }}
              >
                🌙 Dark
              </Button>
            </Box>
          </Box>

          {/* Device Mode Setting */}
          <Box className="layera-margin-bottom--md">
            <Text
              className="layera-typography layera-margin-bottom--xs"
              data-size="sm"
              data-weight="medium"
            >
              📱 Device Mode
            </Text>
            <select
              value={deviceMode}
              onChange={(e) => handleDeviceModeChange(e.target.value)}
              className="layera-select layera-width--full"
              style={{
                padding: 'var(--layera-space-3)',
                border: 'none',
                borderRadius: 'var(--live-border-radius)',
                background: '#4a5568',
                color: 'white',
                width: '100%'
              }}
            >
              <option>💻 Desktop</option>
              <option>📱 Mobile</option>
              <option>📟 Tablet</option>
            </select>
          </Box>

          {/* Notifications Setting */}
          <Box className="layera-margin-bottom--xl">
            <Text
              className="layera-typography layera-margin-bottom--xs"
              data-size="sm"
              data-weight="medium"
            >
              🔊 Notifications
            </Text>
            <Box className="layera-flex layera-flex--align-center layera-flex--gap-xs">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => handleNotificationsToggle(e.target.checked)}
                className="layera-checkbox"
                style={{ margin: 0 }}
              />
              <Text className="layera-typography" data-size="sm">
                Enable sound alerts
              </Text>
            </Box>
          </Box>

          {/* Security Section */}
          <Heading
            className="layera-typography layera-margin-bottom--md"
            data-size="md"
            data-weight="semibold"
            style={{ color: '#ecf0f1' }}
          >
            🔐 Security
          </Heading>

          {/* Auto Logout Setting */}
          <Box className="layera-margin-bottom--md">
            <Text
              className="layera-typography layera-margin-bottom--xs"
              data-size="sm"
              data-weight="medium"
            >
              ⏰ Auto Logout
            </Text>
            <select
              value={autoLogout}
              onChange={(e) => handleAutoLogoutChange(e.target.value)}
              className="layera-select layera-width--full"
              style={{
                padding: 'var(--layera-space-3)',
                border: 'none',
                borderRadius: 'var(--live-border-radius)',
                background: '#4a5568',
                color: 'white',
                width: '100%'
              }}
            >
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>Never</option>
            </select>
          </Box>

          {/* Lock Screen Button */}
          <Button
            variant="danger"
            size="md"
            onClick={onLockScreen}
            className="layera-button layera-width--full"
            style={{
              background: 'var(--live-danger-color)',
              border: 'none',
              marginTop: 'var(--layera-space-4)'
            }}
          >
            🔒 Lock Screen
          </Button>
        </>
      )}
    </Box>
  );
};