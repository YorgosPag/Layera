import React, { useState, useEffect } from 'react';
import { Box, HeaderActionsGroup } from '../../../../packages/layout/src';
import { MapContainer } from '@layera/map-core';
import { Drawer, Modal, ModalHeader, ModalContent, AddContentModal } from '@layera/modals';
import { ThemeSwitcher } from '../../../../packages/theme-switcher/src';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { PlusIcon, UserIcon, ArrowLeftIcon } from '../../../../packages/icons/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { PipelineDiscovery, type PipelineState } from '@layera/pipelines';
import { Header } from './Header';
import { TestPanel } from './TestPanel';
import RealEstateContent from './RealEstatePage';
import JobsContent from './JobsPage';
import LoginContent from './LoginPage';

// Map defaults from tokens system
const MAP_DEFAULTS = {
  INITIAL_LAT: 37.9755,  // From --layera-map-defaults-initial-latitude
  INITIAL_LNG: 23.7348,  // From --layera-map-defaults-initial-longitude
  INITIAL_ZOOM: 13       // From --layera-map-defaults-initial-zoom
} as const;

export const AppContent: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'propertyTypeSelection' | null>(null);
  const [activeModal, setActiveModal] = useState<'login' | 'addContent' | 'testPanel' | null>(null);
  const [pipelineState, setPipelineState] = useState<PipelineState | null>(null);
  const { t } = useLayeraTranslation();

  // Enterprise Pipeline Discovery Instance
  const pipelineDiscovery = PipelineDiscovery.getInstance();

  // Pipeline State Listener - Full Integration
  useEffect(() => {
    const unsubscribe = pipelineDiscovery.subscribe((newState) => {
      console.log('🚀 Pipeline State Updated:', {
        category: newState.selectedCategory,
        intent: newState.selectedIntent,
        currentStep: newState.currentStepId,
        totalSteps: newState.totalSteps,
        progress: `${newState.currentStepIndex + 1}/${newState.totalSteps}`
      });

      // Update local state with full pipeline state
      setPipelineState(newState);
    });

    return unsubscribe;
  }, [pipelineDiscovery]);

  // Listen για αλλαγές χρώματος από το TestPanel
  useEffect(() => {
    const handleColorChange = async (event: CustomEvent<{ color: string }>) => {
      const newColor = event.detail.color;
      console.log('🎨 Changing color to:', newColor);

      try {
        // Κλείσιμο του modal
        setActiveModal(null);

        // Εκτέλεση των script για αλλαγή
        await changeTestColor(newColor);
      } catch (error) {
        console.error('Error in color change:', error);
      }
    };

    window.addEventListener('changeTestColor', handleColorChange);

    return () => {
      window.removeEventListener('changeTestColor', handleColorChange);
    };
  }, []);

  const closeDrawer = () => {
    setActiveDrawer(null);
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

  const openTestPanel = () => {
    setActiveModal('testPanel');
  };

  const changeTestColor = async (color: string) => {
    try {
      console.log(`🎨 Changing test color to: ${color}`);

      // Εμφάνιση οδηγιών για γρήγορη αλλαγή
      const command = `node C:\\layera\\tests-george\\change-color.js ${color}`;

      alert(
        `🧪 George's Automatic Color Changer\n\n` +
        `🎨 Χρώμα: ${color}\n\n` +
        `Για ΑΥΤΟΜΑΤΗ αλλαγή, τρέξτε στο terminal:\n\n` +
        `${command}\n\n` +
        `Αυτό θα:\n` +
        `✅ Αλλάξει το theme-test-george.json\n` +
        `✅ Κάνει rebuild τα CSS tokens\n` +
        `✅ Προετοιμάσει την εφαρμογή για refresh\n\n` +
        `Μετά ανανεώστε την εφαρμογή (F5) για να δείτε τις αλλαγές!`
      );

      // Copy στο clipboard αν είναι διαθέσιμο
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(command);
          console.log('📋 Command copied to clipboard!');
        } catch (err) {
          console.log('📋 Could not copy to clipboard, but command is displayed above');
        }
      }

      console.log('📋 Copy this command to terminal:\n', command);

    } catch (error) {
      console.error('Error changing test color:', error);
      alert('❌ Σφάλμα κατά την αλλαγή χρώματος');
    }
  };

  const handleSelectProperty = () => {
    // Enterprise Pipeline Flow: Property selected
    pipelineDiscovery.updatePipelineState({
      selectedCategory: 'property',
      currentStepId: 'intent'
    });
    closeModal();
  };

  const handleSelectJob = () => {
    // Enterprise Pipeline Flow: Job selected
    pipelineDiscovery.updatePipelineState({
      selectedCategory: 'job',
      currentStepId: 'intent'
    });
    closeModal();
  };

  return (
    <Box className="layera-layout">
      <Header onAddContentClick={openAddContentModal} onTestPanelClick={openTestPanel} />

      {/* Pipeline State Debug Info */}
      {pipelineState && pipelineState.selectedCategory && (
        <Box style={{
          position: 'fixed',
          top: '60px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          <Text size="sm">🚀 Pipeline: {pipelineState.selectedCategory}</Text>
          <Text size="sm">📍 Step: {pipelineState.currentStepId}</Text>
          <Text size="sm">📊 Progress: {pipelineState.currentStepIndex + 1}/{pipelineState.totalSteps}</Text>
        </Box>
      )}

      <Box className="layera-map-container layera-margin-top--lg">
        <MapContainer
          className="layera-map--fullscreen"
          initialLat={MAP_DEFAULTS.INITIAL_LAT}
          initialLng={MAP_DEFAULTS.INITIAL_LNG}
          initialZoom={MAP_DEFAULTS.INITIAL_ZOOM}
        />
      </Box>


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
              onClick={closeDrawer}
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

      {/* Test Panel Modal */}
      <TestPanel
        isOpen={activeModal === 'testPanel'}
        onClose={closeModal}
      />
    </Box>
  );
};