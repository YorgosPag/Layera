/**
 * Modal Constants για το Modal System
 */

export const MODAL_ANIMATION_DURATIONS = {
  fast: '1s',
  normal: '2s',
  slow: '3s'
} as const;

export const MODAL_SIZES = {
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
} as const;

export const MODAL_Z_INDEX = {
  modal: 1000,
  overlay: 999
} as const;