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

        {/* Εδώ θα συνεχίσω με τα άλλα tabs αλλά θα το κάνω τμηματικά για να μην γίνει πολύ μεγάλο το αρχείο */}
      </Box>
      </Box>
    </Box>
  );
};