import React from "react";
import { ReactNode } from 'react';

/**
 * Modal Types για το Layera Modal System
 */

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalVariant = 'default' | 'elevated' | 'centered' | 'sidebar';
export type ModalAnimation = 'fade' | 'slide' | 'scale' | 'none';

export interface BaseModalProps {
  open: boolean;
  onClose: () => React.ReactNode;
  children: ReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  animation?: ModalAnimation;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  contentPadding?: string | number;
  overlayPadding?: string | number;
  panelPadding?: string | number;
  container?: Element | (() => Element) | null;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface ModalHeaderProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export interface ModalContentProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  scrollable?: boolean;
  className?: string;
}

export interface ModalFooterProps {
  children: ReactNode;
  actions?: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export interface DialogProps extends Omit<BaseModalProps, 'children'> {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success' | 'question';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export interface DrawerProps extends BaseModalProps {
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: string | number;
  height?: string | number;
}

export interface ModalContextState {
  modals: ModalInstance[];
  openModal: (modal: Omit<ModalInstance, 'id'>) => string;
  closeModal: (id: string) => React.ReactNode;
  closeAllModals: () => React.ReactNode;
}

export interface ModalInstance {
  id: string;
  component: ReactNode;
  props: BaseModalProps;
}