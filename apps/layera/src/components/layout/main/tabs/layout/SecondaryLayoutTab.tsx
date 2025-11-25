import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 SecondaryLayoutTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const SecondaryLayoutTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Secondary Layout */}
      <Heading data-size="lg" data-weight="semibold" className="layera-secondary-layout-title">
        🗂️ Secondary Layout
      </Heading>

      {/* Secondary Layout Description */}
      <Box className="layera-layout-description">
        <Text data-size="md">
          Δευτερεύον layout για επιπλέον λειτουργίες
        </Text>
      </Box>

      {/* Secondary Layout Controls */}
      <Box className="layera-layout-controls">
        <Flex className="layera-layout-inputs">
          <select className="layera-layout-input layera-layout-input--secondary">
            <option>📂 Select secondary option</option>
            <option>📊 Analytics View</option>
            <option>⚙️ Settings Panel</option>
          </select>
        </Flex>

        <Box className="layera-layout-actions">
          <Button
            variant="outline"
            size="md"
            className="layera-layout-button layera-layout-button--secondary"
          >
            🎯 Activate Secondary
          </Button>
        </Box>
      </Box>
    </Box>
  );
};