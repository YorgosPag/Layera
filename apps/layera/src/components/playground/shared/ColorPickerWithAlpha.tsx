import React, { useState, useCallback, useRef, useEffect } from 'react';
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
 * - Optimized performance με throttling
 */

interface ColorWithAlpha {
  hex: string;    // #ff0000
  alpha: number;  // 0.8 (80%)
  rgba: string;   // rgba(255, 0, 0, 0.8)
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
  throttleMs = 200 // Enhanced throttling για καλύτερη performance
}) => {
  // Parse incoming value
  const parseValue = (val: ColorWithAlpha | string): ColorWithAlpha => {
    if (typeof val === 'string') {
      // Legacy HEX support
      if (val.startsWith('rgba')) {
        const rgbaMatch = val.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
          const [, r, g, b, a] = rgbaMatch;
          const hex = `#${[r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
          return {
            hex,
            alpha: parseFloat(a),
            rgba: val
          };
        }
      }
      // Regular HEX
      return {
        hex: val.startsWith('#') ? val : '#ffffff',
        alpha: 1.0,
        rgba: hexToRgba(val.startsWith('#') ? val : '#ffffff', 1.0)
      };
    }
    return val;
  };

  // Simplified state - no complex throttling (throttleMs available for future optimization)
  const [internalValue, setInternalValue] = useState<ColorWithAlpha>(parseValue(value));

  // Note: throttleMs parameter preserved for future performance optimizations
  void throttleMs;

  // Helper function: HEX to RGBA
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function: Extract HEX from CSS variable
  const extractHexFromValue = (colorValue: string): string => {
    if (!colorValue) return '#ffffff';
    if (colorValue.startsWith('#')) return colorValue;

    // CSS variable fallback
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : '#ffffff';
  };

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

    const safeHex = internalValue?.hex || '#ffffff';
    if (!safeHex.startsWith('#')) return;

    const newValue = {
      hex: safeHex,
      alpha: newAlpha,
      rgba: hexToRgba(safeHex, newAlpha)
    };
    setInternalValue(newValue);
    onChange(newValue);
  }, [internalValue?.hex, onChange]);

  // Real-time preview handler για color picker input events με throttling
  const handleHexInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const newHex = (e.target as HTMLInputElement).value;
    if (!newHex || !newHex.startsWith('#')) return;

    const safeAlpha = internalValue?.alpha ?? 1.0;
    const previewValue = {
      hex: newHex,
      alpha: safeAlpha,
      rgba: hexToRgba(newHex, safeAlpha)
    };

    // Ενημέρωση του internal state για καλύτερη συνέχεια
    setInternalValue(previewValue);

    // Real-time preview χωρίς αλλαγή του external state
    if (onPreview) {
      onPreview(previewValue);
    }
  }, [internalValue?.alpha, onPreview]);

  // Real-time mouse tracking για color picker (browser limitations workaround)
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Extract display values before using them in useEffect
  const displayHex = extractHexFromValue(internalValue?.hex || '#ffffff');
  const alphaPercentage = Math.round((internalValue?.alpha ?? 1.0) * 100);

  useEffect(() => {
    const input = colorInputRef.current;
    if (!input || !onPreview) return;

    let isMouseDown = false;
    let animationFrameId: number | null = null;

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const checkColorChange = () => {
      if (!isMouseDown || !input) return;

      const currentColor = input.value;
      if (currentColor && currentColor !== displayHex) {
        const safeAlpha = internalValue?.alpha ?? 1.0;
        const previewValue = {
          hex: currentColor,
          alpha: safeAlpha,
          rgba: hexToRgba(currentColor, safeAlpha)
        };

        // Real-time update χωρίς lag
        setInternalValue(previewValue);
        onPreview(previewValue);
      }

      // Συνεχής έλεγχος κατά το dragging
      animationFrameId = requestAnimationFrame(checkColorChange);
    };

    const handleMouseMove = () => {
      if (isMouseDown && !animationFrameId) {
        animationFrameId = requestAnimationFrame(checkColorChange);
      }
    };

    input.addEventListener('mousedown', handleMouseDown);
    input.addEventListener('mouseup', handleMouseUp);
    input.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp); // Global mouse up

    return () => {
      input.removeEventListener('mousedown', handleMouseDown);
      input.removeEventListener('mouseup', handleMouseUp);
      input.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [displayHex, internalValue?.alpha, onPreview]);

  // Mouse enter handler για καλύτερο UX
  const handleMouseEnter = useCallback(() => {
    if (onPreview && internalValue) {
      onPreview(internalValue);
    }
  }, [onPreview, internalValue]);

  // Mouse leave handler για να διατηρήσει το χρώμα αντί για fallback
  const handleMouseLeave = useCallback(() => {
    // ΜΗ καλέσεις onPreview - αφήνει το τελευταίο preview ενεργό
    // Αυτό αποτρέπει το revert στα factory settings (#0078d4)
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
        <input
          ref={colorInputRef}
          type="color"
          value={displayHex}
          onChange={(e) => handleHexChange(e.target.value)}
          onInput={handleHexInput}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="layera-input layera-width--full"
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
            className="layera-border--default"
            style={{
              width: '250px',
              height: '24px',
              borderRadius: '4px',
              // Πάντα checkboard pattern ως background
              backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              position: 'relative'
            } as React.CSSProperties}
          >
            {/* Overlay με το χρώμα και την αντίστοιχη διαφάνεια */}
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                backgroundColor: internalValue?.rgba || 'rgba(255, 255, 255, 1)'
              } as React.CSSProperties}
            />
          </Box>
        </Box>

        {/* Alpha Slider - 250px πλάτος για συμμετρία */}
        <Box className="layera-flex layera-flex--justify-center">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={alphaPercentage}
            onChange={handleAlphaChange}
            className="layera-input"
            style={{
              width: '250px'
            } as React.CSSProperties}
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