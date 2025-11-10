import React, { useState } from 'react';
import { Box, LayeraHeader, HeaderActionsGroup } from '../../../packages/layout/src';
import { MapContainer } from '@layera/map-core';
import { Modal, ModalHeader, ModalContent } from '@layera/modals';
import { ThemeSwitcher, ThemeProvider } from '../../../packages/theme-switcher/src';
import { BuildingIcon, BriefcaseIcon, UserIcon } from '../../../packages/icons/src';
import RealEstateContent from './components/RealEstatePage';
import JobsContent from './components/JobsPage';
import LoginContent from './components/LoginPage';

function App() {
  const [activeModal, setActiveModal] = useState<'realEstate' | 'jobs' | 'login' | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const openModal = (modalType: 'realEstate' | 'jobs' | 'login') => {
    setActiveModal(modalType);
  };


  return (
    <ThemeProvider>
      <Box style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}>
          <LayeraHeader
            title="Layera"
            subtitle="Ενοποιημένη πλατφόρμα για Ακίνητα και Εργασία"
            variant="standard"
            className="layera-header--fixed"
            navigation={
              <HeaderActionsGroup>
                <button
                  onClick={() => openModal('realEstate')}
                  className="layera-nav-button la-btn-outline"
                  type="button"
                >
                  <BuildingIcon size="md" />
                  <span>Ακίνητα</span>
                </button>
                <button
                  onClick={() => openModal('jobs')}
                  className="layera-nav-button la-btn-outline"
                  type="button"
                >
                  <BriefcaseIcon size="md" />
                  <span>Εργασία</span>
                </button>
              </HeaderActionsGroup>
            }
            actions={
              <HeaderActionsGroup>
                <ThemeSwitcher
                  variant="icon"
                  size="md"
                  aria-label="Αλλαγή θέματος"
                />
                <button
                  onClick={() => openModal('login')}
                  className="layera-login-button la-btn-icon"
                  type="button"
                  aria-label="Είσοδος / Εγγραφή"
                >
                  <UserIcon size="lg" />
                </button>
              </HeaderActionsGroup>
            }
          />

        <Box style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <MapContainer
            className="layera-map--fullscreen"
            initialLat={37.9755}
            initialLng={23.7348}
            initialZoom={13}
          />
        </Box>

        <Modal
          open={activeModal === 'realEstate'}
          onClose={closeModal}
          size="lg"
          aria-labelledby="real-estate-title"
        >
          <ModalHeader title="Ακίνητα" />
          <ModalContent>
            <RealEstateContent />
          </ModalContent>
        </Modal>

        <Modal
          open={activeModal === 'jobs'}
          onClose={closeModal}
          size="lg"
          aria-labelledby="jobs-title"
        >
          <ModalHeader title="Εργασία" />
          <ModalContent>
            <JobsContent />
          </ModalContent>
        </Modal>

        <Modal
          open={activeModal === 'login'}
          onClose={closeModal}
          size="md"
          aria-labelledby="login-title"
        >
          <ModalHeader title="Είσοδος / Εγγραφή" />
          <ModalContent>
            <LoginContent />
          </ModalContent>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default App;