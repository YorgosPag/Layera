import React from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import type { TableColumn } from './DataTable';

interface TableBodyProps<T = unknown> {
  data: T[];
  columns: TableColumn<T>[];
  loading: boolean;
  selectable: boolean;
  selectedRows: string[];
  onRowSelect: (rowKey: string, checked: boolean) => React.ReactNode;
  onRowClick?: (row: T, index: number) => void;
  getRowKey: (row: T, index: number) => string;
  emptyState?: React.ReactNode;
}

export const TableBody = <T extends Record<string, unknown>>({
  data,
  columns,
  loading,
  selectable,
  selectedRows,
  onRowSelect,
  onRowClick,
  getRowKey,
  emptyState
}: TableBodyProps<T>) => {
  const { t } = useLayeraTranslation();

  const handleRowCheckboxChange = (rowKey: string, checked: boolean) => {
    onRowSelect(rowKey, checked);
  };

  const handleRowClick = (row: T, index: number, event: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox or other interactive elements
    if ((event.target as HTMLElement).closest('input, button, a')) {
      return;
    }
    onRowClick?.(row, index);
  };

  if (!loading && data.length === 0) {
    return (
      <tbody className="layera-table-body">
        <tr className="layera-table-body__empty-row">
          <td
            colSpan={columns.length + (selectable ? 1 : 0)}
            className="layera-table-body__empty-cell"
          >
            {emptyState || (
              <Box className="layera-table-body__empty-state">
                <Box className="layera-table-body__empty-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M6 10C6 7.79086 7.79086 6 10 6H38C40.2091 6 42 7.79086 42 10V38C42 40.2091 40.2091 42 38 42H10C7.79086 42 6 40.2091 6 38V10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 18H34M14 24H26M14 30H30"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Box>
                <Box className="layera-table-body__empty-title">
                  {t('tables.noData.title')}
                </Box>
                <Box className="layera-table-body__empty-description">
                  {t('tables.noData.description')}
                </Box>
              </Box>
            )}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="layera-table-body">
      {data.map((row, index) => {
        const rowKey = getRowKey(row, index);
        const isSelected = selectedRows.includes(rowKey);

        return (
          <tr
            key={rowKey}
            className={[
              'layera-table-body__row',
              isSelected && 'layera-table-body__row--selected',
              onRowClick && 'layera-table-body__row--clickable'
            ].filter(Boolean).join(' ')}
            onClick={onRowClick ? (e: React.FormEvent<HTMLFormElement>) => handleRowClick(row, index, e) : undefined}
          >
            {selectable && (
              <td className="layera-table-body__cell layera-table-body__cell--checkbox">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e: React.FormEvent<HTMLFormElement>) => handleRowCheckboxChange(rowKey, e.target.checked)}
                  aria-label={t('tables.selectRow', { index: index + 1 })}
                  className="layera-table-body__checkbox"
                />
              </td>
            )}

            {columns.map((column: unknown) => {
              const value = row[column.key];
              const cellContent = column.render
                ? column.render(value, row, index)
                : String(value || '');

              return (
                <td
                  key={column.key}
                  className={[
                    'layera-table-body__cell',
                    column.align && `layera-table-body__cell--${column.align}`,
                    column.fixed && `layera-table-body__cell--fixed-${column.fixed}`
                  ].filter(Boolean).join(' ')}
                  width={column.width}
                  minWidth={column.minWidth}
                  maxWidth={column.maxWidth}
                >
                  <Box className="layera-table-body__content">
                    {cellContent}
                  </Box>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};