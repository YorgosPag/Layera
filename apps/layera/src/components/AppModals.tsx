import React from 'react';
import { Modal, ModalHeader, ModalContent, AddContentModal } from '@layera/modals';
import { useLayeraTranslation } from '@layera/tolgee';
import { AppModalsProps } from '../types/unified-interfaces';
import LoginContent from './LoginPage';

/**
 * AppModals Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Modal Management ενότητα
 * Γραμμές 175-194 από το αρχικό AppContent.tsx
 * Props interface moved to unified-interfaces.ts
 */

export const AppModals: React.FC<AppModalsProps> = ({
  activeModal,
  closeModal,
  handleSelectProperty,
  handleSelectJob
}) => {
  const { t } = useLayeraTranslation();

  return (
    <>
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
    </>
  );
};