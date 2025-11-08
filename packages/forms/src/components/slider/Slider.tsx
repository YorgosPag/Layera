import React, { forwardRef } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import { Box } from '@layera/layout';
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

const SliderComponent = (props: SliderProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    size = FORM_SIZES.MEDIUM,
    state = FORM_STATES.DEFAULT,
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    label,
    description,
    error,
    disabled = false,
    className = '',
    ...restProps
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    props.onChange?.(newValue);
  };

  const formatDisplayValue = (val: number) => {
    return props.formatValue ? props.formatValue(val) : val.toString();
  };

  const sliderClasses = [
    'layera-slider',
    `layera-slider--${size}`,
    `layera-slider--${state}`,
    disabled && 'layera-slider--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={sliderClasses} {...restProps} ref={ref}>
      {label && (
        <Box className="layera-slider__label-container">
          <label className="layera-slider__label">
            {label}
            {restProps.required && (
              <span className="layera-slider__required">*</span>
            )}
          </label>
          {props.showValue && (
            <Box className="layera-slider__value-display">
              {formatDisplayValue(value)}
            </Box>
          )}
        </Box>
      )}

      <Box className="layera-slider__track-container">
        <input
          type="range"
          className="layera-slider__input"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          disabled={disabled}
        />
      </Box>

      {(description || error) && (
        <Box className="layera-slider__footer">
          {description && !error && (
            <Box className="layera-slider__description">
              {description}
            </Box>
          )}
          {error && (
            <Box className="layera-slider__error" role="alert">
              {error}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export const Slider = forwardRef<HTMLDivElement, SliderProps>(SliderComponent);
Slider.displayName = 'Slider';

export default Slider;