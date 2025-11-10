import React from 'react';
import { PAGINATION_SIZES, type PaginationSize } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';

interface TablePaginationProps {
  page: number;
  pageSize: PaginationSize;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: PaginationSize) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange
}) => {
  const { t } = useLayeraTranslation();

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value) as PaginationSize);
  };

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, page - 2);
      const end = Math.min(totalPages, page + 2);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (total === 0) return null;

  return (
    <Box className="layera-table-pagination">
      <Box className="layera-table-pagination__info">
        <span className="layera-table-pagination__results">
          {t('tables.pagination.showing', {
            start: startIndex,
            end: endIndex,
            total
          })}
        </span>

        <Box className="layera-table-pagination__page-size">
          <label htmlFor="page-size" className="layera-table-pagination__page-size-label">
            {t('tables.pagination.itemsPerPage')}:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="layera-table-pagination__page-size-select"
          >
            {Object.values(PAGINATION_SIZES).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Box>
      </Box>

      <Box className="layera-table-pagination__controls">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className="layera-table-pagination__button"
          aria-label={t('tables.pagination.previous')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Box className="layera-table-pagination__pages">
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {typeof pageNum === 'number' ? (
                <button
                  onClick={() => onPageChange(pageNum)}
                  className={[
                    'layera-table-pagination__page',
                    pageNum === page && 'layera-table-pagination__page--active'
                  ].filter(Boolean).join(' ')}
                >
                  {pageNum}
                </button>
              ) : (
                <span className="layera-table-pagination__ellipsis">
                  {pageNum}
                </span>
              )}
            </React.Fragment>
          ))}
        </Box>

        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="layera-table-pagination__button"
          aria-label={t('tables.pagination.next')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Box>
    </Box>
  );
};