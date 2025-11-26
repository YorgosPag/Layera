import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Card state και επιπλέον παραμέτρους
 */
export const createCardsVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  cardRadius: string = 'md',
  cardSize: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const cardRadiusVar = `var(--layera-card-borderRadius-${cardRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: 'Primary Card',
          cssVariable: '--layera-card-background-primary',
          selector: '.layera-card[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: 'Secondary Card',
          cssVariable: '--layera-card-background-secondary',
          selector: '.layera-card[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: 'Success Card',
          cssVariable: '--layera-card-background-success',
          selector: '.layera-card[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: 'Warning Card',
          cssVariable: '--layera-card-background-warning',
          selector: '.layera-card[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: 'Danger Card',
          cssVariable: '--layera-card-background-danger',
          selector: '.layera-card[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: 'Info Card',
          cssVariable: '--layera-card-background-info',
          selector: '.layera-card[data-variant="info"]',
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
          cssVariable: 'var(--layera-card-borderWidth)',
          selector: '.layera-card',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: 'Border Color',
          cssVariable: `var(--layera-card-borderColor-${colorCategory})`,
          selector: '.layera-card',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-card-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: 'Border Radius',
          cssVariable: `var(--layera-card-borderRadius-${cardRadius})`,
          selector: '.layera-card',
          htmlAttribute: `data-border-radius="${cardRadius}"`,
          currentValue: cardRadiusVar,
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
          category: 'Card Shadow',
          cssVariable: 'var(--layera-card-shadow)',
          selector: '.layera-card',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-card-shadow)',
          borderColor: 'primary'
        },
        {
          category: 'Hover Effect',
          cssVariable: `var(--layera-card-hover-${colorCategory})`,
          selector: '.layera-card:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: 'Active Effect',
          cssVariable: `var(--layera-card-active-${colorCategory})`,
          selector: '.layera-card:active',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: 'Transition',
          cssVariable: 'var(--layera-card-transition)',
          selector: '.layera-card',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-card-transition)',
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
          cssVariable: `var(--layera-card-size-${cardSize})`,
          selector: '.layera-card',
          htmlAttribute: `data-size="${cardSize}"`,
          currentValue: cardSize,
          borderColor: 'info'
        },
        {
          category: 'Padding',
          cssVariable: `var(--layera-card-padding-${cardSize})`,
          selector: '.layera-card',
          htmlAttribute: `data-padding="${cardSize}"`,
          currentValue: `var(--layera-card-padding-${cardSize})`,
          borderColor: 'success'
        },
        {
          category: 'Width',
          cssVariable: 'var(--layera-card-width)',
          selector: '.layera-card',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-card-width)',
          borderColor: 'warning'
        },
        {
          category: 'Height',
          cssVariable: `var(--layera-card-height-${cardSize})`,
          selector: '.layera-card',
          htmlAttribute: `data-height="${cardSize}"`,
          currentValue: `var(--layera-card-height-${cardSize})`,
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
          category: 'Font Size',
          cssVariable: `var(--layera-card-fontSize-${cardSize})`,
          selector: '.layera-card',
          htmlAttribute: `data-font-size="${cardSize}"`,
          currentValue: `var(--layera-card-fontSize-${cardSize})`,
          borderColor: 'info'
        },
        {
          category: 'Font Weight',
          cssVariable: 'var(--layera-card-fontWeight)',
          selector: '.layera-card',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-card-fontWeight)',
          borderColor: 'success'
        },
        {
          category: 'Text Color',
          cssVariable: `var(--layera-card-color-${colorCategory})`,
          selector: '.layera-card',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-card-color-${colorCategory})`,
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
          cssVariable: 'var(--layera-card-focus-outline)',
          selector: '.layera-card:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-card-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: 'Disabled State',
          cssVariable: 'var(--layera-card-disabled-opacity)',
          selector: '.layera-card:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-card-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: 'Loading State',
          cssVariable: 'var(--layera-card-loading-spinner)',
          selector: '.layera-card .spinner',
          htmlAttribute: 'data-loading="true/false"',
          currentValue: 'var(--layera-card-loading-spinner)',
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
          category: 'Card Size',
          cssVariable: `var(--layera-card-size-${cardSize})`,
          selector: '.layera-card',
          htmlAttribute: `data-size="${cardSize}"`,
          currentValue: cardSize,
          borderColor: 'info'
        },
        {
          category: 'Color Category',
          cssVariable: `var(--layera-card-colorCategory-${colorCategory})`,
          selector: '.layera-card',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: 'Element Type',
          cssVariable: 'var(--layera-card-elementType)',
          selector: '.layera-card',
          htmlAttribute: 'data-element="card"',
          currentValue: 'Card',
          borderColor: 'primary'
        }
      ]
    }
  ];
};