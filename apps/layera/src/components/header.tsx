import React from 'react';
import { Box } from '@layera/layout';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';

export const Header: React.FC = () => {
  return (
    <div
      style={{
        position: 'var(--layera-global-position-fixed)',
        top: 'var(--layera-header-fixed-top)',
        left: 'var(--layera-header-fixed-left)',
        right: 'var(--layera-header-fixed-right)',
        zIndex: 'var(--layera-header-fixed-zIndex)',
        height: 'var(--layera-header-fixed-height)',
        backgroundColor: 'var(--layera-color-text-inverse)',
        display: 'var(--layera-global-display-flex)',
        alignItems: 'var(--layera-global-alignItems-center)',
        justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
        padding: '0 var(--layera-global-spacing-4)',
        borderBottom: 'var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) var(--layera-color-border-light)'
      }}
    >
      {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
      <div style={{ display: 'var(--layera-global-display-flex)', alignItems: 'var(--layera-global-alignItems-center)', gap: 'var(--layera-global-spacing-3)' }}>
        <button
          style={{
            width: 'var(--layera-global-spacing-8)',
            height: 'var(--layera-global-spacing-8)',
            backgroundColor: 'var(--layera-btn-action-backgroundColor)',
            border: 'var(--layera-global-border-none)',
            borderRadius: 'var(--layera-btn-action-borderRadius)',
            display: 'var(--layera-global-display-flex)',
            alignItems: 'var(--layera-global-alignItems-center)',
            justifyContent: 'var(--layera-global-justifyContent-center)',
            cursor: 'var(--layera-global-cursor-pointer)'
          }}
        >
          <PlusIcon size="sm" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
        <span style={{ color: 'var(--layera-colorUtilities-utilities-text-neutral-white)', fontSize: 'var(--layera-fontSize-base)', fontWeight: 'var(--layera-fontWeight-semibold)' }}>Geo-Canvas</span>
      </div>

      {/* Κέντρο: 3 εικονίδια */}
      <div style={{ display: 'var(--layera-global-display-flex)', alignItems: 'var(--layera-global-alignItems-center)', gap: 'var(--layera-global-spacing-2)' }}>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <SearchIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <LocationIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <MenuIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
      </div>

      {/* Δεξιά: 3 εικονίδια */}
      <div style={{ display: 'var(--layera-global-display-flex)', alignItems: 'var(--layera-global-alignItems-center)', gap: 'var(--layera-global-spacing-2)' }}>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <SettingsIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <LocationIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
        <button style={{ padding: 'var(--layera-btn-action-padding)', backgroundColor: 'var(--layera-global-color-transparent)', border: 'var(--layera-global-border-none)', cursor: 'var(--layera-global-cursor-pointer)' }}>
          <UserIcon size="md" style={{ color: 'var(--layera-icon-colorWhite)' }} />
        </button>
      </div>
    </div>
  );
};