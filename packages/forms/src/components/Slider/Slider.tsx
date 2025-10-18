import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import './Slider.css';

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Size of the slider */
  size?: FormSize;
  /** Visual state of the slider */
  state?: FormState;
  /** Current value (for single slider) */
  value?: number;
  /** Current values (for range slider) */
  values?: [number, number];
  /** Change handler for single value */
  onChange?: (value: number) => void;
  /** Change handler for range values */
  onRangeChange?: (values: [number, number]) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Label text for the slider */
  label?: string;
  /** Helper text displayed below the slider */
  description?: string;
  /** Error message displayed when state is error */
  error?: string;
  /** Whether the slider takes full width of container */
  fullWidth?: boolean;
  /** Whether this is a range slider */
  range?: boolean;
  /** Whether to show current value */
  showValue?: boolean;
  /** Whether to show tooltip on hover/drag */
  showTooltip?: boolean;
  /** Format function for value display */
  formatValue?: (value: number) => string;
  /** Visual variant */
  variant?: 'default' | 'gradient' | 'stepped';
  /** Orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** Marks to display on the slider */
  marks?: SliderMark[] | boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Whether to reverse the direction */
  reverse?: boolean;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  size = FORM_SIZES.MEDIUM,
  state = FORM_STATES.DEFAULT,
  value,
  values,
  onChange,
  onRangeChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  description,
  error,
  fullWidth = false,
  range = false,
  showValue = false,
  showTooltip = false,
  formatValue,
  variant = 'default',
  orientation = 'horizontal',
  marks = false,
  disabled = false,
  loading = false,
  reverse = false,
  className = '',
  id,
  ...props
}, ref) => {
  // Translation function - could be integrated with @layera/i18n when ready
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'forms.required': 'Required',
      'slider.value': 'Value'
    };
    return translations[key] || key;
  };

  // Generate unique ID if not provided
  const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;

  // Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<number | null>(null); // 0 for first thumb, 1 for second
  const [showTooltips, setShowTooltips] = useState<boolean[]>([false, false]);

  // Determine the actual state based on error prop
  const actualState = error ? FORM_STATES.ERROR : state;

  // Get current values
  const currentValues = range && values ? values : [value || min, max];
  const minValue = currentValues[0];
  const maxValue = range ? currentValues[1] : currentValues[0];

  // Value formatting
  const formatDisplayValue = useCallback((val: number): string => {
    if (formatValue) {
      return formatValue(val);
    }
    return val.toString();
  }, [formatValue]);

  // Convert pixel position to value
  const getValueFromPosition = useCallback((clientX: number, clientY: number): number => {
    if (!trackRef.current) return min;

    const rect = trackRef.current.getBoundingClientRect();
    let percentage;

    if (orientation === 'horizontal') {
      const x = clientX - rect.left;
      percentage = reverse ? 1 - (x / rect.width) : x / rect.width;
    } else {
      const y = clientY - rect.top;
      percentage = reverse ? y / rect.height : 1 - (y / rect.height);
    }

    percentage = Math.max(0, Math.min(1, percentage));
    const rawValue = min + percentage * (max - min);

    // Snap to step
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max, step, orientation, reverse]);

  // Get percentage from value
  const getPercentageFromValue = useCallback((val: number): number => {
    const percentage = (val - min) / (max - min);
    return reverse ? 100 - (percentage * 100) : percentage * 100;
  }, [min, max, reverse]);

  // Handle mouse/touch start
  const handlePointerStart = useCallback((event: React.PointerEvent, thumbIndex: number) => {
    if (disabled || loading) return;

    event.preventDefault();
    setIsDragging(thumbIndex);

    if (showTooltip) {
      const newTooltips = [false, false];
      newTooltips[thumbIndex] = true;
      setShowTooltips(newTooltips);
    }

    // Capture pointer to handle movement outside element
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }, [disabled, loading, showTooltip]);

  // Handle pointer move
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (isDragging === null || disabled || loading) return;

    event.preventDefault();
    const newValue = getValueFromPosition(event.clientX, event.clientY);

    if (range && values && onRangeChange) {
      const newValues: [number, number] = [...values];

      if (isDragging === 0) {
        // Moving min thumb
        newValues[0] = Math.min(newValue, values[1]);
      } else {
        // Moving max thumb
        newValues[1] = Math.max(newValue, values[0]);
      }

      onRangeChange(newValues);
    } else if (!range && onChange) {
      onChange(newValue);
    }
  }, [isDragging, disabled, loading, getValueFromPosition, range, values, onRangeChange, onChange]);

  // Handle pointer end
  const handlePointerEnd = useCallback((event: React.PointerEvent) => {
    if (isDragging === null) return;

    setIsDragging(null);
    setShowTooltips([false, false]);
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
  }, [isDragging]);

  // Handle track click
  const handleTrackClick = useCallback((event: React.MouseEvent) => {
    if (disabled || loading || isDragging !== null) return;

    const newValue = getValueFromPosition(event.clientX, event.clientY);

    if (range && values && onRangeChange) {
      // Find closest thumb and move it
      const distanceToMin = Math.abs(newValue - values[0]);
      const distanceToMax = Math.abs(newValue - values[1]);

      const newValues: [number, number] = [...values];
      if (distanceToMin <= distanceToMax) {
        newValues[0] = Math.min(newValue, values[1]);
      } else {
        newValues[1] = Math.max(newValue, values[0]);
      }

      onRangeChange(newValues);
    } else if (!range && onChange) {
      onChange(newValue);
    }
  }, [disabled, loading, isDragging, getValueFromPosition, range, values, onRangeChange, onChange]);

  // Generate marks
  const generateMarks = useCallback((): SliderMark[] => {
    if (!marks) return [];

    if (Array.isArray(marks)) {
      return marks;
    }

    // Auto-generate marks
    const markValues: SliderMark[] = [];
    const numMarks = Math.min(11, Math.floor((max - min) / step) + 1); // Limit to reasonable number
    const markStep = (max - min) / (numMarks - 1);

    for (let i = 0; i < numMarks; i++) {
      const markValue = min + (i * markStep);
      markValues.push({ value: markValue });
    }

    return markValues;
  }, [marks, min, max, step]);

  const sliderMarks = generateMarks();

  // Create class names
  const wrapperClasses = [
    'layera-slider',
    `layera-slider--${size}`,
    `layera-slider--${actualState}`,
    `layera-slider--${variant}`,
    `layera-slider--${orientation}`,
    fullWidth && 'layera-slider--full-width',
    range && 'layera-slider--range',
    disabled && 'layera-slider--disabled',
    loading && 'layera-slider--loading',
    reverse && 'layera-slider--reverse',
    className
  ].filter(Boolean).join(' ');

  const trackClasses = [
    'layera-slider__track',
    isDragging !== null && 'layera-slider__track--dragging'
  ].filter(Boolean).join(' ');

  // Calculate track fill style
  const getTrackFillStyle = (): React.CSSProperties => {
    const minPercent = getPercentageFromValue(minValue);
    const maxPercent = getPercentageFromValue(maxValue);

    if (orientation === 'horizontal') {
      if (range) {
        return {
          left: `${Math.min(minPercent, maxPercent)}%`,
          width: `${Math.abs(maxPercent - minPercent)}%`
        };
      } else {
        return {
          left: reverse ? `${maxPercent}%` : '0%',
          width: `${reverse ? 100 - maxPercent : maxPercent}%`
        };
      }
    } else {
      if (range) {
        const bottomPercent = Math.min(minPercent, maxPercent);
        const topPercent = Math.max(minPercent, maxPercent);
        return {
          bottom: `${bottomPercent}%`,
          height: `${topPercent - bottomPercent}%`
        };
      } else {
        return {
          bottom: reverse ? `${100 - maxPercent}%` : '0%',
          height: `${reverse ? 100 - maxPercent : maxPercent}%`
        };
      }
    }
  };

  // Calculate thumb position
  const getThumbStyle = (val: number): React.CSSProperties => {
    const percent = getPercentageFromValue(val);

    if (orientation === 'horizontal') {
      return { left: `${percent}%` };
    } else {
      return { bottom: `${percent}%` };
    }
  };

  return (
    <div className={wrapperClasses} {...props} ref={ref}>
      {label && (
        <label htmlFor={sliderId} className="layera-slider__label">
          {label}
          {props.required && (
            <span
              className="layera-slider__required"
              aria-label={t('forms.required')}
            >
              *
            </span>
          )}
        </label>
      )}

      <div className="layera-slider__container">
        {showValue && (
          <div className="layera-slider__values">
            {range ? (
              <>
                <span className="layera-slider__value">
                  {formatDisplayValue(minValue)}
                </span>
                <span className="layera-slider__value-separator">-</span>
                <span className="layera-slider__value">
                  {formatDisplayValue(maxValue)}
                </span>
              </>
            ) : (
              <span className="layera-slider__value">
                {formatDisplayValue(maxValue)}
              </span>
            )}
          </div>
        )}

        <div className="layera-slider__track-container">
          {/* Marks */}
          {sliderMarks.length > 0 && (
            <div className="layera-slider__marks">
              {sliderMarks.map((mark, index) => (
                <div
                  key={index}
                  className="layera-slider__mark"
                  style={getThumbStyle(mark.value)}
                >
                  <div className="layera-slider__mark-dot" />
                  {mark.label && (
                    <div className="layera-slider__mark-label">
                      {mark.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Track */}
          <div
            ref={trackRef}
            className={trackClasses}
            onClick={handleTrackClick}
          >
            <div className="layera-slider__track-background" />
            <div
              className="layera-slider__track-fill"
              style={getTrackFillStyle()}
            />

            {/* Single thumb */}
            {!range && (
              <div
                className="layera-slider__thumb"
                style={getThumbStyle(maxValue)}
                onPointerDown={(e) => handlePointerStart(e, 0)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={maxValue}
                aria-valuetext={formatDisplayValue(maxValue)}
                tabIndex={disabled ? -1 : 0}
              >
                {(showTooltip && showTooltips[0]) && (
                  <div className="layera-slider__tooltip">
                    {formatDisplayValue(maxValue)}
                  </div>
                )}
              </div>
            )}

            {/* Range thumbs */}
            {range && (
              <>
                <div
                  className="layera-slider__thumb layera-slider__thumb--min"
                  style={getThumbStyle(minValue)}
                  onPointerDown={(e) => handlePointerStart(e, 0)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  role="slider"
                  aria-valuemin={min}
                  aria-valuemax={maxValue}
                  aria-valuenow={minValue}
                  aria-valuetext={formatDisplayValue(minValue)}
                  tabIndex={disabled ? -1 : 0}
                >
                  {(showTooltip && showTooltips[0]) && (
                    <div className="layera-slider__tooltip">
                      {formatDisplayValue(minValue)}
                    </div>
                  )}
                </div>
                <div
                  className="layera-slider__thumb layera-slider__thumb--max"
                  style={getThumbStyle(maxValue)}
                  onPointerDown={(e) => handlePointerStart(e, 1)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  role="slider"
                  aria-valuemin={minValue}
                  aria-valuemax={max}
                  aria-valuenow={maxValue}
                  aria-valuetext={formatDisplayValue(maxValue)}
                  tabIndex={disabled ? -1 : 0}
                >
                  {(showTooltip && showTooltips[1]) && (
                    <div className="layera-slider__tooltip">
                      {formatDisplayValue(maxValue)}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {loading && (
          <div className="layera-slider__loading">
            <div className="layera-slider__spinner" />
          </div>
        )}
      </div>

      {(description || error) && (
        <div className="layera-slider__footer">
          {description && !error && (
            <div className="layera-slider__description">
              {description}
            </div>
          )}

          {error && (
            <div
              className="layera-slider__error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';