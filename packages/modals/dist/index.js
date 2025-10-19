import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal - Βασικό modal component για το Layera Modal System
 */
const Modal = ({ open, onClose, children, size = 'md', variant = 'default', animation = 'fade', closeOnOverlayClick = true, closeOnEscape = true, showCloseButton = true, preventBodyScroll = true, className = '', overlayClassName = '', 'aria-labelledby': ariaLabelledBy, 'aria-describedby': ariaDescribedBy }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    // Handle ESC key
    useEffect(() => {
        if (!open || !closeOnEscape)
            return;
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);
    // Handle body scroll prevention
    useEffect(() => {
        if (!open || !preventBodyScroll)
            return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [open, preventBodyScroll]);
    // Handle focus management
    useEffect(() => {
        if (!open)
            return;
        const focusableElements = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }, [open]);
    const handleOverlayClick = (event) => {
        if (closeOnOverlayClick && event.target === overlayRef.current) {
            onClose();
        }
    };
    const handleCloseClick = () => {
        onClose();
    };
    if (!open)
        return null;
    const modalClasses = [
        'layera-modal',
        `layera-modal--${size}`,
        `layera-modal--${variant}`,
        `layera-modal--${animation}`,
        className
    ].filter(Boolean).join(' ');
    const overlayClasses = [
        'layera-modal-overlay',
        `layera-modal-overlay--${animation}`,
        overlayClassName
    ].filter(Boolean).join(' ');
    const modalContent = (React.createElement("div", { ref: overlayRef, className: overlayClasses, onClick: handleOverlayClick, role: "dialog", "aria-modal": "true", "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy },
        React.createElement("div", { ref: modalRef, className: modalClasses, role: "document" },
            showCloseButton && (React.createElement("button", { type: "button", className: "layera-modal__close", onClick: handleCloseClick, "aria-label": "Close modal" },
                React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                    React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))),
            children)));
    return createPortal(modalContent, document.body);
};

/**
 * ModalHeader - Header component για modals
 */
const ModalHeader = ({ children, title, subtitle, onClose, showCloseButton = true, className = '' }) => {
    const headerClasses = [
        'layera-modal-header',
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("header", { className: headerClasses },
        React.createElement("div", { className: "layera-modal-header__content" },
            title && (React.createElement("h2", { className: "layera-modal-header__title", id: "modal-title" }, title)),
            subtitle && (React.createElement("p", { className: "layera-modal-header__subtitle" }, subtitle)),
            children),
        showCloseButton && onClose && (React.createElement("button", { type: "button", className: "layera-modal-header__close", onClick: onClose, "aria-label": "Close modal" },
            React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }))))));
};

/**
 * ModalContent - Content container για modals
 */
const ModalContent = ({ children, padding = 'md', scrollable = false, className = '' }) => {
    const contentClasses = [
        'layera-modal-content',
        `layera-modal-content--${padding}`,
        scrollable && 'layera-modal-content--scrollable',
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("div", { className: contentClasses, id: "modal-content" }, children));
};

/**
 * ModalFooter - Footer component για modals
 */
const ModalFooter = ({ children, actions, align = 'right', className = '' }) => {
    const footerClasses = [
        'layera-modal-footer',
        `layera-modal-footer--${align}`,
        className
    ].filter(Boolean).join(' ');
    return (React.createElement("footer", { className: footerClasses },
        React.createElement("div", { className: "layera-modal-footer__content" }, children),
        actions && (React.createElement("div", { className: "layera-modal-footer__actions" }, actions))));
};

/**
 * Modal Constants για το Modal System
 */
const MODAL_ANIMATION_DURATIONS = {
    fast: '1s',
    normal: '2s',
    slow: '3s'
};
const MODAL_SIZES = {
    icon: {
        small: 16,
        medium: 20,
        large: 24,
        xl: 32
    },
    spinner: {
        width: 16,
        height: 16
    }
};
const MODAL_Z_INDEX = {
    modal: 1000,
    overlay: 999
};

/**
 * i18n Keys για το Modal System
 */
const MODAL_I18N_KEYS = {
    // Dialog actions
    OK: 'notifications.ok',
    CANCEL: 'notifications.cancel',
    CONFIRM: 'actions.save',
    CLOSE: 'actions.cancel',
    // Common states
    LOADING: 'notifications.loading',
    ERROR: 'common.error',
    // Accessibility
    CLOSE_MODAL: 'actions.cancel'
};

/**
 * Dialog - Preconfigured modal για confirmations και alerts
 */
const Dialog = ({ open, onClose, title, message, type = 'info', confirmText = 'OK', cancelText = 'Cancel', onConfirm, onCancel, loading = false, size = 'sm', ...modalProps }) => {
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const handleConfirm = async () => {
        if (!onConfirm)
            return;
        try {
            setIsConfirmLoading(true);
            await onConfirm();
            onClose();
        }
        catch (error) {
            console.error('Dialog confirm error:', error);
        }
        finally {
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
                return (React.createElement("svg", { className: "layera-dialog__icon layera-dialog__icon--success", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
                    React.createElement("path", { d: "M9 12l2 2 4-4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" })));
            case 'warning':
                return (React.createElement("svg", { className: "layera-dialog__icon layera-dialog__icon--warning", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
                    React.createElement("path", { d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'error':
                return (React.createElement("svg", { className: "layera-dialog__icon layera-dialog__icon--error", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
                    React.createElement("path", { d: "M12 8v4m0 4h.01", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
            case 'question':
                return (React.createElement("svg", { className: "layera-dialog__icon layera-dialog__icon--question", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
                    React.createElement("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
            default:
                return (React.createElement("svg", { className: "layera-dialog__icon layera-dialog__icon--info", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" },
                    React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
                    React.createElement("path", { d: "M12 8h.01M11 12h1v4h1", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })));
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
    return (React.createElement(Modal, { open: open, onClose: onClose, size: size, closeOnOverlayClick: !loading && !isConfirmLoading, closeOnEscape: !loading && !isConfirmLoading, showCloseButton: false, "aria-labelledby": "dialog-title", "aria-describedby": "dialog-description", ...modalProps },
        React.createElement(ModalHeader, { title: title, showCloseButton: false }),
        React.createElement(ModalContent, { padding: "lg" },
            React.createElement("div", { className: `layera-dialog layera-dialog--${type}` },
                React.createElement("div", { className: "layera-dialog__icon-container" }, getTypeIcon()),
                React.createElement("p", { className: "layera-dialog__message", id: "dialog-description" }, message))),
        React.createElement(ModalFooter, { align: "right" },
            React.createElement("div", { className: "layera-dialog__actions" },
                onCancel && (React.createElement("button", { type: "button", className: "layera-dialog__button layera-dialog__button--ghost", onClick: handleCancel, disabled: loading || isConfirmLoading }, cancelText)),
                React.createElement("button", { type: "button", className: `layera-dialog__button ${getConfirmButtonClass()}`, onClick: handleConfirm, disabled: loading || isConfirmLoading },
                    (loading || isConfirmLoading) && (React.createElement("svg", { className: "layera-dialog__spinner", width: MODAL_SIZES.spinner.width, height: MODAL_SIZES.spinner.height, viewBox: "0 0 24 24" },
                        React.createElement("circle", { cx: "12", cy: "12", r: "10", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeDasharray: "32", strokeDashoffset: "32" },
                            React.createElement("animate", { attributeName: "stroke-dasharray", dur: MODAL_ANIMATION_DURATIONS.normal, values: "0 32;16 16;0 32;0 32", repeatCount: "indefinite" }),
                            React.createElement("animate", { attributeName: "stroke-dashoffset", dur: MODAL_ANIMATION_DURATIONS.normal, values: "0;-16;-32;-32", repeatCount: "indefinite" })))),
                    confirmText)))));
};

const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const open = useCallback(() => {
        setIsOpen(true);
    }, []);
    const close = useCallback(() => {
        setIsOpen(false);
    }, []);
    const toggle = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);
    return {
        isOpen,
        open,
        close,
        toggle
    };
};

export { Dialog, MODAL_ANIMATION_DURATIONS, MODAL_I18N_KEYS, MODAL_SIZES, MODAL_Z_INDEX, Modal, ModalContent, ModalFooter, ModalHeader, useModal };
//# sourceMappingURL=index.js.map
