import React, { forwardRef } from 'react';
import {
  FORM_SIZES,
  FORM_STATES,
  INPUT_VARIANTS,
  type FormSize,
  type FormState,
  type InputVariant
} from '@layera/constants';
import { Box } from '@layera/layout';
import './TextArea.css';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: FormSize;
  variant?: InputVariant;
  state?: FormState;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  minRows?: number;
  maxRows?: number;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  size = FORM_SIZES.MEDIUM,
  variant = INPUT_VARIANTS.DEFAULT,
  state = FORM_STATES.DEFAULT,
  resize = 'vertical',
  minRows = 3,
  maxRows,
  fullWidth = false,
  className = '',
  disabled,
  style,
  ...props
}, ref) => {
  const textAreaClasses = [
    'layera-textarea',
    `layera-textarea--${size}`,
    `layera-textarea--${variant}`,
    `layera-textarea--${state}`,
    `layera-textarea--resize-${resize}`,
    fullWidth && 'layera-textarea--full-width',
    disabled && 'layera-textarea--disabled',
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    'layera-textarea-wrapper',
    `layera-textarea-wrapper--${size}`,
    `layera-textarea-wrapper--${variant}`,
    `layera-textarea-wrapper--${state}`,
    fullWidth && 'layera-textarea-wrapper--full-width',
    disabled && 'layera-textarea-wrapper--disabled'
  ].filter(Boolean).join(' ');

  // Calculate min-height based on rows and line-height
  const getMinHeight = () => {
    const lineHeight = size === FORM_SIZES.SMALL ? 1.25 : size === FORM_SIZES.LARGE ? 1.5 : 1.375;
    const fontSize = size === FORM_SIZES.SMALL ? 14 : size === FORM_SIZES.LARGE ? 18 : 16;
    const padding = size === FORM_SIZES.SMALL ? 16 : size === FORM_SIZES.LARGE ? 32 : 24;

    return (minRows * fontSize * lineHeight) + padding;
  };

  const getMaxHeight = () => {
    if (!maxRows) return undefined;

    const lineHeight = size === FORM_SIZES.SMALL ? 1.25 : size === FORM_SIZES.LARGE ? 1.5 : 1.375;
    const fontSize = size === FORM_SIZES.SMALL ? 14 : size === FORM_SIZES.LARGE ? 18 : 16;
    const padding = size === FORM_SIZES.SMALL ? 16 : size === FORM_SIZES.LARGE ? 32 : 24;

    return (maxRows * fontSize * lineHeight) + padding;
  };

  const textAreaStyle = {
    minHeight: `${getMinHeight()}px`,
    maxHeight: maxRows ? `${getMaxHeight()}px` : undefined,
    ...style
  };

  return (
    <Box className={wrapperClasses}>
      <textarea
        ref={ref}
        disabled={disabled}
        className={textAreaClasses}
        style={textAreaStyle}
        {...props}
      />
    </Box>
  );
});

TextArea.displayName = 'TextArea';