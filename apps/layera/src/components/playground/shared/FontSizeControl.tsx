import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { EditIcon, EyeIcon, SettingsIcon } from '@layera/icons';
import type { FontSizeValue } from '../../../types/sizes';

/**
 * FontSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους γραμματοσειράς για text κατηγορία
 * - 6 βασικά μεγέθη: xs, sm, base, lg, xl, 2xl
 * - Βασισμένα στα typography tokens του design system
 * - Responsive design με εικονίδια και καθαρή interface
 */

// FontSizeValue moved to unified size system - import from ../../../types/sizes

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface FontSizeControlProps {
  fontSize: FontSizeValue;
  onFontSizeChange: (size: FontSizeValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
  fontSize,
  onFontSizeChange,
  className = '',
  onPreview,
  buttonState
}) => {

  // Font size options με περιγραφές
  const fontSizeOptions: { value: FontSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: 'var(--layera-fontSize-xs) - Captions, labels' },
    { value: 'sm', label: 'SM', description: 'var(--layera-fontSize-sm) - Small text' },
    { value: 'base', label: 'Base', description: 'var(--layera-fontSize-base) - Body default' },
    { value: 'lg', label: 'LG', description: 'var(--layera-fontSize-lg) - Large body text' },
    { value: 'xl', label: 'XL', description: 'var(--layera-fontSize-xl) - Subheadings' },
    { value: '2xl', label: '2XL', description: 'var(--layera-fontSize-2xl) - Small headings' }
  ];

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <EditIcon size="sm" /> Μέγεθος Γραμματοσειράς
      </h4>
      <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος του κειμένου
      </Text>
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-flex--justify-center">
        {fontSizeOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={fontSize === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => {
              onFontSizeChange(option.value);
              if (onPreview) {
                onPreview('fontSize', option.value);
              }
            }}
            title={option.description}
            className={`${index < fontSizeOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${fontSize === option.value ? 'primary' : 'outline'}`}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Preview του επιλεγμένου μεγέθους */}
      <Box className="layera-margin-top--md layera-padding--md layera-bg--transparent layera-border-radius--md layera-border--sm layera-border-color--primary">
        <Text
          className="layera-typography layera-line-height--snug layera-margin--0"
          data-size={fontSize}
          data-color="primary"
        >
          Παράδειγμα κειμένου με {fontSize} μέγεθος
        </Text>
        <Text className="layera-typography layera-margin-top--xs" data-size="xs" data-color="secondary">
          {fontSizeOptions.find(opt => opt.value === fontSize)?.description}
        </Text>
      </Box>

    </Box>
  );
};

export default FontSizeControl;