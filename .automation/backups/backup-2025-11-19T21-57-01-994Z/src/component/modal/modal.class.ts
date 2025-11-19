/**
 * 🔲 LAYERA MODAL CLASS - Modal component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το modal component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Modal components
 */

import { MODAL_VARIABLES, ModalSize, ModalPlacement, ModalVariant } from './modal.variables';
import { MODAL_VARIANTS, ModalSizeVariant, ModalTypeVariant, ModalBackdropVariant, ModalHeaderVariant, ModalAnimationVariant } from './modal.variants';

// MODAL COMPONENT SYSTEM CLASS - Enterprise structure
export class ModalComponentSystem {
  // Component tokens
  static readonly variables = MODAL_VARIABLES;
  static readonly variants = MODAL_VARIANTS;

  // Utility methods για validation
  static isValidSize(size: string): size is ModalSize {
    return ['sm', 'md', 'lg', 'xl', 'fullscreen'].includes(size);
  }

  static isValidPlacement(placement: string): placement is ModalPlacement {
    return ['center', 'top', 'bottom'].includes(placement);
  }

  static isValidVariant(variant: string): variant is ModalVariant {
    return ['default', 'dialog', 'drawer'].includes(variant);
  }

  static isValidSizeVariant(size: string): size is ModalSizeVariant {
    return ['sm', 'md', 'lg', 'xl', 'fullscreen'].includes(size);
  }

  static isValidTypeVariant(type: string): type is ModalTypeVariant {
    return ['default', 'dialog', 'drawer'].includes(type);
  }

  static isValidBackdropVariant(backdrop: string): backdrop is ModalBackdropVariant {
    return ['default', 'solid', 'light', 'none'].includes(backdrop);
  }

  static isValidHeaderVariant(header: string): header is ModalHeaderVariant {
    return ['default', 'clean', 'accent'].includes(header);
  }

  static isValidAnimationVariant(animation: string): animation is ModalAnimationVariant {
    return ['scale', 'fade', 'slideUp', 'slideDown'].includes(animation);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για modal
  static getModalCSS(
    size: ModalSize = 'md',
    type: ModalVariant = 'default',
    placement: ModalPlacement = 'center',
    backdrop: ModalBackdropVariant = 'default',
    animation: ModalAnimationVariant = 'scale'
  ) {
    const sizeStyle = this.variants.size[size];
    const typeStyle = this.variants.type[type];
    const backdropStyle = this.variants.backdrop[backdrop];
    const animationStyle = this.variants.animation[animation];

    return {
      // Backdrop styles
      backdropBackground: backdropStyle.background,
      backdropBlur: backdropStyle.blur,
      backdropTransition: backdropStyle.transition,

      // Modal content styles
      width: sizeStyle.width,
      maxWidth: sizeStyle.maxWidth,
      padding: sizeStyle.padding,
      background: typeStyle.background,
      border: typeStyle.border,
      borderRadius: typeStyle.borderRadius,
      boxShadow: typeStyle.shadow,

      // Animation styles
      transform: animationStyle.open,
      transition: animationStyle.transition,

      // Positioning
      position: 'fixed',
      zIndex: this.variables['modal-content-z-index'],
      display: 'flex',
      alignItems: placement === 'center' ? 'center' : placement === 'top' ? 'flex-start' : 'flex-end',
      justifyContent: 'center',

      // Base modal properties
      outline: 'none',
      overflowY: 'auto',
      maxHeight: '90vh',
    };
  }

  // Helper για backdrop CSS
  static getBackdropCSS(backdrop: ModalBackdropVariant = 'default') {
    const backdropStyle = this.variants.backdrop[backdrop];

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: this.variables['modal-backdrop-z-index'],
      background: backdropStyle.background,
      backdropFilter: backdropStyle.blur,
      transition: backdropStyle.transition,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  // Helper για creating CSS classes
  static generateCSSClasses() {
    let css = '';

    // Base modal classes
    css += `
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${this.variables['modal-backdrop-z-index']};
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  z-index: ${this.variables['modal-content-z-index']};
  outline: none;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${this.variables['modal-footer-button-gap']};
  justify-content: ${this.variables['modal-footer-justify']};
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${this.variables['modal-close-size']};
  height: ${this.variables['modal-close-size']};
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: ${this.variables['modal-close-border-radius']};
  color: ${this.variables['modal-close-color']};
  transition: all 150ms ease;
}

.modal-close:hover {
  color: ${this.variables['modal-close-hover-color']};
  background: ${this.variables['modal-close-background-hover']};
}
`;

    // Size classes
    (['sm', 'md', 'lg', 'xl', 'fullscreen'] as const).forEach(size => {
      const sizeStyles = this.variants.size[size];

      if (size === 'fullscreen') {
        css += `
.modal--${size} .modal-content {
  width: ${sizeStyles.width};
  height: ${sizeStyles.height};
  padding: ${sizeStyles.padding};
  max-width: none;
  max-height: none;
  margin: 0;
}
`;
      } else {
        css += `
.modal--${size} .modal-content {
  width: ${sizeStyles.width};
  max-width: ${sizeStyles.maxWidth};
  padding: ${sizeStyles.padding};
}
`;
      }
    });

    // Type classes
    (['default', 'dialog', 'drawer'] as const).forEach(type => {
      const typeStyles = this.variants.type[type];

      css += `
.modal--${type} .modal-content {
  background: ${typeStyles.background};
  border: ${typeStyles.border};
  border-radius: ${typeStyles.borderRadius};
  box-shadow: ${typeStyles.shadow};
}
`;
    });

    // Backdrop classes
    (['default', 'solid', 'light', 'none'] as const).forEach(backdrop => {
      const backdropStyles = this.variants.backdrop[backdrop];

      css += `
.modal-backdrop--${backdrop} {
  background: ${backdropStyles.background};
  backdrop-filter: ${backdropStyles.blur};
  transition: ${backdropStyles.transition};
}
`;
    });

    return css;
  }

  // Helper για focus management
  static getFocusManagementCSS() {
    return `
.modal-content:focus {
  outline: 2px solid var(--layera-color-primary-500);
  outline-offset: 2px;
}
`;
  }

  // Helper για creating React/Vue/Angular component props
  static getComponentProps(
    size: ModalSize = 'md',
    variant: ModalVariant = 'default',
    placement: ModalPlacement = 'center',
    backdrop: ModalBackdropVariant = 'default'
  ) {
    return {
      'data-size': size,
      'data-variant': variant,
      'data-placement': placement,
      'data-backdrop': backdrop,
      className: `modal modal--${size} modal--${variant}`,
      role: 'dialog',
      'aria-modal': 'true',
      tabIndex: -1,
    };
  }
}

// MODAL COMPONENT RULES - Enterprise specifications
export const MODAL_COMPONENT_RULES = {
  // Usage guidelines
  usage: {
    small: 'Confirmations, alerts, simple forms με μικρό περιεχόμενο',
    medium: 'Default size για γενική χρήση, forms, content display',
    large: 'Complex forms, data tables, detailed information',
    xl: 'Rich content, embedded applications, multiple sections',
    fullscreen: 'Mobile experience, immersive content, complex workflows',
  },

  // Accessibility guidelines
  accessibility: {
    focus: 'Auto-focus στο modal content κατά το άνοιγμα',
    keyboard: 'ESC key για κλείσιμο, tab navigation εντός modal',
    aria: 'Proper ARIA attributes (role, aria-modal, aria-labelledby)',
    backdrop: 'Click outside για κλείσιμο (configurable)',
    scrollLock: 'Disable body scroll όταν modal είναι ανοιχτό',
  },

  // UX guidelines
  ux: {
    animations: 'Smooth enter/exit animations για better UX',
    backdrop: 'Semi-transparent backdrop για context awareness',
    positioning: 'Center alignment, responsive behavior',
    stacking: 'Proper z-index για modal stacking',
    responsiveness: 'Mobile-friendly με appropriate sizing',
  },

  // Implementation guidelines
  implementation: {
    portal: 'Render modal στο document body (React Portal)',
    escapeHatch: 'Always provide way to close modal',
    dataAttributes: 'Use data-* attributes για styling hooks',
    lifecycle: 'Proper mount/unmount lifecycle management',
    performance: 'Lazy load modal content όταν είναι δυνατό',
  },

  // Component mapping suggestions
  componentMapping: {
    confirmation: ['sm size', 'dialog type', 'scale animation'],
    form: ['md size', 'default type', 'slideUp animation'],
    content: ['lg size', 'default type', 'fade animation'],
    fullPage: ['fullscreen size', 'drawer type', 'slideUp animation'],
    overlay: ['xl size', 'dialog type', 'scale animation'],
  },
} as const;

// LAYERA-SPECIFIC MODAL CSS CLASSES
export const LAYERA_MODAL_CSS = `
/* 🔲 LAYERA MODAL COMPONENTS */

.layera-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--layera-modal-backdrop-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--layera-modal-backdrop-background);
  backdrop-filter: var(--layera-modal-backdrop-blur);
  transition: var(--layera-modal-backdrop-transition);
}

.layera-modal--no-overlay {
  background: transparent;
  backdrop-filter: none;
}

.layera-modal-content {
  position: relative;
  z-index: var(--layera-modal-content-z-index);
  width: var(--layera-modal-md-width);
  max-width: var(--layera-modal-md-max-width);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  background: var(--layera-modal-content-background);
  border: var(--layera-modal-content-border);
  border-radius: var(--layera-modal-content-border-radius);
  box-shadow: var(--layera-modal-content-shadow);
  color: var(--layera-modal-content-text);
  outline: none;
  overflow: hidden;
  transform: var(--layera-modal-scale-enter);
  transition: var(--layera-modal-content-transition);
}

.layera-modal-content[data-draggable="true"] {
  cursor: move;
}

.layera-modal-content[data-dragging="true"] {
  user-select: none;
  cursor: grabbing;
}

.layera-modal-content[data-no-overlay="true"] {
  position: absolute;
  left: var(--layera-modal-position-x, 50%);
  top: var(--layera-modal-position-y, 50%);
  transform: translate(-50%, -50%);
}

.layera-modal-draggable {
  cursor: move;
}

.layera-modal-close-button {
  position: absolute;
  top: var(--layera-spacing-4);
  right: var(--layera-spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--layera-modal-close-size);
  height: var(--layera-modal-close-size);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: var(--layera-modal-close-border-radius);
  color: var(--layera-modal-close-color);
  transition: all 150ms ease;
  z-index: 10;
}

.layera-modal-close-button:hover {
  color: var(--layera-modal-close-hover-color);
  background: var(--layera-modal-close-background-hover);
}

.layera-modal-close-button:focus {
  outline: 2px solid var(--layera-color-primary-500);
  outline-offset: 2px;
}

/* Modal Sizes */
.layera-modal--sm .layera-modal-content {
  width: var(--layera-modal-sm-width);
  max-width: var(--layera-modal-sm-max-width);
  padding: var(--layera-modal-sm-padding);
}

.layera-modal--md .layera-modal-content {
  width: var(--layera-modal-md-width);
  max-width: var(--layera-modal-md-max-width);
  padding: var(--layera-modal-md-padding);
}

.layera-modal--lg .layera-modal-content {
  width: var(--layera-modal-lg-width);
  max-width: var(--layera-modal-lg-max-width);
  padding: var(--layera-modal-lg-padding);
}

.layera-modal--xl .layera-modal-content {
  width: var(--layera-modal-xl-width);
  max-width: var(--layera-modal-xl-max-width);
  padding: var(--layera-modal-xl-padding);
}

.layera-modal--fullscreen .layera-modal-content {
  width: var(--layera-modal-fullscreen-width);
  height: var(--layera-modal-fullscreen-height);
  max-width: none;
  max-height: none;
  padding: var(--layera-modal-fullscreen-padding);
  border-radius: 0;
}

/* Body scroll lock */
.layera-modal-open {
  overflow: hidden;
}

.layera-scroll-hidden {
  overflow: hidden !important;
}

/* Modal Header */
.layera-modal-header {
  padding: var(--layera-modal-header-padding);
  border-bottom: var(--layera-modal-header-border-bottom);
  background: var(--layera-modal-header-background);
  color: var(--layera-modal-header-text);
  flex-shrink: 0;
}

.layera-modal-title {
  margin: 0;
  font-weight: var(--layera-modal-title-font-weight);
  color: var(--layera-modal-title-color);
}

/* Modal Body */
.layera-modal-body {
  padding: var(--layera-modal-body-padding);
  max-height: var(--layera-modal-body-max-height);
  overflow: var(--layera-modal-body-overflow);
  color: var(--layera-modal-body-color);
  line-height: var(--layera-modal-body-line-height);
  flex: 1;
}

/* Modal Footer */
.layera-modal-footer {
  padding: var(--layera-modal-footer-padding);
  border-top: var(--layera-modal-footer-border-top);
  background: var(--layera-modal-footer-background);
  color: var(--layera-modal-footer-text);
  display: flex;
  align-items: center;
  gap: var(--layera-modal-footer-button-gap);
  justify-content: var(--layera-modal-footer-justify);
  flex-shrink: 0;
}

/* Animation states */
.layera-modal[data-state="opening"] .layera-modal-content {
  transform: var(--layera-modal-scale-open);
}

.layera-modal[data-state="closing"] .layera-modal-content {
  transform: var(--layera-modal-scale-exit);
}

/* Responsive behavior */
@media (max-width: 768px) {
  .layera-modal-content {
    width: 95vw !important;
    max-width: 95vw !important;
    margin: var(--layera-spacing-4);
  }

  .layera-modal--fullscreen .layera-modal-content {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0;
  }
}
`;