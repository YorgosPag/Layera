import React, { useCallback } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { useControlThrottle } from '../../../hooks/useControlThrottle';

/**
 * OptimizedColorPicker Component
 *
 * Optimized color picker με throttling για smooth performance
 * - Throttles onChange events για λιγότερα state updates
 * - Local state για immediate visual feedback
 * - Batch updates για καλύτερη performance
 * - Compatible με όλα τα browsers
 */

interface OptimizedColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPreview?: (value: string) => void; // Real-time preview για dragging
  className?: string;
  throttleMs?: number;
}

export const OptimizedColorPicker: React.FC<OptimizedColorPickerProps> = ({
  label,
  value,
  onChange,
  onPreview,
  className = '',
  throttleMs = 16
}) => {
  const { value: localValue, isChanging, handleChange, handleInput } = useControlThrottle({
    initialValue: value,
    onChange,
    onPreview,
    throttleMs
  });

  // Real-time input handler για immediate preview κατά το dragging
  const handleInputEvent = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    handleInput(newValue);
  }, [handleInput]);

  // Helper function για εξαγωγή hex χρώματος
  const extractHexFromValue = (colorValue: string): string => {
    if (!colorValue) return 'var(--layera-colors-surface-light)';
    if (colorValue.startsWith('#')) return colorValue;

    // Αν είναι CSS variable, εξάγει το fallback hex value
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : 'var(--layera-colors-surface-light)';
  };

  const displayValue = extractHexFromValue(localValue);

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        {label}
      </h4>
      <Box
        as="input"
        type="color"
        value={displayValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
        onInput={handleInputEvent}
        className={`layera-input layera-width--full layera-margin-bottom--sm layera-cursor--pointer layera-transition--fast ${isChanging ? 'layera-opacity--80' : 'layera-opacity--100'}`}
      />
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        {displayValue.toUpperCase()}
        {isChanging && ' (updating...)'}
      </Text>
    </Box>
  );
};