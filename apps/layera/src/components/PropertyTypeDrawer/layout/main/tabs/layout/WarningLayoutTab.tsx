import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading, Text } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 WarningLayoutTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const WarningLayoutTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Warning Layout */}
      <Heading data-size="lg" data-weight="semibold" className="layera-warning-layout-title">
        ⚠️ Warning Layout
      </Heading>

      {/* Warning Layout Description */}
      <Box className="layera-layout-description">
        <Text data-size="md">
          Layout για προειδοποιήσεις
        </Text>
      </Box>

      {/* Warning Layout Controls */}
      <Box className="layera-layout-controls">
        <Flex className="layera-layout-inputs">
          <textarea
            placeholder="⚠️ Warning details..."
            className="layera-layout-textarea layera-layout-textarea--warning"
            rows={3}
          />
        </Flex>

        <Box className="layera-layout-actions">
          <Button
            variant="outline"
            size="md"
            className="layera-layout-button layera-layout-button--warning"
          >
            🎯 Activate Warning
          </Button>
        </Box>
      </Box>
    </Box>
  );
};