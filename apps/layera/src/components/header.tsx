import React from 'react';
import { Box } from '@layera/layout';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon, BuildingIcon, BriefcaseIcon } from '@layera/icons';
import { Modal, ModalHeader, ModalContent, useModal } from '@layera/modals';

export const Header: React.FC = () => {
  const { isOpen, open, close } = useModal();

  // Enterprise-compliant styles using design tokens ONLY
  const headerStyles = {
    container: {
      position: 'fixed' as const,
      top: 'var(--layera-header-fixed-top)',
      left: 'var(--layera-header-fixed-left)',
      right: 'var(--layera-header-fixed-right)',
      zIndex: 'var(--layera-header-fixed-zIndex)',
      height: 'var(--layera-header-fixed-height)',
      backgroundColor: 'var(--layera-color-text-inverse)',
      display: 'var(--layera-global-display-flex)',
      alignItems: 'var(--layera-global-alignItems-center)',
      justifyContent: 'var(--layera-global-justifyContent-spaceBetween)',
      padding: 'var(--layera-global-reset-padding) var(--layera-global-spacing-4)',
      borderBottom: 'var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) var(--layera-color-border-light)'
    },
    flexContainer: {
      display: 'var(--layera-global-display-flex)',
      alignItems: 'var(--layera-global-alignItems-center)',
      gap: 'var(--layera-global-spacing-3)'
    },
    flexNavigation: {
      display: 'var(--layera-global-display-flex)',
      alignItems: 'var(--layera-global-alignItems-center)',
      gap: 'var(--layera-global-spacing-2)'
    },
    actionButton: {
      width: 'var(--layera-global-spacing-8)',
      height: 'var(--layera-global-spacing-8)',
      backgroundColor: 'var(--layera-btn-action-backgroundColor)',
      border: 'var(--layera-global-border-none)',
      borderRadius: 'var(--layera-btn-action-borderRadius)',
      display: 'var(--layera-global-display-flex)',
      alignItems: 'var(--layera-global-alignItems-center)',
      justifyContent: 'var(--layera-global-justifyContent-center)',
      cursor: 'var(--layera-global-cursor-pointer)'
    },
    ghostButton: {
      width: 'var(--layera-global-spacing-8)',
      height: 'var(--layera-global-spacing-8)',
      backgroundColor: 'var(--layera-global-color-transparent)',
      border: 'var(--layera-global-border-none)',
      display: 'var(--layera-global-display-flex)',
      alignItems: 'var(--layera-global-alignItems-center)',
      justifyContent: 'var(--layera-global-justifyContent-center)',
      cursor: 'var(--layera-global-cursor-pointer)'
    },
    whiteIcon: {
      color: 'var(--layera-icon-colorWhite)',
      pointerEvents: 'none' as const
    },
    headerTitle: {
      color: 'var(--layera-colorUtilities-utilities-text-neutral-white)',
      fontSize: 'var(--layera-fontSize-base)',
      fontWeight: 'var(--layera-fontWeight-semibold)'
    },
    blueIcon: {
      color: 'var(--layera-color-accent-blue)'
    },
    greenIcon: {
      color: 'var(--layera-color-accent-green)'
    }
  };

  return (
    <>
    <Modal
      open={isOpen}
      onClose={close}
      size="md"
      aria-labelledby="add-content-title"
    >
      <ModalHeader title="Προσθήκη νέου περιεχομένου" />
      <ModalContent>
        <Box className="layera-padding--lg">
          <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--gap-lg">
            <Box className="layera-card layera-card--clickable layera-padding--md">
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BuildingIcon size="lg" style={headerStyles.blueIcon} />
                <Box className="layera-typography" data-size="lg" data-weight="semibold" data-color="primary">
                  Ακίνητα
                </Box>
              </Box>
              <Box className="layera-typography" data-size="sm" data-color="secondary">
                Προσθήκη νέου ακινήτου στην πλατφόρμα
              </Box>
            </Box>

            <Box className="layera-card layera-card--clickable layera-padding--md">
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BriefcaseIcon size="lg" style={headerStyles.greenIcon} />
                <Box className="layera-typography" data-size="lg" data-weight="semibold" data-color="primary">
                  Εργασία
                </Box>
              </Box>
              <Box className="layera-typography" data-size="sm" data-color="secondary">
                Προσθήκη νέας αγγελίας εργασίας
              </Box>
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
    <Box
      style={headerStyles.container}
    >
      {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
      <Box style={headerStyles.flexContainer}>
        <button
          onClick={open}
          style={headerStyles.actionButton}
        >
          <PlusIcon size="sm" style={headerStyles.whiteIcon} />
        </button>
        <span style={headerStyles.headerTitle}>Geo-Canvas</span>
      </Box>

      {/* Κέντρο: 3 εικονίδια */}
      <Box style={headerStyles.flexNavigation}>
        <button style={headerStyles.ghostButton}>
          <SearchIcon size="md" style={headerStyles.whiteIcon} />
        </button>
        <button style={headerStyles.ghostButton}>
          <LocationIcon size="md" style={headerStyles.whiteIcon} />
        </button>
        <button style={headerStyles.ghostButton}>
          <MenuIcon size="md" style={headerStyles.whiteIcon} />
        </button>
      </Box>

      {/* Δεξιά: 3 εικονίδια */}
      <Box style={headerStyles.flexNavigation}>
        <button style={headerStyles.ghostButton}>
          <SettingsIcon size="md" style={headerStyles.whiteIcon} />
        </button>
        <button style={headerStyles.ghostButton}>
          <LocationIcon size="md" style={headerStyles.whiteIcon} />
        </button>
        <button style={headerStyles.ghostButton}>
          <UserIcon size="md" style={headerStyles.whiteIcon} />
        </button>
      </Box>
    </Box>
    </>
  );
};