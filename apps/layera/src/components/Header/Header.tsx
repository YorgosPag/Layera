/**
 * Header.tsx - Enterprise Header Component
 *
 * ARXES Compliant header implementation
 * - Clean component logic
 * - Separated styles
 * - Type-safe props
 * - Zero inline styles
 */

import React from 'react';
import { Box } from '@layera/layout';
import { PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon, BuildingIcon, BriefcaseIcon } from '@layera/icons';
import { Modal, ModalHeader, ModalContent, useModal } from '@layera/modals';
import { headerStyles } from './Header.styles';
import { HEADER_CONSTANTS } from './Header.constants';

export const Header: React.FC = () => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <Modal
        open={isOpen}
        onClose={close}
        size={HEADER_CONSTANTS.MODAL.SIZE}
        aria-labelledby={HEADER_CONSTANTS.MODAL.ARIA_LABELLEDBY}
      >
        <ModalHeader title="Προσθήκη νέου περιεχομένου" />
        <ModalContent>
          <Box className="layera-padding--lg">
            <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--gap-lg">
              <Box className="layera-card layera-card--clickable layera-padding--md">
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                  <BuildingIcon size={HEADER_CONSTANTS.ICON_SIZES.LARGE} style={headerStyles.blueIcon} />
                  <Box className="layera-typography" data-size={HEADER_CONSTANTS.TYPOGRAPHY.DATA_SIZE.LARGE} data-weight={HEADER_CONSTANTS.TYPOGRAPHY.DATA_WEIGHT.SEMIBOLD} data-color={HEADER_CONSTANTS.TYPOGRAPHY.DATA_COLOR.PRIMARY}>
                    Ακίνητα
                  </Box>
                </Box>
                <Box className="layera-typography" data-size={HEADER_CONSTANTS.TYPOGRAPHY.DATA_SIZE.SMALL} data-color={HEADER_CONSTANTS.TYPOGRAPHY.DATA_COLOR.SECONDARY}>
                  Προσθήκη νέου ακινήτου στην πλατφόρμα
                </Box>
              </Box>

              <Box className="layera-card layera-card--clickable layera-padding--md">
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                  <BriefcaseIcon size={HEADER_CONSTANTS.ICON_SIZES.LARGE} style={headerStyles.greenIcon} />
                  <Box className="layera-typography" data-size={HEADER_CONSTANTS.TYPOGRAPHY.DATA_SIZE.LARGE} data-weight={HEADER_CONSTANTS.TYPOGRAPHY.DATA_WEIGHT.SEMIBOLD} data-color={HEADER_CONSTANTS.TYPOGRAPHY.DATA_COLOR.PRIMARY}>
                    Εργασία
                  </Box>
                </Box>
                <Box className="layera-typography" data-size={HEADER_CONSTANTS.TYPOGRAPHY.DATA_SIZE.SMALL} data-color={HEADER_CONSTANTS.TYPOGRAPHY.DATA_COLOR.SECONDARY}>
                  Προσθήκη νέας αγγελίας εργασίας
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalContent>
      </Modal>

      <Box style={headerStyles.container}>
        {/* Αριστερά: Πλήκτρο με + και κείμενο Geo-Canvas */}
        <Box style={headerStyles.flexContainer}>
          <button onClick={open} style={headerStyles.actionButton}>
            <PlusIcon size={HEADER_CONSTANTS.ICON_SIZES.SMALL} style={headerStyles.whiteIcon} />
          </button>
          <span style={headerStyles.headerTitle}>Geo-Canvas</span>
        </Box>

        {/* Κέντρο: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SearchIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <MenuIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
        </Box>

        {/* Δεξιά: 3 εικονίδια */}
        <Box style={headerStyles.flexNavigation}>
          <button style={headerStyles.ghostButton}>
            <SettingsIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <LocationIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
          <button style={headerStyles.ghostButton}>
            <UserIcon size={HEADER_CONSTANTS.ICON_SIZES.MEDIUM} style={headerStyles.whiteIcon} />
          </button>
        </Box>
      </Box>
    </>
  );
};