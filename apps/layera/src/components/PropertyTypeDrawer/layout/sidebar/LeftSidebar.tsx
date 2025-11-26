import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

export interface LeftSidebarProps {
  leftSidebarOpen: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ leftSidebarOpen }) => {
  return (
    <>
      {/* Primary Sidebar (Navigation) - GROK AI @layera/* COMPLIANT */}
      <aside className="layera-sidebar-primary layera-sidebar-scrollable">
        <Box className="layera-sidebar-content">
        {/* Navigation Section */}
        <Heading
          className="layera-sidebar-title"
          data-size="lg"
          data-weight="semibold"
        >
          📂 Navigation
        </Heading>

        <input
          type="text"
          placeholder="Filter menu..."
          className="layera-input--sidebar layera-input--sidebar-filter"
        />

        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          🏠 Dashboard
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          📊 Analytics
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          ⚙️ Settings
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          👥 Users
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          📋 Reports
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="layera-button layera-button--sidebar-menu"
        >
          🔧 Tools
        </Button>

        {/* Quick Actions Section */}
        <Box className="layera-sidebar-quick-actions">
          <Heading
            className="layera-sidebar-title"
            data-size="lg"
            data-weight="semibold"
          >
            ⚙️ Quick Actions
          </Heading>

          <input
            type="email"
            placeholder="Email address"
            className="layera-input--sidebar"
          />

          <input
            type="password"
            placeholder="Password"
            className="layera-input--sidebar"
          />

          <Button
            variant="primary"
            size="md"
            className="layera-button layera-button--primary-sidebar"
          >
            🔑 Login
          </Button>
        </Box>
        </Box>
      </aside>

      {/* Left Secondary Sidebar */}
      {leftSidebarOpen && (
        <Box
          as="aside"
          className="layera-sidebar-secondary layera-sidebar-secondary--open layera-sidebar-scrollable"
        >
          <Box className="layera-sidebar-content">
          <Heading data-size="md" data-weight="semibold">
            ⚙️ System Settings
          </Heading>

          <Text data-size="sm">🌐 Language</Text>
          <select>
            <option>🇬🇷 Ελληνικά</option>
            <option>🇺🇸 English</option>
          </select>

          <Text data-size="sm">🌙 Theme Mode</Text>
          <Flex>
            <Button variant="primary" size="sm">☀️ Light</Button>
            <Button variant="outline" size="sm">🌙 Dark</Button>
          </Flex>

          <Heading data-size="md" data-weight="semibold">🔐 Security</Heading>
          <Button variant="danger" size="md">🔒 Lock Screen</Button>
          </Box>
        </Box>
      )}
    </>
  );
};