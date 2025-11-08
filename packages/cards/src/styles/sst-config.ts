/**
 * Single Source of Truth (SST) Configuration για Cards
 * Enterprise-grade παραμετροποίηση με fallback support για ΟΛΑ τα variants
 *
 * 🚫 ΑΠΑΓΟΡΕΥΟΝΤΑΙ hardcoded values έξω από αυτό το αρχείο
 * ✅ ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ για όλα τα δεδομένα, strings και styles
 */

// 🎯 UNIVERSAL DATA SOURCE - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΟΛΩΝ ΤΩΝ ΔΕΔΟΜΕΝΩΝ
export const SST_DATA_CONFIG = {
  // Category Options - Κατηγορίες
  categoryOptions: [
    {
      value: 'offer',
      label: 'Ακίνητα',
      description: 'Καταχωρίστε ένα ακίνητο'
    },
    {
      value: 'search',
      label: 'Εργασία',
      description: 'Προσφέρετε μια θέση εργασίας'
    }
  ],

  // UI Text Labels - Κείμενα Interface
  labels: {
    categoryTitle: 'Επιλογή Κατηγορίας',
    startButton: 'Ξεκινήστε',
    helpText: 'Βοήθεια',
    securityDataProtection: 'Δεν μοιραζόμαστε τα στοιχεία σας',
    securityNoSpam: 'Χωρίς spam - ποτέ',
    readyMessage: 'Έτοιμο! Κλικ για προβολή',
    validationRequired: 'Παρακαλώ επιλέξτε κατηγορία'
  },

  // Component Variants - SST Variants
  componentVariants: {
    categoryCard: 'category-selection',
    primaryButton: 'primary',
    iconShield: 'xs',
    iconLock: 'xs',
    iconQuick: 'sm',
    iconClose: 'lg'
  },

  // Logic Values - Λογικές Τιμές
  logicValues: {
    intentOffer: 'offer',
    intentSearch: 'search',
    categoryProperty: 'property',
    categoryJob: 'job',
    stepCategory: 'category',
    stepIntent: 'intent'
  }
} as const;

export const SST_CARD_CONFIG = {
  // 🎯 Category Selection Cards - ΔΟΚΙΜΗ ΤΕΣΤ
  categorySelection: {
    background: 'var(--la-card-background)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    border: 'var(--la-card-border)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    borderRadius: 'var(--la-radius-lg)',     // 🎯 CSS Token: 1rem = 16px ≈ 12px
    minHeight: 'var(--la-space-48)',         // 🎯 CSS Token: 12rem = 192px ≈ 120px
    padding: 'var(--la-space-4)',            // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο  // ⚪ ΤΕΣΤ: Λευκό κείμενο
      fontSize: 'var(--la-font-size-xl)',     // 🎯 CSS Token: 1.25rem ≈ 18px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-2) var(--la-space-4)',  // 🎯 CSS Token: 8px 16px
      borderRadius: 'var(--la-radius-md)'              // 🎯 CSS Token: 8px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο  // ⚪ ΤΕΣΤ: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    },
    hover: {
      transform: 'translateY(calc(-1 * var(--la-space-1)))', // 🎯 CSS Token: -4px
      boxShadow: 'var(--la-shadow-lg)' // 🎯 CSS Token: Large shadow for hover effect
    }
  },

  // 🟢 Success Cards - SST Theme (CSS Tokens)
  success: {
    background: 'var(--la-card-background)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    border: 'var(--la-card-border)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // ⬆️ Elevated Cards - SST Theme (CSS Tokens)
  elevated: {
    background: 'var(--la-card-background)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    border: 'var(--la-card-border)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    boxShadow: 'var(--la-shadow-md)',        // 🎯 CSS Token: Medium shadow for elevated cards
    title: {
      color: 'var(--la-color-text-primary)',  // 🎯 CSS Token: Dark text color
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-secondary)', // 🎯 CSS Token: Secondary text color
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '1'
    }
  },

  // 🏠 Property Cards - SST Theme (CSS Tokens)
  property: {
    background: 'var(--la-card-background)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    border: 'var(--la-card-border)',  // 🎯 SST: CSS Token - Μοναδική πηγή αλήθειας
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // 💼 Job Cards - Purple Theme
  job: {
    background: 'var(--la-color-brand)',     // 🎯 CSS Token: Purple theme → Brand color
    border: 'var(--la-border-width-2) solid var(--la-border-brand)', // 🎯 CSS Token: 2px solid purple
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // ⚠️ Warning Cards - Orange Theme
  warning: {
    background: 'var(--la-color-warning)',   // 🎯 CSS Token: Warning color
    border: 'var(--la-border-width-2) solid var(--la-border-warning)', // 🎯 CSS Token: 2px solid orange
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // ❌ Error Cards - Red Theme
  error: {
    background: 'var(--la-color-error)',     // 🎯 CSS Token: Error color
    border: 'var(--la-border-width-2) solid var(--la-border-error)', // 🎯 CSS Token: 2px solid red
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // ℹ️ Info Cards - Cyan Theme
  info: {
    background: 'var(--la-color-accent-cyan)', // 🎯 CSS Token: Cyan/Info color
    border: 'var(--la-border-width-2) solid var(--la-border-info)', // 🎯 CSS Token: 2px solid cyan
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // ⚪ Neutral Cards - Gray Theme
  neutral: {
    background: 'var(--la-color-text-secondary)', // 🎯 CSS Token: Gray/Neutral color
    border: 'var(--la-border-width-2) solid var(--la-border-neutral)', // 🎯 CSS Token: 2px solid gray
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-on-dark)',  // 🎯 CSS Token: Λευκό κείμενο
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '0.9'
    }
  },

  // 🎨 Outlined Cards - Border Theme
  outlined: {
    background: 'transparent',
    border: 'var(--la-border-width-2) solid var(--la-border-subtle-gray)', // 🎯 CSS Token: 2px solid light gray
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-primary)',  // 🎯 CSS Token: Dark text color
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-secondary)', // 🎯 CSS Token: Secondary text color
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '1'
    }
  },

  // ⬜ Filled Cards - Subtle Background
  filled: {
    background: 'var(--la-color-surface-secondary)', // 🎯 CSS Token: Light surface color
    border: 'var(--la-border-width-1) solid var(--la-border-light)', // 🎯 CSS Token: 1px solid very light gray
    borderRadius: 'var(--la-radius-md)',      // 🎯 CSS Token: 0.625rem ≈ 8px
    minHeight: 'var(--la-size-20)',         // 🎯 CSS Token: 5rem = 80px
    padding: 'var(--la-space-4)',           // 🎯 CSS Token: 1rem = 16px
    title: {
      color: 'var(--la-color-text-primary)',  // 🎯 CSS Token: Dark text color
      fontSize: 'var(--la-font-size-base)',   // 🎯 CSS Token: 1rem = 16px
      fontWeight: 'var(--la-font-weight-semibold)', // 🎯 CSS Token: 600
      background: 'transparent',
      border: 'none',
      padding: 'var(--la-space-1) var(--la-space-2)', // 🎯 CSS Token: 4px 8px
      borderRadius: 'var(--la-radius-sm)'     // 🎯 CSS Token: 0.375rem ≈ 4px
    },
    description: {
      color: 'var(--la-color-text-secondary)', // 🎯 CSS Token: Secondary text color
      fontSize: 'var(--la-font-size-sm)',     // 🎯 CSS Token: 0.875rem ≈ 14px
      opacity: '1'
    }
  },

  // 🔧 Universal Utility Functions - Enterprise SST System
  getCardStyles: (variant: string) => {
    // 🎯 VARIANT MAPPING: Handle both camelCase and kebab-case
    const variantMap: Record<string, keyof typeof SST_CARD_CONFIG> = {
      'category-selection': 'categorySelection',
      'categorySelection': 'categorySelection',
      'success': 'success',
      'elevated': 'elevated',
      'property': 'property',
      'job': 'job',
      'warning': 'warning',
      'error': 'error',
      'info': 'info',
      'neutral': 'neutral',
      'outlined': 'outlined',
      'filled': 'filled'
    };

    const mappedVariant = variantMap[variant] || variant as keyof typeof SST_CARD_CONFIG;
    const config = SST_CARD_CONFIG[mappedVariant];

    // if (process.env.NODE_ENV === 'development') {
    //   console.log('🎯 SST getCardStyles Debug:', {
    //     inputVariant: variant,
    //     mappedVariant,
    //     configExists: !!config,
    //     configType: typeof config,
    //     configBorder: (config as { border?: string })?.border,
    //     allKeys: Object.keys(SST_CARD_CONFIG)
    //   });
    // }

    if (!config || typeof config !== 'object') return {};

    // Type-safe access με proper interface
    const cardConfig = config as {
      background?: string;
      border?: string;
      borderRadius?: string;
      minHeight?: string;
      padding?: string;
      boxShadow?: string;
    };

    return {
      backgroundColor: cardConfig.background,
      border: cardConfig.border ? `${cardConfig.border} !important` : undefined,
      borderRadius: cardConfig.borderRadius,
      minHeight: cardConfig.minHeight,
      padding: cardConfig.padding,
      boxShadow: cardConfig.boxShadow || 'none',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      cursor: 'pointer',
      transition: 'var(--la-transition-all)'   // 🎯 CSS Token: all 0.2s ease
    };
  },

  getTitleStyles: (variant: string) => {
    // 🎯 VARIANT MAPPING: Same logic as getCardStyles
    const variantMap: Record<string, keyof typeof SST_CARD_CONFIG> = {
      'category-selection': 'categorySelection',
      'categorySelection': 'categorySelection',
      'success': 'success',
      'elevated': 'elevated',
      'property': 'property',
      'job': 'job',
      'warning': 'warning',
      'error': 'error',
      'info': 'info',
      'neutral': 'neutral',
      'outlined': 'outlined',
      'filled': 'filled'
    };

    const mappedVariant = variantMap[variant] || variant as keyof typeof SST_CARD_CONFIG;
    const config = SST_CARD_CONFIG[mappedVariant];

    if (!config || typeof config !== 'object' || !config.title) return {};

    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`🎯 SST getTitleStyles called for ${variant} → ${mappedVariant} with color:`, config.title.color);
    // }
    return {
      color: config.title.color,
      fontSize: config.title.fontSize,
      fontWeight: config.title.fontWeight,
      background: config.title.background,
      border: config.title.border,
      padding: config.title.padding,
      borderRadius: config.title.borderRadius,
      textAlign: 'center' as const,
      marginBottom: 'var(--la-space-2)'        // 🎯 CSS Token: 0.5rem = 8px
    };
  },

  getDescriptionStyles: (variant: string) => {
    // 🎯 VARIANT MAPPING: Same logic as getCardStyles
    const variantMap: Record<string, keyof typeof SST_CARD_CONFIG> = {
      'category-selection': 'categorySelection',
      'categorySelection': 'categorySelection',
      'success': 'success',
      'elevated': 'elevated',
      'property': 'property',
      'job': 'job',
      'warning': 'warning',
      'error': 'error',
      'info': 'info',
      'neutral': 'neutral',
      'outlined': 'outlined',
      'filled': 'filled'
    };

    const mappedVariant = variantMap[variant] || variant as keyof typeof SST_CARD_CONFIG;
    const config = SST_CARD_CONFIG[mappedVariant];

    if (!config || typeof config !== 'object' || !config.description) return {};

    return {
      color: config.description.color,
      fontSize: config.description.fontSize,
      opacity: config.description.opacity,
      textAlign: 'center' as const,
      margin: 0
    };
  },

  // 🔧 Backward Compatibility - Legacy Functions
  getCategorySelectionStyles: () => SST_CARD_CONFIG.getCardStyles('categorySelection'),
  getCategoryTitleStyles: () => SST_CARD_CONFIG.getTitleStyles('categorySelection'),
  getCategoryDescriptionStyles: () => SST_CARD_CONFIG.getDescriptionStyles('categorySelection')
} as const;

export type SSTCardConfig = typeof SST_CARD_CONFIG;