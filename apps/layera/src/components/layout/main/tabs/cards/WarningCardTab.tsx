import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 WarningTabContent Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const WarningCardTab: React.FC = () => {
  return (
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
  );
};