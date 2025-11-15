import React from 'react';
import { Modal, ModalHeader, ModalContent, AddContentModal } from '@layera/modals';
import { useLayeraTranslation } from '@layera/tolgee';
import LoginContent from './LoginPage';

/**
 * AppModals Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Modal Management ενότητα
 * Γραμμές 175-194 από το αρχικό AppContent.tsx
 */

interface AppModalsProps {
  activeModal: 'login' | 'addContent' | null;
  closeModal: () => void;
  handleSelectProperty: () => void;
  handleSelectJob: () => void;
}

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