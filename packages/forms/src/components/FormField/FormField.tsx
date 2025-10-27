import React from 'react';
import { FORM_STATES, type FormState } from '@layera/constants';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import './FormField.css';

export interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  labelKey?: string;
  description?: string;
  descriptionKey?: string;
  error?: string;
  errorKey?: string;
  hint?: string;
  hintKey?: string;
  required?: boolean;
  disabled?: boolean;
  state?: FormState;
  className?: string;
  id?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  labelKey,
  description,
  descriptionKey,
  error,
  errorKey,
  hint,
  hintKey,
  required = false,
  disabled = false,
  state = FORM_STATES.DEFAULT,
  className = '',
  id
}) => {
  const { t } = useLayeraTranslation();

  const fieldId = id || React.useId();
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  const resolvedLabel = labelKey ? t(labelKey) : label;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const resolvedError = errorKey ? t(errorKey) : error;
  const resolvedHint = hintKey ? t(hintKey) : hint;

  const fieldState = error || errorKey ? FORM_STATES.ERROR : state;

  const fieldClasses = [
    'layera-form-field',
    `layera-form-field--${fieldState}`,
    disabled && 'layera-form-field--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <Box className={fieldClasses}>
      {resolvedLabel && (
        <label
          htmlFor={fieldId}
          className="layera-form-field__label"
        >
          {resolvedLabel}
          {required && (
            <span className="layera-form-field__required" aria-label={t('forms.validation.required')}>
              *
            </span>
          )}
        </label>
      )}

      {resolvedDescription && (
        <Box className="layera-form-field__description">
          {resolvedDescription}
        </Box>
      )}

      <Box className="layera-form-field__control">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement, {
              id: fieldId,
              'aria-describedby': [
                resolvedError ? errorId : '',
                resolvedHint ? hintId : ''
              ].filter(Boolean).join(' ') || undefined,
              'aria-invalid': fieldState === FORM_STATES.ERROR ? 'true' : undefined,
              disabled
            })
          : children
        }
      </Box>

      {resolvedError && (
        <Box
          id={errorId}
          className="layera-form-field__error"
          role="alert"
          aria-live="polite"
        >
          {resolvedError}
        </Box>
      )}

      {resolvedHint && !resolvedError && (
        <Box
          id={hintId}
          className="layera-form-field__hint"
        >
          {resolvedHint}
        </Box>
      )}
    </Box>
  );
};