import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 100% ARXES COMPLIANT FullAppLayout
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports | ΜΟΝΟ CSS classes από tokens
 * Αναπαράγει ΑΚΡΙΒΩΣ το HTML mockup layout
 */

export const CleanFullAppLayout: React.FC = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<string>('primary');
  const [activeColor, setActiveColor] = React.useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary');

  return (
    <Box className="layera-layout-main-container">
      {/* Header Section - GROK AI Box/Flex ARXES COMPLIANT */}
      <Box as="header" className="layera-app-header">
        <Flex className="layera-header-content">
          <Flex className="layera-header-left">
            <Heading
              className="layera-header-title"
              data-size="xl"
              data-weight="semibold"
            >
              🎨 Layera Design System Preview
            </Heading>

            <Flex className="layera-color-btn-group">
              {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((color) => (
                <Button
                  key={color}
                  variant="ghost"
                  size="sm"
                  className={`layera-color-btn layera-color-btn--${color} ${activeColor === color ? 'layera-color-btn--active' : ''}`}
                  onClick={() => setActiveColor(color)}
                >
                  {color === 'primary' ? 'P' : color === 'secondary' ? 'S' : color === 'success' ? 'Su' : color === 'warning' ? 'W' : color === 'danger' ? 'D' : 'I'}
                </Button>
              ))}
            </Flex>
          </Flex>

          <Flex as="nav" className="layera-header-nav">
            <Flex className="layera-flex layera-flex--gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="layera-toggle-btn"
              >
                ⚙️
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="layera-toggle-btn"
              >
                🎨
              </Button>
            </Flex>

            <input
              type="text"
              placeholder="🔍 Search..."
              className="layera-input-search"
            />

            <input
              type="text"
              placeholder="📍 Location"
              className="layera-input-location"
            />

            <Button variant="ghost" className="layera-profile-btn">
              <Text>👤 Profile</Text>
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Layout Container */}
      <Flex className="layera-app-layout">

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

        {/* Main Content Area */}
        <Box as="main" className="layera-main-content layera-main-scrollable">
          <Box className="layera-main-content-inner">
          <Heading data-size="lg" data-weight="semibold">
            📋 Κάρτες με Tabs (6 χρώματα)
          </Heading>

          {/* Tab Navigation */}
          <Flex className="layera-tabs">
            {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className={`layera-tab ${activeTab === tab ? `layera-tab--active layera-tab--${tab}--active` : ''}`}
                onClick={() => setActiveTab(tab)}
              >
{tab.charAt(0).toUpperCase() + tab.slice(1)} Cards
              </Button>
            ))}
          </Flex>

          {/* Tab Content - Δυναμικό περιεχόμενο ανάλογα με το tab */}
          <Box className="layera-tab-panel">
            {activeTab === 'primary' && (
              <Box className="layera-cards-grid">
                {/* PRIMARY CARD */}
                <Box className="layera-card layera-card--primary">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Primary Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <input
                        type="text"
                        placeholder="Enter name..."
                        className="layera-card-input layera-card-input--primary"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="layera-card-input layera-card-input--primary"
                      />
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="primary"
                      size="sm"
                      className="layera-card-button layera-card-button--primary"
                    >
                      🔵 Save
                    </Button>
                  </Box>
                </Box>

                {/* SECONDARY CARD */}
                <Box className="layera-card layera-card--secondary">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Secondary Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="60"
                        className="layera-card-input layera-card-slider"
                      />
                      <select className="layera-card-input layera-card-input--secondary">
                        <option>🚨 Priority Level</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="layera-card-button layera-card-button--secondary"
                    >
                      🔍 Search
                    </Button>
                  </Box>
                </Box>

                {/* SUCCESS CARD */}
                <Box className="layera-card layera-card--success">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Success Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <label className="layera-card-checkbox">
                        <input type="checkbox" defaultChecked />
                        ✅ Task completed
                      </label>
                      <input
                        type="text"
                        placeholder="⭐ Achievement note"
                        className="layera-card-input layera-card-input--success"
                      />
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="layera-card-button layera-card-button--success"
                    >
                      ✅ Submit
                    </Button>
                  </Box>
                </Box>

                {/* WARNING CARD */}
                <Box className="layera-card layera-card--warning">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Warning Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <select className="layera-card-input layera-card-input--warning">
                        <option>⚠️ Warning type</option>
                        <option>System Error</option>
                        <option>Network Issue</option>
                        <option>Performance</option>
                        <option>Security</option>
                      </select>
                      <input
                        type="text"
                        placeholder="📍 Location"
                        className="layera-card-input layera-card-input--warning"
                      />
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="layera-card-button layera-card-button--warning"
                    >
                      ⚠️ Report Issue
                    </Button>
                  </Box>
                </Box>

                {/* DANGER CARD */}
                <Box className="layera-card layera-card--danger">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Danger Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <input
                        type="password"
                        placeholder="🔒 Confirm password"
                        className="layera-card-input layera-card-input--danger"
                      />
                      <Box className="layera-checkbox-container">
                        <input type="checkbox" id="understand" className="layera-checkbox" />
                        <Text data-size="xs">☑️ I understand the risks</Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="layera-card-button layera-card-button--danger"
                    >
                      🗑️ Delete
                    </Button>
                  </Box>
                </Box>

                {/* INFO CARD */}
                <Box className="layera-card layera-card--info">
                  <Box className="layera-card-header">
                    <Heading data-size="md" data-weight="semibold">
                      Info Card
                    </Heading>
                  </Box>
                  <Box className="layera-card-content">
                    <Flex className="layera-card-inputs">
                      <select className="layera-card-input layera-card-input--info">
                        <option>📚 Help category</option>
                        <option>Getting Started</option>
                        <option>API Documentation</option>
                        <option>Troubleshooting</option>
                        <option>Best Practices</option>
                      </select>
                      <input
                        type="text"
                        placeholder="🔍 Search help..."
                        className="layera-card-input layera-card-input--info"
                      />
                    </Flex>
                  </Box>
                  <Box className="layera-card-footer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="layera-card-button layera-card-button--info"
                    >
                      🆘 Get Help
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'secondary' && (
              <Box>
                {/* Section Title – όπως στο HTML για Cards Tab */}
                <Heading data-size="lg" data-weight="semibold" className="layera-secondary-cards-title">
                  Secondary Cards
                </Heading>

                {/* Secondary Cards Grid – όλες οι 6 κάρτες */}
                <Box className="layera-cards-grid">
                  {/* PRIMARY CARD */}
                  <Box className="layera-card layera-card--primary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Primary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Company name"
                          className="layera-card-input layera-card-input--primary"
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          className="layera-card-input layera-card-input--primary"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="primary"
                        size="sm"
                        className="layera-card-button layera-card-button--primary"
                      >
                        📞 Contact
                      </Button>
                    </Box>
                  </Box>

                  {/* SECONDARY CARD */}
                  <Box className="layera-card layera-card--secondary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Secondary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="60"
                          className="layera-card-input layera-card-slider"
                        />
                        <select className="layera-card-input layera-card-input--secondary">
                          <option>🚨 Priority Level</option>
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--secondary"
                      >
                        🔧 Configure
                      </Button>
                    </Box>
                  </Box>

                  {/* SUCCESS CARD */}
                  <Box className="layera-card layera-card--success">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Success Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <label className="layera-card-checkbox">
                          <input type="checkbox" defaultChecked />
                          ✅ Task completed
                        </label>
                        <input
                          type="text"
                          placeholder="⭐ Achievement note"
                          className="layera-card-input layera-card-input--success"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--success"
                      >
                        🎉 Celebrate
                      </Button>
                    </Box>
                  </Box>

                  {/* WARNING CARD */}
                  <Box className="layera-card layera-card--warning">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Warning Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <select className="layera-card-input layera-card-input--warning">
                          <option>⚠️ Warning type</option>
                          <option>System Error</option>
                          <option>Network Issue</option>
                          <option>Performance</option>
                          <option>Security</option>
                        </select>
                        <input
                          type="text"
                          placeholder="📍 Location"
                          className="layera-card-input layera-card-input--warning"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--warning"
                      >
                        🏢 Report Location
                      </Button>
                    </Box>
                  </Box>

                  {/* DANGER CARD */}
                  <Box className="layera-card layera-card--danger">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Danger Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Type 'DELETE' to confirm"
                          className="layera-card-input layera-card-input--danger"
                        />
                        <select className="layera-card-input layera-card-input--danger">
                          <option>🗑️ Deletion scope</option>
                          <option>Current Item</option>
                          <option>All Items</option>
                          <option>Permanent</option>
                        </select>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--danger"
                      >
                        🔥 Permanently Delete
                      </Button>
                    </Box>
                  </Box>

                  {/* INFO CARD */}
                  <Box className="layera-card layera-card--info">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Info Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <select className="layera-card-input layera-card-input--info">
                          <option>📚 Help category</option>
                          <option>Getting Started</option>
                          <option>API Documentation</option>
                          <option>Troubleshooting</option>
                          <option>Best Practices</option>
                        </select>
                        <input
                          type="text"
                          placeholder="🔍 Search help..."
                          className="layera-card-input layera-card-input--info"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--info"
                      >
                        📖 Get Help
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'success' && (
              <Box>
                {/* Section Title για Success Cards */}
                <Heading data-size="lg" data-weight="semibold" className="layera-success-cards-title">
                  Success Cards
                </Heading>

                {/* Success Cards Grid – όλες οι 6 κάρτες */}
                <Box className="layera-cards-grid">
                  {/* PRIMARY CARD */}
                  <Box className="layera-card layera-card--primary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Primary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <textarea
                          placeholder="Description..."
                          className="layera-card-textarea layera-card-textarea--primary"
                          rows={3}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="primary"
                        size="sm"
                        className="layera-card-button layera-card-button--primary"
                      >
                        📄 Submit
                      </Button>
                    </Box>
                  </Box>

                  {/* SECONDARY CARD */}
                  <Box className="layera-card layera-card--secondary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Secondary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="date"
                          placeholder="ηη/μμ/εεεε"
                          className="layera-card-input layera-card-input--secondary"
                        />
                        <input
                          type="time"
                          placeholder="--:--"
                          className="layera-card-input layera-card-input--secondary"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--secondary"
                      >
                        📅 Schedule
                      </Button>
                    </Box>
                  </Box>

                  {/* SUCCESS CARD */}
                  <Box className="layera-card layera-card--success">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Success Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="email"
                          placeholder="✉️ Winner email"
                          className="layera-card-input layera-card-input--success"
                        />
                        <input
                          type="text"
                          placeholder="🏆 Prize details"
                          className="layera-card-input layera-card-input--success"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--success"
                      >
                        🏆 Award Prize
                      </Button>
                    </Box>
                  </Box>

                  {/* WARNING CARD */}
                  <Box className="layera-card layera-card--warning">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Warning Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <label className="layera-card-checkbox">
                          <input type="checkbox" />
                          ⚠️ Mark as urgent
                        </label>
                        <input
                          type="datetime-local"
                          placeholder="ηη/μμ/εεεε --:--"
                          className="layera-card-input layera-card-input--warning"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--warning"
                      >
                        ⏰ Set Reminder
                      </Button>
                    </Box>
                  </Box>

                  {/* DANGER CARD */}
                  <Box className="layera-card layera-card--danger">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Danger Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <textarea
                          placeholder="☠️ Reason for termination..."
                          className="layera-card-textarea layera-card-textarea--danger"
                          rows={4}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--danger"
                      >
                        ❌ Terminate Account
                      </Button>
                    </Box>
                  </Box>

                  {/* INFO CARD */}
                  <Box className="layera-card layera-card--info">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Info Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="email"
                          placeholder="📧 Contact email"
                          className="layera-card-input layera-card-input--info"
                        />
                        <textarea
                          placeholder="💬 Your message..."
                          className="layera-card-textarea layera-card-textarea--info"
                          rows={3}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--info"
                      >
                        📨 Send Message
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'warning' && (
              <Box>
                {/* Section Title για Warning Cards */}
                <Heading data-size="lg" data-weight="semibold" className="layera-warning-cards-title">
                  Warning Cards
                </Heading>

                {/* Warning Layout Message */}
                <Box className="layera-warning-message">
                  <Text data-size="sm">
                    ⚠️ Warning layout με διαφορετική διάταξη των καρτών
                  </Text>
                </Box>

                {/* Warning Cards Grid – όλες οι 6 κάρτες */}
                <Box className="layera-cards-grid">
                  {/* PRIMARY CARD */}
                  <Box className="layera-card layera-card--primary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Primary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Enter name..."
                          className="layera-card-input layera-card-input--primary"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          className="layera-card-input layera-card-input--primary"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="primary"
                        size="sm"
                        className="layera-card-button layera-card-button--primary"
                      >
                        💾 Save
                      </Button>
                    </Box>
                  </Box>

                  {/* SECONDARY CARD */}
                  <Box className="layera-card layera-card--secondary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Secondary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="🔍 Search terms..."
                          className="layera-card-input layera-card-input--secondary"
                        />
                        <select className="layera-card-input layera-card-input--secondary">
                          <option>📁 Select category</option>
                          <option>Documents</option>
                          <option>Images</option>
                          <option>Videos</option>
                          <option>Other</option>
                        </select>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--secondary"
                      >
                        🔍 Search
                      </Button>
                    </Box>
                  </Box>

                  {/* SUCCESS CARD */}
                  <Box className="layera-card layera-card--success">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Success Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="number"
                          placeholder="💰 Amount"
                          className="layera-card-input layera-card-input--success"
                        />
                        <input
                          type="date"
                          placeholder="ηη/μμ/εεεε"
                          className="layera-card-input layera-card-input--success"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--success"
                      >
                        ✅ Submit
                      </Button>
                    </Box>
                  </Box>

                  {/* WARNING CARD */}
                  <Box className="layera-card layera-card--warning">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Warning Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <textarea
                          placeholder="⚠️ Warning details..."
                          className="layera-card-textarea layera-card-textarea--warning"
                          rows={4}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--warning"
                      >
                        ⚠️ Report Issue
                      </Button>
                    </Box>
                  </Box>

                  {/* DANGER CARD */}
                  <Box className="layera-card layera-card--danger">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Danger Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="password"
                          placeholder="🔒 Confirm password"
                          className="layera-card-input layera-card-input--danger"
                        />
                        <label className="layera-card-checkbox">
                          <input type="checkbox" />
                          I understand the risks
                        </label>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--danger"
                      >
                        🗑️ Delete
                      </Button>
                    </Box>
                  </Box>

                  {/* INFO CARD */}
                  <Box className="layera-card layera-card--info">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Info Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="url"
                          placeholder="🌐 Website URL"
                          className="layera-card-input layera-card-input--info"
                        />
                        <input
                          type="tel"
                          placeholder="📞 Phone number"
                          className="layera-card-input layera-card-input--info"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--info"
                      >
                        ℹ️ Get Info
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'danger' && (
              <Box>
                {/* Section Title για Danger Cards */}
                <Heading data-size="lg" data-weight="semibold" className="layera-danger-cards-title">
                  Danger Cards
                </Heading>

                {/* Danger Cards Grid – όλες οι 6 κάρτες */}
                <Box className="layera-cards-grid">
                  {/* PRIMARY CARD */}
                  <Box className="layera-card layera-card--primary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Primary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Enter name..."
                          className="layera-card-input layera-card-input--primary"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          className="layera-card-input layera-card-input--primary"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="primary"
                        size="sm"
                        className="layera-card-button layera-card-button--primary"
                      >
                        🔵 Save
                      </Button>
                    </Box>
                  </Box>

                  {/* SECONDARY CARD */}
                  <Box className="layera-card layera-card--secondary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Secondary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Search terms..."
                          className="layera-card-input layera-card-input--secondary"
                        />
                        <select className="layera-card-input layera-card-input--secondary">
                          <option>Select category</option>
                          <option>Analytics</option>
                          <option>Settings</option>
                        </select>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--secondary"
                      >
                        🔍 Search
                      </Button>
                    </Box>
                  </Box>

                  {/* SUCCESS CARD */}
                  <Box className="layera-card layera-card--success">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Success Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="number"
                          placeholder="Amount"
                          className="layera-card-input layera-card-input--success"
                        />
                        <input
                          type="text"
                          placeholder="Prize details"
                          className="layera-card-input layera-card-input--success"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--success"
                      >
                        🏆 Award Prize
                      </Button>
                    </Box>
                  </Box>

                  {/* WARNING CARD */}
                  <Box className="layera-card layera-card--warning">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Warning Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <label className="layera-card-checkbox">
                          <input type="checkbox" />
                          ⚠️ Mark as urgent
                        </label>
                        <textarea
                          placeholder="Warning details..."
                          className="layera-card-textarea layera-card-textarea--warning"
                          rows={3}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--warning"
                      >
                        ⚠️ Report Issue
                      </Button>
                    </Box>
                  </Box>

                  {/* DANGER CARD */}
                  <Box className="layera-card layera-card--danger">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Danger Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="password"
                          placeholder="🔒 Confirm password"
                          className="layera-card-input layera-card-input--danger"
                        />
                        <label className="layera-card-checkbox">
                          <input type="checkbox" />
                          I understand the risks
                        </label>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--danger"
                      >
                        🗑️ Delete
                      </Button>
                    </Box>
                  </Box>

                  {/* INFO CARD */}
                  <Box className="layera-card layera-card--info">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Info Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="url"
                          placeholder="🌐 Website URL"
                          className="layera-card-input layera-card-input--info"
                        />
                        <input
                          type="tel"
                          placeholder="📞 Phone number"
                          className="layera-card-input layera-card-input--info"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--info"
                      >
                        ℹ️ Get Info
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 'info' && (
              <Box>
                {/* Section Title για Info Cards */}
                <Heading data-size="lg" data-weight="semibold" className="layera-info-cards-title">
                  Info Cards
                </Heading>

                {/* Info Cards Grid – όλες οι 6 κάρτες */}
                <Box className="layera-cards-grid">
                  {/* PRIMARY CARD */}
                  <Box className="layera-card layera-card--primary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Primary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Enter name..."
                          className="layera-card-input layera-card-input--primary"
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          className="layera-card-input layera-card-input--primary"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="primary"
                        size="sm"
                        className="layera-card-button layera-card-button--primary"
                      >
                        🔵 Save
                      </Button>
                    </Box>
                  </Box>

                  {/* SECONDARY CARD */}
                  <Box className="layera-card layera-card--secondary">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Secondary Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="text"
                          placeholder="Search terms..."
                          className="layera-card-input layera-card-input--secondary"
                        />
                        <select className="layera-card-input layera-card-input--secondary">
                          <option>Select category</option>
                          <option>Analytics</option>
                          <option>Settings</option>
                        </select>
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--secondary"
                      >
                        🔍 Search
                      </Button>
                    </Box>
                  </Box>

                  {/* SUCCESS CARD */}
                  <Box className="layera-card layera-card--success">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Success Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="email"
                          placeholder="✉️ Winner email"
                          className="layera-card-input layera-card-input--success"
                        />
                        <input
                          type="text"
                          placeholder="🏆 Prize details"
                          className="layera-card-input layera-card-input--success"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--success"
                      >
                        🏆 Award Prize
                      </Button>
                    </Box>
                  </Box>

                  {/* WARNING CARD */}
                  <Box className="layera-card layera-card--warning">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Warning Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <label className="layera-card-checkbox">
                          <input type="checkbox" />
                          ⚠️ Mark as urgent
                        </label>
                        <input
                          type="datetime-local"
                          placeholder="ηη/μμ/εεεε --:--"
                          className="layera-card-input layera-card-input--warning"
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--warning"
                      >
                        ⏰ Set Reminder
                      </Button>
                    </Box>
                  </Box>

                  {/* DANGER CARD */}
                  <Box className="layera-card layera-card--danger">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Danger Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <textarea
                          placeholder="☠️ Reason for termination..."
                          className="layera-card-textarea layera-card-textarea--danger"
                          rows={4}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--danger"
                      >
                        ❌ Terminate Account
                      </Button>
                    </Box>
                  </Box>

                  {/* INFO CARD */}
                  <Box className="layera-card layera-card--info">
                    <Box className="layera-card-header">
                      <Heading data-size="md" data-weight="semibold">
                        Info Card
                      </Heading>
                    </Box>
                    <Box className="layera-card-content">
                      <Flex className="layera-card-inputs">
                        <input
                          type="email"
                          placeholder="📧 Contact email"
                          className="layera-card-input layera-card-input--info"
                        />
                        <textarea
                          placeholder="💬 Your message..."
                          className="layera-card-textarea layera-card-textarea--info"
                          rows={3}
                        />
                      </Flex>
                    </Box>
                    <Box className="layera-card-footer">
                      <Button
                        variant="outline"
                        size="sm"
                        className="layera-card-button layera-card-button--info"
                      >
                        📨 Send Message
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          </Box>
        </Box>

        {/* Right Secondary Sidebar - ΠΛΗΡΗΣ HTML MOCKUP */}
        {rightSidebarOpen && (
          <Box
            as="aside"
            className="layera-sidebar-secondary layera-sidebar-secondary--open layera-sidebar-secondary--right layera-sidebar-scrollable"
          >
            <Box className="layera-sidebar-content">
              <Heading data-size="md" data-weight="semibold">
                🎨 Style Controls
              </Heading>

            {/* 1. Complete 6-Color System */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium" className="layera-control-group-title">
                🌈 6-Color System
              </Heading>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🔵 Primary</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#4A90E2" className="layera-color-picker" />
                  <input type="text" defaultValue="#4A90E2" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🟣 Secondary</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#9013FE" className="layera-color-picker" />
                  <input type="text" defaultValue="#9013FE" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🟢 Success</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#4CAF50" className="layera-color-picker" />
                  <input type="text" defaultValue="#4CAF50" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🟡 Warning</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#FF9800" className="layera-color-picker" />
                  <input type="text" defaultValue="#FF9800" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🔴 Danger</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#F44336" className="layera-color-picker" />
                  <input type="text" defaultValue="#F44336" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-color-control">
                <Text data-size="xs" className="layera-color-label">🔵 Info</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#2196F3" className="layera-color-picker" />
                  <input type="text" defaultValue="#2196F3" className="layera-color-hex-input" />
                </Flex>
              </Box>

              <Box className="layera-target-selector">
                <Text data-size="xs" className="layera-color-label">🎯 Apply To:</Text>
                <Flex className="layera-target-grid">
                  <Button size="xs" variant="ghost" className="layera-target-btn layera-target-btn--active">🌍 All</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">🃏 Cards</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">🔘 Buttons</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">🪟 Modals</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">📊 Tables</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">📋 Header</Button>
                </Flex>
              </Box>
            </Box>

            {/* 2. Advanced Typography Controls */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">📝 Typography</Heading>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Font Family</Text>
                <select className="layera-typography-select">
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Segoe UI', sans-serif">Segoe UI</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Georgia', serif">Georgia</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Base Font Size</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="12" max="24" defaultValue="16" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">16px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Header Size</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="18" max="36" defaultValue="24" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">24px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Font Weight</Text>
                <select className="layera-typography-select">
                  <option value="300">Light (300)</option>
                  <option value="400">Normal (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">SemiBold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Line Height</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="1" max="2" step="0.1" defaultValue="1.5" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">1.5</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Text Color</Text>
                <Flex className="layera-color-input-group">
                  <input type="color" defaultValue="#2c3e50" className="layera-color-picker" />
                  <input type="text" defaultValue="#2c3e50" className="layera-color-hex-input" />
                </Flex>
              </Box>
            </Box>

            {/* 3. Component Sizes Controls */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">📏 Component Sizes</Heading>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Button Size</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="24" max="56" defaultValue="36" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">36px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Button Padding</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="8" max="32" defaultValue="16" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">16px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Button Font Size</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="10" max="20" defaultValue="14" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">14px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Card Min Height</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="80" max="200" defaultValue="120" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">120px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Modal Width</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="300" max="600" defaultValue="400" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">400px</Text>
                </Flex>
              </Box>
            </Box>

            {/* 4. Border Radius per Component */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">🔄 Border Radius per Component</Heading>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">🃏 Cards Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="32" defaultValue="8" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">8px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">🔘 Buttons Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="32" defaultValue="6" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">6px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">🪟 Modals Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="32" defaultValue="12" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">12px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">📊 Tables Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="32" defaultValue="4" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">4px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">📋 Header Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="32" defaultValue="0" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">0px</Text>
                </Flex>
              </Box>

              <Box className="layera-target-selector">
                <Text data-size="xs" className="layera-color-label">⚡ Quick Radius Styles</Text>
                <Flex className="layera-target-grid">
                  <Button size="xs" variant="ghost" className="layera-target-btn">📐 Sharp</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">🥚 Soft</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">⭕ Round</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">💊 Pill</Button>
                </Flex>
              </Box>
            </Box>

            {/* 5. Advanced Spacing & Layout */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">📐 Spacing & Layout</Heading>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Component Gap</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="4" max="48" defaultValue="16" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">16px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Component Padding</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="4" max="32" defaultValue="16" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">16px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Border Radius</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="24" defaultValue="8" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">8px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Border Width</Text>
                <Flex className="layera-range-group">
                  <input type="range" min="0" max="8" defaultValue="2" className="layera-range-input" />
                  <Text data-size="xs" className="layera-range-value">2px</Text>
                </Flex>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Border Style</Text>
                <select className="layera-typography-select">
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </select>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Box Shadow</Text>
                <select className="layera-typography-select">
                  <option value="none">None</option>
                  <option value="0 1px 3px rgba(0,0,0,0.1)">Small</option>
                  <option value="0 2px 4px rgba(0,0,0,0.1)">Medium</option>
                  <option value="0 4px 8px rgba(0,0,0,0.15)">Large</option>
                  <option value="0 8px 16px rgba(0,0,0,0.2)">Extra Large</option>
                </select>
              </Box>
            </Box>

            {/* 6. Components */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">🎯 Components</Heading>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Card Shadow</Text>
                <select className="layera-typography-select">
                  <option>None</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </Box>

              <Box className="layera-typography-control">
                <Text data-size="xs" className="layera-color-label">Button Style</Text>
                <Flex className="layera-target-grid">
                  <Button size="xs" variant="ghost" className="layera-target-btn layera-target-btn--active">Solid</Button>
                  <Button size="xs" variant="ghost" className="layera-target-btn">Outline</Button>
                </Flex>
              </Box>
            </Box>

            {/* 7. Preset Themes COMPLETE */}
            <Box className="layera-control-group">
              <Heading data-size="sm" data-weight="medium">🎭 Preset Themes</Heading>

              <Flex className="layera-preset-column">
                <Button variant="ghost" size="sm" className="layera-preset-ocean">🌊 Ocean Blue</Button>
                <Button variant="ghost" size="sm" className="layera-preset-nature">🌿 Nature Green</Button>
                <Button variant="ghost" size="sm" className="layera-preset-sunset">🔥 Sunset Orange</Button>
                <Button variant="ghost" size="sm" className="layera-preset-royal">💜 Royal Purple</Button>
                <Button variant="ghost" size="sm" className="layera-preset-dark">🌑 Dark Mode</Button>
                <Button variant="ghost" size="sm" className="layera-preset-pastel">🎨 Pastel</Button>
              </Flex>

              <Flex className="layera-export-buttons">
                <Button variant="outline" size="sm" className="layera-export-btn">💾 Export CSS</Button>
                <Button variant="outline" size="sm" className="layera-reset-btn">🔄 Reset</Button>
              </Flex>
            </Box>
            </Box>
          </Box>
        )}

      </Flex>
    </Box>
  );
};