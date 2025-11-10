/**
 * State constants for component states and statuses
 */

export const FORM_STATES = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  DISABLED: 'disabled',
  LOADING: 'loading'
} as const;

export const BUTTON_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  ACTIVE: 'active',
  FOCUS: 'focus',
  DISABLED: 'disabled',
  LOADING: 'loading'
} as const;

export const CARD_STATES = {
  DEFAULT: 'default',
  HOVER: 'hover',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  LOADING: 'loading'
} as const;

export const DATA_STATES = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
  IDLE: 'idle'
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified'
} as const;

// Type exports
export type FormState = typeof FORM_STATES[keyof typeof FORM_STATES];
export type ButtonState = typeof BUTTON_STATES[keyof typeof BUTTON_STATES];
export type CardState = typeof CARD_STATES[keyof typeof CARD_STATES];
export type DataState = typeof DATA_STATES[keyof typeof DATA_STATES];
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];