import React from 'react';
import { Button } from '@layera/buttons';
import { ArrowLeftIcon } from './icons/LayeraIcons';

interface SimpleNavigationRailProps {
  onBackClick: () => void;
}

/**
 * SimpleNavigationRail - Minimal navigation για map mode
 */
export const SimpleNavigationRail: React.FC<SimpleNavigationRailProps> = ({
  onBackClick
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
      <Button
        variant="ghost"
        size="md"
        onClick={onBackClick}
        icon={<ArrowLeftIcon size="sm" theme="neutral" />}
        iconPosition="only"
        title="Πίσω στο Dashboard"
        style={{ marginBottom: 'var(--layera-space-md)' }}
      />

      {/* Μπορούμε να προσθέσουμε περισσότερα navigation items εδώ */}
    </div>
  );
};