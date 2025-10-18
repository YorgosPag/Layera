import React from 'react';
import { FORM_STATES, type FormState } from '@layera/constants';
import { useLayeraTranslation } from '@layera/i18n';
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
    <div className={fieldClasses}>
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
        <div className="layera-form-field__description">
          {resolvedDescription}
        </div>
      )}

      <div className="layera-form-field__control">
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
      </div>

      {resolvedError && (
        <div
          id={errorId}
          className="layera-form-field__error"
          role="alert"
          aria-live="polite"
        >
          {resolvedError}
        </div>
      )}

      {resolvedHint && !resolvedError && (
        <div
          id={hintId}
          className="layera-form-field__hint"
        >
          {resolvedHint}
        </div>
      )}
    </div>
  );
};