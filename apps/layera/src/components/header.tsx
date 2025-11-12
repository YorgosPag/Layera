import React from 'react';
import { Box } from '@layera/layout';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';

export const Header: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 'var(--layera-header-fixed-height)',
        backgroundColor: 'var(--layera-color-text-inverse)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--layera-global-spacing-4)',
        borderBottom: '1px solid var(--layera-color-border-light)'
      }}
    >
      {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layera-global-spacing-3)' }}>
        <button
          style={{
            width: 'var(--layera-global-spacing-8)',
            height: 'var(--layera-global-spacing-8)',
            backgroundColor: 'var(--layera-btn-action-backgroundColor)',
            border: 'none',
            borderRadius: 'var(--layera-btn-action-borderRadius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <PlusIcon size="sm" style={{ color: 'white' }} />
        </button>
        <span style={{ color: 'white', fontSize: 'var(--layera-fontSize-base)', fontWeight: 'var(--layera-fontWeight-semibold)' }}>Geo-Canvas</span>
      </div>

      {/* Κέντρο: 3 εικονίδια */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layera-global-spacing-2)' }}>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <SearchIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LocationIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <MenuIcon size="md" style={{ color: 'white' }} />
        </button>
      </div>

      {/* Δεξιά: 3 εικονίδια */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--layera-global-spacing-2)' }}>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <SettingsIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LocationIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <UserIcon size="md" style={{ color: 'white' }} />
        </button>
      </div>
    </div>
  );
};