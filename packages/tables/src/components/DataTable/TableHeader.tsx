import React from 'react';
import { SORT_DIRECTIONS, type SortDirection } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';
import type { TableColumn } from './DataTable';

interface TableHeaderProps<T = unknown> {
  columns: TableColumn<T>[];
  selectable: boolean;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sortBy?: string;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
}

export const TableHeader = <T,>({
  columns,
  selectable,
  allSelected,
  someSelected,
  onSelectAll,
  sortBy,
  sortDirection,
  onSort
}: TableHeaderProps<T>) => {
  const { t } = useLayeraTranslation();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll(e.target.checked);
  };

  const getSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="layera-table-header__sort-icon">
          <path d="M6 2L9 5H3L6 2Z" fill="currentColor" opacity="0.3" />
          <path d="M6 10L3 7H9L6 10Z" fill="currentColor" opacity="0.3" />
        </svg>
      );
    }

    if (sortDirection === SORT_DIRECTIONS.ASC) {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="layera-table-header__sort-icon layera-table-header__sort-icon--active">
          <path d="M6 2L9 5H3L6 2Z" fill="currentColor" />
          <path d="M6 10L3 7H9L6 10Z" fill="currentColor" opacity="0.3" />
        </svg>
      );
    }

    if (sortDirection === SORT_DIRECTIONS.DESC) {
      return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="layera-table-header__sort-icon layera-table-header__sort-icon--active">
          <path d="M6 2L9 5H3L6 2Z" fill="currentColor" opacity="0.3" />
          <path d="M6 10L3 7H9L6 10Z" fill="currentColor" />
        </svg>
      );
    }

    return null;
  };

  return (
    <thead className="layera-table-header">
      <tr className="layera-table-header__row">
        {selectable && (
          <th className="layera-table-header__cell layera-table-header__cell--checkbox">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={handleCheckboxChange}
              aria-label={allSelected ? t('tables.selectNone') : t('tables.selectAll')}
              className="layera-table-header__checkbox"
            />
          </th>
        )}

        {columns.map((column) => {
          const resolvedTitle = column.titleKey ? t(column.titleKey) : column.title;

          return (
            <th
              key={column.key}
              className={[
                'layera-table-header__cell',
                column.sortable && 'layera-table-header__cell--sortable',
                column.align && `layera-table-header__cell--${column.align}`,
                column.fixed && `layera-table-header__cell--fixed-${column.fixed}`
              ].filter(Boolean).join(' ')}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth
              }}
              onClick={column.sortable ? () => onSort(column.key) : undefined}
            >
              <div className="layera-table-header__content">
                {column.headerRender ? column.headerRender() : (
                  <>
                    <span className="layera-table-header__title">
                      {resolvedTitle}
                    </span>
                    {column.sortable && getSortIcon(column.key)}
                  </>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};