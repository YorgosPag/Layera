import React, { useState } from 'react';
import { CheckIcon, AlertTriangleIcon } from '@layera/icons';
import { Box } from '@layera/layout';
import { Modal } from '../Modal';
import { ModalHeader } from '../ModalHeader';
import { ModalContent } from '../ModalContent';
import { ModalFooter } from '../ModalFooter';
import { MODAL_ANIMATION_DURATIONS, MODAL_SIZES } from '../../constants';
import type { DialogProps } from '../../types';
// Enterprise: Using @layera/tokens CSS system instead of manual .css imports
// import './Dialog.css';

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
    const iconProps = { size: "md" as const, className: `layera-dialog__icon layera-dialog__icon--${type}` };

    switch (type) {
      case 'success':
        return <CheckIcon {...iconProps} theme="success" />;
      case 'warning':
        return <AlertTriangleIcon {...iconProps} theme="warning" />;
      case 'error':
        return <AlertTriangleIcon {...iconProps} theme="danger" />;
      case 'question':
        // Προσωρινό fallback στο AlertTriangle μέχρι να προστεθεί HelpIcon
        return <AlertTriangleIcon {...iconProps} theme="neutral" />;
      default: // info
        // Προσωρινό fallback μέχρι να προστεθεί InfoIcon
        return <CheckIcon {...iconProps} theme="primary" />;
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
      <ModalHeader title={title} showCloseButton={false}>
        {/* Header for dialog */}
      </ModalHeader>

      <ModalContent padding="lg">
        <Box className={`layera-dialog layera-dialog--${type}`}>
          <Box className="layera-dialog__icon-container">
            {getTypeIcon()}
          </Box>
          <p className="layera-dialog__message" id="dialog-description">
            {message}
          </p>
        </Box>
      </ModalContent>

      <ModalFooter align="right">
        <Box className="layera-dialog__actions">
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
              <svg className="layera-dialog__spinner" width={MODAL_SIZES.spinner.width} height={MODAL_SIZES.spinner.height} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="32">
                  <animate attributeName="stroke-dasharray" dur={MODAL_ANIMATION_DURATIONS.normal} values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                  <animate attributeName="stroke-dashoffset" dur={MODAL_ANIMATION_DURATIONS.normal} values="0;-16;-32;-32" repeatCount="indefinite"/>
                </circle>
              </svg>
            )}
            {confirmText}
          </button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};