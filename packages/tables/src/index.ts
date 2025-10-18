/**
 * @layera/tables
 * Enterprise data table components with sorting, filtering, pagination, and bulk actions
 */

// Components
export { DataTable } from './components/DataTable/DataTable';
export type { DataTableProps, TableColumn } from './components/DataTable/DataTable';

export { TableHeader } from './components/DataTable/TableHeader';
export { TableBody } from './components/DataTable/TableBody';
export { TableToolbar } from './components/DataTable/TableToolbar';
export { TablePagination } from './components/DataTable/TablePagination';

// Re-export relevant constants
export {
  TABLE_VARIANTS,
  TABLE_DENSITIES,
  SORT_DIRECTIONS,
  FILTER_TYPES,
  COLUMN_TYPES,
  PAGINATION_SIZES,
  BULK_ACTIONS,
  EXPORT_FORMATS,
  TABLE_COLUMN_WIDTHS,
  type TableVariant,
  type TableDensity,
  type SortDirection,
  type FilterType,
  type ColumnType,
  type PaginationSize,
  type BulkAction,
  type ExportFormat,
  type TableColumnWidth
} from '@layera/constants';

// Version
export const LAYERA_TABLES_VERSION = '1.0.0';