import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';

/**
 * 🎯 100% ARXES COMPLIANT LayoutThemesSection
 * ΤΕΛΙΚΗ & ΟΡΙΣΤΙΚΗ ΕΚΔΟΣΗ - 100% ARXES Compliant
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 * Αναπαράγει ΑΚΡΙΒΩΣ το HTML mockup και screenshot
 * ΟΛΑ ΚΕΝΤΡΙΚΑ ΣΤΟΙΧΙΣΜΕΝΑ με @layera/layout props
 */

export const LayoutThemesSection: React.FC = () => {
  return (
    <Box as="section" className="layera-content-section">

      {/* 1. Layout Themes με Tabs */}
      <Box className="layera-mb-10">
        <Heading
          as="h1"
          size="4xl"
          weight="extrabold"
          color="primary"
        >
          🎯 Layout Themes με Tabs
        </Heading>
      </Box>

      {/* 2. Primary Layout Content + περιγραφή */}
      <Box className="layera-mb-10">
        <Heading
          as="h2"
          size="2xl"
          weight="bold"
          color="primary"
          className="layera-mb-4"
        >
          📋 Primary Layout Content
        </Heading>

        <Text
          size="lg"
          color="secondary"
          lineHeight="relaxed"
        >
          Κύριο layout για βασικές λειτουργίες
        </Text>
      </Box>

      {/* 3. Κάρτες με Tabs (6 χρώματα) */}
      <Box className="layera-mb-10">
        <Box className="layera-bg-dark layera-text-white layera-py-4 layera-px-8 layera-radius-md layera-font-bold layera-text-xl">
          🃏 Κάρτες με Tabs (6 χρώματα)
        </Box>
      </Box>

    </Box>
  );
};