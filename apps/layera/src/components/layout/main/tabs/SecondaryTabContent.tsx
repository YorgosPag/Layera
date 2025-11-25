import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 SecondaryTabContent Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const SecondaryTabContent: React.FC = () => {
  return (
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
  );
};