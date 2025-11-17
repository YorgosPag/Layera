import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

// Enterprise-grade CSS classes
const styles = `
.layera-tables-container {
  display: flex;
  flex-direction: column;
}

.layera-table-row:not(.layera-table-row--last) {
  margin-bottom: var(--layera-global-borderRadius-xs);
}
`;

// Inject styles
if (typeof document !== 'undefined' && !document.querySelector('#layera-tables-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'layera-tables-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

interface TablesPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
}

export const TablesPlayground: React.FC<TablesPlaygroundProps> = ({
  currentColors,
  colorCategory
}) => {
  const getTableStyle = (colorValue: string) => {
    const baseStyle = {
      boxSizing: 'border-box' as const,
      border: 'var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) transparent',
      padding: 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
      borderRadius: 'var(--layera-global-layoutSystem-button-outline-borderRadius)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'var(--layera-fontSize-sm)',
      fontWeight: 'var(--layera-fontWeight-medium)',
    };

    switch (colorCategory) {
      case 'backgrounds':
        return {
          ...baseStyle,
          backgroundColor: colorValue,
          color: colorValue === '#f59e0b' ? 'var(--layera-color-text-primary)' : 'var(--layera-color-text-on-dark)'
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: colorValue
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: 'var(--layera-color-text-primary)',
          border: `var(--layera-global-borderWidth-1) var(--layera-global-borderStyle-solid) ${colorValue}`
        };
      default:
        return baseStyle;
    }
  };

  const colors = [
    { name: 'Primary', value: currentColors.primary },
    { name: 'Secondary', value: currentColors.secondary },
    { name: 'Success', value: currentColors.success },
    { name: 'Warning', value: currentColors.warning },
    { name: 'Danger', value: currentColors.danger },
    { name: 'Info', value: currentColors.info }
  ];

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πίνακες
        </h3>

        <Box className="layera-tables-container">
          {colors.map((color, index) => (
            <Box
              key={color.name}
              className={index === colors.length - 1 ? "layera-table-row layera-table-row--last" : "layera-table-row"}
              style={getTableStyle(color.value)}
            >
              <span>{color.name} Row</span>
              <span className="layera-opacity--80 layera-fontSize--xs">
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};