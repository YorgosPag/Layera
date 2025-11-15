import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

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
  className?: string;
  throttleMs?: number;
  disableThrottle?: boolean;
}

export const OptimizedColorPicker: React.FC<OptimizedColorPickerProps> = ({
  label,
  value,
  onChange,
  className = '',
  throttleMs = 50 // 20 updates per second max
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Sync local value με external value όταν δεν κάνουμε changes
  useEffect(() => {
    if (!isChanging) {
      setLocalValue(value);
    }
  }, [value, isChanging]);

  const handleChange = useCallback((newValue: string) => {
    const now = Date.now();

    // Update local state immediately για smooth UI
    setLocalValue(newValue);
    setIsChanging(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Throttle external updates
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    if (timeSinceLastUpdate >= throttleMs) {
      // Update immediately if enough time has passed
      onChange(newValue);
      lastUpdateRef.current = now;
      setIsChanging(false);
    } else {
      // Schedule delayed update
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
        lastUpdateRef.current = Date.now();
        setIsChanging(false);
      }, throttleMs - timeSinceLastUpdate);
    }
  }, [onChange, throttleMs]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Helper function για εξαγωγή hex χρώματος
  const extractHexFromValue = (colorValue: string): string => {
    if (!colorValue) return '#ffffff';
    if (colorValue.startsWith('#')) return colorValue;

    // Αν είναι CSS variable, εξάγει το fallback hex value
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : '#ffffff';
  };

  const displayValue = extractHexFromValue(localValue);

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        {label}
      </h4>
      <input
        type="color"
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        className="layera-input layera-width--full layera-margin-bottom--sm"
        style={{
          cursor: 'pointer',
          transition: 'all 0.1s ease',
          opacity: isChanging ? 0.8 : 1
        }}
      />
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        {displayValue.toUpperCase()}
        {isChanging && ' (updating...)'}
      </Text>
    </Box>
  );
};