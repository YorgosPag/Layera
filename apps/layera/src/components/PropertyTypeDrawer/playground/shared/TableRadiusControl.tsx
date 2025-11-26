import React, { useState, useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon } from '@layera/icons';

/**
 * TableRadiusControl Component
 *
 * Ρύθμιση καμπυλότητας γωνιών table και data grid components
 * - Επιλογές: None, Small, Medium, Large, XL
 * - Live preview με visual feedback
 * - Compatible με το SST design token system
 * - Χρησιμοποιεί --layera-radius-table tokens για πίνακες
 * - Separation of concerns από Button/Layout/Card/Modal/Border/Input radius controls
 */

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface TableRadiusControlProps {
  /** Current table radius value ('none', 'xs', 'md', 'lg', 'xl') */
  value: string;
  /** Callback when table radius changes */
  onChange: (value: string) => void;
  /** Element type για description context */
  elementType?: string;
  /** CSS class για styling */
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const TableRadiusControl: React.FC<TableRadiusControlProps> = ({
  value = 'md',
  onChange,
  elementType = 'πίνακες',
  className = '',
  onPreview,
  buttonState
}) => {
  const [isChanging, setIsChanging] = useState(false);

  // Available table radius options with their tokens
  const tableRadiusOptions = [
    {
      value: 'none',
      label: 'Χωρίς',
      token: 'var(--layera-global-borderRadius-none)',
      description: 'Χωρίς καμπυλότητα - τετράγωνοι πίνακες'
    },
    {
      value: 'xs',
      label: 'Ελαφρώς',
      token: 'var(--layera-radius-xs)',
      description: 'Ελαφρώς καμπύλες'
    },
    {
      value: 'md',
      label: 'Μεσαία',
      token: 'var(--layera-radius-table)',
      description: 'Μεσαία καμπύλες - tables'
    },
    {
      value: 'lg',
      label: 'Πολύ',
      token: 'var(--layera-radius-lg)',
      description: 'Πολύ καμπύλες'
    },
    {
      value: 'xl',
      label: 'Μεγάλες',
      token: 'var(--layera-radius-xl)',
      description: 'Μεγάλες καμπύλες - special tables'
    }
  ];

  const handleChange = useCallback((newValue: string) => {
    setIsChanging(true);
    onChange(newValue);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('tableRadius', newValue);
    }

    // Reset visual feedback
    setTimeout(() => {
      setIsChanging(false);
    }, 200);
  }, [onChange, onPreview]);

  const getCurrentOption = () => {
    return tableRadiusOptions.find(option => option.value === value) || tableRadiusOptions[2];
  };

  const currentOption = getCurrentOption();

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <SettingsIcon size="sm" /> Καμπυλότητα Πινάκων
      </h4>

      {/* Table Radius Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {tableRadiusOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleChange(option.value)}
            className={`${index < tableRadiusOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${value === option.value ? 'primary' : 'outline'} ${isChanging && value === option.value ? 'layera-opacity--70' : 'layera-opacity--100'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview of Current Table Radius */}
      <Box
        className={`layera-margin-bottom--sm layera-padding--lg layera-bg--surface-secondary layera-text-align--center layera-transition--normal layera-border--solid layera-border-width--2 layera-border-color--primary layera-min-height--4 layera-grid layera-grid-cols--2 layera-gap--xs layera-align-items--center layera-dynamic-radius ${isChanging ? 'layera-transform--scale-102' : 'layera-transform--scale-100'}`}
        data-dynamic-radius={currentOption.token}
      >
        <Box className="layera-padding--sm layera-bg--surface-primary layera-dynamic-radius" data-dynamic-radius={currentOption.token}>
          <Text className="layera-typography" data-size="xs" data-weight="medium" data-color="primary">Header</Text>
        </Box>
        <Box className="layera-padding--sm layera-bg--surface-primary layera-dynamic-radius" data-dynamic-radius={currentOption.token}>
          <Text className="layera-typography" data-size="xs" data-weight="medium" data-color="primary">Data</Text>
        </Box>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε την καμπυλότητα των γωνιών για {elementType}
        {isChanging && ' (ενημερώνεται...)'} - Για data tables, grids, spreadsheets
      </Text>
    </Box>
  );
};