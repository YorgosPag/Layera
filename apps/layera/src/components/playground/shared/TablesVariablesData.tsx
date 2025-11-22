import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Table state και επιπλέον παραμέτρους
 */
export const createTablesVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  tableRadius: string = 'md',
  tableSize: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const tableRadiusVar = `var(--layera-table-borderRadius-${tableRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: 'Primary Table',
          cssVariable: '--layera-table-background-primary',
          selector: '.layera-table[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: 'Secondary Table',
          cssVariable: '--layera-table-background-secondary',
          selector: '.layera-table[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: 'Success Table',
          cssVariable: '--layera-table-background-success',
          selector: '.layera-table[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: 'Warning Table',
          cssVariable: '--layera-table-background-warning',
          selector: '.layera-table[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: 'Danger Table',
          cssVariable: '--layera-table-background-danger',
          selector: '.layera-table[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: 'Info Table',
          cssVariable: '--layera-table-background-info',
          selector: '.layera-table[data-variant="info"]',
          htmlAttribute: 'data-variant="info"',
          currentValue: 'Info',
          borderColor: 'info'
        }
      ]
    },
    {
      id: 'borders',
      title: 'Borders',
      icon: <RulerIcon size="sm" />,
      variableCount: 3,
      variables: [
        {
          category: 'Border Width',
          cssVariable: 'var(--layera-table-borderWidth)',
          selector: '.layera-table',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: 'Border Color',
          cssVariable: `var(--layera-table-borderColor-${colorCategory})`,
          selector: '.layera-table',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-table-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: 'Border Radius',
          cssVariable: `var(--layera-table-borderRadius-${tableRadius})`,
          selector: '.layera-table',
          htmlAttribute: `data-border-radius="${tableRadius}"`,
          currentValue: tableRadiusVar,
          borderColor: 'success'
        }
      ]
    },
    {
      id: 'shadowsEffects',
      title: 'Shadows & Effects',
      icon: <SettingsIcon size="sm" />,
      variableCount: 4,
      variables: [
        {
          category: 'Table Shadow',
          cssVariable: 'var(--layera-table-shadow)',
          selector: '.layera-table',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-table-shadow)',
          borderColor: 'primary'
        },
        {
          category: 'Hover Effect',
          cssVariable: `var(--layera-table-hover-${colorCategory})`,
          selector: '.layera-table:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: 'Active Effect',
          cssVariable: `var(--layera-table-active-${colorCategory})`,
          selector: '.layera-table:focus',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: 'Transition',
          cssVariable: 'var(--layera-table-transition)',
          selector: '.layera-table',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-table-transition)',
          borderColor: 'danger'
        }
      ]
    },
    {
      id: 'layoutSpacing',
      title: 'Layout & Spacing',
      icon: <LayersIcon size="sm" />,
      variableCount: 4,
      variables: [
        {
          category: 'Size',
          cssVariable: `var(--layera-table-size-${tableSize})`,
          selector: '.layera-table',
          htmlAttribute: `data-size="${tableSize}"`,
          currentValue: tableSize,
          borderColor: 'info'
        },
        {
          category: 'Padding',
          cssVariable: `var(--layera-table-padding-${tableSize})`,
          selector: '.layera-table',
          htmlAttribute: `data-padding="${tableSize}"`,
          currentValue: `var(--layera-table-padding-${tableSize})`,
          borderColor: 'success'
        },
        {
          category: 'Width',
          cssVariable: 'var(--layera-table-width)',
          selector: '.layera-table',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-table-width)',
          borderColor: 'warning'
        },
        {
          category: 'Height',
          cssVariable: `var(--layera-table-height-${tableSize})`,
          selector: '.layera-table',
          htmlAttribute: `data-height="${tableSize}"`,
          currentValue: `var(--layera-table-height-${tableSize})`,
          borderColor: 'danger'
        }
      ]
    },
    {
      id: 'typography',
      title: 'Typography',
      icon: <EditIcon size="sm" />,
      variableCount: 4,
      variables: [
        {
          category: 'Font Size',
          cssVariable: `var(--layera-table-fontSize-${tableSize})`,
          selector: '.layera-table',
          htmlAttribute: `data-font-size="${tableSize}"`,
          currentValue: `var(--layera-table-fontSize-${tableSize})`,
          borderColor: 'info'
        },
        {
          category: 'Font Weight',
          cssVariable: 'var(--layera-table-fontWeight)',
          selector: '.layera-table',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-table-fontWeight)',
          borderColor: 'success'
        },
        {
          category: 'Text Color',
          cssVariable: `var(--layera-table-color-${colorCategory})`,
          selector: '.layera-table',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-table-color-${colorCategory})`,
          borderColor: 'warning'
        },
        {
          category: 'Header Color',
          cssVariable: `var(--layera-table-header-${colorCategory})`,
          selector: '.layera-table thead th',
          htmlAttribute: `data-header-color="${colorCategory}"`,
          currentValue: `var(--layera-table-header-${colorCategory})`,
          borderColor: 'primary'
        }
      ]
    },
    {
      id: 'statesAccessibility',
      title: 'States & Accessibility',
      icon: <SettingsIcon size="sm" />,
      variableCount: 4,
      variables: [
        {
          category: 'Focus State',
          cssVariable: 'var(--layera-table-focus-outline)',
          selector: '.layera-table:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-table-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: 'Striped Rows',
          cssVariable: 'var(--layera-table-striped-background)',
          selector: '.layera-table tr:nth-child(even)',
          htmlAttribute: 'data-striped="true/false"',
          currentValue: 'var(--layera-table-striped-background)',
          borderColor: 'secondary'
        },
        {
          category: 'Selected Row',
          cssVariable: 'var(--layera-table-selected-background)',
          selector: '.layera-table tr:selected',
          htmlAttribute: 'data-selected="true/false"',
          currentValue: 'var(--layera-table-selected-background)',
          borderColor: 'success'
        },
        {
          category: 'Hover Row',
          cssVariable: 'var(--layera-table-hover-background)',
          selector: '.layera-table tr:hover',
          htmlAttribute: 'data-hover="true/false"',
          currentValue: 'var(--layera-table-hover-background)',
          borderColor: 'danger'
        }
      ]
    },
    {
      id: 'currentConfiguration',
      title: 'Current Configuration',
      icon: <PolygonIcon size="sm" />,
      variableCount: 3,
      variables: [
        {
          category: 'Table Size',
          cssVariable: `var(--layera-table-size-${tableSize})`,
          selector: '.layera-table',
          htmlAttribute: `data-size="${tableSize}"`,
          currentValue: tableSize,
          borderColor: 'info'
        },
        {
          category: 'Color Category',
          cssVariable: `var(--layera-table-colorCategory-${colorCategory})`,
          selector: '.layera-table',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: 'Element Type',
          cssVariable: 'var(--layera-table-elementType)',
          selector: '.layera-table',
          htmlAttribute: 'data-element="table"',
          currentValue: 'Table',
          borderColor: 'primary'
        }
      ]
    }
  ];
};