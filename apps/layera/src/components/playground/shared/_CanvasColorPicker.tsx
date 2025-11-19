import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { COLOR_PICKER_DIMENSIONS } from '../../../constants/ui-measurement';
import type { ColorWithAlpha } from '../../../hooks/useColorState';
import { hexToRgba } from '../../../utils/colors';

/**
 * CanvasColorPicker Component
 *
 * Custom HTML5 Canvas Color Picker με real-time preview
 * - Τηρεί τους ARXES κανόνες (χωρίς νέες dependencies)
 * - Χρήση μόνο @layera/* components
 * - Real-time onMouseMove events για live preview
 * - HTML5 Canvas για color palette
 */

// ColorWithAlpha interface removed - now using unified interface from useColorState

interface CanvasColorPickerProps {
  label: string;
  value: ColorWithAlpha | string;
  onChange: (value: ColorWithAlpha) => void;
  onPreview?: (value: ColorWithAlpha) => void;
  className?: string;
}

export const CanvasColorPicker: React.FC<CanvasColorPickerProps> = ({
  label,
  value,
  onChange,
  onPreview,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentColor, setCurrentColor] = useState<ColorWithAlpha>(() => {
    if (typeof value === 'string') {
      const hex = value.startsWith('#') ? value : 'var(--layera-colors-status-info)';
      return {
        hex,
        alpha: 1.0,
        rgba: `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 1.0)`
      };
    }
    return value;
  });

  // Helper function: RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  };

  // hexToRgba function moved to centralized utils

  // Draw color palette στο canvas
  const drawColorPalette = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Hue gradient (horizontal)
    for (let x = 0; x < width; x++) {
      const hue = (x / width) * 360;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `hsl(${hue}, var(--layera-colorUtilities-saturation-full), var(--layera-colorUtilities-lightness-medium))`);
      gradient.addColorStop(0.5, `hsl(${hue}, var(--layera-colorUtilities-saturation-full), var(--layera-colorUtilities-lightness-dark))`);
      gradient.addColorStop(1, `hsl(${hue}, var(--layera-colorUtilities-saturation-none), var(--layera-colorUtilities-lightness-none))`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, 0, 1, height);
    }
  }, []);

  // Handle mouse events για real-time preview
  const handleMouseEvent = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Clamp coordinates
    const clampedX = Math.max(0, Math.min(x, canvas.width - 1));
    const clampedY = Math.max(0, Math.min(y, canvas.height - 1));

    // Get pixel color
    const imageData = ctx.getImageData(clampedX, clampedY, 1, 1);
    const [r, g, b] = imageData.data;

    const newHex = rgbToHex(r, g, b);
    const newColor: ColorWithAlpha = {
      hex: newHex,
      alpha: currentColor.alpha,
      rgba: hexToRgba(newHex, currentColor.alpha)
    };

    setCurrentColor(newColor);

    // Real-time preview όταν κινείται ο κέρσορας
    if (onPreview) {
      onPreview(newColor);
    }
  }, [currentColor.alpha, onPreview]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(true);
    handleMouseEvent(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMouseDown || true) { // Always trigger για καλύτερο UX
      handleMouseEvent(event);
    }
  };

  const handleMouseUp = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      // Commit την αλλαγή όταν σταματάς το drag
      onChange(currentColor);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    // ΔΕΝ καθαρίζουμε το preview - διατηρούμε το χρώμα
  };

  // Initialize canvas
  useEffect(() => {
    drawColorPalette();
  }, [drawColorPalette]);

  // Sync with external value
  useEffect(() => {
    if (typeof value === 'string') {
      const hex = value.startsWith('#') ? value : 'var(--layera-colors-status-info)';
      const newColor = {
        hex,
        alpha: currentColor.alpha,
        rgba: hexToRgba(hex, currentColor.alpha)
      };
      setCurrentColor(newColor);
    } else {
      setCurrentColor(value);
    }
  }, [value]); // Αφαιρέθηκε currentColor.alpha για να αποφύγουμε infinite loops

  const alphaPercentage = Math.round(currentColor.alpha * 100);

  return (
    <Box className={`layera-card layera-padding--md ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--sm" data-size="base" data-weight="bold" data-color="primary">
        {label}
      </h4>

      {/* Canvas Color Picker */}
      <Box className="layera-margin-bottom--xs">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
          Χρώμα (Real-time Canvas)
        </Text>
        <canvas
          ref={canvasRef}
          width={COLOR_PICKER_DIMENSIONS.STANDARD_WIDTH}
          height={COLOR_PICKER_DIMENSIONS.CANVAS_HEIGHT}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="layera-border--default layera-cursor--crosshair layera-border-radius--md layera-canvas--250x100"
        />
      </Box>

      {/* Alpha Slider */}
      <Box className="layera-margin-bottom--xs">
        <Text className="layera-typography layera-margin-bottom--xs" data-size="xs" data-weight="medium" data-color="secondary">
          Διαφάνεια: {alphaPercentage}%
        </Text>

        {/* Alpha Preview Box */}
        <Box className="layera-margin-bottom--xs layera-flex layera-flex--justify-center">
          <Box
            className="layera-border--default layera-border-radius--md layera-alpha-preview"
          >
            <Box
              className="layera-position--absolute layera-position-top--0 layera-position-left--0 layera-width--full layera-height--full layera-border-radius--md layera-dynamic-bg"
              data-dynamic-bg={currentColor.rgba}
            />
          </Box>
        </Box>

        {/* Alpha Slider */}
        <Box className="layera-flex layera-flex--justify-center">
          <Box
            as="input"
            type="range"
            min="0"
            max="100"
            step="1"
            value={alphaPercentage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newAlpha = parseFloat(e.target.value) / 100;
              const newColor = {
                ...currentColor,
                alpha: newAlpha,
                rgba: hexToRgba(currentColor.hex, newAlpha)
              };
              setCurrentColor(newColor);
              onChange(newColor);
              if (onPreview) {
                onPreview(newColor);
              }
            }}
            className="layera-input layera-width--250"
          />
        </Box>
      </Box>

      {/* Compact Values */}
      <Box>
        <Text className="layera-typography" data-size="xs" data-color="secondary">
          {currentColor.hex.toUpperCase()} · α{alphaPercentage}%
        </Text>
      </Box>
    </Box>
  );
};

export type { ColorWithAlpha };