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
        backgroundColor: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        borderBottom: '1px solid #334155'
      }}
    >
      {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <PlusIcon size="sm" style={{ color: 'white' }} />
        </button>
        <span style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>Geo-Canvas</span>
      </div>

      {/* Κέντρο: 3 εικονίδια */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <SearchIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LocationIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <MenuIcon size="md" style={{ color: 'white' }} />
        </button>
      </div>

      {/* Δεξιά: 3 εικονίδια */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <SettingsIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LocationIcon size="md" style={{ color: 'white' }} />
        </button>
        <button style={{ padding: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          <UserIcon size="md" style={{ color: 'white' }} />
        </button>
      </div>
    </div>
  );
};