/**
 * Table and data grid constants
 */

export const TABLE_VARIANTS = {
  DEFAULT: 'default',
  STRIPED: 'striped',
  BORDERED: 'bordered',
  BORDERLESS: 'borderless',
  COMPACT: 'compact',
  SPACIOUS: 'spacious'
} as const;

export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none'
} as const;

export const FILTER_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  DATE: 'date',
  DATE_RANGE: 'dateRange',
  NUMBER: 'number',
  NUMBER_RANGE: 'numberRange',
  BOOLEAN: 'boolean',
  CUSTOM: 'custom'
} as const;

export const COLUMN_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
  BADGE: 'badge',
  AVATAR: 'avatar',
  ACTIONS: 'actions',
  LINK: 'link',
  CUSTOM: 'custom'
} as const;

export const TABLE_DENSITIES = {
  COMPACT: 'compact',
  NORMAL: 'normal',
  COMFORTABLE: 'comfortable'
} as const;

export const PAGINATION_SIZES = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 100
} as const;

export const BULK_ACTIONS = {
  SELECT_ALL: 'selectAll',
  SELECT_NONE: 'selectNone',
  SELECT_PAGE: 'selectPage',
  EXPORT: 'export',
  DELETE: 'delete',
  ARCHIVE: 'archive',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate'
} as const;

export const EXPORT_FORMATS = {
  CSV: 'csv',
  EXCEL: 'xlsx',
  PDF: 'pdf',
  JSON: 'json'
} as const;

// Type exports
export type TableVariant = typeof TABLE_VARIANTS[keyof typeof TABLE_VARIANTS];
export type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];
export type FilterType = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];
export type ColumnType = typeof COLUMN_TYPES[keyof typeof COLUMN_TYPES];
export type TableDensity = typeof TABLE_DENSITIES[keyof typeof TABLE_DENSITIES];
export type PaginationSize = typeof PAGINATION_SIZES[keyof typeof PAGINATION_SIZES];
export type BulkAction = typeof BULK_ACTIONS[keyof typeof BULK_ACTIONS];
export type ExportFormat = typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS];