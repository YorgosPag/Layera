/**
 * 💬 LAYERA TOOLTIPS CLASS - Tooltip system structure & CSS generation
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το tooltips system
 * Χρησιμοποιείται για validation, CSS generation και type safety σε components
 */

import { TOOLTIPS_VARIABLES } from './tooltips.variables';
import { TOOLTIP_VARIANTS, POPOVER_VARIANTS, TOOLTIP_SIZE_VARIANTS, TOOLTIP_PLACEMENT_VARIANTS } from './tooltips.variants';

// TOOLTIPS SYSTEM CLASS - Enterprise structure
export class TooltipsSystem {
  // Tooltip tokens
  static readonly variables = TOOLTIPS_VARIABLES;
  static readonly variants = TOOLTIP_VARIANTS;
  static readonly popoverVariants = POPOVER_VARIANTS;
  static readonly sizeVariants = TOOLTIP_SIZE_VARIANTS;
  static readonly placementVariants = TOOLTIP_PLACEMENT_VARIANTS;

  // Utility methods για validation
  static isValidVariant(variant: string): boolean {
    return Object.keys(this.variants).includes(variant);
  }

  static isValidSize(size: string): boolean {
    return Object.keys(this.sizeVariants).includes(size);
  }

  static isValidPlacement(placement: string): boolean {
    return Object.keys(this.placementVariants).includes(placement);
  }

  // Helper για CSS generation
  static getTooltipCSS(variant: keyof typeof TOOLTIP_VARIANTS, size: keyof typeof TOOLTIP_SIZE_VARIANTS = 'medium') {
    const variantProps = this.variants[variant];
    const sizeProps = this.sizeVariants[size];

    return {
      backgroundColor: variantProps.background,
      color: variantProps.text,
      padding: sizeProps.padding,
      borderRadius: variantProps.borderRadius,
      boxShadow: variantProps.shadow,
      fontSize: sizeProps.fontSize,
      maxWidth: sizeProps.maxWidth,
      border: variantProps.border || 'none',
    };
  }

  // Helper για popover CSS generation
  static getPopoverCSS(variant: keyof typeof POPOVER_VARIANTS) {
    const variantProps = this.popoverVariants[variant];

    return {
      backgroundColor: variantProps.background,
      border: `1px solid ${variantProps.border}`,
      borderRadius: variantProps.borderRadius,
      boxShadow: variantProps.shadow,
      padding: variantProps.padding,
      maxWidth: variantProps.maxWidth,
      maxHeight: variantProps.maxHeight || 'none',
      minWidth: variantProps.minWidth || 'auto',
    };
  }

  // Helper για arrow CSS generation
  static getArrowCSS(variant: keyof typeof TOOLTIP_VARIANTS, placement: keyof typeof TOOLTIP_PLACEMENT_VARIANTS) {
    const variantProps = this.variants[variant];
    const placementProps = this.placementVariants[placement];

    return {
      backgroundColor: variantProps.background,
      width: this.variables['tooltip-arrow-size'],
      height: this.variables['tooltip-arrow-size'],
      position: 'absolute',
      [placementProps.arrowPosition]: `-${parseInt(this.variables['tooltip-arrow-size']) / 2}px`,
    };
  }
}

// TOOLTIP CSS CLASSES - Generated CSS classes για direct usage
export const LAYERA_TOOLTIP_CSS = `
/* 💬 LAYERA TOOLTIP COMPONENT STYLES */

/* Base tooltip styles */
.layera-tooltip {
  position: absolute;
  z-index: var(--layera-tooltip-z-index);
  padding: var(--layera-tooltip-padding);
  background: var(--layera-tooltip-background);
  color: var(--layera-tooltip-text);
  border-radius: var(--layera-tooltip-border-radius);
  box-shadow: var(--layera-tooltip-shadow);
  max-width: var(--layera-tooltip-max-width);
  font-size: var(--layera-tooltip-medium-font-size);
  font-weight: var(--layera-tooltip-font-weight);
  word-wrap: break-word;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity var(--layera-tooltip-transition-show), transform var(--layera-tooltip-transition-show);
  pointer-events: none;
}

.layera-tooltip.show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

/* Tooltip variants */
.layera-tooltip--light {
  background: var(--layera-tooltip-background-light);
  color: var(--layera-tooltip-text-light);
  border: 1px solid var(--layera-tooltip-border);
  box-shadow: var(--layera-tooltip-shadow-light);
}

.layera-tooltip--info {
  background: var(--layera-tooltip-info-background);
  color: var(--layera-tooltip-info-text);
}

.layera-tooltip--success {
  background: var(--layera-tooltip-success-background);
  color: var(--layera-tooltip-success-text);
}

.layera-tooltip--warning {
  background: var(--layera-tooltip-warning-background);
  color: var(--layera-tooltip-warning-text);
}

.layera-tooltip--error {
  background: var(--layera-tooltip-error-background);
  color: var(--layera-tooltip-error-text);
}

/* Tooltip sizes */
.layera-tooltip--small {
  padding: var(--layera-tooltip-small-padding);
  font-size: var(--layera-tooltip-small-font-size);
}

.layera-tooltip--large {
  padding: var(--layera-tooltip-large-padding);
  font-size: var(--layera-tooltip-large-font-size);
  max-width: var(--layera-popover-max-width);
}

/* Tooltip arrow */
.layera-tooltip__arrow {
  position: absolute;
  width: var(--layera-tooltip-arrow-size);
  height: var(--layera-tooltip-arrow-size);
  background: var(--layera-tooltip-arrow-background);
  transform: rotate(45deg);
}

.layera-tooltip--light .layera-tooltip__arrow {
  background: var(--layera-tooltip-arrow-background-light);
  border: 1px solid var(--layera-tooltip-border);
}

/* Popover styles */
.layera-popover {
  position: absolute;
  z-index: var(--layera-popover-z-index);
  background: var(--layera-popover-background);
  border: 1px solid var(--layera-popover-border);
  border-radius: var(--layera-popover-border-radius);
  box-shadow: var(--layera-popover-shadow);
  max-width: var(--layera-popover-max-width);
  min-width: var(--layera-popover-min-width);
  opacity: 0;
  transform: scale(0.95);
  transition: opacity var(--layera-tooltip-transition-show), transform var(--layera-tooltip-transition-show);
}

.layera-popover.show {
  opacity: 1;
  transform: scale(1);
}

.layera-popover__header {
  padding: var(--layera-popover-header-padding);
  border-bottom: 1px solid var(--layera-popover-header-border-bottom);
  background: var(--layera-popover-header-background);
  border-radius: var(--layera-popover-border-radius) var(--layera-popover-border-radius) 0 0;
  font-weight: var(--layera-tooltip-font-weight);
}

.layera-popover__content {
  padding: var(--layera-popover-content-padding);
  max-height: var(--layera-popover-content-max-height);
  overflow: var(--layera-popover-content-overflow);
}

.layera-popover__footer {
  padding: var(--layera-popover-footer-padding);
  border-top: 1px solid var(--layera-popover-footer-border-top);
  background: var(--layera-popover-footer-background);
  border-radius: 0 0 var(--layera-popover-border-radius) var(--layera-popover-border-radius);
  display: flex;
  gap: var(--layera-popover-footer-gap);
  justify-content: flex-end;
}

/* Trigger focus styles */
.layera-tooltip-trigger:focus {
  outline: 2px solid var(--layera-tooltip-trigger-focus-outline);
  outline-offset: var(--layera-tooltip-trigger-focus-outline-offset);
}
`;

// TOOLTIP SEMANTIC RULES - Enterprise specifications
export const TOOLTIP_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    tooltip: 'Brief, contextual information on hover or focus',
    popover: 'Rich interactive content with multiple elements',
    info: 'Additional context or help text',
    warning: 'Important warnings or cautions',
    error: 'Error messages and validation feedback',
    success: 'Success confirmations and positive feedback',
  },

  // Accessibility guidelines
  accessibility: {
    contrast: 'Maintain 4.5:1 contrast ratio minimum',
    keyboard: 'Support keyboard navigation and focus management',
    timing: 'Provide appropriate show/hide delays',
    role: 'Use proper ARIA roles and properties',
    focus: 'Return focus to trigger element when closed',
  },

  // Interaction guidelines
  interaction: {
    trigger: 'Support hover, focus, and click triggers',
    dismiss: 'Allow escape key and outside click to dismiss',
    position: 'Auto-position to stay within viewport',
    responsive: 'Adapt positioning for mobile devices',
  },

  // Content guidelines
  content: {
    brevity: 'Keep tooltip content brief and scannable',
    context: 'Provide relevant, actionable information',
    formatting: 'Use proper typography hierarchy',
    images: 'Include images only when they add value',
  },

} as const;

// Helper types
export type TooltipSystemStructure = typeof TOOLTIPS_VARIABLES;
export type TooltipVariant = keyof typeof TOOLTIP_VARIANTS;
export type PopoverVariant = keyof typeof POPOVER_VARIANTS;