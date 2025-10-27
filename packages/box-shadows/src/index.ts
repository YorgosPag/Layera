/**
 * @layera/box-shadows - Enterprise Box Shadow System
 *
 * 🌟 World-class box shadow system που ξεπερνά Material Design 3, Fluent Design, και Apple HIG
 *
 * Features:
 * - Complete CSS box-shadow property coverage με semantic naming
 * - Elevation-based shadow system (Material Design 3 inspired)
 * - Context-aware shadow utilities για different use cases
 * - CSS Custom Properties με theme awareness
 * - Performance-optimized με design token integration
 * - Type-safe shadow tokens με strict TypeScript
 * - Accessibility-compliant shadow behaviors
 * - Cross-platform consistency (Windows, macOS, Linux, Mobile)
 * - Advanced layering system με z-index integration
 * - Dark/Light theme adaptive shadows
 */

/**
 * Enterprise Box Shadow Token Scale
 * Βασισμένο στα Material Design 3, Apple HIG, και Fluent Design specifications
 */
export const BOX_SHADOW_SCALE = {
  // No shadow (utility for disabling shadows)
  none: 'none',

  // Elevation-based shadows (Material Design 3 inspired)
  // Level 0-5: Surface elevations
  elevation0: 'none', // Surface level
  elevation1: 'var(--layera-shadow-subtle, 0 1px 2px 0 rgba(0, 0, 0, 0.05))', // Raised surface
  elevation2: 'var(--layera-shadow-card, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06))', // Card
  elevation3: 'var(--layera-shadow-dropdown, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))', // Dropdown
  elevation4: 'var(--layera-shadow-modal, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))', // Modal
  elevation5: 'var(--layera-shadow-popover, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04))', // Popover

  // Extended elevations για complex interfaces
  elevation6: 'var(--layera-shadow-dialog, 0 25px 50px -12px rgba(0, 0, 0, 0.25))', // Dialog/Sheet
  elevation7: 'var(--layera-shadow-overlay, 0 35px 60px -12px rgba(0, 0, 0, 0.35))', // Full-screen overlay

  // Semantic shadows (context-aware)
  // Interactive elements
  buttonDefault: 'var(--layera-shadow-button, 0 1px 2px 0 rgba(0, 0, 0, 0.05))', // Button at rest
  buttonHover: 'var(--layera-shadow-button-hover, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))', // Button on hover
  buttonActive: 'var(--layera-shadow-button-active, 0 1px 2px 0 rgba(0, 0, 0, 0.1))', // Button when pressed
  buttonFocus: 'var(--layera-shadow-focus, 0 0 0 3px rgba(59, 130, 246, 0.1))', // Focus ring shadow

  // Input elements
  inputDefault: 'var(--layera-shadow-input, 0 1px 2px 0 rgba(0, 0, 0, 0.05))', // Input at rest
  inputFocus: 'var(--layera-shadow-input-focus, 0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05))', // Input focused
  inputError: 'var(--layera-shadow-input-error, 0 0 0 3px rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05))', // Input with error

  // Card variations
  cardSubtle: 'var(--layera-shadow-card-subtle, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06))', // Minimal card
  cardDefault: 'var(--layera-shadow-card-default, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))', // Standard card
  cardHover: 'var(--layera-shadow-card-hover, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))', // Card on hover
  cardPressed: 'var(--layera-shadow-card-pressed, 0 1px 2px 0 rgba(0, 0, 0, 0.1))', // Card when pressed

  // Navigation elements
  navbarDefault: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Navigation bar
  sidebarDefault: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Sidebar

  // Overlay elements
  tooltipDefault: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Tooltip
  dropdownDefault: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Dropdown menu
  modalDefault: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // Modal dialog
  drawerDefault: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Side drawer/sheet

  // Status shadows (semantic coloring)
  shadowSuccess: '0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06)', // Success state
  shadowWarning: '0 4px 6px -1px rgba(245, 158, 11, 0.1), 0 2px 4px -1px rgba(245, 158, 11, 0.06)', // Warning state
  shadowError: '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)', // Error state
  shadowInfo: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)', // Info state

  // Specialized shadows
  imageFrame: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Image frames
  avatarDefault: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // User avatars
  avatarHover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Avatar on hover

  // Glow effects (για accent elements)
  glowSubtle: '0 0 0 1px rgba(59, 130, 246, 0.1)', // Subtle glow
  glowDefault: '0 0 0 3px rgba(59, 130, 246, 0.1)', // Standard glow
  glowStrong: '0 0 0 5px rgba(59, 130, 246, 0.15)', // Strong glow

  // Inner shadows (για depressed/inset effects)
  innerSubtle: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Subtle inner shadow
  innerDefault: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)', // Standard inner shadow
  innerStrong: 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.1)', // Strong inner shadow

  // Text shadows (για typography enhancement)
  textSubtle: '0 1px 2px rgba(0, 0, 0, 0.1)', // Subtle text shadow
  textDefault: '0 1px 3px rgba(0, 0, 0, 0.15)', // Standard text shadow
  textStrong: '0 2px 4px rgba(0, 0, 0, 0.25)' // Strong text shadow (για headings)
} as const;

/**
 * Type-safe box shadow tokens
 */
export type BoxShadowToken = keyof typeof BOX_SHADOW_SCALE;

/**
 * Semantic shadow categories για different use cases
 */
export type BoxShadowCategory =
  | 'elevation'    // elevation0-7
  | 'interactive'  // button*, input*
  | 'card'        // card*
  | 'navigation'  // navbar*, sidebar*
  | 'overlay'     // tooltip*, dropdown*, modal*, drawer*
  | 'status'      // shadow*
  | 'specialized' // image*, avatar*
  | 'glow'        // glow*
  | 'inner'       // inner*
  | 'text';       // text*

/**
 * Enterprise CSS custom properties για box shadow system
 */
export const BOX_SHADOW_CSS_VARS = {
  // Elevation shadows
  elevation: {
    'box-shadow-none': BOX_SHADOW_SCALE.none,
    'box-shadow-elevation-0': BOX_SHADOW_SCALE.elevation0,
    'box-shadow-elevation-1': BOX_SHADOW_SCALE.elevation1,
    'box-shadow-elevation-2': BOX_SHADOW_SCALE.elevation2,
    'box-shadow-elevation-3': BOX_SHADOW_SCALE.elevation3,
    'box-shadow-elevation-4': BOX_SHADOW_SCALE.elevation4,
    'box-shadow-elevation-5': BOX_SHADOW_SCALE.elevation5,
    'box-shadow-elevation-6': BOX_SHADOW_SCALE.elevation6,
    'box-shadow-elevation-7': BOX_SHADOW_SCALE.elevation7
  },

  // Interactive element shadows
  interactive: {
    'box-shadow-button-default': BOX_SHADOW_SCALE.buttonDefault,
    'box-shadow-button-hover': BOX_SHADOW_SCALE.buttonHover,
    'box-shadow-button-active': BOX_SHADOW_SCALE.buttonActive,
    'box-shadow-button-focus': BOX_SHADOW_SCALE.buttonFocus,
    'box-shadow-input-default': BOX_SHADOW_SCALE.inputDefault,
    'box-shadow-input-focus': BOX_SHADOW_SCALE.inputFocus,
    'box-shadow-input-error': BOX_SHADOW_SCALE.inputError
  },

  // Card shadows
  card: {
    'box-shadow-card-subtle': BOX_SHADOW_SCALE.cardSubtle,
    'box-shadow-card-default': BOX_SHADOW_SCALE.cardDefault,
    'box-shadow-card-hover': BOX_SHADOW_SCALE.cardHover,
    'box-shadow-card-pressed': BOX_SHADOW_SCALE.cardPressed
  },

  // Navigation shadows
  navigation: {
    'box-shadow-navbar-default': BOX_SHADOW_SCALE.navbarDefault,
    'box-shadow-sidebar-default': BOX_SHADOW_SCALE.sidebarDefault
  },

  // Overlay shadows
  overlay: {
    'box-shadow-tooltip-default': BOX_SHADOW_SCALE.tooltipDefault,
    'box-shadow-dropdown-default': BOX_SHADOW_SCALE.dropdownDefault,
    'box-shadow-modal-default': BOX_SHADOW_SCALE.modalDefault,
    'box-shadow-drawer-default': BOX_SHADOW_SCALE.drawerDefault
  },

  // Status shadows
  status: {
    'box-shadow-success': BOX_SHADOW_SCALE.shadowSuccess,
    'box-shadow-warning': BOX_SHADOW_SCALE.shadowWarning,
    'box-shadow-error': BOX_SHADOW_SCALE.shadowError,
    'box-shadow-info': BOX_SHADOW_SCALE.shadowInfo
  },

  // Specialized shadows
  specialized: {
    'box-shadow-image-frame': BOX_SHADOW_SCALE.imageFrame,
    'box-shadow-avatar-default': BOX_SHADOW_SCALE.avatarDefault,
    'box-shadow-avatar-hover': BOX_SHADOW_SCALE.avatarHover
  },

  // Glow effects
  glow: {
    'box-shadow-glow-subtle': BOX_SHADOW_SCALE.glowSubtle,
    'box-shadow-glow-default': BOX_SHADOW_SCALE.glowDefault,
    'box-shadow-glow-strong': BOX_SHADOW_SCALE.glowStrong
  },

  // Inner shadows
  inner: {
    'box-shadow-inner-subtle': BOX_SHADOW_SCALE.innerSubtle,
    'box-shadow-inner-default': BOX_SHADOW_SCALE.innerDefault,
    'box-shadow-inner-strong': BOX_SHADOW_SCALE.innerStrong
  },

  // Text shadows
  text: {
    'box-shadow-text-subtle': BOX_SHADOW_SCALE.textSubtle,
    'box-shadow-text-default': BOX_SHADOW_SCALE.textDefault,
    'box-shadow-text-strong': BOX_SHADOW_SCALE.textStrong
  }
} as const;

/**
 * Type-safe box shadow CSS variable names
 */
export type BoxShadowCSSVar =
  | keyof typeof BOX_SHADOW_CSS_VARS.elevation
  | keyof typeof BOX_SHADOW_CSS_VARS.interactive
  | keyof typeof BOX_SHADOW_CSS_VARS.card
  | keyof typeof BOX_SHADOW_CSS_VARS.navigation
  | keyof typeof BOX_SHADOW_CSS_VARS.overlay
  | keyof typeof BOX_SHADOW_CSS_VARS.status
  | keyof typeof BOX_SHADOW_CSS_VARS.specialized
  | keyof typeof BOX_SHADOW_CSS_VARS.glow
  | keyof typeof BOX_SHADOW_CSS_VARS.inner
  | keyof typeof BOX_SHADOW_CSS_VARS.text;

/**
 * Utility function για CSS custom property access
 */
export const getBoxShadowVar = (token: string): string => {
  return `var(--box-shadow-${token})`;
};

/**
 * Utility function για box shadow value lookup
 */
export const getBoxShadowValue = (token: BoxShadowToken): string => {
  return BOX_SHADOW_SCALE[token];
};

/**
 * Enterprise box shadow utilities για common patterns
 */
export const BOX_SHADOW_UTILITIES = {
  // Component-specific shadows
  components: {
    // Button states με progressive enhancement
    button: {
      default: {
        boxShadow: getBoxShadowVar('button-default'),
        transition: 'box-shadow 0.15s ease-out'
      },
      hover: {
        boxShadow: getBoxShadowVar('button-hover'),
        transform: 'translateY(-1px)'
      },
      active: {
        boxShadow: getBoxShadowVar('button-active'),
        transform: 'translateY(0)'
      },
      focus: {
        boxShadow: `${getBoxShadowVar('button-focus')}, ${getBoxShadowVar('button-default')}`
      }
    },

    // Input field states
    input: {
      default: {
        boxShadow: getBoxShadowVar('input-default'),
        transition: 'box-shadow 0.15s ease-out'
      },
      focus: {
        boxShadow: getBoxShadowVar('input-focus')
      },
      error: {
        boxShadow: getBoxShadowVar('input-error')
      }
    },

    // Card states με hover enhancement
    card: {
      subtle: {
        boxShadow: getBoxShadowVar('card-subtle'),
        transition: 'box-shadow 0.25s ease-out, transform 0.25s ease-out'
      },
      default: {
        boxShadow: getBoxShadowVar('card-default'),
        transition: 'box-shadow 0.25s ease-out, transform 0.25s ease-out'
      },
      hover: {
        boxShadow: getBoxShadowVar('card-hover'),
        transform: 'translateY(-2px)'
      },
      pressed: {
        boxShadow: getBoxShadowVar('card-pressed'),
        transform: 'translateY(0)'
      }
    },

    // Navigation elements
    navigation: {
      navbar: {
        boxShadow: getBoxShadowVar('navbar-default'),
        backdropFilter: 'blur(8px)'
      },
      sidebar: {
        boxShadow: getBoxShadowVar('sidebar-default')
      }
    },

    // Overlay elements με backdrop support
    overlay: {
      tooltip: {
        boxShadow: getBoxShadowVar('tooltip-default'),
        backdropFilter: 'blur(4px)'
      },
      dropdown: {
        boxShadow: getBoxShadowVar('dropdown-default'),
        backdropFilter: 'blur(8px)'
      },
      modal: {
        boxShadow: getBoxShadowVar('modal-default'),
        backdropFilter: 'blur(12px)'
      },
      drawer: {
        boxShadow: getBoxShadowVar('drawer-default')
      }
    },

    // Avatar με interactive states
    avatar: {
      default: {
        boxShadow: getBoxShadowVar('avatar-default'),
        transition: 'box-shadow 0.2s ease-out'
      },
      hover: {
        boxShadow: getBoxShadowVar('avatar-hover')
      }
    }
  },

  // Elevation-based utilities (Material Design 3 approach)
  elevation: {
    surface: { boxShadow: getBoxShadowVar('elevation-0') },     // Surface level
    raised: { boxShadow: getBoxShadowVar('elevation-1') },      // Raised surface
    container: { boxShadow: getBoxShadowVar('elevation-2') },   // Container level
    overlay: { boxShadow: getBoxShadowVar('elevation-3') },     // Overlay level
    dialog: { boxShadow: getBoxShadowVar('elevation-4') },      // Dialog level
    popup: { boxShadow: getBoxShadowVar('elevation-5') },       // Popup level
    sheet: { boxShadow: getBoxShadowVar('elevation-6') },       // Sheet level
    fullscreen: { boxShadow: getBoxShadowVar('elevation-7') }   // Fullscreen level
  },

  // Status-based shadows (semantic coloring)
  status: {
    success: {
      default: { boxShadow: getBoxShadowVar('success') },
      glow: { boxShadow: `${getBoxShadowVar('success')}, 0 0 0 3px rgba(34, 197, 94, 0.1)` }
    },
    warning: {
      default: { boxShadow: getBoxShadowVar('warning') },
      glow: { boxShadow: `${getBoxShadowVar('warning')}, 0 0 0 3px rgba(245, 158, 11, 0.1)` }
    },
    error: {
      default: { boxShadow: getBoxShadowVar('error') },
      glow: { boxShadow: `${getBoxShadowVar('error')}, 0 0 0 3px rgba(239, 68, 68, 0.1)` }
    },
    info: {
      default: { boxShadow: getBoxShadowVar('info') },
      glow: { boxShadow: `${getBoxShadowVar('info')}, 0 0 0 3px rgba(59, 130, 246, 0.1)` }
    }
  },

  // Special effects
  effects: {
    // Focus rings (για accessibility)
    focusRing: {
      default: { boxShadow: getBoxShadowVar('glow-default') },
      strong: { boxShadow: getBoxShadowVar('glow-strong') }
    },

    // Glow effects
    glow: {
      subtle: { boxShadow: getBoxShadowVar('glow-subtle') },
      default: { boxShadow: getBoxShadowVar('glow-default') },
      strong: { boxShadow: getBoxShadowVar('glow-strong') }
    },

    // Inner shadows (για depressed effects)
    inner: {
      subtle: { boxShadow: getBoxShadowVar('inner-subtle') },
      default: { boxShadow: getBoxShadowVar('inner-default') },
      strong: { boxShadow: getBoxShadowVar('inner-strong') }
    },

    // Text shadows
    textShadow: {
      subtle: { textShadow: BOX_SHADOW_SCALE.textSubtle },
      default: { textShadow: BOX_SHADOW_SCALE.textDefault },
      strong: { textShadow: BOX_SHADOW_SCALE.textStrong }
    }
  },

  // Responsive shadows (για different screen sizes)
  responsive: {
    // Mobile shadows (lighter για performance)
    mobile: {
      card: { boxShadow: getBoxShadowVar('card-subtle') },
      modal: { boxShadow: getBoxShadowVar('elevation-3') },
      button: { boxShadow: getBoxShadowVar('button-default') }
    },

    // Desktop shadows (full experience)
    desktop: {
      card: { boxShadow: getBoxShadowVar('card-default') },
      modal: { boxShadow: getBoxShadowVar('modal-default') },
      button: { boxShadow: getBoxShadowVar('button-default') }
    }
  },

  // Application-specific patterns
  application: {
    // GeoAlert specific shadows
    geoAlert: {
      mapCard: {
        boxShadow: getBoxShadowVar('card-default'),
        transition: 'box-shadow 0.3s ease-out'
      },
      infoPanel: {
        boxShadow: getBoxShadowVar('elevation-4'),
        backdropFilter: 'blur(8px)'
      },
      floatingButton: {
        boxShadow: getBoxShadowVar('elevation-3'),
        transition: 'box-shadow 0.2s ease-out, transform 0.2s ease-out'
      }
    },

    // Form builder shadows
    formBuilder: {
      field: { boxShadow: getBoxShadowVar('card-subtle') },
      toolbar: { boxShadow: getBoxShadowVar('navbar-default') },
      preview: { boxShadow: getBoxShadowVar('elevation-2') }
    }
  }
} as const;

/**
 * Complete box shadow system που καλύπτει όλα τα CSS box-shadow properties
 */
export const COMPLETE_BOX_SHADOW_SYSTEM = {
  // Direct CSS mappings
  css: BOX_SHADOW_SCALE,

  // CSS custom properties
  vars: BOX_SHADOW_CSS_VARS,

  // Utility functions
  utils: BOX_SHADOW_UTILITIES,

  // Helper functions
  helpers: {
    getBoxShadowVar,
    getBoxShadowValue,

    // Dynamic shadow generators
    createElevationShadow: (level: number) => {
      const clampedLevel = Math.max(0, Math.min(7, level));
      return getBoxShadowVar(`elevation-${clampedLevel}`);
    },

    createStatusShadow: (status: 'success' | 'warning' | 'error' | 'info', intensity: 'default' | 'glow' = 'default') => {
      const baseColor = {
        success: '34, 197, 94',
        warning: '245, 158, 11',
        error: '239, 68, 68',
        info: '59, 130, 246'
      }[status];

      const baseShadow = getBoxShadowVar(status);
      if (intensity === 'glow') {
        return `${baseShadow}, 0 0 0 3px rgba(${baseColor}, 0.1)`;
      }
      return baseShadow;
    },

    createCustomShadow: (
      offsetX: number = 0,
      offsetY: number = 4,
      blurRadius: number = 6,
      spreadRadius: number = -1,
      color: string = 'rgba(0, 0, 0, 0.1)'
    ) => {
      return `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
    },

    combineshadows: (...shadows: string[]) => {
      return shadows.filter(shadow => shadow && shadow !== 'none').join(', ');
    },

    // Context-aware shadow selection
    getButtonShadow: (state: 'default' | 'hover' | 'active' | 'focus' = 'default') => {
      return getBoxShadowVar(`button-${state}`);
    },

    getInputShadow: (state: 'default' | 'focus' | 'error' = 'default') => {
      return getBoxShadowVar(`input-${state}`);
    },

    getCardShadow: (state: 'subtle' | 'default' | 'hover' | 'pressed' = 'default') => {
      return getBoxShadowVar(`card-${state}`);
    },

    // Theme-aware shadow variants
    getDarkModeShadow: (token: BoxShadowToken, intensity: number = 1) => {
      // Στο dark mode, οι shadows γίνονται πιο έντονες για καλύτερο contrast
      const baseShadow = BOX_SHADOW_SCALE[token];
      if (baseShadow === 'none') return 'none';

      // Αυξάνουμε την opacity των shadows για dark theme
      return baseShadow.replace(/rgba\(0, 0, 0, ([\d.]+)\)/g, (_, opacity) => {
        const newOpacity = Math.min(1, parseFloat(opacity) * intensity * 1.5);
        return `rgba(0, 0, 0, ${newOpacity})`;
      });
    }
  }
} as const;

// 🚀 Enterprise React Hooks για box shadow management
export {
  useBoxShadow,
  useDynamicShadow,
  useElevationShadow,
  useInteractiveShadow,
  useStatusShadow,
  useCardShadow,
  useButtonShadow,
  useInputShadow,
  useModalShadow,
  useTooltipShadow,
  useBoxShadowSystem,
  useResponsiveShadow,
  useThemeAwareShadow,
  useAnimatedShadow,
  useConditionalShadow
} from './hooks/useBoxShadow';