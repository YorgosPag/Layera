import React from 'react';
import { Box } from '@layera/layout';

/**
 * Reference Secondary Left Sidebar Component - Πανομοιότυπο με HTML secondary left sidebar
 *
 * Αντιστοιχεί 1:1 με html/htmlComponents/sidebar/secondary-sidebar-left.html
 * Χρησιμοποιεί @layera/* components αντί για hardcoded HTML/CSS
 */

interface SecondaryLeftSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SecondaryLeftSidebar: React.FC<SecondaryLeftSidebarProps> = ({
  isOpen = false,
  onToggle
}) => {
  return (
    <Box
      as="aside"
      className={`secondary-sidebar-left sidebar-secondary left ${isOpen ? 'open' : ''}`}
      id="leftSidebar"
    >
      {/* System Settings Section - ακριβώς όπως HTML */}
      <h3>⚙️ System Settings</h3>

      <Box className="secondary-sidebar-setting-group">
        <label className="secondary-sidebar-label">
          🌐 Language
        </label>
        <select className="secondary-sidebar-select">
          <option>🇬🇷 Ελληνικά</option>
          <option>🇺🇸 English</option>
          <option>🇫🇷 Français</option>
        </select>
      </Box>

      <Box className="secondary-sidebar-setting-group">
        <label className="secondary-sidebar-label">
          🌙 Theme Mode
        </label>
        <Box className="secondary-sidebar-button-group">
          <button className="secondary-sidebar-button secondary-sidebar-button--light">
            ☀️ Light
          </button>
          <button className="secondary-sidebar-button secondary-sidebar-button--dark">
            🌙 Dark
          </button>
        </Box>
      </Box>

      <Box className="secondary-sidebar-setting-group">
        <label className="secondary-sidebar-label">
          📱 Device Mode
        </label>
        <select className="secondary-sidebar-select">
          <option>💻 Desktop</option>
          <option>📱 Mobile</option>
          <option>📟 Tablet</option>
        </select>
      </Box>

      <Box className="secondary-sidebar-setting-group">
        <label className="secondary-sidebar-label">
          🔊 Notifications
        </label>
        <Box className="secondary-sidebar-checkbox-group">
          <input type="checkbox" defaultChecked className="secondary-sidebar-checkbox" />
          <span className="secondary-sidebar-checkbox-label">Enable sound alerts</span>
        </Box>
      </Box>

      {/* Security Section - ακριβώς όπως HTML */}
      <h3>🔐 Security</h3>

      <Box className="secondary-sidebar-setting-group">
        <label className="secondary-sidebar-label">
          ⏰ Auto Logout
        </label>
        <select className="secondary-sidebar-select">
          <option>15 minutes</option>
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>Never</option>
        </select>
      </Box>

      <button className="btn danger-btn secondary-sidebar-full-width-button">
        🔒 Lock Screen
      </button>
    </Box>
  );
};