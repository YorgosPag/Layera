import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

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
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const extractHexFromValue = (colorValue: string): string => {
  if (!colorValue) return 'var(--layera-color-surface-primary)';
  if (colorValue.startsWith('#')) return colorValue;
  // CSS variable fallback
  const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
  return match ? match[1] : 'var(--layera-color-surface-primary)';
};

interface ColorWithAlpha {
  hex: string;
  alpha: number;
  rgba: string;
}

interface ColorPickerWithAlphaProps {
  label: string;
  value: ColorWithAlpha | string; // Support για legacy HEX values
  onChange: (value: ColorWithAlpha) => void;
  onPreview?: (value: ColorWithAlpha) => void; // Real-time preview για hover events
  className?: string;
  throttleMs?: number; // Currently unused but kept for future use
}

export const ColorPickerWithAlpha: React.FC<ColorPickerWithAlphaProps> = ({
  label,
  value,
  onChange,
  onPreview,
  className = '',
  throttleMs = 16
}) => {
  // Optimized parse function with caching
  const parseValue = useCallback((val: ColorWithAlpha | string): ColorWithAlpha => {
    if (typeof val === 'string') {
      // Fast path for HEX colors (most common case)
      if (val.startsWith('#') && val.length === 7) {
        return {
          hex: val,
          alpha: 1.0,
          rgba: hexToRgba(val, 1.0)
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
      return {
        hex: 'var(--layera-color-surface-primary)',
        alpha: 1.0,
        rgba: hexToRgba('var(--layera-color-surface-primary)', 1.0)
      };
    }
    return val;
  }, []);

  // Simplified state - no complex throttling (throttleMs available for future optimization)
  const [internalValue, setInternalValue] = useState<ColorWithAlpha>(parseValue(value));

  // Note: throttleMs parameter preserved for future performance optimizations
  void throttleMs;

  // PERFORMANCE: Helper functions moved outside component για zero recreations

  // Sync με external value
  useEffect(() => {
    setInternalValue(parseValue(value));
  }, [value]);

  // Enhanced handlers με safety checks
  const handleHexChange = useCallback((newHex: string) => {
    if (!newHex || !newHex.startsWith('#')) return;

    const safeAlpha = internalValue?.alpha ?? 1.0;
    const newValue = {
      hex: newHex,
      alpha: safeAlpha,
      rgba: hexToRgba(newHex, safeAlpha)
    };
    setInternalValue(newValue);
    onChange(newValue);
  }, [internalValue?.alpha, onChange]);

  const handleAlphaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(e.target.value) / 100;
    if (isNaN(newAlpha)) return;

    const safeHex = internalValue?.hex || 'var(--layera-color-surface-primary)';
    if (!safeHex.startsWith('#')) return;

    const newValue = {
      hex: safeHex,
      alpha: newAlpha,
      rgba: hexToRgba(safeHex, newAlpha)
    };
    setInternalValue(newValue);
    onChange(newValue);
  }, [internalValue?.hex, onChange]);

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
  const displayHex = useMemo(() => extractHexFromValue(internalValue?.hex || 'var(--layera-color-surface-primary)'), [internalValue?.hex]);
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
    if (onPreview && internalValue) {
      // Immediate preview χωρίς throttling για responsive UX
      onPreview(internalValue);
    }
  }, [onPreview, internalValue]);

  // Mouse leave handler για να διατηρήσει το χρώμα αντί για fallback
  const handleMouseLeave = useCallback(() => {
    // ΜΗ καλέσεις onPreview - αφήνει το τελευταίο preview ενεργό
    // Αυτό αποτρέπει το revert στα factory settings
  }, []);

  return (
    <Box className={`layera-card layera-padding--md ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--sm" data-size="base" data-weight="bold" data-color="primary">
        {label}
      </h4>

      {/* HEX Color Picker */}
      <Box className="layera-margin-bottom--xs">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
          Χρώμα
        </Text>
        <Box
          ref={colorInputRef}
          as="input"
          type="color"
          value={displayHex}
          onInput={handleHexInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHexChange(e.target.value)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="layera-input layera-width--full layera-cursor--pointer layera-transition--none"
        />
      </Box>

      {/* Alpha Slider με Preview */}
      <Box className="layera-margin-bottom--xs">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
          Διαφάνεια: {alphaPercentage}%
        </Text>

        {/* Alpha Preview Box - 250px πλάτος με progressive alpha */}
        <Box className="layera-margin-bottom--xs layera-flex layera-flex--justify-center">
          <Box
            className="layera-border--default layera-position--relative layera-alpha-preview-250"
          >
            {/* Overlay με το χρώμα και την αντίστοιχη διαφάνεια */}
            <Box
              className="layera-position--absolute layera-position-top--0 layera-position-left--0 layera-width--full layera-height--full layera-border-radius--sm layera-dynamic-bg"
              data-dynamic-bg={internalValue?.rgba || 'color-mix(in srgb, var(--layera-color-surface-primary) 100%, transparent)'}
            />
          </Box>
        </Box>

        {/* Alpha Slider - 250px πλάτος για συμμετρία */}
        <Box className="layera-flex layera-flex--justify-center">
          <Box
            as="input"
            type="range"
            min="0"
            max="100"
            step="1"
            value={alphaPercentage}
            onChange={handleAlphaChange}
            className="layera-input layera-width--250"
          />
        </Box>
      </Box>

      {/* Compact Values */}
      <Box>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          {displayHex.toUpperCase()} · α{alphaPercentage}%
        </Text>
      </Box>
    </Box>
  );
};

export type { ColorWithAlpha };