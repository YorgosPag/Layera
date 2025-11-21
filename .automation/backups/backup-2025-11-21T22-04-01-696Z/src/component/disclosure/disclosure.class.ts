/**
 * 🎭 LAYERA DISCLOSURE CLASS - Disclosure system structure & CSS generation
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το disclosure system
 * Χρησιμοποιείται για validation, CSS generation και type safety σε components
 */

import { DISCLOSURE_VARIABLES } from './disclosure.variables';
import {
  ACCORDION_VARIANTS,
  TABS_VARIANTS,
  DISCLOSURE_SIZE_VARIANTS,
  COLLAPSIBLE_VARIANTS,
  TABS_ORIENTATION_VARIANTS
} from './disclosure.variants';

// DISCLOSURE SYSTEM CLASS - Enterprise structure
export class DisclosureSystem {
  // Disclosure tokens
  static readonly variables = DISCLOSURE_VARIABLES;
  static readonly accordionVariants = ACCORDION_VARIANTS;
  static readonly tabsVariants = TABS_VARIANTS;
  static readonly sizeVariants = DISCLOSURE_SIZE_VARIANTS;
  static readonly collapsibleVariants = COLLAPSIBLE_VARIANTS;
  static readonly orientationVariants = TABS_ORIENTATION_VARIANTS;

  // Utility methods για validation
  static isValidAccordionVariant(variant: string): boolean {
    return Object.keys(this.accordionVariants).includes(variant);
  }

  static isValidTabsVariant(variant: string): boolean {
    return Object.keys(this.tabsVariants).includes(variant);
  }

  static isValidSize(size: string): boolean {
    return Object.keys(this.sizeVariants).includes(size);
  }

  // Helper για accordion CSS generation
  static getAccordionCSS(
    variant: keyof typeof ACCORDION_VARIANTS,
    size: keyof typeof DISCLOSURE_SIZE_VARIANTS = 'medium'
  ) {
    const variantProps = this.accordionVariants[variant];
    const sizeProps = this.sizeVariants[size];

    return {
      // Container styles
      backgroundColor: variantProps.background,
      border: variantProps.border,
      borderRadius: variantProps.borderRadius,
      boxShadow: variantProps.shadow,

      // Header styles
      '--accordion-header-padding': sizeProps.accordionHeaderPadding,
      '--accordion-content-padding': sizeProps.accordionContentPadding,
      '--accordion-font-size': sizeProps.accordionFontSize,
    };
  }

  // Helper για tabs CSS generation
  static getTabsCSS(
    variant: keyof typeof TABS_VARIANTS,
    size: keyof typeof DISCLOSURE_SIZE_VARIANTS = 'medium',
    orientation: keyof typeof TABS_ORIENTATION_VARIANTS = 'horizontal'
  ) {
    const variantProps = this.tabsVariants[variant];
    const sizeProps = this.sizeVariants[size];
    const orientationProps = this.orientationVariants[orientation];

    return {
      // Container styles
      backgroundColor: variantProps.background,
      border: variantProps.border || 'none',
      borderRadius: variantProps.borderRadius || '0',
      borderBottom: variantProps.borderBottom || 'none',

      // Layout
      flexDirection: orientationProps.tabsDirection,
      gap: orientationProps.tabsGap,

      // Trigger styles
      '--tabs-trigger-padding': sizeProps.tabsTriggerPadding,
      '--tabs-content-padding': sizeProps.tabsContentPadding,
      '--tabs-font-size': sizeProps.tabsFontSize,
      '--tabs-indicator-height': sizeProps.tabsIndicatorHeight,
    };
  }

  // Helper για collapsible CSS generation
  static getCollapsibleCSS(variant: keyof typeof COLLAPSIBLE_VARIANTS) {
    const variantProps = this.collapsibleVariants[variant];

    return {
      '--trigger-background': variantProps.triggerBackground,
      '--trigger-background-hover': variantProps.triggerBackgroundHover,
      '--trigger-padding': variantProps.triggerPadding,
      '--content-padding': variantProps.contentPadding,
    };
  }
}

// DISCLOSURE CSS CLASSES - Generated CSS classes για direct usage
export const LAYERA_DISCLOSURE_CSS = `
/* 🎭 LAYERA DISCLOSURE COMPONENT STYLES */

/* Accordion Styles */
.layera-accordion {
  background: var(--layera-accordion-background);
  border: 1px solid var(--layera-accordion-border);
  border-radius: var(--layera-accordion-border-radius);
  box-shadow: var(--layera-accordion-shadow);
  overflow: hidden;
}

.layera-accordion__item {
  border-bottom: 1px solid var(--layera-accordion-border);
}

.layera-accordion__item:last-child {
  border-bottom: none;
}

.layera-accordion__header {
  background: var(--layera-accordion-header-background);
  padding: var(--layera-accordion-header-padding);
  border: none;
  width: 100%;
  text-align: left;
  font-size: var(--layera-accordion-header-font-size);
  font-weight: var(--layera-accordion-header-font-weight);
  line-height: var(--layera-accordion-header-line-height);
  color: var(--layera-accordion-header-text-color);
  cursor: pointer;
  transition: background-color var(--layera-duration-fast);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layera-accordion__header:hover {
  background: var(--layera-accordion-header-background-hover);
  color: var(--layera-accordion-header-text-hover);
}

.layera-accordion__header:disabled {
  background: var(--layera-accordion-header-background-disabled);
  color: var(--layera-accordion-header-text-disabled);
  cursor: not-allowed;
}

.layera-accordion__content {
  background: var(--layera-accordion-content-background);
  padding: var(--layera-accordion-content-padding);
  color: var(--layera-accordion-content-text-color);
  font-size: var(--layera-accordion-content-font-size);
  line-height: var(--layera-accordion-content-line-height);
  animation: slideDown var(--layera-duration-normal) var(--layera-easing-ease-out);
}

.layera-accordion__icon {
  transition: transform var(--layera-duration-fast);
}

.layera-accordion__header[aria-expanded="true"] .layera-accordion__icon {
  transform: rotate(180deg);
}

/* Accordion Variants */
.layera-accordion--ghost {
  background: transparent;
  border: none;
  box-shadow: none;
}

.layera-accordion--elevated {
  box-shadow: var(--layera-disclosure-elevated-shadow);
}

.layera-accordion--outlined {
  background: transparent;
  box-shadow: none;
}

/* Tabs Styles */
.layera-tabs {
  background: var(--layera-tabs-background);
}

.layera-tabs__list {
  display: flex;
  border-bottom: 1px solid var(--layera-tabs-border-bottom);
  gap: var(--layera-tabs-gap);
}

.layera-tabs__trigger {
  background: var(--layera-tabs-trigger-background);
  border: none;
  padding: var(--layera-tabs-trigger-padding);
  color: var(--layera-tabs-trigger-text-color);
  font-size: var(--layera-tabs-trigger-font-size);
  font-weight: var(--layera-tabs-trigger-font-weight);
  cursor: pointer;
  position: relative;
  transition: all var(--layera-duration-fast);
  border-radius: var(--layera-tabs-trigger-border-radius);
}

.layera-tabs__trigger:hover {
  background: var(--layera-tabs-trigger-background-hover);
  color: var(--layera-tabs-trigger-text-hover);
}

.layera-tabs__trigger[aria-selected="true"] {
  background: var(--layera-tabs-trigger-background-active);
  color: var(--layera-tabs-trigger-text-active);
}

.layera-tabs__trigger[aria-selected="true"]::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: var(--layera-tabs-indicator-height);
  background: var(--layera-tabs-indicator-background);
  border-radius: var(--layera-tabs-indicator-border-radius);
}

.layera-tabs__content {
  padding: var(--layera-tabs-content-padding);
  color: var(--layera-tabs-content-text-color);
  font-size: var(--layera-tabs-content-font-size);
  line-height: var(--layera-tabs-content-line-height);
  animation: fadeIn var(--layera-duration-normal);
}

/* Tabs Orientation */
.layera-tabs--vertical .layera-tabs__list {
  flex-direction: column;
  border-right: 1px solid var(--layera-tabs-border-bottom);
  border-bottom: none;
}

.layera-tabs--vertical .layera-tabs__trigger[aria-selected="true"]::after {
  right: -1px;
  top: 50%;
  left: auto;
  transform: translateY(-50%);
  width: var(--layera-tabs-indicator-height);
  height: 100%;
}

/* Collapsible Styles */
.layera-collapsible__trigger {
  background: var(--trigger-background, transparent);
  border: none;
  padding: var(--trigger-padding);
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--layera-duration-fast);
}

.layera-collapsible__trigger:hover {
  background: var(--trigger-background-hover);
}

.layera-collapsible__content {
  padding: var(--content-padding);
  animation: slideDown var(--layera-duration-normal);
}

/* Size Variants */
.layera-disclosure--sm {
  --layera-accordion-header-padding: var(--layera-accordion-sm-header-padding);
  --layera-accordion-content-padding: var(--layera-accordion-sm-content-padding);
  --layera-accordion-header-font-size: var(--layera-accordion-sm-font-size);
  --layera-tabs-trigger-padding: var(--layera-tabs-sm-trigger-padding);
  --layera-tabs-content-padding: var(--layera-tabs-sm-content-padding);
  --layera-tabs-trigger-font-size: var(--layera-tabs-sm-font-size);
  --layera-tabs-indicator-height: var(--layera-tabs-sm-indicator-height);
}

.layera-disclosure--lg {
  --layera-accordion-header-padding: var(--layera-accordion-lg-header-padding);
  --layera-accordion-content-padding: var(--layera-accordion-lg-content-padding);
  --layera-accordion-header-font-size: var(--layera-accordion-lg-font-size);
  --layera-tabs-trigger-padding: var(--layera-tabs-lg-trigger-padding);
  --layera-tabs-content-padding: var(--layera-tabs-lg-content-padding);
  --layera-tabs-trigger-font-size: var(--layera-tabs-lg-font-size);
  --layera-tabs-indicator-height: var(--layera-tabs-lg-indicator-height);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

// DISCLOSURE SEMANTIC RULES - Enterprise specifications
export const DISCLOSURE_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    accordion: 'Expandable sections with single or multiple open panels',
    tabs: 'Content sections with single active panel',
    collapsible: 'Simple show/hide content sections',
  },

  // Accessibility guidelines
  accessibility: {
    keyboard: 'Support arrow keys, space, enter for navigation',
    aria: 'Use proper ARIA attributes (expanded, selected, controls)',
    focus: 'Provide visible focus indicators',
    content: 'Ensure content is accessible when collapsed',
  },

  // Interaction guidelines
  interaction: {
    timing: 'Use consistent animation timing across components',
    feedback: 'Provide clear visual feedback for state changes',
    orientation: 'Support both horizontal and vertical layouts',
    persistence: 'Consider state persistence across page loads',
  },

  // Design guidelines
  design: {
    consistency: 'Maintain consistent spacing and typography',
    hierarchy: 'Use proper visual hierarchy for headers and content',
    grouping: 'Group related disclosure components together',
    indication: 'Provide clear expand/collapse indicators',
  },

} as const;

// Helper types
export type DisclosureSystemStructure = typeof DISCLOSURE_VARIABLES;
export type AccordionVariant = keyof typeof ACCORDION_VARIANTS;
export type TabsVariant = keyof typeof TABS_VARIANTS;