import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useControlThrottle Hook
 *
 * Κοινή throttling logic για όλα τα playground controls
 * - Εξαλείφει διπλότυπο throttling code σε 12+ components
 * - Local state για immediate visual feedback
 * - Throttled external updates για performance
 * - Cleanup κατά unmount
 */

interface UseControlThrottleOptions {
  /** Initial value */
  initialValue: string;
  /** External onChange callback */
  onChange: (value: string) => void;
  /** Real-time preview callback (optional) */
  onPreview?: (value: string) => void;
  /** Throttle delay in milliseconds */
  throttleMs?: number;
}

interface UseControlThrottleReturn {
  /** Current local value */
  value: string;
  /** Whether control is currently changing */
  isChanging: boolean;
  /** Optimized change handler */
  handleChange: (newValue: string) => void;
  /** Real-time input handler για previews */
  handleInput: (newValue: string) => void;
}

export const useControlThrottle = ({
  initialValue,
  onChange,
  onPreview,
  throttleMs = 16
}: UseControlThrottleOptions): UseControlThrottleReturn => {
  const [localValue, setLocalValue] = useState(initialValue);
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Sync local value με external value όταν δεν κάνουμε changes
  useEffect(() => {
    if (!isChanging) {
      setLocalValue(initialValue);
    }
  }, [initialValue, isChanging]);

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

  // Real-time input handler για immediate preview κατά το dragging
  const handleInput = useCallback((newValue: string) => {
    // Update local state immediately
    setLocalValue(newValue);

    // Call preview immediately χωρίς throttling
    if (onPreview) {
      onPreview(newValue);
    }
  }, [onPreview]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    value: localValue,
    isChanging,
    handleChange,
    handleInput
  };
};