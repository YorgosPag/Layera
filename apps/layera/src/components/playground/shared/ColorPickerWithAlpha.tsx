import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { SettingsIcon } from '@layera/icons';
import type { ColorWithAlpha } from '../../../hooks/useColorState';

/**
 * ColorPickerWithAlpha Component
 *
 * Advanced color picker με alpha channel support
 * - HEX color picker για βασικό χρώμα
 * - Alpha slider για διαφάνεια (0-100%)
 * - Live preview με RGBA output
 * - Θυμάται την alpha τιμή ανά χρώμα
 * - ULTRA-OPTIMIZED performance με throttling + zero re-renders
 */

// PERFORMANCE: Move helper functions outside component για zero recreations
// Color utility functions moved to centralized utils
import { hexToRgba, extractHexFromValue } from '../../../utils/colors';

// ColorWithAlpha interface removed - now using unified interface from useColorState

interface ColorPickerWithAlphaProps {
  label: string;
  value: ColorWithAlpha | string; // Support για legacy HEX values
  onChange: (value: ColorWithAlpha) => void;
  onPreview?: (value: ColorWithAlpha) => void; // Real-time preview για hover events
  className?: string;
  throttleMs?: number; // Currently unused but kept for future use
  variant?: string; // Variant για CSS Info display (π.χ. 'primary', 'secondary')
  colorVariant?: string; // Variant για dynamic card coloring (πάντα 'primary')
  showVariantInfo?: boolean; // Εμφανίζει CSS variable & selector info
  elementType?: string; // Element type για dynamic CSS info (π.χ. 'card', 'modal', 'button')
}

export const ColorPickerWithAlpha: React.FC<ColorPickerWithAlphaProps> = ({
  label,
  value,
  onChange,
  onPreview,
  className = '',
  throttleMs = 16,
  variant,
  colorVariant,
  elementType: _elementType
}) => {
  // Flag για να ξέρουμε αν ο χρήστης αλλάζει το slider
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  // Flag για να αποφύγουμε το reset αμέσως μετά το mouse up
  const [recentlyInteracted, setRecentlyInteracted] = useState(false);

  // Simplified state - no complex throttling (throttleMs available for future optimization)
  const [internalValue, setInternalValue] = useState<ColorWithAlpha>(() => {
    // Αρχικοποίηση με απλό parse χωρίς dependency
    if (typeof value === 'string') {
      if (value.startsWith('#') && value.length === 7) {
        return {
          hex: value,
          alpha: 1.0,
          rgba: hexToRgba(value, 1.0)
        };
      }
      if (value.startsWith('rgba')) {
        const rgbaMatch = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
          const [, r, g, b, a] = rgbaMatch;
          const hex = '#' +
            parseInt(r).toString(16).padStart(2, '0') +
            parseInt(g).toString(16).padStart(2, '0') +
            parseInt(b).toString(16).padStart(2, '0');
          return {
            hex,
            alpha: parseFloat(a),
            rgba: value
          };
        }
      }
      return {
        hex: 'var(--layera-colors-text-primary)',
        alpha: 1.0,
        rgba: hexToRgba('var(--layera-colors-text-primary)', 1.0)
      };
    }
    return value;
  });

  // Optimized parse function with caching - τώρα μπορεί να χρησιμοποιηθεί safely
  const parseValue = useCallback((val: ColorWithAlpha | string, preserveAlpha = false): ColorWithAlpha => {
    if (typeof val === 'string') {
      // Fast path for HEX colors (most common case)
      if (val.startsWith('#') && val.length === 7) {
        const alphaToUse = preserveAlpha ? (internalValue?.alpha ?? 1.0) : 1.0;
        return {
          hex: val,
          alpha: alphaToUse,
          rgba: hexToRgba(val, alphaToUse)
        };
      }
      // RGBA parsing (less common)
      if (val.startsWith('rgba')) {
        const rgbaMatch = val.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
          const [, r, g, b, a] = rgbaMatch;
          // Optimized hex conversion without map
          const hex = '#' +
            parseInt(r).toString(16).padStart(2, '0') +
            parseInt(g).toString(16).padStart(2, '0') +
            parseInt(b).toString(16).padStart(2, '0');
          return {
            hex,
            alpha: parseFloat(a),
            rgba: val
          };
        }
      }
      // Fallback
      const alphaToUse = preserveAlpha ? (internalValue?.alpha ?? 1.0) : 1.0;
      return {
        hex: 'var(--layera-colors-text-primary)',
        alpha: alphaToUse,
        rgba: hexToRgba('var(--layera-colors-text-primary)', alphaToUse)
      };
    }
    return val;
  }, [internalValue?.alpha]);

  // Note: throttleMs parameter preserved for future performance optimizations
  void throttleMs;

  // Μοναδικό CSS variable name για κάθε color picker
  const uniqueId = label.toLowerCase().replace(/\s+/g, '-').replace(/color.*$/i, '');
  const cssVariableName = `--layera-live-alpha-color-${uniqueId}`;


  // PERFORMANCE: Helper functions moved outside component για zero recreations

  // FIXED: Simplified sync με external value χωρίς infinite loop
  useEffect(() => {
    // Αν ο χρήστης αλλάζει το slider ή μόλις τέλειωσε, μην κάνεις sync
    if (isUserInteracting || recentlyInteracted) {
      return;
    }

    const newValue = parseValue(value, false); // ΔΕΝ διατηρούμε alpha για να αποφύγουμε loop

    // Μόνο αν το HEX έχει πραγματικά αλλάξει εξωτερικά
    if (!internalValue || newValue.hex !== internalValue.hex) {
      setInternalValue(newValue); // Simple assignment - όχι spread με conditional
    }
  }, [value, isUserInteracting, recentlyInteracted, parseValue]);

  // Global event listener για το mouseup/touchend (αν ο χρήστης αφήσει το mouse έξω από το slider)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isUserInteracting) {
        setIsUserInteracting(false);
        setRecentlyInteracted(true);

        setTimeout(() => {
          setRecentlyInteracted(false);
        }, 500);
      }
    };

    if (isUserInteracting) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);

      // ✅ CLEANUP: Ακύρωση throttled timeout
      if (throttledCSSUpdate.current) {
        clearTimeout(throttledCSSUpdate.current);
        throttledCSSUpdate.current = null;
      }
    };
  }, [isUserInteracting]);

  // ✅ ΒΕΛΤΙΩΜΕΝΟ: CSS update με throttling για performance
  useEffect(() => {
    // Αν ο χρήστης αλλάζει το slider, μην κάνεις override
    if (isUserInteracting || recentlyInteracted || !internalValue) {
      return;
    }

    // THROTTLED CSS update για αποφυγή spam
    if (throttledCSSUpdate.current) {
      clearTimeout(throttledCSSUpdate.current);
    }

    throttledCSSUpdate.current = window.setTimeout(() => {
      if (typeof document !== 'undefined' && internalValue) {
        const root = document.documentElement;
        const currentHex = internalValue.hex?.startsWith('#') ? internalValue.hex : extractHexFromValue(internalValue.hex || 'var(--layera-colors-text-primary)');
        const currentAlpha = internalValue.alpha || 1.0;
        const rgbaValue = hexToRgba(currentHex, currentAlpha);
        root.style.setProperty(cssVariableName, rgbaValue);
      }
      throttledCSSUpdate.current = null;
    }, 16); // 60fps throttling
  }, [internalValue?.hex, internalValue?.alpha, cssVariableName, isUserInteracting, recentlyInteracted]);

  // Enhanced handlers με safety checks
  const handleHexChange = useCallback((newHex: string) => {
    if (!newHex || !newHex.startsWith('#')) return;

    const safeAlpha = internalValue?.alpha ?? 1.0; // ✅ Επαναφορά default alpha
    const newValue = {
      hex: newHex,
      alpha: safeAlpha,
      rgba: hexToRgba(newHex, safeAlpha)
    };
    setInternalValue(newValue);
    onChange(newValue);
  }, [internalValue?.alpha, onChange]);

  // ✅ PERFORMANCE: Throttled CSS update για smooth slider
  const throttledCSSUpdate = useRef<number | null>(null);
  const alphaSliderRef = useRef<HTMLInputElement>(null);

  const handleAlphaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(e.target.value) / 100;
    if (isNaN(newAlpha)) return;

    const safeHex = internalValue?.hex || 'var(--layera-colors-text-primary)';
    const actualHex = safeHex.startsWith('#') ? safeHex : extractHexFromValue(safeHex);

    // ✅ ΑΜΕΣΗ CSS ΕΝΗΜΕΡΩΣΗ: Μόνο CSS update για instant preview - όχι state!
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const rgbaValue = hexToRgba(actualHex, newAlpha);
      root.style.setProperty(cssVariableName, rgbaValue);
    }

    // ✅ ΕΝΗΜΕΡΩΣΗ SLIDER POSITION: Πάντα ενημερώνουμε το internalValue για το slider position
    const newValue = {
      hex: safeHex,
      alpha: newAlpha,
      rgba: hexToRgba(actualHex, newAlpha)
    };

    setInternalValue(newValue);

    // ✅ LIVE PREVIEW: Πάντα καλούμε onPreview για real-time αλλαγές
    if (onPreview) {
      onPreview(newValue);
    }

    // ✅ PERFORMANCE: onChange μόνο στο τέλος (mouseup) - όχι κατά τη κίνηση
    if (isUserInteracting) {
      // Κατά τη διάρκεια της κίνησης, μόνο CSS update, slider position και preview
      return;
    }

    // Κανονικό onChange μόνο όταν δεν αλλάζει ο χρήστης
    onChange(newValue);
  }, [internalValue?.hex, onPreview, onChange, cssVariableName, isUserInteracting]);

  // Handler για το mousedown event του slider
  const handleSliderMouseDown = useCallback(() => {
    setIsUserInteracting(true);
  }, []);

  // Handler για το mouseup event του slider
  const handleSliderMouseUp = useCallback(() => {
    // ✅ ΒΕΛΤΙΩΣΗ: Τελική ενημέρωση state με την τρέχουσα alpha από το slider
    if (alphaSliderRef.current && internalValue) {
      const finalAlpha = parseFloat(alphaSliderRef.current.value) / 100;
      const safeHex = internalValue.hex || 'var(--layera-colors-text-primary)';
      const actualHex = safeHex.startsWith('#') ? safeHex : extractHexFromValue(safeHex);

      const finalValue = {
        hex: safeHex,
        alpha: finalAlpha,
        rgba: hexToRgba(actualHex, finalAlpha)
      };

      setInternalValue(finalValue);
      if (onPreview) {
        onPreview(finalValue);
      }
      onChange(finalValue);
    }

    setIsUserInteracting(false);
    setRecentlyInteracted(true);

    // Αφήνουμε λίγο χρόνο και μετά επιτρέπουμε πάλι τις external changes
    setTimeout(() => {
      setRecentlyInteracted(false);
    }, 500); // Μεγαλύτερη καθυστέρηση για σιγουριά
  }, [internalValue, onPreview, onChange]);

  // Lightweight input handler με memoization
  const handleHexInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const newHex = (e.target as HTMLInputElement).value;
    // Fast validation with early returns
    if (!newHex?.startsWith('#') || newHex.length !== 7) return;

    const safeAlpha = internalValue?.alpha ?? 1.0;

    // Throttled preview call για smooth performance
    if (onPreview) {
      onPreview({
        hex: newHex,
        alpha: safeAlpha,
        rgba: hexToRgba(newHex, safeAlpha)
      });
    }
  }, [internalValue?.alpha, onPreview]);

  // Real-time mouse tracking για color picker (browser limitations workaround)
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Memoized display values to prevent recalculations
  const displayHex = useMemo(() => extractHexFromValue(internalValue?.hex || 'var(--layera-colors-text-primary)'), [internalValue?.hex]);
  const alphaPercentage = useMemo(() => Math.round((internalValue?.alpha ?? 1.0) * 100), [internalValue?.alpha]);

  // ΒΕΛΤΙΣΤΟΠΟΙΗΜΕΝΗ real-time tracking με throttling
  useEffect(() => {
    const input = colorInputRef.current;
    if (!input || !onPreview) return;

    let isMouseDown = false;
    let lastCheckedColor = input.value;
    let throttleTimestamp = 0;
    const THROTTLE_INTERVAL = 32;

    // ULTRA-OPTIMIZED throttled preview - χωρίς state updates για performance
    const throttledPreview = (newHex: string) => {
      const now = Date.now();
      if (now - throttleTimestamp < THROTTLE_INTERVAL) return;
      throttleTimestamp = now;

      if (newHex === lastCheckedColor) return;
      lastCheckedColor = newHex;

      const safeAlpha = internalValue?.alpha ?? 1.0;
      const previewValue = {
        hex: newHex,
        alpha: safeAlpha,
        rgba: hexToRgba(newHex, safeAlpha)
      };

      // CRITICAL FIX: Μόνο onPreview, ΌΧΙ setInternalValue για smooth cursor movement
      onPreview(previewValue);
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      lastCheckedColor = input.value;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    // Event-based tracking (μόνο όταν χρειάζεται)
    const handleChange = () => {
      if (isMouseDown) {
        throttledPreview(input.value);
      }
    };

    // Lightweight event listeners
    input.addEventListener('mousedown', handleMouseDown, { passive: true });
    input.addEventListener('mouseup', handleMouseUp, { passive: true });
    input.addEventListener('input', handleChange, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      input.removeEventListener('mousedown', handleMouseDown);
      input.removeEventListener('mouseup', handleMouseUp);
      input.removeEventListener('input', handleChange);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [internalValue?.alpha, onPreview]);

  // OPTIMIZED Mouse enter handler - debounced για performance
  const handleMouseEnter = useCallback(() => {
    // ✅ SKIP HOVER PREVIEW για buttons category - αποφεύγει στιγμιαία εμφάνιση
    // Η hover preview προκαλεί unintended RGBA εφαρμογή στα buttons
    if (label.toLowerCase().includes('primary') || label.toLowerCase().includes('secondary') ||
        label.toLowerCase().includes('success') || label.toLowerCase().includes('warning') ||
        label.toLowerCase().includes('danger') || label.toLowerCase().includes('info')) {
      return;
    }

    if (onPreview && internalValue) {
      // Immediate preview χωρίς throttling για responsive UX
      onPreview(internalValue);
    }
  }, [onPreview, internalValue, label]);

  // Mouse leave handler για να διατηρήσει το χρώμα αντί για fallback
  const handleMouseLeave = useCallback(() => {
    // ΜΗ καλέσεις onPreview - αφήνει το τελευταίο preview ενεργό
    // Αυτό αποτρέπει το revert στα factory settings
  }, []);

  return (
    <Box
      className={`layera-card layera-padding--md ${className}`}
      data-variant={colorVariant || variant}
    >
      <h4 className="layera-typography layera-margin-bottom--sm" data-size="base" data-weight="bold" data-color="primary">
        {label}
      </h4>

      {/* HEX Color Picker */}
      <Box className="layera-margin-bottom--xs">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
          Χρώμα
        </Text>
        <input
          ref={colorInputRef}
          type="color"
          value={displayHex}
          onInput={handleHexInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHexChange(e.target.value)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="layera-input layera-width--full global-cursor-pointer layera-height--10"
        />
      </Box>

      {/* Alpha Slider με Preview */}
      <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
        Διαφάνεια: {alphaPercentage}%
      </Text>

      {/* Alpha Preview Box */}
      <Box
        className="layera-border--default layera-border-radius--sm layera-height--10 layera-width--full layera-margin-bottom--xs"
        data-alpha-preview={uniqueId}
      />

      {/* Alpha Slider */}
      <Box className="layera-margin-bottom--xs">
        <input
          ref={alphaSliderRef}
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={alphaPercentage}
          onChange={handleAlphaChange}
          onMouseDown={handleSliderMouseDown}
          onMouseUp={handleSliderMouseUp}
          onTouchStart={handleSliderMouseDown}
          onTouchEnd={handleSliderMouseUp}
          className="layera-input layera-width--full"
        />
      </Box>

    </Box>
  );
};

export type { ColorWithAlpha };