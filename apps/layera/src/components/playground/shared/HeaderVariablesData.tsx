import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon, LocationIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Header state και επιπλέον παραμέτρους
 */
export const createHeaderVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  headerRadius: string = 'md',
  headerSize: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const headerRadiusVar = `var(--layera-header-borderRadius-${headerRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: 'Primary Header',
          cssVariable: '--layera-header-background-primary',
          selector: '.layera-header[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: 'Secondary Header',
          cssVariable: '--layera-header-background-secondary',
          selector: '.layera-header[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: 'Success Header',
          cssVariable: '--layera-header-background-success',
          selector: '.layera-header[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: 'Warning Header',
          cssVariable: '--layera-header-background-warning',
          selector: '.layera-header[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: 'Danger Header',
          cssVariable: '--layera-header-background-danger',
          selector: '.layera-header[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: 'Info Header',
          cssVariable: '--layera-header-background-info',
          selector: '.layera-header[data-variant="info"]',
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
          cssVariable: 'var(--layera-header-borderWidth)',
          selector: '.layera-header',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: 'Border Color',
          cssVariable: `var(--layera-header-borderColor-${colorCategory})`,
          selector: '.layera-header',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-header-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: 'Border Radius',
          cssVariable: `var(--layera-header-borderRadius-${headerRadius})`,
          selector: '.layera-header',
          htmlAttribute: `data-border-radius="${headerRadius}"`,
          currentValue: headerRadiusVar,
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
          category: 'Header Shadow',
          cssVariable: 'var(--layera-header-shadow)',
          selector: '.layera-header',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-header-shadow)',
          borderColor: 'primary'
        },
        {
          category: 'Hover Effect',
          cssVariable: `var(--layera-header-hover-${colorCategory})`,
          selector: '.layera-header:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: 'Active Effect',
          cssVariable: `var(--layera-header-active-${colorCategory})`,
          selector: '.layera-header:active',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: 'Transition',
          cssVariable: 'var(--layera-header-transition)',
          selector: '.layera-header',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-header-transition)',
          borderColor: 'danger'
        }
      ]
    },
    {
      id: 'layoutSpacing',
      title: 'Layout & Spacing',
      icon: <LayersIcon size="sm" />,
      variableCount: 7,
      variables: [
        {
          category: 'Size',
          cssVariable: `var(--layera-header-size-${headerSize})`,
          selector: '.layera-header',
          htmlAttribute: `data-size="${headerSize}"`,
          currentValue: headerSize,
          borderColor: 'info'
        },
        {
          category: 'Padding',
          cssVariable: `var(--layera-header-padding-${headerSize})`,
          selector: '.layera-header',
          htmlAttribute: `data-padding="${headerSize}"`,
          currentValue: `var(--layera-header-padding-${headerSize})`,
          borderColor: 'success'
        },
        {
          category: 'Width',
          cssVariable: 'var(--layera-header-width)',
          selector: '.layera-header',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-header-width)',
          borderColor: 'warning'
        },
        {
          category: 'Height',
          cssVariable: `var(--layera-header-height-${headerSize})`,
          selector: '.layera-header',
          htmlAttribute: `data-height="${headerSize}"`,
          currentValue: `var(--layera-header-height-${headerSize})`,
          borderColor: 'danger'
        },
        {
          category: 'Center Column',
          cssVariable: 'var(--layera-header-center-column)',
          selector: '.layera-header-grid',
          htmlAttribute: 'data-grid-center="250px"',
          currentValue: '250px',
          borderColor: 'primary',
          icon: <LayersIcon size="xs" />
        },
        {
          category: 'Grid Template',
          cssVariable: 'var(--layera-grid-template-columns--header)',
          selector: '.layera-header-grid',
          htmlAttribute: 'data-grid="1fr 250px 1fr"',
          currentValue: '1fr var(--layera-header-center-column) 1fr',
          borderColor: 'info',
          icon: <PolygonIcon size="xs" />
        },
        {
          category: 'Grid Gap',
          cssVariable: 'var(--layera-gap--2)',
          selector: '.layera-header-grid',
          htmlAttribute: 'data-gap="8px"',
          currentValue: 'var(--layera-spacing-spacing-2)',
          borderColor: 'success',
          icon: <LocationIcon size="xs" />
        }
      ]
    },
    {
      id: 'typography',
      title: 'Typography',
      icon: <EditIcon size="sm" />,
      variableCount: 3,
      variables: [
        {
          category: 'Font Size',
          cssVariable: `var(--layera-header-fontSize-${headerSize})`,
          selector: '.layera-header',
          htmlAttribute: `data-font-size="${headerSize}"`,
          currentValue: `var(--layera-header-fontSize-${headerSize})`,
          borderColor: 'info'
        },
        {
          category: 'Font Weight',
          cssVariable: 'var(--layera-header-fontWeight)',
          selector: '.layera-header',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-header-fontWeight)',
          borderColor: 'success'
        },
        {
          category: 'Text Color',
          cssVariable: `var(--layera-header-color-${colorCategory})`,
          selector: '.layera-header',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-header-color-${colorCategory})`,
          borderColor: 'warning'
        }
      ]
    },
    {
      id: 'statesAccessibility',
      title: 'States & Accessibility',
      icon: <SettingsIcon size="sm" />,
      variableCount: 3,
      variables: [
        {
          category: 'Focus State',
          cssVariable: 'var(--layera-header-focus-outline)',
          selector: '.layera-header:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-header-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: 'Disabled State',
          cssVariable: 'var(--layera-header-disabled-opacity)',
          selector: '.layera-header:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-header-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: 'Loading State',
          cssVariable: 'var(--layera-header-loading-spinner)',
          selector: '.layera-header .spinner',
          htmlAttribute: 'data-loading="true/false"',
          currentValue: 'var(--layera-header-loading-spinner)',
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
          category: 'Header Size',
          cssVariable: `var(--layera-header-size-${headerSize})`,
          selector: '.layera-header',
          htmlAttribute: `data-size="${headerSize}"`,
          currentValue: headerSize,
          borderColor: 'info'
        },
        {
          category: 'Color Category',
          cssVariable: `var(--layera-header-colorCategory-${colorCategory})`,
          selector: '.layera-header',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: 'Element Type',
          cssVariable: 'var(--layera-header-elementType)',
          selector: '.layera-header',
          htmlAttribute: 'data-element="header"',
          currentValue: 'Header',
          borderColor: 'primary'
        }
      ]
    }
  ];
};