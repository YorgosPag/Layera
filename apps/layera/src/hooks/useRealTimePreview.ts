import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Real-Time Color Preview Hook
 *
 * Enterprise UX Feature για live preview χωρίς commit
 * - Live preview στα header buttons
 * - Debounced save για smooth performance
 * - Separate preview state από committed state
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

export const useRealTimePreview = ({ onCommit, debounceMs = 500 }: UseRealTimePreviewProps) => {
  const [previewState, setPreviewState] = useState<PreviewState>({
    previewColors: {},
    isPreviewActive: false,
    previewKey: null
  });

  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const domUpdateTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const pendingDOMUpdate = useRef<{ key: string; value: string } | null>(null);
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
      .layera-square-btn {
        background-color: ${color} !important;
        border-color: ${color} !important;
        transition: none !important;
      }`;

    style.textContent = css;
  }, []);

  /**
   * Εφαρμόζει live preview στο DOM χωρίς save - τώρα με throttling
   */
  const applyLivePreview = useCallback((key: string, value: string) => {
    const root = document.documentElement;

    // Map color keys to CSS variables
    const cssVariableMap: Record<string, string> = {
      primaryColor: '--layera-color-button-primary',
      secondaryColor: '--layera-color-button-secondary',
      successColor: '--layera-color-button-success',
      warningColor: '--layera-color-button-warning',
      dangerColor: '--layera-color-button-danger',
      infoColor: '--layera-color-button-info'
    };

    const cssVariable = cssVariableMap[key];
    if (cssVariable) {
      root.style.setProperty(cssVariable, value);

      // Ειδική διαχείριση για header buttons (secondary color)
      if (key === 'secondaryColor') {
        applyHeaderButtonPreview(value);
      }
    }
  }, [applyHeaderButtonPreview]);

  /**
   * Throttled version του DOM update - Μείωση DOM manipulations με requestAnimationFrame
   */
  const throttledDOMUpdate = useCallback((key: string, value: string) => {
    // Αποθήκευση του pending update
    pendingDOMUpdate.current = { key, value };

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
          applyLivePreview(pendingDOMUpdate.current.key, pendingDOMUpdate.current.value);
          pendingDOMUpdate.current = null;
        }
        rafRef.current = null;
      }, 60); // 60ms throttle με RAF = πολύ smooth
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

    // Clear preview state
    setPreviewState(prev => ({
      previewColors: { ...prev.previewColors, [key]: value },
      isPreviewActive: false,
      previewKey: null
    }));
  }, [onCommit]);

  /**
   * Ξεκινάει live preview για ένα συγκεκριμένο χρώμα
   */
  const startPreview = useCallback((key: string, value: string) => {
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
    throttledDOMUpdate(key, value);

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

    // Remove live preview styles
    const existingStyle = document.getElementById('layera-live-preview-header-buttons');
    if (existingStyle) {
      existingStyle.remove();
    }
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