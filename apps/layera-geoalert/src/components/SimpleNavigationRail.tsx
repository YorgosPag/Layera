import React from 'react';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon, PlusIcon } from '@layera/icons';
import { Flex } from '@layera/layout';

interface SimpleNavigationRailProps {
  onBackClick: () => React.ReactNode;
  onNewEntryClick?: () => void;
}

/**
 * SimpleNavigationRail - Minimal navigation για map mode
 */
export const SimpleNavigationRail: React.FC<SimpleNavigationRailProps> = ({
  onBackClick,
  onNewEntryClick
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      padding="md 0"
      height="full"
      width="full"
    >


      {/* Μπορούμε να προσθέσουμε περισσότερα navigation items εδώ */}
    </Flex>
  );
};