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

export const useRealTimePreview = ({ onCommit, debounceMs = 300 }: UseRealTimePreviewProps) => {
  const [previewState, setPreviewState] = useState<PreviewState>({
    previewColors: {},
    isPreviewActive: false,
    previewKey: null
  });

  const debounceTimerRef = useRef<NodeJS.Timeout>();

  /**
   * Εφαρμόζει live preview στα header buttons
   */
  const applyHeaderButtonPreview = useCallback((color: string) => {
    const headerContainer = document.querySelector('[data-layout="header-fixed"]');

    if (headerContainer) {
      const allButtons = headerContainer.querySelectorAll('button');
      console.log(`🔘 Found ${allButtons.length} buttons in header`);
    }

    // Ακριβείς selectors για τα header SquareButton components
    const headerButtonSelectors = [
      '[data-layout="header-fixed"] .layera-square-btn.layera-button[data-variant="secondary"]',
      '[data-layout="header-fixed"] .layera-square-btn.layera-button',
      '[data-layout="header-fixed"] button.layera-square-btn',
      '[data-layout="header-fixed"] button[class*="layera-button"]',
      '[data-layout="header-fixed"] button[data-variant="secondary"]',
      '[data-layout="header-fixed"] button[data-shape="square"]',
      '[data-layout="header-fixed"] button',
      '.layera-square-btn',
      '.layera-button'
    ];

    const style = document.createElement('style');
    style.id = 'layera-live-preview-header-buttons';

    // Remove existing preview style
    const existingStyle = document.getElementById('layera-live-preview-header-buttons');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new live preview styles με ακριβή targeting
    const css = headerButtonSelectors.map(selector =>
      `${selector} {
        background-color: ${color} !important;
        border-color: ${color} !important;
        transition: all 0.15s ease !important;
      }`
    ).join('\n');

    style.textContent = css;
    document.head.appendChild(style);

    console.log(`🚨 HEADER BUTTON Live preview applied: ${color}`);
  }, []);

  /**
   * Εφαρμόζει live preview στο DOM χωρίς save
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
      console.log(`🎨 Live preview applied: ${cssVariable} = ${value}`);

      // Ειδική διαχείριση για header buttons (secondary color)
      if (key === 'secondaryColor') {
        applyHeaderButtonPreview(value);
      }
    }
  }, [applyHeaderButtonPreview]);

  /**
   * Ξεκινάει live preview για ένα συγκεκριμένο χρώμα
   */
  const startPreview = useCallback((key: string, value: string) => {
    console.log(`🎨 startPreview called: ${key} = ${value}`);

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

    // Apply live preview to DOM instantly
    applyLivePreview(key, value);

    // Set debounced commit
    debounceTimerRef.current = setTimeout(() => {
      commitPreview(key, value);
    }, debounceMs);
  }, [debounceMs, applyLivePreview]);

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

    console.log(`🎯 Real-time preview committed: ${key} = ${value}`);
  }, [onCommit]);

  /**
   * Καθαρίζει όλα τα preview effects
   */
  const clearPreview = useCallback(() => {
    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = undefined;
    }

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

    console.log('🧹 Live preview cleared');
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