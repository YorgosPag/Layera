/**
 * i18n Keys για το Error Boundary System
 */

export const ERROR_I18N_KEYS = {
  // Network errors
  NETWORK_TITLE: 'errors.networkError',
  NETWORK_MESSAGE: 'errors.networkError',
  NETWORK_RETRY: 'notifications.retry',

  // Chunk errors
  CHUNK_TITLE: 'notifications.loading',
  CHUNK_MESSAGE: 'errors.unknownError',
  CHUNK_RETRY: 'notifications.tryAgain',

  // Page level errors
  PAGE_TITLE: 'common.error',
  PAGE_MESSAGE: 'errors.unknownError',

  // Section level errors
  SECTION_TITLE: 'common.error',
  SECTION_MESSAGE: 'errors.unknownError',

  // Component level errors
  COMPONENT_TITLE: 'notifications.somethingWentWrong',
  COMPONENT_MESSAGE: 'errors.unknownError',

  // Generic retry
  GENERIC_RETRY: 'notifications.tryAgain',

  // Development
  SHOW_DETAILS: 'actions.manage',
  HIDE_DETAILS: 'actions.cancel'
} as const;