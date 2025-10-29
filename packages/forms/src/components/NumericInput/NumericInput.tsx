import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import { Box } from '@layera/layout';
import './NumericInput.css';

export interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Size of the input */
  size?: FormSize;
  /** Visual state of the input */
  state?: FormState;
  /** Current numeric value */
  value?: number;
  /** Change handler for numeric value */
  onChange?: (value: number | undefined) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment for stepper buttons */
  step?: number;
  /** Number of decimal places to allow */
  precision?: number;
  /** Whether to show stepper buttons */
  showSteppers?: boolean;
  /** Position of stepper buttons */
  stepperPosition?: 'right' | 'inline' | 'separate';
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  description?: string;
  /** Error message displayed when state is error */
  error?: string;
  /** Whether the input takes full width of container */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Format function for display value */
  formatValue?: (value: number) => string;
  /** Parse function for input value */
  parseValue?: (value: string) => number | undefined;
  /** Prefix to display before the value */
  prefix?: string;
  /** Suffix to display after the value */
  suffix?: string;
  /** Enable mouse wheel increment/decrement */
  enableWheel?: boolean;
  /** Enable long press on steppers for rapid increment */
  enableLongPress?: boolean;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(({
  size = FORM_SIZES.MEDIUM,
  state = FORM_STATES.DEFAULT,
  value,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  showSteppers = true,
  stepperPosition = 'right',
  label,
  description,
  error,
  fullWidth = false,
  loading = false,
  formatValue,
  parseValue,
  prefix,
  suffix,
  enableWheel = true,
  enableLongPress = true,
  className = '',
  disabled,
  id,
  ...props
}, ref) => {
  // Translation function - could be integrated with @layera/tolgee when ready
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'forms.required': 'Required',
      'forms.increment': 'Increment',
      'forms.decrement': 'Decrement'
    };
    return translations[key] || key;
  };

  // Generate unique ID if not provided
  const inputId = id || `numeric-input-${Math.random().toString(36).substr(2, 9)}`;

  // Internal refs for stepper buttons
  const incrementRef = useRef<HTMLButtonElement>(null);
  const decrementRef = useRef<HTMLButtonElement>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine the actual state based on error prop
  const actualState = error ? FORM_STATES.ERROR : state;

  // Format display value
  const formatDisplayValue = useCallback((val: number | undefined): string => {
    if (val === undefined || val === null || isNaN(val)) return '';

    if (formatValue) {
      return formatValue(val);
    }

    const formatted = precision > 0 ? val.toFixed(precision) : val.toString();
    return `${prefix || ''}${formatted}${suffix || ''}`;
  }, [formatValue, precision, prefix, suffix]);

  // Parse input value
  const parseInputValue = useCallback((inputVal: string): number | undefined => {
    if (!inputVal.trim()) return undefined;

    // Remove prefix and suffix for parsing
    let cleanValue = inputVal;
    if (prefix) cleanValue = cleanValue.replace(prefix, '');
    if (suffix) cleanValue = cleanValue.replace(suffix, '');

    if (parseValue) {
      return parseValue(cleanValue);
    }

    const parsed = parseFloat(cleanValue);
    return isNaN(parsed) ? undefined : parsed;
  }, [parseValue, prefix, suffix]);

  // Validate and constrain value
  const validateValue = useCallback((val: number | undefined): number | undefined => {
    if (val === undefined) return undefined;

    let constrainedValue = val;
    if (min !== undefined && constrainedValue < min) constrainedValue = min;
    if (max !== undefined && constrainedValue > max) constrainedValue = max;

    if (precision > 0) {
      constrainedValue = parseFloat(constrainedValue.toFixed(precision));
    }

    return constrainedValue;
  }, [min, max, precision]);

  // Increment value
  const incrementValue = useCallback(() => {
    const currentValue = value || 0;
    const newValue = currentValue + step;
    const validatedValue = validateValue(newValue);
    if (validatedValue !== undefined && onChange) {
      onChange(validatedValue);
    }
  }, [value, step, validateValue, onChange]);

  // Decrement value
  const decrementValue = useCallback(() => {
    const currentValue = value || 0;
    const newValue = currentValue - step;
    const validatedValue = validateValue(newValue);
    if (validatedValue !== undefined && onChange) {
      onChange(validatedValue);
    }
  }, [value, step, validateValue, onChange]);

  // Handle input change
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedValue = parseInputValue(inputValue);
    const validatedValue = validateValue(parsedValue);

    if (onChange) {
      onChange(validatedValue);
    }
  }, [parseInputValue, validateValue, onChange]);

  // Handle mouse wheel
  const handleWheel = useCallback((event: React.WheelEvent<HTMLInputElement>) => {
    if (!enableWheel || disabled || loading) return;

    event.preventDefault();
    const delta = event.deltaY;

    if (delta < 0) {
      incrementValue();
    } else if (delta > 0) {
      decrementValue();
    }
  }, [enableWheel, disabled, loading, incrementValue, decrementValue]);

  // Long press functionality
  const startLongPress = useCallback((action: () => void) => {
    if (!enableLongPress) return;

    // Clear any existing timers
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (longPressIntervalRef.current) clearInterval(longPressIntervalRef.current);

    // Start long press after 500ms
    longPressTimerRef.current = setTimeout((): void => {
      // Repeat every 100ms while pressed
      longPressIntervalRef.current = setInterval(action, 100);
    }, 500);
  }, [enableLongPress]);

  const stopLongPress = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (longPressIntervalRef.current) {
      clearInterval(longPressIntervalRef.current);
      longPressIntervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLongPress();
    };
  }, [stopLongPress]);

  // Create class names
  const wrapperClasses = [
    'layera-numeric-input',
    `layera-numeric-input--${size}`,
    `layera-numeric-input--${actualState}`,
    `layera-numeric-input--steppers-${stepperPosition}`,
    fullWidth && 'layera-numeric-input--full-width',
    showSteppers && 'layera-numeric-input--has-steppers',
    disabled && 'layera-numeric-input--disabled',
    loading && 'layera-numeric-input--loading',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'layera-numeric-input__input',
    `layera-numeric-input__input--${size}`,
    `layera-numeric-input__input--${actualState}`
  ].filter(Boolean).join(' ');

  // Check if increment/decrement should be disabled
  const canIncrement = !disabled && !loading && (max === undefined || (value || 0) < max);
  const canDecrement = !disabled && !loading && (min === undefined || (value || 0) > min);

  return (
    <Box className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="layera-numeric-input__label">
          {label}
          {props.required && (
            <span
              className="layera-numeric-input__required"
              aria-label={t('forms.required')}
            >
              *
            </span>
          )}
        </label>
      )}

      <Box className="layera-numeric-input__control">
        {stepperPosition === 'separate' && showSteppers && (
          <button
            ref={decrementRef}
            type="button"
            className="layera-numeric-input__stepper layera-numeric-input__stepper--decrement"
            disabled={!canDecrement}
            onClick={decrementValue}
            onMouseDown={() => startLongPress(decrementValue)}
            onMouseUp={stopLongPress}
            onMouseLeave={stopLongPress}
            aria-label={t('forms.decrement')}
          >
            <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}

        <Box className="layera-numeric-input__input-wrapper">
          {prefix && (
            <span className="layera-numeric-input__prefix">{prefix}</span>
          )}

          <input
            ref={ref}
            type="text"
            id={inputId}
            value={formatDisplayValue(value)}
            onChange={handleInputChange}
            onWheel={handleWheel}
            disabled={disabled || loading}
            className={inputClasses}
            {...props}
          />

          {suffix && (
            <span className="layera-numeric-input__suffix">{suffix}</span>
          )}

          {loading && (
            <Box className="layera-numeric-input__loading">
              <Box className="layera-numeric-input__spinner" />
            </Box>
          )}

          {stepperPosition === 'inline' && showSteppers && (
            <Box className="layera-numeric-input__steppers-inline">
              <button
                type="button"
                className="layera-numeric-input__stepper layera-numeric-input__stepper--decrement"
                disabled={!canDecrement}
                onClick={decrementValue}
                onMouseDown={() => startLongPress(decrementValue)}
                onMouseUp={stopLongPress}
                onMouseLeave={stopLongPress}
                aria-label={t('forms.decrement')}
              >
                <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button
                type="button"
                className="layera-numeric-input__stepper layera-numeric-input__stepper--increment"
                disabled={!canIncrement}
                onClick={incrementValue}
                onMouseDown={() => startLongPress(incrementValue)}
                onMouseUp={stopLongPress}
                onMouseLeave={stopLongPress}
                aria-label={t('forms.increment')}
              >
                <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" />
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </Box>
          )}
        </Box>

        {stepperPosition === 'right' && showSteppers && (
          <Box className="layera-numeric-input__steppers-right">
            <button
              ref={incrementRef}
              type="button"
              className="layera-numeric-input__stepper layera-numeric-input__stepper--increment"
              disabled={!canIncrement}
              onClick={incrementValue}
              onMouseDown={() => startLongPress(incrementValue)}
              onMouseUp={stopLongPress}
              onMouseLeave={stopLongPress}
              aria-label={t('forms.increment')}
            >
              <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
                <polyline points="18,15 12,9 6,15" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              ref={decrementRef}
              type="button"
              className="layera-numeric-input__stepper layera-numeric-input__stepper--decrement"
              disabled={!canDecrement}
              onClick={decrementValue}
              onMouseDown={() => startLongPress(decrementValue)}
              onMouseUp={stopLongPress}
              onMouseLeave={stopLongPress}
              aria-label={t('forms.decrement')}
            >
              <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
                <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </Box>
        )}

        {stepperPosition === 'separate' && showSteppers && (
          <button
            ref={incrementRef}
            type="button"
            className="layera-numeric-input__stepper layera-numeric-input__stepper--increment"
            disabled={!canIncrement}
            onClick={incrementValue}
            onMouseDown={() => startLongPress(incrementValue)}
            onMouseUp={stopLongPress}
            onMouseLeave={stopLongPress}
            aria-label={t('forms.increment')}
          >
            <svg viewBox="0 0 24 24" fill="none" className="layera-numeric-input__stepper-icon">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" />
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        )}
      </Box>

      {(description || error) && (
        <Box className="layera-numeric-input__footer">
          {description && !error && (
            <Box className="layera-numeric-input__description">
              {description}
            </Box>
          )}

          {error && (
            <Box
              className="layera-numeric-input__error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
});

NumericInput.displayName = 'NumericInput';