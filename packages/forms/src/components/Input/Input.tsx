import React, { forwardRef } from 'react';
import {
  FORM_TYPES,
  FORM_SIZES,
  FORM_STATES,
  INPUT_VARIANTS,
  AUTOCOMPLETE_VALUES,
  type FormType,
  type FormSize,
  type FormState,
  type InputVariant,
  type AutocompleteValue
} from '@layera/constants';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: FormType;
  size?: FormSize;
  variant?: InputVariant;
  state?: FormState;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  autoComplete?: AutocompleteValue;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = FORM_TYPES.TEXT,
  size = FORM_SIZES.MEDIUM,
  variant = INPUT_VARIANTS.DEFAULT,
  state = FORM_STATES.DEFAULT,
  startIcon,
  endIcon,
  loading = false,
  autoComplete = AUTOCOMPLETE_VALUES.OFF,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const inputClasses = [
    'layera-input',
    `layera-input--${size}`,
    `layera-input--${variant}`,
    `layera-input--${state}`,
    startIcon && 'layera-input--has-start-icon',
    endIcon && 'layera-input--has-end-icon',
    loading && 'layera-input--loading',
    fullWidth && 'layera-input--full-width',
    disabled && 'layera-input--disabled',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'layera-input-wrapper',
    `layera-input-wrapper--${size}`,
    `layera-input-wrapper--${variant}`,
    `layera-input-wrapper--${state}`,
    fullWidth && 'layera-input-wrapper--full-width',
    disabled && 'layera-input-wrapper--disabled'
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {startIcon && (
        <div className="layera-input__start-icon">
          {startIcon}
        </div>
      )}

      <input
        ref={ref}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled || loading}
        className={inputClasses}
        {...props}
      />

      {loading && (
        <div className="layera-input__loading">
          <div className="layera-input__spinner" />
        </div>
      )}

      {endIcon && !loading && (
        <div className="layera-input__end-icon">
          {endIcon}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';