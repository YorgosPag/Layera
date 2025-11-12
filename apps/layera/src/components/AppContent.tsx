import React, { useState, useEffect } from 'react';
import { Box, LayeraHeader, HeaderActionsGroup } from '../../../../packages/layout/src';
import { MapContainer } from '@layera/map-core';
import { Drawer, Modal, ModalHeader, ModalContent } from '@layera/modals';
import { ThemeSwitcher } from '../../../../packages/theme-switcher/src';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { PlusIcon, UserIcon, BuildingIcon, BriefcaseIcon, ArrowLeftIcon } from '../../../../packages/icons/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { Header } from './Header';
import { AddContentModal } from './AddContentModal';
import RealEstateContent from './RealEstatePage';
import JobsContent from './JobsPage';
import LoginContent from './LoginPage';

export const AppContent: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'categorySelection' | 'propertyTypeSelection' | null>(null);
  const [activeModal, setActiveModal] = useState<'login' | 'addContent' | null>(null);
  const { t } = useLayeraTranslation();

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  const openDrawer = () => {
    setActiveDrawer('categorySelection');
  };

  const openPropertyTypeSelection = () => {
    setActiveDrawer('propertyTypeSelection');
  };

  const goBackToCategorySelection = () => {
    setActiveDrawer('categorySelection');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openModal = (modalType: 'login' | 'addContent') => {
    setActiveModal(modalType);
  };

  const openAddContentModal = () => {
    setActiveModal('addContent');
  };

  const handleSelectProperty = () => {
    closeModal();
    openDrawer(); // Ανοίγει το category selection drawer
  };

  const handleSelectJob = () => {
    closeModal();
    alert('Ανοίγει flow Εργασίας');
  };

  return (
    <Box className="layera-layout">
      <Header onAddContentClick={openAddContentModal} />

      <Box className="layera-map-container" style={{ marginTop: 'var(--layera-header-fixed-height)' }}>
        <MapContainer
          className="layera-map--fullscreen"
          initialLat={37.9755}
          initialLng={23.7348}
          initialZoom={13}
        />
      </Box>

      <Drawer
        open={activeDrawer === 'categorySelection'}
        onClose={closeDrawer}
        position="right"
        size="md"
        closeOnOverlayClick={false}
        closeOnEscape={false}
        preventBodyScroll={false}
        overlayClassName="pinned-overlay"
        aria-labelledby="category-selection-title"
      >
        <Box className="layera-padding--lg">
          <Box className="layera-margin-bottom--lg">
            <Heading
              id="category-selection-title"
              as="h2"
              size="xl"
              weight="bold"
              color="primary"
            >
              Επιλογή Κατηγορίας
            </Heading>
          </Box>

          <Box className="layera-stack--spacing-lg">
            {/* Κάρτα Ακινήτων */}
            <Box
              as="button"
              className="layera-card layera-card--clickable layera-padding--md layera-text-left"
              onClick={openPropertyTypeSelection}
            >
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BuildingIcon size="lg" />
                <Heading as="h3" size="lg" weight="semibold" color="primary">Ακίνητα</Heading>
              </Box>
              <Text size="sm" color="secondary" lineHeight="normal">
                Καταχωρήστε ένα ακίνητο προς πώληση, ενοικίαση ή δημιουργήστε μια ειδοποίηση αναζήτησης.
              </Text>
            </Box>

            {/* Κάρτα Εργασίας */}
            <Box
              as="button"
              className="layera-card layera-card--clickable layera-padding--md layera-text-left"
              onClick={() => {
                closeDrawer();
                alert('Ανοίγει flow Εργασίας');
              }}
            >
              <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--sm">
                <BriefcaseIcon size="lg" />
                <Heading as="h3" size="lg" weight="semibold" color="primary">Εργασία</Heading>
              </Box>
              <Text size="sm" color="secondary" lineHeight="normal">
                Προσφέρετε μια θέση εργασίας ή δηλώστε τις διαθεσιμότητά σας σε μια συγκεκριμένη περιοχή.
              </Text>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Property Type Selection Drawer */}
      <Drawer
        open={activeDrawer === 'propertyTypeSelection'}
        onClose={closeDrawer}
        position="right"
        size="md"
        closeOnOverlayClick={false}
        closeOnEscape={false}
        preventBodyScroll={false}
        overlayClassName="pinned-overlay"
        aria-labelledby="property-type-selection-title"
      >
        <Box className="layera-padding--lg">
          {/* Header με κουμπί Πίσω */}
          <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm layera-margin-bottom--lg">
            <Box
              as="button"
              className="layera-typography"
              onClick={goBackToCategorySelection}
              aria-label={t('navigation.back')}
            >
              <ArrowLeftIcon size="md" />
            </Box>
            <Heading
              id="property-type-selection-title"
              as="h2"
              size="xl"
              weight="bold"
              color="primary"
            >
              {t('realEstate.typeSelection.title')}
            </Heading>
          </Box>

          <Box className="layera-stack--spacing-lg">
            {/* Κάρτα "Θέλω να Προσφέρω" */}
            <Box
              as="button"
              className="layera-card layera-card--clickable layera-padding--md layera-text-left"
              onClick={() => {
                closeDrawer();
                alert('Ανοίγει flow "Θέλω να Προσφέρω"');
              }}
            >
              <Heading as="h3" size="lg" weight="semibold" color="primary" className="layera-margin-bottom--sm">
                {t('realEstate.typeSelection.offer.title')}
              </Heading>
              <Text size="sm" color="secondary" lineHeight="normal">
                {t('realEstate.typeSelection.offer.subtitle')}
              </Text>
            </Box>

            {/* Κάρτα "Θέλω να Αναζητήσω (Geo-Alert)" */}
            <Box
              as="button"
              className="layera-card layera-card--clickable layera-padding--md layera-text-left"
              onClick={() => {
                closeDrawer();
                alert('Ανοίγει flow "Θέλω να Αναζητήσω (Geo-Alert)"');
              }}
            >
              <Heading as="h3" size="lg" weight="semibold" color="primary" className="layera-margin-bottom--sm">
                {t('realEstate.typeSelection.search.title')}
              </Heading>
              <Text size="sm" color="secondary" lineHeight="normal">
                {t('realEstate.typeSelection.search.subtitle')}
              </Text>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={activeModal === 'addContent'}
        onClose={closeModal}
        onSelectProperty={handleSelectProperty}
        onSelectJob={handleSelectJob}
      />

      {/* Login Modal */}
      <Modal
        open={activeModal === 'login'}
        onClose={closeModal}
        size="md"
        aria-labelledby="login-title"
      >
        <ModalHeader title={t('auth.loginRegister')} />
        <ModalContent>
          <LoginContent />
        </ModalContent>
      </Modal>
    </Box>
  );
};