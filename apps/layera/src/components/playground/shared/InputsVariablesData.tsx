import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον Input state και επιπλέον παραμέτρους
 */
export const createInputsVariablesData = (
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  inputRadius: string = 'md',
  inputSize: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const inputRadiusVar = `var(--layera-input-borderRadius-${inputRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 6,
      variables: [
        {
          category: '✏️ Primary Input',
          cssVariable: '--layera-input-background-primary',
          selector: '.layera-input[data-variant="primary"]',
          htmlAttribute: 'data-variant="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: '✏️ Secondary Input',
          cssVariable: '--layera-input-background-secondary',
          selector: '.layera-input[data-variant="secondary"]',
          htmlAttribute: 'data-variant="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: '✏️ Success Input',
          cssVariable: '--layera-input-background-success',
          selector: '.layera-input[data-variant="success"]',
          htmlAttribute: 'data-variant="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: '✏️ Warning Input',
          cssVariable: '--layera-input-background-warning',
          selector: '.layera-input[data-variant="warning"]',
          htmlAttribute: 'data-variant="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: '✏️ Danger Input',
          cssVariable: '--layera-input-background-danger',
          selector: '.layera-input[data-variant="danger"]',
          htmlAttribute: 'data-variant="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: '✏️ Info Input',
          cssVariable: '--layera-input-background-info',
          selector: '.layera-input[data-variant="info"]',
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
          cssVariable: 'var(--layera-input-borderWidth)',
          selector: '.layera-input',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: '🎨 Border Color',
          cssVariable: `var(--layera-input-borderColor-${colorCategory})`,
          selector: '.layera-input',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-input-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: '🌊 Border Radius',
          cssVariable: `var(--layera-input-borderRadius-${inputRadius})`,
          selector: '.layera-input',
          htmlAttribute: `data-border-radius="${inputRadius}"`,
          currentValue: inputRadiusVar,
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
          category: '🌟 Input Shadow',
          cssVariable: 'var(--layera-input-shadow)',
          selector: '.layera-input',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-input-shadow)',
          borderColor: 'primary'
        },
        {
          category: '🎭 Hover Effect',
          cssVariable: `var(--layera-input-hover-${colorCategory})`,
          selector: '.layera-input:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: '🎯 Active Effect',
          cssVariable: `var(--layera-input-active-${colorCategory})`,
          selector: '.layera-input:focus',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: '💫 Transition',
          cssVariable: 'var(--layera-input-transition)',
          selector: '.layera-input',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-input-transition)',
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
          cssVariable: `var(--layera-input-size-${inputSize})`,
          selector: '.layera-input',
          htmlAttribute: `data-size="${inputSize}"`,
          currentValue: inputSize,
          borderColor: 'info'
        },
        {
          category: '📦 Padding',
          cssVariable: `var(--layera-input-padding-${inputSize})`,
          selector: '.layera-input',
          htmlAttribute: `data-padding="${inputSize}"`,
          currentValue: `var(--layera-input-padding-${inputSize})`,
          borderColor: 'success'
        },
        {
          category: '📊 Width',
          cssVariable: 'var(--layera-input-width)',
          selector: '.layera-input',
          htmlAttribute: 'data-width="auto/defined"',
          currentValue: 'var(--layera-input-width)',
          borderColor: 'warning'
        },
        {
          category: '📏 Height',
          cssVariable: `var(--layera-input-height-${inputSize})`,
          selector: '.layera-input',
          htmlAttribute: `data-height="${inputSize}"`,
          currentValue: `var(--layera-input-height-${inputSize})`,
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
          cssVariable: `var(--layera-input-fontSize-${inputSize})`,
          selector: '.layera-input',
          htmlAttribute: `data-font-size="${inputSize}"`,
          currentValue: `var(--layera-input-fontSize-${inputSize})`,
          borderColor: 'info'
        },
        {
          category: '💪 Font Weight',
          cssVariable: 'var(--layera-input-fontWeight)',
          selector: '.layera-input',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-input-fontWeight)',
          borderColor: 'success'
        },
        {
          category: '🎨 Text Color',
          cssVariable: `var(--layera-input-color-${colorCategory})`,
          selector: '.layera-input',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-input-color-${colorCategory})`,
          borderColor: 'warning'
        },
        {
          category: '📝 Placeholder Color',
          cssVariable: `var(--layera-input-placeholder-${colorCategory})`,
          selector: '.layera-input::placeholder',
          htmlAttribute: `data-placeholder-color="${colorCategory}"`,
          currentValue: `var(--layera-input-placeholder-${colorCategory})`,
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
          category: '🎯 Focus State',
          cssVariable: 'var(--layera-input-focus-outline)',
          selector: '.layera-input:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-input-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: '🚫 Disabled State',
          cssVariable: 'var(--layera-input-disabled-opacity)',
          selector: '.layera-input:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-input-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: '❌ Invalid State',
          cssVariable: 'var(--layera-input-invalid-border)',
          selector: '.layera-input:invalid',
          htmlAttribute: 'data-invalid="true/false"',
          currentValue: 'var(--layera-input-invalid-border)',
          borderColor: 'danger'
        },
        {
          category: '✅ Valid State',
          cssVariable: 'var(--layera-input-valid-border)',
          selector: '.layera-input:valid',
          htmlAttribute: 'data-valid="true/false"',
          currentValue: 'var(--layera-input-valid-border)',
          borderColor: 'success'
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
          cssVariable: `var(--layera-input-size-${inputSize})`,
          selector: '.layera-input',
          htmlAttribute: `data-size="${inputSize}"`,
          currentValue: inputSize,
          borderColor: 'info'
        },
        {
          category: '🎨 Color Category',
          cssVariable: `var(--layera-input-colorCategory-${colorCategory})`,
          selector: '.layera-input',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: '🏷️ Element Type',
          cssVariable: 'var(--layera-input-elementType)',
          selector: '.layera-input',
          htmlAttribute: 'data-element="input"',
          currentValue: 'Input',
          borderColor: 'primary'
        }
      ]
    }
  ];
};