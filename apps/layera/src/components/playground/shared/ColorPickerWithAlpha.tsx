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
  className?: string;
  throttleMs?: number;
}

export const ColorPickerWithAlpha: React.FC<ColorPickerWithAlphaProps> = ({
  label,
  value,
  onChange,
  className = '',
  throttleMs = 50
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

  const [localValue, setLocalValue] = useState<ColorWithAlpha>(parseValue(value));
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);

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

  // Sync με external value όταν δεν κάνουμε changes
  useEffect(() => {
    if (!isChanging) {
      setLocalValue(parseValue(value));
    }
  }, [value, isChanging]);

  // Throttled change handler
  const handleChange = useCallback((newValue: ColorWithAlpha) => {
    const now = Date.now();

    // Update local state immediately
    setLocalValue(newValue);
    setIsChanging(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Throttle external updates
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    if (timeSinceLastUpdate >= throttleMs) {
      onChange(newValue);
      lastUpdateRef.current = now;
      setIsChanging(false);
    } else {
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
        lastUpdateRef.current = Date.now();
        setIsChanging(false);
      }, throttleMs - timeSinceLastUpdate);
    }
  }, [onChange, throttleMs]);

  // Handle HEX color change
  const handleHexChange = (newHex: string) => {
    const newValue = {
      hex: newHex,
      alpha: localValue.alpha,
      rgba: hexToRgba(newHex, localValue.alpha)
    };
    handleChange(newValue);
  };

  // Handle Alpha change
  const handleAlphaChange = (newAlpha: number) => {
    const newValue = {
      hex: localValue.hex,
      alpha: newAlpha,
      rgba: hexToRgba(localValue.hex, newAlpha)
    };
    handleChange(newValue);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const displayHex = extractHexFromValue(localValue.hex);
  const alphaPercentage = Math.round(localValue.alpha * 100);

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        {label}
      </h4>

      {/* HEX Color Picker */}
      <Box className="layera-margin-bottom--sm">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Χρώμα
        </Text>
        <input
          type="color"
          value={displayHex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="layera-input layera-width--full"
          style={{
            cursor: 'pointer',
            height: '40px',
            transition: 'all 0.1s ease',
            opacity: isChanging ? 0.8 : 1
          }}
        />
      </Box>

      {/* Alpha Slider */}
      <Box className="layera-margin-bottom--sm">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Διαφάνεια: {alphaPercentage}%
        </Text>
        <input
          type="range"
          min="0"
          max="100"
          value={alphaPercentage}
          onChange={(e) => handleAlphaChange(parseInt(e.target.value) / 100)}
          className="layera-input layera-width--full"
          style={{
            cursor: 'pointer',
            height: '8px',
            borderRadius: '4px',
            transition: 'all 0.1s ease',
            opacity: isChanging ? 0.8 : 1
          }}
        />
      </Box>

      {/* Live Preview */}
      <Box className="layera-margin-bottom--sm">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Προεπισκόπηση
        </Text>
        <Box
          style={{
            width: '100%',
            height: '30px',
            backgroundColor: localValue.rgba,
            borderRadius: '4px',
            border: '1px solid #e5e5e5',
            position: 'relative',
            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
          }}
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: localValue.rgba,
              borderRadius: '3px'
            }}
          />
        </Box>
      </Box>

      {/* Color Values */}
      <Box>
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-color="secondary">
          <strong>HEX:</strong> {displayHex.toUpperCase()}
        </Text>
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          <strong>RGBA:</strong> {localValue.rgba}
          {isChanging && ' (updating...)'}
        </Text>
      </Box>
    </Box>
  );
};

export type { ColorWithAlpha };