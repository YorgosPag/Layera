import { useState, useEffect, useCallback, useRef } from 'react';
import { UI_TIMING } from '../constants/ui-utilities';

/**
 * ARXES COMPLIANT Real-Time Preview Hook
 *
 * ✅ ZERO CSS injection - NO document.createElement('style')
 * ✅ ZERO inline styles - NO style={{ }}
 * ✅ ZERO DOM manipulation - NO document.head.appendChild()
 * ✅ ZERO style.textContent assignments
 *
 * Enterprise UX Feature με token-based architecture:
 * - ΜΟΝΟ CSS custom properties για preview values
 * - Data attributes για semantic state management
 * - Layera design tokens ως fallback values
 * - 100% ARXES compliant implementation
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
   * ✅ ARXES COMPLIANT: Live preview μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applyHeaderButtonPreview = useCallback((color: string) => {
    const root = document.documentElement;

    // ✅ ARXES COMPLIANT: Data attributes για preview state και value
    root.setAttribute('data-layera-header-preview', 'active');
    root.setAttribute('data-layera-header-preview-color', color);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή hover effects μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applyHoverEffect = useCallback((effect: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-hover-preview', effect);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή active effects μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applyActiveEffect = useCallback((effect: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-active-preview', effect);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή border width μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applyBorderWidth = useCallback((width: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-border-width-preview', width);
  }, []);

  // Radius value helper removed as it was unused

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή card radius μέσω data attributes
   * ZERO CSS injection - ZERO style.setProperty - ΜΟΝΟ data attributes
   */
  const applyCardRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-card-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή modal radius μέσω CSS custom properties
   */
  const applyModalRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-modal-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή layout radius μέσω CSS custom properties
   */
  const applyLayoutRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-layout-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή header radius μέσω CSS custom properties
   */
  const applyHeaderRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-header-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή button radius μέσω CSS custom properties
   */
  const applyButtonRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-button-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή input radius μέσω CSS custom properties
   */
  const applyInputRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-input-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή border radius μέσω CSS custom properties
   */
  const applyBorderRadius = useCallback((radius: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-border-radius-preview', radius);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή font size μέσω CSS custom properties
   */
  const applyFontSize = useCallback((size: string) => {
    const root = document.documentElement;
    root.setAttribute('data-layera-font-size-preview', size);
  }, []);

  /**
   * ✅ ARXES COMPLIANT: Εφαρμογή ειδικών effects μέσω CSS custom properties
   * ZERO CSS injection - ΜΟΝΟ property overrides
   */
  const applySpecialEffects = useCallback((key: string, value: string) => {
    switch (key) {
      case 'hoverEffect':
        console.log('🎯 useRealTimePreview: Processing hoverEffect', { value });
        applyHoverEffect(value);
        break;
      case 'activeEffect':
        console.log('🎯 useRealTimePreview: Processing activeEffect', { value });
        applyActiveEffect(value);
        break;
      case 'borderWidth':
        console.log('🎯 useRealTimePreview: Processing borderWidth', { value });
        applyBorderWidth(value);
        break;
      case 'cardRadius':
        console.log('🎯 useRealTimePreview: Processing cardRadius', { value });
        applyCardRadius(value);
        break;
      case 'modalRadius':
        console.log('🎯 useRealTimePreview: Processing modalRadius', { value });
        applyModalRadius(value);
        break;
      case 'layoutRadius':
        console.log('🎯 useRealTimePreview: Processing layoutRadius', { value });
        applyLayoutRadius(value);
        break;
      case 'headerRadius':
        console.log('🎯 useRealTimePreview: Processing headerRadius', { value });
        applyHeaderRadius(value);
        break;
      case 'buttonRadius':
        console.log('🎯 useRealTimePreview: Processing buttonRadius', { value });
        applyButtonRadius(value);
        break;
      case 'inputRadius':
        console.log('🎯 useRealTimePreview: Processing inputRadius', { value });
        applyInputRadius(value);
        break;
      case 'borderRadius':
        console.log('🎯 useRealTimePreview: Processing borderRadius (generic)', { value });
        applyBorderRadius(value);
        break;
      case 'fontSize':
        console.log('🎯 useRealTimePreview: Processing fontSize', { value });
        applyFontSize(value);
        break;
    }
  }, [applyHoverEffect, applyActiveEffect, applyBorderWidth, applyCardRadius, applyModalRadius, applyLayoutRadius, applyHeaderRadius, applyButtonRadius, applyInputRadius, applyBorderRadius, applyFontSize]);


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

    // ✅ ARXES COMPLIANT: Data attributes για card variable updates
    // ZERO style.setProperty - ΜΟΝΟ semantic data attributes
    root.setAttribute(`data-layera-card-${category}-${colorSuffix}`, 'active');
    root.setAttribute(`data-layera-card-${category}-${colorSuffix}-value`, colorValue);
  }, []);

  /**
   * Εφαρμόζει live preview στο DOM χωρίς save - Optimized για multiple features
   */
  const applyLivePreview = useCallback((key: string, value: string, category?: string, elementType?: string) => {
    // Use DocumentFragment για batch DOM updates
    const root = document.documentElement;


    // CSS variable mapping removed as it was unused

    // ISOLATED UPDATES: Apply changes only to the specific element type + category
    const isColorKey = key === 'primaryColor' || key === 'secondaryColor' || key === 'successColor' ||
                      key === 'warningColor' || key === 'dangerColor' || key === 'infoColor';

    if (category && elementType && isColorKey) {
      // Update based on category type, regardless of elementType for most categories
      if (category === 'backgrounds') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables' || elementType === 'headers') {
          // Update card/component background variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Χρησιμοποιούμε το useCSSVariables για button updates
          // Αυτό αποφεύγει διπλότυπα και εξασφαλίζει ενιαία πηγή αλήθειας

          // ΑΦΑΙΡΕΣΗ: Το applyHeaderButtonPreview επηρεάζει όλα τα playground buttons
          // Σε selective mode δεν χρειαζόμαστε header button updates
          // Header buttons θα ενημερωθούν μόνο σε full theme mode
        }
      } else if (category === 'text') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables' || elementType === 'headers') {
          // Update card/component text variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Button text updates handled by useCSSVariables
        }
      } else if (category === 'borders') {
        if (elementType === 'cards' || elementType === 'modals' || elementType === 'inputs' || elementType === 'layout' || elementType === 'tables' || elementType === 'headers') {
          // Update card/component border variables
          updateCardVariables(key, value, category);
        } else if (elementType === 'buttons') {
          // DELEGATION: Button border updates handled by useCSSVariables
        }
      } else if (category === 'buttons' && elementType === 'buttons') {
        // ✅ ARXES COMPLIANT: Button colors μέσω data attributes
        root.setAttribute(`data-layera-preview-button-${key}`, value);
        applyHeaderButtonPreview(value);
      }
    } else {
      // ✅ ARXES COMPLIANT: Fallback logic μέσω data attributes
      root.setAttribute(`data-layera-preview-${key}`, value);
      applySpecialEffects(key, value);
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
      }, UI_TIMING.FRAME_60FPS);
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

    // ✅ ARXES COMPLIANT: Καθαρισμός μόνο των data attributes
    const root = document.documentElement;

    // Clear all preview data attributes
    const previewAttributes = [
      'data-layera-header-preview',
      'data-layera-hover-preview',
      'data-layera-active-preview',
      'data-layera-border-width-preview',
      'data-layera-card-radius-preview',
      'data-layera-modal-radius-preview',
      'data-layera-layout-radius-preview',
      'data-layera-header-radius-preview',
      'data-layera-button-radius-preview',
      'data-layera-input-radius-preview',
      'data-layera-border-radius-preview',
      'data-layera-font-size-preview'
    ];

    previewAttributes.forEach(attribute => {
      root.removeAttribute(attribute);
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