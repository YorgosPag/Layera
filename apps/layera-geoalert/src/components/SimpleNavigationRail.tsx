import React from 'react';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon, PlusIcon } from '@layera/icons';

interface SimpleNavigationRailProps {
  onBackClick: () => void;
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'var(--layera-space-md) 0',
      height: '100%',
      width: '100%'
    }}>


      {/* Μπορούμε να προσθέσουμε περισσότερα navigation items εδώ */}
    </div>
  );
};