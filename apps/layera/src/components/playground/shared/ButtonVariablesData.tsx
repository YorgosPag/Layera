import React from 'react';
import { PaletteIcon, RulerIcon, LayersIcon, EditIcon, CheckIcon, SettingsIcon, PolygonIcon } from '@layera/icons';
import { CategoryInfo } from './VariablesInfoAccordion';
import { ButtonState } from '../../../hooks/useButtonState';

/**
 * Δημιουργεί τα data για το VariablesInfoAccordion component
 * χρησιμοποιώντας το τρέχον ButtonState και επιπλέον παραμέτρους
 */
export const createButtonVariablesData = (
  buttonState: ButtonState,
  colorCategory: string = 'primary',
  borderWidth: number = 2,
  borderRadius: string = 'md',
  hoverEffect: string = 'normal',
  activeEffect: string = 'scale'
): CategoryInfo[] => {
  const buttonRadius = `var(--layera-button-borderRadius-${borderRadius})`;

  return [
    {
      id: 'backgroundColors',
      title: 'Background Colors',
      icon: <PaletteIcon size="sm" />,
      variableCount: 8,
      variables: [
        {
          category: '🎨 Primary Φόντο',
          cssVariable: '--layera-button-background-primary',
          selector: '.layera-button[data-variant="primary"]',
          htmlAttribute: 'data-layera-button-background="primary"',
          currentValue: 'Primary',
          borderColor: 'primary'
        },
        {
          category: '🎨 Secondary Φόντο',
          cssVariable: '--layera-button-background-secondary',
          selector: '.layera-button[data-variant="secondary"]',
          htmlAttribute: 'data-layera-button-background="secondary"',
          currentValue: 'Secondary',
          borderColor: 'info'
        },
        {
          category: '🎨 Success Φόντο',
          cssVariable: '--layera-button-background-success',
          selector: '.layera-button[data-variant="success"]',
          htmlAttribute: 'data-layera-button-background="success"',
          currentValue: 'Success',
          borderColor: 'success'
        },
        {
          category: '🎨 Warning Φόντο',
          cssVariable: '--layera-button-background-warning',
          selector: '.layera-button[data-variant="warning"]',
          htmlAttribute: 'data-layera-button-background="warning"',
          currentValue: 'Warning',
          borderColor: 'warning'
        },
        {
          category: '🎨 Danger Φόντο',
          cssVariable: '--layera-button-background-danger',
          selector: '.layera-button[data-variant="danger"]',
          htmlAttribute: 'data-layera-button-background="danger"',
          currentValue: 'Danger',
          borderColor: 'danger'
        },
        {
          category: '🎨 Info Φόντο',
          cssVariable: '--layera-button-background-info',
          selector: '.layera-button[data-variant="info"]',
          htmlAttribute: 'data-layera-button-background="info"',
          currentValue: 'Info',
          borderColor: 'info'
        },
        {
          category: '🎨 Outline Φόντο',
          cssVariable: '--layera-button-background-outline',
          selector: '.layera-button[data-variant="outline"]',
          htmlAttribute: 'data-layera-button-background="outline"',
          currentValue: 'Outline',
          borderColor: 'secondary'
        },
        {
          category: '🎨 Ghost Φόντο',
          cssVariable: '--layera-button-background-ghost',
          selector: '.layera-button[data-variant="ghost"]',
          htmlAttribute: 'data-layera-button-background="ghost"',
          currentValue: 'Ghost',
          borderColor: 'secondary'
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
          cssVariable: 'var(--layera-button-borderWidth)',
          selector: '.layera-button',
          htmlAttribute: `data-border-width="${borderWidth}"`,
          currentValue: borderWidth.toString(),
          borderColor: 'warning'
        },
        {
          category: '🎨 Border Color',
          cssVariable: `var(--layera-button-borderColor-${colorCategory})`,
          selector: '.layera-button',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: `var(--layera-button-borderColor-${colorCategory})`,
          borderColor: 'danger'
        },
        {
          category: '🌊 Border Radius',
          cssVariable: `var(--layera-button-borderRadius-${borderRadius})`,
          selector: '.layera-button',
          htmlAttribute: `data-border-radius="${borderRadius}"`,
          currentValue: buttonRadius,
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
          category: '🌟 Box Shadow',
          cssVariable: 'var(--layera-button-shadow)',
          selector: '.layera-button',
          htmlAttribute: 'data-shadow="true/false"',
          currentValue: 'var(--layera-button-shadow)',
          borderColor: 'primary'
        },
        {
          category: '🎭 Hover Effect',
          cssVariable: `var(--layera-button-hover-${colorCategory})`,
          selector: '.layera-button:hover',
          htmlAttribute: `data-hover-effect="${hoverEffect}"`,
          currentValue: hoverEffect,
          borderColor: 'secondary'
        },
        {
          category: '🎯 Active Effect',
          cssVariable: `var(--layera-button-active-${colorCategory})`,
          selector: '.layera-button:active',
          htmlAttribute: `data-active-effect="${activeEffect}"`,
          currentValue: activeEffect,
          borderColor: 'success'
        },
        {
          category: '💫 Transition',
          cssVariable: 'var(--layera-button-transition)',
          selector: '.layera-button',
          htmlAttribute: 'data-transition="true/false"',
          currentValue: 'var(--layera-button-transition)',
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
          cssVariable: `var(--layera-button-size-${buttonState.size})`,
          selector: '.layera-button',
          htmlAttribute: `data-size="${buttonState.size}"`,
          currentValue: buttonState.size,
          borderColor: 'info'
        },
        {
          category: '📦 Padding',
          cssVariable: `var(--layera-button-padding-${buttonState.size})`,
          selector: '.layera-button',
          htmlAttribute: `data-padding="${buttonState.size}"`,
          currentValue: `var(--layera-button-padding-${buttonState.size})`,
          borderColor: 'success'
        },
        {
          category: '📊 Min Width',
          cssVariable: 'var(--layera-button-minWidth)',
          selector: '.layera-button',
          htmlAttribute: 'data-min-width="auto/defined"',
          currentValue: 'var(--layera-button-minWidth)',
          borderColor: 'warning'
        },
        {
          category: '📏 Height',
          cssVariable: `var(--layera-button-height-${buttonState.size})`,
          selector: '.layera-button',
          htmlAttribute: `data-height="${buttonState.size}"`,
          currentValue: `var(--layera-button-height-${buttonState.size})`,
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
          cssVariable: `var(--layera-button-fontSize-${buttonState.size})`,
          selector: '.layera-button',
          htmlAttribute: `data-font-size="${buttonState.size}"`,
          currentValue: `var(--layera-button-fontSize-${buttonState.size})`,
          borderColor: 'info'
        },
        {
          category: '💪 Font Weight',
          cssVariable: 'var(--layera-button-fontWeight)',
          selector: '.layera-button',
          htmlAttribute: 'data-font-weight="auto/defined"',
          currentValue: 'var(--layera-button-fontWeight)',
          borderColor: 'success'
        },
        {
          category: '🎨 Text Color',
          cssVariable: `var(--layera-button-color-${colorCategory})`,
          selector: '.layera-button',
          htmlAttribute: `data-text-color="${colorCategory}"`,
          currentValue: `var(--layera-button-color-${colorCategory})`,
          borderColor: 'warning'
        },
        {
          category: '📝 Text Content',
          cssVariable: 'Dynamic Content',
          selector: '.layera-button .button-text',
          htmlAttribute: `data-text="${buttonState.text}"`,
          currentValue: `"${buttonState.text}" | ${buttonState.withIcon ? 'With Icon' : 'No Icon'}`,
          borderColor: 'primary'
        }
      ]
    },
    {
      id: 'icons',
      title: 'Icons',
      icon: <CheckIcon size="sm" />,
      variableCount: 3,
      variables: [
        {
          category: '📐 Icon Size',
          cssVariable: `var(--layera-button-iconSize-${buttonState.size})`,
          selector: '.layera-button .icon',
          htmlAttribute: `data-icon-size="${buttonState.size}"`,
          currentValue: `var(--layera-button-iconSize-${buttonState.size})`,
          borderColor: 'info'
        },
        {
          category: '🎯 Icon Position',
          cssVariable: 'var(--layera-button-iconPosition)',
          selector: '.layera-button .icon',
          htmlAttribute: 'data-icon-position="left/right"',
          currentValue: 'var(--layera-button-iconPosition)',
          borderColor: 'success'
        },
        {
          category: '✅ Icon Status',
          cssVariable: 'Boolean State',
          selector: '.layera-button',
          htmlAttribute: `data-with-icon="${buttonState.withIcon}"`,
          currentValue: buttonState.withIcon ? 'Enabled' : 'Disabled',
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
          cssVariable: 'var(--layera-button-focus-outline)',
          selector: '.layera-button:focus',
          htmlAttribute: 'data-focus="true/false"',
          currentValue: 'var(--layera-button-focus-outline)',
          borderColor: 'primary'
        },
        {
          category: '🚫 Disabled State',
          cssVariable: 'var(--layera-button-disabled-opacity)',
          selector: '.layera-button:disabled',
          htmlAttribute: 'data-disabled="true/false"',
          currentValue: 'var(--layera-button-disabled-opacity)',
          borderColor: 'secondary'
        },
        {
          category: '⏱️ Loading State',
          cssVariable: 'var(--layera-button-loading-spinner)',
          selector: '.layera-button .spinner',
          htmlAttribute: 'data-loading="true/false"',
          currentValue: 'var(--layera-button-loading-spinner)',
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
          category: '🔷 Shape',
          cssVariable: `var(--layera-button-shape-${buttonState.shape})`,
          selector: '.layera-button',
          htmlAttribute: `data-shape="${buttonState.shape}"`,
          currentValue: buttonState.shape,
          borderColor: 'info'
        },
        {
          category: '🎨 Color Category',
          cssVariable: `var(--layera-button-colorCategory-${colorCategory})`,
          selector: '.layera-button',
          htmlAttribute: `data-color="${colorCategory}"`,
          currentValue: colorCategory,
          borderColor: 'success'
        },
        {
          category: '🏷️ Element Type',
          cssVariable: 'var(--layera-button-elementType)',
          selector: '.layera-button',
          htmlAttribute: 'data-element="button"',
          currentValue: 'Button',
          borderColor: 'primary'
        }
      ]
    }
  ];
};