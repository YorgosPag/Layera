/**
 * 🎨 LAYERA INPUT VARIANTS - Input component visual variants
 *
 * Συστηματικές παραλλαγές για Input components που συνδυάζουν semantic και core tokens
 * για συνεπή εμφάνιση σε όλες τις εφαρμογές
 */

// INPUT VARIANT TYPES
export type InputVariantType = 'default' | 'filled' | 'outlined' | 'underlined';
export type InputSizeType = 'sm' | 'md' | 'lg';
export type InputStateType = 'default' | 'hover' | 'focus' | 'disabled' | 'error' | 'success' | 'warning';

// INPUT VARIANT DEFINITIONS
export const INPUT_VARIANTS = {
  // DEFAULT VARIANT - Standard input with border
  default: {
    default: {
      background: 'var(--layera-color-surface-primary)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-default)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    hover: {
      background: 'var(--layera-color-surface-primary)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-hover)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    focus: {
      background: 'var(--layera-color-surface-primary)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-focus)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'var(--layera-shadow-outline)',
    },
    disabled: {
      background: 'var(--layera-color-surface-disabled)',
      color: 'var(--layera-color-text-disabled)',
      border: '1px solid var(--layera-color-border-disabled)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    error: {
      background: 'var(--layera-color-background-error)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-error)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
    success: {
      background: 'var(--layera-color-background-success)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-success)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
    },
    warning: {
      background: 'var(--layera-color-background-warning)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-warning)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(245, 158, 11, 0.1)',
    },
  },

  // FILLED VARIANT - Filled background with subtle border
  filled: {
    default: {
      background: 'var(--layera-color-surface-secondary)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid transparent',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    hover: {
      background: 'var(--layera-color-surface-accent)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-muted)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    focus: {
      background: 'var(--layera-color-surface-primary)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-focus)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'var(--layera-shadow-outline)',
    },
    disabled: {
      background: 'var(--layera-color-surface-disabled)',
      color: 'var(--layera-color-text-disabled)',
      border: '1px solid transparent',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    error: {
      background: 'var(--layera-color-background-error)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-error)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
    success: {
      background: 'var(--layera-color-background-success)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-success)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
    },
    warning: {
      background: 'var(--layera-color-background-warning)',
      color: 'var(--layera-color-text-primary)',
      border: '1px solid var(--layera-color-border-warning)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(245, 158, 11, 0.1)',
    },
  },

  // OUTLINED VARIANT - Prominent border, transparent background
  outlined: {
    default: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-default)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    hover: {
      background: 'var(--layera-color-surface-muted)',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-hover)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    focus: {
      background: 'var(--layera-color-surface-primary)',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-focus)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'var(--layera-shadow-outline)',
    },
    disabled: {
      background: 'var(--layera-color-surface-disabled)',
      color: 'var(--layera-color-text-disabled)',
      border: '2px solid var(--layera-color-border-disabled)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: 'none',
    },
    error: {
      background: 'var(--layera-color-background-error)',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-error)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
    success: {
      background: 'var(--layera-color-background-success)',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-success)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
    },
    warning: {
      background: 'var(--layera-color-background-warning)',
      color: 'var(--layera-color-text-primary)',
      border: '2px solid var(--layera-color-border-warning)',
      borderRadius: 'var(--layera-global-borderRadius-md)',
      shadow: '0 0 0 3px rgba(245, 158, 11, 0.1)',
    },
  },

  // UNDERLINED VARIANT - Bottom border only, minimal styling
  underlined: {
    default: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-default)',
      borderRadius: '0',
      shadow: 'none',
    },
    hover: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-hover)',
      borderRadius: '0',
      shadow: 'none',
    },
    focus: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-focus)',
      borderRadius: '0',
      shadow: 'none',
    },
    disabled: {
      background: 'transparent',
      color: 'var(--layera-color-text-disabled)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-disabled)',
      borderRadius: '0',
      shadow: 'none',
    },
    error: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-error)',
      borderRadius: '0',
      shadow: 'none',
    },
    success: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-success)',
      borderRadius: '0',
      shadow: 'none',
    },
    warning: {
      background: 'transparent',
      color: 'var(--layera-color-text-primary)',
      border: 'none',
      borderBottom: '2px solid var(--layera-color-border-warning)',
      borderRadius: '0',
      shadow: 'none',
    },
  },

  // SIZE VARIANTS - Διαφορετικά μεγέθη για inputs
  size: {
    sm: {
      height: '32px',
      padding: 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
      fontSize: 'var(--layera-fontSize-sm)',
      lineHeight: '1.4',
    },
    md: {
      height: '40px',
      padding: 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
      fontSize: 'var(--layera-fontSize-base)',
      lineHeight: '1.5',
    },
    lg: {
      height: '48px',
      padding: 'var(--layera-global-spacing-4) var(--layera-global-spacing-5)',
      fontSize: 'var(--layera-fontSize-lg)',
      lineHeight: '1.6',
    },
  },
} as const;

// SPECIALIZED INPUT VARIANTS για διαφορετικούς τύπους
export const SPECIALIZED_INPUT_VARIANTS = {
  // Switch component variants
  switch: {
    default: {
      width: '44px',
      height: '24px',
      background: 'var(--layera-color-surface-muted)',
      borderRadius: 'var(--layera-global-borderRadius-full)',
      thumb: {
        size: '20px',
        background: 'var(--layera-color-surface-primary)',
        shadow: 'var(--layera-shadow-sm)',
        translateX: '0',
      },
    },
    checked: {
      background: 'var(--layera-color-primary-500)',
      thumb: {
        translateX: '20px',
        background: 'var(--layera-color-surface-primary)',
      },
    },
    disabled: {
      background: 'var(--layera-color-surface-disabled)',
      thumb: {
        background: 'var(--layera-color-text-disabled)',
      },
    },
  },

  // Range slider variants
  range: {
    track: {
      height: '6px',
      background: 'var(--layera-color-surface-muted)',
      borderRadius: 'var(--layera-global-borderRadius-full)',
    },
    thumb: {
      size: 'var(--layera-global-spacing-5)',
      background: 'var(--layera-color-surface-primary)',
      border: '1px solid var(--layera-color-border-default)',
      borderRadius: '50%',
      shadow: 'var(--layera-shadow-sm)',
    },
    thumbHover: {
      shadow: 'var(--layera-shadow-md)',
      transform: 'scale(1.1)',
    },
  },

  // File input variants
  file: {
    button: {
      background: 'var(--layera-color-surface-secondary)',
      border: '1px solid var(--layera-color-border-default)',
      color: 'var(--layera-color-text-primary)',
      padding: 'var(--layera-global-spacing-2) var(--layera-global-spacing-4)',
      borderRadius: 'var(--layera-global-borderRadius-sm)',
    },
    buttonHover: {
      background: 'var(--layera-color-surface-accent)',
    },
    dropzone: {
      border: '2px dashed var(--layera-color-border-muted)',
      borderRadius: 'var(--layera-global-borderRadius-lg)',
      background: 'var(--layera-color-surface-muted)',
    },
    dropzoneActive: {
      border: '2px dashed var(--layera-color-border-focus)',
      background: 'var(--layera-color-background-info)',
    },
  },
} as const;

// FLOATING LABEL VARIANTS
export const FLOATING_LABEL_VARIANTS = {
  default: {
    position: 'absolute',
    top: '50%',
    left: 'var(--layera-global-spacing-3)',
    transform: 'translateY(-50%)',
    fontSize: 'var(--layera-fontSize-base)',
    color: 'var(--layera-color-text-muted)',
    transition: 'all var(--layera-motion-duration-fast) var(--layera-motion-easing-ease)',
    pointerEvents: 'none',
    zIndex: '1',
  },
  focused: {
    top: '0',
    transform: 'translateY(-50%) scale(0.875)',
    fontSize: 'var(--layera-fontSize-sm)',
    color: 'var(--layera-color-text-primary)',
  },
  filled: {
    top: '0',
    transform: 'translateY(-50%) scale(0.875)',
    fontSize: 'var(--layera-fontSize-sm)',
    color: 'var(--layera-color-text-secondary)',
  },
  error: {
    color: 'var(--layera-color-text-error)',
  },
} as const;

// INPUT GROUP VARIANTS για compound inputs
export const INPUT_GROUP_VARIANTS = {
  horizontal: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '0',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--layera-global-spacing-2)',
  },
  addon: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--layera-global-spacing-3) var(--layera-global-spacing-4)',
    background: 'var(--layera-color-surface-secondary)',
    border: '1px solid var(--layera-color-border-default)',
    color: 'var(--layera-color-text-secondary)',
    whiteSpace: 'nowrap',
  },
  addonLeft: {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
    borderRight: 'none',
  },
  addonRight: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    borderLeft: 'none',
  },
} as const;

// VALIDATION VARIANTS για input states
export const VALIDATION_VARIANTS = {
  pending: {
    border: '1px solid var(--layera-color-border-default)',
    shadow: 'none',
    icon: '⏳',
    iconColor: 'var(--layera-color-text-muted)',
  },
  valid: {
    border: '1px solid var(--layera-color-border-success)',
    shadow: '0 0 0 3px rgba(34, 197, 94, 0.1)',
    icon: '✓',
    iconColor: 'var(--layera-color-success-500)',
  },
  invalid: {
    border: '1px solid var(--layera-color-border-error)',
    shadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    icon: '⚠',
    iconColor: 'var(--layera-color-error-500)',
  },
  warning: {
    border: '1px solid var(--layera-color-border-warning)',
    shadow: '0 0 0 3px rgba(245, 158, 11, 0.1)',
    icon: '⚠',
    iconColor: 'var(--layera-color-warning-500)',
  },
} as const;