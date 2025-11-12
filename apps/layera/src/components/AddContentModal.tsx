import React from 'react';
import { Box } from '@layera/layout';
import { BuildingIcon, BriefcaseIcon } from '@layera/icons';
import { Modal, ModalHeader, ModalContent } from '@layera/modals';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty?: () => void;
  onSelectJob?: () => void;
}

/**
 * AddContentModal - Ξεχωριστό Modal για προσθήκη περιεχομένου
 *
 * Separated από το Header για καλύτερη αρχιτεκτονική και reusability
 */
export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
  onSelectJob
}) => {
  // Enterprise-compliant styles using design tokens ONLY
  const modalStyles = {
    blueIcon: {
      color: 'var(--layera-color-accent-blue)'
    },
    greenIcon: {
      color: 'var(--layera-color-accent-green)'
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      aria-labelledby="add-content-title"
    >
      <ModalHeader title="Προσθήκη νέου περιεχομένου" />
      <ModalContent>
        <Box className="layera-padding--lg">
          <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--gap-lg">
            <Box
              className="layera-card layera-card--clickable layera-padding--md"
              onClick={onSelectProperty}
            >
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BuildingIcon size="lg" style={modalStyles.blueIcon} />
                <Box className="layera-typography" data-size="lg" data-weight="semibold" data-color="primary">
                  Ακίνητα
                </Box>
              </Box>
              <Box className="layera-typography" data-size="sm" data-color="secondary">
                Προσθήκη νέου ακινήτου στην πλατφόρμα
              </Box>
            </Box>

            <Box
              className="layera-card layera-card--clickable layera-padding--md"
              onClick={onSelectJob}
            >
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BriefcaseIcon size="lg" style={modalStyles.greenIcon} />
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
  );
};