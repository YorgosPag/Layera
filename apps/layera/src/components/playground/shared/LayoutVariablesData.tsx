import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Layout state και επιπλέον παραμέτρους
 */
export const createLayoutVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  layoutRadius: string = 'md',
  layoutSize: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const layoutRadiusVar = `var(--layera-layout-borderRadius-${layoutRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: '📋 Primary Layout',
          cssVariable: '--layera-layout-background-primary',
          selector: '.layera-layout[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: '📋 Secondary Layout',
          cssVariable: '--layera-layout-background-secondary',
          selector: '.layera-layout[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: '📋 Success Layout',
          cssVariable: '--layera-layout-background-success',
          selector: '.layera-layout[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: '📋 Warning Layout',
          cssVariable: '--layera-layout-background-warning',
          selector: '.layera-layout[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: '📋 Danger Layout',
          cssVariable: '--layera-layout-background-danger',
          selector: '.layera-layout[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: '📋 Info Layout',
          cssVariable: '--layera-layout-background-info',
          selector: '.layera-layout[data-variant="info"]',
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
          category: '🔧 Border Width',
          cssVariable: 'var(--layera-layout-borderWidth)',
          selector: '.layera-layout',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: '🎨 Border Color',
          cssVariable: `var(--layera-layout-borderColor-${colorCategory})`,
          selector: '.layera-layout',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-layout-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: '🌊 Border Radius',
          cssVariable: `var(--layera-layout-borderRadius-${layoutRadius})`,
          selector: '.layera-layout',
          htmlAttribute: `data-border-radius="${layoutRadius}"`,
          currentValue: layoutRadiusVar,
          borderColor: 'success'
        }
      ]
    },
    {
      id: 'shadowsEffects',
      title: 'Shadows & Effects',
      icon: <span>✨</span>,
      variableCount: 4,
      variables: [
        {
          category: '🌟 Layout Shadow',
          cssVariable: 'var(--layera-layout-shadow)',
          selector: '.layera-layout',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-layout-shadow)',
          borderColor: 'primary'
        },
        {
          category: '🎭 Hover Effect',
          cssVariable: `var(--layera-layout-hover-${colorCategory})`,
          selector: '.layera-layout:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: '🎯 Active Effect',
          cssVariable: `var(--layera-layout-active-${colorCategory})`,
          selector: '.layera-layout:active',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: '💫 Transition',
          cssVariable: 'var(--layera-layout-transition)',
          selector: '.layera-layout',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-layout-transition)',
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
          category: '📏 Size',
          cssVariable: `var(--layera-layout-size-${layoutSize})`,
          selector: '.layera-layout',
          htmlAttribute: `data-size="${layoutSize}"`,
          currentValue: layoutSize,
          borderColor: 'info'
        },
        {
          category: '📦 Padding',
          cssVariable: `var(--layera-layout-padding-${layoutSize})`,
          selector: '.layera-layout',
          htmlAttribute: `data-padding="${layoutSize}"`,
          currentValue: `var(--layera-layout-padding-${layoutSize})`,
          borderColor: 'success'
        },
        {
          category: '📊 Width',
          cssVariable: 'var(--layera-layout-width)',
          selector: '.layera-layout',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-layout-width)',
          borderColor: 'warning'
        },
        {
          category: '📏 Height',
          cssVariable: `var(--layera-layout-height-${layoutSize})`,
          selector: '.layera-layout',
          htmlAttribute: `data-height="${layoutSize}"`,
          currentValue: `var(--layera-layout-height-${layoutSize})`,
          borderColor: 'danger'
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
          category: '🔠 Font Size',
          cssVariable: `var(--layera-layout-fontSize-${layoutSize})`,
          selector: '.layera-layout',
          htmlAttribute: `data-font-size="${layoutSize}"`,
          currentValue: `var(--layera-layout-fontSize-${layoutSize})`,
          borderColor: 'info'
        },
        {
          category: '💪 Font Weight',
          cssVariable: 'var(--layera-layout-fontWeight)',
          selector: '.layera-layout',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-layout-fontWeight)',
          borderColor: 'success'
        },
        {
          category: '🎨 Text Color',
          cssVariable: `var(--layera-layout-color-${colorCategory})`,
          selector: '.layera-layout',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-layout-color-${colorCategory})`,
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
          category: '🎯 Focus State',
          cssVariable: 'var(--layera-layout-focus-outline)',
          selector: '.layera-layout:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-layout-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: '🚫 Disabled State',
          cssVariable: 'var(--layera-layout-disabled-opacity)',
          selector: '.layera-layout:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-layout-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: '⏱️ Loading State',
          cssVariable: 'var(--layera-layout-loading-spinner)',
          selector: '.layera-layout .spinner',
          htmlAttribute: 'data-loading="true/false"',
          currentValue: 'var(--layera-layout-loading-spinner)',
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
          category: '🔷 Size',
          cssVariable: `var(--layera-layout-size-${layoutSize})`,
          selector: '.layera-layout',
          htmlAttribute: `data-size="${layoutSize}"`,
          currentValue: layoutSize,
          borderColor: 'info'
        },
        {
          category: '🎨 Color Category',
          cssVariable: `var(--layera-layout-colorCategory-${colorCategory})`,
          selector: '.layera-layout',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: '🏷️ Element Type',
          cssVariable: 'var(--layera-layout-elementType)',
          selector: '.layera-layout',
          htmlAttribute: 'data-element="layout"',
          currentValue: 'Layout',
          borderColor: 'primary'
        }
      ]
    }
  ];
};