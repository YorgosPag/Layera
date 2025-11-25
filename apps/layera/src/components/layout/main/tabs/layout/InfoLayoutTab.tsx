import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 InfoLayoutTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const InfoLayoutTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Info Layout */}
      <Heading data-size="lg" data-weight="semibold" className="layera-info-layout-title">
        ℹ️ Info Layout
      </Heading>

      {/* Info Layout Description */}
      <Box className="layera-layout-description">
        <Text data-size="md">
          Layout για πληροφοριακό περιεχόμενο
        </Text>
      </Box>

      {/* Info Layout Controls */}
      <Box className="layera-layout-controls">
        <Flex className="layera-layout-inputs">
          <input
            type="url"
            placeholder="🌐 Info URL"
            className="layera-layout-input layera-layout-input--info"
          />
        </Flex>

        <Box className="layera-layout-actions">
          <Button
            variant="outline"
            size="md"
            className="layera-layout-button layera-layout-button--info"
          >
            🎯 Activate Info
          </Button>
        </Box>
      </Box>
    </Box>
  );
};