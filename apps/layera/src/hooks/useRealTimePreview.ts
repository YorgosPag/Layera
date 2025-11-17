import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Real-Time Color Preview Hook
 *
 * Enterprise UX Feature για live preview χωρίς commit
 * - Live preview στα header buttons
 * - Debounced save για smooth performance
 * - Separate preview state από committed state
 * - Extended support για όλες τις ρυθμίσεις (borders, text, hover, active)
 */

export interface PreviewState {
  previewColors: Record<string, string>;
  isPreviewActive: boolean;
  previewKey: string | null;
}

export interface UseRealTimePreviewProps {
  onCommit: (key: string, value: string) => void;
  debounceMs?: number;
}

export const useRealTimePreview = ({ onCommit, debounceMs = 700 }: UseRealTimePreviewProps) => {
  const [previewState, setPreviewState] = useState<PreviewState>({
    previewColors: {},
    isPreviewActive: false,
    previewKey: null
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const domUpdateTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const pendingDOMUpdate = useRef<{ key: string; value: string; category?: string; elementType?: string } | null>(null);
  const rafRef = useRef<number | null>(null);

  /**
   * Εφαρμόζει live preview στα header buttons - Optimized version
   */
  const applyHeaderButtonPreview = useCallback((color: string) => {
    // Optimize: Reuse existing style element instead of removing/creating
    let style = document.getElementById('layera-live-preview-header-buttons') as HTMLStyleElement;

    if (!style) {
      style = document.createElement('style');
      style.id = 'layera-live-preview-header-buttons';
      document.head.appendChild(style);
    }

    // Optimized CSS with fewer selectors for better performance
    const css = `
      [data-layout="header-fixed"] button.layera-square-btn,
      [data-layout="header-fixed"] .layera-button,
      .layera-square-btn,
      [data-layera-playground="true"] .layera-button,
      [data-layera-playground="true"] button {
        background-color: ${color} !important;
        border-color: ${color} !important;
        transition: none !important;
      }`;

    style.textContent = css;
  }, []);

  /**
   * Δημιουργεί CSS για hover effects
   */
  const getHoverEffectCSS = useCallback((effect: string) => {
    switch (effect) {
      case 'none':
        return '.layera-button:hover, .layera-card:hover { transition: none !important; }';
      case 'subtle':
        return '.layera-button:hover, .layera-card:hover { opacity: 0.9 !important; transition: var(--layera-transition-colors) !important; }';
      case 'normal':
        return '.layera-button:hover, .layera-card:hover { opacity: var(--layera-icon-interactive-interactive-opacity-hover) !important; transform: translateY(-1px) !important; transition: var(--layera-transition-all) !important; }';
      case 'strong':
        return '.layera-button:hover, .layera-card:hover { opacity: var(--layera-icon-interactive-interactive-opacity-hover) !important; transform: translateY(-2px) scale(1.02) !important; transition: var(--layera-transition-all) !important; }';
      default:
        return '';
    }
  }, []);

  /**
   * Δημιουργεί CSS για active effects
   */
  const getActiveEffectCSS = useCallback((effect: string) => {
    switch (effect) {
      case 'none':
        return '.layera-button:active, .layera-card:active { transform: none !important; opacity: 1 !important; }';
      case 'scale':
        return '.layera-button:active, .layera-card:active { transform: scale(0.95) !important; transition: transform 0.1s ease !important; }';
      case 'opacity':
        return '.layera-button:active, .layera-card:active { opacity: 0.7 !important; transition: opacity 0.1s ease !important; }';
      case 'press':
        return '.layera-button:active, .layera-card:active { transform: scale(0.95) !important; opacity: 0.8 !important; transition: all 0.1s ease !important; }';
      default:
        return '';
    }
  }, []);

  /**
   * Δημιουργεί CSS για border width
   */
  const getBorderWidthCSS = useCallback((width: string) => {
    const widthValue = width === '0' ? '0' : `var(--layera-global-borderWidth-${width})`;
    return `.layera-button, .layera-card, .layera-input { border-width: ${widthValue} !important; }`;
  }, []);

  /**
   * Δημιουργεί CSS για border radius
   */
  const getBorderRadiusCSS = useCallback((radius: string) => {
    const radiusValue = `var(--layera-global-borderRadius-${radius})`;
    return `.layera-button, .layera-card, .layera-input { border-radius: ${radiusValue} !important; }`;
  }, []);

  /**
   * Δημιουργεί CSS για font size
   */
  const getFontSizeCSS = useCallback((size: string) => {
    const sizeValue = `var(--layera-global-fontSize-${size})`;
    return `.layera-typography[data-size], .layera-text { font-size: ${sizeValue} !important; }`;
  }, []);

  /**
   * Εφαρμόζει ειδικά effects (hover, active) στο DOM
   */
  const applySpecialEffects = useCallback((key: string, value: string) => {
    let styleId = '';
    let cssRules = '';

    switch (key) {
      case 'hoverEffect':
        styleId = 'layera-live-preview-hover';
        cssRules = getHoverEffectCSS(value);
        break;
      case 'activeEffect':
        styleId = 'layera-live-preview-active';
        cssRules = getActiveEffectCSS(value);
        break;
      case 'borderWidth':
        styleId = 'layera-live-preview-border-width';
        cssRules = getBorderWidthCSS(value);
        break;
      case 'borderRadius':
        styleId = 'layera-live-preview-border-radius';
        cssRules = getBorderRadiusCSS(value);
        break;
      case 'fontSize':
        styleId = 'layera-live-preview-font-size';
        cssRules = getFontSizeCSS(value);
        break;
    }

    if (styleId && cssRules) {
      let style = document.getElementById(styleId) as HTMLStyleElement;

      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
      }

      style.textContent = cssRules;
    }
  }, [getHoverEffectCSS, getActiveEffectCSS, getBorderWidthCSS, getBorderRadiusCSS, getFontSizeCSS]);


  /**
   * Ενημερώνει card CSS variables βάσει κατηγορίας και χρώματος
   */
  const updateCardVariables = useCallback((colorKey: string, colorValue: string, category: string) => {
    const root = document.documentElement;

    // Map color keys to CSS variable suffixes
    const colorMapping = {
      primaryColor: 'primary',
      secondaryColor: 'secondary',
      successColor: 'success',
      warningColor: 'warning',
      dangerColor: 'danger',
      infoColor: 'info'
    } as const;

    const colorSuffix = colorMapping[colorKey as keyof typeof colorMapping];
    if (!colorSuffix) return;

    switch (category) {
      case 'backgrounds':
        // Update the actual card surface variables used by cards
        if (colorSuffix === 'primary') {
          root.style.setProperty('--layera-color-light-surface-primary', colorValue);
          root.style.setProperty('--layera-color-dark-surface-primary', colorValue);
        } else if (colorSuffix === 'secondary') {
          root.style.setProperty('--layera-color-light-surface-secondary', colorValue);
          root.style.setProperty('--layera-color-dark-surface-secondary', colorValue);
        }
        // Auto-calculate text color για καλή αντίθεση
        const textColor = colorValue === '#f59e0b' ? '#000000' : '#ffffff';
        break;

      case 'text':
        // Update card title color
        if (colorSuffix === 'primary') {
          root.style.setProperty('--layera-cardTitleColor', colorValue);
          root.style.setProperty('--layera-color-text-primary', colorValue);
        } else if (colorSuffix === 'secondary') {
          root.style.setProperty('--layera-color-text-secondary', colorValue);
        }
        break;

      case 'borders':
        // Update border colors - use the actual border variables
        if (colorSuffix === 'primary') {
          root.style.setProperty('--layera-color-light-border-primary', colorValue);
          root.style.setProperty('--layera-color-border-default', colorValue);
        } else if (colorSuffix === 'secondary') {
          root.style.setProperty('--layera-color-border-light', colorValue);
        }
        break;
    }
  }, []);

  /**
   * Εφαρμόζει live preview στο DOM χωρίς save - Optimized για multiple features
   */
  const applyLivePreview = useCallback((key: string, value: string, category?: string, elementType?: string) => {
    // Use DocumentFragment για batch DOM updates
    const root = document.documentElement;


    // Extended CSS variable mapping for all controls and categories
    const cssVariableMap: Record<string, string> = {
      // Generic colors (μόνο για fallback)
      primaryColor: '--layera-color-primary',
      secondaryColor: '--layera-color-text-secondary',
      successColor: '--layera-color-semantic-success-primary',
      warningColor: '--layera-color-semantic-warning-primary',
      dangerColor: '--layera-color-semantic-error-primary',
      infoColor: '--layera-color-semantic-info-primary',

      // Background colors (για κάρτες και άλλα components)
      backgroundPrimary: '--layera-color-background-primary',
      backgroundSecondary: '--layera-color-background-secondary',
      backgroundSurface: '--layera-color-surface-primary',

      // Card background colors - νέα προσθήκη για real-time preview
      'card-bg-primary': '--layera-card-bg-primary',
      'card-bg-secondary': '--layera-card-bg-secondary',
      'card-bg-success': '--layera-card-bg-success',
      'card-bg-warning': '--layera-card-bg-warning',
      'card-bg-danger': '--layera-card-bg-danger',
      'card-bg-info': '--layera-card-bg-info',

      // Card text colors - νέα προσθήκη για real-time preview
      'card-text-primary': '--layera-card-text-primary',
      'card-text-secondary': '--layera-card-text-secondary',
      'card-text-success': '--layera-card-text-success',
      'card-text-warning': '--layera-card-text-warning',
      'card-text-danger': '--layera-card-text-danger',
      'card-text-info': '--layera-card-text-info',

      // Card border colors - νέα προσθήκη για real-time preview
      'card-border-primary': '--layera-card-border-primary',
      'card-border-secondary': '--layera-card-border-secondary',
      'card-border-success': '--layera-card-border-success',
      'card-border-warning': '--layera-card-border-warning',
      'card-border-danger': '--layera-card-border-danger',
      'card-border-info': '--layera-card-border-info',

      // Border colors
      borderPrimary: '--layera-color-border-primary',
      borderSecondary: '--layera-color-border-secondary',

      // Text colors
      textPrimary: '--layera-color-text-primary',
      textSecondary: '--layera-color-text-secondary',

      // Border width
      borderWidth1: '--layera-global-borderWidth-1',
      borderWidth2: '--layera-global-borderWidth-2',
      borderWidth3: '--layera-global-borderWidth-3',

      // Border radius
      borderRadiusXs: '--layera-global-borderRadius-xs',
      borderRadiusMd: '--layera-global-borderRadius-md',
      borderRadiusLg: '--layera-global-borderRadius-lg',

      // Font sizes
      fontSizeXs: '--layera-global-fontSize-xs',
      fontSizeSm: '--layera-global-fontSize-sm',
      fontSizeBase: '--layera-global-fontSize-base',
      fontSizeLg: '--layera-global-fontSize-lg',
      fontSizeXl: '--layera-global-fontSize-xl',
      fontSize2xl: '--layera-global-fontSize-2xl'
    };

    // ISOLATED UPDATES: Apply changes only to the specific element type + category
    const isColorKey = key === 'primaryColor' || key === 'secondaryColor' || key === 'successColor' ||
                      key === 'warningColor' || key === 'dangerColor' || key === 'infoColor';

    if (category && elementType && isColorKey) {
      // Update based on category type, regardless of elementType for most categories
      if (category === 'backgrounds') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables') {
          // Update card/component background variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Χρησιμοποιούμε το useCSSVariables για button updates
          // Αυτό αποφεύγει διπλότυπα και εξασφαλίζει ενιαία πηγή αλήθειας
          console.log(`Button ${key} update delegated to useCSSVariables system`);

          // ΑΦΑΙΡΕΣΗ: Το applyHeaderButtonPreview επηρεάζει όλα τα playground buttons
          // Σε selective mode δεν χρειαζόμαστε header button updates
          // Header buttons θα ενημερωθούν μόνο σε full theme mode
        }
      } else if (category === 'text') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables') {
          // Update card/component text variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Button text updates handled by useCSSVariables
          console.log(`Button text ${key} update delegated to useCSSVariables system`);
        }
      } else if (category === 'borders') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables') {
          // Update card/component border variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Button border updates handled by useCSSVariables
          console.log(`Button border ${key} update delegated to useCSSVariables system`);
        }
      } else if (category === 'buttons' && elementType === 'buttons') {
        // Update button colors AND header buttons (this is the main button color category)
        const cssVariable = cssVariableMap[key];
        if (cssVariable) {
          root.style.setProperty(cssVariable, value);
        }
        applyHeaderButtonPreview(value);
      }
    } else {
      // Fallback to old logic for non-color keys or missing parameters
      const cssVariable = cssVariableMap[key];
      if (cssVariable) {
        root.style.setProperty(cssVariable, value);
      } else {
        applySpecialEffects(key, value);
      }
    }
  }, [applyHeaderButtonPreview, applySpecialEffects, updateCardVariables]);

  /**
   * Throttled version του DOM update - Μείωση DOM manipulations με requestAnimationFrame
   */
  const throttledDOMUpdate = useCallback((key: string, value: string, category?: string, elementType?: string) => {
    // Αποθήκευση του pending update
    pendingDOMUpdate.current = { key, value, category, elementType };

    // Cancel previous RAF/timer
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (domUpdateTimerRef.current) {
      clearTimeout(domUpdateTimerRef.current);
    }

    // Use requestAnimationFrame για smooth rendering + throttling
    rafRef.current = requestAnimationFrame(() => {
      domUpdateTimerRef.current = setTimeout(() => {
        if (pendingDOMUpdate.current) {
          applyLivePreview(pendingDOMUpdate.current.key, pendingDOMUpdate.current.value, pendingDOMUpdate.current.category, pendingDOMUpdate.current.elementType);
          pendingDOMUpdate.current = null;
        }
        rafRef.current = null;
      }, 16); // 16ms throttle (~60fps) για real-time responsiveness
    });
  }, [applyLivePreview]);

  /**
   * Σταματάει το preview και κάνει commit την τελική τιμή
   */
  const commitPreview = useCallback((key: string, value: string) => {
    // Clear timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = undefined;
    }

    // Commit the change
    onCommit(key, value);

    // ΔΙΑΤΗΡΗΣΗ του preview color αντί για clear - fixes το γαλάζιο χρώμα issue
    setPreviewState(prev => ({
      previewColors: { ...prev.previewColors, [key]: value },
      isPreviewActive: false,
      previewKey: null
    }));
  }, [onCommit]);

  /**
   * Ξεκινάει live preview για ένα συγκεκριμένο χρώμα
   */
  const startPreview = useCallback((key: string, value: string, category?: string, elementType?: string) => {
    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Update preview state
    setPreviewState(prev => ({
      previewColors: { ...prev.previewColors, [key]: value },
      isPreviewActive: true,
      previewKey: key
    }));

    // Apply live preview to DOM με throttling για καλύτερη performance
    throttledDOMUpdate(key, value, category, elementType);

    // Set debounced commit
    debounceTimerRef.current = setTimeout(() => {
      commitPreview(key, value);
    }, debounceMs);
  }, [debounceMs, throttledDOMUpdate, commitPreview]);

  /**
   * Καθαρίζει όλα τα preview effects
   */
  const clearPreview = useCallback(() => {
    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = undefined;
    }

    // Clear DOM update timer
    if (domUpdateTimerRef.current) {
      clearTimeout(domUpdateTimerRef.current);
      domUpdateTimerRef.current = undefined;
    }

    // Clear RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Clear pending DOM update
    pendingDOMUpdate.current = null;

    // Clear preview state
    setPreviewState({
      previewColors: {},
      isPreviewActive: false,
      previewKey: null
    });

    // Remove all live preview styles
    const styleIds = [
      'layera-live-preview-header-buttons',
      'layera-button-color-overrides', // CSS overrides for isolated button colors
      'layera-live-preview-hover',
      'layera-live-preview-active',
      'layera-live-preview-border-width',
      'layera-live-preview-border-radius',
      'layera-live-preview-font-size'
    ];

    styleIds.forEach(id => {
      const style = document.getElementById(id);
      if (style) {
        style.remove();
      }
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPreview();
    };
  }, [clearPreview]);

  return {
    previewState,
    startPreview,
    commitPreview,
    clearPreview,
    isPreviewActive: previewState.isPreviewActive,
    currentPreviewKey: previewState.previewKey
  };
};