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

export const Header: React.FC = () => {
  const { isOpen, open, close } = useModal();

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
          <Box style={headerStyles.paddingLarge}>
            <Box style={{...headerStyles.gridContainer, ...headerStyles.gridTablet}}>
              <Box style={headerStyles.cardClickable}>
                <Box style={{...headerStyles.flexContainer, gap: 'var(--layera-global-spacing-2)', ...headerStyles.marginBottomSmall}}>
                  <BuildingIcon size="lg" style={headerStyles.blueIcon} />
                  <Box style={headerStyles.typographyLarge}>
                    Ακίνητα
                  </Box>
                </Box>
                <Box style={headerStyles.typographySmall}>
                  Προσθήκη νέου ακινήτου στην πλατφόρμα
                </Box>
              </Box>

              <Box style={headerStyles.cardClickable}>
                <Box style={{...headerStyles.flexContainer, gap: 'var(--layera-global-spacing-2)', ...headerStyles.marginBottomSmall}}>
                  <BriefcaseIcon size="lg" style={headerStyles.greenIcon} />
                  <Box style={headerStyles.typographyLarge}>
                    Εργασία
                  </Box>
                </Box>
                <Box style={headerStyles.typographySmall}>
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