import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 DangerLayoutTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const DangerLayoutTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Danger Layout */}
      <Heading data-size="lg" data-weight="semibold" className="layera-danger-layout-title">
        🚨 Danger Layout
      </Heading>

      {/* Danger Layout Description */}
      <Box className="layera-layout-description">
        <Text data-size="md">
          Layout για επικίνδυνες ενέργειες
        </Text>
      </Box>

      {/* Danger Layout Controls */}
      <Box className="layera-layout-controls">
        <Flex className="layera-layout-inputs">
          <input
            type="password"
            placeholder="🔒 Confirm action"
            className="layera-layout-input layera-layout-input--danger"
          />
        </Flex>

        <Box className="layera-layout-actions">
          <Button
            variant="outline"
            size="md"
            className="layera-layout-button layera-layout-button--danger"
          >
            🎯 Activate Danger
          </Button>
        </Box>
      </Box>
    </Box>
  );
};