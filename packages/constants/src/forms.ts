/**
 * Form-related constants - HTML input types and form field types
 */

export const FORM_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password', // HTML input type="password"
  TEL: 'tel',
  URL: 'url',
  NUMBER: 'number',
  DATE: 'date',
  DATETIME_LOCAL: 'datetime-local',
  TIME: 'time',
  SEARCH: 'search',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file'
} as const;

export const INPUT_VARIANTS = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
  FILLED: 'filled',
  GHOST: 'ghost',
  UNDERLINE: 'underline'
} as const;

export const VALIDATION_RULES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  EMAIL: 'email',
  URL: 'url',
  NUMBER: 'number',
  MIN: 'min',
  MAX: 'max',
  CUSTOM: 'custom'
} as const;

export const AUTOCOMPLETE_VALUES = {
  OFF: 'off',
  ON: 'on',
  NAME: 'name',
  EMAIL: 'email',
  USERNAME: 'username',
  NEW_PASSWORD: 'new-password', // HTML autocomplete="new-password"
  CURRENT_PASSWORD: 'current-password', // HTML autocomplete="current-password"
  PHONE: 'tel',
  ORGANIZATION: 'organization',
  STREET_ADDRESS: 'street-address',
  COUNTRY: 'country',
  POSTAL_CODE: 'postal-code'
} as const;

export const FIELD_SIZES = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  FULL: 'full'
} as const;

/**
 * Form Validation Constants
 */
export const FORM_VALIDATION = {
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  EMAIL_MAX: 254,
  TEXT_MAX: 500,
  TEXTAREA_MAX: 2000,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
} as const;

// Type exports
export type FormType = typeof FORM_TYPES[keyof typeof FORM_TYPES];
export type InputVariant = typeof INPUT_VARIANTS[keyof typeof INPUT_VARIANTS];
export type ValidationRule = typeof VALIDATION_RULES[keyof typeof VALIDATION_RULES];
export type AutocompleteValue = typeof AUTOCOMPLETE_VALUES[keyof typeof AUTOCOMPLETE_VALUES];
export type FieldSize = typeof FIELD_SIZES[keyof typeof FIELD_SIZES];