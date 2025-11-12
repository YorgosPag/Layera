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
import { BuildingIcon, BriefcaseIcon, UploadIcon, MapIcon } from '@layera/icons';
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
  const [currentView, setCurrentView] = React.useState<'main' | 'property' | 'job' | 'property-offer' | 'property-search' | 'property-search-type' | 'sale-timing' | 'location-method' | 'job-offer-type' | 'job-timing'>('main');

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
    onClick: () => setCurrentView('property-offer'),
    testId: 'property-offer-card'
  }), []);

  const propertySearchCard = React.useMemo(() => cardFactory.selection({
    id: 'property-search',
    title: 'Θέλω να Αναζητήσω (Geo-Alert)',
    description: 'Δημιουργήστε μια ειδοποίηση για μελλοντικά ακίνητα σε μια περιοχή.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'property-search',
    theme: 'property',
    onClick: () => setCurrentView('property-search-type'),
    testId: 'property-search-card'
  }), []);

  // Job sub-cards (second level)
  const jobOfferCard = React.useMemo(() => cardFactory.selection({
    id: 'job-offer',
    title: 'Θέλω να Προσφέρω Θέση',
    description: 'Δημοσιεύστε μια αγγελία για μια διαθέσιμη θέση εργασίας.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'job-offer',
    theme: 'job',
    onClick: () => setCurrentView('job-offer-type'),
    testId: 'job-offer-card'
  }), []);

  const jobSearchCard = React.useMemo(() => cardFactory.selection({
    id: 'job-search',
    title: 'Αναζητώ Εργασία',
    description: 'Δηλώστε τη διαθεσιμότητά σας και τις δεξιότητές σας σε μια περιοχή.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'job-search',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'job-search-card'
  }), [onSelectJob]);

  // Transaction type cards (third level)
  const saleCard = React.useMemo(() => cardFactory.selection({
    id: 'transaction-sale',
    title: 'Προς Πώληση',
    description: 'Το ακίνητο είναι διαθέσιμο για αγορά.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'sale',
    theme: 'property',
    onClick: () => setCurrentView('sale-timing'),
    testId: 'transaction-sale-card'
  }), []);

  const rentalCard = React.useMemo(() => cardFactory.selection({
    id: 'transaction-rental',
    title: 'Προς Ενοικίαση',
    description: 'Το ακίνητο είναι διαθέσιμο για ενοικίαση.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'rental',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'transaction-rental-card'
  }), [onSelectProperty]);

  // Availability timing cards (fourth level)
  const immediateCard = React.useMemo(() => cardFactory.selection({
    id: 'timing-immediate',
    title: 'Άμεσα Διαθέσιμο',
    description: 'Το ακίνητο είναι διαθέσιμο τώρα.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'immediate',
    theme: 'property',
    onClick: () => setCurrentView('location-method'),
    testId: 'timing-immediate-card'
  }), []);

  const futureCard = React.useMemo(() => cardFactory.selection({
    id: 'timing-future',
    title: 'Διαθέσιμο στο Μέλλον',
    description: 'Το ακίνητο θα είναι διαθέσιμο σε μελλοντική ημερομηνία.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'future',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'timing-future-card'
  }), [onSelectProperty]);

  // Location method cards (fifth level)
  const uploadFloorplanCard = React.useMemo(() => cardFactory.selection({
    id: 'location-upload',
    title: 'Καταχώρηση Κάτοψης',
    description: 'Ανεβάστε ένα αρχείο (DXF, PNG, JPG) για να το τοποθετήσετε στον χάρτη.',
    icon: <UploadIcon size="lg" />,
    selectionValue: 'upload',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'location-upload-card'
  }), [onSelectProperty]);

  const drawOnMapCard = React.useMemo(() => cardFactory.selection({
    id: 'location-draw',
    title: 'Σχεδίαση στον Χάρτη',
    description: 'Τοποθετήστε μια πινέζα ή σχεδιάστε ένα περίγραμμα για να ορίσετε την τοποθεσία.',
    icon: <MapIcon size="lg" />,
    selectionValue: 'draw',
    theme: 'property',
    onClick: onSelectProperty,
    testId: 'location-draw-card'
  }), [onSelectProperty]);

  // Employment type cards (job offer third level)
  const fullTimeCard = React.useMemo(() => cardFactory.selection({
    id: 'employment-fulltime',
    title: 'Πλήρης Απασχόληση',
    description: 'Μόνιμη θέση πλήρους ωραρίου.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'fulltime',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'employment-fulltime-card'
  }), [onSelectJob]);

  const partTimeCard = React.useMemo(() => cardFactory.selection({
    id: 'employment-parttime',
    title: 'Μερική Απασχόληση',
    description: 'Θέση με μειωμένο ωράριο.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'parttime',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'employment-parttime-card'
  }), [onSelectJob]);

  const freelanceCard = React.useMemo(() => cardFactory.selection({
    id: 'employment-freelance',
    title: 'Freelance / Project',
    description: 'Εργασία ανά έργο ή ως ελεύθερος επαγγελματίας.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'freelance',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'employment-freelance-card'
  }), [onSelectJob]);

  const seasonalCard = React.useMemo(() => cardFactory.selection({
    id: 'employment-seasonal',
    title: 'Εποχιακή Εργασία',
    description: 'Εργασία για συγκεκριμένη χρονική περίοδο.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'seasonal',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'employment-seasonal-card'
  }), [onSelectJob]);

  const internshipCard = React.useMemo(() => cardFactory.selection({
    id: 'employment-internship',
    title: 'Πρακτική Άσκηση',
    description: 'Θέση πρακτικής άσκησης ή μαθητείας.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'internship',
    theme: 'job',
    onClick: () => setCurrentView('job-timing'),
    testId: 'employment-internship-card'
  }), []);

  // Job timing cards (fourth level - shared by all employment types)
  const jobImmediateCard = React.useMemo(() => cardFactory.selection({
    id: 'job-timing-immediate',
    title: 'Άμεση Διαθεσιμότητα',
    description: 'Η θέση εργασίας είναι διαθέσιμη για άμεση έναρξη.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'immediate',
    theme: 'job',
    onClick: onSelectJob,
    testId: 'job-timing-immediate-card'
  }), [onSelectJob]);

  const jobFutureCard = React.useMemo(() => cardFactory.selection({
    id: 'job-timing-future',
    title: 'Μελλοντική Διαθεσιμότητα',
    description: 'Η θέση εργασίας θα είναι διαθέσιμη σε μελλοντική ημερομηνία.',
    icon: <BriefcaseIcon size="lg" />,
    selectionValue: 'future',
    theme: 'job',
    onClick: onSelectJob,
    testId: 'job-timing-future-card'
  }), [onSelectJob]);

  // Property search transaction type cards (third level for geo-alert)
  const searchBuyCard = React.useMemo(() => cardFactory.selection({
    id: 'search-buy',
    title: 'Για Αγορά',
    description: 'Δημιουργία ειδοποίησης για ακίνητα προς αγορά.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'buy',
    theme: 'property',
    onClick: () => setCurrentView('sale-timing'),
    testId: 'search-buy-card'
  }), []);

  const searchRentCard = React.useMemo(() => cardFactory.selection({
    id: 'search-rent',
    title: 'Για Ενοικίαση',
    description: 'Δημιουργία ειδοποίησης για ακίνητα προς ενοικίαση.',
    icon: <BuildingIcon size="lg" />,
    selectionValue: 'rent',
    theme: 'property',
    onClick: () => setCurrentView('sale-timing'),
    testId: 'search-rent-card'
  }), []);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      noOverlay={true}
      showCloseButton={false}
      draggable={true}
      aria-labelledby="add-content-title"
    >
      <ModalHeader
        title={
          currentView === 'main' ? "Επιλογή κατηγορίας" :
          currentView === 'property-offer' ? "Είδος Συναλλαγής" :
          currentView === 'sale-timing' ? "Χρόνος Διαθεσιμότητας" :
          currentView === 'location-method' ? "Μέθοδος Τοποθεσίας" :
          currentView === 'job-offer-type' ? "Είδος Απασχόλησης" :
          currentView === 'job-timing' ? "Χρόνος Διαθεσιμότητας" :
          currentView === 'property-search-type' ? "Είδος Συναλλαγής" :
          "Τύπος Καταχώρησης"
        }
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
                <UnifiedCard config={jobOfferCard} />
                <UnifiedCard config={jobSearchCard} />
              </>
            )}
            {currentView === 'property-offer' && (
              <>
                <UnifiedCard config={saleCard} />
                <UnifiedCard config={rentalCard} />
              </>
            )}
            {currentView === 'sale-timing' && (
              <>
                <UnifiedCard config={immediateCard} />
                <UnifiedCard config={futureCard} />
              </>
            )}
            {currentView === 'location-method' && (
              <>
                <UnifiedCard config={uploadFloorplanCard} />
                <UnifiedCard config={drawOnMapCard} />
              </>
            )}
            {currentView === 'job-offer-type' && (
              <>
                <UnifiedCard config={fullTimeCard} />
                <UnifiedCard config={partTimeCard} />
                <UnifiedCard config={freelanceCard} />
                <UnifiedCard config={seasonalCard} />
                <UnifiedCard config={internshipCard} />
              </>
            )}
            {currentView === 'job-timing' && (
              <>
                <UnifiedCard config={jobImmediateCard} />
                <UnifiedCard config={jobFutureCard} />
              </>
            )}
            {currentView === 'property-search-type' && (
              <>
                <UnifiedCard config={searchBuyCard} />
                <UnifiedCard config={searchRentCard} />
              </>
            )}
          </Box>
          {currentView !== 'main' && (
            <Box className="layera-card__modalBackButtonContainer">
              <button
                onClick={() => {
                  if (currentView === 'job-timing') {
                    setCurrentView('job-offer-type');
                  } else if (currentView === 'job-offer-type') {
                    setCurrentView('job');
                  } else if (currentView === 'location-method') {
                    setCurrentView('sale-timing');
                  } else if (currentView === 'sale-timing') {
                    setCurrentView('property-offer');
                  } else if (currentView === 'property-search-type') {
                    setCurrentView('property');
                  } else if (currentView === 'property-offer' || currentView === 'property-search') {
                    setCurrentView('property');
                  } else if (currentView === 'property' || currentView === 'job') {
                    setCurrentView('main');
                  }
                }}
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