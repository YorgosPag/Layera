import React from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';

interface TableToolbarProps {
  searchable: boolean;
  searchValue: string;
  onSearch: (value: string) => React.ReactNode;
  selectedCount: number;
  totalCount: number;
  bulkActions?: React.ReactNode;
  toolbar?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  searchable,
  searchValue,
  onSearch,
  selectedCount,
  totalCount,
  bulkActions,
  toolbar
}) => {
  const { t } = useLayeraTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const hasSelection = selectedCount > 0;

  return (
    <Box className="layera-table-toolbar">
      <Box className="layera-table-toolbar__primary">
        {hasSelection ? (
          <Box className="layera-table-toolbar__selection">
            <span className="layera-table-toolbar__selection-text">
              {t('tables.selectedCount', { count: selectedCount, total: totalCount })}
            </span>
            {bulkActions && (
              <Box className="layera-table-toolbar__bulk-actions">
                {bulkActions}
              </Box>
            )}
          </Box>
        ) : (
          <>
            {searchable && (
              <Box className="layera-table-toolbar__search">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder={t('tables.search.placeholder')}
                  className="layera-table-toolbar__search-input"
                />
                <Box className="layera-table-toolbar__search-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 14L11.1 11.1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Box>
            )}

            {toolbar && (
              <Box className="layera-table-toolbar__actions">
                {toolbar}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};