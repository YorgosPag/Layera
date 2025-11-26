/**
 * 📢 LAYERA FEEDBACK COMPONENT SYSTEM - Class Implementation
 *
 * Enterprise-grade feedback component system που συνδυάζει variables, variants και
 * business logic για complete feedback management (Alerts, Toasts, Notifications).
 *
 * Features:
 * - CSS generation από token combinations
 * - TypeScript validation & type safety
 * - Component props generation
 * - Enterprise configuration management
 */

import {
  FEEDBACK_COMPONENT_VARIABLES,
  FEEDBACK_SIZE_VARIABLES,
  FEEDBACK_VARIANT_VARIABLES,
  FEEDBACK_POSITION_VARIABLES,
  FEEDBACK_ANIMATION_VALUES,
  type FeedbackComponentType,
  type FeedbackComponentVariant,
  type FeedbackComponentSize,
  type FeedbackPosition
} from './feedback.variables';

import {
  FEEDBACK_COMPONENT_VARIANTS,
  FEEDBACK_COMPONENT_SIZES,
  FEEDBACK_COMPONENT_TYPES,
  FEEDBACK_COMPONENT_STATES,
  FEEDBACK_COMPONENT_POSITIONS,
  FEEDBACK_COMPONENT_UTILITIES,
  generateFeedbackClasses,
  type FeedbackComponentVariantType,
  type FeedbackComponentSizeType,
  type FeedbackComponentStateType,
  type FeedbackComponentTypeType
} from './feedback.variants';

// FEEDBACK COMPONENT INTERFACE
export interface FeedbackComponentProps {
  variant: FeedbackComponentVariant;
  size: FeedbackComponentSize;
  type: FeedbackComponentType;
  title?: string;
  message: string;
  dismissible?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
  position?: FeedbackPosition;
  showIcon?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  onClose?: () => void;
  className?: string;
}

// FEEDBACK COMPONENT CONFIGURATION
export interface FeedbackComponentConfig {
  variant: FeedbackComponentVariant;
  size: FeedbackComponentSize;
  type: FeedbackComponentType;
  position?: FeedbackPosition;
  state?: FeedbackComponentStateType;
}

// FEEDBACK COMPONENT CSS RESULT
export interface FeedbackComponentCSS {
  variables: Record<string, string>;
  classes: {
    container: string;
    wrapper?: string;
    content: string;
    icon: string;
    title: string;
    message: string;
    actions: string;
    closeButton: string;
    progressBar?: string;
  };
  animations?: Record<string, Record<string, any>>;
}

/**
 * FeedbackComponentSystem Class
 *
 * Κεντρικό σύστημα διαχείρισης feedback components με full enterprise support.
 * Παρέχει CSS generation, validation, και component configuration.
 */
export class FeedbackComponentSystem {
  /**
   * Validates feedback component configuration
   */
  static validateConfig(config: FeedbackComponentConfig): boolean {
    const validVariants: FeedbackComponentVariant[] = ['success', 'warning', 'error', 'info', 'neutral'];
    const validSizes: FeedbackComponentSize[] = ['sm', 'md', 'lg', 'xl'];
    const validTypes: FeedbackComponentType[] = ['alert', 'toast', 'notification', 'banner', 'inline', 'modal'];

    if (!validVariants.includes(config.variant)) {
      console.warn(`Invalid feedback variant: ${config.variant}`);
      return false;
    }

    if (!validSizes.includes(config.size)) {
      console.warn(`Invalid feedback size: ${config.size}`);
      return false;
    }

    if (!validTypes.includes(config.type)) {
      console.warn(`Invalid feedback type: ${config.type}`);
      return false;
    }

    return true;
  }

  /**
   * Generates complete CSS για feedback component
   */
  static generateCSS(config: FeedbackComponentConfig): FeedbackComponentCSS {
    if (!this.validateConfig(config)) {
      throw new Error(`Invalid feedback configuration: ${JSON.stringify(config)}`);
    }

    // Base variables
    const variables = { ...FEEDBACK_COMPONENT_VARIABLES };

    // Size-specific variables
    if (FEEDBACK_SIZE_VARIABLES[config.size]) {
      Object.assign(variables, FEEDBACK_SIZE_VARIABLES[config.size]);
    }

    // Variant-specific variables
    if (FEEDBACK_VARIANT_VARIABLES[config.variant]) {
      Object.assign(variables, FEEDBACK_VARIANT_VARIABLES[config.variant]);
    }

    // Position-specific variables
    if (config.position && FEEDBACK_POSITION_VARIABLES[config.position]) {
      Object.assign(variables, FEEDBACK_POSITION_VARIABLES[config.position]);
    }

    // Generate classes using helper function
    const classes = generateFeedbackClasses(
      config.variant as FeedbackComponentVariantType,
      config.size as FeedbackComponentSizeType,
      config.type as FeedbackComponentTypeType,
      config.position
    );

    return {
      variables,
      classes: {
        container: classes.container,
        wrapper: classes.wrapper,
        content: 'layera-feedback__content',
        icon: classes.icon,
        title: classes.title,
        message: classes.message,
        actions: classes.actions,
        closeButton: classes.closeButton,
        progressBar: FEEDBACK_COMPONENT_VARIANTS[config.variant].progressBar,
      },
      animations: FEEDBACK_ANIMATION_VALUES,
    };
  }

  /**
   * Gets component props για React/Vue components
   */
  static getComponentProps(
    variant: FeedbackComponentVariant = 'info',
    size: FeedbackComponentSize = 'md',
    type: FeedbackComponentType = 'alert',
    position?: FeedbackPosition
  ): FeedbackComponentProps {
    const config = { variant, size, type, position };

    if (!this.validateConfig(config)) {
      throw new Error(`Invalid feedback configuration`);
    }

    return {
      variant,
      size,
      type,
      message: '', // Θα συμπληρωθεί από το component
      position,
      dismissible: type === 'toast' || type === 'notification',
      autoClose: type === 'toast',
      autoCloseDelay: 5000,
      showIcon: true,
    };
  }

  /**
   * Generates inline styles object
   */
  static getInlineStyles(config: FeedbackComponentConfig): Record<string, string> {
    const css = this.generateCSS(config);
    const inlineStyles: Record<string, string> = {};

    // Convert CSS variables to inline styles
    Object.entries(css.variables).forEach(([key, value]) => {
      // Convert kebab-case to camelCase για React styling
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      inlineStyles[camelKey] = value;
    });

    return inlineStyles;
  }

  /**
   * Gets CSS class string για component
   */
  static getClassName(
    variant: FeedbackComponentVariant,
    size: FeedbackComponentSize,
    type: FeedbackComponentType,
    position?: FeedbackPosition,
    state?: FeedbackComponentStateType
  ): string {
    const classes = generateFeedbackClasses(
      variant as FeedbackComponentVariantType,
      size as FeedbackComponentSizeType,
      type as FeedbackComponentTypeType,
      position
    );

    let className = classes.container;

    if (state && FEEDBACK_COMPONENT_STATES[state]) {
      className += ` ${FEEDBACK_COMPONENT_STATES[state]}`;
    }

    return className;
  }

  /**
   * Gets animation configuration για component transitions
   */
  static getAnimationConfig(type: FeedbackComponentType, position?: FeedbackPosition) {
    const animations = FEEDBACK_ANIMATION_VALUES;

    switch (type) {
      case 'toast':
        if (position?.includes('left')) return animations.slideInLeft;
        if (position?.includes('right')) return animations.slideInRight;
        if (position?.includes('top')) return animations.slideInTop;
        if (position?.includes('bottom')) return animations.slideInBottom;
        return animations.fadeIn;

      case 'modal':
        return animations.fadeIn;

      case 'notification':
        return animations.slideInTop;

      case 'banner':
        return animations.slideInTop;

      default:
        return animations.fadeIn;
    }
  }

  /**
   * Gets default icons για κάθε variant
   */
  static getDefaultIcon(variant: FeedbackComponentVariant): string {
    const iconMap = {
      success: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
      info: 'Info',
      neutral: 'MessageCircle',
    };

    return iconMap[variant];
  }

  /**
   * Gets auto-close delay based on message length and type
   */
  static getAutoCloseDelay(message: string, type: FeedbackComponentType): number {
    const baseDelay = 5000; // 5 seconds
    const wordsPerSecond = 3; // Average reading speed

    const words = message.split(' ').length;
    const readingTime = (words / wordsPerSecond) * 1000;

    // Add buffer time based on component type
    const bufferMap = {
      toast: 2000,
      notification: 3000,
      alert: 1000,
      banner: 2000,
      inline: 0, // No auto-close για inline
      modal: 0,  // No auto-close για modal
    };

    return Math.max(baseDelay, readingTime + bufferMap[type]);
  }

  /**
   * Enterprise configuration presets
   */
  static readonly ENTERPRISE_PRESETS = {
    // Critical system alerts
    SYSTEM_ERROR: {
      variant: 'error' as const,
      size: 'lg' as const,
      type: 'banner' as const,
      position: 'top-center' as const,
    },

    // Success confirmations
    ACTION_SUCCESS: {
      variant: 'success' as const,
      size: 'md' as const,
      type: 'toast' as const,
      position: 'top-right' as const,
    },

    // Warning notifications
    WARNING_NOTICE: {
      variant: 'warning' as const,
      size: 'md' as const,
      type: 'notification' as const,
      position: 'top-center' as const,
    },

    // Informational messages
    INFO_MESSAGE: {
      variant: 'info' as const,
      size: 'sm' as const,
      type: 'inline' as const,
    },

    // Validation errors
    VALIDATION_ERROR: {
      variant: 'error' as const,
      size: 'sm' as const,
      type: 'inline' as const,
    },
  } as const;

  /**
   * Gets enterprise preset configuration
   */
  static getEnterprisePreset(preset: keyof typeof FeedbackComponentSystem.ENTERPRISE_PRESETS): FeedbackComponentConfig {
    return this.ENTERPRISE_PRESETS[preset];
  }
}