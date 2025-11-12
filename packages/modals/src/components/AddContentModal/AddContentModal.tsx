/**
 * AddContentModal - Enterprise Modal για προσθήκη περιεχομένου
 *
 * ARXES Compliant implementation:
 * - @layera/cards UnifiedCard system
 * - @layera/tolgee i18n
 * - @layera/layout primitives
 * - Zero hardcoded values
 * - Zero inline styles
 */

import React from 'react';
import { Box, Flex } from '@layera/layout';
import { BuildingIcon, BriefcaseIcon } from '@layera/icons';
import { Modal } from '../Modal/Modal';
import { ModalHeader } from '../ModalHeader/ModalHeader';
import { ModalContent } from '../ModalContent/ModalContent';
import { UnifiedCard, cardFactory } from '@layera/cards';
import { useLayeraTranslation } from '@layera/tolgee';

export interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProperty?: () => void;
  onSelectJob?: () => void;
}

/**
 * AddContentModal - Enterprise Modal για προσθήκη περιεχομένου
 *
 * ARXES Compliant:
 * - Configuration-driven με UnifiedCard
 * - i18n integration
 * - Zero hardcoded values
 * - Separation of concerns
 */
export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  onSelectProperty,
  onSelectJob
}) => {
  const { t } = useLayeraTranslation();

  // Enterprise card configurations using factory pattern
  const propertyCard = React.useMemo(() => cardFactory.selection({
    id: 'add-content-property',
    title: 'Ακίνητα',
    description: 'Προσθήκη νέου ακινήτου στην πλατφόρμα',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'property',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'add-content-property-card'
  }), [onSelectProperty]);

  const jobCard = React.useMemo(() => cardFactory.selection({
    id: 'add-content-job',
    title: 'Εργασία',
    description: 'Προσθήκη νέας αγγελίας εργασίας',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'job',
    theme: 'job',
    onClick: onSelectJob,
    testId: 'add-content-job-card'
  }), [onSelectJob]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      noOverlay={true}
      aria-labelledby="add-content-title"
    >
      <ModalHeader title="Προσθήκη νέου περιεχομένου" />
      <ModalContent>
        <Box className="layera-padding--lg">
          <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--gap-lg">
            <UnifiedCard config={propertyCard} />
            <UnifiedCard config={jobCard} />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};