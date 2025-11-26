/**
 * 🎯 LAYERA BADGE CLASS - Badge component system structure & rules
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το badge/chip component system
 * Χρησιμοποιείται για validation, type safety και CSS generation σε Badge components
 */

import {
  BADGE_VARIABLES,
  BadgeSize,
  BadgeVariant,
  BadgeType,
  BadgeState
} from './badges.variables';

import {
  BADGE_VARIANTS,
  BadgeVariantType,
  BadgeDefaultVariant,
  ChipVariant,
  NotificationVariant,
  BadgeSizeVariant
} from './badges.variants';

// BADGE COMPONENT SYSTEM CLASS - Enterprise structure
export class BadgeComponentSystem {
  // Component tokens και variants
  static readonly variables = BADGE_VARIABLES;
  static readonly variants = BADGE_VARIANTS;

  // Validation methods για type safety
  static isValidVariant(variant: string): variant is BadgeVariant {
    return ['default', 'success', 'error', 'warning', 'info', 'primary', 'secondary'].includes(variant);
  }

  static isValidSize(size: string): size is BadgeSize {
    return ['xs', 'sm', 'md', 'lg'].includes(size);
  }

  static isValidType(type: string): type is BadgeType {
    return ['badge', 'chip', 'dot', 'notification', 'status', 'count'].includes(type);
  }

  static isValidState(state: string): state is BadgeState {
    return ['default', 'hover', 'active', 'disabled', 'loading'].includes(state);
  }

  // Helper για CSS generation - Δημιουργεί complete CSS rules για badge
  static getBadgeCSS(
    variant: BadgeVariant = 'default',
    size: BadgeSize = 'md',
    state: BadgeState = 'default',
    type: BadgeType = 'badge'
  ) {
    // Get variant styles
    const variantStyle = type === 'badge'
      ? this.variants[variant][state] || this.variants[variant].default
      : this.variants[variant].default;

    // Get size styles
    const sizeStyle = this.variants.size[size];

    return {
      // Core badge styles
      backgroundColor: variantStyle.background,
      color: variantStyle.color,
      border: variantStyle.border,
      borderRadius: variantStyle.borderRadius || sizeStyle?.borderRadius,

      // Size styles
      height: sizeStyle?.height,
      padding: sizeStyle?.padding,
      fontSize: sizeStyle?.fontSize,
      lineHeight: sizeStyle?.lineHeight,

      // Interactive styles
      transition: variantStyle.transition,
      boxShadow: variantStyle.shadow,
      cursor: variantStyle.cursor,

      // Usage information
      usage: variantStyle.usage,
    };
  }

  // Helper για Chip CSS generation
  static getChipCSS(
    variant: ChipVariant = 'default',
    hasClose: boolean = false,
    hasIcon: boolean = false
  ) {
    let chipVariant = 'default';

    if (hasClose) chipVariant = 'withClose';
    if (hasIcon) chipVariant = 'withIcon';

    const chipStyle = this.variants.chip[chipVariant as keyof typeof this.variants.chip];

    return {
      height: chipStyle.height,
      padding: chipStyle.padding,
      fontSize: chipStyle.fontSize,
      fontWeight: chipStyle.fontWeight,
      borderRadius: chipStyle.borderRadius,
      gap: chipStyle.gap,
      backgroundColor: chipStyle.background,
      color: chipStyle.color,

      // Close button styles (αν υπάρχει)
      ...(hasClose && {
        closeButtonSize: chipStyle.closeSize,
        closeButtonColor: chipStyle.closeColor,
      }),

      // Icon styles (αν υπάρχει)
      ...(hasIcon && {
        iconSize: chipStyle.iconSize,
        avatarSize: chipStyle.avatarSize,
      }),

      usage: chipStyle.usage,
    };
  }

  // Helper για Notification Badge CSS
  static getNotificationCSS(
    variant: NotificationVariant = 'default',
    count?: number
  ) {
    const notificationStyle = this.variants.notification[variant];
    const isCountBadge = count !== undefined && count > 0;

    return {
      size: notificationStyle.size || notificationStyle.minWidth,
      fontSize: notificationStyle.fontSize,
      backgroundColor: notificationStyle.background,
      color: notificationStyle.color,
      border: notificationStyle.border,
      borderRadius: notificationStyle.borderRadius,
      boxShadow: notificationStyle.shadow,

      // Count specific styles
      ...(isCountBadge && {
        minWidth: notificationStyle.minWidth,
        content: count > 99 ? '99+' : count.toString(),
      }),

      usage: notificationStyle.usage,
    };
  }

  // Helper για Status Dot CSS
  static getStatusDotCSS(status: 'online' | 'offline' | 'away' | 'busy' = 'offline') {
    const dotStyle = this.variants.dot.status[status];

    return {
      size: dotStyle.size,
      backgroundColor: dotStyle.background,
      borderRadius: dotStyle.borderRadius,
      usage: dotStyle.usage,
    };
  }

  // Helper για Interactive Badge CSS με hover effects
  static getInteractiveBadgeCSS(
    variant: BadgeVariant = 'primary',
    size: BadgeSize = 'md'
  ) {
    const defaultStyle = this.getBadgeCSS(variant, size, 'default');
    const hoverStyle = this.getBadgeCSS(variant, size, 'hover');
    const activeStyle = this.getBadgeCSS(variant, size, 'active');

    return {
      default: defaultStyle,
      hover: {
        ...hoverStyle,
        transform: this.variables['interactive-badge-hover-transform'],
      },
      active: {
        ...activeStyle,
        transform: this.variables['interactive-badge-active-transform'],
      },
      cursor: this.variables['interactive-badge-cursor'],
    };
  }

  // Helper για Loading Badge CSS
  static getLoadingBadgeCSS(variant: BadgeVariant = 'default', size: BadgeSize = 'md') {
    const baseStyle = this.getBadgeCSS(variant, size, 'default');

    return {
      ...baseStyle,
      opacity: this.variables['badge-loading-opacity'],
      animation: this.variables['badge-loading-animation'],
      usage: 'Loading state badge με pulse animation',
    };
  }

  // Utility για validation combinations
  static validateBadgeConfig(config: {
    variant?: BadgeVariant;
    size?: BadgeSize;
    type?: BadgeType;
    state?: BadgeState;
  }) {
    const { variant = 'default', size = 'md', type = 'badge', state = 'default' } = config;

    return {
      isValid:
        this.isValidVariant(variant) &&
        this.isValidSize(size) &&
        this.isValidType(type) &&
        this.isValidState(state),
      variant: this.isValidVariant(variant) ? variant : 'default',
      size: this.isValidSize(size) ? size : 'md',
      type: this.isValidType(type) ? type : 'badge',
      state: this.isValidState(state) ? state : 'default',
    };
  }

  // Helper για generating CSS class names
  static generateBadgeClassName(
    variant: BadgeVariant = 'default',
    size: BadgeSize = 'md',
    type: BadgeType = 'badge',
    state?: BadgeState
  ): string {
    const baseClass = `layera-${type}`;
    const variantClass = `layera-${type}--${variant}`;
    const sizeClass = `layera-${type}--${size}`;
    const stateClass = state ? `layera-${type}--${state}` : '';

    return [baseClass, variantClass, sizeClass, stateClass].filter(Boolean).join(' ');
  }

  // Debug helper για development
  static debugBadge(config: Parameters<typeof this.validateBadgeConfig>[0]) {
    const validation = this.validateBadgeConfig(config);
    const css = this.getBadgeCSS(
      validation.variant,
      validation.size,
      validation.state,
      validation.type
    );
    const className = this.generateBadgeClassName(
      validation.variant,
      validation.size,
      validation.type,
      validation.state
    );

    return {
      validation,
      css,
      className,
      variables: this.variables,
    };
  }
}

// LAYERA BADGE CSS CLASSES - Ready-to-use CSS classes
export const LAYERA_BADGE_CSS = `
/* 🎯 LAYERA BADGE CORE STYLES */
.layera-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  font-family: ${BADGE_VARIABLES['badge-text-color']};
  font-weight: 500;
  border-style: solid;
  border-width: ${BADGE_VARIABLES['badge-border-width']};
  transition: ${BADGE_VARIABLES['badge-transition']};
  user-select: none;
}

/* BADGE SIZE VARIANTS */
.layera-badge--xs {
  height: ${BADGE_VARIABLES['badge-xs-height']};
  padding: ${BADGE_VARIABLES['badge-xs-padding']};
  font-size: ${BADGE_VARIABLES['badge-xs-font-size']};
  line-height: ${BADGE_VARIABLES['badge-xs-line-height']};
}

.layera-badge--sm {
  height: ${BADGE_VARIABLES['badge-sm-height']};
  padding: ${BADGE_VARIABLES['badge-sm-padding']};
  font-size: ${BADGE_VARIABLES['badge-sm-font-size']};
  line-height: ${BADGE_VARIABLES['badge-sm-line-height']};
}

.layera-badge--md {
  height: ${BADGE_VARIABLES['badge-md-height']};
  padding: ${BADGE_VARIABLES['badge-md-padding']};
  font-size: ${BADGE_VARIABLES['badge-md-font-size']};
  line-height: ${BADGE_VARIABLES['badge-md-line-height']};
}

.layera-badge--lg {
  height: ${BADGE_VARIABLES['badge-lg-height']};
  padding: ${BADGE_VARIABLES['badge-lg-padding']};
  font-size: ${BADGE_VARIABLES['badge-lg-font-size']};
  line-height: ${BADGE_VARIABLES['badge-lg-line-height']};
}

/* BADGE VARIANT STYLES */
.layera-badge--default {
  background-color: ${BADGE_VARIABLES['badge-background']};
  color: ${BADGE_VARIABLES['badge-text-color']};
  border-color: ${BADGE_VARIABLES['badge-border']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
}

.layera-badge--success {
  background-color: ${BADGE_VARIABLES['badge-success-background']};
  color: ${BADGE_VARIABLES['badge-success-color']};
  border-color: ${BADGE_VARIABLES['badge-success-border']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
}

.layera-badge--error {
  background-color: ${BADGE_VARIABLES['badge-error-background']};
  color: ${BADGE_VARIABLES['badge-error-color']};
  border-color: ${BADGE_VARIABLES['badge-error-border']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
}

.layera-badge--warning {
  background-color: ${BADGE_VARIABLES['badge-warning-background']};
  color: ${BADGE_VARIABLES['badge-warning-color']};
  border-color: ${BADGE_VARIABLES['badge-warning-border']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
}

.layera-badge--primary {
  background-color: ${BADGE_VARIABLES['badge-primary-background']};
  color: ${BADGE_VARIABLES['badge-primary-color']};
  border-color: ${BADGE_VARIABLES['badge-primary-border']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
}

/* CHIP STYLES */
.layera-chip {
  display: inline-flex;
  align-items: center;
  gap: ${BADGE_VARIABLES['chip-gap']};
  height: ${BADGE_VARIABLES['chip-height']};
  padding: ${BADGE_VARIABLES['chip-padding']};
  font-size: ${BADGE_VARIABLES['chip-font-size']};
  font-weight: ${BADGE_VARIABLES['chip-font-weight']};
  border-radius: ${BADGE_VARIABLES['chip-border-radius']};
  background-color: ${BADGE_VARIABLES['badge-background']};
  color: ${BADGE_VARIABLES['badge-text-color']};
  cursor: ${BADGE_VARIABLES['interactive-badge-cursor']};
  transition: ${BADGE_VARIABLES['badge-transition']};
}

.layera-chip:hover {
  background-color: ${BADGE_VARIABLES['badge-background-hover']};
  transform: ${BADGE_VARIABLES['interactive-badge-hover-transform']};
}

/* NOTIFICATION BADGE */
.layera-notification {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${BADGE_VARIABLES['notification-badge-size']};
  height: ${BADGE_VARIABLES['notification-badge-size']};
  font-size: ${BADGE_VARIABLES['notification-badge-font-size']};
  background-color: ${BADGE_VARIABLES['notification-badge-background']};
  color: ${BADGE_VARIABLES['notification-badge-color']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
  box-shadow: ${BADGE_VARIABLES['notification-badge-shadow']};
}

/* STATUS DOT */
.layera-status-dot {
  width: ${BADGE_VARIABLES['dot-size']};
  height: ${BADGE_VARIABLES['dot-size']};
  border-radius: ${BADGE_VARIABLES['badge-border-radius']};
  margin: ${BADGE_VARIABLES['dot-margin']};
}

.layera-status-dot--online { background-color: ${BADGE_VARIABLES['status-online-background']}; }
.layera-status-dot--offline { background-color: ${BADGE_VARIABLES['status-offline-background']}; }
.layera-status-dot--away { background-color: ${BADGE_VARIABLES['status-away-background']}; }
.layera-status-dot--busy { background-color: ${BADGE_VARIABLES['status-busy-background']}; }

/* INTERACTIVE STATES */
.layera-badge--interactive {
  cursor: ${BADGE_VARIABLES['interactive-badge-cursor']};
  transition: ${BADGE_VARIABLES['badge-transition']};
}

.layera-badge--interactive:hover {
  transform: ${BADGE_VARIABLES['interactive-badge-hover-transform']};
  box-shadow: ${BADGE_VARIABLES['badge-shadow-hover']};
}

.layera-badge--interactive:active {
  transform: ${BADGE_VARIABLES['interactive-badge-active-transform']};
}

/* LOADING STATE */
.layera-badge--loading {
  opacity: ${BADGE_VARIABLES['badge-loading-opacity']};
  animation: ${BADGE_VARIABLES['badge-loading-animation']};
}
`;

// Export για CSS integration
export { LAYERA_BADGE_CSS as default };