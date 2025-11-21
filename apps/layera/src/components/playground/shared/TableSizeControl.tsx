import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, ChartIcon } from '@layera/icons';
import type { TableSizeValue } from '../../../types/sizes';

/**
 * TableSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους table για tables element type
 * - 5 βασικά μεγέθη: xs, sm, md, lg, xl
 * - Βασισμένα στα Carbon Design System (IBM), GitLab Pajamas standards
 * - Enterprise data density principles (Compact, Condensed, Standard, Comfortable, Spacious)
 * - Row height control για διαφορετικές data densities
 */

// TableSizeValue moved to unified size system - import from ../../../types/sizes

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface TableSizeControlProps {
  tableSize: TableSizeValue;
  onTableSizeChange: (size: TableSizeValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const TableSizeControl: React.FC<TableSizeControlProps> = ({
  tableSize,
  onTableSizeChange,
  className = '',
  onPreview,
  buttonState
}) => {

  // Table size options με περιγραφές βασισμένες στα enterprise standards
  const tableSizeOptions: { value: TableSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: 'Compact - High-density dashboards, analytics' },
    { value: 'sm', label: 'SM', description: 'Condensed - Data-heavy screens, reports' },
    { value: 'md', label: 'MD', description: 'Standard - Business tables, default size' },
    { value: 'lg', label: 'LG', description: 'Comfortable - Content-rich tables, detailed views' },
    { value: 'xl', label: 'XL', description: 'Spacious - Marketing content, presentation tables' }
  ];

  const handleSizeChange = (size: TableSizeValue) => {
    onTableSizeChange(size);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('tableSize', size);
    }
  };

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <ChartIcon size="sm" /> Μέγεθος Πινάκων
      </h4>

      {/* Table Size Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {tableSizeOptions.map((option) => (
          <Button
            key={option.value}
            variant={tableSize === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleSizeChange(option.value)}
            className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${tableSize === option.value ? 'primary' : 'outline'}`}
          >
            <SettingsIcon size="sm" /> {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          {tableSizeOptions.find(option => option.value === tableSize)?.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος των πινάκων ανάλογα με την πυκνότητα των δεδομένων και τη χρήση
      </Text>
    </Box>
  );
};