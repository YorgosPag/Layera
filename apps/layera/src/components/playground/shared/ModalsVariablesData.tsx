import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Modal state και επιπλέον παραμέτρους
 */
export const createModalsVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  modalRadius: string = 'lg',
  modalSize: string = 'md',
  modalTextAlign: string = 'middle',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const modalRadiusVar = `var(--layera-modal-borderRadius-${modalRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: '🪟 Primary Modal',
          cssVariable: '--layera-modal-background-primary',
          selector: '.layera-modal[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: '🪟 Secondary Modal',
          cssVariable: '--layera-modal-background-secondary',
          selector: '.layera-modal[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: '🪟 Success Modal',
          cssVariable: '--layera-modal-background-success',
          selector: '.layera-modal[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: '🪟 Warning Modal',
          cssVariable: '--layera-modal-background-warning',
          selector: '.layera-modal[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: '🪟 Danger Modal',
          cssVariable: '--layera-modal-background-danger',
          selector: '.layera-modal[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: '🪟 Info Modal',
          cssVariable: '--layera-modal-background-info',
          selector: '.layera-modal[data-variant="info"]',
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
          cssVariable: 'var(--layera-modal-borderWidth)',
          selector: '.layera-modal',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: '🎨 Border Color',
          cssVariable: `var(--layera-modal-borderColor-${colorCategory})`,
          selector: '.layera-modal',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-modal-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: '🌊 Border Radius',
          cssVariable: `var(--layera-modal-borderRadius-${modalRadius})`,
          selector: '.layera-modal',
          htmlAttribute: `data-border-radius="${modalRadius}"`,
          currentValue: modalRadiusVar,
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
          category: '🌟 Modal Shadow',
          cssVariable: 'var(--layera-modal-shadow)',
          selector: '.layera-modal',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-modal-shadow)',
          borderColor: 'primary'
        },
        {
          category: '🎭 Hover Effect',
          cssVariable: `var(--layera-modal-hover-${colorCategory})`,
          selector: '.layera-modal:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: '🎯 Active Effect',
          cssVariable: `var(--layera-modal-active-${colorCategory})`,
          selector: '.layera-modal:active',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: '💫 Transition',
          cssVariable: 'var(--layera-modal-transition)',
          selector: '.layera-modal',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-modal-transition)',
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
          cssVariable: `var(--layera-modal-size-${modalSize})`,
          selector: '.layera-modal',
          htmlAttribute: `data-size="${modalSize}"`,
          currentValue: modalSize,
          borderColor: 'info'
        },
        {
          category: '📦 Padding',
          cssVariable: `var(--layera-modal-padding-${modalSize})`,
          selector: '.layera-modal',
          htmlAttribute: `data-padding="${modalSize}"`,
          currentValue: `var(--layera-modal-padding-${modalSize})`,
          borderColor: 'success'
        },
        {
          category: '📊 Width',
          cssVariable: 'var(--layera-modal-width)',
          selector: '.layera-modal',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-modal-width)',
          borderColor: 'warning'
        },
        {
          category: '📏 Height',
          cssVariable: `var(--layera-modal-height-${modalSize})`,
          selector: '.layera-modal',
          htmlAttribute: `data-height="${modalSize}"`,
          currentValue: `var(--layera-modal-height-${modalSize})`,
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
          category: '🔠 Font Size',
          cssVariable: `var(--layera-modal-fontSize-${modalSize})`,
          selector: '.layera-modal',
          htmlAttribute: `data-font-size="${modalSize}"`,
          currentValue: `var(--layera-modal-fontSize-${modalSize})`,
          borderColor: 'info'
        },
        {
          category: '💪 Font Weight',
          cssVariable: 'var(--layera-modal-fontWeight)',
          selector: '.layera-modal',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-modal-fontWeight)',
          borderColor: 'success'
        },
        {
          category: '🎨 Text Color',
          cssVariable: `var(--layera-modal-color-${colorCategory})`,
          selector: '.layera-modal',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-modal-color-${colorCategory})`,
          borderColor: 'warning'
        },
        {
          category: '📝 Text Alignment',
          cssVariable: `var(--layera-modal-textAlign-${modalTextAlign})`,
          selector: '.layera-modal',
          htmlAttribute: `data-text-align="${modalTextAlign}"`,
          currentValue: modalTextAlign,
          borderColor: 'primary'
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
          cssVariable: 'var(--layera-modal-focus-outline)',
          selector: '.layera-modal:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-modal-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: '🚫 Disabled State',
          cssVariable: 'var(--layera-modal-disabled-opacity)',
          selector: '.layera-modal:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-modal-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: '⏱️ Loading State',
          cssVariable: 'var(--layera-modal-loading-spinner)',
          selector: '.layera-modal .spinner',
          htmlAttribute: 'data-loading="true/false"',
          currentValue: 'var(--layera-modal-loading-spinner)',
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
          cssVariable: `var(--layera-modal-size-${modalSize})`,
          selector: '.layera-modal',
          htmlAttribute: `data-size="${modalSize}"`,
          currentValue: modalSize,
          borderColor: 'info'
        },
        {
          category: '🎨 Color Category',
          cssVariable: `var(--layera-modal-colorCategory-${colorCategory})`,
          selector: '.layera-modal',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: '🏷️ Element Type',
          cssVariable: 'var(--layera-modal-elementType)',
          selector: '.layera-modal',
          htmlAttribute: 'data-element="modal"',
          currentValue: 'Modal',
          borderColor: 'primary'
        }
      ]
    }
  ];
};