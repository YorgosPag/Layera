import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { EditIcon, EyeIcon } from '@layera/icons';

/**
 * FontSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους γραμματοσειράς για text κατηγορία
 * - 6 βασικά μεγέθη: xs, sm, base, lg, xl, 2xl
 * - Βασισμένα στα typography tokens του design system
 * - Responsive design με εικονίδια και καθαρή interface
 */

export type FontSizeValue = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

interface FontSizeControlProps {
  fontSize: FontSizeValue;
  onFontSizeChange: (size: FontSizeValue) => void;
  className?: string;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
  fontSize,
  onFontSizeChange,
  className = ''
}) => {

  // Font size options με περιγραφές
  const fontSizeOptions: { value: FontSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: '12px - Captions, labels' },
    { value: 'sm', label: 'SM', description: '14px - Small text' },
    { value: 'base', label: 'Base', description: '16px - Body default' },
    { value: 'lg', label: 'LG', description: '18px - Large body text' },
    { value: 'xl', label: 'XL', description: '20px - Subheadings' },
    { value: '2xl', label: '2XL', description: '24px - Small headings' }
  ];

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        <EditIcon size="sm" /> Μέγεθος Γραμματοσειράς
      </h4>
      <Text className="layera-typography layera-margin-bottom--sm" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος του κειμένου
      </Text>
      <Box className="layera-flex layera-flex--wrap layera-flex--gap-xs">
        {fontSizeOptions.map(option => (
          <Button
            key={option.value}
            variant={fontSize === option.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onFontSizeChange(option.value)}
            title={option.description}
            style={{
              minWidth: '50px',
              fontWeight: fontSize === option.value ? 'bold' : 'normal'
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>

      {/* Preview του επιλεγμένου μεγέθους */}
      <Box className="layera-margin-top--md layera-padding--md" style={{
        backgroundColor: 'transparent',
        borderRadius: '6px',
        border: '1px solid var(--layera-color-border-primary)'
      }}>
        <Text
          className="layera-typography"
          data-size={fontSize}
          data-color="primary"
          style={{
            lineHeight: '1.4',
            margin: 0
          }}
        >
          <EyeIcon size="xs" /> Παράδειγμα κειμένου με {fontSize} μέγεθος
        </Text>
        <Text className="layera-typography layera-margin-top--xs" data-size="xs" data-color="secondary">
          {fontSizeOptions.find(opt => opt.value === fontSize)?.description}
        </Text>
      </Box>
    </Box>
  );
};

export default FontSizeControl;