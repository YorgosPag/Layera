import React, { useState, useEffect } from 'react';
import { Box, LayeraHeader } from '../../../../packages/layout/src';
import { MapContainer } from '@layera/map-core';
import { PipelineDiscovery, type PipelineState } from '@layera/pipelines';
import { LivePlayground } from './LivePlayground';
import { PropertyTypeDrawer } from './PropertyTypeDrawer';
import { PipelineDebugInfo } from './PipelineDebugInfo';
import { AppModals } from './AppModals';
// import { Colors, PRIMARY_COLORS } from '../../../../packages/tokens/src/colors';

import { MAP_DEFAULTS } from '../constants/dev-config';

export const AppContent: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'propertyTypeSelection' | null>(null);
  const [activeModal, setActiveModal] = useState<'login' | 'addContent' | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [pipelineState, setPipelineState] = useState<PipelineState | null>(null);

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
          // Could not copy to clipboard
        }
      }
    } catch (error) {
      // Error in changeTestColor
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
        // Error in color change
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
    <Box className="layera-layout layera-bg-primary">
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

      {/* 🎯 TEST: Colors + Spacing tokens - ΜΟΝΟ CSS CUSTOM PROPERTIES */}
      <Box
        className="layera-layout layera-test-colors-box"
      >
        🎯 COLORS + SPACING TOKENS!
        <br />
        <small className="layera-margin-top-small">
          Χρώματα & Spacing από tokens!
        </small>
      </Box>

      {/* 🗺️ MAP με νέα layout tokens - DEBUG MODE */}
      <Box
        className="layera-layout layera-map-container"
      >
        <MapContainer
          className="layera-map--fullscreen layera-map-base"
          initialLat={MAP_DEFAULTS.CENTER[0]}
          initialLng={MAP_DEFAULTS.CENTER[1]}
          initialZoom={MAP_DEFAULTS.ZOOM}
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