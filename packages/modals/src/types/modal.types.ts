import type React from 'react';

/**
 * Modal Types για το Layera Modal System
 */

// Enterprise type alias για consistent ReactNode
type LayeraReactNode = React.ReactNode;

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalVariant = 'default' | 'elevated' | 'centered' | 'sidebar';
export type ModalAnimation = 'fade' | 'slide' | 'scale' | 'none';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: LayeraReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  animation?: ModalAnimation;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
  noOverlay?: boolean;
  draggable?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  // Enterprise: Remove inline style props - use CSS classes only
  // contentStyle?: React.CSSProperties;
  // contentPadding?: string | number;
  // overlayPadding?: string | number;
  // panelPadding?: string | number;
  container?: Element | (() => Element) | null;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface ModalHeaderProps {
  children?: LayeraReactNode;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export interface ModalContentProps {
  children: LayeraReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  scrollable?: boolean;
  className?: string;
}

export interface ModalFooterProps {
  children: LayeraReactNode;
  actions?: LayeraReactNode;
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
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

export interface ModalInstance {
  id: string;
  component: LayeraReactNode;
  props: BaseModalProps;
}