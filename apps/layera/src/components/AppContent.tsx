import React, { useState, useEffect } from 'react';
import { Box, HeaderActionsGroup, LayeraHeader } from '../../../../packages/layout/src';
import { MapContainer } from '@layera/map-core';
import { Drawer, Modal, ModalHeader, ModalContent, AddContentModal } from '@layera/modals';
import { ThemeSwitcher } from '../../../../packages/theme-switcher/src';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { PlusIcon, UserIcon, ArrowLeftIcon } from '../../../../packages/icons/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { PipelineDiscovery, type PipelineState } from '@layera/pipelines';
import { LivePlayground } from './LivePlayground';
import LoginContent from './LoginPage';
import { PropertyTypeDrawer } from './PropertyTypeDrawer';
import { PipelineDebugInfo } from './PipelineDebugInfo';
import { AppModals } from './AppModals';

// Map defaults from tokens system
const MAP_DEFAULTS = {
  INITIAL_LAT: 37.9755,  // From --layera-map-defaults-initial-latitude
  INITIAL_LNG: 23.7348,  // From --layera-map-defaults-initial-longitude
  INITIAL_ZOOM: 13       // From --layera-map-defaults-initial-zoom
} as const;

export const AppContent: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'propertyTypeSelection' | null>(null);
  const [activeModal, setActiveModal] = useState<'login' | 'addContent' | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [pipelineState, setPipelineState] = useState<PipelineState | null>(null);
  const { t } = useLayeraTranslation();

  // Enterprise Pipeline Discovery Instance
  const pipelineDiscovery = PipelineDiscovery.getInstance();

  // Pipeline State Listener - Full Integration
  useEffect(() => {
    const unsubscribe = pipelineDiscovery.subscribe((newState) => {

      // Update local state with full pipeline state
      setPipelineState(newState);
    });

    return unsubscribe;
  }, [pipelineDiscovery]);

  const changeTestColor = async (color: string) => {
    try {
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
        } catch (clipboardError) {
          console.warn('Could not copy to clipboard:', clipboardError);
        }
      }
    } catch (error) {
      console.error('Error in changeTestColor:', error);
    }
  };

  // Listen για αλλαγές χρώματος από το TestPanel
  useEffect(() => {
    const handleColorChange = async (event: Event) => {
      const customEvent = event as CustomEvent<{ color: string }>;
      const newColor = customEvent.detail.color;

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
  }, [changeTestColor]);

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

  const openLivePlayground = () => {
    setShowPlayground(true);
  };

  const closeLivePlayground = () => {
    setShowPlayground(false);
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
      {/* Live Playground Fullscreen */}
      {showPlayground && (
        <LivePlayground onClose={closeLivePlayground} />
      )}

      <LayeraHeader
        variant="geo-canvas"
        onAddContentClick={openAddContentModal}
        onTestPanelClick={openLivePlayground}
      />

      {/* Pipeline State Debug Info */}
      <PipelineDebugInfo pipelineState={pipelineState} />

      <Box className="layera-map-container layera-margin-top--lg">
        <MapContainer
          className="layera-map--fullscreen"
          initialLat={MAP_DEFAULTS.INITIAL_LAT}
          initialLng={MAP_DEFAULTS.INITIAL_LNG}
          initialZoom={MAP_DEFAULTS.INITIAL_ZOOM}
        />
      </Box>


      {/* Property Type Selection Drawer */}
      <PropertyTypeDrawer
        open={activeDrawer === 'propertyTypeSelection'}
        onClose={closeDrawer}
      />

      {/* App Modals */}
      <AppModals
        activeModal={activeModal}
        closeModal={closeModal}
        handleSelectProperty={handleSelectProperty}
        handleSelectJob={handleSelectJob}
      />

    </Box>
  );
};