import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 PrimaryLayoutTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const PrimaryLayoutTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Primary Layout */}
      <Heading data-size="lg" data-weight="semibold" className="layera-primary-layout-title">
        📋 Primary Layout
      </Heading>

      {/* Primary Layout Description */}
      <Box className="layera-layout-description">
        <Text data-size="md">
          Κύριο layout για βασικές λειτουργίες
        </Text>
      </Box>

      {/* Primary Layout Controls */}
      <Box className="layera-layout-controls">
        <Flex className="layera-layout-inputs">
          <input
            type="text"
            placeholder="🔍 Primary search..."
            className="layera-layout-input layera-layout-input--primary"
          />
        </Flex>

        <Box className="layera-layout-actions">
          <Button
            variant="primary"
            size="md"
            className="layera-layout-button layera-layout-button--primary"
          >
            🎯 Activate Primary
          </Button>
        </Box>
      </Box>
    </Box>
  );
};