import React from 'react';
import { Box } from '@layera/layout';
import { getSidebarPositioning, LAYERA_SIDEBAR_COLORS, LAYERA_SIDEBAR_TYPOGRAPHY } from '@layera/tokens';

/**
 * Reference Primary Sidebar Component - Πανομοιότυπο με HTML primary sidebar
 *
 * Αντιστοιχεί 1:1 με html/htmlComponents/sidebar/primary-sidebar.html
 * Χρησιμοποιεί @layera/* components αντί για hardcoded HTML/CSS
 */

interface PrimarySidebarProps {
  // Προς το παρόν δεν χρειάζονται props, στο μέλλον μπορούν να προστεθούν
}

export const PrimarySidebar: React.FC<PrimarySidebarProps> = () => {
  return (
    <Box
      as="aside"
      className="sidebar"
    >
      {/* Navigation Section - ακριβώς όπως HTML */}
      <h3>📂 Navigation</h3>

      <Box className="layera-input--sidebar-filter">
        <input
          type="text"
          placeholder="🔍 Filter menu..."
          className="layera-input--sidebar"
        />
      </Box>

      {/* Menu Items - ακριβώς όπως HTML */}
      {[
        { icon: '🏠', text: 'Dashboard' },
        { icon: '📊', text: 'Analytics' },
        { icon: '⚙️', text: 'Settings' },
        { icon: '👥', text: 'Users' },
        { icon: '📋', text: 'Reports' },
        { icon: '🔧', text: 'Tools' }
      ].map((item, index) => (
        <Box
          key={index}
          className="menu-item"
        >
          {item.icon} {item.text}
        </Box>
      ))}

      {/* Quick Actions Section - ακριβώς όπως HTML */}
      <h3 className="sidebar-h3-second">⚙️ Quick Actions</h3>

      <Box className="layera-input--sidebar-container">
        <input
          type="email"
          placeholder="📧 Email address"
          className="layera-input--sidebar"
        />
      </Box>

      <Box className="layera-input--sidebar-container">
        <input
          type="password"
          placeholder="🔒 Password"
          className="layera-input--sidebar"
        />
      </Box>

      <Box className="layera-button-container">
        <button className="btn primary-btn layera-button--primary-sidebar">
          🔑 Login
        </button>
      </Box>
    </Box>
  );
};