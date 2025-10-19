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
      <Button
        variant="ghost"
        size="md"
        onClick={onBackClick}
        icon={<ArrowLeftIcon size="sm" theme="neutral" />}
        iconPosition="only"
        title="Πίσω στο Dashboard"
        style={{ marginBottom: 'var(--layera-space-md)' }}
      />

      {/* Unified Pipeline + Button */}
      {onNewEntryClick && (
        <Button
          variant="primary"
          size="md"
          onClick={onNewEntryClick}
          icon={<PlusIcon size="sm" theme="neutral" />}
          iconPosition="only"
          title="Νέα Καταχώρηση"
          style={{
            marginBottom: 'var(--layera-space-md)',
            backgroundColor: 'var(--layera-bg-success)',
            borderRadius: '50%',
            width: '48px',
            height: '48px'
          }}
        />
      )}

      {/* Μπορούμε να προσθέσουμε περισσότερα navigation items εδώ */}
    </div>
  );
};