import React, { useState, useMemo } from 'react';
import {
  TABLE_VARIANTS,
  TABLE_DENSITIES,
  SORT_DIRECTIONS,
  PAGINATION_SIZES,
  type TableVariant,
  type TableDensity,
  type SortDirection,
  type PaginationSize
} from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableToolbar } from './TableToolbar';
import './DataTable.css';

export interface TableColumn<T = unknown> {
  key: string;
  title: string;
  titleKey?: string;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
}

export interface DataTableProps<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  variant?: TableVariant;
  density?: TableDensity;
  selectable?: boolean;
  selectedRows?: string[];
  onSelectionChange?: (selectedRows: string[]) => void;
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string, direction: SortDirection) => void;
  pagination?: {
    page: number;
    pageSize: PaginationSize;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: PaginationSize) => void;
  };
  searchable?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  bulkActions?: React.ReactNode;
  toolbar?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  rowKey?: string | ((row: T) => string);
  onRowClick?: (row: T, index: number) => void;
}

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  variant = TABLE_VARIANTS.DEFAULT,
  density = TABLE_DENSITIES.NORMAL,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortBy,
  sortDirection = SORT_DIRECTIONS.NONE,
  onSort,
  pagination,
  searchable = false,
  searchValue = '',
  onSearch,
  bulkActions,
  toolbar,
  emptyState,
  className = '',
  rowKey = 'id',
  onRowClick
}: DataTableProps<T>) => {
  const { t } = useLayeraTranslation();
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);

  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    return String(row[rowKey] || index);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;

    if (checked) {
      const allKeys = data.map((row, index) => getRowKey(row, index));
      onSelectionChange(allKeys);
    } else {
      onSelectionChange([]);
    }
  };

  const handleRowSelect = (rowKey: string, checked: boolean) => {
    if (!onSelectionChange) return;

    const newSelection = checked
      ? [...selectedRows, rowKey]
      : selectedRows.filter(key => key !== rowKey);

    onSelectionChange(newSelection);
  };

  const handleSort = (key: string) => {
    if (!onSort) return;

    let newDirection: SortDirection = SORT_DIRECTIONS.ASC;

    if (sortBy === key) {
      if (sortDirection === SORT_DIRECTIONS.ASC) {
        newDirection = SORT_DIRECTIONS.DESC;
      } else if (sortDirection === SORT_DIRECTIONS.DESC) {
        newDirection = SORT_DIRECTIONS.NONE;
      }
    }

    onSort(key, newDirection);
  };

  const handleSearch = (value: string) => {
    setInternalSearchValue(value);
    onSearch?.(value);
  };

  const tableClasses = [
    'layera-data-table',
    `layera-data-table--${variant}`,
    `layera-data-table--${density}`,
    loading && 'layera-data-table--loading',
    className
  ].filter(Boolean).join(' ');

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  return (
    <div className={tableClasses}>
      {(searchable || toolbar || bulkActions) && (
        <TableToolbar
          searchable={searchable}
          searchValue={internalSearchValue}
          onSearch={handleSearch}
          selectedCount={selectedRows.length}
          totalCount={data.length}
          bulkActions={bulkActions}
          toolbar={toolbar}
        />
      )}

      <div className="layera-data-table__container">
        <table className="layera-data-table__table">
          <TableHeader
            columns={columns}
            selectable={selectable}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <TableBody
            data={data}
            columns={columns}
            loading={loading}
            selectable={selectable}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onRowClick={onRowClick}
            getRowKey={getRowKey}
            emptyState={emptyState}
          />
        </table>

        {loading && (
          <div className="layera-data-table__loading-overlay">
            <div className="layera-data-table__loading-spinner">
              <div className="layera-spinner" />
            </div>
          </div>
        )}
      </div>

      {pagination && (
        <TablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
        />
      )}
    </div>
  );
};