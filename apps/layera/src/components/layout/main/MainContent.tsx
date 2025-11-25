import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { LayoutThemesSection } from '../LayoutThemesSection';

export interface MainContentProps {
  activeTab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  onTabChange: (tab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info') => void;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box as="main" className="layera-main-content layera-main-scrollable">
      <Box className="layera-main-content-inner">

      {/* Layout Themes Section - 100% ARXES Compliant Component */}
      <LayoutThemesSection />

      {/* Tab Navigation */}
      <Flex className="layera-tabs">
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`layera-tab ${activeTab === tab ? `layera-tab--active layera-tab--${tab}--active` : ''}`}
            onClick={() => onTabChange(tab)}
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
  );
};