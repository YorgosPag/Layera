import React, { useState } from 'react';
import { Modal } from '../Modal';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import type { DialogProps } from '../../types';
import './Dialog.css';

/**
 * Dialog - Preconfigured modal για confirmations και alerts
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  size = 'sm',
  ...modalProps
}) => {
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;

    try {
      setIsConfirmLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Dialog confirm error:', error);
    } finally {
      setIsConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="layera-dialog__icon layera-dialog__icon--success" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="layera-dialog__icon layera-dialog__icon--warning" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="layera-dialog__icon layera-dialog__icon--error" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'question':
        return (
          <svg className="layera-dialog__icon layera-dialog__icon--question" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg className="layera-dialog__icon layera-dialog__icon--info" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'error':
        return 'layera-dialog__button--danger';
      case 'warning':
        return 'layera-dialog__button--warning';
      case 'success':
        return 'layera-dialog__button--success';
      default:
        return 'layera-dialog__button--primary';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={!loading && !isConfirmLoading}
      closeOnEscape={!loading && !isConfirmLoading}
      showCloseButton={false}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      {...modalProps}
    >
      <ModalHeader title={title} showCloseButton={false} />

      <ModalContent padding="lg">
        <div className={`layera-dialog layera-dialog--${type}`}>
          <div className="layera-dialog__icon-container">
            {getTypeIcon()}
          </div>
          <p className="layera-dialog__message" id="dialog-description">
            {message}
          </p>
        </div>
      </ModalContent>

      <ModalFooter align="right">
        <div className="layera-dialog__actions">
          {onCancel && (
            <button
              type="button"
              className="layera-dialog__button layera-dialog__button--ghost"
              onClick={handleCancel}
              disabled={loading || isConfirmLoading}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            className={`layera-dialog__button ${getConfirmButtonClass()}`}
            onClick={handleConfirm}
            disabled={loading || isConfirmLoading}
          >
            {(loading || isConfirmLoading) && (
              <svg className="layera-dialog__spinner" width="16" height="16" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};