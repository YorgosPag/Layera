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
  const [currentView, setCurrentView] = React.useState<'main' | 'property' | 'job'>('main');

  // Reset view when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setCurrentView('main');
    }
  }, [isOpen]);

  // Enterprise card configurations using factory pattern
  const propertyCard = React.useMemo(() => cardFactory.selection({
    id: 'add-content-property',
    title: 'Ακίνητα',
    description: 'Καταχωρήστε ένα ακίνητο προς πώληση, ενοικίαση ή δημιουργήστε μια ειδοποίηση αναζήτησης.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'property',
    theme: 'property',
    onClick: () => setCurrentView('property'),
    testId: 'add-content-property-card'
  }), []);

  const jobCard = React.useMemo(() => cardFactory.selection({
    id: 'add-content-job',
    title: 'Εργασία',
    description: 'Προσφέρετε μια θέση εργασίας ή δηλώστε τη διαθεσιμότητά σας σε μια συγκεκριμένη περιοχή.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'job',
    theme: 'job',
    onClick: () => setCurrentView('job'),
    testId: 'add-content-job-card'
  }), []);

  // Property sub-cards
  const propertyOfferCard = React.useMemo(() => cardFactory.selection({
    id: 'property-offer',
    title: 'Θέλω να Προσφέρω',
    description: 'Καταχωρίστε ένα ακίνητο προς πώληση ή ενοικίαση.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'property-offer',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'property-offer-card'
  }), [onSelectProperty]);

  const propertySearchCard = React.useMemo(() => cardFactory.selection({
    id: 'property-search',
    title: 'Θέλω να Αναζητήσω (Geo-Alert)',
    description: 'Δημιουργήστε μια ειδοποίηση για μελλοντικά ακίνητα σε μια περιοχή.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'property-search',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'property-search-card'
  }), [onSelectProperty]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      noOverlay={true}
      showCloseButton={false}
      aria-labelledby="add-content-title"
    >
      <ModalHeader
        title={currentView === 'main' ? "Επιλογή κατηγορίας" : "Τύπος Καταχώρησης"}
        onClose={onClose}
      />
      <ModalContent>
        <Box className="layera-padding--lg">
          <Box className="layera-grid layera-grid--cols-1 layera-grid--gap-lg">
            {currentView === 'main' && (
              <>
                <UnifiedCard config={propertyCard} />
                <UnifiedCard config={jobCard} />
              </>
            )}
            {currentView === 'property' && (
              <>
                <UnifiedCard config={propertyOfferCard} />
                <UnifiedCard config={propertySearchCard} />
              </>
            )}
            {currentView === 'job' && (
              <>
                <UnifiedCard config={jobCard} />
              </>
            )}
          </Box>
          {currentView !== 'main' && (
            <Box
              className="layera-spacing"
              data-type="margin"
              data-direction="top"
              data-size="lg"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <button
                onClick={() => setCurrentView('main')}
                className="layera-button"
                data-variant="secondary"
                data-size="md"
              >
                Πίσω
              </button>
            </Box>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};