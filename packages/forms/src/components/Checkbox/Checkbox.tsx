import React, { forwardRef } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  type FormSize,
  type FormState
} from '@layera/constants';
import { Box } from '@layera/layout';
import './Checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the checkbox */
  size?: FormSize;
  /** Visual state of the checkbox */
  state?: FormState;
  /** Label text for the checkbox */
  label?: string;
  /** Helper text displayed below the checkbox */
  description?: string;
  /** Error message displayed when state is error */
  error?: string;
  /** Whether checkbox is in indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Whether the checkbox takes full width of container */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom icon when checked (overrides default check icon) */
  checkedIcon?: React.ReactNode;
  /** Custom icon when indeterminate (overrides default minus icon) */
  indeterminateIcon?: React.ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  size = FORM_SIZES.MEDIUM,
  state = FORM_STATES.DEFAULT,
  label,
  description,
  error,
  indeterminate = false,
  fullWidth = false,
  loading = false,
  checkedIcon,
  indeterminateIcon,
  checked,
  className = '',
  disabled,
  id,
  ...props
}, ref) => {
  // Translation function - could be integrated with @layera/tolgee when ready
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'forms.required': 'Required',
      'forms.optional': 'Optional'
    };
    return translations[key] || key;
  };

  // Generate unique ID if not provided
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // Determine the actual state based on error prop
  const actualState = error ? FORM_STATES.ERROR : state;

  // Create class names
  const wrapperClasses = [
    'layera-checkbox',
    `layera-checkbox--${size}`,
    `layera-checkbox--${actualState}`,
    fullWidth && 'layera-checkbox--full-width',
    disabled && 'layera-checkbox--disabled',
    loading && 'layera-checkbox--loading',
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'layera-checkbox__input',
    indeterminate && 'layera-checkbox__input--indeterminate'
  ].filter(Boolean).join(' ');

  const boxClasses = [
    'layera-checkbox__box',
    `layera-checkbox__box--${size}`,
    `layera-checkbox__box--${actualState}`,
    checked && 'layera-checkbox__box--checked',
    indeterminate && 'layera-checkbox__box--indeterminate',
    disabled && 'layera-checkbox__box--disabled'
  ].filter(Boolean).join(' ');

  // Handle indeterminate state
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Combine refs
  const combinedRef = React.useCallback((node: HTMLInputElement) => {
    inputRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  // Render icon based on state
  const renderIcon = (): void => {
    if (loading) {
      return <Box className="layera-checkbox__spinner" />;
    }

    if (indeterminate) {
      return indeterminateIcon || <Box className="layera-checkbox__minus" />;
    }

    if (checked) {
      return checkedIcon || (
        <svg className="layera-checkbox__check" viewBox="0 0 24 24" fill="none">
          <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }

    return null;
  };

  return (
    <Box className={wrapperClasses}>
      <Box className="layera-checkbox__control">
        <input
          ref={combinedRef}
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled || loading}
          className={inputClasses}
          {...props}
        />
        <Box className={boxClasses}>
          {renderIcon()}
        </Box>
      </Box>

      {(label || description || error) && (
        <Box className="layera-checkbox__content">
          {label && (
            <label
              htmlFor={checkboxId}
              className="layera-checkbox__label"
            >
              {label}
              {props.required && (
                <span
                  className="layera-checkbox__required"
                  aria-label={t('forms.required')}
                >
                  *
                </span>
              )}
            </label>
          )}

          {description && !error && (
            <Box className="layera-checkbox__description">
              {description}
            </Box>
          )}

          {error && (
            <Box
              className="layera-checkbox__error"
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

Checkbox.displayName = 'Checkbox';