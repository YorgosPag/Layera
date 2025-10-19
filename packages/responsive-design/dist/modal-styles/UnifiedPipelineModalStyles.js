/**
 * @layera/responsive-design - Enterprise LEGO System
 * UnifiedPipelineModal Responsive Styles - Separated by Device
 * Single Source of Truth για modal styling σε κάθε device
 */
import { LAYERA_DEVICE_QUERIES } from '../breakpoints';
export const UNIFIED_PIPELINE_MODAL_STYLES = {
    // Base styles - Shared across all devices
    base: {
        overlay: {
            zIndex: 'var(--layera-z-map-overlay-5)',
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            pointerEvents: 'auto'
        },
        modal: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--layera-bg-primary, #ffffff)',
            borderRadius: '12px',
            boxSizing: 'border-box',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        card: {
            border: '2px solid hsl(210 100% 50%)',
            borderRadius: '8px',
            backgroundColor: 'var(--layera-bg-primary, #ffffff)',
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
            cursor: 'pointer',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch'
        }
    },
    // Mobile-specific styles (0-767px)
    mobile: {
        modal: {
            width: '100%',
            maxWidth: '320px',
            fontSize: '0.75rem',
            padding: '0.75rem',
            maxHeight: 'calc(100vh - 2rem)'
        },
        card: {
            margin: '0.4rem 0',
            padding: '0.6rem',
            minHeight: '80px'
        },
        title: {
            fontSize: '0.85rem',
            lineHeight: '1.3',
            marginBottom: '0.3rem'
        },
        text: {
            fontSize: '0.65rem',
            lineHeight: '1.4',
            minHeight: '28px'
        },
        icon: {
            width: '20px',
            height: '20px'
        }
    },
    // Tablet-specific styles (768-1023px)
    tablet: {
        modal: {
            width: '100%',
            maxWidth: '320px',
            fontSize: '0.75rem',
            padding: '0.75rem',
            maxHeight: 'calc(100vh - 2rem)'
        },
        card: {
            margin: '0.4rem 0',
            padding: '0.6rem',
            minHeight: '80px'
        },
        title: {
            fontSize: '0.85rem',
            lineHeight: '1.3',
            marginBottom: '0.3rem'
        },
        text: {
            fontSize: '0.65rem',
            lineHeight: '1.4',
            minHeight: '28px'
        },
        icon: {
            width: '20px',
            height: '20px'
        }
    },
    // Desktop-specific styles (1024-1439px)
    desktop: {
        modal: {
            width: '100%',
            maxWidth: '280px', // Smaller για desktop
            fontSize: '0.7rem', // Smaller font
            padding: '0.6rem', // Less padding
            maxHeight: 'calc(100vh - 2rem)'
        },
        card: {
            margin: '0.3rem 0', // Less margin
            padding: '0.5rem', // Less padding
            minHeight: '70px' // Shorter cards
        },
        title: {
            fontSize: '0.8rem', // Smaller title
            lineHeight: '1.3',
            marginBottom: '0.25rem'
        },
        text: {
            fontSize: '0.6rem', // Smaller text
            lineHeight: '1.4',
            minHeight: '24px' // Less min height
        },
        icon: {
            width: '18px', // Smaller icons
            height: '18px'
        }
    },
    // Large Desktop-specific styles (1440px+)
    desktopLarge: {
        modal: {
            width: '100%',
            maxWidth: '260px', // Even smaller για large screens
            fontSize: '0.65rem',
            padding: '0.5rem',
            maxHeight: 'calc(100vh - 2rem)'
        },
        card: {
            margin: '0.25rem 0',
            padding: '0.45rem',
            minHeight: '65px'
        },
        title: {
            fontSize: '0.75rem',
            lineHeight: '1.3',
            marginBottom: '0.2rem'
        },
        text: {
            fontSize: '0.55rem',
            lineHeight: '1.4',
            minHeight: '22px'
        },
        icon: {
            width: '16px',
            height: '16px'
        }
    }
};
export const generateModalCSS = (zIndex) => {
    const styles = UNIFIED_PIPELINE_MODAL_STYLES;
    return `
    /* Base Modal Styles - All Devices */
    .unified-pipeline-modal-overlay {
      z-index: ${zIndex.MAP_OVERLAY + 5} !important;
      position: ${styles.base.overlay.position} !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      display: block !important;
      background-color: ${styles.base.overlay.backgroundColor} !important;
      pointer-events: ${styles.base.overlay.pointerEvents} !important;
    }

    .unified-pipeline-modal {
      z-index: ${zIndex.MAP_MODAL + 10} !important;
      position: ${styles.base.modal.position} !important;
      top: ${styles.base.modal.top} !important;
      left: ${styles.base.modal.left} !important;
      transform: ${styles.base.modal.transform} !important;
      background-color: ${styles.base.modal.backgroundColor} !important;
      border-radius: ${styles.base.modal.borderRadius} !important;
      box-sizing: ${styles.base.modal.boxSizing} !important;
      box-shadow: ${styles.base.modal.boxShadow} !important;
      overflow-y: ${styles.base.modal.overflowY} !important;
      overflow-x: ${styles.base.modal.overflowX} !important;
    }

    /* Mobile Styles */
    ${LAYERA_DEVICE_QUERIES.mobileOnly} {
      .unified-pipeline-modal {
        width: ${styles.mobile.modal.width} !important;
        max-width: ${styles.mobile.modal.maxWidth} !important;
        font-size: ${styles.mobile.modal.fontSize} !important;
        padding: ${styles.mobile.modal.padding} !important;
        max-height: ${styles.mobile.modal.maxHeight} !important;
      }

      .unified-pipeline-modal .layera-unified-card {
        margin: ${styles.mobile.card.margin} !important;
        padding: ${styles.mobile.card.padding} !important;
        min-height: ${styles.mobile.card.minHeight} !important;
      }

      .unified-pipeline-modal .card-title {
        font-size: ${styles.mobile.title.fontSize} !important;
        line-height: ${styles.mobile.title.lineHeight} !important;
        margin-bottom: ${styles.mobile.title.marginBottom} !important;
      }

      .unified-pipeline-modal .card-text {
        font-size: ${styles.mobile.text.fontSize} !important;
        line-height: ${styles.mobile.text.lineHeight} !important;
        min-height: ${styles.mobile.text.minHeight} !important;
      }

      .unified-pipeline-modal svg,
      .unified-pipeline-modal .layera-icon {
        width: ${styles.mobile.icon.width} !important;
        height: ${styles.mobile.icon.height} !important;
      }
    }

    /* Tablet Styles */
    ${LAYERA_DEVICE_QUERIES.tabletOnly} {
      .unified-pipeline-modal {
        width: ${styles.tablet.modal.width} !important;
        max-width: ${styles.tablet.modal.maxWidth} !important;
        font-size: ${styles.tablet.modal.fontSize} !important;
        padding: ${styles.tablet.modal.padding} !important;
        max-height: ${styles.tablet.modal.maxHeight} !important;
      }

      .unified-pipeline-modal .layera-unified-card {
        margin: ${styles.tablet.card.margin} !important;
        padding: ${styles.tablet.card.padding} !important;
        min-height: ${styles.tablet.card.minHeight} !important;
      }

      .unified-pipeline-modal .card-title {
        font-size: ${styles.tablet.title.fontSize} !important;
        line-height: ${styles.tablet.title.lineHeight} !important;
        margin-bottom: ${styles.tablet.title.marginBottom} !important;
      }

      .unified-pipeline-modal .card-text {
        font-size: ${styles.tablet.text.fontSize} !important;
        line-height: ${styles.tablet.text.lineHeight} !important;
        min-height: ${styles.tablet.text.minHeight} !important;
      }

      .unified-pipeline-modal svg,
      .unified-pipeline-modal .layera-icon {
        width: ${styles.tablet.icon.width} !important;
        height: ${styles.tablet.icon.height} !important;
      }
    }

    /* Desktop Styles */
    ${LAYERA_DEVICE_QUERIES.desktopOnly} {
      .unified-pipeline-modal {
        width: ${styles.desktop.modal.width} !important;
        max-width: ${styles.desktop.modal.maxWidth} !important;
        font-size: ${styles.desktop.modal.fontSize} !important;
        padding: ${styles.desktop.modal.padding} !important;
        max-height: ${styles.desktop.modal.maxHeight} !important;
      }

      .unified-pipeline-modal .layera-unified-card {
        margin: ${styles.desktop.card.margin} !important;
        padding: ${styles.desktop.card.padding} !important;
        min-height: ${styles.desktop.card.minHeight} !important;
      }

      .unified-pipeline-modal .card-title {
        font-size: ${styles.desktop.title.fontSize} !important;
        line-height: ${styles.desktop.title.lineHeight} !important;
        margin-bottom: ${styles.desktop.title.marginBottom} !important;
      }

      .unified-pipeline-modal .card-text {
        font-size: ${styles.desktop.text.fontSize} !important;
        line-height: ${styles.desktop.text.lineHeight} !important;
        min-height: ${styles.desktop.text.minHeight} !important;
      }

      .unified-pipeline-modal svg,
      .unified-pipeline-modal .layera-icon {
        width: ${styles.desktop.icon.width} !important;
        height: ${styles.desktop.icon.height} !important;
      }
    }

    /* Large Desktop Styles */
    ${LAYERA_DEVICE_QUERIES.desktopLargeOnly} {
      .unified-pipeline-modal {
        width: ${styles.desktopLarge.modal.width} !important;
        max-width: ${styles.desktopLarge.modal.maxWidth} !important;
        font-size: ${styles.desktopLarge.modal.fontSize} !important;
        padding: ${styles.desktopLarge.modal.padding} !important;
        max-height: ${styles.desktopLarge.modal.maxHeight} !important;
      }

      .unified-pipeline-modal .layera-unified-card {
        margin: ${styles.desktopLarge.card.margin} !important;
        padding: ${styles.desktopLarge.card.padding} !important;
        min-height: ${styles.desktopLarge.card.minHeight} !important;
      }

      .unified-pipeline-modal .card-title {
        font-size: ${styles.desktopLarge.title.fontSize} !important;
        line-height: ${styles.desktopLarge.title.lineHeight} !important;
        margin-bottom: ${styles.desktopLarge.title.marginBottom} !important;
      }

      .unified-pipeline-modal .card-text {
        font-size: ${styles.desktopLarge.text.fontSize} !important;
        line-height: ${styles.desktopLarge.text.lineHeight} !important;
        min-height: ${styles.desktopLarge.text.minHeight} !important;
      }

      .unified-pipeline-modal svg,
      .unified-pipeline-modal .layera-icon {
        width: ${styles.desktopLarge.icon.width} !important;
        height: ${styles.desktopLarge.icon.height} !important;
      }
    }

    /* Base Card Styles - All Devices */
    .unified-pipeline-modal .layera-unified-card {
      border: ${styles.base.card.border} !important;
      border-radius: ${styles.base.card.borderRadius} !important;
      background-color: ${styles.base.card.backgroundColor} !important;
      transition: ${styles.base.card.transition} !important;
      cursor: ${styles.base.card.cursor} !important;
      box-sizing: ${styles.base.card.boxSizing} !important;
      overflow: ${styles.base.card.overflow} !important;
      display: ${styles.base.card.display} !important;
      flex-direction: ${styles.base.card.flexDirection} !important;
      justify-content: ${styles.base.card.justifyContent} !important;
      align-items: ${styles.base.card.alignItems} !important;
    }

    .unified-pipeline-modal .layera-unified-card:hover {
      border-color: hsl(210 100% 45%) !important;
      background-color: hsl(210 80% 85%) !important;
    }
  `;
};
