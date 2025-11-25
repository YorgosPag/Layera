import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 SuccessTabContent Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const SuccessCardTab: React.FC = () => {
  return (
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
  );
};