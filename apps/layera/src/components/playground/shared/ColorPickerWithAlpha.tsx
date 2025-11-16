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
  throttleMs?: number; // Currently unused but kept for future use
}

export const ColorPickerWithAlpha: React.FC<ColorPickerWithAlphaProps> = ({
  label,
  value,
  onChange,
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

  const displayHex = extractHexFromValue(internalValue?.hex || '#ffffff');
  const alphaPercentage = Math.round((internalValue?.alpha ?? 1.0) * 100);

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
            height: 'var(--layera-global-spacing-10)',
            transition: 'var(--layera-iconInteractive-interactive-transition-fast)'
          }}
        />
      </Box>

      {/* Alpha Slider */}
      <Box className="layera-margin-bottom--sm">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Διαφάνεια: {alphaPercentage}%
        </Text>
        <Box className="layera-position--relative">
          {/* Checkerboard background για transparency preview */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '20px',
              borderRadius: '10px',
              backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          />

          {/* Alpha gradient overlay */}
          <Box
            style={{
              position: 'absolute',
              top: 1,
              left: 1,
              right: 1,
              bottom: 1,
              height: 'var(--layera-iconInteractive-sizing-padding-xl)',
              borderRadius: 'var(--layera-iconInteractive-sizing-padding-md)',
              background: `linear-gradient(to right,
                rgba(${parseInt(displayHex.slice(1, 3), 16)}, ${parseInt(displayHex.slice(3, 5), 16)}, ${parseInt(displayHex.slice(5, 7), 16)}, 0) 0%,
                rgba(${parseInt(displayHex.slice(1, 3), 16)}, ${parseInt(displayHex.slice(3, 5), 16)}, ${parseInt(displayHex.slice(5, 7), 16)}, 1) 100%)`
            }}
          />

          {/* Range input */}
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={alphaPercentage}
            onChange={handleAlphaChange}
            className="layera-width--full alpha-slider"
            style={{
              position: 'relative',
              cursor: 'grab',
              height: 'var(--layera-iconInteractive-sizing-padding-xl)',
              width: '100%',
              borderRadius: 'var(--layera-iconInteractive-sizing-padding-md)',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: 'transparent',
              outline: 'none',
              zIndex: 10,
              margin: 'var(--layera-global-reset-margin)',
              padding: 'var(--layera-global-reset-padding)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.cursor = 'grabbing';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.cursor = 'grab';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.cursor = 'grab';
            }}
          />

          {/* Enhanced CSS για perfect range slider alignment */}
          <style>{`
            .alpha-slider {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              box-sizing: border-box !important;
            }

            /* WebKit browsers (Chrome, Safari) */
            .alpha-slider::-webkit-slider-thumb {
              appearance: none;
              -webkit-appearance: none;
              width: var(--layera-icon-leaflet-medium);
              height: var(--layera-icon-leaflet-medium);
              background: #fff;
              border: var(--layera-icon-interactive-accessibility-focus-ring-width) solid var(--layera-icon-interactive-accessibility-focus-ring-color);
              border-radius: 50%;
              cursor: grab;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              margin-top: -8px; /* Centers 16px thumb on 4px track */
              position: relative;
            }

            .alpha-slider::-webkit-slider-thumb:hover {
              background: #f8f9fa;
              border-color: #0056b3;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            }

            .alpha-slider::-webkit-slider-thumb:active {
              cursor: grabbing;
              transform: scale(1.1);
            }

            /* Firefox */
            .alpha-slider::-moz-range-thumb {
              width: var(--layera-icon-leaflet-medium);
              height: var(--layera-icon-leaflet-medium);
              background: #fff;
              border: var(--layera-icon-interactive-accessibility-focus-ring-width) solid var(--layera-icon-interactive-accessibility-focus-ring-color);
              border-radius: 50%;
              cursor: grab;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              appearance: none;
              -moz-appearance: none;
              margin: 0;
              border-radius: 50%;
            }

            .alpha-slider::-moz-range-thumb:hover {
              background: #f8f9fa;
              border-color: #0056b3;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            }

            .alpha-slider::-moz-range-thumb:active {
              cursor: grabbing;
              transform: scale(1.1);
            }

            /* WebKit track styling */
            .alpha-slider::-webkit-slider-track {
              width: 100%;
              height: 4px; /* Much thinner track */
              background: transparent;
              border-radius: 2px;
              outline: none;
              border: none;
            }

            /* Firefox track styling */
            .alpha-slider::-moz-range-track {
              width: 100%;
              height: 4px; /* Much thinner track */
              background: transparent;
              border-radius: 2px;
              border: none;
              outline: none;
            }

            /* Remove default range styling completely */
            .alpha-slider::-webkit-slider-runnable-track {
              height: 4px;
              background: transparent;
              border: none;
              border-radius: 2px;
            }

            .alpha-slider::-moz-range-progress {
              background: transparent;
              height: 4px;
            }
          `}</style>
        </Box>
      </Box>

      {/* Live Preview */}
      <Box className="layera-margin-bottom--sm">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="sm" data-weight="medium" data-color="secondary">
          Προεπισκόπηση
        </Text>
        <Box
          style={{
            width: '100%',
            height: 'var(--layera-global-spacing-8)',
            borderRadius: 'var(--layera-iconInteractive-sizing-padding-sm)',
            border: '1px solid var(--layera-la-color-border-light)',
            position: 'relative',
            backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
          }}
        >
          <Box
            className="layera-position--absolute layera-position--inset-0"
            style={{
              backgroundColor: internalValue?.rgba || `rgba(255, 255, 255, ${(internalValue?.alpha ?? 1.0)})`,
              borderRadius: 'var(--layera-iconInteractive-sizing-padding-xs)'
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
          <strong>RGBA:</strong> {internalValue?.rgba || `rgba(255, 255, 255, ${(internalValue?.alpha ?? 1.0)})`}
        </Text>
      </Box>
    </Box>
  );
};

export type { ColorWithAlpha };